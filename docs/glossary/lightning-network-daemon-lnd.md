---
title: Lightning Network Daemon（lnd）
---

# Lightning Network Daemon（lnd）

> **一句话定义：** Lightning Labs 开发的主流闪电实现，与 Core Lightning、Eclair、LDK 并列。

LND（Lightning Network Daemon）是[闪电网络](/glossary/lightning-network)的主要实现之一，由 Lightning Labs 自 2016 年起开发。Go 语言写成，是部署最广的闪电节点软件——尤其是在 Umbrel、Start9、MyNode、RaspiBlitz 这些「盒子节点」产品里，多数用户从没见过底层守护进程长什么样。

与其他主要实现的对比：

- **LND**（Lightning Labs）——Go 语言，REST + gRPC API，单体式。用户基数最大，工具链和集成最全。
- **[Core Lightning](/glossary/core-lightning-c-lightning)**（Blockstream）——C 语言，插件优先架构，资源占用极小。高阶用户和路由运营者常选它。
- **Eclair**（ACINQ）——Scala 语言，针对移动端（驱动 Phoenix 钱包）与高流量路由优化。
- **LDK**（Spiral）——嵌进你自己应用的库，而非独立守护进程。Cash App、Mutiny、Mercury Layer 在用。

LND 的特点：

- **API。** REST 和 gRPC 接口让钱包和服务集成很直接。多数闪电应用首先适配 LND。
- **瞭望塔支持。** 内建的瞭望塔帮你在线下时守卫通道。
- **Macaroon 认证。** 细粒度能力令牌支持委托访问（比如让一个钱包能查余额但不能花钱）。
- **一个显著短板：** LND 尚未原生支持 BOLT-12 offer。LNDK 垫片项目可以在 LND 部署旁边启用 BOLT-12，原生支持仍在推进。

多数场景 LND 都够好。想要最广的生态兼容性就选它；想要原生 BOLT-12 或更小的资源占用就选 [CLN](/glossary/core-lightning-c-lightning)。

**相关词条：** [BOLT](/glossary/bolt) · [BOLT 11](/glossary/bolt-11) · [Core Lightning（CLN）](/glossary/core-lightning-c-lightning) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [欺诈性关通道](/glossary/fraudulent-channel-close) · [闪电通道](/glossary/lightning-channel) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [闪电路由（Lightning Routing）](/glossary/lightning-routing)
