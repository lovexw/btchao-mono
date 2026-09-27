---
title: P2WPKH（付给见证公钥哈希）
---

# P2WPKH（付给见证公钥哈希）

> **一句话定义：** 原生隔离见证单签格式（bech32，bc1q… 开头）：降费且免疫签名延展性。

P2WPKH（Pay to Witness Public Key Hash，付给见证公钥哈希）是 [P2PKH](/glossary/p2pkh-pay-public-key-hash) 的原生 [SegWit](/glossary/segwit-segregated-witness-bip-141) 版本，也是 SegWit 于 2017 年激活后成为标准的单签地址格式。地址以 `bc1q` 开头（例如 `bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq`）。

功能上与 P2PKH 完全一致：锁到一个 20 字节[公钥](/glossary/public-key)哈希上，用公钥加签名解锁。变化在于**签名数据放在哪里**。

SegWit 把解锁数据（「见证」witness）从交易主体中分离出来。这带来两个实际结果：

- **实际手续费更低。** 见证数据按非见证数据 1/4 的权重计费。一笔典型的 P2WPKH 花费比等价 P2PKH 便宜约 40%。
- **交易不再有延展性。** [交易 ID](/glossary/transaction) 只对非见证部分计算。广播之后签名再怎么被篡改也改不动 txid。这正是[闪电网络](/glossary/lightning-network)得以实际部署的前提。

2018 到约 2023 年，P2WPKH 是新收款的主导格式。到 2026 年，不少钱包的默认又转向了 [P2TR](/glossary/taproot)（Taproot，`bc1p...`），以获得更低的费用和更好的隐私。P2WPKH 仍被完整支持，比 P2PKH/P2SH 便宜，日常使用完全没问题。

和 P2PKH 一样，P2WPKH 对[后量子威胁](/glossary/post-quantum-bitcoin)提供纵深防御：公钥以哈希形式藏在地址里，只在花费时暴露。只用一次的 P2WPKH 地址今天就是抗量子的；复用的不是——花费见证里含原始公钥，之后每一笔存入都继承这份暴露。

**相关词条：** [地址](/glossary/address) · [BIP 85](/glossary/bip-85) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [P2PKH（付给公钥哈希）](/glossary/p2pkh-pay-public-key-hash) · [P2PK（付给公钥）](/glossary/p2pk-pay-public-key) · [后量子比特币](/glossary/post-quantum-bitcoin) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [闪电网络](/glossary/lightning-network) · [Taproot](/glossary/taproot)
