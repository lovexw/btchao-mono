---
title: 合并交易（Consolidation Transaction）
---

# 合并交易（Consolidation Transaction）

> **一句话定义：** 把一堆小额 UTXO 并成一个大输出的清理式交易——趁低费时段一次付清字节钱，替未来的每笔花费省钱。

合并交易把许多小 [UTXO](/glossary/utxo-unspent-transaction-output) 合并成一个大输出。它是给「攒了一堆零钱的钱包」做的清理动作。

动机是手续费效率。[交易](/glossary/transaction)里每个输入都占字节（按脚本类型大约 68–148 vbyte），交易越大[手续费](/glossary/fee-estimation)越高。如果你有 50 枚小 UTXO，日后每一笔碰巧花掉其中几枚的交易都在为那些输入字节买单。低费时段合并，等于现在一次性付掉字节钱，之后每次花费都省。

实用配方：

1. **等低费窗口。** 盯着[内存池](/glossary/mempool)，等下一块费率降到 1–3 sat/vB 再动手。清闲的周末、暴涨后的平静期是常见窗口。
2. **有意识地挑 UTXO。** 合并来自不同来源的 UTXO 等于当众宣告「它们同属一人」。如果你一直小心保持某些地址彼此隔离，*不要*在同一笔合并交易里把它们混起来。
3. **发给自己钱包的新地址。** 输出是一枚由你控制的全新 UTXO。

隐私代价是真实的。合并等于告诉公共链：这些 UTXO 都归一个人。若它们来自 KYC 来源或不同的身份语境，你就把它们焊死了。在乎隐私时的正确做法：只合并*已经公开关联*的 UTXO（同源、或已经一起花过），而不是把互相隔离的硬凑到一起。

交易所和商户把合并当日常操作 routinely 地做。个人用户则通常几个月做一次（如果做的话）。这笔交易所解决的「小 UTXO 问题」见[粉尘](/glossary/dust)。

**相关词条：** [批量交易（Batch Transaction）](/glossary/batch-transaction) · [比特币天数销毁](/glossary/bitcoin-days-destroyed) · [币龄（Coin Age）](/glossary/coin-age) · [交易（Transaction）](/glossary/transaction) · [交易链（Transaction Chaining）](/glossary/transaction-chaining) · [交易手续费（Transaction Fee）](/glossary/transaction-fee) · [未花费输出（UTXO）](/glossary/utxo-unspent-transaction-output)
