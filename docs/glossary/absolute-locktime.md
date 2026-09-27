---
title: 绝对时间锁（Absolute Locktime）
---

# 绝对时间锁（Absolute Locktime）

> **一句话定义：** 以具体区块高度或时间戳为参照的时间锁：到点之前，交易或脚本不能生效。

绝对时间锁要求[交易](/glossary/transaction)或脚本只有在某个具体日历时刻之后才能花费——参照物要么是区块高度，要么是 Unix 时间戳。也就是「UTC 时间 12 月 1 日午夜起才能被打包」这种模式。

比特币用两种方式实现绝对时间锁：

- **交易级的 [`nLockTime`](/glossary/nlocktime) 字段。** 阻止整笔交易在阈值之前被打包。适合预先签好一笔交易、但想推迟其生效资格的场景。
- **脚本级的 `OP_CHECKLOCKTIMEVERIFY`（CLTV）操作码**，由 [BIP-65](https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki) 定义。让[比特币脚本](/glossary/bitcoin-script)可以要求花费交易的锁时间至少达到某个值，这个约束直接写进 UTXO 的锁定脚本里。

与**相对**时间锁（通过 `nSequence` 和 [`OP_CHECKSEQUENCEVERIFY`](/glossary/checksequenceverify-csv)，即 CSV）的区别在于「之后」锚定在哪里：

- **绝对：**「区块 900,000 之后」或「2027 年 1 月 1 日之后」。参照的是墙钟时间或链上高度。
- **相对：**「该 UTXO 得到确认之后再过 144 个区块」或「确认后 1 天」。从输入的确认时间起算的延时。

心里有一个具体日期或高度时用绝对；延时应该在 UTXO 存在**之后**才起算的，用相对。

绝对 + 相对时间锁的组合，是[支付通道](/glossary/payment-channel)和[闪电网络](/glossary/lightning-network)底层的构建块之一。实际应用视角见[锁时间（Locktime）](/glossary/locktime)。

**相关词条：** [BIP 65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP 68（相对时间锁）](/glossary/bip-68-relative-locktime) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [锁时间（Locktime）](/glossary/locktime) · [nLockTime](/glossary/nlocktime) · [nSequence](/glossary/nsequence) · [时间锁合约（Time-Locked Contract）](/glossary/time-locked-contract)
