---
title: 法定人数签名（Quorum Signatures）
---

# 法定人数签名（Quorum Signatures）

> **一句话定义：** 门限签名方案：签名者子集（法定人数）协作才能产出有效签名。

法定人数签名就是门限签名：n 个联署人中任意 m 个（m-of-n）协作产出一个聚合签名，不要求全员到场。链上输出看起来与普通 Taproot 单签毫无区别。

比特币生态里活跃的协议是 FROST（Flexible Round-Optimized Schnorr Threshold），2024–2026 年有严肃的实现工作落地。比如 FROST 允许 8 个签名人中的任意 5 个共同对一个 Taproot 输出产出一个签名，其余 3 人持有份额但本轮缺席。

为什么值得关心：

- **隐私：** 链上无法区分这笔花费是 5-of-8 还是 1-of-1 签的。任何 m-of-n 结构都不外泄。
- **手续费：** 一个签名替代 m 个，一把公钥替代 n 把。复杂多签的节省相当可观。
- **韧性：** 任意 m 个签名人即可花费，因此最多丢 n−m 把钥匙都还能活，不需要另设时间锁恢复路径。

代价是交互性和仪式复杂度。FROST 在搭建时需要一次分布式密钥生成仪式（任何单方都见不到完整钥匙），签名时参与人之间需要多轮协调。经典 M-of-N 多签在操作上更简单：每个联署人独立、异步地签，代价是更大的链上足迹和多签特征的外泄。

对普通用户这是杀鸡用牛刀。对联邦（Liquid 联盟成员、Fedimint 守护者）和机构托管来说，随着工具链成熟，Schnorr 门限签名正在成为现代默认选项。

**相关词条：** [回拨机制](/glossary/clawback-mechanism) · [信誉债券](/glossary/fidelity-bond) · [HDM（多签 HD 钱包）](/glossary/hdm-multi-signature-hd-wallet) · [分层多签](/glossary/hierarchical-multisig) · [交互式多签](/glossary/interactive-multi-sig) · [M-of-N 多签](/glossary/m-n) · [单一签名](/glossary/mono-signature) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [部分签名](/glossary/partial-signature) · [PSBT（部分签名比特币交易）](/glossary/psbt) · [多签](/glossary/multisig) · [Taproot](/glossary/taproot)
