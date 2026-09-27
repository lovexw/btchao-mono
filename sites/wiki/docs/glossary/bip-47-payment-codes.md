---
title: BIP 47（支付码）
---

# BIP 47（支付码）

> **一句话定义：** 可复用支付码系统，旨在改善隐私、避免静态地址复用。

[BIP-47](https://github.com/bitcoin/bips/blob/master/bip-0047.mediawiki)（「可复用支付码」）定义了一套系统：收款方发布一个长期**支付码**，付款方从它派生出每次支付全新的链上[地址](/glossary/address)。目标：既避免[地址复用](/glossary/address-reuse)，又保留单一、可分享的标识符。

它的工作方式：

1. 收款方发布自己的支付码（一个扩展公钥加若干元数据，编码成 `PM...` 开头的字符串）。
2. 付款方在链上做一次性的**通告交易**：一笔打向特殊派生地址的小额支付，向收款方「自我介绍」，并交换 ECDH 地址派生所需的密码学材料。
3. 此后双方都能为彼此间的支付派生出一系列唯一地址，不再需要链上握手。

实践中，BIP-47 采用有限。Samourai Wallet 团队力推，少数其他钱包实现过。没有大范围流行的主要原因有两个：

- **通告交易本身就是隐私泄漏。** 它告诉链上观察者「这个用户在用支付码」，并用那一笔链上交易把付款方和收款方关联起来。而这套方案的初衷恰恰是隐私。
- **基础设施负担。** 每个收款方都要扫描链上的通告交易，再派生并监视所有对应地址。

现代继任者是**[静默支付（Silent Payments）](/glossary/silent-payments)**（BIP-352，2023 年）：达成同样的「一个可复用码、每次支付全新地址」，却不需要任何通告交易。截至 2026 年，BIP-47 基本只剩历史价值；新上可复用收款码的钱包选的都是静默支付。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [支付码（BIP-47）](/glossary/payment-codes-bip-47) · [安全（Security）](/glossary/security) · [静默支付（Silent Payments）](/glossary/silent-payments) · [隐形地址（Stealth Address）](/glossary/stealth-address)
