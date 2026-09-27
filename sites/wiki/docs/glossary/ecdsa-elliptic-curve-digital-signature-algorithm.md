---
title: ECDSA（椭圆曲线数字签名算法）
---

# ECDSA（椭圆曲线数字签名算法）

> **一句话定义：** 比特币原有的签名方案，用于验证所有权；Taproot 的 Schnorr 出现前一直使用。

ECDSA 是比特币最初的数字签名方案。自 2009 年起，网络就是靠它验证：花掉某个 UTXO 的人，真的掌控着该 UTXO 对应的[私钥](/glossary/private-key)。

机制建立在 [secp256k1 椭圆曲线](/glossary/elliptic-curve)上。大致流程：

1. 持有私钥 `k` 的签名者产出一个签名 `(r, s)`，它取决于 `k`、被签名的消息，以及一个随机选取的临时数（nonce）。
2. 任何持有对应[公钥](/glossary/public-key)的人都能验证这个签名在数学上自洽——也就是说，签名者必然知道 `k`。
3. 验证者在此过程中对 `k` 本身一无所知。

生产级 ECDSA 实现还必须遵守严格的[常数时间](/glossary/constant-time)纪律：签名里的模乘步骤若实现得天真，会通过时间侧信道泄露密钥位。Bitcoin Core 的 libsecp256k1 是生产密码学中常数时间实现打磨得最认真的代码库之一。

ECDSA 能用，但有几处恼人：

- **签名延展性。** 一个有效签名 `(r, s)` 可以被轻松改写成 `(r, n − s)`（`n` 是曲线阶），两者对同一消息、同一公钥都验证通过。这给交易 ID 的稳定性制造过真实的麻烦，后来被 [SegWit](/glossary/segwit-segregated-witness-bip-141) 部分修复。
- **没有原生聚合。** 多签输出的五个联署人产出五个独立签名，各自占用链上空间，没有干净的压缩办法。
- **证明略别扭。** ECDSA 的可证明安全性结果比 Schnorr 的更乱。

[Schnorr 签名](/glossary/schnorr-signature)（2021 年 11 月随 [Taproot](/glossary/taproot) 激活）把这三个问题都解决了。ECDSA 仍用于旧式地址类型（P2PKH、P2SH、P2WPKH、P2WSH），仍是生产比特币中经受检验最充分的签名方案。新的 Taproot 输出默认用 Schnorr。

ECDSA 的安全性建立在椭圆曲线离散对数问题的计算难度上。这个假设会被足够强大的量子计算机上运行的 [Shor 算法](/glossary/shors-algorithm)击穿。迁移框架见[后量子比特币](/glossary/post-quantum-bitcoin)。

**相关词条：** [适配器签名](/glossary/adapter-signature) · [BIP 66](/glossary/bip-66) · [常数时间实现](/glossary/constant-time) · [椭圆曲线](/glossary/elliptic-curve) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [后量子比特币](/glossary/post-quantum-bitcoin) · [Schnorr 签名](/glossary/schnorr-signature) · [Shor 算法](/glossary/shors-algorithm) · [签名聚合](/glossary/signature-aggregation) · [签名裁剪](/glossary/signature-clipping) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141)
