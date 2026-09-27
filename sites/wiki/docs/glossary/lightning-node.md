---
title: 闪电节点（Lightning Node）
---

# 闪电节点（Lightning Node）

> **一句话定义：** 开设、维护并路由闪电通道的软件：保护链下交易、转发支付。

闪电节点是参与[闪电网络](/glossary/lightning-network)的软件。它管理你的[支付通道](/glossary/lightning-channel)，跟踪网络 gossip 图，在被请求时经自己路由支付，并让你收发即时的链下付款。

2026 年的主要实现：

- **LND**（Lightning Labs）——Go 语言写的，Umbrel、Start9、MyNode 这类盒子节点产品广泛采用。
- **[Core Lightning](/glossary/core-lightning-c-lightning)**（Blockstream，前身 c-lightning）——C 语言写的，模块化插件架构，轻量。
- **Eclair**（ACINQ）——Scala 语言写的，驱动 Phoenix 移动钱包。
- **LDK**（Lightning Dev Kit，Spiral）——不是独立守护进程，而是嵌进你自己应用的库。Cash App、Mutiny、Mercury Layer 等在用。

运营一个闪电节点的实际成本：

- **在线时间。** 节点必须在线才能收付款、盯防作弊。短暂离线无妨，长期消失（数周）就开始出问题。
- **链上资金。** 通道用链上比特币出资；开了通道，BTC 就锁到关闭为止。
- **主动的流动性管理。** 入站流动性（对端在你通道的那一侧有余额）不会凭空出现，往往要购买或靠路由赚来。
- **盯防作弊。** 通道对端广播旧状态时，你有一个固定的惩罚窗口。瞭望塔服务就是干这个的。

你可能赚到的：多跳路径经你转发时的少量**路由费**。单笔极小，但连通性好的节点能积少成多。多数家庭闪电运营者赚不到像样的收入；商业路由节点是另一回事。

对 2026 年的多数用户，托管型闪电钱包（Phoenix、Wallet of Satoshi 等）是实际入口。跑自己的节点是主权答案，对在乎这一属性的用户完全值得。协议视角见[闪电网络](/glossary/lightning-network)。

**相关词条：** [自动驾驶（Autopilot）](/glossary/autopilot-lightning) · [BOLT](/glossary/bolt) · [BOLT 11](/glossary/bolt-11) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [延迟支付通道](/glossary/delayed-payment-channel) · [带托管的闪电通道](/glossary/escrowed-lightning-channel) · [欺诈性关通道](/glossary/fraudulent-channel-close) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电探测（Lightning Probe）](/glossary/lightning-probe) · [闪电退款发票](/glossary/lightning-refund-invoice) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [Sphinx（闪电洋葱路由）](/glossary/lightning-sphinx) · [洋葱路由（Lightning）](/glossary/onion-routing-lightning) · [Tor 隐藏服务](/glossary/tor-hidden-service) · [超大通道（Wumbo Channels）](/glossary/wumbo-channels-lightning)
