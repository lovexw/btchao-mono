/* ============================================================
   BTC 开奖 — 只读查询 API（共用实现）

   同一份逻辑同时被两处引用，保证返回值完全一致：
     · Cloudflare Pages Functions  sites/draw/functions/api/**
     · 甲骨文 Node 服务            deploy/api/server.js

   本模块不做任何 I/O：数据由调用方通过 load() 注入，
   返回纯对象，由各自适配层序列化成 Response / res。

   约定：
     · 期号 period = 北京日期去掉横线，YYYYMMDD，永不复用
     · 所有时间为 UTC ISO 字符串，另附 time_bj 便于展示
     · 开奖号码 6 位字符串，保留前导 0（不要当数字处理）
   ============================================================ */

export const API_VERSION = '1.0.0';

export const RULE_TEXT =
  '开奖号码 = 从开奖区块哈希末尾往前收集 6 个数字（0-9，字母跳过，扫描顺序即号码顺序）；' +
  '开奖区块 = 每天北京时间 12:00 前挖出的最新区块';

const BJ_OFFSET_MS = 8 * 3600 * 1000; // 北京时间 UTC+8，无夏令时

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/* ---------------- 时间工具 ---------------- */

const pad2 = (n) => String(n).padStart(2, '0');

/** 时间戳 → 北京日期 YYYY-MM-DD */
export function beijingDate(epochMs) {
  const d = new Date(epochMs + BJ_OFFSET_MS);
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

/** ISO 字符串 → 北京时间展示串 YYYY-MM-DD HH:mm */
export function formatBJ(iso) {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return null;
  const d = new Date(ms + BJ_OFFSET_MS);
  return (
    `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())} ` +
    `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`
  );
}

/** 下一次开奖时刻（下一个北京时间 12:00）的毫秒时间戳 */
export function nextDrawEpoch(nowMs) {
  const bj = new Date(nowMs + BJ_OFFSET_MS);
  const y = bj.getUTCFullYear();
  const m = bj.getUTCMonth();
  const day = bj.getUTCDate();
  let t = Date.UTC(y, m, day, 4, 0, 0); // 北京 12:00 == UTC 04:00
  if (t <= nowMs) t = Date.UTC(y, m, day + 1, 4, 0, 0);
  return t;
}

function nextDrawInfo(nowMs) {
  const at = nextDrawEpoch(nowMs);
  const date = beijingDate(at);
  return {
    period: date.replace(/-/g, ''),
    date,
    at: `${date}T12:00:00+08:00`,
    at_unix: Math.floor(at / 1000),
    seconds_left: Math.max(0, Math.round((at - nowMs) / 1000)),
  };
}

/* ---------------- 记录整形 ---------------- */

function periodOf(date) {
  return String(date || '').replace(/-/g, '');
}

/** 一条开奖记录 → 对外字段（只暴露稳定字段，加字段不算破坏兼容） */
export function shapeDraw(d) {
  return {
    period: periodOf(d.date),
    date: d.date,
    number: String(d.number || ''),
    height: d.height,
    hash: d.hash,
    time: d.time,
    time_bj: formatBJ(d.time),
    explorer: `https://mempool.space/zh/block/${d.hash}`,
  };
}

function compareByDate(a, b) {
  return String(b.date).localeCompare(String(a.date)); // 新的在前
}

/* ---------------- 参数解析 ---------------- */

function intParam(query, name, def, min, max) {
  const raw = query.get(name);
  if (raw === null || raw === '') return def;
  if (!/^-?\d+$/.test(raw)) {
    throw new ApiError(400, 'bad_request', `${name} 必须是整数`);
  }
  const n = Number(raw);
  if (n < min || n > max) {
    throw new ApiError(400, 'bad_request', `${name} 必须在 ${min} 到 ${max} 之间`);
  }
  return n;
}

function dateParam(query, name) {
  const raw = query.get(name);
  if (raw === null || raw === '') return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    throw new ApiError(400, 'bad_request', `${name} 需为 YYYY-MM-DD`);
  }
  return raw;
}

/** YYYY-MM-DD 或 YYYYMMDD → YYYY-MM-DD；格式不对返回 null */
function normalizeDate(value) {
  const s = String(value || '').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d{8}$/.test(s)) return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6)}`;
  return null;
}

/* ---------------- 主体 ---------------- */

/**
 * @param {object} options
 * @param {() => Promise<{draws: Array, updatedAt?: string}>|{draws: Array, updatedAt?: string}} options.load
 *        数据加载器，返回全部开奖记录（顺序无所谓，内部会排序）
 * @param {() => number} [options.now] 可注入的当前时间，便于测试
 */
export function createDrawApi({ load, now = () => Date.now() }) {
  async function dataset() {
    const raw = (await load()) || {};
    const draws = Array.isArray(raw.draws) ? raw.draws.filter((d) => d && d.date) : [];
    draws.sort(compareByDate);
    return { draws, updatedAt: raw.updatedAt || null };
  }

  function envelope(data) {
    return { ok: true, api_version: API_VERSION, data };
  }

  /* -------- GET /api/meta -------- */
  async function meta() {
    const { draws, updatedAt } = await dataset();
    const nowMs = now();
    return envelope({
      rule: RULE_TEXT,
      api_version: API_VERSION,
      total: draws.length,
      first: draws.length ? shapeDraw(draws[draws.length - 1]) : null,
      last: draws.length ? shapeDraw(draws[0]) : null,
      next: nextDrawInfo(nowMs),
      updated_at: updatedAt,
      endpoints: [
        { method: 'GET', path: '/api/draws', desc: '开奖列表（分页 / 日期区间）' },
        { method: 'GET', path: '/api/draws/latest', desc: '最新一期 + 下一期开奖时间' },
        { method: 'GET', path: '/api/draws/{period|date}', desc: '单期详情，如 /api/draws/20261104' },
        { method: 'GET', path: '/api/draws/check?number=502105', desc: '核对号码是否中奖' },
        { method: 'GET', path: '/api/block/{height}', desc: '任意区块高度的开奖号码' },
      ],
    });
  }

  /* -------- GET /api/draws -------- */
  async function list(query) {
    const limit = intParam(query, 'limit', 20, 1, 200);
    const offset = intParam(query, 'offset', 0, 0, 1000000);
    const from = dateParam(query, 'from');
    const to = dateParam(query, 'to');
    const order = (query.get('order') || 'desc').toLowerCase();
    if (order !== 'desc' && order !== 'asc') {
      throw new ApiError(400, 'bad_request', "order 只能是 desc 或 asc");
    }

    const { draws, updatedAt } = await dataset();
    let rows = draws;
    if (from) rows = rows.filter((d) => d.date >= from);
    if (to) rows = rows.filter((d) => d.date <= to);
    const ordered = order === 'asc' ? rows.slice().reverse() : rows;

    return envelope({
      total: rows.length,
      limit,
      offset,
      order,
      updated_at: updatedAt,
      draws: ordered.slice(offset, offset + limit).map(shapeDraw),
    });
  }

  /* -------- GET /api/draws/latest -------- */
  async function latest() {
    const { draws, updatedAt } = await dataset();
    return envelope({
      latest: draws.length ? shapeDraw(draws[0]) : null,
      next: nextDrawInfo(now()),
      total: draws.length,
      updated_at: updatedAt,
    });
  }

  /* -------- GET /api/draws/{period|date} -------- */
  async function one(id) {
    const date = normalizeDate(id);
    if (!date) {
      throw new ApiError(
        400,
        'bad_request',
        '期号格式应为 YYYYMMDD 或 YYYY-MM-DD，例如 20261104 / 2026-11-04',
      );
    }
    const { draws } = await dataset();
    const hit = draws.find((d) => d.date === date);
    if (!hit) throw new ApiError(404, 'not_found', `${date} 没有开奖记录`);
    return envelope({ draw: shapeDraw(hit) });
  }

  /* -------- GET /api/draws/check -------- */
  async function check(query) {
    const number = String(query.get('number') || '').trim();
    if (!/^\d{6}$/.test(number)) {
      throw new ApiError(400, 'bad_request', 'number 必须是 6 位数字（保留前导 0）');
    }
    const rawDate = query.get('date') || query.get('period');
    let date = null;
    if (rawDate) {
      date = normalizeDate(rawDate);
      if (!date) {
        throw new ApiError(400, 'bad_request', 'date / period 格式应为 YYYY-MM-DD 或 YYYYMMDD');
      }
    }

    const { draws } = await dataset();
    if (!draws.length) throw new ApiError(404, 'not_found', '暂无开奖数据');
    const draw = date ? draws.find((d) => d.date === date) : draws[0];
    if (!draw) throw new ApiError(404, 'not_found', `${date} 没有开奖记录`);

    const drawNumber = String(draw.number || '');
    let leading = 0;
    while (leading < 6 && number[leading] === drawNumber[leading]) leading += 1;
    let trailing = 0;
    while (trailing < 6 && number[5 - trailing] === drawNumber[5 - trailing]) trailing += 1;

    return envelope({
      number,
      matched: number === drawNumber,
      leading_match: leading,
      trailing_match: trailing,
      draw: shapeDraw(draw),
    });
  }

  /**
   * 路由入口。
   * @param {object} req
   * @param {string} req.path   去掉 /api 前缀的路径，如 '/draws/latest'
   * @param {URLSearchParams} req.query
   * @returns {Promise<{status: number, body: object}>}
   */
  async function handle({ path, query }) {
    const p = ('/' + String(path || '').replace(/^\/+|\/+$/g, '')).replace(/\/$/, '') || '/';

    if (p === '/' || p === '/meta') return { status: 200, body: await meta() };
    if (p === '/draws' || p === '/draws/') return { status: 200, body: await list(query) };
    if (p === '/draws/latest') return { status: 200, body: await latest() };
    if (p === '/draws/check') return { status: 200, body: await check(query) };

    const m = p.match(/^\/draws\/([^/]+)$/);
    if (m) return { status: 200, body: await one(decodeURIComponent(m[1])) };

    throw new ApiError(404, 'not_found', `没有这个接口：/api${p}`);
  }

  return { handle, meta, list, latest, one, check };
}
