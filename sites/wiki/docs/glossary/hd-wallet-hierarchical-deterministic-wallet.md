---
title: HD 钱包（分层确定性钱包）
---

# HD 钱包（分层确定性钱包）

> **一句话定义：** 用 BIP 32 派生路径从一颗种子创建结构化密钥树的钱包。

分层确定性（HD）钱包是比特币钱包的标准设计：钱包将来需要的每一把钥匙，都从一颗根种子确定性派生。备份了种子，就备份了一切。

结构（定义于 [BIP 32](/glossary/bip-32)）：

- 一颗种子（通常是 12 或 24 个 [BIP 39](/glossary/bip-39) 助记词）加上可选密码短语，产生 512 位主种子。
- 主种子拆成主私钥和主链码。
- 子钥匙由（父钥匙、链码、索引）的 HMAC-SHA512 派生。每个子钥匙自己又是父钥匙，能继续派生子钥匙——树就这样长出来。
- 标准化路径（BIP 44 传统、BIP 49 包裹 SegWit、BIP 84 原生 SegWit、BIP 86 Taproot）让所有钱包精确知道去哪找地址。

HD 钱包为什么一统江湖：

- **一次备份覆盖一切。** 抄下 12 或 24 个词，钱包将来生成的每个地址、每个账户，全部备份完毕，上不封顶。
- **跨钱包可移植。** 把 BIP 39 种子导入任何合规钱包（Sparrow、BlueWallet、Electrum、Trezor，随便），得到同一批地址。
- **支持只读监控。** 把 [xpub](/glossary/xpub-extended-public-key)（扩展公钥）交给别人，对方能派生全部收款地址，却见不到任何私钥。记账、对账、硬件钱包配只读手机应用，都靠这个。
- **多账户隔离。** BIP 44/84/86 的路径结构里有账户层，一颗种子就能维护逻辑上分开的多个钱包（`account 0` 私用、`account 1` 营业，等等）。
- **与硬件钱包天然契合。** 硬件设备存种子，软件钱包只见 xpub。标准化派生路径让任何兼容软件都能配任何兼容硬件。

HD 钱包不是什么：

- **隐私万能药。** 每个分支的子钥匙共享同一条链码；谁拿到 xpub，就能派生该分支下所有非加固子钥匙。加固派生（顶层路径用的那种）能阻止这种暴露沿树向上蔓延。
- **备份替代品。** 种子仍是单点故障。种子没了，一切没了。硬件钱包和多签是在 HD 之上加的韧性层。

2014–2016 年间，随着 BIP 32/39/44 实现成熟，HD 钱包成为标配。今天，凡值得一用的钱包都是 HD 钱包，「种子」是普适的备份原语。

**相关词条：** [地址派生路径](/glossary/address-derivation-path) · [BIP 44](/glossary/bip-44) · [BIP 85](/glossary/bip-85) · [Bitcoin Dev Kit（BDK）](/glossary/bitcoin-dev-kit-bdk) · [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [比特币金库](/glossary/bitcoin-vault) · [链码](/glossary/chaincode) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [托管钱包](/glossary/custodial-wallet) · [确定性钱包](/glossary/deterministic-wallet) · [图形钱包](/glossary/gui-wallet) · [硬件种子金库](/glossary/hardware-seed-vault) · [硬件钱包](/glossary/hardware-wallet) · [HDM（多签 HD 钱包）](/glossary/hdm-multi-signature-hd-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [继承种子备份](/glossary/inheritance-seed-backup) · [助记词](/glossary/seed-phrase) · [钱包](/glossary/wallet) · [钱包导入格式（WIF）](/glossary/wallet-import-format-wif) · [扩展公钥（xpub）](/glossary/xpub-extended-public-key)
