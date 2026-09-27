---
title: ANYPREVOUT
---

# ANYPREVOUT

> **一句话定义：** 提议中的 SIGHASH 标志（BIP-118），允许签名不严格绑定特定输入，解锁高级二层协议。

**ANYPREVOUT**（具体指 `SIGHASH_ANYPREVOUT` 及其变体 `SIGHASH_ANYPREVOUTANYSCRIPT`）是一个提案中的[比特币脚本](/glossary/bitcoin-script)签名哈希模式：它让签名好的[交易](/glossary/transaction)可以花费**任何**匹配的前置输出，而不必绑定某个具体输入。规范见 [BIP-118](https://github.com/bitcoin/bips/blob/master/bip-0118.mediawiki)，是 [Eltoo](/glossary/eltoo) 式通道及多种高级协议需要的关键密码学原语。

用人话说，技术改动是：

- **今天**，你签比特币交易时，签名承诺的是具体的输入 txid——「我签的是一笔花费 UTXO X 的交易」。这些输入 UTXO 因为任何原因变了（比如另一笔不同条款的交易先花了它们），签名作废。
- **有了 ANYPREVOUT**，你可以这样签：「我签的是一笔**将花费任意匹配某脚本模板的 UTXO** 的交易」。广播前实际输入被替换，只要脚本模板匹配，签名依然有效。

这能解锁什么：

- **[Eltoo 通道](/glossary/eltoo)。** 当前闪电通道设计的更简洁替代方案。每个新通道状态的签名方式，使其能对任意前一个承诺生效，用「新状态覆盖旧状态」取代基于惩罚的机制。
- **闪电网络协议的清理升级。** 多方通道、通道工厂、简化路由等高级构造都变得更可行。
- **更简单的金库设计。** 一些金库构造配合 ANYPREVOUT 会更容易实现。

ANYPREVOUT 提出已有多年。截至 2026 年仍未激活。技术实现早已研究透彻；卡住的地方和其他提案[软分叉](/glossary/soft-fork)一样——需要形成足够广泛的社区共识才能激活。它与 [BIP-119（CTV）](/glossary/bip-119-ctv)等契约相邻提案出现在同一场激活讨论里，支持和反对扩展比特币脚本灵活性的论点也相似。

旗舰用例见 [Eltoo](/glossary/eltoo)，更大的扩展之争见[契约（Covenants）](/glossary/covenants)。

**相关词条：** [Eltoo](/glossary/eltoo) · [支付通道（Payment Channel）](/glossary/payment-channel) · [SIGHASH](/glossary/sighash) · [SIGHASH_ANYONECANPAY](/glossary/sighashanyonecanpay) · [SIGHASH_SINGLE](/glossary/sighashsingle)
