---
title: CLTV（CheckLockTimeVerify）
---

# CLTV（CheckLockTimeVerify）

> **一句话定义：** 一个操作码（OP_CLTV）：让交易输出在指定区块高度或时间戳之前不可花费。

**OP_CHECKLOCKTIMEVERIFY**（CLTV）是在比特币脚本内强制执行[绝对时间锁](/glossary/absolute-locktime)的操作码。它是交易级 [`nLockTime`](/glossary/nlocktime) 字段的脚本级搭档。

语义是：CLTV 执行时，检查花费交易的 `nLockTime` 是否至少为某个特定值（CLTV 从栈上读取）。条件成立，脚本继续；不成立，花费失败。于是锁定脚本可以要求「要花费我，花费交易必须声明锁时间 ≥ X」——等于把这个输出锁到那个区块高度或时间戳为止。

CLTV 经 [BIP-65](/glossary/bip-65-opchecklocktimeverify) 于 2015 年 12 月引入，是让高级比特币构造变得可行的脚本原语之一。常见用途：

- **[支付通道](/glossary/payment-channel)**——结算脚本含 CLTV 延迟，让争议有机会在单方花费前解决。
- **[HTLC](/glossary/htlc-hashed-time-locked-contract)**——时间侧的兜底（「区块 N 之前原像未揭示，付款方可收回」）。
- **[原子交换](/glossary/atomic-swap)**——跨链交易的超时退款。
- **金库构造**——冷存储安全的强制提币延迟。
- **遗产脚本**——长期不动之后继承人可认领。

CLTV 的部署方式是替换此前被禁用的 `OP_NOP2` 操作码。这是比特币通过软分叉添加新功能的标准模式：拿一个什么都不做的 NOP，重定义它去做有用的事。不认识新含义的旧节点看到的只是 `OP_NOP2` 什么都不做——脚本照样成功，所以新规则是纯粹的附加限制，旧节点默认仍视为「有效」。

搭档是 [`OP_CHECKSEQUENCEVERIFY`](/glossary/checksequenceverify-csv)（CSV），经 [BIP-68/112](/glossary/bip-68-relative-locktime) 提供相对时间锁。两者合起来，就是让闪电网络和许多其他二层设计成为可能的时间脚本工具箱。

**相关词条：** [绝对时间锁（Absolute Locktime）](/glossary/absolute-locktime) · [BIP 65（OP_CHECKLOCKTIMEVERIFY）](/glossary/bip-65-opchecklocktimeverify) · [BIP 68（相对时间锁）](/glossary/bip-68-relative-locktime) · [BIP 113](/glossary/bip-113) · [BIP 119（CTV）](/glossary/bip-119-ctv) · [比特币脚本（Bitcoin Script）](/glossary/bitcoin-script) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [CTV（CheckTemplateVerify）](/glossary/checktemplateverify-ctv) · [契约（Covenants）](/glossary/covenants) · [锁时间（Locktime）](/glossary/locktime) · [nLockTime](/glossary/nlocktime) · [nSequence](/glossary/nsequence) · [时间锁合约（Time-Locked Contract）](/glossary/time-locked-contract)
