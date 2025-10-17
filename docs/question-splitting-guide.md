# 题目数据拆分说明

## 📁 新的文件结构

题目数据已按章节和题型拆分为更细粒度的文件，便于管理和使用。

### 目录结构

```
public/data/questions/
├── chapters/                    # 按章节拆分
│   ├── cst8503-chapter1-knowledge-representation-zh.json
│   ├── cst8503-chapter1-knowledge-representation-en.json
│   ├── cst8503-chapter2-prolog-basics-zh.json
│   ├── cst8503-chapter2-prolog-basics-en.json
│   ├── cst8503-chapter3-prolog-debugging-zh.json
│   ├── cst8503-chapter3-prolog-debugging-en.json
│   ├── cst8503-chapter5-prolog-lists-operators-zh.json
│   ├── cst8503-chapter5-prolog-lists-operators-en.json
│   ├── cst8503-chapter6-prolog-negation-zh.json
│   ├── cst8503-chapter6-prolog-negation-en.json
│   ├── cst8503-chapter7-midterm-review-zh.json
│   └── cst8503-chapter7-midterm-review-en.json
├── types/                       # 按题型拆分
│   ├── cst8503-multiple-choice-zh.json
│   ├── cst8503-multiple-choice-en.json
│   ├── cst8503-true-false-zh.json
│   ├── cst8503-true-false-en.json
│   ├── cst8503-text-zh.json
│   └── cst8503-text-en.json
├── cst8503-index-zh.json        # 课程索引（中文）
├── cst8503-index-en.json        # 课程索引（英文）
├── cst8503-zh.json              # 完整题目数据（中文）
├── cst8503-en.json              # 完整题目数据（英文）
└── cst8503-en-multiple-choice.json  # 原有文件
```

## 📊 题目分布统计

### 按章节分布（中文）

- **Prolog 基础** (chapter2-prolog-basics): 28 题
- **知识表示** (chapter1-knowledge-representation): 5 题
- **Prolog 调试** (chapter3-prolog-debugging): 9 题
- **Prolog 列表和操作符** (chapter5-prolog-lists-operators): 4 题
- **Prolog 否定** (chapter6-prolog-negation): 3 题
- **期中复习** (chapter7-midterm-review): 1 题

### 按题型分布（中文）

- **选择题** (multiple-choice): 43 题
- **判断题** (true-false): 2 题
- **文本题** (text): 5 题

## 🔧 DataService API 更新

### 新增方法

#### 1. 获取课程索引

```javascript
const index = await dataService.getCourseIndex("cst8503", "zh");
// 返回课程的所有章节和题型信息
```

#### 2. 获取特定章节题目

```javascript
const chapterQuestions = await dataService.getChapterQuestions(
  "cst8503",
  "chapter2-prolog-basics",
  "zh"
);
```

#### 3. 获取特定题型题目

```javascript
const multipleChoiceQuestions = await dataService.getQuestionsByType(
  "cst8503",
  "multiple-choice",
  "zh"
);
```

### 增强的 getQuestions 方法

```javascript
// 获取所有题目（向后兼容）
const allQuestions = await dataService.getQuestions("cst8503", "zh");

// 获取特定章节题目
const chapterQuestions = await dataService.getQuestions("cst8503", "zh", {
  chapter: "chapter2-prolog-basics",
});

// 获取特定题型题目
const typeQuestions = await dataService.getQuestions("cst8503", "zh", {
  type: "multiple-choice",
});
```

## 🎯 使用场景

### 1. 按章节学习

```javascript
// 获取特定章节的题目进行学习
const prologBasicsQuestions = await dataService.getChapterQuestions(
  "cst8503",
  "chapter2-prolog-basics",
  "zh"
);
```

### 2. 按题型练习

```javascript
// 专门练习选择题
const multipleChoiceQuestions = await dataService.getQuestionsByType(
  "cst8503",
  "multiple-choice",
  "zh"
);
```

### 3. 考试配置

```javascript
// 从特定章节选择题目进行考试
const examQuestions = await dataService.getExamQuestions(
  "cst8503",
  "midterm",
  "zh"
);
```

### 4. 课程导航

```javascript
// 获取课程结构信息
const courseIndex = await dataService.getCourseIndex("cst8503", "zh");
console.log("可用章节:", courseIndex.chapters);
console.log("可用题型:", courseIndex.questionTypes);
```

## 🚀 优势

1. **更细粒度的控制**: 可以按章节或题型精确获取题目
2. **更好的性能**: 只加载需要的题目，减少内存使用
3. **更灵活的配置**: 支持更复杂的考试和练习配置
4. **向后兼容**: 原有的 API 调用方式仍然有效
5. **更好的缓存**: 支持更精确的缓存策略

## 📝 注意事项

1. **文件命名规范**: 遵循 `{courseId}-{chapterId/type}-{language}.json` 格式
2. **缓存键更新**: 新的缓存键包含章节和题型信息
3. **错误处理**: 如果特定文件不存在，会自动回退到完整文件
4. **语言回退**: 如果指定语言不存在，会自动尝试其他语言

## 🔄 迁移指南

现有的代码无需修改，`getQuestions` 方法保持向后兼容。如果需要使用新功能，可以：

1. 使用 `getCourseIndex` 获取课程结构
2. 使用 `getChapterQuestions` 获取章节题目
3. 使用 `getQuestionsByType` 获取题型题目
4. 使用增强的 `getQuestions` 方法进行精确查询
