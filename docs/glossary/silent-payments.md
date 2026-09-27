---
title: 静默支付（Silent Payments）
---

# 静默支付（Silent Payments）

> **一句话定义：** BIP-352 方案：收款方只公布一个可复用支付码，每笔支付都落到全新的链上地址。无需通知交易、无需交互、无地址复用；代价是收款方要扫描链条。

静默支付解决的是比特币的一个老问题：如何公布一个永久收款地址，又不让每笔付款都堆在同一个公开的坑里。捐赠页、账单页脚、个人主页链接，一直以来都意味着[地址复用](/glossary/address-reuse)，而地址复用等于把完整历史一次性拱手送给[链上分析](/glossary/chain-analysis)机构。[BIP-352](https://github.com/bitcoin/bips/blob/master/bip-0352.mediawiki) 在钱包层面修复了它，不改动比特币的任何规则。

收款方公布一个静默支付地址——一个以 `sp1q` 开头、编码两把公钥（一把扫描用、一把花费用）的字符串。付款方把收款方的扫描密钥与自己交易输入背后的私钥组合出共享密钥，再用这个密钥把收款方的花费密钥调谐成一个全新的 [Taproot](/glossary/taproot) 输出——只有收款方能认出来，也只有收款方能花。在链上，它就是一个普通的单次使用 Taproot 地址。公布的 `sp1q` 码不出现任何地方，两笔付给同一个码的支付之间，观察者看不到任何共同点。

与同一构想的早期尝试相比，新意有两处。[BIP 47 支付码](/glossary/bip-47-payment-codes)需要一笔一次性的链上通知交易来宣告双方关系；更早的[隐形地址](/glossary/stealth-address)设计需要在交易里附带额外数据。静默支付两者都不需要——共享密钥取自付款方本来就为花输入而公开的密钥。这也意味着付款方不能使用密钥不公开的输入来参与此方案，所以 BIP 里明确列出了符合条件的输入类型。

代价在收款方。没有地址可查，收款钱包就得把每笔带合格输入与 Taproot 输出的交易拿来对着自己的扫描密钥核一遍。[全节点](/glossary/full-node)做起来毫无压力；轻钱包则做不到，得靠索引服务器——这正是轻客户端支持要等 BIP-375（经 PSBT 发送）与 BIP-392（描述符配套）等伴生提案在 2025 到 2026 年间落地的原因。

这个想法 2022 年 3 月在 bitcoin-dev 邮件列表上提出，经 josibake 与 Ruben Somsen 打磨成 BIP-352，2024 年 5 月合入 BIPs 仓库。钱包支持随后两年陆续到位：2024 年率先落地在一款硬件签名器上，随后在 2025 与 2026 年进入桌面和移动钱包，libsecp256k1 也在 2026 年发布了静默支付模块。截至 2026 年，它是比特币对「可复用地址」问题最实用的回答，也是唯一不需要双方交互的方案。

静默支付在整套防御中的位置，见[比特币隐私专题](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [地址聚类（Address Clustering）](/glossary/address-clustering) · [地址复用（Address Reuse）](/glossary/address-reuse) · [BIP 47（支付码）](/glossary/bip-47-payment-codes) · [链上分析（Chain Analysis）](/glossary/chain-analysis) · [可替代性（Fungibility）](/glossary/fungibility) · [PayJoin（协作支付）](/glossary/payjoin) · [隐形地址（Stealth Address）](/glossary/stealth-address) · [Taproot](/glossary/taproot)
