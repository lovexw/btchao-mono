---
title: BIP 155（Addr v2）
---

# BIP 155（Addr v2）

> **一句话定义：** 扩展网络地址格式，让 P2P 消息支持更长的地址（如 Tor v3）。

[BIP-155](https://github.com/bitcoin/bips/blob/master/bip-0155.mediawiki) 升级了比特币对等协议，支持扩展的网络地址类型——具体是 Tor v3（现代 Tor 洋葱地址，比 v2 更长）、[I2P](/glossary/i2p-invisible-internet-project) 和 CJDNS。

问题所在：比特币 P2P 协议里旧版 `addr` 消息只支持 16 字节的网络标识。装得下 IPv4（4 字节）、IPv6（16 字节）、Tor v2（10 字节，已淘汰），装不下 Tor v3（32 字节 ed25519 公钥）、I2P（32 字节 base32 目的地址）和 CJDNS。

2021 年 Tor v3 淘汰并取代 v2 时，比特币需要一种在网络间共享 Tor v3 地址的方式。BIP-155 补上了这块。

技术改动：新的 `addrv2` 消息在声明支持的节点间取代 `addr`。每个地址条目现在带一个类型字节（IPv4、IPv6、Tor v2 旧版、Tor v3、I2P、CJDNS）加变长负载。不支持 `addrv2` 的旧节点回落到旧 `addr` 消息，只是收不到这些地址类型。

Bitcoin Core 自 0.21 版（2021 年）起内置 BIP-155 支持。它让 [Tor 隐藏服务](/glossary/tor-hidden-service)与 I2P 节点以一等网络参与者的身份融入基于 Gossip 的[节点发现](/glossary/peer-discovery)过程，而不是靠临时拼接凑合。

对用户几乎不可见；对日益跑在隐私网络上的比特币节点，是承重的地基。

**相关词条：** [地址（Address）](/glossary/address) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [节点（Node）](/glossary/node) · [节点发现（Peer Discovery）](/glossary/peer-discovery) · [节点管理（Peer Management）](/glossary/peer-management)
