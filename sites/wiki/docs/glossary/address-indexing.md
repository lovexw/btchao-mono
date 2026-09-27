---
title: 地址索引（Address Indexing）
---

# 地址索引（Address Indexing）

> **一句话定义：** 按地址归集比特币交易的服务或功能，让按地址查询历史、区块浏览器检索这类事变得飞快。

地址索引，就是建一个数据库，把每个比特币地址映射到所有「付给它」和「它花出去」的交易。Bitcoin Core 默认不做这件事；它由外部服务和少数特化节点分支提供。

Bitcoin Core 为什么不做：

- **隐私立场。** 地址索引让「查任意地址的全部历史」变得毫不费力。Bitcoin Core 的钱包只跟踪自己的地址；大规模地址索引是给外部观察者用的工具，不是给自我托管用户的。
- **资源代价。** 完整地址索引要多占几十 GB 磁盘，还会拖慢初次区块下载。
- **用例都在外部。** 区块浏览器、链上分析公司、支付处理商需要它；个人钱包不需要。

地址索引都住在哪：

- **Electrum 服务器**（Electrs、ElectrumX、Fulcrum）。与 Bitcoin Core 全节点并行运行，自建地址索引，向 Electrum 协议客户端（Sparrow、BlueWallet、Electrum 桌面版等）提供查询。
- **公共区块浏览器**（mempool.space、blockstream.info 等）。内部运行着由全节点数据衍生的地址索引数据库。
- **链上分析公司**（Chainalysis、Elliptic、TRM 之类）。地址索引只是入场券；它们真正卖的产品是把地址聚成实体的[聚类](/glossary/address-clustering)启发式。

隐私影响：

- **对普通用户**：任何复用的地址，都会把你的全部交易历史摊给所有能查地址索引的人。这是结构性的，协议层面就允许。防御是地址轮换（每笔收款用新地址——[HD 钱包](/glossary/hd-wallet-hierarchical-deterministic-wallet)会自动做）。
- **对自托管玩家**：自己跑一台 Electrum 服务器，钱包就能查地址索引，而不用把你的地址拱手交给外部服务。Sparrow + 自建 Electrs + 自有 Bitcoin Core，就是当下尊重隐私的自我托管标配。

地址索引是那种「同一个能力，伺候完全不同的主人」的功能。对正当的浏览器和自托管钱包很有用，也是监控的基石。诚实的说法是：它是个工具，关键看谁来跑、对着谁用。

**相关词条：** [地址](/glossary/address) · [地址聚类](/glossary/address-clustering) · [地址派生路径](/glossary/address-derivation-path) · [地址复用](/glossary/address-reuse) · [交易索引（txindex）](/glossary/transaction-index-txindex)
