---
title: BIP 68（相对时间锁）
---

# BIP 68（相对时间锁）

> **一句话定义：** 让交易基于输入的「年龄」定义时间锁，与 OP_CHECKSEQUENCEVERIFY 配合使用。

[BIP-68](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki)（连同 BIP 112、113）为比特币引入**相对时间锁**。2016 年 7 月作为[软分叉](/glossary/soft-fork)激活，它让[交易](/glossary/transaction)基于所花输入的**年龄**来延迟花费，而不是锚定某个绝对[区块高度](/glossary/block-height)或墙钟时间。

与[绝对时间锁](/glossary/absolute-locktime)（[BIP-65](/glossary/bip-65-opchecklocktimeverify)）的对照：

- **绝对：**「这个输出在区块 900,000 之后可花费」或「2027 年 1 月 1 日之后」。时间或链史上的一个具体时刻。
- **相对：**「这个输出在被确认 144 个区块（约 1 天）后可花费」或「上链 30 天后」。从输入成熟度起算的时长。

BIP-68 重新解释了交易输入中既有的 `nSequence` 字段来编码这件事。配合成对的 [`OP_CHECKSEQUENCEVERIFY`](/glossary/checksequenceverify-csv)（CSV）操作码（BIP-112 定义），脚本可以强制要求：花费交易必须等被花费输入确认后至少 N 个区块或 N 秒。

相对时间锁的用武之地：

- **[闪电](/glossary/lightning-network)通道。** 撤销密钥惩罚机制依赖 CSV：单方面关闭后，关闭方要等一段延时才能动自己那份——给对手方留出用撤销密钥惩罚作弊的时间。
- **金库构造。** 把一个用户控制的 UTXO 设计成提款必须经过延时窗口，窗口内若发生被盗，报警脚本可以把资金改道。
- **Eltoo（提案）。** 更简洁的闪电通道状态模型，对称设计正依赖相对时间锁。

BIP-65（CLTV / 绝对）与 BIP-68/112（CSV / 相对）共同构成比特币二层生态赖以立足的时间脚本工具箱。交易字段的视角见[锁时间（Locktime）](/glossary/locktime)。

**相关词条：** [绝对时间锁（Absolute Locktime）](/glossary/absolute-locktime) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [锁时间（Locktime）](/glossary/locktime) · [nLockTime](/glossary/nlocktime) · [nSequence](/glossary/nsequence) · [时间锁合约（Time-Locked Contract）](/glossary/time-locked-contract)
