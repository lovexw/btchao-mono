---
title: 惩罚交易（Penalty Transaction）
---

# 惩罚交易（Penalty Transaction）

> **一句话定义：** 闪电网络中惩罚广播过时承诺的作弊方的交易：其通道资金判给诚实方。

惩罚交易（也叫「正义交易」）是闪电对「对端广播过时通道状态」的防御。你作弊，对面拿走一切。全部。你的余额、ta 的余额、整条通道。

机制层面的运作。闪电通道的每个承诺都是不对称的。双方各持当前承诺交易的自家版本，每个版本包含：

- 对端的那份余额，对端立即可花。
- 你自己的那份余额，锁在 `OP_CHECKSEQUENCEVERIFY` 延迟后面（通常 144 个区块，约一天）。
- 一条「吊销路径」：对端只要知道一个秘密——就是你们共同认可状态作废时你交给 ta 的那个——就能拿走你的全部余额。

更新通道状态时，你把旧承诺的吊销秘密交给对端。从此你若广播那份旧承诺，对端可以：

1. 在链上看到广播。
2. 赶在你的 CSV 延迟到期前，用吊销秘密广播惩罚交易。
3. 拿走通道两侧的全部资金。

CSV 延迟是整个机制的支点：它给了诚实方一个以区块计的窗口，赶在作弊者划走自己余额之前广播惩罚。

操作层面的含义：

- CSV 窗口内你的闪电节点必须在线，才能在需要时广播惩罚。离线的节点无法应对作弊，等于默认认输。
- [瞭望塔](/glossary/lightning-network-penalty)存在的意义就是趁你离线时替你盯守通道、代你广播惩罚。
- 强制关闭自己的通道（单方面广播*当前*状态，而非旧状态）完全没问题，不会触发惩罚。惩罚机制只对*过时*状态上链生效。

[Eltoo](/glossary/eltoo) 是提议中的替代方案：新状态自动作废旧状态，无需惩罚机制。它将大幅简化瞭望塔的故事，但需要一次尚未激活的软分叉（SIGHASH_ANYPREVOUT）。今天的生产环境用的就是惩罚模型。

**相关词条：** [Eltoo](/glossary/eltoo) · [欺诈证明](/glossary/fraud-proof) · [欺诈性关通道](/glossary/fraudulent-channel-close) · [图形钱包](/glossary/gui-wallet) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电网络惩罚（Penalty）](/glossary/lightning-network-penalty) · [延迟惩罚交易](/glossary/delayed-justice-transaction) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv)
