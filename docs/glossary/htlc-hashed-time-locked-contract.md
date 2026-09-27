---
title: HTLC（哈希时间锁合约）
---

# HTLC（哈希时间锁合约）

> **一句话定义：** 要求在时间锁到期前用秘密（原像）解锁支付的机制——闪电网络与原子交换的核心。

HTLC（哈希时间锁合约）是一种比特币脚本，用两个条件锁住资金：**任何人**揭示一个秘密值（某个已知哈希的**原像**）即可花费；或者，若期限过了秘密仍未揭晓，则退回给付款方。

写成脚本大致是：

```
IF hash(提供的值) == 目标哈希 THEN
  付给收款方
ELSE IF 当前时间 > 截止时间 THEN
  退给付款方
END
```

这个看似简单的结构，是所有免信任多方比特币协议的地基。

HTLC 为什么如此有用：

- **[闪电路由](/glossary/lightning-routing)。** 你跨多个闪电跳付款时，每一跳都由一个 HTLC 绑定。收款方知道秘密；揭示它，就能从上一跳取款；那一跳拿着同一个秘密再向更上一跳取款。秘密沿链条反向传播，每一跳原子化地同步结清。要么整笔支付成功，要么超时后全部原路退回。
- **[原子交换](/glossary/atomic-swap)。** 两条链上的双方无需信任即可换币。各自把资金锁进 HTLC：先揭示秘密的一方拿到自己的资金，同时秘密曝光，对方也就能拿了。谁中途跑路，双方都在截止时间触发退款。
- **[潜艇交换](/glossary/submarine-swap)。** 通过配对的 HTLC，免信任地在链上 BTC 与闪电 BTC 之间互换。

「时间锁」那部分不是可选项。没有截止时间，资金可能永远卡在那里等一个可能永远不会揭晓的秘密。截止时间保证**总会有事发生**——要么支付完成（秘密揭晓），要么退款触发。「时间」本身成了安全模型的一部分。

HTLC 是让比特币二层生态真正免信任的密码学原语。2017 年投入生产至今，它搬动了以万亿聪计的支付，从未需要任何中间人诚实行事。

后继概念见[支付点（Payment Point）](/glossary/payment-point)：同样的原子性与时间锁保证，但哈希-原像之锁换成椭圆曲线点与标量——链上足迹更小、隐私性质更好，等待 Taproot 的更广泛采用。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [原子交换（Atomic Swap）](/glossary/atomic-swap) · [原子交换充值](/glossary/atomic-swap-refill) · [BOLT 11](/glossary/bolt-11) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [Eltoo](/glossary/eltoo) · [托管（Escrow）](/glossary/escrow) · [带托管的闪电通道](/glossary/escrowed-lightning-channel) · [欺诈证明](/glossary/fraud-proof) · [欺诈性关通道](/glossary/fraudulent-channel-close) · [破坏攻击（Griefing Attack）](/glossary/griefing-attack) · [哈希谜题](/glossary/hash-puzzle) · [HTLC 发票](/glossary/htlc-invoice) · [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [闪电支付](/glossary/lightning-payment) · [闪电路由](/glossary/lightning-routing) · [支付通道](/glossary/payment-channel) · [支付点（Payment Point）](/glossary/payment-point) · [潜艇交换](/glossary/submarine-swap)
