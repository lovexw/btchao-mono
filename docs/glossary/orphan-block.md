---
title: 孤块（Orphan Block）
---

# 孤块（Orphan Block）

> **一句话定义：** 未被最佳链接纳的区块的旧称（更准确的说法是过期块）。

「孤块」是对那种有效但最终没进正统链的区块的旧术语。现代 Bitcoin Core 文档更倾向用[过期块](/glossary/stale-block)指这个概念，把「孤块」留给真正的罕见情形：本地节点还没收到其父区块的那个块。

实际场景是：两个[矿工](/glossary/miner)几乎同时、在同一高度附近各自挖到有效区块——平均一年发生几次——网络短暂分裂。一半人在先看到的那块上构建。一两个区块之后，一个分支通常领先，另一分支的链尖区块被抛弃。被抛弃区块的矿工拿不到钱。

命名史很乱。旧文里「orphan」「stale」「uncle」（以太坊的叫法）常常混用。2026 年对比特币更干净的区分是：

- **过期块（stale block）**——一个输掉竞赛的有效区块，完全验证过。区块存在过，只是不再属于最长链。
- **孤块（orphan block）**——本地节点缺其父区块的块。通常是传播过程的产物，父区块一到，几乎总在几秒内解决。

两者都是全球分布式工作量证明竞赛的正常结果，都不代表比特币出了什么问题。过期块里的交易会怎样，见[重组（Reorg）](/glossary/reorg-reorganization)。

**相关词条：** [区块（Block）](/glossary/block) · [区块传播（Block Propagation）](/glossary/block-propagation) · [链分裂（Chain Split）](/glossary/chain-split) · [分叉（Fork）](/glossary/fork) · [矿工（Miner）](/glossary/miner) · [重组（Reorg）](/glossary/reorg-reorganization) · [过期块（Stale Block）](/glossary/stale-block)
