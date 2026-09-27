---
title: 输入（Transaction Input）
---

# 输入（Transaction Input）

> **一句话定义：** 指向被花费的某个 [UTXO](/glossary/utxo-unspent-transaction-output) 的引用，加上花费者有权花费它的证明。

交易输入是一个指针：指向正被花费的 [UTXO](/glossary/utxo-unspent-transaction-output)，外加花费者有权动用它的证明。

每个输入通过来源 **txid**（创建这个 UTXO 的交易）和**输出索引**（那笔交易的第几个输出）来引用它。输入还携带解锁数据——传统交易里是数字签名，隔离见证交易里是见证数据——用来满足 UTXO 锁定脚本的要求。

一笔[交易](/glossary/transaction)可以有多个输入。在一笔交易里花掉三个 UTXO，就是三个输入，每个都要有自己有效的签名。任何一个输入验证失败，整笔交易都会被每个节点拒绝——输入与其所在交易是原子性的。

交易一经确认，它引用的每个输入即被永久消耗。试图重新使用一个已花费的 UTXO，就是一次[双花](/glossary/double-spend)企图；网络会拒绝它。

**相关词条：** [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [Coinbase 交易](/glossary/coinbase-transaction) · [输出（Transaction Output）](/glossary/output-transaction-output) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [交易（Transaction）](/glossary/transaction) · [UTXO（未花费输出）](/glossary/utxo-unspent-transaction-output)
