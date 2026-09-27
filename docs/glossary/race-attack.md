---
title: 竞速攻击（Race Attack）
---

# 竞速攻击（Race Attack）

> **一句话定义：** 对零确认交易实施双花：迅速广播一笔冲突的高费交易，抢先到达矿工。

竞速攻击（Race Attack）是针对零确认交易（zero-conf）的双花攻击。攻击者接连快速广播两笔冲突交易：一笔给商家（或商家钱包看到的网络），一笔把币付回给自己，且第二笔被精心构造，争取在矿工面前赢得这场竞赛。

两种口味：

- **原味竞速攻击：** 大约同时把 tx-A 广播给商家、把 tx-B 广播给全网其他节点，指望矿工先看到 tx-B。
- **RBF 版竞速：** 给商家广播 tx-A（带 RBF 标记），然后广播手续费更高的 tx-B。由于按费替换（Replace-by-Fee）对替换行为是明示的，这与其说是「攻击」，不如说是协议按文档运转；只是商家没等确认而已。

商家侧的缓解手段：

- **至少等一个确认。** 慢，但从密码学上讲是正确答案。
- **用闪电网络做即时结算。** 闪电支付在第二跳层面立即终局，不存在零确认风险。
- **运行双花监控**，盯内存池里与收款冲突的交易并实时告警。降低但不消除风险。

许多商家仍然对小金额接受零确认，因为这种攻击执行起来并不容易（需要技术、时机，以及一笔自带可替换标记的低费初始交易）。风险真实存在，但实际发生率低。金额超过几美元时，等确认或用闪电。

**相关词条：** [双花（Double Spend）](/glossary/double-spend) · [双花中继（Double Spend Relay）](/glossary/double-spend-relay) · [日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack) · [破坏攻击（Griefing Attack）](/glossary/griefing-attack) · [重组（Reorg）](/glossary/reorg-reorganization) · [重放攻击（Replay Attack）](/glossary/replay-attack) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
