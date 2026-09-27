---
title: MAST（默克尔化抽象语法树）
---

# MAST（默克尔化抽象语法树）

> **一句话定义：** 基于 Taproot 的技术：把每个脚本分支放进默克尔树，未用的分支保持隐藏，兼顾隐私与效率。

MAST（**M**erkleized **A**bstract **S**yntax **T**ree，默克尔化抽象语法树）是一种组织复杂[比特币脚本](/glossary/bitcoin-script)的方式：花费时只有实际执行的那个分支需要出现在链上，其余分支保持隐藏——它们被一个[默克尔根](/glossary/merkle-root)密码学地承诺，但除非被用到，否则从不揭示。

这是写进 [Taproot](/glossary/taproot) 的两个密码学思想之一，另一个是 [Schnorr 签名](/glossary/schnorr-signature)与密钥聚合。

MAST 为什么有用：设想一个金库脚本，有多个花费分支——「所有者 1 个确认后可花费」「所有者 + 可信备份方 1 天后可花费」「可信备份方单独在 1 年后可花费」。没有 MAST，三个分支在每次花费时全都可见，既占区块空间、又暴露你的安全模型。有了 MAST，只有你实际使用的那个分支会被公开，其余对链上观察者完全隐形。

再配合 Taproot 的「密钥路径花费」（协作签名选项），隐私增益还能叠加：所有参与者达成一致时，脚本根本不需要揭示，观察者看到的和一次单签花费没有区别。只有当协作破裂时，脚本的一个分支才会暴露出来。

MAST 自 2021 年 11 月 Taproot 软分叉激活起就是比特币的一部分（BIP 341 / BIP 342）。它不是需要单独开启的功能——它就是 Taproot 脚本路径花费的工作方式。

这个缩写拗口，解释也绕，但结论很干净：比特币现在可以拥有复杂合约，它们在链上看起来和最简单的交易一模一样——直到不得不露出真身的时刻。

**相关词条：** [Taproot](/glossary/taproot) · [BIP 342（Tapscript）](/glossary/bip-342-tapscript) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [默克尔树 / 默克尔根](/glossary/merkle-tree-merkle-root) · [默克尔根（Merkle Root）](/glossary/merkle-root)
