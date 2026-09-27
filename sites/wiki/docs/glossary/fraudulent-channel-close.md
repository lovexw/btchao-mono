---
title: 欺诈性关通道（Fraudulent Channel Close）
---

# 欺诈性关通道（Fraudulent Channel Close）

> **一句话定义：** 用旧通道状态关闭闪电通道以窃取资金的企图，会被惩罚交易制裁。

欺诈性关通道指[闪电](/glossary/lightning-network)参与者试图把过时的通道状态广播上链——分给自己的资金比当前真实状态更多的那一版。这就是闪电惩罚机制专门用来威慑的「作弊」模式。

它怎么发生（以及为什么通常失败）：

1. **作弊者持有一份旧的[承诺交易](/glossary/lightning-channel)**，里面自己的 BTC 比现在应得的多。（比如通道开局 50/50，后来 ta 付了对端 0.3 BTC，但 ta 手里还留着签好、随时可广播的旧 50/50 承诺。）
2. **ta 挑一个对端可能离线的时刻广播旧承诺。**
3. **诚实对端的[瞭望塔](/glossary/lightning-network-penalty)**（或 ta 自己的监控）发现这笔广播。
4. **对端用存好的吊销密钥广播[惩罚交易](/glossary/penalty-transaction)**，取走通道的*全部*余额——包括作弊者自以为刚偷到手的那部分。
5. **作弊者输掉通道里的一切。** 净结果：想偷 0.3 BTC，赔了 1 BTC（整条通道）。

威慑为什么有效：

- **惩罚是全额，不是等额。** 作弊者输掉的不只是想偷的数额，而是*全部*通道资金。
- **检测窗口很宽裕。** 关通道交易带 CSV 锁定延迟（通常 144–1008 个区块），关闭方锁完才能动资金。对端有整个窗口来发布惩罚。
- **瞭望塔存在**，替无法 24/7 在线的人盯守。

仍可能出错的地方：

- **对端在整个 CSV 延迟窗口内离线**，作弊就得手。
- **瞭望塔作恶或被攻破**，你就有暴露面。
- **作弊者意外广播旧状态**（比如从备份恢复），即使并无恶意，也会输掉自己的资金。

惩罚模型严苛但有效。[Eltoo](/glossary/eltoo) 若有朝一日激活，会换成更宽容的「旧状态直接作废」模型。在那之前，闪电用户背着谨慎管理状态的操作负担——旧备份上一次错手，就能毁掉一整条通道的资金。

**相关词条：** [欺诈证明](/glossary/fraud-proof) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [LND](/glossary/lightning-network-daemon-lnd) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [惩罚交易（Penalty Transaction）](/glossary/penalty-transaction) · [闪电网络惩罚（Penalty）](/glossary/lightning-network-penalty) · [Eltoo](/glossary/eltoo)
