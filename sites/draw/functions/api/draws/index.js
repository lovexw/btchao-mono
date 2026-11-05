// GET /api/draws → 开奖列表（limit / offset / from / to / order）
import { handleRoute } from '../../_lib/pages.js';

export const onRequest = (context) => handleRoute(context, '/draws');
