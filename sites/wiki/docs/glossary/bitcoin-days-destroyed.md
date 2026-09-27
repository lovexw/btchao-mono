---
title: 比特币天数销毁（Bitcoin Days Destroyed）
---

# 比特币天数销毁（Bitcoin Days Destroyed）

> **一句话定义：** 链上指标：花费金额 × 闲置天数——把「交易量」按持币时长加权，区分老币移动与高频换手。

比特币天数销毁（BDD）是 ByteCoin 2011 年在 Bitcoin Talk 论坛提出的链上指标。它按输入被花费前的闲置时长给每笔交易加权：一个 50 BTC 的输出放了 100 天没动，花掉时「销毁」50 × 100 = 5,000 比特币天；昨天刚到你钱包的 1 BTC 花出去，只销毁 1 比特币天。

直觉是这样的：原始交易量（每天移动的 BTC 数）把交易所热钱包之间的高频倒手、和一枚沉睡多年的老币终于出手，视为同一件事。BDD 把它们区分开。多年不动然后花费的币，和每小时在交易所钱包之间弹来弹去的币，讲的是不同的故事。

分析师怎么用它：

- **长期持币者行为。** BDD 持续攀升常与「长期持币者派发」的市场顶部重合——熬过前几个周期的老币被卖出。
- **宏观周期标记。** 历史上 BDD 尖峰聚集在重大价格顶部（2013、2017、2021、2024）与重大投降（2018、2022）附近。
- **与其他指标组合。** Glassnode、Coin Metrics 等机构发布基于 BDD 的衍生指标：Value Days Destroyed、Reserve Risk、HODL Waves 等。

BDD 不能告诉你什么：

- **币为什么动。** 转去新的自托管地址与转入交易所，在链上看一模一样。
- **谁在动。** 单一实体的行为无法确证；链上分析启发式会聚类地址，但不完美。
- **移动预示什么。** 与价格顶部的相关性是历史规律，不是因果。BDD 是信号，不是预测。

对普通观察者来说，BDD 是公开区块链上能拿到的较好的「这是纯换手还是老币在动」的信号之一。它不是价格预测器，但它是理解市场活动的好背景板。

**相关词条：** [币龄（Coin Age）](/glossary/coin-age) · [币控制（Coin Control）](/glossary/coin-control) · [彩色币（Colored Coins）](/glossary/colored-coins) · [交易（Transaction）](/glossary/transaction) · [交易链（Transaction Chaining）](/glossary/transaction-chaining) · [交易手续费（Transaction Fee）](/glossary/transaction-fee) · [未花费输出（UTXO）](/glossary/utxo-unspent-transaction-output)
