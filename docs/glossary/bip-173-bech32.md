---
title: BIP 173（Bech32）
---

# BIP 173（Bech32）

> **一句话定义：** 引入 bech32 地址格式：兼容 SegWit、错误检测更强的编码。

[BIP-173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki) 定义了 **bech32**——原生 [SegWit](/glossary/segwit-segregated-witness-bip-141) 输出所用的地址格式。bech32 地址一眼可辨：主网前缀 `bc1q`，测试网 `tb1q`。

bech32 为什么存在、为什么值得在意：

- **更强的错误检测。** bech32 的校验和在数学上专门针对笔误和相邻字符对调设计——恰恰是人类真正会犯的错。之前的 Base58Check 格式也很强，但不如它严格；bech32 能拦下更多错误，且数学保证更硬。
- **只含小写字母和数字。** bech32 只用 `0-9` 和 `a-z`，并剔除了容易看混的字符（如 `1/l/I`、`0/O/b`）。念出来、电话里口述、手动重新输入，都更省事。
- **对二维码友好。** 全小写的 bech32 生成的二维码比大小写混合的 Base58 更小。钱包在二维码里把 bech32 地址渲染成全大写，还能再紧凑一档，同时依然有效。
- **原生 SegWit 支持。** 这是它的本职：bech32 就是为见证版本 0 设计的地址格式。从 bech32 地址花费，比传统 P2PKH 省约 30–40% 手续费。

bech32 由 Bitcoin Core 开发者 Pieter Wuille 设计，2017 年提出，此后逐渐成为新 SegWit 部署的默认地址格式。

它的后继者 **bech32m**（[BIP-350](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki)）服务于 [Taproot](/glossary/taproot) 地址（前缀 `bc1p`）。格式基本一样，只换了一个常数，修复了 bech32 在新见证版本下才要紧的那个隐蔽弱点。

到 2026 年，大多数钱包的新收款地址默认就是 bech32 或 bech32m。旧格式（`1...`、`3...`）仍然可用，但在日常使用中正逐步退场。bech32/bech32m 外面裹的脚本格式，见 [P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash) 与 [Taproot](/glossary/taproot)。

**相关词条：** [地址](/glossary/address) · [Bech32m](/glossary/bech32m) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [原生隔离见证](/glossary/native-segwit) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [B32 地址](/glossary/b32-address) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal)
