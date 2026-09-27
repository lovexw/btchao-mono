---
title: 锁定内存（Locked Memory）
---

# 锁定内存（Locked Memory）

> **一句话定义：** 不可被换出到磁盘的内存页，防止私钥被写入持久化存储。

锁定内存是这样一种技术：告诉操作系统「不要把这些内存页换出到磁盘」。对比特币核心（Bitcoin Core）等密码学软件来说，这意味着存放解密后的私钥或其他敏感秘密的页面始终留在内存（RAM）里，永远不会被写进交换文件或休眠镜像——免得事后被攻击者从中恢复。

机制上，POSIX 系统（Linux、macOS、BSD）用 `mlock()`，Windows 用 `VirtualLock()`。Bitcoin Core 的安全分配器在存放解密后的密钥材料时会使用这些调用。

它防得住什么：

- **休眠文件**——里面有完整的内存快照，包括密钥。
- **交换文件**——内存吃紧时会把不活跃的内存页写出去。有磁盘访问权的攻击者有可能从里面提取历史密钥材料。
- **对关机机器的取证恢复**——交换文件在重启后仍然留在盘上。

它防不住什么：

- **有足够权限的运行中攻击者**直接读进程内存（root、内核漏洞、调试构建下的 ptrace）。
- **冷启动攻击**——趁内存内容消退前物理提取 RAM 的内容。
- **硬件级攻击**，如 Intel SGX 侧信道或 DRAM rowhammer。

现实限制：

- 锁定内存占用物理内存、无法换出，系统全局有配额上限（Linux 上不用 sudo 通常只有几 MB）。Bitcoin Core 的安全池只用几 KB，对钱包来说上限不是问题，但对需要超大安全池的应用可能是。
- 操作系统必须尊重这个锁。内存极度吃紧时，内核可能宁可 OOM 杀掉进程也不换出，所以实际效果是「交换文件不会出卖你」，而不是「内存坚不可摧」。

这是一种正常工作起来完全隐身的小纪律。硬件钱包在更隔离的环境里做着类似的事；Bitcoin Core 则在一个多进程的操作系统里尽力而为。

**相关词条：** [Bitcoin Core](/glossary/bitcoin-core) · [硬件安全模块（HSM）](/glossary/hardware-security-module-hsm) · [私钥（Private Key）](/glossary/private-key) · [助记词（Seed Phrase）](/glossary/seed-phrase) · [钱包（Wallet）](/glossary/wallet)
