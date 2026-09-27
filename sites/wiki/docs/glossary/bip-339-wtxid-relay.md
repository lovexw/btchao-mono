---
title: BIP 339（WTXID 中继）
---

# BIP 339（WTXID 中继）

> **一句话定义：** 基于 wtxid 的交易中继协商，取代基于 txid 的 INV 消息，堵住见证延展性中继缺口。

BIP 339 改动了 P2P 中继层：对等节点可以用见证交易 ID（wtxid）而非 txid 来通告[交易](/glossary/transaction)。协商通过版本握手完成前交换的 `wtxidrelay` 消息进行；双方都支持，才启用基于 wtxid 的 `INV`、`GETDATA`、`NOTFOUND` 流量。由 Suhas Daftuar 撰写，Bitcoin Core 0.21（2021 年 1 月）部署。

动机来自 SegWit 的一个微妙细节。SegWit（BIP 141）消灭了 txid 延展性：txid 只承诺非见证数据，见证层的改动不再影响 txid。但见证本身仍可被篡改。两笔交易可以共享同一 txid、却带着完全不同的见证（比如一个有效签名、另一个不同但同样有效的签名）。BIP-339 之前的中继逻辑按 txid 识别交易，节点可能把其中一笔当「重复」默默丢弃，根本没意识到两笔是不同的。

实际效果：

- **封掉一个小的 DoS 向量。** 攻击者再也无法观察到在途交易后，用「另类见证」副本轰炸网络，让一部分节点接受、另一部分当作已见而丢弃。
- **紧凑区块转发（BIP 152）更干净。** 紧凑区块的短 ID 派生自 wtxid，wtxid 感知的对端重建[区块](/glossary/block)更可靠。
- **未来的 P2P 传输升级**（BIP 324 v2 加密传输等）建立在「对端可以用完整识别哈希指称交易」的前提上。

钱包与用户看不到任何变化。交易照常广播、照常确认。BIP 339 是管道层的加固，安静地硬化 P2P 层，从不露面到用户体验里。

规范：[BIP-339](https://github.com/bitcoin/bips/blob/master/bip-0339.mediawiki)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 144（SegWit 中继）](/glossary/bip-144-segwit-relay) · [BIP 152（紧凑区块）](/glossary/bip-152-compact-blocks) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [签名裁剪（Signature Clipping）](/glossary/signature-clipping) · [交易（Transaction）](/glossary/transaction)
