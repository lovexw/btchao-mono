---
title: 转入锚定（Peg-in）
---

# 转入锚定（Peg-in）

> **一句话定义：** 在主链上锁定 BTC 以换取侧链锚定代币（如 Liquid 的 L-BTC）。

比特币语境下的**锚定（peg）**是把[侧链](/glossary/sidechain)（或其他独立系统）上的单位与主网 BTC 以固定 1:1 比例绑定的机制。「锚定」一词也指通过该机制转移 BTC 的过程。

两个操作方向：

- **转入锚定（Peg-in）：** 在主网锁定 BTC，换得等值侧链代币。主网 BTC 被锁进由侧链锚定基础设施控制的多签或脚本里。
- **[转出锚定（Peg-out）](/glossary/peg-out)：** 销毁或移走侧链代币，从锚定的锁定储备中换回主网 BTC。

结果：侧链代币在经济上与 BTC 无差别（1 L-BTC = 1 BTC），但它们活在另一条性质不同的链上。

锚定架构按信任模型分类：

- **联邦锚定**（最常见，[Liquid](/glossary/liquid-network) 采用）。一组受信任的运营方通过多签控制锁定的 BTC。转入是无许可的（任何人都能锁）；转出需要联邦阈值签名。
- **Drivechain 锚定**（提案中，[BIP-300](/glossary/bip-300-drivechains)）。由矿工在很长的周期内对转出提款投票。尚未激活。
- **SPV 锚定。** 侧链验证者检查主网 SPV 证明来验证锚定操作。见于一些研究设计，未大规模生产使用。
- **单向锚定**（[工作量销毁](/glossary/one-way-peg)）。BTC 通过可验证的销毁移入侧链，没有回程。
- **基于限制条款（covenants）的无信任锚定。** 若 [CTV](/glossary/checktemplateverify-ctv) 之类的限制条款激活，未来可能出现更无信任的锚定构造。

锚定机制是任何侧链的信任热点。联邦锚定的可靠程度等于联邦的诚实度与运营安全水平；drivechain 锚定的可靠程度等于矿工利益的一致性。不同用户会看重不同的取舍。

**相关词条：** [转出锚定（Peg-out）](/glossary/peg-out) · [Peg-Guard（锚定防护）](/glossary/peg-guard) · [侧链（Sidechain）](/glossary/sidechain) · [Liquid 联邦](/glossary/liquid-federation) · [Liquid 网络](/glossary/liquid-network) · [比特币桥（Bitcoin Bridge）](/glossary/bitcoin-bridge)
