---
title: 地址派生路径（Address Derivation Path）
---

# 地址派生路径（Address Derivation Path）

> **一句话定义：** 分层确定性（HD）钱包里的结构化路线（如 m/44'/0'/0'/0/0），用来说明从主种子如何一步步派生出钥匙和地址。

派生路径就是 [BIP 32](/glossary/bip-32) HD 钱包树里的一个斜杠分隔「地址」，告诉钱包从主种子精确派生出哪一把钥匙。标准格式：

```
m / purpose' / coin_type' / account' / change / address_index
```

撇号（有时写作 `h`）表示这一层用 hardened（加固）派生。前三层惯例上都用加固派生，这样即使某个分支的钥匙泄露了，也不会连累兄弟分支。

实际使用的 purpose 层约定：

- **BIP 44**（`m/44h/0h/0h/0/0`）——最早的多账户约定，对应传统 P2PKH `1...` 地址。
- **BIP 49**（`m/49h/0h/0h/0/0`）——P2SH 包裹的隔离见证（`3...` 地址）。
- **BIP 84**（`m/84h/0h/0h/0/0`）——原生隔离见证（`bc1q...` 地址），当前非 Taproot 钱包的默认选择。
- **BIP 86**（`m/86h/0h/0h/0/0`）——Taproot（`bc1p...` 地址）。
- **BIP 48**（`m/48h/0h/0h/<script>h/0/0`）——多签约定。

各段含义：

- `purpose`——这一层以下遵循哪个规范。
- `coin_type`——注册在案的链 ID。比特币是 0，测试网是 1，其他链各有各的号。
- `account`——相互独立的账户序号。惯例默认用 0；有多个钱包的人用 1、2 往后排。
- `change`——0 是收款地址，1 是找零地址（个别钱包把 2 留作「内部找零」）。
- `address_index`——单个地址的顺序计数器。

同一颗种子加上同一条派生路径，在任何遵循约定的钱包里都会派生出同一批私钥。这就是 [BIP 39](/glossary/bip-39) 助记词可以跨钱包移植的原因：把它导入任何一个用相同约定（BIP 84、86 或 44……）的钱包，就能还原出同一套钥匙。

派生路径不匹配，是「我恢复了钱包，怎么余额是空的」的经典病因：种子没错，但钱包在树的另一根枝上找。新式钱包一般会自动尝试常见路径；老钱包或特殊钱包有时需要手动填路径。

**相关词条：** [地址](/glossary/address) · [地址索引](/glossary/address-indexing) · [链码](/glossary/chaincode) · [HD 钱包（分层确定性钱包）](/glossary/hd-wallet-hierarchical-deterministic-wallet) · [分层确定性钱包](/glossary/hierarchical-deterministic-wallet) · [种子熵混合器](/glossary/seed-entropy-mixer) · [助记词](/glossary/seed-phrase) · [种子工具](/glossary/seed-tool)
