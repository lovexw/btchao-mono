---
title: 去中心化交易所（DEX）
---

# 去中心化交易所（DEX）

> **一句话定义：** 没有中央托管方的交易场所——交易点对点完成，由密码学协议而非对运营方的信任来担保。

去中心化交易所（DEX）是没有中央方持有用户资金的交易场所。交易直接在点与点之间发生，由密码学协议担保，而不是靠信任某个运营方。

就比特币而言，主要的 DEX 形态有：

- **[原子交换](/glossary/atomic-swap)**——BTC 与其他资产之间基于 HTLC 的无信任交换。比中心化订单簿慢，但无需托管。
- **Robosats**——仅通过 Tor 访问的点对点市场，用闪电网络做托管。订单簿把 BTC 对上法币（走本地支付通道）；托管由闪电 HTLC 持有，而不是平台。
- **Bisq**——历史更久的点对点市场，用链上多签托管。比 Robosats 慢，但支持的支付方式更多。
- **潜水艇交换服务**，如 Boltz Exchange，做无信任的链上 ↔ 闪电转换。

长处：

- **没有托管人。** 你永远不用把钥匙交给某个服务。交易对手风险被限定在具体那笔交易内，且有托管保护。
- **多数场景无 KYC。** 一些点对点场所完全匿名运行；另一些让你自选身份披露程度。
- **抗审查。** 没有一个能被传唤、或被施压冻结你账户的中央运营方。

代价：

- **流动性更薄。** 几乎每个交易对上，中心化交易所的订单簿都更深。
- **体验更糙。** DEX 界面通常不如商业交易所精致。
- **法币入金是本地的。** 你往往要通过银行转账、现金存款或本地支付 App 付款，而不是统一的入金流程。

对在意规避[交易对手风险](/glossary/counterparty-risk)和 [KYC](/glossary/kyc-know-your-customer) 的用户，DEX 是有原则的答案。它没有 Coinbase 那么顺滑，但它保住了把你带到比特币面前的那些属性。

**相关词条：** [BitLicense](/glossary/bitlicense) · [中心化交易所（CEX）](/glossary/centralized-exchange-cex) · [去中心化（Decentralization）](/glossary/decentralization) · [交易所（Exchange）](/glossary/exchange) · [交易所 API Key](/glossary/exchange-api-key)
