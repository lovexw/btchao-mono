---
title: ML-DSA / Dilithium（FIPS 204）
---

# ML-DSA / Dilithium（FIPS 204）

> **一句话定义：** NIST 标准化的基于格的后量子签名方案——替换比特币 ECDSA/Schnorr 的领跑候选。

ML-DSA（Module-Lattice-Based Digital Signature Algorithm，基于模格的数字签名算法）是 NIST 于 2024 年 8 月定稿为 FIPS 204 的后量子签名标准。它以 CRYSTALS-Dilithium 为基础——这是赢得 NIST 后量子签名竞赛的格密码方案。在比特币的迁移讨论中，ML-DSA 是被引用最多的、用来替换 [ECDSA](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) 和 [Schnorr 签名](/glossary/schnorr-signature)的候选。

## 它是什么

ML-DSA 是一种数字签名方案，其安全性依赖格问题的困难性——具体是「带误差的模学习（MLWE）」和「模短整数解（MSIS）」问题。这些问题被认为即使对量子计算机也是困难的；[Shor 算法](/glossary/shors-algorithm)对椭圆曲线离散对数有效，对格问题无能为力。

该方案在模格上做多项式运算来产生签名，标准化了三组参数：

- **ML-DSA-44**：约 128 位安全强度，签名约 2,420 字节
- **ML-DSA-65**：约 192 位安全强度，签名约 3,293 字节
- **ML-DSA-87**：约 256 位安全强度，签名约 4,595 字节

[公钥](/glossary/public-key)视参数不同，约 1,300 到 2,600 字节。

## 格密码的安全假设

ML-DSA 背后的安全假设与 ECDSA 在性质上不同。ECDSA 假设离散对数问题困难；这个假设在 [CRQC（密码学相关量子计算机）](/glossary/crqc-cryptographically-relevant-quantum-computer)面前失效。格问题——在高维格中找短向量，或求解带噪声的线性方程组——目前不知道有任何量子算法能高效求解。

这不是保证。格密码比 RSA 和 ECDSA 年轻，密码学界对它的攻击经验也少。未来的突破（量子的或经典的）可能削弱特定方案。NIST 的标准化反映的是当前共识：格问题在后量子签名上提供了安全与实用的最佳平衡——不是说它们被证明不可破。

## 代价

对比特币现有方案：

- ECDSA 签名（链上 DER 编码）：约 71–72 字节
- Schnorr 签名（BIP-340）：恰好 64 字节
- ML-DSA-65 签名（中档参数组）：约 3,293 字节

签名尺寸放大约 50 倍。连锁影响：

- 交易体积显著增长，手续费按比例增长
- 区块权重预算消耗更快
- 剪枝存储需求上升
- UTXO 集大小与验证成本上升

这些不是一票否决项，但正是比特币的后量子迁移不能简单「即插即换」的原因。区块空间经济学需要消化更大的签名——这也是 [BIP 361](/glossary/bip-361) 的迁移方案分两个阶段、跨五年的原因之一。

## 在比特币迁移讨论中的位置

BIP 361——比特币后量子迁移的现行草案提案——对签名方案保持中立，把具体后量子算法的选择留给一份尚未发布的「后量子签名 TBD BIP」。ML-DSA 是那个位置上的领跑候选，因为：

- 它是 NIST 标准化的（FIPS 204）
- 在现有后量子候选中签名尺寸最合理（[SLH-DSA / SPHINCS+](/glossary/slh-dsa-sphincs-plus) 大得多；Falcon 更小但实现上更脆弱）
- 验证速度足以支撑比特币规模的全节点验证
- 它已在比特币之外的场景部署（TLS、代码签名）

其他候选也还在讨论之中。比特币的最终选择将在签名尺寸与安全假设多样性之间权衡。

候选方案的区块空间成本以及选择如何做出，见深度专题[量子与比特币](/rabbit-holes/quantum-and-bitcoin)。

**相关词条：** [后量子比特币（Post-Quantum Bitcoin）](/glossary/post-quantum-bitcoin) · [BIP 361（后量子迁移）](/glossary/bip-361) · [SLH-DSA / SPHINCS+（FIPS 205）](/glossary/slh-dsa-sphincs-plus) · [Shor 算法（Shor's Algorithm）](/glossary/shors-algorithm) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [Schnorr 签名](/glossary/schnorr-signature) · [公钥（Public Key）](/glossary/public-key) · [椭圆曲线（Elliptic Curve）](/glossary/elliptic-curve)
