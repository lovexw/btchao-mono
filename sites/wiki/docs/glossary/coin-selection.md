---
title: 选币（Coin Selection）
---

# 选币（Coin Selection）

> **一句话定义：** 构造交易时「挑哪几枚 UTXO 来花」的钱包工程问题——它决定手续费、决定有没有找零、也决定你的哪些地址被公开焊在一起。

比特币没有账户余额。一个[钱包](/glossary/wallet)持有的是一枚枚离散的币——[UTXO](/glossary/utxo-unspent-transaction-output)，各有各的金额。付款意味着从中挑出一些、整枚花掉、把差额作为[找零](/glossary/change-output)退回给自己。「挑」这一步就叫选币。你发过的每一笔链上交易都经过它；除非你用[币控制](/glossary/coin-control)手动干预，这个决定都是钱包替你做的。

这个决定有三个用户看不见的后果。手续费：每个输入都给交易加重量，花八枚小币比花一枚大币贵，高费率时差额是真金白银。找零：选中的币若超出付款额太多，钱包就得造一个找零输出——现在付字节，将来花这笔找零时再付一次。隐私：[链上分析者](/glossary/chain-analysis)默认一笔交易的所有输入同属一人，所以选币决定了你的哪些地址被公开[聚类](/glossary/address-clustering)、永久焊死。

三个目标方向各异，所以选币是个真正的工程问题而不是一次查表。参考性的工作是 Mark "Murch" Erhardt 2016 年的论文：他用真实交易负载评估了当时的策略，发现 [Bitcoin Core](/glossary/bitcoin-core) 当时的标准方案——一个把找零维持在 0.01 BTC 下限的背包求解器——只有不到 1.5% 的付款能找到无找零精确匹配，而专门设计的搜索能到 30%。

如今 Bitcoin Core 的钱包每笔花费让几个算法各跑一遍再比较结果：出自 Murch 论文的[分支定界](/glossary/branch-and-bound-bnb)搜索完全无找零的精确匹配；背包与 Single Random Draw 产出带找零的普通解；2024 年 27.0 版加入的 [CoinGrinder](/glossary/coingrinder) 在高费率时寻找最轻输入集。钱包用一个「浪费」指标给每个候选打分——综合当前手续费、找零将来的花费成本、以及多付给矿工的零头——留下浪费最小的那个。全部逻辑在 `src/wallet/coinselection.cpp` 里可读。

对用户，实用教训很短：低费时段把小币[合并](/glossary/consolidation-transaction)掉，免得高费时段被迫花十几个输入；来源不该关联的币用币控制分开；以及优先选会告诉你「这次挑了哪些币」的钱包——看不见的选择没法干预。

**相关词条：** [未花费输出（UTXO）](/glossary/utxo-unspent-transaction-output) · [UTXO 池（UTXO Pool）](/glossary/utxo-pool) · [分支定界（BnB）](/glossary/branch-and-bound-bnb) · [CoinGrinder](/glossary/coingrinder) · [无找零交易（Changeless Transaction）](/glossary/changeless-transaction) · [找零输出（Change Output）](/glossary/change-output) · [币控制（Coin Control）](/glossary/coin-control) · [粉尘（Dust）](/glossary/dust) · [合并交易](/glossary/consolidation-transaction) · [手续费估算](/glossary/fee-estimation) · [地址聚类（Address Clustering）](/glossary/address-clustering)
