---
title: 屏蔽 CoinJoin（Shielded CoinJoin）
---

# 屏蔽 CoinJoin（Shielded CoinJoin）

> **一句话定义：** 把 CoinJoin 与零知识证明结合、进一步模糊交易细节的设想或未来方向。

「屏蔽 CoinJoin」是一种处于设想/研究阶段的隐私增强方案：把 [CoinJoin](/glossary/coinjoin) 的多方混币与零知识密码学结合起来，隐藏普通 CoinJoin 依然会泄露的**金额**和**归属模式**。

动机何在：普通 CoinJoin 通过把多个用户的输入混进一笔等额输出的交易，打破了共同输入启发式。但链上分析方依然能看到：

- **哪些 UTXO 进了混币。** 链上公开。
- **哪些等额输出出来了。** 链上公开。
- **启发式规律。** 协调器元数据、时间规律、不均匀的金额、混币之后的「剥离链」行为。

这些泄露让高水平分析方能以概率方式对相当一部分 CoinJoin 参与者去匿名化。屏蔽 CoinJoin 的思路，是用密码学承诺替换公开的输入输出金额，隐藏**哪一份等额份额对应哪位参与者**。

正在研究的实现路径：

- **机密交易（Confidential Transactions）**（Greg Maxwell、Andrew Poelstra）——同态承诺隐藏交易金额，同时仍让节点验证没有增发。已在 [Liquid 网络](/glossary/liquid-network)使用，上比特币主网则需要软分叉。
- **Bulletproofs**——高效零知识范围证明，比朴素的 zk-SNARK 方案更便宜地实现机密 CoinJoin。
- **MimbleWimble 式聚合**——用数学方式合并交易数据，让单个金额与参与方不可观察。

这些目前都不在比特币协议里。屏蔽 CoinJoin 更像研究方向，而非近期路线图项目。2024 年各大 CoinJoin 协调器（Wasabi、Whirlpool）相继关停后，隐私讨论的重心转向了 [PayJoin](/glossary/payjoin)、[静默支付](/glossary/silent-payments)这类去中心化替代方案，而不是更精巧的混币设计。

当前一代技术见 [CoinJoin](/glossary/coinjoin)；这件事为何重要见[可替代性](/glossary/fungibility)。

**相关词条：** [CoinJoin（协作交易混币）](/glossary/coinjoin) · [可替代性（Fungibility）](/glossary/fungibility) · [混币服务（Mixing Service）](/glossary/mixing-service) · [PayJoin（协作支付）](/glossary/payjoin) · [隐形地址（Stealth Address）](/glossary/stealth-address)
