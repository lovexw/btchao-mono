---
title: HTLC 发票
---

# HTLC 发票

> **一句话定义：** 引用哈希秘密（支付哈希）的闪电发票；收款方必须揭示原像才能领取资金。

实践中，HTLC 发票就是一张普通的[闪电发票](/glossary/lightning-invoice)——它的 `payment_hash` 字段被用来在路由支付的每一跳构造 [HTLC](/glossary/htlc-hashed-time-locked-contract)。今天几乎所有的[闪电支付](/glossary/lightning-payment)走的都是 HTLC 发票。

发票「基于 HTLC」的意思：

1. 收款方随机选一个 32 字节**原像**，算出它的 SHA-256 哈希。这个哈希以 `payment_hash` 的身份写进发票。
2. 付款方的钱包用这个支付哈希沿路由构造 HTLC——每一跳被同一个哈希锁住。
3. 领款时收款方揭示原像。它沿路由反向传播，把每个 HTLC 逐一结清。

这本质上就是 [BOLT 11](/glossary/bolt-11) 发票机制。「HTLC 发票」是对密码学机制的描述，不是独立格式——所有标准闪电发票都是这么工作的。

变体与后继：

- **BOLT-12 offer** 用的仍是 HTLC 式结算；变化在发票格式和可复用性，底层密码学不变。
- **PTLC（点时间锁合约）** 是提议中的 HTLC 替代品：用 [Schnorr](/glossary/schnorr-signature)/Taproot 的点数学取代哈希原像。隐私更好（每一跳的锁各不相同，而不是全链共享同一个哈希）。尚未部署。
- **Held HTLC / hodl 发票**：收款方故意不立即结算的 HTLC 发票——适用于收款方想先在链下确认某件事、再完成支付的有条件付款场景。

对日常闪电用户，「HTLC 发票」就是「闪电发票的工作方式」，机制完全藏在钱包体验背后。底层原语见 [HTLC](/glossary/htlc-hashed-time-locked-contract)。

**相关词条：** [BOLT 11](/glossary/bolt-11) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电发票（Lightning Invoice）](/glossary/lightning-invoice) · [闪电网络](/glossary/lightning-network) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电退款发票](/glossary/lightning-refund-invoice) · [闪电路由](/glossary/lightning-routing)
