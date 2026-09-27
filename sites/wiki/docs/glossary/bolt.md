---
title: BOLT
---

# BOLT

> **一句话定义：** 「Basis of Lightning Technology」：定义闪电网络各实现如何交互并保持兼容的规范集。

BOLT——**B**asis **O**f **L**ightning **T**echnology（闪电技术基础）——是定义[闪电网络](/glossary/lightning-network)各实现如何互操作的规范系列。它至于闪电，就像 [BIP](/glossary/bip-bitcoin-improvement-proposal) 至于比特币：一套有版本管理、经社区评审的文档，任何构建闪电软件的人都要遵守。

目前的 BOLT 文档（编号 0 到 12，外加若干实验性增补）覆盖：

- **BOLT 1**——基础协议、消息分帧。
- **BOLT 2**——通道管理的对端协议（开、关、更新）。
- **BOLT 3**——链上通道状态所用的交易与脚本格式。
- **BOLT 4**——洋葱路由（[Sphinx](/glossary/lightning-sphinx) 数据包格式）。
- **BOLT 5**——链上交易与通道关闭逻辑。
- **BOLT 7**——广播通道信息的 gossip 协议。
- **BOLT 9**——功能开关（feature flags）。
- **[BOLT 11](/glossary/bolt-11)**——发票格式。
- **BOLT 12**——offer（BOLT 11 的可复用发票后继），2024 年合入。

规范维护在 github.com/lightning/bolts，由各大实现——Lightning Labs（LND）、Blockstream（Core Lightning）、ACINQ（Eclair）、Spiral（LDK）——的代表共同维护。修改经 pull request、评审、跨实现广泛共识推进。

正是这种多厂商协作，让 Phoenix 钱包（Eclair）能和 Core Lightning 节点开通道、途经 LND 运营的基础设施、付给一个基于 LDK 的收款方——因为大家都遵守同一套 BOLT。

**相关词条：** [BOLT 11](/glossary/bolt-11) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [闪电锚定承诺交易](/glossary/lightning-anchor-commitment) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [闪电退款发票](/glossary/lightning-refund-invoice) · [闪电路由（Lightning Routing）](/glossary/lightning-routing)
