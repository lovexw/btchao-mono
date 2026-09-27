---
title: 节点专用 IP（Dedicated IP）
---

# 节点专用 IP（Dedicated IP）

> **一句话定义：** 让比特币节点跑在一个稳定、公网可达的 IP 上——对网络更有用，但你的身份和位置也更容易暴露。

给比特币节点配「专用 IP」，指让节点运行在一个稳定、公开、可达的 IP 地址上——不变动、不躲在 NAT（网络地址转换）或动态住宅 IP 后面。有了专用 IP，你的节点就能接受*入站*连接，这对网络更有用，代价是更显眼。

这笔账要这样算：

**对网络：** 可入站连接的节点越多，整体网络韧性越强。比特币的 gossip 层依赖健康的监听节点群体；只做出站连接的节点同样在验证，但它们不直接为新节点提供中继。

**对你：** 跑在专用 IP 上意味着节点可被识别。任何扫描网络的人都能看到你的 IP、软件版本、连接模式。一旦这个 IP 与个人信息（家庭住址、公司、姓名）关联起来，你的比特币活动就更难保持隐私。

选择是一整排旋钮：

- **专用公网 IP，明网。** 对网络最有用，隐私最少。适合企业、对公众服务的节点、专职中继运营者。
- **反向代理后的专用 IP。** 公网 IP 但架在第三方基础设施上（VPS、独服）。用「暴露服务商」换掉了「暴露家庭 IP」。
- **[Tor](/glossary/tor-hidden-service) 洋葱服务。** 不暴露明网 IP，通过 `.onion` 可达。性能损失比你以为的小；隐私收益实实在在。
- **NAT 后、仅出站。** 你的节点连接别人但不接受入站。对网络用处小，但不会把 IP 暴露给扫描者。

对多数自我托管用户，正确答案是「NAT 后 + Tor（或 I2P）」——入站只走 onion，真实 IP 不直接暴露。对提供公共服务、对外营业的运营者，专用公网 IP 是默认选项。两者都成立；怎么选取决于你的威胁模型。

最常见的隐私替代方案见 [Tor 隐藏服务](/glossary/tor-hidden-service)；无论入站模式如何，让出站连接更多样化的做法见 [Asmap](/glossary/asmap)。

**相关词条：** [Asmap](/glossary/asmap) · [比特币卫星（Bitcoin Satellite）](/glossary/bitcoin-satellite) · [I2P（隐形互联网计划）](/glossary/i2p-invisible-internet-project) · [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点数量统计（Node Headcount）](/glossary/node-headcount) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [节点在线时长（Node Uptime）](/glossary/node-uptime) · [Tor 隐藏服务（Tor Hidden Service）](/glossary/tor-hidden-service)
