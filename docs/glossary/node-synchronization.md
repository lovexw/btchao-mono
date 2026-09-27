---
title: 节点同步（Node Synchronization）
---

# 节点同步（Node Synchronization）

> **一句话定义：** 新节点启动时下载并验证全部区块、追上链尖的过程。

节点同步——几乎总是被叫做「初始区块下载（IBD）」——是一个全新节点追上链尖的过程。

2026 年的大致步骤：

1. 连接对等节点，下载完整的区块头链（约 88 万个头）。几分钟到一两个小时。
2. 验证区块头链：工作量证明、血缘关系、难度调整。
3. 下载全部区块体（总共约 600 GB）并验证每个区块里的每笔交易。很慢：快的 NVMe SSD 加现代 CPU 要 12–24 小时；树莓派或机械盘要好几天。
4. 进入「链尖模式」：此后只处理新到的区块。

可用的提速手段：

- `assumevalid` 自带一个较新区块的哈希，告诉节点「这个之前的区块里的签名假定有效」。旧区块跳过脚本验证，其他一切照查。IBD 时间能砍掉一大截。
- `dbcache=<MB>` 调大 UTXO 缓存。内存大 = IBD 快得多。
- 剪枝（`-prune=<MB>`）在验证后丢弃旧区块数据，磁盘占用降到几 GB，代价是无法向他人提供历史区块。

节点只做一次 IBD。之后只需以约 10 分钟的节奏跟上链尖，几乎不花什么资源。离线几天，追上来很快；几个月，慢一些但仍然可行。

IBD 要花几小时而不是几分钟，原因与比特币安全的原因相同：每个区块里每笔交易的每个签名都在本地验证。这就是工作量。跳过它，才有了[轻钱包](/glossary/spv-simplified-payment-verification)的「轻」。

**相关词条：** [Bitcoin Knots](/glossary/bitcoin-knots) · [比特币卫星（Bitcoin Satellite）](/glossary/bitcoin-satellite) · [链状态损坏（Corrupted Chain State）](/glossary/corrupted-chain-state) · [节点专用 IP（Dedicated IP）](/glossary/dedicated-ip-nodes) · [全节点（Full Node）](/glossary/full-node) · [完整验证（Full Validation）](/glossary/full-validation) · [无头节点（Headless Node）](/glossary/headless-node) · [隐藏服务节点（Hidden Service Node）](/glossary/hidden-service-node) · [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点数量统计（Node Headcount）](/glossary/node-headcount) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点在线时长（Node Uptime）](/glossary/node-uptime)
