---
title: SIGHASH
---

# SIGHASH

> **一句话定义：** 指定交易哪些部分被签名。选项包括 ALL、NONE、SINGLE 与 ANYONECANPAY。

SIGHASH 标志告诉签名算法：签名对交易的哪些部分作出承诺。默认是 `SIGHASH_ALL`：签名覆盖每个输入和每个输出，任何一处改动都会使其失效。几乎所有比特币交易用的都是它。

非默认标志为特定构造模式而存在：

- `SIGHASH_NONE`——签名覆盖输入但不覆盖输出。最终定稿交易的人可以改写资金的去向。冷门，主要出现在教程里，实践中极少使用。
- `SIGHASH_SINGLE`——签名只覆盖与本输入同索引号的那个输出，其他输出可以改。适用于只关心自己目的地的报价与互换场景。
- `SIGHASH_ANYONECANPAY`（一个与其他标志按位或的修饰符）——签名只承诺这个输入，不承诺其他输入。任何人都可以添加更多输入而不破坏你的签名。众筹式与 PayJoin 式流程的地基。

Taproot（BIP 341）为 Schnorr 时代重构了 sighash 算法，修掉了一个存在已久的 `SIGHASH_SINGLE` 漏洞，并新增 `SIGHASH_DEFAULT`（功能等同 `SIGHASH_ALL`，但无需编码，省一个字节）。SegWit 的 BIP 143 则早已修掉了让 SegWit 前的 sighash 在多输入交易上变慢的平方级哈希问题。

多数用户永远不会直接碰 SIGHASH。钱包选择 `SIGHASH_ALL`（或 Taproot 下的 `SIGHASH_DEFAULT`）——这就是正确答案。

**相关词条：** [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [Schnorr 签名（Schnorr Signature）](/glossary/schnorr-signature) · [SIGHASH_ANYONECANPAY](/glossary/sighashanyonecanpay) · [SIGHASH_SINGLE](/glossary/sighashsingle) · [交易（Transaction）](/glossary/transaction)
