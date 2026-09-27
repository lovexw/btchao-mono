---
title: 支付码（BIP 47）
---

# 支付码（BIP 47）

> **一句话定义：** 可复用的收款标识符：无需暴露静态地址即可私密收款，避免地址复用。

支付码（Payment Codes）是 [BIP 47](/glossary/bip-47-payment-codes) 定义的可复用收款标识符。用户公开一个长期使用的支付码（例如 `PM8T...`）；付款方把它与自己的密钥通过 ECDH 组合，为每笔支付派生出一个唯一的链上[地址](/glossary/address)。收款方扫描这些派生地址；付款方则从自己的派生过程知道地址是什么。

隐私目标：既避免[地址复用](/glossary/address-reuse)，又不用强迫用户每次收款都分享一个新地址。

限制了 BIP 47 推广的症结：每一对新的付款方-收款方都必须在链上发布一次性的**通知交易**。这个通知是一笔真实的比特币交易，作用是向收款方「自我介绍」，并交换后续 ECDH 派生所需的密码学上下文。通知一旦存在，同一双方之后的支付都发生在唯一地址上，不再需要链上握手。但通知*本身*就是一个隐私泄露——它公开告诉观察者：「这两方开始了支付码关系」。

BIP 47 的现状：

- **Samourai Wallet** 曾把它作为主打隐私收款流程，直到该团队 2024 年被起诉、平台关停。
- **少数其他钱包**为兼容存量用户而保留支持。
- **现代继任者[静默支付](/glossary/silent-payments)（BIP 352）**实现了同样的「一个码、多个地址」目标，却完全不需要通知交易——只公开一个静默支付地址，用基于 Taproot 的巧妙派生，无需任何握手。

如今 BIP 47 最合适的定位是一个历史概念验证：它证明了这一设计空间的存在，技术上可用，但基本已被更好的继任者取代。想要可复用私密收款地址的新用户应该看静默支付。

注：本词条与 [BIP 47（支付码）](/glossary/bip-47-payment-codes)部分重叠，二者从略有不同的角度讲同一概念。

**相关词条：** [地址复用（Address Reuse）](/glossary/address-reuse) · [BIP 47（支付码）](/glossary/bip-47-payment-codes) · [静默支付（Silent Payments）](/glossary/silent-payments) · [隐身地址（Stealth Address）](/glossary/stealth-address) · [地址（Address）](/glossary/address)
