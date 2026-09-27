---
title: Schnorr 签名
---

# Schnorr 签名

> **一句话定义：** 随 Taproot 引入的更高效签名方案：支持密钥与签名聚合，隐私更好、费用更低。

Schnorr 签名是比特币的现代签名方案，2021 年 11 月随 [Taproot](/glossary/taproot) 经 BIP 340 激活。所有使用 Taproot 地址（以 `bc1p` 开头）的输出，签名都用它取代 [ECDSA](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm)。

Schnorr 带来了 ECDSA 给不了的东西：

- **线性性。** Schnorr 签名在数学上对私钥呈线性：两个有效签名之和，仍是「对应公钥之和」的有效签名。听着抽象，但它解锁了[签名聚合](/glossary/signature-aggregation)——这是最大的实际收益。
- **跨联署人的单签名聚合。** Schnorr 下的 5-of-5 多签（经 MuSig2 协议）在链上就是一个签名——与单签花费无法区分。过去的 5-of-5 要上五个签名、整块链都看得出是多签；现在看起来就像一个人在花钱。隐私和空间双赢。
- **更小的签名。** Schnorr 签名 64 字节，ECDSA 是 70–72 字节浮动。省区块空间，省手续费。
- **更干净的可证明安全性。** 在标准假设下 Schnorr 的安全证明比 ECDSA 更紧，密码学家看了高兴。
- **无延展性。** 对给定钥匙和消息，Schnorr 签名是唯一的——困扰 ECDSA 的延展性问题不复存在。

生产级 Schnorr 实现——首推比特币的 libsecp256k1——在签名路径上同样需要严格的[常数时间](/glossary/constant-time)纪律，防止通过时序或缓存访问侧信道泄露密钥材料。数学是干净的；在真实硬件上守住它，是另一门工程学科。

比特币当初没用 Schnorr 的原因：中本聪设计比特币时它还在专利期内。专利 2008 年（白皮书发布后不久）到期，社区又花了十多年才设计、评审并稳妥部署。等待是值得的——Schnorr 现在被认为是生产密码学中最干净的签名方案之一。

Schnorr 继承了 ECDSA 的椭圆曲线离散对数假设，也就继承了它的量子脆弱性。足够强大的量子计算机跑 [Shor 算法](/glossary/shors-algorithm)能把两个方案一起击穿。迁移框架见[后量子比特币](/glossary/post-quantum-bitcoin)。

线性性带来什么，见[签名聚合](/glossary/signature-aggregation)；把 Schnorr 带进比特币的软分叉，见 [Taproot](/glossary/taproot)。

**相关词条：** [Taproot](/glossary/taproot) · [BIP 342（Tapscript）](/glossary/bip-342-tapscript) · [常数时间实现](/glossary/constant-time) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [椭圆曲线](/glossary/elliptic-curve) · [单一签名](/glossary/mono-signature) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [后量子比特币](/glossary/post-quantum-bitcoin) · [PSBT（部分签名比特币交易）](/glossary/psbt) · [Shor 算法](/glossary/shors-algorithm) · [签名聚合](/glossary/signature-aggregation) · [签名裁剪](/glossary/signature-clipping)
