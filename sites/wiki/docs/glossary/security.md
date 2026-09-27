---
title: 安全（Security）
---

# 安全（Security）

> **一句话定义：** 既指比特币协议的稳健性（PoW、节点共识），也指终端用户的密钥保护（钱包安全）。

比特币语境下的「安全」有两个经常被混为一谈的含义：

**协议安全。** 比特币网络对攻击的抵抗力。它建立在[工作量证明](/glossary/proof-work-pow)、全球分布式挖矿产业、每个全节点独立执行共识规则，以及十六年的实跑记录之上。主网从未遭受成功的 51% 攻击，从未发生推翻已确认交易的双花，从未被审查或关停。密码学原语（SHA-256、secp256k1）未被攻破。这个协议是地球上被攻击最多的密码学系统；它扛住了。

**操作安全（opsec）。** *你*作为比特币用户的个人安全。真正的损失都发生在这里：

- **[助记词](/glossary/seed-phrase)泄露。** 被拍照、写在一台后来被黑的电脑旁、存进网盘、分享给了后来变得不可信的「可信之人」。
- **弱熵。** 用可预测的随机性生成密钥。发生过很多次；有人因此损失数百万。
- **钓鱼与社会工程。** 假客服、假钱包 App、假「钱包需升级」邮件。普通用户丢比特币的头号方式。
- **[托管](/glossary/custodial-wallet)失败。** 交易所资不抵债、被黑、冻结。真实的损失、真实的客户、真实的破产。
- **硬件沦陷。** 针对硬件钱包的供应链攻击、恶意固件更新、侧信道攻击。
- **继承断档。** 没有可用的[继承计划](/glossary/inheritance-seed-backup)就去世，是永久性的损失事件。

协议安全是*比特币*给你的。操作安全是*你*必须给自己的。防御手段（硬件钱包、多签、[隔空](/glossary/air-gapped)设置、谨慎的助记词管理、远离托管蜜罐、最小化 KYC）都众所周知。但执行纪律不会自动发生。

一个合理的表述：比特币的协议层安全到在计算领域罕见的程度；你的钱包安全到*你*把它做成的程度。别把两者混淆。

想系统学习，见[安全指南](/security)与[学习之旅第 5 章](/journey/be-your-own-bank)。

**相关词条：** [助记词（Seed Phrase）](/glossary/seed-phrase) · [硬件钱包（Hardware Wallet）](/glossary/hardware-wallet) · [隔空（Air-Gapped）](/glossary/air-gapped) · [托管钱包（Custodial Wallet）](/glossary/custodial-wallet) · [交易对手风险（Counterparty Risk）](/glossary/counterparty-risk) · [继承助记词备份](/glossary/inheritance-seed-backup) · [密钥轮换（Key Rotation）](/glossary/key-rotation) · [密钥分片（Key Split）](/glossary/key-split) · [硬件种子保险库（Hardware Seed Vault）](/glossary/hardware-seed-vault)
