// GET /api/draws/check?number=502105[&date=2026-11-04] → 核对号码
// 静态路由优先于 [date].js，不会被当成期号
import { handleApi } from '../../_lib/pages.js';

export const onRequestGet = (context) => handleApi(context, '/draws/check');
