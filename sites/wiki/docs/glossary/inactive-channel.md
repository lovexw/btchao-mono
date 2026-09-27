---
title: 不活跃通道（Inactive Channel）
---

# 不活跃通道（Inactive Channel）

> **一句话定义：** 最近未使用的闪电通道，常被标记为待关闭或再平衡。

不活跃的[闪电通道](/glossary/lightning-channel)指最近没有路由过任何支付的通道。「不活跃」没有正式的协议定义——它只是每个节点运营者按自家策略套用的经验判断。常见阈值：14 天、30 天、90 天无流量。

不活跃本身不是问题。一条好好待着、完全平衡、只是没人用的通道不碍事——只是也没什么用。资金锁在 2-of-2 多签里，白白付着机会成本。

运营者为什么在意不活跃通道：

- **资金效率。** 一个路由节点可能有 100 BTC 撒在 50 条通道上，其中 20 条几个月没动过一个聪。这些资金本可以重新部署。
- **网络膨胀。** 对无用通道的 [gossip](/glossary/gossip-protocol-lightning) 广播给路由图添噪声，却不添路由价值。
- **拓扑健康。** 满是死水通道的网络，比满是活跃再平衡通道的网络更难路由。

运营者对不活跃通道的处理：

- **关掉**，释放 BTC 另作部署。
- **再平衡**——通过循环支付或[拼接](/glossary/lightning-channel-splicing)。有时不活跃只是一侧被彻底掏空的副作用，再平衡就能救回来。
- **标为私有**，如果对端只是偶尔用通道的私人联系人。
- **干脆不动**，如果关闭成本高过收回资金的价值。

用闪电移动钱包的终端用户感知不到这些——钱包自动管理，你通常不会接触到这个概念。对路由节点运营者，通道活跃度是关键指标，管理不活跃通道是日常运营的一部分。

**相关词条：** [通道流失（Churn）](/glossary/churn-lightning) · [图修剪（Graph Pruning）](/glossary/graph-pruning) · [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点](/glossary/lightning-node) · [闪电路由](/glossary/lightning-routing)
