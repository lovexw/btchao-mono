---
title: BIP 30
---

# BIP 30

> **一句话定义：** 禁止创建与既有交易 txid 相同的新交易的规则，堵住双花边缘案例。

[BIP-30](https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki) 是防止两笔历史[交易](/glossary/transaction)拥有相同交易 ID（txid）且都留有未花费输出的共识规则。2012 年 3 月以[软分叉](/glossary/soft-fork)形式引入，起因是研究者发现最初的 Bitcoin Core 实现存在一个微妙边缘案例：重复 txid 的交易可能发生碰撞。

具体地说，2012 年之前的两笔 [Coinbase 交易](/glossary/coinbase-transaction)——区块 91722/91812 与 91842/91880 各自内部的一对——拥有完全相同的 txid（因为它们的 Coinbase 输入结构一模一样）。BIP-30 让这种场景今后不再可能：节点必须拒绝任何 txid 与现存未花费交易相同的交易。

配套修复是 [BIP-34](/glossary/bip-34)：让今后的 Coinbase 交易在输入脚本中显式写入[区块高度](/glossary/block-height)——即使其余部分与之前某块的 Coinbase 完全一致，每个 Coinbase 的 txid 也必然唯一。BIP-34 深度执行后（约 2013 年区块 227,930 起），BIP-30 的检查实际上只剩很老的区块还需要；现代 Bitcoin Core 把它当作为历史正确性而保留的遗迹规则，而非现役防线。

这段故事只是比特币历史的小脚注，却是维护纪律的干净样本：识别微妙的边缘案例，用软分叉封上，接受有些「不该发生」的事已经发生过一次、需要善后。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 34](/glossary/bip-34) · [区块（Block）](/glossary/block) · [区块高度（Block Height）](/glossary/block-height) · [双花（Double Spend）](/glossary/double-spend) · [交易（Transaction）](/glossary/transaction)
