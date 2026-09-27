---
title: BIP 144（SegWit 中继）
---

# BIP 144（SegWit 中继）

> **一句话定义：** 定义中继 SegWit 数据的新 P2P 消息类型（如 witnessTx）。

[BIP-144](https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki) 定义了在比特币网络中转发 [SegWit](/glossary/segwit-segregated-witness-bip-141) 交易与[区块](/glossary/block)所需的对等网络（P2P）协议改动。它是 BIP-141（SegWit 共识）与 BIP-143（签名哈希）的网络协议配套。

SegWit 给 P2P 层出的难题：见证数据是区块的一部分，却不在旧的交易格式里。老节点要能收到有效区块而不被看不懂的数据噎住；新节点需要看到并验证见证数据，才能执行 SegWit 规则。

BIP-144 的方案：

- **新服务位 `NODE_WITNESS`**，让支持 SegWit 的节点表明身份。
- **感知见证的消息类型。** 来自 SegWit 感知对端的 `tx` 消息以新格式携带见证数据。旧对端收到的交易剥掉了见证数据（对它们是合法的——它们不执行 SegWit规则）。
- **感知见证的 `getdata` 请求。** SegWit 感知对端可以请求带见证数据的区块；旧对端则请求不带。
- **向后兼容。** 不标 NODE_WITNESS 的老节点依旧走旧代码路径收到有效区块，只是不做见证验证。

这种双协议并存，让 SegWit 的部署没有撕裂网络。SegWit 感知节点执行全部新规则；未升级节点仍然验证它们理解的那部分，并以它们（略宽松）的规则视角接受 SegWit 区块。

BIP-144 属于人人习以为常、但对 SegWit 落地不可或缺的基础设施。它在网络层撑起的那次共识变更，见[SegWit（隔离见证）](/glossary/segwit-segregated-witness-bip-141)。

**相关词条：** [BIP（比特币改进提案）](/glossary/bip-bitcoin-improvement-proposal) · [BIP 9（版本位）](/glossary/bip-9-versionbits) · [BIP 91](/glossary/bip-91) · [SegWit（隔离见证，BIP 141）](/glossary/segwit-segregated-witness-bip-141) · [BIP 148（UASF）](/glossary/bip-148-uasf) · [Taproot](/glossary/taproot) · [BIP 342（Tapscript）](/glossary/bip-342-tapscript) · [P2WPKH（付给见证公钥哈希）](/glossary/p2wpkh-pay-witness-public-key-hash) · [P2WSH（付给见证脚本哈希）](/glossary/p2wsh-pay-witness-script-hash)
