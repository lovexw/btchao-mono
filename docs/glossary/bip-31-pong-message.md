---
title: BIP 31（pong 消息）
---

# BIP 31（pong 消息）

> **一句话定义：** 在比特币 P2P 网络中为「ping」引入「pong」回复，确保双方节点在线响应。

BIP 31 由 Mike Hearn 于 2012 年撰写，为比特币 P2P 协议加入了 `pong` 消息。在它之前，已有的 `ping` 消息不要求回复：节点发出 `ping` 后，对端可能不理会，也可能直接断开——你分不清是哪种。

BIP 31 补上了这块。`ping` 现在携带一个随机选取的 64 位 nonce；对端应回复回显同一 nonce 的 `pong`。一来一回确认对端存活，还顺带量出延迟。

听起来不起眼，但它支撑了：

- **存活检测。** 合理时间窗内不回 `pong` 的[节点](/glossary/node)会被断开，腾出连接位。
- **按延迟选对端。** Bitcoin Core 偏好响应更快的对端来传播[区块](/glossary/block)。
- **NAT 保活。** 周期性的 ping/pong 让有状态防火墙和 NAT 映射在空闲期不至于掐断连接。

它是那种「感觉看不见、缺了却不行」的小 BIP。经由软件版本协商生效：支持 BIP-31 的对端（自 Bitcoin 0.6.1，2012 年 3 月发布起实际就是所有对端）使用它；更老的对端回落到无回复的 ping。

规范：[BIP-31](https://github.com/bitcoin/bips/blob/master/bip-0031.mediawiki)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点同步（Node Synchronization）](/glossary/node-synchronization)
