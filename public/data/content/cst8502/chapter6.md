# 第六章：聚类与 k-Means 算法

## 📚 概念

### 聚类核心概念

- **聚类（Clustering）**：将数据对象分组，使同组对象相似度高，不同组对象相似度低
- **无监督学习**：没有标记数据，算法自动发现数据结构
- **簇（Cluster）**：一组相似的数据点集合
- **质心（Centroid）**：簇的中心点，通常是簇内所有点的平均值
- **惯性（Inertia）**：样本到最近质心的距离平方和，衡量簇的紧密度

### 聚类类型

1. **划分聚类（Partitioning Clustering）**

   - 将数据分成 k 个不重叠的簇
   - 示例：k-Means, k-Medoids

2. **层次聚类（Hierarchical Clustering）**

   - 构建簇的树状结构
   - 示例：凝聚层次聚类、分裂层次聚类

3. **基于密度的聚类（Density-Based Clustering）**

   - 基于数据密度发现任意形状的簇
   - 示例：DBSCAN, OPTICS

4. **基于网格的聚类（Grid-Based Clustering）**

   - 将空间划分为网格单元
   - 示例：STING, CLIQUE

5. **基于模型的聚类（Model-Based Clustering）**
   - 假设数据由多个概率分布生成
   - 示例：高斯混合模型（GMM）

### k-Means 算法核心

- **目标**：最小化簇内平方和（WCSS）
  $$J = \sum_{i=1}^{k} \sum_{x \in C_i} ||x - \mu_i||^2$$

- **算法类型**：划分聚类、迭代优化
- **时间复杂度**：O(n × k × i × d)
  - n：样本数
  - k：簇数
  - i：迭代次数
  - d：特征维度

### k-Means 变体

- **k-Means++**：改进的质心初始化
- **Mini-Batch k-Means**：使用小批量数据，更快
- **k-Medoids (PAM)**：使用实际数据点作为中心
- **Fuzzy k-Means**：软聚类，点可以部分属于多个簇

## 🔍 解释

### k-Means 算法详解

**算法步骤：**

```
1. 初始化：随机选择k个质心
2. 重复直到收敛：
   a. 分配步骤：将每个点分配给最近的质心
   b. 更新步骤：重新计算每个簇的质心
3. 输出：最终的簇分配和质心位置
```

**数学表达：**

**分配步骤：**
$$C_i^{(t)} = \{x_p : ||x_p - \mu_i^{(t)}||^2 \leq ||x_p - \mu_j^{(t)}||^2, \forall j\}$$

**更新步骤：**
$$\mu_i^{(t+1)} = \frac{1}{|C_i^{(t)}|} \sum_{x_j \in C_i^{(t)}} x_j$$

**收敛条件：**

- 质心不再变化
- 簇分配不再变化
- 目标函数变化小于阈值
- 达到最大迭代次数

### k-Means 的工作示例

```python
import numpy as np
import matplotlib.pyplot as plt

# 生成数据
np.random.seed(42)
X1 = np.random.randn(100, 2) + [2, 2]
X2 = np.random.randn(100, 2) + [-2, -2]
X3 = np.random.randn(100, 2) + [2, -2]
X = np.vstack([X1, X2, X3])

# k-Means步骤演示
k = 3
max_iters = 10

# 1. 随机初始化质心
centroids = X[np.random.choice(X.shape[0], k, replace=False)]

for iteration in range(max_iters):
    # 2. 分配步骤
    distances = np.sqrt(((X - centroids[:, np.newaxis])**2).sum(axis=2))
    labels = np.argmin(distances, axis=0)

    # 3. 更新步骤
    new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])

    # 检查收敛
    if np.allclose(centroids, new_centroids):
        print(f'在第{iteration+1}次迭代收敛')
        break

    centroids = new_centroids

# 可视化结果
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', alpha=0.6)
plt.scatter(centroids[:, 0], centroids[:, 1], c='red', marker='X', s=200, edgecolors='black')
plt.title('k-Means聚类结果')
plt.show()
```

### k-Means++初始化

**问题**：随机初始化可能导致：

- 收敛到局部最优
- 需要更多迭代
- 不稳定的结果

**k-Means++解决方案：**

```
1. 随机选择第一个质心
2. 对于每个后续质心：
   a. 计算每个点到最近已选质心的距离
   b. 以距离平方成正比的概率选择下一个质心
3. 这样质心会更分散
```

**优点：**

- 更好的初始化
- 更快收敛
- 更稳定的结果
- O(log k)竞争比保证

```python
from sklearn.cluster import KMeans

# 使用k-Means++初始化
kmeans = KMeans(n_clusters=3, init='k-means++', n_init=10, random_state=42)
kmeans.fit(X)
```

### 选择最优 k 值

**1. 肘部法（Elbow Method）**

```python
wcss = []
K_range = range(1, 11)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

plt.plot(K_range, wcss, 'bo-')
plt.xlabel('k值')
plt.ylabel('WCSS（簇内平方和）')
plt.title('肘部法确定最优k')
plt.show()
```

寻找"肘部"：WCSS 下降速率急剧变化的点

**2. 轮廓系数（Silhouette Score）**
$$s(i) = \frac{b(i) - a(i)}{\max\{a(i), b(i)\}}$$

其中：

- a(i)：点 i 到同簇其他点的平均距离
- b(i)：点 i 到最近其他簇点的平均距离
- 范围：[-1, 1]
  - 接近 1：聚类良好
  - 接近 0：在簇边界
  - 负值：可能分配错误

```python
from sklearn.metrics import silhouette_score

silhouette_scores = []
K_range = range(2, 11)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    labels = kmeans.fit_predict(X)
    score = silhouette_score(X, labels)
    silhouette_scores.append(score)

plt.plot(K_range, silhouette_scores, 'bo-')
plt.xlabel('k值')
plt.ylabel('轮廓系数')
plt.title('轮廓系数法确定最优k')
plt.show()

# 选择最大轮廓系数对应的k
optimal_k = K_range[np.argmax(silhouette_scores)]
```

**3. 间隙统计（Gap Statistic）**
比较 WCSS 与随机数据的期望 WCSS：
$$Gap(k) = E[\log(W_k)] - \log(W_k)$$

选择使 Gap(k)最大的 k。

**4. Davies-Bouldin 指数**
$$DB = \frac{1}{k} \sum_{i=1}^{k} \max_{j \neq i} \frac{\sigma_i + \sigma_j}{d(c_i, c_j)}$$

- 值越小越好
- 衡量簇内相似度与簇间差异度的比率

**5. Calinski-Harabasz 指数**
$$CH = \frac{SS_B / (k-1)}{SS_W / (n-k)}$$

- SS_B：簇间平方和
- SS_W：簇内平方和
- 值越大越好

```python
from sklearn.metrics import davies_bouldin_score, calinski_harabasz_score

for k in range(2, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    labels = kmeans.fit_predict(X)

    db_score = davies_bouldin_score(X, labels)
    ch_score = calinski_harabasz_score(X, labels)

    print(f'k={k}: DB={db_score:.3f}, CH={ch_score:.3f}')
```

### k-Means 的优势与局限

**优势：**

1. ✅ **简单直观**：易于理解和实现
2. ✅ **高效**：计算复杂度相对较低
3. ✅ **可扩展**：适用于大数据集
4. ✅ **保证收敛**：总是收敛（可能是局部最优）
5. ✅ **适合球形簇**：簇大小相似、密度均匀时效果好

**局限性：**

1. ❌ **需要预先指定 k**：不知道真实簇数
2. ❌ **对初始化敏感**：不同初始化可能得到不同结果
3. ❌ **假设球形簇**：不适合任意形状的簇
4. ❌ **对异常值敏感**：异常值会扭曲质心
5. ❌ **假设簇大小相似**：大小差异大时表现差
6. ❌ **只适用于数值数据**：需要计算距离

**解决方案：**

- k-Means++改进初始化
- 多次运行选择最佳结果
- 预处理去除异常值
- 标准化特征
- 使用其他聚类算法（DBSCAN、GMM）

### Mini-Batch k-Means

**动机**：大数据集上 k-Means 很慢

**方法**：

- 每次迭代使用小批量数据
- 更新质心时使用移动平均
- 更快但质量略有下降

```python
from sklearn.cluster import MiniBatchKMeans

# Mini-Batch k-Means
mb_kmeans = MiniBatchKMeans(
    n_clusters=3,
    batch_size=100,
    max_iter=100,
    random_state=42
)
mb_kmeans.fit(X)

# 比较时间
import time

# 标准k-Means
start = time.time()
kmeans = KMeans(n_clusters=3).fit(X)
time_kmeans = time.time() - start

# Mini-Batch k-Means
start = time.time()
mb_kmeans = MiniBatchKMeans(n_clusters=3).fit(X)
time_mb = time.time() - start

print(f'标准k-Means: {time_kmeans:.4f}秒')
print(f'Mini-Batch k-Means: {time_mb:.4f}秒')
```

### k-Medoids (PAM)

**与 k-Means 的区别：**

- 使用实际数据点作为中心（medoid），而非均值
- 对异常值更稳健
- 可用于非欧几里得距离
- 计算成本更高：O(k(n-k)²)

```python
from sklearn_extra.cluster import KMedoids

kmedoids = KMedoids(n_clusters=3, random_state=42)
kmedoids.fit(X)
```

## 📜 历史

### 聚类的发展历程

**1950-1960 年代 - 起源**

- 1957 年：**聚类分析概念**首次在心理学中使用
- 1965 年：**单链接和完全链接**层次聚类方法

**1960-1970 年代 - 奠基时期**

- **1967 年：k-Means 算法**
  - MacQueen 首次提出术语"k-means"
  - 但思想更早由 Stuart Lloyd (1957)和 Edward Forgy (1965)独立提出
- 层次聚类方法发展

**1980 年代 - 理论发展**

- **1987 年：PAM 算法**（k-Medoids）
  - Kaufman & Rousseeuw 提出
- 模糊聚类理论发展
- DBSCAN 算法的理论基础

**1990 年代 - 密度和网格方法**

- **1996 年：DBSCAN**
  - Ester, Kriegel, Sander, Xu 提出
  - 革命性的基于密度的聚类
- BIRCH (1996)：大数据集层次聚类
- CURE (1998)：处理任意形状簇

**2000 年代 - 可扩展性和改进**

- **2007 年：k-Means++**
  - Arthur & Vassilvitskii 提出
  - 改进初始化，理论保证
- Spectral Clustering 流行
- 大规模数据聚类算法

**2010 年代至今 - 深度学习时代**

- 深度聚类方法
- 在线/流式聚类
- GPU 加速聚类
- AutoML 自动确定簇数
- 与深度学习结合（Deep Embedded Clustering）

### 关键贡献者

- **Stuart Lloyd**：k-Means 算法（1957，1982 年发表）
- **J. MacQueen**：创造"k-means"术语（1967）
- **David Arthur & Sergei Vassilvitskii**：k-Means++算法
- **Martin Ester 等**：DBSCAN 算法
- **Kaufman & Rousseeuw**：k-Medoids 算法

### 里程碑论文

- Lloyd, S. (1982). "Least Squares Quantization in PCM"
- Arthur, D. & Vassilvitskii, S. (2007). "k-means++: The Advantages of Careful Seeding"
- Ester, M. et al. (1996). "A Density-Based Algorithm for Discovering Clusters"

## 💪 练习

### 基础练习

**练习 1：手工 k-Means**
给定数据点：A(1,1), B(2,1), C(4,3), D(5,4)
k=2，初始质心：μ₁=(1,1), μ₂=(5,4)

完成 3 次迭代：

1. 分配每个点到最近质心
2. 计算新质心
3. 重复

**练习 2：计算 WCSS**
簇 1：[(1,1), (2,2), (2,1)]，质心(1.67, 1.33)
簇 2：[(5,5), (6,6), (5,6)]，质心(5.33, 5.67)

计算总 WCSS。

**练习 3：轮廓系数计算**
对于点 x₁，它到同簇其他点的平均距离 a=2，到最近其他簇的平均距离 b=5。
计算 x₁ 的轮廓系数。

### 实践项目

**项目 1：完整的 k-Means 实现**

```python
import numpy as np
import matplotlib.pyplot as plt

class KMeansCustom:
    def __init__(self, n_clusters=3, max_iters=100, tol=1e-4, random_state=None):
        self.n_clusters = n_clusters
        self.max_iters = max_iters
        self.tol = tol
        self.random_state = random_state
        self.centroids = None
        self.labels = None
        self.inertia_ = None

    def initialize_centroids(self, X):
        """随机初始化质心"""
        np.random.seed(self.random_state)
        indices = np.random.choice(X.shape[0], self.n_clusters, replace=False)
        return X[indices]

    def assign_clusters(self, X, centroids):
        """分配每个点到最近的质心"""
        distances = np.sqrt(((X - centroids[:, np.newaxis])**2).sum(axis=2))
        return np.argmin(distances, axis=0)

    def update_centroids(self, X, labels):
        """更新质心为簇内点的均值"""
        centroids = np.zeros((self.n_clusters, X.shape[1]))
        for k in range(self.n_clusters):
            if np.sum(labels == k) > 0:
                centroids[k] = X[labels == k].mean(axis=0)
        return centroids

    def compute_inertia(self, X, labels, centroids):
        """计算簇内平方和"""
        inertia = 0
        for k in range(self.n_clusters):
            cluster_points = X[labels == k]
            if len(cluster_points) > 0:
                inertia += ((cluster_points - centroids[k])**2).sum()
        return inertia

    def fit(self, X):
        """训练k-Means模型"""
        # 初始化
        self.centroids = self.initialize_centroids(X)

        for iteration in range(self.max_iters):
            # 分配簇
            labels = self.assign_clusters(X, self.centroids)

            # 更新质心
            new_centroids = self.update_centroids(X, labels)

            # 检查收敛
            if np.allclose(self.centroids, new_centroids, atol=self.tol):
                print(f'在第{iteration+1}次迭代收敛')
                break

            self.centroids = new_centroids

        self.labels = labels
        self.inertia_ = self.compute_inertia(X, labels, self.centroids)

        return self

    def predict(self, X):
        """预测新数据的簇标签"""
        return self.assign_clusters(X, self.centroids)

    def fit_predict(self, X):
        """训练并返回标签"""
        self.fit(X)
        return self.labels

# 测试
np.random.seed(42)
X1 = np.random.randn(100, 2) + [2, 2]
X2 = np.random.randn(100, 2) + [-2, -2]
X3 = np.random.randn(100, 2) + [2, -2]
X = np.vstack([X1, X2, X3])

kmeans = KMeansCustom(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)

# 可视化
plt.figure(figsize=(10, 6))
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', alpha=0.6)
plt.scatter(kmeans.centroids[:, 0], kmeans.centroids[:, 1],
           c='red', marker='X', s=200, edgecolors='black', linewidths=2)
plt.title(f'自定义k-Means聚类 (Inertia={kmeans.inertia_:.2f})')
plt.xlabel('特征1')
plt.ylabel('特征2')
plt.colorbar(label='簇标签')
plt.show()
```

**项目 2：客户细分分析**

```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# 生成客户数据
np.random.seed(42)
n_customers = 500

data = {
    '年龄': np.random.randint(18, 70, n_customers),
    '年收入': np.random.randint(15000, 150000, n_customers),
    '消费评分': np.random.randint(1, 100, n_customers),
    '购买频率': np.random.randint(1, 50, n_customers)
}
df = pd.DataFrame(data)

# 标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

# 肘部法确定最优k
wcss = []
K_range = range(1, 11)
for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_scaled)
    wcss.append(kmeans.inertia_)

plt.figure(figsize=(10, 6))
plt.plot(K_range, wcss, 'bo-')
plt.xlabel('簇数 k')
plt.ylabel('WCSS')
plt.title('肘部法确定最优k')
plt.grid(True)
plt.show()

# 使用k=4进行聚类
optimal_k = 4
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
df['簇'] = kmeans.fit_predict(X_scaled)

# 分析每个簇的特征
print('\n各簇特征统计：')
print(df.groupby('簇').mean())

# PCA降维可视化
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

plt.figure(figsize=(12, 8))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=df['簇'], cmap='viridis', alpha=0.6)
plt.xlabel(f'主成分1 ({pca.explained_variance_ratio_[0]:.2%}方差)')
plt.ylabel(f'主成分2 ({pca.explained_variance_ratio_[1]:.2%}方差)')
plt.title('客户细分（PCA降维可视化）')
plt.colorbar(scatter, label='簇标签')
plt.show()

# 为每个簇命名
cluster_names = {
    0: '高收入高消费',
    1: '年轻低收入',
    2: '中年中等收入',
    3: '低消费稳定'
}

for cluster_id, name in cluster_names.items():
    cluster_data = df[df['簇'] == cluster_id]
    print(f'\n{name}（簇{cluster_id}）:')
    print(f'  - 平均年龄: {cluster_data["年龄"].mean():.1f}岁')
    print(f'  - 平均年收入: ¥{cluster_data["年收入"].mean():.0f}')
    print(f'  - 平均消费评分: {cluster_data["消费评分"].mean():.1f}')
    print(f'  - 客户数量: {len(cluster_data)}')
```

**项目 3：图像压缩**

```python
from sklearn.cluster import KMeans
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

def compress_image(image_path, n_colors):
    """使用k-Means压缩图像"""
    # 加载图像
    img = Image.open(image_path)
    img_array = np.array(img)

    # 获取原始形状
    h, w, c = img_array.shape

    # 重塑为(n_pixels, n_channels)
    pixels = img_array.reshape(-1, c)

    # k-Means聚类
    kmeans = KMeans(n_clusters=n_colors, random_state=42, n_init=10)
    labels = kmeans.fit_predict(pixels)

    # 用质心替换像素值
    compressed_pixels = kmeans.cluster_centers_[labels]

    # 重塑回原始形状
    compressed_img = compressed_pixels.reshape(h, w, c).astype(np.uint8)

    return img_array, compressed_img

# 压缩示例
original, compressed = compress_image('image.jpg', n_colors=16)

# 可视化
fig, axes = plt.subplots(1, 2, figsize=(12, 6))
axes[0].imshow(original)
axes[0].set_title('原始图像')
axes[0].axis('off')

axes[1].imshow(compressed)
axes[1].set_title('压缩图像（16色）')
axes[1].axis('off')

plt.tight_layout()
plt.show()

# 计算压缩比
original_size = original.nbytes
compressed_size = 16 * 3 + len(original.flatten())  # 质心 + 标签
print(f'原始大小: {original_size:,} 字节')
print(f'压缩后大小: {compressed_size:,} 字节')
print(f'压缩比: {original_size/compressed_size:.2f}x')
```

**项目 4：轮廓分析**

```python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, silhouette_samples
import matplotlib.pyplot as plt
import matplotlib.cm as cm
import numpy as np

def silhouette_analysis(X, k_range):
    """对不同k值进行轮廓分析"""
    for k in k_range:
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))

        # 聚类
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = kmeans.fit_predict(X)

        # 计算轮廓系数
        silhouette_avg = silhouette_score(X, labels)
        sample_silhouette_values = silhouette_samples(X, labels)

        # 绘制轮廓图
        y_lower = 10
        for i in range(k):
            ith_cluster_silhouette_values = sample_silhouette_values[labels == i]
            ith_cluster_silhouette_values.sort()

            size_cluster_i = ith_cluster_silhouette_values.shape[0]
            y_upper = y_lower + size_cluster_i

            color = cm.nipy_spectral(float(i) / k)
            ax1.fill_betweenx(np.arange(y_lower, y_upper),
                            0, ith_cluster_silhouette_values,
                            facecolor=color, edgecolor=color, alpha=0.7)

            ax1.text(-0.05, y_lower + 0.5 * size_cluster_i, str(i))
            y_lower = y_upper + 10

        ax1.set_title(f'轮廓图 (k={k})')
        ax1.set_xlabel('轮廓系数')
        ax1.set_ylabel('簇标签')
        ax1.axvline(x=silhouette_avg, color="red", linestyle="--",
                   label=f'平均轮廓系数={silhouette_avg:.3f}')
        ax1.legend()

        # 绘制簇
        colors = cm.nipy_spectral(labels.astype(float) / k)
        ax2.scatter(X[:, 0], X[:, 1], marker='.', s=30, lw=0, alpha=0.7, c=colors)
        ax2.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1],
                   marker='X', c='red', s=200, alpha=1, edgecolors='black', linewidths=2)
        ax2.set_title(f'聚类结果 (k={k})')
        ax2.set_xlabel('特征1')
        ax2.set_ylabel('特征2')

        plt.tight_layout()
        plt.show()

# 运行分析
silhouette_analysis(X, range(2, 6))
```

## 🎯 测一测

### 选择题

**1. k-Means 算法的目标是：**

- A. 最大化簇间距离
- B. 最小化簇内平方和
- C. 最大化轮廓系数
- D. 最小化簇数

**2. k-Means 的时间复杂度是：**

- A. O(n log n)
- B. O(n²)
- C. O(n × k × i × d)
- D. O(2ⁿ)

**3. 轮廓系数的范围是：**

- A. [0, 1]
- B. [-1, 1]
- C. [0, ∞)
- D. (-∞, +∞)

**4. k-Means++改进了什么？**

- A. 收敛速度
- B. 质心初始化
- C. 距离计算
- D. 簇数选择

**5. 以下哪个不是 k-Means 的假设？**

- A. 簇是球形的
- B. 簇大小相似
- C. 簇密度相似
- D. 簇可以重叠

**6. Mini-Batch k-Means 的优势是：**

- A. 更准确
- B. 更快
- C. 更稳定
- D. 簇数自动确定

**7. k-Medoids 与 k-Means 的主要区别是：**

- A. 使用实际数据点作为中心
- B. 计算更快
- C. 不需要距离度量
- D. 可以自动确定 k

**8. 肘部法用于：**

- A. 计算距离
- B. 选择 k 值
- C. 初始化质心
- D. 评估性能

### 判断题

**1. k-Means 总是收敛到全局最优。** （×）

**2. k-Means 适合任意形状的簇。** （×）

**3. k-Means++保证更好的初始化。** （✓）

**4. 轮廓系数越大越好。** （✓）

**5. k-Means 可以用于回归问题。** （×）

**6. k-Means 对特征缩放敏感。** （✓）

**7. 肘部法总能明确指出最优 k 值。** （×）

**8. k-Means 是无监督学习算法。** （✓）

### 简答题

**1. 解释 k-Means 算法的工作原理。**

**参考答案：**
k-Means 通过迭代优化将数据分成 k 个簇：

1. 随机初始化 k 个质心
2. 分配步骤：将每个数据点分配给最近的质心
3. 更新步骤：重新计算每个簇的质心（簇内所有点的平均值）
4. 重复步骤 2-3 直到质心不再变化或达到最大迭代次数
   目标是最小化簇内平方和（WCSS）。

**2. k-Means 有哪些局限性？如何克服？**

**参考答案：**
局限性：

1. 需要预先指定 k - 使用肘部法、轮廓系数选择
2. 对初始化敏感 - 使用 k-Means++，多次运行
3. 假设球形簇 - 使用 DBSCAN、GMM 等其他算法
4. 对异常值敏感 - 预处理去除异常值，使用 k-Medoids
5. 假设簇大小相似 - 使用加权 k-Means 或其他方法

**3. 比较肘部法和轮廓系数法选择 k 值。**

**参考答案：**
肘部法：

- 绘制 WCSS vs k 曲线，寻找"肘部"
- 优点：直观、计算简单
- 缺点：肘部位置可能不明显

轮廓系数法：

- 计算每个 k 的平均轮廓系数，选择最大值
- 优点：有明确的数值标准，考虑簇内紧密度和簇间分离度
- 缺点：计算成本高

建议：结合多种方法并考虑领域知识。

### 计算题

**1. 给定数据点 A(1,1), B(1,2), C(5,5), D(6,6)，质心 μ₁=(1,1.5), μ₂=(5.5,5.5)，计算 WCSS。**

**参考答案：**
分配：

- A 到 μ₁ 距离=0.5，到 μ₂ 距离=6.36 → 簇 1
- B 到 μ₁ 距离=0.5，到 μ₂ 距离=5.70 → 簇 1
- C 到 μ₁ 距离=5.70，到 μ₂ 距离=0.71 → 簇 2
- D 到 μ₁ 距离=6.36，到 μ₂ 距离=0.71 → 簇 2

WCSS：

- 簇 1：(1-1)²+(1-1.5)² + (1-1)²+(2-1.5)² = 0.25 + 0.25 = 0.5
- 簇 2：(5-5.5)²+(5-5.5)² + (6-5.5)²+(6-5.5)² = 0.5 + 0.5 = 1.0
- 总 WCSS = 1.5

**2. 计算轮廓系数：点 x 到同簇其他点平均距离 a=1.5，到最近其他簇平均距离 b=3。**

**参考答案：**
$$s = \frac{b - a}{\max(a, b)} = \frac{3 - 1.5}{\max(1.5, 3)} = \frac{1.5}{3} = 0.5$$

轮廓系数为 0.5，表示聚类较好。

## 🗺️ 思维导图

```
聚类与k-Means
│
├─── 聚类概念
│    ├─── 无监督学习
│    ├─── 簇（相似对象组）
│    ├─── 目标：组内相似，组间不同
│    └─── 应用：细分、压缩、异常检测
│
├─── 聚类类型
│    ├─── 划分聚类（k-Means）
│    ├─── 层次聚类（树状图）
│    ├─── 密度聚类（DBSCAN）
│    ├─── 网格聚类
│    └─── 模型聚类（GMM）
│
├─── k-Means算法
│    ├─── 基本步骤
│    │    ├─── 1. 初始化质心
│    │    ├─── 2. 分配点到最近质心
│    │    ├─── 3. 更新质心
│    │    └─── 4. 重复直到收敛
│    ├─── 目标函数
│    │    └─── 最小化WCSS
│    ├─── 时间复杂度
│    │    └─── O(n×k×i×d)
│    └─── 收敛保证
│         └─── 局部最优
│
├─── k-Means变体
│    ├─── k-Means++
│    │    ├─── 改进初始化
│    │    └─── 更快收敛
│    ├─── Mini-Batch k-Means
│    │    ├─── 使用小批量
│    │    └─── 更快速度
│    ├─── k-Medoids
│    │    ├─── 使用实际点
│    │    └─── 更稳健
│    └─── Fuzzy k-Means
│         └─── 软聚类
│
├─── 选择k值
│    ├─── 肘部法
│    │    └─── WCSS vs k曲线
│    ├─── 轮廓系数
│    │    └─── 范围[-1, 1]
│    ├─── 间隙统计
│    ├─── Davies-Bouldin指数
│    │    └─── 越小越好
│    └─── Calinski-Harabasz指数
│         └─── 越大越好
│
├─── 优点
│    ├─── 简单直观
│    ├─── 高效可扩展
│    ├─── 保证收敛
│    └─── 易于实现
│
├─── 缺点
│    ├─── 需要指定k
│    ├─── 对初始化敏感
│    ├─── 假设球形簇
│    ├─── 对异常值敏感
│    └─── 假设簇大小相似
│
├─── 应用场景
│    ├─── 客户细分
│    │    └─── 营销策略
│    ├─── 图像压缩
│    │    └─── 减少颜色
│    ├─── 文档聚类
│    │    └─── 主题发现
│    ├─── 推荐系统
│    │    └─── 协同过滤
│    └─── 异常检测
│         └─── 识别离群簇
│
└─── 实用技巧
     ├─── 特征标准化
     ├─── 去除异常值
     ├─── 多次运行
     ├─── 使用k-Means++
     └─── 结合领域知识
```

## 📖 学习资源

### 课程材料

- **06_CST8502_Clustering_kMeans1.pdf**：聚类和 k-Means 综合指南

### Python 库

- **scikit-learn**：KMeans, MiniBatchKMeans
- **scipy**：层次聚类
- **sklearn.metrics**：评估指标
- **matplotlib/seaborn**：可视化

### 经典论文

- MacQueen, J. (1967). "Some Methods for Classification and Analysis of Multivariate Observations"
- Arthur, D. & Vassilvitskii, S. (2007). "k-means++: The Advantages of Careful Seeding"

### 推荐阅读

- 《统计学习方法》第 14 章 - 李航
- "Introduction to Statistical Learning" - Chapter 10

## 🎯 学习目标检查清单

完成本章后，您应该能够：

- ✅ 理解聚类的概念和不同类型
- ✅ 掌握 k-Means 算法的工作原理
- ✅ 实现 k-Means 算法（从零开始）
- ✅ 使用多种方法选择最优 k 值
- ✅ 应用 k-Means++改进初始化
- ✅ 理解 k-Means 的优势和局限性
- ✅ 评估聚类质量（WCSS、轮廓系数）
- ✅ 将 k-Means 应用于实际问题（客户细分、图像压缩）
- ✅ 可视化聚类结果
- ✅ 比较不同聚类算法

---

**课程总结：** 恭喜完成 CST8502 机器学习课程的主要章节！您已经学习了从数据预处理到分类、异常检测和聚类的完整机器学习流程。继续实践和探索更高级的主题，如集成方法、深度学习和模型部署。
