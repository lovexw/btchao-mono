---
title: Sphinx（闪电洋葱路由）
---

# Sphinx（闪电洋葱路由）

> **一句话定义：** 闪电网络使用的洋葱路由协议：模糊每一跳的身份，保护路由隐私。

Sphinx 是闪电用于[洋葱路由](/glossary/onion-routing-lightning)的具体密码学数据包格式，定义于 BOLT-4。它是随每笔闪电支付同行的数据结构：告诉每个路由跳下一站是谁，而不暴露完整路径。

Sphinx 数据包是固定尺寸的（标准格式 1,300 字节），与支付要经过多少跳无关。这是刻意设计：如果包的大小随跳数变化，观察者就能推断路径长度。填充让每颗洋葱一样宽。

洋葱的每一层用对应跳的公钥派生的密钥加密。一个节点收到 Sphinx 数据包后：

1. 用自己的私钥解密最外层。
2. 读出转发指令（下一跳、金额、超时）。
3. 重新填充剩余部分，转发给下一跳。

下一跳看到的洋葱，尺寸和结构与上一跳收到的完全一样——它分不清自己是第 2 跳还是第 5 跳。

Sphinx 由 George Danezis 和 Ian Goldberg 于 2009 年设计，原本面向 mixnet 和一般洋葱路由系统。闪电把它借鉴改造为专用于支付路由的版本。同一套底层密码学也用在其他隐私系统里。

Sphinx 是闪电隐私主张的可信来源，也是闪电相对链上比特币堪称严格隐私升级的原因：支付不但不上公开链，连路由路径都对直接邻居以外的所有人隐藏。

**相关词条：** [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [堵塞攻击（LN）](/glossary/jamming-attack-ln) · [HTLC 堵塞探测器](/glossary/jammed-htlc-detector) · [闪电网络](/glossary/lightning-network) · [闪电节点](/glossary/lightning-node) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电探测（Lightning Probe）](/glossary/lightning-probe) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [洋葱路由（Lightning）](/glossary/onion-routing-lightning)
