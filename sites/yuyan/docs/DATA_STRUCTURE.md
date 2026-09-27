# 数据结构文档

本文档详细说明了预测数据的结构和字段定义。

## 数据文件

主数据文件：`data/predictions.json`

## 根结构

```json
{
  "predictions": [
    // 预测记录数组
  ]
}
```

## 预测记录结构

### 完整示例

```json
{
  "id": 17,
  "date": "2026-06-12",
  "institution": "Galaxy Research",
  "person": "Alex Thorn",
  "role": "研究主管",
  "category": "research",
  "targetPrice": 43000,
  "priceRange": [40000, 46000],
  "targetDate": "2026年第四季度（周期底部）",
  "targetYear": "2026",
  "sentiment": "bearish",
  "quoteEn": "Historical bear-market bottoms arrive 12-13 months after the cycle peak.",
  "content": "Galaxy Research 基于周期规律给出四种底部情景，基准情形为 4–4.6 万美元。",
  "sourceName": "Galaxy Research",
  "sourceUrl": "https://news.google.com/…",
  "imageUrl": "https://…/screenshot.png"
}
```

## 字段详解

### 必填字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `id` | Number | 唯一标识符，递增整数 | `1` |
| `date` | String | 预测发布日期，ISO 8601 格式 | `"2026-06-12"` |
| `institution` | String | 发布预测的机构或公司名称（个人预测者填姓名） | `"摩根大通"` |
| `targetDate` | String | 预期达到的时间，自由格式 | `"2026"`, `"2026年中"` |
| `targetYear` | String | 目标年份分桶，用于图表与筛选 | `"2026"`, `"2030+"`, `"长期"`, `"观点"` |
| `sentiment` | String | 市场情绪，枚举值 | `"bullish"`, `"bearish"`, `"neutral"` |
| `content` | String | 预测内容的详细描述 | 见示例 |

> 价格说明：`targetPrice` 与 `priceRange` 至少提供一个；纯观点类记录（如 Q4 展望、概率数据）可将 `targetPrice` 置为 `null` 并把 `targetYear` 设为 `"观点"`。

### 可选字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `person` | String | 预测者姓名 | `"Arthur Hayes"` |
| `role` | String | 预测者职位或头衔 | `"研究主管"` |
| `category` | String | 主体类型，决定卡片头像配色 | `"bank"` / `"asset"` / `"research"` / `"company"` / `"kol"` / `"media"` / `"market"` |
| `targetPrice` | Number \| null | 目标价格（美元），观点类可为 `null` | `170000` |
| `priceRange` | [min, max] | 目标价区间（如情景列表） | `[300000, 500000]` |
| `quoteEn` | String | 分析师原话引用（英文原文） | `"$1 million per Bitcoin."` |
| `change` | Number | 预期涨跌幅百分比，可为负数 | `-88` |
| `longTermPrice` | Number | 长期目标价格（美元） | `500000` |
| `longTermDate` | String | 长期目标时间 | `"2030"` |
| `sourceName` | String | 来源显示名称 | `"Reuters"` |
| `sourceUrl` | String | 原文链接，完整 URL；无法提供时可留空 | `"https://..."` |
| `imageUrl` | String | 相关截图/配图链接，卡片内可点击放大 | `"https://..."` |

## 字段规则

### ID 规则
- 必须唯一
- 必须为正整数
- 建议递增（但不强制连续）
- 不要重用已删除记录的 ID

### 日期格式
- **发布日期** (`date`): 必须使用 `YYYY-MM-DD` 格式
- **目标时间** (`targetDate`, `longTermDate`): 自由格式，但建议清晰明确
  - ✅ 推荐：`"2026"`, `"2026年Q1"`, `"2026年中"`, `"2026年底"`
  - ⚠️ 避免：`"很快"`, `"不久"`, `"短期内"`

### 情绪类型 (sentiment)

| 值 | 含义 | 标签颜色 | 图标 |
|-----|------|---------|------|
| `"bullish"` | 看涨，价格预期上涨 | 绿色 | 📈 |
| `bearish"` | 看跌，价格预期下跌 | 红色 | 📉 |
| `"neutral"` | 中性，价格预期持平或调整下调 | 灰色 | ➡️ |

**判断标准：**
- 预测价格高于当前市场价格 → `bullish`
- 预测价格低于当前市场价格 → `bearish`
- 预测价格接近当前市场价格或调整预期 → `neutral`

### 价格字段
- 必须为正整数
- 单位为美元（USD）
- 不需要包含货币符号或千位分隔符
- 示例：`170000`（代表 $170,000）

### 机构和人名
- 使用官方中文名称（如有）
- 首次出现的机构建议使用全称
- 人名使用常用翻译或原文

### 内容描述 (content)
- 客观描述预测内容
- 避免添加个人观点或评论
- 可以引用原文关键内容
- 保持简洁，一般 50-200 字为宜

### URL 规则
- 必须是完整的 URL，包含协议（http:// 或 https://）
- 优先使用原始来源
- 确保链接有效且可访问
- 如果原文被删除，可以使用存档服务（如 archive.org）

## 目标年份分桶 (targetYear)

用于「年度目标价图谱」与年份筛选，允许值：

| 值 | 用途 |
|-----|------|
| `"2025"` – `"2029"` | 具体目标年份 |
| `"2030+"` | 2030 年及以后（如 ARK 2030、Saylor 2045） |
| `"长期"` | 未设明确时间的长期框架（供应冲击等） |
| `"观点"` | 无具体目标价的纯观点类记录 |

## 数据验证

### 自动验证

GitHub Actions 会在每次提交时自动验证：

1. ✅ JSON 格式正确性
2. ✅ 必填字段完整性
3. ✅ 字段类型正确性
4. ✅ ID 唯一性
5. ✅ sentiment / targetYear 值有效性
6. ✅ targetPrice 为正数或 null；priceRange 为合法区间

### 手动验证

```bash
# 验证 JSON 格式
python3 -m json.tool data/predictions.json

# 使用验证脚本（如果有）
python3 scripts/validate-data.py
```

## 示例场景

### 场景 1：看涨预测（完整信息）

```json
{
  "id": 10,
  "date": "2025-12-20",
  "institution": "高盛",
  "person": "张三",
  "role": "首席加密货币分析师",
  "targetPrice": 200000,
  "targetDate": "2026年底",
  "change": 100,
  "sentiment": "bullish",
  "content": "高盛分析师张三表示，随着机构投资者持续涌入，比特币价格有望在2026年底翻倍，达到20万美元。",
  "sourceUrl": "https://example.com/news/123"
}
```

### 场景 2：看跌预测（无人名）

```json
{
  "id": 11,
  "date": "2025-12-21",
  "institution": "某投资银行",
  "person": "",
  "role": "",
  "targetPrice": 30000,
  "targetDate": "2026年Q2",
  "sentiment": "bearish",
  "content": "报告指出，监管风险和市场过热可能导致比特币价格回调至3万美元水平。",
  "sourceUrl": "https://example.com/report/456"
}
```

### 场景 3：包含长期目标

```json
{
  "id": 12,
  "date": "2025-12-22",
  "institution": "数字资产研究所",
  "person": "李四",
  "role": "研究主管",
  "targetPrice": 150000,
  "targetDate": "2026",
  "longTermPrice": 500000,
  "longTermDate": "2030",
  "sentiment": "bullish",
  "content": "预计比特币2026年将达到15万美元，长期目标是2030年突破50万美元。",
  "sourceUrl": "https://example.com/research/789"
}
```

## 最佳实践

### 1. 保持一致性
- 同一机构的名称应保持一致
- 日期格式统一使用 ISO 8601
- 相似的角色描述使用相同措辞

### 2. 数据质量
- 优先添加来自权威机构的预测
- 确保原文链接真实有效
- 内容描述客观准确

### 3. 及时更新
- 发现新预测及时添加
- 如果预测被更新或撤回，可以考虑添加新记录

### 4. 备份习惯
- 每次添加数据后提交到 Git
- 定期检查数据完整性

## 常见错误

### ❌ 错误示例 1：日期格式错误

```json
{
  "date": "2025/12/15",  // 应该用 - 而不是 /
  "date": "12-15-2025",  // 应该是 YYYY-MM-DD 格式
}
```

### ❌ 错误示例 2：sentiment 值无效

```json
{
  "sentiment": "positive",  // 应该用 "bullish"
  "sentiment": "上涨",      // 应该用英文枚举值
}
```

### ❌ 错误示例 3：价格包含符号

```json
{
  "targetPrice": "$170,000",  // 应该是纯数字 170000
  "targetPrice": "17万",      // 应该是纯数字 170000
}
```

### ❌ 错误示例 4：URL 不完整

```json
{
  "sourceUrl": "www.example.com",  // 缺少协议，应该是 "https://www.example.com"
  "sourceUrl": "/news/123",        // 相对路径，应该是完整 URL
}
```

## 工具推荐

- **JSON 编辑器**：[VS Code](https://code.visualstudio.com/) + JSON 扩展
- **JSON 验证**：[JSONLint](https://jsonlint.com/)
- **JSON 格式化**：`python3 -m json.tool`
- **URL 编码**：[URL Encoder](https://www.urlencoder.org/)

---

有疑问？查看 [README.md](../README.md) 或 [贡献指南](../CONTRIBUTING.md)。
