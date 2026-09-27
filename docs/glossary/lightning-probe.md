---
title: 闪电探测（Lightning Probe）
---

# 闪电探测（Lightning Probe）

> **一句话定义：** 故意在最后一跳失败的测试支付，用于检查路由容量或节点响应。

闪电探测是在正式付款之前、沿候选[路径](/glossary/lightning-routing)发出的测试支付。探测刻意在最后一跳失败（通常用一个收款方无法解开的随机支付哈希），让发送方在不实际搬动资金的情况下得知路径流动性够不够。

探测存在的原因：闪电的 gossip 层告诉你通道存在、*总*容量多少，但不告诉你*当前*余额分布。一条 1 BTC 的通道可能全部流动性都在一侧，反方向路由等于没用。探测就是你发现隐藏余额状态的手段。

探测的流程：

1. 发送方在 gossip 图上选一条候选路径。
2. 沿该路径发一个 HTLC，支付哈希是随机的（不可揭示）。
3. 每一跳为这个 HTLC 锁住流动性，然后转发。
4. 路径中某处流动性不足，相应跳返回失败——发送方知道路径断在哪。
5. 一路到最后一跳流动性都够，最后一跳尝试解开支付哈希并失败（因为哈希是随机的）。HTLC 解开。

探测换来什么：在不动真金白银的前提下了解路径可行性。对谁有用：

- **钱包**在提交大额支付前先试路。
- **路由分析服务**绘制全网流动性地图。
- **路由节点运营者**评估自家通道网的健康度。

探测的代价：

- **时间。** 每次探测都是一趟多跳往返，不免费。
- **网络负载。** 探测会临时占用各跳的通道槽位。
- **隐私。** 高频探测暴露你在考虑哪些路径。
- **形似堵塞。** 过度探测会在你测试的跳上触发[堵塞探测器](/glossary/jammed-htlc-detector)，防御性的节点可能限流你。

现代闪电钱包只做最少的自动探测——通常只够在发送前验证第一条候选路径。激进探测主要是研究/分析工具，不是日常用户行为。

**相关词条：** [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [闪电网络](/glossary/lightning-network) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [闪电支付（Lightning Payment）](/glossary/lightning-payment) · [闪电路由（Lightning Routing）](/glossary/lightning-routing) · [Sphinx（闪电洋葱路由）](/glossary/lightning-sphinx) · [HTLC 堵塞探测器](/glossary/jammed-htlc-detector) · [堵塞攻击（LN）](/glossary/jamming-attack-ln)
