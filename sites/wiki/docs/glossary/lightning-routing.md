---
title: 闪电路由（Lightning Routing）
---

# 闪电路由（Lightning Routing）

> **一句话定义：** 在闪电通道中找到从发送方到接收方的路径，可能跨越多个中介。

闪电路由是在[闪电通道](/glossary/lightning-channel)构成的网络中，为你的支付找到一条能从发送方送达接收方的路径的过程——当双方之间没有直连通道时。

多数闪电用户并不与付款对象有直连通道——那等于跟每个交易对手开一笔[链上交易](/glossary/transaction)，违背了初衷。取而代之：你的[闪电节点](/glossary/lightning-node)通过*确实*连着目的地的中间节点转发支付，靠一串 [HTLC](/glossary/htlc-hashed-time-locked-contract) 原子化地完成。

底层机制：

1. **构图。** 闪电节点用 [gossip 协议](/glossary/gossip-protocol-lightning)互广播哪些通道存在、容量多少、费率政策如何。你的节点维护这张图的本地视图。
2. **找路径。** 跑一个改良版 Dijkstra 算法，找一条从你到目的地的通道序列，每条通道的相关一侧要有足够余额，并按费用与可靠性优化。
3. **洋葱路由。** 每一跳只知道上一跳和下一跳，不知道完整路径。这是 **[Sphinx](/glossary/lightning-sphinx) 洋葱路由**，思路与 Tor 相同。
4. **HTLC 在每一跳锁住支付。** 任一跳失败，整笔支付原子化退回——半条路径上也不会损失分毫。
5. **失败就重试。** 现代钱包换路径重试，或把支付拆到多条路径（[原子多路径支付 AMP](/glossary/atomic-multi-path-payment-amp)）。

路由的难点：

- **流动性是私密的。** gossip 告诉你通道存在、总容量多少，但不告诉你余额在哪一侧。路由只能探测或猜测。
- **通道会枯竭。** 一分钟前还好好的通道，可能在你这笔支付过后就把相关一侧掏空。别人的支付对你不可见。
- **金额越大越难。** 支付金额接近典型通道容量时，找到完整路径的概率骤降。AMP 和通道拼接有帮助，但大额支付往往要多次尝试或带外协调。

2020 年以来路由可靠性大幅改善——几十万聪以内的日常支付大多一次成功。更大或更偏的支付偶尔仍会失败，但失败模式可恢复、绝不丢钱。

更深的展开——源路由、洋葱加密、多路径支付、寻路启发式、钱包找流动性的探测技巧——见《[闪电路由](/rabbit-holes/lightning-routing)》深度专题。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [BOLT](/glossary/bolt) · [BOLT 11](/glossary/bolt-11) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [通道频繁开闭（Churn）](/glossary/churn-lightning) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [延迟支付通道](/glossary/delayed-payment-channel) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [HTLC 发票](/glossary/htlc-invoice) · [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [堵塞攻击（LN）](/glossary/jamming-attack-ln) · [HTLC 堵塞探测器](/glossary/jammed-htlc-detector) · [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电发票（Lightning Invoice）](/glossary/lightning-invoice) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点](/glossary/lightning-node) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电探测（Lightning Probe）](/glossary/lightning-probe) · [闪电退款发票](/glossary/lightning-refund-invoice) · [Sphinx（闪电洋葱路由）](/glossary/lightning-sphinx) · [洋葱路由（Lightning）](/glossary/onion-routing-lightning)
