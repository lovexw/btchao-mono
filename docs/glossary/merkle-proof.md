---
title: 默克尔证明（Merkle Proof）
---

# 默克尔证明（Merkle Proof）

> **一句话定义：** 默克尔包含证明的别名：一组哈希，证明某笔交易存在于某区块中。

默克尔证明是一段紧凑的证据，证明某笔特定[交易](/glossary/transaction)包含在某个特定[区块](/glossary/block)里，而验证者不必下载整个区块。

它沿[默克尔树](/glossary/merkle-tree-merkle-root)行走：从叶子（该交易的 txid）到根（存在[区块头](/glossary/block-header)里），证明包含每一层的兄弟哈希。有了这些哈希，任何人都能根据被声称的交易重新计算[默克尔根](/glossary/merkle-root)*应该*是什么，再与区块头里的实际根比对。匹配，则交易可证明确实在区块中；不匹配，则证明无效。

为什么有用：

- **小。** 对含 N 笔交易的区块，默克尔证明大小为 `O(log N)`——对任何现实规模的区块，通常 10–12 个哈希、约 320–400 字节。
- **密码学的。** 无需信任信息来源；数学要么对得上，要么对不上。
- **支撑 [SPV](/glossary/spv-simplified-payment-verification)。** 轻客户端用默克尔证明验证自己的交易，无需下载完整区块。它们只存[区块头](/glossary/block-header)（每年总共约 4 MB），需要确认某笔交易时向全节点索要证明。

有时也叫「默克尔包含证明」或「默克尔路径」。三个词指的是同一种构造。

同一原语遍布密码学世界：Git 用它做提交历史，ZFS 用它做文件系统完整性，Certificate Transparency 用它做日志包含性。比特币的用法只是这个更大模式中一个著名的实例。

**相关词条：** [BIP 37](/glossary/bip-37) · [BIP 158](/glossary/bip-158) · [区块头（Block Header）](/glossary/block-header) · [布隆过滤器（Bloom Filter）](/glossary/bloom-filter) · [欺诈证明（Fraud Proof）](/glossary/fraud-proof) · [哈希（Hash）](/glossary/hash) · [默克尔块（Merkle Block）](/glossary/merkle-block) · [默克尔包含证明](/glossary/merkle-inclusion-proof) · [默克尔树 / 默克尔根](/glossary/merkle-tree-merkle-root) · [默克尔根（Merkle Root）](/glossary/merkle-root)
