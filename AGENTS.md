# AGENTS.md — btchao.com 主站开发与更新注意事项

> 本文件供 AI 助手与开发者阅读。**每次改动本站前，先完整读完这份文档再动手。**

## 项目概览

- 纯静态站：`index.html` + `styles.css` + `script.js`，无框架、无构建工具，部署在 Cloudflare Pages
- 同一账号下还有 `btc-dashboard`（db.btchao.com）等子站，主站部分指标依赖其 API（见下文）

## 每次更新必做清单（按顺序执行）

### 1. 改了 CSS/JS 就必须同步递增版本号

`index.html` 中两处引用带有缓存版本号参数：

```html
<link rel="stylesheet" href="styles.css?v=20260927a">
<script src="script.js?v=20260927a"></script>
```

**只要改了 `styles.css` 或 `script.js` 的内容，就必须把两处 `?v=` 同步更新**（建议格式 `YYYYMMDD`，同一天多次发布递增后缀 a/b/c…）。

为什么：微信、QQ 等 webview 以及部分浏览器缓存非常激进，虽然 `_headers` 已将 css/js 设为 `max-age=0, must-revalidate`，但版本号参数是绕开这类缓存最可靠的手段。历史上曾因 css/js 被设置一年强缓存（`immutable`），更新后老访客出现「新 HTML + 旧 CSS/JS」混搭、页面错位，必须强制刷新才恢复。**此问题已通过上述双保险修复，请勿把 `_headers` 中 css/js 的缓存策略改回长缓存/immutable。**

### 2. 部署后自检

- 无痕窗口（无缓存环境）打开线上站，普通刷新（非强制刷新）确认新样式/脚本已生效
- 至少检查 1280 / 768 / 375 三档宽度的排版
- 检查浏览器控制台无报错，行情条与指标条（恐惧贪婪 / 美元指数 / AHR999 / 减半倒计时）有数据

### 3. 导航卡片改动需同步三处

新增或调整导航卡片时，保持一致：

1. `index.html` 卡片区的注释编号（`<!-- 1. xxx -->` 顺序递增）
2. JSON-LD 结构化数据中的 `ItemList.itemListElement`（position 与名称）
3. 卡片描述文案与对应子站实际内容一致

### 4. 外部数据源约定（行情条 / 指标条）

原则：**优先国内可直连的数据源，必须有失败兜底，任何接口失败静默降级，绝不阻塞页面渲染**。

| 模块 | 主源 | 兜底 | 刷新 |
| --- | --- | --- | --- |
| BTC/CNY、BTC/USD 行情 | OKX → HTX → Gate → Binance | CoinGecko | 60s |
| USD/CNY 汇率 | open.er-api.com | 估算值 7.20 | 失败重试 |
| 恐惧贪婪指数 | api.alternative.me（跨域可用） | db.btchao.com/api/overview 的 `fgi` 字段 + localStorage 缓存 | 30min |
| 美元指数 DXY | 腾讯行情 qt.gtimg.cn（script 注入，返回 GBK 编码全局变量 `v_whUSDX`） | localStorage 缓存 | 60s |
| AHR999 + 减半倒计时 | db.btchao.com/api/overview（`valuation.ahr999`、`halving` 字段） | localStorage 缓存 | 10min |

- 腾讯行情接口返回的是「全局变量赋值」脚本而非 JSON，用 `<script>` 标签注入绕开跨域，`charset` 必须声明为 `gbk`
- **db.btchao.com/api/overview 由 `btc-dashboard` 项目（Cloudflare Pages Functions）提供**，若该项目的字段结构调整（如 `valuation.ahr999`、`halving.*`），必须同步修改本站 `script.js`
- localStorage 缓存 key 统一使用 `btchao_*_cache_v*` 命名；升级行为时递增 `_v` 后缀避免脏数据

### 5. 其它注意事项

- 「牛市顶点回归周期」面板的历史日期为硬编码常量（`script.js` 中的 `CYCLES`：2017-12-17 → 2020-12-01 回归、2021-11-10 → 2024-03-05 回归，日线公认口径；2025 顶点价格 $126,200 取 OKX 日线最高，与主站行情源一致）。若未来本周期重回前高、开启新周期，需在 `CYCLES` 中补上回归日期并追加新周期，同时复核轨道刻度 `CYCLE_SCALE_DAYS`（当前 1100 天）是否仍够用
- `sw.js`（Service Worker）历史上造成过「缓存不更新」，目前 `script.js` 中是**主动注销**逻辑，不要恢复注册，除非你完全清楚后果
- `_headers` 中 `/index.html` 与 `/sw.js` 必须保持 `max-age=0, must-revalidate`
- 页面在微信内打开会显示引导警告（`script.js` 顶部 mobileUtil），改动 DOM 结构时留意相关 id/class 不要误删
- 站点调性：面向比特币长期主义者（囤币党），新增内容保持克制、无注册登录、隐私优先（用户数据尽量只存本地）
