# HAB 品牌网站风格标准 · B 模块（Bitcoin）

## 1. 整体风格定位

B 模块代表 Bitcoin，象征**自由、去中心化与数字秩序**。网站整体风格追求**极简与现代**，强调几何布局与留白，配色主导为白与橙，辅以深灰与浅灰，体现信任与科技感。

## 2. 品牌标识 Logo

### 📋 Logo 使用规范

- **统一使用比特币标准 Logo**，象征去中心化与数字资产
- 所有 B 模块相关网站必须使用此 Logo 作为品牌标识
- Logo 周围保持适当留白，最小边距为 Logo 宽度的 20%
- 可在浅色或深色背景上使用，保持清晰可辨识
- 不得拉伸变形，保持原始比例
- **建议尺寸**：
  - 导航栏：32-48px
  - 页头：64-120px

**Logo 地址**：
```
https://tc.xiaowuleyi.com/file/1762677135128_bitcoin-btc-logo.svg
```

## 3. 品牌配色

| 用途 | 颜色名称 | 色值 | 使用场景 |
|------|---------|------|---------|
| 主色 | Primary | `#1A1A1A` | 标题、深色背景、文字强调 |
| 强调色 | Accent | `#FF9900` | 按钮、链接、hover 状态、关键元素 |
| 背景色 | Background | `#FAFAFA` | 页面背景 |
| 文字色 | Text | `#222222` | 正文文字 |
| 边框色 | Border | `#E0E0E0` | 卡片边框、分隔线 |

### 辅助色

- **白色**：`#FFFFFF` - 卡片背景、按钮文字
- **浅灰**：`#F5F5F5` - 次要背景、提示框
- **中灰**：`#999999` - 次要文字
- **成功色**：`#4CAF50` - 成功提示
- **警告色**：`#FF9900` - 警告提示（与 Accent 相同）
- **危险色**：`#F44336` - 危险提示、错误信息

## 4. 页面风格

### 主题
- **浅色极简风**，留白充足，视觉层次清晰
- 单列居中布局，最大宽度 **960px**
- 信息密度适中，阅读体验优先

### 圆角
- 小圆角：8px（按钮、小元素）
- 中圆角：12px（卡片、表格）
- 大圆角：16px（大型容器）
- **统一柔和视觉，不超过 16px**

### 阴影
- 轻柔扩散型阴影
- 透明度：10%-15%
- 三种级别：
  - 小阴影：`0 2px 8px rgba(0, 0, 0, 0.08)`
  - 中阴影：`0 4px 16px rgba(0, 0, 0, 0.12)`
  - 大阴影：`0 8px 24px rgba(0, 0, 0, 0.15)`

### 排版
- **标题**：使用粗体（font-weight: 600-700），大字号清晰
- **正文**：line-height: 1.7，确保可读性
- **字体栈**：`-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`

### 间距系统
- xs: 8px
- sm: 16px
- md: 24px
- lg: 40px
- xl: 60px

## 5. 交互与动效

### 动效原则
- 动效应简洁且方向性明确
- 类型：滑入、淡入、缩放
- 避免复杂或花哨的动画

### 动画时长
- 快速：**150ms** - 微交互（hover、focus）
- 标准：**200ms** - 一般交互
- 慢速：**250ms** - 复杂转场

### 交互色
- **Hover/Focus 状态**：使用橙色（#FF9900）
- 按钮悬停：轻微上移（1-2px）+ 阴影加深
- 卡片悬停：轻微上移（2px）+ 边框变色为橙色

### 动画示例

```css
/* 标准按钮悬停效果 */
.btn {
    transition: all 200ms ease;
}

.btn:hover {
    background: #E68A00; /* 橙色加深 */
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 卡片悬停效果 */
.card {
    transition: all 200ms ease;
}

.card:hover {
    border-color: #FF9900;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}
```

## 6. 示例区

### 主按钮（Primary Button）
```html
<button class="btn btn-primary">主要操作</button>
```
- 背景：`#FF9900`（橙色）
- 文字：白色
- Hover：`#E68A00`（深橙色）

### 次按钮（Secondary Button）
```html
<button class="btn btn-secondary">次要操作</button>
```
- 背景：白色
- 边框：`#E0E0E0`
- 文字：`#1A1A1A`
- Hover：边框变为橙色

### 示例卡片
- 背景：纯白（`#FFFFFF`）
- 边框：`1px solid #E0E0E0`
- 圆角：12px
- 内边距：24px
- 标题与段落层次清晰

## 7. 设计提示词 / Style Prompt

> 网页风格极简现代，B 模块代表 Bitcoin，自由、去中心化、秩序感。整体布局单列居中，留白充足，信息层次清晰。背景以浅色为主，元素点缀橙色，辅以深灰和浅灰，突出重点信息和按钮。
>
> 字体统一，标题粗体，正文清晰易读。按钮圆角适中，阴影轻柔，交互动画简洁快速（150-250ms），hover/focus 使用橙色点亮。页面气质理性克制，冷静、稳重，传递信任与未来感。
>
> **关键词**：极简｜现代｜浅色｜橙色强调｜留白｜清晰层次｜理性克制｜未来感｜比特币哲学。

*此提示可用于任何 AI 或网页工具，复刻相同风格与逻辑。*

---

## 8. CSS 变量规范

```css
:root {
    /* 品牌配色 */
    --primary: #1A1A1A;
    --accent: #FF9900;
    --background: #FAFAFA;
    --text: #222222;
    --border: #E0E0E0;
    
    /* 辅助色 */
    --white: #FFFFFF;
    --light-gray: #F5F5F5;
    --medium-gray: #999999;
    --success: #4CAF50;
    --warning: #FF9900;
    --danger: #F44336;
    
    /* 阴影 */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
    
    /* 圆角 */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    
    /* 动画时间 */
    --transition-fast: 150ms;
    --transition-normal: 200ms;
    --transition-slow: 250ms;
    
    /* 间距 */
    --spacing-xs: 8px;
    --spacing-sm: 16px;
    --spacing-md: 24px;
    --spacing-lg: 40px;
    --spacing-xl: 60px;
}
```

## 9. 响应式断点

- **移动设备**：< 480px
- **平板设备**：481px - 768px
- **桌面设备**：> 768px

### 移动端适配原则
- 导航栏垂直排列
- 单列布局
- 字号适当缩小
- 触摸目标不小于 44x44px

---

**© 2024 HAB · B 模块设计标准**

未来将加入 H（Health）与 A（AI）模块风格规范。
