---
title: 过期块（Stale Block）
---

# 过期块（Stale Block）

> **一句话定义：** 有效但未能进入主链的区块，历史上常被叫作「孤块」。

过期块（stale block）是没有进入规范链的有效比特币区块。两个[矿工](/glossary/miner)几乎同时在同一高度出块；网络短暂分裂；一边获胜；输掉的那个就是过期块。

一个区块「过期」不是因为它本身有任何毛病——每个全节点都能把它验证为格式正确、签名有效、工作量证明有效、coinbase 申领有效。它只是不再属于最长链。一旦[重组](/glossary/reorg-reorganization)取代它，发现它的矿工拿不到[区块奖励](/glossary/block-reward)；过期块里的交易（coinbase 除外）通常回到[内存池](/glossary/mempool)，等日后重新被打包。

过期块是正常现象。每年约 52,000 个区块加上全球分布的挖矿，短暂的出块碰撞每年发生数次。平均出块时间越长、区块传播越好，过期块率越低。比特币的 10 分钟出块时间部分就是为了把过期率压低而选的。

同一个东西的老名字是[孤块（orphan block）](/glossary/orphan-block)，旧文档里还能看到；但它已被正式区别于另一种（更罕见的）情况——节点字面上还没收到父区块。

过期块不代表比特币出了问题。它代表比特币在正常运转：全球独立矿工竞相延长链，网络收敛到工作量更多的那一边。

**相关词条：** [重组（Reorg）](/glossary/reorg-reorganization) · [孤块（Orphan Block）](/glossary/orphan-block) · [区块传播（Block Propagation）](/glossary/block-propagation) · [区块链（Blockchain）](/glossary/blockchain) · [链分裂（Chain Split）](/glossary/chain-split) · [区块奖励（Block Reward）](/glossary/block-reward)
