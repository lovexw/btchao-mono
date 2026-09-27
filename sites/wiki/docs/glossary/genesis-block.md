---
title: 创世区块（Genesis Block）
---

# 创世区块（Genesis Block）

> **一句话定义：** 比特币链的区块 0——2009 年 1 月 3 日由[中本聪](/glossary/satoshi-nakamoto)挖出，内嵌一条《泰晤士报》标题。

创世区块是比特币链的区块 0——第一个区块。[中本聪](/glossary/satoshi-nakamoto)于 2009 年 1 月 3 日挖出它，并在其 [coinbase 交易](/glossary/coinbase-transaction)里嵌入了一条日后举世闻名的消息：

> "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
> （《泰晤士报》2009 年 1 月 3 日：财政大臣正处于对银行实施第二轮救助的边缘）

这是当天早些时候《泰晤士报》头版标题的原文。它起两个作用。其一，证明这个区块不是预挖的——它不可能早于那条报纸标题存在。其二，是一份毫不掩饰的立意宣言：比特币诞生于银行业危机的正中心，指名道姓地引用了它被设计来与之竞争的那个体系的失败。

创世区块的几个技术怪癖：

- **50 BTC 的[区块补贴](/glossary/block-subsidy)不可花费。** 中本聪用一种不入 UTXO 集的方式把它硬编码了。这些币存在于传说中，但不存在于可花费的供应里。
- **没有前一个区块的哈希。** 前区块哈希字段全为零——因为前面什么都没有。
- **硬编码在 Bitcoin Core 里。** 每个节点都随软件内置了创世区块的精确字节。它不是被网络「发现」的；它是一个常量。

创世区块如今主要是象征，但每逢减半，那条消息都值得重读一遍。这是一套另类货币体系的立国文献，用 80 个字节写成，作者本人从此再未出现。

配套文献见[白皮书](/glossary/whitepaper)；至于我们对写下它的人所知的一切，见[中本聪（Satoshi Nakamoto）](/glossary/satoshi-nakamoto)。

**相关词条：** [区块头（Block Header）](/glossary/block-header) · [区块高度（Block Height）](/glossary/block-height) · [区块奖励（Block Reward）](/glossary/block-reward) · [区块补贴（Block Subsidy）](/glossary/block-subsidy) · [区块链（Blockchain）](/glossary/blockchain) · [Coinbase 交易](/glossary/coinbase-transaction) · [中本聪（Satoshi Nakamoto）](/glossary/satoshi-nakamoto) · [白皮书（Whitepaper）](/glossary/whitepaper)
