---
title: Core Lightning（c-lightning）
---

# Core Lightning（c-lightning）

> **一句话定义：** Blockstream 开发的主流闪电实现，强调模块化与命令行灵活性。

Core Lightning（CLN），前身 **c-lightning**，是[闪电网络](/glossary/lightning-network)的主要实现之一。由 Blockstream 开发，C 语言写成，强调模块化、极小的资源占用，以及一套让开发者不必 fork 核心守护进程就能扩展功能的插件架构。

与其他主流实现的对比：

- **CLN**——C 语言，模块化，插件优先。强在高级工作流与资源效率。率先支持 BOLT-12 offer。
- **LND**（Lightning Labs）——Go 语言，单体式，REST/gRPC API。盒子节点产品最常见的选择，用户基数最大。
- **Eclair**（ACINQ）——Scala 语言，驱动 Phoenix 移动钱包。强在移动/嵌入场景。
- **LDK**（Spiral）——库而非守护进程，嵌进 Cash App、Mutiny 等应用。

CLN 的差异化在插件系统。常见插件覆盖通道再平衡、高级路由策略、[拼接](/glossary/lightning-channel-splicing)、瞭望塔、记账等。思路是「小核心、多插件」，而非「带功能开关的大单体」。

对 2026 年自托管闪电运营者，CLN 在这些场景是强选择：

- 想在廉价硬件（树莓派、低端 VPS）上把资源占用压到最低的运营者。
- 能从插件化再平衡中受益的路由节点。
- 任何想要原生 BOLT-12 支持的人。

对想要「点开就装」图形体验的用户则不算理想——Umbrel 等节点发行版历史上默认 LND，不过如今多数也提供 CLN 选项。更全的格局见[闪电节点](/glossary/lightning-node)。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [按分钟付费模型（Lightning）](/glossary/audiobook-model-lightning) · [自动驾驶（Autopilot）](/glossary/autopilot-lightning) · [BOLT](/glossary/bolt) · [BOLT 11](/glossary/bolt-11) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [通道频繁开闭（Churn）](/glossary/churn-lightning) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [闪电路由（Lightning Routing）](/glossary/lightning-routing)
