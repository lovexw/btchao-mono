---
title: WIF（钱包导入格式）
---

# WIF（钱包导入格式）

> **一句话定义：** 私钥的用户友好编码（常以 5、K、L 开头），比特币钱包通用。

WIF（Wallet Import Format，钱包导入格式）是单个比特币[私钥](/glossary/private-key)的 Base58Check 编码。它在原始 32 字节私钥外面套上网络前缀字节、可选的压缩标志位和 4 字节校验和——这样在钱包导入界面手滑打错一个字符时会立刻报错，而不是静默加载一把完全不同的钥匙。

WIF 字符串长什么样：

- **`5...`** —— 非压缩公钥形态。老古董；只出现在 2012 年前后的旧钱包和少数收藏用途里。
- **`K...` 或 `L...`** —— 压缩公钥形态。现代 WIF 的标准格式。
- **`p2...`（或其他前缀）** —— BIP 38 加密私钥：加过口令保护的 WIF，使用前必须先解密。

2026 年你还会在哪里遇到 WIF：

- **扫空纸钱包。** 老式[纸钱包](/glossary/paper-wallet)存的就是一把 WIF；把它导入现代钱包，币就转移到你的 HD 管理地址名下。
- **一次性私钥恢复。** 某个沉睡多年的地址突然要用了，你手上还留着原始私钥，需要花一次。
- **教学工具。** 一些教学钱包和开发者练习场用 WIF，因为它紧凑且人类可读。

WIF 是单钥匙格式：没有派生、没有树、没有子钥匙。导入一把 WIF、花掉对应地址之后，现代钱包不会追踪任何相关地址——因为根本不存在相关的钥匙树。日常托管早已是 BIP 39 助记词驱动 BIP 32 [HD 钱包](/glossary/hd-wallet-hierarchical-deterministic-wallet)的天下，WIF 作为遗留的单钥匙兼容格式继续存在。

安全提醒：一把 WIF 的敏感度和原始私钥完全相同。拿到这串字符的人就能花掉对应的币。把它当现金对待，而不是当一个公开[地址](/glossary/address)。

**相关词条：** [图形钱包](/glossary/gui-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [钱包](/glossary/wallet) · [只读钱包](/glossary/watch-only-wallet) · [私钥](/glossary/private-key) · [纸钱包](/glossary/paper-wallet) · [助记词](/glossary/seed-phrase)
