---
title: Low-S 签名——终结 ECDSA 延展性的规则
---

# Low-S 签名——终结 ECDSA 延展性的规则

> **一句话定义：** 每个有效 ECDSA 签名都有第二个同样有效的版本。Low-S 消灭了这种歧义——原理与意义在此。

ECDSA 签名有一种与生俱来的延展性：对任何有效的 `(r, s)`，`(r, n − s)`（`n` 为 secp256k1 曲线阶）也是同一消息上的有效签名。攻击者可以抓起你尚未确认的交易，把 S 翻转一下重新广播——签名含义完全相同，交易 ID（txid）却变了。

Low-S 规则钉死了唯一的规范形式：要求 `s ≤ n/2`，S 取值范围的上半区直接判为无效。从此，每对（钥匙，消息）恰好只有一个 Low-S 签名。

历史脉络：最早作为 BIP 62 的一部分提出（BIP 62 作为统一的延展性修复方案始终未能整体激活），后经 BIP 146 成为中继策略，最终在 BIP 141 中对 SegWit 输入成为共识强制规则。SegWit 之前的旧式输入在共识规则上技术上仍接受高 S，但中继策略把高 S 交易打成非标准交易，令其无法传播。

配合 BIP 66 的严格 DER 编码与 SegWit 把签名数据移出 txid 哈希，Low-S 实际上终结了比特币上的签名延展性。

**相关词条：** [BIP 66](/glossary/bip-66) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [Low-R 签名](/glossary/low-r-signatures) · [Schnorr 签名](/glossary/schnorr-signature)
