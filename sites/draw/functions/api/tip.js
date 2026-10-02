// GET /api/tip → 最新区块高度（纯文本）
const BASES = ['https://mempool.space/api', 'https://blockstream.info/api'];

export async function onRequest() {
  for (const base of BASES) {
    try {
      const r = await fetch(`${base}/blocks/tip/height`, {
        signal: AbortSignal.timeout(8000),
        cf: { cacheTtl: 10, cacheEverything: true },
      });
      if (r.ok) {
        return new Response(await r.text(), {
          headers: {
            'content-type': 'text/plain; charset=utf-8',
            'access-control-allow-origin': '*',
            'cache-control': 'public, max-age=10',
          },
        });
      }
    } catch { /* 尝试下一个数据源 */ }
  }
  return new Response('上游数据源请求失败', { status: 502 });
}
