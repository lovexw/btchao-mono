---
title: 无脚本脚本（Scriptless Scripts）
---

# 无脚本脚本（Scriptless Scripts）

> **一句话定义：** 利用 Schnorr 签名在链下编码合约条件、不在链上暴露的合约逻辑。

「无脚本脚本」（Scriptless Scripts）是由 Andrew Poelstra 等人开创的研究方向：把复杂的比特币合约逻辑编码进签名的密码学结构本身，而不是[比特币脚本](/glossary/bitcoin-script)的操作码里。合约的链上足迹就是一个标准签名；合约条件活在数学里。

技术机制依赖 **[Schnorr 签名](/glossary/schnorr-signature)** 及其线性性质。双方可以这样构造联合签名流程：完成签名的同时隐式满足一个合约条件——比如揭示一个秘密、证明一个事实、或结算一个预言机结果。签名一旦上链，与其他任何 Schnorr 签名无从区分——但链下参与者知道它编码了一次特定的合约执行。

无脚本脚本的用武之地：

- **谨慎日志合约（DLC）。** 条件支付：预言机对结果的签名决定赢家。链上交易看起来只是一笔普通结算；只有双方（和预言机）知道赌注是什么。
- **[闪电网络](/glossary/lightning-network)路由改进。** 各类闪电协议可以把信任假设移进签名聚合层，而不是逐跳的脚本里。
- **原子互换变体。** 跨链互换，把关联值编码在签名标量而非哈希原像中。
- **跨链的比特币闪电 / Liquid 互换**，在两条链上使用完全相同的签名编码条件。

好处：

- **隐私。** 观察者看不出这笔交易属于一个复杂合约；它长得完全正常。
- **链上足迹更小。** 合约逻辑不占脚本字节。
- **无需新操作码。** 只要参与方使用 Schnorr/Taproot，许多无脚本脚本模式在今天的比特币上就能跑。

代价：无脚本脚本需要极其小心的协议设计，实现并不简单。它强大但专用。现实采用有限但在增长——尤其是 DLC 和高级闪电工作流。

底层数学见 [Schnorr 签名](/glossary/schnorr-signature)；让这条路实用化的升级见 [Taproot](/glossary/taproot)。

**相关词条：** [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [Schnorr 签名（Schnorr Signature）](/glossary/schnorr-signature) · [Taproot](/glossary/taproot) · [操作码（OP Code）](/glossary/op-code-operation-code) · [契约（Covenants）](/glossary/covenants) · [CTV（CheckTemplateVerify）](/glossary/checktemplateverify-ctv)
