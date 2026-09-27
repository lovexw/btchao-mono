---
title: OP_RETURN
---

# OP_RETURN

> **一句话定义：** 比特币脚本操作码：让一个输出携带任意数据，同时保证该输出不可花费。

**OP_RETURN** 是[比特币脚本](/glossary/bitcoin-script)中一个让输出故意不可花费的操作码。「花费」路径注定失败，所以任何以 OP_RETURN 开头的输出立刻从 UTXO 集中移除——这给了你一种往比特币交易里嵌入任意数据、又不撑大未花费输出数据库的方法。

基本结构：`OP_RETURN <data>`，`<data>` 最多 80 字节（标准性限制）。输出金额通常为零或接近零聪（会产生一个很小的粉尘输出）。数据永久留在链史里，但不占用 UTXO 集。

OP_RETURN 用来做什么：

- **存在证明 / 时间戳。** 把文档哈希嵌进去，事后证明该文档在那个区块高度之前就存在。OpenTimestamps 等服务在用。
- **跨链承诺。** [Liquid](/glossary/liquid-network) 等侧链和 Counterparty 等协议用 OP_RETURN 输出嵌入跨系统元数据。
- **二层锚定。** 一些二层协议用 OP_RETURN 锚定状态承诺。
- **[序数 / 铭文](/glossary/opreturn-based-tokens)（沾边）。** 铭文技术上用的是 Taproot 见证脚本而非 OP_RETURN，但「数据嵌入」这个问题在结构上相同，OP_RETURN 也被卷进了争论。

围绕 OP_RETURN 的社区争论：

- **挺数据派：** 链归付费用户所有——用户愿意付手续费嵌数据，就有正当用途（时间戳、侧链承诺等），滥用自有手续费市场来管。
- **反数据派：** 比特币的首要目的是货币；非货币数据抬高所有人的手续费、挤走正当的金融交易，不该被转发或打包。一些节点（[Bitcoin Knots](/glossary/bitcoin-knots)）刻意在自己的内存池里过滤这类交易。

两个立场都站得住；2024–2026 年活着的争论是*哪种*节点转发政策才合适。协议本身接受 OP_RETURN；节点层面的策略才是战场。

早期代币实验的用例见[基于 OP_RETURN 的代币](/glossary/opreturn-based-tokens)。

**相关词条：** [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [操作码（OP Code）](/glossary/op-code-operation-code) · [基于 OP_RETURN 的代币](/glossary/opreturn-based-tokens) · [脚本（Script）](/glossary/script) · [无脚本脚本（Scriptless Scripts）](/glossary/scriptless-scripts)
