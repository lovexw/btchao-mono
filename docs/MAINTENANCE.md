# 维护手册：部署触发规则 · 提交纪律 · 统一页脚配置 · 待办清单

> 写给站长本人与 AI 助手。**AI 在本仓库干活前，连本文件与根目录 AGENTS.md 一起读完再动手。**
> 断点时间：2026-10-01 · 数据同步断链复盘 + 全站页脚仓库地址统一（断点见 §6）。

## 1. 什么改动会上线（核心规则 · 2026-10-01 修订）

**⚠️ 先说结论：本仓库的「push 自动触发 Pages 构建」链路在 Cloudflare 侧从未生效过**（自 2026-09-28 接入起，所有 `github:push` 触发的部署记录一律 `is_skipped: true`，从未真正构建；详见 §5 事件复盘）。所以现行上线机制是：

| 改动 | 怎么上线 |
|---|---|
| **数据分站**（ma / ahr999 / ahr-dca / etf / draw） | 数据 workflow 提交推送后，最后一步自动调 Cloudflare API 触发该站部署（需要 Secret `CLOUDFLARE_API_TOKEN`，配置见下）。**看门狗**（`pages-freshness-watchdog.yml`，每天北京时间 09:40）核对线上 vs 仓库，落后会自动补部署，补不回来开 issue 告警 |
| **其他分站内容改动** | push 不会自动上线。手动触发：CF Dashboard → 对应 Pages 项目 → Create deployment；或用有 Pages 编辑权限的令牌 `curl -X POST -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" -d '{}' "https://api.cloudflare.com/client/v4/accounts/edbcf0ec7c3ee185334d13d9077ef6e9/pages/projects/<项目名>/deployments"`（按 main 最新提交构建） |
| 配置了 `CLOUDFLARE_API_TOKEN` secret 后 | 上述手动步骤也可省——重跑 `Pages Freshness Watchdog` workflow，它发现落后会自愈 |

**Secret 配置（一次性，唯一手动步骤）**：CF Dashboard → My Profile → API Tokens → Create Token（权限：Account · Cloudflare Pages · Edit），然后 `gh secret set CLOUDFLARE_API_TOKEN -R lovexw/btchao-mono`（粘贴令牌回车）。数据 workflow 与看门狗都会自动用起来；不配也不报错，只是自动上线那步会跳过并留日志警告。

watch paths 语义照旧有效（未来 Cloudflare 修好 push 链路即自动恢复双保险），2026-10-01 已用 API 把 14 个项目全部重设为正确值：`sites/<自己>/**` + `shared/**`（例外：main-btchao 仅 `sites/www/**`；btchao-assets 仅 `shared/**`），查询命令 `GET /accounts/<acc>/pages/projects/<名>` 看 `source.config.path_includes`（此前文档说"不回显"有误，能查到）。

理想规则（push 链路恢复后自动生效）：**push 后，Cloudflare 看这次提交改了哪些文件路径，命中某个 Pages 项目的 Build watch paths 就重建**。

| 你动了什么 | 谁会重建 | 成本 |
|---|---|---|
| `sites/<某站>/**` 里任何文件 | 只有该站 | ~1 分钟 |
| `shared/**`（footer.js、styles/tokens.css） | **全部 13 个站** | 2~3 分钟；设计如此——统一风格一处改全站生效 |
| `docs/`、`scripts/`、根 `README.md`、`sites/_template/`、`.github/` | 谁也不重建 | 零 |
| `sites/brand/**` | btchao-brand | ~1 分钟 |
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

**配置项**：`data-name`（站名）、`data-desc`（一句话描述）、`data-repo`（GitHub 仓库全名；**2026-10-01 起站长要求全站统一 `lovexw/btchao-mono`**，新站默认照抄）、`data-meta`（meta 行原始 HTML，缺省为免责声明）、`data-addr`/`data-qr`（赞助位覆盖）。

**各站当前配置总表**（逐站微调时对着这张表改，改完只 add 该站）：

| 站点目录 | data-name | data-desc（摘要） | data-repo | data-meta |
|---|---|---|---|---|
| paper | 比特币白皮书 | 中本聪 著 2008 · 小吴乐意 译 2026 | lovexw/btchao-mono | 缺省免责 |
| timeline | 比特币大事记 | 值得被铭记的历史 | lovexw/btchao-mono | 数据来源·最后更新 2026年9月 |
| yuyan | 比特币预言收录 | 机构与分析师预测归档 | lovexw/btchao-mono | 缺省免责 |
| quantum | 量子时代的比特币 | 从零到终局 | lovexw/btchao-mono | CC BY-SA 4.0·仅供教育 |
| hold | 慢者生存 | 长期投资的第一性原理 | lovexw/btchao-mono | 缺省免责 |
| log | 比特币投资日记 | 市场观察与复盘 | lovexw/btchao-mono | 数据仅存本地·风险提示 |
| ahr999 | AHR999 指数 | 定投囤币指数·每日更新 | lovexw/btchao-mono | 缺省免责 |
| ahr-dca | AHR999 定投仪表盘 | 定投指数与回测工具 | lovexw/btchao-mono | 含 span#footer-updated 数据行（JS 填充，app.js 已加空值守卫） |
| ma | 比特币均线面板 | 多周期均线可视化 | lovexw/btchao-mono | 缺省免责 |
| etf | 美国现货比特币 ETF | 持仓·市值·资金流·每日自动更新 | lovexw/btchao-mono | 含 span#footBuild 数据行（JS 填充，app.js 已加空值守卫） |
| wiki | BTC Wiki | 诚实的比特币中文百科 | lovexw/btchao-mono | 缺省免责（配置在 .vitepress/config.mts） |
| brand | 比特币品牌素材库 | 官方与社区品牌符号合集 | lovexw/btchao-mono | Don't trust, verify·无隶属关系·MIT |
| draw | BTC 开奖 | 比特币区块哈希 · 每天北京时间 12:00 开奖 | lovexw/btchao-mono | 号码由算力决定·仅供娱乐 |
| _template | 新分站标题（示例） | 一句话价值主张 | lovexw/btchao-mono | 缺省免责 |

> 2026-10-01 已把各站 HTML 里 `data-repo` 及页面上硬编码的旧仓库链接（btc-paper / btc-timeline / btc-yuyan / btc-quantum-notes / hold.btchao.com / touziriji / ahr999-free / ahr-dca / btc-ma-new / btc-etf-dashboard / btc-wiki / bitcoin-brand-kit）全部替换为 `lovexw/btchao-mono`；wiki 顶部 socialLinks 本就指向 `btchao-mono/tree/main/sites/wiki`，保留。

## 4. 品牌资产约定

- **官方标准 Logo 唯一真相源**：`sites/brand/assets/logos/bitcoin.svg`（橙色圆 #F7931A + 白 ₿，Bitboy 公共领域版）。页脚内嵌的是它的副本，改 Logo 只改这里 + footer.js。
- **favicon 模板**：`sites/_template/favicon.svg`；新站建站直接复制。各站根目录 favicon.svg 均为它的副本（wiki 在 `docs/public/`，ahr999/ma 在 `public/`）。
- 页面内嵌的白色 ₿ 字形（B glyph）取自官方 Logo 的 B 路径，`fill="currentColor"` 随容器着色。

## 5. 待办清单（断点记录 · 2026-09-28）

### 部署侧（上线必做）
- [x] **⚠️⚠️ 数据同步断链事件完整复盘（2026-10-01 定案，替代下方 09-29 的旧结论）**：用户发现 ma/ahr999/etf 三站数据停在 09-29。逐层排查：workflow 抓数/提交全部正常（仓库 HEAD 数据一直最新）→ Cloudflare 部署记录全在 → **每一条 `github:push` 触发的部署都是 `is_skipped: true`、从未真正构建**（各阶段全 idle，单次部署专属 URL 404，生产别名一直挂在最后一次 ad_hoc 部署上）。三个铁证：① 该仓库从 09-28 接入起**没有任何一次 push 构建成功过**（含站长本人推的提交），09-29 重连 4 站后"恢复"是重连触发的 ad_hoc 首建带来的错觉；② watch paths 被清空为 `[]` 时 push 一律被跳过，经 API 重设为正确值并切换 deployments_enabled 后**依然全部 skipped**（对照：面板直连的 dca-update 项目 watch paths 为 `['*']`、bot push 天天构建成功）；③ API `POST /pages/projects/<名>/deployments`（ad_hoc，等价面板 Create deployment）可以稳定触发真实构建。**定案：push→构建链路对本仓库不可用（疑似 API 批量建站留下的残缺连接，无法经公共 API 修复）；现行机制 = 数据 workflow 推送后自触发部署 + 每日看门狗自愈/告警（见 §1）**。处置记录：14 个项目 watch paths 已全部经 API 重设为正确值；4 个数据站 10-01 已用 ad_hoc 补部署，线上数据恢复到当日；其余分站待内容改动时顺手 ad_hoc 部署即可。**若想彻底恢复 push 自动构建，唯一未验证的路子：面板里逐项目 Disconnect→Reconnect（非 API），修好后看门狗不会多花一分钟**——但 09-29 实测过一次无效，别抱期望。
- [x] **（09-29 旧记录，结论已被上面推翻）监视路径失效事件**：当时判断"重连即修"，实际重连只触发 ad_hoc 首建、push 链路依旧失效，且重连动作把 watch paths 清成了空（这是后来 push 全跳过的一部分成因）；"待重连的 9 站 + assets"无需再处理，按 §1 新机制上线即可。
- [ ] **一次性配置 `CLOUDFLARE_API_TOKEN` secret**（数据 workflow 自触发部署 + 看门狗自愈都靠它，未配置时只会跳过自动部署并留日志警告）：CF API Tokens 建一个 Account·Cloudflare Pages·Edit 令牌 → `gh secret set CLOUDFLARE_API_TOKEN -R lovexw/btchao-mono`。配完手动重跑一次 4 个数据 workflow 验证自触发部署生效。
- [x] **旧仓库 cron 下线 + 归档（2026-09-29 完成）**：禁用 ahr999-free / ahr-dca / btc-ma-new / btc-yuyan 四仓库的全部工作流；归档 15 个迁移来源旧仓库（btc-paper、btc-timeline、btc-yuyan、hold.btchao.com、use-cold-wallet、buybtc、random-password、HAB-BIP39、touziriji、ahr999-free、ahr-dca、btc-ma-new、btc-wiki、bitcoin-brand-kit、www.btchao.com）。注：btc-quantum-notes / btc-etf-dashboard 实际不存在（文档原名有误）。未动的独立项目：password-generator（仍在用）、btc-dashboard（主站数据源）。
- [x] **主站并入 mono（2026-09-28 全部完成）**：subtree 迁入 `sites/www` + 改版（去顶部标题、删 4 张死卡、三卡现代统一风 + 神秘暗号卡内输入彩蛋）；面板已换绑 `main-btchao` → `lovexw/btchao-mono`（Root directory `sites/www`，Build 留空，output `/`，watch paths `sites/www/**`），首部署 `9d1d9c0` 成功，线上核对通过（无大标题、新三卡、彩蛋可用、零死链）。注意：watch paths 在 Pages 项目 API 里不回显，属正常现象。
  - ④ 剩余：稳定观察几天后归档 `lovexw/www.btchao.com` 仓库（GitHub → Settings → Archive，保留历史）。
- [x] **etf 分站上线（2026-09-28 由 API 完成）**：`btchao-etf` 项目已建（Git 连接 lovexw/btchao-mono，root `sites/etf`），首次部署成功，当前访问地址 **https://btchao-etf.pages.dev**。**剩余三步**：
  - ① 面板给 btchao-etf 补设 Build watch paths（`sites/etf/**` + `shared/**`，与 §一点五·B 同一批动作）；
  - ② ~~启用数据 cron~~ ✅ 2026-09-29 已启用（同批启用 fetch-ahr999 / update-btc-price-ahr-dca / update-btc-price-ma，并手动触发回补；见下方"监视路径失效事件"）；
  - ③ 绑 `etf.btchao.com`：域名已加进项目（pending）。⚠️ 因 `*.btchao.com` 泛解析记录冲突，Pages 未能自动建记录，需手动补一条 **CNAME / etf / btchao-etf.pages.dev / 橙色云**，补完证书自动签发激活。
- [ ] **Cloudflare 建 btchao-brand 项目**：Root directory `sites/brand`，Build command 留空，watch paths `sites/brand/**`，绑定 `brand.btchao.com`（流程见 NEW-SITE-SOP §4-6）。建好前主站新卡片点进去是空域名
- [ ] push 部署完成后**线上逐站抽查**：favicon 是官方 Logo（无痕窗口）、页脚四块齐全、手机 375px 堆叠正常
- [ ] www.btchao.com 部署后检查：新卡片、新 favicon/icon PNG、og-image（主站自检流程见其仓库 AGENTS.md）
- [ ] **下线站收尾（2026-09-28 删除 5 站后遗留）**：
  - ① btchao.com zone 里 5 条残留解析记录待删：`get` / `bip39` / `pd` / `buy` / `cold-wallet`（Pages 项目已删，记录还指向已不存在的 pages.dev，API token 无 DNS 权限未自动清）；
  - ② xiaowuleyi.com zone 里 `password` 一条残留记录待删（旧 000-pd 项目带过的域名）；
  - ③ 主站死链（buy/bip39/cold-wallet/pd 的 4 张卡片 + 4 条 schema ListItem）已随换绑部署从线上消失（已核验）；主站快闪卡此前已删（www.btchao.com `07e694b`）。

- [x] **draw 分站上线（2026-10-02 由 API 完成）**：`btchao-draw` 项目已建（Git 连接 lovexw/btchao-mono，root `sites/draw`，watch paths `sites/draw/**` + `shared/**`——同 API 批量建站，push 链路同样不生效，按 §1 机制走自触发），域名 `lottery.btchao.com` 已绑并 active（同账号 zone 自动建 DNS）。数据 cron `update-draw.yml` 每天北京时间 12:00 开奖 → 提交 `sites/draw/data` → ad_hoc 自触发部署；看门狗已登记为第 5 个数据站。迁自 lovexw/btc-draw（已归档）。
- [x] 主站已加 draw 卡片（2026-10-02，card 15「BTC抽奖」骰子图标 + JSON-LD position 15，站长要求与 brand 卡区分 Logo；「新分站必须同步登记主站卡片」已固化进根 AGENTS.md 硬规则 10）。同批移除主站留言板：Waline 入口按钮/侧栏/CDN 引用/script.js 初始化/全部样式已清，css/js 版本号升 20261002a

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
| btchao-mono | 本次 ci 提交 | **数据同步断链修复**：4 个数据 workflow（ma/ahr999/etf/ahr-dca）增加「推送后自触发 Cloudflare Pages 部署」步骤（Secret `CLOUDFLARE_API_TOKEN`，未配置时优雅跳过）；新增 `pages-freshness-watchdog.yml` + `scripts/check_pages_freshness.py`（每日 09:40 核对 4 站线上 vs 仓库，落后自动补部署，补不回来自动开 issue）。Cloudflare 侧：14 个 Pages 项目 watch paths 经 API 重设为正确值；4 个数据站已 ad_hoc 补部署，线上数据恢复 | 86fcdd6 |
| btchao-mono | 本次 feat 提交 | **全站页脚仓库地址统一**：13 个分站 + _template 的 `data-repo` 及页面上硬编码旧仓库链接全部替换为 `lovexw/btchao-mono`（35 处 data-repo + ahr-dca/brand/yuyan/etf 页内链接），shared/footer.js 示例注释同步（sync-shared.sh 已跑，?v= 不变——纯注释无渲染影响）；MAINTENANCE §3 配置总表同步改 | 本轮 ci 提交 |
| btchao-mono | 本次 docs 提交 | MAINTENANCE.md：§1 部署规则按 2026-10-01 复盘重写（push 链路不可用 + 现行上线机制 + Secret 配置步骤）、§5 断链事件定案与 09-29 旧结论修正、§3 页脚表、本表 | 本次 feat 提交 |
| btchao-mono | 本次 feat 提交 | 主站并入 + 改版：subtree 迁入 sites/www（自 www.btchao.com `07e694b`）；删顶部「比特币导航」标题块、删 4 张死卡（重排 1-14 + JSON-LD 同步）、工具行三卡改现代统一风（家族橙标准：白卡+图标徽章+丝滑悬停）、新增神秘暗号彩蛋卡（SECRET_CODE/SECRET_URL 在 script.js 尾部常量）；styles/script 版本号 20260928d。**已上线：面板换绑完成，首部署 9d1d9c0，线上核对通过（2026-09-28）** | `02d2795` |
| btchao-mono | 本轮 ci 提交 | 数据管线修复：启用 4 个数据 cron（曾 disabled_manually）+ 推送竞态加固（rebase 模式）+ ahr-dca/ma 历史数据缺口回补至 09-28/29；配合面板重连 etf/ahr999/ahr-dca/ma 四项目，线上数据已恢复每日更新 | `0426258` |
| btchao-mono | 本次 chore 提交 | 下线 5 个分站：删 sites/flash-buy、sites/bip39、sites/password、sites/buy、sites/cold-wallet（69 文件）；Cloudflare 侧 10 个 Pages 项目（5 个 btchao-* 镜像 + 5 个旧项目）与 6 条自定义域名已删，btchao.com/xiaowuleyi.com 残留 DNS 待手动清（见 §5） | `a8458ad` |
| btchao-mono | 本次 feat 提交 | 新增 sites/etf 分站（迁自 btc-etf-dashboard：数据面板 + scraper + update-etf.yml cron；btchao-etf 项目已 API 建好并部署，域名 pending 待补 CNAME） | `e77b04f` |
| btchao-mono | 本次 feat 提交 | 新增 sites/draw 分站（迁自 btc-draw：开奖平台 + update-draw.yml cron；btchao-draw 项目 API 建好，lottery.btchao.com 已绑，旧仓库已归档） | `a8458ad` |
| btchao-mono | `533f538` | 品牌统一：官方 Logo/favicon + sites/brand + 统一页脚 v2 + bip39 CSP 修复 | `151a129` |
| btchao-mono | 本次 docs 提交 | MAINTENANCE.md + AGENTS.md | `533f538` |
| www.btchao.com | `b10b44a` | brand 卡片 + 主站 Logo/图标/og-image 标准化 | `c9fe87a` |

回滚任一轮 = `git revert <提交号> && push`（不要 reset 已 push 的提交，Pages 依赖前向提交）。
