# 25F CST8505 Week1 Lecture1

_从 PDF 文档转换生成_

---

## 目录

- Please read the course outline and course section information (CSI)
  - 请阅读课程大纲和课程章节信息（CSI）
- 1. Highest Priority is to Satisfy Customer through Early and Continuous Delivery of Valuable
  - 1. 最高优先级是通过早期和持续交付有价值的
- 2. Welcome Change in Requirements Even Late in Development
  - 2. 即使在后期的开发中也要欢迎需求的改变
- 3. Deliver Working Software Frequently with Preference to a Shorter Time Scale
  - 3. 以更短的时间间隔频繁交付可工作的软件
- 4. Business People and Developers Must Work Together Daily through the Project.
  - 4. 业务人员和开发人员必须在整个项目中每天一起工作
- 5. Build Project through Motivated Individuals, Give them the Environment and Support
  - 5. 通过有激情的个人来构建项目，给予他们环境和所需的支持
- 6. Face-to-Face Conversation is the Most Efficient and Effective Method of Communication
  - 6. 面对面交谈是最有效和最高效的沟通方式
- 7. Working Software is the Primary Measure of Success
  - 7. 可工作的软件是成功的主要衡量标准
- 8. Agile Process Promote Sustainable Development
  - 8. 敏捷过程促进可持续发展
- 9. Continuous Attention to Technical Excellence and Good Design Enhances Agility
  - 9. 持续关注技术卓越和良好设计增强敏捷性

---

## 第 1 页

Artificial Intelligence Project 1 Week 1 Lecture 1 Dr. Hari M Koduvely
人工智能项目 1 第 1 周 第 1 讲 Hari M Koduvely 博士

---

## 第 2 页

Welcome to the Course!
欢迎来到课程！
General Dr. Hari M Koduvely Principal Data Scientist
一般信息 Hari M Koduvely 博士 首席数据科学家
Information Open Text, Canada Email: koduveh@algonquincollege.com
信息 加拿大 Open Text 公司 电子邮箱：koduveh@algonquincollege.com

---

## 第 3 页

General Information Course Brightspace page [https://brightspace.algonquincollege.com/d2l/home/808653](https://brightspace.algonquincollege.com/d2l/home/808653)
一般信息 课程 Brightspace 页面 [https://brightspace.algonquincollege.com/d2l/home/808653](https://brightspace.algonquincollege.com/d2l/home/808653)
Please read the course outline and course section information (CSI)
请阅读课程大纲和课程章节信息（CSI）
Main focus of this course is project work with clients from outside
本课程的主要重点是来自外部的客户项目工作
Professional behavior is expected from all the students
期望所有学生表现出专业行为
Project work would be done in small groups of size ~ 5
项目工作将以约 5 人小组的形式进行

---

## 第 4 页

General Information Course pass criteria For courses that have both theory and practical components minimum 50% (D-) in both the
一般信息 课程通过标准 对于同时具有理论和实践部分的课程，两个部分都至少需要 50%（D-）
components

---

## 第 5 页

General Information References Agile In a Nutshell - [http://www.agilenutshell.com/](http://www.agilenutshell.com/)
一般信息 参考文献 敏捷简明指南 - [http://www.agilenutshell.com/](http://www.agilenutshell.com/)
All You Need to Know about Agile Software Development – Alex Campbell
关于敏捷软件开发你需要知道的一切 – Alex Campbell
Agile Testing – A Practical Guide for Testers and Agile Teams (O'Reilly Online Learning)
敏捷测试 – 测试人员和敏捷团队实用指南（O'Reilly 在线学习）
Agile Discussion Guide – LeanDog (Free download available here [https://www.leandog.com/agile-discussion-guide-download)](https://www.leandog.com/agile-discussion-guide-download))
敏捷讨论指南 – LeanDog（可在此处免费下载 [https://www.leandog.com/agile-discussion-guide-download)](https://www.leandog.com/agile-discussion-guide-download))
Software Engineering for Data Scientists Designing Machine Learning Systems
面向数据科学家的软件工程 设计机器学习系统

---

## 第 6 页

Artificial Intelligence Software Development Artificial Intelligence Software Development
人工智能软件开发 人工智能软件开发
AI System = Code + Data AI System development is an iterative process
AI 系统 = 代码 + 数据 AI 系统开发是一个迭代过程
Will have all the processes involved in standard software development Plus more
将包含标准软件开发涉及的所有过程，还有更多
Standard Software Development: Agile Process + DevOps
标准软件开发：敏捷过程 + DevOps
AI System Development: Agile Process + MLOPS
AI 系统开发：敏捷过程 + MLOPS

---

## 第 7 页

Artificial Intelligence Software Development Standard Software Testing: Testing the Code
人工智能软件开发 标准软件测试：测试代码
AI System Testing: Data and Code Testing + Monitoring Prod
AI 系统测试：数据和代码测试 + 生产监控
When Standard Software fails error codes are produced
当标准软件失败时会产生错误代码
AI Systems can fail silently AI Systems can deteriorate performance over time if input data distribution changes
AI 系统可能会静默失败 AI 系统如果输入数据分布发生变化，性能可能会随时间下降

---

## 第 8 页

Software Development Cycle SDLC Is a process for planning, creating, testing and deploying a software
软件开发周期 SDLC 是规划、创建、测试和部署软件的过程
Typically consists of 6 stages:
通常包含 6 个阶段：
Requirement Analysis Design Development and Testing
需求分析 设计 开发和测试
Implementation (Deployment) Documentation Evaluation
实施（部署） 文档 评估

---

## 第 9 页

Software Development Cycle Modern software systems are complex to build
软件开发周期 现代软件系统构建复杂
Objective of SDLC is to Build high quality software
SDLC 的目标是构建高质量软件
Based on customer requirements Within scheduled timeframes
基于客户需求 在预定时间框架内
Underestimated cost budgets
在低估成本的预算内

---

## 第 10 页

Software Development Cycle Different SDLC Methodologies Agile
软件开发周期 不同的 SDLC 方法论 敏捷
Waterfall Rapid Prototyping Spiral Incremental Extreme Programming
瀑布 快速原型 螺旋 增量 极限编程

---

## 第 11 页

Software Development Cycle Different SDLC Methodologies
软件开发周期 不同的 SDLC 方法论
Waterfall Projects are carried out in a linear sequential manner through the phases of conception, initiation, analysis, design,
瀑布 项目以线性顺序方式进行，经过构思、启动、分析、设计、
construction, testing, deployment and maintenance Spiral
构建、测试、部署和维护阶段 螺旋
Risk driven software development process model. Based on the risk pattern of a given project, the process guides the team to
风险驱动的软件开发过程模型。根据给定项目的风险模式，该过程指导团队
adopt different process models.
采用不同的过程模型。
Iterative & Incremental develop a system through repeated cycles (iterative) and in smaller portions at a time (incremental)
迭代与增量 通过重复循环（迭代）和一次一小部分（增量）开发系统
Extreme Programming A type of agile software development. Advocates frequent releases in short development cycles, intended to improve
极限编程 一种敏捷软件开发类型。倡导在短开发周期内频繁发布，旨在提高
productivity and introduce checkpoints at which new customer requirements can be adopted.
生产率并引入检查点，在此可以采纳新的客户需求。
Agile
敏捷

---

## 第 12 页

Agile Software Development Agile is a set of principles and values that guides software development.
敏捷软件开发 敏捷是一套指导软件开发的原则和价值观。
Manifesto for Agile Software Development was created in 2001 by a set of top developers.
敏捷软件开发宣言于 2001 年由一群顶级开发者创建。
There are different methodologies for approaching an Agile project.
有不同的方法论来接近敏捷项目。
Image Source: Agile in a Nutshell
图片来源：敏捷简明指南

---

## 第 13 页

Agile Principles
敏捷原则

1. Highest Priority is to Satisfy Customer through Early and Continuous Delivery of Valuable
1. 最高优先级是通过早期和持续交付有价值的

Software
软件来满足客户

2. Welcome Change in Requirements Even Late in Development
3. 即使在后期的开发中也要欢迎需求的改变
4. Deliver Working Software Frequently with Preference to a Shorter Time Scale
5. 以更短的时间间隔频繁交付可工作的软件
6. Business People and Developers Must Work Together Daily through the Project.
7. 业务人员和开发人员必须在整个项目中每天一起工作
8. Build Project through Motivated Individuals, Give them the Environment and Support
9. 通过有激情的个人来构建项目，给予他们环境和

Needed.
所需的支持

6. Face-to-Face Conversation is the Most Efficient and Effective Method of Communication
7. 面对面交谈是最有效和最高效的沟通方式

---

## 第 14 页

Agile Principles
敏捷原则

7. Working Software is the Primary Measure of Success
8. 可工作的软件是成功的主要衡量标准
9. Agile Process Promote Sustainable Development
10. 敏捷过程促进可持续发展
11. Continuous Attention to Technical Excellence and Good Design Enhances Agility
12. 持续关注技术卓越和良好设计增强敏捷性
13. Simplicity - The Art of Maximizing the Amount of Work Not Done is Essential.
14. 简洁性 - 最大化未完成工作量的艺术至关重要。
15. The Best Architectures, Requirements and Design Emerges from Self Organizing Teams
16. 最好的架构、需求和设计来自自组织团队
17. At Regular Intervals, the Team Reflects on How to Become More Effective
18. 团队定期反思如何变得更有效

---

## 第 15 页

Agile in Practice Make a list of User Stories Size the stories relative to each other and estimate the effort
敏捷实践 制作用户故事列表 按相对大小排列故事并估算工作量
Break down the user stories to tasks Prioritize the user stories and tasks
将用户故事分解为任务 对用户故事和任务进行优先级排序
Start executing the tasks Update the plans as project progresses
开始执行任务 随着项目进展更新计划

---

## 第 16 页

Tools for Agile Development Software version control - Git
敏捷开发工具 软件版本控制 - Git
Project management – Microsoft Teams Planner Communication - Microsoft Teams
项目管理 – Microsoft Teams Planner 沟通 - Microsoft Teams

---
