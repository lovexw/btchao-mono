#!/usr/bin/env python3
"""
把统一风格接入分站的所有 HTML 页面（幂等，可重复运行）:
  1. <head> 里插入 tokens.css 引用
  2. </body> 前插入统一页脚挂载点 + footer.js

用法:
  python3 scripts/integrate-shared.py sites/paper            # 单个站（递归其下所有 .html）
  python3 scripts/integrate-shared.py sites/hold sites/buy   # 多个站

副本文件由 scripts/sync-shared.sh 生成，本脚本只负责写引用。
相对路径 btc-shared/ 适用于页面都在站点根目录下一级的情况。
"""
import sys
from pathlib import Path

TOKENS_SNIPPET = '<link rel="stylesheet" href="btc-shared/styles/tokens.css">'
FOOTER_SNIPPET = '<div id="btc-footer"></div>\n<script src="btc-shared/footer.js" defer></script>'


def integrate(site: Path) -> None:
    pages = sorted(site.rglob("*.html"))
    if not pages:
        print(f"⚠️  {site}: 没有 .html 文件")
        return
    for page in pages:
        if "btc-shared" in page.parts or "node_modules" in page.parts or "dist" in page.parts:
            continue  # 副本目录与构建产物不动
        html = page.read_text(encoding="utf-8")
        orig = html
        changed = []

        if TOKENS_SNIPPET not in html and "</head>" in html:
            if html.count("</head>") == 1:
                html = html.replace("</head>", "  " + TOKENS_SNIPPET + "\n</head>")
                changed.append("tokens")
        if "id=\"btc-footer\"" not in html and "</body>" in html:
            if html.count("</body>") == 1:
                html = html.replace("</body>", FOOTER_SNIPPET + "\n</body>")
                changed.append("footer")

        if changed:
            page.write_text(html, encoding="utf-8")
        rel = page.relative_to(site.parent)
        print(("✏️  " if changed else "⏭  ") + f"{rel} [{', '.join(changed) or '已接入'}]")


def main() -> None:
    roots = [Path(a) for a in sys.argv[1:]]
    if not roots:
        print(__doc__)
        sys.exit(1)
    for root in roots:
        if not root.exists():
            print(f"❌ {root} 不存在")
            continue
        print(f"—— {root} ——")
        integrate(root)


if __name__ == "__main__":
    main()
