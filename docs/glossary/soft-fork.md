---
title: 软分叉（Soft Fork）
---

# 软分叉（Soft Fork）

> **一句话定义：** 对比特币共识规则的向后兼容变更：多数矿工/节点执行即为有效。

软分叉是*收紧*规则的比特币共识变更：以前有效的，在新规则下可能变得无效；但新规则下有效的，在旧规则下也有效。没升级的旧节点仍把新区块视为合法——只是它们自己不去执行新的约束。

这是演进比特币协议的*向后兼容*方式。与之相对的是硬分叉：放宽规则，产生旧节点拒绝的不兼容链。

比特币的重要软分叉：

- **[BIP-16（P2SH）](/glossary/p2sh)**——2012。添加 [P2SH](/glossary/p2sh) 地址格式。
- **[BIP-65（CLTV）](/glossary/bip-65-opchecklocktimeverify)**——2015。为脚本添加 `OP_CHECKLOCKTIMEVERIFY` 绝对时间锁。
- **[BIP-68/112/113（CSV）](/glossary/checksequenceverify-csv)**——2016。添加相对时间锁。
- **[BIP-141（SegWit）](/glossary/segwit-segregated-witness-bip-141)**——2017。大事件：重构见证数据、修复延展性、有效区块容量翻倍。
- **[BIP-340/341/342（Taproot）](/glossary/taproot)**——2021。添加 [Schnorr 签名](/glossary/schnorr-signature)、Taproot 和 Tapscript。

激活通常涉及矿工信令：足够多的矿工必须在区块头中示意就绪，软分叉才「锁定」并开始被执行。机制由 [BIP-9](/glossary/bip-9-versionbits) 及其继任者定义。激活后，未升级的节点继续工作，但可能接受违反新规则的区块——这正是真正获得多数支持的软分叉基本安全、而有争议的软分叉可能造成链分裂的原因。

软分叉路线是保守的：比特币可以在不强迫所有人同时升级的情况下添加功能。它也是比特币演进缓慢的一部分原因——任何提案都要跨过社区 + 矿工 + 经济节点共识的高门槛才能真正激活。这套多方博弈的完整图景就是[比特币治理](/glossary/bitcoin-governance)所描述的；当目标是不分裂网络地添加能力时，软分叉是这一过程最常见的形态。

软分叉如何从提案走到激活，见[BIP 流程专题](/rabbit-holes/bip-process)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 9（版本位）](/glossary/bip-9-versionbits) · [BIP 91](/glossary/bip-91) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [比特币治理（Bitcoin Governance）](/glossary/bitcoin-governance) · [链分裂（Chain Split）](/glossary/chain-split) · [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [部署阈值（软分叉）](/glossary/deployment-threshold-soft-fork) · [锁定阶段（软分叉）](/glossary/locked-period-soft-fork)
