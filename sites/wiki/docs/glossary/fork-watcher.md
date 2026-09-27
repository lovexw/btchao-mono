---
title: 分叉监视器（Fork Watcher）
---

# 分叉监视器（Fork Watcher）

> **一句话定义：** 专门跟踪区块链分叉或异常重组的工具/服务，在可能的链分裂时告警运营者。

分叉监视器是把[分叉检测](/glossary/fork-detection)作为持续服务来做的专门工具：当共识层出现异常时向运营者告警。

标杆是 forkmonitor.info，由 Bitcoin Core 开发者 Sjors Provoost 运营。它同时做几件事：

- 并排运行多种比特币节点实现（Core、Knots、btcd、libbitcoin 等），每个还有多个版本。
- 监视任意两者之间的链分歧。
- 追踪过期块事件、深度重组、软分叉激活信号位，以及通胀漏洞式的共识失败。
- 向公开的 RSS / Twitter / 邮件列表发布告警。
- 维护「事件 X 发生时链到底长什么样」的公共权威记录。

分叉监视基础设施为什么超越任何单一运营者：

- 2018 年通胀漏洞（CVE-2018-17144）修补窗口期，分叉监视器帮助追踪哪些版本已升级、是否真的存在带 bug 的链。
- 软分叉激活期间（SegWit、Taproot），分叉监视器追踪信号与「激活未分裂链」的确认。
- BCH 分裂（2017 年 8 月）及后续 BCH 内部分裂（2018 年 11 月）期间，分叉监视器是「每条链的链尖哈希现在是什么」的权威公共信源。

商业部署（交易所、托管方）通常自建内部分叉监视器作为冻结充提的触发器。forkmonitor.info 这类公共监视器承担社区研究职能。两者存在的原因相同：比特币的正确性太重要，不能想当然地认为一切正常——总得有人主动盯着。

**相关词条：** [分叉空投（Airdrop, BTC Fork）](/glossary/airdrop-btc-fork) · [比特币现金（Bitcoin Cash）](/glossary/bitcoin-cash) · [链分裂（Chain Split）](/glossary/chain-split) · [分叉（Fork）](/glossary/fork) · [分叉检测（Fork Detection）](/glossary/fork-detection) · [重组（Reorg）](/glossary/reorg-reorganization)
