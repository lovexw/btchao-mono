---
title: B32 地址（B32 Address）
---

# B32 地址（B32 Address）

> **一句话定义：** bech32 地址的别称，指隔离见证（SegWit）引入的 base32 编码地址格式。

「B32」是 [bech32](/glossary/bip-173-bech32) 的非正式简称——BIP 173 定义、用于见证版本 0 隔离见证输出的地址格式。主网上这类地址以 `bc1q` 开头（P2WPKH 或 P2WSH）。

「B32」并不是比特币的正式术语，规范文档和钱包界面里几乎不出现。生态里大家就说「bech32」或「原生隔离见证地址」。收它进词表，是因为一些老文档用了这个叫法。

比起老格式，bech32 给你什么：

- **大小写不敏感。** 整个地址全小写，杜绝大小写抄错。
- **更强的查错能力。** BCH 校验和能抓住几乎所有单字符笔误和大多数多字符错误。打错地址，钱包通常会直接拒收，而不是把钱误发到另一个碰巧合法的地址。
- **二维码友好。** 受限字符集在二维码里编码效率更高。

见证版本 1 及以上（Taproot 和未来版本）用的是 [bech32m](/glossary/bech32m)——校验和略作调整，修掉了原版 bech32 的一个隐蔽缺陷。表面上地址长相差不多（Taproot 是 `bc1p...`），但用的是另一套校验器。

现代比特币用法：优先原生隔离见证（`bc1q...`）或 Taproot（`bc1p...`），而不是老的 `1...`（P2PKH）和 `3...`（P2SH 包裹）格式。手续费更低、查错更强、二维码更小。

**相关词条：** [地址](/glossary/address) · [Bech32m](/glossary/bech32m) · [BIP 173（Bech32）](/glossary/bip-173-bech32) · [P2PK（付给公钥）](/glossary/p2pk-pay-public-key) · [P2PKH（付给公钥哈希）](/glossary/p2pkh-pay-public-key-hash) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [静默支付](/glossary/silent-payments) · [隐形地址](/glossary/stealth-address) · [虚荣地址](/glossary/vanity-address)
