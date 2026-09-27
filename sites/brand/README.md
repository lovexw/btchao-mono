# 比特币品牌素材库 · Bitcoin Brand Kit

把比特币官方与社区共识认可的品牌符号聚在一个地方：Logo、颜色、按钮与卡片规范、字体、中本聪经典语录、社区故事与常用术语。纯静态、零依赖、零外链，开源免费。

**线上地址**：[brand.btchao.com](https://brand.btchao.com)

> 本目录由独立仓库 [lovexw/bitcoin-brand-kit](https://github.com/lovexw/bitcoin-brand-kit) 整合进 btchao-mono（2026-09-27），btchao.com 全家族分站的 favicon 与 Logo 均以本站 `assets/logos/bitcoin.svg`（官方标准 Logo）为准。

## 站点内容

- **Logo**：5 个官方变体（橙色 / 纯白 / 纯黑 / Core 渐变 / 横版），SVG 矢量，可单独下载或打包 ZIP
- **颜色**：比特币橙 `#F7931A` + 派生色阶 + 中性色，点击色卡复制色值，附 WCAG 对比度提醒
- **按钮**：主要 / 次要 / 幽灵三种按钮的设计规范（状态、尺寸、Token 表、六条使用规则），点击示例一键复制 CSS
- **卡片**：标准 / 反色 / 描线 / 扁平四种卡片容器（结构解剖、Token 表、六条使用规则），点击示例一键复制 CSS
- **字体**：社区常用的 Ubuntu、Bitcoin、Satoshi、IBM Plex Mono，附官方出处
- **语录**：6 条中本聪语录，英文原文 + 参考译文 + 可查证出处链接，支持左右键切换
- **故事**：创世区块、披萨日、维基解密风波、中本聪退场、HODL 笔误等 6 段社区往事
- **术语**：10 个基础术语卡片，支持实时搜索高亮
- **资源**：比特币白皮书 PDF、品牌规范 CSS（随站分发），bitcoin.design、bitcointalk.org 等一手出处

## 本地运行

无需构建，纯静态站点：

```bash
# 在 monorepo 根目录
cd sites/brand
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 目录结构

```
├── index.html            # 入口（唯一页面，单页锚点导航）
├── assets/
│   ├── css/style.css     # 全部样式（:root 顶部集中定义色板/字体/间距）
│   ├── js/data.js        # 内容数据：语录 / 故事 / 术语 / 按钮与卡片 CSS（改内容只动这里）
│   ├── js/main.js        # 交互：复制色值、复制按钮与卡片 CSS、语录切换、术语搜索、移动菜单
│   ├── logos/            # 5 个官方 Logo SVG 变体
│   ├── bitcoin.pdf       # 比特币白皮书（9 页）
│   ├── brand.css         # 色板 / 按钮 / 卡片三套规范的独立 CSS（引入即用）
│   ├── favicon.svg
│   └── logo-pack.zip     # Logo 打包下载
└── LICENSE               # MIT
```

## 常见修改

| 想改什么 | 改哪里 |
|---|---|
| 增删语录 / 故事 / 术语 | `assets/js/data.js`（数组增删条目即可，无需碰 HTML） |
| 换品牌色 | `assets/css/style.css` 顶部 `:root` 的 `--accent` |
| 改文案（标题/简介等静态文本） | `index.html` 对应 `<section>` |
| 加 Logo 变体 | 放进 `assets/logos/`，并在 `index.html` 的 `#logos` 区块加一张卡片 |
| 调整按钮 / 卡片规范 | `assets/css/style.css` 对应区块（改样式后同步 `assets/js/data.js` 的 `buttonCss` / `cardCss`） |

## 部署

走 btchao-mono 统一流程（见根目录 `docs/NEW-SITE-SOP.md`）：Cloudflare Pages 建 `btchao-brand` 项目，Root directory 填 `sites/brand`，Build command 留空，Build watch paths 填 `sites/brand/**`，然后绑定 `brand.btchao.com`。

## 版权说明

- 比特币 Logo 在社区惯例下自由使用（作者 Bitboy 公开放弃权利，bitcoin.org 长期分发）
- 白皮书版权归中本聪，公开文档，随站分发仅作教育引用
- 本站与 Bitcoin 官方组织无隶属关系；语录音译仅供参考，均附原始出处
- 站点代码 MIT License
