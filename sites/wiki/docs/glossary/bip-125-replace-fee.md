---
title: BIP 125（替换手续费 RBF）
---

# BIP 125（替换手续费 RBF）

> **一句话定义：** 允许发送方用更高手续费版本替换未确认交易，加快确认。

BIP 125 规定了选择加入的替换手续费（RBF）：一笔[交易](/glossary/transaction)通过把至少一个输入的 `nSequence` 设为小于 `0xfffffffe` 的值，来表明自己可被替换。遵守信号的钱包和矿工随后接受满足特定策略规则的替换交易。

替换交易必须满足的五条「BIP 125 条件」：

1. 替换支付的绝对手续费高于原交易。
2. 替换的费率（聪/vB）更高。
3. 替换支付至少最低增量转发费。
4. 替换不能加入原交易看不见（未确认）的新输入。
5. 替换最多驱逐 100 笔交易（含后代）。

这就是选择加入 RBF，Bitcoin Core 0.12（2016 年）到 23.x 的默认行为。这个折中是 2016 年的让步：想继续收零确认款的商家可以拒绝兑现带 RBF 标记的交易，想要加价能力的用户可以自己选择加入。

2024 年，Bitcoin Core 28.0 把默认行为改为 full RBF：所有未确认交易无论 `nSequence` 信号如何都可替换。最终胜出的理由：零确认从来没有真正安全过（见[竞速攻击](/glossary/race-attack)），这个折中保护的是一个不存在的安全模型。依赖零确认的商家要么迁移到闪电，要么开始等确认。

今天的现实：每个现代钱包都支持 RBF，每个现代节点都会转发 full-RBF 替换，「忘了设足够高的手续费」不再是一笔死单——点一下就能加价。

规范：[BIP-125](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)。

**相关词条：** [绝对手续费（Absolute Fee）](/glossary/absolute-fee) · [加速器（Accelerator）](/glossary/accelerator) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 9（版本位）](/glossary/bip-9-versionbits) · [手续费加价（Fee Bumping）](/glossary/fee-bumping) · [手续费估算（Fee Estimation）](/glossary/fee-estimation) · [费率地板（Fee Floor）](/glossary/fee-floor) · [费率飙升（Fee Rate Escalation）](/glossary/fee-rate-escalation) · [手续费狙击（Fee Sniping）](/glossary/fee-sniping) · [替换手续费（RBF）](/glossary/replace-fee-rbf) · [交易（Transaction）](/glossary/transaction) · [交易手续费（Transaction Fee）](/glossary/transaction-fee)
