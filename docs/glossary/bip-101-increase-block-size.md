---
title: BIP 101（扩大区块）
---

# BIP 101（扩大区块）

> **一句话定义：** Gavin Andresen 2015 年的提案：把区块上限提到 8 MB 并每两年翻倍。从未激活。

BIP 101 由 Gavin Andresen 于 2015 年 6 月起草，提出一个动态区块大小时间表：2016 年 1 月 11 日把上限从 1 MB 提到 8 MB，此后每两年翻倍，直到 2036 年，最终约 8 GB。激活需要在一个滚动的 1000 块窗口内获得 75% 的矿工信号。

它从未激活。该提案随 Bitcoin XT（Andresen 与 Mike Hearn 的 Bitcoin Core 分叉）发布，短暂吸引过一些矿工支持，但数月内失去势头。75% 阈值从未接近达成。

BIP 101 是 2015–2017 年扩容战争的开局。战线迅速清晰。支持者说 1 MB 上限在扼杀采用，直接的链上扩容是最简单的解法。反对者说硬分叉区块大小会招致有争议的链分裂，激进的扩容压力会让节点运营中心化（更大的区块意味着更多带宽和存储），而且更好的技术方案（交易延展性修复、见证隔离、二层协议）已经近在眼前。

实际落地的是 [SegWit（BIP 141）](/glossary/segwit-segregated-witness-bip-141)，2017 年 8 月以软分叉激活。SegWit 不硬分叉就交付了 1.7–2 倍的有效容量提升，修复了交易延展性（解锁闪电网络），也不需要全员协调。拒绝 SegWit 的大区块支持者当月晚些时候分叉成比特币现金，最终也落到了自己的 8 MB 上限上。

BIP 101 如今读起来像一条没走的路。技术理由和政治动力都是真实的；两边都有善意的人持各自的立场。结果是比特币选择了保守的基础层扩容加激进的二层开发，另一条路作为一条独立的链并行运行。近十年后，比特币的区块大小没有变过；吞吐量的重活由闪电承担。

规范：[BIP-101](https://github.com/bitcoin/bips/blob/master/bip-0101.mediawiki)。

BIP 101 开战之后发生了什么，见[扩容战争专题](/rabbit-holes/block-size-war)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 102（2MB 区块）](/glossary/bip-102-2mb-block-size) · [比特币现金（Bitcoin Cash）](/glossary/bitcoin-cash) · [区块大小（Block Size）](/glossary/block-size) · [分叉（Fork）](/glossary/fork) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141)
