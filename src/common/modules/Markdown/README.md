# MarkdownRenderer 组件

## 概述

`MarkdownRenderer` 是一个功能强大的 Markdown 渲染组件，支持 GitHub Flavored Markdown (GFM)、数学公式、代码高亮、表格、任务列表等多种特性。

## 功能特性

### ✨ 支持的 Markdown 特性

- **GitHub Flavored Markdown (GFM)** - 表格、删除线、任务列表等
- **数学公式** - 使用 KaTeX 渲染 LaTeX 数学公式（行内和块级）
- **代码高亮** - 基于 highlight.js，自动检测语言
- **原始 HTML** - 支持在 Markdown 中嵌入 HTML
- **Emoji** - 支持 :emoji: 语法
- **目录生成** - 可选的自动目录生成（TOC）

### 🎨 自定义组件

- **代码块** - 带语言标签的代码块，支持语法高亮
- **表格** - 响应式表格，自动添加滚动条
- **链接** - 外部链接自动在新标签页打开
- **图片** - 延迟加载，带标题支持
- **引用块** - 美化的引用样式
- **任务列表** - 交互式复选框列表

## 使用方法

### 基础用法

```jsx
import { MarkdownRenderer } from "@/common/modules";

function MyComponent() {
  const content = `
# 标题

这是一个**粗体**文本和一个*斜体*文本。

\`\`\`javascript
console.log('Hello, World!');
\`\`\`
  `;

  return <MarkdownRenderer content={content} />;
}
```

### 带自定义样式

```jsx
<MarkdownRenderer
  content={markdownContent}
  className="prose-headings:text-blue-900 prose-p:text-gray-700"
/>
```

### 启用目录

```jsx
<MarkdownRenderer content={markdownContent} showToc={true} />
```

## Props

| 属性        | 类型     | 默认值  | 描述                   |
| ----------- | -------- | ------- | ---------------------- |
| `content`   | `string` | -       | 要渲染的 Markdown 内容 |
| `className` | `string` | `""`    | 额外的 CSS 类名        |
| `showToc`   | `bool`   | `false` | 是否显示目录           |

## Markdown 示例

### 标题

```markdown
# H1 标题

## H2 标题

### H3 标题
```

### 列表

```markdown
- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2
```

### 任务列表

```markdown
- [x] 已完成任务
- [ ] 未完成任务
```

### 表格

```markdown
| 列 1   | 列 2   | 列 3   |
| ------ | ------ | ------ |
| 数据 1 | 数据 2 | 数据 3 |
```

### 代码块

````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

### 数学公式

```markdown
行内公式：$E = mc^2$

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 引用

```markdown
> 这是一个引用块
> 可以有多行
```

### 链接和图片

```markdown
[链接文本](https://example.com)
![图片描述](image-url.jpg)
```

## 样式定制

组件使用专用的 CSS 文件 `MarkdownRenderer.css`，你可以通过以下方式定制样式：

1. **使用 className prop** - 传入 Tailwind CSS 类名
2. **覆盖 CSS 变量** - 修改 `MarkdownRenderer.css` 中的样式
3. **使用 Tailwind prose 修饰符** - 例如 `prose-headings:text-blue-900`

## 依赖项

- `react-markdown` - Markdown 解析和渲染
- `remark-gfm` - GitHub Flavored Markdown 支持
- `remark-math` - 数学公式解析
- `remark-toc` - 目录生成
- `remark-emoji` - Emoji 支持
- `rehype-raw` - HTML 支持
- `rehype-katex` - 数学公式渲染
- `rehype-highlight` - 代码高亮
- `katex` - LaTeX 渲染引擎
- `highlight.js` - 语法高亮库

## 性能优化

- 使用 `useMemo` 缓存插件配置和组件映射
- 图片懒加载（`loading="lazy"`）
- 响应式表格滚动
- 代码块按需高亮

## 浏览器兼容性

支持所有现代浏览器，包括：

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## 注意事项

1. **数学公式** - 确保正确使用 `$` 或 `$$` 包裹公式
2. **代码块语言** - 指定语言可以获得更好的语法高亮
3. **外部链接** - 自动在新标签页打开，带 `noopener noreferrer` 安全属性
4. **任务列表** - 复选框是只读的，不可交互

## 示例项目

在以下组件中可以看到使用示例：

- `src/modules/learning/components/LessonContent.jsx`
- 其他使用 Markdown 渲染的地方

## 更新日志

### v1.0.0

- 初始版本
- 支持基础 Markdown 特性
- 添加专用 CSS 文件
- 自定义组件实现
