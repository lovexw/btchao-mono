---
title: 共识参数（Consensus Parameter）
---

# 共识参数（Consensus Parameter）

> **一句话定义：** 全网规则或设定（如区块大小、难度），所有全节点必须遵循才能达成共识。

共识参数是协议要求每个全节点以完全相同方式执行的一切规则。两个节点只要在一个共识参数上意见不合，它们最终就会走上两条不同的链。

比特币的主要共识参数：

- **区块权重上限。** 400 万权重单位。这是 SegWit 之后对原先 1 MB 区块大小上限的替代。
- **减半时间表。** 补贴每 210,000 个区块（约 4 年）减半，从 50 BTC 起步，一路递减，渐近于 20,999,999.9769 BTC 的[供应上限](/glossary/asymptote)。
- **合法脚本操作码及其语义。** 由共识实现定义：`OP_CHECKLOCKTIMEVERIFY` 做什么、`OP_CHECKMULTISIG` 做什么、SegWit 见证里允许什么、Tapscript 叶子里允许什么。
- **难度调整规则。** 每 2016 个区块校准一次难度，使出块间隔的期望值锚定在 10 分钟。
- **Coinbase 成熟期。** 新铸造的区块奖励要等 100 个确认才能花。
- **软分叉的激活规则。** BIP 9 versionbits、Speedy Trial、BIP 8——「新共识参数如何上线」的规则本身，也是一种元层面的共识参数。

改动共识参数，需要一次协调好的软分叉（收紧规则、向后兼容）或硬分叉（放宽规则；若非全员同意就会撕裂链条）。两者的门槛都极高。比特币的参数集是被刻意保持稳定的：纵观协议历史，实质性的共识变更平均每 2–4 年才有一次（P2SH、CLTV、CSV、SegWit、Taproot）。

这种稳定本身就是特性。货币的价值，有一部分正来自「规则不会变」的信心。一个十年未变的共识参数，向持币者传递的确定性，是一条规则随取随改的链给不了的。

**相关词条：** [分叉](/glossary/fork) · [软分叉](/glossary/soft-fork) · [区块](/glossary/block) · [区块链](/glossary/blockchain) · [难度](/glossary/difficulty) · [难度调整](/glossary/difficulty-retargeting) · [区块补贴](/glossary/block-subsidy) · [部署阈值（软分叉）](/glossary/deployment-threshold-soft-fork) · [锁定阶段（软分叉）](/glossary/locked-period-soft-fork) · [去中心化](/glossary/decentralization) · [工作量证明（PoW）](/glossary/proof-work-pow)
