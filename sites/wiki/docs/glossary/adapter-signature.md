---
title: 适配器签名（Adapter Signature）
---

# 适配器签名（Adapter Signature）

> **一句话定义：** 一种密码学机制：部分签名在完成后会揭示一个秘密，常用于原子交换或高级闪电功能。

适配器签名是一种 Schnorr 签名原语：签名的有效性被绑定在「额外一个秘密的揭示」上。双方持有一份「预签名」，它离有效签名只差一个标量。想使用它的一方必须补上这个标量，而补全签名这个动作本身，会把该标量公布给所有盯着链的人。

让这件事有用的巧妙之处在于：它把「只要你签名，你就泄露一个秘密」和「只要你泄露秘密，你就能补全签名」变成了同一个数学事件。两条链上的两笔交易可以绑在一起——完成其中一笔，必然泄露能补全另一笔的秘密。

这解锁了什么：

- **跨链原子交换**，不再需要 [HTLC](/glossary/htlc-hashed-time-locked-contract)。两笔交易看起来都是普通的单签花费；任何一条链上都看不到哈希原像承诺。隐私和成本同时改善。
- **谨慎日志合约（DLC）。** 预言机发布适配器签名形状的证明；预言机的签名一落地，合约对手方的预签名就自动解锁。
- **闪电网络 PTLC。** 点时间锁合约（PTLC）用适配器签名取代 HTLC 的哈希原像，修掉了跨跳关联问题——观察者由此无法再串联闪电路由路径。
- **无脚本脚本。** 更宏大的研究方向：把合约逻辑从比特币脚本搬进适配器签名的数学里，让链上交易与普通花费无法区分。

这套机制是 Schnorr 专属的——成立的前提是 Schnorr 签名对私钥呈线性，同一套代数让适配器构造干净地嵌进去。ECDSA 也有类似构造（ECDSA 适配器签名存在），但数学要脏得多。

到 2026 年，适配器签名大多仍处于研究阶段，跨链交换协议和闪电 PTLC 的落地是活跃方向。密码学原语已被充分理解，生产钱包中的部署正在逐步推进。

**相关词条：** [比特币脚本](/glossary/bitcoin-script) · [ECDSA（椭圆曲线数字签名算法）](/glossary/ecdsa-elliptic-curve-digital-signature-algorithm) · [MAST（默克尔化抽象语法树）](/glossary/merkleized-abstract-syntax-tree-mast) · [无脚本脚本](/glossary/scriptless-scripts) · [Schnorr 签名](/glossary/schnorr-signature) · [签名聚合](/glossary/signature-aggregation) · [签名裁剪](/glossary/signature-clipping)
