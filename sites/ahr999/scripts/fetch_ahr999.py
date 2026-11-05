#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""抓取 / 计算 AHR999 指标，产出 sites/ahr999/public/ahr999-data.json。

背景：原先唯一数据源 https://9992100.xyz/api/ahr999 于 2026-10-30 起持续返回 500，
整个数据链路（Actions → json → Cloudflare Pages）随之停摆。本脚本改成：

  1. 先试上游 API（它恢复后仍以它为准，保持与历史数值一致）；
  2. 上游不可用 → 用公开日线自己算 AHR999（公式与站点说明页一致）：
        AHR999 = (价格 / 200日几何均价) × (价格 / 指数增长估值)
        指数增长估值 = 10^(5.84 × log10(币龄天数) − 17.01)
  3. 全部源都失败时以非 0 退出，**不动**已有 json，避免把站点写成空数据。

用法：
    python3 sites/ahr999/scripts/fetch_ahr999.py [--dry-run]
"""

import argparse
import json
import math
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import date, datetime, timedelta, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PATH = os.path.join(ROOT, "public", "ahr999-data.json")

UPSTREAM_API = "https://9992100.xyz/api/ahr999"
GENESIS = date(2009, 1, 3)
REQUIRED_KEYS = [
    "ahr999",
    "price_usd",
    "gma200_usd",
    "coin_age_days",
    "index_growth_valuation_usd",
    "updated_at_unix",
]

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36"


def log(msg):
    print(f"[ahr999] {msg}", flush=True)


def http_json(url, timeout=30, retries=2):
    last = None
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                if resp.status != 200:
                    raise RuntimeError(f"HTTP {resp.status}")
                return json.loads(resp.read().decode("utf-8"))
        except Exception as exc:  # noqa: BLE001
            last = exc
            if attempt < retries:
                time.sleep(2 + attempt * 3)
    raise RuntimeError(f"{url} 请求失败: {last}")


# --------------------------------------------------------------------------- #
# 上游 API
# --------------------------------------------------------------------------- #
def from_upstream():
    data = http_json(UPSTREAM_API, timeout=15, retries=1)
    missing = [k for k in REQUIRED_KEYS if k not in data]
    if missing:
        raise RuntimeError(f"上游字段缺失: {missing}")
    if not isinstance(data.get("ahr999"), (int, float)):
        raise RuntimeError("上游 ahr999 不是数字")
    return data, "9992100.xyz API"


# --------------------------------------------------------------------------- #
# 日线收盘价：多源兜底，统一成 [(date, price), ...] 升序
# --------------------------------------------------------------------------- #
def _rows_to_series(pairs):
    series = [(d, float(p)) for d, p in pairs if p and float(p) > 0]
    series.sort(key=lambda x: x[0])
    # 同一天去重（保留最后一条）
    dedup = {}
    for d, p in series:
        dedup[d] = p
    return sorted(dedup.items())


def series_bitview():
    url = "https://bitview.space/api/series/bulk?index=day1&series=date,price&start=-5000"
    payload = http_json(url, timeout=30)
    dates = next(x["data"] for x in payload if x.get("type") == "Date")
    prices = next(x["data"] for x in payload if x.get("type") == "Dollars")
    pairs = [(date.fromisoformat(d), p) for d, p in zip(dates, prices)]
    return _rows_to_series(pairs), "bitview.space 日线"


def series_kraken():
    url = "https://api.kraken.com/0/public/OHLC?pair=XBTUSD&interval=1440"
    payload = http_json(url)
    result = payload.get("result", {})
    key = next(k for k in result if k != "last")
    pairs = []
    for row in result[key]:
        ts = datetime.fromtimestamp(int(row[0]), tz=timezone.utc).date()
        pairs.append((ts, row[4]))  # close
    return _rows_to_series(pairs), "Kraken 日线"


def series_bitstamp():
    url = "https://www.bitstamp.net/api/v2/ohlc/btcusd/?step=86400&limit=1000"
    payload = http_json(url)
    pairs = []
    for row in payload["data"]["ohlc"]:
        ts = datetime.fromtimestamp(int(row["timestamp"]), tz=timezone.utc).date()
        pairs.append((ts, row["close"]))
    return _rows_to_series(pairs), "Bitstamp 日线"


def series_coinbase():
    url = "https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=86400"
    payload = http_json(url)
    pairs = []
    for row in payload:  # [time, low, high, open, close, volume]
        ts = datetime.fromtimestamp(int(row[0]), tz=timezone.utc).date()
        pairs.append((ts, row[4]))
    return _rows_to_series(pairs), "Coinbase 日线"


def series_coingecko():
    url = (
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart"
        "?vs_currency=usd&days=365&interval=daily"
    )
    payload = http_json(url, timeout=35)
    pairs = []
    for ms, price in payload.get("prices", []):
        ts = datetime.fromtimestamp(ms / 1000, tz=timezone.utc).date()
        pairs.append((ts, price))
    return _rows_to_series(pairs), "CoinGecko 日线"


SERIES_SOURCES = [
    ("bitview", series_bitview),
    ("kraken", series_kraken),
    ("bitstamp", series_bitstamp),
    ("coinbase", series_coinbase),
    ("coingecko", series_coingecko),
]


def collect_series():
    errors = []
    for name, fn in SERIES_SOURCES:
        try:
            series, label = fn()
            if len(series) < 200:
                raise RuntimeError(f"只有 {len(series)} 条日线，不足 200")
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{name}: {exc}")
            log(f"日线源 {name} 不可用 —— {exc}")
            continue
        log(f"日线源可用：{label}（{len(series)} 条，{series[0][0]} → {series[-1][0]}）")
        return series, label
    raise RuntimeError("所有日线源都失败:\n  " + "\n  ".join(errors))


# --------------------------------------------------------------------------- #
# 指标计算
# --------------------------------------------------------------------------- #
def growth_valuation(coin_age_days):
    """指数增长估值：10^(5.84 × log10(币龄) − 17.01)，与原 ahr999 经典公式一致。"""
    return 10 ** (5.84 * math.log10(coin_age_days) - 17.01)


def gma(series_slice):
    """200 日几何均价。"""
    return math.exp(sum(math.log(p) for _, p in series_slice) / len(series_slice))


def compute_at(series, upto, price=None):
    """用截至 upto 的最近 200 根日线算一天的指标。"""
    window = [row for row in series if row[0] <= upto][-200:]
    if len(window) < 200:
        raise RuntimeError(f"{upto} 之前不足 200 根日线")
    px = float(price if price is not None else window[-1][1])
    # 币龄按「含创世当天算第 1 天」计，与上游 API 口径一致
    age = (window[-1][0] - GENESIS).days + 1
    g200 = gma(window)
    igv = growth_valuation(age)
    ahr = (px / g200) * (px / igv)
    return {
        "price": px,
        "gma200": g200,
        "coin_age_days": age,
        "igv": igv,
        "ahr999": ahr,
    }


def from_public_data():
    series, label = collect_series()
    today = series[-1][0]
    now = compute_at(series, today)

    # 近 7 天序列（用各自当天的 200 日窗口复算）
    series_7d = []
    for d, p in series[-7:]:
        try:
            item = compute_at(series, d, price=p)
        except RuntimeError:
            continue
        series_7d.append({"t": int(datetime(*d.timetuple()[:3], tzinfo=timezone.utc).timestamp()), "ahr999": item["ahr999"]})

    data = {
        "source": label,
        "price_usd": now["price"],
        "gma200_usd": now["gma200"],
        "coin_age_days": now["coin_age_days"],
        "index_growth_valuation_usd": now["igv"],
        "ahr999": now["ahr999"],
        "updated_at_unix": int(time.time()),
        "series_7d": series_7d,
        "fear_greed": fetch_fear_greed(),
        "btc_dominance_pct": fetch_dominance(),
        "btc_dominance_source": "coingecko",
        "computed": True,
    }
    return data, f"本地复算（{label}）"


def fetch_fear_greed():
    try:
        payload = http_json("https://api.alternative.me/fng/?limit=1", timeout=20, retries=1)
        item = payload["data"][0]
        return {
            "value": int(item["value"]),
            "classification": item["value_classification"],
            "timestamp_unix": int(item["timestamp"]),
            "source": "alternative.me",
        }
    except Exception as exc:  # noqa: BLE001
        log(f"恐慌贪婪指数获取失败（可忽略）：{exc}")
        return None


def fetch_dominance():
    try:
        payload = http_json("https://api.coingecko.com/api/v3/global", timeout=15, retries=0)
        return round(float(payload["data"]["market_cap_percentage"]["btc"]), 4)
    except Exception as exc:  # noqa: BLE001
        log(f"BTC 市占率获取失败（可忽略）：{exc}")
        return None


# --------------------------------------------------------------------------- #
# 校验 / 落盘
# --------------------------------------------------------------------------- #
def read_previous():
    try:
        with open(OUT_PATH, encoding="utf-8") as f:
            return json.load(f)
    except Exception:  # noqa: BLE001
        return None


def sanity_check(data, previous):
    ahr = data.get("ahr999")
    price = data.get("price_usd")
    if not isinstance(ahr, (int, float)) or not math.isfinite(ahr) or not (0.005 < ahr < 100):
        raise RuntimeError(f"ahr999 数值异常: {ahr}")
    if not isinstance(price, (int, float)) or price < 100:
        raise RuntimeError(f"price_usd 数值异常: {price}")
    if previous:
        prev_ahr = previous.get("ahr999")
        prev_price = previous.get("price_usd")
        if isinstance(prev_ahr, (int, float)) and prev_ahr > 0:
            drift = abs(ahr / prev_ahr - 1)
            if drift > 0.5:
                raise RuntimeError(f"ahr999 相对上次漂移 {drift:.0%}，拒绝写入（疑似数据源异常）")
        if isinstance(prev_price, (int, float)) and prev_price > 0:
            drift = abs(price / prev_price - 1)
            if drift > 0.4:
                raise RuntimeError(f"价格相对上次漂移 {drift:.0%}，拒绝写入（疑似数据源异常）")
    return True


def write_atomic(data):
    tmp = OUT_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
        f.write("\n")
    os.replace(tmp, OUT_PATH)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="只打印结果，不写文件")
    args = parser.parse_args()

    previous = read_previous()
    errors = []

    data = None
    source = None
    try:
        data, source = from_upstream()
        log("上游 API 正常，直接采用")
    except Exception as exc:  # noqa: BLE001
        log(f"上游 API 不可用 —— {exc}")
        errors.append(f"upstream: {exc}")

    if data is None:
        try:
            data, source = from_public_data()
        except Exception as exc:  # noqa: BLE001
            errors.append(f"compute: {exc}")
            log(f"本地复算也失败 —— {exc}")
            log("保留现有 json 不动，退出码 1")
            return 1

    data.setdefault("source", source)
    data.setdefault("updated_at_unix", int(time.time()))

    try:
        sanity_check(data, previous)
    except Exception as exc:  # noqa: BLE001
        log(f"校验未通过 —— {exc}")
        return 1

    summary = (
        f"来源={source} ahr999={data['ahr999']:.4f} 价格=${data['price_usd']:,.0f} "
        f"gma200=${data.get('gma200_usd') or 0:,.0f} 币龄={data.get('coin_age_days')}"
    )
    log(summary)

    if args.dry_run:
        print(json.dumps(data, ensure_ascii=False, indent=2)[:1200])
        return 0

    write_atomic(data)
    log(f"已写入 {OUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
