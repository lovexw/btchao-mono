---
title: 锁时间（Locktime）
---

# 锁时间（Locktime）

> **一句话定义：** 比特币交易中的一个字段，指定该交易最早可被打包进区块的区块高度或时间戳。

锁时间是每笔比特币[交易](/glossary/transaction)中的一个字段（技术名称叫 `nLockTime`），指定交易最早可被打包进区块的时刻。在这个门槛过去之前，[节点](/glossary/node)会拒绝这笔交易。

根据取值不同，这个字段有两种解释：

- **小于 500,000,000：** 解释为**区块高度**。交易只能被打包进等于或高于该高度的区块。
- **大于等于 500,000,000：** 解释为 **Unix 时间戳**。只有当前网络时间（具体说是最近 11 个区块的中位时间）到达或超过该时间戳后，交易才能被打包。

锁时间为 0（大多数钱包的默认值）时，交易立即可用，下一个区块就能打包。

哪些地方用得上它：

- **[支付通道](/glossary/payment-channel)与[闪电网络](/glossary/lightning-network)。** 通道承诺交易用锁时间来执行争议期间的提款延迟。
- **托管与定时释放。** 一笔交易可以提前签好，但要等到某个未来区块或日期之后才能广播（或广播了也不能被打包）。
- **防[手续费抢掠](/glossary/fee-sniping)。** 许多现代钱包在构造交易时把锁时间设为当前区块高度，用来打消矿工故意重组去抢旧高费交易的攻击动机。

要实现更精细的基于时间的逻辑，锁时间与 [CHECKLOCKTIMEVERIFY（CLTV）](/glossary/checklocktimeverify-cltv) 操作码配合——让脚本自己检查锁时间；还有相关的 [CSV](/glossary/checksequenceverify-csv) / [nSequence](/glossary/nsequence) 字段，提供**相对**（而非绝对）的时间控制。

广义概念见[绝对时间锁](/glossary/absolute-locktime)，字段层面的同义词见 [nLockTime](/glossary/nlocktime)。

**相关词条：** [绝对时间锁（Absolute Locktime）](/glossary/absolute-locktime) · [BIP 65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP 68（相对时间锁）](/glossary/bip-68-relative-locktime) · [BIP 113](/glossary/bip-113) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [延迟支付通道（Delayed Payment Channel）](/glossary/delayed-payment-channel) · [nLockTime](/glossary/nlocktime) · [nSequence](/glossary/nsequence) · [支付通道（Payment Channel）](/glossary/payment-channel) · [时间锁合约（Time-Locked Contract）](/glossary/time-locked-contract)
