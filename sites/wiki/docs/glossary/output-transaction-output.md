---
title: 输出（Transaction Output）
---

# 输出（Transaction Output）

> **一句话定义：** 指定一笔 BTC 数额和一段锁定脚本（决定日后如何花费）。交易确认后，输出成为 UTXO，直到被花费。

交易输出指定一笔 BTC 金额和一个**锁定脚本**（技术名称 *scriptPubKey*），定义日后花费它需要什么。交易一经确认，这个输出就进入全局未花费集合，成为一个 [UTXO](/glossary/utxo-unspent-transaction-output)，待在链上，直到有人产出一个满足其脚本的[交易输入](/glossary/input-transaction-input)。

在线上传输格式里，每个输出就是两个字段：一个 8 字节的聪计值，加一个带长度前缀的锁定脚本。输出在交易内是有序的；每个输出的位置（**vout** 索引，从 0 起）成为它永久身份的一部分。后续花费用 `(txid, vout)` 这对值来引用一个输出。

锁定脚本可以很简单（「持有这把私钥的人可以花费」），也可以任意复杂（多签、时间锁、哈希锁，或一般的[比特币脚本](/glossary/bitcoin-script)逻辑）。实践中有几种标准模式占主导：

- **[P2PKH](/glossary/p2pkh-pay-public-key-hash)**——`1` 开头的传统地址。花费时揭示一个公钥加匹配签名。
- **[P2SH](/glossary/p2sh)**——`3` 开头的地址。花费时揭示一个赎回脚本（它本身定义真正的花费条件）及其满足数据。
- **[P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash)**——`bc1q...` 开头的 SegWit 地址。P2PKH 的原生 SegWit 等价物。
- **[P2WSH](/glossary/p2wsh-pay-witness-script-hash)**——`bc1q...` 开头（更长）的 SegWit 地址。P2SH 的原生 SegWit 等价物。
- **[Taproot](/glossary/taproot)（P2TR）**——`bc1p...` 开头的地址。增加了密钥路径与脚本路径花费，使用 Schnorr 签名。

输出**不可分割**。你不能花半个 UTXO——你要么整笔花掉，把剩余部分用一个新的**找零**输出发回给自己。这就是你的多数[交易](/glossary/transaction)有两个输出的原因：一个给真正的收款人，一个回到你自己的钱包。

两个值得知道的特殊情形：

- **粉尘输出。** 低于某个随转发费而变的阈值（传统类型通常约 546 聪，SegWit 和 Taproot 更低）的输出是不标准的——默认的内存池策略拒绝转发，钱包也不会创建。
- **[OP_RETURN](/glossary/opreturn) 输出。** 以 `OP_RETURN` 开头的锁定脚本可证明不可花费。它们携带零聪，只用于嵌入小型数据承诺——协议元数据、证明、侧链锚定——而不撑大 UTXO 集。

**相关词条：** [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [输入（Transaction Input）](/glossary/input-transaction-input) · [OP_RETURN](/glossary/opreturn) · [P2PKH（付给公钥哈希）](/glossary/p2pkh-pay-public-key-hash) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [Taproot](/glossary/taproot) · [交易（Transaction）](/glossary/transaction) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output)
