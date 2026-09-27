---
title: P2SH（付给脚本哈希）
---

# P2SH（付给脚本哈希）

> **一句话定义：** 比特币第一次主要的地址格式升级（BIP 16，2012）：收款方只公布脚本的短哈希——地址以 `3` 开头——花费时才揭示脚本本身。

P2SH（Pay to Script Hash，付给脚本哈希）是让复杂[比特币脚本](/glossary/bitcoin-script)能够用作收款地址的脚本格式。由 BIP-16 引入，2012 年 4 月作为[软分叉](/glossary/soft-fork)激活，是 P2PKH 之后比特币第一次主要的地址格式升级。P2SH 地址以 `3` 开头（例如 `3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy`）。

## 机制

BIP-16 之前，如果你想用一个多签或其他复杂脚本收款，*付款方*必须知道完整脚本并把它写进输出——交易更长、隐私全无、体验别扭。P2SH 把这件事倒了过来：收款方只公布脚本的一个 20 字节哈希，真正的脚本等到花费时才揭示。

输出只是锁定到「哈希为 X 的那个脚本」。你日后花费时，揭示实际脚本（「赎回脚本」）以及它所要求的一切——签名、原像、时间锁检查等。

## 它促成了什么

- **多签钱包成为可用的原语。** P2SH 之前，多签理论上支持、实践上没法用；P2SH 之后，用户可以分享普通的 `3...` 地址，直接收款进多签设置。
- **成本转移。** 复杂脚本的字节成本由花费者（揭示脚本的一方）承担，而不是注资方。合理。
- **隐藏复杂性。** 链上看到的是地址而不是脚本结构——在花费之前，这是一种隐私优势。
- **后续格式升级的模板。** P2SH 的「先哈希、后揭示」模型直接影响了 [SegWit](/glossary/segwit-segregated-witness-bip-141) 的原生脚本哈希格式（[P2WSH](/glossary/p2wsh-pay-witness-script-hash)）和 Taproot。
- **SegWit 采用的桥梁。** 2017 年 SegWit 上线时，可以包在 P2SH 里（「P2SH-P2WPKH」），与当时还不认识原生 SegWit 的钱包兼容。P2SH 包装的 SegWit 地址同样以 `3` 开头，但按 SegWit 规则花费。

## 当代用法

P2SH 如今最常用于传统多签（基于 `OP_CHECKMULTISIG` 的脚本）和仍在部署中的包装式 SegWit 设置。现代继任者是 [P2WSH](/glossary/p2wsh-pay-witness-script-hash)（原生 SegWit 脚本哈希）和 [Taproot](/glossary/taproot) 脚本路径花费——两者都更便宜、性质更干净。

BIP-16 是最早的范例之一：一个小而精心设计的软分叉，可以在不改变基础协议本性的前提下，解锁全新类别的用法。

**相关词条：** [地址（Address）](/glossary/address) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [多签（Multisig）](/glossary/multisig) · [P2PKH（付给公钥哈希）](/glossary/p2pkh-pay-public-key-hash) · [P2PK（付给公钥）](/glossary/p2pk-pay-public-key) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [PSBT（部分签名比特币交易）](/glossary/psbt) · [脚本（Script）](/glossary/script) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [软分叉（Soft Fork）](/glossary/soft-fork) · [Taproot](/glossary/taproot)
