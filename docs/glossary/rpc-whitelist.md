---
title: RPC 白名单（RPC Whitelist）
---

# RPC 白名单（RPC Whitelist）

> **一句话定义：** Bitcoin Core 配置：把特定 JSON-RPC 方法限制给白名单用户或 IP，增强安全。

RPC 白名单（RPC Whitelist）是 Bitcoin Core 的机制：限制每个已认证用户能调用哪些 JSON-RPC 方法。它在 RPC 层实现最小权限原则：即使一个凭证泄露，损失也被该凭证被允许做的事情框住。

`bitcoin.conf` 中的配置：

```
rpcauth=alice:5e95...$abc...   # 用户 alice 的 bcrypt 哈希凭证
rpcwhitelist=alice:getblockchaininfo,getblock,getrawtransaction
rpcauth=bob:7f12...$def...
rpcwhitelist=bob:sendrawtransaction,signrawtransactionwithwallet,getbalance
rpcwhitelistdefault=0          # 未显式列入白名单的一律拒绝
```

这个例子里，alice 只能读取链状态；bob 能签名和广播，但不能调用 `stop` 关掉节点。

实际场景中它的重要性：

- **区块浏览器后端。** 只读浏览器服务需要 `getblock`、`getrawtransaction`、`getblockchaininfo`，不需要钱包 RPC。相应收紧后，浏览器被攻破也掏不走同一节点上的钱包。
- **闪电节点后端。** 闪电守护进程需要特定 RPC（广播交易、查内存池状态）。只放开这些，闪电软件的漏洞就无法触发任意钱包操作。
- **监控/指标采集。** Prometheus 导出器或告警系统只需只读 RPC，无需写权限。
- **多用户节点托管。** 多人共用节点时，每人拿到只含所需方法的凭证。

默认值：现代 Bitcoin Core 中 `rpcwhitelistdefault=1` 意味着白名单用户可访问除显式排除外的所有 RPC 方法。设 `rpcwhitelistdefault=0` 则反转模型：不显式列出即拒绝。对任何不平凡的部署，默认拒绝模式是安全的选择。

单一用户、单一凭证的家庭节点不需要白名单。但只要服务多个消费方，它就是标准的加固步骤。

**相关词条：** [比特币客户端（Bitcoin Client）](/glossary/bitcoin-client) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Knots](/glossary/bitcoin-knots) · [链状态损坏（Corrupted Chain State）](/glossary/corrupted-chain-state) · [交易所 API Key（Exchange API Key）](/glossary/exchange-api-key)
