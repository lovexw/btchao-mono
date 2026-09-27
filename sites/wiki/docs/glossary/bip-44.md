---
title: BIP 44
---

# BIP 44

> **一句话定义：** 扩展 BIP 32 的 HD 钱包框架，支持多账户、多币种与组织结构。

[BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) 为[分层确定性钱包](/glossary/hierarchical-deterministic-wallet)定义标准的派生路径结构。正是这套约定，让你在一个钱包备份[助记词](/glossary/seed-phrase)，恢复到任何兼容 BIP-44 的钱包时得到同样的账户。

路径结构：

```
m / purpose' / coin_type' / account' / change / address_index
```

具体地，第一个比特币账户的第一个收款地址是：

```
m / 44' / 0' / 0' / 0 / 0
```

各层含义：

- **44'**——purpose 编号，BIP-44 式派生固定为 44。（其他 purpose 存在：49' 是 P2SH 包装 SegWit，84' 是原生 SegWit，86' 是 Taproot。）
- **0'**——币种类型，比特币是 0。其他链在 [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) 里各有编号。
- **0'**——账户编号。一个钱包里可以有分开的「账户」（比如储蓄与日常开销）。
- **0**——找零标志。0 = 收款地址，1 = 内部找零地址。
- **0**——地址索引。每要一个新地址就递增。

路径里的撇号表示「强化（hardened）」派生——不能仅凭父级扩展**公钥**派生的一层。这防止一个暴露的 xpub 危及钱包层级的其余部分。

BIP-44 是把「备份你的助记词」变成可移植、可靠、跨实现标准的那个规范。几乎每个现代钱包都遵循它（或针对不同地址类型的 BIP-49 / BIP-84 / BIP-86 变体）。它构建于其上的 [BIP-32](/glossary/bip-32) 框架，见[分层确定性钱包](/glossary/hierarchical-deterministic-wallet)。

**相关词条：** [地址派生路径（Address Derivation Path）](/glossary/address-derivation-path) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [助记词（Seed Phrase）](/glossary/seed-phrase) · [Xpub（扩展公钥）](/glossary/xpub-extended-public-key)
