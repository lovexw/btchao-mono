---
title: Coinbase 交易
---

# Coinbase 交易

> **一句话定义：** 每个区块的第一笔交易——新发行的 BTC 从这里进入流通；也是比特币里唯一没有真实输入的交易。

Coinbase 交易是每个比特币区块的第一笔交易。它是新 BTC 进入流通的通道，也是比特币里唯一没有真实输入的交易。

找到有效区块的矿工在 coinbase 里给自己支付[区块奖励](/glossary/block-reward)：[区块补贴](/glossary/block-subsidy)（当前 3.125 BTC）加上区块内打包的全部交易手续费之和。Coinbase 的「输入」是个占位符——它不引用任何先前的 UTXO，因为确实没有花费任何先前的 UTXO。输出则成为矿工自有的新 UTXO。

两条值得记住的规则：

- **Coinbase 的 scriptSig 是自由字段。** 矿工可以塞任意数据。中本聪在[创世区块](/glossary/genesis-block)的 coinbase 里放了那句著名的《泰晤士报》标题："The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"。现代矿池用它放矿池标签和 [BIP 34](/glossary/bip-34) 的区块高度标记。
- **100 块成熟期。** Coinbase 输出必须等其上再挖出 100 个区块才能花费。这是为了防止矿工花掉可能随链重组消失的新铸币。

Coinbase 是新 BTC 进入流通的唯一入口。今天存在的每一聪，最初都是从某笔 coinbase 交易里发出来的。大约 2140 年补贴归零后，coinbase 交易仍将继续——只是那时只发手续费。

完整挖矿流程见[挖矿专题](/rabbit-holes/mining)，发行时间表见[区块补贴](/glossary/block-subsidy)。

**相关词条：** [区块（Block）](/glossary/block) · [区块奖励（Block Reward）](/glossary/block-reward) · [区块补贴（Block Subsidy）](/glossary/block-subsidy) · [创世区块（Genesis Block）](/glossary/genesis-block) · [Hal Finney 的「Running bitcoin」](/glossary/hal-finneys-running-bitcoin) · [减半（Halving）](/glossary/halving-halvening) · [矿工（Miner）](/glossary/miner) · [矿工投降（Miner Capitulation）](/glossary/miner-capitulation) · [矿池（Mining Pool）](/glossary/mining-pool) · [挖矿补贴（Mining Subsidy）](/glossary/mining-subsidy) · [交易（Transaction）](/glossary/transaction)
