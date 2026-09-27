---
title: Bech32m
---

# Bech32m

> **一句话定义：** 为 Taproot 设计的改进版 bech32 地址格式（BIP-350），错误检测能力更强。

Bech32m 是 [Taproot](/glossary/taproot) 以及未来所有更高版本 SegWit 所用的地址编码格式。主网上长成 `bc1p...`，测试网上是 `tb1p...`；字符集与最初的 [bech32](/glossary/bip-173-bech32) 完全相同，只是校验和常数不同。

另立新格式的原因，是 bech32 有个隐蔽的缺陷。原版 bech32 的校验和用的是常数 1，它与某些编辑距离特性相互作用得不好：一次手误（或攻击者）可以构造出一个地址的若干变体——数据已经变了，却仍能通过 bech32 校验。Pieter Wuille 在 2020 年发现了这个问题，随后提出 bech32m（BIP 350），改用新的校验和常数（`0x2bc830a3`）堵住了这个弱点。

实际使用中这样划分：

- **见证版本 0** 的输出（[P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash) 和 [P2WSH](/glossary/p2wsh-pay-witness-script-hash)，都是 `bc1q...`）继续用原版 bech32，保持向后兼容。这个弱点对 v0 实际无影响，因为 v0 不允许漏洞所利用的那种长度变体。
- **见证版本 1 及以上**（Taproot 的 `bc1p...` 和未来所有版本）用 bech32m。地址验证器根据解码出的第一个数据字节（即见证版本）自动选用正确的算法。

对用户来说，差别完全不可见——钱包会为生成的地址类型自动选对编码。这段历史真正有趣的地方在于：一次建设性的密码学社区评审，在实际伤害发生之前就抓住了漏洞；而比特币「靠软分叉升级」的模型，又干干净净地容纳了这个修复。

规范文档：[BIP-350](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki)。

**相关词条：** [BIP 173（Bech32）](/glossary/bip-173-bech32) · [地址](/glossary/address) · [Taproot](/glossary/taproot) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [原生隔离见证](/glossary/native-segwit) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [B32 地址](/glossary/b32-address)
