# 新增分站 SOP（标准流程）

> 迁移完成后，加一个新分站的固定动作，全程约 15 分钟。

## 1. 建目录

```bash
cp -r sites/_template sites/<目录名>
```

命名规则：目录名 = 将来的子域名前缀（`sites/foobar` ↔ `foobar.btchao.com`）。例外（历史原因对不上的）先在 README 映射表里登记，再动手。

## 2. 开发

- `sites/<目录名>/index.html` 里把标题、内容改掉；
- 确认 3 行统一风格接入代码还在（tokens.css / footer.js）；页脚配置改 `footer.js` 标签上的 `data-name` / `data-desc` / `data-repo`（见 STYLE-GUIDE §6）；
- 本地预览：`cd sites/<目录名> && python3 -m http.server 8080`。

## 3. 提交

```bash
git add sites/<目录名> && git commit -m "feat: 新增 <目录名> 分站" && git push
```

此时 Pages 不会部署它（还没有对应项目，watch paths 也罩不到）。

## 4. Cloudflare 建 Pages 项目

Workers & Pages → Create → Pages → Connect to Git → `lovexw/btchao-mono`：

| 设置项 | 值 |
|---|---|
| Project name | `btchao-<目录名>` |
| Root directory | `sites/<目录名>` |
| Build watch paths | `sites/<目录名>/**` 和 `shared/**`（两行） |
| Build command | 纯静态留空；构建型填对应命令 |

## 5. 绑域名

新项目 → Custom domains → `foobar.btchao.com`（同区域域名自动建 DNS 记录）。

## 6. 收尾三件套

- [ ] README.md 映射表加一行
- [ ] 主站 btchao.com 加卡片（链接 `https://foobar.btchao.com`）
- [ ] 新站接入验收：样式正常、页脚出现、手机打开不崩

## 7. 特殊类型

- **需要服务端/长连接** → 别放 `sites/`，放 `workers/` 走 wrangler（见 MIGRATION.md §6）。
- **需要定时更新数据** → GitHub Actions cron + `paths` 限定写入自己的目录；workflow 文件放 `.github/workflows/`，命名 `update-<目录名>.yml`。
- **预计体积 > 50MB**（大量图片/整站镜像）→ 单独开仓库，理由登记进 MIGRATION.md §2 的排除表。
