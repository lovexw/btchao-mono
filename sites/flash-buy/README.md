# 比特币购买（快闪版）

这是一个成品版的比特币入门介绍网站，旨在帮助新人从 0 到 100 建立对比特币的认知。网站设计优雅简洁，内容清晰直白，基于第一性原理进行解释。

## 项目特点

- **极简设计**: 优雅、丝滑、清晰直白。
- **第一性原理**: 从本质解释比特币、交易和存储。
- **响应式布局**: 完美适配手机和桌面端。
- **成品交付**: 包含完整的交易所推荐（欧易）、教程引导及硬件钱包（OneKey）购买指引。

## 技术栈

- React
- TypeScript
- Tailwind CSS v4
- Framer Motion (动画)
- Vite

## 开发与部署

### 本地开发

```bash
npm install
npm run dev
```

### 构建

```bash
npm run build
```

构建产物位于 `dist` 目录。

### 部署到 Cloudflare Pages

1. 将代码上传到 GitHub。
2. 登录 Cloudflare Dashboard，进入 Pages。
3. 连接 GitHub 仓库。
4. 构建设置：
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 点击 Deploy。

## 风险提示

本站内容仅供科普和教育目的，不构成任何投资建议。

1. **法律风险**: 请务必遵守您所在国家或地区的法律法规。
2. **交易风险**: 加密货币市场波动巨大，存在较高的市场风险。
3. **特别声明**: 如果您是抱有短期投机、杠杆交易或赌徒心态，请勿购买比特币，也请勿联系咨询。

投资有风险，入市需谨慎。

## License

MIT
