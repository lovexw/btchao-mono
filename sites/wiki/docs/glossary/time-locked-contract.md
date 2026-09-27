---
title: 时间锁合约（Time-Locked Contract）
---

# 时间锁合约（Time-Locked Contract）

> **一句话定义：** 用 CLTV（绝对时间）或 CSV（相对时间）限制花费、直到特定区块/时间的合约。

时间锁合约（Time-Locked Contract）是任何以时间作为花费条件的比特币脚本。比特币为时间提供四个构建块：

- `nLockTime`（交易级绝对时间）：在指定区块高度或 Unix 时间戳之前，交易无效。
- `nSequence`（输入级相对时间）：在父输出被确认后经过 N 个区块（或 N 个时间单位）之前，输入无效。
- `OP_CHECKLOCKTIMEVERIFY`（CLTV，BIP 65）：脚本级检查，强制花费之前先过一个绝对时间。
- `OP_CHECKSEQUENCEVERIFY`（CSV，BIP 112）：脚本级检查，强制自输出创建起算的相对时间。

两个脚本级操作码都以 Median Time Past（MTP，BIP 113）为时间基准，使比较对矿工操纵时间戳具有抵抗力。

现实中的用例无处不在：

- **闪电通道：** HTLC 用 CSV 强制一个延迟窗口，对手在窗口内不能认领支付，给另一边时间广播惩罚交易（如果对方作弊）。
- **金库：** 脚本里的「7 天后可花费」分支让用户在热密钥泄露后仍能挽回资金。
- **继承：** 主持有人 N 个月无活动后，备用分支变为指定继承人可花费。
- **DLC（谨慎日志合约）：** 对预言机签名的超时分支，让对手在预言机永不签名时收回资金。
- **原子互换与潜艇互换：** 超时分支让出资方在互换对手认领前消失时收回资金。

时间锁是比特币最强大的原语之一。与多签、哈希锁花费路径结合，它们是几乎所有不平凡的链上/链下协议的地基。

**相关词条：** [绝对时间锁（Absolute Locktime）](/glossary/absolute-locktime) · [BIP 65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP 68（相对时间锁）](/glossary/bip-68-relative-locktime) · [BIP 113](/glossary/bip-113) · [CLTV（CheckLockTimeVerify）](/glossary/checklocktimeverify-cltv) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [Locktime](/glossary/locktime) · [MTP（中位时间过去）](/glossary/mtp-median-time-past) · [nLockTime](/glossary/nlocktime) · [nSequence](/glossary/nsequence)
