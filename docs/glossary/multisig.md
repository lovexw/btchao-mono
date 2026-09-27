---
title: 多签（Multisig）
---

# 多签（Multisig）

> **一句话定义：** 花费需要多个签名的钱包配置：没有任何单一密钥（或持钥者）能独自动用资金。

多签是一种钱包结构：输出要被花费，不是一把签名就够，而是需要多把。脚本里写明「N 个共签人中必须有 M 人签名」——比如你有 3 把共签钥匙（N=3），规定任意 2 把签名即可花费（M=2）。这就是经典的 [2-of-3](/glossary/m-n)。

多签解决的是普通单签钱包的**单点故障**问题。只有一颗种子时，谁捡到或复制了它，谁就能把你搬空。而 2-of-3 多签分散在三处地点或三台设备上，攻击者必须同时拿下两把钥匙——门槛高得多。

常见用法：

- **2-of-3 个人托管。** 一把钥匙放在家里的硬件钱包，一把存在银行保险柜或托管服务，一把交给信任的家人。丢掉任何一把照样能花；被偷走一把，小偷照样花不了。这是较大家庭储蓄的甜点位。
- **3-of-5 机构级。** 公司金库和大型托管方的标准配置：丢两把还能花，花一次要凑齐三把，通常搭配硬件安全模块（HSM）。
- **2-of-2 闪电通道。** 每条[闪电网络](/glossary/lightning-network)通道在链上就是你和通道对手方之间的一个 2-of-2 多签输出。多数用户从不直接看到它——协议只是在底层用多签锁住通道资金。

比特币在链上表达多签有两条路：

- **经典多签**（`OP_CHECKMULTISIG`，Taproot 之前）。包在 [P2SH](/glossary/p2sh) 或 P2WSH 里。花费时脚本会暴露在链上，旁观者能看出「这是一笔 2-of-3 花费」。受操作码限制，最多 15 个共签人。
- **Taproot 多签**（2021 年之后）。要么走脚本路径（MAST 树，可容纳远多于 15 个共签人），要么用 MuSig2 / FROST 做[密钥聚合](/glossary/key-aggregation)——这时整笔花费看起来和单签 Taproot 输出一模一样，旁观者根本无法分辨这是多签。隐私和手续费双双受益。

签名流程靠 [PSBT](/glossary/psbt)：一位共签人构造交易、签上自己的部分，传给下一位追加签名，如此接力直到凑齐门限。配合硬件钱包和 Sparrow、Nunchuk、Specter 这类协作工具，流程已经相当顺手——只是比单签多几道工序。

什么时候该上多签：**当资金规模配得上这套操作复杂度的时候。** 余额不大时，一台备份妥当的单签硬件钱包，反而比一套你会手忙脚乱的多签更安全。对那些「丢不起、也不天天动」的资产，多签才是正确答案。

**相关词条：** [M-of-N 多签](/glossary/m-n) · [PSBT](/glossary/psbt) · [密钥聚合](/glossary/key-aggregation) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [分层多签](/glossary/hierarchical-multisig) · [K-of-K 多签](/glossary/k-k-multisig) · [HDM（多签 HD 钱包）](/glossary/hdm-multi-signature-hd-wallet) · [部分签名](/glossary/partial-signature) · [Shamir 秘密共享](/glossary/shamir-secret-sharing)
