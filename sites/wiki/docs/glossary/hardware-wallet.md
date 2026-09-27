---
title: 硬件钱包（Hardware Wallet）
---

# 硬件钱包（Hardware Wallet）

> **一句话定义：** 离线存储私钥、在安全环境内签署交易的物理设备（如 Ledger、Trezor）。

硬件钱包是一台小小的专用设备，唯一的职责是保存[私钥](/glossary/private-key)和签署[交易](/glossary/transaction)。钥匙在设备内部生成，永不离开。要花钱时，未签名交易送进去，你在设备自带的屏幕上核对收款方和金额，确认后签名交易送出来。你的电脑从头到尾见不到钥匙。

它防的威胁模型：一台被彻底攻破的电脑。如果你的系统里跑着记录每一次击键、读取每一个文件的恶意软件，热钱包的钥匙必死无疑——攻击者想签什么就签什么。有了硬件钱包，恶意软件可以在电脑上给你演一出假的「转给你的朋友」，但真实交易递到硬件设备上时，设备用它那块可信屏幕显示**真正的**收款地址和金额。你看到被调包的地址，拒绝这笔交易，安全。

挑选时看什么：

- **开源固件。** 闭源签名设备要求你凭厂商一张嘴相信设备干的是它说的事。开源固件让整个社区都能审计芯片上跑的代码。多款成熟的开源签名设备随处可见；比特币社区总体上推荐它们而非闭源替代品。
- **比特币专用固件（如果有）。** 多币固件为你永远不会用的功能增加攻击面。代码库越简单，越容易审计。
- **最好支持气隔工作流。** 通过二维码或 microSD 卡签名的设备完全不连电脑——连 USB 都不连——又堵死一类攻击。
- **持续开发、有可信的安全履历。** 硬件钱包漏洞定期被发现和修补；你要的是及时、公开发补丁的厂商。

推荐会过时。与其在这里点名产品，不如搜「开源比特币硬件钱包」，或看看当下专注自我托管的资深比特币人都在用什么。

硬件钱包不是护身符。它生成的[助记词](/glossary/seed-phrase)仍是主备份；谁拿到助记词，谁就不需要这台设备。设备的职责是让钥匙在日常使用中保持离线，而不是替代良好的助记词保管习惯。

超过零花规模的金额，硬件钱包是底线。多台硬件设备组成的多签是上一级台阶。完整演练见学习之旅《[成为自己的银行](/journey/be-your-own-bank)》。

**相关词条：** [气隔](/glossary/air-gapped) · [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [比特币金库](/glossary/bitcoin-vault) · [托管钱包](/glossary/custodial-wallet) · [确定性钱包](/glossary/deterministic-wallet) · [硬件种子金库](/glossary/hardware-seed-vault) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [继承种子备份](/glossary/inheritance-seed-backup) · [密钥生成仪式](/glossary/key-generation-ceremony) · [密钥轮换](/glossary/key-rotation) · [助记词](/glossary/seed-phrase) · [安全](/glossary/security) · [钱包](/glossary/wallet)
