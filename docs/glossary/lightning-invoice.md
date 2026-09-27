---
title: 闪电发票（Lightning Invoice）
---

# 闪电发票（Lightning Invoice）

> **一句话定义：** 闪电网络的支付请求，常编码为 BOLT 11 字符串，方便收付。

闪电发票是[闪电网络](/glossary/lightning-network)上的支付请求。它是收款方生成并分享给付款方的一串编码，装着付款方找到并完成支付所需的一切。

标准格式是 **BOLT 11**，一个通常以 `lnbc`（主网）或 `lntb`（测试网）开头的编码串。内容包括：

- **金额**（可选——有些发票让付款方自填）。
- **支付哈希**——收款方掌握的一个秘密（*原像*）的哈希。原像揭晓，支付才算完成。
- **收款节点公钥**——哪个闪电节点收这笔钱。
- **路由提示**——关于哪些通道可以送达支付的可选信息，对公开连通性有限的节点很有用。
- **有效期**——发票多久内有效（默认通常 1 小时）。
- **描述/备注**——可选的人类可读说明。
- 收款节点的**签名**。

支付流程：

1. 收款方生成发票，传给付款方（二维码、复制粘贴、NFC 等）。
2. 付款方钱包解码发票，在网络中找到一条流动性足够的路径，转发一个 HTLC。
3. 每一跳把支付锁住，直到原像揭晓。
4. 最终收款方揭示原像领款，并沿路径反向级联。
5. 路径上的每个路由节点从此持有「支付已完成」的证明。

发票是一次性的。支付结清时支付哈希即告曝光，同一张发票付两次，要么失败（收款方不再接受），要么就是欺诈信号。

更新的格式 **BOLT-12 offer** 解决了 BOLT 11 的若干局限——可复用、支持周期性支付、更小、更私密。它于 2024 年 9 月正式合入闪电规范。到 2026 年，Core Lightning、LDK、eclair/Phoenix 已支持，LND 的采用仍在进行中。未来几年 BOLT-12 预计将逐步取代 BOLT 11。

发票如何被路由，见[闪电网络](/glossary/lightning-network)。

**相关词条：** [BOLT 11](/glossary/bolt-11) · [图修剪（Graph Pruning）](/glossary/graph-pruning) · [HTLC 发票](/glossary/htlc-invoice) · [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [闪电网络](/glossary/lightning-network) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电退款发票](/glossary/lightning-refund-invoice) · [闪电路由](/glossary/lightning-routing)
