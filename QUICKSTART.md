# 快速入门指南

欢迎使用比特币价格预测归档网站！本指南将帮助你快速上手。

## 🎯 5 分钟快速部署

### 步骤 1：准备仓库

```bash
# 克隆或下载仓库
git clone <your-repo-url>
cd <your-repo-name>
```

### 步骤 2：本地预览

```bash
# 使用 Python 启动本地服务器
python3 -m http.server 8000

# 访问 http://localhost:8000
```

### 步骤 3：部署到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择 **Pages** → **创建项目**
3. 连接 GitHub 仓库
4. 构建设置：
   - 框架预设：`None`
   - 构建命令：留空
   - 构建输出目录：`/`
5. 点击 **保存并部署**

🎉 完成！你的网站已上线。

### 步骤 4：更新域名配置

编辑以下文件，将 `your-domain.com` 替换为你的实际域名：

- `robots.txt`
- `sitemap.xml`

## 📝 添加第一条数据

### 使用交互式脚本（推荐）

```bash
python3 scripts/add-prediction.py
```

按照提示输入信息即可。

### 手动编辑

1. 打开 `data/predictions.json`
2. 复制 `data/prediction-template.json` 的内容
3. 填写数据并添加到 `predictions` 数组
4. 确保 JSON 格式正确

验证数据格式：
```bash
python3 -m json.tool data/predictions.json
```

## 🎨 自定义样式

### 修改主题颜色

编辑 `css/style.css`，找到 `:root` 部分：

```css
:root {
    --accent-primary: #f59e0b;  /* 主色调 - 改为你喜欢的颜色 */
    --accent-secondary: #8b5cf6; /* 副色调 */
    --bullish: #10b981;          /* 看涨颜色 */
    --bearish: #ef4444;          /* 看跌颜色 */
}
```

### 修改网站标题

编辑 `index.html`，找到：

```html
<h1 class="logo">
    <span class="btc-icon">₿</span>
    比特币价格预测归档
</h1>
```

## 🔄 更新数据后的步骤

1. **验证数据**
   ```bash
   python3 -m json.tool data/predictions.json
   ```

2. **提交更改**
   ```bash
   git add data/predictions.json
   git commit -m "Add new prediction from [机构名]"
   git push
   ```

3. **自动部署**
   - Cloudflare Pages 会自动检测更改并重新部署
   - 通常在 1-2 分钟内完成

## 📊 功能说明

### 搜索
- 输入关键词搜索机构、人名或预测内容
- 实时过滤结果

### 筛选
- **情绪筛选**：看涨 📈 / 看跌 📉 / 中性 ➡️
- **排序**：
  - 日期（新→旧 或 旧→新）
  - 价格（高→低 或 低→高）

### 主题切换
- 点击右上角的 🌙/☀️ 按钮
- 自动保存偏好设置

## 🐛 常见问题

### Q: 数据更新后网站没有变化？
A: 清除浏览器缓存（Ctrl+F5 或 Cmd+Shift+R）

### Q: JSON 格式错误怎么办？
A: 使用在线工具验证：https://jsonlint.com/

### Q: 如何备份数据？
A: 定期提交到 Git：
```bash
git add data/predictions.json
git commit -m "Backup data"
git push
```

### Q: 可以修改 ID 吗？
A: 不建议。ID 用于唯一标识，修改可能导致混乱。

## 📚 更多资源

- [完整文档](README.md)
- [贡献指南](CONTRIBUTING.md)
- [截图展示](docs/SCREENSHOTS.md)

## 💡 小贴士

1. **定期备份**：每次添加数据后提交到 Git
2. **验证数据**：使用脚本添加可避免格式错误
3. **保持一致**：按照既定格式填写数据
4. **记录来源**：务必填写原文链接
5. **及时更新**：发现新预测及时添加

## 🚀 下一步

- 添加更多预测数据
- 自定义网站样式
- 分享你的网站
- 邀请其他人贡献数据

---

有问题？查看 [README.md](README.md) 或提交 Issue。
