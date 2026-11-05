// GET /api/draws/latest → 最新一期 + 下一期开奖时间
import { handleRoute } from '../../_lib/pages.js';

export const onRequest = (context) => handleRoute(context, '/draws/latest');
