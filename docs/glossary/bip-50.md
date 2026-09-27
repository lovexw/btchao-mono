---
title: BIP 50
---

# BIP 50

> **一句话定义：** 记录 2013 年 3 月重大链分叉如何被解决的过程文档。

BIP 50 不是协议变更。它是一份事故复盘。

2013 年 3 月 11 日，网络分裂了。Bitcoin 0.7 用 Berkeley DB，每个区块的数据库锁有硬上限；0.8 已迁移到 LevelDB，没有对应限制。一个 0.8 矿工产出的偏大区块，超过了 0.7 节点的 BDB 锁数量，被 0.7 判为无效。链[分叉](/glossary/fork)了：0.8+ 跟随新区块，0.7 跟随另一条链。

解决过程是 IRC 上六小时的紧急协调。运行 0.8 的矿工自愿降回 0.7 规则，让更短的（0.7 兼容）链反超更长的链，网络重归一线。窗口期内一笔 OKPay 充值遭遇一次[双花](/glossary/double-spend)；其余全部干净恢复。

教训留了下来。Bitcoin Core 的发布流程从此对触及共识的改动空前谨慎，而这次事件至今仍是「非共识的实现细节其实并非非共识」的经典案例：任何改变节点接受哪些[区块](/glossary/block)的东西都是共识变更——哪怕规范说它不应该是。

规范：[BIP-50](https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [区块（Block）](/glossary/block) · [分叉（Fork）](/glossary/fork) · [重组（Reorg）](/glossary/reorg-reorganization)
