---
title: 区块（Block）
---

# 区块（Block）

> **一句话定义：** 打包交易的数据结构，引用上一区块哈希，串联成比特币区块链。

每个区块的头部都包含上一个区块的哈希。这就是它是*链*的原因：篡改第 800,000 号区块，它之后的所有区块指向的哈希就全错了——你的伪造会在几毫秒内被地球上每个节点识破。

[矿工](/glossary/miner)竞相为下一个区块寻找有效的工作量证明。最先成功的人获得新的[区块补贴](/glossary/block-subsidy)（目前 3.125 BTC，每 210,000 个区块减半）加上区块内所有交易的手续费。这就是维持链条生长的全部激励结构。机制详解见[挖矿：算力、难度与激励](/rabbit-holes/mining)。

**相关词条：** [区块头](/glossary/block-header) · [区块高度](/glossary/block-height) · [区块大小](/glossary/block-size) · [区块奖励](/glossary/block-reward) · [出块时间](/glossary/block-time) · [区块链](/glossary/blockchain) · [矿工](/glossary/miner)
