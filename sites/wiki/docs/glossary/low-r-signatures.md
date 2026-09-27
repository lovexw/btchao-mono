---
title: Low-R 签名
---

# Low-R 签名

> **一句话定义：** ECDSA 优化：使用最小的 R 分量，缩小签名总体大小、降低手续费。

ECDSA 签名有两个分量：R 和 S。R 由每次签名的临时数（nonce）推导而来，得到的字节大致均匀分布：约有一半的概率 R 的最高位是 1，此时按 DER 正整数编码就需要在前面多垫一个零字节。

Low-R 签名就是「磨」：签名者连续尝试一组确定性的临时数（RFC 6979 派生），直到产出一个最高位为 0 的 R，省下一个字节。平均两次尝试就能找到一个，偶尔要磨更多轮。产出的签名在密码学上完全等价，唯一的区别是编码长度。

Bitcoin Core 从 0.17（2018 年）开始采用 Low-R 签名，各大钱包相继跟进。全网算下来，每个 ECDSA 签名大约省一个 vbyte——听起来微不足道，乘上每天几百万笔交易就积少成多。对 Taproot/Schnorr 签名这招不适用（Schnorr 签名固定 64 字节），所以这是一项仅限旧式 ECDSA 的优化。

绝大多数用户感知不到它——它就在签名代码里静默发生。

**相关词条：** [BIP 66](/glossary/bip-66) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [Low-S 签名](/glossary/low-s-signatures) · [Schnorr 签名](/glossary/schnorr-signature)
