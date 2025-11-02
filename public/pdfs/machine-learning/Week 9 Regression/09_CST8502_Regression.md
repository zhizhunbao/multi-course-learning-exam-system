# 09 CST8502 Regression

_Generated from PDF document_

**Course**: CST8502 MACHINE LEARNING
_课程_: CST8502 机器学习

**Week**: Week 9
_周次_: 第 9 周

**Topic**: Regression
_主题_: 回归

**Type**: **Final Exam**
_类型_: 期末考试

**Professor**: Dr. Anu Thomas
_教授_: Dr. Anu Thomas

---

## Table of Contents / 目录

1. [Agenda / 课程议程](#agenda--课程议程)
2. [Types of Relationships / 关系类型](#types-of-relationships--关系类型)
3. [Introduction to Regression / 回归简介](#introduction-to-regression--回归简介)
4. [Simple Linear Regression / 简单线性回归](#simple-linear-regression--简单线性回归)
5. [Linear Regression Parameters / 线性回归参数](#linear-regression-parameters--线性回归参数)
6. [Least Squares Method / 最小二乘法](#least-squares-method--最小二乘法)
7. [Measuring Accuracy / 准确性测量](#measuring-accuracy--准确性测量)
8. [Multiple Regression / 多重回归](#multiple-regression--多重回归)
9. [Multivariate Regression / 多元回归](#multivariate-regression--多元回归)
10. [Logistic Regression / 逻辑回归](#logistic-regression--逻辑回归)

---

## Agenda / 课程议程

- Linear regression / 线性回归
- Simple linear regression / 简单线性回归
- Multiple linear regression / 多重线性回归
- Multivariate regression / 多元回归
- Logistic regression / 逻辑回归

---

## Types of Relationships / 关系类型

### Deterministic (or functional) Relationship / 确定性关系

A deterministic relationship is precise and fully predictable.
确定性关系是精确的、完全可预测的关系。

**Example**: The relationship between Celsius and Fahrenheit
_示例_: 摄氏度与华氏度的关系

Formula / 公式：

```
F = (9/5) * C + 32
```

In a deterministic relationship, the observed (x, y) data points fall directly on the line.
在确定性关系中，观察到的 (x, y) 数据点完全落在直线上。

For deterministic relationship, the equation exactly describes the relationship between the two variables.
对于确定性关系，方程精确地描述了两个变量之间的关系。

### Statistical Relationship / 统计关系

A statistical relationship is imperfect and has variation.
统计关系是不完美的、存在变异的关系。

**Examples / 示例**：

- **Height and weight** — as height increases, you'd expect weight to increase, but not perfectly.
  _身高和体重_ — 随着身高增加，体重通常也会增加，但不是完全相关的。
- **Alcohol consumed and blood alcohol content** — as alcohol consumption increases, you'd expect one's blood alcohol content to increase, but not perfectly.
  _饮酒量和血液酒精含量_ — 随着饮酒量增加，血液酒精含量通常增加，但不是完全相关的。
- **Driving speed and gas mileage** — as driving speed increases, you'd expect gas mileage to decrease, but not perfectly.
  _驾驶速度和油耗_ — 随着驾驶速度增加，油耗通常增加，但不是完全相关的。

**Example Case / 实际案例**: The relationship between mortality due to skin cancer and latitude
_实际案例_: 皮肤癌死亡率与纬度的关系

- **Response variable y**: The mortality due to skin cancer (number of deaths per 10 million people)
  _响应变量 y_: 皮肤癌死亡率（每 1000 万人口的死亡人数）
- **Predictor variable x**: The latitude (degrees North) at the center of 49 states in the U.S.
  _预测变量 x_: 纬度（美国 49 个州的中心纬度，北纬度数）

---

## Introduction to Regression / 回归简介

**Definition**: When you have a series of continuous data that follow some sort of pattern.
_定义_: 当您有一系列遵循某种模式的连续数据时。

Regression determines the strength of the relationship between dependent variable and a series of other changing variables (known as independent variables).
回归分析用于确定因变量与一系列其他变化变量（称为自变量）之间关系的强度。

---

## Simple Linear Regression / 简单线性回归

### Basic Concepts / 基本概念

Simple linear regression is a statistical method that allows us to summarize and study relationships between two continuous variables.
简单线性回归是一种统计方法，允许我们总结和研究两个连续变量之间的关系。

- **Independent (Predictor) Variable / 自变量 (Independent/Predictor Variable)**: denoted as x
  _用 x 表示_
- **Dependent (Response) Variable / 因变量 (Dependent/Response Variable)**: denoted as y
  _用 y 表示_

### Univariate Linear Regression / 单变量线性回归

Univariate linear regression tries to fit a best-fit line to a data set.
单变量线性回归（Univariate Linear Regression）试图将最佳拟合线拟合到数据集。

This line is then used to predict real values for continuous output.
这条线随后用于预测连续输出的实际值。

**Training Set Requirements / 训练集需求**：

- **x** — an input variable / _输入变量_
- **y** — The output variable / _输出变量_

**Hypothesis Function / 假设函数 (Hypothesis Function)**:

```
h(x) = Θ₀ + Θ₁x
```

Or in traditional mathematical notation / 或者用传统数学表示：

```
y = mx + b
```

Where / 其中：

- `h(x)` is the predicted value for x / _`h(x)` 是 x 的预测值_
- `Θ₀` is the y-intercept / _`Θ₀` 是 y 截距_
- `Θ₁` is the slope (coefficient) / _`Θ₁` 是斜率（系数）_

---

## Linear Regression Parameters / 线性回归参数

### Parameter Explanation / 参数说明

In mathematics, a line needs two parameters:
在数学中，一条直线需要两个参数：

**Mathematical form**: `y = mx + b`
_数学形式_: `y = mx + b`

- **m**: slope / _斜率 (slope)_
- **b**: y-intercept / _y 截距 (y-intercept)_

**Regression form**: `h(x) = Θ₀ + Θ₁x`
_回归形式_: `h(x) = Θ₀ + Θ₁x`

- **Θ₀**: y-intercept (coefficient) / _y 截距（系数）_
- **Θ₁**: slope (coefficient) / _斜率（系数）_
- **h(x)**: predicted value for x / _x 的预测值_

### Cost Function / 成本函数

To choose the best values of Θ₀ and Θ₁, we use a cost function.
为了选择 Θ₀ 和 Θ₁ 的最佳值，我们使用成本函数（Cost Function）。

This calculates the total error between your predicted value, and the actual values.
成本函数计算预测值与实际值之间的总误差。

We continue to change the values until we find the minimum error.
我们继续改变值，直到找到最小误差。

- **h function** deals with x / _h 函数处理 x_
- **Cost function** deals with Θ (parameters) / _成本函数处理 Θ（参数）_

---

## Linear Regression Example / 线性回归示例

### Height-Weight Data / 身高-体重数据

| Height (inches) / 身高 (英寸) | Weight (pounds) / 体重 (磅) |
| ----------------------------- | --------------------------- |
| 63                            | 127                         |
| 64                            | 121                         |
| 66                            | 142                         |
| 69                            | 157                         |
| 69                            | 162                         |
| 71                            | 156                         |
| 71                            | 169                         |
| 72                            | 165                         |
| 73                            | 181                         |
| 75                            | 208                         |

### Best Fit Line Comparison / 最佳拟合线比较

**Question**: Which line (red or pink) is the best fit?
_问题_: 哪条线（红色或粉色）是最佳拟合？

**Red line**: `w = -266.53 + 6.1376h`
_红线_: `w = -266.53 + 6.1376h`

**Pink line**: `w = -331.2 + 7.1h`
_粉线_: `w = -331.2 + 7.1h`

**Example Calculation** (Student with height 63 inches, actual weight 127 pounds):
_示例计算_（身高 63 英寸的学生，实际体重 127 磅）：

- **Red line prediction**: `-266.53 + 6.1376 × 63 = 120.1` pounds
  _红线预测_: `-266.53 + 6.1376 × 63 = 120.1` 磅

  - **Prediction Error**: `127 - 120.1 = 6.9` pounds
    _预测误差_: `127 - 120.1 = 6.9` 磅

- **Pink line prediction**: `-331.2 + 7.1 × 63 = 116.1` pounds
  _粉线预测_: `-331.2 + 7.1 × 63 = 116.1` 磅

  - **Prediction Error**: `127 - 116.1 = 10.9` pounds
    _预测误差_: `127 - 116.1 = 10.9` 磅

**Conclusion**: A line that fits the data "best" will be the one with overall minimal prediction errors.
_结论_: 拟合数据"最佳"的线是总体预测误差最小的线。

In order to find the overall prediction error, "least squares criterion" can be used.
为了找到总体预测误差，可以使用"最小二乘准则"。

---

## Least Squares Method / 最小二乘法

### Least Squares Criterion / 最小二乘准则

> **⚠️ Final Exam Content / 期末考试内容 ⚠️** > _这部分期末考试要考 / This section will be tested in the final exam_

**Prediction error**: `yᵢ - y'ᵢ`
_预测误差_: `yᵢ - y'ᵢ`

**Squared prediction error**: `(yᵢ - y'ᵢ)²`
_平方预测误差_: `(yᵢ - y'ᵢ)²`

**Overall squared prediction error / 总体平方预测误差**:

```
Overall squared prediction error = Σᵢ₌₁ⁿ (yᵢ - y'ᵢ)²
总体平方预测误差 = Σᵢ₌₁ⁿ (yᵢ - y'ᵢ)²
```

The least squares method finds the best-fit line by minimizing the sum of squared errors for all data points.
最小二乘法通过最小化所有数据点的平方误差之和来找到最佳拟合线。

### Finding m and b / 求解 m 和 b

(The specific calculation method will be demonstrated)
（演示中会展示具体的计算方法）

---

## Measuring Accuracy / 准确性测量

### How can you tell if your regression line is a good fit? / 如何判断回归线拟合是否良好？

Calculate the "Coefficient of determination", the residual, or also called R², where r is the correlation coefficient.
计算决定系数（Coefficient of Determination），也称为 R²（r 是相关系数）。

This is a number between 0 and 1, which normally means how close your data is to the line.
R² 是一个介于 0 和 1 之间的数字，表示数据与直线的接近程度。

If your data is always on the line, then R² = 1.
如果数据始终在直线上，则 R² = 1。

If your data is far away from the line, then R² will be low.
如果数据远离直线，则 R² 较低。

**Visualization / 可视化**：

- **High R²**: data is close to line / _高 R²: 数据接近直线_
- **Lower R²**: data is far from line / _低 R²: 数据远离直线_

### Correlation Coefficient (r) / 相关系数

The calculation formula for correlation coefficient:
相关系数的计算公式：

```
        √(Σᵢ₌₁ⁿ (xᵢ - x̄)²)
b₁ = ───────────────────── × r
        √(Σᵢ₌₁ⁿ (yᵢ - ȳ)²)
```

where b₁ is the slope in the equation `y = b₀ + b₁x`.
其中 b₁ 是方程 `y = b₀ + b₁x` 中的斜率。

---

## Multiple Regression / 多重回归

### Multiple Linear Regression Model / 多重线性回归模型

Multiple linear regression uses multiple predictor variables to predict one response variable.
多重线性回归使用多个预测变量来预测一个响应变量。

**Example**: CPU performance prediction model (cpu.arff)
_示例_: CPU 性能预测模型（cpu.arff）

```
class = 0.0491 × MYCT + 0.0152 × MMIN + 0.0056 × MMAX
        + 0.6298 × CACH + 1.4599 × CHMAX - 56.075
```

**Weight Explanation**: The weights tells the relationship of each variable to the outcome, whether they are positive or negative.
_权重说明_: 每个变量的权重（系数）告诉我们该变量与结果的关系，无论是正相关还是负相关。

---

## Multivariate Regression / 多元回归

### Multivariate Regression / 多元回归

Multivariate regression is a technique that estimates a single regression model with more than one outcome variable.
多元回归是一种估计具有多个结果变量的单一回归模型的技术。

**Example Scenario**: Health study
_示例场景_: 健康研究

A doctor has collected data on cholesterol, blood pressure, and weight.
一位医生收集了胆固醇、血压和体重的数据。

She also collected data on the eating habits of the subjects (e.g., how many ounces of red meat, fish, dairy products, and chocolate consumed per week).
她还收集了受试者的饮食习惯数据（例如，每周消耗多少盎司的红肉、鱼肉、乳制品和巧克力）。

She wants to investigate the relationship between the three measures of health and eating habits.
她想要研究三个健康指标与饮食习惯之间的关系。

**Dependent factors (Health indicators) / 因变量（健康指标）**：

- Cholesterol / 胆固醇 (cholesterol)
- Blood pressure / 血压 (blood pressure)
- Weight / 体重 (weight)

**Independent factors (Eating habits) / 自变量（饮食习惯）**：

- Red meat intake (ounces per week) / 红肉摄入量（每周盎司数）
- Fish intake (ounces per week) / 鱼肉摄入量（每周盎司数）
- Dairy products intake (ounces per week) / 乳制品摄入量（每周盎司数）
- Chocolate intake (ounces per week) / 巧克力摄入量（每周盎司数）

---

## Logistic Regression / 逻辑回归

### Logistic Regression / 逻辑回归

Logistic regression models a relationship between independent (predictor) variable and a categorical response variable.
逻辑回归模型建立独立（预测）变量与分类响应变量之间的关系。

It helps us to estimate a probability of falling into a certain level of the categorical response given a set of predictors.
它帮助我们估计在给定一组预测变量的情况下，落入分类响应变量的某个水平的概率。

**Features / 特点**:

- Applicable to classification problems (e.g., binary classification, multi-class classification)
  _适用于分类问题（如二分类、多分类）_

**Application Examples / 应用示例**:

- Diabetes prediction (using Diabetes dataset) / 糖尿病预测（使用 Diabetes 数据集）
- Other binary or multi-class classification problems / 其他二分类或多分类问题

---

## Tool Demonstrations / 工具演示

### Weka Demo / Weka 演示

1. Regression analysis on **Height-Weight file** / _身高-体重文件的回归分析_
2. Multiple regression analysis on **CPU dataset** (cpu.arff) / _CPU 数据集（cpu.arff）的多重回归分析_
3. Logistic regression analysis on **Diabetes dataset** / _糖尿病数据集（Diabetes dataset）的逻辑回归分析_

### Weka AI Studio / Weka AI Studio

Using Weka AI Studio for regression analysis and visualization.
使用 Weka AI Studio 进行回归分析和可视化。

---

_End of document / 文档结束_
