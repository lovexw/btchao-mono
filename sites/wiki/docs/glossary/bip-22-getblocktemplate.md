---
title: BIP 22（getblocktemplate）
---

# BIP 22（getblocktemplate）

> **一句话定义：** 提议一个 RPC 方法，把原始区块数据交给矿工自行组装候选区块，取代 getwork。

BIP 22 规定了 `getblocktemplate`（GBT）——[矿工](/glossary/miner)向[全节点](/glossary/full-node)索要待挖[区块](/glossary/block)的 RPC。节点交出一份完整模板：前块哈希、Coinbase 脚手架、节点希望收录的交易，以及区块必须满足的共识规则。矿工可以照单全收，也可以重排交易、替换交易，甚至从零搭建自己的模板。

它取代了更早的 `getwork`——后者只回传一个半成品的[区块头](/glossary/block-header)。`getwork` 时代由矿池选择全部交易，矿工只管转 nonce——对矿工无妨，对去中心化有害，因为「区块里装什么」的权力完全落在矿池手里。GBT 用对了，这份权力就回到运行节点的人手里。

现实中，多数算力仍走「矿池预建模板、经 Stratum V1 下发」的路，所以 GBT 的去中心化红利大体停留在理论。Stratum V2 和「去中心化任务协商」等规范想把模板构建权推回给个体矿工，但采用缓慢。结果是 GBT 作为协议很健康、作为实践很闲置——这正是今天[挖矿中心化](/glossary/mining-centralization)的结构性形状。

规范：[BIP-22](https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki)，与细化模板提交的 BIP 23 配套。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [区块（Block）](/glossary/block) · [区块头（Block Header）](/glossary/block-header) · [挖矿中心化（Mining Centralization）](/glossary/mining-centralization) · [矿机（Mining Rig）](/glossary/mining-rig) · [挖矿软件（Mining Software）](/glossary/mining-software)
