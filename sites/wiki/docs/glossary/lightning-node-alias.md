---
title: 闪电节点别名（Alias）
---

# 闪电节点别名（Alias）

> **一句话定义：** 节点在 gossip 协议中广播的昵称——不是可信身份，只是易读标签。

闪电节点别名是[闪电节点](/glossary/lightning-node)通过 [gossip 协议](/glossary/gossip-protocol-lightning)在 `node_announcement` 消息里公布的易读昵称。它是标签，不是身份。

例子："ACINQ"、"WalletOfSatoshi.com"、"Bitfinex"、"Satoshi's Coffee Shop"，或者缀满 emoji 的「Lightning Bot」。别名随便运营者取——emoji 也行——外加一个供界面渲染的 24 位颜色值。

重要警告：**别名不经过认证**。任何人都可以公布任何别名；多个节点可以叫同一个名字；别名可以冒充知名节点。闪电节点的密码学身份是它的**公钥**（33 字节 secp256k1 公钥）；别名纯粹是体验优化。

别名适合做什么：

- **闪电浏览器展示。** 看路由图可视化时，别名让它可读。
- **钱包的节点列表界面。** 「连哪个对端？」——对端有有意义的别名时好答得多。
- **口头指认。** 「我跟 WalletOfSatoshi 开了条通道」比报公钥短得多。
- **运营者品牌。** 有公开基础设施的闪电节点运营者（托管钱包、交易所、企业）把别名当作对外身份的一部分。

别名不适合做什么：

- **信任判断。** 永远不要因为一个别名单独信任某节点。密码学上算数的是公钥。
- **路由安全。** 一个自称「Coinbase」的骗子节点截不住 Coinbase 的支付——路由认的是公钥。
- **长期身份。** 运营者会改别名；别名本身不背历史责任。

把别名当 Twitter 的显示名看：人类交流很好用，但真正的身份是底下那个 handle（公钥）。

**相关词条：** [BOLT](/glossary/bolt) · [Gossip 协议（Lightning）](/glossary/gossip-protocol-lightning) · [闪电节点（Lightning Node）](/glossary/lightning-node) · [节点运营者](/glossary/node-operator)
