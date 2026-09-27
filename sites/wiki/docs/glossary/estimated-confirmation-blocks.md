---
title: 预计确认区块数
---

# 预计确认区块数

> **一句话定义：** 钱包和浏览器显示的那个预估——按当前费率，这笔交易还要等多少个区块确认。

「预计确认区块数」是手续费估算的输出：给定当前内存池状态和交易的费率，还要多少个区块它能确认？多数钱包和浏览器把它显示成「约 3 个区块后确认」或「约 30 分钟」这样的标签。

估算是怎么算出来的：

- **Bitcoin Core 的 `estimatesmartfee` RPC** 返回在某个目标概率下、N 个区块内确认所需的费率。它靠观察最近的区块内容和内存池构成来工作。
- **内存池快照**——mempool.space 这类站点把待确认交易按费率分组，并按每个区块 400 万权重单位的容量预算，投影排在前面的交易需要几个区块消化。
- **钱包集成**把两者合起来：先选一个目标确认时间，查对应的费率，再按这个费率构建交易。

什么会让估算失准：

- **拥堵期的费率飙升。** 一波新的高费率交易能把你的交易往后推好几个区块。估算会更新，但你已经广播出去的交易卡在原费率上——除非你加价。
- **空区块。** 偶尔会有矿工产出空块或接近空的区块（有时是 SPV 挖矿的原因），浪费了区块空间容量，把排队交易往后推。
- **内存池突然清空。** 连续几个大块可以清掉积压，让实际确认时间比估算更快地缩短。

正确用法：选一个确认目标，用估算出的费率，然后接受实际确认时间在估算上下浮动 1–3 个区块的现实。对时间敏感的支付，记得标记 RBF、做好加价准备。对「今天确认就行」的场景，默认估算足够了。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [加速器（Accelerator）](/glossary/accelerator) · [区块（Block）](/glossary/block) · [区块高度（Block Height）](/glossary/block-height) · [区块传播（Block Propagation）](/glossary/block-propagation) · [出块时间（Block Time）](/glossary/block-time) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [费率地板（Fee Floor）](/glossary/fee-floor) · [费率飙升（Fee Rate Escalation）](/glossary/fee-rate-escalation) · [手续费狙击（Fee Sniping）](/glossary/fee-sniping) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
