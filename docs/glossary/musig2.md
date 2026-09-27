---
title: MuSig2
---

# MuSig2

> **一句话定义：** MuSig 的实用继任者：把共签人之间的通信轮数降到两轮。

MuSig2 是初版 [MuSig](/glossary/musig) Schnorr 聚合协议的实用继任者，由 Jonas Nick、Tim Ruffing 和 Yannick Seurin 于 2020 年发表。它做同样的事——把 n 个共签人聚合成一个合并公钥加一个合并签名——但通信只要两轮而不是三轮，而且第一轮的 nonce 可以预计算、跨签名会话复用。

机制上改了什么：

- **MuSig1** 要求「先承诺、再揭示」nonce（三轮）：每个签名者先公布对自己 nonce 的承诺，再公布真正的 nonce，最后是部分签名。承诺-揭示这一步是防密钥抵消攻击的必需品。
- **MuSig2** 让每个签名者用两个独立 nonce 而非一个，以一种能挫败同类攻击的方式组合，从而不再需要承诺环节。两轮：交换 nonce 对，然后交换部分签名。

人体工学上这是实打实的升级。三轮意味着与每个签名者来回三次；两轮意味着两次。对于共签人分布在不同时区的闪电通道开路、多签花费签署和联盟签名协议，轮数的减少就是「签这玩意要一分钟」和「签这玩意要十秒」的差别。

性质（与 MuSig1 相同）：

- **仅 n-of-n。** 所有共签人必须参与；m-of-n 门限的对应方案是 FROST。
- **聚合公钥。** 共签人公钥的确定性函数。
- **64 字节签名。** 与 Taproot 单签一样大。
- **隐私。** 链上与 Taproot 密钥路径单签花费无从区分。

真正在生产工具里落地的是 MuSig2：BIP 327 于 2023 年将它标准化，libsecp256k1 有实现，硬件钱包在逐步支持。2026 年人们说「MuSig」时，几乎总是指 MuSig2。

**相关词条：** [PSBT（部分签名比特币交易）](/glossary/psbt) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [椭圆曲线（Elliptic Curve）](/glossary/elliptic-curve) · [HDM 多签名 HD 钱包](/glossary/hdm-multi-signature-hd-wallet) · [分层多签（Hierarchical Multisig）](/glossary/hierarchical-multisig) · [交互式多签（Interactive Multi-Sig）](/glossary/interactive-multi-sig) · [M-of-N 多签](/glossary/m-n) · [单一签名（Mono-Signature）](/glossary/mono-signature) · [MuSig](/glossary/musig) · [部分签名（Partial Signature）](/glossary/partial-signature) · [法定人数签名（Quorum Signatures）](/glossary/quorum-signatures) · [Schnorr 签名](/glossary/schnorr-signature) · [签名聚合（Signature Aggregation）](/glossary/signature-aggregation) · [签名裁剪（Signature Clipping）](/glossary/signature-clipping)
