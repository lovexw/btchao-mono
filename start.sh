#!/bin/bash

# 比特币大事记网站启动脚本

echo "🪙 比特币大事记网站启动脚本"
echo "================================"

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误：未找到Python3，请先安装Python3"
    exit 1
fi

# 检查端口是否被占用
PORT=8000
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; do
    echo "⚠️  端口 $PORT 已被占用，尝试下一个端口..."
    PORT=$((PORT + 1))
    if [ $PORT -gt 8010 ]; then
        echo "❌ 错误：无法找到可用端口"
        exit 1
    fi
done

echo "✅ 找到可用端口：$PORT"
echo "🚀 启动网站服务器..."
echo "📱 主网站：http://localhost:$PORT"
echo "🔧 演示页面：http://localhost:$PORT/demo.html"
echo "📖 说明文档：http://localhost:$PORT/README.md"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "================================"

# 启动HTTP服务器
python3 -m http.server $PORT --bind 0.0.0.0
