---
title: BIP-8（按高度锁定版）
---

# BIP-8（按高度锁定版）

> **一句话定义：** 提议的软分叉激活机制：以区块高度（而非时间戳）度量部署窗口，LOT 旗可保证激活。从未用于主网，却是 2017 年以来每次激活辩论的核心。

BIP-8 是一种提议中的[软分叉](/glossary/soft-fork)激活机制，2017 年 2 月由 Shaolin Fry 创建——就是写 [BIP-148](/glossary/bip-148-uasf) 的那位化名开发者，Luke Dashjr 后来通过历次修订成为共同作者。它修正了 [BIP-9](/glossary/bip-9-versionbits)（比特币此前使用的机制）的两个痛点。

第一处修正很小：BIP-8 用[区块高度](/glossary/block-height)而非时间戳来度量部署窗口，因为区块时间戳只松散准确、且可被矿工操纵。第二处就是大家吵的那处：BIP-9 部署在矿工信令始终不达标时会无声过期，等于发给矿工一张安静否决票——拖得够久就能拖死提案。BIP-8 增加了一个叫 lockinontimeout 的旗，简称 LOT。LOT=false 时，不达阈值的部署像 BIP-9 一样失败；LOT=true 时，最后一个信令周期内的区块**被要求**发信号，分叉保证在截止期锁定。运行 LOT=true 的节点在该窗口内拒绝不发信号的区块——这是把 [BIP-148](/glossary/bip-148-uasf) 的用户激活剧本变成可复用的机制。

BIP-8 还建议把信令阈值从 BIP-9 的 95% 降到 90%（每个难度周期 2,016 块中的 1,815 块）。

LOT 旗成了 2021 年初 Taproot 激活辩论的核心战场。社区会议几乎在所有事项上达成一致，包括 90% 阈值，却在 LOT=true 与 LOT=false 上分裂，两边都拿不出共识。Bitcoin Core 最终绕开问题，发布了 [Speedy Trial](/glossary/speedy-trial)——一个基于 BIP-9 的部署，借用 BIP-8 的阈值、加上基于高度的激活延迟。少数节点运营者跑了一个以 BIP-8 LOT=true 为兜底的替代客户端；由于 Speedy Trial 先成功，它从未真正出手。

截至 2026 年，BIP-8 仍是草案，从未用于主网激活。但影响是实打实的：2017 年以来每一次激活讨论——包括当前的契约之争——都部分地用 BIP-8 的词汇在争：保证激活，还是交给矿工。

BIP-8 在激活故事中的位置，见 [BIP 流程专题](/rabbit-holes/bip-process)。

**相关词条：** [BIP 9（版本位）](/glossary/bip-9-versionbits) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [Speedy Trial（快速试验）](/glossary/speedy-trial) · [矿工信号（Miner Signaling）](/glossary/miner-signaling) · [软分叉（Soft Fork）](/glossary/soft-fork) · [Taproot](/glossary/taproot) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal)
