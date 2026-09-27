---
title: ZKCP（零知识条件支付）
---

# ZKCP（零知识条件支付）

> **一句话定义：** 买方只在秘密数据正确时才付款的协议：用零知识证明保证公平。

**零知识条件支付**（Zero-Knowledge Contingent Payment，ZKCP）是一种比特币原生的协议：以无信任的方式用 BTC 交易数字数据。该机制由 Greg Maxwell 于 2016 年设计，同年由 Sean Bowe 以 0.4 BTC 出售一个 zk-SNARK 谜题解做了实际演示。它让买方只在卖方能以密码学方式证明自己持有有效信息时，才为秘密信息付款。

ZKCP 的高层工作流程：

1. **卖方有买方想要的数据 X。**
2. **卖方用随机密钥 `k` 加密 X**，得到 `E_k(X)`。卖方把加密数据发给买方。
3. **卖方生成一个零知识证明**，证明 `E_k(X)` 用某个特定密钥解密后得到满足买方可验证性质的数据（比如「是这道特定谜题的解」）。
4. **卖方通过哈希 `H = hash(k)` 承诺 `k`。**
5. **买方构造一笔比特币支付**，由 [HTLC](/glossary/htlc-hashed-time-locked-contract) 锁定：卖方揭示 `k`（H 的原像）则获得付款，超时则退款给买方。
6. **卖方揭示 `k` 以领取付款。** 这一揭示在链上向全世界公开 `k`；买方从区块链读到它，用它解密 `E_k(X)`，拿到数据。

达成的效果：买方要么得到有效数据，要么分文不付。卖方要么拿到钱，要么不揭示密钥。双方都无法作弊。不涉及任何第三方托管。

ZKCP 更多是概念验证而非广泛部署。密码学基础设施（针对任意陈述的零知识证明）很重，多数数字商品市场用更简单的信任模型。但 ZKCP 是一个奠基性的演示：比特币之上的合约可以多丰富，而完全不需要复杂的链上脚本——只要标准 HTLC 加上链下零知识证明。

ZKCP 依赖的链上原语见 [HTLC](/glossary/htlc-hashed-time-locked-contract)；用 Schnorr 编码合约的相关思路见[无脚本脚本（Scriptless Scripts）](/glossary/scriptless-scripts)。

**相关词条：** [哈希谜题（Hash Puzzle）](/glossary/hash-puzzle) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [无脚本脚本（Scriptless Scripts）](/glossary/scriptless-scripts)
