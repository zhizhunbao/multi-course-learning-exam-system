# 多课程学习与考试系统

一个支持多课程的学习与考试平台，包含学习、练习、实验、考试四个核心模块。

## 项目概述

- **项目名称**: 多课程学习与考试系统
- **GitHub 项目名**: multi-course-learning-exam-system
- **项目描述**: 一个支持多课程的学习与考试平台，包含学习、练习、实验、考试四个核心模块
- **目标用户**: 学生、教师、教育机构
- **使用场景**: 在线教育、课程学习、技能培训、考试评估
- **部署地址**: https://zhizhunbao.github.io/multi-course-learning-exam-system/

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **状态管理**: React Context + useReducer
- **路由**: React Router v6
- **国际化**: react-i18next
- **部署**: GitHub Pages
- **其他依赖**:
  - lucide-react (图标)
  - framer-motion (动画)
  - react-pdf、pdfjs-dist (PDF 处理)
  - react-dropzone (文件上传)

## 功能特性

### 核心模块

- **学习模块**: 课程内容展示、进度跟踪、笔记功能
- **练习模块**: 练习题集、答题记录、错题本
- **实验模块**: 实验指导、代码编辑器、结果验证
- **考试模块**: 在线考试、计时功能、成绩统计

### 用户系统

- 简化登录（仅需姓名）
- 角色管理（管理员/普通用户）
- 本地状态存储
- 个人中心

### 课程管理

- 课程列表、课程详情、章节导航
- 支持动态添加新课程
- 模块化课程结构

### 管理员功能

- 课程创建、PDF 上传、内容管理
- 用户权限控制
- PDF 资料管理：批量上传 PDF 文件、PDF 预览、内容提取
- AI 内容生成：基于 PDF 自动生成课程内容、练习题、考试题目

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── common/         # 通用组件
│   ├── learning/       # 学习模块组件
│   ├── practice/       # 练习模块组件
│   ├── experiment/     # 实验模块组件
│   ├── exam/          # 考试模块组件
│   └── admin/         # 管理员组件
├── context/           # React Context
├── hooks/             # 自定义 Hooks
├── utils/             # 工具函数
├── data/              # 数据文件
│   └── courses/       # 课程数据
├── assets/            # 静态资源
└── i18n.js           # 国际化配置
```

## 安装和运行

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 部署

项目使用 GitHub Pages 进行部署，通过 GitHub Actions 自动构建和部署。

### 部署步骤

1. 将代码推送到 main 分支
2. GitHub Actions 会自动构建项目
3. 构建完成后自动部署到 GitHub Pages

### 访问地址

- 在线访问: https://zhizhunbao.github.io/multi-course-learning-exam-system/

## 使用说明

### 用户登录

1. 访问系统首页
2. 输入姓名和选择角色（学生/教师/管理员）
3. 点击登录进入系统

### 学习流程

1. 在仪表板选择课程
2. 进入学习模块查看课程内容
3. 完成练习和实验
4. 参加考试评估

### 管理员功能

1. 使用管理员账户登录
2. 进入管理面板
3. 创建和管理课程
4. 上传 PDF 文件生成课程内容

## 开发规范

- 使用 JSX 文件格式，不使用 TypeScript
- 遵循 React 最佳实践
- 使用 Tailwind CSS 进行样式设计
- 保持代码简洁和可读性
- 使用 MCP 工具进行代码生成和文件操作

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [项目 Issues 页面]
- 邮箱: [联系邮箱]

## 更新日志

- **2024-12-19**: 修复了 ExamModule 中 undefined options 导致的 map 错误，提升了系统稳定性

---

© 2024 亚岗昆学院. All rights reserved.
