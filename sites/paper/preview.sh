#!/bin/bash

# 比特币白皮书 · 小吴乐意翻译版 - 本地预览

echo "=========================================="
echo "比特币白皮书 · 小吴乐意翻译版"
echo "=========================================="
echo ""
echo "启动本地服务器..."
echo "访问地址: http://localhost:8000"
echo "按 Ctrl+C 停止"
echo ""

if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "错误: 未找到 Python，也可以用 npx serve 等任意静态服务器预览"
    exit 1
fi
