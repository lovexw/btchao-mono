# BTC Wiki · 比特币中文百科

一个面向中文读者的比特币百科与学习路径站。**只讲比特币，不忽悠，入门门槛低。**

内容改编自 [LearnBitcoin.com](https://learnbitcoin.com) 的开源内容仓库（CC-BY-SA-4.0），为中文读者全面重写：重组语言、剥离无关链接、补齐内部跳转。本站同样以 CC-BY-SA-4.0 协议开源。

## 快速开始

```bash
npm install
npm run dev      # 本地开发 http://localhost:5173
npm run build    # 构建到 docs/.vitepress/dist
```

## 部署（Cloudflare Pages）

- 构建命令：`npm run build`
- 输出目录：`docs/.vitepress/dist`
- 或直接 `npx wrangler pages deploy`（配置见 `wrangler.toml`）

## 站点结构

```
docs/
├── index.md            首页
├── manifesto.md        宣言
├── journey/            学习之旅（6 章，按顺序读）
├── rabbit-holes/       深度专题（17 篇，独立成篇）
├── glossary/           术语表（476 条，可搜索）
├── privacy.md          隐私指南
├── security.md         安全指南
├── node.md             运行节点
└── about.md            关于 · 版权
```

## 技术栈

[VitePress](https://vitepress.dev/zh/) · 部署目标 Cloudflare Pages · 内容即 Markdown

## 参与共建

- 发现内容问题 → 提 Issue / PR
- 继续开发 → **务必先读 [`PROGRESS.md`](PROGRESS.md)（进度台账）和 [`AGENTS.md`](AGENTS.md)（开发规范）**，里面有完整的翻译进度、约定和接手指南

## 许可

内容：[CC-BY-SA-4.0](LICENSE)（继承自 LearnBitcoin.com，已注明修改）。请注明出处并以相同协议共享。
