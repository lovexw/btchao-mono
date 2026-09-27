---
title: 链上分析（Chain Analysis）
---

# 链上分析（Chain Analysis）

> **一句话定义：** 检查链上交易、地址与模式，以识别或关联用户活动。

链上分析是这样一门产业与手艺：从公开的比特币区块链里提取真实身份与行为的信息。专业公司（Chainalysis、Elliptic、CipherTrace、TRM Labs 等）把分析结果卖给交易所、执法机构、政府与合规团队。

它的方法依赖一个事实：比特币的链完全公开，而且永不遗忘。常见手法：

- **[地址聚类](/glossary/address-clustering)。** 利用交易规律（共同输入、找零输出启发式、时间相关性）把大概率同属一人的地址归为一组。
- **交易所 / KYC 锚定。** 把聚类地址与已知的入金通道（Coinbase、Kraken 等）匹配，需要时调取客户记录。
- **OFAC / 制裁名单标记。** 给与勒索软件、受制裁实体或盗币调查相关的特定地址打标。
- **行为画像。** 识别混币模式、[CoinJoin](/glossary/coinjoin) 参与、交易所转冷存储的资金流等。
- **网络层关联。** 把链上分析和对点对点网络的[窃听](/glossary/eavesdropping-attack)结合起来，把广播与 IP 关联起来。

链上分析**擅长**的事：

- 追踪被盗资金到能冻结它们的交易所。
- 识别勒索软件的付款与其背后的钱包。
- 合规：交易所对照制裁名单检查入金。

链上分析**同样被用于**的事：

- 对普通用户金融活动的大规模监控。
- 「污染币」判定——侵蚀[可替代性](/glossary/fungibility)、制造双轨市场。
- 在高压管辖区针对性去匿名化活动人士、记者与异见者。

防御手段就是本表其他词条讲到的隐私技术：[避免地址复用](/glossary/address-reuse)、在适用时使用 [CoinJoin](/glossary/coinjoin) 或 [PayJoin](/glossary/payjoin)、支付优先走[闪电网络](/glossary/lightning-network)、节点经由 [Tor](/glossary/tor-hidden-service) 运行、能避开的 KYC 咽喉要道就避开。

链上分析不会消失。保护隐私的比特币使用是一门纪律，不是默认状态。

深入阅读：启发式如何运作、名字从哪里贴上去、工具哪里会出错、哪些防御依然有效——见[比特币隐私专题](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [地址聚类（Address Clustering）](/glossary/address-clustering) · [地址复用（Address Reuse）](/glossary/address-reuse) · [区块浏览器（Block Explorer）](/glossary/block-explorer) · [链可视化（Chain Visualization）](/glossary/chain-visualization) · [CoinJoin（协作交易混币）](/glossary/coinjoin) · [矿工可提取价值（MEV）](/glossary/miner-extractable-value-mev) · [交易（Transaction）](/glossary/transaction) · [交易索引（txindex）](/glossary/transaction-index-txindex) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output)
