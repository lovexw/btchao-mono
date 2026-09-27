---
title: Gossip 协议（Lightning）
---

# Gossip 协议（Lightning）

> **一句话定义：** 闪电节点交换通道与节点信息、构建全局路由图的方法。

闪电 gossip 协议是[闪电节点](/glossary/lightning-node)之间分享网络拓扑信息的方式：哪些通道存在、连接着谁、费率多少、当前是否活跃。没有它，节点就无法[路由](/glossary/lightning-routing)经过自己并不直接参与的路径。

三类 gossip 消息，定义于 BOLT-7：

1. **`channel_announcement`**——声明一条新通道存在。附带通道真实性的证明：两端节点密钥的签名，外加一个确认链上资金交易存在的比特币签名。
2. **`node_announcement`**——声明节点元数据：别名、颜色、公布网络地址。
3. **`channel_update`**——声明通道当前政策：费率、时间锁增量、启用/停用状态。通道再平衡或调费时会频繁发布。

节点收到自己没有的有效 gossip 消息后，存下并转发给对端。最终全网持有同一张（最终一致的）公开图。

gossip **不**透露的：

- **通道余额。** 你知道通道存在、总容量多少，但不知道容量当前在两端怎么分。这是刻意的隐私选择，也正因此路由更难（必须探测才能发现流动性）。
- **私有通道。** 许多通道选择退出 gossip——移动钱包与其路由节点之间很常见。这些通道工作正常，但不能作为别人路径中的中间跳。

gossip 数据量涨到不得不优化：gossip 同步 v2、范围查询、紧凑过滤器，以及定期[修剪](/glossary/lightning-gossip-pruning)数周未刷新的陈旧通道公告。现代闪电节点全量同步时要下载几十 MB 的 gossip；同步完成后，日常 gossip 流量至多每秒几 KB。

gossip 图如何被用来真正搬动支付，见[闪电路由](/glossary/lightning-routing)。

**相关词条：** [自动驾驶（Autopilot）](/glossary/autopilot-lightning) · [BOLT](/glossary/bolt) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [通道频繁开闭（Churn）](/glossary/churn-lightning) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [闪电通道](/glossary/lightning-channel) · [闪电 Gossip 修剪](/glossary/lightning-gossip-pruning) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点](/glossary/lightning-node) · [闪电路由（Lightning Routing）](/glossary/lightning-routing)
