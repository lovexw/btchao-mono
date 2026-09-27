---
title: 闪电通道（Lightning Channel）
---

# 闪电通道（Lightning Channel）

> **一句话定义：** 闪电网络上两方之间的链下支付通道：结算前可快速低费交易。

闪电通道是[闪电网络](/glossary/lightning-network)上两方之间的支付管道。双方把资金锁进一个共享的 2-of-2 多签链上输出（**资金交易**），此后便可以通过签署一连串**承诺交易**来更新通道的余额分配，交换无限次链下支付。

一条通道从头到尾是这样运作的：

1. **开启。** Alice 和 Bob 各自出资（或按协议变体由一方出资）建一个 2-of-2 多签。资金交易上链并确认。
2. **交易。** Alice 要付 Bob，就构造一笔新的承诺交易，把通道余额中更少的一份分给自己、更多的一份分给 Bob，签名后分享给 Bob；Bob 也签好存下。旧承诺用吊销密钥作废。新状态从此是两人之间的「当前事实」——尽管链上什么都没发生。
3. **反复更新。** 这个过程可以来回重复成千上万次。每次更新只是一笔躺在双方钱包里的已签名交易。
4. **关闭。** 任何一方随时可以把最新承诺广播上链，按最新状态结算资金。承诺交易本身就是一个[救援交易](/glossary/rescue-transaction)——每次状态更新都预先签好，一旦对手离线或作恶就广播。**协作关闭**双方签字、干净利落。**强制关闭**单方发起，带一段延迟窗口，窗口内另一方可以用吊销密钥惩罚广播过期状态的作弊者。

防作弊机制是闪电无需信任的根基。Bob 若敢广播对自己更有利的旧承诺，Alice 就能用吊销密钥拿走通道的**全部**资金，包括 Bob 的那份。这是通道级别的相互确保毁灭。实践中，作弊企图极其罕见。

几个现实要点：

- **不活跃通道不代表有问题。** 几个月没更新的通道照样能用，随时可以回来。
- **你得盯防作弊。** 对手作弊时你若离线，就错过争议窗口。瞭望塔服务就是为此存在的。
- **容量开通道时定死。** 0.05 BTC 的通道最多路由 0.05 BTC；要更多就得再平衡（通过 [Loop In/Out](/glossary/loop-inout) 这类潜艇交换服务）或拼接。

网络层面的全貌与 HTLC 路由，见[闪电网络](/glossary/lightning-network)。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [按分钟付费模型（Lightning）](/glossary/audiobook-model-lightning) · [自动驾驶（Autopilot）](/glossary/autopilot-lightning) · [BOLT](/glossary/bolt) · [BOLT 11](/glossary/bolt-11) · [桥接节点（Bridge Node）](/glossary/bridge-node-lightning) · [通道流失（Churn）](/glossary/churn-lightning) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [Eltoo](/glossary/eltoo) · [带托管的闪电通道](/glossary/escrowed-lightning-channel) · [欺诈性关通道](/glossary/fraudulent-channel-close) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [HTLC 发票](/glossary/htlc-invoice) · [HTLC 原像管理器](/glossary/htlc-preimage-manager) · [不活跃通道](/glossary/inactive-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点](/glossary/lightning-node) · [闪电路由](/glossary/lightning-routing) · [Loop In/Out](/glossary/loop-inout) · [支付通道](/glossary/payment-channel) · [救援交易](/glossary/rescue-transaction) · [超大通道（Wumbo Channels）](/glossary/wumbo-channels-lightning)
