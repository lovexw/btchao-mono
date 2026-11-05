// GET /api/draws/:periodOrDate → 单期详情（20261104 或 2026-11-04）
import { handleRoute } from '../../_lib/pages.js';

export const onRequest = (context) =>
  handleRoute(context, `/draws/${encodeURIComponent(context.params.date)}`);
