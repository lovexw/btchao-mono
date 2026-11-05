#!/usr/bin/env bash
# btchao.com 分站自托管：一次性初始化（在甲骨文服务器上跑 sudo bash 执行）
# 幂等：重复跑只补缺的东西，不会覆盖已发布的站点。
set -euo pipefail

REPO="${BTCHAO_REPO:-https://github.com/lovexw/btchao-mono.git}"
APP="${BTCHAO_APP_DIR:-/opt/btchao-app}"
STATE="/opt/btchao-state"
PUB="/opt/1panel/apps/openresty/openresty/www/btchao"
UNIT_DIR="/etc/systemd/system"

say() { printf '\033[36m[install]\033[0m %s\n' "$*"; }

command -v docker >/dev/null || { echo "缺 docker，先装 1Panel 或 docker"; exit 1; }
command -v rsync  >/dev/null || { say "装 rsync"; apt-get update -qq && apt-get install -y -qq rsync; }

say "目录：$APP / $STATE / $PUB"
mkdir -p "$APP" "$STATE" "$PUB"

if [ ! -d "$APP/.git" ]; then
  say "克隆仓库"
  git clone "$REPO" "$APP"
else
  say "仓库已存在，跳过克隆"
fi

say "安装 systemd 定时器"
install -m 644 "$APP/deploy/systemd/btchao-sites-sync.service" "$UNIT_DIR/"
install -m 644 "$APP/deploy/systemd/btchao-sites-sync.timer"   "$UNIT_DIR/"
systemctl daemon-reload
systemctl enable --now btchao-sites-sync.timer

say "首次全量发布（wiki 构建较慢，耐心等）"
python3 "$APP/deploy/sync.py" --all

say "状态"
systemctl list-timers btchao-sites-sync.timer --no-pager | head -3
ls -1 "$PUB"
