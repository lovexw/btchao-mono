# 部署指南

## 快速部署到 Cloudflare Pages

### 第一步：准备代码

确保你的项目包含以下文件：
- `index.html` - 主页面
- `styles.css` - 样式文件
- `app.js` - 应用逻辑
- `_headers` - 安全头配置（可选）

### 第二步：推送到 GitHub

```bash
# 初始化 git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Bitcoin Investment Journal"

# 关联远程仓库
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 推送到 GitHub
git push -u origin main
```

### 第三步：在 Cloudflare Pages 部署

1. **登录 Cloudflare**
   - 访问：https://dash.cloudflare.com/
   - 登录你的账号（没有账号请先注册，免费）

2. **创建 Pages 项目**
   - 在左侧菜单选择 **Pages**
   - 点击 **Create a project**
   - 选择 **Connect to Git**

3. **连接 GitHub**
   - 授权 Cloudflare 访问你的 GitHub
   - 选择你刚创建的仓库

4. **配置构建设置**
   ```
   Project name: btc-investment-journal （或你喜欢的名称）
   Production branch: main
   Framework preset: None
   Build command: （留空）
   Build output directory: /
   ```

5. **部署**
   - 点击 **Save and Deploy**
   - 等待部署完成（通常1-2分钟）

6. **访问你的应用**
   - 部署完成后会得到一个 URL，类似：
   - `https://btc-investment-journal.pages.dev`
   - 打开即可直接使用，无需密码

### 第四步：绑定自定义域名（可选）

1. 在 Cloudflare Pages 项目页面
2. 进入 **Custom domains** 标签
3. 点击 **Set up a custom domain**
4. 输入你的域名（如 `btc.yourdomain.com`）
5. 按照提示配置 DNS 记录
6. 等待 DNS 生效（几分钟到几小时）

## 使用 Wrangler CLI 部署（高级）

### 安装 Wrangler

```bash
npm install -g wrangler
```

### 登录 Cloudflare

```bash
wrangler login
```

浏览器会打开，授权后返回终端。

### 部署项目

```bash
# 在项目目录下执行
wrangler pages deploy . --project-name=btc-investment-journal
```

### 查看项目

```bash
wrangler pages project list
```

## 更新应用

每次修改代码后：

```bash
git add .
git commit -m "描述你的更改"
git push
```

Cloudflare Pages 会自动检测到更新并重新部署。

## ⚠️ 数据备份建议（重要！）

**所有数据仅存储在浏览器本地，不会同步到云端。请务必定期备份！**

1. **定期导出数据**
   - 在应用中点击「导出数据」
   - 保存 JSON 文件到安全位置
   - 建议每次交易后都导出一次

2. **备份到 GitHub（推荐）**
   - 创建一个私有仓库
   - 将导出的 JSON 文件上传
   
   ```bash
   git add btc-journal-*.json
   git commit -m "Backup transaction data"
   git push
   ```

3. **备份到云盘**
   - 保存到 OneDrive、Google Drive、iCloud 等
   - 确保自动同步功能开启

4. **多设备同步**
   - 在新设备上使用「导入数据」功能
   - 导入之前导出的 JSON 文件

5. **定期检查备份**
   - 确保备份文件能正常打开
   - 验证数据完整性

## 故障排查

### 部署失败

检查：
- GitHub 仓库是否公开或已授权
- 文件名是否正确
- 分支名是否匹配

### 无法访问

检查：
- 部署状态是否为"成功"
- 浏览器是否支持
- 网络连接是否正常

### 价格不更新

检查：
- 浏览器控制台是否有错误
- API 是否被墙（国内可能需要代理）
- 网络连接是否正常

## 进阶配置

### 自定义 API

如果 Coinbase API 访问有问题，可以修改 `app.js` 中的 API 地址：

```javascript
const CONFIG = {
    PRICE_API: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    // 或其他 API
};
```

### 添加更多加密货币

可以扩展代码支持以太坊、其他币种等。

### 数据分析功能

可以添加：
- 收益趋势图表
- 投资组合分析
- 定投计算器
- 等等

## 安全最佳实践

1. ✅ 定期备份数据（每次交易后）
2. ✅ 将备份保存在多个位置
3. ✅ 启用 HTTPS（Cloudflare 自动提供）
4. ✅ 不在公共电脑使用
5. ✅ 考虑对备份文件加密
6. ✅ 定期检查备份文件完整性

## 成本

Cloudflare Pages 的免费额度：
- ✅ 无限制的请求数
- ✅ 无限制的带宽
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 每月 500 次构建

对于个人使用完全免费！

## 获取帮助

如果遇到问题：
1. 查看 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
2. 检查浏览器控制台的错误信息
3. 在 GitHub 仓库提交 Issue

---

祝你投资顺利！🚀
