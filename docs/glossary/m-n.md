---
title: M-of-N 多签
---

# M-of-N 多签

> **一句话定义：** 门限多签的标准记法：N 个签名者中凑齐 M 个签名即可花费（如 2-of-3）。

M-of-N 是门限多签的标准速记：N 个共签人中任意 M 个签名即可花费。这两个数字分别调节两个独立的旋钮：

- M 是安全门限。M 越大，需要同意的共签人越多，越难被偷。
- N − M 是冗余。钱包最多能承受 N − M 个共签人丢失而不失去访问权。

常见配置：

- **2-of-3：** 个人托管的黄金比例。一把钥匙在自己手上，一把在可信的备份地点，一把在第三方（律师、朋友、托管服务）那里。丢任何一把都无所谓；贼偷到一把花不掉，偷到两把才能花。
- **3-of-5：** 机构默认配置。丢两把不碍事，花费要三把。企业金库的标准做法。
- **4-of-7 或更高：** 大型联盟与高风险托管。Liquid 的 functionary 组就是 11-of-15。

经典的比特币多签（Taproot 之前，P2SH 或 P2WSH）因 `OP_CHECKMULTISIG` 操作码的设计，共签人上限是 15。Taproot 的脚本路径花费配合 MAST 树可以高得多；Taproot 的密钥路径花费配合 MuSig2 / FROST 聚合，则让 M-of-N 结构在链上完全隐形。

正确的选择很少是「签名者越多越好」。每个共签人都是一个真实的人或设备，也各自是一种失败模式：设备丢失、人去世、口令遗忘、签名时的沟通失误。大多数个人用户用 2-of-3 就比任何花哨配置都更稳妥。机构设置通常落在 3-of-5，除非有合规理由要更高。

**相关词条：** [PSBT（部分签名比特币交易）](/glossary/psbt) · [比特币金库（Bitcoin Vault）](/glossary/bitcoin-vault) · [忠实保证金（Fidelity Bond）](/glossary/fidelity-bond) · [绿地址（Green Address）](/glossary/green-address) · [HDM 多签名 HD 钱包](/glossary/hdm-multi-signature-hd-wallet) · [分层多签（Hierarchical Multisig）](/glossary/hierarchical-multisig) · [交互式多签（Interactive Multi-Sig）](/glossary/interactive-multi-sig) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [法定人数签名（Quorum Signatures）](/glossary/quorum-signatures)
