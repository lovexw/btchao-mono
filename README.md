# btchao-mono

> 一个仓库，装下整个 btchao.com 宇宙。
> 一个子目录 = 一个分站 = 一个子域名。改哪个站，就动哪个文件夹。

## 站点目录映射

| 目录 | 子域名 | 说明 |
|---|---|---|
| `sites/paper` | [paper.btchao.com](https://paper.btchao.com) | 比特币白皮书（小吴乐意翻译） |
| `sites/timeline` | [timeline.btchao.com](https://timeline.btchao.com) | 比特币大事记 |
| `sites/yuyan` | [yy.btchao.com](https://yy.btchao.com) | 比特币预言收录 |
| `sites/quantum` | [quantum.btchao.com](https://quantum.btchao.com) | 量子计算威胁 |
| `sites/hold` | [hold.btchao.com](https://hold.btchao.com) | 慢者生存 |
| `sites/cold-wallet` | [cold-wallet.btchao.com](https://cold-wallet.btchao.com) | 冷钱包教程 |
| `sites/buy` | [buy.btchao.com](https://buy.btchao.com) | 购买比特币教程 |
| `sites/password` | [pd.btchao.com](https://pd.btchao.com) | 随机密码生成 |
| `sites/bip39` | [bip39.btchao.com](https://bip39.btchao.com) | 离线助记词生成 · Entropy Vault |
| `sites/log` | [log.btchao.com](https://log.btchao.com) | 比特币投资日记（本地版） |
| `sites/ma` | [ma.btchao.com](https://ma.btchao.com) | 均线面板 |
| `sites/wiki` | [wiki.btchao.com](https://wiki.btchao.com) | 比特币百科（VitePress） |
| `sites/ahr999` | [ahr.btchao.com](https://ahr.btchao.com) | AHR999 指数 |
| `sites/ahr-dca` | [ahr-dca.btchao.com](https://ahr-dca.btchao.com) | 定投回报对比 |
| `sites/flash-buy` | [get.btchao.com](https://get.btchao.com) | 购买比特币快闪版 |
| `workers/orderflow` | [btcgo.btchao.com](https://btcgo.btchao.com) | BTC 实时订单流（Worker，二期） |
| `shared/` | assets 站 | 全站统一风格资产（tokens.css / footer.js） |

完整迁移背景、分批计划与操作步骤见 [docs/MIGRATION.md](docs/MIGRATION.md)。

## 目录结构

```
sites/        静态分站（目录名 = 子域名前缀；_template/ 为新站脚手架）
workers/      Cloudflare Workers 项目
shared/       统一风格资产，单独部署为 assets.btchao.com
docs/         迁移方案 / 风格规范 / 新站 SOP
scripts/      迁移与运维脚本
```

## 快速开始

```bash
# 迁移第一批分站（详见 docs/MIGRATION.md §5）
./scripts/migrate-batch1.sh paper timeline

# 新增一个分站（详见 docs/NEW-SITE-SOP.md）
cp -r sites/_template sites/mysite

# 改统一风格后分发到全部站点（详见 docs/STYLE-GUIDE.md）
./scripts/sync-shared.sh
```

## 本地预览某个站

各分站相互独立，直接进对应目录起静态服务即可：

```bash
cd sites/paper && python3 -m http.server 8080
```
