// lottery.btchao.com 的 /api：原来跑在 Cloudflare Pages Functions，
// 迁到甲骨文后用这个常驻小服务顶替，路由与返回格式保持一致。
//
//   GET /api/tip              → 最新区块高度（纯文本）
//   GET /api/block/:height    → { status, height, hash, time, number }
//   GET /api/meta             → 规则 / 期数 / 下期开奖时间 / 接口清单
//   GET /api/draws            → 开奖列表（limit/offset/from/to/order）
//   GET /api/draws/latest     → 最新一期 + 下一期
//   GET /api/draws/check      → 核对号码是否中奖
//   GET /api/draws/:id        → 单期详情（20261104 或 2026-11-04）
//
// 开奖数据直接读站点静态文件（由 deploy/sync.py 从仓库同步），
// 与 Cloudflare 侧的 functions/_lib/draw-api.js 共用同一份查询实现。
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

import { ApiError, API_VERSION, createDrawApi } from './lib/draw-api.js';

const PORT = Number(process.env.PORT || 8801);
const DATA_DIR = process.env.DRAW_DATA_DIR || '/srv/draw/data';
const API_KEY = process.env.DRAW_API_KEY || ''; // 留空 = 不鉴权（公开只读）
const BASES = ['https://mempool.space/api', 'https://blockstream.info/api'];

// 与原 Pages Functions 的 Cache-Control 口径一致：tip 10s，区块 60s，
// 由响应头交给 Cloudflare / 浏览器缓存，进程内只缓存文件读取结果。
const CACHE_DRAWS = 'public, max-age=60, stale-while-revalidate=300';

/* ---------------- 开奖数据：按 mtime 缓存 ---------------- */

const fileCache = new Map();

function readJson(file) {
  try {
    const stat = fs.statSync(file);
    const hit = fileCache.get(file);
    if (hit && hit.mtimeMs === stat.mtimeMs) return hit.value;
    const value = JSON.parse(fs.readFileSync(file, 'utf8'));
    fileCache.set(file, { mtimeMs: stat.mtimeMs, value });
    return value;
  } catch {
    return null;
  }
}

function loadDraws() {
  const archive = readJson(path.join(DATA_DIR, 'draws-archive.json'));
  const rolling = readJson(path.join(DATA_DIR, 'draws.json'));

  const byDate = new Map();
  let updatedAt = null;
  for (const src of [archive, rolling]) {
    if (!src || !Array.isArray(src.draws)) continue;
    for (const d of src.draws) {
      if (d && d.date) byDate.set(d.date, d);
    }
    if (src.updatedAt && (!updatedAt || src.updatedAt > updatedAt)) updatedAt = src.updatedAt;
  }
  return { draws: [...byDate.values()], updatedAt };
}

const drawApi = createDrawApi({ load: loadDraws });

/* ---------------- HTTP 工具 ---------------- */

function fetchText(url, ms = 8000) {
  return fetchWithTimeout(url, ms).then((r) => r.text());
}

function fetchJson(url, ms = 8000) {
  return fetchWithTimeout(url, ms).then((r) => r.json());
}

async function fetchWithTimeout(url, ms) {
  const r = await fetch(url, { signal: AbortSignal.timeout(ms) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r;
}

function send(res, status, body, headers) {
  res.writeHead(status, Object.assign({ 'access-control-allow-origin': '*' }, headers));
  // HEAD 只回头，不回包体
  res.end(res.req && res.req.method === 'HEAD' ? undefined : body);
}

function sendJson(res, obj, status = 200, cacheControl) {
  send(res, status, JSON.stringify(obj), {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': cacheControl || (status === 200 ? 'public, max-age=60' : 'no-store'),
  });
}

function sendApiError(res, status, code, message) {
  sendJson(res, { ok: false, api_version: API_VERSION, error: { code, message } }, status);
}

/* ---------------- 区块相关 ---------------- */

async function handleTip(res) {
  for (const base of BASES) {
    try {
      const text = await fetchText(`${base}/blocks/tip/height`);
      return send(res, 200, text, {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=10',
      });
    } catch {
      /* 换下一个源 */
    }
  }
  send(res, 502, '上游数据源请求失败', { 'content-type': 'text/plain; charset=utf-8' });
}

async function handleBlock(res, height) {
  if (!/^\d{1,8}$/.test(height)) return sendJson(res, { error: '无效的区块高度' }, 400);

  for (const base of BASES) {
    try {
      const rh = await fetch(`${base}/block-height/${height}`, {
        signal: AbortSignal.timeout(8000),
      });
      // 还没出块：保持与原实现一致的 pending 语义
      if (rh.status === 404) return sendJson(res, { status: 'pending', height: Number(height) });
      if (!rh.ok) continue;

      const hash = (await rh.text()).trim();
      const b = await fetchJson(`${base}/block/${hash}`);

      // 号码规则与 scripts/draw.mjs、前端 app.js 一致：
      // 从哈希末尾往前收集 6 个数字（0-9，字母跳过），扫描顺序即号码顺序
      const digits = [];
      for (let i = b.id.length - 1; i >= 0 && digits.length < 6; i--) {
        const c = b.id[i];
        if (c >= '0' && c <= '9') digits.push(c);
      }
      return sendJson(res, {
        status: 'mined',
        height: b.height,
        hash: b.id,
        time: b.timestamp,
        number: digits.join(''),
      });
    } catch {
      /* 换下一个源 */
    }
  }
  sendJson(res, { error: '上游数据源请求失败' }, 502);
}

/* ---------------- 开奖查询 ---------------- */

function keyOk(req, url) {
  if (!API_KEY) return true;
  const got = req.headers['x-api-key'] || url.searchParams.get('key') || '';
  return got === API_KEY;
}

async function handleDraws(req, res, url, route) {
  if (!keyOk(req, url)) return sendApiError(res, 401, 'unauthorized', 'API Key 无效');
  try {
    const { status, body } = await drawApi.handle({ path: route, query: url.searchParams });
    sendJson(res, body, status, status === 200 ? CACHE_DRAWS : 'no-store');
  } catch (err) {
    if (err instanceof ApiError) return sendApiError(res, err.status, err.code, err.message);
    sendApiError(res, 500, 'internal', '服务内部错误');
  }
}

/* ---------------- 服务 ---------------- */

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  if (req.method === 'OPTIONS') {
    return send(res, 204, '', {
      'access-control-allow-methods': 'GET,HEAD,OPTIONS',
      'access-control-allow-headers': '*',
      'access-control-max-age': '86400',
    });
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, { error: 'method not allowed' }, 405);
  }

  try {
    if (pathname === '/api/tip') return await handleTip(res);

    const m = pathname.match(/^\/api\/block\/([^/]+)$/);
    if (m) return await handleBlock(res, m[1]);

    if (pathname === '/api/health') return sendJson(res, { ok: true, uptime: process.uptime() });

    // 其余 /api/* 交给共用查询层
    if (pathname === '/api' || pathname.startsWith('/api/')) {
      const route = pathname.slice('/api'.length);
      if (route === '' || route.startsWith('/meta') || route.startsWith('/draws')) {
        return await handleDraws(req, res, url, route);
      }
    }

    sendJson(res, { error: 'not found' }, 404);
  } catch (err) {
    sendJson(res, { error: String(err && err.message) }, 500);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[lottery-api] listening on :${PORT}  data=${DATA_DIR}  key=${API_KEY ? 'on' : 'off'}`);
});
