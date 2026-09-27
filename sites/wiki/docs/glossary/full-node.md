---
title: 全节点（Full Node）
---

# 全节点（Full Node）

> **一句话定义：** 下载、验证并存储整条区块链的比特币节点——每个区块都亲自验，规则只认自己的解读。

全节点是这样的比特币[节点](/glossary/node)：下载、验证并存储整条区块链——从 2009 年 1 月 3 日的[创世区块](/glossary/genesis-block)到此刻的最新区块，一个不落。它独立执行每一条共识规则，不服从任何人对这些规则的解读，只服从自己的。

2026 年的实际门槛：

- **磁盘：** 约 600 GB，每年再增约 150 GB。一块 2 TB SSD 用好几年绰绰有余。
- **内存：** 4 GB 能跑；8 GB 以上舒服。
- **CPU：** 树莓派 4 往上随便什么都能跑。初始同步吃 CPU，要几天；日常运行轻描淡写。
- **带宽：** 每月几百 GB 出站——大头是给对等节点供块。ISP 不友好的话可以在配置里限速。

软件几乎总是 [Bitcoin Core](/glossary/bitcoin-core)，即参考实现。[Bitcoin Knots](/glossary/bitcoin-knots) 等替代品存在，但本质是 Core 的修补版。

既然钱包能连公共服务器，为什么还要费劲跑全节点？三个理由：

1. **你验证自己的交易。** 不跑全节点，你就得信任某个服务器告诉你「你的币是否有效」。跑了全节点，数学你自己算——零信任。
2. **你执行共识。** 每个全节点都是假想攻击者必须多说服的一个节点。网络抵抗规则变更的能力，随独立验证者数量增长。
3. **你避免元数据泄露。** 向公共服务器查询「这笔交易确认了吗」，等于告诉那个服务器你在乎哪些地址。你自己的节点只看全局链，永远看不到你的具体兴趣。

比特币社区目前运行着估计 15,000–20,000 个公网可达的全节点，外加更多躲在 NAT 后或跑在 Tor 上的。你的那台可以成为其中之一。

完整上手指南见[学习之旅第 6 章「主权」](/journey/sovereignty)。

**相关词条：** [比特币客户端（Bitcoin Client）](/glossary/bitcoin-client) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Knots](/glossary/bitcoin-knots) · [拜占庭容错（Byzantine Fault Tolerance）](/glossary/byzantine-fault-tolerance) · [链状态损坏（Corrupted Chain State）](/glossary/corrupted-chain-state) · [Full RBF](/glossary/full-rbf) · [完整验证（Full Validation）](/glossary/full-validation) · [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点数量统计（Node Headcount）](/glossary/node-headcount) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [节点在线时长（Node Uptime）](/glossary/node-uptime)
