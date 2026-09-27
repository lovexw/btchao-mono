---
title: 签名聚合（Signature Aggregation）
---

# 签名聚合（Signature Aggregation）

> **一句话定义：** 把多个部分签名合成一个最终签名（如 MuSig），缩减链上数据足迹。

签名聚合是这样一门技术：把一笔花费的多个联署人收拢成一个组合签名，让链只需用一把组合公钥来验证。链能确认「这个输出被授权花费了」，却不知道是几个人授权的。

这只有靠 [Schnorr 签名](/glossary/schnorr-signature)才实际可行——它的线性数学让部分签名和部分公钥可以被干净地相加。旗舰协议是 **MuSig2**，由 Blockstream 研究者设计的第二代多签方案。

MuSig2 下的 3-of-3 花费是这样运作的：

1. 三个联署人在链下交换公钥份额和「nonce 承诺」。
2. 各自对交易产出一个部分签名。
3. 部分签名被合成一个 Schnorr 签名。
4. 交易带着这唯一的 64 字节签名、对着唯一的聚合公钥广播。

公链看到的：一笔平平无奇的 Taproot 单签花费。三个参与方的痕迹都没有。

收益：

- **更低手续费。** 一个签名占的区块空间比三个少。
- **更好隐私。** 多签设置不再能从链上数据识别出来。每一笔 Taproot 花费都既可能是单签、也可能是多签、还可能是复杂脚本——它们看起来都一样。
- **更好的安全人体工学。** 硬件钱包厂商和托管服务可以提供成本与足迹等同于单签的多签。

麻烦在链下协调：联署人必须按严格的次序交换 nonce 和部分签名（MuSig2 的实现并不简单）。生产级库已经存在（libsecp256k1 的 MuSig2 模块、BDK 等），采用正在增长。

签名聚合是 Taproot 带来的最悄无声息的大胜利之一。基础见 [Taproot](/glossary/taproot) 和 [Schnorr 签名](/glossary/schnorr-signature)。

**相关词条：** [椭圆曲线](/glossary/elliptic-curve) · [单一签名](/glossary/mono-signature) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [Schnorr 签名](/glossary/schnorr-signature) · [签名裁剪](/glossary/signature-clipping) · [Taproot](/glossary/taproot)
