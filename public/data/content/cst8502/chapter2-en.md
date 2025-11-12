## 📚 Concepts

### Core Ideas in Data Preprocessing

- **Data Cleaning**: Detecting and correcting errors, inconsistencies, and incompleteness in data.
- **Data Transformation**: Converting data into formats suitable for machine learning algorithms.
- **Feature Engineering**: Creating new features or selecting the most relevant ones.
- **Normalization**: Scaling features into a unified range (such as [0, 1]).
- **Standardization**: Transforming features to follow a distribution with mean 0 and standard deviation 1.

### Core Ideas in the k-Nearest Neighbors Algorithm

- **k-NN (k-Nearest Neighbors)**: A non-parametric algorithm for classification and regression based on similarity.
- **Instance-Based Learning**: Stores the entire training dataset and compares samples at prediction time.
- **Distance Metrics**: Methods for measuring similarity between data points.
- **k Value**: The number of nearest neighbors considered during prediction.
- **Majority Vote**: For classification, predicts the most common class among the k neighbors.

### Distance Metrics

1. **Euclidean Distance**
   $$d(x, y) = \sqrt{\sum_{i=1}^{n}(x_i - y_i)^2}$$

2. **Manhattan Distance**
   $$d(x, y) = \sum_{i=1}^{n}|x_i - y_i|$$

3. **Minkowski Distance**
   $$d(x, y) = (\sum_{i=1}^{n}|x_i - y_i|^p)^{1/p}$$

## 🔍 Explanation

### Why Do We Need Data Preprocessing?

Real-world data is often "messy":

- **Missing Values**: Some records are absent.
- **Outliers**: Extreme or unusual values.
- **Inconsistencies**: The same information represented differently.
- **Noise**: Random errors or variations.
- **Different Scales**: Features may reside on wildly different ranges.

### Data Cleaning Techniques

**1. Handling Missing Values**

```python
# Drop missing values
df.dropna()

# Fill missing values
df.fillna(df.mean())  # Fill with mean
df.fillna(method='ffill')  # Forward fill
df.fillna(method='bfill')  # Backward fill

# Interpolation
df.interpolate()
```

**2. Handling Outliers**

- **Identify**: Box plots, z-scores, IQR method
- **Handle**: Remove, replace, transform, or keep

**3. Removing Duplicates**

```python
df.drop_duplicates()
```

### Data Transformation Techniques

**1. Normalization (Min-Max Scaling)**
Scale data to [0, 1]:
$$x' = \frac{x - x_{min}}{x_{max} - x_{min}}$$

```python
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
X_normalized = scaler.fit_transform(X)
```

**2. Standardization (Z-score Normalization)**
Transform data to mean 0 and standard deviation 1:
$$x' = \frac{x - \mu}{\sigma}$$

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_standardized = scaler.fit_transform(X)
```

**3. Encoding Categorical Variables**

- **Label Encoding**: Converts categories into numbers (0, 1, 2, ...)
- **One-Hot Encoding**: Creates binary columns for each category
- **Target Encoding**: Uses the mean of the target variable per category

```python
# One-hot encoding
pd.get_dummies(df['category'])

# Label encoding
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['category_encoded'] = le.fit_transform(df['category'])
```

### k-NN Algorithm in Detail

**How It Works:**

1. Choose the value of k (number of neighbors).
2. Compute the distance between the new sample and every training sample.
3. Select the k nearest neighbors.
4. Classification: majority vote; Regression: average value.

**Characteristics:**

- **Non-Parametric**: Makes no assumptions about data distribution.
- **Lazy Learning**: Stores data during "training" and performs computation at prediction time.
- **Simple and Intuitive**: Easy to understand and implement.
- **No Explicit Training Phase**: No model fitting is required ahead of prediction.

### Choosing k

**Small k (e.g., k = 1):**

- Pros: Complex model that captures detail.
- Cons: Sensitive to noise, prone to overfitting.

**Large k (e.g., k = 100):**

- Pros: Smoother model, more robust to noise.
- Cons: May underfit and ignore local patterns.

**Selection Strategies:**

- Cross-validation
- Grid search
- Rule of thumb: k = √n (n = number of samples)

### Curse of Dimensionality

Challenges in high-dimensional spaces:

- Distance metrics lose interpretability.
- Computational cost increases sharply.
- Data requirements grow exponentially.
- "Nearest" neighbors may still be far away.

**Solutions:**

- Dimensionality reduction (PCA, t-SNE)
- Feature selection
- Regularization

## 📜 History

### Evolution of Data Preprocessing

**1960s–1970s**

- The concept of data cleaning emerged
- Statistical methods were used to handle missing values

**1980s–1990s**

- Data warehousing became popular
- ETL (Extract, Transform, Load) processes were standardized
- Data quality gained attention

**2000s**

- The era of big data began
- Automated data cleaning tools developed
- Feature engineering became essential to machine learning success

**2010s to Present**

- Deep learning enabled automated feature learning
- AutoML automated parts of feature engineering
- Data augmentation techniques advanced

### Evolution of k-NN

**1951**

- Fix and Hodges established the theoretical foundation of the nearest neighbor rule

**1967**

- Cover and Hart published the seminal paper on k-NN
- Proven asymptotic error rates for k-NN

**1970s–1980s**

- k-NN widely used in pattern recognition
- Acceleration structures such as KD-Trees were developed

**1990s**

- Distance-weighted k-NN introduced
- Handling large-scale datasets became a focus

**2000s to Present**

- Approximate nearest neighbor algorithms (LSH, HNSW)
- GPU acceleration
- Integration with deep learning

### Key Contributors

- **Evelyn Fix & Joseph Hodges**: Pioneers of nearest neighbor methods
- **Thomas Cover & Peter Hart**: Established the theoretical underpinnings of k-NN

## 💪 Exercises

### Practice Exercises

**Exercise 1: Data Cleaning**
Given the dataset:

```python
import pandas as pd
data = {
    'age': [25, 30, None, 35, 40],
    'income': [50000, 60000, 75000, None, 90000],
    'category': ['A', 'B', 'A', 'C', 'B']
}
df = pd.DataFrame(data)
```

Tasks:

1. Identify missing values.
2. Fill numerical missing values with the mean.
3. One-hot encode the categorical variable.

**Exercise 2: Feature Scaling**
Given features:

- Age: [20, 25, 30, 35, 40]
- Income: [30000, 40000, 50000, 60000, 70000]

Tasks:

1. Apply Min-Max normalization.
2. Apply Z-score standardization.
3. Compare the results.

**Exercise 3: Distance Calculations**
Compute the following between points A(1, 2) and B(4, 6):

1. Euclidean distance
2. Manhattan distance
3. Minkowski distance (p = 3)

**Exercise 4: Manual k-NN Classification**
Training data:

```
Point   Features (x, y)    Class
P1      (1, 1)             A
P2      (2, 2)             A
P3      (3, 3)             B
P4      (6, 6)             B
```

Predict the class of point (2, 3) with k = 3.

### Hands-On Projects

**Project 1: End-to-End Data Preprocessing Pipeline**

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

# 1. Load data
df = pd.read_csv('data.csv')

# 2. Handle missing values
imputer = SimpleImputer(strategy='mean')
df_imputed = imputer.fit_transform(df)

# 3. Handle outliers
Q1 = df.quantile(0.25)
Q3 = df.quantile(0.75)
IQR = Q3 - Q1
df_clean = df[~((df < (Q1 - 1.5 * IQR)) | (df > (Q3 + 1.5 * IQR))).any(axis=1)]

# 4. Feature scaling
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df_clean)

# 5. Encode categorical variables
df_encoded = pd.get_dummies(df, columns=['category'])
```

**Project 2: Implement k-NN from Scratch**

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
        return np.array([self._predict(x) for x in X])

    def _predict(self, x):
        # Compute distances
        distances = [self.euclidean_distance(x, x_train)
                     for x_train in self.X_train]

        # Get indices of the k nearest neighbors
        k_indices = np.argsort(distances)[:self.k]

        # Retrieve the labels of the k nearest neighbors
        k_nearest_labels = [self.y_train[i] for i in k_indices]

        # Majority vote
        most_common = Counter(k_nearest_labels).most_common(1)
        return most_common[0][0]

# Usage example
knn = KNN(k=3)
knn.fit(X_train, y_train)
predictions = knn.predict(X_test)
```

**Project 3: Optimizing the k Value**

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
import matplotlib.pyplot as plt

# Evaluate different k values
k_values = range(1, 31)
cv_scores = []

for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k)
    scores = cross_val_score(knn, X, y, cv=5, scoring='accuracy')
    cv_scores.append(scores.mean())

# Visualization
plt.plot(k_values, cv_scores)
plt.xlabel('k value')
plt.ylabel('Cross-validation accuracy')
plt.title('k optimization')
plt.show()

# Best k
optimal_k = k_values[np.argmax(cv_scores)]
print(f'Best k: {optimal_k}')
```

## 🎯 Check Your Understanding

### Multiple Choice

**1. Which of the following is NOT a common way to handle missing values?**

- A. Dropping rows with missing values
- B. Filling with the mean
- C. Filling with random values
- D. Interpolation

**2. Min-Max normalization scales data to which range?**

- A. [-1, 1]
- B. [0, 1]
- C. [0, 100]
- D. Any range

**3. In k-NN, smaller k values tend to:**

- A. Produce simpler models
- B. Overfit more easily
- C. Underfit more easily
- D. Be less sensitive to noise

**4. Euclidean distance is best suited for:**

- A. Purely categorical features
- B. Purely numerical features
- C. Mixed features
- D. Text data

**5. Standardized data has:**

- A. Minimum 0, maximum 1
- B. Mean 0, standard deviation 1
- C. Mean 1, variance 0
- D. Median 0, range 1

**6. The curse of dimensionality refers to:**

- A. Too few features
- B. Too little data
- C. Distances losing meaning in high dimensions
- D. Algorithms being too complex

**7. k-NN is a:**

- A. Parametric model
- B. Non-parametric model
- C. Deep learning model
- D. Ensemble model

**8. One-hot encoding will:**

- A. Reduce the number of features
- B. Increase the number of features
- C. Keep the number of features the same
- D. Remove features entirely

### True or False

1. Data preprocessing is optional; you can train models directly. (False)
2. k-NN requires no explicit training phase. (True)
3. Normalization and standardization produce identical results. (False)
4. k-NN is insensitive to feature scaling. (False)
5. Manhattan distance is always greater than or equal to Euclidean distance. (False)
6. Outliers must always be removed. (False)
7. k-NN prediction is computationally expensive. (True)
8. Feature engineering can improve model performance. (True)

### Short Answer

**1. Explain the difference between normalization and standardization and when to use each.**

*Sample Answer:* Normalization (Min-Max scaling) scales values into [0, 1], preserving the shape of the distribution, suitable when data is uniformly distributed or zero values must be preserved. Standardization (Z-score) transforms data to mean 0 and standard deviation 1, appropriate when data is approximately normal, contains outliers, or features are on different units.

**2. What are the advantages and disadvantages of k-NN?**

*Sample Answer:* Advantages: simple, intuitive, no training phase, handles non-linear decision boundaries, and works for both classification and regression. Disadvantages: expensive at prediction time, requires storing all training data, sensitive to feature scaling, affected by the curse of dimensionality, and requires careful selection of k.

**3. How can you choose an appropriate k value?**

*Sample Answer:* Use cross-validation to compare performance across different k values, plot accuracy versus k to pick the best trade-off, prefer odd k to avoid ties, use the rule of thumb k = √n, choose smaller k for smaller datasets and larger k for bigger datasets, and adjust based on problem complexity.

### Calculation Exercises

**1. Given A(2, 3) and B(5, 7), compute:**
   a) Euclidean distance
   b) Manhattan distance

*Sample Answer:* a) √[(5-2)² + (7-3)²] = √[9 + 16] = √25 = 5
b) |5-2| + |7-3| = 3 + 4 = 7

**2. Apply Min-Max normalization to values [10, 20, 30, 40, 50] with range [0, 1].**

*Sample Answer:* Using x' = (x − min) / (max − min): min = 10, max = 50. The results are [0, 0.25, 0.5, 0.75, 1].

## 🗺️ Mind Map

```
Data Preprocessing & k-NN
│
├── Data Preprocessing
│    ├── Data Cleaning
│    │    ├── Missing Value Handling
│    │    │    ├── Remove
│    │    │    ├── Fill (mean/median/mode)
│    │    │    └── Interpolate
│    │    ├── Outlier Handling
│    │    │    ├── Detect (box plot / z-score / IQR)
│    │    │    └── Treat (remove / replace / transform)
│    │    └── Remove Duplicates
│    │
│    ├── Data Transformation
│    │    ├── Normalization (Min-Max)
│    │    │    └── Scale to [0, 1]
│    │    ├── Standardization (Z-score)
│    │    │    └── Mean 0, std 1
│    │    └── Categorical Encoding
│    │         ├── Label Encoding
│    │         ├── One-Hot Encoding
│    │         └── Target Encoding
│    │
│    └── Feature Engineering
│         ├── Feature Selection
│         ├── Feature Extraction
│         └── Dimensionality Reduction (PCA)
│
├── k-NN Algorithm
│    ├── Principles
│    │    ├── Instance-based
│    │    ├── Lazy learning
│    │    └── Non-parametric
│    │
│    ├── Distance Metrics
│    │    ├── Euclidean
│    │    ├── Manhattan
│    │    ├── Minkowski
│    │    └── Cosine Similarity
│    │
│    ├── Choosing k
│    │    ├── Cross-validation
│    │    ├── Grid Search
│    │    └── Rule of thumb (√n)
│    │
│    ├── Algorithm Steps
│    │    ├── 1. Compute distances
│    │    ├── 2. Find k nearest neighbors
│    │    ├── 3. Majority vote / averaging
│    │    └── 4. Return prediction
│    │
│    ├── Advantages
│    │    ├── Simple and intuitive
│    │    ├── No training phase
│    │    └── Works for non-linear problems
│    │
│    └── Disadvantages
│         ├── High computational cost
│         ├── Large memory footprint
│         ├── Sensitive to scaling
│         └── Curse of dimensionality
│
├── Application Scenarios
│    ├── Recommendation Systems
│    ├── Image Recognition
│    ├── Text Classification
│    └── Medical Diagnosis
│
└── Optimization Techniques
     ├── KD-Tree
     ├── Ball Tree
     ├── LSH (Locality Sensitive Hashing)
     └── GPU Acceleration
```

## 📖 Learning Resources

### Course Materials

- **02_CST8502_Preprocessing_kNN.pdf**: Comprehensive guide to preprocessing and k-NN

### Recommended Tools

- **Python Libraries**:
  - pandas: Data manipulation
  - scikit-learn: Preprocessing and k-NN implementation
  - numpy: Numerical computation
  - matplotlib / seaborn: Data visualization

### Practice Datasets

- Iris dataset (classification)
- Housing dataset (regression)
- MNIST (image classification)
- Kaggle datasets

## 🎯 Learning Objectives Checklist

After completing this chapter, you should be able to:

- ✅ Identify and treat data quality issues (missing values, outliers, duplicates)
- ✅ Apply normalization and standardization techniques
- ✅ Encode categorical variables effectively
- ✅ Explain how the k-NN algorithm works
- ✅ Compute various distance metrics
- ✅ Select an appropriate k value
- ✅ Build a complete data preprocessing pipeline
- ✅ Use k-NN for classification and regression tasks
- ✅ Evaluate and optimize k-NN performance

---

**Next chapter:** Chapter 3 explores decision trees – a powerful and interpretable classification method.
