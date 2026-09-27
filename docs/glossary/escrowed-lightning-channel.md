---
title: 带托管的闪电通道
---

# 带托管的闪电通道

> **一句话定义：** 由第三方或多签安排增加额外保障或条件控制的闪电通道。

带托管的闪电通道是一种非标准设计：在通道运作中加入第三方（或额外的脚本条件）来居中调停。标准设计是通道两方之间的 2-of-2 多签；托管版则可能用带托管代理作第三签名的 2-of-3 多签。

这个模式在实践中很少见，但出现在特定商业场景：

- **B2B 结算通道**，由中立方裁决争议，但不碰资金托管权。
- **保险或担保安排**，托管持有者可在约定条件满足时放款。
- **LSP（闪电服务提供商）集成**，LSP 对路由或流动性决策保留某些权限，作为交换，它负责通道的日常运营。

取舍：

- **多了灵活性。** 争议不必上法庭，也不必纯靠[惩罚交易](/glossary/penalty-transaction)机制解决。
- **丢了纯双边的免信任。** 第三方理论上可能与一方合谋。托管假设开始重要了。
- **操作复杂。** 零件更多、钥匙更多、故障模式更多。

对多数闪电用户，标准双端通道足够好，托管版徒增复杂。这个模式活在专业化的金融关系里——小众，但真实存在。

标准设计见[闪电通道](/glossary/lightning-channel)；它借用的链上概念见[托管（Escrow）](/glossary/escrow)。

**相关词条：** [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [交易对手风险](/glossary/counterparty-risk) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [托管（Escrow）](/glossary/escrow) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [闪电节点](/glossary/lightning-node) · [支付通道](/glossary/payment-channel) · [惩罚交易](/glossary/penalty-transaction)
