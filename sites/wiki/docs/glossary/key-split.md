---
title: 密钥拆分（Key Split）
---

# 密钥拆分（Key Split）

> **一句话定义：** 把私钥拆成多个片段（如 Shamir 秘密共享），任何单一份额都无法独自花费。

密钥拆分把一把私钥（或一颗种子）切成多份：凑够门槛数量的份额可以重建出秘密，少一个都不行。经典数学方案是 Shamir 秘密共享（SSS）。

在比特币实践中，最常见的形态是 SLIP-39——一套针对 BIP 39 种子的标准化 SSS 方案。Trezor 原生支持，SeedSigner 之类的工具能把任何种子转成 SLIP-39 份额。典型配置：2-of-3 或 3-of-5，份额分散在不同地理位置或不同可信的人手里。

多数入门介绍都会跳过的关键警告：密钥拆分和[多签](/glossary/multisig)不是同一种安全模型。

- **多签：** 每个联署人用自己的钥匙独立签名，脚本负责把 M 个签名组合起来。任何单台设备从头到尾都不持有完整的花费能力。
- **密钥拆分：** 签名那一刻，必须先把门槛数量的份额在某一台设备上重组成完整的私钥，再由那台设备签名。那台设备在瞬间持有整把钥匙。

所以密钥拆分非常适合冷备份分发（任何一个地点都不足以偷走钱包），但对热/温状态下的日常操作不如多签（重组瞬间是个诱人的攻击目标）。多数重视安全的配置：操作层用多签，单个钥匙的备份分发则可以再用 SSS。

**相关词条：** [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [密钥生成仪式](/glossary/key-generation-ceremony) · [密钥轮换](/glossary/key-rotation) · [密钥擦除](/glossary/key-wiping) · [多签](/glossary/multisig) · [纸钱包](/glossary/paper-wallet) · [安全](/glossary/security)
