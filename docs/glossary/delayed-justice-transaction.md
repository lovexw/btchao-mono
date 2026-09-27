---
title: 延迟惩罚交易（Delayed Justice）
---

# 延迟惩罚交易（Delayed Justice）

> **一句话定义：** 闪电网络惩罚机制：等待一段时间再没收不诚实的通道对手资金，降低误伤。

「延迟惩罚交易」描述的是闪电[惩罚交易](/glossary/penalty-transaction)系统的时间窗机制。单方面关闭通道时，作弊者自己的余额被 CSV 时间锁挡住（通常 144 个区块，约一天），锁完才能花。窗口之内，诚实方可以广播正义交易，把整条通道的余额扫走。

这段「延迟」不是给作弊者的宽限期——它是给受害者的反应窗口。时序如下：

1. Alice 广播一份过时的承诺交易，夸大了自己的余额。
2. 承诺进入内存池并确认。
3. Alice 声称的余额现在被 `OP_CHECKSEQUENCEVERIFY 144` 锁住——约 24 小时内动不了。
4. Bob（或 Bob 的瞭望塔）看到链上广播，认出这是旧状态，组装一笔正义交易，用上 Alice 更新状态时交出的吊销密钥。
5. Bob 的正义交易赶在 CSV 到期前花掉 Alice 承诺的两侧输出。
6. Alice 血本无归。

CSV 延迟是惩罚机制在现实世界可行的原因。没有它，作弊者可以在任何人注意到之前广播并立刻花掉赃款。有了它，防守方有明确的响应窗口。

「通常 144 个区块」在实践中意味着：

- 通道在开启时通过 `to_self_delay` 参数设定 CSV 延迟。常见值 144–2016 个区块（1 天到 2 周）。
- 大通道常用更长延迟（给防守方更多反应时间，代价是你合法强制关闭时资金锁更久）。
- 这个参数按通道、按方向分别设置：你定对端的延迟，对端定你的。

这是让闪电通道对不甚警觉的运营者也默认安全的设计选择之一——只要 CSV 窗口内有[瞭望塔](/glossary/lightning-network-penalty)替你盯守，睡过头并不会让你输掉通道。

**相关词条：** [绝对手续费](/glossary/absolute-fee) · [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [锁时间（Locktime）](/glossary/locktime) · [nLockTime](/glossary/nlocktime) · [nSequence](/glossary/nsequence) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [交易](/glossary/transaction) · [交易手续费](/glossary/transaction-fee) · [惩罚交易（Penalty Transaction）](/glossary/penalty-transaction) · [闪电网络惩罚（Penalty）](/glossary/lightning-network-penalty) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv)
