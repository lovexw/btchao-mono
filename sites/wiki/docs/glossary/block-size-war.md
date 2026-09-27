---
title: 扩容战争（Block Size War）
---

# 扩容战争（Block Size War）

> **一句话定义：** 2015–2017 年围绕是否提高比特币 1 MB 区块上限的争斗：大区块派要更大区块换更便宜的链上支付，小区块派要保持小区块、分层扩容。小区块赢了，输掉的一方分叉成比特币现金。

2015 年 8 月到 2017 年 11 月，比特币差一点因为每个区块能装多少数据的 1 MB 上限而撕裂自己。中本聪 2010 年把这条限制加进来是为了防垃圾交易。到 2015 年区块逐渐填满、手续费攀升，社区对怎么办无法达成一致。

大区块派想提高上限，让链上装更多交易、手续费保持低廉。他们的理由是比特币应当是便宜的电子现金，而更大的[区块大小](/glossary/block-size)是显然的解法。这一派包括 Gavin Andresen、Mike Hearn、Roger Ver，以及以比特大陆吴忌寒为首的大型挖矿运营。他们发布了意在取代 [Bitcoin Core](/glossary/bitcoin-core)、解除上限的竞争软件：2015 年的 Bitcoin XT、2016 年的 Bitcoin Classic 和 Bitcoin Unlimited。旗舰提案是 [BIP 101](/glossary/bip-101-increase-block-size)——一步跳到 8 MB。

小区块派想保持上限不动。他们的论点是：大区块让跑[全节点](/glossary/full-node)变贵，把普通用户挤下网络、把控制权集中到少数数据中心手里。他们倾向分层扩容：提高基础链的数据效率，然后把交易量移到建在其上的系统，如[闪电网络](/glossary/lightning-network)。Bitcoin Core 开发组的大多数人属于这一派。

[SegWit](/glossary/segwit-segregated-witness-bip-141) 是小区块派的前进路线。这个[软分叉](/glossary/soft-fork)修复了交易延展性，在不硬分叉的情况下把有效容量提升到约 400 万权重单位，并为闪电扫清了道路。但它需要 95% 的矿工[发出信号](/glossary/miner-signaling)支持，而亲大区块的矿工拒绝。

2017 年，僵局在两个方向的压力下打破。3 月，一位匿名开发者发布了 [BIP 148](/glossary/bip-148-uasf)——用户激活的软分叉：自 2017 年 8 月 1 日起，运行它的节点将拒绝任何不给 SegWit 发信号的区块，无论矿工配不配合。5 月，一批公司和矿池签署了[纽约协议](/glossary/new-york-agreement-nya)——即 [SegWit2x](/glossary/segwit2x)：先激活 SegWit，约三个月后再硬分叉到 2 MB 区块。Bitcoin Core 开发者不在协议之中，许多用户将其解读为接管协议的密室交易。

旗日临近、[链分裂](/glossary/chain-split)摆上桌面，矿工在 7 月通过一个妥协机制（BIP 91）激活了 SegWit。矿工信号 8 月初越过阈值，SegWit 于 2017 年 8 月 24 日在区块 481,824 上线。

仍然想要大区块的一派于 8 月 1 日分叉成了[比特币现金](/glossary/bitcoin-cash)。SegWit2x 的后半部分——2 MB 硬分叉——原定当年 11 月，后于 11 月 8 日因缺乏共识而取消。

这场战争解决了一个比区块大小更大的问题：规则的最终权力属于跑全节点的人——经济多数——而不是矿工，也不是签协议的公司。这是[比特币治理](/glossary/bitcoin-governance)的核心主张，而扩容战争是在真实条件下检验它的案例。

从 Bitcoin XT 到 UASF 再到出走分叉的完整故事，见[扩容战争专题](/rabbit-holes/block-size-war)。

**相关词条：** [区块大小（Block Size）](/glossary/block-size) · [BIP 101（扩大区块）](/glossary/bip-101-increase-block-size) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [纽约协议（NYA）](/glossary/new-york-agreement-nya) · [SegWit2x](/glossary/segwit2x) · [比特币现金（Bitcoin Cash）](/glossary/bitcoin-cash) · [比特币治理（Bitcoin Governance）](/glossary/bitcoin-governance)
