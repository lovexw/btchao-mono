---
title: 脚本（Script）
---

# 脚本（Script）

> **一句话定义：** 比特币基于栈的可编程指令集：定义输出如何被花费（单签、多签等）。

比特币脚本（Script）是基于栈的编程语言，定义输出如何被花费。每个 UTXO 都有一个锁定脚本（`scriptPubKey`）；要花费它，必须提供解锁脚本（传统输入的 `scriptSig`，SegWit 与 Taproot 的见证数据），两者拼接执行后，栈上留下单一非零值即算通过。

设计刻意受限：

- **非图灵完备。** 没有循环、没有通用递归。每个脚本在有界时间与有界内存内停机。这是特性：每个全节点都要验证每个脚本，无界计算会成为全网络的拒绝服务向量。
- **基于栈。** 操作只在一个栈上压入弹出。易于验证、易于推理，但表达力有限（这也是闪电网络等层把复杂合约搬到链下的部分原因）。
- **操作码受限。** 比特币历史上禁用了许多操作码（`OP_CAT`、`OP_MUL`、`OP_NOP` 系保留位）。活跃集合小到能装进脑子里。

覆盖绝大多数 UTXO 的常见脚本模板：

- **P2PK**（`<pubkey> OP_CHECKSIG`）。最原始的形式。主网上除中本聪时代的币外几乎绝迹。
- **P2PKH**（`OP_DUP OP_HASH160 <hash> OP_EQUALVERIFY OP_CHECKSIG`）。传统 `1...` 地址。
- **P2SH**（`OP_HASH160 <hash> OP_EQUAL`）。`3...` 地址；把任意赎回脚本藏进哈希后面。
- **P2WPKH / P2WSH**（[原生 SegWit](/glossary/native-segwit)，见证版本 0）。`bc1q...` 地址；逻辑同 P2PKH / P2SH，但放在见证部分。
- **P2TR**（[Taproot](/glossary/taproot)，见证版本 1）。`bc1p...` 地址；Schnorr 签名、密钥路径或脚本路径花费、脚本路径里的 MAST 树。

叠在纯脚本之上的东西：通过 `OP_CHECKLOCKTIMEVERIFY` 与 `OP_CHECKSEQUENCEVERIFY` 实现的时间锁（闪电 HTLC 的地基）、通过 `OP_CHECKMULTISIG` 或 Schnorr 聚合实现的多签、哈希原像承诺，以及拼成金库、互换与通道的各类策略组合器。

Tapscript（BIP 342）给经典脚本扩展了 Schnorr 签名操作码并通过版本化操作码空间为未来升级铺路，但结构性设计——基于栈、有界、简单——从未改变。

**相关词条：** [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [操作码（OP Code）](/glossary/op-code-operation-code) · [OP_RETURN](/glossary/opreturn) · [无脚本脚本（Scriptless Scripts）](/glossary/scriptless-scripts) · [契约（Covenants）](/glossary/covenants) · [CTV（CheckTemplateVerify）](/glossary/checktemplateverify-ctv) · [原生隔离见证（Native SegWit）](/glossary/native-segwit) · [Taproot](/glossary/taproot)
