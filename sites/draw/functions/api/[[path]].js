// /api/* 兜底：不认识的接口返回 JSON 404，
// 而不是掉到静态资源去（那样会返回首页 HTML，对接方很难排查）。
import { handleRoute } from '../_lib/pages.js';

export const onRequest = (context) => {
  const path = new URL(context.request.url).pathname.replace(/^\/api/, '') || '/';
  return handleRoute(context, path);
};
