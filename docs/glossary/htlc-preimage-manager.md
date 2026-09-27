---
title: HTLC 原像管理器
---

# HTLC 原像管理器

> **一句话定义：** 闪电配置中追踪和处理多跳支付原像的组件（或外部服务）。

HTLC 原像管理器是[闪电节点](/glossary/lightning-node)内部（或独立部署的服务）负责追踪未结 [HTLC](/glossary/htlc-hashed-time-locked-contract) 关联的密码学秘密、并在支付完成时协调揭示的组件。

为什么节点必须谨慎管理原像：

- **多跳原子性靠它。** 下游一跳揭示原像，本跳必须立刻用它去领上游的 HTLC。这一步若拖延，轻则损失路由费，重则损失本金。
- **Hodl 发票。** 有些闪电流程故意不立即揭示原像——收款方把支付挂在 pending 状态，等外部条件确认（比如托管方的法币兑换）。原像管理器要跟住这些被长期持有的支付，并决定何时放行或拒绝。
- **收款钱包逻辑。** 你在钱包里生成闪电发票时，原像在本地生成；钱包存着它，等对应 HTLC 到达时揭示。原像丢了，这笔支付就领不到了。

原像管理器管的事：

- **生成。** 为新发票生成随机 32 字节秘密。
- **存储。** 为在途支付持久记录原像，重启也不丢。
- **释放时机。** 下游 HTLC 结清时立即揭示（或条件满足时放行 hodl 发票）。
- **恢复。** 对端不干净地结账就强制关通道时，重新广播原像。

设计良好的闪电实现（LND、Core Lightning、Eclair）里，这是用户永远看不见的内部逻辑。更模块化的部署中它可以是独立服务——对高可用部署很有用，让原像逻辑与瞭望塔、签名服务并行运行。

对多数用户，原像管理器是隐形的基础设施；对闪电服务运营者，把原像管理做对是运营热点之一。

**相关词条：** [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [HTLC 发票](/glossary/htlc-invoice) · [HTLC 堵塞探测器](/glossary/jammed-htlc-detector) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电发票（Lightning Invoice）](/glossary/lightning-invoice) · [闪电网络](/glossary/lightning-network) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电退款发票](/glossary/lightning-refund-invoice) · [闪电路由](/glossary/lightning-routing) · [Sphinx（闪电洋葱路由）](/glossary/lightning-sphinx)
