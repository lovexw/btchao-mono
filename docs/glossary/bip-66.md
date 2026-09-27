---
title: BIP 66
---

# BIP 66

> **一句话定义：** 强制严格 DER 编码签名，缓解部分交易延展性与解析问题。

[BIP-66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki) 把比特币的签名编码规则收紧为严格的 **DER（Distinguished Encoding Rules）** 格式。2015 年 7 月作为[软分叉](/glossary/soft-fork)激活，它是一次延展性修复，关掉了此前多年造成种种隐性 bug 的几个边缘案例。

问题所在：BIP-66 之前，比特币接受任何 OpenSSL 接受的签名，而 OpenSSL 很宽松。同一个逻辑 [ECDSA](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) 签名可以有多种编码——前导零、不同的整数编码、填充缓冲。每种编码解析出同一个签名，但**字节**不同，而交易的 txid 正是对那些字节计算的——所以 txid 也不同。

这就是一种交易延展性：有人可以截获一笔广播中的[交易](/glossary/transaction)，把签名重新编码成另一种合法形态，再以不同 txid 重播。原发送方的钱包会跟丢这笔交易，尽管它最终照样确认。最著名的受害者是 Mt. Gox：2014 年丢失 85 万 BTC 时，它用延展性当解释（真实原因更复杂，但延展性确实在故事里）。

BIP-66 的修复：要求签名一律使用规范 DER 格式——每个逻辑签名只有一种特定字节布局。其余的一律被每个节点拒绝。

这消灭了**签名形态**的延展性，但没有完全解决交易延展性（还有一些向量残留，比如脚本形态的变化）。彻底的修复来自 2017 年的 [SegWit](/glossary/segwit-segregated-witness-bip-141)：把见证数据从 txid 计算中结构性剥离。BIP-66 是有用的中间一步。

BIP-66 的激活也是比特币第一次用 [BIP-9](/glossary/bip-9-versionbits) 矿工信令机制部署软分叉——这个模板后来被反复使用。

规范：[BIP-66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [ECDSA](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [椭圆曲线（Elliptic Curve）](/glossary/elliptic-curve) · [Schnorr 签名](/glossary/schnorr-signature) · [签名聚合（Signature Aggregation）](/glossary/signature-aggregation)
