---
title: SPV（简化支付验证）
---

# SPV（简化支付验证）

> **一句话定义：** 轻客户端模型：用区块头与默克尔证明验证交易，而不下载整条区块链。

SPV（**S**implified **P**ayment **V**erification，简化支付验证）是[比特币白皮书](/glossary/whitepaper)第 8 节描述的轻客户端模型：钱包无需存储完整区块链即可验证自己的交易。

工作方式：

1. 钱包只下载从创世到现在的每个区块的 **80 字节[区块头](/glossary/block-header)**。每年约 4 MB，十六年下来总共远不到 100 MB。
2. 钱包验证这条头链：检查每个区块头的[工作量证明](/glossary/proof-work-pow)，以及每个区块头是否正确链接到前一个。
3. 对钱包关心的一笔特定交易，它向[全节点](/glossary/full-node)请求一个[默克尔证明](/glossary/merkle-proof)——一列简短的哈希，证明该交易包含在某个区块的[默克尔树](/glossary/merkle-tree-merkle-root)里。
4. 钱包用这笔交易加上证明重算默克尔根，与区块头里存的根比对。

证明通过，交易就在指定深度上可证地处于链中。钱包确认了包含关系，而无需下载区块其余数据。

SPV 的取舍：

- **对区块其余部分一无所知。** 你无法验证区块里其他交易是否遵守共识规则；只能相信与之对话的[矿工](/glossary/miner)和全节点没有就链的有效性撒谎。
- **隐私泄露。** 朴素 SPV 问的是「交易 X 的证明是什么」——这等于告诉被查询的节点你在意 X。更好的协议（[BIP-157/158](/glossary/bip-158) 紧凑区块过滤器，生产实现即 [Neutrino](/glossary/neutrino)）让客户端下载过滤器并在本地匹配，不暴露哪些地址是自己的。
- **日蚀攻击脆弱性。** 攻击者若把你的 SPV 客户端与诚实节点隔开，可以喂你一条分叉。[全节点](/glossary/full-node)因为独立验证每条规则而更抗这种攻击。

多数轻量手机钱包使用 SPV 式逻辑，并常结合紧凑区块过滤器保护隐私。对日常使用这是合理的取舍。高价值或高风险场景，运行[全节点](/glossary/full-node)。

**相关词条：** [全节点（Full Node）](/glossary/full-node) · [完整验证（Full Validation）](/glossary/full-validation) · [BIP 37](/glossary/bip-37) · [BIP 158](/glossary/bip-158) · [Neutrino](/glossary/neutrino) · [默克尔根（Merkle Root）](/glossary/merkle-root) · [区块头（Block Header）](/glossary/block-header) · [日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack) · [竞速攻击（Race Attack）](/glossary/race-attack) · [重放攻击（Replay Attack）](/glossary/replay-attack)
