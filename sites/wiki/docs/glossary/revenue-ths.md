---
title: 每 TH/s 收益（Revenue per TH/s）
---

# 每 TH/s 收益（Revenue per TH/s）

> **一句话定义：** 矿工每太哈希每秒算力每日赚到的 BTC/美元，衡量盈利能力。

每 TH/s 收益（也称「hashprice」，算力价格）是矿工每 TH/s 算力每日的收入。它是比特币挖矿的头号经济指标：一个数字就能告诉你，按典型硬件与电价，当前挖矿是否赚钱。

公式：

```
每 TH/s 每日收益 = （每块补贴 + 每块手续费）× 每日块数 ÷ 全网算力（TH/s）
```

按 2026 年的数量级：

- 补贴 + 手续费：约 3.125 BTC + 约 0.3 BTC = 每块约 3.4 BTC
- 每日块数：约 144
- 全网算力：约 700 EH/s = 700,000,000 TH/s

于是每 TH/s 每日收益约为 3.4 × 144 / 700,000,000 ≈ 7×10⁻⁷ BTC，按近期币价折合每 TH/s 每天约 $0.04-0.06。

矿工实际盯着的东西：

- **Hashprice 走势。** Hashrate Index、Luxor、Compass Mining 等仪表盘每日更新。
- **盈亏平衡电价。** 一台约 15 J/TH 的新 S21，按 $0.05/kWh 电价运行 24 小时电费约 $0.029。Hashprice $0.05 时有正毛利；$0.03 时亏钱。
- **减半冲击。** 每次减半把补贴砍半，除非手续费补上，hashprice 立刻减半。2024 年 4 月减半后利润率显著压缩；2028 年之后将进一步压缩。
- **手续费占比趋势。** 补贴递减，手续费占收入比例升高。2030 年代的 hashprice 将越来越依赖手续费市场状况，而非可预测的补贴时间表。

这个指标最有用的地方是盈亏平衡分析和硬件升级时点。新一代高效 ASIC 能在更低的 hashprice 下保持盈利；当前 hashprice 与某台 ASIC 盈亏平衡 hashprice 的比值，告诉你该继续挖还是关机。

**相关词条：** [难度（Difficulty）](/glossary/difficulty) · [减半（Halving）](/glossary/halving-halvening) · [算力（Hash Rate）](/glossary/hash-rate) · [算力衍生品（Hash Rate Derivative）](/glossary/hash-rate-derivative) · [Hashlet](/glossary/hashlet) · [矿工（Miner）](/glossary/miner) · [矿工投降（Miner Capitulation）](/glossary/miner-capitulation) · [挖矿（Mining）](/glossary/mining) · [矿池（Mining Pool）](/glossary/mining-pool) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [挖矿托管（Mining Colocation）](/glossary/mining-colocation) · [挖矿补贴（Mining Subsidy）](/glossary/mining-subsidy) · [矿池挖矿（Pooled Mining）](/glossary/pooled-mining) · [散户挖矿（Retail Mining）](/glossary/retail-mining)
