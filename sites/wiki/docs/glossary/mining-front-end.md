---
title: 挖矿前端（Mining Front-End）
---

# 挖矿前端（Mining Front-End）

> **一句话定义：** 位于挖矿硬件（ASIC）与 Stratum、getblocktemplate 等协议之间的软件或界面层。

挖矿前端是位于挖矿硬件（ASIC）与派发工作给它们的协议之间的软件层：来自矿池的 Stratum，或 solo 挖矿用的 [getblocktemplate](/glossary/bip-22-getblocktemplate)。前端负责连接管理、工作分配、份额提交和面向运营者的控制。

对单台家用矿机，「前端」就是 ASIC 自己跑的固件。对有成百上千台设备的工业运营，前端是跑在某台服务器上的独立一层，常被称为机群管理器（fleet manager）或矿场控制器（farm controller）。

前端做的事：

- **矿池连接。** 维护与一个或多个矿池的 Stratum 连接，某个矿池断连时自动切换。
- **工作分发。** 从矿池接收区块模板任务，路由给各台 ASIC（或经一个负责路由的 Stratum 代理）。
- **份额提交。** 收集 ASIC 找到的份额，回传给矿池。
- **监控与控制。** 追踪每台 ASIC 的算力、温度、电压、频率、风扇转速；过热告警或自动关机；远程重启出问题的设备。
- **固件管理。** 向整个机群推送固件更新——对 [BraiinsOS、LuxOS 这类第三方固件](/glossary/proprietary-mining-firmware)尤其重要。

这个品类的常见产品（2026）：

- **Awesome Miner**：付费的以 Windows 为中心的机群管理器，中型运营中流行。
- **Hive OS**：云端管理的 Linux 挖矿系统，带 Web 面板。
- **Braiins Farm Proxy + Farm Manager**：Braiins（最早 Slush Pool 的团队）的开源 Stratum V2 栈。
- **Foreman**：面向大型挖矿运营的 SaaS 机群管理。
- **MiningCore / NOMP 等开源矿池软件**：协议另一端、矿池运营者跑的东西。

对跑一两台 ASIC 的爱好者，前端基本不可见。对跑几千台机器的运营者，前端决定盈亏。

**相关词条：** [ASIC（专用集成电路）](/glossary/asic-application-specific-integrated-circuit) · [矿工（Miner）](/glossary/miner) · [矿池（Mining Pool）](/glossary/mining-pool) · [挖矿软件（Mining Software）](/glossary/mining-software) · [第三方矿机固件（Proprietary Mining Firmware）](/glossary/proprietary-mining-firmware)
