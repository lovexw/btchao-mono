---
title: P2WSH（付给见证脚本哈希）
---

# P2WSH（付给见证脚本哈希）

> **一句话定义：** P2SH 的原生隔离见证版本，用于高级脚本（如多签），地址以 bc1q 开头。

P2WSH（Pay to Witness Script Hash，付给见证脚本哈希）是 [P2SH](/glossary/p2sh) 的原生 [SegWit](/glossary/segwit-segregated-witness-bip-141) 版本。它把「付给脚本的哈希」的模型带进 SegWit 的见证结构，享受 SegWit 的全部好处：更低的实际手续费、没有延展性。

地址以 `bc1q` 开头，且明显比 [P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash) 地址长——因为 P2WSH 用的是 32 字节脚本哈希（SHA-256），而 P2WPKH 用的是 20 字节公钥哈希（SHA-256 之后再 RIPEMD-160）。更长的哈希提供更强的抗碰撞性，这对可能要跟潜在敌意对手方共享的脚本来说是有意义的。

实践中 P2WSH 用在哪里：

- **多签钱包。** 原生 SegWit 的 2-of-3、3-of-5 等。
- **复杂 HTLC。** 一些[闪电网络](/glossary/lightning-network)通道构造使用 P2WSH 输出。
- **任何有非平凡花费逻辑的场合。** 时间锁、哈希锁、金库构造。

对支持 Taproot 的设置而言，P2TR（[Taproot](/glossary/taproot)，见证版本 1）通常以更好的性质取代 P2WSH：MuSig2 聚合签名、MAST 隐藏脚本分支、更小的链上足迹、与单签无从区分的花费。2026 年，新的多签钱包通常默认 Taproot。P2WSH 仍大量用于较老的多签设置和尚未迁移的生态。

**相关词条：** [地址（Address）](/glossary/address) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2PKH（付给公钥哈希）](/glossary/p2pkh-pay-public-key-hash) · [P2PK（付给公钥）](/glossary/p2pk-pay-public-key) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output)
