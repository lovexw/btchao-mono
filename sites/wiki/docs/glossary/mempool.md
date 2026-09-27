---
title: 内存池（Mempool）
---

# 内存池（Mempool）

> **一句话定义：** 节点本地存放未确认交易的「候客厅」，矿工打包新区块时从中取材。

内存池（mempool）——**mem**ory **pool**（内存池）的缩写——是比特币节点本地维护的未确认交易清单：那些它听说过、但还没在区块里见过的交易。你广播一笔[交易](/glossary/transaction)后，它在节点间逐跳传播，每个节点验证通过后把它加进自己的内存池。

并不存在一个「全球统一的内存池」。每个节点只有自己那份。大多数时候它们高度相似，但会在两个方面出现分歧：

- **策略（policy）。** 每个节点自行设定本地规则，决定接受并转发什么：最低费率、[粉尘](/glossary/dust)阈值、最大体积、祖先/后代链上限，等等。
- **传播延迟。** 一笔新交易需要一两秒才能抵达全球所有可达节点。在这个窗口里，各节点的内存池会短暂地「意见不一」。

[矿工](/glossary/miner)从自己的内存池里挑交易组装候选区块，优先打包费率最高（每虚拟字节多少聪）的交易，让区块收益最大化。所以当你为一笔交易「设置手续费」时，你实际是在和当下全世界内存池里的所有人竞价争夺区块空间。钱包怎么估这个价，见[手续费估算](/glossary/fee-estimation)。

交易被打进区块后，每个节点都会看到这个区块、验证它，并把其中的交易从自己的内存池里移除。等待中的交易也可能因内存压力被逐出，或通过[手续费加价](/glossary/fee-bumping)被更高费率的版本替换。

深入阅读：[内存池：交易候客厅](/rabbit-holes/mempool)——手续费市场、驱逐规则、RBF，以及一笔「卡住」的交易在协议层到底是什么样子。实时内存池状态见[节点页](/node)。

**相关词条：** [交易](/glossary/transaction) · [矿工](/glossary/miner) · [手续费估算](/glossary/fee-estimation) · [手续费加价](/glossary/fee-bumping) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [Full RBF](/glossary/full-rbf) · [交易手续费](/glossary/transaction-fee) · [挖矿](/glossary/mining) · [矿池](/glossary/mining-pool)
