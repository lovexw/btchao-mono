---
title: BIP 342（Tapscript）
---

# BIP 342（Tapscript）

> **一句话定义：** 定义 Taproot 的脚本逻辑与操作码，为比特币智能合约的未来扩展留出版本空间。

[BIP-342](https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki) 定义 **Tapscript**——[Taproot](/glossary/taproot) 输出经脚本路径分支花费时（相对于协作的密钥路径分支）使用的[比特币脚本](/glossary/bitcoin-script)版本。2021 年 11 月与 BIP-340、BIP-341 一同作为[软分叉](/glossary/soft-fork)激活。

Tapscript 大体就是你认识的那套比特币脚本，但有几处改进：

- **新的签名[操作码](/glossary/op-code-operation-code)。** `OP_CHECKSIGADD` 取代了（在 Tapscript 中已弃用的）`OP_CHECKMULTISIG`，用更干净的逐签名累加器模式。
- **Tapscript 内的 `OP_CHECKSIG` 使用 [Schnorr 签名](/glossary/schnorr-signature)**，与 Taproot 其余部分的签名方案一致。
- **移除旧操作码。** 几个没有意义或暗藏怪癖的操作码在 Tapscript 语境下不复存在。
- **版本化。** Tapscript 是 Taproot 的「叶版本 0xC0」；未来的叶版本可以引入**更多**操作码（或不同规则），而不需要再来一次完整的协议升级。这就是面向未来的那块。
- **更干净的资源计量。** Tapscript 对资源使用的计量方式与旧脚本不同，验证成本有更清晰的上界。

版本化是被低估的赢面。给旧比特币脚本加一个新操作码，需要一次改动版本字段解释的软分叉——笨重。Tapscript 里，新的叶版本可以引入不同操作码而完全不动现有叶版本。未来的能力扩展（契约、新签名方案等）可以用这个槽位。

对多数用户，Tapscript 不可见。协作花费 Taproot 输出（「密钥路径」）时用不到它——只有一把 Schnorr 签名。只有走脚本路径（[MAST](/glossary/merkleized-abstract-syntax-tree-mast) 里的备用分支）时 Tapscript 才登场，而且钱包会替你处理。

大背景见 [Taproot](/glossary/taproot)，Tapscript 所扩展的旧脚本语言见[比特币脚本（Bitcoin Script）](/glossary/bitcoin-script)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [BIP 144（SegWit 中继）](/glossary/bip-144-segwit-relay) · [Taproot](/glossary/taproot) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [默克尔化抽象语法树（MAST）](/glossary/merkleized-abstract-syntax-tree-mast)
