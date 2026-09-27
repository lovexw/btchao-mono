---
title: 布隆过滤器（Bloom Filter）
---

# 布隆过滤器（Bloom Filter）

> **一句话定义：** 概率型数据结构：便宜地回答「这东西在不在集合里」，没有漏报、误报率可调——在比特币里曾服务于 SPV 钱包，因隐私缺陷被 BIP-157/158 取代。

布隆过滤器是一种概率型数据结构，能便宜地回答「这个元素在不在集合里」：不会漏报（该在的都说在），误报率可调。在比特币中，布隆过滤器由 [BIP-37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)（2012）引入，让 [SPV](/glossary/spv-simplified-payment-verification) 客户端可以只请求可能与自己地址相关的交易。

最初的工作流：

1. SPV 客户端构造一个编码了自己地址的布隆过滤器（用误报制造一点刻意的模糊）。
2. 客户端把过滤器发给一个[全节点](/glossary/full-node)。
3. 全节点只把匹配过滤器的区块/交易发回来（外加一些无关的误报匹配）。
4. 客户端在本地逐一核验哪些是真正的匹配。

致命的隐私缺陷：审视过滤器本身，恶意或好奇的全节点可以概率性地反推出 SPV 客户端关心哪些地址。误报率本该提供掩护，但客户端反复用重叠过滤器查询时，提取出模式实在太容易。

到 2010 年代后期这已是共识，许多 Bitcoin Core 节点干脆关掉了 BIP-37 布隆过滤器转发（先是改为 opt-in，Core v0.19 起默认禁用）。

继任者是 [BIP-158](/glossary/bip-158) 紧凑区块过滤器：由**全节点**生成过滤器，**客户端**下载到本地查询——节点完全不知道客户端关心哪些地址。同一个原语思想，信息流方向相反，隐私好得多。现代 SPV 式移动钱包用的是 BIP-157/158，不用 BIP-37。

作为通用数据结构，布隆过滤器在许多其他场景（数据库、缓存、分布式系统）依然有用。在比特币里，它是一个历史遗物，主要在老文档里还会碰到。

**相关词条：** [BIP-37](/glossary/bip-37) · [BIP-158](/glossary/bip-158) · [默克尔块（Merkle Block）](/glossary/merkle-block) · [默克尔树 / 默克尔根](/glossary/merkle-tree-merkle-root) · [默克尔证明（Merkle Proof）](/glossary/merkle-proof) · [默克尔根（Merkle Root）](/glossary/merkle-root) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
