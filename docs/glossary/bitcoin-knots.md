---
title: Bitcoin Knots
---

# Bitcoin Knots

> **一句话定义：** Bitcoin Core 的衍生客户端，由单一开发者维护——与 Core 共识完全兼容，差异在中继策略与内存池准入。

**Bitcoin Knots** 是 [Bitcoin Core](/glossary/bitcoin-core) 的衍生版本，由开发者 Luke Dashjr 一人维护。它紧贴 Core 的代码库，加上反映维护者个人观点的补丁——尤其是关于比特币节点该如何对待内存池策略、哪些交易算「垃圾信息（spam）」的观点。

关于 Knots 的治理，有两件事必须明白：

- **这是单人项目。** [Bitcoin Core](/glossary/bitcoin-core) 由轮换的贡献者群体维护，有正式评审流程和广泛的社区输入；Knots 体现的是一位开发者的编辑判断。社区说了不算，维护者说了算。代码开源、谁都可以分叉，但方向在维护者手里。
- **附加补丁写入了特定的策略立场。** 最突出的一点：Knots 默认更严格地过滤其维护者认定的垃圾交易（大载荷 [OP_RETURN](/glossary/opreturn)、[Ordinals 式铭文](/glossary/opreturn-based-tokens)等）。这是一个策略选择，不是中立的技术改进——节点运营者该不该对自己的转发行为施加这些过滤，讲道理的人有分歧。

兼容性说明：Knots 与 Core 共识兼容。Knots 节点看到同一条链、接受同样的区块。差异在**中继策略**（转发哪些交易）和**内存池准入**（保留哪些交易）——这些是节点本地选择，不是共识规则。

对多数用户，**[Bitcoin Core](/glossary/bitcoin-core) 才是参考实现**——有广泛开发者评审的代码库、被检验得最充分的验证逻辑、以及由社区评审过程（而非单一维护者偏好）长出来的策略。它是默认选项是有原因的，也是本站推荐的默认选项。

Knots 是一个正当的选项——前提是你认真想清楚了运行它所采取的策略立场。如果你没想过、只是想要一个比特币节点：选 Core。

**相关词条：** [比特币客户端（Bitcoin Client）](/glossary/bitcoin-client) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [节点（Node）](/glossary/node) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [安全模式（Bitcoin Core）](/glossary/safe-mode-bitcoin-core)
