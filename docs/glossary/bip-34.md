---
title: BIP 34
---

# BIP 34

> **一句话定义：** 要求 Coinbase 交易显式写入区块高度，规范区块引用。

[BIP-34](https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki) 要求每个比特币区块的 [Coinbase 交易](/glossary/coinbase-transaction)在其输入脚本的第一个 push 中编码[区块高度](/glossary/block-height)。2013 年 3 月作为[软分叉](/glossary/soft-fork)激活，它是一次一举解决若干小麻烦的结构性清理。

规则本身：

```
coinbase 输入脚本必须以：<区块高度的序列化字节> 开头
```

区块 800,000 的 Coinbase 输入以编码整数 800,000 的字节序列开头。简单、机械、易验证。

它买到什么：

- **唯一性。** 每笔 Coinbase 交易现在都有一个与其他任何区块都不同的输入，两个区块不可能意外产出同一笔 coinbase txid。正是这个结构性修复，让 [BIP 30](/glossary/bip-30) 的「不得重复 txid」规则从此轻易满足。
- **自指区块。** 区块现在显式声明自己的高度。这让某些验证逻辑更干净，也为重新同步或从损坏中恢复的节点提供了健全性锚点。
- **软分叉激活先例。** BIP-34 是最早使用干净矿工信令激活方法的非平凡软分叉之一（早于更正式的 [BIP-9](/glossary/bip-9-versionbits)）。它建立的范式被后来的激活不断打磨。

你会在节点日志、协议文档、偶尔的矿池讨论里看到 BIP-34 被引用，但大多数用户从不直接接触它。它属于比特币「因为 2013 年被仔细设计过、所以如今静默工作」的那部分基础设施。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 30](/glossary/bip-30) · [区块（Block）](/glossary/block) · [区块浏览器（Block Explorer）](/glossary/block-explorer) · [区块高度（Block Height）](/glossary/block-height) · [双花（Double Spend）](/glossary/double-spend) · [交易（Transaction）](/glossary/transaction)
