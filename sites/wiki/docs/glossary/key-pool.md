---
title: 密钥池（Key Pool）
---

# 密钥池（Key Pool）

> **一句话定义：** Bitcoin Core 钱包预生成的地址（密钥）缓存，避免地址复用、加速新地址创建。

密钥池是 Bitcoin Core 钱包的一个实现细节：预先批量生成一批密钥（和对应[地址](/glossary/address)）缓存起来，让新地址随取随用，不用当场生成，也让钱包备份在一段创建窗口内保持有效。

在最早的旧式（非 HD）钱包里，密钥池是承重墙。那时每个密钥都是独立的随机数据；如果用户创建地址的速度快过备份速度，备份就会过时——备份之后生成的地址将无法恢复。密钥池（默认 100 把钥匙）就是缓冲垫：只要池子生成后你做过一次备份，接下来 100 个地址都有保障。

Bitcoin Core 0.13（2016 年）引入 [HD 钱包](/glossary/hd-wallet-hierarchical-deterministic-wallet)支持后，密钥池不再是承重墙。HD 派生让钱包可以从种子确定性地生成任何未来地址，备份变成「备份[助记词](/glossary/seed-phrase)」一句话的事。但密钥池机制在内部仍然保留：地址照旧预生成，钱包同时维护一个派生窗口用于间隙限制扫描（标准约定是：连续 20 个派生地址未使用之后就不再往下扫描）。

到 2026 年，Bitcoin Core 的描述符钱包改用描述符范围（descriptor range）来处理这件事，不再有黑箱式的「密钥池」，但底层思路没变。对用户来说这一切是隐形的：钱包按需吐出新地址，备份就是一句助记词。密钥池只是让「打开钱包就能用」得以成立的幕后管道之一。

**相关词条：** [Bitcoin Core](/glossary/bitcoin-core) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [输出描述符](/glossary/output-descriptor) · [地址](/glossary/address) · [助记词](/glossary/seed-phrase)
