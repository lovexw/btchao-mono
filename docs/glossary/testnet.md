---
title: 测试网（Testnet）
---

# 测试网（Testnet）

> **一句话定义：** 币无价值的比特币网络克隆：开发者测试代码而不动真币。

测试网（Testnet）是运行比特币共识规则、但币被刻意设计为一文不值的公开网络。它让开发者与运营者在不冒真实[主网](/glossary/mainnet) BTC 风险的情况下测试钱包、交易和节点配置。

测试网目前运行 **testnet4**（第三次重置，2024 年启用）。早期版本（testnet、testnet3）积累了太多被遗弃的算力和滥用，被周期性退役并换成全新链。当前 testnet4 的特点：

- **水龙头免费发币。** 若干网站向任何索取者发放少量测试网 BTC。它们实际上毫无价值。
- **独立的魔数创世区块。** 测试网链与主网不是同一条；交易和地址互不兼容。
- **修改过的难度规则。** 如果 20 分钟没有出块，难度直降到最低值，避免链在低活跃期停摆。主网没有这种逃生门。

测试网的缺点：

- **混乱。** 难度剧烈波动、区块忽而爆发忽而断流、有人刷垃圾。不能用测试网行为预测主网行为。
- **测试币偶尔被真金白银交易。** 尽管官方一文不值，骗子周期性地把测试网 BTC 卖给不明就里的买家，或拿来做「储备证明」骗局。
- **不适合安全敏感测试。** 要在贴近真实的对抗条件下测试高风险升级，[Signet](/glossary/signet) 通常是更好的选择。

对多数日常开发——「我的钱包能不能用、交易能不能广播、手续费处理长什么样」——测试网够了。更严肃的场景，看 Signet 或私有 regtest 网络。

**相关词条：** [Signet 测试网](/glossary/signet) · [主网（Mainnet）](/glossary/mainnet) · [Bitcoin Core](/glossary/bitcoin-core) · [创世区块（Genesis Block）](/glossary/genesis-block) · [Coinbase 交易（Coinbase Transaction）](/glossary/coinbase-transaction)
