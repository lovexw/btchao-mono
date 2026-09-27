---
title: 超大通道（Wumbo Channels）
---

# 超大通道（Wumbo Channels）

> **一句话定义：** 超过旧默认容量上限（约 0.1677 BTC）的闪电通道：为高频交易提供更大容量。

「Wumbo」通道指[容量](/glossary/lightning-channel-capacity)超过原始默认上限 0.1677 BTC（16,777,215 聪——能装进 3 字节的最大值，上限由此而来）的[闪电通道](/glossary/lightning-channel)。

这个上限在闪电早期出于防御而存在：协议实现还年轻，边缘场景理解不足，限制单条通道的敞口就把漏洞的最坏损失封了顶。随着实现成熟、通道处理代码经受了审计，上限不再起保护作用，只剩碍事。

「Wumbo」一词出自《海绵宝宝》（"I wumbo, you wumbo, he/she/me wumbo…"）。用动画片给严肃基础设施命名的加密圈传统，继续保持不败。

各大实现约在 2020 年支持 wumbo。到 2026 年，wumbo 已基本普及——问题很少是「你的节点支持 wumbo 吗」，而是「实际上限是多少」。1+ BTC 的通道在路由运营者中很常见；交易所之间的大通道可以大得多。

wumbo 解锁了什么：

- **路由节点能承载像样的流动性。** 0.16 BTC 的上限让正经的路由经济学无从谈起；5+ BTC 的通道才更像真正的基础设施。
- **大额周期性支付。** 交易所提币、商户批量结算、发薪级别的资金流。
- **无需 [AMP](/glossary/atomic-multi-path-payment-amp) 拆分的直连大额转账。** 一条大通道就能装下过去要拆多路径的金额。

风险没有消失——通道越大，漏洞或被攻破的潜在损失越大。但以闪电 2026 年经过审计的成熟度，对知道自己在做什么的运营者来说，wumbo 是合理的默认。

**相关词条：** [闪电通道](/glossary/lightning-channel) · [闪电通道容量](/glossary/lightning-channel-capacity) · [通道拼接（Splicing）](/glossary/lightning-channel-splicing) · [闪电网络](/glossary/lightning-network) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp)
