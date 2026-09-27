---
title: 难度（Difficulty）
---

# 难度（Difficulty）

> **一句话定义：** 找到低于全网目标的区块哈希有多难的度量，每 2016 个区块（约两周）调整。

难度是一个数字，定义了「现在挖出一个比特币区块有多难」。具体地说，它决定了[区块头](/glossary/block-header)[哈希](/glossary/hash)必须低于的那个**目标值**，区块才算有效。难度越高 = 目标越低 = 平均需要尝试更多次才能找到有效哈希。

难度的设定标准是：在当前全球[算力](/glossary/hash-rate)下，区块平均每 10 分钟出一个。算力涨了或跌了，难度就通过[难度调整](/glossary/difficulty-retargeting)每 2,016 个区块（约两周）校准一次。

感受一下这个量级：自创世区块以来，比特币网络已完成约 400 次难度调整。创世区块的难度是 1；2026 年年中的难度约为 132 万亿。这个比值——13 个数量级——就是全球比特币挖矿产业的全部成长史：从一台桌面电脑的 CPU，到一个全球性工业部门。

难度是[工作量证明](/glossary/proof-work-pow)里让系统自我调谐的那个部件。不管入场竞争的是 10 个矿工还是 10,000 个矿工，区块照样约 10 分钟出一个，BTC 照样按时间表发行。网络不关心硬件或电力的价格，它只关心算力，并随算力调整自己。

机制的完整展开见[挖矿：算力、难度与激励](/rabbit-holes/mining)；当前的难度与周期进度见[节点页](/node)。

**相关词条：** [难度调整](/glossary/difficulty-retargeting) · [工作量证明（PoW）](/glossary/proof-work-pow) · [随机数（Nonce）](/glossary/nonce) · [算力](/glossary/hash-rate) · [泊松过程](/glossary/poisson-process) · [挖矿补贴](/glossary/mining-subsidy) · [共识参数](/glossary/consensus-parameter) · [竞争性挖矿](/glossary/competitive-mining) · [每 TH/s 收益](/glossary/revenue-ths)
