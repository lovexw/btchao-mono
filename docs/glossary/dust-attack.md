---
title: 粉尘攻击（Dust Attack）
---

# 粉尘攻击（Dust Attack）

> **一句话定义：** 向大量地址发送极小额 BTC，待其被合并花费时追踪，暴露钱包聚类。

粉尘攻击是一种隐私降级战术：对手向许多它想追踪的地址发送极小额的 BTC（粉尘）。当收件人最终把这些粉尘输出与其他币合并在一笔交易里花费时，对手就能把所有输入归为同一个钱包。

攻击如何运作：

1. 攻击者从链上分析、泄露的数据库等渠道挑出数千个「可能有兴趣」的地址，向每个地址发送约 1,000 聪。
2. 有的收件人无视粉尘；有的没注意到；有的后来把它当「白捡的钱」主动收走。
3. 只要收件人签署了一笔把粉尘作为输入之一的交易，钱包就等于宣告「这些输入属于同一实体」。链上分析算法把这些输入聚类进同一个主人的钱包。
4. 攻击者由此知道该聚类的其他地址，可以追踪其活动，甚至识别出真实世界的所有者。

现代防御：

- **硬币控制。** Bitcoin Core、Sparrow 以及多数认真的自托管钱包都允许用户挑选花哪些 UTXO。把可疑粉尘排除在交易之外，隐私边界就守住了。
- **UTXO 标签与冻结。** 一些钱包自动把来自陌生来源的 UTXO 标记为可疑。Sparrow 的「禁止花费（Do Not Spend）」标志是这一模式的样板。
- **CoinJoin。** 把粉尘混入 [CoinJoin](/glossary/coinjoin) 能切断去匿名化的链条。
- **干脆别花。** 一个 1,000 聪的 UTXO 还不值把它加进交易的边际手续费。留在钱包里不花一文钱，还能阻止聚类合并。

这种攻击对高价值目标的记录屡见不鲜：2019 年 Binance 的地址就遭到过一次引人注目的粉尘攻击；各家交易所用户也周期性被针对。知道要防，防御并不难；攻击得手的对象从来是不知情的人。

给普通用户的建议：别把来路不明的小额 UTXO 归集进主钱包。不是你自己发的、认不出来源的，就当它是一次追踪尝试。

**相关词条：** [地址复用（Address Reuse）](/glossary/address-reuse) · [丢弃阈值（Discard Threshold）](/glossary/discard-threshold) · [粉尘（Dust）](/glossary/dust) · [粉尘限额（Dust Limit）](/glossary/dust-limit) · [粉尘清扫（Dust Sweeping）](/glossary/dust-sweeping) · [交易手续费（Transaction Fee）](/glossary/transaction-fee) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output)
