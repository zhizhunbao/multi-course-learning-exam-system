## 📚 概念

### 决策树核心概念

- **决策树（Decision Tree）**：树形结构的分类和回归模型，通过一系列判断规则进行预测
- **节点（Node）**：树的组成部分
  - **根节点（Root Node）**：树的顶部，包含所有数据
  - **内部节点（Internal Node）**：进行决策分裂的节点
  - **叶节点（Leaf Node）**：做出最终预测的节点
- **分支（Branch）**：连接节点的边，代表决策路径
- **分裂（Split）**：将节点数据分成子集的过程
- **深度（Depth）**：从根到叶的最长路径

### 不纯度度量

1. **熵（Entropy）**
   $$H(S) = -\sum_{i=1}^{c} p_i \log_2(p_i)$$

   - 衡量数据的混乱程度
   - 范围：[0, log₂(c)]，0 表示纯净

2. **基尼不纯度（Gini Impurity）**
   $$Gini(S) = 1 - \sum_{i=1}^{c} p_i^2$$

   - 衡量随机分类的错误概率
   - 范围：[0, 1-1/c]，0 表示纯净

3. **信息增益（Information Gain）**
   $$IG(S, A) = H(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} H(S_v)$$
   - 衡量特征对分类的贡献
   - 选择信息增益最大的特征进行分裂

### 决策树算法

- **ID3（Iterative Dichotomiser 3）**：使用信息增益，只能处理分类特征
- **C4.5**：ID3 的改进，使用信息增益率，可处理连续特征和缺失值
- **C5.0**：C4.5 的商业版本，更快更准确
- **CART（Classification and Regression Trees）**：使用基尼不纯度，可用于分类和回归

### 剪枝技术

- **预剪枝（Pre-pruning）**：在构建过程中提前停止
- **后剪枝（Post-pruning）**：先构建完整树，然后删除不必要的分支
- **成本复杂度剪枝（Cost-Complexity Pruning）**：平衡树大小和误差

## 🔍 解释

### 决策树如何工作？

决策树通过递归分割数据来构建：

1. **选择最佳特征**：使用信息增益或基尼不纯度
2. **分裂节点**：根据特征值将数据分成子集
3. **递归**：对每个子集重复过程
4. **停止条件**：达到纯净、最大深度或最小样本数

**示例：决定是否打网球**

```
天气展望 = ?
├─ 晴天
│  └─ 湿度 = ?
│     ├─ 高 → 不打
│     └─ 正常 → 打
├─ 阴天 → 打
└─ 雨天
   └─ 风力 = ?
      ├─ 强 → 不打
      └─ 弱 → 打
```

### 信息增益详解

**熵的直观理解：**

- 熵 = 0：所有样本属于同一类（完全纯净）
- 熵最大：样本在各类中均匀分布（最混乱）

**计算示例：**
假设数据集 S 有 14 个样本：9 个正例，5 个负例
$$H(S) = -\frac{9}{14}\log_2(\frac{9}{14}) - \frac{5}{14}\log_2(\frac{5}{14}) = 0.940$$

按特征"天气展望"分裂：

- 晴天：2 正 3 负，H = 0.971
- 阴天：4 正 0 负，H = 0
- 雨天：3 正 2 负，H = 0.971

$$IG(S, 天气展望) = 0.940 - (\frac{5}{14} \times 0.971 + \frac{4}{14} \times 0 + \frac{5}{14} \times 0.971) = 0.247$$

### 基尼不纯度详解

**计算示例：**
同样的数据集（9 正 5 负）：
$$Gini(S) = 1 - (\frac{9}{14})^2 - (\frac{5}{14})^2 = 0.459$$

基尼不纯度计算比熵更快（无需对数运算），这是 CART 算法选择它的原因。

### 处理连续特征

对于连续特征，决策树需要找到最佳分裂点：

1. 排序特征值
2. 考虑相邻值之间的中点作为候选分裂点
3. 对每个候选点计算信息增益
4. 选择最佳分裂点

**示例：**
温度值：[64, 65, 68, 69, 70, 71, 72, 75, 80, 81, 83, 85]
候选分裂点：[64.5, 66.5, 68.5, 69.5, ...]

### 为什么需要剪枝？

**过拟合问题：**

- 决策树可以完美拟合训练数据
- 但可能学习了噪声和特殊情况
- 导致在新数据上表现差

**剪枝策略比较：**

| 方法   | 时机   | 优点           | 缺点         |
| ------ | ------ | -------------- | ------------ |
| 预剪枝 | 构建时 | 快速，节省计算 | 可能过早停止 |
| 后剪枝 | 构建后 | 更准确         | 计算成本高   |

**预剪枝条件：**

- 最大深度
- 最小样本分裂数
- 最小叶节点样本数
- 最大叶节点数
- 最小信息增益

**后剪枝方法：**

- 减少误差剪枝（REP）
- 悲观误差剪枝（PEP）
- 最小误差剪枝（MEP）
- 成本复杂度剪枝（CCP）

### 决策树的可解释性

决策树是"白盒"模型，易于解释：

```python
if (weather == 'sunny') and (humidity <= 70):
    play_tennis = 'yes'
elif weather == 'overcast':
    play_tennis = 'yes'
elif (weather == 'rainy') and (wind == 'weak'):
    play_tennis = 'yes'
else:
    play_tennis = 'no'
```

可以直接转换为业务规则！

## 📜 历史

### 决策树的发展历程

**1960 年代 - 起源**

- 1963 年：Hunt 等人提出概念学习系统（CLS）
- 决策树思想首次应用于心理学研究

**1970 年代 - 理论发展**

- 1975 年：CHAID 算法被提出
- 统计学方法与决策树结合

**1980 年代 - 黄金时期**

- 1986 年：**Ross Quinlan 发明 ID3 算法**
  - 使用信息增益
  - 奠定现代决策树基础
- 1984 年：**Breiman 等人提出 CART 算法**
  - 使用基尼不纯度
  - 引入回归树
  - 提出成本复杂度剪枝

**1990 年代 - 成熟与改进**

- 1993 年：**C4.5 算法发布**
  - 处理连续特征
  - 处理缺失值
  - 信息增益率
  - 更好的剪枝
- 决策树成为最流行的机器学习算法之一

**2000 年代 - 集成时代**

- 2001 年：**随机森林**（Leo Breiman）
- 2000 年代中期：**梯度提升树**流行
- 决策树成为集成方法的基础

**2010 年代至今 - 优化与应用**

- **XGBoost**（2014）：高效梯度提升实现
- **LightGBM**（2017）：微软的快速梯度提升
- **CatBoost**（2017）：Yandex 的类别特征优化
- 决策树在工业界广泛应用

### 关键贡献者

- **Ross Quinlan**：ID3 和 C4.5 的发明者，决策树领域的先驱
- **Leo Breiman**：CART 和随机森林的创造者
- **Jerome Friedman**：梯度提升机的发明者

### 里程碑论文

- Quinlan, J.R. (1986). "Induction of Decision Trees"
- Breiman, L. et al. (1984). "Classification and Regression Trees"
- Quinlan, J.R. (1993). "C4.5: Programs for Machine Learning"

## 💪 练习

### 基础练习

**练习 1：手工计算熵**
给定数据集：6 个正例，4 个负例

1. 计算熵
2. 如果按某特征分裂后，子集 1 有 4 正 1 负，子集 2 有 2 正 3 负，计算信息增益

**练习 2：基尼不纯度计算**
数据集：类别分布[30, 20, 10]（总共 60 个样本）
计算基尼不纯度

**练习 3：手工构建决策树**
使用以下天气数据集构建决策树：

| 天气 | 温度 | 湿度 | 风力 | 打球 |
| ---- | ---- | ---- | ---- | ---- |
| 晴   | 热   | 高   | 弱   | 否   |
| 晴   | 热   | 高   | 强   | 否   |
| 阴   | 热   | 高   | 弱   | 是   |
| 雨   | 温和 | 高   | 弱   | 是   |
| 雨   | 凉爽 | 正常 | 弱   | 是   |
| 雨   | 凉爽 | 正常 | 强   | 否   |
| 阴   | 凉爽 | 正常 | 强   | 是   |
| 晴   | 温和 | 高   | 弱   | 否   |
| 晴   | 凉爽 | 正常 | 弱   | 是   |
| 雨   | 温和 | 正常 | 弱   | 是   |
| 晴   | 温和 | 正常 | 强   | 是   |
| 阴   | 温和 | 高   | 强   | 是   |
| 阴   | 热   | 正常 | 弱   | 是   |
| 雨   | 温和 | 高   | 强   | 否   |

步骤：

1. 计算每个特征的信息增益
2. 选择最佳特征作为根节点
3. 递归构建子树

### 天气数据实践示例

让我们使用经典的天气数据集，从头到尾完整演示如何构建决策树。

**数据集：weather1.csv**

| Outlook  | Temperature | Humidity | Windy | Play |
| -------- | ----------- | -------- | ----- | ---- |
| sunny    | hot         | high     | FALSE | no   |
| sunny    | hot         | high     | TRUE  | no   |
| overcast | hot         | high     | FALSE | yes  |
| rainy    | mild        | high     | FALSE | yes  |
| rainy    | cool        | normal   | FALSE | yes  |
| rainy    | cool        | normal   | TRUE  | no   |
| overcast | cool        | normal   | TRUE  | yes  |
| sunny    | mild        | high     | FALSE | no   |
| sunny    | cool        | normal   | FALSE | yes  |
| rainy    | mild        | normal   | FALSE | yes  |
| sunny    | mild        | normal   | TRUE  | yes  |
| overcast | mild        | high     | TRUE  | yes  |
| overcast | hot         | normal   | FALSE | yes  |
| rainy    | mild        | high     | TRUE  | no   |

**目标**：根据天气条件预测是否打球（Play）

#### 步骤 1：计算目标变量的熵

总共 14 个样本：9 个 yes，5 个 no

$$H(Play) = -\frac{9}{14}\log_2(\frac{9}{14}) - \frac{5}{14}\log_2(\frac{5}{14})$$
$$= -0.643 \times (-0.638) - 0.357 \times (-1.485)$$
$$= 0.410 + 0.530 = 0.940$$

#### 步骤 2：计算每个特征的信息增益

**特征 1：Outlook（天气展望）**

- sunny（晴天）：5 个样本 → 2 个 yes，3 个 no
  $$H(sunny) = -\frac{2}{5}\log_2(\frac{2}{5}) - \frac{3}{5}\log_2(\frac{3}{5}) = 0.971$$

- overcast（阴天）：4 个样本 → 4 个 yes，0 个 no
  $$H(overcast) = 0$$（纯净！）

- rainy（雨天）：5 个样本 → 3 个 yes，2 个 no
  $$H(rainy) = -\frac{3}{5}\log_2(\frac{3}{5}) - \frac{2}{5}\log_2(\frac{2}{5}) = 0.971$$

加权平均熵：
$$H_{Outlook} = \frac{5}{14} \times 0.971 + \frac{4}{14} \times 0 + \frac{5}{14} \times 0.971 = 0.693$$

**信息增益：**
$$IG(Outlook) = 0.940 - 0.693 = 0.247$$

**特征 2：Temperature（温度）**

- hot：4 个样本 → 2 yes，2 no，H = 1.000
- mild：6 个样本 → 4 yes，2 no，H = 0.918
- cool：4 个样本 → 3 yes，1 no，H = 0.811

$$H_{Temperature} = \frac{4}{14} \times 1.000 + \frac{6}{14} \times 0.918 + \frac{4}{14} \times 0.811 = 0.911$$

$$IG(Temperature) = 0.940 - 0.911 = 0.029$$

**特征 3：Humidity（湿度）**

- high：7 个样本 → 3 yes，4 no，H = 0.985
- normal：7 个样本 → 6 yes，1 no，H = 0.592

$$H_{Humidity} = \frac{7}{14} \times 0.985 + \frac{7}{14} \times 0.592 = 0.788$$

$$IG(Humidity) = 0.940 - 0.788 = 0.152$$

**特征 4：Windy（风力）**

- FALSE：8 个样本 → 6 yes，2 no，H = 0.811
- TRUE：6 个样本 → 3 yes，3 no，H = 1.000

$$H_{Windy} = \frac{8}{14} \times 0.811 + \frac{6}{14} \times 1.000 = 0.892$$

$$IG(Windy) = 0.940 - 0.892 = 0.048$$

#### 步骤 3：选择根节点

信息增益比较：

- **Outlook: 0.247** ⭐（最大）
- Temperature: 0.029
- Humidity: 0.152
- Windy: 0.048

**Outlook 作为根节点！**

#### 步骤 4：递归构建子树

**分支 1：Outlook = overcast**

- 4 个样本，全部是 yes → **叶节点：Play = yes**

**分支 2：Outlook = sunny**

- 5 个样本（2 yes，3 no），需要继续分裂
- 计算剩余特征的信息增益：
  - Humidity 在 sunny 下：high (0 yes, 3 no), normal (2 yes, 0 no)
  - **IG(Humidity|sunny) = 0.971** → 选择 Humidity
- 子分支：
  - Humidity = high → **Play = no**
  - Humidity = normal → **Play = yes**

**分支 3：Outlook = rainy**

- 5 个样本（3 yes，2 no），需要继续分裂
- 计算剩余特征的信息增益：
  - Windy 在 rainy 下：FALSE (3 yes, 0 no), TRUE (0 yes, 2 no)
  - **IG(Windy|rainy) = 0.971** → 选择 Windy
- 子分支：
  - Windy = FALSE → **Play = yes**
  - Windy = TRUE → **Play = no**

#### 步骤 5：最终决策树

```
                    Outlook
                    /  |  \
                   /   |   \
              sunny overcast rainy
                /      |      \
               /       |       \
          Humidity   Play=yes  Windy
          /    \              /    \
         /      \            /      \
      high    normal      FALSE    TRUE
       |        |           |        |
    Play=no  Play=yes   Play=yes  Play=no
```

#### 步骤 6：Python 实现完整示例

```python
import pandas as pd
import numpy as np
from collections import Counter

# 加载数据
data = {
    'Outlook': ['sunny', 'sunny', 'overcast', 'rainy', 'rainy', 'rainy',
                'overcast', 'sunny', 'sunny', 'rainy', 'sunny', 'overcast',
                'overcast', 'rainy'],
    'Temperature': ['hot', 'hot', 'hot', 'mild', 'cool', 'cool', 'cool',
                    'mild', 'cool', 'mild', 'mild', 'mild', 'hot', 'mild'],
    'Humidity': ['high', 'high', 'high', 'high', 'normal', 'normal', 'normal',
                 'high', 'normal', 'normal', 'normal', 'high', 'normal', 'high'],
    'Windy': [False, True, False, False, False, True, True, False, False,
              False, True, True, False, True],
    'Play': ['no', 'no', 'yes', 'yes', 'yes', 'no', 'yes', 'no', 'yes',
             'yes', 'yes', 'yes', 'yes', 'no']
}

df = pd.DataFrame(data)

# 计算熵
def entropy(target):
    counter = Counter(target)
    total = len(target)
    return -sum((count/total) * np.log2(count/total) for count in counter.values())

# 计算信息增益
def information_gain(data, feature, target='Play'):
    total_entropy = entropy(data[target])
    values = data[feature].unique()
    weighted_entropy = 0

    for value in values:
        subset = data[data[feature] == value]
        weight = len(subset) / len(data)
        weighted_entropy += weight * entropy(subset[target])

    return total_entropy - weighted_entropy

# 计算所有特征的信息增益
print("信息增益计算：")
print("=" * 50)
for feature in ['Outlook', 'Temperature', 'Humidity', 'Windy']:
    ig = information_gain(df, feature)
    print(f"{feature:15} : {ig:.4f}")

print(f"\n目标熵: {entropy(df['Play']):.4f}")

# 构建决策树
def build_tree(data, features, target='Play', depth=0):
    # 停止条件
    if len(data[target].unique()) == 1:
        return data[target].iloc[0]

    if len(features) == 0:
        return Counter(data[target]).most_common(1)[0][0]

    # 选择最佳特征
    gains = {f: information_gain(data, f, target) for f in features}
    best_feature = max(gains, key=gains.get)

    print("  " * depth + f"├─ {best_feature} (IG={gains[best_feature]:.3f})")

    # 创建树
    tree = {best_feature: {}}
    remaining_features = [f for f in features if f != best_feature]

    for value in data[best_feature].unique():
        subset = data[data[best_feature] == value]
        print("  " * depth + f"│  └─ {best_feature}={value}")
        tree[best_feature][value] = build_tree(subset, remaining_features, target, depth+1)

    return tree

# 构建树
print("\n决策树构建过程：")
print("=" * 50)
features = ['Outlook', 'Temperature', 'Humidity', 'Windy']
tree = build_tree(df, features)

# 预测函数
def predict(tree, sample):
    if not isinstance(tree, dict):
        return tree

    feature = list(tree.keys())[0]
    value = sample[feature]

    if value not in tree[feature]:
        # 如果遇到未见过的值，返回最常见类别
        return 'yes'  # 默认值

    return predict(tree[feature][value], sample)

# 测试预测
print("\n\n预测测试：")
print("=" * 50)
test_samples = [
    {'Outlook': 'sunny', 'Temperature': 'cool', 'Humidity': 'high', 'Windy': False},
    {'Outlook': 'rainy', 'Temperature': 'mild', 'Humidity': 'normal', 'Windy': False},
    {'Outlook': 'overcast', 'Temperature': 'hot', 'Humidity': 'high', 'Windy': True}
]

for i, sample in enumerate(test_samples, 1):
    prediction = predict(tree, sample)
    print(f"\n测试样本 {i}:")
    for key, value in sample.items():
        print(f"  {key:15}: {value}")
    print(f"  预测结果: {prediction}")

# 使用scikit-learn验证
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

# 准备数据
X = pd.get_dummies(df[['Outlook', 'Temperature', 'Humidity', 'Windy']])
y = df['Play']

# 训练模型
clf = DecisionTreeClassifier(criterion='entropy', random_state=42)
clf.fit(X, y)

# 可视化
plt.figure(figsize=(20, 10))
plot_tree(clf, feature_names=X.columns, class_names=['no', 'yes'],
         filled=True, rounded=True, fontsize=10)
plt.title('Weather Dataset Decision Tree', fontsize=16)
plt.savefig('weather_decision_tree.png', dpi=300, bbox_inches='tight')
plt.show()

print("\n\n特征重要性：")
print("=" * 50)
for feature, importance in zip(X.columns, clf.feature_importances_):
    if importance > 0:
        print(f"{feature:30}: {importance:.4f}")
```

**输出示例：**

```
信息增益计算：
==================================================
Outlook         : 0.2467
Temperature     : 0.0292
Humidity        : 0.1518
Windy           : 0.0481

目标熵: 0.9403

决策树构建过程：
==================================================
├─ Outlook (IG=0.247)
│  └─ Outlook=sunny
  ├─ Humidity (IG=0.971)
  │  └─ Humidity=high
    → Play = no
  │  └─ Humidity=normal
    → Play = yes
│  └─ Outlook=overcast
    → Play = yes
│  └─ Outlook=rainy
  ├─ Windy (IG=0.971)
  │  └─ Windy=False
    → Play = yes
  │  └─ Windy=True
    → Play = no
```

#### 关键洞察

1. **Outlook 是最重要的特征**（信息增益 0.247）
2. **Overcast 总是打球**（100%的情况）
3. **Sunny 天气**：取决于湿度
   - 高湿度 → 不打球
   - 正常湿度 → 打球
4. **Rainy 天气**：取决于风力
   - 无风 → 打球
   - 有风 → 不打球

这个决策树完美分类了所有 14 个训练样本（训练准确率 100%）！

### 实践项目

**项目 1：从零实现决策树（ID3）**

```python
import numpy as np
from collections import Counter

class DecisionTreeID3:
    def __init__(self, max_depth=None, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None

    def entropy(self, y):
        """计算熵"""
        counter = Counter(y)
        probabilities = [count / len(y) for count in counter.values()]
        return -sum(p * np.log2(p) for p in probabilities if p > 0)

    def information_gain(self, X, y, feature_idx):
        """计算信息增益"""
        # 父节点熵
        parent_entropy = self.entropy(y)

        # 按特征值分组
        values = set(X[:, feature_idx])
        weighted_entropy = 0

        for value in values:
            mask = X[:, feature_idx] == value
            subset_y = y[mask]
            weight = len(subset_y) / len(y)
            weighted_entropy += weight * self.entropy(subset_y)

        return parent_entropy - weighted_entropy

    def best_split(self, X, y):
        """找到最佳分裂特征"""
        best_gain = -1
        best_feature = None

        for feature_idx in range(X.shape[1]):
            gain = self.information_gain(X, y, feature_idx)
            if gain > best_gain:
                best_gain = gain
                best_feature = feature_idx

        return best_feature

    def build_tree(self, X, y, depth=0):
        """递归构建树"""
        # 停止条件
        if len(set(y)) == 1:  # 纯净
            return {'leaf': True, 'class': y[0]}

        if self.max_depth and depth >= self.max_depth:
            return {'leaf': True, 'class': Counter(y).most_common(1)[0][0]}

        if len(y) < self.min_samples_split:
            return {'leaf': True, 'class': Counter(y).most_common(1)[0][0]}

        # 找到最佳分裂
        best_feature = self.best_split(X, y)

        if best_feature is None:
            return {'leaf': True, 'class': Counter(y).most_common(1)[0][0]}

        # 创建节点
        tree = {
            'leaf': False,
            'feature': best_feature,
            'children': {}
        }

        # 递归创建子树
        values = set(X[:, best_feature])
        for value in values:
            mask = X[:, best_feature] == value
            subset_X = X[mask]
            subset_y = y[mask]
            tree['children'][value] = self.build_tree(subset_X, subset_y, depth + 1)

        return tree

    def fit(self, X, y):
        """训练模型"""
        self.tree = self.build_tree(X, y)
        return self

    def predict_one(self, x, tree):
        """预测单个样本"""
        if tree['leaf']:
            return tree['class']

        feature = tree['feature']
        value = x[feature]

        if value in tree['children']:
            return self.predict_one(x, tree['children'][value])
        else:
            # 返回最常见类别
            return self._most_common_class(tree)

    def _most_common_class(self, tree):
        """获取树中最常见的类别"""
        if tree['leaf']:
            return tree['class']
        # 递归找到所有叶节点
        classes = []
        for child in tree['children'].values():
            classes.append(self._most_common_class(child))
        return Counter(classes).most_common(1)[0][0]

    def predict(self, X):
        """预测多个样本"""
        return np.array([self.predict_one(x, self.tree) for x in X])

# 使用示例
tree = DecisionTreeID3(max_depth=5)
tree.fit(X_train, y_train)
predictions = tree.predict(X_test)
```

**项目 2：使用 scikit-learn 的决策树**

```python
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

# 加载数据
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 创建和训练模型
clf = DecisionTreeClassifier(
    criterion='entropy',  # 或 'gini'
    max_depth=5,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)
clf.fit(X_train, y_train)

# 预测
y_pred = clf.predict(X_test)

# 评估
print(f'准确率: {accuracy_score(y_test, y_pred)}')
print(classification_report(y_test, y_pred))

# 可视化树
plt.figure(figsize=(20, 10))
plot_tree(clf, feature_names=feature_names, class_names=class_names, filled=True)
plt.savefig('decision_tree.png')
plt.show()

# 特征重要性
importance = clf.feature_importances_
for i, imp in enumerate(importance):
    print(f'{feature_names[i]}: {imp:.4f}')
```

**项目 3：超参数调优**

```python
from sklearn.model_selection import GridSearchCV

# 定义参数网格
param_grid = {
    'max_depth': [3, 5, 7, 10, None],
    'min_samples_split': [2, 5, 10, 20],
    'min_samples_leaf': [1, 2, 5, 10],
    'criterion': ['gini', 'entropy']
}

# 网格搜索
grid_search = GridSearchCV(
    DecisionTreeClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)

# 最佳参数
print(f'最佳参数: {grid_search.best_params_}')
print(f'最佳得分: {grid_search.best_score_}')

# 使用最佳模型
best_clf = grid_search.best_estimator_
test_score = best_clf.score(X_test, y_test)
print(f'测试集得分: {test_score}')
```

**项目 4：剪枝实践**

```python
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# 训练完整树
full_tree = DecisionTreeClassifier(random_state=42)
full_tree.fit(X_train, y_train)

# 使用成本复杂度剪枝
path = full_tree.cost_complexity_pruning_path(X_train, y_train)
ccp_alphas = path.ccp_alphas
impurities = path.impurities

# 对每个alpha训练树
trees = []
for ccp_alpha in ccp_alphas:
    tree = DecisionTreeClassifier(random_state=42, ccp_alpha=ccp_alpha)
    tree.fit(X_train, y_train)
    trees.append(tree)

# 评估
train_scores = [tree.score(X_train, y_train) for tree in trees]
test_scores = [tree.score(X_test, y_test) for tree in trees]

# 可视化
plt.figure(figsize=(10, 6))
plt.plot(ccp_alphas, train_scores, marker='o', label='训练集')
plt.plot(ccp_alphas, test_scores, marker='o', label='测试集')
plt.xlabel('Alpha')
plt.ylabel('准确率')
plt.title('剪枝效果')
plt.legend()
plt.show()

# 选择最佳alpha
best_idx = np.argmax(test_scores)
best_alpha = ccp_alphas[best_idx]
print(f'最佳alpha: {best_alpha}')
```

## 🎯 测一测

### 选择题

**1. 以下哪个不是决策树的组成部分？**

- A. 根节点
- B. 叶节点
- C. 权重
- D. 分支

**2. 信息增益基于以下哪个概念？**

- A. 方差
- B. 熵
- C. 均值
- D. 中位数

**3. 基尼不纯度的范围是：**

- A. [-1, 1]
- B. [0, 1]
- C. [0, ∞)
- D. (-∞, +∞)

**4. ID3 算法使用什么标准选择分裂特征？**

- A. 基尼不纯度
- B. 信息增益
- C. 方差减少
- D. 卡方统计量

**5. 以下哪个算法可以用于回归问题？**

- A. ID3
- B. C4.5
- C. CART
- D. 以上都不行

**6. 预剪枝的优点是：**

- A. 更准确
- B. 更快速
- C. 更复杂
- D. 更稳定

**7. 决策树容易出现的问题是：**

- A. 欠拟合
- B. 过拟合
- C. 偏差大
- D. 计算慢

**8. 以下哪个不是停止分裂的条件？**

- A. 节点纯净
- B. 达到最大深度
- C. 样本数太少
- D. 特征太多

### 判断题

**1. 决策树只能用于分类问题。** （×）

**2. 熵越小，数据越纯净。** （✓）

**3. 决策树是参数模型。** （×）

**4. 决策树对特征缩放敏感。** （×）

**5. 后剪枝通常比预剪枝更准确。** （✓）

**6. 决策树可以自动进行特征选择。** （✓）

**7. 基尼不纯度和熵总是产生相同的分裂。** （×）

**8. 决策树可以处理缺失值（取决于算法）。** （✓）

### 简答题

**1. 解释信息增益和基尼不纯度的区别。**

**参考答案：**
信息增益基于熵（信息论概念），衡量特征对减少不确定性的贡献，计算涉及对数运算。基尼不纯度衡量随机分类的错误概率，计算更简单快速。两者通常产生相似的结果，但基尼不纯度计算效率更高，这是 CART 算法选择它的原因。信息增益倾向于选择值较多的特征，而基尼不纯度相对更平衡。

**2. 为什么决策树容易过拟合？如何解决？**

**参考答案：**
决策树可以不断分裂直到每个叶节点只有一个样本，完美拟合训练数据但失去泛化能力。解决方法：

- 预剪枝：限制最大深度、最小分裂样本数、最小叶节点样本数
- 后剪枝：先构建完整树再删除不必要的分支
- 使用验证集评估
- 集成方法（随机森林、梯度提升）
- 正则化（成本复杂度剪枝）

**3. 比较 ID3、C4.5 和 CART 算法。**

**参考答案：**

- **ID3**：使用信息增益，只能处理离散特征，不能处理缺失值，偏向选择值多的特征
- **C4.5**：使用信息增益率（修正偏向），可处理连续和离散特征，可处理缺失值，有剪枝机制
- **CART**：使用基尼不纯度，生成二叉树，可用于分类和回归，计算效率高，有剪枝机制

### 计算题

**1. 计算以下数据集的熵：**

- 类别 A：6 个样本
- 类别 B：4 个样本

**参考答案：**
$$H(S) = -\frac{6}{10}\log_2(\frac{6}{10}) - \frac{4}{10}\log_2(\frac{4}{10})$$
$$= -0.6 \times (-0.737) - 0.4 \times (-1.322)$$
$$= 0.442 + 0.529 = 0.971$$

**2. 计算基尼不纯度：**
数据集有 3 个类别，样本数分别为[40, 30, 30]

**参考答案：**
$$Gini = 1 - [(\frac{40}{100})^2 + (\frac{30}{100})^2 + (\frac{30}{100})^2]$$
$$= 1 - [0.16 + 0.09 + 0.09] = 1 - 0.34 = 0.66$$

## 🗺️ 思维导图

```
决策树
│
├─── 基本概念
│    ├─── 树结构
│    │    ├─── 根节点
│    │    ├─── 内部节点
│    │    └─── 叶节点
│    ├─── 分裂过程
│    └─── 预测过程
│
├─── 不纯度度量
│    ├─── 熵
│    │    └─── 范围[0, log₂(c)]
│    ├─── 基尼不纯度
│    │    └─── 范围[0, 1-1/c]
│    └─── 信息增益
│         └─── 父熵 - 子熵加权和
│
├─── 经典算法
│    ├─── ID3
│    │    ├─── 信息增益
│    │    ├─── 离散特征
│    │    └─── 无剪枝
│    ├─── C4.5
│    │    ├─── 信息增益率
│    │    ├─── 连续特征
│    │    ├─── 缺失值处理
│    │    └─── 剪枝
│    └─── CART
│         ├─── 基尼不纯度
│         ├─── 二叉树
│         ├─── 分类+回归
│         └─── 成本复杂度剪枝
│
├─── 剪枝技术
│    ├─── 预剪枝
│    │    ├─── 最大深度
│    │    ├─── 最小分裂样本
│    │    ├─── 最小叶节点样本
│    │    └─── 最大叶节点数
│    └─── 后剪枝
│         ├─── 减少误差剪枝
│         ├─── 悲观误差剪枝
│         └─── 成本复杂度剪枝
│
├─── 优点
│    ├─── 易于理解和解释
│    ├─── 白盒模型
│    ├─── 无需特征缩放
│    ├─── 处理非线性关系
│    ├─── 自动特征选择
│    └─── 处理数值和类别特征
│
├─── 缺点
│    ├─── 容易过拟合
│    ├─── 不稳定（高方差）
│    ├─── 偏向主导类别
│    ├─── 贪心算法（局部最优）
│    └─── 难以捕捉XOR关系
│
├─── 应用场景
│    ├─── 医疗诊断
│    ├─── 信用评分
│    ├─── 客户流失预测
│    ├─── 欺诈检测
│    └─── 风险评估
│
└─── 扩展
     ├─── 随机森林（集成）
     ├─── 梯度提升树（集成）
     ├─── XGBoost
     ├─── LightGBM
     └─── CatBoost
```

## 📖 学习资源

### 课程材料

- **03_CST8502_Classification_DecisionTrees1.pdf**：决策树核心概念
- **WeatherDataset_DecisionTree_Creation.pdf**：天气数据实践示例
- **A_Comparative_analysis_of_methods_for_pruning_decision_trees.pdf**：剪枝技术详解
- **weather1.csv**：练习数据集

### 推荐工具

- **scikit-learn**：DecisionTreeClassifier, DecisionTreeRegressor
- **graphviz**：树可视化
- **dtreeviz**：更美观的树可视化

### 经典论文

- Quinlan, J.R. (1986). "Induction of Decision Trees"
- Breiman, L. et al. (1984). "Classification and Regression Trees"

## 🎯 学习目标检查清单

完成本章后，您应该能够：

- ✅ 理解决策树的结构和工作原理
- ✅ 计算熵、基尼不纯度和信息增益
- ✅ 手工构建简单的决策树
- ✅ 区分 ID3、C4.5 和 CART 算法
- ✅ 应用预剪枝和后剪枝技术
- ✅ 使用 Python 实现决策树
- ✅ 可视化和解释决策树
- ✅ 识别和解决过拟合问题
- ✅ 调优决策树超参数

---

**下一章预告：** 第五章将学习异常值检测技术，这对数据质量和模型稳健性至关重要。
