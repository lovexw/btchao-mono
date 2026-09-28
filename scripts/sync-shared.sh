#!/usr/bin/env bash
# ============================================================
# 统一风格同步脚本：把 shared/（唯一真相源）分发到各站本地副本
#
# 标准流程（改统一风格时）:
#   1. 改 shared/styles/tokens.css 或 shared/footer.js
#   2. ./scripts/sync-shared.sh
#   3. git add -A && git commit -m "style: ..." && git push
#      → 各站 watch paths 触发重部署，全站生效
#
# 新增分站后，把它的目标路径加进下面 TARGETS。
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -d shared ]; then
  echo "❌ 找不到 shared/，请在仓库根目录运行"; exit 1
fi

# 格式: "站点目录:副本目标目录"（构建型站点放进各自的 public/）
TARGETS=(
  "sites/_template:sites/_template/btc-shared"
  "sites/paper:sites/paper/btc-shared"
  "sites/yuyan:sites/yuyan/btc-shared"
  "sites/timeline:sites/timeline/btc-shared"
  "sites/quantum:sites/quantum/btc-shared"
  "sites/hold:sites/hold/btc-shared"
  "sites/log:sites/log/btc-shared"
  "sites/ahr999:sites/ahr999/public/btc-shared"
  "sites/ahr-dca:sites/ahr-dca/btc-shared"
  "sites/ma:sites/ma/public/btc-shared"
  "sites/wiki:sites/wiki/docs/public/btc-shared"
  "sites/brand:sites/brand/btc-shared"
  "sites/etf:sites/etf/btc-shared"
)

for entry in "${TARGETS[@]}"; do
  site="${entry%%:*}"
  dest="${entry#*:}"
  if [ ! -d "$site" ]; then
    echo "⏭  $site 不存在，跳过"
    continue
  fi
  mkdir -p "$dest"
  rsync -a --delete shared/ "$dest/"
  echo "✅ $site → $dest"
done

echo
echo "完成。别忘了: git add -A && git commit && git push"
