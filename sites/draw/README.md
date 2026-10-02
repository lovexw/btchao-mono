# sites/draw — BTC 开奖

从比特币区块哈希当摇奖机的开奖平台：**从区块哈希末尾往前收集 6 个数字（0-9，字母跳过）作为开奖号码**，每天北京时间 12:00 以上一区块为准开奖，滚动保留最近 15 期。

**线上地址**：<https://lottery.btchao.com>（备用：<https://btchao-draw.pages.dev>）

## 结构

```
index.html            页面（tokens 引 btc-shared，页脚用统一 footer.js）
assets/style.css      站点样式（组件层；设计令牌来自 btc-shared）
assets/app.js         前端逻辑（开奖展示 / 倒计时 / 查询 / 估算 / .ics 通知）
data/draws.json       开奖数据存档（update-draw.yml 每天北京时间 12:00 自动提交）
scripts/draw.mjs      开奖脚本：找 12:00 前最新区块（链上时间戳二分），计算号码
functions/api/        Cloudflare Pages Functions：/api/tip、/api/block/:height（链上数据同源代理）
```

## 每日流程（全自动）

北京时间 12:00 GitHub Actions（`.github/workflows/update-draw.yml`）开奖 → 数据提交本目录 → push 触发 `btchao-draw` Pages 项目（watch paths：`sites/draw/**` + `shared/**`）自动重新部署。前端另会并行从 GitHub raw / jsDelivr 拉最新数据兜底。

## 手动操作

```bash
node sites/draw/scripts/draw.mjs               # 开今天的奖（已开过则跳过）
node sites/draw/scripts/draw.mjs --backfill 15 # 回填最近 15 天
node sites/draw/scripts/draw.mjs --date 2026-10-01 --force # 重开指定日期
```

也可在 GitHub → Actions → Update draw data → Run workflow（`mode` 填 `backfill 15`）。

## 号码规则

哈希 `…1e70fbbc135a` → 从末尾往前收集数字：5、3、1、0、7、1 → 开奖号码 `531071`。开奖区块 = 北京时间 12:00 前挖出的最新区块（以链上时间戳为准）。三处实现保持一致：`scripts/draw.mjs`、`functions/api/block/[height].js`、`assets/app.js`。

## 本地开发

```bash
cd sites/draw && npx wrangler pages dev . --port 8788   # 含 Functions
```
