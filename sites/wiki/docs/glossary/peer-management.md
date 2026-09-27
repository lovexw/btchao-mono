---
title: 节点管理（Peer Management）
---

# 节点管理（Peer Management）

> **一句话定义：** 节点策略：保持多少连接、驱逐哪些节点、如何应对作恶或垃圾行为。

节点管理是一套规则，决定节点保留哪些连接、断开哪些、以及如何应对作恶行为。

Bitcoin Core 在 2026 年的默认值：

- 8 个出站全转播对端（真正与之 gossip 交易和区块的那些）。
- 2 个出站「仅区块转播」对端，只接收区块。因为它们不暴露节点见过哪些交易，能加固对基于交易的日蚀攻击的防御。
- 最多约 115 个入站对端，可用 `maxconnections` 配置。
- 1 个出站「feeler」连接，短暂试探新对端的可达性后即断开。

出站对端的选择偏好多样性：不同 ASN（用内置的 `asmap` 文件）、不同网络类型（明网、Tor、I2P）、以及信号允许范围内不同的地理位置。这种多样性是对[日蚀攻击](/glossary/eclipse-attack)的主要防御——对手试图用自己控制的节点填满你的全部对端槽位。

作恶按对端逐个记账。无效消息、畸形协议流量、重复的无用请求：对端分数上涨，最终触发断连和临时封禁（见[节点自动封禁](/glossary/node-autoban)）。诚实的对端几乎从不会触发。

节点管理的艺术在于平衡：对端要多到有冗余和多样路径，又不能多到资源失控、或让自己变成资源耗尽攻击的靶子。Bitcoin Core 的默认值是稳妥的；多数运营者不该动它。

**相关词条：** [Bitcoin Core](/glossary/bitcoin-core) · [日蚀攻击](/glossary/eclipse-attack) · [节点](/glossary/node) · [节点运营者](/glossary/node-operator) · [对等节点书签](/glossary/peer-bookmark) · [节点自动封禁](/glossary/node-autoban)
