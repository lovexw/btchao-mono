---
title: Bitcoin Core RPC
---

# Bitcoin Core RPC

> **一句话定义：** Bitcoin Core 节点自带的 JSON-RPC 接口——钱包、浏览器、闪电节点等一切比特币服务的编程入口。

Bitcoin Core RPC 是每个现代 Bitcoin Core 节点都开放的 JSON-RPC 编程接口。钱包、区块浏览器、闪电节点、Electrum 服务器——几乎所有比特币服务都跑在一条通往背后 Bitcoin Core 节点的 RPC 连接上。

连接基础：

- **默认端口**：主网 8332，测试网 18332，signet 38332。可用 `bitcoin.conf` 里的 `rpcport` 改。
- **认证**：要么用配置文件里的 `rpcauth` 行（推荐，密码以哈希存储），要么用数据目录里自动生成的 cookie 文件。明文用户名/密码也支持，但不建议。
- **格式**：HTTP 之上的 JSON-RPC 1.0。每次调用是一个带方法名和参数的 HTTP POST。

标准命令行工具是 `bitcoin-cli`，把 RPC 包装成对 shell 友好的接口。`bitcoin-cli getblockchaininfo` 大致等价于 `curl -X POST -d '{"jsonrpc":"1.0","method":"getblockchaininfo","params":[]}' http://user:pass@localhost:8332/`。

RPC 面非常大。实战中常见的类别：

- **区块链查询。** `getblock`、`getblockhash`、`getblockchaininfo`、`getbestblockhash`、`getrawtransaction`。
- **钱包操作。** `sendtoaddress`、`getbalance`、`listunspent`、`listtransactions`、`signrawtransactionwithwallet`、`walletprocesspsbt`。
- **内存池检查。** `getmempoolinfo`、`getrawmempool`、`getmempoolentry`。
- **网络状态。** `getpeerinfo`、`getconnectioncount`、`getnetworkinfo`。
- **挖矿辅助。** `getblocktemplate`、`submitblock`、`getmininginfo`。
- **诊断。** `getmemoryinfo`、`gettxoutsetinfo`、`validateaddress`。

安全：RPC 默认只绑定 localhost。不加 TLS 和强认证就暴露到网络上，是快速弄丢节点上所有钱包的捷径。远程管理家庭节点的标准姿势是 [JSON-RPC over Tor](/glossary/json-rpc-over-tor)——一个猜不到的 `.onion` 地址、加密传输、不用在防火墙上开洞。新版本的 `rpcwhitelist` 设置可以让运营者把每个已认证用户限制到特定方法子集，这是多租户场景的正确做法（区块浏览器不需要钱包 RPC 权限，照此收紧）。

对比特币上层服务的用户来说，RPC 是看不见的管道。对任何跑基础设施的人——交易所、支付处理器、闪电路由节点——它是 Bitcoin Core 的日常工作面。

**相关词条：** [BIP-22（GetBlockTemplate）](/glossary/bip-22-getblocktemplate) · [比特币客户端（Bitcoin Client）](/glossary/bitcoin-client) · [Bitcoin Core](/glossary/bitcoin-core) · [JSON-RPC over Tor](/glossary/json-rpc-over-tor) · [RPC 白名单（RPC Whitelist）](/glossary/rpc-whitelist)
