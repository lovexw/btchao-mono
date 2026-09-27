---
title: Tor 隐藏服务（Tor Hidden Service）
---

# Tor 隐藏服务（Tor Hidden Service）

> **一句话定义：** 通过 Tor 托管比特币节点或服务：隐藏真实 IP，增强隐私与抗审查。

Tor 隐藏服务——现在官方名称是**洋葱服务（onion service）**——是只能经由 Tor 网络访问的网络端点，以 `.onion` 地址标识。端点的真实 IP 位置对用户和对整个互联网都是隐藏的。

对[比特币节点](/glossary/node)而言，以 Tor 洋葱服务方式运行意味着：

- **网络层隐私。** 你的真实 IP 不会出现在对等点列表里，不会被扫描 gossip 网络的链上分析公司看到，也不会被其他节点运营者记录。
- **抗审查。** 想封锁比特币的政府或 ISP 可以封 IP 段，但封锁 Tor 本身要难得多（而且要跨过一道高得多的政治红线）。
- **抵御[窃听攻击](/glossary/eavesdropping-attack)。** 没有 IP，观察者很难把你的广播与物理位置或身份关联。
- **抵御[日蚀攻击](/glossary/eclipse-attack)。** Tor 的随机电路选择让攻击者很难预测或定向你的出站对等点。

代价是延迟。由于三跳中继结构，Tor 比普通网络路由多出约 200-500 毫秒往返时间。对比特币的需求——约每 10 分钟传播一次区块、几秒内传播交易——这点延迟在实践中完全无感。区块与交易在 Tor 上中继毫无问题。

Bitcoin Core 自 2014 年起内置一等 Tor 支持，把节点藏到 Tor 后面只是一次配置文件改动（`proxy=127.0.0.1:9050` 加几个相关选项）。许多节点一体机产品（Umbrel、Start9、RaspiBlitz）出厂默认开启 Tor。同样的隐藏服务模式还能把[远程管理用的 RPC](/glossary/json-rpc-over-tor)暴露出来，让你在任何地方控制家里的节点，一个防火墙端口都不用开。

对跑[全节点](/glossary/full-node)的自托管用户来说，Tor 是网络层上你能做的最大单项隐私升级。任何在意「链上活动别和家庭 IP 挂钩」的人，都值得强烈推荐。

Tor 堵上了哪个泄露、没碰哪个泄露，见[比特币隐私专题](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [隐藏服务节点（Hidden Service Node）](/glossary/hidden-service-node) · [I2P（隐形互联网计划）](/glossary/i2p-invisible-internet-project) · [JSON-RPC over Tor](/glossary/json-rpc-over-tor) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [洋葱路由（Lightning）](/glossary/onion-routing-lightning)
