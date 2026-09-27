---
title: BIP 91
---

# BIP 91

> **一句话定义：** 2017 年扩容之争中 SegWit 激活阶段的信令协调方法。

[BIP-91](https://github.com/bitcoin/bips/blob/master/bip-0091.mediawiki) 是 2017 年 8 月激活 [SegWit](/glossary/segwit-segregated-witness-bip-141) 的矿工协调机制，拆除了即将与 [BIP-148（UASF）](/glossary/bip-148-uasf)迎头相撞的链分裂危机。

僵局的背景：SegWit 已经就绪一年。[BIP-9](/glossary/bip-9-versionbits) 的 95% 信令阈值迟迟无法达成，因为少数矿工在抵制。UASF 阵营准备自 2017 年 8 月 1 日起单方面强制执行 SegWit——那将让不发信号的区块变孤块，并可能分裂链。

BIP-91 是那个妥协。由 James Hilliard 起草、作为「SegWit2x」/纽约协议努力的一部分被矿工采纳，它降低了激活门槛并强制快速协调：

1. **80% 阈值**（低于 BIP-9 的 95%）激活 SegWit 信令。
2. **强制性。** 336 块窗口内达到 80% 后，*所有*矿工此后必须为 SegWit 发信号，否则区块变孤块。
3. **快速部署。** 2017 年 7 月中锁定，8 月激活。

它实际达成了什么：

- **SegWit 干净激活**，比 BIP-148 的 8 月 1 日截止提前约十天。没有链分裂，没有大规模孤块。
- **证明矿工对用户压力有反应。** UASF 的可信威胁，让僵持一年多的矿工就范。
- **协议中「SegWit2x」硬分叉那一半被放弃**：用户对矿工想要的 2 MB 区块硬分叉毫无胃口，这一点在 2017 年晚些时候明朗。「2x」从未发生。

BIP-91 是一份体量很小、历史分量很重的技术文档。它是僵局与成功升级之间的桥梁，也是「筹码在用户手里、不在矿工手里」这一现代比特币治理框架的确立时刻。

BIP-91 拆掉的那场对峙，见[扩容战争专题](/rabbit-holes/block-size-war)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 9（版本位）](/glossary/bip-9-versionbits) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [BIP 144（SegWit 中继）](/glossary/bip-144-segwit-relay) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [Bitcoin Core](/glossary/bitcoin-core) · [部署阈值（软分叉）](/glossary/deployment-threshold-soft-fork) · [锁定阶段（软分叉）](/glossary/locked-period-soft-fork) · [软分叉（Soft Fork）](/glossary/soft-fork)
