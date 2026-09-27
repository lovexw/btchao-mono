---
title: Grover 算法（Grover's Algorithm）
---

# Grover 算法（Grover's Algorithm）

> **一句话定义：** 把 SHA-256 有效安全强度减半的量子算法——是削弱，不是攻破；比特币的哈希根基照常成立。

Grover 算法由 Lov Grover 于 1996 年发表，为非结构化搜索问题提供平方级加速。对比特币，它削弱 [SHA-256](/glossary/hash)、小幅加快挖矿，但两者都攻不破。它是比特币两大量子威胁暴露中较轻的那个——不构成生存风险的那个。

## 它做什么

经典计算机在一个 N 种可能性的非结构化空间里搜索，平均需要 O(N) 时间。Grover 把它降到量子计算机上的 O(√N)。

对比特币：

- 经典暴力破解 256 位哈希需要约 2^256 次运算。实际不可能。
- 在 Grover 之下，同一任务约需 2^128 次运算。仍然极其庞大——远超实际攻击范围。

有效安全强度在指数上减半：256 位变 128 位。这是剪个头发，不是上断头台。128 位对称安全强度是密码学体系的标准底线，依然稳稳处于实际攻击范围之外。

## 为什么这不是生存问题

比特币对 SHA-256 的两大使用：

- **[工作量证明挖矿](/glossary/proof-work-pow)。** 矿工搜索哈希低于目标值的 nonce。Grover 给出 √N 的加速——意味着量子矿工可以比经典矿工快一个随难度变化的倍数找到区块。
- **地址派生**（配合 RIPEMD-160）。[P2PKH](/glossary/p2pkh-pay-public-key-hash) 和 [P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash) 地址是公钥的哈希。逆推哈希还原公钥需要 Grover 级别的工作量——有效安全仍有约 2^128。

关键在于：Grover 攻不破 2100 万的供应上限，制造不了双花，也瓦解不了工作量证明这个共识机制。量子硬件若真有朝一日具备竞争力，挖矿经济学会有所偏移，但系统照常运转。

## 对挖矿的影响

Aggarwal 等人（2017 年）分析了量子加速对比特币挖矿的影响，结论是工作量证明在数十年尺度上*「相对能抵抗量子计算机的实质性加速」*。理由：

- Grover 的加速是平方根级，不是指数级。量子矿工的优势有意义但不压倒。
- 挖矿是迭代式、带宽受限的。为 Grover 优化的量子硬件跑不到现代 ASIC 的时钟速度。
- 硬件专业化是移动靶。经典 ASIC 的进步与量子硬件的发展都算数。

可能的长期结局：量子挖矿若成真，[难度](/glossary/difficulty)上调对冲。系统在不崩溃的前提下达到新均衡。

## 对地址的影响

对哈希型地址，Grover 实际把抗原像攻击的安全参数减半：

- P2PKH / P2WPKH：约 160 位哈希输出（经 RIPEMD-160）。Grover 把有效原像安全降到约 80 位——今天仍在实际攻击范围之外，但不再大到无所谓。
- 现实主义的攻击剧本假设 [Shor 算法](/glossary/shors-algorithm)已经先能对付暴露的公钥；Grover 只是对哈希地址的辅助工具，不是主要威胁。

Grover 是那个允许比特币保住哈希函数的量子威胁；Shor 才是逼着重写签名方案的那个。

为什么弱环节在签名而不在哈希，见[量子与比特币专题](/rabbit-holes/quantum-and-bitcoin)。

**相关词条：** [后量子比特币（Post-Quantum Bitcoin）](/glossary/post-quantum-bitcoin) · [Shor 算法（Shor's Algorithm）](/glossary/shors-algorithm) · [CRQC（密码学相关量子计算机）](/glossary/crqc-cryptographically-relevant-quantum-computer) · [哈希（Hash）](/glossary/hash) · [工作量证明（PoW）](/glossary/proof-work-pow) · [P2PKH](/glossary/p2pkh-pay-public-key-hash) · [P2WPKH](/glossary/p2wpkh-pay-witness-public-key-hash) · [难度（Difficulty）](/glossary/difficulty)
