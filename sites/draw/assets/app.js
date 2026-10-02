/* ============================================================
   BTC 开奖 — 前端逻辑
   号码规则：区块哈希最后 6 位，从末位往前倒序排列
   ============================================================ */
'use strict';

const $ = (s) => document.querySelector(s);
const BJ_OFFSET_MS = 8 * 3600 * 1000; // 北京时间 UTC+8（无夏令时）

/* ---------- 号码计算（与 scripts/draw.mjs 保持一致）
   从哈希末尾往前收集 6 个数字（0-9，字母跳过），扫描顺序即号码顺序 ---------- */
function lotteryNumber(hash) {
  const digits = [];
  for (let pass = 0; pass < 2 && digits.length < 6; pass++) {
    for (let i = hash.length - 1; i >= 0 && digits.length < 6; i--) {
      const c = hash[i];
      if (c >= '0' && c <= '9') digits.push(c);
    }
  }
  while (digits.length < 6) digits.push('0');
  return digits.join('');
}

/* 开奖号码用到的数字在哈希中的位置（用于哈希高亮） */
function lotteryDigitIndices(hash) {
  const idx = [];
  for (let i = hash.length - 1; i >= 0 && idx.length < 6; i--) {
    if (hash[i] >= '0' && hash[i] <= '9') idx.push(i);
  }
  return idx;
}

/* ---------- 时间格式化 ---------- */
const bjDateTimeFmt = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hour12: false,
});
const bjDateFmt = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
});
function fmtBJ(epochMs) { return bjDateTimeFmt.format(new Date(epochMs)).replace(/\//g, '-'); }
function fmtBJDate(epochMs) { return bjDateFmt.format(new Date(epochMs)).replace(/\//g, '-'); }
function weekdayBJ(epochMs) {
  const s = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', weekday: 'short' }).format(new Date(epochMs));
  return s.replace('星期', '周');
}
/* ISO 字符串（含时区）→ 展示 */
function fmtISO(iso) { return fmtBJ(Date.parse(iso)); }

/* ---------- 下期开奖倒计时：下一个北京时间 12:00 ---------- */
function nextDrawEpoch() {
  const now = Date.now();
  const bj = new Date(now + BJ_OFFSET_MS);
  const y = bj.getUTCFullYear(), m = bj.getUTCMonth(), d = bj.getUTCDate();
  let t = Date.UTC(y, m, d, 12, 0, 0) - BJ_OFFSET_MS;
  if (t <= now) t = Date.UTC(y, m, d + 1, 12, 0, 0) - BJ_OFFSET_MS;
  return t;
}
function renderCountdown() {
  const left = nextDrawEpoch() - Date.now();
  const h = Math.floor(left / 3600e3), m = Math.floor(left % 3600e3 / 60e3), s = Math.floor(left % 60e3 / 1e3);
  $('#countdown').textContent =
    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
setInterval(renderCountdown, 1000);

/* ---------- 数字瓷片渲染 ---------- */
function renderDigits(el, number, size) {
  el.className = size === 'lg' ? 'digits digits-lg' : 'digits digits-sm';
  el.innerHTML = '';
  for (const ch of number) {
    const d = document.createElement('span');
    d.className = 'digit';
    d.textContent = ch;
    el.appendChild(d);
  }
}

/* ---------- 哈希展示：高亮构成开奖号码的数字，等分为两行居中 ---------- */
function hashHTML(hash) {
  const marks = new Set(lotteryDigitIndices(hash));
  const mid = Math.ceil(hash.length / 2);
  let half1 = '', half2 = '';
  for (let i = 0; i < hash.length; i++) {
    const ch = marks.has(i) ? `<b>${hash[i]}</b>` : escapeHTML(hash[i]);
    if (i < mid) half1 += ch; else half2 += ch;
  }
  return `<span class="hash-half">${half1}</span><span class="hash-half">${half2}</span>`;
}
function escapeHTML(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ============================================================
   开奖数据加载与渲染
   数据存档于 GitHub 仓库，Actions 每天北京时间 12:00 提交。
   多源并行取最新：站点自带版本 → GitHub raw → jsDelivr 镜像。
   ============================================================ */
const DRAWS_SOURCES = [
  `/data/draws.json`, // 随站点部署的版本
  'https://raw.githubusercontent.com/lovexw/btchao-mono/main/sites/draw/data/draws.json',
  'https://cdn.jsdelivr.net/gh/lovexw/btchao-mono@main/sites/draw/data/draws.json',
];

async function loadDraws() {
  const results = await Promise.allSettled(
    DRAWS_SOURCES.map(async (url) => {
      const r = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(6000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      if (!d || !Array.isArray(d.draws) || !d.draws.length) throw new Error('数据为空');
      return d;
    }),
  );
  const ok = results.filter((x) => x.status === 'fulfilled').map((x) => x.value);
  if (!ok.length) throw new Error('加载开奖数据失败');
  return ok.sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')))[0];
}

function renderLatest(data) {
  const latest = data.draws[0];
  if (!latest) {
    $('#latest-tag').textContent = '暂无开奖数据';
    return;
  }
  $('#latest-tag').textContent = `第 ${data.draws.length} 期 · ${fmtISO(latest.time).slice(0, 10)}（北京时间）`;
  renderDigits($('#latest-digits'), latest.number, 'lg');
  const a = $('#latest-height');
  a.textContent = `# ${latest.height}`;
  a.href = `https://mempool.space/zh/block/${latest.hash}`;
  $('#latest-time').textContent = fmtISO(latest.time);
  $('#latest-hash').innerHTML = hashHTML(latest.hash);
}

function renderHistory(data) {
  const grid = $('#history-grid');
  grid.innerHTML = '';
  for (const d of data.draws) {
    const card = document.createElement('div');
    card.className = 'card day-card';
    const ts = Date.parse(d.time);
    card.innerHTML = `
      <div class="day-card-top">
        <span class="day-date">${escapeHTML(d.date)}<small>${weekdayBJ(ts)}</small></span>
        <a class="day-link" href="https://mempool.space/zh/block/${d.hash}" target="_blank" rel="noopener">区块 ↗</a>
      </div>
      <div class="digits digits-sm"></div>
      <div class="day-meta">
        <span>区块 <b>#${d.height}</b></span>
        <span class="day-hash">${hashHTML(d.hash)}</span>
        <span>${fmtISO(d.time)} 开出</span>
      </div>`;
    renderDigits(card.querySelector('.digits'), d.number, 'sm');
    grid.appendChild(card);
  }
}

loadDraws()
  .then((data) => { renderLatest(data); renderHistory(data); })
  .catch((e) => {
    $('#latest-tag').textContent = '开奖数据加载失败';
    $('#history-grid').innerHTML = `<div class="card loading-card">${escapeHTML(e.message)}，请稍后刷新重试</div>`;
  });

/* ============================================================
   工具一：按区块高度查询
   ============================================================ */
async function fetchTipHeight() {
  try {
    const r = await fetch('/api/tip');
    if (r.ok) return Number((await r.text()).trim());
    throw new Error();
  } catch {
    const r = await fetch('https://mempool.space/api/blocks/tip/height');
    if (!r.ok) throw new Error('获取最新区块高度失败');
    return Number((await r.text()).trim());
  }
}

async function fetchBlock(height) {
  // 优先走同源 Cloudflare Pages Function，失败则直连公共节点
  try {
    const r = await fetch(`/api/block/${height}`);
    if (r.ok) return r.json();
    if (r.status === 404) return { status: 'pending', height };
    throw new Error();
  } catch {
    const rh = await fetch(`https://mempool.space/api/block-height/${height}`);
    if (rh.status === 404) return { status: 'pending', height };
    if (!rh.ok) throw new Error('区块数据源请求失败');
    const hash = (await rh.text()).trim();
    const rb = await fetch(`https://mempool.space/api/block/${hash}`);
    if (!rb.ok) throw new Error('区块数据源请求失败');
    const b = await rb.json();
    return { status: 'mined', height: b.height, hash: b.id, time: b.timestamp };
  }
}

function resultRowsHTML(block) {
  const ts = block.time * 1000;
  return `
    <div class="result-rows">
      <div class="row"><span class="k">区块高度</span><span class="v">#${block.height}</span></div>
      <div class="row"><span class="k">区块哈希</span><span class="v">${hashHTML(block.hash)}</span></div>
      <div class="row"><span class="k">区块时间</span><span class="v">${fmtBJ(ts)}（北京时间）</span></div>
      <div class="row"><span class="k">查看区块</span><span class="v"><a href="https://mempool.space/zh/block/${block.hash}" target="_blank" rel="noopener">mempool.space ↗</a></span></div>
    </div>`;
}

function digitsBlockHTML(number) {
  return `<div class="digits digits-sm result-digits"></div>`;
}

function wireDigits(scope, number) {
  renderDigits(scope.querySelector('.result-digits'), number, 'sm');
}

$('#query-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const height = Number($('#query-height').value);
  if (!Number.isInteger(height) || height < 0) return;
  const box = $('#query-result');
  const btn = $('#query-btn');
  btn.disabled = true;
  box.hidden = false;
  box.innerHTML = `<p class="result-msg"><span class="spin"></span> 正在查询区块 #${height} …</p>`;
  try {
    const block = await fetchBlock(height);
    if (block.status === 'pending') {
      const tip = await fetchTipHeight().catch(() => null);
      const gap = tip ? block.height - tip : null;
      box.innerHTML = `<p class="result-msg">区块 <span class="hl">#${block.height}</span> 尚未挖出${gap && gap > 0 ? `，距今还有约 <span class="hl">${gap}</span> 个区块（按 10 分钟/块约 <span class="hl">${(gap / 6 / 24).toFixed(1)}</span> 天）` : ''}。挖出后即可查询开奖号码。</p>`;
    } else {
      const number = lotteryNumber(block.hash);
      box.innerHTML = `
        <p class="result-title">区块 #${block.height} 的开奖号码（哈希末尾往前 6 个数字）</p>
        ${digitsBlockHTML(number)}
        ${resultRowsHTML(block)}`;
      wireDigits(box, number);
    }
  } catch (err) {
    box.innerHTML = `<p class="result-msg err">查询失败：${escapeHTML(err.message || '网络异常')}，请稍后重试</p>`;
  } finally {
    btn.disabled = false;
  }
});

/* ============================================================
   工具二：未来开奖估算 + 开奖日历通知（.ics）
   ============================================================ */
let tabMode = 'height';
const tabH = $('#tab-by-height'), tabT = $('#tab-by-time');
function switchTab(mode) {
  tabMode = mode;
  tabH.classList.toggle('active', mode === 'height');
  tabT.classList.toggle('active', mode === 'time');
  $('#field-by-height').hidden = mode !== 'height';
  $('#field-by-time').hidden = mode !== 'time';
  $('#est-height').required = mode === 'height';
  $('#est-time').required = mode === 'time';
}
tabH.addEventListener('click', () => switchTab('height'));
tabT.addEventListener('click', () => switchTab('time'));

// datetime-local 默认值：明天北京时间 12:00（输入一律按北京时间解释）
function initEstTime() {
  const el = $('#est-time');
  const bj = new Date(nextDrawEpoch() + 86400e3 + BJ_OFFSET_MS); // 下下期开奖时刻（北京时间钟面）
  const pad = (n) => String(n).padStart(2, '0');
  el.value = `${bj.getUTCFullYear()}-${pad(bj.getUTCMonth() + 1)}-${pad(bj.getUTCDate())}T12:00`;
}
initEstTime();

let estimate = null; // {height, epochMs}

$('#estimate-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const box = $('#estimate-result');
  const btn = $('#estimate-btn');
  const intervalMin = Math.max(1, Math.min(60, Number($('#est-interval').value) || 10));
  btn.disabled = true;
  box.hidden = false;
  box.innerHTML = `<p class="result-msg"><span class="spin"></span> 正在获取链上最新高度 …</p>`;
  try {
    const tip = await fetchTipHeight();
    let height, epochMs;
    if (tabMode === 'height') {
      height = Number($('#est-height').value);
      if (!Number.isInteger(height) || height <= 0) throw new Error('请输入有效的区块高度');
      if (height <= tip) throw new Error(`该区块已挖出（当前最新高度 ${tip}），请直接用左侧「按区块高度查询」`);
      epochMs = Date.now() + (height - tip) * intervalMin * 60e3;
    } else {
      const v = $('#est-time').value; // 视为北京时间
      if (!v) throw new Error('请选择目标开奖时间');
      epochMs = Date.parse(`${v}:00+08:00`);
      if (Number.isNaN(epochMs)) throw new Error('时间格式有误');
      if (epochMs <= Date.now()) throw new Error('目标时间已过去，请选择未来的时间');
      height = tip + Math.round((epochMs - Date.now()) / (intervalMin * 60e3));
    }
    estimate = { height, epochMs, intervalMin };
    const gap = height - tip;
    box.innerHTML = `
      <p class="result-title">估算结果（按 ${intervalMin} 分钟/块，当前最新高度 ${tip}）</p>
      <div class="result-rows">
        <div class="row"><span class="k">目标区块</span><span class="v">#${height}</span></div>
        <div class="row"><span class="k">还需挖出</span><span class="v">${gap} 个区块（约 ${(gap / 6 / 24).toFixed(1)} 天）</span></div>
        <div class="row"><span class="k">预计开奖</span><span class="v"><b>${fmtBJ(epochMs)}</b>（北京时间）</span></div>
        <div class="row"><span class="k">开奖号码</span><span class="v">届时从该区块哈希末尾往前取 6 个数字（字母跳过）</span></div>
      </div>
      <div class="result-actions">
        <button type="button" class="btn btn-primary" id="ics-btn">📅 生成开奖日历通知（.ics）</button>
        <button type="button" class="btn btn-ghost" id="copy-btn">复制开奖提醒文案</button>
      </div>`;
    $('#ics-btn').addEventListener('click', downloadICS);
    $('#copy-btn').addEventListener('click', copyNotice);
  } catch (err) {
    estimate = null;
    box.innerHTML = `<p class="result-msg err">${escapeHTML(err.message || '估算失败')}</p>`;
  } finally {
    btn.disabled = false;
  }
});

/* ---------- .ics 日历通知 ---------- */
function icsStamp(epochMs) {
  return new Date(epochMs).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}
function icsEscape(s) {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}
function buildICS() {
  if (!estimate) return null;
  const { height, epochMs } = estimate;
  const end = epochMs + 15 * 60e3;
  const desc =
    `比特币区块 #${height} 预计于北京时间 ${fmtBJ(epochMs)} 挖出。` +
    `开奖号码：从该区块哈希末尾往前取 6 个数字（0-9，字母跳过，扫描顺序即号码顺序）。` +
    `开奖结果可在网站查询：区块挖出后输入高度 ${height} 即可查看。`;
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//btchao.com//BTC Draw//CN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:btc-draw-${height}-${icsStamp(epochMs)}@btchao.com`,
    `DTSTAMP:${icsStamp(Date.now())}`,
    `DTSTART:${icsStamp(epochMs)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${icsEscape(`₿ BTC 开奖 · 区块 #${height}`)}`,
    `DESCRIPTION:${icsEscape(desc)}`,
    'BEGIN:VALARM', 'TRIGGER:-PT10M', 'ACTION:DISPLAY',
    `DESCRIPTION:${icsEscape('比特币区块开奖将于 10 分钟后进行')}`,
    'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ];
  return lines.join('\r\n') + '\r\n';
}
function downloadICS() {
  const body = buildICS();
  if (!body) return;
  const blob = new Blob([body], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `btc-draw-block-${estimate.height}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}
async function copyNotice() {
  if (!estimate) return;
  const { height, epochMs } = estimate;
  const text =
    `【BTC 开奖提醒】区块 #${height} 预计北京时间 ${fmtBJ(epochMs)} 挖出并开奖。\n` +
    `规则：从该区块哈希末尾往前取 6 个数字（0-9，字母跳过），扫描顺序即为开奖号码。\n` +
    `挖出后可在网站输入高度 ${height} 查询结果。`;
  try {
    await navigator.clipboard.writeText(text);
    $('#copy-btn').textContent = '✅ 已复制';
  } catch {
    // 剪贴板不可用时降级为选中文本
    window.prompt('请手动复制：', text);
    return;
  }
  setTimeout(() => { const b = $('#copy-btn'); if (b) b.textContent = '复制开奖提醒文案'; }, 2000);
}

renderCountdown();
