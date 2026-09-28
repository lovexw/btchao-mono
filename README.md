# www.btchao.com — 比特囤币导航主页

> 比特币导航站，精选比特币相关工具与资源。长期主义者的入口。

🌐 线上地址：[https://www.btchao.com](https://www.btchao.com)

## 技术栈

- 纯静态前端：HTML + CSS + JavaScript（无框架、无构建工具）
- Service Worker（PWA 离线缓存）
- 部署平台：Cloudflare Pages
- 域名：btchao.com

## 文件结构

```
www.btchao.com/
├── index.html              # 主页入口
├── styles.css              # 全部样式
├── script.js               # 全部脚本逻辑
├── AGENTS.md               # AI/开发者更新注意事项（改动前必读）
├── sw.js                   # Service Worker（离线缓存）
├── _headers                # Cloudflare Pages 缓存策略
├── ads.txt                 # Google AdSense 验证
├── d50b90d0089f0c2dbcc4d6259d2c7829.txt  # 搜索引擎域名验证
├── robots.txt              # 爬虫规则 + Sitemap 声明
├── sitemap.xml             # 站点地图
├── site.webmanifest        # PWA 清单（图标/主题色）
├── favicon.svg             # 站点图标（矢量）
├── apple-touch-icon.png    # iOS 主屏幕图标 180x180
├── icon-192.png            # PWA 图标 192x192
├── icon-512.png            # PWA 图标 512x512
├── og-image.png            # 社交分享图 1200x630（源文件 og-image.svg）
└── .gitignore
```

## SEO 优化清单

- **T 标签体系**：语义化 title / description / keywords，覆盖「比特币导航、白皮书、定投指数、行情换算、冷钱包教程、每日新闻」等核心词
- **Canonical**：`<link rel="canonical">` 指向 `https://www.btchao.com/`，避免重复收录
- **Open Graph / Twitter Card**：社交分享（微信/微博/QQ/Twitter）展示标题、描述与 1200x630 分享图
- **结构化数据（JSON-LD）**：WebSite + CollectionPage + ItemList（16 个子站条目），利于搜索引擎理解站点结构
- **robots.txt + sitemap.xml**：爬虫规则与站点地图声明
- **性能信号**：关键第三方域 preconnect/dns-prefetch（行情 API、CDN、评论服务），远程二维码图片 `loading="lazy"` + 固定宽高（减少 CLS）
- **可见内容**：页脚新增站点介绍段落，自然覆盖关键词；全站单 h1、语义化 section/heading 层级
- **PWA**：site.webmanifest + 全套图标（favicon.svg / 192 / 512 / apple-touch-icon），theme-color 橙色

## 核心功能

- 🔍 **比特币地址查询** — 链上地址信息查询
- 💱 **比特币汇率换算** — 实时 BTC/法币 双向换算；行情多源级联（OKX → HTX → Gate → Binance → CoinGecko，国内网络可直连），CNY 用实时汇率换算，单源 6 秒超时自动切换
- 📊 **市场指标条** — 恐惧贪婪指数 / 美元指数 DXY / AHR999 / 比特币减半倒计时，多源容灾 + 本地缓存先行渲染
- ⏳ **牛市顶点回归周期** — 2017/2021 顶点重回前高用时对比；当前周期已过天数、实时回撤与按历史节奏推算的回归窗口
- ⚡ **购买比特币指南** — 快闪版购买入口（get.btchao.com）
- 📰 **内容导航卡片** — 桌面端固定三列布局：Blog、白皮书、百科 / 每日新闻、大事记、AHR999 / DCA、定投对比、均线面板 / 购买、BIP39、冷钱包 / 预言、密码、日记、量子 / 品牌
- 🔎 **SEO 深度优化** — Canonical、OG/Twitter 分享、JSON-LD 结构化数据、sitemap、PWA 图标
- 💬 **留言板** — Waline 评论系统
- ⚠️ **微信浏览器检测** — 引导用户在系统浏览器中打开
- 📱 **PWA 支持** — 可添加到主屏幕，支持离线访问
- 📱 **移动端适配** — 响应式设计

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/lovexw/www.btchao.com.git
cd www.btchao.com

# 任意静态服务器启动即可，例如
python3 -m http.server 8080
# 或
npx serve .
```

浏览器访问 `http://localhost:8080` 即可。

## 部署

仓库关联 Cloudflare Pages，`main` 分支推送后自动部署。

### 缓存策略（`_headers`）

- `index.html` / `sw.js` / CSS / JS：不缓存（`max-age=0, must-revalidate`）
- CSS / JS 引用处带 `?v=YYYYMMDD` 版本号参数，**每次修改 css/js 必须同步递增**，详见 [AGENTS.md](AGENTS.md)
- 图片等静态资源：长期缓存（`max-age=31536000, immutable`）

> ⚠️ 历史上 CSS/JS 曾设为一年强缓存，导致更新后老访客页面错位、需强制刷新才恢复，已修复。改动缓存策略前务必先读 [AGENTS.md](AGENTS.md)。

## 相关项目

- [btchao.com 工具站](https://btchao.com) — 比特币工具集合
- [get.btchao.com](https://get.btchao.com) — 购买比特币指南
- [blog.btchao.com](https://blog.btchao.com) — 比特币博客

---

*以上是个人投资思考，不作为你的投资依据。*
