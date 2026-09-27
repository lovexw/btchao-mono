---
title: BIP-85（多种子派生）
---

# BIP-85（多种子派生）

> **一句话定义：** 从单一主种子确定性派生多个独立子种子（各自完整的钱包）的标准——一次备份管所有钱包。

[BIP-85](https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki) 定义了一种确定性方法：从单个 [BIP-32](/glossary/bip-32) 主钱包派生子秘密——典型产物是全新的 [BIP-39](/glossary/bip-39) 助记词，但也支持 WIF 私钥、HD 种子字节或任意 256 位熵等其他格式。每个子钱包在运行时完全独立，但都能用「主种子 + 派生路径」复现出来。

为什么这很实用：

- **一次备份，多个钱包。** 持有一个精心保护的主种子的用户，可以确定性生成多个「子钱包」各自的种子——日常开销一个、储蓄一个、给家人一个……备份全部归结到主种子。
- **秘密可复现，而非随机。** 弄丢了某个子钱包的助记词？用主种子加路径重新派生即可，不用为每个子钱包单独做备份。
- **通用熵源。** BIP-85 还能派生非助记词输出——PGP 密钥、密码种子、任意应用需要的确定性随机字节，全部锚定在一个已备份的源头。

代价：**主种子成了灾难性单点故障。** 主种子一旦泄露，所有子钱包同时沦陷。对操作安全性过硬的用户（硬件钱包、稳妥的备份存储），这种集中化可以接受；对密钥卫生习惯差的用户，它可能比独立种子更糟。

BIP-85 已被 Bitcoin Core、主流硬件钱包（Trezor、Foundation Passport 等）和多个钱包技术栈广泛支持。它就是「我想要多个钱包，但只想守护一份备份」的标准答案。

BIP-85 所构建的 BIP-32 框架，见[层级确定性钱包](/glossary/hierarchical-deterministic-wallet)。

**相关词条：** [地址派生路径（Address Derivation Path）](/glossary/address-derivation-path) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP-44](/glossary/bip-44) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [HD 钱包（Hierarchical Deterministic Wallet）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [层级确定性钱包（Hierarchical Deterministic Wallet）](/glossary/hierarchical-deterministic-wallet) · [密钥生成仪式（Key Generation Ceremony）](/glossary/key-generation-ceremony) · [助记词（Seed Phrase）](/glossary/seed-phrase) · [xpub（扩展公钥）](/glossary/xpub-extended-public-key)
