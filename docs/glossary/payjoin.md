---
title: PayJoin（协作支付）
---

# PayJoin（协作支付）

> **一句话定义：** 协作交易（又称 P2EP）：发送方与接收方都贡献输入，扰乱常规的输入-输出分析。

PayJoin（也叫 Pay-to-Endpoint，P2EP）是一种隐私增强交易格式：**发送方和接收方**都贡献[输入](/glossary/input-transaction-input)。结果是一笔链上支付，直接击破[链上分析](/glossary/chain-analysis)最强的启发式之一：「一笔交易的所有输入属于同一所有者」。

普通支付：发送方贡献输入，接收方什么都不出。分析方据此假设交易的所有输入同属一个钱包，并用它聚类地址。

PayJoin：发送方贡献自己的输入，**接收方在签名前再加至少一个自己的输入**。交易里就有了来自两个不同钱包的输入。共同输入启发式就此失效——照搬这条规则的分析方会把两个毫不相关的钱包合并成一个虚假聚类。

实际收益：

- **对发送方：**「你的交易的所有输入都是你的」这一分析假设变成错的，过往的聚类分析被污染。
- **对接收方：**支付不再落到一个孤立的新地址；既有的 UTXO 成为花费模式的一部分，更难被单独圈出来。
- **双方**还顺手完成一定程度的[合并](/glossary/consolidation-transaction)——接收方在收款的同时花掉了一个旧 UTXO。

难点在协调：广播前两个钱包要先通信。[BIP-78](https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki) 等标准定义了基于 HTTP 的 PayJoin 协议，由接收方运行一个端点。2024-2025 年的改进（BIP-77 / 经由 Nostr 之类中继的异步 PayJoin）让协调更轻松，不再要求接收方在付款那一刻在线。

PayJoin 与 [CoinJoin](/glossary/coinjoin) 在规模和意图上都不同。CoinJoin 是多方批量混币，做事后隐私；PayJoin 是两方普通支付中的隐私。两者都有用，而 PayJoin 更难被审查或针对性阻断——因为每笔 PayJoin 看起来都像一笔普通交易。

PayJoin 在「看起来像日常使用的隐私工具」中处于什么位置，见[比特币隐私专题](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [地址聚类（Address Clustering）](/glossary/address-clustering) · [地址复用（Address Reuse）](/glossary/address-reuse) · [CoinJoin（协作交易混币）](/glossary/coinjoin) · [混币服务（Mixing Service）](/glossary/mixing-service) · [屏蔽 CoinJoin（Shielded CoinJoin）](/glossary/shielded-coinjoin) · [隐形地址（Stealth Address）](/glossary/stealth-address)
