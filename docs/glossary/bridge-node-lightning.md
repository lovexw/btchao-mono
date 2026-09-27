---
title: 桥接节点（Lightning）
---

# 桥接节点（Lightning）

> **一句话定义：** 在闪电网络不同部分之间主动路由支付的节点，连通原本孤立的通道或对等点。

桥接节点是横跨闪电网络图中本会断开的区段维护通道的[闪电节点](/glossary/lightning-node)——充当节点区域之间的结缔组织：没有它，这些区域的节点之间就没有直接路由可选。

实践中，「桥接节点」与「路由节点」高度重叠——区别更多在于网络拓扑中的位置而非角色。一个用大量高容量通道连通 gossip 图中稀疏部分的节点，就是桥接，不管它自己怎么标榜。

谁在跑桥接节点：

- **商业路由运营者。** River、Voltage、托管闪电服务，以及以路由为业的专门运营。他们为手续费收入和在线率优化。
- **大型交易所与闪电服务商。** Coinbase、Strike、Cash App 为自家用户流量跑大型闪电基础设施，顺带做机会性路由。
- **资金雄厚的重度用户。** 一些自我托管运营者把像样的路由节点当爱好跑，还略有正收益。

桥接节点的收支：

- **路由费**——单笔极小，但每天几千笔的规模下是真实收入。
- **资金成本**——锁进通道的 BTC 既不能花也不能干别的，机会成本实打实。
- **运营成本**——服务器在线、监控、流动性再平衡、瞭望塔服务。

桥接节点的经济账历来偏紧。有人跑得盈利，有人贴着成本跑以支持网络。无论哪种，连通良好的桥接节点都是闪电路由可靠性的来源之一——桥稀疏的图意味着更多失败支付。

桥接节点如何被使用见[闪电路由](/glossary/lightning-routing)，更广的格局见[闪电节点](/glossary/lightning-node)。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [按分钟付费模型（Lightning）](/glossary/audiobook-model-lightning) · [自动驾驶（Autopilot）](/glossary/autopilot-lightning) · [BOLT](/glossary/bolt) · [BOLT 11](/glossary/bolt-11) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [闪电锚定承诺交易](/glossary/lightning-anchor-commitment) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [路由节点（Routing Node）](/glossary/routing-node)
