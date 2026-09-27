---
title: BIP 70（支付协议）
---

# BIP 70（支付协议）

> **一句话定义：** 商家支付请求协议；因安全与隐私问题已基本弃用。

BIP 70 想让比特币支付像刷卡一样体面。商家生成一份签名的支付请求，钱包显示「正在支付给 Acme 公司」（经 X.509 证书链验证），用户批准，钱包把签好的[交易](/glossary/transaction)回传到商家指定的 URL。

它死于惯常的死因。签名模型押在证书颁发机构（CA）体系上——比特币用户对那套 CA 的信任约等于零。「回传」支付确认回调把买家的 IP 与时机泄漏给商家，每笔交易都漏。实现复杂度让钱包悄悄放弃支持。Bitcoin Core 于 0.18（2019 年）弃用、0.20 移除。

替代品就是更简单的东西。`bitcoin:` URI（`bitcoin:bc1q...?amount=0.01&label=Acme`）用一个二维码覆盖大多数链上商家流程。交互式支付场景，[闪电发票](/glossary/lightning-invoice)和 BOLT-12 offer 接住了 BIP 70 伸手去够的那份用户体验——没有 CA 信任、没有泄漏身份的回调，支付证明长在协议里而不是外挂上去的。

规范：[BIP-70](https://github.com/bitcoin/bips/blob/master/bip-0070.mediawiki)。

**相关词条：** [地址（Address）](/glossary/address) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 75（支付协议增强）](/glossary/bip-75-payment-protocol-enhancements) · [Bitcoin Core](/glossary/bitcoin-core) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
