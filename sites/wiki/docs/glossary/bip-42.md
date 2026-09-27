---
title: BIP 42
---

# BIP 42

> **一句话定义：** 把 2100 万 BTC 上限写入代码：明确补贴归零，绝不超出最大供应。

[BIP-42](https://github.com/bitcoin/bips/blob/master/bip-0042.mediawiki) 是封堵比特币原始[区块补贴](/glossary/block-subsidy)代码里一个隐蔽 bug 的共识修复。这个由 Pieter Wuille 在 2014 年发现的 bug：原始 `GetBlockSubsidy` 函数里的整数运算，在足够多次[减半](/glossary/halving-halvening)之后会发生溢出，重新产出正数补贴——意味着从大约 2214 年起，比特币将无限增发。

原始代码大致是：

```cpp
int64_t nSubsidy = 50 * COIN;
nSubsidy >>= (nHeight / 210000);  // 每 210,000 个区块的时代右移一次（减半）
```

`>>` 是对 64 位有符号整数的 C++ 右移。约 64 次减半之后，移位在标准意义上是未定义行为；实际在多数编译器上要么归零（正确），要么回绕（灾难）。不同编译器在这里表现不同，本身就可能造成链分裂。

BIP-42 的修复很简单：足够多次减半之后显式返回零，不管底层算术会算出什么。

```cpp
if (halvings >= 64) return 0;
```

这把 2100 万上限从「取决于 C++ 未定义行为」变成真正永久的属性。作为共识变更，BIP-42 以[软分叉](/glossary/soft-fork)部署（它把规则收紧为「第 33 次减半之后，真的不可能再拿到正数补贴」）。

这段插曲是比特币历史里小而有力的一课。[2100 万上限](/glossary/asymptote)不是愿景，是代码的属性，由每个[节点](/glossary/node)、每个[区块](/glossary/block)、永远地执行。BIP-42 确保代码说的真就是所有人以为它说的那句话。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [区块奖励（Block Reward）](/glossary/block-reward) · [区块补贴（Block Subsidy）](/glossary/block-subsidy) · [渐近线（Asymptote）](/glossary/asymptote) · [减半（Halving）](/glossary/halving-halvening) · [矿工（Miner）](/glossary/miner) · [矿池（Mining Pool）](/glossary/mining-pool)
