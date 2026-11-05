#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 btchao.com 的分站从 Cloudflare Pages 切到甲骨文源站（或切回来）。

    export CF_API_TOKEN=xxx          # 权限只要 Zone.DNS:Edit
    ./deploy/switch-dns.sh --check  www paper          # 只看现状，不改
    ./deploy/switch-dns.sh --to-oracle www paper       # 切到甲骨文
    ./deploy/switch-dns.sh --rollback www paper        # 切回原来的 CNAME

每次切换前会把原记录存进 deploy/.dns-backup.json（已在 .gitignore），
所以 --rollback 不依赖 Pages 那边还记着旧值。

token 也可以写进 ~/.cf-token（推荐，不会留在 shell 历史里）；
拿不到 zone 列表时用 CF_ZONE_ID 直接指定，这样 token 只需 DNS:Edit。
"""

import json
import os
import sys
import urllib.error
import urllib.request

API = "https://api.cloudflare.com/client/v4"
ZONE_NAME = os.environ.get("CF_ZONE_NAME", "btchao.com")
ORACLE_IP = os.environ.get("ORACLE_IP", "167.234.216.40")
HERE = os.path.dirname(os.path.abspath(__file__))
BACKUP = os.path.join(HERE, ".dns-backup.json")
COMMENT = "btchao-mono 自托管（甲骨文）"
MODES = ("--check", "--to-oracle", "--rollback")
USAGE = (
    "用法：switch-dns.sh --check|--to-oracle|--rollback <子域名...>"
    "（不带 .btchao.com；裸域写 @）"
)

TOKEN = None
ZID = None


def say(msg):
    print("\033[36m[dns]\033[0m " + msg, flush=True)


def die(msg):
    print("\033[31m[dns] " + msg + "\033[0m", file=sys.stderr, flush=True)
    sys.exit(1)


def load_token():
    tok = os.environ.get("CF_API_TOKEN", "").strip()
    if not tok:
        path = os.environ.get("CF_TOKEN_FILE", os.path.expanduser("~/.cf-token"))
        if os.path.isfile(path):
            with open(path, encoding="utf-8") as f:
                tok = f.read().strip()
    if not tok:
        die("没有 token：export CF_API_TOKEN=... 或写进 ~/.cf-token")
    return tok


def cf(method, path, body=None):
    """调 CF API，返回解析后的 JSON（不管成功失败都返回，由调用方判断 success）。"""
    global TOKEN
    if TOKEN is None:
        TOKEN = load_token()  # 惰性加载：参数写错时不该先要 token
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(API + path, data=data, method=method)
    req.add_header("Authorization", "Bearer " + TOKEN)
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", "replace")
        try:
            return json.loads(raw)
        except ValueError:
            die("HTTP %d：%s" % (exc.code, raw[:300]))
    except urllib.error.URLError as exc:
        die("网络错误：%s" % exc.reason)


def err_of(resp):
    try:
        return resp["errors"][0]["message"]
    except (KeyError, IndexError, TypeError):
        return json.dumps(resp, ensure_ascii=False)[:200]


def zone_id():
    given = os.environ.get("CF_ZONE_ID", "").strip()
    if given:
        return given
    resp = cf("GET", "/zones?name=" + ZONE_NAME)
    if not resp.get("success", True):
        die("鉴权失败：%s（token 无效、过期，或没给 Zone:Read）" % err_of(resp))
    result = resp.get("result") or []
    if not result:
        die(
            "查不到 zone %s。给 token 加 Zone:Read，或 export CF_ZONE_ID=<zone id>"
            % ZONE_NAME
        )
    return result[0]["id"]


def records(fqdn):
    resp = cf("GET", "/zones/%s/dns_records?name=%s" % (ZID, fqdn))
    return resp.get("result") or []


# 只有 A/AAAA/CNAME 跟站点有关。裸域上还挂着 MX（Cloudflare 邮件路由）和 TXT，
# 它们不能参与「有几条记录」的判断，否则切裸域会被误判成多条而拒绝执行。
HOST_TYPES = ("A", "AAAA", "CNAME")


def host_records(fqdn):
    return [r for r in records(fqdn) if r["type"] in HOST_TYPES]


def backup_add(fqdn, rec):
    data = {}
    if os.path.exists(BACKUP):
        with open(BACKUP, encoding="utf-8") as f:
            data = json.load(f)
    data[fqdn] = {
        "id": rec["id"],
        "type": rec["type"],
        "content": rec["content"],
        "proxied": rec.get("proxied", False),
        "ttl": rec.get("ttl", 1),
    }
    with open(BACKUP, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def main():
    global ZID
    args = sys.argv[1:]
    if not args or args[0] not in MODES:
        die(USAGE)
    mode, names = args[0], args[1:]
    if not names:
        die("至少给一个子域名，例如：--check www paper")

    ZID = zone_id()

    if mode == "--check":
        say("zone %s（%s）" % (ZONE_NAME, ZID))
    elif mode == "--to-oracle":
        say("目标源站 %s，橙云保持开启" % ORACLE_IP)

    for name in names:
        fqdn = ZONE_NAME if name in ("@", ZONE_NAME) else "%s.%s" % (name, ZONE_NAME)

        if mode == "--check":
            cur = records(fqdn)  # 检查时把 MX/TXT 也列出来，便于确认邮件记录还在
            if not cur:
                say("%-24s 没有记录" % fqdn)
            for r in cur:
                say(
                    "%-24s %-5s %-40s proxied=%s ttl=%s"
                    % (fqdn, r["type"], r["content"], r.get("proxied"), r.get("ttl"))
                )
            continue

        cur = host_records(fqdn)  # 切换只看 A/AAAA/CNAME

        if mode == "--to-oracle":
            if len(cur) != 1:
                die("%s 有 %d 条站点记录，先手动收敛到 1 条" % (fqdn, len(cur)))
            rec = cur[0]
            if rec["type"] == "A" and rec["content"] == ORACLE_IP:
                say("%-24s 已经是 %s，跳过" % (fqdn, ORACLE_IP))
                continue
            backup_add(fqdn, rec)
            body = {
                "type": "A",
                "name": fqdn,
                "content": ORACLE_IP,
                "proxied": True,
                "ttl": 1,
                "comment": COMMENT,
            }
            # 用 PUT 整体替换：PATCH 改记录类型（CNAME→A）在 CF 上不总是生效
            resp = cf("PUT", "/zones/%s/dns_records/%s" % (ZID, rec["id"]), body)
            if not resp.get("success"):
                die("%s 切换失败：%s" % (fqdn, err_of(resp)))
            say(
                "%-24s → %s（橙云），原值 %s %s 已备份"
                % (fqdn, ORACLE_IP, rec["type"], rec["content"])
            )
            continue

        # --rollback
        if not os.path.exists(BACKUP):
            die("没有备份文件 %s" % BACKUP)
        with open(BACKUP, encoding="utf-8") as f:
            saved = json.load(f).get(fqdn)
        if not saved:
            die("%s 不在备份里" % fqdn)
        body = {
            "type": saved["type"],
            "name": fqdn,
            "content": saved["content"],
            "proxied": saved["proxied"],
            "ttl": saved["ttl"],
        }
        resp = cf("PUT", "/zones/%s/dns_records/%s" % (ZID, saved["id"]), body)
        if not resp.get("success"):
            die("%s 回滚失败：%s" % (fqdn, err_of(resp)))
        say("%-24s 已回滚到 %s %s" % (fqdn, saved["type"], saved["content"]))

    if mode != "--check":
        first = names[0]
        host = ZONE_NAME if first in ("@", ZONE_NAME) else "%s.%s" % (first, ZONE_NAME)
        say(
            "等 10 秒后验证：curl -sI https://%s/ 看状态码与 cf-ray；"
            "源站日志见 openresty/log/access.log" % host
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
