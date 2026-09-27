---
title: BIP 36（默克尔块请求）
---

# BIP 36（默克尔块请求）

> **一句话定义：** 早期的部分区块请求提案，最终被现代 SPV 方案取代。

BIP 36 是 2012 年的一份早期草稿：让 SPV 式客户端只拉取区块中与自己相关的部分，而不是整个区块。它从未走出草案阶段。

实际落地的是 BIP 37（布隆过滤器请求）——它有自己的隐私问题，如今在公共网络上已基本禁用。现代轻客户端用 BIP 158 紧凑区块过滤器：节点为每个区块发布一个小巧的确定性过滤器，客户端下载过滤器并在本地决定要取哪些区块。钱包从不告诉节点自己在找什么。

规范：[BIP-36](https://github.com/bitcoin/bips/blob/master/bip-0036.mediawiki)。纯历史；它的价值在于这是一条最终走对了的路的第一次尝试。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [默克尔块（Merkle Block）](/glossary/merkle-block) · [默克尔包含证明](/glossary/merkle-inclusion-proof) · [默克尔证明（Merkle Proof）](/glossary/merkle-proof) · [默克尔根（Merkle Root）](/glossary/merkle-root)
