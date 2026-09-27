---
title: Shamir 秘密共享（Shamir's Secret Sharing）
---

# Shamir 秘密共享（Shamir's Secret Sharing）

> **一句话定义：** 密码学方案：把秘密拆成 N 份，集齐任意 M 份即可重构，少于 M 份则一无所获。

Shamir 秘密共享（Shamir's Secret Sharing，SSS）是这样一套数学：把一个比特币种子（或任何秘密）拆成多份，任意 M of N 份可重构原秘密，而任何 M-1 份都不泄露任何信息。以密码学家 Adi Shamir 命名——他 1979 年发表了这一构造。

在比特币实践中，标准形式是 SLIP-39：面向 BIP 39 种子的词表式 SSS 方案。Trezor 原生实现；SeedSigner 可为任意种子生成 SLIP-39 份额。典型配置：2-of-3 或 3-of-5 份额，分布在不同的地理位置或受信任的人之间。

SSS 在比特币中的完整讨论——包括那个关键警示：SSS 与[多签](/glossary/multisig)**不是**同一安全模型，因为签名时的密钥重构会让完整密钥短暂出现在一台设备上——见[密钥分片（Key Split）](/glossary/key-split)。

**相关词条：** [密钥分片（Key Split）](/glossary/key-split) · [多签（Multisig）](/glossary/multisig) · [助记词（Seed Phrase）](/glossary/seed-phrase) · [比特币继承规划](/glossary/bitcoin-inheritance-planning)
