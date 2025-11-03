# Analyzing Traffic Violation Patterns: A Machine Learning Approach

# 分析交通违规模式：机器学习方法

---

**Authors:**
**作者：**

- Joseph Weng - 041076091
  - Joseph Weng - 041076091
- Hye Ran Yoo - 041145212
  - Hye Ran Yoo - 041145212
- Peng Wang - 041107730
  - Peng Wang - 041107730

**Date:** November 7, 2025
**日期：** 2025 年 11 月 7 日

**Course:** CST8502 - Machine Learning
**课程：** CST8502 - 机器学习

## 1. Introduction

## 1. 引言

Traffic violations present significant challenges for urban traffic management systems worldwide.
交通违规行为给全球城市交通管理系统带来了重大挑战。
Understanding patterns and contributing factors in traffic violations can help law enforcement agencies allocate resources more effectively, improve road safety, and reduce traffic-related incidents.
了解交通违规的模式和促成因素可以帮助执法机构更有效地分配资源，改善道路安全，并减少交通相关事件。
This project applies machine learning techniques to analyze traffic violation data from Montgomery County, aiming to identify key factors that contribute to different types of violations and detect anomalous patterns in the data.
本项目运用机器学习技术分析蒙哥马利县的交通违规数据，旨在识别促成不同类型违规的关键因素，并检测数据中的异常模式。

## 2. Business Understanding

## 2. 业务理解

### 2.1. Determine business objectives

### 2.1. 确定业务目标

The primary business objectives of this analysis include:
本次分析的主要业务目标包括：

- **Enhance Public Safety**: Identify patterns in traffic violations to improve road safety and reduce accidents
  - **提升公共安全**：识别交通违规模式以改善道路安全并减少事故
- **Optimize Resource Allocation**: Help law enforcement agencies allocate patrol resources more efficiently based on violation patterns
  - **优化资源配置**：帮助执法机构根据违规模式更高效地分配巡逻资源
- **Improve Traffic Management**: Understand contributing factors to traffic violations to develop targeted prevention strategies
  - **改善交通管理**：了解交通违规的促成因素以制定有针对性的预防策略
- **Detect Anomalies**: Identify unusual patterns or outliers that may indicate fraudulent activities, data quality issues, or systemic problems
  - **检测异常**：识别可能表明欺诈活动、数据质量问题或系统性问题的异常模式或离群点

### 2.2. Assess situation

### 2.2. 评估情况

**Available Resources:**
**可用资源：**

- Montgomery County Traffic Violations dataset (covering multiple years)
  - 蒙哥马利县交通违规数据集（涵盖多年）
- Machine learning expertise and tools (Python)
  - 机器学习专业知识和工具（Python）
- Computing resources for data processing and analysis
  - 数据处理和分析的计算资源

**Constraints:**
**约束条件：**

- Data quality and completeness may vary across different time periods
  - 数据质量和完整性可能因时间段不同而有所差异
- Privacy considerations in handling personal and location information
  - 处理个人和位置信息时的隐私考虑
- Need to balance between data granularity and computational efficiency
  - 需要在数据粒度和计算效率之间取得平衡

**Assumptions:**
**假设：**

- Historical traffic violation patterns can inform future prevention strategies
  - 历史交通违规模式可以为未来的预防策略提供信息
- Data contains sufficient information to identify meaningful patterns
  - 数据包含足够的信息以识别有意义的模式
- Violations are consistently reported and recorded across the dataset timeframe
  - 在整个数据集时间范围内，违规行为得到一致的报告和记录

### 2.3. Determine data mining goals

### 2.3. 确定数据挖掘目标

The specific data mining goals are:
具体的数据挖掘目标包括：

1. **Classification Task**: Predict violation types or severity levels based on contributing factors such as time, location, weather conditions, and vehicle information
   **分类任务**：根据时间、位置、天气条件和车辆信息等促成因素预测违规类型或严重程度

2. **Clustering Task**: Group similar violations together to identify common patterns (e.g., high-risk time periods, locations, or violation combinations)
   **聚类任务**：将相似的违规行为分组以识别常见模式（例如，高风险时间段、位置或违规组合）

3. **Outlier Detection**: Identify anomalous violations that deviate significantly from normal patterns, which may indicate data errors, unusual circumstances, or fraudulent activities
   **异常检测**：识别与正常模式显著偏离的异常违规行为，这可能表明数据错误、异常情况或欺诈活动

**Success Criteria:**
**成功标准：**

- Classification model achieves reasonable accuracy (e.g., >70%)
  - 分类模型达到合理的准确率（例如，>70%）
- Clustering results reveal meaningful and interpretable groups
  - 聚类结果揭示有意义且可解释的组别
- Outlier detection identifies genuinely unusual cases that warrant investigation
  - 异常检测识别出真正值得调查的异常案例

### 2.4. Produce project plan

### 2.4. 制定项目计划

**Project Methodology**: Follow CRISP-DM (Cross-Industry Standard Process for Data Mining)
**项目方法论**：遵循 CRISP-DM（跨行业数据挖掘标准流程）

**Workload Distribution**:
**工作分配**：

- **Joseph Weng (041076091)**: Clustering by kMeans & Outlier Detection by clustering approach
  **Joseph Weng (041076091)**：通过 kMeans 聚类和聚类方法进行异常检测

  - Data preparation, model building, evaluation, and interpretation
    - 数据准备、模型构建、评估和解释
  - All phases for clustering and outlier detection via clustering
    - 聚类和通过聚类进行异常检测的所有阶段

- **Hye Ran Yoo (041145212)**: Classification by Decision Tree (DT)
  **Hye Ran Yoo (041145212)**：通过决策树（DT）进行分类

  - Data preparation, model building, evaluation, and interpretation
    - 数据准备、模型构建、评估和解释
  - All phases for classification task
    - 分类任务的所有阶段

- **Peng Wang (041107730)**: Outlier Detection using LOF & distances method
  **Peng Wang (041107730)**：使用 LOF 和距离方法进行异常检测
  - Data preparation, model building, evaluation, and interpretation
    - 数据准备、模型构建、评估和解释
  - All phases for outlier detection task
    - 异常检测任务的所有阶段

**Timeline**:
**时间表**：

- **Part 1**: November 7, 2025
  **第 1 部分**：2025 年 11 月 7 日
  - Sections 1-3, 4.1, 5.1, 6.1 (Business Understanding, Data Understanding, Data Preparation)
    - 第 1-3 节，4.1 节，5.1 节，6.1 节（业务理解、数据理解、数据准备）
- **Part 2**: November 21, 2025
  **第 2 部分**：2025 年 11 月 21 日
  - Sections 4.2-4.3, 5.2-5.3, 6.2-6.3, 7 (Modeling, Evaluation, Conclusion)
    - 第 4.2-4.3 节，5.2-5.3 节，6.2-6.3 节，第 7 节（建模、评估、结论）
  - Presentation slides
    - 演示幻灯片
- **Presentation**: November 24 - December 5, 2025
  **演示**：2025 年 11 月 24 日 - 12 月 5 日
  - Each team member presents their individual contribution (~10 minutes)
    - 每个团队成员介绍各自的贡献（约 10 分钟）

**Tools**: Python (shared across the team for consistency)
**工具**：Python（团队共享以确保一致性）

## 3. Data Understanding

## 3. 数据理解

### 3.1. Collect initial data

### 3.1. 收集初始数据

The Montgomery Traffic Violations dataset will be obtained from the designated source. Initial data collection involves:
蒙哥马利县交通违规数据集将从指定来源获取。初始数据收集包括：

- Loading the dataset into Python environment using pandas
  - 使用 pandas 将数据集加载到 Python 环境
- Verifying data integrity and completeness
  - 验证数据的完整性和完整性
- Checking for data format consistency across different files (if multiple files exist)
  - 检查不同文件之间的数据格式一致性（如果存在多个文件）

### 3.2. Describe data

### 3.2. 描述数据

**Dataset Characteristics:**
**数据集特征：**

- **Source**: Montgomery County Traffic Violations dataset
  - **来源**：蒙哥马利县交通违规数据集
- **Scope**: Traffic violation records for Montgomery County
  - **范围**：蒙哥马利县的交通违规记录
- **Time Period**: [To be filled after data collection]
  - **时间范围**：[数据收集后填写]
- **Initial Attributes**:
  - **初始属性**：
  - Violation type/description
    - 违规类型/描述
  - Date and time of violation
    - 违规日期和时间
  - Location (address, coordinates if available)
    - 位置（地址，坐标（如果有））
  - Vehicle information
    - 车辆信息
  - Fine amount
    - 罚款金额
  - Officer information
    - 警官信息
  - [Additional attributes to be documented after exploration]
    - [探索后记录的其他属性]

**Preliminary Data Exploration:**
**初步数据探索：**

- Total number of records: [To be determined]
  - 记录总数：[待确定]
- Number of unique violation types: [To be determined]
  - 唯一违规类型的数量：[待确定]
- Date range coverage: [To be determined]
  - 日期范围覆盖：[待确定]
- Missing value percentage: [To be determined]
  - 缺失值百分比：[待确定]

### 3.3. Explore data

### 3.3. 探索数据

Data exploration will include:
数据探索将包括：

- **Statistical Summary**: Mean, median, mode, standard deviation for numerical attributes
  - **统计摘要**：数值属性的均值、中位数、众数、标准差
- **Distribution Analysis**: Frequency distributions for categorical attributes
  - **分布分析**：分类属性的频率分布
- **Temporal Patterns**: Hourly, daily, weekly, monthly patterns in violations
  - **时间模式**：违规行为的时、日、周、月模式
- **Geographic Patterns**: Spatial distribution of violations
  - **地理模式**：违规行为的空间分布
- **Correlation Analysis**: Relationships between different attributes
  - **相关性分析**：不同属性之间的关系
- **Association Rules**: Frequent patterns in violation occurrences
  - **关联规则**：违规发生中的频繁模式

**Visualizations**:
**可视化**：

- Histograms for numerical attributes
  - 数值属性的直方图
- Bar charts for categorical attributes
  - 分类属性的条形图
- Time series plots for temporal trends
  - 时间序列图，用于时间趋势
- Heatmaps for correlation matrices
  - 相关性矩阵的热力图
- Geographic maps for location-based patterns
  - 基于位置模式的地理地图

### 3.4. Verify data quality

### 3.4. 验证数据质量

Data quality assessment will check for:
数据质量评估将检查：

- **Completeness**: Missing values in critical fields
  - **完整性**：关键字段中的缺失值
- **Consistency**: Format consistency across records
  - **一致性**：记录之间的格式一致性
- **Accuracy**: Valid ranges and logical relationships
  - **准确性**：有效范围和逻辑关系
- **Duplicates**: Identical or highly similar records
  - **重复项**：相同或高度相似的记录
- **Timeliness**: Relevance of data for analysis
  - **时效性**：数据对分析的相关性

**Actions Required**:
**所需的操作**：

- Document missing value percentages
  - 记录缺失值百分比
- Identify outliers in numerical attributes
  - 识别数值属性中的离群值
- Flag records with inconsistent formats
  - 标记格式不一致的记录
- Remove or handle duplicate entries
  - 删除或处理重复条目
- Validate location data (coordinates, addresses)
  - 验证位置数据（坐标、地址）
- Check date/time format consistency
  - 检查日期/时间格式的一致性

## 4. Classification by Decision Trees

## 4. 通过决策树进行分类

_By: Hye Ran Yoo (041145212)_
_作者：Hye Ran Yoo (041145212)_

### 4.1. Data Preparation

### 4.1. 数据准备

#### 4.1.1. Select data

#### 4.1.1. 选择数据

**Target Dataset:**
**目标数据集：**

- Filter dataset to most recent complete year (avoiding partial year 2025 if applicable)
  - 将数据集过滤到最近的完整年份（如果适用，避免部分年份 2025）
- If data volume exceeds 10,000 instances after filtering, apply stratified sampling to obtain a representative sample of 10,000 records
  - 如果过滤后数据量超过 10,000 个实例，则应用分层抽样以获得 10,000 条记录的代表性样本
- Ensure stratified sampling maintains proportional distribution of the classification target variable
  - 确保分层抽样保持分类目标变量的比例分布

**Attribute Selection for Classification:**
**分类的属性选择：**

- **Target Variable**: Violation type or severity level (to be determined after data exploration)
  - **目标变量**：违规类型或严重程度（数据探索后确定）
- **Candidate Features** (at least 10 attributes required):
  - **候选特征**（至少需要 10 个属性）：
  - Time-related attributes (if available):
    - 时间相关属性（如果有）：
    - Hour of day
      - 一天中的小时
    - Day of week (Weekday/Weekend)
      - 一周中的天（工作日/周末）
    - Month
      - 月份
    - Season
      - 季节
    - Time of day category (Morning, Afternoon, Evening, Night, Late Night)
      - 一天中的时间类别（早晨、下午、晚上、夜间、深夜）
  - Location attributes:
    - 位置属性：
    - Geographic region (after clustering coordinates if latitude/longitude available)
      - 地理区域（如果有纬度/经度，则在聚类坐标后）
    - Area type (residential, commercial, highway, etc.)
      - 区域类型（住宅、商业、高速公路等）
  - Violation characteristics:
    - 违规特征：
    - Vehicle type
      - 车辆类型
    - Vehicle model year (if available)
      - 车辆车型年份（如果有）
  - Fine and officer information:
    - 罚款和警官信息：
    - Fine amount (binned into categories)
      - 罚款金额（分类到类别中）
    - Officer experience (if available)
      - 警官经验（如果有）
  - Derived attributes:
    - 派生属性：
    - Traffic density estimates (if applicable)
      - 交通密度估计（如果适用）
    - Weather conditions (if available)
      - 天气条件（如果有）
    - Day type (holiday vs. regular day)
      - 日期类型（假日与平日）

**Selection Criteria:**
**选择标准：**

- Attributes must have predictive power for the target variable
  - 属性必须对目标变量有预测能力
- Remove highly correlated redundant attributes
  - 移除高度相关的冗余属性
- Ensure attributes are categorical or can be discretized appropriately for decision tree analysis
  - 确保属性是分类的或可以适当地离散化以进行决策树分析

#### 4.1.2. Clean data

#### 4.1.2. 清理数据

**Missing Value Handling:**
**缺失值处理：**

- Identify missing values in each selected attribute
  - 识别每个选定属性中的缺失值
- For categorical attributes: replace missing values with mode or create "Unknown" category
  - 对于分类属性：用众数替换缺失值或创建"未知"类别
- For numerical attributes: replace missing values with median or mean, or use binning to create "Unknown" category
  - 对于数值属性：用中位数或均值替换缺失值，或使用分箱创建"未知"类别
- Consider removing records with critical missing values if percentage is small (<5%)
  - 如果百分比很小（<5%），考虑删除有关键缺失值的记录

**Outlier Handling:**
**离群值处理：**

- Detect outliers in numerical attributes using IQR method
  - 使用 IQR 方法检测数值属性中的离群值
- Decide on treatment: cap outliers, remove, or create special "extreme" categories
  - 决定处理方式：限制离群值、删除或创建特殊的"极端"类别
- Document any removed records for transparency
  - 记录所有删除的记录以确保透明度

**Duplicate Removal:**
**重复项删除：**

- Identify and remove exact duplicate records
  - 识别并删除完全重复的记录
- Check for near-duplicates based on key attributes (date, time, location, violation type)
  - 根据关键属性（日期、时间、位置、违规类型）检查近重复项
- Keep first occurrence when duplicates are found
  - 发现重复时保留第一次出现

**Data Validation:**
**数据验证：**

- Verify logical consistency (e.g., date ranges, valid coordinates)
  - 验证逻辑一致性（例如，日期范围、有效坐标）
- Ensure categorical values match expected categories
  - 确保分类值与预期的类别匹配
- Flag and handle any inconsistent or invalid entries
  - 标记并处理任何不一致或无效的条目

#### 4.1.3. Construct data

#### 4.1.3. 构建数据

**New Attribute Creation:**
**新建属性：**
Based on available data, construct the following attributes:
根据可用数据，构建以下属性：

1. **TimeOfDay** (from timestamp):
   **时间段**（来自时间戳）：

   - Morning: 6:00-11:59
     - 早晨：6:00-11:59
   - Afternoon: 12:00-17:59
     - 下午：12:00-17:59
   - Evening: 18:00-21:59
     - 傍晚：18:00-21:59
   - Night: 22:00-1:59
     - 夜间：22:00-1:59
   - Late Night: 2:00-5:59
     - 深夜：2:00-5:59

2. **DayType** (from date):
   **日期类型**（来自日期）：

   - Weekday: Monday-Friday
     - 工作日：周一至周五
   - Weekend: Saturday-Sunday
     - 周末：周六至周日

3. **Season** (from date):
   **季节**（来自日期）：

   - Spring: March-May
     - 春季：三月至五月
   - Summer: June-August
     - 夏季：六月至八月
   - Fall: September-November
     - 秋季：九月至十一月
   - Winter: December-February
     - 冬季：十二月至二月

4. **FineCategory** (from fine amount):
   **罚款类别**（来自罚款金额）：

   - Low: $0-50
     - 低：0-50 美元
   - Medium: $51-200
     - 中：51-200 美元
   - High: $201-500
     - 高：201-500 美元
   - Very High: $501+
     - 很高：501 美元以上

5. **GeographicRegion** (if coordinates available):
   **地理区域**（如果有坐标）：
   - Apply kMeans clustering on latitude/longitude
     - 对纬度/经度应用 kMeans 聚类
   - Create 5-8 distinct regions
     - 创建 5-8 个不同区域
   - Assign region labels to each record
     - 为每条记录分配区域标签

**Transformations:**
**转换：**

- Convert numerical continuous attributes to categorical bins where appropriate
  - 在适当的情况下将数值连续属性转换为分类箱
- Ensure target variable is properly encoded as categorical
  - 确保目标变量被正确编码为分类变量

#### 4.1.4. Integrate data

#### 4.1.4. 整合数据

**Data Integration Steps:**
**数据整合步骤：**

- Combine all constructed and selected attributes into a single dataset
  - 将所有构建和选定的属性合并到一个数据集中
- Verify referential integrity between attributes
  - 验证属性之间的引用完整性
- Ensure consistent ID assignment across all records
  - 确保所有记录的一致 ID 分配
- Create final integrated dataset ready for modeling
  - 创建准备用于建模的最终整合数据集

**Quality Check:**
**质量检查：**

- Confirm no missing values in final dataset
  - 确认最终数据集中没有缺失值
- Verify data types are correct for each attribute
  - 验证每个属性的数据类型是否正确
- Check data distribution remains balanced
  - 检查数据分布是否保持平衡

#### 4.1.5. Format data

#### 4.1.5. 格式化数据

**Data Formatting:**
**数据格式化：**

- Set correct data types: categorical attributes as category type, numerical as appropriate
  - 设置正确的数据类型：分类属性为类别类型，数值属性适当
- Encode categorical attributes using ordinal encoder if order matters
  - 如果顺序重要，使用序数编码器对分类属性进行编码
- Ensure target variable is properly labeled
  - 确保目标变量被正确标记
- Split data into training and testing sets (typically 70/30 or 80/20)
  - 将数据拆分为训练集和测试集（通常为 70/30 或 80/20）
- Apply stratified sampling to training/test split to maintain class distribution
  - 对训练/测试拆分应用分层抽样以保持类别分布

**Final Dataset Specifications:**
**最终数据集规范：**

- Total instances: 10,000 (or as available after sampling)
  - 总实例数：10,000（或采样后可用）
- Number of attributes: At least 10 features plus target variable
  - 属性数量：至少 10 个特征加目标变量
- Data types: All categorical/binned attributes ready for decision tree
  - 数据类型：所有分类/分箱属性已准备好用于决策树
- Missing values: 0%
  - 缺失值：0%
- Target distribution: Document class distribution for reference
  - 目标分布：记录类别分布以供参考

**Documentation:**
**文档：**

- Create data dictionary documenting all attributes, their types, and categories
  - 创建数据字典，记录所有属性、类型和类别
- Save processed dataset for modeling phase
  - 保存处理后的数据集以供建模阶段使用
- Document any transformations applied
  - 记录所有应用的转换

### 4.2. Modelling

### 4.2. 建模

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 4.2.1. Select modeling techniques

#### 4.2.1. 选择建模技术

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 4.2.2. Generate test design

#### 4.2.2. 生成测试设计

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 4.2.3. Build model

#### 4.2.3. 构建模型

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 4.2.4. Assess model

#### 4.2.4. 评估模型

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

### 4.3. Evaluation

### 4.3. 评估

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 4.3.1. Evaluate results

#### 4.3.1. 评估结果

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 4.3.2. Interpret results

#### 4.3.2. 解释结果

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 4.3.3. Review of process

#### 4.3.3. 流程回顾

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 4.3.4. Determine next steps

#### 4.3.4. 确定后续步骤

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

## 5. Clustering by kMeans (clustering and finding outliers)

## 5. 通过 kMeans 聚类（聚类和查找异常值）

_By: Joseph Weng (041076091)_
_作者：Joseph Weng (041076091)_

### 5.1. Data Preparation

### 5.1. 数据准备

#### 5.1.1. Select data

#### 5.1.1. 选择数据

**Dataset Selection:**
**数据集选择：**

- Use same temporal filtering as classification task
  - 使用与分类任务相同的时间过滤
- Apply stratified sampling to 10,000 instances if necessary
  - 如有必要，对 10,000 个实例应用分层抽样
- Consider selecting a subset of attributes optimal for clustering
  - 考虑选择最适合聚类的属性子集

**Attribute Selection for Clustering:**
**聚类的属性选择：**
Clustering requires numerical attributes. Selected attributes include:
聚类需要数值属性。选定的属性包括：

- **Geographic Attributes**:
  **地理属性**：

  - Latitude, Longitude (if available)
    - 纬度、经度（如果有）
  - Distance from city center
    - 距市中心的距离
  - Local population density
    - 当地人口密度

- **Temporal Attributes**:
  **时间属性**：

  - Hour of day (numerical 0-23)
    - 一天中的小时（数值 0-23）
  - Day of week (numerical 0-6)
    - 一周中的天（数值 0-6）
  - Month (numerical 1-12)
    - 月份（数值 1-12）

- **Violation Attributes**:
  **违规属性**：

  - Fine amount
    - 罚款金额
  - Violation severity score (if derivable)
    - 违规严重程度评分（如可派生）

- **Behavioral Attributes**:
  **行为属性**：
  - Time since last violation (if traceable)
    - 自上次违规以来的时间（如可追溯）
  - Number of violations in surrounding area
    - 周边地区的违规数量

**Selection Strategy:**
**选择策略：**

- Prioritize attributes that reveal natural groupings in violation patterns
  - 优先考虑能够揭示违规模式中自然分组的属性
- Ensure sufficient variation in attributes to form meaningful clusters
  - 确保属性有足够的变异以形成有意义的聚类
- Consider dimensionality reduction if too many features
  - 如果特征过多，考虑降维

#### 5.1.2. Clean data

#### 5.1.2. 清理数据

**Cleaning Requirements:**
**清理要求：**

- Handle missing values in numerical attributes (impute with median or remove)
  - 处理数值属性中的缺失值（用中位数填充或删除）
- Cap or transform outliers to prevent them from dominating clusters
  - 限制或转换离群值，防止其主导聚类
- Remove duplicates and irrelevant records
  - 删除重复和不相关的记录
- Ensure numerical attributes are on similar scales (prepare for normalization)
  - 确保数值属性具有相似的尺度（准备归一化）

#### 5.1.3. Construct data

#### 5.1.3. 构建数据

**Feature Engineering:**
**特征工程：**

- Normalize all numerical attributes to 0-1 scale using MinMaxScaler or StandardScaler
  - 使用 MinMaxScaler 或 StandardScaler 将所有数值属性归一化到 0-1 尺度
- Create composite features (e.g., density-adjusted violation rate)
  - 创建复合特征（例如，密度调整的违规率）
- Derive temporal patterns from raw timestamps
  - 从原始时间戳派生时间模式
- Calculate distance-based features if applicable
  - 如果适用，计算基于距离的特征

**Geographic Processing:**
**地理处理：**

- If latitude/longitude available, ensure valid coordinate ranges
  - 如果有纬度/经度，确保有效的坐标范围
- Optionally convert to local coordinate system for more accurate distance calculations
  - 可选地转换为本地坐标系以获得更准确的距离计算
- Create spatial features (distance metrics, neighborhood indicators)
  - 创建空间特征（距离指标、邻里指标）

#### 5.1.4. Integrate data

#### 5.1.4. 整合数据

**Integration:**
**整合：**

- Combine all selected and constructed numerical attributes
  - 合并所有选定和构建的数值属性
- Verify data consistency
  - 验证数据一致性
- Create integrated dataset with standardized scales
  - 创建具有标准化尺度的整合数据集

#### 5.1.5. Format data

#### 5.1.5. 格式化数据

**Final Formatting:**
**最终格式化：**

- Scale all numerical attributes (MinMax or Standard scaling)
  - 缩放所有数值属性（MinMax 或 Standard 缩放）
- Remove any remaining categorical attributes or convert to numerical
  - 删除任何剩余的分类属性或转换为数值
- Ensure all attributes are in compatible formats
  - 确保所有属性采用兼容的格式
- Save formatted dataset for kMeans clustering
  - 保存格式化的数据集用于 kMeans 聚类

**Outlier Detection by Clustering Approach:**
**通过聚类方法进行异常检测：**

- After clustering, identify outliers as:
  - 聚类后，将异常值识别为：
  - Points that are far from their cluster centroids
    - 远离其聚类质心的点
  - Points in very small clusters (potential anomalies)
    - 非常小的聚类中的点（潜在异常）
  - Points with high intra-cluster distance
    - 高聚类内距离的点
- Document outlier identification criteria and thresholds
  - 记录异常值识别标准和阈值

### 5.2. Modelling

### 5.2. 建模

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 5.2.1. Select modeling techniques

#### 5.2.1. 选择建模技术

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 5.2.2. Generate test design

#### 5.2.2. 生成测试设计

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 5.2.3. Build model

#### 5.2.3. 构建模型

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 5.2.4. Assess model

#### 5.2.4. 评估模型

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

### 5.3. Evaluation

### 5.3. 评估

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 5.3.1. Evaluate results

#### 5.3.1. 评估结果

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 5.3.2. Interpret results

#### 5.3.2. 解释结果

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 5.3.3. Review of process

#### 5.3.3. 流程回顾

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 5.3.4. Determine next steps

#### 5.3.4. 确定后续步骤

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

## 6. Outlier Detection by LOF and Isolation Forest (ISF) (and common outliers)

## 6. 通过 LOF 和孤立森林（ISF）进行异常检测（以及常见异常值）

_By: Peng Wang (041107730)_
_作者：Peng Wang (041107730)_

### 6.1. Data Preparation

### 6.1. 数据准备

#### 6.1.1. Select data

#### 6.1.1. 选择数据

**Dataset Selection:**
**数据集选择：**

- Use same temporal filtering as classification task
  - 使用与分类任务相同的时间过滤
- Apply stratified sampling to 10,000 instances if necessary
  - 如有必要，对 10,000 个实例应用分层抽样
- Focus on numerical attributes suitable for distance-based outlier detection
  - 专注于适合基于距离的异常检测的数值属性

**Attribute Selection for Outlier Detection:**
**异常检测的属性选择：**

LOF (Local Outlier Factor) and Isolation Forest work best with numerical attributes:
LOF（局部异常因子）和孤立森林最适合数值属性：

- **All Numerical Attributes** from original dataset:

  - **原始数据集中的所有数值属性**：

  - Temporal features (hour, day, month as numerical values)
    - 时间特征（小时、天、月作为数值）
  - Fine amounts
    - 罚款金额
  - Geographic coordinates (if available)
    - 地理坐标（如果有）
  - Vehicle model year (if available)
    - 车辆车型年份（如果有）
  - Any severity scores
    - 任何严重程度评分

- **Transformed Attributes**:
  - **转换属性**：
  - Encoded categorical features (if necessary)
    - 编码的分类特征（如有必要）
  - Composite features derived from multiple attributes
    - 从多个属性派生的复合特征

**Selection Criteria:**
**选择标准：**

- Include attributes that might reveal different types of outliers
  - 包含可能揭示不同类型异常值的属性
- Ensure numerical representation for distance-based methods
  - 确保基于距离的方法具有数值表示
- Balance between comprehensive feature set and computational efficiency
  - 在综合特征集和计算效率之间取得平衡

#### 6.1.2. Clean data

#### 6.1.2. 清理数据

**Pre-processing Requirements:**
**预处理要求：**

- Handle missing values in numerical attributes:
  - 处理数值属性中的缺失值：
  - Impute with median for robust handling
    - 使用中位数填充以进行稳健处理
  - Consider marking imputed values for analysis
    - 考虑标记填充值以供分析
- Remove duplicates that would affect outlier statistics
  - 删除会影响异常统计的重复项
- Document any records removed during cleaning
  - 记录清理过程中删除的任何记录

**Outlier Pre-treatment:**
**异常值预处理：**

- Note: Initial dataset may contain outliers that need detection
  - 注意：初始数据集可能包含需要检测的异常值
- Do not pre-remove apparent outliers as they are the targets of detection
  - 不要预先删除明显的异常值，因为它们是检测的目标
- Only remove obvious data quality issues (invalid values, corrupted records)
  - 仅删除明显的数据质量问题（无效值、损坏的记录）

#### 6.1.3. Construct data

#### 6.1.3. 构建数据

**Normalization:**
**归一化：**

- **Standard Scaler**: For LOF distance calculations, use Standard Scaler to center data at mean and scale to unit variance
  - **标准缩放器**：对于 LOF 距离计算，使用标准缩放器将数据居中于均值并缩放到单位方差
- **MinMax Scaler**: As alternative, normalize to [0,1] range for Isolation Forest
  - **MinMax 缩放器**：作为替代方案，为孤立森林归一化到 [0,1] 范围
- Document which scaling method is used for each method
  - 记录每种方法使用的缩放方法

**Feature Engineering:**
**特征工程：**

- Create derived features that might enhance outlier detection:
  - 创建可能增强异常检测的派生特征：
  - Distance from mean for each attribute
    - 每个属性与均值的距离
  - Z-scores for key attributes
    - 关键属性的 Z 分数
  - Interaction terms for highly correlated attributes
    - 高度相关属性的交互项
- Ensure no leakage in feature creation
  - 确保特征创建中没有泄漏

#### 6.1.4. Integrate data

#### 6.1.4. 整合数据

**Final Dataset:**
**最终数据集：**

- Combine all numerical attributes
  - 合并所有数值属性
- Apply chosen normalization method(s)
  - 应用选定的归一化方法
- Verify data consistency
  - 验证数据一致性
- Create clean dataset ready for LOF and Isolation Forest algorithms
  - 创建准备好用于 LOF 和孤立森林算法的干净数据集

#### 6.1.5. Format data

#### 6.1.5. 格式化数据

**Final Formatting:**
**最终格式化：**

- Ensure all attributes are numerical and scaled
  - 确保所有属性都是数值且已缩放
- Remove any remaining categorical attributes or properly encode them
  - 删除任何剩余的分类属性或正确编码它们
- Split into training/testing sets if required by chosen implementation
  - 如果所选实现需要，拆分为训练/测试集
- Save processed datasets for both methods
  - 保存两种方法的处理后数据集

**Documentation:**
**文档：**

- Document scaling methods used
  - 记录使用的缩放方法
- Create data dictionary
  - 创建数据字典
- Note any special considerations for outlier detection context
  - 注意异常检测上下文的任何特殊考虑

### 6.2. Modelling

### 6.2. 建模

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 6.2.1. Select modeling techniques

#### 6.2.1. 选择建模技术

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 6.2.2. Generate test design

#### 6.2.2. 生成测试设计

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 6.2.3. Build model

#### 6.2.3. 构建模型

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 6.2.4. Assess model

#### 6.2.4. 评估模型

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

### 6.3. Evaluation

### 6.3. 评估

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 6.3.1. Evaluate results

#### 6.3.1. 评估结果

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 6.3.2. Interpret results

#### 6.3.2. 解释结果

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 6.3.3. Review of process

#### 6.3.3. 流程回顾

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

#### 6.3.4. Determine next steps

#### 6.3.4. 确定后续步骤

_(To be completed in Part 2)_
_（将在第 2 部分完成）_

## 7. Conclusion

## 7. 结论

_(To be completed in Part 2 - Overall project summary and insights)_
_（将在第 2 部分完成 - 整个项目总结和见解）_

---

**Note:** You must update your table of contents to reflect correct page numbers
**注意：** 您必须更新目录以反映正确的页码
