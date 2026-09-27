---
title: Liquid 网络（Liquid Network）
---

# Liquid 网络（Liquid Network）

> **一句话定义：** Blockstream 开发的联盟式侧链：更快的结算、保密交易、锚定 BTC 模型。

**Liquid 网络**是 Blockstream 开发的联盟式比特币[侧链](/glossary/sidechain)，自 2018 年 9 月运行至今。它提供更快的结算（约 1 分钟一个区块，对比比特币的约 10 分钟）、机密交易（金额和资产类型对链上观察者隐藏），以及原生的资产发行框架。Liquid 上的锚定 BTC 称为 **L-BTC**。

Liquid 实际如何运作：

- **[Liquid 联盟](/glossary/liquid-federation)**——约 65 个实体（交易所、OTC 台、金融公司、Blockstream 自己）——运营这条侧链，出块权在联盟成员之间轮换。
- **锚入（Peg-in）**：把 BTC 发到主网上联盟控制的多签地址，Liquid 上 1:1 发行 L-BTC。
- **锚出（Peg-out）**：在 Liquid 上销毁 L-BTC，联盟把主网上的 BTC 释放回给用户。
- **机密交易**使用密码学承诺（同态 Pedersen 承诺）隐藏金额，同时让节点能验证没有发生超发。
- **资产发行。** Liquid 支持在 L-BTC 之外发行任意资产（如 Liquid 上的 Tether USD、PAXG 等黄金锚定代币、证券代币等）。

2026 年 Liquid 被用来做什么：

- **交易所间结算。** 大型比特币交易所之间用 Liquid 快速调拨资金，避开主网转账的 60 分钟确认延迟。
- **OTC 台。** 大宗交易时金额本来会暴露给链上分析师，机密交易在这里很重要。
- **稳定币发行。** USDT-Liquid 是比特币原生结算里有分量的稳定币网络之一。
- **证券代币试验。** 已有多家发行方在 Liquid 上发行代币化证券。

Liquid **不是**什么：

- **不像主网那样去信任。** 联盟理论上可以串谋。如果联盟多数成员签署一笔恶意的 peg-out，原则上他们可以偷走锚定的 BTC。这是一个信任假设（理性的人可以接受它），但与比特币的工作量证明安全模型有实质区别。
- **不是比特币的主扩容方案。** Liquid 服务一个特定利基（机构快速结算、机密交易）；[闪电网络](/glossary/lightning-network)才是通用的第二层。

联盟结构见 [Liquid 联盟](/glossary/liquid-federation)，更广的类别见[侧链](/glossary/sidechain)。

**相关词条：** [比特币桥（Bitcoin Bridge）](/glossary/bitcoin-bridge) · [Liquid 联盟（Liquid Federation）](/glossary/liquid-federation) · [多签（Multisig）](/glossary/multisig) · [转入锚定（Peg-in）](/glossary/peg) · [转出锚定（Peg-out）](/glossary/peg-out) · [第二层（Second Layer）](/glossary/second-layer) · [侧链（Sidechain）](/glossary/sidechain)
