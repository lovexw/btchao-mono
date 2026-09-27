# 🌅 醒后继续手册（2026-09-27 凌晨交接）

> **先回答你的问题"最后哪里有问题"**：没有技术故障。卡在最后一个验证环节——"Git 连接自动部署"必须在 Cloudflare 面板里点出来，而面板登录（Google SSO）和 GitHub 仓库授权都只能由你本人输入密码。我做到登录页为止，全部能自动化的部分已经做完了。
>
> **全程铁律已遵守**：没有动过任何线上域名、DNS、现有 Pages 项目。线上用户看到的和昨天一模一样。

---

## 一、当前状态快照

| 资源 | 位置 | 状态 |
|---|---|---|
| monorepo 仓库 | https://github.com/lovexw/btchao-mono | ✅ 已建，main 分支，13 个分站代码全部就位 |
| 试点测试站（直传型） | https://btchao-paper-test.pages.dev | ✅ 在线，内容与线上正式站逐字节一致 |
| 4 个根级 workflow | `.github/workflows/` | ✅ 已建好（见下文"自动化双轨"） |
| 统一风格资产 | `shared/`（tokens.css + footer.js） | ✅ 已完成，页脚用真实赞助地址 |
| 新站脚手架 | `sites/_template/` | ✅ |

**已验证的结论（不用再怀疑）：**
1. subtree 迁移机制正常，13 站内容完整。
2. 测试站与 paper.btchao.com 正式站逐字节一致（唯一差异是 Cloudflare 给正式域名注入的安全脚本，绑域名后自动出现，无需处理）。
3. 各站内部路径全部是相对引用，挂任何子域名根路径都不断链。
4. 三个构建型站**本地构建全部通过**：wiki（VitePress，17s）、flash-buy（Vite+TS，1.8s）、ma（Vite+React，5.8s）。

**已就位的自动化（重要）：**

| workflow | 频率 | 干什么 |
|---|---|---|
| `fetch-ahr999.yml` | 每 4 小时 | 拉 AHR999 指数 → `sites/ahr999/public/ahr999-data.json` |
| `update-btc-price-ahr-dca.yml` | 每天 01:00 | 更新 `sites/ahr-dca/` 的价格与指数数据 |
| `update-btc-price-ma.yml` | 每天 01:00 | 更新 `sites/ma/public/btc-price.csv`，失败自动开 issue |
| `validate-yuyan.yml` | push 时 | 校验 `sites/yuyan/data/predictions.json` |

> **双轨原理**：旧仓库（ahr999-free / ahr-dca / btc-ma-new）里的同名定时任务**仍在运行**，继续喂线上正式站；monorepo 里的新任务也在跑，提交进 monorepo。两边数据管道互不干扰。等域名切换完成、新站确认稳定后，再去旧仓库 Settings → Actions → Disable 所有 workflows（手册 §5）。

---

## 二、你现在要手动做的事（按顺序）

### 第 0 步 · 登录（2 分钟）

在 ZCode 内置浏览器里完成 Cloudflare 登录（那个停在 Google 账号选择的标签页）。
登录完告诉我"继续"，**§1～§3 的所有点击我可以替你做**；你也可以自己按下面的步骤点。

### 第 1 步 · 建 Git 连接试点项目（10 分钟，验证生产管线）

1. dash.cloudflare.com → **Workers & Pages → Create application → Pages → Connect to Git**
2. GitHub 授权：选择 `lovexw/btchao-mono`。
   ⚠️ 如果列表里没有它：说明 Cloudflare 的 GitHub App 是"仅选定仓库"模式，点进 GitHub App 设置把 `btchao-mono` 加进去（一次性动作）。
3. **Project name**：`btchao-paper`；**Production branch**：`main`
4. Build settings：
   - Framework preset：**None**
   - Build command：**留空**
   - Build output directory：`/`
   - **Root directory (advanced)**：`sites/paper` ← 核心
   - **Build watch paths (advanced)**：两行 —— `sites/paper/**` 和 `shared/**` ← 核心
5. Save and Deploy → 等首次部署变 ✅ Success
6. 验证：打开 `https://btchao-paper.pages.dev`，白皮书站完整、样式正常。

### 第 2 步 · 验证自动部署（5 分钟，生产管线的关键证明）

```bash
cd btchao-mono
echo "<!-- 测试自动部署 $(date +%H:%M) -->" >> sites/paper/index.html
git add -A && git commit -m "test: 验证 watch paths 自动部署" && git push
```

→ Cloudflare 的 btchao-paper 项目应在 1 分钟左右出现新部署。确认后：

```bash
git revert HEAD && git push
```

### 第 3 步 · 批量建其余项目（每站约 3 分钟，先全部不绑域名）

照第 1 步的流程重复，只有下表 4 个字段不同。**建议顺序 = 表格顺序**，建一个验证一个 pages.dev 能开。

| 项目名 | Root directory | Build command | Output directory |
|---|---|---|---|
| btchao-yuyan | `sites/yuyan` | 留空 | `/` |
| btchao-timeline | `sites/timeline` | 留空 | `/` |
| btchao-quantum | `sites/quantum` | 留空 | `/` |
| btchao-hold | `sites/hold` | 留空 | `/` |
| btchao-cold-wallet | `sites/cold-wallet` | 留空 | `/` |
| btchao-buy | `sites/buy` | 留空 | `/` |
| btchao-password | `sites/password` | 留空 | `/` |
| btchao-ma | `sites/ma` | `npm ci && npm run build` | `dist` |
| btchao-ahr999 | **`sites/ahr999/public`** | 留空 | `/` |
| btchao-ahr-dca | `sites/ahr-dca` | 留空 | `/` |
| btchao-wiki | `sites/wiki` | `npm ci && npm run build` | `docs/.vitepress/dist` |
| btchao-flash-buy | `sites/flash-buy` | `npm ci && npm run build` | `dist` |
| btchao-assets | `shared` | 留空 | `/` |

每站的 **Build watch paths 都是两行**：`sites/<目录名>/**` 和 `shared/**`（assets 项目只填 `shared/**`）。

> 注意两个特例：**ahr999 的站点根在 `public/` 子目录**；**ma 是 Vite 构建型**（之前以为是纯静态，已核实）。watch paths 一律写站点目录级（如 `sites/ahr999/**`），这样数据 workflow 提交 CSV/JSON 也会触发对应站重部署。

### 第 4 步 · 域名切换（低峰期做，逐站进行，全程分钟级）

对每个站（含 assets 绑 assets.btchao.com）：

1. 旧 Pages 项目 → Custom domains → **Remove** 该子域名
2. 新项目 → Custom domains → **Set up a custom domain** → 输入子域名 → Activate
3. 立即验证：https 打开正常、核心功能点一遍、页脚正常

**先切 1 个站（建议 paper，内容静态最安全）观察 1 天，再切其余。**

### 第 5 步 · 收尾（新站全部稳定 ≥ 3 天后）

- [ ] 旧仓库 Settings → Actions → Disable（停掉双轨）
- [ ] 旧仓库 Settings → Archive + description 改成 `♻️ 已迁移 → lovexw/btchao-mono/sites/<目录名>`
- [ ] 删除临时项目 `btchao-paper-test`
- [ ] 旧的 Disabled Pages 项目可以删除（**仓库永远不删**）

---

## 三、回滚（任何一步出问题）

| 场景 | 动作 | 耗时 |
|---|---|---|
| 某站切域名后异常 | 新项目 Remove 域名 → 旧项目 Add 回域名 | ~1 分钟 |
| 新项目构建反复失败 | 不管它，旧站还在正常服务（没切域名就无影响） | 0 |
| monorepo 代码改坏 | `git revert`，Pages 自动重部署 | 2~3 分钟 |

---

## 四、诚实清单（已知未验证 / 风险）

1. **Git 连接管线还没实测**——这是第 1、2 步要补的最后一环，测通后整个管线就没有未知数了。
2. **bip39.btchao.com 映射未定**（HAB-BIP39 vs bip39-offline）：迁移前打开两个仓库的 README 和线上站比对。确认后 `./scripts/migrate-batch1.sh` 里加一行即可（脚本里已留注释位）。
3. **log.btchao.com 映射未定**（touziriji vs dca-update）。注意 `dca-update` 也有每日 cron（`update-btc-price.yml`，北京时间 12:00），如果确认是它，迁移时要照 ahr999 的方式做 monorepo 适配。
4. **news.btchao.com**：btcnews 仓库**没有**任何 Actions 定时任务，"30 分钟刷新"大概率是前端定时拉 API——这对二期迁移是好消息，但切换前先在线上用 DevTools Network 确认数据源。
5. **GitHub Actions 免费额度**：公共仓库无限制；3 个 cron 每天合计 8 次运行，无压力。
6. **monorepo 体积**：当前 ~6MB（不含 node_modules），健康。onekey-help-zh（550MB）永不迁入。
7. 各站接入统一风格（tokens.css / footer.js）**不要急**，等 assets 站（btchao-assets）上线后按 [STYLE-GUIDE.md](STYLE-GUIDE.md) §6 逐站接入，接一个验一个。

---

## 五、进度打卡

做完一步就在这里打个勾，方便下次接着看：

- [ ] 第 0 步 登录 Cloudflare
- [ ] 第 1 步 btchao-paper（Git 连接）建好
- [ ] 第 2 步 自动部署验证通过
- [ ] 第 3 步 13 个项目全部建好
- [ ] 第 4 步 域名切换完成（__ 个站）
- [ ] 第 5 步 收尾（旧仓库归档 + 双轨退役）
