# 决策树可视化方法（不使用 One-Hot Encoding）

## 可以直接用 matplotlib 可视化的决策树类型

### 1. **DecisionTreeClassifier** (单棵决策树)

- **编码方式**: 使用 `OrdinalEncoder`（序数编码）
- **可视化工具**: `sklearn.tree.plot_tree`
- **优点**:
  - 不需要 one-hot encoding
  - 每个分类特征保持单列
  - 可视化简单直接

**示例代码：**

```python
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.preprocessing import OrdinalEncoder
import matplotlib.pyplot as plt

# 使用 OrdinalEncoder 编码分类特征
encoder = OrdinalEncoder()
X_train_cat_encoded = encoder.fit_transform(X_train_cat)
X_test_cat_encoded = encoder.transform(X_test_cat)

# 合并数值和编码后的分类特征
X_train_final = pd.concat([X_train_num, X_train_cat_encoded], axis=1)

# 训练模型
dt_model = DecisionTreeClassifier(random_state=2025)
dt_model.fit(X_train_final, y_train)

# 可视化
plt.figure(figsize=(25, 18))
plot_tree(dt_model,
          feature_names=X_train_final.columns,
          class_names=['Not Survived', 'Survived'],
          filled=True,
          rounded=True,
          fontsize=14)
plt.title('Decision Tree Visualization (No One-Hot Encoding)')
plt.show()
```

### 2. **RandomForestClassifier** (随机森林)

- **编码方式**: 使用 `OrdinalEncoder`（序数编码）
- **可视化工具**: `sklearn.tree.plot_tree`（可可视化其中的任意一棵树）
- **优点**:
  - 不需要 one-hot encoding
  - 集成学习方法，性能通常更好
  - 每个特征保持单列，可视化清晰

**示例代码（来自 STEP 17）：**

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OrdinalEncoder

# 使用 OrdinalEncoder 编码分类特征
encoder = OrdinalEncoder()
X_train_cat_encoded = encoder.fit_transform(X_train_cat)

# 合并特征
X_train_final = pd.concat([X_train_num, X_train_cat_encoded], axis=1)

# 训练模型
rf_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=2025)
rf_model.fit(X_train_final, y_train)

# 可视化第一棵树
plt.figure(figsize=(25, 18))
plot_tree(rf_model.estimators_[0],
          feature_names=X_train_final.columns,
          class_names=['Not Survived', 'Survived'],
          filled=True,
          rounded=True,
          fontsize=16,
          max_depth=5)
plt.title('RandomForest - First Tree Visualization\n(No One-Hot Encoding)')
plt.show()
```

### 3. **ExtraTreesClassifier** (极端随机树)

- **编码方式**: 使用 `OrdinalEncoder`
- **可视化工具**: `sklearn.tree.plot_tree`
- **优点**: 类似 RandomForest，但随机性更强

### 4. **GradientBoostingClassifier** (梯度提升树)

- **编码方式**: 使用 `OrdinalEncoder`
- **可视化工具**: `sklearn.tree.plot_tree`
- **注意**: 可以可视化其中的单棵树

## 编码方式对比

### ❌ 使用 One-Hot Encoding（STEP 6）

```python
# 每个分类特征扩展为多个二进制列
X_dt_encoded = pd.get_dummies(X_dt, columns=['Pclass', 'Sex', 'AgeGroup', ...])
# 结果：Sex 变成 Sex_male, Sex_female 两列
# 可视化时树节点显示 "Sex_male <= 0.5"，不够直观
```

### ✅ 使用 OrdinalEncoder（STEP 17.5）

```python
# 每个分类特征保持单列，只是转换为数值
encoder = OrdinalEncoder()
X_train_cat_encoded = encoder.fit_transform(X_train_cat)
# 结果：Sex 保持为单列，值为 0, 1 等
# 可视化时树节点显示 "Sex <= 0.5"，更直观
```

## 关键区别

| 特性         | One-Hot Encoding                     | OrdinalEncoder                   |
| ------------ | ------------------------------------ | -------------------------------- |
| 列数         | 每个分类值一列                       | 每个特征一列                     |
| 可视化清晰度 | 节点显示复杂（如 "Sex_male <= 0.5"） | 节点显示简洁（如 "Sex <= 0.5"）  |
| 树的可读性   | 需要额外映射转换                     | 直接可读                         |
| 适用场景     | kNN、神经网络等需要数值距离的算法    | 决策树、随机森林等基于分裂的算法 |

## 总结

**所有基于 scikit-learn 的树模型都可以使用 OrdinalEncoder 而不是 one-hot encoding**：

- ✅ DecisionTreeClassifier
- ✅ RandomForestClassifier
- ✅ ExtraTreesClassifier
- ✅ GradientBoostingClassifier
- ✅ AdaBoostClassifier（基分类器是树时）

它们都可以直接用 `plot_tree` 函数可视化，**不需要 Graphviz**，直接使用 matplotlib 即可。
