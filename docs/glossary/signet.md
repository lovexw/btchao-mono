---
title: Signet 测试网
---

# Signet 测试网

> **一句话定义：** 区块由中央协调者签名的专用比特币测试网络，比 Testnet 更稳定。

Signet 是一个比特币测试网络（[BIP-325](https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki)）：区块由指定的**区块签名者**按固定节奏产出，而不是竞争性[挖矿](/glossary/mining)。它是严肃协议与钱包开发的测试环境。

相对 [Testnet](/glossary/testnet)，Signet 修复了什么：

- **出块时间可预测。** Signet 稳定地约每 10 分钟出一个块。不会再有 20 分钟的旱季接着 5 分钟 30 个块的洪峰。
- **没有垃圾驱动的难度战争。** 签名者控制出块；没什么可刷的。
- **贴近真实的手续费市场。** 出块可预测，你才能真正测试费率估算与拥堵行为——混乱的 testnet 上很难做到。

Signet 为稳定性换掉了什么：

- **签名者是一个受信任角色。** 对测试网络来说可以接受，但真实的攻击者若控制签名者，可以轻易搞乱 Signet。默认 Signet 的签名者公开已知；你也可以用*自己的*签名者运行*自己的* Signet，获得完全受控的环境。
- **币依然一文不值。** 它是测试网络；Signet BTC 没有经济价值。

自定义 Signet 越来越常见。一个团队可以起自己的签名者、分发网络的魔数参数，得到一个出块节奏完全可控的测试环境。这是 Taproot、Drivechain 实验、闪电协议规范测试这类协议开发工作的默认选择。

对多数日常钱包开发，默认 Signet 就够了。要测奇怪边界情况，就跑自己的。更老、更不受控的替代品见 [Testnet](/glossary/testnet)；真家伙见[主网（Mainnet）](/glossary/mainnet)。

**相关词条：** [Testnet 测试网](/glossary/testnet) · [主网（Mainnet）](/glossary/mainnet) · [Bitcoin Core](/glossary/bitcoin-core) · [共识参数（Consensus Parameter）](/glossary/consensus-parameter) · [挖矿（Mining）](/glossary/mining)
