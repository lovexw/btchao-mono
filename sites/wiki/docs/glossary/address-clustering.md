---
title: 地址聚类（Address Clustering）
---

# 地址聚类（Address Clustering）

> **一句话定义：** 一种链上分析方法：根据交易模式，把多个地址归到同一个用户或实体名下。

地址聚类是[链上分析](/glossary/chain-analysis)的基础技术：把「很可能属于同一个主人」的比特币[地址](/glossary/address)归为一组。绝大多数区块链监控体系，都建立在它之上。

主要的聚类启发式：

- **共同输入归属。** 如果一笔[交易](/glossary/transaction)同时花费了来自多个地址的 [UTXO](/glossary/utxo-unspent-transaction-output)，那这几个地址几乎必然属于同一个人——因为只有他才能对全部输入签名。这是最强的聚类启发式，也是 [PayJoin](/glossary/payjoin) 对分析如此致命的原因：它故意打破这个假设。
- **找零输出识别。** 一笔交易通常有两个输出：付款 + 找零，找零一般回到付款方手里。识别出哪个是找零，就能顺藤摸瓜。有多种启发式（整数金额、全新地址模式、脚本类型匹配）可以不完美地猜出找零。
- **地址复用。** 只要你在任何场景见过地址 A，之后每一笔碰 A 的交易都会和它的历史关联起来。
- **时间关联。** 广播时间接近、来自同一网络位置、手续费模式相似——这些都会指向同一个用户。
- **外部锚定。** 实名认证（KYC）的交易所手里有客户记录，能把地址对上真人。聚类里只要有一个地址被认出来，整个聚类就全部暴露。

隐私防御的思路，就是故意违反这些启发式：

- 不要把不同身份语境的 UTXO 合并进同一笔交易。
- 用[硬币控制](/glossary/coin-control)手动挑选要花的 UTXO。
- 用 [CoinJoin](/glossary/coinjoin) 或 PayJoin 打破「共同输入即共同主人」的假设。
- 避免[地址复用](/glossary/address-reuse)。
- 不需要上链的支付，走[闪电网络](/glossary/lightning-network)。

聚类不是「某一刻被识破」，而是证据随时间不断累积、越滚越大。防御同样是一场持久战：比特币上的隐私是一种日常实践，不是一锤子买卖。

想看「两条启发式如何织出大多数聚类、交易所记录如何给聚类冠名」，读深度专题《[比特币隐私](/rabbit-holes/bitcoin-privacy)》。

**相关词条：** [地址](/glossary/address) · [地址索引](/glossary/address-indexing) · [地址复用](/glossary/address-reuse) · [链上分析](/glossary/chain-analysis) · [硬币控制](/glossary/coin-control) · [CoinJoin](/glossary/coinjoin) · [可替代性](/glossary/fungibility)
