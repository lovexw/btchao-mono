---
title: SIGHASH_SINGLE
---

# SIGHASH_SINGLE

> **一句话定义：** 签名标志：只签对应索引的输出，允许部分或专门化的交易修改。

`SIGHASH_SINGLE` 只对与被签输入同索引号的那个输出签名。其他输出可以改动而不使签名失效。

使用场景：构造一笔交易，你的贡献是「把我的币发到这个特定目的地」，但你不关心交易里其他输入或输出是什么。原子互换、互不信任方之间的部分拼装，以及某些市场构造会用到它。

SegWit 之前它有个著名的坑：如果输入索引大于输出数量，sighash 算法会退化成一个常数（整数 1）。任何人都可以拿这个签名在无关交易上重放。这个漏洞被较早发现，谨慎的工具作者绕开了它。BIP 143（SegWit sighash）为 SegWit 输入干净地消灭了它，Taproot 的 sighash（BIP 341）则彻底关上了这扇门。

在特定的协议设计之外，`SIGHASH_SINGLE` 很少是正确选择。`SIGHASH_ALL` 之为默认是有道理的：它承诺一切，留下最小的攻击面。

**相关词条：** [SIGHASH](/glossary/sighash) · [SIGHASH_ANYONECANPAY](/glossary/sighashanyonecanpay) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [交易（Transaction）](/glossary/transaction)
