---
title: BIP 32（HD 钱包）
---

# BIP 32（HD 钱包）

> **一句话定义：** Pieter Wuille 2012 年的确定性密钥派生标准：一颗种子长成一棵密钥树，一份备份即可全部恢复。

BIP 32 由 Pieter Wuille 于 2012 年 2 月撰写，是分层确定性（HD）比特币[钱包](/glossary/wallet)的奠基标准。一颗 512 位种子生成一棵密钥树，全部可从这一颗种子复现。备份了种子，就备份了钱包将来派生的每一把[私钥](/glossary/private-key)。

构造很直接。种子拆成一个 256 位主私钥和一个 256 位[链码](/glossary/chaincode)，两者捆在一起构成扩展私钥（`xprv`）。派生子密钥时，对父密钥、链码和子索引计算 HMAC-SHA512，输出给出子密钥和新链码。逐层重复，走遍整棵树。

两种派生模式值得记住：

- **非强化（normal，子索引 < 2^31）。** 子公钥可以从父公钥加链码直接派生。这正是 [xpub](/glossary/xpub-extended-public-key) 有用的原因：把 xpub 给别人，对方就能派生出所有收款地址，全程看不到任何私钥。
- **强化（hardened，子索引 ≥ 2^31）。** 派生需要父私钥。攻击者拿到一个强化子私钥，无法还原父密钥或其余兄弟。这封死了非强化派生上那类著名攻击。[BIP 44](/glossary/bip-44) 约定在账户层用强化派生，泄漏一个账户的密钥不会波及其他账户。

实践意义：

- **一次备份，无限地址。** 每笔交易用新地址，不必增加备份。
- **只读钱包。** 把 xpub 导入手机应用，监控[硬件钱包](/glossary/hardware-wallet)的余额而不暴露任何私钥。
- **多账户隔离。** [BIP 44](/glossary/bip-44) 用强化账户层隔离，一个账户暴露不殃及兄弟账户。
- **跨钱包可移植。** 在任何标准钱包恢复 BIP 32 种子，得到同一批地址。种子才是资产，软件是可替换的。

BIP 32 本身不规定种子如何生成和备份。那是 [BIP 39](/glossary/bip-39)——[助记词](/glossary/seed-phrase)。两者合起来构成现代比特币自我托管的地基。

规范：[BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)。

**相关词条：** [BIP 39（助记词种子）](/glossary/bip-39) · [BIP 44](/glossary/bip-44) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [链码（Chaincode）](/glossary/chaincode) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [密钥聚合（Key Aggregation）](/glossary/key-aggregation) · [助记词（Seed Phrase）](/glossary/seed-phrase) · [Xpub（扩展公钥）](/glossary/xpub-extended-public-key)
