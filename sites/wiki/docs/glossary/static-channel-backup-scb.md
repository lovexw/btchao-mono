---
title: 静态通道备份（SCB）
---

# 静态通道备份（SCB）

> **一句话定义：** 保存闪电通道关键数据的文件：本地通道状态丢失时可尝试恢复。

静态通道备份（SCB）是一个小文件（LND 里通常叫 `channel.backup`），记录着闪电节点在本地数据全损后追回链上资金所需的最少元数据：通道资金输出的 outpoint、对端节点的公钥、基本的对等连接信息。

它之所以「静态」，是因为文件不需要随每次通道状态变化而更新。它保存的是应急恢复所需的东西，不是当前通道余额。

用 SCB 恢复的流程：

1. 你的节点挂了。硬件故障、勒索软件、手机掉海里。本地通道状态没了。
2. 你装一个全新节点，恢复[助记词](/glossary/seed-phrase)，载入 SCB。
3. 新节点向每个通道对端发送 `channel_reestablish` 消息，大意是「我的状态丢了，请按你手里最新的承诺强制关通道」。
4. 对端照办，广播他们最新的承诺交易。
5. CSV 时间锁窗口过后，你的链上资金恢复可花费。

你为此放弃的：

- **在途 HTLC。** 故障瞬间正路过你节点的未完成支付，可能按对端有利的方式结算。
- **抓作弊的能力。** 如果对端不诚实、广播了一份给ta分更多的**旧**承诺，你无法检测或惩罚。故障前就在运行的瞭望塔（watchtower）若一直在监视，仍可以替你反击。
- **通道的连续性。** 通道全关。你从零开始，付链上手续费，重建流动性。

你保住的：通道最终结算余额对应的链上比特币。比什么都没有强，比全额损失好得多。

SCB 是应急工具，不是正规备份的替代品。正确的架构是：定期对节点完整状态目录做卷级备份，**外加**一份最新的 SCB 作为最后防线。LND 和 Core Lightning 都提供 SCB 式恢复；现代闪电钱包通常自动处理 SCB 的存储。

**相关词条：** [欺诈性关通道](/glossary/fraudulent-channel-close) · [闪电通道](/glossary/lightning-channel) · [闪电网络](/glossary/lightning-network) · [Lightning Network Daemon（lnd）](/glossary/lightning-network-daemon-lnd) · [助记词](/glossary/seed-phrase) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract)
