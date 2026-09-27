---
title: 混币服务（Mixing Service）
---

# 混币服务（Mixing Service）

> **一句话定义：** 混合多用户比特币交易的第三方或协议型方案（如 CoinJoin），以改善隐私。

混币服务泛指任何把多个用户的比特币交易合并起来、打破输入与输出地址之间链上关联的系统。这个统称之下的各种设计，信任假设天差地别。

两个截然不同的类别：

**托管式混币器。** 用户把币发给某个服务，后者短暂持有，之后从另一个池子里发回「等值」的币。用户得信任运营者：会真的还钱、不会记录谁存了什么、也不是钓鱼陷阱。历史上，这类混币器（Bitcoin Fog、Helix、ChipMixer）一再被查封、被起诉、或被证实是执法机关的钓鱼陷阱。到 2026 年，托管式混币器作为隐私工具基本已死——法律与运营风险压倒一切。

**非托管协调协议**，如 [CoinJoin](/glossary/coinjoin)。用户协作构建一笔把各自的输入合并起来的交易。任何第三方从头到尾都不碰资金——混币靠密码学协议完成，不靠信任。2024 年 Wasabi 和 Whirlpool 的中心化协调者相继关停之后，JoinMarket、Joinstr 这类去中心化协议是 2026 年的现实选项。

**[PayJoin](/glossary/payjoin)** 是小规模的双人变体，用看起来平平无奇的交易达到类似的隐私效果。

现实版图：

- 托管式混币器：法律上高危，风险板上钉钉，基本别碰。
- 中心化运营的 CoinJoin 协调者：正在走托管式的老路，Wasabi/Whirlpool 的关停已经展示了法律压力。
- 去中心化 CoinJoin 协议：活着，但规模不如当年中心化的那批。
- PayJoin：小而实用，适合两方隐私。
- [闪电网络](/glossary/lightning-network)路由：可以说是如今比特币最常用的「混币」机制——闪电支付根本不出现在公开链上。

如果你考虑使用某个混币服务，先调查它的历史、司法辖区和信任假设。这个类别里既有正当的隐私工具，也有无效的表演，还有彻头彻尾的陷阱。

2024 年协调者式混币发生了什么、什么活了下来，见深度专题[比特币隐私](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [地址聚类（Address Clustering）](/glossary/address-clustering) · [CoinJoin](/glossary/coinjoin) · [纸钱包（Paper Wallet）](/glossary/paper-wallet) · [Payjoin](/glossary/payjoin) · [屏蔽 CoinJoin（Shielded CoinJoin）](/glossary/shielded-coinjoin) · [隐形地址（Stealth Address）](/glossary/stealth-address)
