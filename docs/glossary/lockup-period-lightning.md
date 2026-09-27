---
title: 锁定期（Lightning）
---

# 锁定期（Lightning）

> **一句话定义：** BTC 被占用在支付通道中的时间：通道关闭或结算前无法链上使用。

闪电通道的锁定期是资金被占用在通道 2-of-2 多签输出里的时长——通道关闭前，这部分 BTC 无法链上使用。

机制：

- **开通道**时一笔资金交易上链，把 BTC 锁进你和通道伙伴的 2-of-2 多签。
- **通道存续期间**，这些资金不能直接在链上花。只能在链下经通道状态更新在你和伙伴之间转移。
- **关通道**时广播一笔结算交易，按当前通道余额把资金解锁回双方各自的链上钱包。

锁定期是开放式的。通道可以开几小时，也可以开几年；唯一要求是双方定期保持连接（或使用[瞭望塔](/glossary/lightning-network-penalty)），以便检测并应对任何单方面关通道的企图。

锁定期里你放弃的：

- **链上流动性。** 锁定的 BTC 不能直接动。要在链上花钱？要么关通道（付链上手续费），要么用潜艇交换不关通道就把余额在闪电和链上之间挪。
- **对通道伙伴的依赖。** 资金由伙伴和你共同控制。伙伴永久离线，你可以强制关闭（熬过一个 CSV 锁定窗口后收回），但过程比花一个链上 UTXO 麻烦。
- **静态备份风险。** 闪电节点状态丢失而没有 [SCB](/glossary/static-channel-backup-scb) 时，恢复需要按最后已知状态强关通道——那可能比当前状态旧。

换来的：

- **近乎即时的闪电支付。** 通道网络内亚秒级结算。
- **近乎为零的手续费**——通道内和路由支付都如此。
- **可观的隐私。** 路由的闪电支付不留永久的链上痕迹。

操作上，正确的平衡通常是：留够非闪电需求的链上 BTC，其余按实际用量配进通道。活跃路由节点的通道一开数月到数年；消费级钱包的通道随流动性需求更短暂。

「锁定期」这个视角是理解取舍的好心智模型：通道开着，你就用即时链上访问权，换快速、便宜、私密的链下支付。

**相关词条：** [绝对时间锁](/glossary/absolute-locktime) · [CSV（CheckSequenceVerify）](/glossary/checksequenceverify-csv) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电通道](/glossary/lightning-channel) · [闪电网络](/glossary/lightning-network) · [静态通道备份（SCB）](/glossary/static-channel-backup-scb) · [闪电网络惩罚（Penalty）](/glossary/lightning-network-penalty) · [潜艇交换](/glossary/submarine-swap)
