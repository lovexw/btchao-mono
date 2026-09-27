---
title: 区块高度（Block Height）
---

# 区块高度（Block Height）

> **一句话定义：** 自创世区块（高度为 0）以来的区块计数。

区块高度是任意给定区块与[创世区块](/glossary/genesis-block)之间的区块数量，创世区块位于高度 0。区块 1 比创世区块高 1。区块 840,000——最近一次[减半](/glossary/halving-halvening)发生的地方——比它高 840,000。

高度是引用比特币历史上某个位置的标准方式。时间戳不精确（矿工在一个窗口内自报时间），日期依赖日历惯例，但区块高度是整数、单调递增、全网每个节点完全一致。

比特币的大多数协议级事件都按高度而非日期调度：

- **[减半](/glossary/halving-halvening)** 发生在高度 210,000、420,000、630,000……（每 210,000 块一次）。
- **[难度调整](/glossary/difficulty-retargeting)** 发生在 2,016 的整数倍高度。
- **软分叉**（Taproot、SegWit、BIP-66 等）在达到目标高度、或某个调整窗口内信号阈值达标时激活。

如果你想要一个数字来回答「比特币现在进行到哪儿了」，那就是当前区块高度。见[节点页](/node)。

**相关词条：** [BIP 30](/glossary/bip-30) · [BIP 34](/glossary/bip-34) · [BIP 152（紧凑区块）](/glossary/bip-152-compact-blocks) · [区块（Block）](/glossary/block) · [区块浏览器（Block Explorer）](/glossary/block-explorer) · [区块头（Block Header）](/glossary/block-header) · [区块传播（Block Propagation）](/glossary/block-propagation) · [出块时间（Block Time）](/glossary/block-time) · [区块链（Blockchain）](/glossary/blockchain) · [难度调整（Difficulty Retargeting）](/glossary/difficulty-retargeting) · [创世区块（Genesis Block）](/glossary/genesis-block) · [Hal Finney 的「Running bitcoin」](/glossary/hal-finneys-running-bitcoin) · [减半（Halving）](/glossary/halving-halvening)
