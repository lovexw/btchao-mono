---
title: 分层多签（Hierarchical Multisig）
---

# 分层多签（Hierarchical Multisig）

> **一句话定义：** 层层嵌套的多签方案：多签中的每把「钥匙」本身又可以是多方或结构化的。

分层多签是一种嵌套结构：多签里的一个或多个「钥匙」本身又是多签。不必停留在扁平的 2-of-3，你可以搭出「2-of-3，其中那一把钥匙本身是 3-of-5」——把授权要求按组织架构层层嵌套。

它存在的理由：简单多签对个人或小团队的托管足够好。但组织——交易所、托管服务商、资金库、家族办公室——的安全与治理需求更细腻：

- **审批层级。** 一笔支出可能需要财务主管（1 把钥匙）、CFO（1 把钥匙），再加上 CEO **或** 董事会任一方（在一个槽位下嵌套 1-of-2）。
- **部门隔离。** 工程、财务、运营各控制一把「钥匙」，而每把钥匙内部又是各自团队成员的子多签。
- **纵深防御。** 日常运营的热钱包可以是 2-of-3，但从冷存储提币可能要 3-of-5，其中一把钥匙本身又是一把 4-of-7 带时间锁、地理分散的签名。

构造上既可以用[比特币脚本](/glossary/bitcoin-script)的原生多签操作码，更优雅的方式是借助 [Taproot](/glossary/taproot) 经 MAST 表达复杂策略。现代硬件钱包生态（Sparrow、Specter、Nunchuk）正越来越多地通过 [PSBT](/glossary/psbt) 工作流支持这类安排。

许多分层配置还会在搭建时就备好[预签名的救援交易](/glossary/rescue-transaction)：把商定的最坏情况恢复路径——联署人失联、钥匙被攻破、地理性事件——提前签名、冷存，需要时直接广播，省去危机中重新协调签名的慌乱。

代价是操作复杂度。每多一层，就多一分有人丢钥匙、忘流程、被锁在门外的可能。分层多签对有真实托管策略的组织是真正的利器，对个人大概率是杀鸡用牛刀。多数个人用户用硬件设备搭一个扁平的 2-of-3 就非常好。

**相关词条：** [PSBT（部分签名比特币交易）](/glossary/psbt) · [托管闪电钱包](/glossary/custodial-lightning-wallet) · [绿地址](/glossary/green-address) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [HDM（多签 HD 钱包）](/glossary/hdm-multi-signature-hd-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [M-of-N 多签](/glossary/m-n) · [单一签名](/glossary/mono-signature) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [法定人数签名](/glossary/quorum-signatures) · [救援交易](/glossary/rescue-transaction) · [钱包](/glossary/wallet) · [多签](/glossary/multisig)
