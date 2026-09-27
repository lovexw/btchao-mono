---
title: MuSig
---

# MuSig

> **一句话定义：** 基于 Schnorr 的 n-of-n 多签聚合协议：多个公钥聚合成一个，链上只留一个签名——省空间、更隐私。

MuSig 是基于 Schnorr 的 n-of-n 多签聚合协议。多个共签人通过交互产出一个合并公钥和一个合并签名，在链上与一次标准的单签花费无从区分。由 Maxwell、Poelstra、Seurin 和 Wuille 于 2018 年首次发表。

初版 MuSig 有个微妙的问题：如果实现得天真——让签名者同时公开随机数（nonce）——会遭到密钥抵消攻击。修复要求带显式 nonce 承诺的三轮协议。能用，但共签人之间来回三轮，运营上很痛苦。

[MuSig2](/glossary/musig2)（2020，Nick / Ruffing / Seurin）在实践中取代了初版 MuSig。MuSig2 用不同的数学方法，仅两轮就达到同样的安全性，还有个额外好处：第一轮可以预计算、跨签名会话复用。如今几乎每个说「MuSig」的现代实现，实际指的都是 MuSig2。

两个版本共有的关键性质：

- **仅 n-of-n。** 所有共签人必须参与。m-of-n 门限设置请用 FROST（见[法定人数签名](/glossary/quorum-signatures)）。
- **聚合公钥。** 合并公钥是各共签人公钥的确定性函数，任何人都能算，不需要共享任何私钥材料。
- **单个 64 字节签名。** 与 Taproot 单签一样大。
- **隐私。** MuSig 花费看起来就是一次普通的 Taproot 密钥路径花费，共签人结构留在链下。

MuSig（2）在实践中的出场位置：

- **Taproot 之后闪电通道的协作关闭**可以用 MuSig2，让链上足迹与单签花费完全一致。
- **托管/机构多签。** 在隐私与手续费效率重要的场合，替代经典的 2-of-2 或 3-of-3。
- **联盟。** 较小的 n-of-n 联盟可以聚合签名；更大的门限联盟用 FROST。

如果你在研究现代比特币多签，文档里说「MuSig」，那就默认是 MuSig2，除非明确说明是旧版。初版如今基本只有历史价值。

**相关词条：** [PSBT（部分签名比特币交易）](/glossary/psbt) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [椭圆曲线（Elliptic Curve）](/glossary/elliptic-curve) · [HDM 多签名 HD 钱包](/glossary/hdm-multi-signature-hd-wallet) · [分层多签（Hierarchical Multisig）](/glossary/hierarchical-multisig) · [交互式多签（Interactive Multi-Sig）](/glossary/interactive-multi-sig) · [M-of-N 多签](/glossary/m-n) · [单一签名（Mono-Signature）](/glossary/mono-signature) · [MuSig2](/glossary/musig2) · [部分签名（Partial Signature）](/glossary/partial-signature) · [法定人数签名（Quorum Signatures）](/glossary/quorum-signatures) · [Schnorr 签名](/glossary/schnorr-signature) · [签名聚合（Signature Aggregation）](/glossary/signature-aggregation) · [签名裁剪（Signature Clipping）](/glossary/signature-clipping)
