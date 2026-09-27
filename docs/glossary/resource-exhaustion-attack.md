---
title: 资源耗尽攻击（Resource Exhaustion Attack）
---

# 资源耗尽攻击（Resource Exhaustion Attack）

> **一句话定义：** 拒绝服务手法：用垃圾或畸形数据灌满节点的 CPU、内存或带宽。

资源耗尽攻击（Resource Exhaustion Attack）是拒绝服务攻击的大类：攻击者试图耗尽目标节点的 CPU、内存、磁盘或带宽，使其崩溃或失去用处。

针对比特币节点的几种形态：

- **内存池垃圾。** 用低费交易灌满网络，塞爆内存池内存。由[丢弃阈值](/glossary/discard-threshold)缓解——内存吃紧时低费交易被驱逐，垃圾必须支付有竞争力的费用，这就变得昂贵。
- **昂贵脚本打 CPU。** SegWit 之前，某些脚本模式让签名验证需要平方级哈希时间。攻击者可以构造一笔需要数秒 CPU 才能验证的交易。SegWit 的 [BIP 143](/glossary/bip-143) sighash 修复了这个问题。
- **带宽洪泛。** 发送大量 `INV` 消息、请求大量区块，迫使节点在上行带宽上浪费在垃圾上。由每对端速率限制和针对惯犯的[节点自动封禁](/glossary/node-autoban)缓解。
- **连接槽耗尽。** 打开大量入站连接，占满节点的入站槽位。由 maxconnections 限制和为出站/「feeler」连接保留槽位缓解。
- **磁盘耗尽。** 逼节点用日志或未确认交易数据填满磁盘。现代节点软件已基本不是问题，历史上曾是隐患。
- **CVE 级攻击。** 针对具体实现漏洞的定向利用。2018 年通胀漏洞（CVE-2018-17144）除主风险的通胀外还有拒绝服务副作用；早期 Bitcoin Core 版本的某些崩溃漏洞可被畸形 P2P 消息触发。

防御层级：

- **协议级缓解。** SegWit 的 sighash 修复、权重限制、脚本大小限制、每笔交易的祖先/后代链限制。
- **Bitcoin Core 的策略层。** 速率限制、封禁计分、内存池驱逐、连接槽管理。
- **每对端信誉。** 行为不端的对端被扣分；持续作恶的被断开并封禁。
- **经济地板。** 垃圾要付真实的手续费，持续攻击很烧钱。

实践中系统扛得很好。比特币的 P2P 网络十多年来持续被各路人马低强度攻击，始终正常运行。工业级攻击会拖累一段时间的性能；但从未结构性击垮网络。

**相关词条：** [日蚀攻击（Eclipse Attack）](/glossary/eclipse-attack) · [手续费抢跑（Fee Sniping）](/glossary/fee-sniping) · [破坏攻击（Griefing Attack）](/glossary/griefing-attack) · [BIP 143](/glossary/bip-143) · [节点自动封禁（Node Autoban）](/glossary/node-autoban)
