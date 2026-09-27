---
title: 单一签名（Mono-Signature）
---

# 单一签名（Mono-Signature）

> **一句话定义：** 一把 ECDSA 或 Schnorr 签名控制一个输出——典型的单签场景，与多签相对。

「单一签名」（mono-signature）是个不太常见的说法，多数人直接叫它「单签」：一把私钥、一个签名、控制一个输出。这是比特币默认的花费方式。

今天链上的绝大多数比特币交易都是单签。其余的使用经典[多签](/glossary/multisig)或聚合方案，用于更高安全等级的托管（金库、交易所冷存储、国库），或出于协议原因（闪电通道在底层技术上是 2-of-2 多签，但现在多数 2-of-2 输出已改为 Taproot 钥匙路径花费——看起来就是单签）。

Schnorr（Taproot）单签签名固定 64 字节；ECDSA 单签签名经 [Low-R](/glossary/low-r-signatures) 磨优后是 71–72 字节。两者都凭一把私钥授权花费，在链上都表现为一个签名，安全画像都是同一个单点故障。

取舍一目了然：一把钥匙，一个故障点。丢了钥匙访问权（种子丢失、硬盘报废、没有备份），币就没了。钥匙被攻破（恶意软件、钱包供应链攻击、种子随手乱放），币就被偷了。多签和聚合签名把风险分散到多把钥匙或多台设备上，代价是操作复杂度。

对多数用户而言，一台硬件钱包（单签）加一份认真核验过的种子备份，远比你实际会正确执行的任何复杂方案都安全。多签只有在你愿意认真用它的前提下，才算真正的升级。

**相关词条：** [交互式多签](/glossary/interactive-multi-sig) · [M-of-N 多签](/glossary/m-n) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [法定人数签名](/glossary/quorum-signatures) · [Schnorr 签名](/glossary/schnorr-signature) · [签名聚合](/glossary/signature-aggregation) · [签名裁剪](/glossary/signature-clipping) · [多签](/glossary/multisig) · [硬件钱包](/glossary/hardware-wallet)
