---
title: BIP 65（OP_CHECKLOCKTIMEVERIFY）
---

# BIP 65（OP_CHECKLOCKTIMEVERIFY）

> **一句话定义：** CLTV 是什么、2015 年为何加入、如何支撑支付通道与托管——不用规范术语的通俗讲解。

[BIP-65](https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki) 向[比特币脚本](/glossary/bitcoin-script)添加了 **OP_CHECKLOCKTIMEVERIFY**（CLTV）操作码。2015 年 12 月作为[软分叉](/glossary/soft-fork)激活，它让[绝对时间锁](/glossary/absolute-locktime)获得了脚本级的强制力。

BIP-65 之前，唯一的时间锁机制是交易级的 `nLockTime` 字段——它阻止的是*整笔交易*在给定高度或时间之前被挖矿。CLTV 把同一概念带进脚本本身：一个输出的锁定脚本现在可以要求「花费交易的 `nLockTime` 至少为 X」。

听起来像个小差别。实际上它是整类比特币应用的承重结构：

- **[支付通道](/glossary/payment-channel)**和[闪电网络](/glossary/lightning-network)用 CLTV 强制执行强制关通道后的提款延迟。
- **[原子交换](/glossary/atomic-swap)**用 CLTV 在对手方跑路时强制退款截止线。
- **[HTLC](/glossary/htlc-hashed-time-locked-contract)**的「给原像或超时退回」结构用 CLTV 做时间侧的兜底。
- **遗产金库**用 CLTV 确保原主人长期不动后，继承人可以在延迟之后认领。

一年后，CLTV 与 [BIP-68/112（CSV）](/glossary/checksequenceverify-csv)配对，带来相对时间锁。两个操作码合力，把比特币脚本变成足以支撑闪电网络和大多数现代多方协议的东西。

用户几乎从不直接接触 CLTV——你的钱包或[闪电](/glossary/lightning-network)实现在幕后处理它。但你用过的每一个闪电通道，都依赖 CLTV 在那里。

**相关词条：** [绝对时间锁（Absolute Locktime）](/glossary/absolute-locktime) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 68（相对时间锁）](/glossary/bip-68-relative-locktime) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [锁时间（Locktime）](/glossary/locktime) · [nLockTime](/glossary/nlocktime) · [nSequence](/glossary/nsequence) · [时间锁合约（Time-Locked Contract）](/glossary/time-locked-contract)
