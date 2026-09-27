---
title: 默克尔树 / 默克尔根
---

# 默克尔树 / 默克尔根

> **一句话定义：** 把区块内全部交易组织成二叉哈希树，最终归结为单一根哈希的数据结构。

默克尔树是一棵二叉哈希树：拿一批数据项，两两[哈希](/glossary/hash)，再对所得哈希两两哈希，如此反复，直到顶端只剩最后一个哈希。这个顶端哈希就是**默克尔根**，它对树中每一条数据作出承诺。

在比特币里，每个[区块](/glossary/block)包含成百上千笔[交易](/glossary/transaction)。区块把它们组织成一棵默克尔树——叶子是交易 ID（txid）——而[区块头](/glossary/block-header)里只存最终的默克尔根。改动区块中任何一笔交易，树根哈希都会变，篡改立刻可见。

这个设计为什么重要：

- **高效验证。** 默克尔根只有 32 字节，却对它下面的每一笔交易作出承诺。区块头保持很小（80 字节），同时仍然在密码学上锚定区块全部的交易数据。
- **包含证明。** 任何拿到默克尔根的人，都能凭一条只含 `log2(N)` 个哈希的「默克尔证明」验证某笔特定交易在这个区块里——数千笔交易的区块通常只需 10–20 个哈希。这正是 [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)钱包的基础：只下载区块头（每年总共约 4 MB），用默克尔证明验证自己的交易，不用下载完整区块。
- **防篡改证据。** 对交易的任何改动都会沿树向上传播、改变树根。而树根进了区块头、区块头又是[工作量证明](/glossary/proof-work-pow)保护链的一部分之后，这些交易实际上就不可篡改了。

默克尔树由 Ralph Merkle 在 1979 年发明，比比特币早了几十年。它广泛应用于比特币之外的密码学系统（Git、ZFS、证书透明度等许多）。比特币的这套具体设计是你最常遇到的那一种。

**默克尔根**一词常与本词条互换使用；偏区块头字段的视角见[默克尔根（Merkle Root）](/glossary/merkle-root)。

**相关词条：** [BIP 37](/glossary/bip-37) · [BIP 158](/glossary/bip-158) · [区块头（Block Header）](/glossary/block-header) · [布隆过滤器（Bloom Filter）](/glossary/bloom-filter) · [默克尔块（Merkle Block）](/glossary/merkle-block) · [默克尔包含证明](/glossary/merkle-inclusion-proof) · [默克尔化的抽象语法树（MAST）](/glossary/merkleized-abstract-syntax-tree-mast) · [默克尔证明（Merkel Proof）](/glossary/merkle-proof) · [默克尔根（Merkle Root）](/glossary/merkle-root)
