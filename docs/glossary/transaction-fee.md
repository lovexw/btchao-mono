---
title: 交易手续费（Transaction Fee）
---

# 交易手续费（Transaction Fee）

> **一句话定义：** 发送方附带、奖励矿工优先确认交易的费用。

交易手续费是你付给[矿工](/glossary/miner)、让他们把你的[比特币交易](/glossary/transaction)打包进区块的费用。机制上，它等于输入总额与输出总额之差——你没有明确发给某个输出的部分，被确认这笔交易的矿工收走。

手续费按*费率*而非总额报价：**每虚拟字节聪数（sat/vB）**。同一费率下，更大的交易花更多手续费。常见交易大小：

- 简单 [P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash)（1 输入 2 输出）：约 140 vB
- [Taproot](/glossary/taproot)（1 输入 2 输出）：约 110 vB
- 2-of-3 多签：约 250 vB
- 多输入合并交易：500+ vB

按 10 sat/vB 计，分别为 1,400 / 1,100 / 2,500 / 5,000+ 聪。实际费率随网络拥堵大幅波动。

手续费市场的动态：

- **低拥堵期。** 费率跌到 1-3 sat/vB。该费率下大多数交易下一个块就确认。
- **高拥堵期。** 费率飙升。2024 年初 Ordinals 铸造热潮中，下一块费率偶尔触及 500+ sat/vB。
- **估算器驱动的默认值。** 钱包用[手续费估算](/glossary/fee-estimation)选一个合理费率。多数钱包算得对；懂取舍的话可以手动覆盖。
- **手续费加价**（[RBF](/glossary/replace-fee-rbf)、[CPFP](/glossary/fee-bumping)）在你付少了被卡住时可以救场。

长期看，交易手续费将成为矿工*唯一*的激励。今天它约占[区块奖励](/glossary/block-reward)收入的 3-10%；随着[区块补贴](/glossary/block-subsidy)在 2140 年前后减半至零，手续费将成为全部。今天的手续费市场，是比特币要在后补贴时代维持安全所需的那个手续费市场的小型预演。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [按费替换（RBF）](/glossary/replace-fee-rbf) · [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [费率地板（Fee Floor）](/glossary/fee-floor) · [费率飙升（Fee Rate Escalation）](/glossary/fee-rate-escalation) · [手续费抢跑（Fee Sniping）](/glossary/fee-sniping) · [Full RBF](/glossary/full-rbf) · [区块奖励（Block Reward）](/glossary/block-reward) · [区块补贴（Block Subsidy）](/glossary/block-subsidy) · [Coinbase 交易（Coinbase Transaction）](/glossary/coinbase-transaction) · [交易链（Transaction Chaining）](/glossary/transaction-chaining)
