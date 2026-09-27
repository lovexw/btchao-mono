---
title: 交易索引（txindex）
---

# 交易索引（txindex）

> **一句话定义：** 可选节点设置：按 TXID 为全部交易建立完整索引，支持直接查询。

`txindex` 是 Bitcoin Core 的配置项（`bitcoin.conf` 中的 `-txindex=1`）：构建并维护一个数据库，把每个交易 ID 映射到它在区块文件中的位置。开启后，`getrawtransaction <txid>` 可以立刻返回链历史上任何一笔交易。不开的话，这个 RPC 只对内存池里的或钱包已知集合内的交易有效。

`txindex` 的代价：

- **磁盘。** 2026 年大约额外占用 50-70 GB，随链增长。相对归档区块数据的约 600 GB 不是最大的开销，但也不可忽略。
- **初始同步时间。** 索引在初次验证过程中构建；IBD 会稍慢。索引建好后，日常运行不受影响。
- **与修剪互斥。** `txindex` 要求归档模式。修剪节点不保存全部区块，无法维护完整交易索引。

谁需要它：

- **区块浏览器。** Mempool.space、Blockstream Explorer 等工具需要按需查询任意交易。它们在归档节点上运行 `txindex=1`（或使用自建的衍生数据库）。
- **处理任意历史交易的**链上分析工具**。**
- **少数特殊钱包**，需要遍历历史 UTXO 图的那种（罕见；现代 descriptor 钱包通常只跟踪自己的输出）。
- **某些配置下的闪电节点运营者**，不过多数闪电后端并不强依赖 txindex。

谁不需要：所有普通钱包用户。钱包只跟踪属于自己的 UTXO；相关交易都在自己的钱包数据库里。查任意无关交易这种事，在浏览器式工作流之外基本没人做。

默认关闭。确实需要才开。如果你的节点只做个人钱包加可选的对端服务，关掉 `txindex` 省磁盘，还能顺便开修剪。

**相关词条：** [区块浏览器（Block Explorer）](/glossary/block-explorer) · [链上分析（Chain Analysis）](/glossary/chain-analysis) · [交易（Transaction）](/glossary/transaction) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output) · [修剪模式（Pruning Mode）](/glossary/pruning-mode)
