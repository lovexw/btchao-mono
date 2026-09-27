---
title: 密钥擦除（Key Wiping）
---

# 密钥擦除（Key Wiping）

> **一句话定义：** 从内存或存储中安全抹除私钥，使其无法被取证或恶意软件恢复。

密钥擦除指的是：把内存（和持久存储）里的私钥材料彻底覆写，让后续的取证分析、冷启动攻击、事后爬数据的恶意软件都无迹可寻。

在[硬件钱包](/glossary/hardware-wallet)里，这是固件契约的一部分。Trezor、Jade、BitBox、Ledger 这些设备只在需要派生或签名的那一刻解包种子，在一个受约束的内存区域里完成工作，返回前把该区域覆写。恢复出厂设置时，存放种子的整个安全元件或闪存区域会被整体覆写——而不是仅仅标记为已删除。

在通用软件里，图景就乱得多。Bitcoin Core 的钱包加密会在锁定时尽力清空敏感缓冲区，但它跑在一个多任务操作系统上：交换文件、内存压力、内核换页都可能在应用不知情时把缓冲区复制到磁盘。这正是硬件钱包存在的理由之一：受控的执行环境让密钥擦除真正可执行。

实际目标是最小化钥匙以可恢复形态待在存储里的时间窗口。一个实现良好的硬件钱包签名只用毫秒级时间，签完立即擦除，暴露窗口短到连快速攻击者也来不及。而在通用计算机上手动输入助记词完成一次签名，留下的痕迹可能存活好几个月。

**相关词条：** [比特币遗产规划](/glossary/bitcoin-inheritance-planning) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [密钥生成仪式](/glossary/key-generation-ceremony) · [密钥轮换](/glossary/key-rotation) · [密钥拆分](/glossary/key-split) · [纸钱包](/glossary/paper-wallet) · [安全](/glossary/security) · [硬件钱包](/glossary/hardware-wallet)
