---
title: 签名裁剪（Signature Clipping）
---

# 签名裁剪（Signature Clipping）

> **一句话定义：** 某些签名方案中的延展性/伪造技术；比特币的严格 sighash 规则缓解了这类漏洞。

「签名裁剪」并不是比特币圈的一个通行术语。它是 ECDSA 签名延展性的统称：拿到一个有效签名，再造出同一交易的另一个有效签名——含义不变，交易 ID（txid）却变了。

实际利用过两条路：

- **DER 编码的多样性。** ECDSA 签名包在 DER 里，而 DER 规范允许同一组数字的多种编码（多余的填充字节、可选的整数长度表示）。[BIP 66](/glossary/bip-66)（2015 年）强制严格 DER，非规范编码从此被打成非标准。
- **固有的 S 延展性。** 对任何有效的 ECDSA 签名 `(r, s)`，`(r, n − s)` 对同一消息同样有效。[Low-S 规则](/glossary/low-s-signatures)（BIP 62 提案、BIP 146 中继策略、BIP 141 对 SegWit 的共识强制）要求 s 小于曲线阶的一半，钉死唯一的规范形式。

SegWit（BIP 141）在协议层面彻底了结了这件事：签名数据被整体移出 txid 计算。对 SegWit 和 Taproot 输入，无论攻击者怎么折腾签名，txid 都纹丝不动。

在现代比特币里，签名延展性对新交易来说已经是被解决的问题。旧式 P2PKH 继承着 ECDSA 的数学性质，但在中继层强制执行严格 DER 加 Low-S 之后，实际攻击面已经消失。

**相关词条：** [椭圆曲线](/glossary/elliptic-curve) · [单一签名](/glossary/mono-signature) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [Schnorr 签名](/glossary/schnorr-signature) · [签名聚合](/glossary/signature-aggregation) · [Taproot](/glossary/taproot) · [BIP 66](/glossary/bip-66) · [Low-S 签名](/glossary/low-s-signatures) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141)
