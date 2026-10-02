#!/usr/bin/env node
/* ============================================================
   BTC 开奖 — 开奖脚本
   规则：每天北京时间 12:00，取该时刻之前挖出的最新区块；
        开奖号码 = 从区块哈希末尾往前收集 6 个数字（0-9，字母跳过），
        扫描顺序即号码顺序（哈希最后一位数字 = 号码第一位）。
   数据：写入 sites/draw/data/draws.json，滚动保留最近 15 期。

   用法：
     node scripts/draw.mjs                  # 开今天的奖（已开过则跳过）
     node scripts/draw.mjs --date 2026-10-01  # 开指定日期的奖
     node scripts/draw.mjs --backfill 15      # 回填最近 15 天
     node scripts/draw.mjs --force            # 强制重开今天的奖
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = join(ROOT, 'data', 'draws.json');
const KEEP = 15;                 // 循环覆盖，保留最近 15 天
const BJ_TZ = 'Asia/Shanghai';   // 北京时间 UTC+8
const TIMEOUT_MS = 15000;

// esplora 兼容数据源，依次降级
const API_BASES = ['https://mempool.space/api', 'https://blockstream.info/api'];

/* ---------------- 数据源请求 ---------------- */
async function esplora(path) {
  let lastErr;
  for (const base of API_BASES) {
    try {
      const r = await fetch(base + path, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (r.status === 404) { const e = new Error('404'); e.notFound = true; throw e; }
      if (!r.ok) throw new Error(`HTTP ${r.status} @ ${base}${path}`);
      return (await r.text()).trim();
    } catch (e) {
      if (e.notFound) throw e;
      lastErr = e;
    }
  }
  throw lastErr;
}

const tipHeight = async () => Number(await esplora('/blocks/tip/height'));
const hashAt = async (h) => await esplora(`/block-height/${h}`);
const blockAt = async (h) => JSON.parse(await esplora(`/block/${await hashAt(h)}`));

/* ---------------- 号码规则 ----------------
   从哈希末尾往前逐位扫描，只要数字 0-9，遇到字母（a-f）跳过，
   凑满 6 个数字为止；扫描顺序即开奖号码（哈希最后一位数字 = 号码第一位） */
export function lotteryNumber(hash) {
  const digits = [];
  for (let pass = 0; pass < 2 && digits.length < 6; pass++) {
    for (let i = hash.length - 1; i >= 0 && digits.length < 6; i--) {
      const c = hash[i];
      if (c >= '0' && c <= '9') digits.push(c);
    }
  }
  while (digits.length < 6) digits.push('0'); // 64 位哈希实际不会走到这里
  return digits.join('');
}

/* ---------------- 北京时间工具 ---------------- */
// 某北京日期 YYYY-MM-DD 对应 12:00 整的时间戳
export function targetEpochFor(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return Date.UTC(y, m - 1, d, 4, 0, 0); // 北京 12:00 = UTC 04:00
}

// 今天的北京日期
export function beijingToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: BJ_TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}

function beijingDaysAgo(n) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: BJ_TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date(Date.now() - n * 86400e3));
}

/* ---------------- 找开奖区块：北京时间 12:00 前挖出的最新区块 ---------------- */
function notYetError(dateStr) {
  const e = new Error(`${dateStr} 的开奖时刻（北京时间 12:00）还没到，本期未开奖`);
  e.notYet = true;
  return e;
}

export async function findDrawBlock(dateStr) {
  const targetSec = targetEpochFor(dateStr) / 1000;
  if (Date.now() / 1000 < targetSec) throw notYetError(dateStr);

  const tip = await blockAt(await tipHeight());
  if (tip.timestamp <= targetSec) return tip; // 刚过 12:00 且未出新块

  // 二分查找最大高度 h，使 block(h).time <= targetSec
  // 不变量：lo 的时间戳 <= target，hi 的时间戳 > target
  let hi = tip.height;
  let lo = Math.max(0, hi - 144); // 先按约 1 天的出块节奏猜
  while (lo > 0) {
    const blo = await blockAt(lo);
    if (blo.timestamp <= targetSec) break;
    hi = lo;
    lo = Math.max(0, lo - (tip.height - lo) * 2); // 指数回退扩大范围
  }
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    const bm = await blockAt(mid);
    if (bm.timestamp <= targetSec) lo = mid; else hi = mid;
  }
  return await blockAt(lo);
}

/* ---------------- 数据读写 ---------------- */
function loadData() {
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { rule: '开奖号码 = 从开奖区块哈希末尾往前收集 6 个数字（0-9，字母跳过，扫描顺序即号码顺序）；开奖区块 = 每天北京时间 12:00 前挖出的最新区块', updatedAt: null, draws: [] };
  }
}

function saveData(data) {
  mkdirSync(dirname(DATA_FILE), { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
}

/* ---------------- 执行某天的开奖 ---------------- */
async function drawFor(dateStr, { force = false } = {}) {
  const data = loadData();
  const existing = data.draws.find((d) => d.date === dateStr);
  if (existing && !force) {
    console.log(`= ${dateStr} 已有开奖记录（区块 #${existing.height}，号码 ${existing.number}），跳过`);
    return;
  }
  const b = await findDrawBlock(dateStr);
  const draw = {
    date: dateStr,
    height: b.height,
    hash: b.id,
    time: new Date(b.timestamp * 1000).toISOString(),
    number: lotteryNumber(b.id),
  };
  const rest = data.draws.filter((d) => d.date !== dateStr);
  rest.push(draw);
  rest.sort((a, x) => x.date.localeCompare(a.date)); // 新的在前
  data.draws = rest.slice(0, KEEP);
  data.updatedAt = new Date().toISOString();
  saveData(data);
  console.log(`✓ ${dateStr} 开奖：区块 #${draw.height}  哈希 ${draw.hash}  号码 ${draw.number}`);
}

/* ---------------- CLI ---------------- */
const args = process.argv.slice(2);

async function main() {
  try {
    if (args[0] === '--backfill') {
      const n = Math.max(1, Math.min(60, Number(args[1]) || KEEP));
      console.log(`回填最近 ${n} 天开奖数据…`);
      for (let i = 0; i < n; i++) {
        const date = beijingDaysAgo(i);
        try { await drawFor(date, { force: true }); }
        catch (e) { if (e.notYet) console.log(`= ${e.message}`); else throw e; }
      }
    } else if (args[0] === '--date') {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(args[1] || '')) throw new Error('用法：node scripts/draw.mjs --date YYYY-MM-DD');
      await drawFor(args[1], { force: args.includes('--force') });
    } else {
      await drawFor(beijingToday(), { force: args.includes('--force') });
    }
  } catch (e) {
    if (e.notYet) { console.log(`= ${e.message}，跳过`); return; }
    throw e;
  }
}

main().catch((e) => {
  console.error('✗ 开奖失败：', e.message);
  process.exit(1);
});
