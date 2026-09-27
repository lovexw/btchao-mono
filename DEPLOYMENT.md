# 部署指南

## 本地开发

### 方式 1：使用 Python HTTP 服务器（推荐）

```bash
# Python 3
python3 -m http.server 8000

# 然后访问 http://localhost:8000
```

### 方式 2：使用 Node.js（如果已安装 Node.js）

```bash
# 首先安装依赖（可选）
npm install

# 启动服务器
npm run dev
```

### 方式 3：使用 Live Server（VS Code 插件）

1. 在 VS Code 中安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 部署到生产环境

### 部署到 GitHub Pages

1. 在 GitHub 上创建仓库
2. 推送代码到仓库
3. 在 Settings → Pages 中，将源设置为 `main` 分支
4. 你的网站将在 `https://<username>.github.io/<repo-name>` 上发布

### 部署到传统虚拟主机

1. 将所有文件上传到虚拟主机的公共文件夹（通常是 `public_html` 或 `www`）
2. 确保 `.htaccess` 配置正确（如需要）
3. 访问你的域名即可

### 部署到 Netlify

1. 在 Netlify 上创建账户（netlify.com）
2. 连接你的 Git 仓库
3. 设置构建命令为空
4. 设置发布目录为项目根目录
5. 部署完成

### 部署到 Vercel

1. 在 Vercel 上创建账户（vercel.com）
2. 导入你的 Git 仓库
3. 使用默认设置
4. 点击"部署"

## 配置说明

### 邮件和联系方式

编辑 `resources.html` 中的以下部分，添加你的联系信息：

```html
<li>✉️ 邮箱: your-email@example.com</li>
<li>💬 微信: your-wechat-id</li>
<li>📱 Telegram: @your-telegram</li>
```

### 邀请链接

编辑 `resources.html` 中的邀请码部分：

```html
<div class="invite-code" id="okx-code">
    邀请码: 你的实际邀请码
</div>

<div class="invite-code" id="binance-code">
    邀请码: 你的实际邀请码
</div>
```

### 自定义样式

编辑 `styles.css` 中的 CSS 变量以更改颜色主题：

```css
:root {
    --primary-color: #f7931a;      /* 主色（橙色） */
    --secondary-color: #1a202c;    /* 副色（深灰） */
    --accent-color: #4299e1;       /* 强调色（蓝色） */
    /* 更多变量... */
}
```

## 性能优化

1. **图片优化**：使用 WebP 格式或压缩 PNG/JPG
2. **缓存**：配置 HTTP 缓存头
3. **CDN**：使用 CDN 加速国际访问
4. **压缩**：启用 gzip 压缩
5. **代码分割**：考虑为大型网站分离 CSS/JS

## SEO 优化

### 已实现的 SEO 功能

- ✓ 语义化 HTML
- ✓ 移动响应式设计
- ✓ 快速加载时间
- ✓ 清晰的页面结构

### 进一步的 SEO 改进

1. 提交网站到搜索引擎
2. 创建 `sitemap.xml`
3. 创建 `robots.txt`
4. 在社交媒体上分享
5. 获取反向链接（backlinks）

## 安全性建议

1. **HTTPS**：始终使用 HTTPS 加密
2. **内容安全策略（CSP）**：配置 CSP 头
3. **X-Frame-Options**：防止点击劫持
4. **定期更新**：保持依赖和系统更新
5. **备份**：定期备份网站文件

## 故障排除

### 网站无法加载

- 检查浏览器控制台是否有错误
- 确保所有 HTML/CSS/JS 文件都已上传
- 检查文件权限（通常应为 644）

### 样式不加载

- 确保 `styles.css` 路径正确
- 清除浏览器缓存（Ctrl+Shift+Delete）
- 检查 CSS 文件是否有语法错误

### 脚本不工作

- 检查 JavaScript 控制台错误
- 确保 `script.js` 文件完整
- 检查是否有 Content Security Policy 限制

## 监测和分析

### 添加 Google Analytics

在 `</head>` 前添加：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 监测错误

考虑集成 Sentry 或类似服务来监测前端错误。

## 维护和更新

1. 定期审查内容准确性
2. 监控用户反馈
3. 更新法律和政策信息
4. 测试所有外部链接
5. 定期进行性能审计

## 许可证

本项目代码基于 MIT 许可证开源。

## 支持

有问题？请查看常见问题部分或通过资源页面联系。
