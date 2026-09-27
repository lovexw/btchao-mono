---
title: SLH-DSA / SPHINCS+（FIPS 205）
---

# SLH-DSA / SPHINCS+（FIPS 205）

> **一句话定义：** NIST 标准化的基于哈希的后量子签名方案——ML-DSA 的保守备选：安全假设更强，但签名大得多。

SLH-DSA（Stateless Hash-Based Digital Signature Algorithm，无状态基于哈希的数字签名算法）是 NIST 于 2024 年 8 月定为 FIPS 205 标准的后量子签名方案。它基于 SPHINCS+——出自与 [ML-DSA](/glossary/ml-dsa-dilithium) 同一场 NIST 竞赛的基于哈希方案。在比特币的后量子讨论中，SLH-DSA 是保守备选：当格密码被认为在密码学上太新、更安全的选择是基于哈希的安全性时，选它。

## 它是什么

SLH-DSA 用哈希函数组合构造签名——一次性签名的 Merkle 树，递归嵌套。安全假设是寻找[哈希](/glossary/hash)碰撞与原像的困难性——[Grover 算法](/glossary/grovers-algorithm)把它减半但不攻破。

标准化了三个安全等级，各配「small」与「fast」变体（以签名大小换验证速度）：

- **SLH-DSA-128s**：签名约 7,856 字节，约 128 位安全，签名慢
- **SLH-DSA-128f**：签名约 17,088 字节，约 128 位安全，签名快
- **SLH-DSA-256s**：签名约 29,792 字节，约 256 位安全
- **SLH-DSA-256f**：签名约 49,856 字节，约 256 位安全

公钥很小（约 32-64 字节）；成本全在签名大小上。

## 基于哈希 vs 基于格

SLH-DSA 与 ML-DSA 的安全模型根本不同：

- **ML-DSA**：安全性来自格问题的假设困难性。数学上研究充分，但密码学上比哈希函数年轻。
- **SLH-DSA**：安全性来自求逆哈希函数（单向函数）的假设困难性。哈希函数是最古老、研究最透、最受信任的密码学原语之一。

取舍是：基于哈希的方案很保守——建立在经过数十年分析的密码学原语上。但签名大小的代价巨大。基于格的方案更高效，但依赖更年轻的密码分析领域，未来突破的可能性更大。

想要「不会被任何我们尚不知道存在的算法攻破」的签名，SLH-DSA 是保守选择。想要实用效率，ML-DSA 胜出。

## 取舍

与比特币现行方案对比：

- [ECDSA](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) 签名：约 71-72 字节
- [Schnorr](/glossary/schnorr-signature) 签名：64 字节
- SLH-DSA-128s 签名：约 7,856 字节——大 100 多倍
- SLH-DSA-256f 签名：约 49,856 字节——大近 800 倍

在比特币的规模上，全面迁移 SLH-DSA 会让交易体量暴涨，显著压缩有效区块容量。最大的参数集对普通比特币交易而言几乎不现实；最小的也比 ML-DSA 签名大约 10 倍。

因此 SLH-DSA 在比特币的论据是保守密码学，不是效率。如果社区想要最大信心——确保没有任何未来的密码分析突破能威胁网络——就选它，代价是区块空间经济学。

## 在比特币迁移讨论中的位置

SLH-DSA 是 NIST 标准化的第二个后量子签名方案，也是 ML-DSA 的经典基于哈希替代品。在比特币的讨论中，它通常被提及为：

- 格方案日后被经典攻击攻破时的退路
- 高价值或长生命周期交易的可选项——保守安全性比手续费更重要
- 混合方案的候选组件——同一笔交易上叠加来自不同安全假设的多个签名

[BIP-361](/glossary/bip-361) 的「后量子签名 BIP（待定）」尚未发布，所以比特币对 SLH-DSA 的正式立场未定。当前讨论倾向于 ML-DSA 为默认、SLH-DSA 为备选。

各候选方案的区块空间取舍，见深度专题[《量子计算与比特币》](/rabbit-holes/quantum-and-bitcoin)。

**相关词条：** [后量子比特币（Post-Quantum Bitcoin）](/glossary/post-quantum-bitcoin) · [BIP 361（后量子迁移）](/glossary/bip-361) · [ML-DSA / Dilithium（FIPS 204）](/glossary/ml-dsa-dilithium) · [Shor 算法（Shor's Algorithm）](/glossary/shors-algorithm) · [Grover 算法（Grover's Algorithm）](/glossary/grovers-algorithm) · [哈希（Hash）](/glossary/hash)
