---
title: Wasabi Wallet
---

# Wasabi Wallet

> **一句话定义：** 内置 CoinJoin 的开源桌面比特币钱包。其公司制协调器在 Samourai 被捕后于 2024 年 6 月主动关停；钱包本身存活，现经由独立的第三方协调器混币。

Wasabi 是一款开源、非托管的桌面钱包，标志性功能是内置 [CoinJoin](/glossary/coinjoin)。它由一家叫 zkSNACKs 的公司开发，2018 年首发。2022 年 6 月的 2.0 版让混币自动化，并换用 WabiSabi 协议——这是一块实打实的密码学工程：中心化协调器用盲凭证组织可变金额的 CoinJoin，能在完全不知道哪些输入和输出属于同一个人的情况下把交易拼起来。协调器从不过手资金，也偷不走。

两场争议定义了 Wasabi 的历史。2022 年 3 月，zkSNACKs 宣布其协调器开始拒绝被一家[链上分析](/glossary/chain-analysis)机构标记的币。一个隐私工具花钱请监控公司筛查自己的用户——说得客气点，这很难让人接受，竞争对手 [Samourai](/glossary/whirlpool-samourai) 把这一点往死里打。公允地说，筛查只作用于 zkSNACKs 自家的协调器，不涉及协议本身，而且钱包的架构决定了公司仍然认不出用户。但这终究是协调器层面的门槛审查，也预示了两年后终结协调器的法律风险。

2024 年 4 月，美国逮捕了 Samourai Wallet 的创始人，把他们的非托管 CoinJoin 服务按「无照资金传输」论处。几天内 zkSNACKs 封锁了美国用户；5 月 2 日宣布彻底退出协调业务；6 月 1 日协调器下线。这次关停是主动的、预防性的。zkSNACKs 从未被逮捕、起诉或制裁。它看了眼法律的风向，撤了。

人们习惯性地说「Wasabi 关了」。并没有。钱包软件一直在跑，开发移交给了开源社区组织，就在那个 6 月，应用加入了协调器选择功能——用户可以指向任何独立运营的 WabiSabi 协调器（通过 Nostr 中继发现，任何人都能自己跑一个，协调器本身就是开源的）。后续版本加固了客户端对恶意协调器的防御，到 2026 年已移除最后一批 zkSNACKs 时代的服务器依赖。zkSNACKs 退场了；钱包和协议没有。

整段 2024 年的故事以及 CoinJoin 的现状，见深度专题《[比特币隐私](/rabbit-holes/bitcoin-privacy)》。

**相关词条：** [CoinJoin](/glossary/coinjoin) · [Whirlpool / Samourai Wallet](/glossary/whirlpool-samourai) · [JoinMarket](/glossary/joinmarket) · [Joinstr](/glossary/joinstr) · [链上分析](/glossary/chain-analysis) · [硬币控制](/glossary/coin-control)
