# sites/etf — 美国现货比特币 ETF · 数据全景

> btchao.com 家族分站，Pages 项目 `btchao-etf`，当前访问地址：
> **https://btchao-etf.pages.dev**（正式域名 `etf.btchao.com` 待补 CNAME 后激活，见根目录 docs/MAINTENANCE.md §5）
>
> 迁自独立仓库 [lovexw/btc-etf-dashboard](https://github.com/lovexw/btc-etf-dashboard)，2026-09-28 并入 monorepo。

一个**零成本、无人值守**的美国现货比特币 ETF 数据面板：每日自动抓取持仓与资金流，
保留自 2024 年 1 月上市以来的完整历史，部署在 Cloudflare Pages 上。

## 页面内容

- **关键指标**：总持仓（BTC）、总市值、累计净流入、占 2100 万上限比例、BTC 价格、最新单日净流入
- **净流入统计条**：近 7 / 30 / 90 日、今年以来、上市以来的净流入（BTC 与折算美元）
- **总持仓走势**：自 2024-01 以来逐日持仓曲线（叠加 BTC 价格对照）+ 持仓恒等式
- **每日净流入 + 累计净流入**：1月 / 3月 / 6月 / 1年 / 全部 区间切换
- **月度净流入热力图**、**历史纪录与参照**（含「累计净买入 ÷ 同期矿工产出」）
- **持仓分布**（环形图 + 柱状图）、**各 ETF 持仓明细**、**近 10 日分基金净流入热力表**
- **实时增强**：页面加载后自动拉取实时 BTC 价格更新市值（静默降级）

## 目录结构（btchao-mono 内）

```
sites/etf/
├── index.html          页面（已接入 btc-shared 统一风格 + 统一页脚）
├── favicon.svg         官方标准 Logo（家族统一模板）
├── assets/style.css    站内样式（核心令牌重定向到 var(--btc-*)，品牌橙 #FF9900）
├── assets/app.js       渲染逻辑（ECharts 多 CDN 加载）
├── data/*.json         版本化数据（机器人提交，watch paths 罩住自动重部署）
├── btc-shared/         统一风格本地副本（scripts/sync-shared.sh 分发，勿手改）
└── scraper/update.mjs  抓取机器人（bitbo.io + Coinbase/Kraken/CoinGecko 三级降级）
```

## 数据更新

GitHub Actions workflow：`.github/workflows/update-etf.yml`
（每个美股交易日 UTC 22:30 / 次日 12:30 各跑一次，幂等写入 `sites/etf/data/`，
数据无变化自动跳过提交；也可在 Actions 页面手动 Run workflow）。

本地手动更新：

```bash
cd sites/etf/scraper
npm ci && node update.mjs   # 产出写入 ../data/
```

## 本地预览

```bash
cd sites/etf && python3 -m http.server 8080
# 打开 http://localhost:8080
```

## 数据口径

- 持仓与流水来自 Bitbo（其每日从各 ETF 官网同步披露数据），「累计净流入（BTC）」
  即逐日持仓变化之和，与当前总持仓精确衔接。
- 来源流水序列含周末发布的修订快照（均映射回前一交易日），因此同一交易日可能有多个
  分段行；净流入图按日聚合展示（流水求和、累计/价格取段末），横轴为交易日分类轴，
  非交易日不占位，数据文件保持来源原始快照。
- 「累计净流入（USD）」按每日收盘价将 BTC 流水折算，与媒体按成交时点换算的数字略有差异。
- 纯现货口径，与 CoinGlass 等平台的「总净资产」（常混入期货/混合策略 ETF）不同。
- 仅为公开数据聚合展示，不构成投资建议；请以各基金官方披露为准。
