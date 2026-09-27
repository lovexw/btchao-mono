---
title: 渐近线（Asymptote）
---

# 渐近线（Asymptote）

> **一句话定义：** 曲线无限逼近但永不到达的值。比特币供应渐近于 20,999,999.9769 BTC，通胀率渐近于零。

数学上，渐近线是函数在某个变量跑向无穷的过程中越来越逼近、却永远差一点的值。经典例子是 `1/x`：x 越大，值离零任意近，但永远到不了零。

比特币的货币政策里烙着两条著名的渐近线。

**供应渐近线。** 比特币的总供应是历史所有[区块补贴](/glossary/block-subsidy)之和。补贴初始为每块 50 BTC，每 210,000 个[区块](/glossary/block)砍半（一次[减半](/glossary/halving-halvening)）。这个几何级数在**极限意义上**求和恰好等于 21,000,000 BTC。但实际发放以聪（整数单位，10^-8 BTC）计，每次减半都是除以 2 后取整截断。33 次减半之后，单块补贴截断为零并永远归零。那一刻的累计发行量是 **20,999,999.9769 BTC**——就差那个整数舍入的零头。这才是比特币真实的供应渐近线。到处流传的「2100 万」是它对营销友好的四舍五入。

**通胀率渐近线。** 比特币的年化新增发行率（[补贴](/glossary/block-subsidy) × 每年区块数 / 流通量）目前约 0.83%。每次减半大致砍半：2028 年减半后约 0.4%，2032 年后约 0.2%。函数逼近零，在 2140 年前后达到低于一聪的量级。此后不再有新 BTC 进入流通，矿工只赚[交易手续费](/glossary/fee-estimation)。比特币由此成为历史上第一种数学意义上通胀归零的大型货币资产。

两条渐近线都是[中本聪](/glossary/satoshi-nakamoto)刻意选定的。它们不是代码写得马虎的副产品，而是写进协议的货币政策承诺。不经分叉整个网络，任何中央权威都改不动它们——而经济激励压倒性地反对那样做：持有人眼中比特币的价值，恰恰来自这些曲线既固定又可验证。

渐近线让比特币在数学意义上、而不只是修辞意义上成为固定供应资产。比率的详细走势见[通胀减速（Disinflation）](/glossary/disinflation)，完整数学见[供给时间表专题](/rabbit-holes/supply)。

**相关词条：** [区块补贴（Block Subsidy）](/glossary/block-subsidy) · [通胀减速（Disinflation）](/glossary/disinflation) · [减半（Halving）](/glossary/halving-halvening) · [通胀（Inflation）](/glossary/inflation) · [挖矿补贴（Mining Subsidy）](/glossary/mining-subsidy) · [聪（Satoshi）](/glossary/satoshi-unit)
