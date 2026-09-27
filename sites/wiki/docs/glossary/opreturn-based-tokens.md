---
title: 基于 OP_RETURN 的代币
---

# 基于 OP_RETURN 的代币

> **一句话定义：** 早期在比特币上发行资产的方案：用 OP_RETURN 输出编码代币所有权元数据。

基于 OP_RETURN 的代币是早期在比特币之上发行资产的尝试：把代币所有权元数据编码进 [OP_RETURN](/glossary/opreturn) 输出。比特币协议对这些代币一无所知——它们只是客户端软件约定俗成的规则，靠扫描链上特定 OP_RETURN 模式来执行。

族谱：

- **彩色币（Colored Coins，2012–2014）。** 原始概念：用元数据给特定聪「上色」，让它们代表股份、商品或其他资产。ChromaWallet 等是其实现。
- **Counterparty（2014+）。** 用 OP_RETURN 编码操作，在比特币上搭了一层代币化协议。办过 ICO、资产发行，还有最早的「比特币 NFT」案例之一（Rare Pepes，2016）。到 2026 年仍以小众身份运营。
- **Omni Layer。** 2014–2019 年用 OP_RETURN 在比特币上发行 Tether USD，之后 Tether 迁往以太坊/波场等。仍有少量 USDT-Omni 遗留在流通。
- **RGB 协议（较新）。** 严格说不算基于 OP_RETURN——它用[无脚本脚本](/glossary/scriptless-scripts)和客户端验证——但在「给比特币加资产发行层」这个概念上相通。

基于 OP_RETURN 的代币的根本取舍：

- **没有共识层执行。** 比特币节点不验证代币逻辑。客户端软件出 bug，整个代币生态可能失步。原生 BTC 与代币转账之间也不存在「原子交换」——它们是叠在同一条链上的两个独立概念。
- **链上膨胀。** 每笔代币操作都消耗区块空间、支付主网手续费，而活动与比特币的货币用途毫无关系。
- **中心化的发行与监督。** 代币发行方和追踪基础设施往往中心化；链上膨胀照发生不误。

如今在比特币之上发行资产的替代方案：[Liquid](/glossary/liquid-network)（联盟侧链）、Stacks（锚定比特币的链）、闪电原生的发票协议、RGB（客户端验证）。各有取舍，规模都远不及以太坊式的代币生态。

基于 OP_RETURN 的代币如今基本是历史 curiosité。当代围绕铭文的争论在结构上与之相似，但走的是 Taproot 见证数据而非 OP_RETURN。

**相关词条：** [BitLicense](/glossary/bitlicense) · [彩色币（Colored Coins）](/glossary/colored-coins) · [OP_RETURN](/glossary/opreturn)
