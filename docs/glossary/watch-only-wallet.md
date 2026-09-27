---
title: 只读钱包（Watch-Only Wallet）
---

# 只读钱包（Watch-Only Wallet）

> **一句话定义：** 只含公钥或地址的钱包：可监视余额，不能花费。

只读钱包里有[公钥](/glossary/public-key)或[扩展公钥](/glossary/xpub-extended-public-key)，没有[私钥](/glossary/private-key)。它能显示余额、跟踪入账、生成收款地址、构造未签名交易——但不能真正签名或花费。

标准搭配：[硬件钱包](/glossary/hardware-wallet)保管私钥，你把它的 **xpub**（扩展公钥）导入电脑或手机上的只读钱包。只读钱包从这把 xpub 派生出你会用到的每个地址，在链上盯梢，实时呈现钱包状态。要发钱时，只读钱包构造一笔 [PSBT](/glossary/psbt)，递给硬件钱包去签。

这种分工的好处：

- **日常盯盘零暴露。** 手机上看着钱包余额，钥匙却从不在手机里。
- **审计。** 会计、合伙人、审计师可以核对这个钱包的链上活动，而拿不到花钱的权限。
- **多签协作。** 每位共签人都能对共享钱包保持只读视图，真正的钥匙隔离在各自硬件里。
- **验证备份。** 在另一台机器上恢复 xpub，确认地址一一对应——不用暴露种子就能给自己的备份做个体检。

只读钱包的支持面非常广。Sparrow、Electrum、Bitcoin Core、Specter Desktop、Nunchuk、BlueWallet 等都原生处理 xpub。现代自我托管工作流几乎总是「硬件钱包 + 只读桌面或手机伴侣」成对出现——这是「知道余额」和「握有钥匙」之间最干净的切分。

签名端设备见[硬件钱包](/glossary/hardware-wallet)；只读钱包和签名钱包之间怎么传交易，见 [PSBT](/glossary/psbt)。

**相关词条：** [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [托管钱包](/glossary/custodial-wallet) · [确定性钱包](/glossary/deterministic-wallet) · [图形钱包](/glossary/gui-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [安全](/glossary/security) · [钱包](/glossary/wallet) · [钱包导入格式（WIF）](/glossary/wallet-import-format-wif)
