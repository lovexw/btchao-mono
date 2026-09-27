---
title: SegWit（隔离见证，BIP 141）
---

# SegWit（隔离见证，BIP 141）

> **一句话定义：** 隔离见证的主 BIP：分离见证数据、修复延展性、有效提升区块容量。

SegWit（**Seg**regated **Wit**ness，隔离见证）是 2017 年 8 月在比特币上激活的软分叉，由 [BIP-141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) 定义。它重构了比特币[交易](/glossary/transaction)存储签名数据的方式，一次性解决了多个问题。

核心变更：签名数据（「见证数据」）被移出交易主体，放进一个仍在区块内、但不占用原 1 MB 区块大小限额的独立结构。区块改用**权重单位**计量，每块上限 400 万权重单位。见证数据每字节 1 权重；非见证数据每字节 4 权重。这在不动硬分叉的情况下把容量大致翻倍。

SegWit 修复了什么：

- **交易延展性。** SegWit 之前，[txid](/glossary/transaction) 覆盖包括签名在内的完整交易计算，而签名可被篡改。第三方可以在不使交易无效的前提下改变交易的外观（进而改变 txid）。这破坏了未确认交易链，也几乎让安全的二层协议无从谈起。SegWit 把见证数据排除出 txid 计算，txid 从交易签名那一刻起就稳定了。
- **区块容量。** 有效区块大小从约 1 MB 提高到最高约 4 MB（混合交易类型的典型使用中约 2 MB）。
- **未来升级。** SegWit 为见证数据引入了版本方案，让 [Taproot](/glossary/taproot)（见证版本 1）后来得以作为干净的软分叉加入。

2017 年的激活在政治上充满火药味——它脱胎于持续多年的「扩容战争」，一方要更大的原始区块，另一方要分层扩容。大区块阵营最终分叉出 Bitcoin Cash。留下的比特币社区保住了 SegWit 与分层扩容路线，依赖稳定 txid 的[闪电网络](/glossary/lightning-network)随后不久成为现实。

初期的采用靠 P2SH 包装变体铺平——[P2SH-P2WPKH 与 P2SH-P2WSH](/glossary/p2sh-p2wsh-nested-segwit)让收款方藏在发送方已经会用的 `3...` 地址后面享受 SegWit 的好处。到 2019-2020 年，大多数钱包已迁移到[原生 SegWit](/glossary/native-segwit)（`bc1q...`），包装变体成为历史。

到 2026 年，新比特币输出的绝大多数已是 SegWit 或 Taproot。SegWit 之前的传统输出仍存在，但正被逐步花费。

**相关词条：** [BIP 141 相关：P2SH-P2WSH 嵌套隔离见证](/glossary/p2sh-p2wsh-nested-segwit) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [原生隔离见证（Native SegWit）](/glossary/native-segwit) · [Bech32m](/glossary/bech32m) · [Taproot](/glossary/taproot) · [BIP 342（Tapscript）](/glossary/bip-342-tapscript) · [BIP 144（SegWit 中继）](/glossary/bip-144-segwit-relay) · [BIP 91](/glossary/bip-91) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [BIP 9（VersionBits）](/glossary/bip-9-versionbits) · [P2SH](/glossary/p2sh) · [闪电网络（Lightning Network）](/glossary/lightning-network)
