---
title: 比特币遗产规划（Bitcoin Inheritance Planning）
---

# 比特币遗产规划（Bitcoin Inheritance Planning）

> **一句话定义：** 确保继承人能在你身故后拿到你的 BTC——同时保证你活着时他们拿不到——的组合拳：多签、受托人、时间锁脚本、法律文书。

比特币遗产规划是这样一套实践：确保你身故或永久失能后，继承人能够访问你的 BTC，又不让他在你生前提前拿到。

比特币没有遗嘱认证法庭、没有拥有行政Override权限的执行人、没有可以传票的银行。如果你的继承人没有一条走到你[私钥](/glossary/private-key)（或[助记词](/glossary/seed-phrase)、或你的多签配置）的可行路径，这些 BTC 就永久丢了。许多真实财富就这样长眠链上——区块链不在乎你的死亡证明。

互相竞争的要求：

1. **继承人最终必须拿得到。** 他们需要知道钱包存在、材料放在哪、该做什么。
2. **继承人在你生前不能拿到。** 你还在用这个钱包时就把助记词交给继承人，等于把钱直接给了他们。
3. **攻击者不能胁迫或诱骗继承人交出权限。** 「令尊过世了，点这里领取他的 BTC」是一套等着被利用的钓鱼话术模板。

常见方案：

- **律师保管的密封信。** 写清钱包结构、硬件设备位置、助记词存放处。律师保管信封，接到死讯后启封。适合中等金额；取决于司法辖区。
- **延时访问的多签。** 2-of-3 配置：你持 2 把钥匙，指定继承人（或受托人）持 1 把；再加一个时间锁分支，长期无活动（如 6 个月）后允许继承人 + 受托人花费。延时期内你活着就能否决；你不活着就否决不了。
- **Shamir 秘密分享。** 把种子切成 N 份，K-of-N 才能复原，分发给各受托人。有用，但增加复杂度。
- **专业服务**：Casa、Unchained、Theya、Nunchuk、AnchorWatch 等，提供与它们多签产品打通的协作托管型遗产方案。

演练至关重要。**让你的继承人（或替身）用一个小额测试钱包把恢复流程完整走一遍**。托管配置一变就更新方案。没演练过的方案，等于没有方案。

备份机制见[继承型种子备份](/glossary/inheritance-seed-backup)；多数现代方案底下的多签模式见[分层多签](/glossary/hierarchical-multisig)。

**相关词条：** [去中心化（Decentralization）](/glossary/decentralization) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [硬件钱包（Hardware Wallet）](/glossary/hardware-wallet) · [HD 钱包（Hierarchical Deterministic Wallet）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [层级确定性钱包（Hierarchical Deterministic Wallet）](/glossary/hierarchical-deterministic-wallet) · [继承型种子备份](/glossary/inheritance-seed-backup) · [密钥生成仪式（Key Generation Ceremony）](/glossary/key-generation-ceremony) · [密钥轮换（Key Rotation）](/glossary/key-rotation) · [纸钱包（Paper Wallet）](/glossary/paper-wallet) · [助记词（Seed Phrase）](/glossary/seed-phrase)
