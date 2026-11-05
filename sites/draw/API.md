# BTC 开奖 · 查询 API

给会员系统 / 机器人 / 自己的脚本用的只读接口，全部返回 JSON，不需要登录。

- **生产地址**：`https://lottery.btchao.com`
- **接口版本**：`1.0.0`（响应里的 `api_version`，加字段不算破坏兼容）
- **数据来源**：`data/draws-archive.json`（全量归档）∪ `data/draws.json`（最近 15 期）

## 三条约定

1. **期号 `period` = 北京日期去掉横线**，`2026-11-04` → `20261104`，永不复用。日期和期号两种写法接口都收。
2. **开奖号码 `number` 是 6 位字符串**，可能是 `099423` 这种带前导 0 的，**不要当数字解析**（会被吃掉前导 0）。
3. **时间是 UTC ISO 字符串**（`2026-11-04T03:47:44.000Z`），另给一个 `time_bj` 便于直接展示。

## 接口一览

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/meta` | 规则、总期数、最新/最早期、下期开奖时间、接口清单 |
| GET | `/api/draws` | 开奖列表，支持分页与日期区间 |
| GET | `/api/draws/latest` | 最新一期 + 下一期开奖时间 |
| GET | `/api/draws/{period\|date}` | 单期详情，如 `/api/draws/20261104` |
| GET | `/api/draws/check?number=502105` | 核对号码是否中奖 |
| GET | `/api/block/{height}` | 任意区块高度对应的开奖号码（链上实时算） |
| GET | `/api/tip` | 当前最新区块高度（纯文本） |

所有响应都带 `access-control-allow-origin: *`，浏览器里可直接调。

## 通用结构

成功：

```json
{ "ok": true, "api_version": "1.0.0", "data": { ... } }
```

失败（HTTP 状态码同时给出）：

```json
{ "ok": false, "api_version": "1.0.0", "error": { "code": "bad_request", "message": "number 必须是 6 位数字（保留前导 0）" } }
```

`code` 取值：`bad_request`(400) / `unauthorized`(401) / `not_found`(404) / `method_not_allowed`(405) / `internal`(500)。

只支持 `GET`（`HEAD` 也行，只回头不回包）。不认识的 `/api/*` 路径同样是上面的 JSON 404，不会掉到站点首页去。

### 单期对象

```json
{
  "period": "20261104",
  "date": "2026-11-04",
  "number": "502105",
  "height": 974472,
  "hash": "00000000000000000001e57ee43df1c46f23e5136c73d2611571aa50fc1b2d05",
  "time": "2026-11-04T03:47:44.000Z",
  "time_bj": "2026-11-04 11:47",
  "explorer": "https://mempool.space/zh/block/00000000000000000001e5..."
}
```

`hash` 是开奖区块的哈希，号码由它推出来，任何人可以拿 `explorer` 那条链接到链上自己核对 —— 这是这套开奖「不可暗箱」的依据。

## GET /api/meta

```bash
curl https://lottery.btchao.com/api/meta
```

```json
{
  "ok": true,
  "api_version": "1.0.0",
  "data": {
    "rule": "开奖号码 = 从开奖区块哈希末尾往前收集 6 个数字…",
    "total": 92,
    "first": { "period": "20260806", "date": "2026-08-06", "number": "..." },
    "last": { "period": "20261105", "date": "2026-11-05", "number": "637364" },
    "next": {
      "period": "20261106",
      "date": "2026-11-06",
      "at": "2026-11-06T12:00:00+08:00",
      "at_unix": 1762401600,
      "seconds_left": 42123
    },
    "updated_at": "2026-11-05T14:02:05.858Z",
    "endpoints": [ ... ]
  }
}
```

## GET /api/draws

| 参数 | 默认 | 说明 |
|---|---|---|
| `limit` | 20 | 每页条数，1–200 |
| `offset` | 0 | 跳过条数 |
| `from` | — | 起始日期 `YYYY-MM-DD`（含当天） |
| `to` | — | 结束日期 `YYYY-MM-DD`（含当天） |
| `order` | `desc` | `desc` 新→旧，`asc` 旧→新 |

```bash
curl "https://lottery.btchao.com/api/draws?limit=2&from=2026-11-01"
```

```json
{
  "ok": true,
  "api_version": "1.0.0",
  "data": {
    "total": 4,
    "limit": 2,
    "offset": 0,
    "order": "desc",
    "updated_at": "2026-11-05T14:02:05.858Z",
    "draws": [
      { "period": "20261105", "date": "2026-11-05", "number": "637364", "height": 974620, ... },
      { "period": "20261104", "date": "2026-11-04", "number": "502105", "height": 974472, ... }
    ]
  }
}
```

`total` 是**过滤后**的总条数，翻页用它算页数。

## GET /api/draws/latest

最新一期 + 下一期，页面右上角倒计时就是拿这两个字段算的。

```json
{
  "ok": true,
  "api_version": "1.0.0",
  "data": {
    "latest": { "period": "20261105", "number": "637364", ... },
    "next": { "period": "20261106", "at_unix": 1762401600, "seconds_left": 42123, ... },
    "total": 92,
    "updated_at": "..."
  }
}
```

同一期还没开出来之前（北京时间 12:00 前），`latest` 仍然是昨天那期。

## GET /api/draws/{period|date}

```bash
curl https://lottery.btchao.com/api/draws/20261104
curl https://lottery.btchao.com/api/draws/2026-11-04   # 等价
```

```json
{ "ok": true, "api_version": "1.0.0", "data": { "draw": { "period": "20261104", "number": "502105", ... } } }
```

没有这期就是 404（`code: "not_found"`）。

## GET /api/draws/check

核对会员号码。不传日期默认核对最新一期。

| 参数 | 必填 | 说明 |
|---|---|---|
| `number` | 是 | 6 位数字，保留前导 0 |
| `date` / `period` | 否 | 指定核对哪一期 |

```bash
curl "https://lottery.btchao.com/api/draws/check?number=502105&date=2026-11-04"
```

```json
{
  "ok": true,
  "api_version": "1.0.0",
  "data": {
    "number": "502105",
    "matched": true,
    "leading_match": 6,
    "trailing_match": 6,
    "draw": { "period": "20261104", "number": "502105", ... }
  }
}
```

- `matched`：完全一致（一等奖）
- `leading_match`：从前往后连续相同的位数（做「前 3 位」这类阶梯奖用）
- `trailing_match`：从后往前连续相同的位数

## GET /api/block/{height}

链上实时算，用于「这个区块会开出什么号」的验证；区块还没挖出来时返回 `pending`。

```bash
curl https://lottery.btchao.com/api/block/974472
```

```json
{ "status": "mined", "height": 974472, "hash": "000000...d05", "time": 1762230464, "number": "502105" }
```

注意这条的 `time` 是**秒级 Unix 时间戳**（历史原因，与上面几个接口的 ISO 字符串不同），`status` 为 `pending` 时没有 `hash`/`number`。

## 会员系统集成

最小可用流程：

1. 开奖前用 `/api/draws/latest` 的 `next.period` 记下当期期号，把会员号码存到你自己的库（btchao 不保存任何投注数据）。
2. 每天北京时间 12:05 之后拉 `/api/draws/latest`，如果 `latest.period` 已经是当期，就拿 `number` 去比对你库里的号码。
3. 展示历史用 `/api/draws?limit=20`。

Node / 浏览器：

```js
const res = await fetch('https://lottery.btchao.com/api/draws/latest');
const { data } = await res.json();
const draw = data.latest;

const mine = await db.tickets.findMany({ period: draw.period });
const winners = mine.filter((t) => t.number === draw.number); // number 两边都当字符串
```

PHP：

```php
$json = json_decode(file_get_contents('https://lottery.btchao.com/api/draws/20261104'), true);
$winning = $json['data']['draw']['number'];
if (str_pad($memberNumber, 6, '0', STR_PAD_LEFT) === $winning) { /* 中奖 */ }
```

Python：

```python
import requests
d = requests.get('https://lottery.btchao.com/api/draws/latest', timeout=10).json()['data']
winning = d['latest']['number']          # 字符串！'099423'
```

### 缓存与限流

- 列表 / 单期：`Cache-Control: public, max-age=60`，服务端也有同样的缓存，正常调用不会打穿上游。
- 数据每天北京时间 12:00 更新一次，**不要高频轮询**；每 5 分钟拉一次足够了。
- 需要防盗刷的话，部署端可以设 `DRAW_API_KEY`，之后所有 `/api/draws*`、`/api/meta` 都要带 `X-API-Key: <key>`（`/api/tip`、`/api/block/:height` 不受影响）。

## 数据从哪来

| 位置 | 内容 | 谁维护 |
|---|---|---|
| `data/draws-archive.json` | 全量归档（当前约 90 期，逐日增长） | `scripts/draw.mjs` 每天 12:00 由 Actions 写入 |
| `data/draws.json` | 最近 15 期，首页用 | 同上 |
| 链上 | 区块哈希与时间戳 | 比特币网络，最终依据 |

号码规则在 `scripts/draw.mjs`、`functions/api/block/[height].js`、`assets/app.js`、`deploy/api/server.js`、`functions/_lib/draw-api.js` 里是同一套实现，任一处改动都要同步跑 `node sites/draw/scripts/draw.mjs --date <最近一期> --force` 复核历史值有没有变。
