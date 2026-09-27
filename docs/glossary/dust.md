---
title: 粉尘（Dust）
---

# 粉尘（Dust）

> **一句话定义：** UTXO 中极小的 BTC 数额，通常低于「花它所需的手续费」。

粉尘（dust）指小到「花掉它的手续费比它本身还贵」的 [UTXO](/glossary/utxo-unspent-transaction-output)。没有固定的粉尘阈值；它取决于你想花它那一刻的费率。

粗略估计：费率 10 聪/vB 时，花费一个典型的 P2WPKH 输入约需 680 聪手续费。此刻任何小于这个数的 UTXO 都是粉尘。费率 50 聪/vB 时，粉尘线约在 3,400 聪。粉尘是网络行情的函数，不是固定数字。

粉尘从哪来：

- **找零残余。** 一笔支付 X、找零 Y-X-手续费的交易，偶尔会留下小到够得上粉尘的找零。
- **水龙头与发糖。** 营销空投常常设计出来就是粉尘。
- **[粉尘攻击](/glossary/dust-attack)。** 攻击者向大量地址发送极小额，指望收件人日后把这些粉尘输出与其他 UTXO 合并在一笔交易里花掉——这等于公开把这些地址联系起来，帮攻击者绘制钱包图谱。

Bitcoin Core 强制执行一个最低**粉尘限额**：低于它的输出，交易根本不会被中继——目前传统输出为 546 聪，隔离见证输出更低。低于限额的输出被视为非标准，不会传播。高于限额但在经济上仍是粉尘的输出可以创建，只是花起来很贵。

手里有粉尘，正确的做法通常是等。等费率降到 1-2 聪/vB（确实会有闲时），你就可以用[合并交易](/glossary/consolidation-transaction)把许多粉尘 UTXO 归拢成一个较大的输出。只是要清楚：合并粉尘会把涉及的地址联系起来，所以要有意识地做，不要随手做。

**相关词条：** [地址复用（Address Reuse）](/glossary/address-reuse) · [丢弃阈值（Discard Threshold）](/glossary/discard-threshold) · [粉尘攻击（Dust Attack）](/glossary/dust-attack) · [粉尘限额（Dust Limit）](/glossary/dust-limit) · [粉尘清扫（Dust Sweeping）](/glossary/dust-sweeping) · [交易手续费（Transaction Fee）](/glossary/transaction-fee) · [UTXO（未花费交易输出）](/glossary/utxo-unspent-transaction-output)
