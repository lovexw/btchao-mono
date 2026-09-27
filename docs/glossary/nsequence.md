---
title: nSequence
---

# nSequence

> **一句话定义：** 每个交易输入的字段：原为部分交易更新设计，BIP 68 起被重新用于编码相对时间锁与 RBF 信号。

`nSequence` 是比特币中每个[交易输入](/glossary/input-transaction-input)上的一个 32 位字段。它最初在比特币的最早设计里是「部分替换」机制，后来被 [BIP 68](/glossary/bip-68-relative-locktime)（以及 [BIP-125 RBF](/glossary/replace-fee-rbf) 的信号机制）重新启用，用来编码：

- **相对时间锁。** 低 16 位编码自该输入引用的 UTXO 被确认以来的区块数或时间延迟。
- **类型标志。** 第 22 位选择按区块还是按时间解释。
- **禁用标志。** 第 31 位置 1 时，对该输入禁用相对时间锁。
- **RBF 信号。** 任何小于 `0xfffffffe` 的 `nSequence` 值都表示选择加入 BIP-125 的[替换手续费（RBF）](/glossary/replace-fee-rbf)。

当前默认值为 `0xfffffffd`（启用 BIP-125 RBF 信号）或 `0xffffffff`（无相对时间锁、无 RBF 信号），取决于钱包。

这些语义在几个用户真会碰到的场合里要紧：

- **支持 RBF 的钱包**把 `nSequence` 设为 `0xfffffffd`，交易就可以通过 BIP-125 被替换。
- **[闪电](/glossary/lightning-network)承诺交易**用特定的 `nSequence` 值编码通道关闭延迟窗口，由 [OP_CHECKSEQUENCEVERIFY](/glossary/checksequenceverify-csv) 执行。
- **带相对时间锁的脚本合约**把 `nSequence` 设为延迟值，并在锁定脚本里配一个 CSV 检查。

`nSequence` 是那种多数用户永远不会直接打交道的协议细节，却默默支撑着闪电网络、金库和大多数高级多方构造。它从「部分替换」到「相对时间锁 + RBF 信号」的重新启用史，是比特币务实地复用字段语义的一个小小例证。

相对时间锁语义见 [BIP 68](/glossary/bip-68-relative-locktime)，更广的基于时间的脚本框架见[锁时间](/glossary/locktime)。

**相关词条：** [绝对时间锁（Absolute Locktime）](/glossary/absolute-locktime) · [BIP 65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP 68（相对时间锁）](/glossary/bip-68-relative-locktime) · [BIP 113](/glossary/bip-113) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [延迟惩罚交易（Delayed Justice）](/glossary/delayed-justice-transaction) · [锁时间（Locktime）](/glossary/locktime) · [MTP（中位时间过去）](/glossary/mtp-median-time-past) · [nLockTime](/glossary/nlocktime) · [时间锁合约（Time-Locked Contract）](/glossary/time-locked-contract) · [交易（Transaction）](/glossary/transaction)
