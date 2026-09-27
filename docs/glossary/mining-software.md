---
title: 挖矿软件（Mining Software）
---

# 挖矿软件（Mining Software）

> **一句话定义：** CGMiner、BFGMiner 这类程序：把 ASIC 连到比特币网络或矿池上。

挖矿软件是位于[比特币节点](/glossary/node)（或[矿池](/glossary/mining-pool)）与实际执行哈希的 [ASIC](/glossary/asic-application-specific-integrated-circuit) 硬件之间的那一层。它接收工作、分发给芯片、收集有效份额、回报结果。

常见的组成：

- **Stratum 协议**——主流的矿池-矿机协议。Stratum V1 自 2012 年前后就是标准；**Stratum V2** 是现代继任者，让单个矿工对交易选择有更多控制权（而不是让渡给矿池）。
- **CGMiner / BFGMiner**——经典开源挖矿客户端，上溯 GPU 时代并持续适配 ASIC。在 solo 和小规模部署中仍常见。
- **厂商固件**——Bitmain 的 S19/S21 系列、MicroBT 的 WhatsMiner 系列等都自带处理矿池连接、份额提交和芯片级优化的固件。
- **第三方固件**，如 **Braiins OS** 和 **Vnish**——面向主流 ASIC，提供更好的性能调优、逐芯片自动调频，以及通过 Stratum V2 让矿机直接控制交易选择。

对 solo 运营者，挖矿软件负责矿池故障切换、温度监控、算力上报和基本运维面板。对工业运营，这套栈通常集成进更大的机群管理平台。

Stratum V2 的过渡是当下最值得关注的进展。在 V1 下，矿池决定矿工所挖区块里打包哪些交易；在 V2 下，单个矿工可以自己指定交易选择，同时仍让矿池聚合算力来平滑收益波动。这是一次把权力有意义地归还给个体矿工的再分配——也是对[挖矿中心化](/glossary/mining-centralization)问题一个真实的、尽管渐进的结构性修复。

**相关词条：** [ASIC（专用集成电路）](/glossary/asic-application-specific-integrated-circuit) · [竞争性挖矿（Competitive Mining）](/glossary/competitive-mining) · [CPU 挖矿（CPU Mining）](/glossary/cpu-mining) · [GUI 挖矿软件](/glossary/gui-miner) · [合并挖矿（Merged Mining）](/glossary/merged-mining) · [矿工（Miner）](/glossary/miner) · [挖矿（Mining）](/glossary/mining) · [矿池（Mining Pool）](/glossary/mining-pool) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [挖矿托管（Mining Colocation）](/glossary/mining-colocation) · [矿机（Mining Rig）](/glossary/mining-rig) · [家用挖矿（Retail Mining）](/glossary/retail-mining)
