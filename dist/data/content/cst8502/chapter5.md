## 📚 概念

### 异常值核心概念

- **异常值（Outlier）**：显著偏离数据集中其他观测值的数据点
- **离群点检测（Outlier Detection）**：识别不符合预期模式的数据点
- **异常检测（Anomaly Detection）**：发现罕见事件、观测或可疑项
- **新奇检测（Novelty Detection）**：识别与训练数据不同的新模式

### 异常值类型

1. **点异常值（Point Anomalies）**

   - 单个数据点异常
   - 最常见的异常类型
   - 示例：信用卡交易金额异常高

2. **上下文异常值（Contextual Anomalies）**

   - 在特定上下文中异常
   - 依赖于环境
   - 示例：夏季温度-10°C

3. **集体异常值（Collective Anomalies）**
   - 一组数据点共同异常
   - 单个点可能正常
   - 示例：网络流量的异常模式

### 异常值产生原因

- **数据输入错误**：手动录入错误
- **测量错误**：传感器故障、仪器误差
- **实验错误**：样本处理不当
- **数据处理错误**：计算或转换错误
- **自然变异**：真实的极端值
- **欺诈行为**：恶意活动

## 🔍 解释

### 统计方法

**1. Z 分数法（Z-Score Method）**
$$z = \frac{x - \mu}{\sigma}$$

- **规则**：|z| > 3 通常被认为是异常值
- **假设**：数据服从正态分布
- **优点**：简单、直观
- **缺点**：对异常值敏感（均值和标准差受影响）

```python
from scipy import stats
import numpy as np

def detect_outliers_zscore(data, threshold=3):
    z_scores = np.abs(stats.zscore(data))
    return np.where(z_scores > threshold)[0]

# 示例
data = [10, 12, 14, 12, 11, 15, 100, 13, 12]
outliers = detect_outliers_zscore(data)
print(f'异常值索引: {outliers}')
```

**2. 修正 Z 分数（Modified Z-Score）**
使用中位数绝对偏差（MAD）：
$$Modified\ Z = \frac{0.6745(x_i - median)}{MAD}$$
$$MAD = median(|x_i - median|)$$

- **优点**：对异常值更稳健
- **阈值**：通常使用 3.5

**3. IQR 方法（Interquartile Range）**
$$IQR = Q3 - Q1$$
$$下界 = Q1 - 1.5 \times IQR$$
$$上界 = Q3 + 1.5 \times IQR$$

- **Q1**：第一四分位数（25%）
- **Q3**：第三四分位数（75%）
- **优点**：对异常值稳健，无分布假设
- **可视化**：箱线图

```python
def detect_outliers_iqr(data):
    Q1 = np.percentile(data, 25)
    Q3 = np.percentile(data, 75)
    IQR = Q3 - Q1

    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    outliers = []
    for i, x in enumerate(data):
        if x < lower_bound or x > upper_bound:
            outliers.append(i)

    return outliers, lower_bound, upper_bound

# 示例
data = [10, 12, 14, 12, 11, 15, 100, 13, 12]
outliers, lower, upper = detect_outliers_iqr(data)
print(f'异常值索引: {outliers}')
print(f'正常范围: [{lower:.2f}, {upper:.2f}]')
```

### 基于距离的方法

**1. k 近邻距离（k-NN Distance）**

- 计算每个点到第 k 个最近邻的距离
- 距离大的点被认为是异常值
- **优点**：简单、无参数假设
- **缺点**：计算成本高、对 k 值敏感

**2. 局部异常因子（LOF - Local Outlier Factor）**
$$LOF(A) = \frac{\sum_{B \in N_k(A)} \frac{lrd(B)}{lrd(A)}}{|N_k(A)|}$$

其中：

- lrd = 局部可达密度
- N_k(A) = A 的 k 个最近邻

**解释：**

- LOF ≈ 1：与邻居密度相似（正常）
- LOF >> 1：密度比邻居低得多（异常）
- LOF < 1：密度比邻居高（正常）

```python
from sklearn.neighbors import LocalOutlierFactor

# 创建LOF检测器
lof = LocalOutlierFactor(n_neighbors=20, contamination=0.1)

# 预测（-1表示异常，1表示正常）
predictions = lof.fit_predict(X)

# 获取异常分数
scores = lof.negative_outlier_factor_

# 找到异常值
outliers = np.where(predictions == -1)[0]
print(f'检测到 {len(outliers)} 个异常值')
```

### 基于密度的方法

**DBSCAN（Density-Based Spatial Clustering）**

- 不属于任何簇的点被标记为噪声/异常值
- **参数**：
  - eps：邻域半径
  - min_samples：最小点数

```python
from sklearn.cluster import DBSCAN

# 创建DBSCAN
dbscan = DBSCAN(eps=0.5, min_samples=5)

# 拟合
labels = dbscan.fit_predict(X)

# 噪声点标记为-1
outliers = np.where(labels == -1)[0]
print(f'检测到 {len(outliers)} 个异常值')
```

### 机器学习方法

**1. 隔离森林（Isolation Forest）**
**原理：**

- 异常值更容易被"隔离"
- 构建随机决策树
- 异常值的平均路径长度较短

```python
from sklearn.ensemble import IsolationForest

# 创建隔离森林
iso_forest = IsolationForest(
    n_estimators=100,
    contamination=0.1,  # 异常值比例
    random_state=42
)

# 训练和预测
predictions = iso_forest.fit_predict(X)

# -1表示异常，1表示正常
outliers = np.where(predictions == -1)[0]
print(f'检测到 {len(outliers)} 个异常值')

# 获取异常分数
scores = iso_forest.score_samples(X)
```

**2. 单类支持向量机（One-Class SVM）**
**原理：**

- 找到包含大多数数据的超球或超平面
- 不在边界内的点是异常值

```python
from sklearn.svm import OneClassSVM

# 创建One-Class SVM
ocsvm = OneClassSVM(
    kernel='rbf',
    gamma='auto',
    nu=0.1  # 异常值上界
)

# 训练和预测
predictions = ocsvm.fit_predict(X)

# -1表示异常，1表示正常
outliers = np.where(predictions == -1)[0]
```

**3. 自动编码器（Autoencoder）**
**原理：**

- 神经网络学习数据压缩和重建
- 重建误差大的点是异常值

```python
from tensorflow import keras
from tensorflow.keras import layers

# 构建自动编码器
encoder = keras.Sequential([
    layers.Dense(32, activation='relu', input_shape=(n_features,)),
    layers.Dense(16, activation='relu'),
    layers.Dense(8, activation='relu')
])

decoder = keras.Sequential([
    layers.Dense(16, activation='relu', input_shape=(8,)),
    layers.Dense(32, activation='relu'),
    layers.Dense(n_features, activation='sigmoid')
])

autoencoder = keras.Sequential([encoder, decoder])
autoencoder.compile(optimizer='adam', loss='mse')

# 训练
autoencoder.fit(X_train, X_train, epochs=50, batch_size=32, validation_split=0.1)

# 预测和计算重建误差
reconstructions = autoencoder.predict(X_test)
mse = np.mean(np.power(X_test - reconstructions, 2), axis=1)

# 设置阈值
threshold = np.percentile(mse, 95)
outliers = np.where(mse > threshold)[0]
```

### 处理异常值策略

**1. 删除**

- 适用：数据充足、异常值确实是错误
- 风险：丢失信息

**2. 替换/插补**

- 用均值、中位数或插值替换
- 适用：异常值不多、需要保留数据量

**3. 转换**

- 对数转换、平方根转换
- 减少异常值影响

**4. 分箱**

- 将连续值离散化
- 异常值归入极值箱

**5. 保留**

- 异常值可能是重要信息
- 使用稳健算法

**6. 单独建模**

- 为异常值建立单独模型
- 适用：异常值有特殊意义

## 📜 历史

### 异常值检测的发展

**19 世纪 - 统计起源**

- 1852 年：**Benjamin Peirce** 提出第一个异常值检测准则
- 统计学中的异常值概念开始形成

**1950-1960 年代 - 理论发展**

- 1950 年：**Grubbs 检验** 被提出
- 统计检验方法成熟
- 箱线图概念诞生

**1970-1980 年代 - 稳健统计**

- 稳健统计方法发展
- **John Tukey (1977)**：提出箱线图和 IQR 方法
- 对异常值稳健的估计方法

**1990 年代 - 距离和密度方法**

- **Knorr & Ng (1998)**：基于距离的异常值检测
- **Breunig et al. (2000)**：提出 LOF 算法
- DBSCAN 用于异常检测

**2000 年代 - 机器学习方法**

- **Isolation Forest (2008)**：刘飞龙等人提出
- One-Class SVM 应用
- 集成方法发展

**2010 年代至今 - 深度学习时代**

- 深度自动编码器
- 生成对抗网络（GAN）用于异常检测
- 时间序列异常检测
- 实时异常检测系统

### 关键贡献者

- **John Tukey**：箱线图、稳健统计
- **Breunig 等人**：LOF 算法
- **刘飞龙（Fei Tony Liu）**：隔离森林

## 💪 练习

### 基础练习

**练习 1：Z 分数计算**
给定数据：[10, 12, 14, 16, 18, 20, 100]

1. 计算均值和标准差
2. 计算每个点的 Z 分数
3. 识别异常值（|z| > 3）

**练习 2：IQR 方法**
给定数据：[5, 7, 8, 9, 10, 11, 12, 13, 15, 100]

1. 计算 Q1、Q3 和 IQR
2. 确定异常值边界
3. 识别异常值

**练习 3：可视化异常值**
创建箱线图和散点图识别以下数据的异常值：

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
data = np.concatenate([np.random.normal(50, 10, 100), [120, 125, -10]])
```

### 实践项目

**项目 1：多方法异常值检测比较**

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor
from sklearn.svm import OneClassSVM
from scipy import stats

# 生成数据
np.random.seed(42)
X_normal = np.random.normal(0, 1, (300, 2))
X_outliers = np.random.uniform(-4, 4, (20, 2))
X = np.vstack([X_normal, X_outliers])

# 方法1：Z-Score
z_scores = np.abs(stats.zscore(X))
z_outliers = np.where((z_scores > 3).any(axis=1))[0]

# 方法2：IQR
def iqr_outliers(data):
    Q1 = np.percentile(data, 25, axis=0)
    Q3 = np.percentile(data, 75, axis=0)
    IQR = Q3 - Q1
    mask = ((data < (Q1 - 1.5 * IQR)) | (data > (Q3 + 1.5 * IQR))).any(axis=1)
    return np.where(mask)[0]

iqr_out = iqr_outliers(X)

# 方法3：Isolation Forest
iso = IsolationForest(contamination=0.1, random_state=42)
iso_pred = iso.fit_predict(X)
iso_out = np.where(iso_pred == -1)[0]

# 方法4：LOF
lof = LocalOutlierFactor(n_neighbors=20, contamination=0.1)
lof_pred = lof.fit_predict(X)
lof_out = np.where(lof_pred == -1)[0]

# 方法5：One-Class SVM
ocsvm = OneClassSVM(nu=0.1)
ocsvm_pred = ocsvm.fit_predict(X)
ocsvm_out = np.where(ocsvm_pred == -1)[0]

# 可视化比较
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
methods = [
    ('原始数据', None),
    ('Z-Score', z_outliers),
    ('IQR', iqr_out),
    ('Isolation Forest', iso_out),
    ('LOF', lof_out),
    ('One-Class SVM', ocsvm_out)
]

for ax, (title, outliers) in zip(axes.flat, methods):
    ax.scatter(X[:, 0], X[:, 1], c='blue', s=20, alpha=0.5)
    if outliers is not None:
        ax.scatter(X[outliers, 0], X[outliers, 1], c='red', s=100, marker='x')
    ax.set_title(f'{title}\n检测到 {len(outliers) if outliers is not None else 0} 个异常值')
    ax.set_xlabel('特征1')
    ax.set_ylabel('特征2')

plt.tight_layout()
plt.savefig('outlier_comparison.png')
plt.show()
```

**项目 2：信用卡欺诈检测**

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
from sklearn.metrics import classification_report, confusion_matrix

# 加载数据（假设有标记的欺诈数据）
# df = pd.read_csv('creditcard.csv')

# 特征和标签
X = df.drop('Class', axis=1)
y = df['Class']

# 分割数据
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 训练隔离森林（只用正常数据）
iso_forest = IsolationForest(
    n_estimators=100,
    contamination=0.01,  # 假设1%是欺诈
    random_state=42
)
iso_forest.fit(X_train_scaled[y_train == 0])  # 只用正常交易训练

# 预测
y_pred = iso_forest.predict(X_test_scaled)
y_pred = np.where(y_pred == -1, 1, 0)  # 转换为0/1

# 评估
print('混淆矩阵:')
print(confusion_matrix(y_test, y_pred))
print('\n分类报告:')
print(classification_report(y_test, y_pred))

# 分析异常分数
scores = iso_forest.score_samples(X_test_scaled)
plt.figure(figsize=(10, 6))
plt.hist(scores[y_test == 0], bins=50, alpha=0.5, label='正常')
plt.hist(scores[y_test == 1], bins=50, alpha=0.5, label='欺诈')
plt.xlabel('异常分数')
plt.ylabel('频数')
plt.legend()
plt.title('异常分数分布')
plt.show()
```

**项目 3：时间序列异常检测**

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成时间序列数据
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365, freq='D')
trend = np.linspace(100, 150, 365)
seasonal = 10 * np.sin(2 * np.pi * np.arange(365) / 365)
noise = np.random.normal(0, 2, 365)
data = trend + seasonal + noise

# 添加异常值
data[50] += 30  # 点异常
data[100] += 25
data[200:210] -= 20  # 集体异常

df = pd.DataFrame({'date': dates, 'value': data})
df.set_index('date', inplace=True)

# 方法1：移动平均和标准差
window = 30
df['rolling_mean'] = df['value'].rolling(window=window).mean()
df['rolling_std'] = df['value'].rolling(window=window).std()
df['upper_bound'] = df['rolling_mean'] + 3 * df['rolling_std']
df['lower_bound'] = df['rolling_mean'] - 3 * df['rolling_std']
df['anomaly'] = ((df['value'] > df['upper_bound']) | (df['value'] < df['lower_bound']))

# 可视化
plt.figure(figsize=(15, 6))
plt.plot(df.index, df['value'], label='原始数据', alpha=0.7)
plt.plot(df.index, df['rolling_mean'], label='移动平均', color='green')
plt.fill_between(df.index, df['upper_bound'], df['lower_bound'], alpha=0.2, color='gray')
plt.scatter(df.index[df['anomaly']], df['value'][df['anomaly']],
           color='red', s=100, label='异常值', zorder=5)
plt.xlabel('日期')
plt.ylabel('值')
plt.title('时间序列异常检测')
plt.legend()
plt.tight_layout()
plt.show()

print(f'检测到 {df["anomaly"].sum()} 个异常点')
```

## 🎯 测一测

### 选择题

**1. Z 分数法假设数据服从什么分布？**

- A. 均匀分布
- B. 正态分布
- C. 泊松分布
- D. 指数分布

**2. IQR 方法中，通常认为超过 Q3 + 1.5×IQR 的点是：**

- A. 正常值
- B. 异常值
- C. 缺失值
- D. 中位数

**3. LOF 算法基于什么原理？**

- A. 距离
- B. 密度
- C. 统计检验
- D. 聚类

**4. 隔离森林中，异常值的特点是：**

- A. 路径长度较长
- B. 路径长度较短
- C. 密度较高
- D. 距离较近

**5. 以下哪个不是处理异常值的方法？**

- A. 删除
- B. 替换
- C. 转换
- D. 复制

**6. 上下文异常值是指：**

- A. 单个点异常
- B. 在特定上下文中异常
- C. 一组点异常
- D. 所有点都异常

**7. One-Class SVM 的 nu 参数控制：**

- A. 异常值下界
- B. 异常值上界
- C. 平均值
- D. 方差

**8. 自动编码器检测异常值基于：**

- A. 距离
- B. 密度
- C. 重建误差
- D. 分类概率

### 判断题

**1. 所有异常值都应该被删除。** （×）

**2. Z 分数法对异常值本身很敏感。** （✓）

**3. IQR 方法不需要假设数据分布。** （✓）

**4. LOF = 1 表示该点是异常值。** （×）

**5. 隔离森林适合高维数据。** （✓）

**6. 异常值检测只能用于数值数据。** （×）

**7. 修正 Z 分数比普通 Z 分数更稳健。** （✓）

**8. DBSCAN 可以用于异常值检测。** （✓）

### 简答题

**1. 比较 Z 分数法和 IQR 方法的优缺点。**

**参考答案：**
Z 分数法：

- 优点：简单直观，计算快速
- 缺点：假设正态分布，对异常值敏感（均值和标准差受影响）

IQR 方法：

- 优点：对异常值稳健，无分布假设，适用范围广
- 缺点：可能不够敏感，只考虑单变量

**2. 解释 LOF 算法的工作原理。**

**参考答案：**
LOF（局部异常因子）比较每个点的局部密度与其邻居的局部密度。如果一个点的密度显著低于其邻居，它被认为是异常值。LOF≈1 表示正常，LOF>>1 表示异常。该方法可以检测局部异常值，适合密度不均匀的数据集。

**3. 在什么情况下应该保留异常值？**

**参考答案：**

- 异常值代表真实现象（如极端天气）
- 异常值是研究重点（如欺诈检测）
- 数据量小，删除会损失过多信息
- 使用稳健算法，异常值影响小
- 需要理解异常值的成因
- 异常值包含重要商业洞察

### 计算题

**1. 给定数据[10, 12, 14, 16, 18, 100]，使用 Z 分数法识别异常值。**

**参考答案：**

1. 均值 μ = (10+12+14+16+18+100)/6 = 28.33
2. 标准差 σ = 33.11
3. Z 分数：
   - 10: (10-28.33)/33.11 = -0.55
   - 12: -0.49
   - 14: -0.43
   - 16: -0.37
   - 18: -0.31
   - 100: (100-28.33)/33.11 = 2.16

结论：使用|z|>3 的标准，没有异常值。但 100 明显偏离，可能需要调整阈值。

**2. 给定数据[5, 7, 8, 10, 12, 14, 15, 18, 20, 50]，使用 IQR 方法识别异常值。**

**参考答案：**

1. 排序：[5, 7, 8, 10, 12, 14, 15, 18, 20, 50]
2. Q1 = 8.5, Q3 = 18.5
3. IQR = 18.5 - 8.5 = 10
4. 下界 = 8.5 - 1.5×10 = -6.5
5. 上界 = 18.5 + 1.5×10 = 33.5
6. 异常值：50（超过上界）

## 🗺️ 思维导图

```
异常值检测
│
├─── 异常值类型
│    ├─── 点异常值
│    ├─── 上下文异常值
│    └─── 集体异常值
│
├─── 统计方法
│    ├─── Z分数法
│    │    ├─── |z| > 3
│    │    └─── 假设正态分布
│    ├─── 修正Z分数
│    │    └─── 使用MAD更稳健
│    └─── IQR方法
│         ├─── Q1 - 1.5×IQR
│         ├─── Q3 + 1.5×IQR
│         └─── 箱线图可视化
│
├─── 基于距离
│    ├─── k-NN距离
│    │    └─── 到第k个邻居的距离
│    └─── 距离聚合
│
├─── 基于密度
│    ├─── LOF（局部异常因子）
│    │    ├─── 局部可达密度
│    │    └─── LOF >> 1 = 异常
│    ├─── DBSCAN
│    │    └─── 噪声点 = 异常
│    └─── COF
│
├─── 机器学习
│    ├─── 隔离森林
│    │    ├─── 随机分裂
│    │    ├─── 路径长度
│    │    └─── 适合高维
│    ├─── One-Class SVM
│    │    ├─── 超平面/超球
│    │    └─── nu参数
│    └─── 自动编码器
│         ├─── 重建误差
│         └─── 深度学习
│
├─── 处理策略
│    ├─── 删除
│    ├─── 替换（均值/中位数）
│    ├─── 转换（对数/平方根）
│    ├─── 分箱
│    ├─── 保留
│    └─── 单独建模
│
├─── 应用场景
│    ├─── 欺诈检测
│    │    ├─── 信用卡
│    │    └─── 保险理赔
│    ├─── 网络安全
│    │    └─── 入侵检测
│    ├─── 医疗
│    │    └─── 异常生命体征
│    ├─── 制造业
│    │    └─── 质量控制
│    └─── 物联网
│         └─── 传感器故障
│
└─── 评估指标
     ├─── 精确率
     ├─── 召回率
     ├─── F1分数
     ├─── ROC-AUC
     └─── 混淆矩阵
```

## 📖 学习资源

### 课程材料

- **05_CST8502_OutlierDetection1.pdf**：异常值检测综合指南

### Python 库

- **scikit-learn**：IsolationForest, LocalOutlierFactor, OneClassSVM
- **PyOD**：专门的异常检测库
- **scipy.stats**：统计检验
- **pandas**：数据分析

### 推荐阅读

- Chandola, V. et al. (2009). "Anomaly Detection: A Survey"
- Breunig, M. et al. (2000). "LOF: Identifying Density-Based Local Outliers"
- Liu, F. T. et al. (2008). "Isolation Forest"

## 🎯 学习目标检查清单

完成本章后，您应该能够：

- ✅ 理解异常值的类型和产生原因
- ✅ 应用统计方法检测异常值（Z 分数、IQR）
- ✅ 使用基于距离和密度的方法（k-NN、LOF、DBSCAN）
- ✅ 实现机器学习方法（隔离森林、One-Class SVM）
- ✅ 选择合适的异常值检测方法
- ✅ 决定如何处理检测到的异常值
- ✅ 应用异常检测到实际问题（欺诈检测、质量控制）
- ✅ 评估异常检测模型的性能
- ✅ 可视化异常值

---

**下一章预告：** 第六章将学习聚类算法，特别是 k-Means 算法，探索无监督学习的世界。
