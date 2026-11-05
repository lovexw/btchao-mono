// GET /api/draws/:periodOrDate → 单期详情（20261104 或 2026-11-04）
import { handleApi } from '../../_lib/pages.js';

export const onRequestGet = (context) =>
  handleApi(context, `/draws/${encodeURIComponent(context.params.date)}`);
