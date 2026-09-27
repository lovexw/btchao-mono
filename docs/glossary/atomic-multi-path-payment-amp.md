---
title: 原子多路径支付（AMP）
---

# 原子多路径支付（AMP）

> **一句话定义：** 闪电网络功能：把一笔支付拆成多个小额支付，收款后重新合并。

原子多路径支付（AMP）是[闪电](/glossary/lightning-network)的一项技术：把一笔逻辑支付拆成多个更小的部分支付，每一部分沿网络中不同的路径[路由](/glossary/lightning-routing)。收款方只有在**全部**部分到账后才算支付「完成」。

动机：任何一条[闪电通道](/glossary/lightning-channel)的容量都有限，常常只有几百万聪甚至更少。单路径方式下，超过候选路径上最窄通道的支付必然失败。AMP 把负载摊到多条路径上，绕开了这个瓶颈。

运作方式：

1. 付款方钱包决定启用 AMP，把总额切块（比如 100 万聪拆成 5×20 万）。
2. 为每块找不同路径——理想上走互不重叠的通道，避免单条路径满载。
3. 所有块用 [HTLC](/glossary/htlc-hashed-time-locked-contract) 同时发出。
4. 收款方把每个到达的 HTLC 都先扣住，直到收齐全部。
5. 收齐后释放原像，所有块原子化地一起结算。

哪怕只有一块路由失败，收款方就拒绝释放原像，整笔支付沿 HTLC 超时解开。不存在「结算一半」。

变体：

- **MPP**（多路径支付）——基础的拆分-合并变体，所有部分共享同一个支付哈希。
- **严格意义上的 AMP**——由 Olaoluwa Osuntokun 在 BOLT-12 时代的规范中引入，每部分用独立的子哈希，隐私性和可靠性略好。

到 2026 年，两者都已被各大闪电实现广泛支持。用户的实际感受：2019 年因流动性不足而失败的支付，如今例行成功。第一次拆分路由失败时，钱包会自动换一种拆法重试。

**相关词条：** [原子交换（Atomic Swap）](/glossary/atomic-swap) · [原子交换充值](/glossary/atomic-swap-refill) · [按分钟付费模型（Lightning）](/glossary/audiobook-model-lightning) · [自动驾驶（Autopilot）](/glossary/autopilot-lightning) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [闪电锚定承诺交易](/glossary/lightning-anchor-commitment) · [闪电通道容量](/glossary/lightning-channel-capacity) · [闪电网络](/glossary/lightning-network) · [闪电节点](/glossary/lightning-node) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电路由](/glossary/lightning-routing)
