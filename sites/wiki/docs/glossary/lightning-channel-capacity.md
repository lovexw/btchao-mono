---
title: 闪电通道容量
---

# 闪电通道容量

> **一句话定义：** 闪电通道中锁定的 BTC 总量，决定经由它最多能收发多少。

通道容量是[闪电通道](/glossary/lightning-channel)的 2-of-2 多签里锁定的比特币总量——它是这条通道生命周期内双向能流过的上限。

常被误解的一点：**容量不等于你当下能发多少**。一条 1 BTC 的通道最多能路由 1 BTC 总量，但只限于当前分在**付款方**那一侧的份额。如果 1 BTC 全在 Alice 那边，Bob 就没法通过这条通道付款——他没有出站流动性。容量是预算；**单侧余额**才是你实际能花的。

两个绕不开的相关概念：

- **出站流动性**——通道里你自己一侧的余额，决定你能**付**多少。
- **入站流动性**——对端一侧的余额，决定你能**收**多少。

只付不收的用户（比如用闪电购物），出站重要。又要收款的用户（商户、收 zap 的创作者），入站同样重要。这种不对称是闪电新用户的真实痛点：你自己出资开通道时，起点是全部出站、零入站。想收到任何像样的金额，要么：

- 先往外路由一些支付，把余额挪到对端那边；
- 用[潜艇交换](/glossary/submarine-swap)「买」入站流动性；
- 用流动性服务（Lightning Pool、Magma，或 LSP 式开通道——Phoenix、Breez 自动帮你做）；
- 顺手用[通道拼接](/glossary/lightning-channel-splicing)扩容。

现代钱包把这一切对终端用户藏了起来。跑自己路由节点的高阶用户则要直接和容量、再平衡打交道。无论哪种，通道容量都是闪电路由背后一切计算的基础量。

**相关词条：** [BOLT](/glossary/bolt) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [通道流失（Churn）](/glossary/churn-lightning) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [不活跃通道](/glossary/inactive-channel) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [闪电节点](/glossary/lightning-node) · [闪电路由](/glossary/lightning-routing) · [超大通道（Wumbo Channels）](/glossary/wumbo-channels-lightning) · [潜艇交换](/glossary/submarine-swap)
