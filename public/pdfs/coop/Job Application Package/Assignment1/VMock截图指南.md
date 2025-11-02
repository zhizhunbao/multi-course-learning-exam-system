# VMock 截图获取指南

---

## 📋 什么是 VMock 截图？

VMock 是 Algonquin College 使用的简历自动评分工具。截图作为证明你已完成简历审查与评分的证据。

**要求**：截图必须显示简历评分摘要页面（Resume Score Summary）。

---

## 🎯 VMock 评分标准

### 最低要求

- **目标评级**: "Meets Co-op and Career Standards"（符合合作教育和职业标准）
- **必须达标**: 否则无法访问 HireAC 中的合作教育工作

### 评分维度

VMock 主要评估：

- 格式（Format）
- 内容（Content）
- 技能关键词（Keywords）
- 语法和拼写（Grammar & Spelling）
- ATS 兼容性（ATS Compatibility）

---

## 📸 如何获取 VMock 截图

### 步骤 1：访问 VMock

1. 登录 Algonquin College 账户
2. 通过 Brightspace 课程访问 VMock，或直接访问 VMock 网站

### 步骤 2：上传简历

1. 进入 VMock 平台
2. 选择"Upload Resume"或"Review Resume"
3. 上传简历 PDF 或 Word

### 步骤 3：等待评分

1. VMock 开始评分（通常数分钟）
2. 刷新页面或等待完成

### 步骤 4：查看评分摘要

1. 评分完成后进入 "Resume Score Summary"
2. 页面包含：
   - 总分（如 85/100）
   - 各维度得分
   - 评级（如 "Meets Standards"）
   - 改进建议
   - 图表/可视化

### 步骤 5：截图

**重要**：必须截取完整评分摘要页面

#### Windows 截图方法

**方法 1: Snipping Tool（推荐）**

1. 按 `Win + Shift + S`
2. 选择矩形截图
3. 框选页面
4. 自动复制，粘贴到文档

**方法 2: Print Screen**

1. 在评分页面按 `PrtScn`
2. 打开 Paint
3. `Ctrl + V`
4. 保存为 PNG/JPG

**方法 3: Win + Shift + S（Windows 10/11）**

1. 同上快捷键
2. 捕获后保存
3. 存储为 PNG/JPG

#### Mac 截图方法

**方法 1: Command + Shift + 4**

1. 按快捷键
2. 选择区域
3. 自动保存到桌面

**方法 2: Command + Shift + 3**

1. 按快捷键
2. 全屏保存

#### 浏览器截图方法

**Chrome Edge Brave（推荐）**

1. `F12` 打开开发者工具
2. `Ctrl + Shift + P`（Mac: `Cmd + Shift + P`）
3. 输入 "Screenshot"
4. 选择 "Capture full size screenshot"

**Firefox**

1. 使用自带截图工具
2. 或安装扩展

---

## 📐 截图质量要求

### ✅ 必须包含的元素

1. 页面标题（"Resume Score Summary"）
2. 总分
3. 评级（如 "Meets Standards"）
4. 分数
5. 建议（至少部分可见）
6. 可能的时间戳

### ⚠️ 避免的问题

- 只截部分信息
- 尺寸过小
- 模糊或压缩过度
- 截取错误页面
- 遮挡信息

---

## 💾 保存截图

### 文件格式

- PNG（首选）
- JPG

### 文件命名

```
VMock_Resume_Score_PengWang_F25.png
```

或简化：

```
vmock_score.png
```

### 存储位置

```
public/pdfs/coop/Job Application Package/Assignment1/image/vmock/
```

---

## 📝 你已有的截图

查看目录中有以下截图：

```
public/pdfs/coop/Job Application Package/Assignment1/image/GEP1001-简历王鹏-F25/
├── 1762099775291.png  ← 截图1
└── 1762099796664.png  ← 截图2
```

这些截图可能已包含所需内容。但请：

1. 打开文件
2. 确认包含评分摘要
3. 确保清晰可读

---

## 🔍 如何验证截图质量

### 检查清单

- [ ] 页面标题可见
- [ ] 总分清楚
- [ ] 评级清晰
- [ ] 各维度得分可见
- [ ] 建议完整
- [ ] 字体清晰
- [ ] 颜色不失真
- [ ] 尺寸适中
- [ ] 无遮挡

### 如果截图不达标

1. 修改简历
2. 重新上传
3. 等待新评分
4. 截取新页面
5. 保存并替换旧文件

---

## 📦 合并到 PDF 包

### 步骤 1：准备文件

1. 简历 PDF（英文）
2. VMock 截图（1-2 张）
3. 求职信 PDF

### 步骤 2：合并 PDF

**在线工具（免费）：**

- iLovePDF
- SmallPDF
- PDF24

**本地软件（推荐）：**

- Adobe Acrobat
- Foxit PhantomPDF
- PDFtk

**命令行（Mac/Linux）：**

```bash
# 需要 Ghostscript
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite \
   -sOutputFile=merged.pdf \
   resume.pdf vmock.png cover_letter.pdf
```

### 步骤 3：验证

- 顺序正确
- 清晰可读
- 页码与目录准确
- 大小合理
- PDF/A 兼容

---

## 🎓 示例截图片段说明

### 典型的 VMock 评分摘要应包含：

```
╔══════════════════════════════════════════════════╗
║    VMock Resume Score Summary                   ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║    Overall Score: 85/100                        ║
║                                                  ║
║    Rating: ✅ Meets Co-op and Career Standards  ║
║                                                  ║
║    ┌────────────────────────────────────────┐   ║
║    │ Format:         92/100        ████████ │   ║
║    │ Content:        88/100        ████████ │   ║
║    │ Keywords:       85/100        ███████  │   ║
║    │ Grammar:        90/100        ████████ │   ║
║    │ ATS:            80/100        ██████   │   ║
║    └────────────────────────────────────────┘   ║
║                                                  ║
║    Recommendations:                              ║
║    • Add more quantifiable achievements         ║
║    • Include relevant keywords from job posts   ║
║    • Optimize for ATS compatibility             ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

---

## ⚡ 快速操作指南

### 如果已有截图

**只需验证质量：**

```bash
# 在 Windows 资源管理器中打开
explorer "public/pdfs/coop/Job Application Package/Assignment1/image/GEP1001-简历王鹏-F25"
```

检查截图是否包含：

- ✅ 评分摘要
- ✅ 总分与评级
- ✅ 各维度得分

### 如果需要重新截图

**快速流程：**

1. 访问 VMock
2. 上传 `GEP1001 - Resume Peng Wang - F25.md` 导出的 PDF
3. 等待评分
4. 截取完整摘要页面
5. 保存为 PNG
6. 验证内容
7. 合并到最终 PDF

---

## 📚 相关文件

- 简历英文版: `GEP1001 - Resume Peng Wang - F25.md`
- 简历中文版: `GEP1001 - 简历 王鹏 - F25.md`
- 求职信: `Cover Letter - Peng Wang - AI Backend Developer - Intact.md`
- VMock 指南: `Vmock Resume Review Activity_Mandatory_Algonquin College_Co-op.pdf`

---

## ❓ 常见问题

### Q1: 截图需要多大？

A: 建议至少 800x600，完整显示摘要即可

### Q2: 可以截多张吗？

A: 可以，保证信息完整

### Q3: 评分不达标怎么办？

A: 按建议改简历后重传

### Q4: 必须彩色吗？

A: 一般彩色即可；如打印，黑白也可

### Q5: 截图时间过期怎么办？

A: 如截图包含评分信息，即可使用

---

## ✅ 最终检查

提交前确认：

- [ ] 简历 PDF 清晰可读
- [ ] VMock 截图包含完整评分摘要
- [ ] 求职信 PDF 正确格式化
- [ ] 三个文件正确合并为一个 PDF
- [ ] 合并后的 PDF 页面顺序正确
- [ ] 文件大小合理（<5MB）
- [ ] 已保存为 PDF（不是 ZIP/RAR）
- [ ] 文件命名规范

---

**提示**：如需我帮你把现有截图合并到 PDF，请告知。验证截图质量后再合并。
