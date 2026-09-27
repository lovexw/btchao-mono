---
title: 重组（Reorg）
---

# 重组（Reorg）

> **一句话定义：** 出现更长（累积工作量更多）的链时，节点从当前链尖切换过去，旧链尖上的区块作废。

重组（reorg，链重组）发生在[比特币节点](/glossary/node)得知一条比自己当前跟随的链更长的链时——节点切换过去。原先链尖上的区块变成[过期块](/glossary/stale-block)；其中包含的交易被退回[内存池](/glossary/mempool)，除非它们也出现在新链上。

驱动重组的规则是「最长有效链获胜」——更精确地说，是累积[工作量证明](/glossary/proof-work-pow)最多的链获胜。当两个矿工几乎同时在同一高度出块，网络短暂分裂。一旦某一边先挖出下一个块，那一边的累积工作量更多，跟随另一边的节点就重组过去。

两种情形：

- **浅重组（1-2 个块深）。** 日常现象。每年发生多次，只影响刚刚确认的交易。这正是大额转账要等 6 个确认规则存在的原因——六个区块之后，除非发生大规模协同攻击，重组推翻你交易的概率微乎其微。
- **深重组（3 个块以上）。** 罕见且值得警惕。比特币主网上已观察到的深重组多由软件漏洞、短暂网络分区造成，testnet 上则多为研究性故意攻击。主网深重组是需要认真调查的重大事件。

经济上的含义：比特币的[交易最终性](/glossary/transaction-finality)是概率性的，不是二元的——一笔交易的最终性等于压在它上面的已挖出的工作量。一个确认是「小额大概没问题」；六个确认是「几乎所有场景都安全」；数百个确认是「实际意义上永久」。

**相关词条：** [区块传播（Block Propagation）](/glossary/block-propagation) · [区块链（Blockchain）](/glossary/blockchain) · [链分裂（Chain Split）](/glossary/chain-split) · [双花（Double Spend）](/glossary/double-spend) · [双花中继（Double Spend Relay）](/glossary/double-spend-relay) · [分叉（Fork）](/glossary/fork) · [分叉检测（Fork Detection）](/glossary/fork-detection) · [过期块（Stale Block）](/glossary/stale-block) · [交易最终性（Transaction Finality）](/glossary/transaction-finality)
