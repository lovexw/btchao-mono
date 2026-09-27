---
title: 竞争性区块传播
---

# 竞争性区块传播

> **一句话定义：** 矿工竞相把新区块最快广播到网络，抢占先机。

竞争性区块传播是[区块传播](/glossary/block-propagation)的高赌注版本：把刚挖出的区块抢在别人挖出竞争区块之前，广播到足够多的网络，让其他矿工转而在它上面构建。

经济学是这样的：

- 传播更快的区块，更可能成为其他矿工延伸的那一个。被延伸的区块才拿得到奖励。
- 传播慢的区块可能被连接更好的矿工几乎同时挖出的区块反超。慢的那个变成孤块，奖励归零。
- 对大运营来说，孤块率是收入里实打实的一块百分比。砍掉半个百分点，就值得重大的工程投入。

矿工怎么竞争：

- **紧凑区块（BIP 152）**：协议层人人免费享有，Bitcoin Core 内置。
- **与其他矿工/矿池直连**：最敏感的几跳绕开公共 P2P 网络。
- **专用中继网络**（FIBRE、Falcon）：矿工和基础设施方运营的 UDP 低延迟中继，几十毫秒推遍全球。
- **地理布局。** 在主要互联网交换点（法兰克福、阿姆斯特丹、新加坡、阿什本）附近挖矿，省下几毫秒。
- **免验证转发。**「间谍挖矿」（spy mining）让矿工在验证新区块*主体*之前，先基于它的区块头构建。万一主体无效有风险，但省下的那几秒可能值得。

这场军备竞赛被所有人运行的同一套协议约束着。没有矿工能结构性甩开别人；优化都是边际性的、公开的。但在工业规模上，边际就是真金白银。

**相关词条：** [区块传播（Block Propagation）](/glossary/block-propagation) · [竞争性挖矿（Competitive Mining）](/glossary/competitive-mining) · [矿工可提取价值（MEV）](/glossary/miner-extractable-value-mev) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [挖矿中心化（Mining Centralization）](/glossary/mining-centralization) · [挖矿托管（Mining Colocation）](/glossary/mining-colocation) · [过期块（Stale Block）](/glossary/stale-block)
