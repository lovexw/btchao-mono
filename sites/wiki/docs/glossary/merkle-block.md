---
title: 默克尔块（Merkle Block）
---

# 默克尔块（Merkle Block）

> **一句话定义：** 发给 SPV 客户端的精简区块：只含区块头与相关交易的最小默克尔路径。

默克尔块是比特币 P2P 网络的一种消息（BIP 37 定义），由[全节点](/glossary/full-node)发给 [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)客户端。它包含：

- 完整的[区块头](/glossary/block-header)（80 字节）。
- 区块内匹配该 SPV 客户端[布隆过滤器](/glossary/bloom-filter)的交易列表。
- 一个[默克尔证明](/glossary/merkle-proof)，证明这些交易被提交在区块的[默克尔根](/glossary/merkle-root)里。

这就是让手机钱包不用下载整个区块、也能检查「自己的」交易有没有出现在最新区块里的机制。

它的缺点这些年来越来越受重视：**布隆过滤器泄露隐私**。SPV 客户端把过滤器发给全节点，后者可以概率性地反推出客户端关心哪些地址或交易。对在意隐私的用户，这是实打实的隐患——2012 年写 BIP-37 的时候没人预料到这一点。

现代的替代方案是 **[BIP-157/158](/glossary/bip-158) 紧凑区块过滤器**：由*服务端*为每个区块计算过滤器，*客户端*下载后在本地检查匹配，完全不暴露自己拥有哪些地址。隐私更好，带宽代价适中。大多数现代 SPV 式移动钱包（Phoenix、Mutiny、Breez 等）都用这个方案，而不是 BIP-37 的默克尔块。

默克尔块至今仍可用、Bitcoin Core 也仍实现了它，但在现代钱包生态的许多地方已被弃用。

**相关词条：** [BIP 37](/glossary/bip-37) · [BIP 158](/glossary/bip-158) · [区块头（Block Header）](/glossary/block-header) · [布隆过滤器（Bloom Filter）](/glossary/bloom-filter) · [默克尔包含证明](/glossary/merkle-inclusion-proof) · [默克尔证明（Merkel Proof）](/glossary/merkle-proof) · [默克尔根（Merkle Root）](/glossary/merkle-root) · [默克尔树 / 默克尔根](/glossary/merkle-tree-merkle-root) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
