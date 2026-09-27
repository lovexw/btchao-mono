---
title: Loop In/Out
---

# Loop In/Out

> **一句话定义：** Lightning Labs 的非托管服务：在链上 BTC 与闪电通道流动性（入站或出站）之间互换。

Loop In 和 Loop Out 是 Lightning Labs 的非托管交换服务：不开关通道，就能在链上 BTC 与闪电通道流动性之间搬余额。构建在[潜艇交换](/glossary/submarine-swap)原语上，交易原子、免信任。

- **Loop Out**：付出闪电余额，收到链上 BTC。把通道清空，释放入站容量。
- **Loop In**：付出链上 BTC，收到闪电余额。给出站容量充值，让你能在闪电上花更多。

它为什么重要：

- **不花开关通道成本的流动性管理。** 不开新通道就能再平衡，省下一笔新资金交易的链上手续费。
- **保住通道关系。** 既有通道带着它的声誉、对端连接和路由历史继续活；只有余额在动。
- **商户入站容量。** 大量收闪电付款的商户会把入站容量耗光。Loop Out 把积攒的余额排到链上，为下一批腾出入站。
- **付款方出站容量。** 频繁付款的钱包会耗干出站。Loop In 从链上 BTC 补充。

机制层面：

1. 用户经 Loop 客户端（CLI 或应用）发起请求。
2. Lightning Loop 服务构造一次潜艇交换：链上 HTLC 与闪电 HTLC 锁同一个原像。
3. 用户付闪电 HTLC；揭示原像后，链上 HTLC 同时变为可花。
4. 原子执行：两条腿要么都完成（用户拿到交换），要么都不完成（用户按超时取回原资金）。

成本：

- **Loop 服务费**：交换金额的小比例（通常约 0.1–0.5%，随方向与当期费率浮动）。
- 交换链上那条腿的**链上手续费**。
- 通往 Lightning Labs Loop 节点的**闪电路由费**。

Loop 是部署最广的潜艇交换服务，但不是唯一：PeerSwap（通道双方间的点对点协议）、Boltz（替代商业服务）等各种实现都在。LND 运营者用 Loop 最顺手；其他实现或许更适合替代品。

它属于那种让闪电在运营上真正可行的基础设施：没有顺手的再平衡，通道管理会痛苦得多。服务在设计上就是非托管的——交换的原子性意味着哪怕 Lightning Labs 中途消失，用户的资金也由链上超时路径兜底。

**相关词条：** [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [闪电网络](/glossary/lightning-network) · [流动性](/glossary/liquidity) · [流动性广告](/glossary/liquidity-ads) · [潜艇交换](/glossary/submarine-swap) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing)
