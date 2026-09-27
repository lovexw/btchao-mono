---
title: I2P（隐形互联网计划）
---

# I2P（隐形互联网计划）

> **一句话定义：** 类似 Tor 的匿名网络，可让比特币节点私密通信。

I2P（Invisible Internet Project，隐形互联网计划）是 [Tor](/glossary/tor-hidden-service) 之外的另一个匿名网络。它经由志愿中继网络路由流量，使用「大蒜路由」（一种把多条消息捆在一起传输的多层洋葱路由变体）来遮蔽发送方与目的地之间的路径。

Bitcoin Core 自 22 版（2021）起支持把 I2P 作为对等传输层。对[节点](/glossary/node)运营者而言，这意味着对等点可以在 Tor `.onion` 与明网 IP 之外，同时登记 I2P 地址（以 `.i2p` 结尾或以 base32 目标格式表示）。网络会跨所有可用传输发现并连接对等点。

I2P 与 Tor 的取舍：

- **威胁模型不同。** Tor 为浏览式流量优化低延迟匿名；I2P 为高吞吐点对点应用优化。比特币介于两者之间，都可用。
- **I2P 用户基数更小。** Tor 在全球有远更多的中继与出口。I2P 上的比特币连接真实存在但更稀薄。
- **攻击面不同。** Tor 与 I2P 各有已知弱点，面对资源充足的对手时威胁模型也不同。两个都跑（多跳冗余）比单跑任何一个都更有防御力。

对多数比特币节点运营者来说，单论生态成熟度，Tor 是更实际的选择。I2P 是纵深防御的合理副选项——尤其适合不想单独依赖 Tor 网络的运营者。

一个一般性原则：把比特币节点跑在任何匿名网络后面，都远好于跑在一个静态家庭 IP 上。Tor 也好、I2P 也好、两个都上也行——边际隐私收益都很大。

**相关词条：** [节点专用 IP（Dedicated IP）](/glossary/dedicated-ip-nodes) · [日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack) · [窃听攻击（Eavesdropping Attack）](/glossary/eavesdropping-attack) · [隐藏服务节点（Hidden Service Node）](/glossary/hidden-service-node) · [节点（Node）](/glossary/node) · [节点运营者（Node Operator）](/glossary/node-operator) · [洋葱路由（Lightning）](/glossary/onion-routing-lightning) · [Tor 隐藏服务（Tor Hidden Service）](/glossary/tor-hidden-service)
