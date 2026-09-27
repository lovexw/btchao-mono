---
title: UTXO（未花费交易输出）
---

# UTXO（Unspent Transaction Output）

> **一句话定义：** 链上记录的一笔可花费的 BTC。每笔交易输入消耗一个或多个 UTXO。

UTXO——**未花费交易输出**（unspent transaction output）——是仍可花费的[交易输出](/glossary/output-transaction-output)。比特币不记账户余额，只记 UTXO。钱包显示的「余额」，只是它能解锁的所有 UTXO 面值之和。

每个 UTXO 由两部分构成：一个**金额**（以聪计）和一段**锁定脚本**（定义花它需要满足什么）。最常见的脚本是「证明你持有该地址的私钥」；更高级的脚本可以要求多个签名、时间延迟或其他条件。

UTXO 是全有或全无的。把它作为[交易输入](/glossary/input-transaction-input)花掉时，整笔被消耗。只想花一部分？交易会创建两个输出：一个给收款人，一个作为**找零**回到你自己。多数钱包默默完成这一切，并为找零挑一个新地址。

用 UTXO 思考，有两个实际理由：

- **手续费。** 每个输入占用约 68–148 字节（取决于脚本类型），交易越大越贵。许多小额 UTXO = 昂贵的交易。在费率低时定期合并，将来能省钱。
- **隐私。** 同一笔交易花两个 UTXO，等于公开宣告「它们同属一人」。链上分析者正是借此聚类地址。[硬币控制](/glossary/coin-control)（手动挑选花哪些 UTXO）和 [CoinJoin](/glossary/coinjoin) 之类的工具可以帮你顶回去。

深入阅读：[UTXO：比特币的记账模型](/rabbit-holes/utxos)——找零地址、硬币选择、粉尘与隐私。另见[交易](/glossary/transaction)（消耗和创造 UTXO 的数据结构）。

**相关词条：** [交易](/glossary/transaction) · [输出](/glossary/output-transaction-output) · [找零输出](/glossary/change-output) · [UTXO 池](/glossary/utxo-pool) · [硬币选择](/glossary/coin-selection) · [粉尘](/glossary/dust)
