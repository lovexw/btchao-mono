---
title: 日蚀攻击（Eclipse Attack）
---

# 日蚀攻击（Eclipse Attack）

> **一句话定义：** 网络层攻击：把节点与诚实对等点隔离开，喂给它被操纵的区块链视图。

日蚀攻击是攻击者垄断目标[节点](/glossary/node)的全部对等连接，把它与诚实网络隔离，然后喂给它一个伪造的链视图。被「日蚀」的节点可能被骗着接受无效区块、错过真实区块，或把已被回退的交易当成已确认。

攻击机制：

1. 攻击者在廉价 VPS 上批量制造大量女巫身份。
2. 操纵目标节点的[节点发现](/glossary/peer-discovery)过程——灌入自己的节点地址、占满连接槽位，或利用对等点驱逐与替换机制的弱点。
3. 最终，目标的所有出站连接都指向攻击者控制的对等点。
4. 攻击者想给目标看哪个版本的链，就给它看哪个。

日蚀攻击能干什么：

- **对受害者双花。** 攻击者从受害者收款，让它在被日蚀的假链上「看到」确认，然后交付货物/服务——而真实链上那笔交易从未发生。
- **扣住真实区块**，让受害者以为整条链停摆了。
- **（仅在受害者的视图里）制造链重组**，在分叉间来回切换。

为什么现实中日蚀很难：

- **Bitcoin Core 认真对待对等点多样性。** 对等点选择算法借助 [asmap](/glossary/asmap) 拓扑数据，尽量让连接分散到不同 IP 段。
- **出站连接受保护。** 就算入站槽位全被攻击者占满，连向随机发现的对等点的出站连接通常能打破日蚀。
- **跑在 [Tor](/glossary/tor-hidden-service) 后面**让精准定位你的节点变得困难得多。

最早的比特币日蚀攻击学术论文（Heilman 等，2015）演示了这套技术，Bitcoin Core 此后陆续内置了多项缓解。配置良好、对等点多样的节点很难被日蚀；但默认配置、防御薄弱环境下的节点仍是可行的靶子。这里真正起作用的防御配置，见[全节点](/glossary/full-node)。

**相关词条：** [节点专用 IP（Dedicated IP）](/glossary/dedicated-ip-nodes) · [I2P（隐形互联网计划）](/glossary/i2p-invisible-internet-project) · [节点（Node）](/glossary/node) · [竞速攻击（Race Attack）](/glossary/race-attack) · [重放攻击（Replay Attack）](/glossary/replay-attack) · [资源耗尽攻击（Resource Exhaustion Attack）](/glossary/resource-exhaustion-attack) · [Tor 隐藏服务（Tor Hidden Service）](/glossary/tor-hidden-service)
