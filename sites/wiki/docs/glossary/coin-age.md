---
title: 币龄（Coin Age）
---

# 币龄（Coin Age）

> **一句话定义：** 一枚 UTXO 自诞生起未花费的时长——在比特币里不参与共识，却是链上分析的核心输入。

币龄是一个 UTXO 自被创建以来经过的时间。在比特币里它没有共识角色——出块纯按工作量证明选胜者，不看所含币的新旧——但它是链上分析的关键输入。

币龄出现的地方：

- **[比特币天数销毁](/glossary/bitcoin-days-destroyed)**：BDD 按输入的币龄给每笔花费加权。沉睡多年的币一动，产生的 BDD 远高于刚收到的币。
- **[HODL 浪潮](/glossary/hodl-waves)**：按币龄段拆分供应量的可视化。Glassnode 的标准图用 <1 月、1–3 月、3–6 月、6–12 月、1–2 年、2–3 年、3–5 年、5–7 年、7–10 年、10 年以上这些段。
- **长期/短期持币者分类。** Glassnode 用 155 天阈值：老于它的 UTXO 归入「长期持币者」供应。这个划分是好用的情绪指标。
- **「已实现市值」**：所有 UTXO 按各自最后一次移动时的价格加总。老币贡献其（较低的）原始成本，刚动过的币反映现价。

币龄也曾是权益证明山寨币（Peercoin 及其后继）的核心概念——质押权按币龄加权。批评者指出这激励囤积与中心化。比特币用工作量证明从根上绕开了这整个问题。

对比特币本身：币龄之所以有趣，是因为它直接可在链上观察（任何人用任何节点都能算），是少数不需要信任第三方聚类启发式的「钱包行为」指标之一。至于移动这些币的究竟是有长期信念的持有者还是交易所热钱包，那是另一个问题，需要更多分析。

**相关词条：** [比特币天数销毁](/glossary/bitcoin-days-destroyed) · [币控制（Coin Control）](/glossary/coin-control) · [合并交易](/glossary/consolidation-transaction) · [交易（Transaction）](/glossary/transaction) · [交易链](/glossary/transaction-chaining) · [未花费输出（UTXO）](/glossary/utxo-unspent-transaction-output)
