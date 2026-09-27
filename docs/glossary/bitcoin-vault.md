---
title: 比特币金库（Bitcoin Vault）
---

# 比特币金库（Bitcoin Vault）

> **一句话定义：** 用脚本级约束强制提款走多步、带延迟流程的自托管构造——给主人留出发现并取消未授权提款的时间窗。

比特币金库是一种利用脚本层约束的自托管构造：强制提款经过一个多步骤、带延迟的流程——在资金真的动起来之前，给主人留出发现并拦下未授权提款的时间。

基本模式：

1. **资金锁进金库地址**，该地址要求特定的多步花费流程。
2. **提款时，主人广播一笔「出库（unvaulting）」交易**——它不立即把钱发走，只是开启一个 [CSV 时间锁](/glossary/checksequenceverify-csv)延迟窗口（通常数小时到数天）。
3. **延迟窗口内**主人盯着。出库若是自己人发起的，延迟结束自动完成；若是 somehow 拿到了花费钥匙的攻击者发起的，主人用紧急恢复钥匙把资金改道（通常转去冷存储或另一个金库）。
4. **延迟结束时**若没有触发恢复，资金发往指定目的地。

这买到的是：对灾难性私钥泄露的防护。攻击者即便拿到你的热签名钥匙，也不能立刻掏空钱包——他必须广播一笔链上可见的出库交易，而你有时间用恢复钥匙反击。

2026 年的金库构造：

- **基于多签的金库**是当下最可行的。2-of-3 之类、冷库放一把钥匙、热端流程加 CSV 延迟——用现有比特币脚本就能近似金库行为。
- **原生金库操作码**如 OP_VAULT（James O'Beirne 的[契约](/glossary/covenants)提案）能让金库构造干净得多，但尚无任何契约操作码激活。
- **商业产品**：Casa、Unchained 等提供金库式产品，链上脚本延迟与托管式恢复服务相结合。

金库最适合**大额、不常动的持仓**——认真的储蓄仓，而非日常开销。日常比特币使用中，这份操作复杂度不值当；但对长期冷存储，这份灾难故障防护是有意义的。

金库常基于的多签模式见[分层多签](/glossary/hierarchical-multisig)；能让金库更强大的提案操作码见[契约](/glossary/covenants)。

**相关词条：** [比特币遗产规划（Bitcoin Inheritance Planning）](/glossary/bitcoin-inheritance-planning) · [币控制（Coin Control）](/glossary/coin-control) · [链状态损坏（Corrupted Chain State）](/glossary/corrupted-chain-state) · [契约（Covenants）](/glossary/covenants) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [硬件钱包（Hardware Wallet）](/glossary/hardware-wallet) · [HD 钱包（Hierarchical Deterministic Wallet）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层多签（Hierarchical Multisig）](/glossary/hierarchical-multisig) · [继承型种子备份](/glossary/inheritance-seed-backup) · [M-of-N 多签](/glossary/m-n) · [安全（Security）](/glossary/security)
