# 快速开始 🚀

## 3分钟部署到 Cloudflare Pages

### 1️⃣ 推送到 GitHub（1分钟）

```bash
# 克隆或创建仓库
git clone https://github.com/你的用户名/btc-investment-journal.git
cd btc-investment-journal

# 如果是新仓库，添加文件
git add .
git commit -m "Initial commit"
git push
```

### 2️⃣ 在 Cloudflare 部署（2分钟）

1. 访问 https://dash.cloudflare.com/
2. 点击 **Pages** → **Create a project**
3. 连接你的 GitHub 仓库
4. 配置：
   - Framework preset: **None**
   - Build command: *留空*
   - Build output: **/**
5. 点击 **Save and Deploy**
6. 等待部署完成（约1分钟）

### 3️⃣ 开始使用

访问你的应用：`https://你的项目名.pages.dev`

打开即可直接使用，无需密码！

⚠️ **重要提示**：所有数据仅存储在浏览器本地，请定期导出备份！

---

## 本地测试

不想部署？直接本地运行：

```bash
# 方法1：Python
python3 -m http.server 8000

# 方法2：Node.js
npx serve .

# 方法3：直接打开
# 双击 index.html
```

然后访问 http://localhost:8000

---

## 第一次使用

1. **添加第一笔交易**
   - 选择「买入」
   - 填写日期、价格、数量
   - 添加投资思考（可选）
   - 点击「添加记录」

2. **查看统计**
   - 实时价格自动更新
   - 查看持仓和收益情况

3. **立即备份数据**
   - 点击「导出数据」
   - 保存 JSON 文件到安全位置
   - ⚠️ 这非常重要！

---

## 导入示例数据

1. 点击"导入数据"
2. 选择 `example-data.json`
3. 查看示例交易记录

---

## 需要帮助？

- 📖 详细文档：[README.md](README.md)
- 🚀 部署指南：[DEPLOYMENT.md](DEPLOYMENT.md)  
- 📱 使用说明：[使用说明.md](使用说明.md)
- 💬 问题反馈：GitHub Issues

---

**就是这么简单！开始记录你的比特币投资之旅吧！** 📈
