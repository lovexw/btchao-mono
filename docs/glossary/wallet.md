---
title: 钱包（Wallet）
---

# 钱包（Wallet）

> **一句话定义：** 管理私钥与地址的软件或硬件，让你能收发 BTC。

比特币钱包其实不「装」比特币。比特币活在链上，钱包持有的是授权移动它的[私钥](/glossary/private-key)。

钱包在机制上做四件事：

- **生成并存储密钥**——通常从 [BIP-39](/glossary/bip-39) 助记词出发，沿[分层确定性结构](/glossary/hierarchical-deterministic-wallet)派生。
- **追踪你能花的链上 UTXO**——要么查询远程服务器，要么像 [Bitcoin Core](/glossary/bitcoin-core) 那样自带全节点做完整验证。
- **在你发送时构造并签名[交易](/glossary/transaction)**。
- **按需生成全新的收款[地址](/glossary/address)**。

钱包有几种原型，安全与便利的取舍各不相同：

- **[托管钱包](/glossary/custodial-wallet)** —— 钥匙在别人手里（Coinbase、Cash App、Strike 之类）。最好用，性质保障最弱：你拥有的不是比特币，是一张欠条。
- **手机钱包** —— Phoenix、Muun、BlueWallet 等。钥匙在你手里，日常顺手，热钱包安全模型。
- **桌面钱包** —— Sparrow、Bitcoin Core 自带钱包、Wasabi。常连接自己的节点，硬币控制更强大。
- **[硬件钱包](/glossary/hardware-wallet)** —— Trezor、Jade、BitBox、Ledger。密钥待在专用签名设备里，永不接触联网机器。
- **多签配置** —— 花费需要不止一台设备授权。金额可观时强烈推荐。

正确的钱包取决于你持有什么、在做什么。当零花钱花的？手机钱包足够。长期储蓄？硬件钱包，理想情况下再加多签。通用法则：价值越高 → 摩擦越多 → 密钥与联网表面的间隔越大。

完整的上手流程见[第 4 章 · 成为自己的银行](/journey/be-your-own-bank)。

**相关词条：** [私钥](/glossary/private-key) · [硬件钱包](/glossary/hardware-wallet) · [托管钱包](/glossary/custodial-wallet) · [只读钱包](/glossary/watch-only-wallet) · [硬币控制](/glossary/coin-control) · [WIF 导入格式](/glossary/wallet-import-format-wif) · [比特币金库](/glossary/bitcoin-vault)
