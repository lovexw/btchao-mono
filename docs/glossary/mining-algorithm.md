---
title: 挖矿算法（Mining Algorithm）
---

# 挖矿算法（Mining Algorithm）

> **一句话定义：** 比特币用 SHA-256 双重哈希（SHA-256D）做工作量证明，其他币可能用别的 PoW 算法。

比特币的挖矿算法是 **SHA-256d**——对 SHA-256 的双重应用（`SHA-256(SHA-256(header))`）。[矿工](/glossary/miner)对候选[区块头](/glossary/block-header)计算这个哈希，直到结果低于当前[难度](/glossary/difficulty)目标。

双重哈希的设计不是随意的。它防御**长度扩展攻击**——单轮 SHA-256 的一个已知弱点：知道 `SHA-256(x)` 的攻击者可以在不知道 `x` 的情况下算出 `SHA-256(x || y)`（对某些 `y`）。双重哈希破坏了这一性质。代价是哈希运算的算力开销翻倍；安全收益被认为值得。

其他加密货币用不同的算法——Scrypt（莱特币）、Ethash（旧版以太坊）、RandomX（门罗币）、Equihash（Zcash）等等。每种选择都反映优先级：抗 ASIC、防内存优化、能效，或者干脆就是为了与别的协议区别开。

对比特币而言，SHA-256d 被锁死的原因：

- **巨额硬件沉没成本。** 全球比特币矿业的数十亿美元都投在 SHA-256 专用 [ASIC](/glossary/asic-application-specific-integrated-circuit) 上。换算法等于让这些硬件变砖。
- **需要硬分叉。** 任何算法变更都是一次[硬分叉](/glossary/fork)，而比特币的共识机制让硬分叉几乎不可能部署。
- **没有真实的更换需求。** SHA-256 在 25 年以上的密码分析中从未被攻破。换掉它的安全论证站不住脚。

算法选择是比特币设计中最永久的一部分。连「后量子迁移」的讨论都聚焦于签名方案（把 ECDSA 换成抗量子签名），而不是哈希算法。SHA-256 会一直在。这个算法作为引擎的那个更大机制，见[工作量证明](/glossary/proof-work-pow)。

**相关词条：** [ASIC（专用集成电路）](/glossary/asic-application-specific-integrated-circuit) · [抗 ASIC（ASIC Resistance）](/glossary/asic-resistance) · [竞争性挖矿（Competitive Mining）](/glossary/competitive-mining) · [CPU 挖矿（CPU Mining）](/glossary/cpu-mining) · [难度调整（Difficulty Retargeting）](/glossary/difficulty-retargeting) · [能源 FUD（Energy FUD）](/glossary/energy-fud) · [算力（Hash Rate）](/glossary/hash-rate) · [算力衍生品（Hash-Rate Derivative）](/glossary/hash-rate-derivative) · [Hashlet](/glossary/hashlet) · [隐性矿工税（Hidden Miner Tax）](/glossary/hidden-miner-tax) · [合并挖矿（Merged Mining）](/glossary/merged-mining) · [矿工（Miner）](/glossary/miner) · [矿工投降（Miner Capitulation）](/glossary/miner-capitulation) · [矿工可提取价值（MEV）](/glossary/miner-extractable-value-mev) · [挖矿（Mining）](/glossary/mining) · [矿池（Mining Pool）](/glossary/mining-pool) · [挖矿中心化（Mining Centralization）](/glossary/mining-centralization) · [挖矿托管（Mining Colocation）](/glossary/mining-colocation) · [矿机（Mining Rig）](/glossary/mining-rig) · [挖矿软件（Mining Software）](/glossary/mining-software) · [工作量证明（PoW）](/glossary/proof-work-pow) · [家用挖矿（Retail Mining）](/glossary/retail-mining) · [每 TH/s 收益（Revenue per TH/s）](/glossary/revenue-ths)
