---
title: UTXO 池（UTXO Pool）
---

# UTXO 池（UTXO Pool）

> **一句话定义：** 钱包控制、可用于构建交易的未花费输出集合。它的形状——几枚大币还是许多小币——决定你未来的手续费，以及花费时有多少历史被关联。

你钱包的「余额」是一种便利抽象。它底下是一张清单：每一笔你的密钥可以签名的[未花费交易输出](/glossary/utxo-unspent-transaction-output)，各有各的金额、各有各的地址、各有各的历史。这张清单就是你的 UTXO 池。付款时，[币选](/glossary/coin-selection)从池里抽币；收款或收到[找零](/glossary/change-output)时，一枚新币落进池里。Bitcoin Core 用 `listunspent` RPC 给你看原始的池——它长得一点也不像余额。

你的池是一个大得多的结构的切片。网络整体维护着 UTXO 集——现存所有未花费输出的完整清单——每个[全节点](/glossary/full-node)都把它放在高速存储里，因为验证新交易就意味着检查其输入是否在其中。`gettxoutsetinfo` RPC 报告它的大小与总价值。你的池是这个全局集合中属于你的那一小撮，而网络既不知道、也不关心是哪一撮。

池的要点在于它的**形状**。两个总余额相同的钱包，处境可能天差地别。一个只持一枚大币：付款一个输入搞定、便宜，但永远产生找零，永远做不了[无找零交易](/glossary/changeless-transaction)。另一个持着来自四十笔付款的四十枚小币：精确匹配的选择余地很多，但费率一飙升，任何像样的付款都得十几个输入——高费率下，十几个输入的成本可能超过其中最小那枚币的价值。币就是这样变成[尘](/glossary/dust)的：池碎片化到有些零头不值得再动。

管理建议由形状决定。比特币的手续费是周期性的，便宜的周期就是把小币扫成几枚大币、跑[合并交易](/glossary/consolidation-transaction)的时候，让池为昂贵的周期做好准备——那时你要用尽可能少的输入付款。CoinGrinder（Bitcoin Core 在高费率下用的算法，见[币磨](/glossary/coingrinder)）为轻交易优化、跳过小币，所以清扫小币得靠你自己。

隐私维度同样存在。池里每一枚币都有一段来路，而[链上分析师](/glossary/chain-analysis)默认同一笔交易里花掉的币属于同一个主人。把整个池整理成一枚币是最便宜的交易，也是最暴露的交易——它公开把你收过的每一个来源焊在一起。[币控制](/glossary/coin-control)的存在就是让你决定池里哪些部分允许见面；一个带标签的池（按来源给币打标）是「管理这件事」和「事后才发现」的区别。

**相关词条：** [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output) · [币选（Coin Selection）](/glossary/coin-selection) · [币控制（Coin Control）](/glossary/coin-control) · [合并交易（Consolidation Transaction）](/glossary/consolidation-transaction) · [找零输出（Change Output）](/glossary/change-output) · [尘（Dust）](/glossary/dust) · [币磨（CoinGrinder）](/glossary/coingrinder) · [分支定界（Branch and Bound）](/glossary/branch-and-bound-bnb) · [地址聚类（Address Clustering）](/glossary/address-clustering)
