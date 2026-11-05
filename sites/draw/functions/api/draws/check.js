// GET /api/draws/check?number=502105[&date=2026-11-04] → 核对号码
// 静态路由优先于 [date].js，不会被当成期号
import { handleRoute } from '../../_lib/pages.js';

export const onRequest = (context) => handleRoute(context, '/draws/check');
