# 部署检查清单

在部署网站之前，请确保完成以下检查。

## ✅ 基础检查

- [x] HTML 文件存在并可访问 (`index.html`)
- [x] CSS 文件存在并可访问 (`css/style.css`)
- [x] JavaScript 文件存在并可访问 (`js/app.js`)
- [x] 数据文件存在并格式正确 (`data/predictions.json`)
- [x] 至少包含 5 条初始预测数据

## ✅ 功能验证

### 本地测试

```bash
# 1. 启动本地服务器
python3 -m http.server 8000

# 2. 在浏览器中访问
# http://localhost:8000

# 3. 测试以下功能
```

- [ ] 页面正常加载
- [ ] 统计卡片显示正确
- [ ] 预测卡片正常显示
- [ ] 搜索功能可用
- [ ] 筛选功能可用
- [ ] 排序功能可用
- [ ] 主题切换可用
- [ ] 原文链接可点击
- [ ] 移动端显示正常

### 数据验证

```bash
# 验证 JSON 格式
python3 -m json.tool data/predictions.json > /dev/null
```

- [x] JSON 格式正确
- [x] 所有必填字段存在
- [x] ID 唯一
- [x] sentiment 值有效
- [x] 价格为正数
- [x] URL 格式正确

## 📝 配置更新

### 必须更新

- [ ] `robots.txt` - 将 `your-domain.com` 替换为实际域名
- [ ] `sitemap.xml` - 将 `your-domain.com` 替换为实际域名
- [ ] `sitemap.xml` - 更新 `<lastmod>` 日期

### 可选更新

- [ ] `index.html` - 更新 Open Graph 和 Twitter Card 的 URL
- [ ] `index.html` - 添加 Google Analytics（如需要）
- [ ] `README.md` - 更新仓库链接
- [ ] `CHANGELOG.md` - 更新版本链接

## 🚀 部署步骤

### Cloudflare Pages

1. [ ] 登录 Cloudflare Dashboard
2. [ ] 创建新项目
3. [ ] 连接 GitHub 仓库
4. [ ] 配置构建设置：
   - 框架预设: `None`
   - 构建命令: (留空)
   - 构建输出目录: `/`
5. [ ] 保存并部署
6. [ ] 等待部署完成（通常 1-2 分钟）
7. [ ] 访问生成的 URL 验证

### GitHub Pages

1. [ ] 进入仓库 Settings
2. [ ] 找到 Pages 部分
3. [ ] 选择源分支
4. [ ] 保存设置
5. [ ] 等待部署完成
6. [ ] 访问 `https://your-username.github.io/repo-name/`

## 🔍 部署后验证

### 功能测试

- [ ] 网站可正常访问
- [ ] 所有资源正常加载（无 404 错误）
- [ ] CSS 样式正确应用
- [ ] JavaScript 功能正常
- [ ] 数据正确显示
- [ ] 主题切换保存偏好
- [ ] 移动端显示正常

### SEO 验证

- [ ] 页面标题显示正确
- [ ] Meta 描述存在
- [ ] Favicon 显示正常
- [ ] `robots.txt` 可访问
- [ ] `sitemap.xml` 可访问

### 性能测试

访问以下工具测试：

- [ ] [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] [GTmetrix](https://gtmetrix.com/)
- [ ] Chrome DevTools Lighthouse

目标：
- 性能分数 > 90
- 首次内容绘制 < 1.5s
- 最大内容绘制 < 2.5s

### 跨浏览器测试

- [ ] Chrome/Edge (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (最新版)
- [ ] 移动浏览器（iOS Safari, Chrome Mobile）

## 📊 监控设置（可选）

- [ ] 设置 Google Analytics
- [ ] 设置 Google Search Console
- [ ] 添加站点地图到搜索引擎
- [ ] 设置 Uptime 监控

## 🎉 上线准备

### 提交代码

```bash
# 1. 检查状态
git status

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial release: Bitcoin Predictions Archive v1.0.0"

# 4. 推送
git push origin feature-btc-predictions-archive
```

### 发布

- [ ] 创建 Release (v1.0.0)
- [ ] 编写 Release Notes
- [ ] 打上版本标签

### 分享

- [ ] 更新个人网站/作品集
- [ ] 在社交媒体分享
- [ ] 提交到产品目录（Product Hunt 等）
- [ ] 邀请朋友测试

## 📝 部署后任务

### 立即任务

- [ ] 监控错误日志
- [ ] 收集用户反馈
- [ ] 修复紧急问题

### 短期任务（1周内）

- [ ] 添加更多预测数据（目标：20条）
- [ ] 添加实际截图到文档
- [ ] 优化移动端体验
- [ ] 提升 SEO

### 中期任务（1个月内）

- [ ] 添加数据导出功能
- [ ] 添加统计图表
- [ ] 支持多语言
- [ ] 添加评论功能

## 🐛 常见问题

### 问题：CSS 样式没有应用

**解决方案：**
- 检查 CSS 文件路径是否正确
- 清除浏览器缓存（Ctrl+F5）
- 检查 Content-Type 响应头

### 问题：数据无法加载

**解决方案：**
- 验证 JSON 格式：`python3 -m json.tool data/predictions.json`
- 检查文件路径是否正确
- 打开浏览器控制台查看错误信息

### 问题：移动端显示异常

**解决方案：**
- 确保 viewport meta 标签存在
- 检查响应式断点
- 使用 Chrome DevTools 移动端模拟器测试

### 问题：主题切换不保存

**解决方案：**
- 检查 localStorage 是否被禁用
- 尝试隐私/无痕模式
- 检查浏览器控制台是否有错误

## ✅ 完成标志

当以上所有检查项都完成后，你的网站就可以正式上线了！🎉

---

**检查清单版本：** 1.0.0  
**最后更新：** 2025-12-16
