---
title: 图形钱包（GUI Wallet）
---

# 图形钱包（GUI Wallet）

> **一句话定义：** 带图形界面的比特币钱包，点选操作而非命令行。

图形钱包，就是任何有图形界面的比特币钱包：能点的按钮、能扫的地址二维码、能看的交易历史。对立面是那种只能敲命令或发 JSON 的 CLI / RPC 钱包。

图形钱包的几大类：

- **Bitcoin Core（Qt 版）。** 参考实现也带图形版。校验全链、管理钱包、大部分节点功能都能从菜单触达。想跑全节点又想在上面用钱包的人的默认选择。
- **Specter Desktop、Sparrow、Nunchuk。** 面向进阶用户的桌面图形钱包：硬件钱包支持、多签协作。架设在独立的 Bitcoin Core 节点（或 Electrum 协议后端）之上。Sparrow 尤其被广泛推荐用于正经的自我托管。
- **BlueWallet、Wallet of Satoshi 式手机钱包。** 手机端、体验简单。从非托管（BlueWallet、Phoenix、Mutiny）到托管（Wallet of Satoshi、Strike）都有。
- **硬件钱包伴侣应用。** Trezor Suite、Ledger Live、Foundation Envoy、Bitbox 应用。图形界面跑在电脑或手机上，签名发生在连接的硬件设备里。
- **轻客户端。** Electrum（元老）及各种分叉。连 Electrum 服务器而非自跑全节点；上手快，代价是让渡一部分自主权。

好的图形钱包提供什么：

- 清晰的收款/发送流程和确认页。
- 合理默认值的手续费估算。
- 地址簿 / 交易标签。
- 给进阶用户的硬币控制（Sparrow 是这方面的典范）。
- 有条件时的硬件钱包配对。
- 支持多签和气隔签名的 [PSBT](/glossary/psbt)。

「图形界面」不保证什么：

- **安全。** 界面好看不等于底层密钥管理正确。一些图形钱包的安全黑历史相当惨烈（Electrum 钓鱼潮、各种分叉恶意克隆）。
- **隐私。** 连第三方 Electrum 服务器的图形钱包，会把你的地址交给那台服务器。自托管后端保隐私，默认云端配置不保。
- **自我托管。** 有些图形钱包本质是托管的——顺滑的 UI 背后，币在别人的服务器上。

2026 年多数用户的合理搭配：一个手机钱包管零花（闪电用 Phoenix、在链用 BlueWallet），大额用 Sparrow 这类桌面图形钱包搭配硬件钱包。

**相关词条：** [比特币客户端](/glossary/bitcoin-client) · [Bitcoin Dev Kit（BDK）](/glossary/bitcoin-dev-kit-bdk) · [托管型闪电钱包](/glossary/custodial-lightning-wallet) · [托管钱包](/glossary/custodial-wallet) · [确定性钱包](/glossary/deterministic-wallet) · [GUI 挖矿软件](/glossary/gui-miner) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [惩罚交易](/glossary/penalty-transaction) · [钱包](/glossary/wallet) · [钱包导入格式（WIF）](/glossary/wallet-import-format-wif) · [只读钱包](/glossary/watch-only-wallet)
