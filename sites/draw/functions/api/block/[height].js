// GET /api/block/:height → { status, height, hash, time, number }
const BASES = ['https://mempool.space/api', 'https://blockstream.info/api'];

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': status === 200 ? 'public, max-age=60' : 'no-store',
    },
  });
}

export async function onRequestGet({ params }) {
  const h = String(params.height || '');
  if (!/^\d{1,8}$/.test(h)) return json({ error: '无效的区块高度' }, 400);

  for (const base of BASES) {
    try {
      const rh = await fetch(`${base}/block-height/${h}`, { signal: AbortSignal.timeout(8000) });
      if (rh.status === 404) return json({ status: 'pending', height: Number(h) });
      if (!rh.ok) continue;
      const hash = (await rh.text()).trim();
      const rb = await fetch(`${base}/block/${hash}`, { signal: AbortSignal.timeout(8000) });
      if (!rb.ok) continue;
      const b = await rb.json();
      // 号码规则与 scripts/draw.mjs、前端 app.js 一致：
      // 从哈希末尾往前收集 6 个数字（0-9，字母跳过），扫描顺序即号码顺序
      const digits = [];
      for (let i = b.id.length - 1; i >= 0 && digits.length < 6; i--) {
        const c = b.id[i];
        if (c >= '0' && c <= '9') digits.push(c);
      }
      const number = digits.join('');
      return json({ status: 'mined', height: b.height, hash: b.id, time: b.timestamp, number });
    } catch { /* 尝试下一个数据源 */ }
  }
  return json({ error: '上游数据源请求失败' }, 502);
}
