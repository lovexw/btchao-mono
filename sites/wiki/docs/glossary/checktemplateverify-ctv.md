---
title: CTV（CheckTemplateVerify）
---

# CTV（CheckTemplateVerify）

> **一句话定义：** 提议中的 BIP-119 操作码：花费交易必须匹配预先承诺的「模板」——刻意收窄的契约提案，金库与通道工厂的关键积木。

`OP_CHECKTEMPLATEVERIFY`（CTV）是 [BIP-119](/glossary/bip-119-ctv) 提议的比特币脚本操作码。它的职责：强制花费交易匹配一个预先承诺的*模板*——一组特定的输入、输出、序列值和锁定时间。

脚本层面如何工作：

1. 你给一个 UTXO 注资时，锁定脚本承诺了一个交易模板的哈希——「要花它，花费交易的哈希必须等于 H」。
2. 模板规定：几个输出、金额多少、这些输出用什么脚本、花费需要什么相对锁定时间等。
3. 有人尝试花费时，CTV 把花费交易与模板比对。匹配则放行，不匹配则拒绝。

这是给比特币加[契约](/glossary/covenants)的一种具体方式，而且是刻意受限的方式：CTV 不让脚本读取花费交易的*任意*属性，只允许与预计算的模板哈希比对。这个限制正是 CTV 攻击面比一些替代方案更小的原因。

若激活，实际应用包括：

- 带强制多步提款路径的**金库**。
- 用一笔链上交易开出许多[闪电通道](/glossary/lightning-channel)的**通道工厂**。
- 高效打包多收款人的**支付池**。
- 防灾难性热钱包失陷的**冷存储保护**。

CTV 只是讨论中的多种契约设计之一。替代方案有 OP_VAULT、重新启用的 OP_CAT、OP_CSFS、ANYPREVOUT（Eltoo 的原语）、基于 Taproot 树的方案等。不同提案在表达能力、复杂度和未来弹性上各有取舍。

截至 2026 年，尚无任何契约操作码激活。更大图景的争论见[契约](/glossary/covenants)，具体提案见 [BIP-119](/glossary/bip-119-ctv)。

**相关词条：** [BIP-65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP-68（相对锁定时间）](/glossary/bip-68-relative-locktime) · [BIP-119（CTV）](/glossary/bip-119-ctv) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [CLTV（OP_CHECKLOCKTIMEVERIFY）](/glossary/checklocktimeverify-cltv) · [CSV（OP_CHECKSEQUENCEVERIFY）](/glossary/checksequenceverify-csv) · [契约（Covenants）](/glossary/covenants) · [操作码（OP Code）](/glossary/op-code-operation-code) · [脚本（Script）](/glossary/script) · [无脚本脚本（Scriptless Scripts）](/glossary/scriptless-scripts)
