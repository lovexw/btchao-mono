---
title: BIP 152（紧凑区块）
---

# BIP 152（紧凑区块）

> **一句话定义：** 让节点用短交易 ID 传播新区块的方法，大幅降低带宽占用。

[BIP-152](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki) 定义**紧凑区块转发（compact block relay）**——比特币节点用来高效传播新挖[区块](/glossary/block)的协议。2016 年进入 Bitcoin Core，大幅降低了区块传播的带宽与延迟。

它解决的问题：新区块问世时，网络上每个[节点](/glossary/node)都要尽快拿到它。传播慢意味着陈旧区块率上升，既伤矿工也拉低整网效率。把完整区块原样发给每个对端很浪费——那些对端的[内存池](/glossary/mempool)里多半已经有了区块里的大部分[交易](/glossary/transaction)，你发的全是它们已有的数据。

紧凑区块的工作方式：

1. **新区块出炉。** 矿工发布新区块。
2. **先发紧凑摘要。** 对端收到的不是完整区块，而是[区块头](/glossary/block-header)加上区块内每笔交易的短 ID 列表（6 字节哈希）。
3. **对端查自己的内存池。** 拿每个短 ID 在本地内存池里找匹配交易。命中的就地填上。
4. **缺的部分再请求。** 没有的交易被显式请求补齐。
5. **区块重建。** 大部分交易来自内存池，缺的少数也已补齐，对端重建完整区块并验证。

典型的带宽节省：对内存池与网络基本同步的连接良好的节点，超过 90%。区块传播时间从秒级降到百毫秒级，陈旧区块率保持低位，网络整体健康。

紧凑区块转发是比特币网络性能里沉默的承重墙。多数用户从不知道它存在。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [区块（Block）](/glossary/block) · [区块头（Block Header）](/glossary/block-header) · [区块高度（Block Height）](/glossary/block-height) · [区块传播（Block Propagation）](/glossary/block-propagation) · [出块时间（Block Time）](/glossary/block-time) · [区块链（Blockchain）](/glossary/blockchain)
