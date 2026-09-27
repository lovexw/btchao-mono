---
title: 无头节点（Headless Node）
---

# 无头节点（Headless Node）

> **一句话定义：** 不跑 `bitcoin-qt` 图形界面、只运行 `bitcoind` 守护进程的节点——生产环境的标准形态。

无头节点就是不带 `bitcoin-qt` GUI 运行的 `bitcoind`：没有窗口、没有菜单，只有监听 RPC 和 P2P 网络的守护进程。这是标准的生产部署形态。

为什么无头：

- 比 Qt 界面省内存省 CPU，把资源留给节点真正的工作。
- 轻松跑在服务器、树莓派、NAS 或任何嵌入式设备上。
- 一切通过 `bitcoin.conf` 配置；通过 `bitcoin-cli` 或 RPC 驱动，脚本和其他软件可以直接与它对话。
- 作为 systemd 服务或 launchd 作业运行，重启、断线、SSH 掉线都毫发无损。

所有打包发行版节点（Umbrel、Start9、RaspiBlitz、MyNode、Citadel）在底层都是这样跑 Bitcoin Core 的——友好的网页界面通过 RPC 与 `bitcoind` 交流。交易所、支付处理商、区块浏览器、Electrum 服务器、闪电节点与比特币交互的方式也一样：不是通过 GUI，而是通过 `getblockchaininfo`、`gettxout`、`sendrawtransaction` 等一整个 RPC 接口面。

不需要 GUI，就默认选无头。攻击面更小、资源占用更少、自动化和监控都更容易。

**相关词条：** [节点专用 IP（Dedicated IP）](/glossary/dedicated-ip-nodes) · [全节点（Full Node）](/glossary/full-node) · [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点数量统计（Node Headcount）](/glossary/node-headcount) · [节点运营者（Node Operator）](/glossary/node-operator) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [节点在线时长（Node Uptime）](/glossary/node-uptime) · [Tor 隐藏服务（Tor Hidden Service）](/glossary/tor-hidden-service)
