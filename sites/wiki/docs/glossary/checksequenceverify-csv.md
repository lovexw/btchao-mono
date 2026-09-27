---
title: CSV（CheckSequenceVerify）
---

# CSV（CheckSequenceVerify）

> **一句话定义：** 在脚本内强制执行相对时间锁的操作码——「这枚 UTXO 确认后再过 N 个区块才能花」；闪电通道安全机制的核心承重件。

**OP_CHECKSEQUENCEVERIFY**（CSV）是在比特币脚本内强制执行[相对时间锁](/glossary/bip-68-relative-locktime)的操作码。它与 [`OP_CHECKLOCKTIMEVERIFY`](/glossary/checklocktimeverify-cltv) 的绝对时间配对，是相对时间那一半。

区别很关键：

- **CLTV（绝对）：**「这个输出在区块 900,000 之后才能花」——一个具体时点。
- **CSV（相对）：**「这个输出在本 UTXO 确认之后再过 144 个区块（约一天）才能花」——从 UTXO 上链那一刻起算的时长。

CSV 经 [BIP-112](https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki)（操作码本身）、[BIP-68](/glossary/bip-68-relative-locktime)（底层 `nSequence` 语义）和 [BIP-113](/glossary/bip-113)（基于中位过去时间的时间型延迟）引入，2016 年 7 月作为[软分叉](/glossary/soft-fork)激活。

CSV 的承重场景：

- **[闪电网络](/glossary/lightning-network)通道关闭。** 一方强制关通道时，他那份资金要过一段 CSV 延迟（通常 144–1008 个区块）才能拿。窗口内，若关闭方作弊广播了旧状态，对手可以发布撤销证明来罚没。
- **金库构造。** 提款被强制走多步延迟流程，窗口内报警脚本可在提款未获授权时改道资金。
- **Eltoo（提案）。** 将用 CSV 实现其简化的状态替换模型。
- **HTLC 超时。** 有些 HTLC 变体用 CSV 型超时，锚定 HTLC 的广播时刻而非墙钟时间。

CSV 与 CLTV 配对，正如相对时间与绝对时间配对。两者合起来，比特币的二层生态才成为可能。底层 `nSequence` 语义见 [BIP-68](/glossary/bip-68-relative-locktime)，绝对时间那一半见 [CLTV](/glossary/checklocktimeverify-cltv)。

**相关词条：** [绝对锁定时间（Absolute Locktime）](/glossary/absolute-locktime) · [BIP-65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP-68（相对锁定时间）](/glossary/bip-68-relative-locktime) · [BIP-113](/glossary/bip-113) · [BIP-119（CTV）](/glossary/bip-119-ctv) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [CLTV（OP_CHECKLOCKTIMEVERIFY）](/glossary/checklocktimeverify-cltv) · [CTV（OP_CHECKTEMPLATEVERIFY）](/glossary/checktemplateverify-ctv) · [契约（Covenants）](/glossary/covenants) · [锁时间（Locktime）](/glossary/locktime) · [nLockTime](/glossary/nlocktime) · [nSequence](/glossary/nsequence) · [时间锁合约（Time-Locked Contract）](/glossary/time-locked-contract)
