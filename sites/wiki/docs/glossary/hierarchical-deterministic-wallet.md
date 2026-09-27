---
title: 分层确定性钱包（Hierarchical Deterministic Wallet）
---

# 分层确定性钱包（Hierarchical Deterministic Wallet）

> **一句话定义：** 所有地址与私钥都从单一助记词或主种子派生的钱包（同义词：HD 钱包）。

分层确定性（HD）钱包：每一把[私钥](/glossary/private-key)、每一个[地址](/glossary/address)，都从一颗主种子确定性派生。种子备份一次，钱包已生成和将来会生成的所有钥匙就全部备份了。

HD 设计由三个 [BIP](/glossary/bip-bitcoin-improvement-proposal) 共同规定：

- **[BIP 32](/glossary/bip-32)**——主派生算法。定义如何把主种子变成一棵子钥匙树，用 HMAC-SHA-512 做确定性派生而不泄漏父钥匙。
- **[BIP 39](/glossary/bip-39)**——种子到单词的编码（12/24 词的[助记词](/glossary/seed-phrase)）。
- **[BIP 44](/glossary/bip-44)**——标准化派生路径结构（`m/purpose'/coin'/account'/change/index`），让不同钱包软件能互相发现对方的账户和地址。

实际意义：

- **备份轻而易举。** 抄下 12 或 24 个词。完事。现在和未来的钥匙全覆盖。
- **每笔交易一个新地址。** 不复用，隐私更好，备份零负担。
- **种子可移植。** 在完全不同的软件（Sparrow、Electrum、Bitcoin Core、Trezor Suite）里恢复钱包，它能重派同样的钥匙、找回同样的币。
- **可以做只读模式。** 把扩展公钥（[xpub](/glossary/xpub-extended-public-key)）交给另一个工具，它能派生收款地址而接触不到任何私钥。

如今几乎所有现代比特币钱包都是 HD。2013 年以前的钱包（早期 Bitcoin Core、Bitcoin-Qt）生成随机独立钥匙，每笔交易后都得备份钱包文件——糟糕得多的体验，已被彻底淘汰十余年。

**相关词条：** [地址派生路径](/glossary/address-derivation-path) · [BIP 44](/glossary/bip-44) · [BIP 85](/glossary/bip-85) · [Bitcoin Dev Kit（BDK）](/glossary/bitcoin-dev-kit-bdk) · [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [比特币金库](/glossary/bitcoin-vault) · [链码](/glossary/chaincode) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [托管钱包](/glossary/custodial-wallet) · [确定性钱包](/glossary/deterministic-wallet) · [图形钱包](/glossary/gui-wallet) · [硬件种子金库](/glossary/hardware-seed-vault) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [硬件钱包](/glossary/hardware-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [HDM（多签 HD 钱包）](/glossary/hdm-multi-signature-hd-wallet) · [分层多签](/glossary/hierarchical-multisig) · [继承种子备份](/glossary/inheritance-seed-backup) · [助记词](/glossary/seed-phrase) · [钱包](/glossary/wallet) · [钱包导入格式（WIF）](/glossary/wallet-import-format-wif) · [扩展公钥（xpub）](/glossary/xpub-extended-public-key)
