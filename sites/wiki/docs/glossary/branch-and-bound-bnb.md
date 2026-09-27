---
title: 分支定界（BnB）
---

# 分支定界（BnB）

> **一句话定义：** Bitcoin Core 的精确匹配选币算法：有界深度优先搜索一组输入，总额恰好落在「无需找零」的窗口内——从源头避免找零输出。

分支定界（Branch and Bound，BnB）是尽量避免产生[找零](/glossary/change-output)的[选币](/glossary/coin-selection)算法。给定付款额和钱包的币池，它寻找一个总额落在窄窗口内的子集：下限是付款额加手续费，上限是该数再加上一个找零输出本会增加的成本。落在窗口内的任何组合都可以作为[无找零交易](/glossary/changeless-transaction)发出，那一点点富余付给矿工，而不是变成一枚新硬币找回来。

名字说的就是搜索过程。算法把币按面额排序，沿一棵深度优先的树遍历，每一步就在「要不要这枚币」上分支。定界（bound）保证搜索可控：一旦累计金额冲出窗口上界，或剩余的币怎么拼也够不到窗口，该分支立刻放弃。它还有固定的尝试预算（Core 实现里是 100,000 次），到点就返回找到的最好无找零组合，找不到就空手而归。无论如何，钱包的其他算法都会并行运行，用户从不需要等它。

这个想法来自 Mark "Murch" Erhardt 2016 年关于选币的硕士论文：他证明 Bitcoin Core 从早期用至今的 Knapsack（背包）算法几乎从不命中它设计的精确匹配（他的模拟中不到 1.5%），而分支定界最多能命中 30%，并把钱包的 UTXO 足迹缩小三分之一以上。Andrew Chow 为 Core 实现了它，2018 年合入，随当年 10 月的 0.17.0 发布。0.17 到 0.21 它优先运行，背包算法兜底；从 23.0 起，钱包每笔花费让所有算法各跑一遍、留下浪费最小的结果——而无找零的分支定界解通常赢下这场比较。

为什么要费劲避免找零？因为找零输出是一笔付两次的成本：它给当前交易加了字节，还铸造一枚新硬币——将来终于花它时，又要给某笔未来的交易加字节。它还是[链上分析者](/glossary/chain-analysis)用来把你的这笔交易和下一笔串起来的那个输出。没有找零的交易，构造更便宜、日后花起来更便宜，还让找零检测启发式无从下手。分支定界在机会存在时找到这些交易——而只要钱包里币的面额分布合理，机会比人们想象的更常出现。

**相关词条：** [选币（Coin Selection）](/glossary/coin-selection) · [无找零交易（Changeless Transaction）](/glossary/changeless-transaction) · [找零输出（Change Output）](/glossary/change-output) · [CoinGrinder](/glossary/coingrinder) · [UTXO 池（UTXO Pool）](/glossary/utxo-pool) · [未花费输出（UTXO）](/glossary/utxo-unspent-transaction-output) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
