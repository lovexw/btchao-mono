// GET /api/draws/latest → 最新一期 + 下一期开奖时间
import { handleApi } from '../../_lib/pages.js';

export const onRequestGet = (context) => handleApi(context, '/draws/latest');
