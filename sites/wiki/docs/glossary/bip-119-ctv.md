---
title: BIP 119（CTV）
---

# BIP 119（CTV）

> **一句话定义：** 提议新操作码 CHECKTEMPLATEVERIFY，实现对资金未来花费方式的契约式控制。

[BIP-119](https://github.com/bitcoin/bips/blob/master/bip-0119.mediawiki) 是 Jeremy Rubin 起草的提案，建议加入 [`OP_CHECKTEMPLATEVERIFY`](/glossary/checktemplateverify-ctv)（CTV）操作码。它是 Taproot 之后时代被讨论得最多的「契约」提案，截至 2026 年仍是草案——未激活、未否决、仍在讨论。

提案在技术层面做的事：CTV 让[比特币脚本](/glossary/bitcoin-script)可以承诺花费某输出的任何[交易](/glossary/transaction)的**形状**——输入输出数量、金额、脚本类型等。这就是[契约](/glossary/covenants)：不仅约束「谁能动这笔钱」，还约束「这笔钱未来怎么流动」。

提案瞄准的用例：

- **金库。** 冷存储提款被迫走一条预先承诺的两步流程，中间的延时窗口里，用户可以取消一笔不是本人发起的提款。
- **通道工厂。** 用一笔链上交易承诺未来开启多条闪电通道，把大部分费用成本推迟。
- **离散对数合约及类似的高级原语。**
- **一笔链上交易批量支付多个收款人。**

辩论的现状：

- **支持：** CTV 是已提案契约原语里最小、最简单的。能解锁实用的结构，同时为以后更高级的契约留门。
- **反对：** 加入**任何**契约操作码都不可逆。一些比特币开发者担心它与未来协议改动的微妙交互，或者担心「开契约之门」这个先例本身。其他契约提案（OP_VAULT、OP_CTV+CSFS、各种基于 Taproot 的替代）各有取舍。

BIP-119 在技术上已经就绪多年。能否激活取决于尚未形成的社区共识。更大的概念见[契约（Covenants）](/glossary/covenants)，操作码层面的机制见[CTV（CheckTemplateVerify）](/glossary/checktemplateverify-ctv)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 9（版本位）](/glossary/bip-9-versionbits) · [CTV（CheckTemplateVerify）](/glossary/checktemplateverify-ctv) · [契约（Covenants）](/glossary/covenants) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [软分叉（Soft Fork）](/glossary/soft-fork)
