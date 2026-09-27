---
title: Speedy Trial（快速试验）
---

# Speedy Trial（快速试验）

> **一句话定义：** 2021 年 Taproot 采用的激活策略：三个月矿工信号窗口，快成或快败，激活高度固定。终结了软分叉如何激活的数月僵局。

Speedy Trial（快速试验）是比特币 2021 年激活 [Taproot](/glossary/taproot) 使用的策略，也是这次升级在数月僵局之后平稳落地的原因。

僵局源于失败模式之争。区块大小战争之后，没人想重演 SegWit 的僵持，但社区在 [BIP-8](/glossary/bip-8) 的 LOT 标志上分裂：软分叉是否应保证激活、即使矿工拖延（LOT=true）？还是允许它安静失败（LOT=false）？两边都没有共识，这场争论正在消耗开发者的精力。

Russell O'Connor 在激活 IRC 频道提出了出路，David Harding 在 2021 年 3 月 写成文字发布到邮件列表并命名。想法是：别再纠结哲学问题，先跑一个短实验。给矿工约三个月时间、90% 阈值发信号。他们发信号，分叉锁定；不发，就失败，社区再带着真实数据重新争论更强的机制。无论哪种，答案都来得很快——名字由此而来。

最后一块拼图是最低激活高度。即使矿工立刻锁定 Taproot，新规则也要到 709,632 高度、几个月后才生效，给节点运营者充足的升级时间。这个延迟把「矿工是否发信号」与「网络是否准备好执行新规则」分开。

技术上，Speedy Trial 不是一份 BIP。它是一个部署配置——一个降低阈值、加最低高度门槛的修改版 [BIP-9](/glossary/bip-9-versionbits)，参数写在 [BIP-341](/glossary/bip-341) 的部署章节。它随 Bitcoin Core 0.21.1 于 2021 年 5 月 1 日发布。信号窗口从区块 681,408 起按整个难度周期运行；2021 年 6 月 12 日，某周期第 1,815 个区块发出信号，锁定该周期末生效——此时进入窗口才约六周。Taproot 随后如期于 2021 年 11 月 14 日在区块 709,632 激活。

截至 2026 年，它仍是比特币最近一次激活的软分叉——这让 Speedy Trial 成为当今限制条款激活争论中的参照先例。底层机制见[矿工信号](/glossary/miner-signaling)。

Speedy Trial 化解的那场僵局，见深度专题[《BIP 流程》](/rabbit-holes/bip-process)。

**相关词条：** [Taproot](/glossary/taproot) · [BIP 9（VersionBits）](/glossary/bip-9-versionbits) · [BIP 8](/glossary/bip-8) · [BIP 341](/glossary/bip-341) · [矿工信号（Miner Signaling）](/glossary/miner-signaling) · [软分叉（Soft Fork）](/glossary/soft-fork)
