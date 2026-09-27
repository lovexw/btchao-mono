# PROGRESS · 开发进度台账

> **给接手的 AI / 开发者：本文件是唯一可信进度源。完成任何条目后，立刻回来更新这里的 checkbox 和统计数字，并同步推送到 GitHub。** 开发规范见 [AGENTS.md](AGENTS.md)。
>
> 最后更新：2026-09-13（🚀 **交互组件复刻完成**：原站 7 个 Svelte 链上数据组件已全部复刻为 Vue 并上线 6 个页面——数据源为原站同款 chainquery.com `/api/edu/*` 公开端点（CORS 全开，实测可用）。同日早些时候完成**台账大勘误**：rabbit-holes 17 篇实为 2026-09-12 已全部完成（commit `20e35a1`），当时漏更新台账导致误记 0/17，已逐篇核验勘误。至此**全部翻译与组件任务完成**，剩余可选项仅：为 rabbit-holes 补充更多原创示意图）

## 总览

| 板块 | 总量 | 已完成 | 状态 |
| --- | --- | --- | --- |
| 框架（VitePress 配置/主题/首页/导览页） | — | ✅ | 完成 |
| journey/ 学习之旅 | 6 | 6 | ✅ 全文翻译完成 |
| rabbit-holes/ 深度专题 | 17 | 17 | ✅ 全文翻译完成（2026-09-12 完成、2026-09-13 台账勘误确认） |
| pages/ 实用页面（privacy/security/node） | 3 | 3 | ✅ 重写完成（本站语境） |
| glossary/ 术语表（标题+短定义） | 476 | 476 | ✅ 全部完成并生成页面 |
| glossary/ 术语表（全文精翻） | 476 | 476 | ✅ **全部完成**（B7 六批字母序扫尾收官，2026-09-13） |
| 原创中文示意图 | 5 | 5 | ✅ 首批完成（可继续扩充） |
| 交互组件（原站 Svelte widget 的 Vue 复刻） | 7 | 7 | ✅ 全部完成（2026-09-13，浏览器实测通过） |
| Cloudflare Pages 部署 | — | ✅ | 已上线 https://wiki.btchao.com（旧域名 btc-wiki-7oo.pages.dev / btc-wiki.pages.dev） |

## 构建与部署

```bash
npm install
npm run build                  # 常规构建
STRICT_LINKS=1 npm run build   # 严格模式：死链会让构建失败（推送前必跑）
npm run glossary:gen           # 重新生成未翻译的术语页（不覆盖已有文件）
npm run glossary:sidebar       # 重新生成术语侧边栏
```

- Cloudflare Pages：**Git 集成自动构建为主，wrangler 直传为兜底**。生产域名 https://wiki.btchao.com （自定义域），https://btc-wiki.pages.dev 为项目默认域（2026-09-13 实测变更，详见下条）。
  - **2026-09-13 现状**：当前 wrangler 账号（0471666@gmail.com）的项目是 `000-wiki-btchao-com`（域名 btc-wiki.pages.dev + wiki.btchao.com），已接入 Git 集成——push 到 main 后约 1 分钟自动构建上线（commit 9a9614c 实测）；旧说明中的项目名 `btc-wiki`（btc-wiki-7oo.pages.dev）在本账号不存在，该域名内容已落后（仍是 stub），后续以 wiki.btchao.com / btc-wiki.pages.dev 为准。
  - 手动部署命令（Git 构建失败时兜底）：`npm run build && npx wrangler pages deploy docs/.vitepress/dist --project-name=000-wiki-btchao-com --branch=main`（本机 npx/npm 不在 PATH 时用 `node /usr/local/lib/node_modules/npm/bin/npm-cli.js exec -- wrangler ...`）。
  - **2026-09-13 事故记录**：B7 第二批 commit `64e61b8` 的 Git 自动构建在 CF 侧失败（wrangler `pages deployment list` 显示 Failure；本地 STRICT_LINKS 构建通过，纯 .md 变更，原因不明、疑似 CF 侧瞬时故障），已用上述 wrangler 兜底命令手动上线（部署 `cbe5a10f`，线上验证 OK）。下批推送后若 Git 构建仍失败，照此兜底即可；若恢复正常则无需理会。
  - **2026-09-13 第二次事故（交互组件 commit）**：commit `9fc0c1f` 推送后 Git 自动构建超过 12 分钟未上线（正常约 1-3 分钟；部署 448eed8d 一直未产出新内容，部署专属 URL 也查不到新 hash），按上述兜底命令 wrangler 直传上线（部署 `364520ce`，51.7s 上传完毕）。**上线后生产域 wiki.btchao.com 立即切到新构建，浏览器实测组件水合/数据拉取/倒计时跳动全部正常。** 本地 STRICT_LINKS 构建通过（77s），推测仍是 CF 侧问题（两次连续失败，后续批次推送后建议 3 分钟内看不到新 hash 就直接兜底，不必久等）。
  - Git 自动构建产出的全站 476+ 页面已抽查：journey、rabbit-holes、SVG 图片、395 个 stub 术语页全部 200 正常（2026-09-13 实测），说明构建命令（可能仍是缺 `docs` 参数的 `npx vitepress build`）已被根目录兜底配置救活。
- cleanUrls 生成的无扩展名 URL 已在 CF Pages 上验证正常（`/glossary/private-key`、`/about` 均 308→200），无需改配置。
- 根目录 `.vitepress/config.mts` 是 **CI 兜底配置**：若 CI 构建命令写成 `npx vitepress build`（缺 `docs` 参数），会在仓库根构建、读不到 docs 配置，public 图片被误编译为模块 import 而报错（2026-09-12 实际发生）。兜底配置复用 docs 配置并覆盖 srcDir/outDir/cacheDir，使该命令也能正确产出；不影响 `npm run build`。
- 观察到一次 Git 自动构建失败即源于上述缺参命令，且该 Git 集成不在 wrangler CLI 登录的账号的任何 Pages 项目上（疑似另一个 Cloudflare 账号），CLI 无法代改其构建配置，故采用仓库侧兜底方案。
- 旧版纯 HTML 站点完整保留在 `legacy/html-site` 分支。

## 关键决策记录（不要推翻，除非有充分理由）

1. **技术栈 VitePress 1.x**，静态输出到 Cloudflare Pages。不用 Astro/Hexo。
2. **文件名 = 源仓库 slug**（如 `journey/why-money-is-broken.md`），保证与源仓库对照方便、URL 稳定。中文标题放 frontmatter `title`。
3. **术语页全部生成**（476 个文件都存在于 `docs/glossary/`）：已翻译的显示中文；未全文翻译的显示「中文标题 + 中文短定义 + 待翻译提示 + 相关词条链接」，保证全站内链永不死链。
4. **外链政策**：只保留权威技术参考（BIP 文档、bitcoinops.org、白皮书 PDF），删除营销类/新闻类/Wikipedia 类链接；术语页的 `sources` 列表在生成页中不展示。
5. **原文 frontmatter 的视频/图片引用一律删除**（资源在原站，不在内容仓库），关键位置用 `docs/public/images/` 下的原创中文 SVG 图替代。
6. **术语元数据管道**：`tools/glossary-meta.json`（英文元数据，勿手改）→ `tools/glossary-zh.json`（中文标题+短定义，翻译写入这里）→ `npm run glossary:gen` 生成页面 → `npm run glossary:sidebar` 生成侧边栏。
7. **生成器永不覆盖** `docs/glossary/` 下已存在的文件——全文精翻直接编辑页面文件本身，页面文件即最终事实源。

## 翻译进度明细

### journey/ 学习之旅（6/6 ✅）

- [x] `why-money-is-broken` 第 1 章 · 法币为什么坏了
- [x] `what-bitcoin-actually-is` 第 2 章 · 比特币到底是什么
- [x] `how-bitcoin-works` 第 3 章 · 比特币如何运转
- [x] `using-bitcoin` 第 4 章 · 如何使用比特币
- [x] `be-your-own-bank` 第 5 章 · 成为自己的银行
- [x] `sovereignty` 第 6 章 · 主权：最终的自立

### rabbit-holes/ 深度专题（17/17 ✅ 2026-09-12 完成、2026-09-13 台账勘误确认）

- [x] `utxos` UTXO：比特币的记账模型
- [x] `supply` 供应量：2100 万从何而来
- [x] `halvings` 减半：四年一次的供应刹车
- [x] `mining` 挖矿：算力、难度与激励
- [x] `mempool` 内存池：交易候客厅
- [x] `decentralization` 去中心化的真实含义
- [x] `key-space` 密钥空间：天文数字的安全边际
- [x] `seed-backup-strategies` 助记词备份策略
- [x] `mt-gox-ftx-graveyard` 从门头沟到 FTX：托管交易所坟场
- [x] `bitcoin-units` 比特币单位：从聪到 BTC
- [x] `energy` 比特币与能源
- [x] `inflation-bug-postmortem` 通胀漏洞复盘
- [x] `bitcoin-privacy` 比特币隐私：什么有效、什么无效
- [x] `lightning-routing` 闪电网络路由
- [x] `block-size-war` 扩容战争
- [x] `bip-process` BIP：比特币改进提案流程
- [x] `quantum-and-bitcoin` 量子计算与比特币

> **勘误说明（2026-09-13）**：本清单在 2026-09-12 由 commit `4d22c63`（12 篇）与 `20e35a1`（最后 4 篇）全部完成，但当时两个 commit 均未更新本台账，导致此处长期误记为 0/17。今日已逐篇核验（17 篇标题结构与源文一致或差异均为合规的组件删改处理、结尾无截断、无英文残留），并顺手清理 3 处 NIST csrc.nist.gov 外链（`quantum-and-bitcoin.md` 2 处、`glossary/slh-dsa-sphincs-plus.md` 1 处，按外链政策改为正文表述）。

### pages/ 实用页面（3/3 ✅，另有 index/manifesto/about 已重写完成）

- [x] `privacy` 隐私指南　[x] `security` 安全指南　[x] `node` 运行自己的节点

### glossary/ 术语表

- [x] 476 条「标题 + 短定义」中文翻译（在 `tools/glossary-zh.json`，已生成全部页面）
- [x] 476 条侧边栏（按首字母分组折叠）
- [x] 全文精翻：`docs/glossary/` 全部 476 条已完成（2026-09-13 收官，`grep -rl "glossary-stub" docs/glossary/ | wc -l` = 0）。
- 已精翻（476，全部完成 ✅）：`address` `private-key` `public-key` `seed-phrase` `wallet` `node` `mining` `transaction` `block` `blockchain` `hash` `utxo-unspent-transaction-output` `lightning-network`；B2 批（12）：`fee-estimation` `multisig` `bip-39` `difficulty` `mempool` `fork` `whitepaper` `halving-halvening` `bech32m` `bip-173-bech32` `consensus-parameter` `satoshi-unit`；B3 批（56）：`address-clustering` `address-derivation-path` `address-indexing` `address-reuse` `b32-address` `burn-address` `green-address` `stealth-address` `vanity-address` `custodial-lightning-wallet` `custodial-wallet` `deterministic-wallet` `gui-wallet` `hardware-wallet` `hd-wallet-hierarchical-deterministic-wallet` `hdm-multi-signature-hd-wallet` `hierarchical-deterministic-wallet` `watch-only-wallet` `wasabi-wallet` `hardware-seed-vault` `inheritance-seed-backup` `mnemonic-entropy-bits` `mnemonic-password` `seed-entropy-mixer` `seed-tool` `paper-wallet` `exchange-api-key` `key-aggregation` `key-generation-ceremony` `key-pool` `key-rotation` `key-split` `key-wiping` `wallet-import-format-wif` `xpub-extended-public-key` `adapter-signature` `ecdsa-elliptic-curve-digital-signature-algorithm` `low-r-signatures` `low-s-signatures` `mono-signature` `partial-signature` `proof-keys` `quorum-signatures` `schnorr-signature` `signature-aggregation` `signature-clipping` `p2pk-pay-public-key` `p2pkh-pay-public-key-hash` `p2wpkh-pay-witness-public-key-hash` `k-k-multisig` `hierarchical-multisig` `lurking-wife-mode` `not-your-keys-not-your-coins` `paper-hands` `self-custody` `static-channel-backup-scb`；B4 批闪电网络（49）：`payment-channel` `state-channel` `lightning-channel` `lightning-channel-capacity` `balanced-channel-lightning` `inactive-channel` `delayed-payment-channel` `escrowed-lightning-channel` `lightning-channel-splicing` `audiobook-model-lightning` `htlc-hashed-time-locked-contract` `htlc-invoice` `htlc-preimage-manager` `lightning-invoice` `lightning-refund-invoice` `lightning-payment` `atomic-multi-path-payment-amp` `lightning-routing` `routing-node` `onion-routing-lightning` `lightning-sphinx` `gossip-protocol-lightning` `lightning-gossip-pruning` `peer-discovery` `peer-bookmark` `peer-management` `lightning-node` `lightning-node-alias` `core-lightning-c-lightning` `lightning-network-daemon-lnd` `bridge-node-lightning` `autopilot-lightning` `lightning-network-penalty` `penalty-transaction` `delayed-justice-transaction` `fraudulent-channel-close` `bolt` `bolt-11` `wumbo-channels-lightning` `jamming-attack-ln` `jammed-htlc-detector` `lightning-probe` `lightning-anchor-commitment` `churn-lightning` `lockup-period-lightning` `eltoo` `submarine-swap` `loop-inout` `liquidity-ads`；B5 批挖矿与共识（67，2026-09-13 完成）：`proof-work-pow` `hash-puzzle` `hash-rate` `hash-rate-derivative` `nonce` `nonce-exhaustion` `block-header` `block-height` `block-time` `block-reward` `block-subsidy` `mining-subsidy` `merkle-proof` `merkle-inclusion-proof` `miner` `cpu-mining` `gui-miner` `retail-mining` `mining-rig` `mining-software` `mining-algorithm` `mining-front-end` `proprietary-mining-firmware` `asic-application-specific-integrated-circuit` `asic-resistance` `asicboost` `miner-capitulation` `mining-pool` `pooled-mining` `pool-hopping` `merged-mining` `mining-colocation` `geographic-mining-distribution` `block-propagation` `competitive-block-propagation` `competitive-mining` `orphan-block` `miner-orphan-rate` `fork-detection` `fork-watcher` `block-explorer` `block-size` `difficulty-retargeting` `mining-centralization` `hidden-miner-tax` `energy-fud` `stranded-energy` `curtailment` `methane-mitigation-mining` `miner-extractable-value-mev` `proof-of-reserves` `fraud-proof` `block-size-war` `bip-101-increase-block-size` `bip-102-2mb-block-size` `bip-9-versionbits` `bip-91` `bip-148-uasf` `bip-34` `bip-65-opchecklocktimeverify` `bip-170-txout-proof` `bip-35-mempool-message` `bip-36-merkle-block-request` `checklocktimeverify-cltv` `deployment-threshold-soft-fork` `locked-period-soft-fork` `soft-fork`；B6 批隐私与合规（21，2026-09-13 完成）：`coinjoin` `shielded-coinjoin` `joinmarket` `joinstr` `payjoin` `whirlpool-samourai` `chain-analysis` `dust` `dust-attack` `dust-limit` `dust-sweeping` `eavesdropping-attack` `eclipse-attack` `celsius-genesis-3ac-cluster` `kyc-know-your-customer` `aml-anti-money-laundering` `greenlist` `silent-payments` `tor-hidden-service` `i2p-invisible-internet-project` `json-rpc-over-tor`；B7 第一批（50，2026-09-13 完成）：`absolute-fee` `absolute-locktime` `accelerator` `air-gapped` `airdrop-btc-fork` `alt-season` `altcoin` `anti-sybil-mechanism` `anyprevout` `asmap` `asymptote` `atomic-swap` `atomic-swap-refill` `authorized-participant` `batch-transaction` `bear-market` `bip-113` `bip-119-ctv` `bip-125-replace-fee` `bip-143` `bip-144-segwit-relay` `bip-152-compact-blocks` `bip-155-addr-v2` `bip-158` `bip-159` `bip-176-bits-denomination` `bip-22-getblocktemplate` `bip-30` `bip-300-drivechains` `bip-301` `bip-31-pong-message` `bip-32` `bip-339-wtxid-relay` `bip-341` `bip-342-tapscript` `bip-360` `bip-361` `bip-37` `bip-40-alerts-avoid-replay` `bip-42` `bip-44` `bip-47-payment-codes` `bip-50` `bip-61` `bip-66` `bip-68-relative-locktime` `bip-69` `bip-70-payment-protocol` `bip-75-payment-protocol-enhancements` `bip-8`；B7 第二批（50，2026-09-13 完成）：`bip-85` `bip-bitcoin-improvement-proposal` `bitcoin-atm` `bitcoin-bond` `bitcoin-bridge` `bitcoin-cash` `bitcoin-client` `bitcoin-core` `bitcoin-core-rpc` `bitcoin-days-destroyed` `bitcoin-dev-kit-bdk` `bitcoin-dominance` `bitcoin-faucet` `bitcoin-governance` `bitcoin-inheritance-planning` `bitcoin-knots` `bitcoin-pizza-day` `bitcoin-satellite` `bitcoin-script` `bitcoin-sv-bsv` `bitcoin-vault` `bitlicense` `blockfi` `bloom-filter` `branch-and-bound-bnb` `bull-market` `byzantine-fault-tolerance` `cbdc-central-bank-digital-currency` `centralized-exchange-cex` `chain-flag-day` `chain-split` `chain-visualization` `chaincode` `change-output` `changeless-transaction` `checksequenceverify-csv` `checktemplateverify-ctv` `clawback-mechanism` `clearing-price` `cme-cf-bitcoin-reference-rate` `coin-age` `coin-control` `coin-freeze` `coin-selection` `coinbase-transaction` `coingrinder` `colored-coins` `consolidation-transaction` `constant-time` `corrupted-chain-state`；B7 第三批（50，2026-09-13 完成）：`counterparty-risk` `covenants` `creation-redemption` `crqc-cryptographically-relevant-quantum-computer` `dca-dollar-cost-averaging` `decentralization` `decentralized-exchange-dex` `dedicated-ip-nodes` `demand-response` `discard-threshold` `disinflation` `double-blind-marketplace` `double-spend` `double-spend-relay` `elliptic-curve` `escrow` `estimated-confirmation-blocks` `etf-exchange-traded-fund` `exchange` `fee-bumping` `fee-floor` `fee-rate-escalation` `fee-sniping` `fiat` `fidelity-bond` `fincen` `ftx` `fud-fear-uncertainty-doubt` `full-node` `full-rbf` `full-validation` `fungibility` `futures` `genesis-block` `golden-cross` `graph-pruning` `griefing-attack` `grovers-algorithm` `hal-finneys-running-bitcoin` `hardware-security-module-hsm` `hashlet` `headless-node` `hidden-service-node` `hodl` `hodl-waves` `iceberg-order` `incentive-compatibility` `inflation` `inflation-bug` `input-transaction-input`；B7 第四批（50，2026-09-13 完成）：`inscriptions` `interactive-multi-sig` `layer-1` `liquid-federation` `liquid-network` `liquidity` `locked-memory` `locktime` `longest-chain-rule` `m-n` `mainnet` `market-capitalization` `market-depth` `merchant-adoption` `merkle-block` `merkle-root` `merkle-tree-merkle-root` `merkleized-abstract-syntax-tree-mast` `micropayment` `miner-signaling` `minsky-moment` `mixing-service` `ml-dsa-dilithium` `mt-gox` `mtp-median-time-past` `musig` `musig2` `native-segwit` `nav-net-asset-value` `neutrino` `new-york-agreement-nya` `nlocktime` `node-autoban` `node-headcount` `node-operator` `node-synchronization` `node-uptime` `nsequence` `off-chain` `one-way-peg` `op-code-operation-code` `opreturn` `opreturn-based-tokens` `oracle-based-betting` `ordinals` `output-descriptor` `output-transaction-output` `p2sh` `p2sh-p2wsh-nested-segwit` `p2wsh-pay-witness-script-hash`；B7 第五批（50，2026-09-13 完成）：`pay-ip` `payment-codes-bip-47` `payment-point` `peg` `peg-guard` `peg-out` `poisson-process` `post-quantum-bitcoin` `premium-discount-to-nav` `price-discovery` `price-floor-btc` `price-slippage` `pruning-mode` `psbt` `quadriga-cx` `race-attack` `rehypothecation` `reorg-reorganization` `replace-fee-rbf` `replay-attack` `rescue-transaction` `resource-exhaustion-attack` `revenue-ths` `reward-era` `rpc-whitelist` `rug-pull` `safe-mode-bitcoin-core` `satoshi-nakamoto` `script` `scriptless-scripts` `second-layer` `security` `segwit-segregated-witness-bip-141` `segwit2x` `shamir-secret-sharing` `shors-algorithm` `sidechain` `sighash` `sighashanyonecanpay` `sighashsingle` `signet` `slh-dsa-sphincs-plus` `speedy-trial` `spot-bitcoin-etf` `spv-simplified-payment-verification` `stale-block` `taproot` `testnet` `time-locked-contract` `tracking-error`；B7 第六批（8，2026-09-13 收官完成）：`transaction-chaining` `transaction-fee` `transaction-finality` `transaction-index-txindex` `utxo-pool` `volatility` `voyager-digital` `zkcp-zero-knowledge-contingent-payment`

### B7 断点（2026-09-13 🎉 **全部完成**——B7 六批 258 条字母序扫尾收官，术语全文精翻 476/476）

> **术语表全文精翻任务已完结。** 下方保留批次记录备查。（勘误：此前此处写的下一任务「rabbit-holes 17 篇翻译」经 2026-09-13 核实其实早已完成，见「翻译进度明细」；交互组件复刻与移动端/暗色抽查也已于同日完成，见「交互组件复刻」小节。当前剩余可选项：为 rabbit-holes 各篇补充更多原创示意图（supply/halvings/mining/mempool 等篇目前无图）。）

- **B7 第一批（前 50 条）✅ 2026-09-13 完成**（`absolute-fee` 至 `bip-8`，全部清单见上方「已精翻」B7 段）。
- **B7 第二批（50 条）✅ 2026-09-13 完成**（`bip-85` 至 `corrupted-chain-state`）。
- **B7 第三批（50 条）✅ 2026-09-13 完成**（`counterparty-risk` 至 `input-transaction-input`）。
- **B7 第四批（50 条）✅ 2026-09-13 完成**（`inscriptions` 至 `p2wsh-pay-witness-script-hash`）。
- **B7 第五批（50 条）✅ 2026-09-13 完成**（`pay-ip` 至 `tracking-error`）。
- **B7 第六批（收官 8 条）✅ 2026-09-13 完成**（`transaction-chaining` `transaction-fee` `transaction-finality` `transaction-index-txindex` `utxo-pool` `volatility` `voyager-digital` `zkcp-zero-knowledge-contingent-payment`）。**476/476，术语全文精翻全部完成。**
- **经验备注（供后续翻译任务参考）**：`security` 词条末尾链接[安全指南](/security)（`docs/security.md` 在根路径、无尾斜杠，写成 `/security/` 会被 STRICT_LINKS 判死链 `/security/index`）；源文 `/rabbit-hole/` 单数链接一律改 `/rabbit-holes/` 复数；NIST csrc.nist.gov 外链按外链政策删除、正文表述保留（BIP GitHub 链接保留）；相关词条中文标题一律以 `tools/glossary-zh.json` 为准（本批曾修正 HODL 浪潮/合并交易/费率飙升三处）。
- **划入 B7 的历史误捕词（B6 扫描备注）**：`chain-flag-day` `chain-split` `chain-visualization` `corrupted-chain-state` `longest-chain-rule`（共识/分叉主题）与 `accelerator` `node-operator` `output-descriptor`（tor 正则误捕）；`merkle-root` `merkle-tree-merkle-root` `merkleized-abstract-syntax-tree-mast` `segwit2x` 及 `bip-30` `bip-37` `bip-143` `bip-144` `bip-339` `bip-360` `bip-361` 等都在上面 258 条清单内，无需单独处理。
- **本机环境备忘（2026-09-13 实测仍有效）**：
  - 源内容仓库在 `/Users/xw/.zcode/workspace/learnbitcoin-content`。
  - `npm` 不在 PATH：`STRICT_LINKS=1 node /usr/local/lib/node_modules/npm/bin/npm-cli.js run build`（本会话实测通过，46s）。
  - `tools/glossary-zh.json` 结构为每行一条 `"<slug>": {"t":"标题","s":"短定义"},`，不要整体重写；小改动用 node 精准替换。
  - slug 校验脚本 `/tmp/zhq.cjs`（重启丢失，一行重建）：`const zh = require('<repo>/tools/glossary-zh.json'); for (const s of process.argv.slice(2)) console.log(s + ' => ' + (zh[s] ? zh[s].t : 'MISSING'));`
  - 深度专题链接格式 `/rabbit-holes/<slug>`（复数）；源仓库写的 `/rabbit-hole/`（单数）是错的。
  - 部署：push 到 main 后 CF Git 集成约 1 分钟自动构建上线（项目 `000-wiki-btchao-com`，域名 wiki.btchao.com / btc-wiki.pages.dev）；Git 构建失败才需 wrangler 手动兜底。

### 术语全文精翻 · 续接批次计划（新会话照此推进）

> 工作流（读源文件→重写页面文件→相关词条链接）见 `AGENTS.md`「术语表工作流 · 全文精翻」。原「建议第一批」中有 7 个 slug 在源数据中不存在（cold-storage、hot-wallet、bech32、consensus、confirmation、sat、halving 均为概念名而非真实 slug），已用真实 slug 修正。

- **节奏**：每批一个 commit，信息格式 `翻译：术语全文精翻 Bx <主题>（N 条）`；push 前跑 `STRICT_LINKS=1 npm run build`；每批完成立即更新「已精翻」清单与本表。
- **待翻清单以 stub 实时扫描为准**（跳过已翻、主题间重复的词先翻先跳过），枚举命令模板：

  ```bash
  grep -rl "glossary-stub" docs/glossary --include="*.md" | sed 's|.*glossary/||;s|\.md||' | grep -E '<关键词正则>'
  ```

| 批次 | 主题 | slug 匹配关键词 | 约数 |
| --- | --- | --- | --- |
| B2 | 高频核心补齐 ✅ 2026-09-12 完成 | （固定清单）`fee-estimation` `multisig` `bip-39` `difficulty` `mempool` `fork` `whitepaper` `halving-halvening` `bech32m` `bip-173-bech32` `consensus-parameter` `satoshi-unit` | 12 |
| B3 | 钱包与密钥安全 ✅ 2026-09-13 完成（56/56） | `seed\|mnemonic\|key\|wallet\|custod\|backup\|passphrase\|signature\|address\|cold\|multisig\|recovery\|entropy\|derivation\|xpub\|wif\|paper` | 56 |
| B4 | 闪电网络 ✅ 2026-09-13 完成（49/49，清单见历史） | `lightning\|htlc\|channel\|bolt\|lnurl\|gossip\|onion\|preimage\|invoice\|sphinx\|autopilot\|wumbo\|penalty` | 49 |
| B5 | 挖矿与共识 ✅ 2026-09-13 完成（67/67，清单见历史） | `mining\|miner\|hashrate\|difficulty\|proof\|consensus\|fork\|block-\|nonce\|asic\|pool\|subsidy\|halving\|retarget\|orphan\|mev` | 67 |
| B6 | 隐私与合规 ✅ 2026-09-13 完成（21/21，清单见历史） | `coinjoin\|privacy\|mixer\|samourai\|tumbler\|cluster\|heuristic\|fingerprint\|kyc\|aml\|dust\|payjoin\|joinmarket\|silent\|tor\|i2p\|eclipse` | 21 |
| B7 | 字母序扫尾（六批共 258 条 ✅ 2026-09-13 全部完成） | 不匹配上述关键词的其余全部剩余词条，每 50 条一批 | 258（已完成 258/258） |

（各批数量按 2026-09-12 状态估算，跨批重复词以先遇到先翻、翻完自动从后续批消失为准。）

### 交互组件复刻（7/7 ✅ 2026-09-13 完成）

> 数据源与原站相同：`https://chainquery.com/api/edu/*`（公开教育端点，`access-control-allow-origin: *`，浏览器直连无 CORS 问题；实测 2026-09-13 全部 200）。组件代码在 `docs/.vitepress/theme/components/`，公共逻辑在 `theme/chainquery.ts`（useChainQuery 组合式函数：拉取 + stale 标记 + 定时刷新），公共样式 `.chainquery-widget` 系列在 `theme/style.css`。全部经浏览器实测：数据渲染、倒计时跳动、换算联动、滑块交互、暗色模式、375px 移动端无横向溢出。

- [x] `SupplyChart.vue` 实时供应量（supply.md）——流通量 vs 20,999,999.9769 渐近上限进度条 + 年增发/通胀率；5 分钟刷新
- [x] `HalvingCountdown.vue` 减半倒计时（halvings.md）——天/时/分/秒每秒跳动 + 当前/减半区块/剩余块数/预计日期 + 补贴 3.125→1.5625 BTC；60 秒刷新
- [x] `DifficultyClock.vue` 难度调整期（mining.md）——2016 块进度条 + 当前难度（科学计数法）+ 预计调整幅度（上调红/下调绿）；60 秒刷新
- [x] `MempoolHistogram.vue` 实时内存池（mempool.md + mining.md）——概要四卡 + 按费率带分组的体积条（**对数比例**，空带过滤；此为对原站的改进——原站线性归一化导致体积小的费率带不可见）；30 秒刷新
- [x] `UnitsConverter.vue` 单位换算器（bitcoin-units.md）——BTC/mBTC/Finney/μBTC/聪互算 + chainquery 实时 USD 参考价；换算纯本地
- [x] `UnitsVisualization.vue` 单位点阵图（bitcoin-units.md ×10 处）——9 个圆点表示该单位覆盖的小数位，橙色实心=该单位及更细位、描边=更高面额位
- [x] `KeySpaceVisualizer.vue` 密钥空间可视化（key-space.md）——2^8→2^256 十档滑块+点选，每档配现实类比

**踩坑记录（后续组件开发必读）**：`useChainQuery` 的 fetch 与 `setInterval` 必须放在 `onMounted` 内——VitePress 构建期 SSR 渲染每页时 `onUnmounted` 不会触发，setup 顶层 `setInterval` 会把构建进程挂死（2026-09-13 实测：构建卡住 5 分钟+不退出，改到 onMounted 后 78s 正常完成）。
**插入位置对照**（源仓库 mdx 的 `<Xxx client:load />` 行）：supply L123 / halvings L33 / mining L83+L115 / mempool L112 / key-space L52 / bitcoin-units L49+L59-107(9 处)+L145。

- [x] `journey-inflation.svg` 第 1 章购买力稀释（journey/why-money-is-broken）
- [x] `journey-network-topology.svg` 央行 vs 比特币网络拓扑（第 2 章 what-bitcoin-actually-is 与 rabbit-holes/decentralization 共用；2026-09-13 勘误：此处原误记为 `journey-bitcoin-stack.svg`，该文件从未存在）
- [x] `journey-block-lifecycle.svg` 第 3 章交易生命周期（journey/how-bitcoin-works）
- [x] `self-custody-flow.svg` 第 5 章自我托管决策流（journey/be-your-own-bank）
- [x] `journey-energy-demand.svg` 能源需求对比（rabbit-holes/energy；2026-09-13 补记：此前台账漏记此图）
- [ ] 可继续为 rabbit-holes 各篇补充（supply/halvings/mining/mempool 等篇目前无图）

（2026-09-13 核验：全站引用的 5 张 SVG 与 public/images 实际文件一一对应，无缺失引用、无孤儿文件。）

## 已知问题 / 待办

- [x] Cloudflare Pages 首次部署 + cleanUrls 验证 ✅ 2026-09-12 完成（wrangler 直传，cleanUrls 正常）
- [x] **台账大勘误 ✅ 2026-09-13 完成**：rabbit-holes 17 篇实际 2026-09-12 已全部翻译完成但台账误记 0/17，已逐篇核验并勘误（详见「翻译进度明细」勘误说明）；顺带清理 3 处 NIST 外链、修正示意图清单笔误。**教训已入册**：内容 commit 必须同步更新台账（会话工作流程第 4 步），避免再次出现账实分离。
- [ ] 原站 Svelte 交互组件复刻 ✅ 2026-09-13 全部完成（7/7，详见「交互组件复刻」小节；组件在 `docs/.vitepress/theme/components/`，数据源 chainquery.com/api/edu/*，浏览器实测通过）
- [x] 术语全文精翻 ✅ 2026-09-13 全部完成（476/476，B2→B7 六批扫尾，`grep -rl "glossary-stub" docs/glossary/ | wc -l` = 0）
- [ ] `pages/terms.md`（源仓库的 Terms 页）已并入 `/about` 与术语表，不再单独翻译——如需可补
- [ ] 移动端与暗色模式抽查 ✅ 2026-09-13 完成（借组件上线之机实测：暗色模式组件配色正确（bg rgb(27,27,31)、品牌橙 #f7931a 提亮）、375px 移动端组件无横向溢出、统计网格正确塌缩单列、倒计时四格保持 4 列）
- [ ] 源仓库若有新增内容（新 glossary 词条/新 rabbit-hole 篇目）需同步翻译

## 会话工作流程（每次 AI 会话必做）

1. 读 `PROGRESS.md` + `AGENTS.md`（就在仓库根目录，不用读别的文档）
2. 选一个未完成条目，按 AGENTS.md 规范干活
3. `STRICT_LINKS=1 npm run build` 验证
4. 更新本文件的 checkbox 与「最后更新」日期
5. git commit + push（每个板块一个 commit，信息用中文）
