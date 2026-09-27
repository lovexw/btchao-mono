---
title: 公钥（Public Key）
---

# 公钥（Public Key）

> **一句话定义：** 由私钥经椭圆曲线乘法派生：用于验证签名或生成比特币地址。

机制：比特币使用 secp256k1 椭圆曲线。把曲线生成点 G 乘以你的私钥 k，得到点 P = k·G——这个点（压缩编码为 33 字节）就是你的公钥。从 k 到 P 方向计算很便宜；从 P 反推 k 则要求解椭圆曲线离散对数问题，计算上不可行——支撑现代互联网绝大多数密码学的，正是同一种不可行性。

公钥的两个用途：

- **验证签名。** 你花 BTC 时，钱包用私钥对交易签名。任何人——包括每个节点——都能用你的公钥验证这个签名，却无法得知你的私钥。这就是比特币执行「只有合法所有者能花」的方式。
- **生成[地址](/glossary/address)。** 多数比特币地址类型由公钥哈希派生（SHA-256 加 RIPEMD-160，较新的格式只用 SHA-256）。公开分享的通常是哈希；公钥本身只在你花费时才揭示。

为什么要把公钥哈希成地址，而不直接分享公钥？两个理由。第一，地址短得多、更好处理。第二，哈希增加一层防御：万一椭圆曲线密码学被攻破（例如足够强大的量子计算机运行 [Shor 算法](/glossary/shors-algorithm)），只要公钥从未揭示过，未花费地址上的资金依然安全。复用过或已花费过的地址暴露更多。迁移框架见[后量子比特币](/glossary/post-quantum-bitcoin)。

私钥与公钥之间的不对称——一个方向便宜、另一个方向不可能——是比特币中一切「密码学所有权」的地基。

**相关词条：** [私钥](/glossary/private-key) · [地址](/glossary/address) · [椭圆曲线](/glossary/elliptic-curve) · [ECDSA](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [Schnorr 签名](/glossary/schnorr-signature) · [Xpub 扩展公钥](/glossary/xpub-extended-public-key)
