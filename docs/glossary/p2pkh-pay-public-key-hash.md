---
title: P2PKH（付给公钥哈希）
---

# P2PKH（付给公钥哈希）

> **一句话定义：** 主流的传统脚本格式（地址以「1」开头）：把 BTC 锁到公钥的哈希上。

P2PKH（Pay to Public Key Hash，付给公钥哈希）是比特币最初的主流脚本格式。它的[地址](/glossary/address)以 `1` 开头（例如 `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`）。

锁定脚本很直白：「要花这个 UTXO，请提供一把哈希后等于特定 20 字节值的[公钥](/glossary/public-key)，以及对花费交易的有效签名。」收款方只公布哈希（也就是地址）；真正的公钥要等到花钱那一刻才亮相。

P2PKH 在 2010 年前后取代更老的 [P2PK](/glossary/p2pk-pay-public-key)，有两个原因：

- **地址更短。** 哈希 20 字节，公钥 33 字节。复制、分享、口述都更省事。
- **纵深防御。** 万一底层椭圆曲线密码被击穿（即[后量子场景](/glossary/post-quantum-bitcoin)），未花费的 P2PKH 地址里的资金还有哈希这层保护。公钥只在用户花费时才暴露。复用的地址在第一次花费后就失去这层保护。

P2PKH 当了十几年比特币的主力格式。它至今被完整支持、完全安全，只是手续费比新格式贵。现代钱包的新收款默认走 [P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash)（隔离见证，`bc1q...`）或 [P2TR](/glossary/taproot)（Taproot，`bc1p...`）。存量的 P2PKH UTXO 通常被花费到新格式的找零地址，供应量在渐进迁移。

比特币今天并存的全部地址格式，见[地址](/glossary/address)。

**相关词条：** [地址](/glossary/address) · [B32 地址](/glossary/b32-address) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [P2PK（付给公钥）](/glossary/p2pk-pay-public-key) · [后量子比特币](/glossary/post-quantum-bitcoin) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output) · [Taproot](/glossary/taproot)
