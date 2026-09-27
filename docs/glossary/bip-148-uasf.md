---
title: BIP 148（UASF）
---

# BIP 148（UASF）

> **一句话定义：** 用户激活的软分叉：截止日期后拒绝不给 SegWit 发信号的区块，以此推动 SegWit。

[BIP-148](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki) 是用户激活软分叉（UASF）提案，在 2017 年年中终结了长达数年的 [SegWit](/glossary/segwit-segregated-witness-bip-141) 激活僵局。它是比特币治理史上最重要的事件之一。

背景：SegWit 拥有开发者、交易所、企业和[节点](/glossary/node)多数的广泛支持——但相当一部分矿工拒绝按 [BIP-9](/glossary/bip-9-versionbits) 发信号。僵局持续超过一年。有的矿工想要交换条件（尤其是更大区块）；有的只是在跑能利用一种叫 [AsicBoost](/glossary/asicboost) 的隐式优化的矿机——而 SegWit 会破坏它。

BIP-148 由 Shaolinfry 起草：自 2017 年 8 月 1 日起，兼容 BIP-148 的节点将*拒绝*任何不为 SegWit 发信号的区块。如果足够多的节点运行这个软件，矿工要么给 SegWit 发信号，要么被网络的经济多数打成孤块。

实际发生的事：

- **BIP-148 的威胁是可信的。** 主要交易所、企业和节点运营者表态准备运行它。
- **矿工眨眼了。** 8 月 1 日截止前，矿工同意激活 [BIP-91](/glossary/bip-91)——它不分裂链地强制了 SegWit 信令。SegWit 随即锁定，8 月末激活。
- **链（在比特币这边）没有分裂。** 争端确实催生了作为独立山寨币的比特币现金，但比特币自身保持了一条链。

教训：**节点——而不是矿工——是比特币规则的最终权威。** 矿工可以拒绝发信号，但他们无法强迫网络接受经济多数节点拒绝的区块。BIP-148 在实践中确立了这个原则。此后每一次激活讨论都引用它。

让一场用户起义成为必要的两年僵局，见[扩容战争专题](/rabbit-holes/block-size-war)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 9（版本位）](/glossary/bip-9-versionbits) · [BIP 91](/glossary/bip-91) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [BIP 144（SegWit 中继）](/glossary/bip-144-segwit-relay) · [Bitcoin Core](/glossary/bitcoin-core) · [部署阈值（软分叉）](/glossary/deployment-threshold-soft-fork) · [锁定阶段（软分叉）](/glossary/locked-period-soft-fork) · [软分叉（Soft Fork）](/glossary/soft-fork)
