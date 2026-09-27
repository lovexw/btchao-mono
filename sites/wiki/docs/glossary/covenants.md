---
title: 契约（Covenants）
---

# 契约（Covenants）

> **一句话定义：** 不只限制 UTXO *谁能花*，还限制*必须怎么花*的比特币脚本构造——BIP-119 CTV 等提案试图引入的能力。

契约（covenant）是一种[比特币脚本](/glossary/bitcoin-script)构造，它限制的不只是一个 UTXO *谁*能花，还有*它必须怎么花*。锁定脚本不再只是校验签名，而是给花费这笔资金的那笔交易本身设下约束——资金只能流向哪些地址、金额是多少、什么时间点花，等等。

比特币目前并不支持契约。相关提案至少从 2013 年起就以各种形式出现，而 Taproot 之后的年代（2022–2026）见证了关于激活其中一种的最认真的讨论。

契约能带来什么：

- **金库构造。** 冷存储中的提币必须走一条特定的多步骤路径，且留有可取消的窗口期。哪怕签名密钥被偷，攻击者也被迫走一条缓慢、可观测、你能中途打断的路。
- **通道工厂。** 一笔链上交易预先承诺未来开启多条[闪电通道](/glossary/lightning-channel)，把大头的手续费开销推迟支付。
- **跨输入签名聚合模式。**
- **信任最小化的托管产品**，策略由脚本强制执行。
- **改进的二层协议**（闪电网络一些棘手的用户体验问题，有契约后会变容易）。

争论有两派：

**支持方：** 契约解锁了今天笨拙或根本做不出来的实用构造。最简单的提案范围界定良好，不会破坏任何现有东西。

**反对方：** 引入契约能力是脚本表达力的一次大扩张。契约操作码一旦激活，实际上就是永久的。人们担心它与未来协议变更之间的微妙交互，也担心政策先例——如果契约能强制「这个 UTXO 只能花到白名单地址」，那这种能力是双刃的（正经金库 vs 被强制要求的 KYC 合规方案）。

当前的候选提案：[BIP-119（CTV）](/glossary/bip-119-ctv)、OP_VAULT、OP_CAT 的重新启用、ANYPREVOUT 等。还没有哪个提案攒够激活所需的广泛共识。讨论仍在继续。

截至 2026 年，契约之争是比特币协议开发中最有分量的开放问题之一。哪怕你暂时没有立场，也值得搞懂它。

**相关词条：** [BIP 119（CTV）](/glossary/bip-119-ctv) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [CTV（CheckTemplateVerify）](/glossary/checktemplateverify-ctv) · [回拨机制（Clawback Mechanism）](/glossary/clawback-mechanism) · [币冻结脚本（Coin Freeze）](/glossary/coin-freeze) · [彩色币（Colored Coins）](/glossary/colored-coins) · [交易对手风险（Counterparty Risk）](/glossary/counterparty-risk) · [操作码（OP Code）](/glossary/op-code-operation-code) · [脚本（Script）](/glossary/script) · [无脚本脚本（Scriptless Scripts）](/glossary/scriptless-scripts)
