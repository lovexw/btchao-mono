#!/usr/bin/env python3
"""
色调归一补丁（一次性迁移工具，保留备查）:
把各站自有设计令牌重定向到 btchao 统一标准（shared/styles/tokens.css）。
规则 = 精确字符串替换（带出现次数报告），全局色值替换 = 词边界正则。
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# 精确替换: 文件 -> [(说明, 旧串, 新串, 期望次数)]
EXACT = {
    "sites/paper/styles.css": [
        ("--bg 指向标准底色", "  --bg: #f7f4ee;", "  --bg: var(--btc-bg, #f7f4ee);", 1),
        ("--accent 指向标准橙", "  --accent: #e8860c;", "  --accent: var(--btc-orange, #e8860c);", 1),
        ("--accent-soft 指向标准浅橙", "  --accent-soft: #fdf0dc;", "  --accent-soft: var(--btc-orange-faint, #fdf0dc);", 1),
    ],
    "sites/yuyan/css/style.css": [
        ("--accent 指向标准橙", "    --accent: #f7931a;", "    --accent: var(--btc-orange, #f7931a);", 1),
        ("补上缺失的 --bg/--text 定义", "    --nav-h: 60px;\n}", "    --nav-h: 60px;\n\n    --bg: var(--btc-bg, #ffffff);\n    --text: var(--btc-text, #1a1a1a);\n}", 1),
    ],
    "sites/timeline/styles.css": [
        ("body 底色/文字指向标准", "    color: #333;\n    background-color: #fafafa;", "    color: var(--btc-text, #333);\n    background-color: var(--btc-bg, #fafafa);", 1),
    ],
    "sites/timeline/mobile.css": [],
    "sites/hold/style.css": [
        ("--bg 指向标准底色", "  --bg: #FBF8F3;", "  --bg: var(--btc-bg, #FBF8F3);", 1),
    ],
    "sites/quantum/styles.css": [
        ("--paper 指向标准底色", "  --paper: #f7f4ee;", "  --paper: var(--btc-bg, #f7f4ee);", 1),
        ("--accent 指向标准橙", "  --accent: #e8862d;", "  --accent: var(--btc-orange, #e8862d);", 1),
        ("--accent-soft 指向标准浅橙", "  --accent-soft: #fdf1e3;", "  --accent-soft: var(--btc-orange-faint, #fdf1e3);", 1),
    ],
    "sites/password/index.html": [
        ("--background 指向标准底色", "--background: #FAFAFA;", "--background: var(--btc-bg, #FAFAFA);", 1),
        ("--accent-color 指向标准橙", "--accent-color: #FF9900;", "--accent-color: var(--btc-orange, #FF9900);", 1),
        ("--accent-hover 指向标准悬停橙", "--accent-hover: #E68A00;", "--accent-hover: var(--btc-orange-hover, #E68A00);", 1),
    ],
    "sites/buy/styles.css": [
        ("--background 指向标准底色", "    --background: #FAFAFA;", "    --background: var(--btc-bg, #FAFAFA);", 1),
    ],
    "sites/ahr-dca/assets/styles.css": [
        ("--accent 对齐标准橙(保持深色主题)", "  --accent: #f7931a;", "  --accent: var(--btc-orange, #f7931a);", 1),
        ("--accent-2 对齐标准浅橙", "  --accent-2: #ffb84d;", "  --accent-2: var(--btc-orange-soft, #ffb84d);", 1),
    ],
    "sites/ma/src/theme.js": [
        ("MUI 底色统一为暖奶油", "background: { default: '#F6F7F9', paper: '#FFFFFF' },", "background: { default: '#FFFBF2', paper: '#FFFFFF' },", 1),
        ("MUI 分隔线对齐标准边框色", "divider: '#E7E9EE'", "divider: '#EEEEEE'", 1),
    ],
}

# 全局替换: 文件 -> [(说明, 正则, 替换)]
GLOBAL = {
    "sites/timeline/styles.css": [
        ("比特币橙归一", r"#f7931a\b", "var(--btc-orange, #f7931a)"),
        ("次级文字归一", r"#666\b", "var(--btc-text-2, #666)"),
    ],
    "sites/timeline/mobile.css": [
        ("比特币橙归一", r"#f7931a\b", "var(--btc-orange, #f7931a)"),
    ],
    "sites/yuyan/css/style.css": [
        ("比特币橙归一", r"#f7931a\b", "var(--btc-orange, #f7931a)"),
        ("紫色调暖(标准悬停橙)", r"#8b5cf6\b", "var(--btc-orange-hover, #8b5cf6)"),
        ("琥珀调暖(标准浅橙)", r"#fbbf24\b", "var(--btc-orange-soft, #fbbf24)"),
    ],
    "sites/buy/styles.css": [
        ("标准橙归一", r"#ff9900\b", "var(--btc-orange, #ff9900)"),
        ("悬停橙归一", r"#e68a00\b", "var(--btc-orange-hover, #e68a00)"),
    ],
    "sites/cold-wallet/index.html": [
        ("标准橙归一", r"#ff9900\b", "var(--btc-orange, #ff9900)"),
        ("边框灰对齐标准边框", r"#e0e0e0\b", "var(--btc-border, #e0e0e0)"),
    ],
    "sites/flash-buy/src/index.css": [
        ("比特币橙归一", r"#f7931a\b", "var(--btc-orange, #f7931a)"),
    ],
}


def run() -> None:
    ok = True
    for rel, rules in EXACT.items():
        f = ROOT / rel
        if not f.exists():
            print(f"❌ 不存在: {rel}"); ok = False; continue
        text = f.read_text(encoding="utf-8")
        for name, old, new, expect in rules:
            n = text.count(old)
            if n != expect:
                print(f"⚠️  {rel} [{name}] 出现 {n} 次（期望 {expect}），请人工检查"); ok = False
                continue
            text = text.replace(old, new)
            print(f"✅ {rel} [{name}] ×{n}")
        f.write_text(text, encoding="utf-8")

    for rel, rules in GLOBAL.items():
        f = ROOT / rel
        if not f.exists():
            print(f"❌ 不存在: {rel}"); ok = False; continue
        text = f.read_text(encoding="utf-8")
        for name, pat, new in rules:
            text, n = re.subn(pat, new, text, flags=re.IGNORECASE)
            print(("✅" if n else "⚠️ ") + f" {rel} [{name}] ×{n}")
            if n == 0:
                ok = False
        f.write_text(text, encoding="utf-8")

    print("\n" + ("🎉 全部替换按预期完成" if ok else "⚠️ 有条目需要人工复核（见上方 ⚠️）"))


if __name__ == "__main__":
    run()
