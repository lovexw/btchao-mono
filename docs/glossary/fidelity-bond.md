---
title: 信誉债券（Fidelity Bond）
---

# 信誉债券（Fidelity Bond）

> **一句话定义：** 用[时间锁](/glossary/locktime)锁定的 BTC 存款作为[抗女巫](/glossary/anti-sybil-mechanism)机制——想冒充一堆假身份？先真金白银锁一笔。

信誉债券是一种[时间锁](/glossary/locktime)的 BTC 存款，用作[抗女巫](/glossary/anti-sybil-mechanism)机制。参与者承诺把一笔资本锁定一段时间；这让批量炮制假身份变得昂贵，从而让攻击一个隐私协议在经济上不划算。

教科书用例是 **JoinMarket**——一个去中心化的 [CoinJoin](/glossary/coinjoin) 协调协议。JoinMarket 的撮合市场里，参与者可以当「maker」（提供流动性、赚取手续费）或「taker」（付费求混）。没有抗女巫措施的话，攻击者可以炮制大量假 maker——全由同一个实体控制——垄断撮合过程，破坏混币。

信誉债券补上了这个洞。Maker 可以通过把 BTC 锁进一个时间锁输出来证明自己的承诺——典型形态是一个受 [CLTV](/glossary/checklocktimeverify-cltv) 保护的 UTXO，在未来的某个区块之前谁也花不掉。Taker 会优先选择锁得更多、锁得更久的 maker，原因如下：

- **攻击者得锁真 BTC**，才能炮制有说服力的假身份。
- **债券更大 + 锁期更长 = 同等女巫能力的攻击成本更高。**
- **持债者有真金白银押在上面**——锁期内取不回这些 BTC，等于承诺行为长期一致。

资本不会损失，只是在锁期内不可花费。攻击者承担的是资金被占用的*机会成本*。规模一大，这个机会成本就变得高不可攀。

这个概念可以推广。类似的经济质押机制出现在：

- 闪电网络的通道资金（通道双方都有真金白银押在上面）。
- 权益证明系统（验证者质押才能参与）。
- 一些联邦化系统，委员会成员缴纳保证金。

信誉债券是一个干净的例子：用比特币的原语（[时间锁](/glossary/locktime)、公开可验证性）组合出女巫抗性这类邻近问题的解法，而不动基础协议一根毫毛。

**相关词条：** [交易对手风险（Counterparty Risk）](/glossary/counterparty-risk) · [托管钱包（Custodial Wallet）](/glossary/custodial-wallet) · [托管（Escrow）](/glossary/escrow) · [带托管的闪电通道](/glossary/escrowed-lightning-channel) · [层级多签](/glossary/hierarchical-multisig) · [M-of-N 多签](/glossary/m-n) · [仲裁签名（Quorum Signatures）](/glossary/quorum-signatures)
