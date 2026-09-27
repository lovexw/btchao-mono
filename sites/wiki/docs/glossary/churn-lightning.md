---
title: 通道频繁开闭（Churn）
---

# 通道频繁开闭（Churn）

> **一句话定义：** 闪电网络上频繁开、关或再平衡通道——成本高、效率低。

通道流失（churn）指[闪电通道](/glossary/lightning-channel)在链上被开开关关的速率。一定程度的流失不可避免——用户增减流动性、通道失活、服务再平衡。但高流失是问题：每次开关通道都是一笔真实付费的链上比特币交易。

推高流失的因素：

- **用户开了通道却没怎么用。** 不活跃通道最终被关闭以收回锁定的资金。
- **流动性再平衡。** 没有[拼接](/glossary/lightning-channel-splicing)时，改通道容量的唯一办法就是关了重开。频繁再平衡 = 高流失。
- **托管钱包运营者**随用户活动开开关通道。
- **LSP 开通流程**在用户余额增长时轮换通道。
- **路由节点**在众多对端之间管理流动性。

流失为什么要紧：

- **链上成本会累加。** 常规费率下开关一条通道约 $0.50–$5。一个百万通道规模的生态若按月流失，一年就是数百万美元级的比特币交易成本。
- **通道历史丢失。** 通道一关，积累的路由声誉和 gossip 存在感就没了；重开不会找回历史。
- **内存池压力。** 同一个费率窗口内大量关闭通道，给所有人推高费率。

现代闪电如何减流失：

- **[通道拼接](/glossary/lightning-channel-splicing)**不必关闭就能调容量。大胜利，2024 年起部署。
- **更好的 LSP 设计**一开始就开尺寸合适的通道。
- **通道复用**——通过入站流动性服务服务回头客。
- **更好的钱包体验**，不逼用户动辄关通道。

流失不是敌人；它是演进中网络的正常特征。目标是减少*不必要的*流失——而那占了大头。

**相关词条：** [自动驾驶（Autopilot）](/glossary/autopilot-lightning) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [闪电锚定承诺交易](/glossary/lightning-anchor-commitment) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电路由（Lightning Routing）](/glossary/lightning-routing)
