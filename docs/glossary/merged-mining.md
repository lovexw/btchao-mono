---
title: 合并挖矿（Merged Mining）
---

# 合并挖矿（Merged Mining）

> **一句话定义：** 用同一哈希算法同时挖两条 PoW 链（如比特币 + 域名币）。

合并挖矿让矿工不多花一次哈希，同时为两条（或更多）SHA-256 区块链产出有效工作量证明。矿工的工作随机数同时满足两条链的难度要求；一旦命中，两条链都从同一次努力中各得一个区块。

教科书案例是比特币 + 域名币（Namecoin）：2011 年设立，当时 Namecoin 的算力低到无法独立自保。Namecoin 的区块头验证接受一笔比特币 Coinbase 交易作为工作量证明（内含对 Namecoin 区块的承诺），让比特币矿工近乎零成本地顺手挖 Namecoin。

机制细节：

1. 矿工构造一个 Namecoin 区块（含它自己的交易、默克尔根等）。
2. 矿工在比特币 Coinbase 交易里放入对该 Namecoin 区块哈希的承诺。
3. 矿工照常哈希比特币区块头。
4. 如果结果满足*比特币*的难度，赢得一个比特币区块；如果同时满足（更低的）Namecoin 难度，也赢得一个 Namecoin 区块。
5. Namecoin 区块附带「比特币 Coinbase 已承诺本区块」的证明，Namecoin 验证者接受它。

历史上其他挂靠比特币合并挖矿的链：Namecoin、Devcoin、Ixcoin、Rootstock（RSK）、Syscoin。全是受益于比特币巨大算力而无需与之竞争的小链。

合并挖矿买到什么：

- **白捡的算力**——站在小链的视角。
- **更高的安全下限**——攻击小链现在需要攻击比特币算力的一部分，而不只是它自己。
- **比特币矿工的可选收入**——选择放承诺的矿工，如果小链奖励值得领的话。

它不解决什么：

- 小链仍有自己的共识规则、验证者和信任模型。
- 比特币矿工并不*必须*合并挖矿；如果集体停手，小链安全会跌回原形。
- 小链在矿池运营者层面继承了一部分比特币挖矿的集中风险。

合并挖矿是个有趣的技术技巧，但在比特币自己的故事里基本是脚注。它对依附比特币算力的链，比对比特币本身更重要。

**相关词条：** [哈希（Hash）](/glossary/hash) · [矿工（Miner）](/glossary/miner) · [矿池（Mining Pool）](/glossary/mining-pool) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [挖矿托管（Mining Colocation）](/glossary/mining-colocation) · [挖矿软件（Mining Software）](/glossary/mining-software) · [家用挖矿（Retail Mining）](/glossary/retail-mining)
