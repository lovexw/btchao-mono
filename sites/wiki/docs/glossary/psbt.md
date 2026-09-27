---
title: PSBT（部分签名比特币交易）
---

# PSBT（部分签名比特币交易）

> **一句话定义：** BIP 174 标准格式：在多设备或多个共同签名方之间传递一笔尚未完全签名的交易，而不暴露私钥。让现代自我托管真正可用的流程标准。

PSBT（**P**artially **S**igned **B**itcoin **T**ransaction，部分签名比特币交易）是一个标准化格式（[BIP-174](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki)，由 Andrew Chow 起草，2018 年随 Bitcoin Core 0.17 合并），用于在多台设备或多个共同签名方之间传递一笔尚未完全签名的交易。它就是让现代自我托管真正可用的那套流程标准。

PSBT 解决的问题：在任何不平凡的签名设置里，通常有一台设备*了解钱包状态*（有哪些 UTXO、哪些地址是你的）但没有[私钥](/glossary/private-key)，另有一台设备*持有密钥*但不了解钱包状态。这笔「未签名但被完整描述的」交易就是必须在两者之间往返传递的载体。

## 格式

一个 PSBT 是单个二进制数据块（通常编码为 base64 字符串），按输入、按输出分区，外加全局区。它承载：

- 未签名的交易骨架
- 每个输入的 UTXO 数据（让签名方能独立核对金额）
- 每个输入的派生路径与公钥
- 各共同签名方陆续添加的部分签名
- BIP 32 主密钥指纹

## 典型 PSBT 流程

1. **协调方**（Sparrow、Bitcoin Core、Specter、Nunchuk 等）构造[交易](/glossary/transaction)：选 UTXO、设定收款方与金额、算手续费。把结果导出为 PSBT——二进制文件或 base64 字符串。
2. **签名方**（通常是[硬件钱包](/glossary/hardware-wallet)）通过 USB、microSD、二维码或 NFC 接收 PSBT。签名方在自己的可信屏幕上显示交易详情，用户核对，签名方签名并返回更新后的 PSBT。
3. **如果是多签**，在每个共同签名方之间重复第 2 步。每方把自己的部分签名加进相应输入区，然后传下去。
4. **协调方**在签名满足每个输入的脚本后，把 PSBT 定形为完整交易并广播。

## 为什么重要

- **隔空签名成为可能。** 永不接 USB 线的硬件钱包可以通过二维码签名。助记词永不接触联网设备。
- **多签可移植。** 共同签名方可以是不同硬件厂商、不同软件、不同司法辖区，仍能通过标准化文件格式协作。
- **密钥不跨设备复用。** 每个签名方把密钥留在本地；跨越边界的只有部分签名。

## PSBT v2

PSBT v2（BIP 370 / BIP 371）增加了更完整的 [Taproot](/glossary/taproot) 支持，并允许在 PSBT 创建后修改输入与输出集合。现代工具（Sparrow、Specter、Nunchuk、BlueWallet、Bitcoin Core 及各大硬件钱包）原生支持 v2。

PSBT 是严肃自我托管的幕后基础设施。如果你的钱包栈使用硬件设备或多签，它几乎必然在底层使用 PSBT。

**相关词条：** [硬件钱包（Hardware Wallet）](/glossary/hardware-wallet) · [分层多签（Hierarchical Multisig）](/glossary/hierarchical-multisig) · [交互式多签（Interactive Multi-Sig）](/glossary/interactive-multi-sig) · [MuSig2](/glossary/musig2) · [部分签名（Partial Signature）](/glossary/partial-signature) · [多签（Multisig）](/glossary/multisig) · [交易（Transaction）](/glossary/transaction) · [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal)
