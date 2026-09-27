---
title: 支付通道（Payment Channel）
---

# 支付通道（Payment Channel）

> **一句话定义：** 链下机制（如闪电）：双方反复交易而不必次次触碰区块链。

支付通道是这样一种通用概念：两方把比特币锁进一个共享的链上输出，然后在彼此之间交换签名的余额更新——全程在链下，不逐笔广播。链上总共只见两笔交易——一笔开、一笔关——中间却可以发生成千上万次转账。

这个机制解决了比特币的扩容取舍。链上，每笔支付要占区块空间、等约 10 分钟确认、付一笔手续费；通道内的链下支付则是即时的、不花链上一分钱，安全性由密码学而非[工作量证明](/glossary/proof-work-pow)链来保障。

支付通道的最小组件：

1. **一个 2-of-2 多签输出**，锁住双方的资金，用一笔链上[交易](/glossary/transaction)开启。
2. **承诺交易**——已签名但未广播的交易，各自代表当前的余额分配。每笔新转账产生一个新承诺，取代上一个。
3. **吊销机制**，让广播一个旧的（对自己有利的）承诺受到严厉惩罚。没有它，双方都能靠「回滚到自己更喜欢的那一版」作弊。
4. **超时机制**，保证对方离线后没人会被永久扣为人质。

闪电网络的实现用 [HTLC](/glossary/htlc-hashed-time-locked-contract) 和不对称吊销密钥把这一切做到无需信任。闪电版细节见[闪电通道](/glossary/lightning-channel)。

其他设计也存在或曾被提出——**Eltoo** 是最著名的一个，用 `SIGHASH_ANYPREVOUT` 简化通道状态模型，需要一次软分叉。截至 2026 年，实际大规模部署的是 BOLT 规范的闪电通道设计。

支付通道就是比特币不扩宽基础链也能扩容的方式。[闪电网络](/glossary/lightning-network)是这一思想的工程实现。

**相关词条：** [延迟支付通道](/glossary/delayed-payment-channel) · [Eltoo](/glossary/eltoo) · [托管（Escrow）](/glossary/escrow) · [带托管的闪电通道](/glossary/escrowed-lightning-channel) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [闪电支付](/glossary/lightning-payment) · [锁时间（Locktime）](/glossary/locktime) · [潜艇交换](/glossary/submarine-swap)
