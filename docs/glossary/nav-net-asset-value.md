---
title: NAV（基金净值）
---

# NAV（基金净值）

> **一句话定义：** ETF 底层持仓的每份价值，=（总资产 − 负债）÷ 份额数。创建/赎回套利让市价锚定的那个数字。

资产净值（NAV）是 ETF 底层持仓的每份价值。现货比特币 ETF 的 NAV 每日计算：

```
每份 NAV =（BTC 持有量 × 参考汇率 − 负债）÷ 流通份额数
```

机制细节：

- **定价时点。** 美国现货比特币 ETF 每天伦敦时间下午 4:00 敲定 NAV，使用 [CME CF 比特币参考汇率](/glossary/cme-cf-bitcoin-reference-rate)（BRR）。选伦敦下午 4 点而不是纽约收盘，是为了对齐成熟的机构基准，同时覆盖伦敦与美国的交易时段。
- **负债**包括应计管理费、托管费及其他运营成本——对被动型比特币产品来说通常很小。
- **份额数**每天随[授权参与者](/glossary/authorized-participant)的[创建与赎回](/glossary/creation-redemption)而变动。

ETF 披露里会出现的两个相关数字：

- **每份 NAV（日终）。** 收盘后发布的官方数字，用于业绩报告、会计和费用计算。
- **iNAV（指示性 NAV）。** 交易时段内约每 15 秒计算并发布一次的 NAV 实时估计。交易员盯 iNAV 来实时捕捉溢折价机会。

NAV 为什么重要：

- **套利之锚。** 市价 > NAV 时，AP 创建新份额（向发行方交付 BTC 或现金，按 NAV 拿到份额，按市价卖出）；市价 < NAV 时，AP 赎回（按市价买份额，交回发行方，按 NAV 拿回 BTC 或现金）。价差由此闭合。
- **费用基数。** 管理费按 NAV 的年化百分比收取，逐日计提。
- **监管参考。** 披露、招股书计算、税务基准全部以 NAV 为准。

NAV 变得有趣的几个地方：

- **封闭式基金（转型前的老 GBTC）。** 没有创建/赎回机制，份额数固定。NAV 随 BTC 价格走，市价却随投资者对这个「壳」的需求走——二者戏剧性脱钩：2020–2021 年溢价 40%，2022–2023 年折价 50%。
- **现金创建 vs 实物创建。** 只允许现金创建时，发行方（或其托管人）要亲自执行 BTC 交易来部署新现金，成交价可能与 NAV 定价汇率不同。实物交付则完全绕开这一层。
- **现金拖累。** 尚未部署的 BTC（在途、待结算）什么都不赚，却计入 NAV。这是[跟踪误差](/glossary/tracking-error)的一个小来源。

NAV 是 ETF 结构里枯燥但承重的数字。NAV 表现正常、市价贴着它在基点内跟随时，这个「壳」就在正常工作。不正常时，一定是哪里坏了——缺口的大小正是[溢价/折价](/glossary/premium-discount-to-nav)所度量的东西。

**相关词条：** [ETF（交易所交易基金）](/glossary/etf-exchange-traded-fund) · [现货比特币 ETF](/glossary/spot-bitcoin-etf) · [授权参与者](/glossary/authorized-participant) · [创建/赎回](/glossary/creation-redemption) · [溢价/折价（对 NAV）](/glossary/premium-discount-to-nav) · [跟踪误差（Tracking Error）](/glossary/tracking-error) · [CME CF 比特币参考汇率](/glossary/cme-cf-bitcoin-reference-rate)
