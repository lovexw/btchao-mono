---
title: 流动性广告（Liquidity Ads）
---

# 流动性广告（Liquidity Ads）

> **一句话定义：** c-lightning 插件：节点运营者出租闪电通道流动性、获取入站容量的市场机制。

流动性广告（liquidity ads）是闪电协议中发布「开通道要约」的机制：路由节点发布「我出 X 聪的入站流动性开通道，收 Y 聪费用，锁定 Z 个区块」。需要入站容量的节点挑一条中意的广告接受；路由节点开出一条主要资金在它那侧的通道。

它最初是 Core Lightning 的一个插件（Lisa Neigut 设计，2021 年），后来进入闪电官方规范（BOLT 2 通道建立 v2），由 Core Lightning、Eclair 支持，LND 的支持也在推进。它现在是协议的一部分，不再是单一实现的功能。

它解决的问题：闪电新用户（尤其是商户和服务节点）从第一天起就需要入站流动性。传统选项是：

- **先花出去再腾入站。** 得先有可花的出站——新用户恰恰没有。
- **手动找对端。**「有人愿意给我开通道吗？」碰运气，不可扩展。
- **用商业服务**，比如 Lightning Labs Pool（已停运）或 Voltage。能用，但把入站流动性市场中心化到少数服务商手里。

流动性广告把市场去中心化：任何节点都能挂广告，任何节点都能逛市场。价格由各路由节点自定，竞争市场自然形成。通道条款（大小、期限、费用）全都事先写明。

实践中生态还在成熟。发现靠 gossip，找广告还没到「打开市场随便逛」的程度。`lncli`、CLN 的 `bkpr` 加第三方浏览器能把广告暴露给运营者，但终端用户体验（点一下「我要入站，帮我找通道」）还在慢慢改善。

这个协议用一个市场撮合取代了中心化的托管信任（「信我，这家闪电服务会给你通道」）。对入站流动性问题来说，这是更去中心化、更比特币味的答案。

**相关词条：** [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [流动性](/glossary/liquidity) · [Loop In/Out](/glossary/loop-inout) · [路由节点（Routing Node）](/glossary/routing-node) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [潜艇交换](/glossary/submarine-swap)
