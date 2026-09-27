---
title: 延迟支付通道（Delayed Payment Channel）
---

# 延迟支付通道（Delayed Payment Channel）

> **一句话定义：** 闪电通道变体：对一方资金强制等待期，确保作弊时有时间施加惩罚交易。

「延迟支付通道」是标准闪电通道设计的一个描述性叫法：在单方广播的承诺交易里，每一方自己的那份余额被一个 [CSV](/glossary/checksequenceverify-csv) 时间锁挡住，要等若干区块才能花。

机制与[延迟惩罚交易](/glossary/delayed-justice-transaction)是同一个故事：当你单方面广播自己最新的承诺来关闭通道时，你自己的余额拿到一个 CSV 锁定输出（通常 144–2016 个区块），而对端的余额立即可花。这个不对称不是不公平，是刻意为之——这段延迟就是对端的惩罚窗口：如果你的「最新承诺」其实是过期版本，对端可以在这个窗口里用[惩罚交易](/glossary/penalty-transaction)清空你的余额。

对用户而言，实际结论：

- **协作关闭很快。** 双方同意关闭时，通道产出一笔普通链上交易，没有 CSV 延迟，资金一个确认就能用。
- **单方强制关闭很慢。** 甩开对端单方面关闭，就得等开通道时谈定的 `to_self_delay` 走完，你自己的余额才可花。
- **延迟也保护你。** 对端强制关闭时，同样的 CSV 延迟套在对方的余额上，给你（或你的瞭望塔）留出响应时间——万一对方广播的是作弊的旧状态。

「延迟支付通道」不是闪电的标准词汇——多数文档就叫它「闪电通道」，把 CSV 延迟当实现细节。这个词存在于一些较老的术语表里，为的是强调不对称延迟是这种设计的 defining 特征。

[Eltoo](/glossary/eltoo) 式通道（依赖尚未激活的 SIGHASH_ANYPREVOUT）会柔化这种不对称：任何更新的状态自动作废更旧的，不再需要「单方广播—等待—惩罚」这套舞步。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [延迟惩罚交易](/glossary/delayed-justice-transaction) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [Eltoo](/glossary/eltoo) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [闪电节点](/glossary/lightning-node) · [闪电支付](/glossary/lightning-payment) · [闪电路由](/glossary/lightning-routing) · [锁时间（Locktime）](/glossary/locktime) · [惩罚交易](/glossary/penalty-transaction) · [支付通道](/glossary/payment-channel)
