---
title: 批量交易（Batch Transaction）
---

# 批量交易（Batch Transaction）

> **一句话定义：** 把多笔比特币支付合并进一笔链上交易，省手续费、减网络负载。

批量交易把多笔本来独立的支付捆成一笔多输出的[交易](/glossary/transaction)。不用发 n 笔交易、各自承担输入开销和确认等待，而是一笔交易同时付给 n 个收款人。

省下的钱是真金白银。交易的字节大头在输入（脚本、签名、见证数据），不在输出。给一笔交易多加第五个输出大约多花 30 vB；分五笔发则是五份完整的输入开销。处理提现的[交易所](/glossary/exchange)、付息的托管方、发薪服务、矿池派奖——都是经典的批量交易用户。据估算，Coinbase Exchange 的批量提现多年来省下了数百万美元的网络手续费。

你交出去的东西：

- **收款人的隐私。** n 个收款人全部暴露在同一笔交易里。链上分析可以把他们聚类为「同一天被同一来源付款」，置信度远高于 n 笔独立交易。
- **运营系统的原子性。** 某个收款地址无效、某笔支付要撤回时，没法单改一笔——整批要么已广播要么已确认。
- **确认时间齐涨齐跌。** 整批一起确认。费率设错，所有收款人一起等。

对高吞吐的运营方，手续费节省占上风。对隐私敏感的流程（捐赠、金额不该被关联的工资单），独立交易仍然是对的选择。诚实的答案是「取决于你在优化谁的隐私」。

**相关词条：** [合并交易（Consolidation Transaction）](/glossary/consolidation-transaction) · [交易（Transaction）](/glossary/transaction) · [交易链（Transaction Chaining）](/glossary/transaction-chaining) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
