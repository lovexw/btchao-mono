---
title: P2PK（付给公钥）
---

# P2PK（付给公钥）

> **一句话定义：** 较老的脚本类型：直接把币锁到一把公钥上，现大多被 P2PKH 取代。

P2PK（Pay to Public Key，付给公钥）是比特币最初的脚本格式，用在链上最早的那些区块里。它把输出直接锁在一把原始[公钥](/glossary/public-key)（而非公钥的哈希）上，解锁方式是对花费交易提供签名。

值得记住的历史：

- **[创世区块](/glossary/genesis-block)用的就是它。** 中本聪的第一笔 50 BTC 挖矿输出是一个 P2PK。链上最初的几千个区块也以这种格式为主。
- **中本聪早期挖矿用的也是它。** 中本聪挖出的约 110 万 BTC 大多停在 P2PK 输出上。
- **约 2010 年起基本被弃用。** 社区意识到「公钥只在花费时才暴露、而非收款时就暴露」是严格更优的，此后新收款转向 [P2PKH](/glossary/p2pkh-pay-public-key-hash)。

P2PK 的硬伤：

- **公钥立即上链。** 哈希型地址提供的[抗量子纵深防御](/glossary/post-quantum-bitcoin)直接失效。公钥从输出创建那一刻起就在链上，意味着 P2PK 输出对未来的[ Shor 算法](/glossary/shors-algorithm)量子计算机完全敞开，没有任何迁移窗口。
- **输出更大。** 33 字节压缩公钥（或 65 字节非压缩）比 20 字节哈希占地方。
- **地址体验从未做起来。** P2PK 通常以原始十六进制展示，没有带校验和的地址格式，手滑打错很容易。

P2PK 输出今天仍然可花费——任何 Bitcoin Core 节点都能验证它们——但没有任何你想用的钱包还会生成新的 P2PK 地址。它们基本以历史文物和学术好奇对象的身份存在。尤其是中本聪的那批 P2PK，是整个加密货币圈被盯得最紧的未花费输出。

取代它的格式见 [P2PKH](/glossary/p2pkh-pay-public-key-hash)。

**相关词条：** [地址](/glossary/address) · [B32 地址](/glossary/b32-address) · [P2SH（付给脚本哈希）](/glossary/p2sh) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash) · [P2PKH（付给公钥哈希）](/glossary/p2pkh-pay-public-key-hash) · [后量子比特币](/glossary/post-quantum-bitcoin) · [Shor 算法](/glossary/shors-algorithm) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output)
