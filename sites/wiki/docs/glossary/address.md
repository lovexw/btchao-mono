---
title: 地址（Address）
---

# 地址（Address）

> **一句话定义：** 代表比特币收款目标的一串字符（常以 1、3 或 bc1 开头），由公钥派生。

比特币地址是一小串字符，代表一笔支付的目标——它编码一个公钥（或一段脚本）的[哈希](/glossary/hash)，格式以便于复制、粘贴和扫描为目标。

网络上同时存在几种地址格式：

- **传统 / P2PKH** —— 以 `1` 开头。最早的格式，至今可用，但占用的区块空间比新格式多。
- **P2SH** —— 以 `3` 开头。付给脚本哈希，常用于多签或早期的「包装隔离见证」地址。
- **原生隔离见证 / Bech32** —— 以 `bc1q` 开头。由 [BIP-173](/glossary/bip-173-bech32) 引入：手续费更低、错误检测更强。
- **Taproot / Bech32m** —— 以 `bc1p` 开头。随 [Taproot](/glossary/taproot) 引入：隐私最好、签名最小，支持在链上看起来与单签毫无区别的高级脚本。

所有格式表达的都是同一个底层概念：「要花掉发到这里的 BTC，你必须给出满足这段地址所编码锁定条件的有效脚本和签名。」不同格式只是锁定脚本结构和链上足迹不同。

地址不是的几样东西：

- **不是你的身份。** 地址是目的地，不是账户。钱包通常会生成许多地址用于收款。
- **不是匿名的。** 链是完全公开的。一旦某个地址和你产生关联（交易所 KYC、公开捐赠、地址复用），触及它的每笔交易都能被回溯。参见[可替代性](/glossary/fungibility)。
- **不是永久的。** 大多数钱包为每笔入账生成全新地址。复用地址会把活动集中到一个可观察的桶里，泄露隐私。

收币时地址可以随便分享，而且要经常换新的。把任何地址的链上历史当作公开账本条目对待——因为它本来就是。

**相关词条：** [B32 地址](/glossary/b32-address) · [Bech32m](/glossary/bech32m) · [BIP 173](/glossary/bip-173-bech32) · [P2PKH](/glossary/p2pkh-pay-public-key-hash) · [P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2SH](/glossary/p2sh) · [Taproot](/glossary/taproot) · [地址复用](/glossary/address-reuse) · [虚荣地址](/glossary/vanity-address)
