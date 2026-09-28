# AGENTS.md — btchao-mono AI 协作纪律

> AI 在本仓库做任何改动前，**先读完本文件与 [docs/MAINTENANCE.md](docs/MAINTENANCE.md)**（部署触发规则 / 提交纪律 / 统一页脚配置总表 / 待办清单 / git 断点），再动手。

## 硬规则

1. **目录即部署单元**：`sites/<目录>` = 一个分站 = 一个子域名 = 一个 Cloudflare Pages 项目（watch paths：`sites/<目录>/**` + `shared/**`）。改哪个站只动哪个目录。
2. **提交前必核对范围**：`git status` + `git diff --stat` 确认改动分布；单站任务只 `git add sites/<站>`，**禁止 `git add -A` 作为默认动作**；半成品用 `git stash`。
3. **动 `shared/**` = 全站重建**：改完必须跑 `./scripts/sync-shared.sh` 再提交（各站部署的是本地副本），并确认这次值得让 18 个站重部署。`docs/`、`scripts/`、根 `README.md`、`sites/_template/`、`.github/` 的改动不触发任何部署。
4. **统一页脚**：配置在各站 HTML 里 footer.js `<script>` 标签的 `data-*` 属性（当前配置总表见 MAINTENANCE.md §3）；公共样式/结构改 `shared/footer.js` 并递增引用处 `?v=`。改某站页脚文案**不要**去动 shared/。
5. **品牌资产**：官方标准 Logo 唯一真相源 `sites/brand/assets/logos/bitcoin.svg`；favicon 以 `sites/_template/favicon.svg` 为模板复制。不要手绘/变体比特币 Logo。
6. **多页站**（hold/quantum/buy/timeline）注意同一改动要落到站内**所有** HTML 页面，改完用 grep 核对页数。
7. **构建型站**：wiki（VitePress，统一页脚在 `config.mts` head 里）、ma / flash-buy（Vite，页脚在根 index.html，btc-shared 副本在 public/）、ahr999（public/）。改完跑对应构建验证。
8. **commit 风格**沿用仓库历史：中文 + `feat:` / `fix:` / `docs:` 前缀，正文分条列出。
9. **收尾更新断点**：阶段性工作完成后，更新 [docs/MAINTENANCE.md](docs/MAINTENANCE.md) §5 待办清单与 §6 git 断点，保证下次（人或 AI）能无缝续接。
