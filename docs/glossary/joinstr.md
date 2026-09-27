---
title: Joinstr
---

# Joinstr

> **一句话定义：** 实验性 CoinJoin 设计：用 Nostr 中继而非专门协调器来协调混币轮次。妙处恰在于「没有可查封的东西」——但截至 2026 年仍是小众概念验证，非生产工具。

Joinstr 是一种 [CoinJoin](/glossary/coinjoin) 设计，它对「协调器问题」的回答是：干脆不要协调器。参与者在 Nostr——那个因社交应用而为人所知的开放中继网络——上发现混币池、协调轮次。每位参与者登记一个全新输出地址，然后提交一份部分签名交易，覆盖自己的输入和所有人的等额输出；这些拼合起来就是一笔 CoinJoin。承载消息的中继是普通 Nostr 中继：通用、可互换、由陌生人出于其他目的运营，且从不接触任何人的资金。

2024 年之后，这个架构本身就成了意义所在。检察官端掉了 [Samourai](/glossary/whirlpool-samourai) 的协调器、吓退了 [Wasabi](/glossary/wasabi-wallet)——因为协调器是一家可以起诉的「生意」。而由匿名参与者在公共中继上安排的混币轮次给不出这样的把手。Joinstr 除了挖矿手续费之外分文不收，因为没有运营方需要付费。

不过诚实也得讲另一面。Joinstr 由其匿名开发者于 2022 年 8 月在 bitcoin-dev 邮件列表上发布，明确标注为概念验证，拒绝服务与女巫攻击的弱点在同一帖子里就已承认。数年过去，公开产物仍是一个标注 pre-alpha 的 Electrum 插件、一个警告勿用于主网的实验性 Rust 库，以及文档。没有独立测量显示有像样的混币量。[JoinMarket](/glossary/joinmarket) 跑了十年都难留住维护者；Joinstr 则还没证明到底有多少人在用它。

它在隐私话题里赢得的位置，是一个前进方向：把协调推到如此通用的基础设施上，以致关掉它就得关掉 Nostr 本身。至于它能否长成人人真用的东西——截至 2026 年，这问题真的悬而未决。

完整的 2024 年故事与 CoinJoin 的现状，见[比特币隐私专题](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [CoinJoin（协作交易混币）](/glossary/coinjoin) · [JoinMarket](/glossary/joinmarket) · [混币服务（Mixing Service）](/glossary/mixing-service) · [Wasabi Wallet](/glossary/wasabi-wallet) · [Whirlpool / Samourai Wallet](/glossary/whirlpool-samourai)
