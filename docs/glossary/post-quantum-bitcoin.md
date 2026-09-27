---
title: 后量子比特币（Post-Quantum Bitcoin）
---

# 后量子比特币（Post-Quantum Bitcoin）

> **一句话定义：** 比特币对抗足够强大的量子计算机所需的协议变更集合——集中在签名方案，而非哈希函数。

比特币的密码学设计时没有把量子计算机考虑在内。后量子比特币（Post-Quantum Bitcoin）是这一类协议变更的统称——具体说，就是把签名方案（[ECDSA](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) 和 [Schnorr](/glossary/schnorr-signature)）换成不会在 [Shor 算法](/glossary/shors-algorithm)面前融化的方案。

威胁是具体的，数学是公开的，迁移方案正在起草中。但这一切目前都还不是共识。

## 处于风险中的是什么

比特币的签名方案——ECDSA 与 Schnorr，都运行在 [secp256k1 椭圆曲线](/glossary/elliptic-curve)上——依赖「离散对数问题计算上困难」这一假设。一台足够大的量子计算机运行 Shor 算法会直接击碎这个假设：给定[公钥](/glossary/public-key)，算法可以在多项式时间内推出私钥。

这就是那个存亡级的暴露面。任何公钥已经在链上揭示的 UTXO，理论上都能被持有这种机器的人花费。

## 不处于风险中的是什么

比特币的哈希函数——[SHA-256](/glossary/hash)——会被 [Grover 算法](/glossary/grovers-algorithm)削弱但不会被击破；Grover 对非结构化搜索提供平方级加速，有效安全强度从 256 位降到约 128 位。这仍然非常强——128 位安全强度是其他领域对称密码学的标准底线。

从功能上说：

- **工作量证明安然无恙。** 量子矿工获得的是平方根级加速，不是压倒性优势。
- **哈希过的地址类型（[P2PKH](/glossary/p2pkh-pay-public-key-hash)、[P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash)）**在公钥尚未揭示期间是安全的。
- **2100 万的上限不受威胁。** 量子计算带来的是对已暴露币的盗窃能力，不是增发新币的能力。

## 当前的暴露规模

[BIP-361](/glossary/bip-361) 估算，**超过 34% 的比特币**位于公钥已揭示的地址。暴露分三类：

- **[P2PK 输出](/glossary/p2pk-pay-public-key)**——早期比特币（多为 2009-2010 年的挖矿奖励，包括中本聪的大部分持仓）。公钥在输出创建时就上链了。
- **复用过的 P2PKH / P2WPKH 地址**——一旦花费过，公钥就永久揭示。留在该地址或回流到该地址的币都暴露了。为什么会这样见[地址复用](/glossary/address-reuse)。
- **P2TR（[Taproot](/glossary/taproot)）输出**——bech32m 地址*就是*调整过的公钥，前面没有哈希层。创建之时、还没被花费就已暴露。

从未花费过的 P2PKH 和 P2WPKH 地址目前是量子安全的：公钥被哈希过，只有花费交易才会揭示它。

## 正在推进的迁移

NIST 于 2024 年 8 月敲定了两个后量子签名标准——FIPS 204（[ML-DSA](/glossary/ml-dsa-dilithium)，基于 Dilithium）和 FIPS 205（[SLH-DSA](/glossary/slh-dsa-sphincs-plus)，基于 SPHINCS+）。第三个（Falcon，将成为 FN-DSA）仍在标准化中。

对比特币而言，迁移框架是 [BIP-361](/glossary/bip-361)——一份草案提案，通过两阶段软分叉让 ECDSA 和 Schnorr 花费在五年内日落。后量子签名方案本身则留给一份尚未发布的「后量子签名 BIP（待定）」。

有一个后果值得点名：在 BIP-361 的 B 阶段下，[中本聪](/glossary/satoshi-nakamoto)的 P2PK 输出如果拿不出基于种子的救援证明，将永久无法花费。任何拿不出 BIP-32 派生证明的人——包括一个保持沉默的中本聪——他的币就被永久锁死。这到底是特性还是缺陷，是整场辩论里火药味最浓的部分。

## 时间线

对[密码学相关量子计算机（CRQC）](/glossary/crqc-cryptographically-relevant-quantum-computer)何时到来的估计，从「最早 2027 年」（Aggarwal 等，2017）到数十年不等。BIP-361 的作者引用的学术路线图指向 2027-2030。悲观的说法把时间推到 2040 年代甚至更晚。

这里的纪律是按乐观情形做准备。乐观情形从 2017 年起就一直是「最早 2027」，而随着量子进展撞上纠错的工程现实，这个门槛一直在向后挪。趋势线指向最终具备能力——问题是何时，不是是否。BIP-361 的五年迁移窗口不是被害妄想；那大致就是协调钱包、交易所和托管方切换到新签名方案实际所需的时间。

想更深入，见深度专题[《量子计算与比特币》](/rabbit-holes/quantum-and-bitcoin)——完整的暴露测算、哪些有风险哪些没有、诚实的时间线，以及今天实际该做什么。

规范：[BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki)。

**相关词条：** [Shor 算法（Shor's Algorithm）](/glossary/shors-algorithm) · [Grover 算法（Grover's Algorithm）](/glossary/grovers-algorithm) · [CRQC（密码学相关量子计算机）](/glossary/crqc-cryptographically-relevant-quantum-computer) · [BIP 361（后量子迁移）](/glossary/bip-361) · [ML-DSA / Dilithium（FIPS 204）](/glossary/ml-dsa-dilithium) · [SLH-DSA / SPHINCS+（FIPS 205）](/glossary/slh-dsa-sphincs-plus) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [Schnorr 签名（Schnorr Signature）](/glossary/schnorr-signature) · [椭圆曲线（Elliptic Curve）](/glossary/elliptic-curve) · [哈希（Hash）](/glossary/hash) · [P2PK（付给公钥）](/glossary/p2pk-pay-public-key) · [地址复用（Address Reuse）](/glossary/address-reuse)
