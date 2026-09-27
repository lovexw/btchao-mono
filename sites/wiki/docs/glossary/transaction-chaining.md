---
title: 交易链（Transaction Chaining）
---

# 交易链（Transaction Chaining）

> **一句话定义：** 连续广播多笔相互依赖未确认输出的交易。

交易链（Transaction Chaining）指广播一笔花费未确认父交易输出的交易。子交易待在内存池里，等待父交易（以及可能的更早祖先）先被确认。

这正常且受支持。比特币不要求你等确认才能花自己的输出。但有边界：

- Bitcoin Core 的默认策略把未确认链限制在每笔交易 25 个祖先 / 25 个后代，外加总权重上限。超限的链无法中继，矿工也不会打包。
- 整条链一荣俱荣、一损俱损。祖先若被驱逐（费率太低或被冲突交易替换），所有后代一并失效。
- 矿工把整条链当作一个单位、按每虚拟字节费率优化。高费子交易能把低费父交易拽进区块（子为父付，CPFP）；低费子交易卡在低费父交易后面则哪儿也去不了。

常见用途：

- **CPFP 手续费加价：** 父交易费用不足；用户（或收款方）用一个高得多的费率花费其某个输出构造子交易，为两笔一起买单。
- **快速连续发送：** 交易所提币流、支付处理器，以及任何需要在等待确认之前连发多笔交易的场景。
- **闪电 splice 交易**和某些依赖特定 UTXO 可用性的链上互换构造。

只要累计费率让整条链对矿工有吸引力，长链没问题。父交易费用低到卡死、且在内存池驱逐之前 CPFP 救不回来时，才会成为麻烦。

**相关词条：** [合并交易（Consolidation Transaction）](/glossary/consolidation-transaction) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee) · [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [按费替换（RBF）](/glossary/replace-fee-rbf)
