---
title: 侧链（Sidechain）
---

# 侧链（Sidechain）

> **一句话定义：** 经锚定机制与比特币互通的外部区块链（如 Liquid）：提供新特性或更快交易。

侧链（Sidechain）是通过**双向锚定**与比特币互通的独立区块链——你在主链上锁定 BTC，侧链上发行等值代币，且随时可以反向操作赎回 BTC。

侧链运行自己的共识、自己的出块，往往有自己的脚本环境，以及自己的[出块时间](/glossary/block-time)。用户在侧链上自由交易（通常带着比特币基础层没有的特性——更快的区块、隐私交易、智能合约），而 BTC 依然锁在主网上。

锚定机制是核心的信任问题。现有的最强方案：

- **联邦锚定。** 一个由运营方组成的多签委员会持有锁定的 BTC，凭签过名的存取记录发行/赎回侧链代币。信任在联邦：如果 51%（或无论什么阈值）串通或沦陷，锚定崩溃。**Liquid**（Blockstream）采用。
- **Drivechain（[BIP-300/301](/glossary/bip-300-drivechains)）**——提案中的比特币升级：矿工通过给提款请求投票来执行锚定。尚未激活；仍在争论。
- **Spacechain / Statechain / Ark**——更新的设计，信任模型各异：有的对用户真正自主，有的仍依赖协调方。

2026 年值得关注的比特币侧链：

- **Liquid 网络**（Blockstream）——联邦制，支持隐私交易与资产发行。用于机构间交易所结算、证券型代币和部分 Tether USD。
- **RSK（Rootstock）**——联邦制，兼容 EVM 的智能合约。
- **Statechain / Mercury Layer**——较新、用户较少；不经链上交易转移 UTXO 控制权。

总的框架：侧链让你试验比特币基础层无法安全采纳的特性，代价是额外的信任假设（通常是联邦）。不同用户对这个交易的估价不同。侧链是更宽的[链下](/glossary/off-chain)类别下的一个物种；不运行独立链、但同样锚定比特币的构造，见[第二层（Second Layer）](/glossary/second-layer)。

**相关词条：** [链下（Off-Chain）](/glossary/off-chain) · [第二层（Second Layer）](/glossary/second-layer) · [单向锚定（One-Way Peg）](/glossary/one-way-peg) · [转入锚定（Peg-in）](/glossary/peg) · [转出锚定（Peg-out）](/glossary/peg-out) · [BIP 300（Drivechains）](/glossary/bip-300-drivechains) · [Liquid 网络](/glossary/liquid-network)
