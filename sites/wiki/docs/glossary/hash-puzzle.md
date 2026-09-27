---
title: 哈希谜题（Hash Puzzle）
---

# 哈希谜题（Hash Puzzle）

> **一句话定义：** 闪电 HTLC 的核心挑战：揭示秘密（原像）才能领取资金，否则超时退回。

哈希谜题是 [HTLC](/glossary/htlc-hashed-time-locked-contract) 内部的密码学挑战：「要领取这笔资金，请揭示一个[哈希](/glossary/hash)等于这个已知承诺的值。」

机制如下：

1. 收款方随机选一个秘密 `s`（**原像**），计算出 `hash(s)`，称为**支付哈希**。
2. 收款方只把支付哈希发给付款方（编码在[闪电发票](/glossary/lightning-invoice)里）。
3. 付款方构造一笔带哈希谜题的支付：「任何能提供满足 hash(v) = 支付哈希 的值 v 的人，都可以领取这笔资金。」
4. 知道 `s` 的收款方把它揭示出来，领取这笔支付。
5. 揭示在整条路径的每一跳同时发生，向付款端逐级回传。

两个密码学性质让这一切成立：

- **哈希抗原像性。** 拿到支付哈希后，除了收款方，没人能找到产生它的值。收款方甚至不必把 `s` 告诉任何人——直到领取的那一刻。
- **原子式传播。** `s` 一旦在任何一跳被揭示，链条上更早的每一跳都能看到（盯着结算过程即可），并据此向自己的上游收款。支付要么完全完成（因为 `s` 被揭示），要么在超时处完全退回。

哈希谜题是让[闪电路由](/glossary/lightning-routing)无需中间节点诚实的信任原语。它也是[原子交换](/glossary/atomic-swap)、[潜艇交换](/glossary/submarine-swap)和大多数其他多方比特币协议的构件。

完整的结构——把哈希谜题包进超时回退里——见 [HTLC](/glossary/htlc-hashed-time-locked-contract)。

**相关词条：** [哈希（Hash）](/glossary/hash) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [ZKCP（零知识条件支付）](/glossary/zkcp-zero-knowledge-contingent-payment)
