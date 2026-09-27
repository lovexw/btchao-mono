---
title: 出块时间（Block Time）
---

# 出块时间（Block Time）

> **一句话定义：** 相邻两个区块之间的平均间隔，比特币的目标约为 10 分钟。

比特币的目标出块时间是 10 分钟。这是[难度](/glossary/difficulty)通过调整挖矿谜题难易程度去维持的*平均*间隔，不是你对任何单个区块该抱的预期。

挖矿是一个[泊松过程](/glossary/poisson-process)。每一秒钟，世界上每个矿工都在独立地尝试随机数。不存在「该出块了」这回事。区块的实际间隔服从指数分布：很多区块落在 1–5 分钟内，有些要 20–40 分钟，一年总有几次超过一小时。10 分钟只是长窗口下的均值。

选择 10 分钟（而不是莱特币的 1 分钟、以太坊当年的 15 秒）是一次刻意的取舍：

- **足够长**，让新区块在被下一个区块找到之前能传播到地球上几乎所有节点。这最小化[孤块](/glossary/orphan-block)和链分叉。
- **足够长**，让每个区块承载的[工作量证明](/glossary/proof-work-pow)是有分量的安全性。
- **又足够短**，让确认以有用的速度累积。六个确认（大额交易的惯例「已结算」门槛）大约一小时。

全球算力增长（或收缩）后，每 2,016 块一次的[难度调整](/glossary/difficulty-retargeting)会把均值拉回 10 分钟。长版本见[挖矿：算力、难度与激励](/rabbit-holes/mining)。

**相关词条：** [BIP 152（紧凑区块）](/glossary/bip-152-compact-blocks) · [区块（Block）](/glossary/block) · [区块头（Block Header）](/glossary/block-header) · [区块高度（Block Height）](/glossary/block-height) · [区块传播（Block Propagation）](/glossary/block-propagation) · [区块链（Blockchain）](/glossary/blockchain) · [难度调整（Difficulty Retargeting）](/glossary/difficulty-retargeting) · [MTP（中位时间过去）——比特币的网络时钟](/glossary/mtp-median-time-past)
