---
title: 窃听攻击（Eavesdropping Attack）
---

# 窃听攻击（Eavesdropping Attack）

> **一句话定义：** 网络层攻击：监听节点流量，可能把 IP 与交易关联、识别交易来源。

对比特币点对点网络的窃听攻击，是被动观察节点间通信，从而在交易确认之前获取情报。它不破解任何密码学；它利用的只是比特币的 gossip 层在实时广播数据这个事实。

窃听者能学到什么：

- **交易来源。** 若某个节点总是第一个中继某笔交易，那它多半就是发起者。手握大量监听对等点的运营方能以高概率识别广播源头。
- **IP 与交易的关联。** 把发起节点的 IP 与那笔交易配对，你就把一项链上活动与一个网络位置挂上了钩——若 IP 能被去匿名化，再往下就是真实身份。
- **网络拓扑。** 反复观察可以揭示哪些节点连接哪些节点，绘制出 gossip 网络的地图。

现实世界中跑窃听攻击的对手包括：拥有庞大节点舰队的链上分析公司、ISP 级别的观察者，以及资金充足的政府监控项目。这些攻击切实可行，且已被演示过。

防御手段，大致按有效性排序：

- **把节点跑在 [Tor](/glossary/tor-hidden-service) 后面。** 你的交易从随机的 Tor 出口广播，而不是你的真实 IP。对自托管用户这是最可信的防御。
- **支付尽量走闪电网络。** 闪电支付不公开广播；它经过加密的通道直达接收方。
- **限制入站连接**，可能的话只接信任的对等点。
- **使用 Dandelion++**（部分客户端已实现的交易中继改进），让发起节点更难被识别。

窃听攻击是「比特币的*假名性*有别于真正的*匿名性*」的现实注脚之一。密码学层很硬，网络层漏风。缓解手段存在，但不是人人都在用。

**相关词条：** [HTLC 堵塞探测器](/glossary/jammed-htlc-detector) · [I2P（隐形互联网计划）](/glossary/i2p-invisible-internet-project) · [洋葱路由（Lightning）](/glossary/onion-routing-lightning) · [竞速攻击（Race Attack）](/glossary/race-attack) · [重放攻击（Replay Attack）](/glossary/replay-attack) · [安全（Security）](/glossary/security) · [Tor 隐藏服务（Tor Hidden Service）](/glossary/tor-hidden-service)
