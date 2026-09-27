---
title: 操作码（OP Code）
---

# 操作码（OP Code）

> **一句话定义：** 比特币脚本语言中的单条指令（如 OP_CHECKSIG），定义花费生效必须满足的条件。

操作码（opcode）是[比特币脚本](/glossary/bitcoin-script)中的单条指令。比特币的脚本语言基于栈：操作码把值压入栈、从栈弹出、操作栈、执行检查或条件分支。脚本执行到「栈顶非空且非假」即算成功。

主要操作码类别：

- **栈操作：** `OP_DUP`、`OP_DROP`、`OP_SWAP`、`OP_PICK`、`OP_ROLL` 等。
- **算术：** `OP_ADD`、`OP_SUB`、`OP_MUL`（目前禁用）、比较类等。
- **哈希：** `OP_HASH160`、`OP_HASH256`、`OP_SHA256`、`OP_RIPEMD160`。
- **签名检查：** `OP_CHECKSIG`、`OP_CHECKMULTISIG`、`OP_CHECKSIGVERIFY`。
- **时间锁检查：** [`OP_CHECKLOCKTIMEVERIFY`](/glossary/checklocktimeverify-cltv)、[`OP_CHECKSEQUENCEVERIFY`](/glossary/checksequenceverify-csv)。
- **条件分支：** `OP_IF`、`OP_NOTIF`、`OP_ELSE`、`OP_ENDIF`。
- **常量与特殊：** `OP_0` 到 `OP_16`、`OP_RETURN`、`OP_NOP`。

一些*曾经*存在于比特币脚本中的操作码已出于安全原因被中本聪或后来的开发者**禁用**——`OP_CAT`、`OP_MUL`、`OP_DIV`、`OP_LSHIFT` 等。其中一些（尤其是 `OP_CAT`）是持续争论的重新启用议题，因为它们能支持金库等构造所需的更多合约结构。

操作码集合刻意收窄。比特币脚本没有循环、没有任意跳转、没有图灵完备的通用计算。这是一个深思熟虑的安全权衡：更丰富的语言意味着更大的攻击面、更难的验证、以及用昂贵脚本搞拒绝服务的可能。窄操作码集让验证可预测且廉价。

新操作码通过[软分叉](/glossary/soft-fork)添加，做法是重新启用之前被禁用或无意义的 NOP 操作码。CLTV（BIP-65）和 CSV（BIP-112）就是这么来的——它们接管了原本无意义的 `OP_NOP` 槽位。未来的新增如 CTV（[BIP 119](/glossary/bip-119-ctv)）将沿用同一模式。

操作码如何组合成花费条件，见[比特币脚本](/glossary/bitcoin-script)。

**相关词条：** [BIP 119（CTV）](/glossary/bip-119-ctv) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [CTV（CheckTemplateVerify）](/glossary/checktemplateverify-ctv) · [契约（Covenants）](/glossary/covenants) · [OP_RETURN](/glossary/opreturn) · [脚本（Script）](/glossary/script) · [无脚本脚本（Scriptless Scripts）](/glossary/scriptless-scripts)
