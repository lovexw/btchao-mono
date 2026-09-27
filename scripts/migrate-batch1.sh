#!/usr/bin/env bash
# ============================================================
# btchao-mono 第一批静态分站迁移脚本（git subtree）
#
# 用法:
#   ./scripts/migrate-batch1.sh                 # 迁移全部 13 个
#   ./scripts/migrate-batch1.sh paper timeline  # 只迁移指定的
#
# 前提:
#   1. 在仓库根目录运行，工作区必须是干净的
#   2. 远端仓库已建好并完成首次 push（见 docs/MIGRATION.md §5.1）
#
# 历史: 默认 --squash（线性干净历史，旧仓库归档后历史仍可回溯）；
#       想把各站完整提交历史 merge 进来，把下面的 SQUASH 改为 ""
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

SQUASH="--squash"
GH="https://github.com/lovexw"

# "目录 源仓库" —— 顺序按复杂度从低到高，也方便中断后跳过已完成的
SITES=(
  "paper        btc-paper"
  "yuyan        btc-yuyan"
  "timeline     btc-timeline"
  "quantum      btc-quantum-notes"
  "hold         hold.btchao.com"
  "cold-wallet  use-cold-wallet"
  "buy          buybtc"
  "password     random-password"
  "ma           btc-ma-new"
  "wiki         btc-wiki"             # VitePress：Cloudflare 侧需配 build command，见 MIGRATION.md §5.3
  "ahr999       ahr999-free"          # ⚠️ 迁移后检查旧仓库 .github/workflows 有无每日更新 cron，有则照搬进 monorepo
  "ahr-dca      ahr-dca"              # ⚠️ 同上
  "flash-buy    bitcoin-flash-buy"    # TS 构建型：Cloudflare 侧需配 npm run build
)

# 未进本批的（文档里都有记录）:
#   bip39          —— 映射待确认（HAB-BIP39 vs bip39-offline），确认后加进来
#   log / news     —— 第二批（自动化盘点）
#   orderflow 等   —— 第三批 Workers
#   onekey-help-zh —— 永不进 monorepo（550MB+）

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "✋ 工作区不干净，先 commit 或 stash"; exit 1
fi

only=("$@")
for entry in "${SITES[@]}"; do
  dir=$(echo "$entry" | awk '{print $1}')
  repo=$(echo "$entry" | awk '{print $2}')
  if [ ${#only[@]} -gt 0 ] && [[ ! " ${only[*]} " =~ " $dir " ]]; then
    continue
  fi
  if [ -d "sites/$dir" ]; then
    echo "⏭  sites/$dir 已存在，跳过"
    continue
  fi
  echo "⬇️  subtree add: sites/$dir ← $repo"
  git subtree add --prefix="sites/$dir" "$GH/$repo.git" main $SQUASH
done

echo
echo "✅ 完成。接下来按 docs/MIGRATION.md §5.2 逐站建 Cloudflare Pages 项目并迁移域名。"
