---
title: nLockTime
---

# nLockTime

> **一句话定义：** 指定交易最早可被确认的区块高度或时间戳的协议字段。

`nLockTime` 是比特币[锁时间](/glossary/locktime)字段的协议层名称——每笔交易里的一个 32 位值，指定该交易最早可被打包进区块的区块高度或 Unix 时间戳。

前缀 `n` 是中本聪原始 C++ 代码的遗留习惯——那时整数字段按惯例都以 `n` 开头。你会在源码、BIP 和协议文档里见到它；日常交谈中人们只说「locktime」。

取值语义：

- **0**——立即可用（默认值）。
- **1 到 499,999,999**——解释为区块高度。
- **500,000,000 及以上**——解释为 Unix 时间戳（自纪元起的秒数）。

`nLockTime` 与逐输入的 `nSequence` 字段配对。如果每个输入的 `nSequence` 都是 `0xffffffff`，`nLockTime` 就*被忽略*——无论字段值是多少，交易都当作没有时间锁。任何一个 `nSequence` 低于最大值，`nLockTime` 才开始生效。

这个小怪癖正是[替换手续费（RBF）](/glossary/replace-fee-rbf)的基础——RBF 用 `nSequence` 来发出「这笔交易可以被替换」的信号。它也是 [CHECKSEQUENCEVERIFY](/glossary/checksequenceverify-csv) 出现之前，老式相对时间锁工作流的做法。

实践视角见[锁时间](/glossary/locktime)，与 `nSequence` 相对时间锁的对比见[绝对时间锁](/glossary/absolute-locktime)。

**相关词条：** [绝对时间锁（Absolute Locktime）](/glossary/absolute-locktime) · [BIP 65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP 68（相对时间锁）](/glossary/bip-68-relative-locktime) · [BIP 113](/glossary/bip-113) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [延迟惩罚交易（Delayed Justice）](/glossary/delayed-justice-transaction) · [锁时间（Locktime）](/glossary/locktime) · [MTP（中位时间过去）](/glossary/mtp-median-time-past) · [nSequence](/glossary/nsequence) · [时间锁合约（Time-Locked Contract）](/glossary/time-locked-contract) · [交易（Transaction）](/glossary/transaction)
