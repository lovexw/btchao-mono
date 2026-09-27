---
title: Full RBF
---

# Full RBF

> **一句话定义：** 节点接受任何未确认[交易](/glossary/transaction)的加价替换，无论原交易是否标记过 BIP-125——等于默认所有未确认交易皆可替换。

Full RBF 的意思是：[节点](/glossary/node)接受对未确认[交易](/glossary/transaction)的任何加价替换，不管原交易有没有标记 [BIP-125 的自愿 RBF](/glossary/replace-fee-rbf)。换句话说，*所有*未确认交易都被当作可替换的来对待。

Bitcoin Core 从 v24（2022 年末）开始提供可选的 full RBF 行为，并在 v26（2023 年末）将其设为默认。到 2026 年，节点网络中已有相当比例运行 full RBF——这意味着「未标记的交易不会被替换」在实践中已不再有保证。

**支持** full RBF 的论点：

- 简化费率策略。钱包实现不必再关心 RBF 标记位。
- 它只是反映了底层现实。矿工一直*都*可以挖冲突交易里出价更高的那笔；自愿 RBF 从来只是中继层的礼节，不是共识规则。
- 改善需要加价的发送方的体验。

**反对**的论点：

- 进一步侵蚀[零确认](/glossary/double-spend)支付。靠「我在内存池里看到它了」做即时结算的商家，要么等一个确认，要么承担被替换的风险。
- 把「现在行动安全吗」的负担推给商家和交易所，逼他们等确认。

2026 年的务实图景：零确认本来就不怎么安全；full RBF 只是把弱点摆上了台面。即时支付的实际答案是[闪电网络](/glossary/lightning-network)——真正的即时且终局。链上支付，等一个确认。「因为大多数人不用 RBF 所以我信未确认交易」的时代正在落幕。

Full RBF 所扩展的自愿版本，见[替换手续费（RBF）](/glossary/replace-fee-rbf)。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [加速器（Accelerator）](/glossary/accelerator) · [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [费率地板（Fee Floor）](/glossary/fee-floor) · [费率飙升（Fee Rate Escalation）](/glossary/fee-rate-escalation) · [手续费狙击（Fee Sniping）](/glossary/fee-sniping) · [全节点（Full Node）](/glossary/full-node) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
