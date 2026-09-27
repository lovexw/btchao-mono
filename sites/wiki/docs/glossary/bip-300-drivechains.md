---
title: BIP 300（驱动链）
---

# BIP 300（驱动链）

> **一句话定义：** 提议「驱动链」机制：合并挖矿、双向锚定的侧链，用于扩展比特币功能。

[BIP-300](https://github.com/bitcoin/bips/blob/master/bip-0300.mediawiki) 是提议中的比特币共识机制，用于实现**驱动链（drivechains）**——一种[侧链](/glossary/sidechain)：比特币与侧链之间的锚定不靠联盟托管，而由比特币[矿工](/glossary/miner)对提款请求投票来执行。Paul Sztorc 于 2015 年提出驱动链，它至今仍是比特币历史上旷日持久的「到底该不该激活」辩论之一。

驱动链的简化工作方式：

1. **一条驱动链上线**，带着自己的共识规则。用户可向其[锚定转入](/glossary/peg) BTC（主网锁定，侧链收到等值代币）。
2. **侧链上活动**，规则随侧链设计（隐私、智能合约、更快的区块，什么都行）。
3. **要锚定转出时**，侧链参与者向主网提议一笔提款交易。
4. **矿工在约 3 个月的长周期里投票。** 支持的算力足够，BTC 释放回主网；不够，继续锁着。

这是一种不经联盟多签的[双向锚定](/glossary/peg)。信任假设是：多数比特币矿工不会合谋盗取他们不认可的驱动链提款——在数月的投票窗口里。

**支持方论点：**

- **无需许可的侧链实验。** 任何人都能上线带新功能的驱动链，无需比特币协议升级。用例：隐私链（机密交易）、高吞吐支付链、替代虚拟机链等。
- **BTC 仍是唯一的代币。** 不催生新山寨币；侧链活动以锚定的 BTC 计价。
- **比特币吃下侧链的手续费经济**，经由[合并挖矿](/glossary/merged-mining)（[BIP-301](/glossary/bip-301)）。

**反对方论点：**

- **矿工权力扩张。** 驱动链正式赋予矿工批准/否决提款的权威——从「矿工只管给交易排序」到「矿工掌管托管」的重大转变。
- **MEV 压力。** 经济丰富的侧链可能产出回流矿工的 MEV，反过来激励算力集中。
- **复杂度。** 驱动链支持给 Bitcoin Core 加上不轻的验证逻辑。
- **炒作与现实的落差。** 多年的「驱动链将解决 X」论述，落地寥寥。

BIP-300 未曾激活。一些 Bitcoin Core 分叉版本里有补丁；这个提案周期性地回到社区讨论中。截至 2026 年它不在近期路线图上，但讨论也没死。配套的合并挖矿部分见 [BIP 301](/glossary/bip-301)，更大的类别见[侧链（Sidechain）](/glossary/sidechain)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 301](/glossary/bip-301) · [Liquid 网络（Liquid Network）](/glossary/liquid-network) · [单向锚定（One-Way Peg）](/glossary/one-way-peg) · [转入锚定（Peg-in）](/glossary/peg) · [转出锚定（Peg-out）](/glossary/peg-out) · [侧链（Sidechain）](/glossary/sidechain)
