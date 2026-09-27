---
title: 通道拼接（Splicing）
---

# 通道拼接（Splicing）

> **一句话定义：** 在不完全关闭重开通道的情况下调整通道链上资金（增减容量）。

通道拼接（splicing）让你不必关闭再重开，就能对[闪电通道](/glossary/lightning-channel)的链上资金做增减。拼接出现之前，改通道[容量](/glossary/lightning-channel-capacity)的唯一办法是关掉、做一笔链上交易、再开一条——付两次手续费，还要丢掉通道积累的路由历史。

高层机制：

1. 通道双方协作签一笔新的链上交易，**花掉现有的资金输出**，并创建一个容量调整后的新资金输出。旧资金被消费；新输出成为通道的新锚。
2. 链下状态带着新容量继续。通道历史、gossip 广播的元数据、路由关系全部保留。
3. 原通道 ID 变不变取决于拼接变体——更新的设计保留同一 ID 以维持连续性。

拼接于 2024 年进入生产（Phoenix 和 Core Lightning 率先按支持的 BOLT 扩展实现），采用在稳步增长。

它解锁了什么：

- **动态调容。** 旺季需要更多入站流动性的商户可以 splice-in；想提币到冷存储的用户可以 splice-out，全程不必关通道。
- **更好的通道管理。** 用更便宜的拼接交易替代昂贵的「关了重开」流程。
- **更顺滑的开箱体验。** LSP 可以为新用户先开一条小通道，等钱包充值后再 splice-in 扩容。

拼接标志着闪电从「通道一开就是铁板一块」走向「通道是持续演进的长期关系」。这种成熟，是 2024–2026 年闪电体验大幅改善的诸多被低估的原因之一。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [BOLT 11](/glossary/bolt-11) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [通道流失（Churn）](/glossary/churn-lightning) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [Eltoo](/glossary/eltoo) · [带托管的闪电通道](/glossary/escrowed-lightning-channel) · [欺诈性关通道](/glossary/fraudulent-channel-close) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [HTLC 发票](/glossary/htlc-invoice) · [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [不活跃通道](/glossary/inactive-channel) · [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点](/glossary/lightning-node) · [闪电路由](/glossary/lightning-routing) · [支付通道](/glossary/payment-channel) · [超大通道（Wumbo Channels）](/glossary/wumbo-channels-lightning)
