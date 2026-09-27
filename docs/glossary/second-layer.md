---
title: 第二层（Second Layer）
---

# 第二层（Second Layer）

> **一句话定义：** 建在比特币主链之上的网络（如闪电网络、侧链）：换取更好的扩展性或新特性。

「第二层」（second layer，或「layer 2」）指构建在比特币基础链之上、在主链之外处理交易、最终结算仍回到主链的任何协议。目标是在不改动基础层、不给基础层增负的前提下，增加吞吐量、速度或功能。

比特币的主要第二层设计：

- **[闪电网络](/glossary/lightning-network)。** 由比特币脚本保护的链下支付通道。即时、便宜、私密的支付；周期性链上结算。部署最广的比特币第二层。
- **[侧链](/glossary/)**如 Liquid 和 RSK。通过联邦或其他锚定机制与比特币绑定的独立区块链。常用于补足比特币缺少的特性（隐私交易、智能合约）。
- **Statechain / Mercury Layer。** 不经链上交易、在链下转移 UTXO 控制权，最终可回退到链上。
- **Ark。** 较新的方案：由服务运营方通过短命链下通道让大量用户即时交易。
- **Chaum 式电子现金**（Fedimint、Cashu）。联邦铸币厂发行保护隐私的电子现金，可在闪电网络兑回聪。用自我托管换取联邦层面的强隐私与即时支付。
- **Drivechain（提案中）**——由比特币矿工对锚定提款投票保障的假想侧链类别。尚未激活。

每个第二层共享的逻辑：比特币基础链是全球结算层——安全、不可篡改、大量使用时昂贵。第二层吸收日常交易负载，只在需要时回到基础链结算。

取舍因设计而异。闪电网络真正无信任，但需要流动性管理。侧链更易用，但引入联邦信任。电子现金铸币厂方便，但要求联邦诚实。

「基础层 + 分层」就是比特币的扩展方式。基础层不需要处理每一杯咖啡的付款；它需要的是结算最终状态。基础链视角见[第一层（Layer 1）](/glossary/layer-1)。

**相关词条：** [第一层（Layer 1）](/glossary/layer-1) · [闪电网络（Lightning Network）](/glossary/lightning-network) · [闪电通道（Lightning Channel）](/glossary/lightning-channel) · [支付通道（Payment Channel）](/glossary/payment-channel) · [状态通道（State Channel）](/glossary/state-channel) · [链下（Off-Chain）](/glossary/off-chain) · [侧链（Sidechain）](/glossary/sidechain) · [Liquid 网络](/glossary/liquid-network) · [原子互换（Atomic Swap）](/glossary/atomic-swap)
