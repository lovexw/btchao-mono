/* ============================================================
   Pages Functions 适配层：把静态资源里的开奖数据喂给共用 API
   数据来源是站内静态文件（随部署更新），不依赖任何外部服务。
   ============================================================ */
import { ApiError, createDrawApi } from './draw-api.js';

const CACHE_OK = 'public, max-age=60, stale-while-revalidate=300';
const CACHE_ERR = 'no-store';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': status === 200 ? CACHE_OK : CACHE_ERR,
    },
  });
}

/** 读站内静态 JSON；不存在或损坏返回 null，由调用方兜底 */
async function readAsset(context, pathname) {
  const url = new URL(pathname, context.request.url);
  const assets = context.env && context.env.ASSETS;
  const res = assets ? await assets.fetch(new Request(url)) : await fetch(url);
  if (!res.ok) return null;
  // 静态资源若被替换成 404 页面，这里会抛错，交给调用方兜底
  return await res.json();
}

/** 合并「全量存档」与「最近 15 期」，后者优先（两处写入同一次任务，内容一致） */
export async function loadDraws(context) {
  const [archive, rolling] = await Promise.all([
    readAsset(context, '/data/draws-archive.json').catch(() => null),
    readAsset(context, '/data/draws.json').catch(() => null),
  ]);

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

/**
 * 统一入口：route 为去掉 /api 前缀的路径
 */
export async function handleApi(context, route) {
  const api = createDrawApi({ load: () => loadDraws(context) });
  try {
    const { status, body } = await api.handle({
      path: route,
      query: new URL(context.request.url).searchParams,
    });
    return jsonResponse(body, status);
  } catch (err) {
    if (err instanceof ApiError) {
      return jsonResponse(
        { ok: false, api_version: '1.0.0', error: { code: err.code, message: err.message } },
        err.status,
      );
    }
    return jsonResponse(
      { ok: false, api_version: '1.0.0', error: { code: 'internal', message: '服务内部错误' } },
      500,
    );
  }
}
