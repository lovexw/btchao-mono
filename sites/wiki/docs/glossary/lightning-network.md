---
title: 闪电网络（Lightning Network）
---

# 闪电网络（Lightning Network）

> **一句话定义：** 建在比特币上的二层系统：通过链下通道实现快速低费支付，必要时才上链结算。

闪电网络是建在比特币之上的支付层：支付经由一张预注资的支付通道网络路由，即时到账、费用极低，只在通道开合时才落到主链结算。

简化后的机制：

1. **开[通道](/glossary/lightning-channel)。** 双方创建一个 2-of-2 多签的链上输出，由一方或双方注资。这是一笔普通的链上交易，付普通的手续费。
2. **[链下](/glossary/off-chain)交易。** 双方交换签名的「余额更新」——对通道资金当前分配的密码学有效声明。这些更新不广播，只存在于两方之间。
3. **经由网络路由。** 大多数情况下你和收款人之间没有直连通道。闪电网络是一张通道网，支付借助[哈希时间锁合约（HTLC）](/glossary/htlc-hashed-time-locked-contract)跳过中间节点——每一跳都是原子的：整笔支付要么成功，要么整体回滚。
4. **关通道。** 任何一方随时可以把双方最新共同签署的状态广播上链关闭通道，资金按最终状态分配。结束。

它买到了什么：

- **速度。** 支付以秒计，不是分钟。
- **成本。** 典型费用低于一分钱。比特币因此真的能用于[微支付](/glossary/micropayment)。
- **隐私。** 闪电支付*不*广播到公开链上。链上只出现通道的开与关，中间的支付只发生在参与方与路由节点之间。
- **扩展性。** 每条通道支撑两方之间不限次数的交易，不膨胀主链。

局限也是真的：

- **流动性。** 通道能路由的量以相关方向的余额为上限。「入站流动性」对新节点是真实的概念、真实的问题。
- **在线要求。** 节点必须在线才能收发，并且（重要）监视通道对手的作弊企图。
- **运维复杂度。** 自己跑闪电节点比单纯持币要费心。许多用户选择托管型闪电钱包——和链上托管钱包一样，用自我托管换便利。

闪电是比特币在不改主链的前提下扩容的方式：主链为「跨越数十年的结算安全」优化，闪电为「即时支付」优化。两者按设计互补。

**关于 BOLT-12 offers。** 旧发票格式是 [BOLT-11](/glossary/bolt-11)——一次性的即时支付请求。BOLT-12（「offers」）是现代继任者：可复用、支持周期性支付、更小、更私密，2024 年 9 月正式并入闪电规范。截至 2026 年采用取决于具体实现：Core Lightning、LDK、Eclair/Phoenix 原生支持；LND 尚未（可经 LNDK 桥接）。Strike、Lightspark、CoinOS 等服务已上线支持；多数日常钱包仍默认 BOLT-11。预计未来几年会逐步迁移。

通道这个积木见[闪电通道](/glossary/lightning-channel)；路由原理见[闪电网络路由](/rabbit-holes/lightning-routing)；用户视角见[第 5 章 · 如何使用比特币](/journey/using-bitcoin)。

**相关词条：** [闪电通道](/glossary/lightning-channel) · [闪电节点](/glossary/lightning-node) · [闪电支付](/glossary/lightning-payment) · [HTLC](/glossary/htlc-hashed-time-locked-contract) · [闪电路由](/glossary/lightning-routing) · [Sphinx](/glossary/lightning-sphinx) · [BOLT 11](/glossary/bolt-11)
