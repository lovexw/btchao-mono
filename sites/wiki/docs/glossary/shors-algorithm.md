---
title: Shor 算法（Shor's Algorithm）
---

# Shor 算法（Shor's Algorithm）

> **一句话定义：** 攻破椭圆曲线密码学的量子算法——因此在足够大的量子计算机上攻破比特币的 ECDSA 与 Schnorr 签名。

Shor 算法由 Peter Shor 于 1994 年发表，它是「后量子比特币」之所以成为一个话题的根本原因。这个量子算法让一台足够大的量子计算机成为当今大多数公钥密码学的存亡级威胁——包括比特币的。它高效解决两个经典计算机解不了的问题：整数分解（攻破 RSA）与离散对数问题（攻破椭圆曲线密码学，包括 [ECDSA](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) 和 [Schnorr](/glossary/schnorr-signature)）。

## 它做什么

比特币的签名方案依赖这个假设：给定 [secp256k1 曲线](/glossary/elliptic-curve)上的一个[公钥](/glossary/public-key)，推出对应私钥在计算上不可行。经典方法下已知最好的攻击耗时随密钥大小指数增长——256 位曲线约为 2^128 次操作。实际意义上等于无穷。

Shor 算法把它降到多项式时间。在一台拥有足够稳定、经过纠错的量子比特的量子计算机上，从公钥推导 secp256k1 私钥变得可行——分钟到小时级，而不是万亿年。

数学核心是求一个模难分解数定义的函数的周期。经典计算机对此举步维艰；量子计算机利用叠加态与量子傅里叶变换高效找到周期。整数分解和离散对数都可以归约为求周期。两者都倒在 Shor 面前。

## 为什么它是比特币的具体威胁

比特币密码学中两块直接暴露：

- **ECDSA**（2009 年以来的交易签名）：对任何已揭示的公钥，都可用 Shor 算法推出私钥。
- **Schnorr 签名**（[Taproot](/glossary/taproot) 起使用，[BIP-340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)）：同样的椭圆曲线假设，同样的脆弱性。

在链上直接暴露公钥的地址类型——[P2PK](/glossary/p2pk-pay-public-key)、复用过的 P2PKH/P2WPKH、所有 P2TR（Taproot）输出——今天就处在攻击面之内。任何运行节点的人都能看到公钥；保护那些币的，只是足够大的量子计算机尚不存在。

Shor 算法*不能*直接威胁的：比特币的哈希函数（[SHA-256](/glossary/hash)）与[工作量证明](/glossary/proof-work-pow)机制。它们面对的是 [Grover 算法](/glossary/grovers-algorithm)——一个弱得多的量子威胁。

## 需要多大规格

对 256 位椭圆曲线跑 Shor 算法，大约需要数千个纠错后的（逻辑）量子比特、跨越数百万门操作的持续量子相干，以及高到让纠错开销不失控的门保真度。具体门槛与当前硬件的差距见 [CRQC（密码学相关量子计算机）](/glossary/crqc-cryptographically-relevant-quantum-computer)。

一句话概括：今天的量子系统与「能在比特币相关规模上运行 Shor 算法的硬件」之间，在多个维度（量子比特数、错误率、相干时间）上隔着数量级。

## 现状

Shor 算法已在量子硬件上被实验性地用来分解小数字（15、21，偶尔更大）。这些演示在数学上成立，但规模上不值一提。没有任何公开演示接近在密码学相关密钥规模上分解整数或解离散对数。

竞赛在工程侧，不在算法侧。算法已经存在且原理有效。造出能大规模运行它的硬件才是悬而未决的问题——也是所有 [CRQC](/glossary/crqc-cryptographically-relevant-quantum-computer) 时间线估算的基础。

Shor 算法在比特币上究竟威胁什么——已测量的暴露公钥的币的规模——见深度专题[《量子计算与比特币》](/rabbit-holes/quantum-and-bitcoin)。

**相关词条：** [后量子比特币（Post-Quantum Bitcoin）](/glossary/post-quantum-bitcoin) · [Grover 算法（Grover's Algorithm）](/glossary/grovers-algorithm) · [CRQC（密码学相关量子计算机）](/glossary/crqc-cryptographically-relevant-quantum-computer) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [Schnorr 签名（Schnorr Signature）](/glossary/schnorr-signature) · [椭圆曲线（Elliptic Curve）](/glossary/elliptic-curve) · [BIP 361（后量子迁移）](/glossary/bip-361) · [P2PK（付给公钥）](/glossary/p2pk-pay-public-key) · [公钥（Public Key）](/glossary/public-key)
