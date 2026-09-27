---
title: BIP 37
---

# BIP 37

> **一句话定义：** 为轻钱包引入布隆过滤器；后因隐私泄露被批评，大多被 BIP 157/158 取代。

BIP 37 给比特币 P2P 协议加入了[布隆过滤器](/glossary/bloom-filter)支持，让 SPV [钱包](/glossary/wallet)可以请求[全节点](/glossary/full-node)「只发匹配这个过滤器的[交易](/glossary/transaction)」，而不必下载每个[区块](/glossary/block)。有几年时间，每个移动钱包都这么工作。

隐私结果却是灾难性的。布隆过滤器本想靠掺入足够的假阳性来模糊钱包关心的地址，但实际使用中钱包为了省带宽都把假阳性率设得很低，服务节点用简单的统计分析就能去匿名化钱包的大部分密钥——跨重连的刷新过滤器尤其如此。2014 年那篇《On the Privacy Provisions of Bloom Filters in Lightweight Bitcoin Clients》让问题再也无法忽视。

公共节点陆续停止服务 BIP 37。Bitcoin Core 在 0.19（2019 年）默认关闭 `NODE_BLOOM` 服务位，2026 年仍在用 BIP 37 的钱包大多连的是自建节点。

现代替代是 BIP 158 紧凑区块过滤器：节点为每个区块发布一个小的确定性过滤器，客户端下载过滤器后在本地匹配。钱包从不把过滤器发给任何人。严格更私密，带宽只贵一点。

规范：[BIP-37](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 36（默克尔块请求）](/glossary/bip-36-merkle-block-request) · [BIP 40（警报防重放）](/glossary/bip-40-alerts-avoid-replay) · [布隆过滤器（Bloom Filter）](/glossary/bloom-filter) · [默克尔块（Merkle Block）](/glossary/merkle-block) · [默克尔包含证明](/glossary/merkle-inclusion-proof) · [默克尔证明（Merkle Proof）](/glossary/merkle-proof) · [默克尔根（Merkle Root）](/glossary/merkle-root) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
