---
title: 部分签名（Partial Signature）
---

# 部分签名（Partial Signature）

> **一句话定义：** 多签或 PSBT 流程中单个参与者的签名，等待更多签名凑齐后方可花费。

部分签名是一个联署人对多方签名交易的贡献。它本身不是完整签名；只有当足够多的部分签名凑齐、达到脚本的门槛，交易才有效。

现代比特币里有两种形态：

- **经典多签。** 每个联署人对同一 sighash 各自产出一个完整的 ECDSA 或 Schnorr 签名，由脚本在链上组合 M 个（如 2-of-3 P2WSH 或一个 Taproot 脚本路径叶子）。部分签名通过 [PSBT](/glossary/psbt) 工作流传递：每个签名人把自己的签名添加进 PSBT 再传给下一位，门槛凑齐后由任何人完成交易定稿。
- **聚合签名（MuSig2、FROST）。** 每个联署人产出的是部分签名——它只是同一个 Schnorr 签名的一个碎片，单独拿出来不是有效签名。协议把它们合成一个签名，链上最终只落这一个签名。在外部观察者眼里，与单签毫无区别。

第一种自 2012 年 P2SH 多签起就是比特币的标准做法，也是今天多数硬件钱包多签流程所使用的。第二种是 Taproot 之后（2021 年起）的新事物，支撑着现代闪电通道以及对隐私和链上足迹敏感的新一代金库设计。

**相关词条：** [PSBT（部分签名比特币交易）](/glossary/psbt) · [分层多签](/glossary/hierarchical-multisig) · [M-of-N 多签](/glossary/m-n) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [法定人数签名](/glossary/quorum-signatures) · [多签](/glossary/multisig) · [Taproot](/glossary/taproot)
