---
title: 硬件安全模块（HSM）
---

# 硬件安全模块（HSM）

> **一句话定义：** 在密封硬件边界内生成、保管并使用密钥的专用防篡改设备——机构级 BTC 托管的标配。

硬件安全模块（HSM）是一种专用的防篡改设备：在密封边界内生成、保管并使用密码学密钥。密钥永远不会以可用形式离开设备。签名在设备内部完成：你把消息和操作员授权发给 HSM，它返回一个签名。

HSM 是传统金融的安全原语。银行、支付处理商、证书机构运行它们已有几十年。FIPS 140-2 / 140-3 认证、防篡改外壳、基于角色的访问控制、双人控制策略（任何单个操作员都不能独自签名）都是标准配置。

在比特币世界，HSM 撑起了多数大型托管业务：交易所冷存储、受监管托管人（Coinbase Custody、Anchorage、BitGo、Fidelity Digital Assets）、企业金库。典型模式是一个多签钱包，每个联署人的密钥放在一个单独的 HSM 里、归单独的运营方控制——这样任何单个 HSM 被攻破（或操作员串通）都不足以动用资金。

代价也是实打实的。企业级 HSM 从 1 万美元（入门网络型）到 10 万美元以上（顶级 FIPS 140-3 Level 3/4 设备）不等，还得加上运维团队。它的目标客户是被合规要求逼着上、且被保护资产的价值足以覆盖这些开销的机构。

对个人，硬件钱包就是消费级等价物。同一个思路（密钥不出设备、签名在芯片内完成），威胁模型小得多，价格便宜几个数量级。100 美元的硬件钱包与 5 万美元的 HSM 之间的差距，主要在认证体系、物理安全保证和多方访问控制。

**相关词条：** [物理隔离（Air-Gapped）](/glossary/air-gapped) · [比特币金库（Bitcoin Vault）](/glossary/bitcoin-vault) · [托管钱包（Custodial Wallet）](/glossary/custodial-wallet) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [硬件种子保险库](/glossary/hardware-seed-vault) · [硬件钱包（Hardware Wallet）](/glossary/hardware-wallet) · [层级确定性钱包](/glossary/hierarchical-deterministic-wallet) · [密钥生成仪式（Key Generation Ceremony）](/glossary/key-generation-ceremony) · [密钥轮换（Key Rotation）](/glossary/key-rotation) · [密钥拆分（Key Split）](/glossary/key-split) · [密钥擦除（Key Wiping）](/glossary/key-wiping) · [预言机投注（Oracle-based Betting）](/glossary/oracle-based-betting) · [安全（Security）](/glossary/security)
