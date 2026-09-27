---
title: 堵塞攻击（LN）
---

# 堵塞攻击（LN）

> **一句话定义：** 用永不完成的挂起 HTLC 锁死闪电通道流动性的恶意行为，妨碍正常路由。

[闪电网络](/glossary/lightning-network)上的堵塞攻击：攻击者故意发起被设计成在最后一刻失败的支付，把通道流动性占死——[HTLC](/glossary/htlc-hashed-time-locked-contract) 挂在 pending 状态直到超时。攻击者不损失资金（支付会解开），但堵塞窗口内合法支付过不了这些通道。

攻击机制：

1. 攻击者沿目标路径发起一笔[闪电支付](/glossary/lightning-payment)，用假的或不可领取的支付哈希。
2. 路径上每一跳都把相应通道容量锁进一个挂起 HTLC。
3. 支付无法完成（收款方手里没有原像，无从揭示）。
4. HTLC 一直锁到超时——通常几十分钟到几小时。
5. 锁定期间，试图经这些通道路由的合法用户看到的是「容量不足」的失败。

变体：

- **慢堵塞。** 用大量小额 HTLC 耗尽通道的 *HTLC 数量*上限（每通道每方向在途上限通常是 483 个）。通道先在 HTLC 槽位上「满」，而不是在 BTC 上。
- **快堵塞。** 用大额 HTLC 直接耗尽 BTC 容量。
- **定向堵塞。** 攻击特定路径，打击竞争对手或谋取其他运营优势。

正在研究与部署的防御：

- **预付费。** 让路由尝试本身有成本（小但非零），使堵塞有真实代价。社区讨论多年，部署渐进。
- **声誉系统。** 节点追踪频繁发起不完成支付的对端，降级或断开这些连接。
- **堵塞探测器。** 对 HTLC 模式做实时监控，识别疑似攻击。见 [HTLC 堵塞探测器](/glossary/jammed-htlc-detector)。

堵塞是闪电未解决的安全问题之一。不是理论——野外实际观察到过——但也不算灾难性。防御在进步，协议在加固，猫鼠游戏继续。

**相关词条：** [窃听攻击](/glossary/eavesdropping-attack) · [破坏攻击（Griefing Attack）](/glossary/griefing-attack) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [HTLC 堵塞探测器](/glossary/jammed-htlc-detector) · [闪电网络](/glossary/lightning-network) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [Sphinx（闪电洋葱路由）](/glossary/lightning-sphinx) · [竞速攻击（Race Attack）](/glossary/race-attack) · [重放攻击（Replay Attack）](/glossary/replay-attack)
