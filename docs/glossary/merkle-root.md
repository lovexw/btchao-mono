---
title: 默克尔根（Merkle Root）
---

# 默克尔根（Merkle Root）

> **一句话定义：** 位于每个区块头中的单个 32 字节哈希，把区块内全部交易概括其中。

默克尔根是每个[区块头](/glossary/block-header)里的那个 32 字节哈希，它向区块里的每一笔交易作出承诺。

计算方法是先在区块的交易 ID 上构建一棵[默克尔树](/glossary/merkle-tree-merkle-root)：两两配对、哈希每一对，再把结果两两配对，如此往复，直到只剩一个哈希。这个最终哈希就是默克尔根。

它之所以是承重墙，有三点：

1. **它把交易和区块绑定在一起。** 改动任何一笔交易的数据，默克尔根就变；改默克尔根，区块头就变；改区块头，就得重做[工作量证明](/glossary/proof-work-pow)。篡改的成本就是完整的重新挖矿成本。
2. **矿工哈希的正是它。** [区块头](/glossary/block-header)的哈希包含默克尔根。[矿工](/glossary/miner)变换[ nonce ](/glossary/nonce)寻找有效区块时，默克尔根就是输入之一。（nonce 用尽时，矿工微调 coinbase 交易的 extranonce，改变默克尔根，从而获得全新的 nonce 空间。）
3. **它让 SPV 成为可能。** [轻客户端](/glossary/spv-simplified-payment-verification)只需下载区块头，加上每笔交易一个 `log2(N)` 大小的默克尔证明，就能验证自己的交易在链上。

用 32 字节承诺可能高达数 GB 的交易数据，就「是否包含」而言零信息损失。比特币里最低调的优雅设计之一。

构造细节见[默克尔树 / 默克尔根](/glossary/merkle-tree-merkle-root)。

**相关词条：** [BIP 37](/glossary/bip-37) · [BIP 158](/glossary/bip-158) · [区块头（Block Header）](/glossary/block-header) · [区块大小（Block Size）](/glossary/block-size) · [布隆过滤器（Bloom Filter）](/glossary/bloom-filter) · [链可视化（Chain Visualization）](/glossary/chain-visualization) · [哈希（Hash）](/glossary/hash) · [默克尔块（Merkle Block）](/glossary/merkle-block) · [默克尔包含证明](/glossary/merkle-inclusion-proof) · [默克尔树 / 默克尔根](/glossary/merkle-tree-merkle-root) · [默克尔化的抽象语法树（MAST）](/glossary/merkleized-abstract-syntax-tree-mast) · [默克尔证明（Merkel Proof）](/glossary/merkle-proof) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
