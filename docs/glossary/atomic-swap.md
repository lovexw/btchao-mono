---
title: 原子交换（Atomic Swap）
---

# 原子交换（Atomic Swap）

> **一句话定义：** 两方在无需中心化交易所、无需信任的情况下交换不同加密货币的方式。

原子交换是无信任的跨链或跨层交易。两方交换不同链上的代币（或一边链上一边闪电），全程不把托管权交给第三方。交易的两端要么都发生，要么都不发生。不存在「我发了我的，你没发你的」这种失败模式。

机制是一对配对的 [HTLC](/glossary/htlc-hashed-time-locked-contract)：

1. **Alice 挑一个随机秘密** `s`，计算 `hash(s)`。只公布哈希值。
2. **Alice 在链 A 锁定资金**：「Bob 揭示 `s` 即可取走；否则 24 小时后 Alice 原路退回。」
3. **Bob 在链 B 锁定资金**：「Alice 揭示 `s` 即可取走；否则 12 小时后 Bob 原路退回」（时限刻意更短，免得 Bob 悬在半空）。
4. **Alice 揭示 `s` 取走 Bob 的资金。** 这一步不可避免地在链 B 上公布了 `s`。
5. **Bob 看到 `s`**，用它到链 A 上取走 Alice 的资金。

任何一步有人中途跑路，HTLC 自动超时退款。交易要么原子地完成，要么原子地回滚。双方都没有对手方风险。

实际用途：

- **跨层的 BTC ↔ BTC。** 链上 BTC 与闪电 BTC 互换，见[潜艇交换](/glossary/submarine-swap)。
- **BTC ↔ 其他比特币衍生链**（Liquid、侧链等）。
- **BTC ↔ 稳定币**，通过 Robosats 之类去中心化交换市场。

短板是操作复杂度。原子交换要求双方钱包都讲这套协议、两条链都支持必要的脚本原语，还要小心管理超时。多数普通用户把这件事委托给交换服务（本身可能是信任最小化的），而不是自己裸做。

原子交换是[比特币桥](/glossary/bitcoin-bridge)的无信任替代方案。桥持有真 BTC、在另一条链上发行打包代币（引入托管或联盟信任假设）；原子交换让交易两端都原生地留在各自的链上，任何中介都不曾持有任何一方资产。取舍不同：桥更省事、下游用例更多；交换更安全、但需要一个愿意配合的对手方。

这是比特币[脚本](/glossary/bitcoin-script)与 [HTLC](/glossary/htlc-hashed-time-locked-contract) 能拼出的优雅原语之一，也是整个比特币生态中许多去中心化交易的动力来源。

**相关词条：** [原子多路径支付（AMP）](/glossary/atomic-multi-path-payment-amp) · [原子交换充值（Atomic Swap Refill）](/glossary/atomic-swap-refill) · [比特币桥（Bitcoin Bridge）](/glossary/bitcoin-bridge) · [HTLC（哈希时间锁合约）](/glossary/htlc-hashed-time-locked-contract) · [PayJoin（协作支付）](/glossary/payjoin) · [潜艇交换（Submarine Swap）](/glossary/submarine-swap)
