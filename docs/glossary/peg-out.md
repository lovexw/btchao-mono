---
title: 转出锚定（Peg-out）
---

# 转出锚定（Peg-out）

> **一句话定义：** 在联邦或多签校验交易有效性后，把侧链代币换回主链 BTC。

**转出锚定（peg-out）**是把侧链代币换回主网 BTC 的操作，完成从[转入锚定](/glossary/peg)开始的往返旅程。它是双向锚定生命周期中信任假设最重的一半，因为必须有人授权释放当初在主网上锁定的 BTC。

具体机制取决于锚定架构：

- **[联邦锚定](/glossary/liquid-network)（如 Liquid）：** 用户在 Liquid 上销毁 L-BTC；[联邦](/glossary/liquid-federation)验证该销毁，达到阈值的联邦成员（例如 11-of-15 的 functionary）签名一笔交易，从联邦的主网多签中释放 BTC。联邦诚实执行转出是关键的信任假设。
- **Drivechain（[BIP-300](/glossary/bip-300-drivechains)）：** 提款提案由[矿工](/glossary/miner)在很长的周期内（约 3 个月）投票。足够多的矿工赞成，BTC 就被释放。这把信任转移给了挖矿多数。
- **SPV 验证锚定：** 侧链验证者通过主网活动的 SPV 证明验证转出。理论上更无信任，但很少大规模部署。

转出可能出什么问题：

- **联邦拒绝。** 如果联邦决定审查某笔转出（制裁合规、纠纷、恶意行为），用户就拿着一堆无法兑付的侧链代币。
- **联邦沦陷。** 被黑或被胁迫的联邦可能批准一笔假转出，把锁定的 BTC 卷走。
- **处理缓慢。** drivechain 式转出故意设计得很慢（数月）；联邦式转出快一些（数小时到数天），但仍慢于链上转账。
- **侧链故障。** 如果侧链本身挂了（漏洞、关停、恶意接管），转出可能彻底无法进行。

对通过侧链转移真实价值的用户来说，转出路径是要评估的关键风险。你的 BTC 一旦转入锚定，你就已经把宝押给了这个转出机制在压力之下实际能兑现的东西。

**相关词条：** [转入锚定（Peg-in）](/glossary/peg) · [锚定防护（Peg-Guard）](/glossary/peg-guard) · [Liquid 联邦](/glossary/liquid-federation) · [Liquid 网络](/glossary/liquid-network) · [侧链（Sidechain）](/glossary/sidechain)
