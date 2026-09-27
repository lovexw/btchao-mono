---
title: BIP 9（版本位）
---

# BIP 9（版本位）

> **一句话定义：** 矿工在区块头中为软分叉提案发信号的信令方法，达到激活阈值前先行表态。

[BIP-9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki) 引入了**版本位（VersionBits）**：协调比特币[软分叉](/glossary/soft-fork)激活的矿工信令机制。思路是：把候选软分叉提案编码进[区块头](/glossary/block-header)版本字段的特定位，矿工设置这些位来表示就绪。

机制：

1. 一个新 BIP 被分配一个版本位和一个部署窗口（开始时间与结束时间）。
2. 窗口期内，矿工可以在自己的区块中设位发信号。
3. 如果一个 2,016 块的难度调整期内有 95% 的区块发信号，软分叉在下一个调整期「锁定」，随后激活。
4. 部署窗口到期仍未达阈值，提案作废。

这套机制在多个软分叉上干净运作（BIP-65 CLTV、BIP-68 CSV 等）。著名的失灵是 2017 年 [SegWit](/glossary/segwit-segregated-witness-bip-141) 激活：一小撮矿工不顾广泛的用户支持拒绝发信号。僵局催生了替代激活方法：[BIP-148（UASF）](/glossary/bip-148-uasf)、[BIP-91](/glossary/bip-91)，以及最终的继任框架 BIP-8 /「Speedy Trial」——后者在 2021 年激活 [Taproot](/glossary/taproot)，并内置矿工信令失败时回退到用户强制激活的机制。

SegWit 一役的更深层教训：**矿工发的是就绪信号，但不决定规则。** 当用户节点愿意不管矿工信令与否都去执行一条规则时，矿工最终会就范。BIP-9 让无争议升级的协调更顺滑，但对有争议的升级没有干净的答案。现代激活方法把这个教训内置了进去。

版本位在整台升级机器里的位置，见[BIP 流程专题](/rabbit-holes/bip-process)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 91](/glossary/bip-91) · [BIP 119（CTV）](/glossary/bip-119-ctv) · [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [BIP 144（SegWit 中继）](/glossary/bip-144-segwit-relay) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [部署阈值（软分叉）](/glossary/deployment-threshold-soft-fork) · [锁定阶段（软分叉）](/glossary/locked-period-soft-fork) · [软分叉（Soft Fork）](/glossary/soft-fork)
