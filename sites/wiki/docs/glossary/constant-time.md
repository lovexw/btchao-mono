---
title: 常数时间实现（Constant Time）
---

# 常数时间实现（Constant Time）

> **一句话定义：** 密码学代码的纪律：运行时间、内存访问、功耗一律不随秘密数据变化——不给「量你怎么算」来猜「你算了什么」的侧信道留门。

常数时间（constant-time）代码是这样一种密码学工程纪律：运算的运行时间、内存访问模式和功耗不依赖于它所处理的秘密数据。目标：挫败侧信道攻击——对手通过测量操作*如何*运行来推断它*用什么*运行。

为什么这对比特币要紧：

- **ECDSA 和 Schnorr 签名**都涉及秘密标量与曲线点的乘法。朴素的实现在标量零位更多时跑得更快——密钥位就这样从时间侧漏出去。
- **对秘密数据的哈希与 HMAC** 可经缓存访问模式泄露。测 CPU 缓存命中的攻击者有时能重建密钥材料。
- **侧信道是真实的攻击。** 研究者已多次用功耗分析或时序分析，从云上同宿主进程、智能卡甚至智能手机中提取出 RSA、ECDSA、AES 密钥。

承担比特币重量级密码学工作的库是 [libsecp256k1](https://github.com/bitcoin-core/secp256k1)（从 Bitcoin Core 抽出的 C 库）。它经审计与重写以具备常数时间性质：签名路径无论密钥位是什么都执行同样的操作、同样的顺序，相关内存访问保持恒定。

硬件钱包走得更远。Trezor Safe、Foundation Passport、BitBox 的安全元件包含对抗功耗分析的硬件级防护（随机化时序、限流、毛刺检测）。威胁模型假定攻击者会把设备接上示波器。

对用户，这一切不可见——它就是正常工作。对库作者和硬件钱包设计师，常数时间纪律是让「密码学安全」从口号变成真实硅片上可实现之事的承重细节之一。

**相关词条：** [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [椭圆曲线（Elliptic Curve）](/glossary/elliptic-curve) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [私钥（Private Key）](/glossary/private-key) · [Schnorr 签名](/glossary/schnorr-signature)
