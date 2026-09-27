---
title: 第一层（Layer 1）
---

# 第一层（Layer 1）

> **一句话定义：** 比特币主网区块链——交易在完整的工作量证明共识下最终结算的地方。

第一层（Layer 1）是比特币的基础链——由[工作量证明](/glossary/proof-work-pow)保护的账本，每笔被确认的交易最终都在这里结算。它是比特币架构里安全性最高、最终性最强，但同时也是最慢、最贵的一层。

第一层上承载着什么：

- **每一个 UTXO**，由[私钥](/glossary/private-key)或脚本直接控制。
- **每一笔链上交易**，由每个[全节点](/glossary/full-node)按比特币共识规则验证。
- **[区块补贴](/glossary/block-subsidy)**的发行。
- [闪电网络](/glossary/lightning-network)的**通道开启与关闭**。
- [侧链](/glossary/sidechain)的**锚入与锚出**。
- 一切最终回归到 BTC 所有权的**第二层活动的结算**。

第一层优化的是这些性质：

- **最终性。** 一笔交易一旦埋在足够多的区块之下，实际上就是永久的。[最长链规则](/glossary/longest-chain-rule)加上累积的工作量证明，让重写历史的花费超出任何合理攻击者的承受能力。
- **抗审查。** 没有任何一方能永远阻止特定交易被打包。矿工可能尝试，但不审查的矿工总有别人。
- **可验证性。** 每个节点都亲自验证一切，不需要信任任何人。
- **2100 万的上限。** [供应渐近线](/glossary/asymptote)就在这里执行——由每个节点、每个区块执行。

第一层**不**为以下目标优化：

- **吞吐量。** 平均每秒约 7 笔交易，且这个硬上限不会变。
- **即时支付。** 确认平均要约 10 分钟；完全结算还要更久。
- **微支付。** 手续费让低价值支付在基础层不经济。

这些限制是**特性**，不是缺陷。它们让基础链足够安全，足以充当世界的最终结算层。像闪电网络这样的[第二层](/glossary/second-layer)方案，负责基础层的限制排除掉的那些用例。

第一层是比特币中不会改变的那部分。其他一切都建在它上面。

**相关词条：** [Bitcoin Core](/glossary/bitcoin-core) · [区块（Block）](/glossary/block) · [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [全节点（Full Node）](/glossary/full-node) · [闪电网络（Lightning Network）](/glossary/lightning-network) · [链下（Off-Chain）](/glossary/off-chain) · [工作量证明（PoW）](/glossary/proof-work-pow) · [第二层（Second Layer）](/glossary/second-layer)
