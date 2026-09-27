---
title: 节点数量统计（Node Headcount）
---

# 节点数量统计（Node Headcount）

> **一句话定义：** 对比特币网络节点数量的估计，通常来自主动扫描或 DNS 种子。

估计比特币网络上有多少节点是件难事，因为网络是无许可的，而且很多节点根本不想被数进去。

两种口径：

- **可达（监听中）节点。** 公共扫描器（Bitnodes 是权威一家）扫描 IPv4 / IPv6 空间和 Tor 描述符，寻找接受入站连接的对等节点。2026 年，这个数字在一万八千到两万出头之间浮动。这是网络面向公众的那一小部分。
- **全部节点。** 包括所有可达节点，再加上躲在 NAT、家用防火墙后面、或干脆不对外宣告入站的所有节点。估计在 5 万到 10 万以上，误差很大。

方法论不同，数字就不同。Luke Dashjr 的统计历来数得更激进、总数更高；Bitnodes 数得保守。两个都没错——它们回答的是略微不同的问题。

节点数量是有用的方向性指标，不是去中心化的完美代理。真正要紧的是规则是否被一致执行、网络是否有足够多的独立运营者让「被俘获」不可行。2 万个全跑在同一家云厂商上的节点，比 5 万个分散在 80 个国家家庭宽带上的节点更中心化。结构与数量同等重要。

**相关词条：** [比特币卫星（Bitcoin Satellite）](/glossary/bitcoin-satellite) · [拜占庭容错（Byzantine Fault Tolerance）](/glossary/byzantine-fault-tolerance) · [节点专用 IP（Dedicated IP）](/glossary/dedicated-ip-nodes) · [去中心化](/glossary/decentralization) · [日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack) · [全节点（Full Node）](/glossary/full-node) · [隐藏服务节点（Hidden Service Node）](/glossary/hidden-service-node) · [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [节点在线时长（Node Uptime）](/glossary/node-uptime)
