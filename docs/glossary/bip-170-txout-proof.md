---
title: BIP 170（交易输出证明）
---

# BIP 170（交易输出证明）

> **一句话定义：** 提议用默克尔证明标准化地证明交易在区块中的包含性，辅助 SPV 验证。

BIP 170 由 Mark Friedenbach 于 2013 年起草，提议一个标准化的默克尔证明格式：证明某笔特定交易输出存在于某个区块。概念上与 BIP 37 的 merkleblock 消息相似，但它是独立的数据结构，而不是 P2P 协议消息。

它从未成为网络级标准。功能以另一种形式存活：Bitcoin Core 把这些证明实现为 RPC 命令——`gettxoutproof` 为一笔或多笔交易生成证明，`verifytxoutproof` 验证它。钱包和浏览器用这些 RPC 对着信任的全节点做 SPV 式验证。

对现代轻客户端工作而言，主流不是点对点发送的 TxOut 证明，而是 [BIP 158](/glossary/bip-158) 紧凑区块过滤器。过滤器让客户端在本地决定要取什么，而不必告诉任何对等节点自己关心哪些地址。隐私比向对等节点索要证明好出一大截。

BIP 170 现在的意义，主要是「早期 SPV 设想」演化到「现代紧凑区块过滤器设计」路上的又一个路标。

规范：[BIP-170](https://github.com/bitcoin/bips/blob/master/bip-0170.mediawiki)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [默克尔块（Merkle Block）](/glossary/merkle-block) · [默克尔包含证明](/glossary/merkle-inclusion-proof) · [默克尔证明（Merkle Proof）](/glossary/merkle-proof) · [交易（Transaction）](/glossary/transaction) · [交易索引（txindex）](/glossary/transaction-index-txindex) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output)
