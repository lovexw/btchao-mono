---
title: 区块传播（Block Propagation）
---

# 区块传播（Block Propagation）

> **一句话定义：** 新挖出的区块在全球比特币节点间传送的过程。

区块传播是新区块从找到它的矿工传到全网所有其他节点的过程。速度很重要：在对等节点听说新区块之前，它可能还在挖或接着上一个链尖构建；这个过程越长，发生[孤块/过期块](/glossary/miner-orphan-rate)碰撞的概率就越高。

协议层面的优化：

- **紧凑区块（BIP 152）。** 发送方不再发送完整区块（1.5 MB+），而是发送区块头加短交易 ID。接收方用自己内存池里已有的交易重建区块。带宽下降一个数量级。Bitcoin Core 自 0.13（2016）起支持。
- **高带宽模式。** 节点告诉少数几个连接良好的对等节点「验证完成前就把紧凑区块激进地发给我」。用这些对等节点的带宽换延迟。
- **FIBRE / Falcon 等专用网络。** 由矿工和基础设施运营者维护的低延迟中继骨干网。用 UDP、前向纠错编码和直连对等，把区块在几十毫秒内推遍全球。
- **比特币卫星。** Blockstream 的地球静止轨道广播（见 [bitcoin-satellite](/glossary/bitcoin-satellite)）为区块数据提供一条不依赖互联网的冗余路径。

为什么要下这么大功夫：传播延迟每多一秒，下游矿工的孤块风险就按比例上升。在全球尺度上这影响矿工盈利——所以最大的挖矿运营在连接性上重金投入。协议层持续改进，是为了让赛场不至完全倒向连接最好的那几家。

2026 年的典型传播：新区块 5–8 秒内到达约 80% 的可达节点，30 秒内基本到齐。

**相关词条：** [BIP 152（紧凑区块）](/glossary/bip-152-compact-blocks) · [比特币卫星（Bitcoin Satellite）](/glossary/bitcoin-satellite) · [区块（Block）](/glossary/block) · [区块浏览器（Block Explorer）](/glossary/block-explorer) · [区块头（Block Header）](/glossary/block-header) · [区块高度（Block Height）](/glossary/block-height) · [出块时间（Block Time）](/glossary/block-time) · [区块链（Blockchain）](/glossary/blockchain) · [竞争性区块传播](/glossary/competitive-block-propagation) · [竞争性挖矿（Competitive Mining）](/glossary/competitive-mining) · [重组（Reorg）](/glossary/reorg-reorganization) · [过期块（Stale Block）](/glossary/stale-block)
