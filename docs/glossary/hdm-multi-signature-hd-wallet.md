---
title: HDM（多签 HD 钱包）
---

# HDM（多签 HD 钱包）

> **一句话定义：** HD 派生与多签的结合：每位共签人拥有自己的扩展密钥树，支持多账户多地址。

HDM（分层确定性多签）是现代比特币多签的标准架构：每位共签人用自己的 HD 钱包种子，多签钱包由全体共签人的扩展公钥（xpub）加上门限（如 2-of-3）共同描述。

为什么这是正确的设计：

- **每位共签人的 HD 种子能产出大量地址。** 多签钱包继承这一点：不是一套配置只对应一个多签地址，而是按 `m/.../0/i` 派生一整个地址序列，`i` 遍历所有收款序号。和单签 HD 钱包一样遵守「每笔收款新地址」的隐私纪律。
- **xpub 只需共享一次。** 建钱包时每位共签人导出一次 xpub，合并后的钱包描述符（如 `wsh(sortedmulti(2, xpub_A/.../<0;1>/*, xpub_B/.../<0;1>/*, xpub_C/.../<0;1>/*))`）就覆盖了未来所有地址。
- **各家的钥匙互相隔离。** 共签人 A 的种子永远不碰 B 的设备。各自只用本地自己的钥匙签名。
- **备份就是每位共签人一颗种子。** A 的设备丢了但种子在，恢复即可。设备和种子都丢了，其他共签人仍可凭剩余 xpub 和多签门限找回（前提是凑门限不差那一把）。

现实中的部署模式：

- **2-of-3 个人托管。** 一把在家里的硬件钱包，一把在保险柜或信任的家人那里，一把放在 Unchained、Casa 这类服务手里当「随叫随到」的第三把。
- **3-of-5 机构级。** 企业金库标准配置。五位共签人分布在高管或不同地域办公室，花一次要凑三把。
- **2-of-2 闪电通道。** 每条[闪电通道](/glossary/lightning-channel)底层在技术上就是一个 HDM（2-of-2），通道双方的钥匙各自由自己的 HD 种子派生。

这套约定如今由 [BIP 48](https://github.com/bitcoin/bips/blob/master/bip-0048.mediawiki)（规定多签钱包的派生路径）和描述符钱包格式（把整套多签配置写进一个可移植字符串）标准化。

HDM 简化不了的事：建仓仪式（初始交换 xpub 仍要安全进行）、遗产规划（每位共签人的种子都得有自己的继任安排）、恢复演练（共签人越多，彩排越多）。但比起 HD 多签之前「每位共签人都要备份一把把独立私钥」的年代，这套标准让多签钱包的日常运转实在轻松了太多。

**相关词条：** [拜占庭容错](/glossary/byzantine-fault-tolerance) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [分层多签](/glossary/hierarchical-multisig) · [M-of-N 多签](/glossary/m-n) · [MuSig](/glossary/musig) · [MuSig2](/glossary/musig2) · [法定人数签名](/glossary/quorum-signatures) · [钱包](/glossary/wallet)
