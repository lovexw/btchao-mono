---
title: 链状态损坏（Corrupted Chain State）
---

# 链状态损坏（Corrupted Chain State）

> **一句话定义：** 节点的本地区块链数据库内部不一致——密码学上的链本身没坏，坏的是你那份本地拷贝。

链状态损坏是这样一种运维故障模式：节点的本地数据库（区块文件、UTXO 集、各类索引）变得内部不一致。密码学意义上的链本身安然无恙；坏的是*本地拷贝*。

常见原因：

- 数据库写入期间**断电或硬关机**。LevelDB 和 Bitcoin Core 能优雅处理大多数、但不是全部。
- **磁盘损坏**（SSD 衰老、坏道、RAID 重建缺陷）。
- **文件系统层面问题**，尤其是网络存储之上（NFS、sshfs——永远别在这种存储上跑节点）。
- **Bitcoin Core 软件缺陷**，偶尔出现在大版本升级时。
- 写入中途被 **OOM 杀掉**。

症状：节点拒绝启动、报告「corrupted block database」、无法验证新区块、或余额显示离谱。

修复阶梯，从省事到费事：

- **`-reindex-chainstate`。** 用磁盘上现成的区块重建 UTXO 集。区块完好则很快；能清掉链状态数据库里的大多数损坏。
- **`-reindex`。** 重读并重验每个区块文件，同时重建区块索引和链状态。更慢（数小时），但不用重新下载。
- **删除 `chainstate/` 后重索引。** `-reindex-chainstate` 不奏效时的做法：先手动删掉 chainstate 目录再重索引。
- **删库从头同步。** 删 `blocks/` 与 `chainstate/`，从头开始。最后手段；完整 IBD 要 12 小时以上（好硬件）。

预防基本是运维功夫：可靠的硬件（带断电保护的消费级 SSD、谨慎者上 ECC 内存）、不间断电源、别在网络文件系统上跑节点、备份钱包（不是链状态——链状态随时可以从网络重建）。

**相关词条：** [比特币金库（Bitcoin Vault）](/glossary/bitcoin-vault) · [区块链（Blockchain）](/glossary/blockchain) · [链分裂（Chain Split）](/glossary/chain-split) · [分叉检测（Fork Detection）](/glossary/fork-detection) · [全节点（Full Node）](/glossary/full-node) · [完整验证（Full Validation）](/glossary/full-validation) · [节点同步（Node Synchronization）](/glossary/node-synchronization) · [重组（Reorg）](/glossary/reorg-reorganization) · [安全模式（Bitcoin Core）](/glossary/safe-mode-bitcoin-core)
