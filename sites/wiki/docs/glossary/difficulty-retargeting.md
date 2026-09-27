---
title: 难度调整（Difficulty Retargeting）
---

# 难度调整（Difficulty Retargeting）

> **一句话定义：** 每 2016 个区块自动校准挖矿难度，维持 10 分钟出块间隔。

难度调整是比特币无论网上有多少[算力](/glossary/hash-rate)都把平均[出块时间](/glossary/block-time)维持在约 10 分钟的机制。

规则是机械的：

- 每 **2,016 个区块**（约两周），每个节点计算这 2,016 块的「纪元」实际用了多久。
- 如果**不到两周**，出块太快：[难度](/glossary/difficulty)调**高**。
- 如果**超过两周**，出块太慢：难度调**低**。
- 调整比例成正比，**钳制在 ±300%** 以内，防止极端摆动。

调整在下一个纪元开始时立即生效。新难度对接下来 2,016 块有效，然后循环往复。

这是比特币机制设计里最有分量、也最被低估的一件。没有委员会，没有加息降息的美联储。网络观察自己的状态，按固定时刻表自我修正，永远。一座 80 MW 的矿场并网不会改变比特币的发行计划表；它只是触发下一次调整时更高的难度。

这套机制扛过了巨大的事件：2021 年中国禁矿（算力数周内跌约 50%，下次调整难度下调 28%）、2022 年熊市矿工出逃、四次减半。每一次，网络都在一两个纪元内重新平衡，回到 10 分钟均值。

当前纪元进度与下次调整估算，见[挖矿：算力、难度与激励](/rabbit-holes/mining)或[节点页](/node)。

**相关词条：** [区块高度（Block Height）](/glossary/block-height) · [出块时间（Block Time）](/glossary/block-time) · [竞争性挖矿（Competitive Mining）](/glossary/competitive-mining) · [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [难度（Difficulty）](/glossary/difficulty) · [减半（Halving）](/glossary/halving-halvening) · [矿工（Miner）](/glossary/miner) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [随机数耗尽（Nonce Exhaustion）](/glossary/nonce-exhaustion) · [泊松过程（Poisson Process）](/glossary/poisson-process) · [工作量证明（PoW）](/glossary/proof-work-pow)
