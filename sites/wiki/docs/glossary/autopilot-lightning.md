---
title: 自动驾驶（Lightning）
---

# 自动驾驶（Lightning）

> **一句话定义：** 闪电网络功能：根据连通性与容量启发式自动开设和管理通道。

闪电自动驾驶（Autopilot）是部分[闪电](/glossary/lightning-network)实现里的功能：基于图连通性启发式而非手动挑选，自动替你选通道对端、开通道。它的存在是为了降低闪电节点新运营者的门槛。

最初的 autopilot 出现在 [LND](/glossary/lightning-network-daemon-lnd) 中，尝试：

- 在 gossip 图中**识别连通性好的节点**，认为它们能提供好路由。
- 按配置预算和网络状况**决定通道大小**。
- **定期再平衡或关闭**表现不佳的通道。

对 autopilot 实际表现的诚实评估：

- **对新用户，勉强算能用。** 上手从「手动挑通道、祈祷它路由好」变成「点一个按钮、得到通道」。这是真实的体验改善。
- **启发式并不高明。** autopilot 倾向挑大而连通好的节点——能用，但加剧中心化压力：所有人都连同样几个枢纽，网络长成轮辐式。
- **认真的运营者不用它。** 想赚手续费的节点运营者按自己的分析刻意选通道。只想付款的休闲用户则越来越多由[托管钱包](/glossary/custodial-lightning-wallet)或 LSP 式钱包（Phoenix、Mutiny）服务——通道管理完全藏在界面后面。

2026 年的定位：给那些自己跑闪电节点、又不想主动管理的自我托管运营者的中间选项。非技术用户的新手引导已被现代 LSP 大幅取代；严肃运营者则被手动选通道取代。

诚实的结论：autopilot 是闪电通道管理自动化的有益初尝试，不是最差也不是最好。跑自己的 LND 节点、又对通道没强烈意见，它是合理的默认；有强烈意见，你会绕开它。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [按分钟付费模型（Lightning）](/glossary/audiobook-model-lightning) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [闪电网络](/glossary/lightning-network) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [闪电节点别名（Alias）](/glossary/lightning-node-alias) · [闪电路由（Lightning Routing）](/glossary/lightning-routing)
