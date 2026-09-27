---
title: Bitcoin Dev Kit（BDK）
---

# Bitcoin Dev Kit（BDK）

> **一句话定义：** 开源 Rust 库，提供构建比特币钱包的模块化积木——描述符管钥、可插拔后端，是新一代钱包的现代地基。

**Bitcoin Dev Kit（BDK）** 是一个开源 Rust 库，为构建比特币钱包提供模块化的积木。由活跃的贡献者社区维护，2026 年已有越来越多的生产级钱包用它驱动——包括需要链上功能的闪电钱包。

BDK 提供什么：

- **基于描述符的钱包原语。** 输出脚本描述符（「这个钱包用哪些脚本」的现代写法）让 BDK 通过干净的接口处理复杂配置——多签、miniscript、自定义锁定时间结构。
- **可插拔后端。** 连 Bitcoin Core 节点、Electrum 服务器、Esplora REST API，或以 PSBT 工作流完全离线运行。
- **选币算法。** 内置挑选 UTXO 的策略（先大后小、分支定界等）。
- **PSBT 支持。** 一流的 [PSBT](/glossary/psbt) 构造与终结。
- **跨平台。** Rust 内核加 Swift、Kotlin、Python、JavaScript 的 FFI 绑定——移动端和嵌入式钱包都能用。

BDK 的闪光点：任何构建新比特币钱包的人，不必再从零写描述符解析、PSBT 逻辑、选币、费率估算那一整套。BDK 管管道，钱包构建者专注体验和功能。

2026 年基于 BDK 的知名钱包包括 Mutiny Wallet、Cake Wallet 的比特币模块、若干闪电服务提供商的入门流程，以及多种企业托管工具。它也被嵌入硬件钱包的配套软件。

对开发者来说，BDK 是两大 Rust 比特币库之一（另一个是闪电网络的 [LDK](/glossary/lightning-network-daemon-lnd)）。两者合起来，构成了大多数不直接基于 Bitcoin Core 代码库的新比特币钱包开发的现代地基。

文档见 [bitcoindevkit.org](https://bitcoindevkit.org/)；更广的钱包图景见[钱包](/glossary/wallet)。

**相关词条：** [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Knots](/glossary/bitcoin-knots) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [HD 钱包（Hierarchical Deterministic Wallet）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [层级确定性钱包（Hierarchical Deterministic Wallet）](/glossary/hierarchical-deterministic-wallet) · [钱包（Wallet）](/glossary/wallet)
