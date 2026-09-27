---
title: 闪电支付（Lightning Payment）
---

# 闪电支付（Lightning Payment）

> **一句话定义：** 经一条或多条闪电通道完成的链下 BTC 转移，通常近乎即时、费用极低。

闪电支付是跨[闪电网络](/glossary/lightning-network)的价值转移——通常近乎即时、手续费极低，并且经由一条或多条中间通道路由，而任何中间跳都碰不到（更拿不走）你的资金。

一笔支付实际怎么流：

1. **收款方生成发票。** 一张 [BOLT 11](/glossary/bolt-11) 发票（或 BOLT-12 offer），含金额、支付哈希、目的地、有效期。
2. **付款方钱包找路径。** 依据 gossip 图，拼出一条流动性足够送达的通道链。
3. **付款方构造洋葱包。** 每一跳的指令被加密嵌套进 [Sphinx](/glossary/lightning-sphinx) 数据包，每跳只能看到自己的路由信息。
4. **HTLC 级联向前。** 付款方与第一跳锁一个 [HTLC](/glossary/htlc-hashed-time-locked-contract)；第一跳验证后与下一跳锁定，依此类推。每一跳都在承诺「下一跳揭示原像，我就向前付」。
5. **收款方揭示原像。** 它沿路径反向传播，逐个结清 HTLC。
6. **完成。** 通常 1–5 秒内到账，手续费不到一分钱。

可能出什么问题：

- **找不到路径。** 候选路径上流动性不足。钱包换路径重试（常用 [AMP](/glossary/atomic-multi-path-payment-amp) 拆分支付）。
- **中间节点离线。** HTLC 超时解开，分文无损。
- **探测/堵塞攻击。** 边缘情况会短暂占用流动性，但丢不了钱。

永远不会出的问题：

- **部分结算。** 要么整笔完成，要么分文不动——HTLC 保证了原子性。
- **中间跳偷币。** 跳可以拒绝转发，但偷不走——密码学结构让这不可能。

2026 年的日常闪电使用中，支付大多一秒内一次成功。真正考验它的是大额支付（检验路径容量）和对冷门节点的支付（检验公开图的连通性）。这两条战线的进步都很扎实。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [原子交换（Atomic Swap）](/glossary/atomic-swap) · [原子交换充值](/glossary/atomic-swap-refill) · [BOLT 11](/glossary/bolt-11) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [通道频繁开闭（Churn）](/glossary/churn-lightning) · [延迟支付通道](/glossary/delayed-payment-channel) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [HTLC 发票](/glossary/htlc-invoice) · [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [堵塞攻击（LN）](/glossary/jamming-attack-ln) · [HTLC 堵塞探测器](/glossary/jammed-htlc-detector) · [闪电发票（Lightning Invoice）](/glossary/lightning-invoice) · [闪电网络](/glossary/lightning-network) · [闪电探测（Lightning Probe）](/glossary/lightning-probe) · [闪电退款发票](/glossary/lightning-refund-invoice) · [闪电路由](/glossary/lightning-routing) · [Sphinx（闪电洋葱路由）](/glossary/lightning-sphinx) · [支付通道](/glossary/payment-channel) · [潜艇交换](/glossary/submarine-swap)
