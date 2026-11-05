// GET /api/meta → 规则、期数、最新/最早期、下期开奖时间、接口清单
import { handleRoute } from '../_lib/pages.js';

export const onRequest = (context) => handleRoute(context, '/meta');
