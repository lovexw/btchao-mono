/* 美国现货比特币 ETF · 数据全景
   纯静态前端：读取同目录 data/*.json 渲染 KPI、图表与明细表 */

"use strict";

/* ---------------- ECharts 多 CDN 加载 ---------------- */
const ECHART_SOURCES = [
  "https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js",
  "https://cdn.bootcdn.net/ajax/libs/echarts/5.5.1/echarts.min.js",
  "https://unpkg.com/echarts@5.5.1/dist/echarts.min.js",
];
function loadECharts() {
  return new Promise((resolve, reject) => {
    if (window.echarts) return resolve(window.echarts);
    let i = 0;
    const tryNext = () => {
      if (window.echarts) return resolve(window.echarts);
      if (i >= ECHART_SOURCES.length) return reject(new Error("ECharts 加载失败（检查网络或代理）"));
      const s = document.createElement("script");
      let settled = false;
      const done = (fn) => (ev) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        fn(ev);
      };
      // 弱网/代理环境下脚本可能既不触发 onload 也不触发 onerror，用超时兜底切换下一个源
      const timer = setTimeout(done(() => { s.remove(); tryNext(); }), 8000);
      s.onload = done(() => resolve(window.echarts));
      s.onerror = done(() => { s.remove(); tryNext(); });
      s.src = ECHART_SOURCES[i++];
      document.head.appendChild(s);
    };
    tryNext();
  });
}

/* ---------------- 工具 ---------------- */
const $ = (sel) => document.querySelector(sel);
const fmtInt = (v) => Math.round(v).toLocaleString("en-US");
const fmtSigned = (v, digits = 0) =>
  (v > 0 ? "+" : v < 0 ? "−" : "") +
  Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const fmtWan = (v) => (v / 10000).toLocaleString("en-US", { maximumFractionDigits: 2 }) + " 万";
const fmtUsdBig = (v) => {
  if (v == null) return "—";
  if (Math.abs(v) >= 1e9) return "$" + (v / 1e9).toFixed(Math.abs(v) >= 1e11 ? 1 : 2) + "B";
  if (Math.abs(v) >= 1e6) return "$" + (v / 1e6).toFixed(1) + "M";
  return "$" + fmtInt(v);
};
const fmtBtcT = (v) =>
  v.toLocaleString("en-US", { maximumFractionDigits: 1 });
const dateCN = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${y}-${m}-${d}`;
};
const bjTime = (iso) => {
  const d = new Date(iso);
  return d.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
};
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el, target, fmt, duration = 900) {
  if (reducedMotion) { el.innerHTML = fmt(target); return; }
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / duration);
    const e = 1 - Math.pow(1 - p, 3);
    el.innerHTML = fmt(target * e);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------------- 数据 ---------------- */
async function fetchJson(url) {
  const r = await fetch(url, { cache: "no-cache" });
  if (!r.ok) throw new Error(`${url} HTTP ${r.status}`);
  return r.json();
}

async function fetchLivePrice() {
  const sources = [
    ["https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", (j) => j?.bitcoin?.usd],
    ["https://api.exchange.coinbase.com/products/BTC-USD/ticker", (j) => parseFloat(j?.price)],
    ["https://api.kraken.com/0/public/Ticker?pair=XBTUSD", (j) => parseFloat(j?.result?.XXBTZUSD?.c?.[0])],
  ];
  for (const [url, pick] of sources) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      const r = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!r.ok) continue;
      const v = pick(await r.json());
      if (v > 1000) return v;
    } catch { /* 静默降级 */ }
  }
  return null;
}

/* ---------------- 图表公共配置 ---------------- */
const AXIS_STYLE = {
  axisLine: { lineStyle: { color: "#e4e7ee" } },
  axisTick: { show: false },
  axisLabel: { color: "#98a1b0", fontSize: 11 },
};
const TOOLTIP_STYLE = {
  backgroundColor: "#fff",
  borderColor: "#eef0f5",
  borderRadius: 12,
  padding: [10, 14],
  textStyle: { color: "#171a20", fontSize: 12.5 },
  extraCssText: "box-shadow: 0 8px 28px rgba(23,26,32,.12);",
};

/* ---------------- 主流程 ---------------- */
let charts = { holdings: null, flow: null, donut: null, bars: null };
let state = { summary: null, history: null, status: null, range: "1y" };

async function main() {
  try {
    const [echarts, summary, history, status] = await Promise.all([
      loadECharts(),
      fetchJson("data/summary.json"),
      fetchJson("data/history.json"),
      fetchJson("data/status.json").catch(() => null),
    ]);
    state.summary = summary;
    state.history = history;
    state.status = status;
    window.__echarts = echarts;

    renderStatus();
    renderKpis();
    renderStats();
    renderRecords();
    renderMonthly();
    initCharts(echarts);
    renderTable();
    renderHeat();
    renderFootnote();

    document.getElementById("skeleton").classList.add("done");
    setupReveal();

    // 实时价格增强（静默失败；等待滚动数字动画结束后再覆盖）
    const live = await fetchLivePrice();
    if (live) setTimeout(() => applyLivePrice(live), 1100);
  } catch (e) {
    console.error(e);
    const sk = document.getElementById("skeleton");
    sk.innerHTML = `<div style="text-align:center;padding:60px 20px;color:#5b6472">
      <div style="font-size:34px;margin-bottom:10px">📡</div>
      <div style="font-weight:600;margin-bottom:6px">数据加载失败</div>
      <div class="muted">${String(e.message || e)}</div>
      <button onclick="location.reload()" style="margin-top:14px;padding:8px 22px;border:0;border-radius:999px;background:#FF9900;color:#fff;font-size:13px;cursor:pointer">重新加载</button></div>`;
  }
}

/* ---------------- 状态胶囊 ---------------- */
function renderStatus() {
  const s = state.status || {};
  const src = s.sources || {};
  const ok =
    (state.summary?.dataOk?.holdings ?? false) && (state.summary?.dataOk?.history ?? false);
  const dot = $("#statusDot");
  dot.className = "dot " + (ok ? "ok" : "warn");
  const asOf = state.summary?.holdings?.asOf;
  $("#statusText").textContent =
    `数据更新于 ${bjTime(s.generatedAt || state.summary?.generatedAt)}（北京时间）` +
    (asOf ? ` · 持仓截至 ${dateCN(asOf)}` : "");
  const detail = Object.entries(src)
    .map(([k, v]) => `${k}: ${v.ok ? "✓" : "✗"} ${v.detail || ""}`)
    .join("\n");
  $("#statusPill").title = detail || "数据源状态未知";
}

/* ---------------- KPI ---------------- */
function renderKpis() {
  const { summary } = state;
  const h = summary.holdings;
  const price = summary.btcPrice.snapshotUsd;
  const liveCap = h.totalUsdLive ?? h.totalUsdSnapshot;
  const cumUsd = state.history?.rows?.at(-1)?.cumFlowUsd ?? null;
  const cumBtc = summary.netFlow.cumulativeBtc;
  const latestBtc = summary.netFlow.latestBtc ?? 0;
  const latestDate = summary.netFlow.latestDate;

  const kpis = [
    {
      label: "ETF 总持仓",
      value: fmtInt(h.totalBtc),
      unit: "",
      sub: `全部 ${h.fundCount} 只现货 ETF 合计`,
    },
    {
      label: "总市值",
      value: fmtUsdBig(liveCap),
      unit: "",
      sub: `BTC $${fmtInt(price)} 实时估算`,
      title: `快照市值 ${fmtUsdBig(h.totalUsdSnapshot)}`,
      id: "kpiCap",
    },
    {
      label: "累计净流入",
      value: cumUsd != null ? fmtUsdBig(cumUsd) : "—",
      unit: "",
      sub: `<span class="pos">${fmtSigned(cumBtc ?? 0)} BTC</span> · 上市以来`,
    },
    {
      label: "占 BTC 总量上限",
      value: h.pctOf21m != null ? h.pctOf21m.toFixed(2) + "%" : "—",
      unit: "",
      sub: "2,100 万枚硬顶",
    },
    {
      label: "BTC 价格",
      value: price != null ? "$" + fmtInt(price) : "—",
      unit: "",
      sub: summary.btcPrice.source ? `实时 · ${summary.btcPrice.source}` : "",
      id: "kpiPrice",
    },
    {
      label: "最新单日净流入",
      value: fmtSigned(latestBtc),
      unit: "BTC",
      sub: `${dateCN(latestDate).slice(5)} · ≈ ${fmtUsdBig(latestBtc * (price || 0))}`,
    },
  ];

  const grid = $("#kpiGrid");
  grid.innerHTML = kpis
    .map(
      (k, i) => `
    <div class="kpi" style="transition-delay:${i * 40}ms"${k.title ? ` title="${k.title}"` : ""}>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value" id="${k.id || "kpi" + i}"></div>
      <div class="kpi-sub">${k.sub}</div>
    </div>`,
    )
    .join("");

  kpis.forEach((k, i) => {
    const el = document.getElementById(k.id || "kpi" + i);
    const raw = k.value;
    // 带格式的滚动动画：对 "$xx.xB" / "1,289,507" / "6.14" / "+2,305" 统一处理
    const m = String(raw).match(/^([^0-9]*)([0-9.,]+)(.*)$/);
    if (!m) { el.innerHTML = raw; return; }
    const [, pre, numStr, post] = m;
    const target = parseFloat(numStr.replace(/,/g, ""));
    countUp(el, target, (v) => {
      const val = target >= 1000 || numStr.includes(",")
        ? Math.round(v).toLocaleString("en-US")
        : v.toFixed(numStr.includes(".") ? numStr.split(".")[1].length : 0);
      return `${pre}${val}${post}${k.unit ? ` <span class="unit">${k.unit}</span>` : ""}`;
    });
  });
}

function applyLivePrice(live) {
  const { summary } = state;
  const h = summary.holdings;
  const capEl = document.getElementById("kpiCap");
  const priceEl = document.getElementById("kpiPrice");
  if (priceEl) {
    priceEl.innerHTML = `$${fmtInt(live)}`;
    priceEl.parentElement.querySelector(".kpi-sub").textContent = "实时 · 客户端直连行情";
  }
  if (capEl) {
    capEl.innerHTML = fmtUsdBig(h.totalBtc * live);
    capEl.parentElement.querySelector(".kpi-sub").textContent = `BTC $${fmtInt(live)} 实时估算`;
  }
}

/* ---------------- 统计概览条 ---------------- */
function renderStats() {
  const a = state.summary.analytics;
  if (!a) return;
  const chips = [
    ["近7日", a.stats.d7],
    ["近30日", a.stats.d30],
    ["近90日", a.stats.d90],
    ["今年以来", a.stats.ytd],
    ["上市以来", a.stats.inception],
  ];
  $("#statsStrip").innerHTML = `
    <div class="strip-title">净流入统计
      <span class="muted">BTC · 按当日收盘价折算美元</span>
    </div>
    <div class="stat-chips">
      ${chips
        .map(([label, v]) => {
          const cls = v.btc > 0 ? "pos" : v.btc < 0 ? "neg" : "";
          return `
        <div class="stat-chip" title="${label}：${fmtSigned(v.btc)} BTC ≈ ${fmtUsdBig(v.usd)}（${v.days} 个交易日）">
          <div class="chip-label">${label}</div>
          <div class="chip-value ${cls}">${fmtSigned(v.btc)}</div>
          <div class="chip-sub">${fmtUsdBig(v.usd)} · ${v.days}日</div>
        </div>`;
        })
        .join("")}
    </div>`;
}

/* ---------------- 历史纪录 ---------------- */
function renderRecords() {
  const a = state.summary.analytics;
  if (!a) return;
  const r = a.records;
  const s = a.streak;
  const cards = [
    {
      label: "单日最大净流入",
      value: `+${fmtWan(Math.abs(r.maxInflow?.btc ?? 0))}枚`,
      sub: `${(r.maxInflow?.date ?? "").replace(/-/g, "/")} · ${fmtUsdBig(r.maxInflow?.usd)}`,
      cls: "pos",
    },
    {
      label: "单日最大净流出",
      value: `−${fmtWan(Math.abs(r.maxOutflow?.btc ?? 0))}枚`,
      sub: `${(r.maxOutflow?.date ?? "").replace(/-/g, "/")} · ${fmtUsdBig(r.maxOutflow?.usd)}`,
      cls: "neg",
    },
    {
      label: "最长连续净流入",
      value: `${r.longestInflowStreak?.days ?? 0} 天`,
      sub: `截至 ${(r.longestInflowStreak?.endDate ?? "").replace(/-/g, "/")}`,
      cls: "",
    },
    {
      label: "当前连续方向",
      value: `${s.direction > 0 ? "净流入" : s.direction < 0 ? "净流出" : "持平"} ${s.days} 天`,
      sub: "按交易日计",
      cls: s.direction > 0 ? "pos" : s.direction < 0 ? "neg" : "",
    },
    {
      label: "净买入 ÷ 同期矿工产出",
      value: `${((a.stats.inception.btc / a.issuance.estimated) * 100).toFixed(0)}%`,
      sub: `${fmtInt(a.stats.inception.btc)} ÷ ${fmtInt(a.issuance.estimated)} BTC（估算）`,
      cls: "pos",
    },
  ];
  $("#recordGrid").innerHTML = cards
    .map(
      (c) => `
    <div class="record-card">
      <div class="chip-label">${c.label}</div>
      <div class="chip-value ${c.cls}">${c.value}</div>
      <div class="chip-sub">${c.sub}</div>
    </div>`,
    )
    .join("");
}

/* ---------------- 月度热力图 ---------------- */
function renderMonthly() {
  const a = state.summary.analytics;
  if (!a?.monthly?.length) return;
  const latest = state.summary.netFlow.latestDate ?? "";
  const currentMonth = latest.slice(0, 7);
  const years = [...new Set(a.monthly.map((m) => m.month.slice(0, 4)))].sort();
  const byMonth = new Map(a.monthly.map((m) => [m.month, m]));
  const maxAbs = Math.max(...a.monthly.map((m) => Math.abs(m.btc)), 1);
  const cell = (ym) => {
    const m = byMonth.get(ym);
    if (!m || m.btc === 0)
      return `<td class="m-zero" title="${ym}${m ? `: 0 BTC` : "：无数据"}">${m ? "0" : "—"}</td>`;
    const alpha = Math.min(0.82, 0.12 + Math.abs(m.btc) / maxAbs);
    const bg = m.btc > 0 ? `rgba(22,163,74,${alpha})` : `rgba(220,38,38,${alpha})`;
    const color = alpha > 0.5 ? "#fff" : m.btc > 0 ? "#16a34a" : "#dc2626";
    const abs = Math.abs(m.btc);
    const v = abs >= 10000 ? (abs / 10000).toFixed(1) + "万" : abs.toLocaleString("en-US");
    const sign = m.btc > 0 ? "+" : "−";
    const star = ym === currentMonth ? "*" : "";
    return `<td style="background:${bg};color:${color}" title="${ym}：${fmtSigned(m.btc)} BTC ≈ ${fmtUsdBig(
      m.usd,
    )}${ym === currentMonth ? "（进行中）" : ""}">${sign}${v}${star}</td>`;
  };
  const yearSum = (y) => {
    const arr = a.monthly.filter((m) => m.month.startsWith(y));
    const btc = arr.reduce((s2, m) => s2 + m.btc, 0);
    const usd = arr.reduce((s2, m) => s2 + m.usd, 0);
    return { btc: Math.round(btc), usd };
  };
  $("#monthTable").innerHTML = `
    <tr>
      <th>年 \ 月</th>
      ${["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"].map((m) => `<th>${m}</th>`).join("")}
      <th>年合计</th>
    </tr>
    ${years
      .map((y) => {
        const s = yearSum(y);
        return `<tr>
        <td class="m-year">${y}</td>
        ${Array.from({ length: 12 }, (_, i) => cell(`${y}-${String(i + 1).padStart(2, "0")}`)).join("")}
        <td class="${s.btc > 0 ? "pos" : s.btc < 0 ? "neg" : ""}" title="${y} 年合计：${fmtSigned(
          s.btc,
        )} BTC ≈ ${fmtUsdBig(s.usd)}"><b>${s.btc > 0 ? "+" : "−"}${(Math.abs(s.btc) / 10000).toFixed(2)}万</b></td>
      </tr>`;
      })
      .join("")}
    <tr><td colspan="14" class="m-note">* 为进行中月份 · 悬停查看精确值与美元折算</td></tr>`;
}

/* ---------------- 图表 ---------------- */
function initCharts(echarts) {
  const rows = state.history.rows;

  /* —— 总持仓走势（叠加 BTC 价格） —— */
  charts.holdings = echarts.init($("#chartHoldings"));
  const areaGrad = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: "rgba(255,153,0,0.30)" },
    { offset: 1, color: "rgba(255,153,0,0.02)" },
  ]);
  charts.holdings.setOption({
    animationDuration: reducedMotion ? 0 : 1100,
    animationEasing: "cubicOut",
    legend: {
      top: 0, right: 0, itemWidth: 14, itemHeight: 8,
      textStyle: { color: "#5b6472", fontSize: 12 },
    },
    grid: { left: 64, right: 70, top: 34, bottom: 46 },
    tooltip: {
      trigger: "axis", ...TOOLTIP_STYLE,
      formatter: (ps) => {
        const r = rows[ps[0].dataIndex];
        return `<b>${dateCN(r.date)}</b><br/>
          总持仓 <b>${fmtInt(r.holdingsBtc)}</b> BTC<br/>
          累计净流入 <span style="color:#16a34a">${fmtSigned(r.cumFlowBtc)}</span> BTC
          ${r.price ? `<br/>BTC 价格 $${fmtInt(r.price)}` : ""}
          ${r.holdingsUsd ? `<br/>持仓 ≈ ${fmtUsdBig(r.holdingsUsd)}` : ""}`;
      },
    },
    xAxis: { type: "time", ...AXIS_STYLE, axisLabel: { ...AXIS_STYLE.axisLabel, hideOverlap: true } },
    yAxis: [
      {
        type: "value", ...AXIS_STYLE,
        splitLine: { lineStyle: { color: "#f1f2f6" } },
        axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v) => (v / 10000).toFixed(0) + "万" },
        scale: true,
      },
      {
        type: "value", ...AXIS_STYLE,
        splitLine: { show: false },
        axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v) => "$" + (v / 1000).toFixed(0) + "K" },
        scale: true,
      },
    ],
    dataZoom: [{ type: "inside", throttle: 50 }],
    series: [
      {
        name: "总持仓（BTC）",
        type: "line", smooth: 0.35, symbol: "none",
        lineStyle: { width: 2.6, color: "#FF9900" },
        areaStyle: { color: areaGrad },
        data: rows.map((r) => [r.date, r.holdingsBtc]),
      },
      {
        name: "BTC 价格（$）",
        type: "line", smooth: 0.35, symbol: "none", yAxisIndex: 1,
        lineStyle: { width: 1.4, color: "rgba(59,130,246,0.75)" },
        itemStyle: { color: "#3b82f6" },
        data: rows.filter((r) => r.price != null).map((r) => [r.date, r.price]),
      },
    ],
  });

  // 持仓恒等式（口径透明）
  const first = rows[0];
  const lastRow = rows[rows.length - 1];
  $("#holdingsIdentity").textContent =
    `口径：期初 ${fmtInt(first.holdingsBtc)} 枚（${dateCN(first.date)}，GBTC 转入+种子）` +
    ` ＋ 累计净流入 ${fmtInt(lastRow.cumFlowBtc)} 枚 ＝ 当前 ${fmtInt(lastRow.holdingsBtc)} 枚（${dateCN(lastRow.date)}）`;

  /* —— 每日净流入 + 累计 —— */
  charts.flow = echarts.init($("#chartFlow"));
  updateFlowChart();
  $("#rangePills").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    document.querySelectorAll("#rangePills button").forEach((b) => b.classList.toggle("active", b === btn));
    state.range = btn.dataset.range;
    updateFlowChart();
  });

  /* —— 持仓分布 donut —— */
  charts.donut = echarts.init($("#chartDonut"));
  const funds = state.summary.holdings.funds.filter((f) => f.btc > 0);
  const top = funds.slice(0, 6);
  const restBtc = funds.slice(6).reduce((s, f) => s + f.btc, 0);
  const donutData = [
    ...top.map((f) => ({ name: f.ticker, value: Math.round(f.btc) })),
    ...(restBtc > 0 ? [{ name: "其他", value: Math.round(restBtc) }] : []),
  ];
  const palette = ["#FF9900", "#3b82f6", "#16a34a", "#8b5cf6", "#0ea5e9", "#ef4444", "#f59e0b"];
  $("#donutCap").textContent = `按最新快照（${dateCN(state.summary.holdings.asOf)}）`;
  charts.donut.setOption({
    animationDuration: reducedMotion ? 0 : 1100,
    color: palette,
    tooltip: {
      trigger: "item", ...TOOLTIP_STYLE,
      formatter: (p) => {
        const f = funds.find((x) => x.ticker === p.name);
        const btc = f ? f.btc : restBtc;
        return `<b>${p.name}</b>（${f ? f.name : "其余 7 只"}）<br/>
          持仓 <b>${fmtInt(btc)}</b> BTC · 占比 ${p.percent}%`;
      },
    },
    legend: {
      orient: "vertical", right: 4, top: "middle",
      itemWidth: 12, itemHeight: 12, icon: "roundRect",
      textStyle: { color: "#5b6472", fontSize: 12 },
      formatter: (name) => {
        const v = donutData.find((d) => d.name === name)?.value ?? 0;
        const total = donutData.reduce((s, d) => s + d.value, 0);
        return `${name}  ${(v / total * 100).toFixed(1)}%`;
      },
    },
    series: [{
      type: "pie", radius: ["52%", "78%"], center: ["38%", "50%"],
      itemStyle: { borderRadius: 8, borderColor: "#fff", borderWidth: 3 },
      label: { show: false },
      emphasis: { scaleSize: 6 },
      data: donutData,
    }],
  });

  /* —— 各 ETF 持仓横向柱状 —— */
  charts.bars = echarts.init($("#chartBars"));
  const barFunds = funds.slice().reverse();
  charts.bars.setOption({
    animationDuration: reducedMotion ? 0 : 1100,
    grid: { left: 70, right: 90, top: 10, bottom: 8 },
    tooltip: {
      trigger: "item", ...TOOLTIP_STYLE,
      formatter: (p) => {
        const f = funds.find((x) => x.ticker === p.name);
        return `<b>${p.name}</b> ${f?.name ?? ""}<br/>持仓 <b>${fmtInt(p.value)}</b> BTC` +
          (f?.usd ? `<br/>≈ ${fmtUsdBig(f.usd)}` : "");
      },
    },
    xAxis: {
      type: "value", ...AXIS_STYLE,
      splitLine: { lineStyle: { color: "#f1f2f6" } },
      axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v) => (v / 10000).toFixed(0) + "万" },
    },
    yAxis: {
      type: "category", ...AXIS_STYLE,
      axisLabel: { color: "#171a20", fontSize: 12, fontWeight: 600 },
      data: barFunds.map((f) => f.ticker),
    },
    series: [{
      type: "bar", barWidth: "62%",
      itemStyle: {
        borderRadius: [0, 8, 8, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: "rgba(255,153,0,0.55)" },
          { offset: 1, color: "#FF9900" },
        ]),
      },
      label: {
        show: true, position: "right", color: "#5b6472", fontSize: 11,
        formatter: (p) => fmtWan(p.value),
      },
      data: barFunds.map((f) => Math.round(f.btc)),
    }],
  });

  window.addEventListener("resize", () => Object.values(charts).forEach((c) => c && c.resize()));
}

function updateFlowChart() {
  const rows = state.history.rows;
  const days = { "1m": 31, "3m": 92, "6m": 183, "1y": 366, all: Infinity }[state.range];
  const cut =
    days === Infinity
      ? "0000-01-01"
      : new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  // 按交易日聚合：来源序列含周末发布的修订快照（prevBusinessDay 都映射回周五等），
  // 同一交易日会有多个分段行（各段流水=相邻快照差）。按日求和才是当日真实净流入，
  // 累计/价格取段末值。聚合后每根柱=一个交易日，横轴无空隙、非交易日不占位。
  const byDate = new Map();
  for (const r of rows) {
    if (r.date < cut) continue;
    const cur = byDate.get(r.date);
    if (!cur) {
      byDate.set(r.date, {
        date: r.date, flowBtc: r.flowBtc, flowUsdParts: r.flowUsd == null ? [] : [r.flowUsd],
        price: r.price, cumFlowBtc: r.cumFlowBtc, cumFlowUsd: r.cumFlowUsd,
      });
    } else {
      cur.flowBtc += r.flowBtc;
      if (r.flowUsd != null) cur.flowUsdParts.push(r.flowUsd);
      cur.price = r.price ?? cur.price;
      cur.cumFlowBtc = r.cumFlowBtc;
      cur.cumFlowUsd = r.cumFlowUsd;
    }
  }
  const sliced = [...byDate.values()].map((d) => ({
    date: d.date,
    flowBtc: Math.round(d.flowBtc * 10) / 10,
    flowUsd: d.flowUsdParts.length ? Math.round(d.flowUsdParts.reduce((s, v) => s + v, 0)) : null,
    price: d.price,
    cumFlowBtc: d.cumFlowBtc,
    cumFlowUsd: d.cumFlowUsd,
  }));
  // 月份边界刻度：只在月份变化的首个交易日打标签，避免"11月 11月 11月"式重复
  const monthTicks = new Set();
  let prevMonth = "";
  sliced.forEach((r, i) => {
    const m = r.date.slice(0, 7);
    if (m !== prevMonth) { monthTicks.add(i); prevMonth = m; }
  });
  const echarts = window.__echarts;
  const isNarrow = window.innerWidth <= 640;

  charts.flow.setOption(
    {
      animationDurationUpdate: reducedMotion ? 0 : 700,
      animationEasingUpdate: "cubicOut",
      grid: { left: 70, right: isNarrow ? 88 : 112, top: 28, bottom: 46 },
      legend: { top: 0, right: 0, itemWidth: 12, itemHeight: 12, textStyle: { color: "#5b6472", fontSize: 12 } },
      tooltip: {
        trigger: "axis", ...TOOLTIP_STYLE,
        formatter: (ps) => {
          // 用 dataIndex 对位数据行（每日净流入/累计净流入的 data 都与 sliced 一一对应）。
          // 不能按日期字符串匹配：axisValue 是本地时区时间戳，new Date("YYYY-MM-DD") 按 UTC
          // 解析，UTC+8 等时区下永远错位导致 tooltip 空白；p.value 是 [日期, 数值] 对也不能直接用。
          const idx = ps.find(
            (p) => p.seriesName === "每日净流入" || p.seriesName === "累计净流入",
          )?.dataIndex;
          const r = idx != null ? sliced[idx] : null;
          if (!r) return "";
          const lines = [`<b>${dateCN(r.date)}</b>`];
          for (const p of ps) {
            if (p.seriesName === "每日净流入") {
              const color = (r.flowUsd ?? 0) >= 0 ? "#16a34a" : "#dc2626";
              lines.push(`${p.marker} ${p.seriesName} <b style="color:${color}">${fmtUsdBig(r.flowUsd)}</b>`);
            } else if (p.seriesName === "累计净流入") {
              lines.push(`${p.marker} ${p.seriesName} <b style="color:#3b82f6">${fmtUsdBig(r.cumFlowUsd)}</b>`);
            } else if (p.seriesName === "BTC 价格" && r.price != null) {
              lines.push(`${p.marker} ${p.seriesName} <b style="color:#FF9900">$${fmtInt(r.price)}</b>`);
            }
          }
          const close = r.price != null ? ` · 收盘 $${fmtInt(r.price)}` : "";
          lines.push(`<span style="color:#98a1b0">${fmtSigned(r.flowBtc)} BTC${close}</span>`);
          return lines.join("<br/>");
        },
      },
      xAxis: {
        type: "category",
        data: sliced.map((r) => r.date),
        ...AXIS_STYLE,
        axisLabel: {
          ...AXIS_STYLE.axisLabel, hideOverlap: true,
          interval: (i) => monthTicks.has(i),
          formatter: (v) => {
            const [y, m] = v.split("-");
            return +m === 1 ? `${y}` : `${+m}月`;
          },
        },
      },
      yAxis: [
        {
          type: "value", ...AXIS_STYLE,
          splitLine: { lineStyle: { color: "#f1f2f6" } },
          axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v) => fmtUsdBig(v).replace("$", "") },
        },
        {
          type: "value", ...AXIS_STYLE,
          splitLine: { show: false },
          axisLabel: {
            ...AXIS_STYLE.axisLabel,
            formatter: isNarrow
              ? (v) => (v / 1e9).toFixed(0) + "B"
              : (v) => fmtUsdBig(v).replace("$", ""),
          },
          scale: true,
        },
        {
          // BTC 价格独立右轴（与累计净流入同为 USD 但量级差 500 倍，不能共用）
          type: "value", ...AXIS_STYLE, position: "right", offset: isNarrow ? 44 : 52,
          splitLine: { show: false },
          axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v) => "$" + (v / 1000).toFixed(0) + "K" },
          scale: true,
        },
      ],
      series: [
        {
          name: "每日净流入", type: "bar",
          itemStyle: { borderRadius: 2 },
          barMaxWidth: 14,
          data: sliced.map((r) => ({
            value: r.flowUsd,
            itemStyle: { color: (r.flowUsd ?? 0) >= 0 ? "rgba(22,163,74,0.75)" : "rgba(220,38,38,0.7)" },
          })),
        },
        {
          name: "累计净流入", type: "line", yAxisIndex: 1, smooth: 0.4, symbol: "none",
          lineStyle: { width: 2.2, color: "#3b82f6" },
          data: sliced.map((r) => r.cumFlowUsd),
        },
        {
          name: "BTC 价格", type: "line", yAxisIndex: 2, smooth: 0.35, symbol: "none",
          lineStyle: { width: 1.4, color: "#FF9900" },
          itemStyle: { color: "#FF9900" },
          data: sliced.map((r) => r.price),
        },
      ],
    },
    { notMerge: true },
  );
}

/* ---------------- 明细表 ---------------- */
function renderTable() {
  const { summary } = state;
  const h = summary.holdings;
  $("#tableCap").textContent = `数据截至 ${dateCN(h.asOf)} · 共 ${h.fundCount} 只 ETF`;
  const recentSum = {};
  const recent7 = {};
  const recentRows = summary.recent || [];
  recentRows.forEach((row, i) => {
    for (const [k, v] of Object.entries(row)) {
      if (k === "date") continue;
      recentSum[k] = (recentSum[k] ?? 0) + (v ?? 0);
      if (i >= recentRows.length - 7) recent7[k] = (recent7[k] ?? 0) + (v ?? 0);
    }
  });
  const total = h.funds.reduce((s, f) => s + f.btc, 0);
  const tbody = $("#etfTable tbody");
  tbody.innerHTML = h.funds
    .map((f) => {
      const pct = (f.btc / total) * 100;
      const ch7 = recent7[f.ticker];
      const ch10 = recentSum[f.ticker];
      const cls = (v) => (v > 0 ? "pos" : v < 0 ? "neg" : "");
      return `
      <tr>
        <td class="t-left">
          <div class="fund-name">
            <b><span class="badge">${f.ticker}</span> ${f.name}</b>
            <span>${f.exchange || "—"}</span>
          </div>
        </td>
        <td class="t-right"><b>${fmtBtcT(f.btc)}</b></td>
        <td class="t-right">${f.usd ? fmtUsdBig(f.usd) : "—"}</td>
        <td class="t-right">
          <div class="share-bar">
            <div class="share-track"><div class="share-fill" data-w="${pct}"></div></div>
            <span style="min-width:52px">${pct.toFixed(2)}%</span>
          </div>
        </td>
        <td class="t-right ${cls(ch7)}">${ch7 != null ? fmtSigned(ch7, 1) : "—"}</td>
        <td class="t-right ${cls(ch10)}">${ch10 != null ? fmtSigned(ch10, 1) : "—"}</td>
      </tr>`;
    })
    .join("");
  // 触发占比条动画
  requestAnimationFrame(() => {
    document.querySelectorAll(".share-fill").forEach((el) => {
      el.style.width = Math.max(2, parseFloat(el.dataset.w) * 2.2) + "%";
    });
  });
}

/* ---------------- 热力表 ---------------- */
function renderHeat() {
  const recent = (state.summary.recent || []).slice().sort((a, b) => a.date.localeCompare(b.date));
  const table = $("#heatTable");
  if (!recent.length) {
    table.innerHTML = `<tr><td class="muted">暂无数据</td></tr>`;
    return;
  }
  const tickers = Object.keys(recent[0]).filter((k) => k !== "date")
    .sort((a, b) => sumT(b) - sumT(a));
  function sumT(t) {
    return recent.reduce((s, r) => s + (r[t] ?? 0), 0);
  }
  const maxAbs = Math.max(...recent.flatMap((r) => tickers.map((t) => Math.abs(r[t] ?? 0))), 1);
  const cell = (v) => {
    if (v == null) return `<td style="color:#c3c9d4">—</td>`;
    if (v === 0) return `<td style="color:#c3c9d4">0</td>`;
    const a = Math.min(0.85, 0.15 + Math.abs(v) / maxAbs);
    const bg = v > 0 ? `rgba(22,163,74,${a})` : `rgba(220,38,38,${a})`;
    const color = a > 0.5 ? "#fff" : v > 0 ? "#16a34a" : "#dc2626";
    return `<td style="background:${bg};color:${color};font-weight:600">${fmtSigned(v, 1)}</td>`;
  };
  table.innerHTML = `
    <tr>
      <th style="text-align:left">基金</th>
      ${recent.map((r) => `<th>${r.date.slice(5)}</th>`).join("")}
      <th>10日合计</th>
    </tr>
    ${tickers
      .map((t) => {
        const s = sumT(t);
        return `<tr>
          <td class="fund">${t}</td>
          ${recent.map((r) => cell(r[t] ?? null)).join("")}
          <td class="${s > 0 ? "pos" : s < 0 ? "neg" : ""}" style="font-weight:700">${fmtSigned(s, 1)}</td>
        </tr>`;
      })
      .join("")}`;
}

/* ---------------- 其他 ---------------- */
function renderFootnote() {
  const s = state.status || {};
  const src = s.sources || {};
  const bits = [];
  if (src.bitboFlows?.ok) bits.push(`流水 ${state.history?.rows?.length ?? "—"} 个交易日`);
  if (src.bitboHoldings?.ok) bits.push(`持仓快照 ${state.summary?.holdings?.fundCount ?? "—"} 只`);
  if (src.priceHistory?.ok) bits.push(`价格 ${src.priceHistory.detail}`);
  $("#dataFootnote").textContent = bits.length ? `本次抓取：${bits.join(" · ")}。` : "";
  // 统一页脚由 footer.js（defer）在 DOMContentLoaded 前注入，此处再加空值守卫防时序竞态
  const setFootBuild = () => {
    const el = document.getElementById("footBuild");
    if (el) el.textContent = `数据生成于 ${bjTime(state.summary.generatedAt)}（北京时间）`;
  };
  setFootBuild();
  document.addEventListener("DOMContentLoaded", setFootBuild, { once: true });
  const a = state.summary.analytics;
  if (a?.monthly) {
    const best = a.monthly.reduce((m, x) => (Math.abs(x.btc) > Math.abs(m.btc) ? x : m), a.monthly[0]);
    const cur = document.getElementById("dataFootnote");
    cur.textContent += ` 月度聚合 ${a.monthly.length} 个月，最大单月 ${best.month}（${fmtSigned(
      best.btc,
    )} BTC）。`;
  }
}

function setupReveal() {
  // 兜底：若 IntersectionObserver 不可用或长期不触发（如页面被遮挡），
  // 3 秒后直接显示全部内容，保证内容永不隐身。
  let fired = false;
  const revealAll = () => {
    if (fired) return;
    fired = true;
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  };
  try {
    const io = new IntersectionObserver(
      (entries) => {
        fired = true;
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.06 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    setTimeout(revealAll, 3000);
  } catch {
    revealAll();
  }
}

main();
