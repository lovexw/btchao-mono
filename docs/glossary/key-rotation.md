---
title: 密钥轮换（Key Rotation）
---

# 密钥轮换（Key Rotation）

> **一句话定义：** 定期更换或新生成密钥，把旧密钥泄露的暴露最小化。

「密钥轮换」在比特币语境里有两种截然不同的含义，混为一谈是常见的困惑来源：

- **地址轮换：** 每次收款用新地址。[HD 钱包](/glossary/hd-wallet-hierarchical-deterministic-wallet)自动完成，每个地址的钥匙都从同一颗主种子派生，种子本身不动。这是隐私卫生，不是安全轮换，且如今所有现代钱包默认如此。
- **真正的密钥轮换：** 把资金从一套钥匙整体转移到一套全新钥匙，然后销毁或封存旧钥匙。这才是企业安全策略里「轮换密钥」的意思。在比特币里这是一次刻意的手动操作：把所有币花到新种子派生的新地址。

真正的密钥轮换在什么情况下有意义：

- 多签的某个联署人离场，你不想让他继续持有（哪怕已经不够门槛的）份额。
- 怀疑某把钥匙可能已泄露但不确定（比如冷备份短暂脱离过视线）。
- 一套用了很久的配置积累了太多操作历史，与其逐一审计每个历史接触点，不如推倒重来。

对多数个人用户来说，后一种意义上的周期性轮换是过度反应。躺在[硬件钱包](/glossary/hardware-wallet)里的种子，今年的风险并不比去年高。隐私问题由地址轮换（自动）解决；没有缘由就去轮换底层种子，只会给迁移过程平添人为出错的机会。

**相关词条：** [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [链码](/glossary/chaincode) · [确定性钱包](/glossary/deterministic-wallet) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [硬件钱包](/glossary/hardware-wallet) · [密钥生成仪式](/glossary/key-generation-ceremony) · [密钥拆分](/glossary/key-split) · [密钥擦除](/glossary/key-wiping) · [纸钱包](/glossary/paper-wallet) · [安全](/glossary/security) · [隐形地址](/glossary/stealth-address)
