---
title: BIP 75（支付协议增强）
---

# BIP 75（支付协议增强）

> **一句话定义：** 在 BIP 70 上增加身份验证与通信改进，但从未广泛使用。

BIP 75 是 BIP 70 的第二幕。它在 BIP 70 签名支付请求的基础上，加上了收款方身份、加密的存储转发消息，以及基于 PKI 的认证。卖点：让一笔比特币支付读起来像两个实名用户之间的邮件往来。

它继承了 BIP 70 失败的全部理由。信任模型仍押在 X.509 证书机构上，而比特币用户对 CA 的胃口约等于零。协议实现沉重，隐私故事照样把身份回传给商家；等 BIP-75 草拟时（2016 年），钱包生态已经在转向朴素的 `bitcoin:` URI 和[闪电发票](/glossary/lightning-invoice)。

2026 年「给商家付一笔钱」的实际答案：闪电发票或 BOLT-12 offer（可复用、付款方匿名、全程无 CA）。BIP 75 无人使用，是生态刻意没有拐进去的那条岔路。

规范：[BIP-75](https://github.com/bitcoin/bips/blob/master/bip-0075.mediawiki)。

**相关词条：** [地址（Address）](/glossary/address) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 70（支付协议）](/glossary/bip-70-payment-protocol) · [Bitcoin Core](/glossary/bitcoin-core) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
