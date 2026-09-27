---
title: JSON-RPC over Tor
---

# JSON-RPC over Tor

> **一句话定义：** 把远程 Bitcoin Core 节点的 RPC 接口藏进 Tor，为节点控制增加匿名性与抗审查。

JSON-RPC over Tor，指把 Bitcoin Core 节点的 RPC 接口经由 Tor 隐藏服务（`.onion` 地址）暴露，而非（或除了）明网 IP。它让你在任何地方管理远程节点，同时不暴露节点的 IP，也不暴露你自己的。

这为什么重要：

- **Bitcoin Core 的 RPC 端口（8332）永远不该暴露在公网。** 拿到正确凭证的任何人都可以签名交易、掏空钱包、停掉节点。标准建议是只绑定 localhost。
- **家里 NAT 后面的自建节点**通常没法被旅途中的手机或笔记本连上——除非在防火墙上打洞（糟糕）或搭 VPN（可行，但多一层要维护的东西）。
- **隐藏服务把这个局面反过来**：把 RPC 绑到一个 Tor v3 洋葱地址。地址猜不到、只能经 Tor 访问、防火墙一行不用改。手机或笔记本跑着 Tor 去连这个洋葱地址即可。

配置大致如下：

1. 在 Bitcoin Core 同一台机器上安装 Tor。
2. 配置 HiddenServiceDir 和 HiddenServicePort 8332，指向 Bitcoin Core 的 RPC 端口。
3. 设置 Bitcoin Core 的 `-rpcbind=127.0.0.1`，并为 Tor 的 SocksPort 配好 `-rpcallowip`。
4. 把生成的 `.onion` 地址填进钱包客户端（Sparrow、BlueWallet 的「连接自己的节点」功能等）。

安全性依然牢靠，因为：

- 洋葱地址只有你分享过的人知道。
- RPC 认证（bitcoin.conf 里的 rpcauth 或 cookie 文件）在洋葱之上照常生效。
- Tor 附赠匿名性：即便对手知道这个 .onion，也看不到你的 IP。

这不是最省事的配置。但对想拥有自己基础设施又不把它暴露出去的自我主权运营者来说，这是正确的模式。Umbrel、Start9、RaspiBlitz 这类工具已把大部分配置自动化。

**相关词条：** [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [隐藏服务节点（Hidden Service Node）](/glossary/hidden-service-node) · [节点运营者（Node Operator）](/glossary/node-operator) · [Tor 隐藏服务（Tor Hidden Service）](/glossary/tor-hidden-service)
