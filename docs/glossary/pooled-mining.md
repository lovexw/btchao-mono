---
title: 矿池挖矿（Pooled Mining）
---

# 矿池挖矿（Pooled Mining）

> **一句话定义：** 多名矿工在矿池中合并算力，按贡献的工作分配奖励。

矿池挖矿是把许多[矿工](/glossary/miner)的[算力](/glossary/hash-rate)合并为一个协同行动、按贡献分奖励的做法。2026 年，几乎全部比特币挖矿都是这样发生的。

机制是：每个矿工提交「份额」——满足一个低于全网真实目标的低难度阈值的区块头候选。份额证明矿工确实在做工，但本身不是有效区块。当池内*任何人*找到真实区块时，[区块奖励](/glossary/block-reward)按各自提交的份额比例分给所有贡献的矿工。

矿工为什么组池：

- **降低方差。** 一个 1 PH/s 的 solo 矿工平均约 26 年才能找到一块。围绕这个均值的方差残酷：可能 2026 年中三块，之后 50 年一块没有。组池把方差抹平成更小、更稳定的收入流。
- **运营简单。** 区块模板构建、收益记账这些矿工不想自己搭的基础设施，矿池全包。
- **不再有 solo 的幻觉。** 小规模 solo 挖矿的难言之隐是：它本质就是买彩票。矿池挖矿对方差是诚实的。

矿池生态：

- **大矿池**（Foundry USA、AntPool、ViaBTC、F2Pool）控制全网大部分算力。详见[矿池](/glossary/mining-pool)。
- **更小/去中心化矿池**，如 Ocean 和 Braiins，用不同的交易选择政策或结算方案提供替代选项。
- **Stratum V2** 是让个体矿工在仍享受矿池方差平滑的同时自选交易的协议升级——对挖矿中心化担忧一个有分量的结构性修复。

矿池挖矿一直是中心化担忧，也是除最大矿场之外所有人的真实必需。让权力随 Stratum V2 的采用逐渐回流到池内个体矿工——这是希望，多于确定。

更完整的图景见[矿池](/glossary/mining-pool)，结构性争论见[挖矿中心化](/glossary/mining-centralization)。

**相关词条：** [Hashlet](/glossary/hashlet) · [矿池（Mining Pool）](/glossary/mining-pool) · [挖矿补贴（Mining Subsidy）](/glossary/mining-subsidy) · [每 TH/s 收益（Revenue per TH/s）](/glossary/revenue-ths)
