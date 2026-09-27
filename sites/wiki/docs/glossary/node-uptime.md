---
title: 节点在线时长（Node Uptime）
---

# 节点在线时长（Node Uptime）

> **一句话定义：** 节点持续在线、不重启不断线的时长，关系网络可靠性与路由能力。

节点在线时长指一个比特币节点不重启、不断线持续运行的时间。

高在线时长是良好的网络公民行为。长期运行的节点：

- 积累更丰富的对等节点发现视野（`peers.dat` 和 `addr` 集合），更抗[日蚀攻击](/glossary/eclipse-attack)。
- 拥有热的内存池——新交易对着一个成熟的内存池视图验证，而不是冷启动。
- 在其他节点初始同步时有利用价值，能立刻提供历史区块。
- 不会用反复的重连折腾网络。

Bitcoin Core 并不把在线时长当作显眼的指标，也没有排行榜或奖励。对普通全节点，偶尔停机（几分钟或几天）无所谓——回来追上就是了。

在线时长对[闪电网络](/glossary/lightning-network)路由节点比对普通全节点要紧得多。闪电通道的更新需要双方都在线；频繁掉线的路由节点会被对手方关闭通道、或无法转发支付。跑路由节点就为在线时长优化；为自己钱包跑全节点，则不必追求几个 9。

**相关词条：** [节点专用 IP（Dedicated IP）](/glossary/dedicated-ip-nodes) · [日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack) · [全节点（Full Node）](/glossary/full-node) · [无头节点（Headless Node）](/glossary/headless-node) · [隐藏服务节点（Hidden Service Node）](/glossary/hidden-service-node) · [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点数量统计（Node Headcount）](/glossary/node-headcount) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization)
