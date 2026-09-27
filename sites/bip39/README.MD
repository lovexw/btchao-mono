# Entropy Vault · BIP39 离线助记词生成器

> Don't Trust, Verify.

100% 离线、零依赖、单文件的 BIP39 助记词生成器。双重熵源混合（CSPRNG + 物理动作），完整 BIP39 标准实现，内置科普知识库。

🌐 **在线预览**：[bip39.btchao.com](https://bip39.btchao.com)

## ✨ 特性

### 安全架构
- **双重熵源**：系统 CSPRNG（`crypto.getRandomValues`）+ 用户物理动作（鼠标/触摸坐标 + 时间噪声），经 SHA-256 混合
- **纯 JS SHA-256**：内联实现，不依赖任何外部库或异步 API
- **官方 BIP39 词表**：2048 词，来自 [bitcoin/bips](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
- **零网络请求**：CSP `default-src 'none'`，无 fetch、无 XHR、无外部资源
- **单文件**：HTML + CSS + JS 全部内联，一个文件就是全部

### 防泄露设计
- 禁止复制 / 剪切 / 右键菜单
- 无"复制到剪贴板"按钮
- 无"下载"按钮
- 生成后清理内存中的敏感数据

### 界面设计
- 明亮暖色调，优雅大气
- 12 / 24 词自由切换
- 全屏物理熵采集面板（进度条 + shimmer 动画）
- 助记词逐词出现动画
- 网络/离线状态自动检测
- 8 张科普知识卡片
- 5 步标准冷操作流程指引

## 🚀 使用方法

### 快速开始
1. 下载 `index.html` 到本地
2. 断开网络连接（飞行模式 + 关闭 WiFi/蓝牙）
3. 浏览器打开文件
4. 点击"开始生成"，在面板区域随意移动鼠标/手指
5. 进度条填满后自动生成助记词
6. 用纸笔手抄（建议两份异地保存）

### 安全操作流程
1. **获取文件**：下载 `index.html`，建议检查代码确认无外部请求
2. **物理传输**：通过 USB 数据线传至离线设备，严禁使用微信/QQ/网盘传输
3. **断网准备**：拔掉数据线，开启飞行模式，关闭 WiFi 和蓝牙
4. **生成助记词**：浏览器打开文件，采集物理熵，纸笔手抄
5. **验证与销毁**：刷新重新生成确认结果完全不同，然后关闭页面、删除文件

## 🔍 安全验证

打开浏览器开发者工具（F12）：
- **Network 标签**：没有任何网络请求
- **Source 标签**：所有代码在单文件中，可完整审计
- 搜索 `fetch`、`XMLHttpRequest`、`src=` 确认无后门

### BIP39 测试向量
本实现已通过以下官方测试向量：
- `00000000000000000000000000000000` → `abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about`
- `7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f` → `legal winner thank year wave sausage worth useful legal winner thank yellow`
- `80808080808080808080808080808080` → `letter advice cage absurd amount doctor acoustic avoid letter advice cage above`

## 🧠 科普知识库

页面内置 8 张科普卡片：
1. **什么是 BIP39？** — 标准协议介绍
2. **双重熵源混合** — 深度防御机制
3. **为什么必须离线？** — 物理隔离原理
4. **如何验证安全性？** — 可审计性
5. **CSPRNG 是什么？** — 底层密码学原理
6. **冷存储最佳实践** — 操作规范
7. **熵与安全强度** — 数学保证（2¹²⁸ ≈ 3.4×10³⁸）
8. **常见安全误区** — 避坑指南

## 📁 项目结构

```
HAB-BIP39/
├── index.html    # 全部代码（HTML + CSS + JS + BIP39 词表）
└── README.MD     # 说明文档
```

## 🛠️ 技术细节

| 组件 | 实现 |
|------|------|
| 熵源 1 | `crypto.getRandomValues()` — 浏览器 CSPRNG |
| 熵源 2 | 鼠标/触摸坐标 + `performance.now()` 时间噪声 |
| 混合 | `SHA256(systemEntropy ∥ SHA256(physicalEntropy))` |
| 校验和 | `SHA256(entropy)` 取前 ENT/32 位 |
| 词表 | BIP39 English（2048 词） |
| 哈希 | 纯 JS SHA-256 实现（无外部依赖） |

### 熵采集目标
- 12 词（128-bit）：192 次物理采样
- 24 词（256-bit）：256 次物理采样

## ⚠️ 安全须知

- 助记词 = 你的全部资产控制权，不存在"找回密码"
- 唯一正确存储方式：**纸笔手抄 + 物理保管**
- 严禁截图、拍照、复制到剪贴板、存入备忘录
- 建议使用专用离线设备生成
- 使用完毕后关闭页面、删除文件

## 📜 协议

MIT License

## 🔗 相关链接

- [BIP39 标准](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP39 英文词表](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
- [SHA-256 算法规范](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)
