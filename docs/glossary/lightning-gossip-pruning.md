---
title: 闪电 Gossip 修剪
---

# 闪电 Gossip 修剪

> **一句话定义：** 从闪电节点的网络图中移除过期或不活跃的通道公告，减少冗余。

闪电 gossip 修剪是把陈旧或失活的通道公告从[闪电节点](/glossary/lightning-node)本地 [gossip 图](/glossary/gossip-protocol-lightning)里移除的实践。它是让路由表随网络增长仍可管理的那份保洁工作。

修剪为什么重要：

- **gossip 图只增不减。** 每条被公告过的通道都会躺进你的路由表。不修剪的话，你将积累史上存在过的每一条通道——已关闭的、被抛弃的节点、各种死重。
- **寻路成本随图增长。** 找路径要在 gossip 图上跑 Dijkstra 类算法，图越大，路由决策越慢。
- **内存是要紧的。** 跑在树莓派级硬件上的闪电节点，承受不了无上限的 gossip 存储。

协议级规则（BOLT-7）：

- **通道公告**必须每两周经 `channel_update` 消息刷新一次。超过两周没刷新的通道视为陈旧，可修剪。
- **节点公告**同样有新鲜度窗口：两周没有音讯的节点视为离线。
- **已关闭的通道**经链上监控发现后可立即修剪——资金交易已被花费，通道必然不存在了。

各实现的具体修剪策略略有不同：[LND](/glossary/lightning-network-daemon-lnd)、[Core Lightning](/glossary/core-lightning-c-lightning)、Eclair、LDK 都有自己的修剪政策与配置项。

对终端用户，gossip 修剪是隐形基础设施。对节点运营者，修剪政策的调优影响内存占用、同步时间和路由性能。协议级的新鲜度规则偏保守；资源紧张的节点有时用更激进的修剪。

**相关词条：** [BOLT](/glossary/bolt) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [闪电网络](/glossary/lightning-network) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [路由节点（Routing Node）](/glossary/routing-node) · [LND](/glossary/lightning-network-daemon-lnd) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning)
