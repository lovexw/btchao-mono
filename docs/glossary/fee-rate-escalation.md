---
title: 费率飙升（Fee Rate Escalation）
---

# 费率飙升（Fee Rate Escalation）

> **一句话定义：** 区块空间供不应求时的连锁反应——内存池被未确认交易填满，大家竞相抬价抢位。

费率飙升发生在对区块空间的需求超过供给时。内存池塞满未确认交易；矿工挑每 vbyte 出价最高的；所有人为了挤进区块互相加价。

比特币大约每 10 分钟产出一个区块，每块的有效上限约 400 万权重单位（典型交易数据约 1.5–2 MB）。这个上限由共识定死，不随负载扩容。当交易提交速率超过出块速率，内存池就开始堆积，想在未来一个（或几个）区块内确认所需的费率地板随之爬升。

历史上的费率尖峰：

- 2017 年 12 月牛市：单笔手续费一度突破 50 美元。
- 2021 年 4–5 月牛市：100+ sat/vbyte 的费率持续数周。
- 2022 年 12 月至 2024 年的 Ordinals/铭文时代：铭文铸造带来持续性的基线拥堵，周期性飙到数百 sat/vbyte。
- 减半后时段（尤其 2020 年 5 月与 2024 年 4 月）：矿工补贴收入骤降、网络重新调整，引发短暂飙升。

费率飙升时你能做什么：

- 等。费率飙升通常会自我修正：费用一涨，边际用户退出，内存池几小时到几天内就清空。
- 用闪电网络。链下支付不跟人抢同一块区块空间。
- 用[按费替换（RBF）](/glossary/replace-fee-rbf)给卡住的交易加价。
- 合并打包。一笔交易多个收款人，摊薄手续费开销。
- 用 Taproot。Schnorr 签名与 key-path Taproot 花费比 ECDSA 等价物略小。

基础层把费率置于吞吐量之上，这是特性而非缺陷。正是它让比特币的区块大小上限在政治上可行，并把空间让给闪电网络去做真正的大容量支付通道。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [加速器（Accelerator）](/glossary/accelerator) · [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [预计确认区块数](/glossary/estimated-confirmation-blocks) · [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [费率地板（Fee Floor）](/glossary/fee-floor) · [手续费狙击（Fee Sniping）](/glossary/fee-sniping) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
