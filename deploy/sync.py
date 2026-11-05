#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""btchao.com 分站同步器（服务器端）。

模型与博客一致：**代码只改 GitHub，服务器只负责拉取和发布**。

    GitHub main ──(每 2 分钟 git fetch)──▶ /opt/btchao-app      （代码，只读）
                                              │ 需要构建的站跑 npm build
                                              ▼
                                          /opt/1panel/apps/openresty/openresty/www/btchao/<站>   （发布目录，nginx root）
                                              │
                                    1Panel OpenResty :80  ◀── Cloudflare

用法（服务器上）：
    python3 deploy/sync.py              # 增量：只发布本次提交涉及的站
    python3 deploy/sync.py --all        # 全量：所有站重发一遍
    python3 deploy/sync.py --site wiki  # 只发某个站
    python3 deploy/sync.py --dry-run    # 只打印计划，不动文件
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import time

APP_DIR = os.environ.get("BTCHAO_APP_DIR", "/opt/btchao-app")
STATE_DIR = os.environ.get("BTCHAO_STATE_DIR", "/opt/btchao-state")
STATE_FILE = os.path.join(STATE_DIR, "last-sha")
META_FILE = os.path.join(STATE_DIR, "last-sync.json")
NGINX_CONF_NAME = "btchao-sites.conf"
NGINX_CONF_DIR = os.environ.get(
    "BTCHAO_NGINX_CONF_DIR", "/opt/1panel/apps/openresty/openresty/conf/conf.d"
)
OPENRESTY_CONTAINER = os.environ.get("BTCHAO_OPENRESTY", "1Panel-openresty-fokI")
API_COMPOSE = os.path.join(APP_DIR, "deploy", "api", "docker-compose.yml")


def log(msg):
    print("[btchao-sync] %s" % msg, flush=True)


def run(cmd, cwd=None, check=True, capture=True, quiet=False):
    if not quiet:
        log("$ " + " ".join(cmd))
    proc = subprocess.run(
        cmd,
        cwd=cwd,
        check=False,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.STDOUT if capture else None,
        text=True,
    )
    if capture and not quiet and proc.stdout.strip():
        for line in proc.stdout.strip().splitlines()[-12:]:
            log("  " + line)
    if check and proc.returncode != 0:
        raise RuntimeError("命令失败（%d）：%s" % (proc.returncode, " ".join(cmd)))
    return proc


def load_config():
    path = os.path.join(APP_DIR, "deploy", "sites.json")
    with open(path, encoding="utf-8") as f:
        cfg = json.load(f)
    # 允许本地演练时改发布根目录
    if os.environ.get("BTCHAO_PUBLISH_ROOT"):
        cfg["publish_root"] = os.environ["BTCHAO_PUBLISH_ROOT"]
    return cfg


def read_state():
    try:
        with open(STATE_FILE, encoding="utf-8") as f:
            return f.read().strip()
    except IOError:
        return ""


def write_state(sha, published):
    if not os.path.isdir(STATE_DIR):
        os.makedirs(STATE_DIR)
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        f.write(sha + "\n")
    with open(META_FILE, "w", encoding="utf-8") as f:
        json.dump(
            {"sha": sha, "at": int(time.time()), "published": published}, f, ensure_ascii=False
        )


def changed_paths(old, new):
    if not old:
        return None  # 首次运行：视为全变
    out = run(["git", "diff", "--name-only", old, new], cwd=APP_DIR).stdout
    return [p for p in out.splitlines() if p.strip()]


def site_affected(site, changed):
    if changed is None:
        return True
    prefix = site["src"].rstrip("/") + "/"
    for p in changed:
        if p == site["src"] or p.startswith(prefix):
            return True
        # shared/ 的公共页脚与样式由 scripts/sync-shared.sh 复制进各站 btc-shared/
        if p.startswith("shared/"):
            return True
        # 发布清单变化 = 所有站都可能要动
        if p in ("deploy/sites.json", "deploy/nginx/btchao-sites.conf"):
            return True
    return False


def npm_build(site, cfg):
    """在有 node 的容器里构建，宿主不装 node。

    node:alpine 里没有 git，而 VitePress 会 spawn git 取 lastUpdated，
    所以进容器先补一下（只在缺的时候装，秒级）。
    """
    workdir = "/app/" + site["src"]
    lock = os.path.join(APP_DIR, site["src"], "package-lock.json")
    modules = os.path.join(APP_DIR, site["src"], "node_modules", ".package-lock.json")
    need_install = True
    if os.path.exists(lock) and os.path.exists(modules):
        need_install = os.path.getmtime(lock) > os.path.getmtime(modules)
    script = "command -v git >/dev/null || apk add --no-cache git >/dev/null 2>&1; "
    script += "npm ci --no-audit --no-fund && " if need_install else ""
    script += "npm run build"
    run(
        [
            "docker", "run", "--rm",
            "-v", APP_DIR + ":/app",
            "-w", workdir,
            "-e", "CI=1",
            cfg.get("node_image", "node:20-alpine"),
            "sh", "-c", script,
        ],
        capture=False,
    )


def publish(site, cfg, dry):
    src = os.path.join(APP_DIR, site["out"])
    dst = os.path.join(cfg["publish_root"], site["id"])
    if not os.path.isdir(src):
        if dry:
            log("  [dry-run] 产物待构建：%s" % src)
            return
        raise RuntimeError("产物目录不存在：%s（构建失败？）" % src)
    if dry:
        log("  [dry-run] rsync %s -> %s" % (src, dst))
        return
    if not os.path.isdir(dst):
        os.makedirs(dst)
    cmd = [
        "rsync", "-a", "--delete",
        "--exclude", "node_modules/",
        "--exclude", ".git/",
        "--exclude", "functions/",
        # Pages 专属文件与内部文档不对外
        "--exclude", "/_headers",
        "--exclude", "/_redirects",
        "--exclude", "/*.md",
        src.rstrip("/") + "/",
        dst.rstrip("/") + "/",
    ]
    run(cmd, quiet=True)
    log("  发布 %-9s → %s" % (site["id"], dst))


def render_nginx(cfg):
    sites = cfg["sites"]
    lines = []
    lines.append("# 由 deploy/sync.py 依据 deploy/sites.json 生成，别手改。")
    lines.append("# 源站只监听 80：TLS 由 Cloudflare 终结（本机 443 被 xray 占用）。")
    lines.append("")

    common_headers = [
        "add_header X-Content-Type-Options nosniff always;",
        "add_header Referrer-Policy strict-origin-when-cross-origin always;",
        "add_header X-Frame-Options SAMEORIGIN always;",
    ]

    def server_block(site):
        root = cfg.get("container_root", "/www/btchao").rstrip("/") + "/" + site["id"]
        b = []
        b.append("# %s → %s" % (site["domain"], root))
        b.append("server {")
        b.append("    listen 80;")
        b.append("    server_name %s;" % site["domain"])
        b.append('    root "%s";' % root)
        b.append("    index index.html;")
        b.append("    server_tokens off;")
        b.append("    charset utf-8;")
        b.append("")
        b.append("    gzip on;")
        b.append("    gzip_min_length 1k;")
        b.append("    gzip_comp_level 5;")
        b.append(
            "    gzip_types text/plain text/css text/javascript application/javascript"
            " application/json application/xml image/svg+xml;"
        )
        b.append("")
        for h in common_headers:
            b.append("    " + h)
        b.append("")
        # 1) HTML：不缓存
        b.append("    location ~* \\.html?$ {")
        b.append('        add_header Cache-Control "public, max-age=0, must-revalidate";')
        for h in common_headers:
            b.append("        " + h)
        b.append("    }")
        # 2) CSS/JS：不强缓存（各站靠 ?v= 版本号失效）
        b.append("    location ~* \\.(?:css|js)$ {")
        b.append('        add_header Cache-Control "public, max-age=0, must-revalidate";')
        for h in common_headers:
            b.append("        " + h)
        b.append("    }")
        # 3) 图片/字体：一个月
        b.append("    location ~* \\.(?:png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf)$ {")
        b.append('        add_header Cache-Control "public, max-age=2592000";')
        for h in common_headers:
            b.append("        " + h)
        b.append("    }")
        b.append("")
        b.append("    location / {")
        b.append("        try_files $uri $uri/ $uri/index.html =404;")
        b.append("    }")
        if site.get("api"):
            b.append("")
            b.append("    # 顶替原来的 Cloudflare Pages Functions（deploy/api）")
            b.append("    location ^~ /api/ {")
            b.append("        proxy_pass http://127.0.0.1:%d;" % cfg["api_port"])
            b.append("        proxy_http_version 1.1;")
            b.append("        proxy_set_header Host $host;")
            b.append("        proxy_set_header X-Real-IP $remote_addr;")
            b.append("        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;")
            b.append("        proxy_set_header X-Forwarded-Proto $scheme;")
            b.append("        proxy_connect_timeout 10s;")
            b.append("        proxy_read_timeout 20s;")
            b.append("    }")
        b.append("")
        b.append("    location = /favicon.ico { access_log off; log_not_found off; }")
        b.append("}")
        return b

    for s in sites:
        lines.extend(server_block(s))
        lines.append("")
    return "\n".join(lines) + "\n"


def write_nginx(cfg, dry):
    content = render_nginx(cfg)
    path = os.path.join(NGINX_CONF_DIR, NGINX_CONF_NAME)
    old = ""
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            old = f.read()
    if old == content:
        log("nginx 配置无变化")
        return False
    if dry:
        log("[dry-run] 将写入 %s" % path)
        return False
    log("写入 nginx 配置：%s" % path)
    backup = path + ".bak"
    if old:
        with open(backup, "w", encoding="utf-8") as f:
            f.write(old)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return True


def reload_nginx(conf_path=None):
    """先测再 reload；配置不合法就回滚，绝不把 OpenResty 留在坏配置上。"""
    test = run(["docker", "exec", OPENRESTY_CONTAINER, "nginx", "-t"], check=False)
    if test.returncode != 0:
        if conf_path and os.path.exists(conf_path + ".bak"):
            shutil.copyfile(conf_path + ".bak", conf_path)
            log("✗ 新配置没通过 nginx -t，已回滚到上一版")
        raise RuntimeError("nginx -t 失败，详见上面的输出")
    run(["docker", "exec", OPENRESTY_CONTAINER, "nginx", "-s", "reload"], capture=True)
    log("OpenResty 已重载")


def restart_api(dry):
    if dry:
        log("[dry-run] 将重建 lottery API 容器")
        return
    if not os.path.exists(API_COMPOSE):
        log("未找到 %s，跳过 API" % API_COMPOSE)
        return
    run(["docker", "compose", "-f", API_COMPOSE, "up", "-d", "--build"], capture=False)
    log("lottery API 容器已更新（127.0.0.1:%d）" % 8801)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true", help="所有站重发")
    ap.add_argument("--site", help="只处理某个站（id）")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    os.chdir(APP_DIR)
    cfg = load_config()

    old_sha = read_state()
    run(["git", "fetch", "--prune", "origin", "main"], quiet=True)
    new_sha = run(["git", "rev-parse", "origin/main"], quiet=True).stdout.strip()

    if not args.all and not args.site and old_sha == new_sha:
        log("无新提交（%s），退出" % new_sha[:7])
        return 0

    changed = None if args.all else changed_paths(old_sha, new_sha)
    if changed is not None:
        log("本次提交涉及 %d 个文件" % len(changed))
    run(["git", "reset", "--hard", new_sha], quiet=True)
    log("代码已更新到 %s" % new_sha[:7])

    targets = []
    for s in cfg["sites"]:
        if args.site:
            if s["id"] == args.site:
                targets.append(s)
        elif args.all or site_affected(s, changed):
            targets.append(s)

    if not targets:
        log("提交没碰到任何分站，只更新状态")
        if not args.dry_run:
            write_state(new_sha, [])
        return 0

    published = []
    for s in targets:
        log("── %s（%s）" % (s["id"], s["domain"]))
        try:
            if s.get("build") == "npm" and not args.dry_run:
                npm_build(s, cfg)
            publish(s, cfg, args.dry_run)
            published.append(s["id"])
        except Exception as exc:  # noqa: BLE001
            log("✗ %s 失败：%s" % (s["id"], exc))
            if not args.dry_run:
                # 单站失败不影响其他站，但整体退出码非 0，让 systemd/日志留痕
                write_state(old_sha, published)
            return 1

    nginx_changed = write_nginx(cfg, args.dry_run)
    if nginx_changed and not args.dry_run:
        reload_nginx(os.path.join(NGINX_CONF_DIR, NGINX_CONF_NAME))

    if any(s.get("api") for s in targets) and not args.dry_run:
        if changed is None or any(p.startswith("deploy/api/") for p in (changed or [])):
            restart_api(args.dry_run)

    if not args.dry_run:
        write_state(new_sha, published)
    log("完成：发布 %d 个站 %s" % (len(published), new_sha[:7]))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:  # noqa: BLE001
        log("同步失败：%s" % exc)
        sys.exit(1)
