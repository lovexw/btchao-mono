---
title: Eltoo
---

# Eltoo

> **一句话定义：** 提议中的闪电通道更新机制（依赖 ANYPREVOUT），可免除惩罚交易。

Eltoo（有时写作 L2 或「Eltoo 通道」）是[闪电](/glossary/lightning-network)通道的替代设计方案，能大幅简化通道的安全模型。由 Christian Decker、Rusty Russell 和 Olaoluwa Osuntokun 设计，需要一次尚未激活的比特币软分叉。

Eltoo 要解决的问题：现行闪电通道用的是**惩罚式**争议机制。你广播旧通道状态（谎称自己比实际更有钱），对端就可以拿走通道*全部*资金作为惩罚。它管用，但有代价：

- **通道状态不对称。** 双方持有的承诺交易版本不同，通道逻辑复杂。
- **操作压力。** 不小心从备份发布旧状态，就输掉全部通道资金。备份管理必须慎之又慎。
- **瞭望塔复杂。** 你离线时需要第三方替你盯链，随时准备惩罚作弊的对端。

Eltoo 的思路：不惩罚作弊者，而是**任何人都可以靠发布最新状态来作废旧状态**。最新签署的状态直接覆盖一切更早的状态，不管谁试图广播什么。不需要惩罚。

这解锁了什么：

- **对称通道。** 双方持有同一承诺状态，逻辑简化。
- **备份更省心。** 重发布旧状态零代价——它会被直接覆盖。
- **瞭望塔更简单。** 盯守逻辑从「检测作弊并惩罚」变成「发布最新已知状态」。
- **更好的多方构造。** 通道工厂、多方通道等高级二层设计变得实际得多。

它需要什么：**ANYPREVOUT**——一种新的 SIGHASH 变体，让签好的交易可以作用于承诺链中的任何前序交易。ANYPREVOUT 记录于 BIP-118，是提议中的[软分叉](/glossary/soft-fork)，但和其他「类限制条款」提案一样，尚未积累到足够广泛的共识而激活。

ANYPREVOUT 一旦激活，Eltoo 通道就能与现行闪电通道设计并行部署（并最终取而代之）。在那之前，Eltoo 是人们希望比特币脚本更灵活的最有说服力的理由之一。

**相关词条：** [ANYPREVOUT](/glossary/anyprevout) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [支付通道](/glossary/payment-channel) · [惩罚交易（Penalty Transaction）](/glossary/penalty-transaction) · [软分叉（Soft Fork）](/glossary/soft-fork)
