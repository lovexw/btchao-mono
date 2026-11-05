# sites/draw — BTC 开奖

从比特币区块哈希当摇奖机的开奖平台：**从区块哈希末尾往前收集 6 个数字（0-9，字母跳过）作为开奖号码**，每天北京时间 12:00 以上一区块为准开奖，首页滚动展示最近 15 期，全量记录归档供查询 API 使用。

**线上地址**：<https://lottery.btchao.com>（备用：<https://btchao-draw.pages.dev>）
**查询 API 文档**：[API.md](API.md)（会员系统对接看这个）

## 结构

```
index.html                    页面（tokens 引 btc-shared，页脚用统一 footer.js）
assets/style.css              站点样式（组件层；设计令牌来自 btc-shared）
assets/app.js                 前端逻辑（开奖展示 / 倒计时 / 查询 / 估算 / .ics 通知）
data/draws.json               最近 15 期（首页用；update-draw.yml 每天 12:00 自动提交）
data/draws-archive.json       全量归档（查询 API 的数据源，只增不删）
scripts/draw.mjs              开奖脚本：找 12:00 前最新区块（链上时间戳插值二分），计算号码
functions/_lib/draw-api.js    查询 API 的共用实现（Cloudflare 与甲骨文 Node 服务都跑这一份）
functions/api/                Pages Functions：/api/tip、/api/block/:height、/api/draws*、/api/meta
_routes.json                  只让 /api/* 走 Functions，静态资源不消耗调用额度
```

## 每日流程（全自动）

北京时间 12:00 GitHub Actions（`.github/workflows/update-draw.yml`）开奖 → 数据提交本目录 → workflow 自触发 `btchao-draw` Pages 部署（push 自动构建链路对本仓库不生效，机制见根 `docs/MAINTENANCE.md` §1；watch paths：`sites/draw/**` + `shared/**`）。前端另会并行从 GitHub raw / jsDelivr 拉最新数据兜底。

迁移到甲骨文后这条链路不变，只是 `deploy/sync.py` 每 2 分钟拉一次仓库、把 `data/` 挂给 `deploy/api` 的 Node 服务，Pages 部署降级为备份。

## 手动操作

```bash
node sites/draw/scripts/draw.mjs               # 开今天的奖（已开过则跳过）
node sites/draw/scripts/draw.mjs --backfill 90 # 回填最近 90 天（已有记录自动跳过，可反复跑到补齐）
node sites/draw/scripts/draw.mjs --date 2026-10-01 --force # 重开指定日期
```

也可在 GitHub → Actions → Update draw data → Run workflow（`mode` 填 `backfill 90`）。

`--backfill` 会从最新已知区块往回推，相邻两天大约差 144 块，每天只需约 10 次链上请求；每请求间隔 60ms 避免被上游限流。

## 号码规则

哈希 `…1e70fbbc135a` → 从末尾往前收集数字：5、3、1、0、7、1 → 开奖号码 `531071`。开奖区块 = 北京时间 12:00 前挖出的最新区块（以链上时间戳为准）。

四处实现必须一致：`scripts/draw.mjs`、`functions/api/block/[height].js`、`assets/app.js`、`deploy/api/server.js`。

## 本地开发

```bash
cd sites/draw && npx wrangler pages dev . --port 8788   # 含 Functions

# 或者用 Node 那份实现（等价）：
DRAW_DATA_DIR=sites/draw/data node deploy/api/server.js   # 默认 :8801
curl localhost:8801/api/draws/latest
```
