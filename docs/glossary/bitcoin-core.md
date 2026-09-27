---
title: Bitcoin Core
---

# Bitcoin Core

> **一句话定义：** 比特币协议的参考实现——中本聪 2008 年写的原始代码库，如今是「比特币到底是什么」的事实标准。

Bitcoin Core 是比特币协议的参考实现。它就是[中本聪](/glossary/satoshi-nakamoto)2008 年写的那个代码库（当时就叫 "Bitcoin"），2014 年为了把「比特币这个软件」与「比特币这个网络」区分开而改名。公开可及的[全节点](/glossary/full-node)绝大多数运行它，其他钱包和库多半默默以它为准。

代码库在 **[github.com/bitcoin/bitcoin](https://github.com/bitcoin/bitcoin)**，由一群轮换的贡献者维护，没有正式的治理结构。变更流程：

1. 任何面向用户或影响共识的内容，先有 **BIP 规范**（见 [BIP](/glossary/bip-bitcoin-improvement-proposal)）。
2. 向代码库提 pull request，任何人都可以评审（许多认真的评审者真的会来）。
3. 维护者合并——一小群有合并权限的人。他们不制定规则，只合并通过评审的东西。
4. 发布经理打版本标签，多个密钥持有人签名。
5. **采用是自愿的。** 每个节点运营者自己决定要不要升级。只有足够多的运营者运行新版本、网络事实上完成迁移时，变更才算落地。

公开评审 + 自愿采用，这套组合让比特币协议真的很难被改动。敌意的维护者塞不进私货——评审者会看出来；敌意的集团改不了规则——节点不运行他们的版本。整个系统为「不出错」优化，哪怕代价是演进缓慢。

Bitcoin Core 约每 6 个月发一个版本。大版本带来过 SegWit（2017）、Taproot 信令（2021），以及内存池策略、网络和验证性能的持续改进。它是地球上被评审得最充分的加密货币代码库，「比特币到底是什么」的事实标准。

代码库也有小趣味。Sjors Provoost 2015 年提交的 [Lurking Wife Mode](/glossary/lurking-wife-mode)——一个遮蔽全部余额与金额显示的 GUI 开关——至今仍在发行版里，提醒我们写这软件的是活生生的人。

运行它意味着什么，见[全节点](/glossary/full-node)；为什么你该考虑跑一个，见[主权之旅](/journey/sovereignty)。

**相关词条：** [比特币客户端（Bitcoin Client）](/glossary/bitcoin-client) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [Bitcoin Knots](/glossary/bitcoin-knots) · [Lurking Wife Mode](/glossary/lurking-wife-mode) · [节点（Node）](/glossary/node) · [节点自动封禁（Node Autoban）](/glossary/node-autoban) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
