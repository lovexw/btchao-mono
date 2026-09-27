---
title: BIP 69
---

# BIP 69

> **一句话定义：** 建议对输入输出做规范排序以降低延展性、增强隐私——非强制。

[BIP-69](https://github.com/bitcoin/bips/blob/master/bip-0069.mediawiki) 提议为交易的输入与输出规定一种规范的、确定性的排序：

- **输入：** 按来源 txid 字典序升序，再按输出索引排。
- **输出：** 按金额升序，再按 scriptPubKey 字典序排。

目标是让遵守 BIP-69 的[钱包](/glossary/wallet)产出的[交易](/glossary/transaction)在结构上彼此一致，与钱包当初怎么拼装它无关——压缩链上分析对钱包指纹的利用空间。

隐私逻辑是这样的：每个钱包拼交易都有自己的怪癖。有的按金额排输入，有的保留 UTXO 选择顺序，有的随机化。每种模式都是一个指纹。一旦能从交易结构认出钱包，你就开始认出用户。BIP-69 把结构标准化，让这件事更难。

BIP-69 **不是**共识规则，只是钱包层面的可选约定。有的钱包（Wasabi，以及某些场景下的 Bitcoin Core）遵循，有的不遵循。实际隐私收益一直有争论：

- **支持：** 遵循 BIP-69 的钱包看起来彼此相似，而不是各自有独特指纹。匿名集更大。
- **反对：** 不遵循的钱包反而更显眼。而且 BIP-69 本身也是一种指纹（确定性排序本身就是一个模式）。
- **较新的看法：** 有研究认为随机化输出顺序（或更激进地打乱）比任何确定性方案对隐私更有利。

截至 2026 年社区没有定论。BIP-69 是有用的参照点，但多数现代注重隐私的钱包在做更细腻的处理。它所回应的更大问题，见[地址聚类（Address Clustering）](/glossary/address-clustering)。

**相关词条：** [批量交易（Batch Transaction）](/glossary/batch-transaction) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
