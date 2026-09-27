---
title: 加速器（Accelerator）
---

# 加速器（Accelerator）

> **一句话定义：** 帮助你的交易更快被打包或重播的第三方服务，通常收费。

交易加速器是帮助卡住的未确认[交易](/glossary/transaction)更快进块的第三方服务，典型做法是绕开链上渠道直接付费给矿池，换取打包优先权。

经典加速服务的工作方式：

1. 用户把卡住交易的 txid 提交到加速器的网页表单。
2. 服务通过传统支付渠道或一笔单独的链上交易，直接付钱给参与的矿池（一家或多家）。
3. 矿池在自己的区块模板里给这笔交易优先权：不管它的链上费率是多少，只要该矿池挖到区块就包含它。
4. 矿池挖到区块，交易得到确认。

历史上的两种形态：

- **免费加速器**（早期的 ViaBTC、BTC.com）：只要交易满足某个最低费率，就免费帮你重播。当重播方的对等连接比用户更广时，对略低于出清线的交易有用。
- **付费加速器**（ViaBTC 的商业服务、Mempool.space 由矿池出资的服务等）：付真金白银给参与的矿池，把你的交易塞进区块。

它们如今基本过时的原因：

- **RBF 已经普及。** 替换手续费（尤其 Bitcoin Core 28.0 在 2024 年默认开启 full-RBF 之后）让你自己就能给卡住的交易加价，不需要任何第三方。
- **子付父费（CPFP）可用。** 用高费率花费卡住交易的一个输出，把两笔交易一起拖进同一个区块。
- **内存池透明。** mempool.space 之类的费率估算工具让你一开始就很难把费率设错。

加速器是为「必须选择加入 RBF」的年代准备的补丁——那个年代很多交易以不可替换的形式广播，费率一旦定死就没有加价的可能。RBF 默认化之后，加速器的用例只剩两类：遗留的非 RBF 交易，以及原始签名钱包已经丢失的交易。2026 年的普通卡单：直接用 RBF 加价。

**相关词条：** [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [费率飙升（Fee Rate Escalation）](/glossary/fee-rate-escalation) · [手续费狙击（Fee Sniping）](/glossary/fee-sniping) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
