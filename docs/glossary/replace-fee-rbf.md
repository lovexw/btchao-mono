---
title: 按费替换（RBF）
---

# 按费替换（RBF）

> **一句话定义：** 允许发送方以更高手续费重播一笔未确认交易的机制，在内存池中替换原交易。

按费替换（Replace-by-Fee，RBF）是一种[内存池](/glossary/mempool)策略：发送方可以用更高的[手续费](/glossary/fee-estimation)重播一笔卡住的[交易](/glossary/transaction)，替换掉原来那笔。

RBF 由 [BIP-125](/glossary/bip-125-replace-fee) 定义。选择加入（opt-in）式 RBF 的运作方式：原交易通过设置一个低于最大值的 `nSequence` 来声明「可替换」。如果拥堵让你的交易停滞，你可以构造一笔新交易：

- 花费原交易至少一个相同的 UTXO。
- 支付比原交易更高的绝对手续费。
- 支付比原交易更高的手续费*率*。

遵循 BIP-125 的节点会把旧交易从内存池里丢弃、接受新交易。追求最高费率的矿工更可能打包你的新交易。

RBF 给你什么：

- **从手续费误判中恢复。** 平静期算错了费，拥堵来了被卡住；加价，继续。
- **紧迫性变化时加速确认。** 原本想便宜地确认，突然需要它立刻确认。

它的代价：

- **零确认可靠性。** 收款方看到「内存池中未确认」时，不能再假设这笔交易不会被替换。带 RBF 标记的交易明确承认这一点。（不带 RBF 的交易历史上曾有更强的零确认保证，但见 [Full RBF](/glossary/full-rbf)——这些保证正在被侵蚀。）

多数现代钱包默认开启 RBF。一些接受零确认支付的商家要求非 RBF 交易，或者干脆等第一个确认。更广的概念见[手续费加价](/glossary/fee-bumping)（RBF 是其中一种方法；另一种是 CPFP）。

**相关词条：** [BIP 125（替换手续费 RBF）](/glossary/bip-125-replace-fee) · [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [Full RBF](/glossary/full-rbf) · [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [费率地板（Fee Floor）](/glossary/fee-floor) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
