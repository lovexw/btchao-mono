---
title: 原生隔离见证（Native SegWit）
---

# 原生隔离见证（Native SegWit）

> **一句话定义：** SegWit 引入的 bech32 地址格式（bc1q…）：手续费更低、免疫签名延展性。

「原生隔离见证」指用 bech32 地址（主网 `bc1q...`）使用 SegWit，而不是更早的 P2SH 包装式 SegWit（`3...` 地址）。两种方式下见证数据都放在交易分开的见证部分；差别在于链上编码。

为什么分「原生」和「包装」：

- **包装式 SegWit**（P2SH-P2WPKH、[P2SH-P2WSH](/glossary/p2sh-p2wsh-nested-segwit)）。把 SegWit 输出打扮成 P2SH 输出，让当时还不认识 bech32 的钱包也能付款给它。与一切兼容，但要为这层包装付开销。
- **原生 SegWit**（P2WPKH、P2WSH）。直接的 bech32 编码，没有包装。交易更小、手续费更低、安全性完全相同。要求付款方的钱包支持 bech32——如今所有现代钱包都支持。

原生 SegWit 是 SegWit 设计（BIP 141）更干净的终态，但生态为了平滑过渡先铺开了包装式。到 2026 年，原生 SegWit 已是新钱包的默认，包装式基本算历史遗留。

手续费节省真实但幅度温和：P2WPKH 花费比包装式便宜约 10–15%（按 vbyte 计）。再加上 [Taproot](/glossary/taproot)（`bc1p...`、[Bech32m](/glossary/bech32m)）还能再省一点、隐私更好，你就得到现代地址格式全家桶：旧钱包用传统 P2PKH（`1...`），过渡场合用包装式 SegWit（`3...`），当下使用原生 SegWit（`bc1q...`），前沿用 Taproot（`bc1p...`）。

2026 年给新钱包选地址类型：付款方支持就选 Taproot，否则选原生 SegWit。

**相关词条：** [Bech32m](/glossary/bech32m) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [P2SH-P2WSH（嵌套隔离见证）](/glossary/p2sh-p2wsh-nested-segwit) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [Taproot](/glossary/taproot)
