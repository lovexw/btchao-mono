---
title: 挖矿（Mining）
---

# 挖矿（Mining）

> **一句话定义：** 用算力求解比特币的工作量证明：验证交易、保护区块链、发行新币。

挖矿是新区块加入比特币链条、新 BTC 进入流通的过程。它是一场持续的全球竞赛：每个[矿工](/glossary/miner)从[内存池](/glossary/mempool)交易中组装候选区块，然后用不同的[随机数](/glossary/nonce)反复哈希区块头，直到某个双重 SHA-256 结果低于当前[难度](/glossary/difficulty)目标。

赢得竞赛的人拿两样东西：

- **[区块补贴](/glossary/block-subsidy)** —— 目前是新发行的 3.125 BTC。
- **区块内每笔交易的手续费。**

这笔合计的[区块奖励](/glossary/block-reward)就是电费和硬件的全部资金来源。没有其他有意义的收入，没有其他有意义的挖矿动机。

全球算力目前约 700 EH/s（每秒 7 × 10^20 次哈希）。每个比特币区块，代表地球上所有矿工同时哈希约 10 分钟的成果——每区块约 4 × 10^23 次尝试。按设计，正是这些能量让改写链条贵得离谱：想撤销一个近期区块，攻击者必须挖出一条更长的分叉——比全世界其他人在真链上的速度快。交易埋得越深，撤销越不现实。

挖矿常被叫作「比特币的能源问题」。更准确地说，它是比特币的*安全模型*：烧掉的电力，买到的是整条链全部历史中每一笔交易的不可篡改性。

**相关词条：** [矿工](/glossary/miner) · [算力](/glossary/hash-rate) · [难度调整](/glossary/difficulty-retargeting) · [区块奖励](/glossary/block-reward) · [区块补贴](/glossary/block-subsidy) · [矿池](/glossary/mining-pool) · [随机数](/glossary/nonce)

完整长文见[挖矿：算力、难度与激励](/rabbit-holes/mining)，能耗争议见[比特币与能源](/rabbit-holes/energy)。
