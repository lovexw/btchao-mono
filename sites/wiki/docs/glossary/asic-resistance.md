---
title: 抗 ASIC（ASIC Resistance）
---

# 抗 ASIC（ASIC Resistance）

> **一句话定义：** 设计让 ASIC 难以优化或无利可图的工作量证明算法的理念，比特币并不追求这个。

「抗 ASIC」是一些加密货币（大体上失败的）尝试：设计出不受益于专用硬件的工作量证明算法。想法是：如果人人用通用 CPU 或 GPU 挖矿，挖矿就能留在爱好者中间去中心化，而不是集中于工业矿场。

抗 ASIC 的历史基本上就是「每次尝试最终都迎来了 ASIC」：

- **Scrypt**（莱特币，2011）。设计要求比 CPU/GPU 更多的内存。2014 年 ASIC 到来。
- **Ethash**（以太坊，2015）。内存硬，DAG 不断增长。2018 年前 ASIC 出现。
- **RandomX**（门罗币，2019）。大量随机代码执行以打击硬件优化。比前辈撑得久，但压力依然存在。
- **ProgPoW**（有提案，从未部署）。本会定期更换算法，打断 ASIC 厂商的多年摊销计划。

**比特币明确不追求抗 ASIC。** 理由是：

- **抗 ASIC 充其量是暂时的。** 任何足够赚钱的算法最终都会引来专用硬件。结果只是挖矿硬件的不断报废循环。
- **专用化其实是安全特性。** 比特币 ASIC 除了 SHA-256 挖矿一无是处。这意味着全球矿业已经把数十亿美元*沉没*在只能用来保护比特币的硬件上。把硬件挪去攻击网络，等于亲手摧毁它的价值。这是一个强有力的承诺机制。
- **稳定的算法支撑稳定的挖矿基础设施。** 可预期的硬件生命周期让矿工能建设长期运营。

比特币下的注：接受专用化，培育深厚的 ASIC 生态，靠厂商之间和矿工之间的竞争维持健康的去中心化。这个赌注运作得不完美——厂商集中是事实——但「永远换算法」的替代路线失败模式更糟。

硬件本身见 [ASIC](/glossary/asic-application-specific-integrated-circuit)，产业集中的真实担忧见[挖矿中心化](/glossary/mining-centralization)。

**相关词条：** [ASIC（专用集成电路）](/glossary/asic-application-specific-integrated-circuit) · [ASICBoost](/glossary/asicboost) · [CPU 挖矿（CPU Mining）](/glossary/cpu-mining) · [挖矿算法（Mining Algorithm）](/glossary/mining-algorithm) · [挖矿中心化（Mining Centralization）](/glossary/mining-centralization)
