# btchao.com Monorepo 迁移方案

> 版本 v1.0 · 2026-09-27 · 基于 lovexw 账号 106 个仓库与线上分站实测盘点

## 0. 一句话目标

新建仓库 `lovexw/btchao-mono`，把 btchao.com 主站卡片上**维护轻松的静态分站**收进一个仓库，一个子目录 = 一个分站 = 一个子域名；后期改某个站只动对应文件夹，改统一风格只动 `shared/`。

## 1. 三条准入判断标准

一个仓库能否搬进来，同时满足才算：

1. **是 btchao.com 主站卡片上的分站**（归属这个体系，独立工具产品不算）；
2. **纯静态或纯前端**（数据在浏览器端拉 API，不需要服务端长驻进程）；
3. **无重量级自动化**（没有"每 30 分钟刷数据"这类定时管道，或管道已盘点清楚）。

## 2. 站点 ↔ 仓库 ↔ 目录 总表

### 第一批：纯静态、低维护（13 个，本方案主体）

| monorepo 目录 | 分站域名 | 源仓库 | 技术 | 迁移前注意 |
|---|---|---|---|---|
| `sites/paper` | paper.btchao.com | btc-paper | 纯 HTML | 无。**试点首选** |
| `sites/timeline` | timeline.btchao.com | btc-timeline | 前端 JS | 无 |
| `sites/yuyan` | yy.btchao.com | btc-yuyan | HTML/CSS | 无 |
| `sites/quantum` | quantum.btchao.com | btc-quantum-notes | 纯 HTML | 无 |
| `sites/hold` | hold.btchao.com | hold.btchao.com | 纯 HTML | 无 |
| `sites/cold-wallet` | cold-wallet.btchao.com | use-cold-wallet | 纯 HTML | 无 |
| `sites/buy` | buy.btchao.com | buybtc | 纯 HTML | 无 |
| `sites/password` | pd.btchao.com | random-password | 纯 HTML | 无 |
| `sites/bip39` | bip39.btchao.com | hab-bip39 → HAB-BIP39 | JS | ✅ 映射已确认（2026-09-27 线上项目清单） |
| `sites/log` | log.btchao.com | 000-log-btchao-com → touziriji | 纯 HTML | ✅ 映射已确认，无自动化 cron |
| `sites/ma` | ma.btchao.com | btc-ma-new | 前端 JS | 行情走客户端 API，无服务端 |
| `sites/wiki` | wiki.btchao.com | btc-wiki | VitePress | 需配 build command（见 §5.3） |
| `sites/ahr999` | ahr.btchao.com | ahr999-free | 纯 HTML | ⚠️ 确认"每日更新"是手动 push 还是旧仓库 Actions cron；后者需在 monorepo 重建 workflow |
| `sites/ahr-dca` | ahr-dca.btchao.com | ahr-dca | 前端 JS | ⚠️ 同上 |
| `sites/flash-buy` | get.btchao.com | bitcoin-flash-buy | TypeScript | 构建型：`npm run build` |

### 第二批：需先盘点自动化（迁移逻辑相同，搬之前多一步排查）

| 分站 | 源仓库 | 卡住的原因 |
|---|---|---|
| news.btchao.com | btcnews | 每 30 分钟自动刷新；线上载体实为 Worker（btc-xinwen-2026），二期随 Workers 流程迁移 |

### 第三批：Cloudflare Workers（走 GitHub Actions + wrangler，见 §6）

| 分站 | 源仓库 | 说明 |
|---|---|---|
| btcgo.btchao.com | btc-orderflow | 实时订单流，Binance/OKX 数据 |
| （域名待确认） | wechat-chat-room | Workers + Durable Objects |

### 明确不搬（写下来防止以后纠结）

| 仓库 | 不搬的理由 |
|---|---|
| **onekey-help-zh** | ⚠️ **体积 550MB+**（整站镜像含大量图片），进 monorepo 会拖垮所有人的 clone 和 subtree 操作。保持独立仓库 |
| **www.btchao.com（主站）** | 门面站，等上面全部跑顺后**最后单独搬**（§7） |
| 全部 fork 仓库 | HowToLiveBetter、learnbitcoin-content、growth-album、nakamotoinstitute.org-cn 等，fork 合并失去上游同步能力 |
| 独立工具/产品 | exiffix、litepic、macbench、smoke-map、game、snippet-hub、DouMeiPing、dahaizhan 等——有自己的产品身份，不属于 btchao.com 分站体系 |

## 3. 迁移期间的总原则

- **旧仓库只归档、永不删除**：随时可回滚，回滚成本 = 1 分钟域名切回。
- **分站零长期停机**：唯一有秒级间隙的动作是"旧 Pages 项目移除域名 → 新项目添加域名"，选低峰期做，正常 1 分钟内恢复。
- **一次搬 2~3 个，验证通过再继续**，不要一口气 13 个。
- **统一样式不着急**：先原样搬进来，`shared/` 统一风格等 assets 站上线后逐站接入（§8），接入一个验证一个。

## 4. 目标仓库结构

```
btchao-mono/
├─ README.md                    # 总览 + 站点目录映射表
├─ sites/                       # 静态分站，目录名 = 子域名前缀
│  ├─ _template/                # 新站脚手架（带 _ 前缀不会被部署）
│  ├─ paper/                    # paper.btchao.com
│  ├─ timeline/                 # timeline.btchao.com
│  └─ ...
├─ workers/                     # 第三批 Workers 项目
│  └─ orderflow/                # btcgo.btchao.com
├─ shared/                      # 统一风格资产（单独部署为 assets 站，见 §8）
│  ├─ styles/tokens.css
│  └─ footer.js
├─ docs/
│  ├─ MIGRATION.md              # 本文档
│  ├─ STYLE-GUIDE.md            # 统一风格规范
│  └─ NEW-SITE-SOP.md           # 新增分站标准流程
├─ scripts/
│  └─ migrate-batch1.sh         # 第一批 subtree 迁移脚本
└─ .github/workflows/           # 第三批 Workers 部署用
```

**命名规范：`sites/` 下的目录名 = 子域名前缀**（password ↔ pd 这种不一致的，目录名跟子域名走，映射表里写清楚）。

## 5. 第一批迁移步骤

### 5.1 Phase 0 · 建仓库（10 分钟）

```bash
# 本目录已经是仓库骨架；在 GitHub 上建远端并推送：
cd btchao-mono
gh repo create lovexw/btchao-mono --public --source=. --push
# （没有 gh 就在网页上建 btchao-mono，然后 git remote add origin … && git push -u origin main）
```

> 公开仓库即可，所有分站本来都是公开的。想先私有验证也行，Cloudflare Pages 支持私有仓库授权。

### 5.2 Phase 1 · 试点搬 btc-paper（30 分钟）

**第 1 步 · subtree 拉代码（保留历史）**

```bash
git subtree add --prefix=sites/paper https://github.com/lovexw/btc-paper.git main
git push
```

- 想保留 btc-paper 的全部提交历史 → 用上面原样命令；
- 想要干净的线性历史 → 加 `--squash`（旧仓库归档后历史仍可回溯）。
- `scripts/migrate-batch1.sh` 默认 `--squash`，两种都可以，选一种贯彻到底。

**第 2 步 · Cloudflare 新建 Pages 项目**

Dashboard → **Workers & Pages → Create application → Pages → Connect to Git** → 选 `lovexw/btchao-mono`：

| 设置项 | 值 | 说明 |
|---|---|---|
| Project name | `btchao-paper` | 命名规范 `btchao-<目录名>`，一眼对应 |
| Production branch | `main` | |
| Framework preset | None | |
| Build command | 留空 | 纯静态站不需要构建 |
| Build output directory | `/` | 相对 root directory |
| **Root directory** | `sites/paper` | ★ 核心：只构建这个子目录 |
| **Build watch paths** | `sites/paper/**` 换行 `shared/**` | ★ 核心：只有这些路径变了才重部署 |

Save and Deploy，等首次部署变绿（Success）。

**第 3 步 · 迁移自定义域名**

1. 打开**旧**的 btc-paper 对应 Pages 项目 → Custom domains → **Remove** `paper.btchao.com`；
2. 回**新**项目 btchao-paper → Custom domains → **Set up a custom domain** → 输入 `paper.btchao.com` → Activate；
3. DNS 记录在同一个 Cloudflare 账号区域内，会自动重建，通常 1 分钟内生效。

> 域名切换瞬间有秒级到分钟级的解析间隙，选低峰时段（比如清晨）做这一步。

**第 4 步 · 逐项验证（每站必过）**

- [ ] `https://paper.btchao.com` 打开 200，样式图片正常（DevTools Network 面板无 404）
- [ ] 核心交互点一遍（该站的翻页/搜索/计算/复制等功能）
- [ ] 本地改一个字 push，观察：**只有** btchao-paper 这个项目触发重部署，其他项目纹丝不动
- [ ] 旧 Pages 项目已移除域名并 **Disable**（不删除，留作回滚）
- [ ] 旧 GitHub 仓库 Settings → Archive 归档，description 改为 `♻️ 已迁移 → lovexw/btchao-mono/sites/paper`

### 5.3 Phase 2 · 批量搬其余站点（每个约 10 分钟）

```bash
./scripts/migrate-batch1.sh timeline yuyan   # 一次指定 2~3 个
```

然后对每个站重复 §5.2 的第 2~4 步。特殊站的处理：

- **btc-wiki（VitePress）**：Build command 填 `npm ci && npm run build`，Build output directory 填 `sites/wiki/.vitepress/dist`，其余相同。
- **bitcoin-flash-buy（TS 构建）**：Build command 填 `npm ci && npm run build`，output 按其构建配置（通常 `dist/`）。
- **ahr999-free / ahr-dca**：迁移完先确认旧仓库里有没有 `.github/workflows/` 定时任务在替它更新数据。有的话在 monorepo 里新建对应 workflow，用 `paths` 限定写入 `sites/ahr999/**`，cron 原样照抄。

## 6. 第三批 · Workers（二期再做）

Workers 不走 Pages，用 **GitHub Actions + wrangler**，monorepo 里按路径过滤触发：

```yaml
# .github/workflows/deploy-workers.yml
name: Deploy Workers
on:
  push:
    branches: [main]
jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      orderflow: ${{ steps.filter.outputs.orderflow }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            orderflow:
              - 'workers/orderflow/**'
  deploy-orderflow:
    needs: changes
    if: needs.changes.outputs.orderflow == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx wrangler deploy
        working-directory: workers/orderflow
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

配套动作：

1. 仓库 Settings → Secrets → 添加 `CLOUDFLARE_API_TOKEN`（权限模板：Account · Workers Scripts · Edit）；
2. `workers/orderflow/wrangler.jsonc` 里写清 `routes` / custom domains；
3. 首次部署若提示域名被旧 Worker 占用，先去 dashboard 给旧 Worker 解绑域名，再触发部署。

## 7. Phase 4 · 主站与收尾

1. 全部分站稳定运行 ≥ 2 周后，同法迁移 `sites/home` ← www.btchao.com（门面站最后动）；
2. 观察期结束后，清理旧 Pages 项目（Disable 的那些），GitHub 归档的仓库**永久保留**；
3. 主站卡片无需改动——卡片链接的是子域名，域名没变。

## 8. 统一风格方案（本次迁移的核心收益）

**机制：`shared/` 唯一真相源 + 各站 `btc-shared/` 本地副本 + 同步脚本**

1. `shared/` 存放 tokens.css（标准色板/组件）与 footer.js（统一页脚：免责声明 + 赞助 + 返回主站）；
2. `./scripts/sync-shared.sh` 把它们分发到每个站的部署目录（构建型站进 public/）；
3. 各站用相对路径引用 `btc-shared/…`，本地、pages.dev、正式域名全部零依赖；
4. **改统一风格 = 改 `shared/` → 跑同步脚本 → push**，所有站一次更新、各自自动重部署。

详细规范与全站实施记录见 [STYLE-GUIDE.md](STYLE-GUIDE.md) §6、§7。曾设计的 assets.btchao.com 外链方案降级为可选项（见 STYLE-GUIDE §6 说明）。`sites/_template/` 是已接入的标准脚手架。

## 9. 回滚方案

| 场景 | 动作 | 耗时 |
|---|---|---|
| 某个站迁移后异常 | 新项目 Remove 域名 → 旧项目（已 Disable 未删除）Add 回域名 | ~1 分钟 |
| 新 Pages 项目整体有问题 | 直接删除新项目，域名回旧项目 | ~1 分钟 |
| monorepo 里代码改坏了 | git revert，Pages 自动重部署 | 2~3 分钟 |
| 旧仓库 | 已 Archive，Unarchive 即可恢复一切 | ~1 分钟 |

## 10. 已知坑备忘

- **onekey-help-zh 550MB**，永不进 monorepo（§2）。
- **subtree add 不加 `--squash`** 会把旧仓库全部提交 merge 进主历史，`git log` 会变"杂"，但 `git log --follow sites/xxx` 仍可精确追溯某个站。
- **watch paths 语法**：每行一个 glob，`sites/paper/**`；填错的表现是"改了代码但不触发部署"。
- **目录名与子域名不一致**的（password ↔ pd），以映射表为准，不要现场发明。
- **Pages 免费版每月 500 次构建**：watch paths 隔离后 13 个站 + assets 的构建量远够用。
