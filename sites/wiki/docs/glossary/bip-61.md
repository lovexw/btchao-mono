---
title: BIP 61
---

# BIP 61

> **一句话定义：** 规定对无效交易或区块的 reject 消息协议；新版 Bitcoin Core 已移除。

BIP 61 规定了 `reject` P2P 消息：[节点](/glossary/node)拒绝一笔[交易](/glossary/transaction)或[区块](/glossary/block)时，告诉发送方原因。听着贴心。实际不是。

两个问题。其一，拒绝理由是参考性的、且极易伪造——依赖它的钱包是在信任一个来自匿名对端的不可靠信号。其二，广播拒绝理由会泄漏节点的[内存池](/glossary/mempool)策略（费率下限、标准性规则、版本偏好），这些最好保密。Bitcoin Core 在 0.18（2019 年）默认禁用 `reject`，0.20（2020 年）彻底删除代码。

现代钱包从「没有消息」推断拒绝：合理时间窗后交易仍未出现在区块浏览器或对端内存池，就当作被丢弃，改用更高手续费重播——最好带上[替换手续费（RBF）](/glossary/replace-fee-rbf)信号，让加价毫不含糊。

规范：[BIP-61](https://github.com/bitcoin/bips/blob/master/bip-0061.mediawiki)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [Bitcoin Core](/glossary/bitcoin-core) · [Bitcoin Core RPC](/glossary/bitcoin-core-rpc) · [节点（Node）](/glossary/node) · [节点自动封禁（Autoban）](/glossary/node-autoban) · [节点同步（Node Synchronization）](/glossary/node-synchronization)
