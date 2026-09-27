---
title: 托管（Escrow）
---

# 托管（Escrow）

> **一句话定义：** 资金由中立方或中立机制保管，直至约定条件达成。

托管（escrow）是这样一种安排：资金被放在一个中立的机制里，直到特定条件被满足。在比特币里，托管既可以靠信任第三方（托管型），也可以用密码学原语做到无需信任（基于脚本或基于 HTLC）。

比特币原生的托管模式：

- **2-of-3 多签。** 买家、卖家、受信任的仲裁人各持一把钥匙。任意两个签名即可释放资金。正常路径里，买家和卖家一起签名、把钱放给卖家；起了纠纷，仲裁人选边站。这是经典的比特币托管设置，Bisq、HodlHodl 等点对点比特币交易平台广泛采用。
- **[基于 HTLC 的托管](/glossary/htlc-hashed-time-locked-contract)。** 资金通过揭示一个原像来释放。卖家持有原像，交货后揭示；到期仍不揭示，资金退回买家。用于[原子交换](/glossary/atomic-swap)和[潜艇交换](/glossary/submarine-swap)。
- **[ZKCP](/glossary/zkcp-zero-knowledge-contingent-payment)。** 用于交易数字化的商品：卖家先以密码学方式证明自己确实有货，付款才释放。
- **时间锁托管。** 到了截止时间若无其他动作，资金自动流向指定一方。适用于各种截止期限和「死人开关」模式。

为什么基于脚本的托管胜过基于第三方的托管：

- **没有第三方能卷款跑路。** 在 2-of-3 里，仲裁人手里永远只有一把钥匙——单凭它永远不够花钱。
- **无托管责任。** 托管方从头到尾不碰资金，只是持有一把签名钥匙。
- **可审计。** 托管条件是链上脚本逻辑，而不是由法院解释的合同语言。
- **成本低。** 除了小额比特币交易手续费，没有「托管即服务」的费用。

2026 年现实中的比特币托管服务：Bisq、HodlHodl、Robosats（基于闪电网络）以及众多小型点对点市场。多数有口碑的比特币交易都通过某种形式的免信任托管进行，而不是托管型中介。

闪电托管之下的原语见 [HTLC](/glossary/htlc-hashed-time-locked-contract)；链上托管背后的多签模式见[层级多签](/glossary/hierarchical-multisig)。

**相关词条：** [回拨机制（Clawback Mechanism）](/glossary/clawback-mechanism) · [币冻结脚本（Coin Freeze）](/glossary/coin-freeze) · [交易对手风险（Counterparty Risk）](/glossary/counterparty-risk) · [托管钱包（Custodial Wallet）](/glossary/custodial-wallet) · [带托管的闪电通道](/glossary/escrowed-lightning-channel) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [支付通道（Payment Channel）](/glossary/payment-channel) · [ZKCP（零知识条件支付）](/glossary/zkcp-zero-knowledge-contingent-payment)
