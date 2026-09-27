---
title: 手续费估算（Fee Estimation）
---

# 手续费估算（Fee Estimation）

> **一句话定义：** 根据当前网络状况，预测在目标时间内确认所需的 sat/vByte 费率。

手续费估算是钱包的功课：预测你到底该付多少聪每虚拟字节（sat/vB），才能让[交易](/glossary/transaction)在目标区块数内被确认。付少了，你就干等；付多了，白白浪费钱。

估算靠两个信号源：

- **[内存池](/glossary/mempool)的当前状态。** 每个费率档位上排着多少未确认交易数据？内存池越满，费率的地板就越高。
- **最近的区块历史。** 过去几个区块实际打包了什么费率的交易？这把估算锚定在「矿工此刻真正接受什么」上。

Bitcoin Core 自带一个估算器，通过 `estimatesmartfee` RPC 暴露出来——大多数节点和钱包都以它为准，有时再混入第三方数据。估算分档给出：下一区块、约 3 个区块、约 6 个区块、约 24 个区块。越不着急，费率越低。

在网络清闲的时段，估算器往往所有档位都返回 1 sat/vB——即中继最低费率。而一旦拥堵事件爆发（Ordinals 铸造潮、交易所提币风暴、行情恐慌），下一区块的估算费率能在几分钟内窜到数百 sat/vB。

记住：估算只是**猜测**。万一你付少了、交易卡住了，还有[手续费加价](/glossary/fee-bumping)可以救场。实时的手续费行情可以在[挖矿专题](/rabbit-holes/mining)和[节点页](/node)看到。

**相关词条：** [交易](/glossary/transaction) · [交易手续费](/glossary/transaction-fee) · [绝对手续费](/glossary/absolute-fee) · [内存池](/glossary/mempool) · [手续费加价](/glossary/fee-bumping) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [加速器](/glossary/accelerator) · [预计确认区块数](/glossary/estimated-confirmation-blocks) · [费率地板](/glossary/fee-floor) · [费率飙升](/glossary/fee-rate-escalation)
