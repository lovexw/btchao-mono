---
title: 费率地板（Fee Floor）
---

# 费率地板（Fee Floor）

> **一句话定义：** 一个事实上的最低费率——低于它，交易在合理时间内基本没机会被打包；它随内存池冷热浮动。

费率地板是这样一道实际的最低费率（单位 sat/vByte）：低于它，比特币交易在合理时间框架内不太可能确认。它不是协议层的常量，而是任意时刻[内存池](/glossary/mempool)状态与矿工行为的涌现属性。

两个常被混为一谈的概念：

- **中继策略下限。** Bitcoin Core 默认*接受*一笔交易进入内存池的最低费率：1 sat/vB。低于它，交易根本不会被 Core 节点中继。Knots 等其他实现可以设得更高。
- **市场地板。** 当前实际被打包的最便宜交易正在支付的费率。拥堵时它可以远高于中继下限；清淡时它与中继下限重合。

市场地板的行为：

- **清淡期（2024–2026 的典型低负载时段）：** 最便宜的交易付 1–2 sat/vB，几乎谁都能进。
- **中度拥堵：** 地板 5–20 sat/vB，最低费率的交易在内存池里坐几小时。
- **严重拥堵（Ordinals 铸造潮、交易所挤兑、市场恐慌）：** 地板飙到 50–500+ sat/vB。低于它的交易可能等上几天，或被直接驱逐。

什么决定了地板：

- **区块空间是固定的。** 每块约 4MB 等效权重，每天约 144 块 = 吞吐量有硬上限。
- **需求波动剧烈。** 几小时内可以冲到基线的 10 倍。
- **矿工按费率装包。** 出价最高的先进，出价低的排队。

没有任何人执行这道地板。它只是「交易需求超过区块空间」时的自然结果。现代钱包靠[手续费估算](/glossary/fee-estimation)把费率设得稳稳越过当前地板；激进的用户有时故意少付，赌之后用 [RBF](/glossary/replace-fee-rbf) 加价补救。

长期看，随着[区块补贴](/glossary/block-subsidy)递减、矿工收入更依赖手续费，费率地板会变成一个越来越要紧的数字。2140 年的终局要求单靠手续费就能供养挖矿；那时的地板必须高到足以支撑网络安全。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [加速器（Accelerator）](/glossary/accelerator) · [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [预计确认区块数](/glossary/estimated-confirmation-blocks) · [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [费率飙升（Fee Rate Escalation）](/glossary/fee-rate-escalation) · [手续费狙击（Fee Sniping）](/glossary/fee-sniping) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
