# 快速开始指南

## 📦 项目内容

你已经获得了一个完整的、功能性的比特币教程网站！

## 🚀 快速启动

### 方式 1：本地测试（最简单）

```bash
cd /home/engine/project
python3 -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000`

### 方式 2：使用 Node.js

```bash
npm run dev
```

## 📖 网站包含的内容

### 1️⃣ **主教程 (index.html)**
- 完整的 9 步购买比特币流程
- 每一步都有详细的解释和安全提示
- 交互式 FAQ 常见问题解答
- 6 大安全领域的快速提示

### 2️⃣ **安全指南 (security-guide.html)**
- 20 项可交互的安全检查清单
- 常见错误 vs 正确做法对比
- 诈骗识别和预防指南
- 紧急情况处理指南
- 检查清单进度会自动保存

### 3️⃣ **资源和邀请 (resources.html)**
- 欧易和币安的邀请链接
- 推荐的钱包和工具
- 学习资源和外部链接
- 联系方式

### 4️⃣ **404 页面 (404.html)**
- 用户友好的错误页面
- 快速链接回到主要页面

## ⚙️ 自定义设置

### 添加你的邀请链接

编辑 `resources.html` 的这一部分：

```html
<!-- 第 1 行约 188-189 -->
<div class="invite-code" id="okx-code">
    邀请码: [此处应填入实际邀请码]
</div>

<!-- 第 1 行约 200-201 -->
<div class="invite-code" id="binance-code">
    邀请码: [此处应填入实际邀请码]
</div>
```

替换为：
```html
<div class="invite-code" id="okx-code">
    邀请码: YOUR_OKX_CODE
</div>

<div class="invite-code" id="binance-code">
    邀请码: YOUR_BINANCE_CODE
</div>
```

### 添加你的联系方式

编辑 `resources.html` 的第 300+ 行：

```html
<li>✉️ 邮箱: your-email@example.com</li>
<li>💬 微信: your-wechat-id</li>
<li>📱 Telegram: @your-telegram</li>
```

### 更改颜色主题

编辑 `styles.css` 的 CSS 变量（第 6-16 行）：

```css
:root {
    --primary-color: #f7931a;      /* 比特币橙色 */
    --secondary-color: #1a202c;    /* 深灰色 */
    --accent-color: #4299e1;       /* 蓝色 */
    --success-color: #48bb78;      /* 绿色 */
    --warning-color: #ed8936;      /* 橙色警告 */
    --danger-color: #f56565;       /* 红色危险 */
}
```

## 🌐 部署到互联网

### GitHub Pages（推荐，免费）

1. 在 GitHub 上创建新仓库
2. 将文件推送到 main 分支
3. 进入 Settings → Pages
4. 选择 "Deploy from a branch"
5. 选择 main 分支
6. 等待部署完成

你的网站将在：`https://yourusername.github.io/repo-name/`

### Netlify（更简单）

1. 访问 netlify.com
2. 连接你的 GitHub 仓库
3. 使用默认设置部署
4. 完成！

### Vercel

1. 访问 vercel.com
2. 导入你的 GitHub 仓库
3. 点击部署
4. 自动部署完成

## 📝 文件说明

| 文件 | 用途 |
|------|------|
| `index.html` | 主教程页面 |
| `security-guide.html` | 安全指南 |
| `resources.html` | 资源和邀请 |
| `404.html` | 错误页面 |
| `styles.css` | 全部样式 |
| `script.js` | 交互功能 |
| `package.json` | NPM 配置 |
| `README.md` | 项目说明 |
| `DEPLOYMENT.md` | 部署指南 |
| `.gitignore` | Git 忽略文件 |

## 🎨 特色功能

✨ **已实现的功能：**

- [x] 完全响应式设计（手机、平板、电脑）
- [x] 平滑滚动导航
- [x] 交互式 FAQ 手风琴
- [x] 可保存进度的安全检查清单
- [x] 一键复制邀请码
- [x] 返回顶部按钮
- [x] 深色模式支持检测
- [x] SEO 优化（sitemap, robots.txt）
- [x] 键盘快捷键（Alt+0-3）
- [x] 页面加载动画

## 🔒 安全特性

- ✅ 所有页面都强调风险和安全
- ✅ 详细的诈骗预防指南
- ✅ 完整的免责声明
- ✅ 没有外部数据收集
- ✅ 可以完全离线使用（除了外部链接）

## 📱 浏览器兼容性

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ iOS Safari 14+
✅ Chrome for Android

## 🐛 故障排除

### 页面加载很慢

- 清除浏览器缓存
- 检查网络连接
- 考虑在生产环境中启用 gzip 压缩

### 样式不显示

- 确保 `styles.css` 在同一目录
- 清除浏览器缓存（Ctrl+Shift+Delete）
- 检查浏览器开发者工具中的网络错误

### 脚本不工作

- 检查浏览器控制台中的错误（F12）
- 确保 `script.js` 文件完整
- 检查内容安全政策 (CSP) 限制

## 💡 使用建议

1. **定期更新**：确保链接和信息保持最新
2. **测试所有链接**：定期检查外部资源链接
3. **收集反馈**：通过联系方式收集用户反馈
4. **监控访问**：使用 Google Analytics 监测用户行为
5. **备份内容**：定期备份网站文件

## 🚀 扩展建议

考虑添加以下功能：

1. **用户评论系统** - 使用 Disqus 或 Utterances
2. **电子邮件订阅** - 使用 Mailchimp 或 ConvertKit
3. **多语言支持** - 使用 i18n 库
4. **社交分享** - 添加分享按钮
5. **搜索功能** - 使用 Algolia 或自定义脚本
6. **分析** - 集成 Google Analytics
7. **AMP 版本** - 加速移动页面

## 📞 获取帮助

如果你需要帮助：

1. 查看 `DEPLOYMENT.md` 获取部署帮助
2. 查看 `TUTORIAL_OUTLINE.md` 了解内容结构
3. 检查浏览器开发者工具（F12）中的错误
4. 查看源代码中的注释

## 📄 许可证

代码使用 MIT 许可证开源。

---

**现在你已准备好了！** 🎉

开始自定义网站，部署到互联网，开始分享比特币知识吧！
