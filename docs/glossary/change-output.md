---
title: 找零输出（Change Output）
---

# 找零输出（Change Output）

> **一句话定义：** 比特币的钱是整枚整枚花的——输入超过「付款+手续费」时退回给自己的那枚新币；它是链上隐私最常见的破绽，也是选币算法拼命想避开的东西。

比特币的 [UTXO](/glossary/utxo-unspent-transaction-output) 不能部分花费。你持有一枚 0.75 BTC 的币、欠人 0.5，交易就吃掉整枚 0.75：0.5 给收款方，减去手续费后的余款发回一个你控制的地址。那个余款就是找零输出。它和「付 12 块钱递给收银员一张二十」一模一样——只不过找回来的「8 块钱」是一枚全新的币，有自己的地址、自己在账本上的位置。

现代钱包自动而小心地处理找零。[层级确定性钱包](/glossary/hierarchical-deterministic-wallet)从密钥树一条独立的内部分支派生找零地址——BIP-44 专门把链索引 1 留给找零，链索引 0 才是你对外给出的收款地址。这个分立保证找零地址永远是新地址，永不复用，也从不是你交给任何人的那个。在区块浏览器里看自己的交易、发现一个不认识的输出时，那几乎总是你的找零，落在钱包悄悄生成的一个地址上。

隐私的麻烦在于：找零从外面通常一眼可辨。[链上分析者](/glossary/chain-analysis)手里有几套启发式：付款常是整数、找零是一长串零碎小数；找零去往从没见过的地址，收款方的地址可能有历史；找零输出的脚本类型往往和输入一致——因为是同一个钱包构造的两边——这正是 Bitcoin Core 从 23.0 版起尽量让找零类型跟随目的地类型的原因。找零猜对了，你就把付款方的输入和一个新地址连上了，那个地址又连向付款方的下一笔交易，如此沿链而下。把一个已识别的地址变成一整段历史的机制正是它。所以有些选币逻辑刻意寻找[无找零交易](/glossary/changeless-transaction)，钱包也会改变派生与输出排序来模糊线索。

找零还有下限。如果余款小到将来花它比它本身还贵，它就是[粉尘（dust）](/glossary/dust)——正经钱包会直接放弃这个输出、让矿工把差额收走，而不是铸造一枚永远没人花的币。在这个下限与「明显值得要找零」之间，就是[分支定界](/glossary/branch-and-bound-bnb)用来权衡「手续费稍微多付点」还是「多一枚没用的币」的容差区间。

[CoinJoin](/glossary/coinjoin) 的找零是上述一切的例外：它按定义就是未混币的，和已混输出一起花掉等于把混白做了。注重隐私的钱包会给它打标、隔离、在你碰它时警告——对找零而言，这是全场景正确的好直觉。

**相关词条：** [未花费输出（UTXO）](/glossary/utxo-unspent-transaction-output) · [输出（Transaction Output）](/glossary/output-transaction-output) · [选币（Coin Selection）](/glossary/coin-selection) · [无找零交易（Changeless Transaction）](/glossary/changeless-transaction) · [分支定界（BnB）](/glossary/branch-and-bound-bnb) · [层级确定性钱包（Hierarchical Deterministic Wallet）](/glossary/hierarchical-deterministic-wallet) · [地址复用（Address Reuse）](/glossary/address-reuse) · [地址聚类（Address Clustering）](/glossary/address-clustering) · [粉尘（Dust）](/glossary/dust) · [币控制（Coin Control）](/glossary/coin-control)
