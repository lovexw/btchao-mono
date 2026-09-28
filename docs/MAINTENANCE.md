# 维护手册：部署触发规则 · 提交纪律 · 统一页脚配置 · 待办清单

> 写给站长本人与 AI 助手。**AI 在本仓库干活前，连本文件与根目录 AGENTS.md 一起读完再动手。**
> 断点时间：2026-09-28 · 下线 5 个分站（flash-buy/bip39/password/buy/cold-wallet），仓库与 Cloudflare 侧已清理（断点见 §6）。

## 1. 什么改动会触发多少站重建（核心规则）

规则一句话：**push 后，Cloudflare 看这次提交改了哪些文件路径，路径命中某个 Pages 项目的 Build watch paths，那个项目就重建。** 每个站的 watch paths 是两条：`sites/<自己>/**` + `shared/**`（在 CF Dashboard → 对应 Pages 项目 → Settings → Build & deployments 里可查可改）。

| 你动了什么 | 谁会重建 | 成本 |
|---|---|---|
| `sites/<某站>/**` 里任何文件 | 只有该站 | ~1 分钟 |
| `shared/**`（footer.js、styles/tokens.css） | **全部 13 个站** | 2~3 分钟；设计如此——统一风格一处改全站生效 |
| `docs/`、`scripts/`、根 `README.md`、`sites/_template/`、`.github/` | 谁也不重建 | 零 |
| `sites/brand/**` | 暂无（btchao-brand Pages 项目建好后才开始） | 零 |
| `sites/www/**` | 只有主站（main-btchao，watch paths 仅此一条，**不含 shared/\*\***） | ~1 分钟 |

## 2. 提交纪律（防止"一不小心全站重建"）

1. **提交前三看**：`git status` 看改了哪些文件 → `git diff --stat` 看改动分布在哪些目录 → 心算一遍"这些路径 × watch paths = 谁会重建"。
2. **单站任务只 add 该站**：`git add sites/paper && git commit`。**禁止把 `git add -A` 当日常习惯**——最常见的翻车就是 A 站的文案把 B/C 站的半成品一起带上线。
3. **半成品不提交**：用 `git stash` 收起来，或先只提交目标站。
4. **批量替换/脚本操作后必查清单**：跑完 `git status` 核对改动文件数和目录是否符合预期，再提交。
5. **改 `shared/**` 的完整流程**（确认这次值得全站部署再走）：
   ```
   改 shared/footer.js（或 styles/tokens.css）
   → ./scripts/sync-shared.sh        # 必跑！各站部署的是自己的 btc-shared/ 副本，不同步=白重建12站还上线旧页脚
   → git add -A && git commit && git push   # 这一步接受全站重建
   ```
6. **改统一页脚的公共结构/样式时**，把 `footer.js` 引用处的 `?v=` 递增（当前 v=2），防 webview 缓存。
7. **回滚预案**：`git revert <提交号> && git push`，Pages 自动重部署恢复。单站 ~1 分钟，全站 ~2~3 分钟。
8. **改坏只影响一个站的场景**：该站目录内的任何文件——放心实验，revert 即回。

## 3. 统一页脚速查（shared/footer.js v2）

结构自上而下四块：**品牌块**（官方 Logo + 站名 + 描述）→ **三张关联卡**（比特囤币主站 / GitHub 仓库 / 小吴乐意主页）→ **meta 行**（站点自定义）→ **版权/赞助行**（© + 赞助地址点击复制 + 二维码）。深浅色自适应（文字继承站点颜色 + 中性半透明表面 + 固定比特币橙），不依赖任何站的 CSS 变量。

**改哪一层去哪改**：

| 想改什么 | 改哪里 | 部署影响 |
|---|---|---|
| 某站的站名/描述/meta 行 | `sites/<站>/index.html` 里 footer.js 标签的 `data-*` | 只有该站 |
| 页脚公共样式/结构/新增配置项 | `shared/footer.js` → `./scripts/sync-shared.sh`，并递增各引用 `?v=` | 全站 |
| 赞助地址/二维码（全站） | `shared/footer.js` 顶部 DONATE 常量（或各站 `data-addr`/`data-qr` 覆盖） | 全站 |

**配置项**：`data-name`（站名）、`data-desc`（一句话描述）、`data-repo`（GitHub 仓库全名，先确认 `github.com/lovexw/<仓库名>` 存在）、`data-meta`（meta 行原始 HTML，缺省为免责声明）、`data-addr`/`data-qr`（赞助位覆盖）。

**各站当前配置总表**（逐站微调时对着这张表改，改完只 add 该站）：

| 站点目录 | data-name | data-desc（摘要） | data-repo | data-meta |
|---|---|---|---|---|
| paper | 比特币白皮书 | 中本聪 著 2008 · 小吴乐意 译 2026 | lovexw/btc-paper | 缺省免责 |
| timeline | 比特币大事记 | 值得被铭记的历史 | lovexw/btc-timeline | 数据来源·最后更新 2026年9月 |
| yuyan | 比特币预言收录 | 机构与分析师预测归档 | lovexw/btc-yuyan | 缺省免责 |
| quantum | 量子时代的比特币 | 从零到终局 | lovexw/btc-quantum-notes | CC BY-SA 4.0·仅供教育 |
| hold | 慢者生存 | 长期投资的第一性原理 | lovexw/hold.btchao.com | 缺省免责 |
| log | 比特币投资日记 | 市场观察与复盘 | lovexw/touziriji | 数据仅存本地·风险提示 |
| ahr999 | AHR999 指数 | 定投囤币指数·每日更新 | lovexw/ahr999-free | 缺省免责 |
| ahr-dca | AHR999 定投仪表盘 | 定投指数与回测工具 | lovexw/ahr-dca | 含 span#footer-updated 数据行（JS 填充，app.js 已加空值守卫） |
| ma | 比特币均线面板 | 多周期均线可视化 | lovexw/btc-ma-new | 缺省免责 |
| etf | 美国现货比特币 ETF | 持仓·市值·资金流·每日自动更新 | lovexw/btc-etf-dashboard | 含 span#footBuild 数据行（JS 填充，app.js 已加空值守卫） |
| wiki | BTC Wiki | 诚实的比特币中文百科 | lovexw/btc-wiki | 缺省免责（配置在 .vitepress/config.mts） |
| brand | 比特币品牌素材库 | 官方与社区品牌符号合集 | lovexw/bitcoin-brand-kit | Don't trust, verify·无隶属关系·MIT |
| _template | 新分站标题（示例） | 一句话价值主张 | lovexw（示例） | 缺省免责 |

## 4. 品牌资产约定

- **官方标准 Logo 唯一真相源**：`sites/brand/assets/logos/bitcoin.svg`（橙色圆 #F7931A + 白 ₿，Bitboy 公共领域版）。页脚内嵌的是它的副本，改 Logo 只改这里 + footer.js。
- **favicon 模板**：`sites/_template/favicon.svg`；新站建站直接复制。各站根目录 favicon.svg 均为它的副本（wiki 在 `docs/public/`，ahr999/ma 在 `public/`）。
- 页面内嵌的白色 ₿ 字形（B glyph）取自官方 Logo 的 B 路径，`fill="currentColor"` 随容器着色。

## 5. 待办清单（断点记录 · 2026-09-28）

### 部署侧（上线必做）
- [ ] **主站并入 mono 的最后一步（2026-09-28 代码侧已完成，等面板换绑）**：主站已 subtree 迁入 `sites/www` 并完成改版（去顶部标题、删 4 张死卡、三卡现代统一风 + 神秘暗号彩蛋）。剩余动作（只能面板操作，API 不支持改 Git 源）：
  - ① `main-btchao` → Settings → Builds & deployments → **Disconnect**，再 Connect 选 `lovexw/btchao-mono`，production branch `main`，Root directory `sites/www`，Build command 留空，output `/`；
  - ② 同页 Build watch paths 设为 `sites/www/**`（主站不用 shared，别照抄别的站）；
  - ③ 部署成功后线上核对：无「比特币导航」大标题、工具行三张暗色卡、暗号彩蛋可解锁（卡内输入，答对抖动反馈/新窗跳转）、导航卡 14 张无死链；
  - ④ 稳定后归档 `lovexw/www.btchao.com` 仓库（GitHub → Settings → Archive，保留历史）。
- [x] **etf 分站上线（2026-09-28 由 API 完成）**：`btchao-etf` 项目已建（Git 连接 lovexw/btchao-mono，root `sites/etf`），首次部署成功，当前访问地址 **https://btchao-etf.pages.dev**。**剩余三步**：
  - ① 面板给 btchao-etf 补设 Build watch paths（`sites/etf/**` + `shared/**`，与 §一点五·B 同一批动作）；
  - ② watch paths 设好后启用数据 cron：`gh api -X PUT /repos/lovexw/btchao-mono/actions/workflows/update-etf.yml/enable`（启用前站点数据停在迁移日，旧仓库 cron 仍在喂 btc-etf-dashboard.pages.dev）；
  - ③ 绑 `etf.btchao.com`：域名已加进项目（pending）。⚠️ 因 `*.btchao.com` 泛解析记录冲突，Pages 未能自动建记录，需手动补一条 **CNAME / etf / btchao-etf.pages.dev / 橙色云**，补完证书自动签发激活。
- [ ] **Cloudflare 建 btchao-brand 项目**：Root directory `sites/brand`，Build command 留空，watch paths `sites/brand/**`，绑定 `brand.btchao.com`（流程见 NEW-SITE-SOP §4-6）。建好前主站新卡片点进去是空域名
- [ ] push 部署完成后**线上逐站抽查**：favicon 是官方 Logo（无痕窗口）、页脚四块齐全、手机 375px 堆叠正常
- [ ] www.btchao.com 部署后检查：新卡片、新 favicon/icon PNG、og-image（主站自检流程见其仓库 AGENTS.md）
- [ ] **下线站收尾（2026-09-28 删除 5 站后遗留）**：
  - ① btchao.com zone 里 5 条残留解析记录待删：`get` / `bip39` / `pd` / `buy` / `cold-wallet`（Pages 项目已删，记录还指向已不存在的 pages.dev，API token 无 DNS 权限未自动清）；
  - ② xiaowuleyi.com zone 里 `password` 一条残留记录待删（旧 000-pd 项目带过的域名）；
  - ③ 主站死链（buy/bip39/cold-wallet/pd 的 4 张卡片 + 4 条 schema ListItem）**已在 mono 的 sites/www 版本中删除**（卡片连号重排 1-14，JSON-LD 同步），换绑部署后即从线上消失；主站快闪卡此前已删（www.btchao.com `07e694b`）。

### 内容侧（逐站微调，改哪只 add 哪）
- [ ] **过目 §3 配置总表**：各站 data-name / data-desc / data-meta 目前是初稿代拟，按自己口径逐站修订，只动各站 index.html
- [ ] hold 的「慢」/ quantum 的「⚛️」favicon 已统一为标准 Logo；想恢复主题图标从提交 `151a129` 取回旧版
- [ ] brand 站自身 favicon 是 Jonas Schnelli 3D 金币（与家族扁平标准 Logo 不同），是否统一待定

### 可选优化（审阅后决定，都是小事）
- [ ] `sites/paper/index.html` 末尾 `</html>` 后残留 watch-paths 测试注释，可清
- [ ] 各站旧版页脚的死 CSS（`.footer` 系列样式还在样式表里），下次大改时顺手清理
- [ ] `docs/HANDOFF.md` 里「15 站」计数已过时（现 16 分站含 brand），下次更新
- [ ] footer.js 公共改动需手动递增各引用 `?v=`，站点多了可考虑换成同步脚本自动打版本

## 6. git 断点（本轮流水的锚点）

| 仓库 | 提交 | 内容 | 前基线 |
|---|---|---|---|
| btchao-mono | 本次 feat 提交 | 主站并入 + 改版：subtree 迁入 sites/www（自 www.btchao.com `07e694b`）；删顶部「比特币导航」标题块、删 4 张死卡（重排 1-14 + JSON-LD 同步）、工具行三卡改现代统一风（家族橙标准：白卡+图标徽章+丝滑悬停）、新增神秘暗号彩蛋卡（SECRET_CODE/SECRET_URL 在 script.js 尾部常量）；styles/script 版本号 20260928b。**线上生效待面板换绑 main-btchao → btchao-mono（见 §5）** | `02d2795` |
| btchao-mono | 本次 chore 提交 | 下线 5 个分站：删 sites/flash-buy、sites/bip39、sites/password、sites/buy、sites/cold-wallet（69 文件）；Cloudflare 侧 10 个 Pages 项目（5 个 btchao-* 镜像 + 5 个旧项目）与 6 条自定义域名已删，btchao.com/xiaowuleyi.com 残留 DNS 待手动清（见 §5） | `a8458ad` |
| btchao-mono | 本次 feat 提交 | 新增 sites/etf 分站（迁自 btc-etf-dashboard：数据面板 + scraper + update-etf.yml cron；btchao-etf 项目已 API 建好并部署，域名 pending 待补 CNAME） | `e77b04f` |
| btchao-mono | `533f538` | 品牌统一：官方 Logo/favicon + sites/brand + 统一页脚 v2 + bip39 CSP 修复 | `151a129` |
| btchao-mono | 本次 docs 提交 | MAINTENANCE.md + AGENTS.md | `533f538` |
| www.btchao.com | `b10b44a` | brand 卡片 + 主站 Logo/图标/og-image 标准化 | `c9fe87a` |

回滚任一轮 = `git revert <提交号> && push`（不要 reset 已 push 的提交，Pages 依赖前向提交）。
