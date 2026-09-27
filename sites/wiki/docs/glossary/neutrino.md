---
title: Neutrino
---

# Neutrino

> **一句话定义：** 保护隐私的轻客户端协议（BIP 157/158）：用区块过滤器取代旧式布隆过滤器 SPV。

Neutrino 是基于 BIP 157 / BIP 158 紧凑区块过滤器的隐私友好 SPV 式轻客户端协议的参考名称（也是 Lightning Labs 的实现名）。它取代了旧式 BIP 37 布隆过滤器 SPV 方案——那个方案有严重的隐私问题。

Neutrino 的工作方式：

1. 轻客户端下载区块头（小而快，每个约 80 字节）。
2. 客户端从提供服务的全节点下载紧凑区块过滤器。每个过滤器是对该区块中所有被引用脚本（地址）的几 KB 压缩摘要。
3. 客户端在本地检查每个过滤器，匹配自己钱包的地址。
4. 有匹配的区块，客户端再从任意节点请求完整区块，扫描自己的真实交易。

隐私性质是它的杀手级特性：

- **BIP 37 布隆过滤器模式下**，客户端要*主动发送*一个描述自己关心什么的过滤器，服务节点可以分析它，推断出客户端的大部分地址。多次重连之下泄露更严重。
- **Neutrino / BIP 158 模式下**，客户端*被动接收*每个区块的确定性过滤器（每个节点给出的都一样）。客户端从不告诉服务器自己关心哪些地址。服务器看过过滤器后，也无法分辨客户端最终下载了哪些区块。

Neutrino 用在哪里：

- **Lightning Labs 的 [lnd](/glossary/lightning-network-daemon-lnd)** 把 Neutrino 作为后端，供不想自跑 Bitcoin Core 全节点的客户端使用。多数用 LND 系钱包、非路由节点的闪电用户都在用它。
- **许多移动端比特币钱包**用 Neutrino 或类似的 BIP 158 后端，而不是连接到某个可信的 Electrum 服务器。
- **Lightning Dev Kit（LDK）**把 Neutrino 作为其支持的链数据源之一。

代价：带宽比 BIP 37 略高（过滤器比每客户端的布隆过滤器大），隐私提升真实但不绝对（一个观察你*最终取回哪些区块*的服务节点仍能缩小你钱包的范围——只是精度差得多）。

对用户它是隐形的。对钱包开发者，Neutrino 是「如何在不牺牲用户隐私的前提下支持轻客户端」的标准答案。

**相关词条：** [BIP 37](/glossary/bip-37) · [BIP 158](/glossary/bip-158) · [全节点（Full Node）](/glossary/full-node) · [Lightning Network Daemon（lnd）](/glossary/lightning-network-daemon-lnd) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
