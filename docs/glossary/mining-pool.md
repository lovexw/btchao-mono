---
title: 矿池（Mining Pool）
---

# 矿池（Mining Pool）

> **一句话定义：** 矿工联合算力、按贡献分成的集体。

矿池是一群把算力合并起来共同找区块、按比例分奖励的[矿工](/glossary/miner)。

矿池存在的理由是：方差。一个拥有全球算力 0.1% 的矿工，平均约 70 天能找到一个区块——但围绕这个均值的方差巨大。有的月份中三块，有的月份一块没有。电费每月都要交，「拉长到几年看平均」当不了现金流。矿池通过聚合众多矿工的算力解决了这个问题：出块更频繁（与合并算力成正比），再按每人提交的工作「份额」付酬。现代份额方案（PPLNS、FPPS）还能防[跳池](/glossary/pool-hopping)——一种钻早期回合份额空子、套取超常收益的历史性漏洞。

今天最大的几个矿池（Foundry USA、AntPool、ViaBTC、F2Pool 及少数几家）合计控制了超过一半的全球算力。这是让比特币开发者夜不能寐的中心化担忧：如果几个矿池运营者合谋审查某类交易，或试图重组，他们有动手的算力。

制衡在于：**矿池运营者不是矿工**。矿池里的算力来自随时可以换池的个体矿工。某个矿池开始作恶，矿工几小时内就能——也确实会——迁移走。还有把权力还给个体矿工的工作正在进行：**Stratum V2** 是让矿工（而非矿池运营者）选择自己区块里打包哪些交易的协议升级。部署缓慢，但它是结构性修复。

运营者这一侧，真正管理矿池连接、工作分发和单机监控的那一层是[挖矿前端](/glossary/mining-front-end)——对只有一台 ASIC 的爱好者就是原厂固件，对跑几千台机器的工业运营则是专门的机群管理栈。

现状令人不安，但不是灾难。挖矿中心化及其真实演变，见[挖矿：算力、难度与激励](/rabbit-holes/mining)。

**相关词条：** [区块奖励（Block Reward）](/glossary/block-reward) · [Coinbase 交易](/glossary/coinbase-transaction) · [合并挖矿（Merged Mining）](/glossary/merged-mining) · [矿工（Miner）](/glossary/miner) · [挖矿（Mining）](/glossary/mining) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [挖矿托管（Mining Colocation）](/glossary/mining-colocation) · [挖矿中心化（Mining Centralization）](/glossary/mining-centralization) · [挖矿前端（Mining Front-End）](/glossary/mining-front-end) · [矿机（Mining Rig）](/glossary/mining-rig) · [挖矿软件（Mining Software）](/glossary/mining-software) · [挖矿补贴（Mining Subsidy）](/glossary/mining-subsidy) · [跳池（Pool Hopping）](/glossary/pool-hopping) · [矿池挖矿（Pooled Mining）](/glossary/pooled-mining) · [家用挖矿（Retail Mining）](/glossary/retail-mining) · [每 TH/s 收益（Revenue per TH/s）](/glossary/revenue-ths)
