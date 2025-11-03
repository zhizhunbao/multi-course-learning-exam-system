# CST8502 FinalProject 25F

CST8502 期末项目 25F

_From PDF Document_
_来自 PDF 文档_

---

## Overview

## 概述

**CST 8502 Final Project (Mandatory)**
**CST 8502 期末项目（必修）**

- **Part 1 due:** Nov 7
- **第 1 部分截止日期：** 11 月 7 日
- **Part 2 due:** Nov 21
- **第 2 部分截止日期：** 11 月 21 日
- **Presentations:** Nov 24 – Dec 5
- **演示时间：** 11 月 24 日至 12 月 5 日

The goal of this project is to apply the algorithms we learned this term on a real dataset. You must follow **CRISP-DM** to complete this project.
本项目的目标是在真实数据集上应用本学期学到的算法。您必须遵循 **CRISP-DM** 方法来完成这个项目。

---

## Project Requirements

## 项目要求

You must prepare your data to perform:
您必须准备数据以执行以下任务：

1. **Classification by Decision Tree (DT)**
2. **通过决策树 (DT) 进行分类**
3. **Clustering using kMeans** & Outlier detection by clustering approach
4. **使用 kMeans 聚类** 以及通过聚类方法进行异常检测
5. **Outlier detection using LOF & distances method**
6. **使用 LOF 和距离方法进行异常检测**

### Tools

### 工具

- You must do this project using **RapidMiner** or **Python**
- 您必须使用 **RapidMiner** 或 **Python** 来完成此项目
- Any other tool or language is **not acceptable**
- 任何其他工具或语言都 **不可接受**
- As a team, you must decide either RM or Python, but not both
- 作为团队，您必须决定使用 RM 或 Python，但不能同时使用两者
- If all team members are not ready to use Python, then it is advisable to use RapidMiner
- 如果所有团队成员还没有准备好使用 Python，则建议使用 RapidMiner

---

## Dataset List

## 数据集列表

| Dataset | Groups |

| 数据集                            | 组别       |
| --------------------------------- | ---------- |
| Dallas Police Incidents           | 1, 2, 3, 4 |
| 达拉斯警察事件                    | 1, 2, 3, 4 |
| Dallas 911 Calls Burglary         | 5, 6, 7    |
| 达拉斯 911 电话入室盗窃           | 5, 6, 7    |
| Austin Crash Report Data          | 8, 9, 10   |
| 奥斯汀撞车报告数据                | 8, 9, 10   |
| Montgomery Traffic violations     | 11, 12, 13 |
| 蒙哥马利交通违规                  | 11, 12, 13 |
| Austin Crime Reports 2018         | 14         |
| 奥斯汀犯罪报告 2018               | 14         |
| New York Motor Vehicle Collisions | 15, 16     |
| 纽约机动车碰撞                    | 15, 16     |

Groups are published in Brightspace. You can see your group number in the announcement and Content/Presentation Schedule.
组别信息发布在 Brightspace 上。您可以在公告和内容/演示安排中找到您的组号。

---

## Submission Requirements

## 提交要求

- The report should be typed in **OneDrive Word Doc** and shared with: thomasa@algonquincollege.com
- 报告应在 **OneDrive Word 文档** 中录入，并与以下邮箱共享：thomasa@algonquincollege.com
- Instructor should be able to see the version-history
- 教师应该能够看到版本历史
- **First Step:** Create a OneDrive Word Doc and share with: thomasa@algonquincollege.com
- **第一步：** 创建 OneDrive Word 文档并与以下邮箱共享：thomasa@algonquincollege.com
- **DO NOT Zip files** - zipped files will not be graded
- **不要压缩文件** - 压缩文件将不会被评分

---

## Part 1 – Business Understanding, Data Understanding & Data Preparation

## 第 1 部分 - 业务理解、数据理解和数据准备

### Overview

### 概述

This project should be done in 2 parts. As Part 1, you will be working on:
该项目应分两部分完成。作为第 1 部分，您将致力于以下工作：

- Business Understanding
- 业务理解
- Data Understanding
- 数据理解
- Data Preparation
- 数据准备

### Deliverables

### 交付物

You need to work on the given dataset (check the dataset table to find your dataset based on your project group number) and propose a data science project that can be done for the given data.
您需要处理给定的数据集（查看数据集表以根据项目组号找到您的数据集），并提出可以针对给定数据完成的数据科学项目。

### Tasks

### 任务

1. **Classification Task:** Frame a question that you want to answer by your analysis
2. **分类任务：** 构建一个您想通过分析回答的问题

   - This question should **not** be something that can be easily answered using Excel
   - 这个问题**不应该**是可以用 Excel 轻松回答的问题

3. **Main Tasks:**
4. **主要任务：**

   - Classification by DT
   - 使用 DT 进行分类
   - Clustering
   - 聚类
   - Outlier detection
   - 异常检测

5. **Project Plan:** Must explain how you are going to complete the project
6. **项目计划：** 必须解释如何完成项目

   - Each task should be done by one student
   - 每个任务应由一名学生完成
   - Detailed workload distribution table should be included
   - 应包括详细的工作量分配表

### Data Understanding & Preparation

### 数据理解和准备

#### Association and Correlation Analysis

#### 关联和相关性分析

Use **Association Rule Mining** and **Correlation Matrix Analysis** to identify relationships between attributes. These methods help to uncover hidden patterns and dependencies within the dataset, aiding in better feature selection and model performance.
使用 **关联规则挖掘** 和 **相关性矩阵分析** 来识别属性之间的关系。这些方法有助于发现数据集中的隐藏模式和依赖关系，有助于更好的特征选择和模型性能。

#### General Preparation Steps

#### 一般准备步骤

1. Removing duplicates
2. 删除重复项
3. Generating or assigning ID
4. 生成或分配 ID
5. Setting the correct data types for the attributes based on meaning
6. 根据含义为属性设置正确的数据类型
7. Setting the role for class attribute
8. 设置类属性的角色
9. etc.
10. 等等

#### Model-Specific Preparations

#### 模型特定准备

- Selection of attributes that can contribute to your task
- 选择能够有助于您任务的属性

  - Attributes good for clustering may not be good for outlier detection
  - 适合聚类的属性可能不适合异常检测

- Binning
- 分箱
- Scaling
- 缩放
- Type conversions
- 类型转换
- Handling missing data
- 处理缺失数据
- etc.
- 等等

#### Special Instructions

#### 特别说明

- If you have latitude and longitude columns, make sure to do a clustering only for those columns to create regions out of it
- 如果您有纬度和经度列，请确保仅对这些列进行聚类以创建区域
- When you create bins, make sure to create **less than 10 bins** – 5 to 8 should be good enough in most cases
- 创建分箱时，请确保创建**少于 10 个分箱** - 在大多数情况下 5 到 8 个就足够了

### Data Filtering & Sampling

### 数据过滤和采样

- If you have a lot of data from multiple years, consider data from the latest year
- 如果您有多年的数据，请考虑使用最新年份的数据

  - Don't filter for 2025 as we don't have the data for the full year
  - 不要过滤 2025 年，因为我们没有全年的数据

- Even after filtering, if you have a lot of data, apply **sampling techniques (stratified)** to get a sample of **10,000 instances**
- 即使在过滤之后，如果您有大量数据，请应用 **采样技术（分层）** 以获得 **10,000 个实例** 的样本

### Attributes Requirements

### 属性要求

- **At least 10 relevant attributes** (minimum requirement)
- **至少 10 个相关属性**（最低要求）
- More relevant attributes lead to meaningful results
- 更多相关属性会产生有意义的结果
- You can create new attributes
- 您可以创建新属性

  - Example: If you have a date-time column, you can create:
  - 示例：如果您有日期时间列，您可以创建：

    - Date
    - 日期
    - Time
    - 时间
    - Month
    - 月份
    - Time of day (morning, afternoon, evening, night, late night, etc.)
    - 一天中的时间（早晨、下午、晚上、夜间、深夜等）
    - Weekday/weekend
    - 工作日/周末
    - Day
    - 日期
    - etc.
    - 等等

- Make sure that you **don't have redundant data**
- 确保您**没有冗余数据**
- More attributes will give you better results
- 更多属性将给您带来更好的结果

### Project Title

### 项目标题

- You must choose a title for your project that reflects its goal
- 您必须为项目选择一个反映其目标的标题
- Be creative and ensure the title effectively conveys the purpose of your analysis
- 要有创意，并确保标题有效传达分析的目的

### Report Format

### 报告格式

- The document should have a **cover page** (should include student names and numbers, project title, etc.)
- 文档应有一个 **封面页**（应包括学生姓名和学号、项目标题等）
- Follow CRISP-DM when you do this task
- 执行此任务时遵循 CRISP-DM
- **Every step of each phase** must be documented in the project report
- **每个阶段的每个步骤** 都必须在项目报告中记录
- **Professional report style:**
- **专业报告风格：**

  - Font: Times New Roman
  - 字体：Times New Roman
  - Size: 12
  - 字号：12
  - Line spacing: 1.5
  - 行距：1.5
  - Justified
  - 两端对齐

### Sample Project

### 示例项目

For example, if we have a crime dataset that has information about:
例如，如果我们有一个犯罪数据集，其中包含以下信息：

- Victim (age, sex, race)
- 受害者（年龄、性别、种族）
- Offender (age, sex, race)
- 罪犯（年龄、性别、种族）
- Time, location
- 时间、地点
- Whether the person died or not
- 该人是否死亡
- Number of people involved
- 涉及的人数
- Number of officers involved
- 涉及的警官人数
- Weapons involved
- 涉及的武器
- etc.
- 等等

**Question:** "What are the contribution factors for a crime to end up in fatality?"
**问题：** "导致犯罪以死亡告终的因素有哪些？"

**Analysis:**
**分析：**

- Create a decision tree with these factors by considering the fatality column as the class
- 通过将死亡率列视为类别，用这些因素创建决策树
- Detect outliers (e.g., victim is a child) using outlier detection methods
- 使用异常检测方法检测异常值（例如，受害者是儿童）
- Cluster instances using clustering techniques
- 使用聚类技术对实例进行聚类
- Similar crimes based on type, location, time, season, etc. will be grouped together
- 基于类型、地点、时间、季节等的类似犯罪将被分组在一起

---

## Part 2 – Modeling & Evaluation

## 第 2 部分 - 建模与评估

### Tasks

### 任务

Apply different modeling techniques for:
为以下任务应用不同的建模技术：

1. **Outlier Detection:** LOF, distances
2. **异常检测：** LOF、距离

   - If outlier detection by distance takes too long, choose any other outlier detection approach available in RM
   - 如果基于距离的异常检测耗时过长，请选择 RM 中可用的任何其他异常检测方法
   - You must use 2 approaches and combine results to get common outliers
   - 您必须使用 2 种方法并组合结果以获得共同的异常值

3. **Clustering:** kMeans
4. **聚类：** kMeans

   - Cluster and find outliers from clusters
   - 聚类并从聚类中找出异常值
   - Use elbow method to find best k
   - 使用肘部方法找到最佳 k 值

5. **Classification:** DT
6. **分类：** DT

   - Use cross-validation for DT classification
   - 对 DT 分类使用交叉验证

### Documentation Requirements

### 文档要求

- All steps must be reported in a professional style
- 所有步骤必须以专业风格报告
- When building prediction models, provide detailed screenshots of results
- 构建预测模型时，提供详细的结果截图
- Describe accuracy by presenting:
- 通过展示以下内容来描述准确性：

  - Confusion matrices
  - 混淆矩阵
  - R2 values
  - R2 值
  - etc.
  - 等等

### Interpretation Requirements

### 解释要求

Provide interpretation for:
提供以下内容的解释：

- **Classification results:** Rules of DT
- **分类结果：** DT 的规则
- **Clustering results:** Why instances are clustered together, any patterns in clusters
- **聚类结果：** 为什么实例被聚类在一起，聚类中的任何模式
- **Outlier detection results:** Reason why instances are outliers
- **异常检测结果：** 实例是异常值的原因

**Minimum:** Interpret at least a few clusters and at least a few outlier instances
**最低要求：** 解释至少几个聚类和至少几个异常实例

---

## Project Presentation

## 项目演示

### Schedule

### 时间安排

During the last 2 weeks of the term, you will present your final project.
在本学期的最后 2 周内，您将展示最终项目。

- Schedule: Available under Content ➞ Presentation Schedule
- 时间表：可在内容 ➞ 演示安排下找到

### Presentation Requirements

### 演示要求

- **Duration:** 30-minute presentation
- **时长：** 30 分钟的演示
- **Tool:** PowerPoint slides
- **工具：** PowerPoint 幻灯片
- **Per student:** ~10 minutes
- **每位学生：** 约 10 分钟

  - Team with 2 members: 20 minutes
  - 2 人团队：20 分钟
  - Solo project: 10 minutes
  - 独立项目：10 分钟
  - **Penalty:** If a student uses more than 10 minutes
  - **惩罚：** 如果学生使用超过 10 分钟

### Content

### 内容

Briefly describe:
简要描述：

1. Your dataset
2. 您的数据集
3. The question answered by your analysis
4. 分析回答的问题
5. Various data understanding and preparation steps
6. 各种数据理解和准备步骤
7. Your analysis and results (mention algorithms used)
8. 您的分析和结果（提及使用的算法）
9. Whether analysis confirmed or denied expectations
10. 分析是否确认或否定期望
11. Any surprises found
12. 发现的任何意外
13. Analysis of accuracy and importance
14. 准确性和重要性分析
15. Interpretation of results (DT rules, clustering patterns, outlier reasons)
16. 结果解释（DT 规则、聚类模式、异常值原因）

### Required Sections

### 必需部分

- Introduction
- 引言
- Business Understanding
- 业务理解
- Data Understanding
- 数据理解
- Data Preparation
- 数据准备
- Modeling
- 建模
- Discussion of Results
- 结果讨论
- Conclusion
- 结论

---

## General Expectations

## 总体期望

### Individual Contributions

### 个人贡献

- Each student's marks will be based primarily on their **individual contributions**
- 每个学生的分数将主要基于他们的**个人贡献**
- Even though this is a group project, every student must:
- 尽管这是一个小组项目，但每个学生必须：

  - Independently complete all sub-steps of Data Understanding phase for **one third of the columns**
  - 独立完成数据理解阶段 **三分之一列** 的所有子步骤
  - Perform all required steps in Data Preparation phase based on their chosen model
  - 根据所选模型在数据准备阶段执行所有必需步骤
  - Perform their own modeling, tuning parameters to achieve optimal performance
  - 执行自己的建模，调整参数以实现最佳性能
  - Validate and evaluate their model & results
  - 验证和评估他们的模型和结果

### Attribute Selection

### 属性选择

- Attributes selected for clustering may not be suitable for outlier detection and vice versa
- 为聚类选择的属性可能不适合异常检测，反之亦然
- Choose your attributes based on your model
- 根据您的模型选择属性

### Documentation

### 文档

Students must document their entire process, including:
学生必须记录他们的整个过程，包括：

- All steps
- 所有步骤
- Assumptions
- 假设
- Approaches
- 方法
- Challenges
- 挑战
- Solutions
- 解决方案
- Results
- 结果

Each student is responsible for writing their individual contributions in the report.
每个学生负责在报告中撰写他们的个人贡献。

### Submission Requirements

### 提交要求

**Final submission must include:**
**最终提交必须包括：**

1. Presentation PPT
2. 演示 PPT
3. Consolidated RMP file (or py file if entire team chooses Python)
4. 合并的 RMP 文件（如果整个团队选择 Python 则为 py 文件）
5. Final report
6. 最终报告

### Evaluation

### 评估

- Every student will be evaluated for only one task from the given tasks:
- 每个学生将仅针对给定任务中的一项任务进行评估：

  - Classification
  - 分类
  - Clustering
  - 聚类
  - Outlier detection
  - 异常检测

In the report, make sure to include screenshots of corresponding subprocesses in corresponding sections.
在报告中，确保在相应部分包含相应子过程的截图。

### Process Template

### 过程模板

The template for the entire process MUST look as follows (if using python, make sure to follow the same approach).
整个过程模板必须如下所示（如果使用 python，请确保遵循相同的方法）。

---

## Submission

## 提交

### Part 1 (Nov 7th, 2025)

### 第 1 部分（2025 年 11 月 7 日）

Submit:
提交：

- RMP or Python files
- RMP 或 Python 文件
- Report (Sections 1-3, 4.1, 5.1, and 6.1)
- 报告（第 1-3 节、4.1、5.1 和 6.1）

**DO NOT Zip files**
**不要压缩文件**

### Part 2 (Nov 21st, 2025)

### 第 2 部分（2025 年 11 月 21 日）

Submit as continuation of Part 1 files:
作为第 1 部分文件的延续提交：

- RMP or Python files
- RMP 或 Python 文件
- Report (remaining sections)
- 报告（其余部分）
- PPT files
- PPT 文件

**DO NOT zip files**
**不要压缩文件**

### Presentation

### 演示

Week 11 & 12 (Nov 24 - Dec 5)
第 11 周和第 12 周（11 月 24 日至 12 月 5 日）

- Check Brightspace for presentation schedule
- 在 Brightspace 上查看演示时间表

### Important Notes

### 重要提示

- **To get grades, BOTH submission AND presentation are required**
- **要获得成绩，提交和演示都是必需的**
- Deliverables should be from the perspective of providing a report and presenting it to a company or job interview where they aren't sure what data science is about
- 交付物应从提供报告并向公司或求职面试展示的角度出发，这些场景中对方可能不太了解数据科学

  - Just creating some tables and pictures is not enough
  - 仅仅创建一些表格和图片是不够的

- **Successful completion of the project is mandatory to pass this course**
- **成功完成项目是通过本课程的强制性要求**

---

## Workload Distribution

## 工作量分配

Before starting the project report, complete your workload distribution table, which is attached along with the project instructions on Brightspace. You must mention the selected tool in the Workload distribution table.
在开始项目报告之前，请完成您的工作量分配表，该表与项目说明一起附在 Brightspace 上。您必须在工作量分配表中提及所选工具。
