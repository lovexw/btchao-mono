---
title: 完整验证（Full Validation）
---

# 完整验证（Full Validation）

> **一句话定义：** 节点对照全部共识规则、独立验证每一个区块和每一笔交易——没有捷径，不信任任何其他节点。

完整验证是比特币[全节点](/glossary/full-node)对每个区块做的事：对照每一条共识规则，独立验证这个区块及其全部交易是正确的。没有捷径，不信任别的节点，也没有「看着差不多」。

验证都验些什么：

- **区块结构。** 头部格式、时间戳约束、版本号、目标/难度。
- **[工作量证明](/glossary/proof-work-pow)。** 区块头的哈希值确实低于当前目标。
- **默克尔根承诺。** 头部里的默克尔根确实对应区块内的交易集合。
- **每一笔交易。** 输入引用的是有效且未花费的 [UTXO](/glossary/utxo-unspent-transaction-output)；签名通过锁定脚本的验证；输出总值不超过输入（无通胀）；[区块补贴](/glossary/block-subsidy)不超过该高度协议规定的数额。
- **脚本执行。** 每个花费脚本在比特币脚本规则下都执行为真。
- **软分叉规则。** [SegWit](/glossary/segwit-segregated-witness-bip-141)、[Taproot](/glossary/taproot)、[CLTV](/glossary/bip-65-opchecklocktimeverify)、[CSV](/glossary/checksequenceverify-csv) 等全部强制执行。

为什么这比听起来更重要：

- **你从第一性原理获知链的真实状态。** 你不必信任你的网络对等节点、交易所、区块浏览器或链上分析公司。链说了什么就是什么；告诉你的是你自己的节点。
- **你执行共识规则。** 哪个矿工敢产出一个超额补贴、无效签名或任何违规的区块，你的节点直接拒收。乘以数万个全节点，这就是让规则*成真*——而不只是建议——的东西。
- **任何 51% 攻击都无法污染你的视图。** 哪怕全体矿工合谋产出无效区块，你的全节点也会拒绝它们。光有算力骗不过一个完整验证者。

对照组是 [SPV](/glossary/spv-simplified-payment-verification)：它只验证区块头里的工作量证明并信任包含证明，但不完整验证区块内容。手机钱包用 SPV 没问题。但定义比特币如何防御坏人的安全模型，是完整验证。跑它的实际成本见[全节点](/glossary/full-node)。

**相关词条：** [链状态损坏（Corrupted Chain State）](/glossary/corrupted-chain-state) · [双花（Double Spend）](/glossary/double-spend) · [全节点（Full Node）](/glossary/full-node) · [节点（Node）](/glossary/node) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [重组（Reorg）](/glossary/reorg-reorganization) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification)
