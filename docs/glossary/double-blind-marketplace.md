---
title: 双盲市场（Double-Blind Marketplace）
---

# 双盲市场（Double-Blind Marketplace）

> **一句话定义：** 买卖双方除完成交易所必需的信息外、互相不掌握任何身份信息的线上市场，通常依托比特币托管机制。

双盲市场指的是这样一种市场：除了完成交易所严格必需的信息，买卖双方对彼此一无所知。比特币的假名属性，加上[托管](/glossary/escrow)原语和 Tor 这类[隐私网络](/glossary/tor-hidden-service)，让这种市场在技术上切实可行。

让它运转起来的分层结构：

- **身份层：** 参与者只用假名代号连接（随机用户名、公钥）。没有 KYC，没有实名账户。
- **网络层：** 交易通过 Tor 或 I2P 进行，隐藏 IP。
- **结算层：** 比特币（尤其是[闪电网络](/glossary/lightning-network)）处理支付，不需要传统金融体系的身份标识。
- **托管层：** 交易期间由[多签](/glossary/escrowed-lightning-channel)或基于 HTLC 的托管持有资金。一位受信任（但不经手资金）的第三方可以调解纠纷。

2026 年真实存在的比特币原生双盲市场：

- **Bisq**——点对点交易，链上多签托管，仅限 Tor。成熟，资金充足。
- **Robosats**——通过闪电网络做点对点交易，仅限 Tor，结算快。
- **AgoraDesk**（LocalBitcoins 关停后接棒其生态位）——点对点法币兑 BTC。
- **基于私聊的市场**——Nostr、Tor 论坛等场所。结构松散但真实存在。

双盲市场带来什么：

- **免于链上分析。** 交易不会轻易关联到身份。
- **抗审查。** 一个没有任何参与者可被识别的市场，很难被关停。
- **向无银行账户者开放。** 没有 KYC 要求，就不会按地理位置或身份状态把人排除在外。

它避不开什么：

- **运营方风险。** 即便是去中心化市场，也有软件、通信渠道和信誉系统可被攻击或胁迫。
- **商品本身的对手风险。** 双盲市场无法保证货如其所宣称——每一笔交易仍然是一个信任问题。
- **法律暴露。** 匿名有帮助但并非无懈可击，监管者的链上分析工具越来越多。

双盲市场是「比特币能做到而法币做不到」的一个现实例子：在陌生人之间、无需许可地进行商业活动，并用密码学解决纠纷。它被用于正当交易（隐私、跨司法辖区灵活性、绕开法币通道），有时也被用于非法活动。这些工具是双刃的——就像大多数隐私基础设施一样。

**相关词条：** [去中心化（Decentralization）](/glossary/decentralization) · [去中心化交易所（DEX）](/glossary/decentralized-exchange-dex) · [可替代性（Fungibility）](/glossary/fungibility) · [安全（Security）](/glossary/security) · [静默支付（Silent Payments）](/glossary/silent-payments) · [隐形地址（Stealth Address）](/glossary/stealth-address) · [ZKCP（零知识条件支付）](/glossary/zkcp-zero-knowledge-contingent-payment)
