---
title: BIP 102（2MB 区块）
---

# BIP 102（2MB 区块）

> **一句话定义：** 把比特币区块大小提高到 2 MB 的短命提案，早期扩容之争的缩影。

BIP 102 由 Jeff Garzik 于 2015 年起草，是最小化的扩容提案：在一个固定旗日高度把区块上限从 1 MB 改成 2 MB。没有见证折扣，没有软分叉技巧，就是一次把区块稍微加大的硬分叉。

它从未激活。社区转向了 [SegWit（BIP 141）](/glossary/segwit-segregated-witness-bip-141)：软分叉交付 1.7–2 倍有效容量，修复交易延展性，解锁闪电网络。想要干净的容量提升（并从原则上反对 SegWit）的大区块支持者于 2017 年 8 月分叉成比特币现金。

近十年后，「比特币怎么扩容」的答案没有变：基础层靠 SegWit 和 Taproot 提效，高吞吐支付靠闪电，加上一条刻意不靠撑大区块追吞吐量的路线。BIP 102 是那条没走的路，也是理解为什么没走的参考。

规范：[BIP-102](https://github.com/bitcoin/bips/blob/master/bip-0102.mediawiki)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [区块（Block）](/glossary/block) · [区块大小（Block Size）](/glossary/block-size) · [分叉（Fork）](/glossary/fork) · [软分叉（Soft Fork）](/glossary/soft-fork)
