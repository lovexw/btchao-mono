---
title: 跟踪误差（Tracking Error）
---

# 跟踪误差（Tracking Error）

> **一句话定义：** ETF 收益贴近其跟踪资产收益的程度。越低越好；现货比特币 ETF 的年化差距大致为费率加几个基点。

跟踪误差（Tracking Error）衡量一只 ETF 忠实复现其宣称跟踪对象收益的程度。对现货比特币 ETF，目标就是 BTC 价格本身（通常为 [CME CF 比特币参考汇率](/glossary/cme-cf-bitcoin-reference-rate)）。对标普 500 ETF，目标是标普 500 指数。ETF 的日收益与目标日收益越吻合，跟踪误差越低。

两个常被混用（但其实是两回事）的概念：

- **跟踪差异（tracking difference）。** 累计收益差。BTC 一年涨 50%、ETF 涨 49.75%，跟踪差异是 -0.25%。这是对买入持有型投资者最重要的数字。
- **跟踪误差（tracking error）。** ETF 与目标日收益差的标准差。衡量跟踪过程有多颠簸，而不只是差多少。对交易者和套利者重要。

现货比特币 ETF 跟踪差距的来源：

**1. 费率。** 发行方的年度费用，逐日从基金的 BTC 持仓中计提。当前美国现货比特币 ETF 费率：

| 产品 | 代码 | 费率 |
|---|---|---|
| Grayscale Bitcoin Mini Trust | BTC | 0.15% |
| Franklin Bitcoin ETF | EZBC | 0.19% |
| Bitwise Bitcoin ETF | BITB | 0.20% |
| Ark 21Shares Bitcoin ETF | ARKB | 0.21% |
| BlackRock iShares Bitcoin Trust | IBIT | 0.25% |
| Fidelity Wise Origin Bitcoin Fund | FBTC | 0.25% |
| VanEck Bitcoin Trust | HODL | 0.25% |
| Valkyrie Bitcoin Fund (CoinShares) | BRRR | 0.25% |
| Invesco Galaxy Bitcoin ETF | BTCO | 0.25% |
| Hashdex Bitcoin ETF | DEFI | 0.25% |
| WisdomTree Bitcoin Fund | BTCW | 0.50% |
| Grayscale Bitcoin Trust | GBTC | 1.50% |

Grayscale Bitcoin Mini Trust（BTC）2024 年年中推出，是 GBTC 的平价兄弟产品，用 GBTC 的一部分 BTC 播种、定价对标新入局者。0.15% 是美国市场最低的现货比特币 ETF 费率。（多数发行方在上市后前 6-12 个月实行 0 费率豁免；表中为豁免期后的常态费率。）

**2. 现金拖累。** 尚未部署的 BTC 仓不会自己变多。基金每收到一笔[申购](/glossary/creation-redemption)现金但还没执行 BTC 交易时，这些美元闲置着、却仍计入 NAV。BTC 大涨时，现金拖累是真实（但小）的逆风。

**3. 交易成本。** 发行方为部署申购现金或为赎回变现而执行现货交易时，价差与滑点进入基金。实物创建/赎回可以完全消除这一项。

**4. 托管费。** 通常已含在费率内。Coinbase Custody（11 只美国现货 ETF 中 8 只的托管方）的费用只占费率的一小部分。

**5. 日中标记与定盘时点。** NAV 在伦敦下午 4 点定盘；市场价格全天交易。日内收益不会完全吻合，因为标记时点不同。这体现为跟踪误差波动，而非持续的跟踪差异偏移。

**大致地，对一只现货比特币 ETF：**

```
年度跟踪差异 ≈ 费率 + 几个基点
```

实践中，主要现货比特币 ETF 自 2024 年 1 月上市以来全部在其宣称费率范围内跟踪底层。这个包装是有效的。

选比特币 ETF 时为什么这很重要：

- **费率主导。** 多年持有下，0.20% 与 1.50% 的差距复利成可观差异。长期敞口，费率最低的合格产品胜出。
- **实物 vs 现金创建/赎回影响跟踪质量。** 实物模式全面铺开后，跟踪误差会进一步收紧。
- **别把费率等同于跟踪质量。** 一只运营糟糕的便宜 ETF 可能比一只运营良好的贵 ETF 跟得更差。比较真实的跟踪差异历史，而不只是标题费率。

跟踪误差是那个无聊但能告诉你 ETF 是否在干活的统计量。对比特币而言，自上市以来的答案是：是的，好得几乎令人无趣。

**相关词条：** [ETF（交易所交易基金）](/glossary/etf-exchange-traded-fund) · [现货比特币 ETF](/glossary/spot-bitcoin-etf) · [NAV（基金净值）](/glossary/nav-net-asset-value) · [授权参与者（Authorized Participant）](/glossary/authorized-participant) · [创建/赎回（ETF）](/glossary/creation-redemption) · [溢价/折价（对 NAV）](/glossary/premium-discount-to-nav) · [CME CF 比特币参考汇率](/glossary/cme-cf-bitcoin-reference-rate)
