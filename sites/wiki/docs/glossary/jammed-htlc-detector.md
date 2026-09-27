---
title: HTLC 堵塞探测器
---

# HTLC 堵塞探测器

> **一句话定义：** 识别闪电通道堵塞的进行时、让运营者采取补救的工具或节点功能。

HTLC 堵塞探测器是节点侧的一套机制：盯守疑似[闪电堵塞攻击](/glossary/jamming-attack-ln)的模式并采取防御动作——典型做法是标记作恶对端、限流它后续的路由请求，极端情况下强制关闭通道。

探测器实际在找什么：

- 单个对端**占用大量 HTLC 槽位**却没有成功结算。
- **短时间内连续发起大量小额 HTLC**——槽位耗尽型堵塞。
- **长时间不推进的挂起 HTLC。**
- 特定路径或对端上的**失败率尖峰**。
- 暗示故意锁死流动性的**不对称进出模式**。

现代闪电实现内置了各种启发式。LND 的「断路器（circuit breaker）」模式、Core Lightning 的插件化监控、Charge-LND 等第三方工具，都可以配置成检测并对堵塞式模式作出响应。

难点在于把真堵塞和这些诚实模式区分开：

- 钱包按指数退避重试一笔支付。
- 多路径支付（AMP）用小额 HTLC 触碰很多通道。
- 诚实的[路径探测](/glossary/lightning-probe)流量。
- 拥堵时刻的普遍性支付失败。

误伤——为了防堵塞把合法支付拦下——才是激进检测的真实代价。检测逻辑必须足够保守，不至于破坏合法用户的闪电体验。

随着闪电成熟，探测器越来越精巧、越来越标准化。它们是堵塞问题的答案的一部分，不是全部；完整方案大概率是「检测 + 预付费 + 声誉系统」的组合。

**相关词条：** [窃听攻击](/glossary/eavesdropping-attack) · [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [堵塞攻击（LN）](/glossary/jamming-attack-ln) · [闪电网络](/glossary/lightning-network) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [Sphinx（闪电洋葱路由）](/glossary/lightning-sphinx)
