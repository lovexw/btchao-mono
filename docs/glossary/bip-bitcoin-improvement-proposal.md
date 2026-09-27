---
title: BIP（比特币改进提案）
---

# BIP（比特币改进提案）

> **一句话定义：** 提议修改或增补比特币协议与生态标准的正式设计文档——比特币开源开发提出、辩论、定稿变更的流程本身。

BIP（**B**itcoin **I**mprovement **P**roposal，比特币改进提案）是一份正式设计文档，提议对比特币的协议、软件或标准做出变更或增补。BIP 体系仿照 Python 的 PEP 流程，是比特币开源开发实际使用的提案、辩论与成文机制。

任何人都可以写 BIP。流程最初由 [BIP-1](https://github.com/bitcoin/bips/blob/master/bip-0001.mediawiki) 和 [BIP-2](https://github.com/bitcoin/bips/blob/master/bip-0002.mediawiki) 定义，2026 年 1 月起由 [BIP-3](https://github.com/bitcoin/bips/blob/master/bip-0003.md) 更新：

1. **草案。** 作者按标准 BIP 格式写提案——摘要、动机、规范、设计理由、向后兼容性等。
2. **讨论。** 草案发到 bitcoin-dev 邮件列表和 GitHub，任何感兴趣的人——开发者、矿工、用户、研究者——评审、留言。
3. **编号。** 提案格式合格、值得保留的，BIP 编辑分配一个永久 BIP 编号。
4. **迭代。** 作者根据反馈修改。大量 BIP 走不过这一步。
5. **状态流转。** 按 BIP-3（2026 年 1 月起）：Draft，规范写完升 Complete，落地使用后升 Deployed；撤回、被拒或被取代则 Closed。（旧 BIP-2 体系用九种状态，含 Proposed 和 Final。）
6. **实际部署。** 进入 Bitcoin Core（或其他实现）是另一回事。在网络上生效需要节点运营者自愿采用；共识变更还需要矿工信令。

BIP 分三类：

- **标准跟踪（Standards Track）**——协议本身的变更（共识规则、网络协议、点对点消息）。例：BIP-141（[隔离见证 SegWit](/glossary/segwit-segregated-witness-bip-141)）、BIP-340/341/342（[Schnorr 签名](/glossary/schnorr-signature) / [Taproot](/glossary/taproot)）、BIP-352（[静默支付](/glossary/silent-payments)）。
- **信息类（Informational）**——设计指南或实现说明，不触碰共识。
- **流程类（Process）**——对 BIP 流程本身的修改。

BIP 流程刻意做得慢、保守、充满对抗——它是[比特币治理](/glossary/bitcoin-governance)的正式末端，开发者、矿工、节点运营者、用户、长期持币者在事实上各握否决权。一个影响共识的变更从提案到全网激活通常要数年，多数提案根本走不完。这是特性而非缺陷：一个承载 1–2 万亿美元价值的全球货币协议，本来就应该非常、非常难被意外改动。[隔离见证](/glossary/segwit-segregated-witness-bip-141)和 [Taproot](/glossary/taproot) 是两个完整走通的例子。

更深入的探讨见 [BIP 流程专题](/rabbit-holes/bip-process)——编辑到底控制什么、BIP 的生命周期、激活如何运作。

**相关词条：** [BIP 9（版本位）](/glossary/bip-9-versionbits) · [P2SH](/glossary/p2sh) · [BIP-22（GetBlockTemplate）](/glossary/bip-22-getblocktemplate) · [BIP-65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP-68（相对锁定时间）](/glossary/bip-68-relative-locktime) · [隔离见证 SegWit（BIP-141）](/glossary/segwit-segregated-witness-bip-141) · [BIP-173（Bech32）](/glossary/bip-173-bech32) · [比特币治理](/glossary/bitcoin-governance) · [PSBT](/glossary/psbt) · [Taproot](/glossary/taproot) · [BIP-342（Tapscript）](/glossary/bip-342-tapscript) · [BOLT 11](/glossary/bolt-11)
