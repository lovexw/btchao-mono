---
title: Liquid 联盟（Liquid Federation）
---

# Liquid 联盟（Liquid Federation）

> **一句话定义：** 以多签方式共同管理 Liquid 侧链锚定 BTC 的功能方（functionary）组织群体。

**Liquid 联盟**是共同运营 [Liquid 网络](/glossary/liquid-network)侧链的组织联盟。每个成员运行一个硬件加固的节点（「functionary」，功能方），参与区块签名，以及控制与比特币主网之间[双向锚定](/glossary/peg)的多签。

2026 年的结构概况：

- **约 65 个联盟成员。** 包括大型比特币交易所（Bitfinex、BTSE）、比特币原生公司（Blockstream 自己、Bull Bitcoin）、做市商、托管机构和交易公司。
- **区块签名轮转。** 每个区块由一部分联盟成员按轮换名单签名出块，约 1 分钟一个区块。
- **锚出需要门限签名。** 通过 peg-out 把 BTC 从 Liquid 移回主网，需要 11-of-15 的活跃区块签名者签名（具体比例随时间有所调整）。
- **防篡改硬件。** 联盟成员在地理分布、经过安全审计的地点运行专用 functionary 硬件。

信任假设是：联盟中的恶意多数可以串谋偷走锚定的 BTC、叫停侧链或审查交易。地理与组织多样性让这很难，但并非不可能。

这份信任换来的是：

- **快速结算。** 约 1 分钟一个区块，对比比特币的约 10 分钟。
- **机密交易。** 比特币的透明链藏不住金额；Liquid 可以。
- **资产发行。** USDT、黄金代币、证券代币等，都使用联盟的框架。
- **真实采用。** 2026 年，Liquid 承载着有分量的机构级比特币流量。

Liquid 联盟是现存资金最充足、组织最成熟的比特币联盟式侧链运营体。它是对「联盟式锚定在大规模下长什么样」这个问题的实际回答。如果你接受这个信任模型，Liquid 兑现它的承诺；如果不接受，你就得另寻他路——主网、闪电网络，或者看看 [BIP 300 驱动链](/glossary/bip-300-drivechains)最终会变成什么样。

侧链本身见 [Liquid 网络](/glossary/liquid-network)。

**相关词条：** [比特币桥（Bitcoin Bridge）](/glossary/bitcoin-bridge) · [Liquid 网络（Liquid Network）](/glossary/liquid-network) · [多签（Multisig）](/glossary/multisig) · [转入锚定（Peg-in）](/glossary/peg) · [锚定防护（Peg-Guard）](/glossary/peg-guard) · [转出锚定（Peg-out）](/glossary/peg-out) · [侧链（Sidechain）](/glossary/sidechain)
