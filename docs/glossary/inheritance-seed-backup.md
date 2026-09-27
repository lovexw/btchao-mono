---
title: 继承种子备份（Inheritance Seed Backup）
---

# 继承种子备份（Inheritance Seed Backup）

> **一句话定义：** 确保继承人能在你身后取回 BTC 的方法与机制（如多签），同时不牺牲你在世时的安全。

继承种子备份，解决的是「你身故或永久失能后，别人如何找回你的比特币」，且以不削弱你生前钱包安全为前提。

比特币没有客服、没有遗嘱执行人、没有找回机制。继承人若不知道你的[助记词](/glossary/seed-phrase)（或无法复原你的多签配置），BTC 就永久灭失。链不管遗嘱认证。真有人这样把偌大家产埋进了土里。

两组互相打架的要求：

- **继承人最终必须能拿到资金。** 他们得知道种子存在、放在哪、怎么用。
- **继承人不能提前拿到资金。** 你还在用钱包，你侄子就拿到了助记词——那你等于把钱送他了。
- **对手不能胁迫或诱骗继承人交出访问权。** 「你姑姑去世了，这是认领她 BTC 的流程」——钓鱼脚本的标准开头。

常见方案，从简到繁：

- **律师保管密封信。** 写明钱包配置、[硬件设备](/glossary/hardware-wallet)清单、助记词备份存放地。律师持有信封，在你身后启封。中等金额适用；依赖司法管辖区靠得住。
- **带延迟访问的多签。** 2-of-3 配置：你持 2 把，受信托管方持 1 把，另设一个时间锁分支——托管方 + 指定继承人在长延迟（如 6 个月）后可花费。延迟期内你活着就能否决；你不在了，继承分支终会解锁。
- **Shamir 秘密共享。** 把种子拆成 N 份，任意 K 份可复原。分发给家人或受托人。有用，但复杂度上来了。
- **专业继承服务。** Casa、Unchained、Nunchuk、Theya 等提供协作托管继承方案，与它们既有的多签产品打通。

无论选哪种，**一定要演练**。让继承人（或替身）用一个装了零钱测试币的小钱包走一遍恢复流程。没彩排过的方案等于没有方案。托管配置一变，就更新方案。

更精巧的玩法见[分层多签](/glossary/hierarchical-multisig)。

**相关词条：** [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [比特币金库](/glossary/bitcoin-vault) · [确定性钱包](/glossary/deterministic-wallet) · [硬件种子保险库](/glossary/hardware-seed-vault) · [硬件钱包](/glossary/hardware-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [助记词](/glossary/seed-phrase) · [安全](/glossary/security)
