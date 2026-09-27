---
title: 支付点（Payment Point）
---

# 支付点（Payment Point）

> **一句话定义：** 闪电网络概念：由支付秘密哈希原像派生的公钥；收款方须揭示该原像才能取走资金。

支付点（Payment Point）是闪电支付秘密的公钥形式，用在 PTLC（Point Time-Locked Contract，点时间锁合约）支付路由中，取代原像哈希作为密码学锚点。

经典闪电网络构造使用 [HTLC](/glossary/htlc-hashed-time-locked-contract)：每一跳的资金都可以通过揭示某个原像 `r`（满足 `SHA256(r) = h`）来认领。哈希 `h` 在整条路由上完全相同，因此只要网络观察者在某一跳看到原像被揭示，就能把它与其他跳的揭示关联起来，把整条路径串起来。PTLC 解决的就是这个问题。

PTLC 使用支付点 `P = r * G`（`G` 是曲线生成元）。发送方这样构造路由：每一跳看到的都是不同的移位点（`P + t_i * G`，`t_i` 为该跳的位移量）。最终收款方揭示 `r`（即 `P` 的离散对数）；每个转发跳减去自己的位移量，用得到的标量认领自己入向的 HTLC。每一跳在曲线上看到的点都不同，外部观察者就算跨跳比对也一无所获。

PTLC 落地后能解锁什么：

- **更强的路由隐私。** 观察者再也不能通过共享的支付哈希轻易串联各跳。
- **异步/自发支付**（类似 keysend）且性质更好。
- **无可关联性的多路径支付（AMP）。** 每条路径用不同的点，观察者看不出这些部分属于同一笔支付。
- **无状态发票**及其他建立在这个更灵活密码学原语上的高级构造。

它的依赖是 Schnorr 签名（BIP 340），Taproot 已于 2021 年部署。PTLC 的机制已经设计并规范完毕，但闪电网络的生产实现仍在推进中。截至 2026 年，大多数真实的闪电支付仍走 HTLC。PTLC 正在路上。

**相关词条：** [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [Sphinx（闪电网络）](/glossary/lightning-sphinx) · [Schnorr 签名（Schnorr Signature）](/glossary/schnorr-signature) · [Taproot](/glossary/taproot)
