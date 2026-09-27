# 网站截图

## 主页 - 深色主题
![主页深色主题](screenshots/homepage-dark.png)

展示网站主页的深色主题，包括：
- 标题和 Logo
- 统计卡片
- 搜索和筛选控件
- 预测卡片列表

## 主页 - 浅色主题
![主页浅色主题](screenshots/homepage-light.png)

展示网站主页的浅色主题。

## 预测卡片详情
![预测卡片](screenshots/prediction-card.png)

单个预测卡片的详细展示，包括：
- 机构信息
- 预测者信息
- 目标价格
- 情绪标签
- 预测内容
- 原文链接

## 搜索功能
![搜索功能](screenshots/search.png)

展示实时搜索功能。

## 筛选和排序
![筛选排序](screenshots/filters.png)

展示按情绪筛选和价格/日期排序功能。

## 移动端响应式
![移动端](screenshots/mobile.png)

展示网站在移动设备上的响应式布局。

---

## 添加截图说明

如果你想为项目添加实际的截图：

1. 创建 `docs/screenshots/` 目录
2. 访问部署的网站
3. 使用截图工具捕获各个场景
4. 将图片保存到 `docs/screenshots/` 目录
5. 更新此文档中的图片链接

推荐的截图工具：
- macOS: Cmd + Shift + 4
- Windows: Snipping Tool 或 Snip & Sketch
- Linux: GNOME Screenshot 或 Flameshot
- 浏览器扩展: Full Page Screen Capture

---

## 如何为预测条目添加报道截图

每条预测数据支持 `imageUrl` 字段，卡片内会展示截图并可点击放大：

1. **准备截图**：打开该条预测卡片上的「查看原文 →」链接，对报道标题和关键段落截图；
2. **保存文件**：放入 `assets/screenshots/` 目录，建议以机构+日期命名（如 `vaneck-2026-05-07.png`）；
3. **修改数据**：在 `data/predictions.json` 对应条目中加入：

```json
"imageUrl": "assets/screenshots/vaneck-2026-05-07.png"
```

4. 刷新页面即可看到卡片中的截图（支持点击放大查看）。

> 提示：也可以直接使用外链图片 URL，但建议将截图存入本仓库，避免外站防盗链或失效。
