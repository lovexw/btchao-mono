---
title: 币冻结脚本（Coin Freeze）
---

# 币冻结脚本（Coin Freeze）

> **一句话定义：** 用脚本把 UTXO 锁到指定时间或区块高度才能花——由协议强制，任何第三方都无权提前放行。

币冻结是任何「到特定时间或区块高度之前禁止花费」的比特币脚本。冻结由协议强制执行；没有任何第三方能提前放款。

两个原语：

- **OP_CHECKLOCKTIMEVERIFY（CLTV）**：绝对参照——某个区块高度或 UNIX 时间戳之后才许花费。适合「2030 年 6 月 1 日起可花」。
- **OP_CHECKSEQUENCEVERIFY（CSV）**：相对间隔——父交易确认之后再过 N 个区块（或 N 个时间单位）才许花费。适合「本输出创建一年后可花」。

常见应用：

- **自我储蓄纪律。** 把币锁 1–5 年，防止自己在剧烈波动中手贱。
- **继承配置。** 主钥匙 6 个月无活动后生效的支出路径，设计给继承人兜底。
- **[金库](/glossary/bitcoin-vault)。** CSV 窗口内允许冷钥匙否决热钥匙花费的回拨路径。
- **去信任托管。** 买卖双方谈好条件，币延迟到期后释放，或延迟期满前双方一致同意提前释放。
- **闪电通道。** 每份通道承诺都用 CSV 锁定输出，作为[延迟惩罚机制](/glossary/delayed-justice-transaction)的一部分。

币冻结不是什么：

- **任何人可逆。** 一旦写进脚本，任何人——包括原发送方——都无法提前解冻。每个全节点都在强制这个冻结。
- **保密。** 锁定脚本在链上。能看到这笔交易的人都能看到资金何时可花。
- **完美的储蓄工具。** 冻结的 UTXO 是不流动的：持有人在窗口内放弃了花的选项。这正是目的，但也是真实代价。

币冻结是比特币被低估的原语之一——远比常见钱包 UX 暴露的强大，且正通过 Sparrow 的时间锁脚本、Liana 的恢复窗口钱包和各类金库实现变得越来越易用。

**相关词条：** [燃烧地址（Burn Address）](/glossary/burn-address) · [回拨机制（Clawback Mechanism）](/glossary/clawback-mechanism) · [币控制（Coin Control）](/glossary/coin-control) · [彩色币（Colored Coins）](/glossary/colored-coins) · [契约（Covenants）](/glossary/covenants) · [托管（Escrow）](/glossary/escrow)
