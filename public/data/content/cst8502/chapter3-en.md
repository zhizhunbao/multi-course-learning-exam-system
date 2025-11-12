## 📚 Concepts

### Core Concepts of Decision Trees

- **Decision Tree**: A tree-structured model for classification and regression that makes predictions through a sequence of decision rules.
- **Nodes**: Building blocks of the tree.
  - **Root Node**: The top node containing the entire dataset.
  - **Internal Nodes**: Nodes where splits occur.
  - **Leaf Nodes**: Terminal nodes that output the final prediction.
- **Branches**: Edges connecting nodes, representing decision paths.
- **Split**: The process of dividing the data at a node into subsets.
- **Depth**: The length of the longest path from the root to any leaf.

### Impurity Measures

1. **Entropy**
   $$H(S) = -\sum_{i=1}^{c} p_i \log_2(p_i)$$
   - Measures the amount of disorder in the data.
   - Range: [0, log₂(c)]; 0 indicates a pure split.

2. **Gini Impurity**
   $$Gini(S) = 1 - \sum_{i=1}^{c} p_i^2$$
   - Measures the probability of misclassification when labels are assigned randomly.
   - Range: [0, 1 − 1/c]; 0 indicates a pure node.

3. **Information Gain**
   $$IG(S, A) = H(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} H(S_v)$$
   - Quantifies how much a feature contributes to reducing entropy.
   - The feature with the highest information gain is selected for splitting.

### Decision Tree Algorithms

- **ID3 (Iterative Dichotomiser 3)**: Uses information gain; supports categorical features only.
- **C4.5**: Extension of ID3; uses information gain ratio and handles continuous features and missing values.
- **C5.0**: Commercial version of C4.5; faster and more accurate.
- **CART (Classification and Regression Trees)**: Uses Gini impurity for classification and variance reduction for regression.

### Pruning Techniques

- **Pre-pruning**: Stops tree growth early based on constraints.
- **Post-pruning**: Builds the full tree first, then removes branches that provide little value.
- **Cost-Complexity Pruning**: Balances tree size and training error.

## 🔍 Explanation

### How Do Decision Trees Work?

A decision tree recursively partitions the data:

1. **Select the Best Feature**: Use impurity measures such as information gain or Gini impurity.
2. **Split the Node**: Divide the dataset into subsets according to feature values.
3. **Recurse**: Repeat the process on each subset.
4. **Stop**: When nodes are pure, reach maximum depth, or the sample size is too small.

**Example: Should we play tennis?**

```
Outlook = ?
├─ sunny
│  └─ Humidity = ?
│     ├─ high   → no
│     └─ normal → yes
├─ overcast      → yes
└─ rainy
   └─ Wind = ?
      ├─ strong → no
      └─ weak   → yes
```

### Understanding Information Gain

**Intuition for Entropy:**

- Entropy = 0: all samples belong to the same class (pure).
- Higher entropy: classes are evenly distributed (maximally uncertain).

**Example Calculation:**

Suppose dataset S contains 14 samples (9 positive, 5 negative):
$$H(S) = -\frac{9}{14}\log_2\left(\frac{9}{14}\right) - \frac{5}{14}\log_2\left(\frac{5}{14}\right) = 0.940$$

Splitting by "Outlook":

- Sunny: 2 positive, 3 negative → H = 0.971
- Overcast: 4 positive, 0 negative → H = 0
- Rainy: 3 positive, 2 negative → H = 0.971

$$IG(S, Outlook) = 0.940 - \left(\frac{5}{14} \times 0.971 + \frac{4}{14} \times 0 + \frac{5}{14} \times 0.971\right) = 0.247$$

### Understanding Gini Impurity

**Example Calculation:**

Same dataset (9 positive, 5 negative):
$$Gini(S) = 1 - \left(\frac{9}{14}\right)^2 - \left(\frac{5}{14}\right)^2 = 0.459$$

Gini impurity is computationally cheaper than entropy because it avoids logarithms—one reason CART prefers it.

### Handling Continuous Features

For continuous attributes, trees search for the optimal split point:

1. Sort feature values.
2. Consider midpoints between adjacent values as candidate thresholds.
3. Evaluate the information gain for each candidate.
4. Choose the best split.

**Example:**

Temperature values: [64, 65, 68, 69, 70, 71, 72, 75, 80, 81, 83, 85]
Candidate thresholds: [64.5, 66.5, 68.5, 69.5, ...]

### Why Prune?

**The Overfitting Problem:**

- Decision trees can perfectly memorize training data.
- They may capture noise and spurious patterns.
- Generalization suffers on new data.

**Comparing Strategies:**

| Method      | Timing      | Pros                    | Cons                 |
| ----------- | ----------- | ----------------------- | -------------------- |
| Pre-pruning | During fit  | Fast, resource-friendly | May stop too early   |
| Post-pruning| After fit   | Typically more accurate | Higher computation   |

**Typical Pre-pruning Criteria:**

- Maximum depth
- Minimum samples to split
- Minimum samples per leaf
- Maximum number of leaves
- Minimum information gain threshold

**Common Post-Pruning Methods:**

- Reduced Error Pruning (REP)
- Pessimistic Error Pruning (PEP)
- Minimum Error Pruning (MEP)
- Cost-Complexity Pruning (CCP)

### Interpretability

Decision trees are "white-box" models:

```python
if (weather == "sunny") and (humidity <= 70):
    play_tennis = "yes"
elif weather == "overcast":
    play_tennis = "yes"
elif (weather == "rainy") and (wind == "weak"):
    play_tennis = "yes"
else:
    play_tennis = "no"
```

You can translate the tree directly into business rules.

## 📜 History

### Evolution of Decision Trees

**1960s – Origins**

- 1963: Hunt et al. introduced the Concept Learning System (CLS).
- Decision-tree ideas first appeared in psychological research.

**1970s – Theoretical Development**

- 1975: CHAID algorithm proposed.
- Statistical methods began to merge with decision trees.

**1980s – Golden Era**

- 1984: Breiman et al. introduced **CART**, featuring Gini impurity, regression trees, and cost-complexity pruning.
- 1986: Ross Quinlan released **ID3**, establishing the modern decision-tree framework.

**1990s – Refinement and Maturity**

- 1993: Quinlan published **C4.5**, adding continuous feature handling, missing value support, gain ratio, and improved pruning.
- Decision trees became one of the most popular machine learning algorithms.

**2000s – Ensemble Era**

- 2001: Leo Breiman introduced **Random Forests**.
- Mid-2000s: **Gradient Boosted Trees** gained traction.
- Decision trees became the backbone of many ensemble methods.

**2010s to Present – Optimization and Industrialization**

- 2014: **XGBoost** delivered high-performance gradient boosting.
- 2017: **LightGBM** (Microsoft) accelerated boosting with histogram-based splits.
- 2017: **CatBoost** (Yandex) optimized categorical features.
- Decision trees remain widely used across industries.

### Key Contributors

- **Ross Quinlan**: Inventor of ID3 and C4.5; pioneer of decision-tree learning.
- **Leo Breiman**: Creator of CART and Random Forests.
- **Jerome Friedman**: Inventor of Gradient Boosting Machines.

### Landmark Papers

- Quinlan, J.R. (1986). “Induction of Decision Trees.”
- Breiman, L. et al. (1984). “Classification and Regression Trees.”
- Quinlan, J.R. (1993). “C4.5: Programs for Machine Learning.”

## 💪 Exercises

### Practice Set

**Exercise 1: Compute Entropy by Hand**

Dataset: 6 positives, 4 negatives.

1. Compute the entropy.
2. After splitting on a feature, subset 1 has 4 positives and 1 negative; subset 2 has 2 positives and 3 negatives. Compute the information gain.

**Exercise 2: Gini Impurity**

Dataset with class counts [30, 20, 10] (total 60 samples). Compute the Gini impurity.

**Exercise 3: Manually Build a Decision Tree**

Use the weather dataset:

| Outlook | Temperature | Humidity | Wind | Play |
| ------- | ----------- | -------- | ---- | ---- |
| sunny   | hot         | high     | weak | no   |
| sunny   | hot         | high     | strong | no |
| overcast| hot         | high     | weak | yes |
| rainy   | mild        | high     | weak | yes |
| rainy   | cool        | normal   | weak | yes |
| rainy   | cool        | normal   | strong | no |
| overcast| cool        | normal   | strong | yes |
| sunny   | mild        | high     | weak | no |
| sunny   | cool        | normal   | weak | yes |
| rainy   | mild        | normal   | weak | yes |
| sunny   | mild        | normal   | strong | yes |
| overcast| mild        | high     | strong | yes |
| overcast| hot         | normal   | weak | yes |
| rainy   | mild        | high     | strong | no |

Steps:

1. Compute information gain for each feature.
2. Select the best feature as the root.
3. Recursively build subtrees.

### Weather Dataset Walk-through

We will construct a decision tree end-to-end using the classic weather dataset (`weather1.csv`).

#### Step 1: Entropy of the Target Variable

Total 14 samples: 9 "yes", 5 "no".

$$H(Play) = -\frac{9}{14}\log_2\left(\frac{9}{14}\right) - \frac{5}{14}\log_2\left(\frac{5}{14}\right) = 0.940$$

#### Step 2: Compute Information Gain for Each Feature

**Feature 1: Outlook**

- sunny: 5 samples → 2 yes, 3 no → H = 0.971
- overcast: 4 samples → 4 yes, 0 no → H = 0.000 (pure!)
- rainy: 5 samples → 3 yes, 2 no → H = 0.971

Weighted entropy:
$$H_{Outlook} = \frac{5}{14} \times 0.971 + \frac{4}{14} \times 0 + \frac{5}{14} \times 0.971 = 0.693$$

Information gain:
$$IG(Outlook) = 0.940 - 0.693 = 0.247$$

**Feature 2: Temperature**

- hot: 4 samples → 2 yes, 2 no → H = 1.000
- mild: 6 samples → 4 yes, 2 no → H = 0.918
- cool: 4 samples → 3 yes, 1 no → H = 0.811

$$H_{Temperature} = \frac{4}{14} \times 1.000 + \frac{6}{14} \times 0.918 + \frac{4}{14} \times 0.811 = 0.911$$

$$IG(Temperature) = 0.940 - 0.911 = 0.029$$

**Feature 3: Humidity**

- high: 7 samples → 3 yes, 4 no → H = 0.985
- normal: 7 samples → 6 yes, 1 no → H = 0.592

$$H_{Humidity} = \frac{7}{14} \times 0.985 + \frac{7}{14} \times 0.592 = 0.788$$

$$IG(Humidity) = 0.940 - 0.788 = 0.152$$

**Feature 4: Wind**

- FALSE: 8 samples → 6 yes, 2 no → H = 0.811
- TRUE: 6 samples → 3 yes, 3 no → H = 1.000

$$H_{Wind} = \frac{8}{14} \times 0.811 + \frac{6}{14} \times 1.000 = 0.892$$

$$IG(Wind) = 0.940 - 0.892 = 0.048$$

#### Step 3: Choose the Root Node

Comparison of information gain:

- **Outlook: 0.247** ⭐
- Humidity: 0.152
- Wind: 0.048
- Temperature: 0.029

**Outlook** becomes the root.

#### Step 4: Build Subtrees Recursively

**Branch 1: Outlook = overcast**

- All samples are "yes" → Leaf node: `Play = yes`

**Branch 2: Outlook = sunny**

- 5 samples (2 yes, 3 no) → continue splitting.
- Information gain for remaining features shows Humidity as best (IG = 0.971).
- Sub-branches:
  - Humidity = high → `Play = no`
  - Humidity = normal → `Play = yes`

**Branch 3: Outlook = rainy**

- 5 samples (3 yes, 2 no) → continue splitting.
- Wind has the highest gain (0.971).
- Sub-branches:
  - Wind = FALSE → `Play = yes`
  - Wind = TRUE → `Play = no`

#### Step 5: Final Tree

```
                    Outlook
                    /  |  \
                   /   |   \
              sunny overcast rainy
                /      |      \
               /       |       \
          Humidity   Play=yes   Wind
          /    \                  /    \
         /      \                /      \
      high    normal        FALSE     TRUE
       |        |             |         |
    Play=no  Play=yes     Play=yes   Play=no
```

#### Step 6: Full Python Implementation

```python
import pandas as pd
import numpy as np
from collections import Counter

# Load data
data = {
    'Outlook': ['sunny', 'sunny', 'overcast', 'rainy', 'rainy', 'rainy',
                'overcast', 'sunny', 'sunny', 'rainy', 'sunny', 'overcast',
                'overcast', 'rainy'],
    'Temperature': ['hot', 'hot', 'hot', 'mild', 'cool', 'cool', 'cool',
                    'mild', 'cool', 'mild', 'mild', 'mild', 'hot', 'mild'],
    'Humidity': ['high', 'high', 'high', 'high', 'normal', 'normal', 'normal',
                 'high', 'normal', 'normal', 'normal', 'high', 'normal', 'high'],
    'Wind': [False, True, False, False, False, True, True, False, False,
             False, True, True, False, True],
    'Play': ['no', 'no', 'yes', 'yes', 'yes', 'no', 'yes', 'no', 'yes',
             'yes', 'yes', 'yes', 'yes', 'no']
}

df = pd.DataFrame(data)

# Entropy
def entropy(target):
    counter = Counter(target)
    total = len(target)
    return -sum((count / total) * np.log2(count / total) for count in counter.values())

# Information gain
def information_gain(data, feature, target='Play'):
    total_entropy = entropy(data[target])
    weighted_entropy = 0

    for value in data[feature].unique():
        subset = data[data[feature] == value]
        weight = len(subset) / len(data)
        weighted_entropy += weight * entropy(subset[target])

    return total_entropy - weighted_entropy

print("Information Gain:")
print("=" * 50)
for feature in ['Outlook', 'Temperature', 'Humidity', 'Wind']:
    ig = information_gain(df, feature)
    print(f"{feature:15} : {ig:.4f}")
```

### Hands-On Projects

**Project 1: Implement ID3 from Scratch**

```python
import numpy as np
from collections import Counter

class DecisionTreeID3:
    def __init__(self, max_depth=None, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None

    def entropy(self, y):
        counter = Counter(y)
        total = len(y)
        return -sum((count / total) * np.log2(count / total) for count in counter.values())

    def information_gain(self, X, y, feature_idx):
        parent_entropy = self.entropy(y)
        values = set(X[:, feature_idx])
        weighted_entropy = 0

        for value in values:
            mask = X[:, feature_idx] == value
            subset_y = y[mask]
            weight = len(subset_y) / len(y)
            weighted_entropy += weight * self.entropy(subset_y)

        return parent_entropy - weighted_entropy

    def best_split(self, X, y):
        best_gain = -1
        best_feature = None

        for feature_idx in range(X.shape[1]):
            gain = self.information_gain(X, y, feature_idx)
            if gain > best_gain:
                best_gain = gain
                best_feature = feature_idx

        return best_feature

    def build_tree(self, X, y, depth=0):
        if len(set(y)) == 1:
            return {'leaf': True, 'class': y[0]}

        if self.max_depth and depth >= self.max_depth:
            return {'leaf': True, 'class': Counter(y).most_common(1)[0][0]}

        if len(y) < self.min_samples_split:
            return {'leaf': True, 'class': Counter(y).most_common(1)[0][0]}

        best_feature = self.best_split(X, y)
        if best_feature is None:
            return {'leaf': True, 'class': Counter(y).most_common(1)[0][0]}

        tree = {'leaf': False, 'feature': best_feature, 'children': {}}

        for value in set(X[:, best_feature]):
            mask = X[:, best_feature] == value
            subtree = self.build_tree(X[mask], y[mask], depth + 1)
            tree['children'][value] = subtree

        return tree

    def fit(self, X, y):
        self.tree = self.build_tree(X, y)
        return self

    def predict_one(self, x, tree):
        if tree['leaf']:
            return tree['class']
        feature = tree['feature']
        value = x[feature]
        if value in tree['children']:
            return self.predict_one(x, tree['children'][value])
        return self._most_common_class(tree)

    def _most_common_class(self, tree):
        if tree['leaf']:
            return tree['class']
        labels = [self._most_common_class(child) for child in tree['children'].values()]
        return Counter(labels).most_common(1)[0][0]

    def predict(self, X):
        return np.array([self.predict_one(x, self.tree) for x in X])

# Example usage
model = DecisionTreeID3(max_depth=5)
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

**Project 2: Using scikit-learn Decision Trees**

```python
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

clf = DecisionTreeClassifier(
    criterion='entropy',
    max_depth=5,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42,
)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
print(f'Accuracy: {accuracy_score(y_test, y_pred):.4f}')
print(classification_report(y_test, y_pred))

plt.figure(figsize=(20, 10))
plot_tree(clf, feature_names=feature_names, class_names=class_names, filled=True)
plt.savefig('decision_tree.png')
plt.show()

for name, importance in zip(feature_names, clf.feature_importances_):
    print(f'{name}: {importance:.4f}')
```

**Project 3: Hyperparameter Tuning**

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'max_depth': [3, 5, 7, 10, None],
    'min_samples_split': [2, 5, 10, 20],
    'min_samples_leaf': [1, 2, 5, 10],
    'criterion': ['gini', 'entropy'],
}

grid_search = GridSearchCV(
    DecisionTreeClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
)

grid_search.fit(X_train, y_train)

print(f'Best params: {grid_search.best_params_}')
print(f'Best CV score: {grid_search.best_score_:.4f}')

best_model = grid_search.best_estimator_
print(f'Test accuracy: {best_model.score(X_test, y_test):.4f}')
```

**Project 4: Practicing Pruning**

```python
from sklearn.tree import DecisionTreeClassifier
import numpy as np
import matplotlib.pyplot as plt

full_tree = DecisionTreeClassifier(random_state=42)
full_tree.fit(X_train, y_train)

path = full_tree.cost_complexity_pruning_path(X_train, y_train)
ccp_alphas = path.ccp_alphas

models = []
for ccp_alpha in ccp_alphas:
    clf = DecisionTreeClassifier(random_state=42, ccp_alpha=ccp_alpha)
    clf.fit(X_train, y_train)
    models.append(clf)

train_scores = [clf.score(X_train, y_train) for clf in models]
test_scores = [clf.score(X_test, y_test) for clf in models]

plt.figure(figsize=(10, 6))
plt.plot(ccp_alphas, train_scores, marker='o', label='Train')
plt.plot(ccp_alphas, test_scores, marker='o', label='Test')
plt.xlabel('Alpha')
plt.ylabel('Accuracy')
plt.title('Pruning Performance')
plt.legend()
plt.show()

best_idx = np.argmax(test_scores)
print(f'Best alpha: {ccp_alphas[best_idx]:.6f}')
```

## 🎯 Check Your Understanding

### Multiple Choice

1. Which of the following is NOT a component of a decision tree?
   - A. Root node
   - B. Leaf node
   - C. Weight
   - D. Branch

2. Information gain is based on which concept?
   - A. Variance
   - B. Entropy
   - C. Mean
   - D. Median

3. The range of Gini impurity is:
   - A. [-1, 1]
   - B. [0, 1]
   - C. [0, ∞)
   - D. (-∞, +∞)

4. Which algorithm can handle both classification and regression tasks?
   - A. ID3
   - B. C4.5
   - C. CART
   - D. C5.0

5. Pruning helps primarily with:
   - A. Increasing tree depth
   - B. Reducing overfitting
   - C. Adding more features
   - D. Improving training speed only

### True or False

1. Decision trees can perfectly memorize the training set. (True)
2. Gini impurity requires logarithmic computation. (False)
3. Entropy always produces the same tree as Gini impurity. (False)
4. Pre-pruning may stop tree growth prematurely. (True)
5. Post-pruning requires building the complete tree first. (True)
6. Decision trees are inherently interpretable. (True)
7. Decision trees cannot handle continuous features. (False)
8. Ensemble methods often use decision trees as base learners. (True)

### Short Answer

1. Explain the main difference between ID3 and CART.
   - *Sample Answer:* ID3 uses information gain and supports categorical features, while CART uses Gini impurity for classification and variance reduction for regression, producing binary splits.

2. Why is pruning important in decision trees?
   - *Sample Answer:* Pruning controls tree complexity, reduces overfitting, and improves generalization by removing branches that do not meaningfully improve predictive performance.

3. How would you handle missing values when training a decision tree on real-world data?
   - *Sample Answer:* Use strategies such as surrogate splits, imputation before training, or algorithms like C4.5 that natively support missing values.

### Calculation Exercises

1. Given a dataset with class probabilities [0.6, 0.3, 0.1], compute entropy and Gini impurity.
2. For a split producing subsets A (8 positives, 2 negatives) and B (2 positives, 6 negatives), compute the weighted Gini impurity.

## 🧪 Advanced Topics

- Handling categorical vs. continuous features.
- Dealing with class imbalance (class weights, balanced criteria).
- Feature importance interpretation.
- Incorporating cost-sensitive learning.
- Decision trees in ensemble methods (Random Forests, Gradient Boosting, XGBoost, LightGBM, CatBoost).
- Model interpretability tools (decision rules, SHAP values, partial dependence plots).

## 🔧 Practical Tips

- Always scale or encode features consistently when combining trees with other algorithms.
- Limit depth and set minimum samples per split to prevent overfitting.
- Use stratified splits for imbalanced datasets.
- Evaluate with cross-validation.
- Visualize trees for debugging and stakeholder communication.

## 📖 Learning Resources

- *The Elements of Statistical Learning* – Hastie, Tibshirani, Friedman
- *Introduction to Statistical Learning* – James et al.
- Scikit-learn documentation on `DecisionTreeClassifier`
- Kaggle kernels featuring decision tree tutorials
- Visualization tools: `dtreeviz`, `Graphviz`

## 🎯 Learning Objectives Checklist

After completing this chapter, you should be able to:

- ✅ Explain the structure and working principles of decision trees.
- ✅ Compute entropy, Gini impurity, and information gain by hand.
- ✅ Handle both categorical and continuous features in decision trees.
- ✅ Implement ID3 from scratch and use scikit-learn’s tree models.
- ✅ Diagnose overfitting and apply pruning techniques effectively.
- ✅ Tune hyperparameters to improve tree performance.
- ✅ Interpret tree-based models using feature importance and decision paths.
- ✅ Integrate decision trees into ensemble methods.

---

**Next chapter:** Chapter 5 introduces outlier detection techniques for identifying anomalous observations.
