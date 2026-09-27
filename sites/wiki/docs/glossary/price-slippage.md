---
title: 滑点（Price Slippage）
---

# 滑点（Price Slippage）

> **一句话定义：** 预期成交价与实际成交价之差，源于流动性不足或订单过大。

滑点（Slippage）是一笔交易的预期价格与实际平均成交价之差。它的成因是足够大的订单会吃掉订单簿的多层深度：第一部分以最优价成交，后续部分以越来越差的价格成交。

一个具体例子：

- BTC/USD 订单簿：$100,000 上有 0.5 BTC 买单；$99,950 上有 1.0 BTC；$99,900 上有 2.0 BTC；再往下……
- 你市价卖出 3 BTC。
- 前 0.5 BTC 以 $100,000 成交。
- 接着 1.0 BTC 以 $99,950 成交。
- 最后 1.5 BTC 以 $99,900 成交。
- 你的平均成交价约 $99,933，而「标题」上的盘口顶价是 $100,000。
- 滑点：每 BTC 约 $67，即约 0.07%。

滑点由什么决定：

- **每个价位的订单簿深度。** 深的订单簿吸收大单几乎无滑点；薄的订单簿中等规模的订单就明显打滑。
- **订单规模相对常规成交量。** 在 Binance 或 Coinbase 上一笔 1 BTC 的订单轻松被吸收。任何地方一笔 1,000 BTC 的市价单都会推动市场。
- **时段与流动性窗口。** 加密市场有流动性周期；周末或非高峰时段的滑点更差。
- **交易所各自的流动性。** Coinbase 和 Binance 的 BTC/USD、BTC/USDT 深度很好。小交易所和冷门交易对的订单簿更浅。

防御滑点的手段：

- **限价单。** 设定可接受的最差成交价；订单挂在簿上，只有市场走到它才成交。用成交时间换滑点保护。
- **TWAP（时间加权平均价）算法。** 把大单拆成小块在数小时内执行，得到接近该时段 VWAP 的均价。
- **冰山订单。** 隐藏完整订单规模，避免暴露意图、引来抢跑。
- **OTC 柜台**承接大额。为整笔订单协商一个价格，完全绕开公开订单簿。

对一次买卖不到 $10K 的普通用户，滑点通常可以忽略（低于 0.05%）。规模更大时，滑点成为实打实的成本组成部分。对超大额交易（数百万美元级），滑点管理是执行策略的重要一块。

**相关词条：** [牛市（Bull Market）](/glossary/bull-market) · [出清价格（Clearing Price）](/glossary/clearing-price) · [定投（DCA）](/glossary/dca-dollar-cost-averaging) · [交易所（Exchange）](/glossary/exchange) · [期货（Futures）](/glossary/futures) · [金叉（Golden Cross）](/glossary/golden-cross) · [冰山订单（Iceberg Order）](/glossary/iceberg-order) · [市值（Market Capitalization）](/glossary/market-capitalization) · [市场深度（Market Depth）](/glossary/market-depth) · [价格发现（Price Discovery）](/glossary/price-discovery) · [价格底部论（Price Floor）](/glossary/price-floor-btc) · [波动性（Volatility）](/glossary/volatility)
