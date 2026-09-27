---
title: 部署阈值（软分叉）
---

# 部署阈值（软分叉）

> **一句话定义：** 软分叉锁定激活前，要求一定比例的区块发出支持信号（如 95%）。

部署阈值是提议中的软分叉激活前，近期区块中必须发信号表示支持的比例。在 BIP 9（版本位）下，标准阈值是一个 2,016 块调整期内 95% 的区块设置指定位。

对矿工社区一致支持的技术升级，这套机制运作良好。对矿工有经济或政治理由拖延的升级，它运作得很糟。

SegWit 部署（2016–2017）是教科书案例。SegWit 是干净的改进；大多数用户想要它；但大片算力拖延信号数月——理由五花八门（有的是对实现细节的正当担忧，有的是商业利益：ASICBoost 与 SegWit 不兼容，一些矿工不想放弃那条收入流）。95% 阈值给了少数矿工事实上的否决权。

解法是多管齐下：BIP 91 把 SegWit 信令阈值降到 80% 并强制锁定；BIP 148 是用户激活软分叉（UASF），证明有经济分量的节点可以不靠矿工信令就执行 SegWit 规则；合力之下，矿工就范了。

教训：纯矿工阈值激活让升级沦为人质。Taproot 的激活用「Speedy Trial」——BIP 9 信令加一个硬性的最低激活高度，升级要么达阈值、要么到高度，先到先激活。不再有无限期卡死的部署。

部署阈值作为协调信号仍然有用，但把它当作激活最终裁决者的时代已经结束。

**相关词条：** [BIP 9（版本位）](/glossary/bip-9-versionbits) · [BIP 91](/glossary/bip-91) · [BIP 119（CTV）](/glossary/bip-119-ctv) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [BIP 159](/glossary/bip-159) · [链上旗日（Chain Flag Day）](/glossary/chain-flag-day) · [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [锁定阶段（软分叉）](/glossary/locked-period-soft-fork) · [软分叉（Soft Fork）](/glossary/soft-fork)
