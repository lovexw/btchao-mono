/**
 * 美国现货比特币 ETF 数据抓取机器人
 *
 * 数据源（全部免费、无需 API key）：
 *  1. bitbo.io/treasuries/etf-flows/ —— 页面内嵌 Highcharts 数据：
 *     自 2024-01-12 以来每个交易日的全网净流入（BTC）。官方说明该序列
 *     即“ETF 持仓量的逐日变化”，因此可与持仓快照逐日衔接。
 *  2. bitbo.io/treasuries/us-etfs/  —— 当日持仓快照（各基金 BTC 数量、
 *     美元市值、占比），Bitbo 自述每日从各 ETF 官网同步。
 *  3. 日度 BTC 价格：CoinBase Exchange（首选，可分页取全量）→
 *     Kraken（720 天）→ CoinGecko（365 天，部分兜底），
 *     用于把 BTC 流水折算为美元并生成完整历史市值曲线。
 *
 * 输出（../data/，即 sites/etf/data/）：
 *  - summary.json  最新快照 + 关键指标
 *  - history.json  完整历史（每日净流入 BTC/USD、当日总持仓、累计净流入）
 *  - snapshots.json 持仓快照留档（按日期去重追加，用于审计与兜底）
 *  - status.json   各数据源健康状态（前端展示）
 *
 * 设计原则：任何单一数据源失败都不会破坏已有数据文件（原样保留），
 * 并在 status.json 中记录错误；只有“全部来源首次获取失败”才以非零码退出。
 */

import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const BITBO_FLOWS_URL = "https://bitbo.io/treasuries/etf-flows/";
const BITBO_HOLDINGS_URL = "https://bitbo.io/treasuries/us-etfs/";

const TICKER_ORDER = [
  "IBIT", "FBTC", "GBTC", "BTC", "BITB", "ARKB", "HODL", "MSBT",
  "BRRR", "EZBC", "BTCO", "BTCW", "DEFI",
];
const TICKER_NAME = {
  IBIT: "iShares Bitcoin Trust", FBTC: "Fidelity Wise Origin Bitcoin Fund",
  GBTC: "Grayscale Bitcoin Trust", BTC: "Grayscale Bitcoin Mini Trust",
  BITB: "Bitwise Bitcoin ETF", ARKB: "ARK 21Shares Bitcoin ETF",
  HODL: "VanEck Bitcoin ETF", MSBT: "Morgan Stanley Bitcoin Trust",
  BRRR: "CoinShares Bitcoin ETF", EZBC: "Franklin Bitcoin ETF",
  BTCO: "Invesco Galaxy Bitcoin ETF", BTCW: "WisdomTree Bitcoin Fund",
  DEFI: "Hashdex Bitcoin ETF",
};

const status = {
  generatedAt: null,
  sources: {
    bitboFlows: { ok: false, detail: "" },
    bitboHoldings: { ok: false, detail: "" },
    priceHistory: { ok: false, detail: "" },
    priceSpot: { ok: false, detail: "" },
  },
};

/* --------------------------- 分析指标 --------------------------- */

/**
 * 基于完整历史计算参考指标。
 * 口径：BTC 流水为 Bitbo「持仓逐日变化」；USD 按当日收盘价折算。
 */
function computeAnalytics(rows) {
  const sumBy = (arr, key) => arr.reduce((s, r) => s + (r[key] ?? 0), 0);
  const pack = (arr) => ({
    days: arr.length,
    btc: round2(sumBy(arr, "flowBtc")),
    usd: Math.round(sumBy(arr, "flowUsd")),
  });

  const stats = {
    d7: pack(rows.slice(-7)),
    d30: pack(rows.slice(-30)),
    d90: pack(rows.slice(-90)),
    ytd: pack(rows.filter((r) => r.date >= `${new Date().getUTCFullYear()}-01-01`)),
    inception: pack(rows),
  };

  // 当前连续净流入/流出天数（含今日，按交易日）
  let streak = { direction: 0, days: 0 };
  if (rows.length) {
    const sign = Math.sign(rows[rows.length - 1].flowBtc);
    let i = rows.length - 1;
    while (i >= 0 && Math.sign(rows[i].flowBtc) === sign) {
      streak.days++;
      i--;
    }
    streak = { direction: sign, days: streak.days };
  }

  // 最长连续净流入
  let bestIn = { days: 0, endDate: null };
  let run = 0;
  for (const r of rows) {
    if (r.flowBtc > 0) {
      run++;
      if (run > bestIn.days) bestIn = { days: run, endDate: r.date };
    } else run = 0;
  }

  const maxIn = rows.reduce((a, r) => (r.flowBtc > (a?.flowBtc ?? -Infinity) ? r : a), null);
  const maxOut = rows.reduce((a, r) => (r.flowBtc < (a?.flowBtc ?? Infinity) ? r : a), null);

  // 月度聚合
  const mMap = new Map();
  for (const r of rows) {
    const m = r.date.slice(0, 7);
    const cur = mMap.get(m) ?? { month: m, btc: 0, usd: 0 };
    cur.btc += r.flowBtc;
    cur.usd += r.flowUsd ?? 0;
    mMap.set(m, cur);
  }
  const monthly = [...mMap.values()]
    .map((m) => ({ month: m.month, btc: round2(m.btc), usd: Math.round(m.usd) }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // 同期矿工产出估算：全年无休，按日历天计；144 块/天；2024-04-20 第四次减半 6.25→3.125 BTC
  const HALVING = "2024-04-20";
  let issued = 0;
  if (rows.length) {
    for (
      let d = new Date(rows[0].date + "T00:00:00Z");
      d.toISOString().slice(0, 10) <= rows[rows.length - 1].date;
      d.setUTCDate(d.getUTCDate() + 1)
    ) {
      issued += (d.toISOString().slice(0, 10) < HALVING ? 6.25 : 3.125) * 144;
    }
  }

  return {
    stats,
    streak,
    records: {
      maxInflow: maxIn && { date: maxIn.date, btc: round2(maxIn.flowBtc), usd: maxIn.flowUsd },
      maxOutflow: maxOut && { date: maxOut.date, btc: round2(maxOut.flowBtc), usd: maxOut.flowUsd },
      longestInflowStreak: bestIn,
    },
    monthly,
    issuance: {
      estimated: Math.round(issued),
      note: "按 144 块/天、2024-04-20 减半后 3.125 BTC/块估算，仅作参照",
    },
  };
}

/* ----------------------------- 基础工具 ----------------------------- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url, { retries = 3, timeoutMs = 30_000, headers = {} } = {}) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      const res = await fetch(url, {
        headers: { "User-Agent": UA, Accept: "*/*", ...headers },
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      lastErr = e;
      if (i < retries - 1) await sleep(1500 * (i + 1));
    }
  }
  throw lastErr;
}

async function fetchJson(url, opts) {
  const t = await fetchText(url, opts);
  return JSON.parse(t);
}

/** 与 bitbo 页面内嵌 JS 完全一致的“前一交易日”变换 */
function prevBusinessDay(ms) {
  const d = new Date(ms);
  const day = d.getUTCDay(); // 0=Sun
  if (day === 0) d.setUTCDate(d.getUTCDate() - 2);
  else if (day === 1) d.setUTCDate(d.getUTCDate() - 3);
  else d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

const num = (s) => {
  if (s == null) return null;
  const v = parseFloat(String(s).replace(/[$,%\s,]/g, ""));
  return Number.isFinite(v) ? v : null;
};

async function readJson(file) {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, file), "utf8"));
  } catch {
    return null;
  }
}

async function writeIfChanged(file, data) {
  await mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, file);
  const next = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  let prev = null;
  try {
    prev = await readFile(target, "utf8");
  } catch {}
  if (prev === next) return false;
  const tmp = target + ".tmp";
  await writeFile(tmp, next);
  await rename(tmp, target);
  return true;
}

/* --------------------------- Bitbo：流水页 --------------------------- */

function parseFlowsPage(html) {
  // historyBtc 与 historyUsd 是页面上两个独立函数内的变量；
  // 用变量名做边界切分，避免吞进中间的 positiveHistoryBtc/negativeHistoryBtc 派生数组。
  const iBtc = html.indexOf("const historyBtc");
  const iUsd = html.indexOf("const historyUsd");
  if (iBtc < 0) throw new Error("historyBtc 序列未找到");
  const body = html.slice(iBtc, iUsd > iBtc ? iUsd : undefined);

  const recs = [];
  const re =
    /getPreviousBusinessDay\((\d{10,})\)\s*,\s*truncate\(\s*(-?[\d.]+)(?:\s*\*\s*[\d.]+)?\s*,\s*\d+\s*\)/g;
  let hit;
  while ((hit = re.exec(body))) {
    // historyBtc 区段内应为纯 BTC 值；若混入带 *price 的值则丢弃（防串段）
    if (hit[0].includes("*")) continue;
    recs.push({ date: prevBusinessDay(Number(hit[1])), flowBtc: parseFloat(hit[2]) });
  }
  if (recs.length < 100) throw new Error(`historyBtc 条目过少: ${recs.length}`);
  recs.sort((a, b) => a.date.localeCompare(b.date));

  // 近 10 日各基金每日变化表（BTC）
  const $ = cheerio.load(html);
  const recent = [];
  const table = $("table.stats-table").first();
  if (table.length) {
    const headers = table
      .find("tr")
      .first()
      .find("th,td")
      .map((_, el) => $(el).text().trim())
      .get();
    const tickers = headers.slice(1).filter((h) => TICKER_ORDER.includes(h));
    table.find("tr").slice(1).each((_, tr) => {
      const cells = $(tr).find("th,td");
      const d = parseLooseDate(cells.first().text());
      if (!d) return;
      const row = { date: d };
      tickers.forEach((t, i) => {
        row[t] = num(cells.eq(i + 1).text());
      });
      recent.push(row);
    });
  }
  recent.sort((a, b) => a.date.localeCompare(b.date));
  return { rows: recs, recent };
}

function parseLooseDate(s) {
  s = String(s).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const months = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ");
  const mo = (tok) => months.indexOf(tok.toLowerCase().slice(0, 3));
  const m1 = s.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (m1 && mo(m1[1]) >= 0) {
    return `${m1[3]}-${String(mo(m1[1]) + 1).padStart(2, "0")}-${String(m1[2]).padStart(2, "0")}`;
  }
  const m2 = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (m2 && mo(m2[2]) >= 0) {
    return `${m2[3]}-${String(mo(m2[2]) + 1).padStart(2, "0")}-${String(m2[1]).padStart(2, "0")}`;
  }
  return null;
}

/* --------------------------- Bitbo：持仓页 --------------------------- */

function parseHoldingsPage(html) {
  const $ = cheerio.load(html);
  const funds = [];
  $("tr").each((_, tr) => {
    const row = $(tr);
    const symTxt = row.find("td.td-symbol").first().text().trim();
    if (!symTxt) return;
    const ticker = symTxt.split(":")[0].trim().toUpperCase();
    if (!TICKER_ORDER.includes(ticker)) return;
    const btc = num(row.find("td.td-company_btc").first().text());
    const usd = num(row.find("td.td-value.usd-value").first().text());
    const pct = num(row.find("td.td-company_percent").first().text());
    const name = row.find("td.td-company").first().text().replace(/\s+/g, " ").trim();
    if (btc == null) return;
    funds.push({
      ticker,
      name: name || TICKER_NAME[ticker] || ticker,
      exchange: symTxt.includes(":") ? symTxt.split(":")[1].trim() : "",
      btc,
      usd: usd ?? null,
      pctOf21m: pct ?? null,
    });
  });
  if (funds.length < 10) throw new Error(`持仓明细行过少: ${funds.length}`);

  // 汇总块（"Entities / # of BTC / Value Today / % of 21m / Last Updated"）
  const label = (txt) => {
    let out = null;
    $("tr").each((_, tr) => {
      if (out != null) return;
      const th = $(tr).find("th").first().text().trim();
      if (th === txt) out = $(tr).find("td").first().text().trim();
    });
    return out;
  };
  const totalBtcLabeled = num(label("# of BTC"));
  const totalUsdLabeled = num(label("Value Today"));
  const pctLabeled = num(label("% of 21m"));
  const updatedTxt = label("Last Updated") || "";
  const asOf =
    parseLooseDate(
      updatedTxt.match(/[A-Za-z]+\s+\d{1,2},?\s+\d{4}/)?.[0] ??
        updatedTxt.match(/\d{1,2}\s+[A-Za-z]+\s+\d{4}/)?.[0] ??
        "",
    ) ?? null;

  const sumBtc = funds.reduce((s, f) => s + f.btc, 0);
  const totalBtc = totalBtcLabeled ?? sumBtc;
  const totalUsd = totalUsdLabeled ?? null;

  return {
    asOf,
    totalBtc,
    totalUsd,
    pctOf21m: pctLabeled,
    fundCount: funds.length,
    funds: funds.sort((a, b) => b.btc - a.btc),
    _consistency: totalBtcLabeled ? Math.abs(sumBtc - totalBtc) / totalBtc : 0,
  };
}

/* ------------------------------ 价格 ------------------------------ */

async function getPriceHistory() {
  // 1) Coinbase Exchange 日线（免费、无 key、可分页取全量，美国 IP 友好）
  try {
    const map = new Map();
    const startMs = new Date("2024-01-01T00:00:00Z").getTime();
    const nowMs = Date.now();
    const DAY = 86400_000;
    for (let s = startMs; s < nowMs; s += 280 * DAY) {
      const e = Math.min(s + 280 * DAY, nowMs);
      const url =
        `https://api.exchange.coinbase.com/products/BTC-USD/candles` +
        `?granularity=86400&start=${new Date(s).toISOString()}&end=${new Date(e).toISOString()}`;
      const arr = JSON.parse(await fetchText(url, { retries: 2 }));
      for (const c of arr) {
        map.set(new Date(c[0] * 1000).toISOString().slice(0, 10), c[4]);
      }
      await sleep(250);
    }
    if (map.size > 600) {
      status.sources.priceHistory = { ok: true, detail: `coinbase ${map.size} 天` };
      return { map, source: "coinbase" };
    }
    throw new Error(`coinbase 覆盖不足: ${map.size}`);
  } catch (e) {
    console.warn("[price] Coinbase 失败:", e.message);
  }
  // 2) Kraken 日线（最新 720 根，覆盖不全时仅作为兜底）
  try {
    const j = await fetchJson("https://api.kraken.com/0/public/OHLC?pair=XBTUSD&interval=1440", { retries: 2 });
    if (j?.error?.length === 0) {
      const map = new Map();
      const key = Object.keys(j.result).find((k) => k !== "last");
      for (const c of j.result[key]) {
        map.set(new Date(c[0] * 1000).toISOString().slice(0, 10), parseFloat(c[4]));
      }
      if (map.size > 600) {
        status.sources.priceHistory = { ok: true, detail: `kraken ${map.size} 天（近两年）` };
        return { map, source: "kraken" };
      }
    }
  } catch (e) {
    console.warn("[price] Kraken 失败:", e.message);
  }
  // 3) CoinGecko（免费层仅近 365 天）
  try {
    const j = await fetchJson(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily",
      { retries: 2 },
    );
    const map = new Map();
    for (const [ts, p] of j.prices) map.set(new Date(ts).toISOString().slice(0, 10), p);
    if (map.size > 300) {
      status.sources.priceHistory = { ok: true, detail: `coingecko ${map.size} 天（近一年）` };
      return { map, source: "coingecko" };
    }
  } catch (e) {
    console.warn("[price] CoinGecko 失败:", e.message);
  }
  status.sources.priceHistory = { ok: false, detail: "全部价格源失败" };
  return { map: new Map(), source: null };
}

async function getSpotPrice() {
  try {
    const j = await fetchJson("https://api.exchange.coinbase.com/products/BTC-USD/ticker", { retries: 2 });
    const p = parseFloat(j.price);
    if (p > 1000) {
      status.sources.priceSpot = { ok: true, detail: "coinbase" };
      return p;
    }
  } catch {}
  try {
    const j = await fetchJson("https://api.kraken.com/0/public/Ticker?pair=XBTUSD", { retries: 2 });
    const key = Object.keys(j.result)[0];
    const p = parseFloat(j.result[key].c[0]);
    if (p > 1000) {
      status.sources.priceSpot = { ok: true, detail: "kraken" };
      return p;
    }
  } catch {}
  status.sources.priceSpot = { ok: false, detail: "不可用，使用快照价格" };
  return null;
}

/* ------------------------------ 主流程 ------------------------------ */

function validateHoldings(h) {
  if (!(h.totalBtc > 800_000 && h.totalBtc < 2_500_000)) throw new Error(`总持仓异常: ${h.totalBtc}`);
  if (h.totalUsd != null && !(h.totalUsd > 10e9 && h.totalUsd < 600e9))
    throw new Error(`总市值异常: ${h.totalUsd}`);
  if (h._consistency > 0.02) throw new Error(`明细加总与总数偏差 ${(h._consistency * 100).toFixed(1)}%`);
}

async function main() {
  const nowIso = new Date().toISOString();
  status.generatedAt = nowIso;
  console.log("== 美国现货比特币 ETF 数据更新 ==", nowIso);

  const prevSummary = await readJson("summary.json");
  const prevSnapshots = (await readJson("snapshots.json"))?.snapshots ?? [];

  /* 1. 持仓快照 */
  let holdings = null;
  try {
    const html = await fetchText(BITBO_HOLDINGS_URL);
    holdings = parseHoldingsPage(html);
    validateHoldings(holdings);
    status.sources.bitboHoldings = {
      ok: true,
      detail: `${holdings.fundCount} 只基金, asOf ${holdings.asOf ?? "n/a"}`,
    };
  } catch (e) {
    status.sources.bitboHoldings = { ok: false, detail: e.message };
    console.error("[holdings] 解析失败:", e.message);
  }

  /* 2. 历史流水 */
  let flows = null;
  try {
    const html = await fetchText(BITBO_FLOWS_URL);
    flows = parseFlowsPage(html);
    const last = flows.rows[flows.rows.length - 1];
    const ageDays = (Date.now() - new Date(last.date + "T00:00:00Z")) / 86400000;
    if (ageDays > 7) throw new Error(`流水最新日期过旧: ${last.date}`);
    status.sources.bitboFlows = { ok: true, detail: `${flows.rows.length} 个交易日, 至 ${last.date}` };
  } catch (e) {
    status.sources.bitboFlows = { ok: false, detail: e.message };
    console.error("[flows] 解析失败:", e.message);
  }

  if (!holdings && !flows) {
    await writeIfChanged("status.json", status);
    if (prevSummary) {
      console.error("全部来源失败，但已有历史数据，保留原样。");
      process.exit(0);
    }
    console.error("全部来源失败且无历史数据。");
    process.exit(1);
  }

  /* 3. 快照留档（兜底锚点：若当日持仓页失败，沿用最近一次快照） */
  if (holdings) {
    const snapDate = holdings.asOf ?? new Date().toISOString().slice(0, 10);
    const filtered = prevSnapshots.filter((s) => s.asOf !== snapDate);
    filtered.push({
      asOf: snapDate,
      fetchedAt: nowIso,
      totalBtc: holdings.totalBtc,
      totalUsd: holdings.totalUsd,
      funds: holdings.funds.map((f) => ({ ticker: f.ticker, btc: f.btc })),
    });
    filtered.sort((a, b) => a.asOf.localeCompare(b.asOf));
    await writeIfChanged("snapshots.json", {
      note: "bitbo.io/treasuries/us-etfs 每日快照留档（按数据日期去重）",
      snapshots: filtered.slice(-400),
    });
  } else if (prevSnapshots.length) {
    const last = prevSnapshots[prevSnapshots.length - 1];
    holdings = {
      asOf: last.asOf,
      totalBtc: last.totalBtc,
      totalUsd: last.totalUsd,
      pctOf21m: null,
      fundCount: last.funds.length,
      funds: last.funds.map((f) => ({
        ticker: f.ticker,
        name: TICKER_NAME[f.ticker] ?? f.ticker,
        exchange: "",
        btc: f.btc,
        usd: null,
        pctOf21m: null,
      })),
      _consistency: 0,
      _stale: true,
    };
    console.warn(`[holdings] 使用留档快照 ${last.asOf}`);
  }

  /* 4. 价格（历史日线 + 实时） */
  const [{ map: priceMap }, spot] = await Promise.all([getPriceHistory(), getSpotPrice()]);

  /* 5. 组装完整历史：流水 + 逐日折算市值 + 由快照反推的历史总持仓 */
  let historyOk = false;
  if (flows) {
    const rows = flows.rows.slice().sort((a, b) => a.date.localeCompare(b.date));
    const anchorBtc = holdings.totalBtc;
    // 反推：holdings[i] = holdings[i+1] - flow[i+1]（流水即持仓变化）
    const holdingsSeries = new Array(rows.length);
    holdingsSeries[rows.length - 1] = anchorBtc;
    for (let i = rows.length - 2; i >= 0; i--) {
      holdingsSeries[i] = holdingsSeries[i + 1] - rows[i + 1].flowBtc;
    }
    // 价格覆盖率校验
    let missing = 0;
    for (const r of rows) if (!priceMap.has(r.date) && !priceMap.has(nearestPrev(priceMap, r.date))) missing++;
    if (missing / rows.length > 0.05) {
      console.warn(`[price] 覆盖不足，缺 ${missing}/${rows.length} 天，USD 列将有空洞`);
    }
    let cumBtc = 0;
    let cumUsd = 0;
    const out = rows.map((r, i) => {
      const price = priceMap.get(r.date) ?? priceMap.get(nearestPrev(priceMap, r.date)) ?? null;
      const flowUsd = price != null ? r.flowBtc * price : null;
      cumBtc += r.flowBtc;
      if (flowUsd != null) cumUsd += flowUsd;
      const holdingsBtc = Math.round(holdingsSeries[i] * 10) / 10;
      return {
        date: r.date,
        flowBtc: round2(r.flowBtc),
        flowUsd: flowUsd != null ? Math.round(flowUsd) : null,
        price: price != null ? round2(price) : null,
        holdingsBtc,
        holdingsUsd: price != null ? Math.round(holdingsBtc * price) : null,
        cumFlowBtc: Math.round(cumBtc * 10) / 10,
        cumFlowUsd: Math.round(cumUsd),
      };
    });
    // 校验：期初持仓应接近 ETF 上市时的种子规模（约 40-90 万枚）
    const first = out[0].holdingsBtc;
    if (!(first > 400_000 && first < 900_000)) {
      throw new Error(`反推期初持仓异常: ${first}`);
    }
    const written = await writeIfChanged("history.json", {
      generatedAt: nowIso,
      source: "bitbo.io/treasuries/etf-flows（每日净流入=ETF持仓逐日变化）",
      priceSource: status.sources.priceHistory.detail,
      rows: out,
    });
    console.log(`[history] ${out.length} 个交易日${written ? "（已更新）" : "（无变化）"}`);
    historyOk = true;
  }

  /* 6. 分基金逐日流水持久化（随时间积累出分基金完整历史） */
  let fundFlowCoverage = 0;
  if (flows?.recent?.length) {
    const prevFF = (await readJson("fundflows.json"))?.rows ?? [];
    const byDate = new Map(prevFF.map((r) => [r.date, r]));
    for (const row of flows.recent) {
      const cur = byDate.get(row.date) ?? { date: row.date };
      for (const [k, v] of Object.entries(row)) {
        if (k !== "date" && v != null) cur[k] = v;
      }
      byDate.set(row.date, cur);
    }
    const merged = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
    fundFlowCoverage = merged.length;
    await writeIfChanged("fundflows.json", {
      note: "各基金每日净流入（BTC），自部署日起由机器人逐日积累",
      rows: merged,
    });
  }

  /* 7. 汇总快照 + 分析指标 */
  const lastFlow = flows?.rows[flows.rows.length - 1];
  const livePrice = spot ?? (holdings.totalUsd ? holdings.totalUsd / holdings.totalBtc : null);
  const cumFromHistory = flows ? flows.rows.reduce((s, r) => s + r.flowBtc, 0) : null;
  const analytics =
    flows && historyOk
      ? computeAnalytics(
          (await readJson("history.json"))?.rows ?? flows.rows.map((r) => ({ ...r, flowUsd: null })),
        )
      : null;
  const summary = {
    generatedAt: nowIso,
    btcPrice: {
      usd: spot ?? null,
      snapshotUsd: livePrice != null ? round2(livePrice) : null,
      source: status.sources.priceSpot.detail,
    },
    holdings: {
      asOf: holdings.asOf,
      stale: !!holdings._stale,
      totalBtc: holdings.totalBtc,
      totalUsdSnapshot: holdings.totalUsd,
      totalUsdLive: livePrice != null ? Math.round(holdings.totalBtc * livePrice) : null,
      pctOf21m: holdings.pctOf21m,
      fundCount: holdings.fundCount,
      funds: holdings.funds,
    },
    netFlow: {
      cumulativeBtc: cumFromHistory != null ? Math.round(cumFromHistory * 10) / 10 : null,
      latestDate: lastFlow?.date ?? null,
      latestBtc: lastFlow ? round2(lastFlow.flowBtc) : null,
    },
    recent: flows?.recent ?? [],
    analytics,
    dataOk: { history: historyOk, holdings: status.sources.bitboHoldings.ok },
  };
  await writeIfChanged("summary.json", summary);
  await writeIfChanged("status.json", status);

  console.log(
    `[summary] 持仓 ${holdings.totalBtc.toLocaleString()} BTC | 快照市值 ${
      holdings.totalUsd ? "$" + (holdings.totalUsd / 1e9).toFixed(2) + "B" : "n/a"
    } | 累计净流入 ${cumFromHistory?.toLocaleString()} BTC | 分基金流水 ${fundFlowCoverage} 天`,
  );
}

function round2(v) {
  return Math.round(v * 100) / 100;
}

function nearestPrev(map, date) {
  // 找 date 之前最近的一个有价格的日期（最多回看 7 天）
  let d = new Date(date + "T00:00:00Z");
  for (let i = 1; i <= 7; i++) {
    d.setUTCDate(d.getUTCDate() - 1);
    const k = d.toISOString().slice(0, 10);
    if (map.has(k)) return k;
  }
  return null;
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
