---
title: 手续费加价（Fee Bumping）
---

# 手续费加价（Fee Bumping）

> **一句话定义：** 交易广播后提升它的优先级——主要靠 RBF（按费替换）或 CPFP（子付父费）。

手续费加价是[交易](/glossary/transaction)卡住时的自救手段。[内存池](/glossary/mempool)里排队的人比未来几个区块装得下的还多，矿工优先挑高费率的，而你的交易排得太靠后。有两种机制能让你在广播之后提高实际费率：

**按费替换（RBF）。** 用更高手续费重新广播同一笔交易，替换内存池里的原版。定义于 [BIP 125](/glossary/bip-125-replace-fee)，如今在多数钱包中默认可选择开启。要求原交易标记了 RBF——但在 **full-RBF** 下不要求：运行 full-RBF 的节点无论如何都会接受替换。

**子付父费（CPFP）。** 不动卡住的那笔交易。转而花费它的某个未确认输出，构造一笔新的「子」交易，手续费高到足以同时覆盖自己与父交易的欠账。矿工有经济动机把两笔一起打包——子交易能确认的前提是父交易确认。当你没法 RBF（原交易没标记，或你不控制全部输入）但控制着一个输出时，这条路很有用。

多数现代钱包用一个「提升手续费」按钮替你搞定这些。实际的决策树：

- **你是发送方，且已标记 RBF** → 用 RBF（更干净，原地替换）。
- **你是卡住的入账交易的接收方** → 用 CPFP，把未确认输出花给自己。
- **发送方但没标记 RBF** → 有可花费的输出就 CPFP，否则等着。

如何从一开始就避免用上这一招，见[手续费估算](/glossary/fee-estimation)。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [加速器（Accelerator）](/glossary/accelerator) · [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [预计确认区块数](/glossary/estimated-confirmation-blocks) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [费率地板（Fee Floor）](/glossary/fee-floor) · [费率飙升（Fee Rate Escalation）](/glossary/fee-rate-escalation) · [手续费狙击（Fee Sniping）](/glossary/fee-sniping) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
