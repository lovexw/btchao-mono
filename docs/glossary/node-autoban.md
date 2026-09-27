---
title: 节点自动封禁（Autoban）
---

# 节点自动封禁（Autoban）

> **一句话定义：** 自动封禁发送无效或垃圾数据的对等节点，维护网络健康、抑制资源滥用。

节点自动封禁是 Bitcoin Core 的不良行为追踪机制。节点给每个对等节点维护一个滚动的不良行为评分：某些过错加分，评分超过阈值（默认 100）时，断开连接并把对方 IP 封禁 24 小时。

什么行为会扣分（加分）：

- 无效区块（通常一次就够到封禁级：一记大分）。
- 违反共识规则的无效交易（分值较小，累积制）。
- 畸形的 P2P 消息、超大负载、协议违规。
- 反复索要对方本应已有的数据。
- DoS 式行为：刷 `INV`、请求不存在的数据、倾倒垃圾。

诚实的对等节点基本不可能被封。几乎每一种会被记分的行为，要么意味着对方软件有 bug，要么是主动作恶。这套系统的意义，就是让攻击者持续消耗你的带宽和 CPU 撒垃圾变得昂贵。

封禁名单是每个节点本地的。没有全局「坏节点」登记处——也不应该有：一个全网级的封禁共识本身就会成为中心化向量。每个节点自己说了算。你可以通过 RPC 的 `listbanned` / `setban` 检查和编辑自己的封禁名单。

**相关词条：** [比特币卫星（Bitcoin Satellite）](/glossary/bitcoin-satellite) · [节点专用 IP（Dedicated IP）](/glossary/dedicated-ip-nodes) · [日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack) · [全节点（Full Node）](/glossary/full-node) · [节点（Node）](/glossary/node) · [节点数量统计（Node Headcount）](/glossary/node-headcount) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [节点在线时长（Node Uptime）](/glossary/node-uptime)
