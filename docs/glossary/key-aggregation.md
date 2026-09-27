---
title: 密钥聚合（Key Aggregation）
---

# 密钥聚合（Key Aggregation）

> **一句话定义：** 把多个公钥合成一把聚合密钥（如 MuSig/Schnorr），减少链上数据、增强隐私。

密钥聚合把多个公钥合并成一个公钥，花费时需要全部（或达到门槛数量的）原钥匙持有人参与签名。在外部观察者眼里，聚合钥匙和它产生的签名，与一个普通单签钱包毫无区别。

这是 Schnorr 的性质，ECDSA 做不到。ECDSA 的签名没有干净的线性组合方式；Schnorr 的线性性才是聚合的数学基础。Taproot（BIP 340/341，2021 年 11 月激活）把它带进了比特币。

主要协议：

- **MuSig 与 MuSig2：** 交互式的 n-of-n 聚合。所有联署人必须到场才能产出一个签名。MuSig2 需要两轮通信，初版 MuSig 需要三轮。
- **FROST（Flexible Round-Optimized Schnorr Threshold）：** m-of-n 门槛聚合。n 个签名人里任意 m 个就能产出同一个聚合签名，其余 n−m 个不用参与。

为什么重要：一个 3-of-3 的 MuSig2 钱包，在链上看起来就是一笔普通的 Taproot 单签输出。用 FROST 的联邦，开销和任何 Taproot 单签花费一模一样。多签用户获得了普通用户的隐私和手续费画像，而不是把自己的安全模型广播给全链。

代价是交互性。Taproot 之前的经典多签（P2WSH）不要求联署人签名时在线；聚合方案要求。目前生产环境里的多数多签（冷存储、硬件钱包仲裁组）因此仍是经典形态。聚合方案增长最快的地方是[闪电网络](/glossary/lightning-network)通道和协议层构造——那里本来就需要交互。

**相关词条：** [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [Schnorr 签名](/glossary/schnorr-signature) · [签名聚合](/glossary/signature-aggregation) · [Taproot](/glossary/taproot)
