#!/usr/bin/env python3
"""线上数据新鲜度看门狗（防复发兜底）。

背景：btchao.com 的 13 个分站已从 Cloudflare Pages 迁到甲骨文自托管
（167.234.216.40，链路见 deploy/README.md）：

    GitHub main ──(systemd timer, 每 2 分钟)──▶ /opt/btchao-app ──▶ OpenResty :80

数据分站（ahr999 / ma / ahr-dca / etf / draw）的 GitHub Actions 只负责提交数据，
上线由服务器上的 btchao-sites-sync 定时器在 2 分钟内完成，本工作流不再触发任何外部部署。

本脚本每日核对 5 个数据分站「线上数据」是否落后于「仓库 HEAD」：

  1. 一致 → 退出码 0；
  2. 落后 → 对每个仍落后的站开 issue 告警（同站已有未关 issue 则不重复开），退出码 1。

自动化修不了服务器侧的问题（拉取失败 / 构建失败 / nginx 配置错），所以只告警不自愈；
修复入口见 issue 正文里的排查顺序。

返回码：仍有站落后 = 1（让 scheduled run 标红，多一路告警）。
"""

import json
import os
import subprocess
import time
import urllib.request

SITES = [
    {"site": "ahr999",  "live": "https://ahr.btchao.com/ahr999-data.json",     "repo": "sites/ahr999/public/ahr999-data.json",  "kind": "ahr999"},
    {"site": "ma",      "live": "https://ma.btchao.com/btc-price.csv",         "repo": "sites/ma/public/btc-price.csv",         "kind": "ma"},
    {"site": "ahr-dca", "live": "https://ahr-dca.btchao.com/ahr999_data.json", "repo": "sites/ahr-dca/ahr999_data.json",        "kind": "ahrdca"},
    {"site": "etf",     "live": "https://etf.btchao.com/data/status.json",     "repo": "sites/etf/data/status.json",           "kind": "etf"},
    {"site": "draw",    "live": "https://lottery.btchao.com/data/draws.json",  "repo": "sites/draw/data/draws.json",           "kind": "draw"},
]


def fetch_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "btchao-freshness-watchdog"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8")


def fetch_with_retry(url: str, tries: int = 3) -> str | None:
    for i in range(tries):
        try:
            return fetch_text(url)
        except Exception as e:
            print(f"  ⚠️ 抓取 {url} 第 {i + 1} 次失败: {e}")
            if i < tries - 1:
                time.sleep(10)
    return None


def freshness(kind: str, text: str):
    """提取「新鲜度」值：unix 时间戳用数值比较，日期/ISO 字符串直接字典序比较。"""
    if kind == "ahr999":
        return int(json.loads(text)["updated_at_unix"])
    if kind == "ma":
        return text.splitlines()[1].split(",")[0].strip()  # 首行数据 = 最新日期
    if kind == "ahrdca":
        return json.loads(text)["last_updated"]            # "2026-09-30"
    if kind == "etf":
        return json.loads(text)["generatedAt"]             # ISO 8601
    if kind == "draw":
        return json.loads(text)["updatedAt"]               # ISO 8601
    raise ValueError(kind)


def repo_freshness(entry: dict):
    with open(entry["repo"], "r", encoding="utf-8") as f:
        return freshness(entry["kind"], f.read())


def live_freshness(entry: dict):
    text = fetch_with_retry(entry["live"])
    if text is None:
        return None
    return freshness(entry["kind"], text)


def gh(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(["gh", *args], capture_output=True, text=True)


def issue_exists(title: str) -> bool:
    r = gh("issue", "list", "--state", "open", "--search", f"{title} in:title", "--json", "number")
    if r.returncode != 0:
        print(f"  ⚠️ 查询 issue 失败: {r.stderr.strip()}")
        return False
    return len(json.loads(r.stdout or "[]")) > 0


def create_issue(title: str, body: str) -> None:
    r = gh("issue", "create", "--title", title, "--body", body)
    if r.returncode != 0:
        print(f"  ⚠️ 开 issue 失败: {r.stderr.strip()}")
    else:
        print(f"  📢 已开 issue: {r.stdout.strip().splitlines()[-1]}")


def main() -> int:
    run_link = "/".join([os.environ.get("GITHUB_SERVER_URL", "https://github.com"),
                         os.environ.get("GITHUB_REPOSITORY", ""), "actions",
                         "runs", os.environ.get("GITHUB_RUN_ID", "")])
    print("看门狗启动（核对外网真实域名，部署方 = 甲骨文 btchao-sites-sync）\n")

    stale = []
    for entry in SITES:
        repo_v = repo_freshness(entry)
        live_v = live_freshness(entry)
        is_stale = live_v is None or live_v < repo_v
        mark = "❌ 落后" if is_stale else "✅ 一致"
        print(f"{mark}  {entry['site']}: 仓库={repo_v}  线上={live_v if live_v is not None else '抓取失败'}")
        if is_stale:
            entry["repo_v"], entry["live_v"] = repo_v, live_v
            stale.append(entry)

    if not stale:
        print("\n全部数据分站线上与仓库一致，收工。")
        return 0

    print(f"\n有 {len(stale)} 个站线上数据落后，开 issue 告警 …")
    for entry in stale:
        title = f"[watchdog] {entry['site']} 线上数据未同步（仓库已更新到 {entry['repo_v']}）"
        if issue_exists(title):
            print(f"  ↷ {entry['site']} 已有未关 issue，跳过")
            continue
        reason = ("线上文件抓取失败（站点可能 5xx / nginx 未匹配到该 Host）" if entry["live_v"] is None
                  else "服务器未在 2 分钟内拉到并发布最新提交（拉取失败 / 构建失败 / 定时器未运行）")
        body = (
            f"看门狗检测到 **{entry['site']}** 线上数据落后于仓库 HEAD：\n\n"
            f"| 项目 | 值 |\n|---|---|\n"
            f"| 仓库 HEAD | `{entry['repo_v']}` |\n"
            f"| 线上 | `{entry['live_v'] if entry['live_v'] is not None else '抓取失败'}` |\n"
            f"| 线上地址 | {entry['live']} |\n"
            f"| 判定 | {reason} |\n\n"
            f"排查顺序（甲骨文 `167.234.216.40`）：\n"
            f"1. `systemctl list-timers btchao-sites-sync.timer` —— 定时器是否还在跑；\n"
            f"2. `journalctl -u btchao-sites-sync -n 100 --no-pager` —— 最近一次同步是否报错；\n"
            f"3. `cd /opt/btchao-app && sudo git log --oneline -1` —— 代码是否已拉到最新提交；\n"
            f"4. `sudo python3 /opt/btchao-app/deploy/sync.py --site {entry['site']}` —— 手动补发该站；\n"
            f"5. [本次运行日志]({run_link})。\n\n"
            f"机制说明见 `deploy/README.md`。"
        )
        create_issue(title, body)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
