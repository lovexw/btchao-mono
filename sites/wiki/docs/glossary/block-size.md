---
title: 区块大小（Block Size）
---

# 区块大小（Block Size）

> **一句话定义：** 区块允许容纳的最大数据量：历史上 1 MB，SegWit 权重规则下实际更大。

区块大小是比特币最著名的共识参数。最初 1 MB 的硬上限（2010 年 7 月作为反垃圾措施引入）是多年争论的焦点，最终催生了 2017 年的 [SegWit](/glossary/segwit-segregated-witness-bip-141) 软分叉。现行规则不是按字节的平顶上限，而是 400 万权重单位：非见证数据每字节计 4 权重，见证数据每字节计 1。

实践中的效果：

- **典型区块**在磁盘上是 1.3–2.0 MB，取决于 SegWit/Taproot 交易（享受见证折扣）的占比。
- **硬上限**让验证成本有界。一台普通笔记本几秒验证完一个区块；一台树莓派跟得上链尖。这是刻意为之。更大的区块会推高跑节点的成本，让验证者集合中心化。
- **区块权重上限**自 2017 年起在政治上不可触碰。2015–2017 年的「扩容战争」（见 [BIP 101](/glossary/bip-101-increase-block-size) 和 [BIP 102](/glossary/bip-102-2mb-block-size)）以 SegWit 软分叉加比特币现金硬分叉告终；幸存的比特币社区定调「区块保持小，扩容走链下闪电」。

它不是什么：

- 不再是 1 MB。2026 年还在说「比特币 1 MB 区块」的人，用的是过时信息。
- 不是字面意义的字节上限。权重单位这个框架很重要，因为它改变了 SegWit 与 legacy 交易的经济账。

可预见的未来里，区块大小问题已经尘埃落定。实质性的吞吐量争论已转移到闪电通道设计、支付路由效率和 Taproot 脚本优化，不再在链上容量。

这个上限如何成为一场两年治理战争的中心，见[扩容战争](/rabbit-holes/block-size-war)。

**相关词条：** [BIP 42](/glossary/bip-42) · [BIP 102（2MB 区块）](/glossary/bip-102-2mb-block-size) · [区块（Block）](/glossary/block) · [区块奖励（Block Reward）](/glossary/block-reward) · [区块补贴（Block Subsidy）](/glossary/block-subsidy) · [区块链（Blockchain）](/glossary/blockchain) · [减半（Halving）](/glossary/halving-halvening) · [默克尔根（Merkle Root）](/glossary/merkle-root)
