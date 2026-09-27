---
title: 节点发现（Peer Discovery）
---

# 节点发现（Peer Discovery）

> **一句话定义：** 节点用 DNS 种子、硬编码地址或已连接节点的 gossip 找到彼此、扩展网络视图。

节点发现是一个全新[比特币节点](/glossary/node)找到其他节点并连接的过程。没有初始节点列表，节点就是孤岛；没有持续发现，网络无法在流转后自愈。

Bitcoin Core 依次使用几套机制：

1. **DNS 种子。** 由可信的比特币开发者（Pieter Wuille、Matt Corallo、Luke Dashjr、Christian Decker 等）维护。它们是 `seed.bitcoin.sipa.be` 这样的域名，返回近期活跃、连通性好的全节点 IP。节点首次启动时查询它们。
2. **硬编码种子节点。** 随 Bitcoin Core 二进制发布的后备列表，仅在 DNS 种子不可达时使用。每次发布时重新编译进当前活跃节点。
3. **对端 gossip（`addr` 协议）。** 一旦连上一个或多个对端，节点向它们要*它们*的对端列表，有机地扩展自己的已知节点集。网络由此自愈：任何一台服务器倒下，都不影响别人发现其他节点。
4. **手动配置。** 运营者可以用 `-addnode` 或 `-connect` 指定对端。适合不想信任 DNS 种子的主权配置。
5. **Tor / I2P / CJDNS。** Bitcoin Core 支持在隐私网络上发现对端，适合身处敌意防火墙后或想隐藏 IP 的运营者。

DNS 种子这一步是引导过程中最「中心化」的部分，值得知道。恶意 DNS 种子可以喂给你的节点一份全是攻击者控制的「精选」对端列表（[日蚀攻击](/glossary/eclipse-attack)的布局）。防御在于多颗相互独立的种子：攻击者得同时拿下大多数才行。这些种子由多个辖区里各自知名的个人分别运营。

对长期运行的节点，引导远不如日常对端健康重要——Bitcoin Core 持续评估对端行为，断开行为不端的连接，并通过 gossip 机制补位。威胁模型见[日蚀攻击](/glossary/eclipse-attack)。

**相关词条：** [BIP 159](/glossary/bip-159) · [节点专用 IP](/glossary/dedicated-ip-nodes) · [日蚀攻击](/glossary/eclipse-attack) · [节点](/glossary/node) · [节点自动封禁](/glossary/node-autoban) · [节点数量统计](/glossary/node-headcount) · [节点运营者](/glossary/node-operator) · [节点同步](/glossary/node-synchronization)
