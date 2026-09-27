---
title: 交易（Transaction）
---

# 交易（Transaction）

> **一句话定义：** 把 BTC 从一组所有者转移到另一组所有者的数据结构，由私钥签名。

比特币交易是把 BTC 从一组所有者移交给另一组的数据结构。它消耗既有的[未花费输出](/glossary/utxo-unspent-transaction-output)（UTXO）作为**输入**，并创造新的[**输出**](/glossary/output-transaction-output)——把资金锁进新的花费条件。

这个结构是原子的：交易要么整体成功，要么整体失败。每个输入都必须给出有效签名（或脚本见证），证明花费者控制着被消耗的 UTXO。哪怕只有一个输入不过关，整笔交易无效。输入金额之和必须至少等于输出金额之和，差额就是付给矿工的[手续费](/glossary/fee-estimation)。

一笔典型的转账这样运作：钱包挑选一个或多个你的 UTXO（面值加起来至少够付），为它们签名作为输入；创建一个付给收款人的输出，再创建一个把余款付回自己的*找零*输出。整个包被广播到点对点网络，停在[内存池](/glossary/mempool)里，直到矿工把它打包进区块。

一旦确认，交易就被它的 **txid**（序列化形式的 SHA-256 双重哈希）永久标识。它创造的输出成为全局 UTXO 集里的新成员，可供未来交易花费；它消耗的输入则永久消失。

矿工如何决定打包哪些交易，见[挖矿](/rabbit-holes/mining)；作为比特币记账基础的「硬币对象」模型，见 [UTXO](/glossary/utxo-unspent-transaction-output)。

**相关词条：** [UTXO](/glossary/utxo-unspent-transaction-output) · [输入](/glossary/input-transaction-input) · [输出](/glossary/output-transaction-output) · [交易手续费](/glossary/transaction-fee) · [找零输出](/glossary/change-output) · [锁时间](/glossary/locktime) · [交易最终性](/glossary/transaction-finality)
