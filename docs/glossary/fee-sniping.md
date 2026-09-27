---
title: 手续费狙击（Fee Sniping）
---

# 手续费狙击（Fee Sniping）

> **一句话定义：** 一种理论上的挖矿策略——刚找到区块的矿工不在其上继续挖，而是重挖同一高度以独吞高费交易；区块补贴衰减后相关性上升。

手续费狙击是一种理论上的挖矿策略：刚挖出一个区块的矿工决定*不*在这个区块上继续建设，转而尝试重挖同一个区块高度，把高费交易的收入据为己有。这是一种小众攻击，但随着[区块补贴](/glossary/block-subsidy)递减、手续费成为矿工收入的大头，它会变得越来越值得讨论。

假设它这样运作：

1. 区块 N 被挖出，其中收集的手续费比如是 0.5 BTC。
2. 另一个矿工看到后开始盘算：「如果我重挖区块 N、用同样的交易集，那 0.5 BTC 手续费就归我。这比在现有区块上挖 N+1 的期望收益更划算。」
3. 于是尝试挖一个替代版区块 N。如果赶在任何人挖出 N+1 之前成功，网络可能会重组到他的链上。

为什么这事罕见且风险高：

- **需要可观的算力**才有赢下这场赛跑的现实机会。小矿工的成功概率接近零。
- **失败的代价。** 如果重挖失败（别人先挖出了 N+1），损失的是本可以用来挖 N+1 的时间。纯粹的机会成本。
- **信誉代价。** 公然狙击手续费的行为等于告诉其他矿工这个运营者不可靠，以后谁都不愿与他协调。

已有的防御措施：

- **`nLockTime` 设为当前高度。** 现代钱包把交易的锁时间设成当前区块高度。这使这些交易在任何*更早*的区块里都无效，狙击者没法把它们塞进同一高度的重挖区块——只能放进 N 或更晚。
- **快速区块传播。** 有了[紧凑区块中继（BIP-152）](/glossary/bip-152-compact-blocks)，新区块以毫秒级传播，留给竞争区块组装的时间窗口极小。

手续费狙击目前更多是个悬而未决的理论担忧，而不是现实问题。随着比特币走向手续费主导的时代（2140 年之后），数学会改变，这个策略可能变得更有吸引力。社区知道这件事，在盯着。迄今没有观察到实际案例。手续费狙击所属的更大策略类别，见[矿工可提取价值（MEV）](/glossary/miner-extractable-value-mev)。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [加速器（Accelerator）](/glossary/accelerator) · [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [预计确认区块数](/glossary/estimated-confirmation-blocks) · [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [费率地板（Fee Floor）](/glossary/fee-floor) · [费率飙升（Fee Rate Escalation）](/glossary/fee-rate-escalation) · [矿工可提取价值（MEV）](/glossary/miner-extractable-value-mev) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [资源耗尽攻击](/glossary/resource-exhaustion-attack) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
