---
title: 无找零交易（Changeless Transaction）
---

# 无找零交易（Changeless Transaction）

> **一句话定义：** 输入总额与「付款+手续费」足够贴近、无需找零输出的交易——微小超出留给矿工；构造更省、日后花更省，还让找零识别无迹可循。

无找零交易是花费的币加起来与「付款额加手续费」足够贴近、钱包懒得再造一个[找零输出](/glossary/change-output)的交易。剩下的一点零头直接留给矿工。交易里不再有「一个给收款方、一个退回发送方」的两个输出，只有一个——这是链上支付能有的最干净的形状。

第一个好处是成本，而且比看上去大。输出不是白造的：一个原生 SegWit 输出给交易加约 31 vbyte；它日后也不白花——找零成了一枚新币，未来某笔交易里作为输入还要再花约 68 vbyte。无找零花费把两笔账都省了。Bitcoin Core 的[选币](/glossary/coin-selection)逻辑（`src/wallet/coinselection.cpp`）把这个权衡算得明明白白：[分支定界](/glossary/branch-and-bound-bnb)接受「多付手续费」的上限，正好等于一个找零输出「造 + 花」的成本——与其为一枚你不想要的硬币付两次钱，不如现在稍微多给矿工一点。

第二个好处是隐私。[链上分析](/glossary/chain-analysis)最高产的一招就是找零识别：看一笔交易的两个输出，判断哪个是找零，然后顺着它跟进发送方的下一笔交易。线索都是老熟人：找零是零碎数、付款是整数；找零去新地址、收款方的地址可能复用；找零的脚本类型和输入一致。无找零交易直接删掉了第二个输出——没有可比较的对象，没有可抽的线头。分析者看到一笔支付，但不知道发送方究竟留下了什么没有。

限制在于：只有当钱包的[币池](/glossary/utxo-pool)里恰好有一组币落进窗口时，精确匹配才可能——这取决于你有多少币、面额多分散。只有一枚大币的钱包永远做不出无找零花费；收惯了各种大小款项的钱包却出奇地常有。这也是「保持币面额分散、别全并成一坨」这个 quieter 建议的理由之一，也是 Core 每次发送都跑一遍分支定界的原因之一。

**相关词条：** [找零输出（Change Output）](/glossary/change-output) · [选币（Coin Selection）](/glossary/coin-selection) · [分支定界（BnB）](/glossary/branch-and-bound-bnb) · [UTXO 池（UTXO Pool）](/glossary/utxo-pool) · [交易手续费（Transaction Fee）](/glossary/transaction-fee) · [地址聚类（Address Clustering）](/glossary/address-clustering) · [链上分析（Chain Analysis）](/glossary/chain-analysis) · [PayJoin（协作支付）](/glossary/payjoin)
