---
title: BOLT 11
---

# BOLT 11

> **一句话定义：** 闪电网络发票格式（常以 lnbc 开头），编码金额与目的地等支付数据。

BOLT 11 是[闪电发票](/glossary/lightning-invoice)的规范——那种以 `lnbc`（主网）或 `lntb`（测试网）开头的编码支付请求。它是定义闪电各实现互操作的 [BOLT 规范](/glossary/bolt)之一。

一张 BOLT 11 发票编码了付款方完成支付所需的一切：

- **金额**（可选——发票不填时由付款方指定）。
- **支付哈希**——秘密原像的哈希，原像揭晓即支付完成。
- **收款节点公钥。**
- **路由提示**——给与公开图连通不佳的节点用的（移动钱包很需要）。
- **有效期**——默认 1 小时。
- **可选的描述/备注。**
- 收款节点**签名**，证明发票由它创建。

整个串用 bech32 编码——与原生隔离见证地址相同的编码。结果是一个足够短、放得进二维码的字符串，可以复制粘贴、扫码、NFC 碰一碰。

设计上就是一次性的。支付结清时支付哈希即曝光，复用同一张发票要么失败、要么就是欺诈信号。想在同一个固定「门牌」下收周期性付款，得用 BOLT-12 offer（现代后继）或「每笔付款一张发票」的流程。

自 2017 年起，BOLT 11 一直是闪电支付请求的通用语，每个闪电钱包都支持。BOLT-12 正在逐步取代它，但 BOLT 11 未来许多年仍将大量在用。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [按分钟付费模型（Lightning）](/glossary/audiobook-model-lightning) · [自动驾驶（Autopilot）](/glossary/autopilot-lightning) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BOLT](/glossary/bolt) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [闪电锚定承诺交易](/glossary/lightning-anchor-commitment) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电发票（Lightning Invoice）](/glossary/lightning-invoice) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电退款发票](/glossary/lightning-refund-invoice) · [闪电路由（Lightning Routing）](/glossary/lightning-routing)
