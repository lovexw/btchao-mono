---
title: Asmap
---

# Asmap

> **一句话定义：** Bitcoin Core 功能：将 IP 地址映射到自治系统（AS），以分散对等连接、缓解网络攻击。

**asmap** 是 [Bitcoin Core](/glossary/bitcoin-core) 的一项功能，把对等节点的 IP 地址映射到其**自治系统号（ASN）**——即拥有并运营互联网 IP 段的路由实体。借助这份映射，[节点](/glossary/node)把自己的出站对等连接分散到许多**不同**的 ASN，而不是冒着大量连接落在同一家网络运营商手里的风险。

为什么这对防御[日蚀攻击](/glossary/eclipse-attack)要紧：

- **一个 ASN 是一个现实世界实体**（如 AS15169 = Google，AS16509 = Amazon AWS）。归属同一 ASN 的所有 IP，管理上都在同一个权威之下。
- **如果你的节点 8 个出站对端全在 AWS**，那么能攻陷或胁迫 AWS 的攻击者可以轻易孤立你的节点。整条路径都在他手里。
- **如果你的出站对端分散在 8 个 ASN**——Google、AWS、Hetzner、OVH、Digital Ocean 加上若干家宽 ISP——攻击者必须把所有这些一起拿下才能孤立你，难度陡增。

asmap 文件只是一张压缩的查找表：给一个 IP，返回它属于哪个 ASN。Bitcoin Core 的 `addrman`（地址管理器）在选择对端时用它来保证出站对等集的 ASN 多样性。

asmap 数据从公开的 BGP 路由公告生成，随 Bitcoin Core 分发或单独下载。最常被引用的维护源是 Sjors Provoost / Pieter Wuille 基于 BGP 表快照构建的版本。运营者也可以用自己的 asmap 文件。

对多数家庭节点运营者，默认的 asmap 行为已经够好。对认真做纵深防御的运营者——高价值闪电路由节点、交易所节点、任何节点本身就是有意义目标的场景——asmap 是值得了解的网络层防御之一。

它防御的威胁见[日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack)，更大的对端选择过程见[节点发现（Peer Discovery）](/glossary/peer-discovery)。

**相关词条：** [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization)
