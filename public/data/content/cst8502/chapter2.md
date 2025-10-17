## 📚 概念

### 数据预处理核心概念

- **数据清洗**：识别和修正数据中的错误、不一致和不完整
- **数据转换**：将数据转换为适合机器学习算法的格式
- **特征工程**：创建新特征或选择最相关的特征
- **归一化**：将特征缩放到统一范围（如[0,1]）
- **标准化**：将特征转换为均值为 0、标准差为 1 的分布

### k 近邻算法核心概念

- **k-NN（k-Nearest Neighbors）**：基于相似性的非参数分类和回归算法
- **实例基学习**：存储所有训练数据，预测时进行比较
- **距离度量**：衡量数据点之间相似性的方法
- **k 值**：用于预测的最近邻居数量
- **多数投票**：分类时选择 k 个邻居中最常见的类别

### 距离度量

1. **欧几里得距离**
   $$d(x, y) = \sqrt{\sum_{i=1}^{n}(x_i - y_i)^2}$$

2. **曼哈顿距离**
   $$d(x, y) = \sum_{i=1}^{n}|x_i - y_i|$$

3. **闵可夫斯基距离**
   $$d(x, y) = (\sum_{i=1}^{n}|x_i - y_i|^p)^{1/p}$$

## 🔍 解释

### 为什么需要数据预处理？

真实世界的数据通常是"脏"的：

- **缺失值**：某些数据点没有记录
- **异常值**：极端或不寻常的值
- **不一致**：同一信息的不同表示
- **噪声**：随机错误或变异
- **不同尺度**：特征的数值范围差异很大

### 数据清洗技术

**1. 处理缺失值**

```python
# 删除缺失值
df.dropna()

# 填充缺失值
df.fillna(df.mean())  # 用均值填充
df.fillna(method='ffill')  # 前向填充
df.fillna(method='bfill')  # 后向填充

# 插值
df.interpolate()
```

**2. 处理异常值**

- **识别**：箱线图、Z 分数、IQR 方法
- **处理**：删除、替换、转换、保留

**3. 处理重复数据**

```python
df.drop_duplicates()
```

### 数据转换技术

**1. 归一化（Min-Max Scaling）**
将数据缩放到[0,1]范围：
$$x' = \frac{x - x_{min}}{x_{max} - x_{min}}$$

```python
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
X_normalized = scaler.fit_transform(X)
```

**2. 标准化（Z-score Normalization）**
转换为均值 0、标准差 1：
$$x' = \frac{x - \mu}{\sigma}$$

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_standardized = scaler.fit_transform(X)
```

**3. 分类变量编码**

- **标签编码**：将类别转换为数字（0, 1, 2, ...）
- **独热编码**：创建二进制列
- **目标编码**：基于目标变量的均值

```python
# 独热编码
pd.get_dummies(df['category'])

# 标签编码
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['category_encoded'] = le.fit_transform(df['category'])
```

### k-NN 算法详解

**工作原理：**

1. 选择 k 值（邻居数量）
2. 计算新数据点到所有训练数据的距离
3. 选择距离最近的 k 个邻居
4. 分类：多数投票；回归：平均值

**算法特点：**

- **非参数**：不假设数据分布
- **懒惰学习**：训练阶段只存储数据，预测时才计算
- **简单直观**：易于理解和实现
- **无需训练**：没有显式的训练过程

### k 值的选择

**小 k 值（如 k=1）：**

- 优点：模型复杂，能捕捉细节
- 缺点：对噪声敏感，容易过拟合

**大 k 值（如 k=100）：**

- 优点：模型平滑，抗噪声
- 缺点：可能欠拟合，忽略局部特征

**选择方法：**

- 交叉验证
- 网格搜索
- 经验法则：k = √n（n 为样本数）

### 维度诅咒

高维空间中的挑战：

- 距离度量失去意义
- 计算成本急剧增加
- 需要指数级增长的数据量
- "最近"的邻居也可能很远

**解决方案：**

- 降维（PCA、t-SNE）
- 特征选择
- 正则化

## 📜 历史

### 数据预处理的发展

**1960-1970 年代**

- 数据清洗的概念首次出现
- 统计方法用于处理缺失值

**1980-1990 年代**

- 数据仓库概念兴起
- ETL（提取、转换、加载）流程标准化
- 数据质量成为关注焦点

**2000 年代**

- 大数据时代到来
- 自动化数据清洗工具发展
- 特征工程成为机器学习关键步骤

**2010 年代至今**

- 深度学习自动特征学习
- AutoML 自动化特征工程
- 数据增强技术发展

### k-NN 算法的发展

**1951 年**

- Fix 和 Hodges 提出最近邻规则的理论基础

**1967 年**

- Cover 和 Hart 发表关于 k-NN 的开创性论文
- 证明了 k-NN 的渐近错误率

**1970-1980 年代**

- k-NN 在模式识别中广泛应用
- 加速算法（如 KD 树）被开发

**1990 年代**

- 距离加权 k-NN 被提出
- 大规模数据集的挑战

**2000 年代至今**

- 近似最近邻算法（LSH、HNSW）
- GPU 加速
- 与深度学习结合

### 关键贡献者

- **Evelyn Fix & Joseph Hodges**：最近邻方法的先驱
- **Thomas Cover & Peter Hart**：k-NN 理论基础

## 💪 练习

### 基础练习

**练习 1：数据清洗**
给定数据集：

```python
import pandas as pd
data = {
    'age': [25, 30, None, 35, 40],
    'income': [50000, 60000, 75000, None, 90000],
    'category': ['A', 'B', 'A', 'C', 'B']
}
df = pd.DataFrame(data)
```

任务：

1. 识别缺失值
2. 用均值填充数值型缺失值
3. 对分类变量进行独热编码

**练习 2：特征缩放**
给定特征：

- 年龄：[20, 25, 30, 35, 40]
- 收入：[30000, 40000, 50000, 60000, 70000]

任务：

1. 使用 Min-Max 归一化
2. 使用 Z-score 标准化
3. 比较结果

**练习 3：距离计算**
计算点 A(1, 2)和点 B(4, 6)之间的：

1. 欧几里得距离
2. 曼哈顿距离
3. 闵可夫斯基距离（p=3）

**练习 4：k-NN 手工计算**
训练数据：

```
点     特征(x,y)    类别
P1     (1, 1)       A
P2     (2, 2)       A
P3     (3, 3)       B
P4     (6, 6)       B
```

预测点(2, 3)的类别（k=3）

### 实践项目

**项目 1：完整的数据预处理流水线**

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

# 1. 加载数据
df = pd.read_csv('data.csv')

# 2. 处理缺失值
imputer = SimpleImputer(strategy='mean')
df_imputed = imputer.fit_transform(df)

# 3. 处理异常值
Q1 = df.quantile(0.25)
Q3 = df.quantile(0.75)
IQR = Q3 - Q1
df_clean = df[~((df < (Q1 - 1.5 * IQR)) | (df > (Q3 + 1.5 * IQR))).any(axis=1)]

# 4. 特征缩放
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df_clean)

# 5. 编码分类变量
df_encoded = pd.get_dummies(df, columns=['category'])
```

**项目 2：从零实现 k-NN**

```python
import numpy as np
from collections import Counter

class KNN:
    def __init__(self, k=3):
        self.k = k

    def fit(self, X, y):
        self.X_train = X
        self.y_train = y

    def euclidean_distance(self, x1, x2):
        return np.sqrt(np.sum((x1 - x2)**2))

    def predict(self, X):
        predictions = [self._predict(x) for x in X]
        return np.array(predictions)

    def _predict(self, x):
        # 计算距离
        distances = [self.euclidean_distance(x, x_train)
                    for x_train in self.X_train]

        # 获取k个最近邻的索引
        k_indices = np.argsort(distances)[:self.k]

        # 获取k个最近邻的标签
        k_nearest_labels = [self.y_train[i] for i in k_indices]

        # 多数投票
        most_common = Counter(k_nearest_labels).most_common(1)
        return most_common[0][0]

# 使用示例
knn = KNN(k=3)
knn.fit(X_train, y_train)
predictions = knn.predict(X_test)
```

**项目 3：k 值优化**

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
import matplotlib.pyplot as plt

# 测试不同的k值
k_values = range(1, 31)
cv_scores = []

for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k)
    scores = cross_val_score(knn, X, y, cv=5, scoring='accuracy')
    cv_scores.append(scores.mean())

# 可视化
plt.plot(k_values, cv_scores)
plt.xlabel('K值')
plt.ylabel('交叉验证准确率')
plt.title('K值优化')
plt.show()

# 找到最佳k值
optimal_k = k_values[np.argmax(cv_scores)]
print(f'最佳k值: {optimal_k}')
```

## 🎯 测一测

### 选择题

**1. 以下哪种方法不是处理缺失值的常用方法？**

- A. 删除含缺失值的行
- B. 用均值填充
- C. 用随机值填充
- D. 插值

**2. Min-Max 归一化将数据缩放到什么范围？**

- A. [-1, 1]
- B. [0, 1]
- C. [0, 100]
- D. 任意范围

**3. k-NN 算法中，k 值越小：**

- A. 模型越简单
- B. 更容易过拟合
- C. 更容易欠拟合
- D. 对噪声更不敏感

**4. 欧几里得距离适用于：**

- A. 只有分类特征
- B. 只有数值特征
- C. 混合特征
- D. 文本数据

**5. 标准化后的数据具有：**

- A. 最小值 0，最大值 1
- B. 均值 0，标准差 1
- C. 均值 1，方差 0
- D. 中位数 0，范围 1

**6. 维度诅咒是指：**

- A. 特征太少
- B. 数据太少
- C. 高维空间中距离失去意义
- D. 算法太复杂

**7. k-NN 是一种：**

- A. 参数模型
- B. 非参数模型
- C. 深度学习模型
- D. 集成模型

**8. 独热编码会：**

- A. 减少特征数量
- B. 增加特征数量
- C. 保持特征数量不变
- D. 删除特征

### 判断题

**1. 数据预处理不是必需的，可以直接训练模型。** （×）

**2. k-NN 算法不需要显式的训练过程。** （✓）

**3. 归一化和标准化的结果是相同的。** （×）

**4. k-NN 对特征缩放不敏感。** （×）

**5. 曼哈顿距离总是大于或等于欧几里得距离。** （×）

**6. 异常值总是需要被删除。** （×）

**7. k-NN 的时间复杂度在预测时较高。** （✓）

**8. 特征工程可以提高模型性能。** （✓）

### 简答题

**1. 解释归一化和标准化的区别，以及何时使用它们。**

**参考答案：**
归一化（Min-Max Scaling）将数据缩放到[0,1]范围，保持数据的原始分布形状，适用于数据分布均匀、需要保持零值的场景。标准化（Z-score）将数据转换为均值 0、标准差 1 的分布，适用于数据近似正态分布、存在异常值、需要比较不同单位的特征的场景。

**2. k-NN 算法有哪些优点和缺点？**

**参考答案：**
优点：

- 简单易懂，易于实现
- 无需训练，适合在线学习
- 对非线性数据效果好
- 可用于分类和回归

缺点：

- 计算成本高（需要计算到所有点的距离）
- 内存需求大（需要存储所有训练数据）
- 对特征缩放敏感
- 受维度诅咒影响
- 需要选择合适的 k 值

**3. 如何选择合适的 k 值？**

**参考答案：**

- 使用交叉验证评估不同 k 值的性能
- 绘制 k 值与性能的曲线，选择性能最好的 k
- 考虑奇数 k 值避免平局
- 经验法则：k = √n
- 小数据集用较小 k，大数据集用较大 k
- 根据问题复杂度调整

### 计算题

**1. 给定两点 A(2, 3)和 B(5, 7)，计算：**
a) 欧几里得距离
b) 曼哈顿距离

**参考答案：**
a) 欧几里得距离 = √[(5-2)² + (7-3)²] = √[9 + 16] = √25 = 5
b) 曼哈顿距离 = |5-2| + |7-3| = 3 + 4 = 7

**2. 使用 Min-Max 归一化将值[10, 20, 30, 40, 50]缩放到[0, 1]。**

**参考答案：**
公式：x' = (x - min) / (max - min)

- min = 10, max = 50
- 10 → (10-10)/(50-10) = 0
- 20 → (20-10)/(50-10) = 0.25
- 30 → (30-10)/(50-10) = 0.5
- 40 → (40-10)/(50-10) = 0.75
- 50 → (50-10)/(50-10) = 1

结果：[0, 0.25, 0.5, 0.75, 1]

## 🗺️ 思维导图

```
数据预处理与k-NN
│
├─── 数据预处理
│    ├─── 数据清洗
│    │    ├─── 处理缺失值
│    │    │    ├─── 删除
│    │    │    ├─── 填充（均值/中位数/众数）
│    │    │    └─── 插值
│    │    ├─── 处理异常值
│    │    │    ├─── 识别（箱线图/Z分数/IQR）
│    │    │    └─── 处理（删除/替换/转换）
│    │    └─── 删除重复数据
│    │
│    ├─── 数据转换
│    │    ├─── 归一化（Min-Max）
│    │    │    └─── 缩放到[0,1]
│    │    ├─── 标准化（Z-score）
│    │    │    └─── 均值0，标准差1
│    │    └─── 分类编码
│    │         ├─── 标签编码
│    │         ├─── 独热编码
│    │         └─── 目标编码
│    │
│    └─── 特征工程
│         ├─── 特征选择
│         ├─── 特征提取
│         └─── 降维（PCA）
│
├─── k-NN算法
│    ├─── 基本原理
│    │    ├─── 实例基学习
│    │    ├─── 懒惰学习
│    │    └─── 非参数方法
│    │
│    ├─── 距离度量
│    │    ├─── 欧几里得距离
│    │    ├─── 曼哈顿距离
│    │    ├─── 闵可夫斯基距离
│    │    └─── 余弦相似度
│    │
│    ├─── k值选择
│    │    ├─── 交叉验证
│    │    ├─── 网格搜索
│    │    └─── 经验法则√n
│    │
│    ├─── 算法步骤
│    │    ├─── 1. 计算距离
│    │    ├─── 2. 找k个最近邻
│    │    ├─── 3. 多数投票/平均
│    │    └─── 4. 返回预测
│    │
│    ├─── 优点
│    │    ├─── 简单直观
│    │    ├─── 无需训练
│    │    └─── 适合非线性
│    │
│    └─── 缺点
│         ├─── 计算成本高
│         ├─── 内存需求大
│         ├─── 对尺度敏感
│         └─── 维度诅咒
│
├─── 应用场景
│    ├─── 推荐系统
│    ├─── 图像识别
│    ├─── 文本分类
│    └─── 医疗诊断
│
└─── 优化技术
     ├─── KD树
     ├─── Ball树
     ├─── LSH（局部敏感哈希）
     └─── GPU加速
```

## 📖 学习资源

### 课程材料

- **02_CST8502_Preprocessing_kNN.pdf**：预处理和 k-NN 的综合指南

### 推荐工具

- **Python 库**：
  - pandas：数据处理
  - scikit-learn：预处理和 k-NN 实现
  - numpy：数值计算
  - matplotlib/seaborn：数据可视化

### 实践数据集

- Iris 数据集（分类）
- Housing 数据集（回归）
- MNIST（图像分类）
- Kaggle 数据集

## 🎯 学习目标检查清单

完成本章后，您应该能够：

- ✅ 识别和处理数据质量问题（缺失值、异常值、重复）
- ✅ 应用归一化和标准化技术
- ✅ 对分类变量进行编码
- ✅ 理解 k-NN 算法的工作原理
- ✅ 计算不同类型的距离度量
- ✅ 选择合适的 k 值
- ✅ 实现完整的数据预处理流水线
- ✅ 使用 k-NN 进行分类和回归
- ✅ 评估和优化 k-NN 模型性能

---

**下一章预告：** 第三章将学习决策树算法，一种强大且可解释的分类方法。
