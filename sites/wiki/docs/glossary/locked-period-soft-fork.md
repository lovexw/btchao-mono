---
title: 锁定阶段（软分叉）
---

# 锁定阶段（软分叉）

> **一句话定义：** 软分叉信令达标之后、新共识规则实际生效之前的那段等待期。

锁定阶段是软分叉从信令达标到新共识规则真正生效之间的等待窗口。

在 BIP 9 版本位里，序列是：

1. **Started**：信令开放，支持的矿工可以设置版本位。
2. **Locked-in**：阈值达成（历史上是 2,016 块周期内 95%）。结果已注定；升级将会激活。
3. **Active**：规则生效。违反新规则的区块被拒绝。

Locked-in 与 Active 之间的间隔就是「锁定阶段」，通常是一个完整的难度调整期（约两周）。目的是运营性的：还没升级的节点运营者有一个明确的窗口去升级；钱包、交易所、基础设施可以宣布最终的兼容状态；没发信号的矿工可以确保软件更新到位。切换于是一个人人皆知、可预期的区块高度上发生，无人措手不及。

在 Speedy Trial（Taproot 所用）下，思路相同：锁定之后、激活之前有一段固定延迟。机制变了，运营理由没变。即使是正面的变更，突然激活也会抬高旧软件撞墙、孤块或拒收有效交易的风险。锁定阶段是一种协调礼节，后来证明是承重墙。

**相关词条：** [BIP 9（版本位）](/glossary/bip-9-versionbits) · [BIP 91](/glossary/bip-91) · [BIP 119（CTV）](/glossary/bip-119-ctv) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [链上旗日（Chain Flag Day）](/glossary/chain-flag-day) · [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [部署阈值（软分叉）](/glossary/deployment-threshold-soft-fork) · [软分叉（Soft Fork）](/glossary/soft-fork)
