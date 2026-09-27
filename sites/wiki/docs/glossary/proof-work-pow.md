---
title: 工作量证明（PoW）
---

# 工作量证明（PoW）

> **一句话定义：** 比特币的共识机制：矿工计算 SHA-256 哈希，直至得到满足难度目标的有效区块哈希。

工作量证明是比特币的共识机制。它是一条把电力和时间变成「向链条追加新区块之权利」的规则。

机制很简单。要提议一个区块，[矿工](/glossary/miner)必须产出一个[哈希](/glossary/hash)低于全网设定目标的[区块头](/glossary/block-header)。唯一的办法就是不断尝试[随机数](/glossary/nonce)，直到碰巧出现一个足够小的哈希。没有代数，没有捷径。「工作」就是工业规模硬件上的暴力试错——目前全球挖矿网络的总吞吐约 700 EH/s（每秒约 7 × 10^20 次哈希）。

三个性质让 PoW 成为比特币安全模型的承重墙：

- **成本不对称。** 产出一个有效哈希需要数万亿次尝试；验证一个只需一次哈希。诚实节点验证区块几乎免费，攻击者却无法便宜地伪造它们。
- **锚定真实世界资源。** 哈希需要专用芯片和电力，两者都存在于物理世界。工作量证明没法像印法币那样印出来。
- **[难度](/glossary/difficulty)自动调整**，无论多少算力进出，出块时间都保持在 10 分钟附近。安全预算随采用规模同步增长。

标准批评是能耗。标准辩护是：这些电不是浪费——它是保护整条链不被篡改的成本，而且边际挖矿业务用的往往是没有其他买家的能源（弃置水电、火炬天然气、低谷电）。两种论证的长版本见[挖矿：算力、难度与激励](/rabbit-holes/mining)。

PoW 是中本聪想解决的那个问题的答案：没有中央权威，如何在互联网上达成无需信任的共识？让达成共识*昂贵*，让篡改*更*昂贵，让诚实成为通向收入的最便宜路径。这就是密码学家所说的[激励相容](/glossary/incentive-compatibility)——正是它让比特币靠理性的利己运转，而不是靠信任。

**相关词条：** [抗女巫机制（Anti-Sybil Mechanism）](/glossary/anti-sybil-mechanism) · [拜占庭容错（Byzantine Fault Tolerance）](/glossary/byzantine-fault-tolerance) · [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [去中心化（Decentralization）](/glossary/decentralization) · [难度（Difficulty）](/glossary/difficulty) · [难度调整（Difficulty Retargeting）](/glossary/difficulty-retargeting) · [能源 FUD（Energy FUD）](/glossary/energy-fud) · [Grover 算法（Grover's Algorithm）](/glossary/grovers-algorithm) · [哈希（Hash）](/glossary/hash) · [激励相容（Incentive Compatibility）](/glossary/incentive-compatibility) · [随机数（Nonce）](/glossary/nonce) · [随机数耗尽（Nonce Exhaustion）](/glossary/nonce-exhaustion) · [泊松过程（Poisson Process）](/glossary/poisson-process)
