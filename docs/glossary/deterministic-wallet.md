---
title: 确定性钱包（Deterministic Wallet）
---

# 确定性钱包（Deterministic Wallet）

> **一句话定义：** 用单一种子派生全部子密钥的钱包（BIP 32/44），简化备份与密钥管理。

确定性钱包的每一把[私钥](/glossary/private-key)，都从一个起始秘密用算法派生。同一颗种子进，同一批钥匙出，在任何兼容软件上都如此，永远。这是现代比特币钱包的定义性特征。

在确定性钱包之前，你用的是*随机*钱包：每个新地址来自一把独立生成的私钥，钱包备份必须把它们全部收录。花一笔、生成个新地址，就得重新备份一次。交易完忘了备份？那部分资金就悬了。2010–2012 年间，真有用户这样真金白银地丢过比特币。

确定性的解法：一颗主种子（熵），一套派生算法，无限子钥匙。种子备份一次，钥匙按需重派。

主流标准是 [BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)，它在基础确定性之上加了**分层**结构（即 [HD 钱包](/glossary/hd-wallet-hierarchical-deterministic-wallet)）。到 2026 年，「确定性钱包」和「HD 钱包」在实际语境里几乎可以互换——因为市面上所有确定性钱包用的都是分层扩展。

最起码的几个性质：

- **一次备份。** [助记词](/glossary/seed-phrase)抄一次，全部可恢复。
- **可移植。** 同一颗种子在不同软件（Sparrow、Electrum、Bitcoin Core、硬件钱包）里恢复出同一个钱包，只要双方都实现标准。
- **可复现。** 给同样的种子，两个不同的钱包能独立派生出同样的地址。验证、找回、只读监控都靠它。

偶尔还能见到的非 HD 设计叫 **JBOK**（"Just a Bunch Of Keys"，一堆钥匙）——就是随机钱包模式。如今基本是历史陈迹兼反面教材。用 HD。

想看 BIP 32 分层结构的正统版本，读[分层确定性钱包](/glossary/hierarchical-deterministic-wallet)；驱动这一切的人类可读备份，见[助记词](/glossary/seed-phrase)。

**相关词条：** [地址派生路径](/glossary/address-derivation-path) · [BIP 44](/glossary/bip-44) · [BIP 85](/glossary/bip-85) · [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [比特币金库](/glossary/bitcoin-vault) · [链码](/glossary/chaincode) · [硬币控制](/glossary/coin-control) · [托管钱包](/glossary/custodial-wallet) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [硬件钱包](/glossary/hardware-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [密钥生成仪式](/glossary/key-generation-ceremony) · [助记词](/glossary/seed-phrase) · [钱包导入格式（WIF）](/glossary/wallet-import-format-wif) · [扩展公钥（xpub）](/glossary/xpub-extended-public-key)
