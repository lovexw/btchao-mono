# AHR999 囤比特币指标

自动获取并展示 AHR999 囤比特币指标数据的静态网站。

## 功能特性

- 📊 实时展示 AHR999 指数及相关数据
- ⏰ 通过 GitHub Actions 每4小时自动更新数据
- 💡 提供基于指数的投资建议
- 📖 详细的 AHR999 指标介绍
- 📱 响应式设计，支持移动端访问

## 数据来源

数据来自 API: `https://9992100.xyz/api/ahr999`

返回的数据包括（以实际接口为准）：
- `ahr999`: AHR999 指数值
- `price_usd`: 比特币当前价格（USD）
- `gma200_usd`: 200 日定投成本（GMA200）
- `index_growth_valuation_usd`: 指数增长估值（USD）
- `coin_age_days`: 比特币币龄（天数）
- `updated_at_unix`: 数据更新时间（Unix 秒）
- `series_7d`: 近 7 天 AHR999 序列
- `fear_greed`: 恐惧 & 贪婪指数信息
- `btc_dominance_pct`: BTC 市占率（%）

## 部署到 Cloudflare Pages

### 方法一：通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 页面
3. 点击 **Create a project** -> **Connect to Git**
4. 选择你的 GitHub 仓库
5. 配置构建设置：
   - **Framework preset**: None
   - **Build command**: (留空)
   - **Build output directory**: `public`
6. 点击 **Save and Deploy**

### 方法二：使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
wrangler pages deploy public --project-name=ahr999-index
```

### 方法三：通过 GitHub Actions 自动部署

在仓库的 Settings -> Secrets and variables -> Actions 中添加：
- `CLOUDFLARE_API_TOKEN`: 你的 Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`: 你的 Cloudflare Account ID

然后 GitHub Actions 会在每次数据更新后自动部署。

## 本地开发

1. 克隆仓库：
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. 手动获取数据（可选）：
```bash
curl -s https://9992100.xyz/api/ahr999 > public/ahr999-data.json
```

3. 启动本地服务器：
```bash
# 使用 Python
python3 -m http.server 8000 --directory public

# 或使用 Node.js
npx http-server public -p 8000
```

4. 访问 http://localhost:8000

## GitHub Actions

项目配置了 GitHub Actions 工作流，会：
- 每4小时自动运行一次
- 获取最新的 AHR999 数据
- 保存到 `public/ahr999-data.json`
- 自动提交并推送到仓库

也可以通过 GitHub 仓库的 Actions 标签页手动触发更新。

## AHR999 指数说明

AHR999 指数是一个用于评估比特币价格的量化指标，计算公式：

```
AHR999 = (比特币价格 / 200日定投成本) × (比特币价格 / 比特币拟合价格) / 2
```

### 投资建议参考

- **< 0.45**: 🟢 抄底区间 - 适合定投或加仓
- **0.45 - 1.2**: 🟡 正常定投区间 - 坚持定期定额投资
- **> 1.2**: 🔴 谨慎区间 - 减少定投或观望

## 风险提示

⚠️ 本项目提供的信息仅供参考，不构成任何投资建议。加密货币投资存在较高风险，请谨慎决策。

## License

MIT
