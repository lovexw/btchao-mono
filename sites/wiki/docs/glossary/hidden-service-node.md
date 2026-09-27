---
title: 隐藏服务节点（Hidden Service Node）
---

# 隐藏服务节点（Hidden Service Node）

> **一句话定义：** 只通过 Tor 隐藏服务（`.onion` 地址）可达的比特币节点——真实 IP 对外不可见。

隐藏服务节点把 Bitcoin Core 跑在一个 Tor v3 洋葱地址（56 字符、ed25519 密钥）后面，以此取代（或叠加）明网 IP。其他启用 Tor 的对等节点通过 `.onion` 连接；只支持明网的对等节点则完全看不见它。

你得到什么：

- 运营者的 IP 对对等节点不可见。如果你不想让邻居、ISP 或链上分析公司知道你在跑比特币节点，这很有用。
- 节点无需端口转发或公网 IPv4 即可接受入站连接。在 NAT 后面？无所谓。
- 抗审查。Tor 的中继模型让「一刀切断所有比特币对等节点」比拉一张明网封锁清单难执行得多。

你放弃什么：

- 一些延迟。Tor 增加跳数，区块和交易的传播比明网慢几秒。
- 一些对等多样性。节点只能看到其他 onion 可达的对等节点——除非同时开启明网出站（典型配置是两者都开）。

BIP 155（addrv2，2021 年部署）让比特币的 P2P 层原生支持在地址 gossip 中广播 Tor v3、I2P 和 CJDNS 地址。在那之前，隐藏服务节点在对等发现里是二等公民。今天，在装有 Tor 的主机上运行 Bitcoin Core 会自动启用隐藏服务模式，网络中有相当比例的节点只能通过 Tor 到达。

**相关词条：** [无头节点（Headless Node）](/glossary/headless-node) · [隐性矿工税（Hidden Miner Tax）](/glossary/hidden-miner-tax) · [I2P（隐形互联网计划）](/glossary/i2p-invisible-internet-project) · [节点（Node）](/glossary/node) · [节点数量统计（Node Headcount）](/glossary/node-headcount) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [节点在线时长（Node Uptime）](/glossary/node-uptime) · [Tor 隐藏服务（Tor Hidden Service）](/glossary/tor-hidden-service)
