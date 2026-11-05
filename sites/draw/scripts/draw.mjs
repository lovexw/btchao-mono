#!/usr/bin/env node
/* ============================================================
   BTC 开奖 — 开奖脚本
   规则：每天北京时间 12:00，取该时刻之前挖出的最新区块；
        开奖号码 = 从区块哈希末尾往前收集 6 个数字（0-9，字母跳过），
        扫描顺序即号码顺序（哈希最后一位数字 = 号码第一位）。
   数据：sites/draw/data/draws.json          滚动保留最近 15 期（首页展示）
        sites/draw/data/draws-archive.json  全量归档（查询 API / 会员系统用）

   用法：
     node scripts/draw.mjs                  # 开今天的奖（已开过则跳过）
     node scripts/draw.mjs --date 2026-10-01  # 开指定日期的奖
     node scripts/draw.mjs --backfill 90      # 回填最近 90 天（已有记录自动跳过）
     node scripts/draw.mjs --force            # 强制重开今天的奖
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = join(ROOT, 'data', 'draws.json');
const ARCHIVE_FILE = join(ROOT, 'data', 'draws-archive.json');
const KEEP = 15;                 // 首页循环覆盖，保留最近 15 天
const ARCHIVE_KEEP = 4000;       // 归档上限，约 11 年，实际等于不删
const BJ_TZ = 'Asia/Shanghai';   // 北京时间 UTC+8
const TIMEOUT_MS = 15000;

// esplora 兼容数据源，依次降级
const API_BASES = ['https://mempool.space/api', 'https://blockstream.info/api'];

// 回填时对上游更客气一点：每次请求之间歇一下，避免被 429
let PACE_MS = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- 数据源请求 ---------------- */
async function esplora(path) {
  let lastErr;
  for (const base of API_BASES) {
    try {
      const r = await fetch(base + path, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (r.status === 404) { const e = new Error('404'); e.notFound = true; throw e; }
      if (!r.ok) throw new Error(`HTTP ${r.status} @ ${base}${path}`);
      const text = (await r.text()).trim();
      if (PACE_MS) await sleep(PACE_MS);
      return text;
    } catch (e) {
      if (e.notFound) throw e;
      lastErr = e;
      if (PACE_MS) await sleep(PACE_MS);
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

export async function findDrawBlock(dateStr, hintHeight = null) {
  const targetSec = targetEpochFor(dateStr) / 1000;
  if (Date.now() / 1000 < targetSec) throw notYetError(dateStr);

  const tip = await blockAt(await tipHeight());
  if (tip.timestamp <= targetSec) return tip; // 刚过 12:00 且未出新块

  const seen = new Map(); // 高度 → 区块，避免同一次查找里重复请求
  const at = async (h) => {
    if (seen.has(h)) return seen.get(h);
    const b = await blockAt(h);
    seen.set(h, b);
    return b;
  };
  seen.set(tip.height, tip);

  // 二分查找最大高度 h，使 block(h).time <= targetSec
  // 不变量：lo 的时间戳 <= target，hi 的时间戳 > target
  let hi = tip.height;
  // 有相邻一天的区块高度时从这里起步：一天约 144 块，比从链尖指数回退快得多
  let lo = hintHeight && hintHeight > 0 && hintHeight < hi
    ? Math.max(0, hintHeight - 320)
    : Math.max(0, hi - 144);

  let step = 320;
  while (lo > 0) {
    const blo = await at(lo);
    if (blo.timestamp <= targetSec) break;
    hi = lo;
    step *= 2; // 指数回退扩大范围
    lo = Math.max(0, lo - step);
  }
  if (lo >= hi) lo = Math.max(0, hi - 1);

  // 按两端时间戳线性插值收敛，比纯取中点少一半左右的请求
  while (hi - lo > 1) {
    const tLo = (await at(lo)).timestamp;
    const tHi = (await at(hi)).timestamp;
    let mid = Math.round(lo + ((targetSec - tLo) / (tHi - tLo)) * (hi - lo));
    if (!(mid > lo && mid < hi)) mid = Math.floor((lo + hi) / 2);
    const bm = await at(mid);
    if (bm.timestamp <= targetSec) lo = mid; else hi = mid;
  }
  return await at(lo);
}

/* ---------------- 数据读写 ---------------- */
const RULE = '开奖号码 = 从开奖区块哈希末尾往前收集 6 个数字（0-9，字母跳过，扫描顺序即号码顺序）；开奖区块 = 每天北京时间 12:00 前挖出的最新区块';

function loadData() {
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { rule: RULE, updatedAt: null, draws: [] };
  }
}

function saveData(data) {
  mkdirSync(dirname(DATA_FILE), { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
}

/* 全量归档：查询 API 的数据源，只增不删（同一日期以最新一次开奖为准） */
function loadArchive() {
  try {
    const d = JSON.parse(readFileSync(ARCHIVE_FILE, 'utf8'));
    if (Array.isArray(d.draws)) return d;
  } catch { /* 首次运行没有归档文件 */ }
  return { rule: RULE, updatedAt: null, draws: [] };
}

function saveArchive(archive) {
  mkdirSync(dirname(ARCHIVE_FILE), { recursive: true });
  writeFileSync(ARCHIVE_FILE, JSON.stringify(archive, null, 2) + '\n');
}

/** 把一条开奖记录并进归档；返回是否真的写盘 */
function mergeArchive(archive, draw) {
  const idx = archive.draws.findIndex((d) => d.date === draw.date);
  if (idx >= 0) {
    const old = archive.draws[idx];
    if (old.height === draw.height && old.number === draw.number) return false;
    archive.draws[idx] = draw;
  } else {
    archive.draws.push(draw);
    archive.draws.sort((a, x) => x.date.localeCompare(a.date)); // 新的在前
    if (archive.draws.length > ARCHIVE_KEEP) archive.draws.length = ARCHIVE_KEEP;
  }
  archive.updatedAt = new Date().toISOString();
  saveArchive(archive);
  return true;
}

/* ---------------- 执行某天的开奖 ---------------- */
async function drawFor(dateStr, { force = false, hint = null } = {}) {
  const archive = loadArchive();
  const existing =
    archive.draws.find((d) => d.date === dateStr) ||
    loadData().draws.find((d) => d.date === dateStr);

  if (existing && !force) {
    // 已有记录：顺手补进归档（老数据只在 draws.json 里，第一次回填时补齐）
    if (!archive.draws.some((d) => d.date === dateStr)) {
      mergeArchive(archive, existing);
      console.log(`+ ${dateStr} 已补进归档（区块 #${existing.height}，号码 ${existing.number}）`);
    } else {
      console.log(`= ${dateStr} 已有开奖记录（区块 #${existing.height}，号码 ${existing.number}），跳过`);
    }
    return existing;
  }

  const b = await findDrawBlock(dateStr, hint);
  const draw = {
    date: dateStr,
    height: b.height,
    hash: b.id,
    time: new Date(b.timestamp * 1000).toISOString(),
    number: lotteryNumber(b.id),
  };

  const data = loadData();
  const rest = data.draws.filter((d) => d.date !== dateStr);
  rest.push(draw);
  rest.sort((a, x) => x.date.localeCompare(a.date)); // 新的在前
  data.draws = rest.slice(0, KEEP);
  data.updatedAt = new Date().toISOString();
  saveData(data);

  mergeArchive(archive, draw);
  console.log(`✓ ${dateStr} 开奖：区块 #${draw.height}  哈希 ${draw.hash}  号码 ${draw.number}`);
  return draw;
}

/* ---------------- CLI ---------------- */
const args = process.argv.slice(2);

/** 归档里最新一期的高度；没有归档时退回 draws.json */
function newestKnownHeight() {
  const archive = loadArchive();
  const pool = archive.draws.length ? archive.draws : loadData().draws;
  return pool.length ? pool[0].height : null;
}

async function main() {
  try {
    if (args[0] === '--backfill') {
      const n = Math.max(1, Math.min(400, Number(args[1]) || KEEP));
      PACE_MS = 60; // 回填请求量大，放慢节奏避免被上游限流
      console.log(`回填最近 ${n} 天开奖数据（已有记录自动跳过）…`);
      // 从最新已知区块往回推：相邻两天约差 144 块，二分范围小得多
      let hint = newestKnownHeight();
      for (let i = 0; i < n; i++) {
        const date = beijingDaysAgo(i);
        try {
          const draw = await drawFor(date, { hint });
          if (draw && draw.height) hint = draw.height;
        } catch (e) {
          if (e.notYet) console.log(`= ${e.message}`);
          else throw e;
        }
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
