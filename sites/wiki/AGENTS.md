# AGENTS.md · AI 接手开发规范

> 目标：让任何 AI 会话都能用最少 token 接手本仓库。先读 [`PROGRESS.md`](PROGRESS.md)（进度台账），再读本文。**不要重复读这两个文件之外的长文档。**

## 环境事实（避免踩坑）

- 本机 git 全局配置了代理 `127.0.0.1:10808` 但代理通常没开；本仓库已用 `git config --local http.proxy ""` 覆盖。若 clone/push 失败提示连不上 10808，用 `git -c http.proxy= -c https.proxy= ...`。
- npm registry 已指向 npmmirror，无代理问题。
- GitHub 账号 `lovexw`，仓库 `lovexw/btc-wiki`。凭证在系统 keychain（`git credential fill` 可取）。
- 源内容仓库在本地 `/Users/xwmacbook/Documents/Github/learnbitcoin-content`（若不存在：`git -c http.proxy= clone --depth 1 https://github.com/treib-holdings/learnbitcoin-content.git`）。
- 源仓库的 frontmatter 可能有 `---title:` 粘连的解析坑，用 gray-matter 处理（见 `tools/extract-glossary-meta.mjs`）。

## 翻译规范（务必遵守）

1. **文件路径 = 源仓库 slug**。`journey/xxx.md` → `docs/journey/xxx.md`；glossary slug → `docs/glossary/<slug>.md`。中文标题写在 frontmatter `title`。
2. **文风**：忠实但不是机翻。保留原文的口吻——直接、诚实、有态度、说人话。比喻要本地化（比如dad→爸，US-specific 例子可换成中文语境近似的），但不要增删事实。数字、年份、BIP 编号一律照抄。
3. **frontmatter**：只保留 `title`（+ 必要时 `description`）。原文的 `sources`、`ogImage`、`liveWidget`、视频引用全部丢弃。
4. **链接政策**：
   - 指向站内的 `/glossary/xxx`、`/journey/xxx` 链接全部保留（目标页都存在，术语页是全量生成的）。
   - 外链只保留：BIP 文档（github.com/bitcoin/bips）、bitcoinops.org、bitcoin 白皮书。其余（Wikipedia、新闻、博客、产品站）删除或改写为正文表述。
   - 删除后注意句子通顺，不要留下「见 [链接]」的残骸。
5. **原文的 `<figure><video>/<img>` 块直接删除**；如该图承载关键信息，改用 `docs/public/images/` 的原创 SVG（没有就先不放，登记到 PROGRESS.md 待办）。
6. MDX 特有语法（import、组件标签）删除；JSX 调色无关紧要的内容照翻。
7. 每篇译文开头保留原文的引语块（`> **Where you're going:** ...`）并翻译为「> **本章目标：** …」。

## 术语表工作流（token 最省路径）

**短定义批量翻译（未开始批量时）：**
1. `node -e "const t=require('./tools/glossary-meta.json'); console.log(JSON.stringify(t.map(x=>({s:x.slug,t:x.title,d:x.shortDefinition})),null,1))" > /tmp/glossary-compact.json` 拿到紧凑清单（含 relatedTerms 时更省：只取 slug+title）。
2. 分批（每批 50–80 条）把 `{slug: {title: 中文标题, short: 中文短定义}}` 写入 `tools/glossary-zh.json`（增量合并，别覆盖已有条目）。
3. 跑 `npm run glossary:gen && npm run glossary:sidebar`，全部页面与侧边栏自动生成。
4. 翻译要点：标题格式 `中文（English）` 如 `私钥（Private Key）`；短定义一句话说清楚，别超两句；/crypto 黑话尽量直译并保留英文原词。

**全文精翻（默认任务）：**
1. 从 PROGRESS.md 的建议批次挑词，读源文件 `learnbitcoin-content/glossary/<slug>.md`。
2. **直接重写** `docs/glossary/<slug>.md`（页面文件是最终事实源）：保留 frontmatter 的 `title`，删除 `glossary-stub` 注释，按模板写全文：开头一句话定义（引用块）→ 机制讲解 → 常见误解/取舍 → 「相关词条」链接列表（用 relatedTerms，格式 `[中文标题](/glossary/<slug>)`，中文标题查 `tools/glossary-zh.json`）。
3. 每精翻完一批，更新 PROGRESS.md 的已精翻列表。

## 术语对照表（保持全站一致）

| 英文 | 中文 |
| --- | --- |
| Bitcoin | 比特币 |
| sat / satoshi | 聪 |
| address | 地址 |
| private key / public key | 私钥 / 公钥 |
| seed phrase / mnemonic | 助记词 |
| wallet | 钱包 |
| transaction | 交易 |
| block / blockchain | 区块 / 区块链 |
| mining / miner | 挖矿 / 矿工 |
| node / full node | 节点 / 全节点 |
| UTXO | 未花费输出（UTXO） |
| fee | 手续费 |
| mempool | 内存池 |
| confirmation | 确认 |
| consensus | 共识 |
| fork | 分叉 |
| halving | 减半 |
| cold storage / hot wallet | 冷存储 / 热钱包 |
| multisig | 多签 |
| self-custody | 自我托管 |
| Lightning Network | 闪电网络 |
| channel (Lightning) | 通道 |
| SegWit | 隔离见证（SegWit） |
| Taproot | Taproot（保留原名） |
| BIP | BIP（保留原名） |
| double spend | 双花 |
| proof of work | 工作量证明 |
| private key leakage | 私钥泄露 |
| fiat / fiat currency | 法币 |
| inflation | 通胀 |
| volatility | 波动性 |
| exchange | 交易所 |
| KYC | KYC（实名认证） |

## 提交纪律

- 一个板块一个 commit，中文信息，如 `翻译：学习之旅第 1-3 章`。
- 推送前必跑 `STRICT_LINKS=1 npm run build`，死链必须修复。
- 完成任何条目立刻更新 `PROGRESS.md`（checkbox + 总览表 + 最后更新日期），与代码同一个 commit 推上去。
- 不要改动 `tools/glossary-meta.json`（是生成物）；不要让生成器覆盖手写页面。

## 站点技术备忘

- 侧边栏在 `docs/.vitepress/config.mts`；glossary 部分引用 `glossary-sidebar.mjs`（生成物）。
- 中文搜索已配置 CJK 双字分词（config.mts 中 `tokenize`），勿动。
- 品牌色 #f7931a 在 `docs/.vitepress/theme/style.css` 的 CSS 变量里。
- 自定义组件类：`.term-grid/.term-card`（术语卡片）、`.chapter-intro`（章节导语框），样式在 theme/style.css。
- 示意图放 `docs/public/images/`，引用写 `/images/xxx.svg`。SVG 里中文字体用 `font-family="PingFang SC, Microsoft YaHei, sans-serif"`。
