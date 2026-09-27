---
title: JoinMarket
---

# JoinMarket

> **一句话定义：** 最早的去中心化 CoinJoin：做市方赚取提供混币流动性的费用，吃单方按需付费混合。没有可被查封的协调器——这正是它在 2024 年幸存的原因；2026 年原代码库归档，由独立继任者延续。

JoinMarket 解决了此前所有 [CoinJoin](/glossary/coinjoin) 设计都没解决掉的问题：怎么让陌生人愿意来跟你混币。它的答案是建一个市场。做市方（maker）运行常驻机器人，把自己的币作为混币流动性挂出来，自定费率；吃单方（taker）按自己合适的时间与金额付费组装一笔 CoinJoin。每个人始终握着自己的私钥（没有任何人碰过托管），费用激励机制干了本该由协调器干的活。

Chris Belcher 于 2015 年 1 月在 Bitcointalk 上发布它，帖子标题一句话说清了卖点：「人们真会去用的 Coinjoin」。Adam Gibson 主导了实现以及此后十年的维护。Bitcoin Optech 把 JoinMarket 评为第一个真正可用的 CoinJoin 实现。

岁月检验中最站得住的设计决策，是没有协调器。交易由吃单方自己构建，参与者通过端到端加密消息协商，消息经公共 IRC 服务器和 Tor 洋葱目录节点中继——这套基础设施从不碰资金，任何中继消失都可以换掉。2024 年美国起诉 [Samourai](/glossary/whirlpool-samourai) 协调器运营者、[Wasabi](/glossary/wasabi-wallet) 协调器随之关停时，JoinMarket 无物可查封、无人可抓。后续增强又加固了市场本身：忠实保证金（fidelity bond，2021）让单一实体伪装成多个做市方、给吃单方去匿名化的成本变得高昂。

到 2026 年，诚实的现状是：网络比原代码库活得更久。参考实现在 2026 年 4 月因其维护者停止开发而自行归档，最后一个版本警告用户不要再跑无人维护的代码。延续下来的是网络本身：2025 年末独立起步、线上协议兼容的继任实现 joinmarket-ng 持续发版；软化命令行陡峭学习曲线的 Web 界面 Jam 也在继续开发。去中心化让 JoinMarket 逃过了检察官的追杀，但没有任何东西能让软件对维护者疲劳免疫。

完整的 2024 年故事与 CoinJoin 的现状，见[比特币隐私专题](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [CoinJoin（协作交易混币）](/glossary/coinjoin) · [硬币控制（Coin Control）](/glossary/coin-control) · [Joinstr](/glossary/joinstr) · [Wasabi Wallet](/glossary/wasabi-wallet) · [Whirlpool / Samourai Wallet](/glossary/whirlpool-samourai)
