---
title: 重放攻击（Replay Attack）
---

# 重放攻击（Replay Attack）

> **一句话定义：** 分叉后把一条链上的有效交易在另一条链上重放，可能造成非本意的资金转移。

重放攻击（Replay Attack）发生在链分叉之后：在链 A 上签名广播的交易，在链 B 上同样有效，因为两条链共享 UTXO、地址和签名规则。攻击者（或仅仅是 P2P 网络的自然传播）可以把你的交易在另一条链上重播，在你未同意的情况下花掉对应的「孪生」币。

经典历史案例是 2017 年 8 月的 Bitcoin Cash 分裂。最初 BCH 只有部分重放保护；后来 Bitcoin Cash 通过自定义的 `SIGHASH_FORKID` 标志加入了强重放保护——BCH 交易在比特币上无效，反之亦然。Bitcoin SV 后续从 BCH 再分裂时也加了自己的保护。

分叉链上的缓解手段：

- **强重放保护：** 分叉引入链特定的签名变更（不同的 sighash、链 ID 式的承诺等），使交易无法跨链验证。
- **分链花费：** 在任何一条链上广播之前，先把两边各自的币花到全新地址，使用只在一条链上有效的输入。
- **分离器（splitter）服务：** 可信的第三方工具，构造出只在一条链上明确有效的交易。

到 2026 年，普通比特币用户面临的实际重放攻击风险基本为零。任何足够重要的争议性分叉都会自带重放保护——2017 年没有它的日子已经足够痛苦，不会再有哪个后来的分叉敢跳过这一步。

**相关词条：** [双花（Double Spend）](/glossary/double-spend) · [双花中继（Double Spend Relay）](/glossary/double-spend-relay) · [日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack) · [破坏攻击（Griefing Attack）](/glossary/griefing-attack) · [竞速攻击（Race Attack）](/glossary/race-attack) · [重组（Reorg）](/glossary/reorg-reorganization) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
