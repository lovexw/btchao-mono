---
title: 链码（Chaincode）
---

# 链码（Chaincode）

> **一句话定义：** BIP 32 扩展密钥的 32 字节「右半」——与密钥材料配对派生子密钥；它的存在让 xpub 能派生整个地址树，也让 xpub 泄露成为隐私灾难。

链码（chaincode）是 BIP 32 扩展密钥的 32 字节「右半」。它与真正的密钥材料（「左半」）配对，构成扩展私钥（`xprv`）或扩展公钥（`xpub`）。

为什么要拆开。BIP 32 用 HMAC-SHA512 对父密钥、链码和子索引运算来派生子密钥。链码为派生注入额外熵——只知道父公钥不足以派生子密钥，还必须有链码。这正是 `xpub` 之所以是个真实工件的原因：它带着链码和公钥一起走，只读后代得以派生，而私密那一半不出门。

隐私含义很锋利：

- 链码加公钥（即 `xpub`）让任何人派生全部非强化子公钥。对只读钱包很有用；`xpub` 泄露则是灾难——一个泄露的 `xpub` 暴露该钱包的完整地址树，交易隐私彻底报废。把 `xpub` 当资产负债表对待，别当地址对待。
- 非强化派生下，链码加一个子私钥可以反推出父私钥。这就是「BIP 32 非强化泄露」，也是顶层账户要用强化派生（索引 2³¹ 及以上）的原因。Bitcoin Core、硬件钱包和一切正经 HD 钱包都在账户层级用强化派生，保证泄露一个子私钥不会殃及兄弟和祖先。

对用户，链码是看不见的管道。对开发者和集成者，它是「HD 钱包」区别于「确定性但脆弱的密钥生成」的那个承重细节。

**相关词条：** [地址派生路径（Address Derivation Path）](/glossary/address-derivation-path) · [BIP-44](/glossary/bip-44) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [HD 钱包（Hierarchical Deterministic Wallet）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [层级确定性钱包（Hierarchical Deterministic Wallet）](/glossary/hierarchical-deterministic-wallet) · [密钥生成仪式（Key Generation Ceremony）](/glossary/key-generation-ceremony) · [密钥轮换（Key Rotation）](/glossary/key-rotation) · [助记词（Seed Phrase）](/glossary/seed-phrase) · [xpub（扩展公钥）](/glossary/xpub-extended-public-key)
