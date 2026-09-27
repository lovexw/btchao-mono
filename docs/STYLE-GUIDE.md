# btchao.com 统一风格规范

> 目的：主站卡片上十几个分站，观感上像一个家族。规范只约束"最影响观感的少数项"，不追求强统一。

## 1. 色板（唯一真相：`shared/styles/tokens.css`）

色值统计自 www.btchao.com 线上样式，属于"已经在线上被验证过"的组合：

| 令牌 | 值 | 用途 |
|---|---|---|
| `--btc-orange` | `#FF9900` | 品牌主色：按钮、链接、强调 |
| `--btc-orange-hover` | `#E68A00` | 悬停态 |
| `--btc-bg` | `#FFFBF2` | 页面底色（暖白，不用纯白） |
| `--btc-bg-card` | `#FFFFFF` | 卡片 |
| `--btc-up` / `--btc-down` | `#00b578` / `#ff3b30` | 涨跌、成败 |
| `--btc-text` / `--btc-text-2` / `--btc-text-muted` | `#1a1a1a` / `#666` / `#999` | 三级文字层次 |

规则：

- 分站里**禁止写死这些颜色的新值**，一律 `var(--btc-…)` 引用；确实需要新颜色时，先加进 tokens.css（这样全站共享）。
- 新分站直接 `<link>` 引 tokens.css，什么都不配就已经是"家族脸"。

## 2. 字体

- 正文：系统字体栈（tokens.css 的 `--btc-font-sans`），不额外加载 webfont——分站多在移动端浏览，加载速度优先。
- 数字、地址、代码：`--btc-font-mono` 等宽（BTC 地址、价格、指数全部用等宽，这是主站已经形成的语言）。

## 3. 页脚（每个分站必须有，且只有一种来源）

由 `shared/footer.js` 运行时注入，包含四要素：

1. 返回主站 btchao.com
2. 免责声明："本站内容仅供学习与研究，不构成任何投资建议；比特币有风险，决策需独立判断。"
3. 赞助 BTC 地址（占位符，替换成真实地址后所有分站同步生效）
4. 版权行 `© {年份} btchao.com · 小吴乐意`

分站自己的 HTML 里**不要再手写页脚**，统一走注入（改文案只改 footer.js 一处）。

## 4. 改版流程（统一风格的核心体验）

```
改 shared/ → ./scripts/sync-shared.sh → commit + push → 各站 watch paths 自动重部署
```

- `shared/` 是唯一真相源，各站的 `btc-shared/` 是它分发出去的副本（一条命令全站更新）。
- 涉及布局大改时，先在 `sites/_template` 里验证，再同步分发。

## 5. 允许的不一致

- 各站保留自己的功能型配色（图表色、涨跌色已有语义的不动）。
- VitePress 站（wiki）走主题配置接入同一套变量，不强改正文排版。
- 移动端断点各站自行决定，只要求"手机上能舒服看完"。

## 6. 接入机制：btc-shared 本地副本 + 同步脚本

`shared/` 是唯一真相源；每个分站带一份 `btc-shared/` 本地副本（放进各自的部署目录，引用相对路径）。本地开发、pages.dev 测试、正式域名三个阶段都零外部依赖。

接入 3 行代码（页面位于站点根目录下一级时）：

```html
<head>
  <link rel="stylesheet" href="btc-shared/styles/tokens.css">
</head>
<body>
  <!-- 你的内容 -->
  <div id="btc-footer"></div>
  <script src="btc-shared/footer.js" defer></script>
</body>
```

- **改统一风格**：改 `shared/` → `./scripts/sync-shared.sh` → commit + push（一条命令全站更新）。
- **页面批量接入**：`python3 scripts/integrate-shared.py sites/<目录>`（幂等，可重复跑）。
- **副本的存放位置**（构建型站点放进各自的 public/）：

| 站点类型 | 副本位置 |
|---|---|
| 纯静态站 | `sites/<目录>/btc-shared/` |
| ahr999 | `sites/ahr999/public/btc-shared/` |
| ma（Vite） | `sites/ma/public/btc-shared/` |
| wiki（VitePress） | `sites/wiki/docs/public/btc-shared/`（经 config.mts head 注入引用） |
| flash-buy（Vite） | `sites/flash-buy/public/btc-shared/` |

> 曾设计过 assets.btchao.com 外链方案（改一处即时全站生效），因本地副本方案在测试期更稳健、无跨域依赖而改为"副本 + 同步脚本"；assets 站降级为后续可选项。

## 7. 全站色调归一实施记录（2026-09-27）

标准锚点：**#FF9900**（与主站一致）。做法是把各站自己的设计令牌重定向到 `var(--btc-*)`（带原值兜底），语义色（涨绿/跌红）与刻意的深色段落保留。

| 站点 | 处理内容 |
|---|---|
| paper | bg / accent / accent-soft 三令牌重定向（本就暖色系） |
| yuyan | accent 重定向；补定义缺失的 --bg/--text；紫色 #8b5cf6、琥珀 #fbbf24 全部调暖 |
| timeline | 20 处 #f7931a 归一；body 底色/文字重定向；次级文字 #666 归一（改动最大） |
| hold | 仅 bg 重定向；深暖橙正文强调色保留（长文阅读对比度优先） |
| quantum | paper / accent / accent-soft 重定向；night 深色演示段保留 |
| buy | bg 重定向；橙与悬停橙归一（本就是标准色板） |
| cold-wallet | 橙 11 处、边框灰 8 处归一；白底保留 |
| password | background / accent-color / accent-hover 三令牌重定向 |
| ahr999 | bg 重定向；全部 #FF9900 归一 |
| ahr-dca | accent / accent-2 对齐标准橙（深色主题变量保留，为可选主题） |
| ma | MUI 底色 #F6F7F9→#FFFBF2、分隔线→#EEEEEE（primary 本就是标准橙） |
| wiki | VitePress 品牌三阶色 + soft 对齐标准橙；config head 注入 tokens + 页脚 |
| flash-buy | index.css 橙归一；public/btc-shared + index.html 接入 |

验证结论：567 个本地引用 0 死链；13 站本地渲染断言全过（tokens + 页脚挂载点）；7 个重点站浏览器截图目检通过；3 个构建型站重建成功。
