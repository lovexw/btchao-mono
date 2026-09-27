---
title: 输出描述符（Output Descriptor）
---

# 输出描述符（Output Descriptor）

> **一句话定义：** 人类可读的紧凑记法：描述如何派生出一组比特币脚本和地址。

输出描述符是一种紧凑的文本格式，描述如何派生一组比特币脚本与地址。它用一个自带完整说明的「配方」取代了一堆东拼西凑的「裸地址」，钱包拿到就能直接开始监视或花费。

一个典型的描述符长这样：

```
wpkh([d34db33f/84h/0h/0h]xpub6BosfCnifzxcF.../<0;1>/*)#cm5e6jrn
```

解码：

- `wpkh(...)`——脚本类型。这里是见证公钥哈希（P2WPKH，原生 SegWit）。
- `[d34db33f/84h/0h/0h]`——BIP 32 溯源：主密钥指纹和到达这个 xpub 所用的派生路径。
- `xpub6Bos...`——扩展公钥。
- `/<0;1>/*`——多路径：同时在 `/0/*`（收款）和 `/1/*`（找零）下派生子密钥，索引遍历所有整数。
- `#cm5e6jrn`——校验和，让打字错误在导入时就快速失败。

描述符为什么重要：

- **自描述。** 任何人读到描述符都能派生出相同的地址，不需要「我们用的是 BIP 84、账户 0、SegWit」这类链外口头约定——描述符把这些全部显式编码。
- **只读钱包。** 把描述符（不含私钥）交给一台手机或笔记本电脑，它就能监视余额、构造未签名的 PSBT。
- **多签协调。** 一个多签钱包用一条描述符就能描述：`wsh(sortedmulti(2,xpub_A/<0;1>/*,xpub_B/<0;1>/*,xpub_C/<0;1>/*))`。共签人导入同一份描述符，自动同步。
- **工具互通。** Sparrow、Specter、Nunchuk、Bitcoin Core 和多数现代钱包都接受描述符。复制一串字符串，就能把只读钱包在工具之间搬家。

Bitcoin Core 在 0.21（2021 年）把描述符钱包设为默认，0.22 起对新钱包强制使用。旧式 `addmultisigaddress` 那套钱包管理已正式废弃，让位于描述符。

对多数用户，描述符保持隐形——钱包替你处理。对多签设置、集成方和任何调试托管配置的人，它是这一行的通用语言。

**相关词条：** [Bitcoin Core](/glossary/bitcoin-core) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包（Hierarchical Deterministic Wallet）](/glossary/hierarchical-deterministic-wallet) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [PSBT（部分签名比特币交易）](/glossary/psbt) · [Taproot](/glossary/taproot)
