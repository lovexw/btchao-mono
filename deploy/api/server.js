// lottery.btchao.com 的两个接口：原来跑在 Cloudflare Pages Functions，
// 迁到甲骨文后用这个常驻小服务顶替，路由与返回格式保持一致。
//
//   GET /api/tip           → 最新区块高度（纯文本）
//   GET /api/block/:height → { status, height, hash, time, number }
import http from 'node:http';

const PORT = Number(process.env.PORT || 8801);
const BASES = ['https://mempool.space/api', 'https://blockstream.info/api'];

// 与原 Pages Functions 的 Cache-Control 口径一致：tip 10s，区块 60s，
// 由响应头交给 Cloudflare / 浏览器缓存，进程内不再自己维护缓存。

async function fetchText(url, ms = 8000) {
  const r = await fetch(url, { signal: AbortSignal.timeout(ms) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
}

async function fetchJson(url, ms = 8000) {
  const r = await fetch(url, { signal: AbortSignal.timeout(ms) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

function send(res, status, body, headers) {
  res.writeHead(status, Object.assign({ 'access-control-allow-origin': '*' }, headers));
  res.end(body);
}

function sendJson(res, obj, status = 200) {
  send(res, status, JSON.stringify(obj), {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': status === 200 ? 'public, max-age=60' : 'no-store',
  });
}

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

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = url.pathname.replace(/\/+$/, '') || '/';

  if (req.method === 'OPTIONS') {
    return send(res, 204, '', {
      'access-control-allow-methods': 'GET,OPTIONS',
      'access-control-allow-headers': '*',
    });
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, { error: 'method not allowed' }, 405);
  }

  try {
    if (path === '/api/tip') return await handleTip(res);

    const m = path.match(/^\/api\/block\/([^/]+)$/);
    if (m) return await handleBlock(res, m[1]);

    if (path === '/api/health') return sendJson(res, { ok: true, uptime: process.uptime() });

    sendJson(res, { error: 'not found' }, 404);
  } catch (err) {
    sendJson(res, { error: String(err && err.message) }, 500);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[lottery-api] listening on :${PORT}`);
});
