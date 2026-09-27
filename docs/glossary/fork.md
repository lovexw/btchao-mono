---
title: 分叉（Fork）
---

# 分叉（Fork）

> **一句话定义：** 区块链规则的变更——「硬」分叉不兼容，「软」分叉向后兼容。

比特币语境里的「分叉」指对共识规则的更改。它有两种截然不同的类型，差别至关重要。

**[软分叉](/glossary/soft-fork)。** *收紧*规则。旧规则下有效的区块，在新规则下可能无效；新规则下有效的区块，在旧规则下依然有效。没升级的旧节点仍然认为新区块合法，只是它们自己不执行新约束。向后兼容——这是比特币标准的升级方式。

例子：[SegWit](/glossary/segwit-segregated-witness-bip-141)（2017）、[Taproot](/glossary/taproot)（2021）、[BIP-65 CLTV](/glossary/bip-65-opchecklocktimeverify)、[BIP-68 CSV](/glossary/bip-68-relative-locktime)、[P2SH](/glossary/p2sh) 等。

**硬分叉。** *放宽或打破*规则。新规则下有效的区块，旧规则下可能无效，旧节点会拒绝它们。不向后兼容。只要还有节点没升级，就会造成永久的[链分裂](/glossary/chain-split)。

比特币历史中的例子：2010 年以来，比特币的共识升级没有一次是硬分叉——社区始终坚持走软分叉。2017 年的「比特币现金」分裂，本质是借硬分叉把自己变成一个山寨币，而不是对比特币本身的升级。

软硬分叉之间的这种不对称，是比特币一个不太显眼的保守防线。软分叉只要获得广泛支持，就能渐进部署、波澜不惊。硬分叉则几乎不可能在不撕裂网络的前提下部署到比特币上——所以那些*必须*改硬分叉才能实现的变更（比如动那 2100 万的[供应上限](/glossary/asymptote)），实际上是不可行的。

顺带一提：「分叉」有时也被（令人困惑地）用来指*临时性*的分岔——两个矿工几乎同时挖出同一高度的区块。那种情况更准确的叫法是短暂的[重组](/glossary/reorg-reorganization)，网络通常在一两个区块内就自行解决了。

**相关词条：** [软分叉](/glossary/soft-fork) · [链分裂](/glossary/chain-split) · [重组（Reorg）](/glossary/reorg-reorganization) · [共识参数](/glossary/consensus-parameter) · [比特币现金](/glossary/bitcoin-cash) · [重放攻击](/glossary/replay-attack) · [分叉空投](/glossary/airdrop-btc-fork) · [分叉检测](/glossary/fork-detection) · [分叉监视器](/glossary/fork-watcher) · [链上旗日](/glossary/chain-flag-day)
