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
改 shared/ → push → assets 站自动重部署 → 全部已接入分站立即生效
```

- 改 `tokens.css` 后，把各站引用的 `?v=N` 版本号 +1（浏览器缓存原因）；或在 Cloudflare 上 purge assets 域名缓存。
- 涉及布局大改时，先在 `_template` 里验证，再分批通知各站接入。

## 5. 允许的不一致

- 各站保留自己的功能型配色（图表色、涨跌色已有语义的不动）。
- VitePress 站（wiki）走主题配置接入同一套变量，不强改正文排版。
- 移动端断点各站自行决定，只要求"手机上能舒服看完"。

## 6. 新站接入清单（3 行代码 + 1 个 div）

```html
<head>
  <link rel="stylesheet" href="https://assets.btchao.com/styles/tokens.css?v=1">
</head>
<body>
  <!-- 你的内容 -->
  <div id="btc-footer"></div>
  <script src="https://assets.btchao.com/footer.js?v=1" defer></script>
</body>
```

> assets 站上线前，本地预览可临时把两个 URL 换成相对路径 `../../shared/styles/tokens.css`（仅限本地，部署版必须用绝对地址）。
