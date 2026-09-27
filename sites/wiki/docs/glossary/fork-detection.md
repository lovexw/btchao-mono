---
title: 分叉检测（Fork Detection）
---

# 分叉检测（Fork Detection）

> **一句话定义：** 监控自己的节点或网络是否出现意外的链分裂或有争议的分叉，确保待在想要的链上。

分叉检测是监控意外链分裂的实践——网络产生两条或更多竞争链的时刻，无论有意无意。

会被检测到的分叉种类：

- **常规的 1–2 块重组。** 由几乎同时的出块引发，一年几次。一两个区块内自动解决，无需运营者介入。
- **软件 bug 分叉。** 节点软件的 bug 接受了一个无效区块；跑有 bug 版本的节点跟随了与正确版本不同的链。罕见，但 [BIP 50](/glossary/bip-50) 是 2013 年的经典案例。
- **激活分叉。** 软分叉或硬分叉规则变更激活时，不是所有节点都升级了。有意为之，但通过信号阈值与警告期来管理。
- **有争议的硬分叉。** 一派人刻意更改共识规则。2017 年的比特币现金分裂就是例子。

实践中分叉检测怎么做：

- **Bitcoin Core 内置告警。** `getblockchaininfo` 暴露一个 `warnings` 字段，浮现异常链况：意外的高难度竞争链、近期区块中被大量设置的未知软分叉位等。
- **多信源比对。** 把你节点的链尖哈希与多个区块浏览器（mempool.space、blockstream.info 等）和几个信任的对等节点对比。任何深度上出现不一致，就调查。
- **Forkmonitor.info。** 一个并排运行多种比特币节点实现的公共服务，出现分歧即告警。分叉监视服务的标杆。

谁需要它：

- **交易所、托管方、支付处理商。** 确认逻辑依赖待在正确的链上。链一旦分叉，冻结充提。
- **矿工。** 在少数链上挖矿是白烧算力。
- **大额链上交易。** 在任何疑似分叉期间等更深的确认。

大多数用户永远不会遇到这些。Bitcoin Core 透明地处理常规重组。这套纪律属于「待错链会很贵」的高价值系统的运营者。

**相关词条：** [分叉空投（Airdrop, BTC Fork）](/glossary/airdrop-btc-fork) · [比特币现金（Bitcoin Cash）](/glossary/bitcoin-cash) · [区块链（Blockchain）](/glossary/blockchain) · [链分裂（Chain Split）](/glossary/chain-split) · [链状态损坏（Corrupted Chain State）](/glossary/corrupted-chain-state) · [分叉（Fork）](/glossary/fork) · [分叉监视器（Fork Watcher）](/glossary/fork-watcher) · [重组（Reorg）](/glossary/reorg-reorganization)
