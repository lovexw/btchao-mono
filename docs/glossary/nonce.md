---
title: 随机数（Nonce）
---

# 随机数（Nonce）

> **一句话定义：** 区块头中一个 32 位字段，矿工不断改变它以寻找低于难度目标的哈希。

随机数（nonce）是[区块头](/glossary/block-header)中的一个 32 位字段，矿工在寻找有效区块的过程中不断改变它。「nonce」是「number used once」（一次性数字）的缩写。

最低层的[挖矿](/glossary/mining)长这样：

```
循环：
  把 nonce 设为下一个值
  hash = SHA-256(SHA-256(区块头))
  如果 hash < 目标：广播区块
  否则：再来
```

就这样。没有捷径、没有代数、没有聪明的推导。只是不断计算哈希，直到碰巧有一个低于目标。现代 ASIC 每颗芯片每秒做大约 100 万亿次。

32 位随机数只有 2^32 ≈ 43 亿个可能值，一个像样的矿场不到一秒就全部扫完。用完之后，矿工会改区块的其他部分（通常是 Coinbase 交易里的 *extranonce*），这会改变区块头里的[默克尔根](/glossary/merkle-root)，从而得到一个全新的 43 亿个随机数空间。如此往复，直到找到为止。

随机数是比特币里最无聊的 4 个字节，也是整个工作量证明得以发生的全部机制。关于算的是什么，见[哈希](/glossary/hash)；关于找到一个好随机数为什么重要，见[挖矿：算力、难度与激励](/rabbit-holes/mining)。

**相关词条：** [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [难度（Difficulty）](/glossary/difficulty) · [难度调整（Difficulty Retargeting）](/glossary/difficulty-retargeting) · [哈希（Hash）](/glossary/hash) · [随机数耗尽（Nonce Exhaustion）](/glossary/nonce-exhaustion) · [工作量证明（PoW）](/glossary/proof-work-pow)
