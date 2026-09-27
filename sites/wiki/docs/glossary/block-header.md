---
title: 区块头（Block Header）
---

# 区块头（Block Header）

> **一句话定义：** 每个区块约 80 字节的紧凑摘要：版本、前块哈希、默克尔根、时间戳与随机数。

区块头是每个比特币区块顶部的 80 字节摘要。很小，但[工作量证明](/glossary/proof-work-pow)在乎的一切都在里面。

六个字段：

1. **版本**（4 字节）——标记区块遵循的协议规则。
2. **前块哈希**（32 字节）——上一个区块头的哈希。让比特币成为一条*链*的就是它。
3. **[默克尔根](/glossary/merkle-root)**（32 字节）——一个对区块内全部交易作出承诺的哈希。任何交易一变，它就变。
4. **时间戳**（4 字节）——矿工声称的出块时间。约束很宽松。
5. **难度位（Bits）**（4 字节）——当前难度目标的紧凑编码。
6. **[随机数（Nonce）](/glossary/nonce)**（4 字节）——矿工搜索有效哈希时不断改变的字段。

挖一个区块，就是计算 SHA-256(SHA-256(区块头)) 并检查结果是否低于「难度位」编码的目标。不行就换随机数再试。（43 亿个随机数值全部用完时，微调 Coinbase 交易的 extranonce，默克尔根随之改变，从头再来。）

区块头只有 80 字节，是为了让广播和验证都便宜。矿工找到有效区块后先发出区块头，让网络验证工作量证明，同时并行传播完整区块。轻客户端（SPV 钱包）只靠检查区块头就能验证整条链——每年总共约 4 MB——而不必存储数 GB 的完整交易数据。

搜索过程见[挖矿：算力、难度与激励](/rabbit-holes/mining)；区块头摘要的是什么，见[区块](/glossary/block)。

**相关词条：** [BIP 22（getblocktemplate）](/glossary/bip-22-getblocktemplate) · [BIP 152（紧凑区块）](/glossary/bip-152-compact-blocks) · [区块（Block）](/glossary/block) · [区块浏览器（Block Explorer）](/glossary/block-explorer) · [区块高度（Block Height）](/glossary/block-height) · [区块传播（Block Propagation）](/glossary/block-propagation) · [出块时间（Block Time）](/glossary/block-time) · [区块链（Blockchain）](/glossary/blockchain) · [创世区块（Genesis Block）](/glossary/genesis-block) · [默克尔块（Merkle Block）](/glossary/merkle-block) · [默克尔树 / 默克尔根](/glossary/merkle-tree-merkle-root) · [默克尔证明（Merkle Proof）](/glossary/merkle-proof) · [默克尔根（Merkle Root）](/glossary/merkle-root)
