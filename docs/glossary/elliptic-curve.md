---
title: 椭圆曲线（Elliptic Curve）
---

# 椭圆曲线（Elliptic Curve）

> **一句话定义：** 比特币密码学的地基——secp256k1 曲线，公私钥对由它生成。

比特币的[公钥密码学](/glossary/public-key)建立在一条具体的椭圆曲线上：**secp256k1**。中本聪在最初的比特币设计里选定了它，此后每一笔比特币签名都以它为骨干。

关键的数学性质：椭圆曲线让你能做「单向运算」。把一个公开的曲线点 G 乘以一个秘密数字 k，得到另一个点 P——这很容易。反方向——已知 P 求 k——对任何现实中的攻击者来说计算上不可行。这种不对称就是**椭圆曲线离散对数问题**，比特币的整个所有权模型都押在它保持困难上。

落到实践：

- 你的[私钥](/glossary/private-key)就是一个介于 1 与约 2^256 之间的数字 k。
- 你的[公钥](/glossary/public-key)就是 secp256k1 曲线上的点 P = k*G。
- 给交易签名，就是在不泄露 k 的前提下证明你知道 k——用的还是同一套单向数学。

世上还有别的椭圆曲线（ed25519、NIST P-256 等）。比特币坚持用 secp256k1，一是兼容性，二是这条曲线作为地球上被攻击最多的密码学目标之一，十六年来没有被发现任何像样的漏洞。

最现实的威胁，是一台足够强大的量子计算机跑 [Shor 算法](/glossary/shors-algorithm)——原则上它攻得破椭圆曲线离散对数。这是真担忧，但不迫在眉睫。在花费前不暴露公钥的地址类型（[P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash)、[Taproot](/glossary/taproot)）已经为那个未来多买了几层纵深防御——不过 Taproot 是个部分例外（bech32m 地址本身就是调整后的公钥，前面没有哈希层）。迁移框架见[后量子比特币](/glossary/post-quantum-bitcoin)；至于 2^256 为什么远比你的直觉更大，见[密钥空间专题](/rabbit-holes/key-space)。

**相关词条：** [BIP 66](/glossary/bip-66) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [后量子比特币（Post-Quantum Bitcoin）](/glossary/post-quantum-bitcoin) · [Schnorr 签名](/glossary/schnorr-signature) · [Shor 算法（Shor's Algorithm）](/glossary/shors-algorithm) · [签名聚合（Signature Aggregation）](/glossary/signature-aggregation) · [签名裁剪（Signature Clipping）](/glossary/signature-clipping)
