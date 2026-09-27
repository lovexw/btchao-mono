---
title: 隐形地址（Stealth Address）
---

# 隐形地址（Stealth Address）

> **一句话定义：** 一种隐私机制：收款方只公布一个长期公钥，每笔付款都从它派生出全新的链上地址。比特币主协议并未采用。

隐形地址是一种隐私原语：收款方公布一个长期公钥，付款方每笔付款都从这把钥派生出一个全新的链上[地址](/glossary/address)。收款方扫描链上与自己密钥匹配的输出，从而在不公布任何固定收款地址的情况下找到付款。

这套密码学构思 2014 年起就在比特币社区里讨论，但从未进入基础协议。原因：

- **接收方扫描代价高。** 想找到自己的付款，就得拿隐形钥匙去比对链上每一笔交易。全链在手的服务器做得到，轻钱包和带宽受限的用户就很吃力。
- **双向握手变体**（如 [BIP 47 支付码](/glossary/bip-47-payment-codes)）需要一笔「通知」交易，而这笔交易本身就暴露了「你在用支付码」——等于泄漏另一种元数据。

门罗币（Monero）把隐形地址做进了协议默认值。比特币历来把它留给钱包层约定和 BIP 47，而后者采用率有限。

现代的复兴是**[静默支付](/glossary/silent-payments)**（[BIP 352](https://github.com/bitcoin/bips/blob/master/bip-0352.mediawiki)，2023）：它把隐形地址的思路打磨到能和比特币现有 Taproot 基础设施干净协作。在 2026 年的钱包里，静默支付才是这个概念真正落地的版本。

**相关词条：** [地址复用](/glossary/address-reuse) · [CoinJoin](/glossary/coinjoin) · [可替代性](/glossary/fungibility) · [密钥轮换](/glossary/key-rotation) · [混币服务](/glossary/mixing-service) · [PayJoin](/glossary/payjoin) · [安全](/glossary/security) · [屏蔽 CoinJoin](/glossary/shielded-coinjoin) · [静默支付](/glossary/silent-payments)
