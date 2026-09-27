# 修改总结

## 任务描述
检查导入数据时的计算方式，并将账面收益和真实收益分开显示。

## 修改的文件

### 1. index.html
**修改位置**：持仓统计部分（第59-70行）

**修改内容**：
- 将单一的"账面收益"行替换为三行：
  - 账面收益（未实现）
  - 已实现收益
  - 总收益

### 2. app.js
**修改位置**：updateStatistics 函数（第374-464行）

**修改内容**：
- 重构收益计算逻辑，使用平均成本法
- 分别计算：
  - 未实现收益（账面收益）
  - 已实现收益
  - 总收益
- 为三种收益分别设置显示元素和颜色

### 3. .gitignore
**修改内容**：
- 添加测试文件到忽略列表

## 新增文件

### 1. CALCULATION_EXPLANATION.md（英文详细说明）
包含：
- 计算方法详解
- 示例计算过程
- 验证公式
- 优点说明

### 2. 更新说明.md（中文用户说明）
包含：
- 更新内容概述
- 为什么这样改
- 界面变化说明
- 使用注意事项

### 3. test-import-calculation.js（测试脚本）
- Node.js测试脚本
- 验证计算逻辑的正确性
- 包含示例数据测试

### 4. test_calculation.html（可视化测试页面）
- 浏览器中可打开的测试页面
- 直观展示计算过程
- 包含详细的计算说明

## 核心改进

### 计算逻辑

**之前（错误）：**
```javascript
// 只计算综合收益
netInvested = totalInvested - totalSold
profit = currentValue - netInvested
```

**现在（正确）：**
```javascript
// 使用平均成本法
avgCost = totalBuyCost / totalBuyAmount

// 未实现收益（账面）
currentHoldingsCost = totalHoldings * avgCost
unrealizedProfit = currentValue - currentHoldingsCost

// 已实现收益
soldCost = totalSellAmount * avgCost
realizedProfit = totalSellRevenue - soldCost

// 总收益
totalProfit = realizedProfit + unrealizedProfit
```

### 显示格式

**界面元素ID：**
- `unrealized-profit` - 账面收益（未实现）
- `realized-profit` - 已实现收益
- `total-profit` - 总收益

**显示格式：**
```
$XXX.XX (+/-XX.XX%)
```

颜色：
- 绿色：盈利（正值）
- 红色：亏损（负值）

## 测试结果

使用 example-data.json 中的示例数据测试：

### 输入：
- 买入 0.05 BTC @ $38,000 = $1,900
- 买入 0.03 BTC @ $42,000 = $1,260
- 买入 0.02 BTC @ $45,000 = $900
- 卖出 0.02 BTC @ $62,000 = $1,240
- 当前价格：$50,000

### 输出：
- 平均成本：$40,600/BTC
- 当前持仓：0.08 BTC
- 账面收益（未实现）：$752 (+23.15%)
- 已实现收益：$428 (+52.71%)
- 总收益：$1,180 (+29.06%)

### 验证：
✓ 总收益 = (卖出收入 + 当前市值) - 总买入成本
✓ $1,180 = ($1,240 + $4,000) - $4,060
✓ 计算正确！

## 兼容性

- ✓ 向后兼容旧数据
- ✓ 导入数据自动使用新计算逻辑
- ✓ 不需要修改已存储的交易记录格式
- ✓ LocalStorage 数据结构保持不变

## 用户体验改进

1. **更清晰**：用户可以清楚看到已实现和未实现的收益
2. **更准确**：使用平均成本法，符合实际投资场景
3. **更专业**：与专业投资工具保持一致
4. **易理解**：每项收益都有清晰的标签和说明

## 下一步建议

可选的未来增强：
1. 添加收益趋势图表
2. 支持导出收益报告（PDF/Excel）
3. 添加税务计算功能
4. 支持多币种显示
5. 添加收益目标设置和提醒
