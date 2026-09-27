---
title: CoinJoin（协作交易混币）
---

# CoinJoin（协作交易混币）

> **一句话定义：** 隐私方法：把多个用户的输入合并进一笔交易，模糊输出与输入的对应关系。

CoinJoin 要打破的，是[链上分析](/glossary/chain-analysis)机构聚类[比特币地址](/glossary/address)时依赖的「共同所有权」假设：多个用户把各自的 [UTXO](/glossary/utxo-unspent-transaction-output) 合并进同一笔[交易](/glossary/transaction)，输出金额相同，外界观察者再也无法分辨哪个输出对应哪个输入。

最简单的版本：五位参与者各出 0.1 BTC。交易包含五个 0.1 BTC 的输出，分别打到各自控制的新地址。链上，任何输入与它对应输出之间的联系消失了——分析方最好的猜测也只有五分之一。

CoinJoin 真的有用，也真的有局限。它把币与历史聚类剥离，改善[可替代性](/glossary/fungibility)，但：

- **它不是魔法。** 启发式算法仍能找到规律（不均匀的币值、特定的输出排列方式、「混完就花」的相关性）。高水平的分析方有时能把混过的再拆开。
- **只对参与混币的那些输入和输出生效。** 钱包里其他 UTXO 依然带着原有联系，除非你也拿去混。
- **交易本身公开可见。** 观察者知道你参与了 CoinJoin，哪怕分不清哪个输出是你的。某些托管机构把参与过 CoinJoin 的币视为「污染币」——这是可替代性侵蚀最恶劣的形态。

实现版图在 2024 年剧变。**Wasabi 的协调器**（由 zkSNACKs 运营）在 2024 年年中因监管压力关停；**Samourai Whirlpool** 于 2024 年 4 月下线——创始人被美国司法部以洗钱共谋罪名起诉。截至 2026 年，主要的存续方案都是去中心化的：**JoinMarket**（点对点协调，没有中央运营方）以及 **Joinstr** 这类基于 Nostr 的新变体。

[PayJoin](/glossary/payjoin) 是另一种规模更小的路径：不靠批量混币，也能达到类似的隐私目标。

比特币上的隐私可以做到，但需要刻意经营。CoinJoin 是工具之一；地址纪律、Tor、[闪电网络](/glossary/lightning-network)、避开 KYC 咽喉要道，是另外几种。

2024 年之后的完整图景——CoinJoin 保护什么、不保护什么，抓捕改变了什么、什么活了下来——见[比特币隐私专题](/rabbit-holes/bitcoin-privacy)。

**相关词条：** [地址聚类（Address Clustering）](/glossary/address-clustering) · [地址复用（Address Reuse）](/glossary/address-reuse) · [链上分析（Chain Analysis）](/glossary/chain-analysis) · [硬币控制（Coin Control）](/glossary/coin-control) · [混币服务（Mixing Service）](/glossary/mixing-service) · [PayJoin（协作支付）](/glossary/payjoin) · [屏蔽 CoinJoin（Shielded CoinJoin）](/glossary/shielded-coinjoin) · [隐形地址（Stealth Address）](/glossary/stealth-address)
