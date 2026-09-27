---
title: 洋葱路由（Lightning）
---

# 洋葱路由（Lightning）

> **一句话定义：** 闪电的隐私技术：层层加密，每一跳只知道下一站，藏起完整路径。

洋葱路由是[闪电](/glossary/lightning-network)用来防止中间路由节点知晓支付完整路径的隐私技术。每一跳只知道上一跳和下一跳，永远不知道最初的发送方和最终的收款方。

机制：付款方钱包把支付指令包进层层嵌套的加密里，像一颗洋葱。每个路由节点解密（剥开）一层，得知下一站是谁，但看不到洋葱更深处。转发之后，它知道的只有「我从 X 收到、转发给了 Y」——链条两端是谁，一概不知。

这与 **Tor** 匿名网络是同一思路（闪电的选择正是受其启发）。闪电的具体协议叫 **[Sphinx](/glossary/lightning-sphinx)**，定义于 BOLT-4。

洋葱路由实现了什么：

- **付款方隐私。** 目的节点不知道谁付的款——只知道*某个*上游跳付的。
- **收款方隐私（对中间跳而言）。** 付款方不向任何中间跳透露最终收款人。
- **跳与跳不可关联。** 中间跳分不清自己转发的是 2 跳支付还是 7 跳支付——除了有限的时序分析线索。

它没能完全实现的：

- **绝对隐私。** 运行大量闪电节点的高水平对手，可以跨网络做时序与金额关联。
- **对付款方的收款人匿名。** 付款方自己知道在付给谁（发票是ta解码的）。
- **对通道对手方的防护。** 付款方的直接通道伙伴看得到你发起了*某笔*支付，尽管看不到目的地。

洋葱路由是闪电相对链上比特币的一项实质性隐私优势。配合闪电的链下本质（支付完全不公开广播），这是很大的提升——但严格意义上并不是匿名。

**相关词条：** [窃听攻击](/glossary/eavesdropping-attack) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [I2P（隐形互联网计划）](/glossary/i2p-invisible-internet-project) · [闪电网络](/glossary/lightning-network) · [闪电节点](/glossary/lightning-node) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [Sphinx（闪电洋葱路由）](/glossary/lightning-sphinx) · [Tor 隐藏服务](/glossary/tor-hidden-service)
