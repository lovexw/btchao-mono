#!/usr/bin/env python3
"""线上数据新鲜度看门狗（防复发兜底）。

背景：btchao-mono 的 push 自动构建链路在 Cloudflare 侧不生效（复盘见 docs/MAINTENANCE.md §1），
数据分站的上线依赖各数据 workflow 里「推送后自触发 Pages 部署」一步。
本脚本每日核对 4 个数据分站「线上数据」是否落后于「仓库 HEAD」：

  1. 线上落后 → 若配置了 CLOUDFLARE_API_TOKEN，自动补触发对应 Pages 项目部署并轮询确认；
  2. 补不回来（或未配置令牌）→ 对每个仍落后的站开 issue 告警（同站已有未关 issue 则不重复开）。

返回码：仍有站落后 = 1（让 scheduled run 标红，多一路告警）。
"""

import json
import os
import subprocess
import time
import urllib.request

ACCOUNT_ID = "edbcf0ec7c3ee185334d13d9077ef6e9"
CF_API = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/pages/projects"

SITES = [
    {"site": "ahr999",  "project": "btchao-ahr999",  "live": "https://ahr.btchao.com/ahr999-data.json",     "repo": "sites/ahr999/public/ahr999-data.json",  "kind": "ahr999"},
    {"site": "ma",      "project": "btchao-ma",      "live": "https://ma.btchao.com/btc-price.csv",         "repo": "sites/ma/public/btc-price.csv",         "kind": "ma"},
    {"site": "ahr-dca", "project": "btchao-ahr-dca", "live": "https://ahr-dca.btchao.com/ahr999_data.json", "repo": "sites/ahr-dca/ahr999_data.json",        "kind": "ahrdca"},
    {"site": "etf",     "project": "btchao-etf",     "live": "https://etf.btchao.com/data/status.json",     "repo": "sites/etf/data/status.json",           "kind": "etf"},
]

POLL_INTERVAL = 60   # 补部署后每 60s 复查一次
POLL_TIMES = 8       # 最多等 8 分钟（ma 是 npm 构建站，留足余量）


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
    raise ValueError(kind)


def repo_freshness(entry: dict):
    with open(entry["repo"], "r", encoding="utf-8") as f:
        return freshness(entry["kind"], f.read())


def live_freshness(entry: dict):
    text = fetch_with_retry(entry["live"])
    if text is None:
        return None
    return freshness(entry["kind"], text)


def trigger_deploy(project: str, token: str) -> str:
    """触发一次部署（等价面板 Create deployment，按生产分支最新提交构建）。"""
    req = urllib.request.Request(
        f"{CF_API}/{project}/deployments",
        data=b"{}", method="POST",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        out = json.loads(r.read().decode())
    if not out.get("success"):
        raise RuntimeError(f"Cloudflare API 返回失败: {out.get('errors')}")
    return out["result"]["url"]


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
    token = os.environ.get("CF_API_TOKEN", "").strip()
    run_link = "/".join([os.environ.get("GITHUB_SERVER_URL", "https://github.com"),
                         os.environ.get("GITHUB_REPOSITORY", ""), "actions",
                         "runs", os.environ.get("GITHUB_RUN_ID", "")])
    print(f"看门狗启动，CLOUDFLARE_API_TOKEN {'已配置' if token else '未配置（只能告警，无法自愈）'}\n")

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

    healed, still = [], list(stale)
    if token:
        print("\n尝试自动补部署 …")
        for entry in stale:
            try:
                url = trigger_deploy(entry["project"], token)
                print(f"  🔁 已触发 {entry['project']} 部署: {url}")
            except Exception as e:
                print(f"  ❌ 触发 {entry['project']} 部署失败: {e}")
        for i in range(POLL_TIMES):
            time.sleep(POLL_INTERVAL)
            still = []
            for entry in stale:
                live_v = live_freshness(entry)
                if live_v is None or live_v < entry["repo_v"]:
                    still.append(entry)
                else:
                    healed.append(entry)
            if not still:
                break
            print(f"  … 第 {i + 1}/{POLL_TIMES} 次复查，仍有 {len(still)} 个站未追上")
        for entry in healed:
            print(f"  ✅ {entry['site']} 已自愈上线")

    if still:
        print(f"\n仍有 {len(still)} 个站线上数据落后，开 issue 告警 …")
        for entry in still:
            title = f"[watchdog] {entry['site']} 线上数据未同步（仓库已更新到 {entry['repo_v']}）"
            if issue_exists(title):
                print(f"  ↷ {entry['site']} 已有未关 issue，跳过")
                continue
            reason = ("线上文件抓取失败（站点可能 5xx）" if entry["live_v"] is None
                      else "部署未跟上最新提交（触发失败/令牌失效/Cloudflare 故障）")
            body = (
                f"看门狗检测到 **{entry['site']}** 线上数据落后于仓库 HEAD：\n\n"
                f"| 项目 | 值 |\n|---|---|\n"
                f"| 仓库 HEAD | `{entry['repo_v']}` |\n"
                f"| 线上 | `{entry['live_v'] if entry['live_v'] is not None else '抓取失败'}` |\n"
                f"| Pages 项目 | `{entry['project']}` |\n"
                f"| 判定 | {reason} |\n\n"
                f"排查顺序：① 本仓库 Secrets 里 `CLOUDFLARE_API_TOKEN` 是否存在/过期；"
                f"② 重跑本 workflow 看自愈是否成功；③ Cloudflare Dashboard → Pages → {entry['project']} 部署记录；"
                f"④ [本次运行日志]({run_link})。\n\n"
                f"机制复盘见 `docs/MAINTENANCE.md` §1。"
            )
            create_issue(title, body)
        return 1

    print("\n自愈完成，全部一致。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
