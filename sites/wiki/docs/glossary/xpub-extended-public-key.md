---
title: Xpub（扩展公钥）
---

# Xpub（扩展公钥）

> **一句话定义：** BIP 32 特性：在不暴露主私钥的前提下派生子公钥。

Xpub 是 [BIP 32](/glossary/bip-32) 扩展公钥：一个父[公钥](/glossary/public-key)连同它的[链码](/glossary/chaincode)打包在一起。有了这两样，任何人都能派生该钱包分支下所有非强化子公钥（以及所有[地址](/glossary/address)），全程见不到任何私钥。

拿到别人的 xpub 能做什么：

- **监视他的钱包。** 把 xpub 导入 Sparrow、Specter、BlueWallet 等工具，就能实时看到每个收款地址、每笔花费、每次余额变动。不需要任何私钥。
- **替他生成新收款地址。** 商户服务器可以为每位顾客发新地址，而不持有任何花费能力。
- **作为只读联署人参与多签。** 汇集每个联署人的 xpub，就能搭起一个[多签](/glossary/multisig)监视钱包。

泄露一个 xpub 意味着失去什么：

- **隐私。** 该分支下所有现存和未来的地址，从此对持有者可见。链上分析的迷雾直接散了：xpub 持有者看得到完整的余额和交易关系图。
- **活动的前向保密。** 哪怕你从此不再分享，持有者只要沿着钱包树往下走，就能派生出你接下来的 1000 个地址。

把 xpub 当资产负债表对待，而不是当一个地址。

老钱包里会见到的前缀变体：

- `xpub...` —— BIP 32 原始形态，约定俗成对应旧式 P2PKH 派生。
- `ypub...` —— P2SH 包裹隔离见证（BIP 49）。
- `zpub...` —— 原生 P2WPKH（BIP 84）。
- `Ypub` / `Zpub` —— 多签变体。

到 2026 年，前缀变体基本已成为历史：现代[描述符钱包](/glossary/output-descriptor)显式携带脚本类型信息，一个 `xpub` 加上描述符模板就能干净地覆盖一切。

**相关词条：** [BIP 44](/glossary/bip-44) · [BIP 85](/glossary/bip-85) · [链码](/glossary/chaincode) · [确定性钱包](/glossary/deterministic-wallet) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [公钥](/glossary/public-key) · [只读钱包](/glossary/watch-only-wallet)
