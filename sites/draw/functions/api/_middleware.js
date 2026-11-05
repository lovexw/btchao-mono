// /api/* 统一中间件：应答 CORS 预检，并给所有响应补上跨域头。
// 会员系统在浏览器里带 X-API-Key 调接口时会先发 OPTIONS，没有这段会 405。
export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,HEAD,OPTIONS',
        'access-control-allow-headers': '*',
        'access-control-max-age': '86400',
      },
    });
  }

  const res = await context.next();
  if (res.headers.has('access-control-allow-origin')) return res;

  const headers = new Headers(res.headers);
  headers.set('access-control-allow-origin', '*');
  return new Response(res.body, { status: res.status, headers });
}
