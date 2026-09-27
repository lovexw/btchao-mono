---
title: 比特币脚本（Bitcoin Script）
---

# 比特币脚本（Bitcoin Script）

> **一句话定义：** 定义每个比特币 UTXO 花费条件的栈式脚本语言——刻意不做图灵完备，用表达力换安全。

比特币脚本是定义每个比特币 [UTXO](/glossary/utxo-unspent-transaction-output) 花费条件的栈式语言。每个输出有一个 **scriptPubKey**（锁）；每个输入必须提供满足它的 **scriptSig** 或 **witness**（钥匙）。

脚本**刻意不做图灵完备**。没有循环，没有跳转，执行必然终止。这是有意为之：表达能力更强的语言意味着无上限的执行时间，也就意味着攻击面。比特币用表达力换安全。想要完整可编程性，请去链下（组合脚本原语的工具）或另一层（如[闪电网络](/glossary/lightning-network)）。

脚本原生能做的事：

- **付给单个公钥。** 最初的 P2PK 格式。
- **付给公钥哈希（P2PKH）。** 把公钥哈希成地址，花钱时才揭示公钥。
- **多签。** N-of-M 花费——要求 M 把指定钥匙中任意 N 把的签名（老式 OP_CHECKMULTISIG 或现代 Taproot 等价物）。
- **时间锁。** 要求交易仅在特定区块高度或时间之后有效（[CLTV](/glossary/checklocktimeverify-cltv)、[CSV](/glossary/checksequenceverify-csv)）。
- **哈希锁。** 要求揭示一个哈希到特定承诺的值——闪电网络 [HTLC](/glossary/htlc-hashed-time-locked-contract) 的基石。
- **以上各项的任意组合**，尤其在 [Taproot](/glossary/taproot) 和 Tapscript 之下。

多数比特币用户从不直接写脚本：钱包自动构造标准模板（P2PKH、P2WPKH、P2TR）。但理解脚本，是理解「比特币合约能做成什么样」的入口——也是判断哪些提案（契约、金库脚本、CTV）未来软分叉可能或不可能加入的入口。

现代脚本环境见 [Taproot](/glossary/taproot)；脚本最有用的现实组合之一见 [HTLC](/glossary/htlc-hashed-time-locked-contract)。

**相关词条：** [适配器签名（Adapter Signature）](/glossary/adapter-signature) · [P2SH](/glossary/p2sh) · [BIP-65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP-68（相对锁定时间）](/glossary/bip-68-relative-locktime) · [BIP-113](/glossary/bip-113) · [BIP-119（CTV）](/glossary/bip-119-ctv) · [BIP-342（Tapscript）](/glossary/bip-342-tapscript) · [比特币披萨日（Bitcoin Pizza Day）](/glossary/bitcoin-pizza-day) · [CLTV（OP_CHECKLOCKTIMEVERIFY）](/glossary/checklocktimeverify-cltv) · [CSV（OP_CHECKSEQUENCEVERIFY）](/glossary/checksequenceverify-csv) · [CTV（OP_CHECKTEMPLATEVERIFY）](/glossary/checktemplateverify-ctv) · [契约（Covenants）](/glossary/covenants) · [MAST（默克尔化抽象语法树）](/glossary/merkleized-abstract-syntax-tree-mast) · [操作码（OP Code）](/glossary/op-code-operation-code) · [OP_RETURN](/glossary/opreturn) · [脚本（Script）](/glossary/script) · [无脚本脚本（Scriptless Scripts）](/glossary/scriptless-scripts) · [Taproot](/glossary/taproot)
