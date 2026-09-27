---
title: 潜艇交换（Submarine Swap）
---

# 潜艇交换（Submarine Swap）

> **一句话定义：** 最小化信任地交换链上 BTC 与闪电 BTC：改善闪电通道流动性或实现链下原子交换。

潜艇交换是链上比特币与[闪电](/glossary/lightning-network)比特币之间的[原子交换](/glossary/atomic-swap)。它让你免信任地跨越层边界搬运 BTC——不经托管方，也不必关闭或打开闪电通道。

两个方向：

- **潜艇换入（swap in）。** 你有链上 BTC，想要闪电 BTC（比如给通道注入入站流动性，或不开通道就付一张闪电发票）。交换服务收到你的链上交易，付你闪电 BTC。
- **潜艇换出（swap out）。** 你有闪电 BTC，想到链上（比如提币到冷存储）。你完成一笔闪电支付后，交换服务付你链上 BTC。

两个方向都在两侧用 [HTLC](/glossary/htlc-hashed-time-locked-contract) 强制原子性：服务没法收了你的 BTC 不付另一边。出任何岔子，超时兜底退款。

实践中它为什么重要：

- **闪电入站流动性。** 自开通道默认资金全在你这侧，对端从零开始。潜艇交换是「买」入站流动性的干净办法，不必关通道重开。
- **免信任的下船通道。** 把闪电余额撤回链上冷存储，不用信任交易所。
- **跨实现的闪电对闪电。** 网络状况或流动性问题让直接路由不可靠时有用。

知名服务：**Lightning Loop**（Lightning Labs）、**Boltz Exchange**（开源、多链），以及各种钱包内置的交换功能。服务收少量费用加链上交易成本；换来的是无托管风险的跨层搬动。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [原子交换（Atomic Swap）](/glossary/atomic-swap) · [原子交换充值](/glossary/atomic-swap-refill) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电网络](/glossary/lightning-network) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [支付通道](/glossary/payment-channel) · [安全](/glossary/security) · [Loop In/Out](/glossary/loop-inout)
