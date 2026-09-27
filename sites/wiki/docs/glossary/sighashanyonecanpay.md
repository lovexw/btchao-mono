---
title: SIGHASH_ANYONECANPAY
---

# SIGHASH_ANYONECANPAY

> **一句话定义：** 签名标志：允许其他参与者向交易添加输入而不使既有签名失效。

`SIGHASH_ANYONECANPAY` 是一个修饰标志（与 `SIGHASH_ALL`、`SIGHASH_NONE` 或 `SIGHASH_SINGLE` 按位或），告诉签名方：「只对这个输入承诺，不管其他输入。」任何人之后都可以往交易里添加更多输入而不破坏你的签名。

它支撑了多方共同构造一笔共享交易、又互不信任的模式：

- **众筹：** 发布一个设定好收款输出的半成品交易；支持者各自添加一个用 `SIGHASH_ALL | SIGHASH_ANYONECANPAY` 签名的输入。输入总额一旦覆盖输出，任何人都可以广播。
- **PayJoin（BIP 78）式流程：** 付款方与收款方各出输入，结果在外部观察者眼里就是一笔普通交易。
- **RBF 出现前的手续费加价**，不过现在 [RBF（按费替换）](/glossary/replace-fee-rbf) 和 CPFP 处理得更好。

它是一个威力大但锋利的标志。用 `SIGHASH_NONE | SIGHASH_ANYONECANPAY` 签名，等于签了「我的 UTXO 随便花」——这几乎从来不是任何人的本意。即席构造的安全默认是 `SIGHASH_ALL | SIGHASH_ANYONECANPAY`：我的输入被承诺、输出被固定、其余开放。

**相关词条：** [SIGHASH](/glossary/sighash) · [SIGHASH_SINGLE](/glossary/sighashsingle) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [交易（Transaction）](/glossary/transaction) · [按费替换（RBF）](/glossary/replace-fee-rbf)
