---
title: P2SH-P2WSH（嵌套隔离见证）
---

# P2SH-P2WSH（嵌套隔离见证）

> **一句话定义：** P2WSH 输出套一层 P2SH 外壳：地址看起来像传统格式（`3` 开头），花费时却用 SegWit 见证数据。

P2SH-P2WSH——有时叫「嵌套隔离见证脚本」或「P2SH 包装的 P2WSH」——是一个包在 [P2SH](/glossary/p2sh) 外壳里的 [P2WSH](/glossary/p2wsh-pay-witness-script-hash) 输出。地址看起来是传统的（`3` 开头），但花费遵循 [SegWit](/glossary/segwit-segregated-witness-bip-141) 规则：赎回脚本只是承诺了一个 P2WSH 的 `scriptPubKey`，真正的见证数据则放在传统交易结构之外。

它存在的唯一理由：2017–2018 年 SegWit 推广期的向后兼容。

SegWit 2017 年 8 月激活时，多数钱包和交易所还不支持向原生 SegWit地址（`bc1q...`）付款。它们只知道怎么向 `3...` 地址付款（[P2SH](/glossary/p2sh) 从 2012 年起就有了，BIP-16）。为了让用户在生态追上来之前就用上 SegWit，钱包生成了 P2SH-P2WSH 地址：外表传统，内在 SegWit。付款方看到熟悉的 `3...` 地址；收款方拿到 SegWit 的手续费折扣和延展性修复。

包装如何运作：

- **收款。** 地址是一个短赎回脚本的哈希：`OP_0 <32字节脚本哈希>`，而它本身就是一个 P2WSH `scriptPubKey`。
- **花费。** 输入揭示那个赎回脚本（P2SH 语义），真正的花费脚本和签名放在见证栈里（SegWit 语义）。

实践上，这就是一次多包了一层的 P2WSH 花费。你为 P2SH 包装层付出字节成本，但拿到 SegWit 内在的大部分好处。

**在哪里能见到它：**

- 2017 年中到约 2019 年间生成的钱包——想要 SegWit 的好处又不想破坏付款方兼容性
- 那个年代的多签设置（Casa、Unchained、BitGo 等）常默认 P2SH-P2WSH
- 在生态普及 `bc1q` 之前就支持 SegWit 的硬件钱包

**当代面貌：**

- 新钱包默认[原生隔离见证](/glossary/native-segwit)（`bc1q...`）或 [Taproot](/glossary/taproot)（`bc1p...`），没有理由再嵌套了。
- 既有的 P2SH-P2WSH UTXO 永远可花——这个格式没有任何过期。
- 如果你持有这种 UTXO，挑个手续费便宜的日子把它扫进原生 SegWit 或 Taproot 地址：花一笔交易，换来日后更低的每次花费成本。

单签也有同样的模式：P2SH 包装的 [P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash) 给你一个按 SegWit 规则花费的 `3...` 地址。理由相同，现状也相同。

**相关词条：** [P2SH（付给脚本哈希）](/glossary/p2sh) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [原生隔离见证（Native SegWit）](/glossary/native-segwit) · [Taproot](/glossary/taproot) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash)
