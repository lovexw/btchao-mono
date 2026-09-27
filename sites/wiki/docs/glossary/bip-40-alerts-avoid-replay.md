---
title: BIP 40（警报防重放）
---

# BIP 40（警报防重放）

> **一句话定义：** 处理旧警报消息的重放问题，属于已弃用的比特币警报系统。

BIP 40 是打在比特币旧警报系统上的一行补丁：防止陈旧的警报消息被重放。整个警报系统后来已被整个移除，BIP 40 等于退休了两次。

警报机制允许少数早期开发者用一把主密钥签发全网络可见的警告。到 2016 年，一把签名密钥把守一条紧急通道这种设计的中心化风险已经很明显——即便持有人可信，密钥本身就是靶子，而且没有干净的办法轮换。Bitcoin Core 在 0.12.1（2016 年 4 月）弃用警报，0.13（2016 年 8 月）彻底移除，随后警报私钥被刻意公开，让任何人都无法恶意复活这套系统。

规范：[BIP-40](https://github.com/bitcoin/bips/blob/master/bip-0040.mediawiki)。今天，等价的功能（紧急运营信号）活在邮件列表、IRC 和 bitcoin-dev / bitcoin-core-dev 社区频道里——去中心化、慢、且无法被悄悄捕获。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 37](/glossary/bip-37) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [节点（Node）](/glossary/node) · [节点同步（Node Synchronization）](/glossary/node-synchronization)
