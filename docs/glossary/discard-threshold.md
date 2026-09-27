---
title: 丢弃阈值（Discard Threshold）
---

# 丢弃阈值（Discard Threshold）

> **一句话定义：** 内存池的动态最低费率——内存吃紧时，费率低于它的交易会被节点丢弃。

丢弃阈值（discard threshold）是一道动态的最低费率：当比特币节点的内存吃紧时，一笔交易想留在内存池里，费率就必须达到这道线。低于阈值，节点把交易丢掉；达到或超过，交易留下。

在 Bitcoin Core 中的运作方式：

- 每个节点有一个 maxmempool 上限（默认 300 MB）。
- 内存池超过上限时，节点先驱逐费率最低的交易。
- 被驱逐交易的费率随即成为一道地板：任何低于该费率的入站新交易直接被拒。
- 随着时间推移，这道地板会缓慢衰减、重新接受低费率交易；但在费率飙升期间，它可能暴涨。

为什么这有运维层面的重要性：

- 在费率飙升期（Ordinals 年代、减半后时段、市场暴涨），丢弃阈值可以在几小时内从约 1 sat/vB 跳到 50+ sat/vB。
- 平静期按「正常」费率广播的交易，如果内存池在确认前被塞满，可能变得无法中继。
- 用 [RBF](/glossary/bip-125-replace-fee) 加价是标准的自救手段：用一笔费率更高的版本替换卡住的交易。
- mempool.space 的「下一块费率」估算实际上就是在显示当前丢弃阈值，让钱包能把费率设到真正能留住的价位。

丢弃阈值也是对内存池垃圾攻击的防御：想用海量低费率垃圾淹没网络的攻击者会发现，地板随攻击持续而升高，垃圾被自然地挤出市场。内存池是一个手续费市场，而丢弃阈值就是它的价格出清机制。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [粉尘（Dust）](/glossary/dust) · [粉尘攻击（Dust Attack）](/glossary/dust-attack) · [粉尘限额（Dust Limit）](/glossary/dust-limit) · [粉尘清扫（Dust Sweeping）](/glossary/dust-sweeping) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
