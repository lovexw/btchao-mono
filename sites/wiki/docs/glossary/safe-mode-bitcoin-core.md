---
title: 安全模式（Bitcoin Core）
---

# 安全模式（Bitcoin Core）

> **一句话定义：** 保护模式：节点怀疑发生重大链分叉或严重共识异常时，禁用部分 RPC。

「安全模式」（safe mode）是 Bitcoin Core 的一个旧功能：当节点检测到链状态异常——典型如深重组、包含无效区块的长链或其他共识异常——自动禁用部分 RPC 调用。设计思想是「失效即关闭」（fail closed）：宁可拒绝广播交易，也不要在一条可能已沦陷或已分叉的链上误操作。

该功能在 Bitcoin Core 0.16（2018 年）中被移除。退役原因：

- **误报率高。** 触发安全模式的网络状况往往无害（一个自行解决的小分叉、某个对端喂垃圾区块数据），但锁定本身却很扰民。
- **信号不可靠。** 真正该停止运行的条件很难自动定义。安全模式要么触发太勤（烦人），要么真出事时反而不触发（无用）。
- **有更好的替代。** 现代 Bitcoin Core 通过 `getblockchaininfo` 和 `getnetworkinfo`（`warnings` 字段）暴露警告状态。运营者可以直接监控，不需要一个可能误触发的自动锁定。

取代安全模式的东西：

- **显式警告字段。** `getblockchaininfo` 的 `warnings` 字段向任何查询者报告异常链状态。钱包和下游工具自行决定如何反应。
- **GUI 警告。** Bitcoin Core 的 Qt 界面在节点看到可疑情况时显示黄色横幅，但不禁用功能。
- **运营者警觉。** 在争议性分叉或疑似攻击期间是否停运，从「节点替你决定」变成「你根据节点暴露的数据自己决定」。

这个概念以更宽的原则存续：当共识层发生异常，保守的运营者先停下来，等状况弄清楚再说。自动化没了；纪律还在。

**相关词条：** [比特币客户端（Bitcoin Client）](/glossary/bitcoin-client) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Knots](/glossary/bitcoin-knots) · [链状态损坏（Corrupted Chain State）](/glossary/corrupted-chain-state) · [重组（Reorg）](/glossary/reorg-reorganization)
