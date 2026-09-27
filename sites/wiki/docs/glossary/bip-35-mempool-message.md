---
title: BIP 35（mempool 消息）
---

# BIP 35（mempool 消息）

> **一句话定义：** 让对等节点请求本节点内存池交易的方式，现代 Bitcoin Core 已基本弃用。

BIP 35 添加了 `mempool` P2P 消息：对等节点发一个 `mempool`，节点回一个 `inv`，列出当前内存池里的每个 txid。在 2012 年前后很有用——早期的区块浏览器和钱包想从任何愿意配合的对等节点快速看到未确认动态。

后来它变成了隐患。应请求倾倒整个内存池，让观察者可以给节点的策略做指纹、测传播时机、探测其他对等节点还没见过的交易。Bitcoin Core 现在把响应收在 `NODE_BLOOM` 服务位（或对等白名单）之后，公共 P2P 网络实际上已停止提供该服务。2026 年，公共内存池数据经由区块浏览器和专门的内存池基础设施流动，而不是机会性的 `mempool` 查询。

规范：[BIP-35](https://github.com/bitcoin/bips/blob/master/bip-0035.mediawiki)。仍在定义中，野外几乎无人使用。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [内存池（Mempool）](/glossary/mempool) · [节点（Node）](/glossary/node) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [交易（Transaction）](/glossary/transaction)
