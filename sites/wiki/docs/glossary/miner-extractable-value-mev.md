---
title: 矿工可提取价值（MEV）
---

# 矿工可提取价值（MEV）

> **一句话定义：** 源自以太坊的概念：通过重排/插入交易获利；比特币因脚本简单而机会有限。

矿工可提取价值（MEV）是矿工通过刻意排序、纳入或排除特定交易，从区块中提取的超出标准[区块奖励](/glossary/block-reward)的利润。这个词起源于以太坊生态，那里 MEV 是重大且被充分研究的现象。在比特币上，它在实践中小得多。

MEV 在以太坊上长什么样：

- **抢跑 DEX 交易。** 矿工看到 Uniswap 上一笔待处理的大买单，先插入自己的买单，让受害者的买单执行（推高价格），然后立刻卖出获利。标准的「三明治攻击」。
- **套利截取。** 本来机器人能赚的套利机会被矿工拿走，因为矿工控制区块内交易的包含顺序。
- **清算竞赛。** 谁的交易先到，谁清算抵押不足的头寸；矿工按定义永远赢这场竞赛。

到 2022 年，MEV 在以太坊上已是年十亿美元级的产业，有专门的基础设施（Flashbots、MEV-Boost）捕获和再分配 MEV。

为什么比特币的 MEV 少得多：

- **脚本有限。** [比特币脚本](/glossary/bitcoin-script)不支持产生大额 MEV 的复杂 DEX、借贷、清算合约。链上没有可以抢跑的 Uniswap。
- **UTXO 模型。** 比特币的 [UTXO](/glossary/utxo-unspent-transaction-output) 模型没有以太坊账户模型那种让 MEV 繁殖的「共享全局状态」。每个 UTXO 相互独立。
- **更简单的费率市场。** 比特币矿工确实按费率重排交易（一种小号的 MEV），但比起合约驱动的机会，动态范围窄得多。

比特币确实存在的 MEV：

- **拥堵时刻的手续费竞价战。** 谁付得多谁先进。这是基本费率市场，有时被称为 MEV。
- **[手续费狙击](/glossary/fee-sniping)。** 矿工可以刻意重组区块，截取旧的高费交易。防御手段（锚定锁时间的交易）是存在的。
- **铭文/序数的排序。** 2023–2024 年铭文铸造潮中出现了一些类 MEV 动态，矿工可以优待特定提交。

短版本：MEV 是一个有意义的概念，而比特币的设计在很大程度上避开了它——主要因为比特币刻意让基础层保持狭窄。这是「不做智能合约平台」的一个无名好处。

**相关词条：** [链上分析（Chain Analysis）](/glossary/chain-analysis) · [竞争性区块传播](/glossary/competitive-block-propagation) · [竞争性挖矿（Competitive Mining）](/glossary/competitive-mining) · [手续费狙击（Fee Sniping）](/glossary/fee-sniping) · [隐性矿工税（Hidden Miner Tax）](/glossary/hidden-miner-tax) · [挖矿（Mining）](/glossary/mining) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [挖矿托管（Mining Colocation）](/glossary/mining-colocation) · [挖矿中心化（Mining Centralization）](/glossary/mining-centralization)
