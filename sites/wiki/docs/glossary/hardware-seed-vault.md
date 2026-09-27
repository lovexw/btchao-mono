---
title: 硬件种子保险库（Hardware Seed Vault）
---

# 硬件种子保险库（Hardware Seed Vault）

> **一句话定义：** 专门构建的离线安全环境（硬件或专用设备），用于生成和保存助记词。

硬件种子保险库，是一个用途单一的离线环境：生成、保存、偶尔使用比特币种子，而绝不让它接触任何联网硬件。

它是比「硬件钱包」更大的伞。硬件钱包（Trezor、Jade、BitBox、Ledger 等）是消费级版本：一台小小的专用签名设备。种子保险库则可能是：

- 一台永不联网的[气隔](/glossary/air-gapped)笔记本，种子手工录入，加密存放在离线存储中。
- SeedSigner 式的无状态设备：每次签名会话时，从背熟或纸质保存的种子现派生钥匙。
- 机构场景里围绕[硬件安全模块（HSM）](/glossary/hardware-security-module-hsm)构建的金库设备，配多人物理准入控制。
- 一台放在法拉第屏蔽房间里的专用电脑，只用于离线签署交易——PSBT 文件靠 SD 卡传递。

共同属性是气隔纪律：种子永远不碰联网机器。交易在联网机器上组装，以未签名 PSBT 导出到介质，带进保险库签名，再带回来。联网机器上潜伏着什么恶意软件，都摸不到种子。

对多数个人，一台[硬件钱包](/glossary/hardware-wallet)足够了。赌注更高的场景（大额余额、机构、多签共签职责），下一步才是带更严格气隔控制的专用种子保险库。只有当价值配得上时，威胁模型才配得上这份操作成本。

**相关词条：** [气隔](/glossary/air-gapped) · [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [比特币金库](/glossary/bitcoin-vault) · [确定性钱包](/glossary/deterministic-wallet) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [硬件钱包](/glossary/hardware-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [继承种子备份](/glossary/inheritance-seed-backup) · [助记词](/glossary/seed-phrase) · [安全](/glossary/security)
