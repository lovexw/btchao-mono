---
title: Taproot
---

# Taproot

> **一句话定义：** 2021 年软分叉（BIP 340/341/342）：带来 Schnorr 签名、Taproot 输出与 Tapscript。无论底层脚本是什么，每个 Taproot 输出在链上都长得一样。

Taproot 是 2021 年 11 月在区块高度 709,632 激活的比特币软分叉，把两项密码学升级带进协议：[Schnorr 签名](/glossary/schnorr-signature)（[BIP-340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)）与 Taproot 本体（[BIP-341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)，由 Pieter Wuille、Jonas Nick、Anthony Towns 起草），外加用于高级花费条件的新脚本语言 Tapscript（[BIP-342](https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki)）。

招牌特性是：**每个 Taproot 输出在链上都长得一样**。无论它是单签花费、7-of-11 多签，还是带时间锁和哈希原像的复杂脚本，链上的花费都只是针对一个 32 字节公钥的一个 64 字节 Schnorr 签名。观察者分不出来。这对隐私是巨大利好。

Taproot 地址以 `bc1p` 开头（[bech32m](/glossary/bech32m) 编码）。

## 工作原理

一个 Taproot 输出承诺于一个公钥（「内部密钥」）、一棵备选花费脚本树（脚本路径），或两者兼有。

两条花费路径：

1. **密钥路径花费。** 如果多签或复杂合约的所有参与方达成一致，他们可以用聚合公钥（通过 [MuSig2](/glossary/signature-aggregation)）集体签名。链上的花费看起来就是一次单签；观察者既看不出存在脚本路径，也看不出那些路径本来是什么。这是常见情形，也是比特币拥有的最私密、最便宜的花费类型。
2. **脚本路径花费（MAST）。** 如果达不成一致——有人离线、时间锁触发、或需要启用备份分支——一方可以只揭示*实际执行的那一个脚本分支*，附上一个默克尔证明，证明它在原输出中被承诺过。其他分支保持隐藏。

这个组合意味着：复杂合约在「一切顺利」（所有人合作签名）时几乎零链上成本，在「出了状况」时只揭示严格必要的分支。

## 它解锁了什么

- **MuSig2 / FROST 聚合。** 多个共同签名方对同一个内部密钥产出一个 Schnorr 签名。一个 5-of-7 联盟花费 Taproot 输出，与单签钱包无从区分。
- **闪电通道隐私。** 合作关闭的通道看起来与任何普通 Taproot 密钥路径花费无异，不再明晃晃写着「2-of-2 多签关闭」。
- **便宜的多签。** 为你实际使用的那个签名付费，而不是为你承诺过的所有密钥付费。
- **更少的链上数据。** Schnorr 签名固定 64 字节，而 ECDSA 经 [low-R](/glossary/low-r-signatures) 碾磨后约 71-72 字节。
- **更干净的密码学。** Schnorr 的安全证明比 ECDSA 更紧。
- **未来协议的地基。** [静默支付](/glossary/silent-payments)、谨慎日志合约（DLC）和新的闪电构造都受益于 Taproot 原语。

## 采用

Taproot 的采用花了几年时间渗透到钱包软件、硬件钱包和基础设施。截至 2026 年它已被广泛支持，主流钱包的新收款操作大多默认 Taproot 地址，`bc1p...` 在新地址中的占比可观且持续增长。

一个值得点名的结构特性：Taproot 输出把调整后的公钥直接放在 bech32m 地址里——前面没有哈希层。因此每个 P2TR 输出在[后量子](/glossary/post-quantum-bitcoin)意义上都是「始终暴露」的：公钥从输出创建起就在链上，无论是否被花费过。这个取舍换来的是复杂合约的密钥路径隐私与效率。等后量子签名到来时，解法是新增一种输出类型，而不是抛弃 Taproot。

构建模块见 [Schnorr 签名](/glossary/schnorr-signature)与[签名聚合（Signature Aggregation）](/glossary/signature-aggregation)。

Taproot 的激活过程，见深度专题[《BIP 流程》](/rabbit-holes/bip-process)。

**相关词条：** [Schnorr 签名（Schnorr Signature）](/glossary/schnorr-signature) · [签名聚合（Signature Aggregation）](/glossary/signature-aggregation) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [Bech32m](/glossary/bech32m) · [BIP 342（Tapscript）](/glossary/bip-342-tapscript) · [MAST（默克尔化抽象语法树）](/glossary/merkleized-abstract-syntax-tree-mast) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [静默支付（Silent Payments）](/glossary/silent-payments) · [Low-R 签名（Low-R Signatures）](/glossary/low-r-signatures) · [后量子比特币（Post-Quantum Bitcoin）](/glossary/post-quantum-bitcoin) · [软分叉（Soft Fork）](/glossary/soft-fork)
