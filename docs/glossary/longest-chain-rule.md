---
title: 最长链规则（Longest Chain Rule）
---

# 最长链规则（Longest Chain Rule）

> **一句话定义：** 比特币节点跟随累积工作量证明最多的链，让去中心化网络保持一致。

最长链规则是比特币解决「同时存在多条有效链」时的冲突机制：每个[节点](/glossary/node)跟随累积[工作量证明](/glossary/proof-work-pow)最多的那条链。

这个名字稍有误导性。它选的**不是**区块数最多的链（字面上的最长），而是累积工作量最多的链。实践中二者通常一致，但在[难度](/glossary/difficulty)调整期或攻击尝试期间可能分道扬镳。

规则如何运作：

1. 两个矿工几乎同时在同一[高度](/glossary/block-height)挖出区块时，网络短暂分裂。
2. 每个节点先看到哪条就先跟哪条，在上面继续搭建。
3. 一旦其中一侧先挖出下一个区块，这一侧的累积工作量就更多了。
4. 处在另一侧的节点[重组（reorg）](/glossary/reorg-reorganization)到更重的那条链上。
5. 输掉的区块成为[过期块](/glossary/stale-block)，它里面的交易回到[内存池](/glossary/mempool)。

为什么这条规则是比特币安全性的基石：

- **攻击这条链需要超过诚实网络的总算力。** 想改写历史的攻击者必须**偷偷地**、比全世界更快地挖出一条更长的分叉。面对比特币约 700 EH/s 的算力，这意味着你得拥有全球挖矿业的半数以上——经济上不可行。
- **交易埋得越深，翻案需要的工作量越多。** 这就是「6 个确认」惯例买到的东西：要推翻一笔 6 确认的交易，需要一个掌握 >50% 算力的攻击者持续暗中作业，且概率随深度指数下降。
- **诚实矿工有动力在最长链上挖。** 在主链外挖出区块的矿工拿不到奖励——区块会变成过期块。

最长链规则有时被称为「中本聪共识」——中本聪在[白皮书](/glossary/whitepaper)里描述的共识版本。正是这条看似简单的规则，把工作量证明变成了全球公认的账本。

**相关词条：** [区块（Block）](/glossary/block) · [区块高度（Block Height）](/glossary/block-height) · [链分裂（Chain Split）](/glossary/chain-split) · [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [难度（Difficulty）](/glossary/difficulty) · [分叉（Fork）](/glossary/fork) · [工作量证明（PoW）](/glossary/proof-work-pow) · [重组（Reorg）](/glossary/reorg-reorganization)
