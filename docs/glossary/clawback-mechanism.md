---
title: 回拨机制（Clawback Mechanism）
---

# 回拨机制（Clawback Mechanism）

> **一句话定义：** 超时或条件未满足时允许一方收回资金的脚本构造——金库、托管、闪电 HTLC、跨链互换共同的地基原语。

回拨机制是任何「超时或条件未达成后，允许一方收回资金」的比特币脚本构造。它是金库、托管与恢复协议的基础积木。

机制依赖比特币的时间锁操作码：

- **OP_CHECKLOCKTIMEVERIFY（CLTV）**：仅在达到某个绝对区块高度或时间戳之后才允许花费。
- **OP_CHECKSEQUENCEVERIFY（CSV）**：仅在父输出确认之后再过 N 个区块才允许花费。

经典回拨模式：

```
IF
  <收款方公钥> OP_CHECKSIG          # 收款方签名即可立即花费
ELSE
  <超时区块数> OP_CSV OP_DROP        # 超时之后……
  <发送方公钥> OP_CHECKSIG           # 发送方可收回
ENDIF
```

收款方在超时窗口内随时可以签名认领；不认领，发送方的回拨路径就变为可花费。

现实用途：

- **托管。** 买家把款锁进托管；卖家 N 天内不交货，买家回拨收回。
- **金库。** 热钥匙即时花费；冷钥匙也可即时花费，*并且*在时间锁窗口内可否决热钥匙的待定花费（当热钥匙失陷被发现时）。
- **闪电 HTLC。** 每个 HTLC 都有回拨路径，让注资方在超时前始终等不到原像时收回资金。
- **遗产继承。** 继承人的花费路径在 N 个月无活动后生效。
- **跨链互换超时。** 对方不按窗口完成互换，任一方可收回。

限制：

- **绝对时间模式下预估超时点**很别扭（内存池状况多变），多数回拨设计改用 CSV（相对时间）换可预测性。
- **回拨交易的存储**很要紧：预签的回拨交易必须安全存放、且在需要的时刻拿得到。
- **软分叉升级**（如 [BIP-119 CTV](/glossary/bip-119-ctv) 等契约提案）能进一步简化回拨模式；今天的设计可用，但需要更精细的脚本工程。

回拨是让比特币合约超越简单转账的承重原语之一。几乎每个有意思的比特币协议（闪电、金库、互换）都以某种形式建立在回拨之上。

**相关词条：** [币控制（Coin Control）](/glossary/coin-control) · [冻结币（Coin Freeze）](/glossary/coin-freeze) · [彩色币（Colored Coins）](/glossary/colored-coins) · [契约（Covenants）](/glossary/covenants) · [托管（Escrow）](/glossary/escrow) · [托管型闪电通道（Escrowed Lightning Channel）](/glossary/escrowed-lightning-channel) · [仲裁签名（Quorum Signatures）](/glossary/quorum-signatures)
