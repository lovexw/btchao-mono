---
title: 币控制（Coin Control）
---

# 币控制（Coin Control）

> **一句话定义：** 钱包功能：手动挑选花哪些 UTXO——相当于从实体钱包里特意抽出某几张钞票付款，是隐私与手续费优化都绕不开的手艺。

币控制（coin control）是让你在构造[交易](/glossary/transaction)时手动挑选要花哪些 [UTXO](/glossary/utxo-unspent-transaction-output) 的钱包功能，而不是任由钱包自动选。它相当于从实体钱包里特意抽出某几张钞票付这笔账。

币控制为什么重要：

- **隐私。** [地址聚类](/glossary/address-clustering)启发式依赖共同输入假设：一笔交易花掉的所有 UTXO 同属一人。手动选择合并哪些 UTXO，就能避免把你宁愿分开的地址连到一起。
- **手续费。** 输入越少 = 交易越小 = 同一 sat/vB 费率下手续费越低。一堆小额 UTXO 加一枚大额时，单花那枚大的往往便宜得多。
- **粉尘管理。** 可以趁低费时段主动合并小额 UTXO（[粉尘](/glossary/dust)），或者避免把它们和不想沾上粉尘来源的贵重 UTXO 混在一起。
- **资金来源标签。** 若你按来源给 UTXO 打过标（KYC 与非 KYC、公司对私人），就能从合适的桶里选择性花费，不搞交叉污染。

基本操作：

1. 钱包把你的 UTXO 逐条列出：金额、地址、（部分钱包）标签。
2. 你手动勾选本次交易要花的那些。
3. 钱包只用它们做输入。

币控制做得好的钱包：Sparrow、Bitcoin Core、Electrum、Specter Desktop、Nunchuk。多数移动钱包为了 UX 简洁默认藏起它。

一般建议：在乎隐私或手续费优化，就学会币控制；只是拿比特币当日常零花钱，自动选择就够用。需要的时候，这个开关就在那里。

底层概念见 [UTXO](/glossary/utxo-unspent-transaction-output)；它所应对的隐私问题见[地址聚类](/glossary/address-clustering)。

为什么合并币恰恰是泄露、而币控制就是为堵它而生——见[比特币隐私专题](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [地址聚类（Address Clustering）](/glossary/address-clustering) · [比特币天数销毁](/glossary/bitcoin-days-destroyed) · [比特币金库（Bitcoin Vault）](/glossary/bitcoin-vault) · [回拨机制（Clawback Mechanism）](/glossary/clawback-mechanism) · [币龄（Coin Age）](/glossary/coin-age) · [币冻结脚本（Coin Freeze）](/glossary/coin-freeze) · [CoinJoin](/glossary/coinjoin) · [确定性钱包（Deterministic Wallet）](/glossary/deterministic-wallet) · [难度（Difficulty）](/glossary/difficulty) · [安全（Security）](/glossary/security) · [未花费输出（UTXO）](/glossary/utxo-unspent-transaction-output) · [虚荣地址（Vanity Address）](/glossary/vanity-address) · [钱包（Wallet）](/glossary/wallet)
