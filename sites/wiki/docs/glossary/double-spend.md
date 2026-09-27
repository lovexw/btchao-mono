---
title: 双花（Double Spend）
---

# 双花（Double Spend）

> **一句话定义：** 试图把同一笔比特币花两次——这是比特币被发明出来要解决的核心问题。

双花就是有人试图把同一笔比特币花两次。它是比特币被发明出来要解决的那个核心问题。

在一个没有可信中介的数字系统里，你没有任何显而易见的理由不能复制一份付款、把两份都广播出去。更早的数字现金项目（DigiCash、e-gold 等）靠把每笔交易都路由到一个维护唯一权威账本的中央服务器来解决这件事。服务器防止了双花；服务器也是单点故障和单点信任。

比特币的设计干掉了服务器。取而代之的是，全球 UTXO 集合在每个全节点上都有一份副本，每个节点都强制执行同一条规则：一个 [UTXO](/glossary/utxo-unspent-transaction-output) 一旦被花费，任何其他交易都不得再引用它。试图把同一个 UTXO 花两次，你的第二笔交易会被它抵达的每一个诚实节点拒绝。

剩下的边缘情况是交易确认*之前*会发生什么。还躺在[内存池](/glossary/mempool)里的时候，两笔冲突的交易可以赛跑。谁先被挖进区块谁赢；对手区块一经发现，另一笔立即作废。这就是为什么零确认交易并不真正终局——也是比特币社区对大额支付使用 **6 确认规则**的原因。六个区块（约 60 分钟）之后，想逆转交易就得秘密挖出六个替代区块，还得比整个诚实网络更快。那需要持续掌握超过全球一半的算力，而且即便如此也只是概率性成功。这种指数衰减，就是比特币[交易最终性](/glossary/transaction-finality)的实际形状：永远不是绝对终局，但每一次确认都让逆转呈指数级地更难。

比特币对抗双花的安全性，就是工作量证明*买来*的东西。为什么花掉的那些能源不是浪费——它是让账本防伪的成本——见[挖矿专题](/rabbit-holes/mining)。

**相关词条：** [BIP 30](/glossary/bip-30) · [BIP 34](/glossary/bip-34) · [难度（Difficulty）](/glossary/difficulty) · [双花中继（Double Spend Relay）](/glossary/double-spend-relay) · [能源 FUD（Energy FUD）](/glossary/energy-fud) · [完整验证（Full Validation）](/glossary/full-validation) · [竞速攻击（Race Attack）](/glossary/race-attack) · [重组（Reorg）](/glossary/reorg-reorganization) · [重放攻击（Replay Attack）](/glossary/replay-attack) · [SPV（简化支付验证）](/glossary/spv-simplified-payment-verification) · [交易最终性（Transaction Finality）](/glossary/transaction-finality)
