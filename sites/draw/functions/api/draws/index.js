// GET /api/draws → 开奖列表（limit / offset / from / to / order）
import { handleApi } from '../../_lib/pages.js';

export const onRequestGet = (context) => handleApi(context, '/draws');
