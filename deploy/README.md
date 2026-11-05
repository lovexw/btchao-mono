# btchao.com 分站自托管部署

> 把 13 个分站从 Cloudflare Pages 迁到甲骨文 ARM（`167.234.216.40`，San Jose）。
> 与 `xiaowuleyi-blog` 同一套哲学：**代码只改 GitHub，服务器只负责拉取和发布**。

## 1. 为什么是这个形态

上线前实测服务器现状，有三条硬约束决定了方案：

| 现实 | 影响 |
|---|---|
| `443` 被 `xray` 占着（x-ui 节点） | 源站没法自己终结 TLS，**保持 Cloudflare 橙云**，源站只听 `80` |
| 1Panel 的 OpenResty 只挂了 `conf.d` 和 `www` 两个目录 | 发布目录必须落在 `/opt/1panel/apps/openresty/openresty/www/btchao` 下，否则容器里读不到 |
| 宿主没装 node | `ma`（Vite）和 `wiki`（VitePress）的构建放在 `node:20-alpine` 容器里跑 |

所以迁移后的链路是：

```
GitHub main ──(systemd timer, 每 2 分钟)──▶ /opt/btchao-app        代码（只读）
                                                │ 需要构建的站跑 npm build（node 容器）
                                                ▼
                                    /opt/1panel/apps/openresty/openresty/www/btchao/<站>   发布目录
                                                │
                          1Panel OpenResty :80（按 Host 分站）◀── Cloudflare（TLS/CDN）
```

**和 Pages 的差别**：Pages 是「push → 云端构建 → 边缘发布」，我们是「push → 服务器 2 分钟内构建发布」。
数据站（ahr999 / ma / etf / ahr-dca / draw）的 GitHub Actions 保持不动，它们照常提交数据，
服务器拉到新提交后 2 分钟内上线。

## 2. 目录与端口

| 路径 | 用途 |
|---|---|
| `/opt/btchao-app` | 代码（`git reset --hard`，视为只读，可随时重建） |
| `/opt/1panel/apps/openresty/openresty/www/btchao/<站>` | 发布目录，nginx 的 root |
| `/opt/btchao-state` | `last-sha`（已发布的提交）、`last-sync.json` |
| `/opt/1panel/apps/openresty/openresty/conf/conf.d/btchao-sites.conf` | nginx 配置，**由 sync.py 生成，别手改** |
| `127.0.0.1:8801` | `btchao-lottery-api` 容器，顶替 lottery 原来的 Pages Functions（含 `/api/draws*` 查询接口） |

## 3. 一次性初始化

```bash
ssh oracle
sudo bash /opt/btchao-app/deploy/install.sh    # 首次先从 GitHub clone 到该路径，见下
```

首次装机：

```bash
sudo mkdir -p /opt/btchao-app
sudo git clone https://github.com/lovexw/btchao-mono.git /opt/btchao-app
sudo bash /opt/btchao-app/deploy/install.sh
```

`install.sh` 会：建目录 → 装 `btchao-sites-sync.timer` → 跑一次 `sync.py --all`。
第一次全量会构建 wiki（ARM 上 3~5 分钟），耐心等。

## 4. 日常

改完推 `main` 就行，2 分钟内自动上线。手动干预：

```bash
sudo python3 /opt/btchao-app/deploy/sync.py --all          # 全量重发
sudo python3 /opt/btchao-app/deploy/sync.py --site ahr999  # 只发一个站
sudo python3 /opt/btchao-app/deploy/sync.py --dry-run      # 只看计划
journalctl -u btchao-sites-sync -n 50 --no-pager           # 看最近一次同步
systemctl list-timers btchao-sites-sync.timer              # 看下次触发
```

**增删站点只改 `deploy/sites.json`**：加一条记录 → 推上去 → nginx 配置自动重生成并 reload。

## 5. 站点清单

见 [`sites.json`](sites.json)。`src` 是源码目录（用于判断改动是否影响该站），`out` 是发布产物目录，
`build` 表示要先构建，`api` 表示有 `/api/` 需要反代到 8801。

| 站 | 域名 | 特殊处理 |
|---|---|---|
| www | www.btchao.com | 默认站（未知 Host 落到这里） |
| paper / timeline / yuyan / quantum / hold / log / brand / etf / ahr-dca | 同名子域 | 纯静态 |
| ahr999 | ahr.btchao.com | 发布 `public/` |
| ma | ma.btchao.com | Vite 构建 → `dist/` |
| wiki | wiki.btchao.com | VitePress 构建 → `docs/.vitepress/dist/` |
| draw | lottery.btchao.com | 静态 + `/api/` 反代 |

## 6. 从 Pages 切过来的差异（要知道的坑）

1. **`_headers` / `_redirects` 在 nginx 上不生效**。现在是统一策略：HTML 与 CSS/JS `max-age=0, must-revalidate`、图片字体 30 天、全站补 `nosniff / SAMEORIGIN / Referrer-Policy`。
   比 Pages 的逐站规则粗一点，但**只会更保守，不会把新内容缓存住**。要逐站精调时改 `sync.py` 的 `render_nginx()`。
2. **Pages Functions 没了**。`sites/draw/functions/` 的接口由 `deploy/api/` 顶替，**两者共用同一份查询实现**
   `sites/draw/functions/_lib/draw-api.js`（Dockerfile 会把它打进镜像），所以 `lottery.btchao.com` 切过来之后
   `/api/draws*`、`/api/meta`、`/api/tip`、`/api/block/:height` 的返回完全不变。接口文档见
   [../sites/draw/API.md](../sites/draw/API.md)。
   开奖数据是**只读挂载**进容器的（`../../sites/draw/data → /srv/draw/data`），每天 12:00 数据提交后，
   定时器 2 分钟内拉下来，Node 侧按 mtime 自动重新读，不用重启容器。

   > 想给查询 API 开鉴权：在 `deploy/api/.env` 里写 `DRAW_API_KEY=<随机串>`（这个文件不受 `git reset --hard` 影响），
   > 下一次重建容器生效；之后 `/api/draws*` 与 `/api/meta` 要带 `X-API-Key`，`/api/tip`、`/api/block/:height` 不受影响。
3. **`_headers` 等文件不再发布**（rsync 已排除），站点根目录也不会泄露 `README.md` / `AGENTS.md`。
4. **没有 404.html**：所有站都没写自定义 404，nginx 走默认页。

## 7. 切 DNS（真正生效的那一步）

nginx 配好、`curl -H 'Host: xxx'` 验证通过**之后**再动 DNS。每个域名一条 A 记录：

```
www / paper / timeline / yy / quantum / hold / log / brand / etf /
ahr-dca / ahr / ma / wiki / lottery  .btchao.com  →  167.234.216.40  (橙云，保持代理)
```

Cloudflare Dashboard → DNS → 把对应的 CNAME（指向 `*.pages.dev`）改成 A 记录。橙云保持开启。

也可以一条命令切（可回滚）：

```bash
export CF_API_TOKEN=xxx                        # 权限只要 Zone.DNS:Edit
./deploy/switch-dns.sh --check www paper       # 先看现状，不动
./deploy/switch-dns.sh --to-oracle paper       # 切一个站试水
./deploy/switch-dns.sh --rollback paper        # 出问题立刻切回原 CNAME
```

切之前会把原记录存进 `deploy/.dns-backup.json`（已 gitignore），回滚不依赖你还记得旧值。

**建议先切一个站试水**（推荐 `paper`：纯静态、无数据、不涉及 API），观察一天再批量切。

回滚：把 A 记录改回原来的 CNAME 即可，服务器侧不用动；Pages 项目**先别删**，留作备份。

## 8. 排障

| 现象 | 先看 |
|---|---|
| 站点 502 / 默认站点内容 | `sudo docker exec 1Panel-openresty-fokI nginx -t`，再看 `conf.d/btchao-sites.conf` 是否生成 |
| 站点 404 但文件在 | 发布目录对不对：`ls /opt/1panel/apps/openresty/openresty/www/btchao/<站>/index.html` |
| 数据站不更新 | `journalctl -u btchao-sites-sync`；再确认 Actions 那边提交成功 |
| lottery `/api/*` 502 | `sudo docker ps \| grep lottery`；`curl 127.0.0.1:8801/api/health` |
| 改了 nginx 配置模板没生效 | `sync.py --all` 会重生成；只改模板不触发的话手动跑一次 |

## 9. 还没做的

- 443 直连（需要先给 xray 让路，或 nginx stream 按 SNI 分流，风险高，暂不做）
- Cloudflare 缓存规则细调（HTML 现在不缓存，图片可考虑 `Cache Everything`）
- Pages 项目下线（切换稳定后再决定删不删）
