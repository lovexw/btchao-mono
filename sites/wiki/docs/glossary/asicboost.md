---
title: ASICBoost
---

# ASICBoost

> **一句话定义：** 一种挖矿优化技术：削减部分 SHA-256 计算，降低能耗、提升效率。

ASICBoost 是一种挖矿效率优化，利用 SHA-256 结构上的一个特点跳过部分冗余计算，在 [ASIC](/glossary/asic-application-specific-integrated-circuit) 基线性能之上再获得约 15–20% 的能效。有两种变体：

- **显式 ASICBoost（Overt ASICBoost）。** 操作区块头的版本字段，寻找能在 SHA-256 中间态计算中共享状态的碰撞。链上可见，不需要任何协议层面的花招。
- **隐式 ASICBoost（Covert ASICBoost）。** 通过重排交易操作默克尔根，达到同样的中间态碰撞效果。链上不可直接见。它与 [SegWit](/glossary/segwit-segregated-witness-bip-141) 著名地不兼容——SegWit 重构了默克尔根的计算方式。

隐式变体在 2017 年 [SegWit](/glossary/segwit-segregated-witness-bip-141) 激活僵局期间成为政治爆点。Greg Maxwell 公开指出：一些主要矿机（尤其是当时某一特定厂商的产品）疑似使用隐式 ASICBoost，而该厂商对 SegWit 的抵制可能部分源于 SegWit 与这一优化不兼容。指控被否认；但时间线耐人寻味。

这段插曲抛出了一个问题：谁在获得隐藏的效率优势，网络知不知道？大体的答案是「是的，这事在发生」——进而引发了是否应在未来协议变更中刻意禁用隐式 ASICBoost 的讨论。

今天（2026 年），现代矿机 ASIC 已普遍把显式 ASICBoost 作为标配做进固件。它不再是秘密优势，而是入场券。故事如今主要是历史，但它是一个有用的案例研究：硬件级优化可以怎样与共识级决策发生微妙的相互作用。

**相关词条：** [ASIC（专用集成电路）](/glossary/asic-application-specific-integrated-circuit) · [抗 ASIC（ASIC Resistance）](/glossary/asic-resistance) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [挖矿软件（Mining Software）](/glossary/mining-software)
