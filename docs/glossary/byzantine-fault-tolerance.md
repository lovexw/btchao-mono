---
title: 拜占庭容错（Byzantine Fault Tolerance）
---

# 拜占庭容错（Byzantine Fault Tolerance）

> **一句话定义：** 部分参与者作恶、撒谎或不可预测地坏掉时，分布式系统仍能正确运行的能力——比特币用工作量证明第一次做到了无许可版本的它。

拜占庭容错（BFT）是分布式系统的这样一种属性：即使部分参与者主动作恶、撒谎或不可预测地坏掉，系统仍能正确运转。名字来自 Lamport、Shostak 和 Pease 1982 年的论文「拜占庭将军问题」——用几位将军中有叛徒时如何协调作战计划来表述这个问题。

几十年来，BFT 一直被认为必须基于**已知、有身份的参与者**和指定的投票权重。经典结论（PBFT 及其后续）要求固定的验证者集合，最多容忍约 1/3 作恶。

中本聪用[工作量证明](/glossary/proof-work-pow)做到的，是为**开放、无许可**的成员资格解决 BFT——任何人随时可以加入或离开验证者集合。诀窍在于：不需要登记身份的验证者，身份本身就通过消耗计算工作来证明。攻击者没法凭空假装成一堆验证者——每一「票」都要花真金白银的能量。

比特币的具体 BFT 属性：

- **在经济上抵御 51% 攻击。** 攻击者需要持续掌握超过全球一半的算力，还得舍得烧这些电。即便成功，也只能概率性地重组最近的历史，改写不了深层历史。
- **从临时分歧中自愈。** 两个矿工同时出块时网络暂时分叉，[最长链规则](/glossary/longest-chain-rule)在一两个区块内解决它。
- **容忍网络分区。** 部分网络断连时两边各自挖矿；重连时，累积工作量多的那边获胜。

权益证明系统用别的手段实现 BFT（可罚没的保证金、登记身份的验证者）。比特币基于能量的 BFT 用效率换无许可的开放——任何人都能参与验证、任何人都能挖矿、任何人都能跑节点。拜占庭将军们不需要知道彼此叫什么。

这是比特币[白皮书](/glossary/whitepaper)的核心概念突破：通过工作量证明实现无许可 BFT。今天存在的每一种加密货币，某种意义上都是这个想法的变体。

**相关词条：** [女巫攻击防御（Anti-Sybil Mechanism）](/glossary/anti-sybil-mechanism) · [去中心化（Decentralization）](/glossary/decentralization) · [全节点（Full Node）](/glossary/full-node) · [HD 钱包（Hierarchical Deterministic Wallet）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [节点（Node）](/glossary/node) · [节点数量统计（Node Headcount）](/glossary/node-headcount) · [工作量证明（Proof of Work）](/glossary/proof-work-pow)
