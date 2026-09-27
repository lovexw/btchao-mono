---
title: CoinGrinder
---

# CoinGrinder

> **一句话定义：** Bitcoin Core 在高费率时启用的选币算法——搜索总输入权重最小的组合；与分支定界互为补集：一个省找零，一个省输入。

CoinGrinder 是 [Bitcoin Core](/glossary/bitcoin-core) 在费率高企时求助的[选币](/glossary/coin-selection)算法。目标很窄：找到覆盖付款额、总输入权重最小的币组合——区块昂贵时，能从交易里省掉的每一个输入都是省下的真金白银。

这使它成为与[分支定界](/glossary/branch-and-bound-bnb)互补的算法（两者在 Core 中并行运行）。分支定界追求输入总额与付款贴合到不需要[找零输出](/glossary/change-output)，为此不惜用掉好几枚小币——低费率时这是正确的交换：输入近乎免费、找零才是贵的那头。高费率时算术反转：每多一个输入的花费超过它可能省下的找零，最好的交易是输入最少、最大、哪怕要找零的交易。CoinGrinder 搜的就是这种交易。

搜索本身仍是带预算的深度优先遍历：这次按有效价值排序、大者优先、同价值取轻者，界剪掉一切不可能胜过当前最优解的分支。和分支定界一样有尝试预算、超时优雅退出，其余算法负责兜底。最后钱包用浪费指标比较所有候选，留下最便宜的。

算法作者是 Mark "Murch" Erhardt——他 2016 年的论文已经重塑过一次 Core 的选币。2023 年年中评审启动（那年 Ordinals 引发的费率尖峰恰好暴露了它要解决的问题），2024 年 4 月随 27.0 版落地。它受费率门控：仅当交易费率超过钱包长期费率估计的三倍时才运行（`-consolidatefeerate` 设置默认 10 sat/vB，即 30 sat/vB 起步）——因为普通费率下一味最小化输入权重意味着小币永远不花、最终堆积成[粉尘](/glossary/dust)。

最后这点就是面向用户的教训：CoinGrinder 在费率尖峰时保护你不多付钱，但方式是无视你的小币。那些币终究还是要清理，而清理的正确时机是便宜时段的[合并交易](/glossary/consolidation-transaction)——花十几个输入几乎不花钱的那一周。

**相关词条：** [选币（Coin Selection）](/glossary/coin-selection) · [分支定界（BnB）](/glossary/branch-and-bound-bnb) · [UTXO 池（UTXO Pool）](/glossary/utxo-pool) · [找零输出（Change Output）](/glossary/change-output) · [合并交易（Consolidation Transaction）](/glossary/consolidation-transaction) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [粉尘（Dust）](/glossary/dust) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
