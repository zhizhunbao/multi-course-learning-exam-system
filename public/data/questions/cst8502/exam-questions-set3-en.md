# CST8502 Machine Learning - Comprehensive Exam Question Bank (Set 3)

> **Exam Instructions**: This question bank covers all chapters, including 25 multiple choice questions, 10 fill-in-the-blank questions, short answer questions, 1 KNN calculation problem, and 1 model evaluation calculation problem.
>
> **Total Score**: 55 points
>
> - Multiple Choice: 25 points (1 point each)
> - Fill in the Blanks: 10 points (1 point each)
> - Short Answer: 10 points
> - KNN Algorithm Calculation: 5 points
> - Model Evaluation (ROC Curve): 5 points

---

## 📝 Part 1: Multiple Choice Questions

**Instructions**: 1 point each, 25 points total. Choose the best answer.

### Question 1

**Source: Chapter 1 - Introduction to Machine Learning**

What is the essence of how machine learning algorithms learn from data?

- A. Memorizing all training data
- B. Discovering patterns and regularities in data
- C. Randomly generating prediction results
- D. Copying human thought processes

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The core of machine learning is discovering patterns and regularities in data and using these patterns to make predictions or decisions on new data. It's not simple memorization or random generation.

</details>

---

### Question 2

**Source: Chapter 1 - Introduction to Machine Learning**

Which application scenario is most suitable for unsupervised learning?

- A. Handwritten digit recognition
- B. House price prediction
- C. Customer market segmentation
- D. Spam filtering

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Customer market segmentation is a typical clustering problem, which belongs to unsupervised learning. Other options require labeled data and belong to supervised learning.

</details>

---

### Question 3

**Source: Chapter 1 - Introduction to Machine Learning**

What is a typical ratio for training set, validation set, and test set?

- A. 50% / 25% / 25%
- B. 70% / 15% / 15%
- C. 80% / 10% / 10%
- D. 60% / 20% / 20%

<details>
<summary>View Answer</summary>

**Answer: D**

**Explanation**: A common dataset split ratio is 60% training, 20% validation, 20% test. Other ratios like 70/15/15 or 80/10/10 are also used, but 60/20/20 is more common and balanced.

</details>

---

### Question 4

**Source: Chapter 2 - Python Basics**

What is the main advantage of NumPy arrays compared to Python lists?

- A. Easier to understand
- B. Faster computation speed
- C. Uses more memory
- D. Supports more data types

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: NumPy arrays use contiguous memory blocks and vectorized operations, making computation much faster than Python lists.

</details>

---

### Question 5

**Source: Chapter 2 - Python Basics**

What are the methods in Pandas for handling missing values?

- A. `fillna()` and `dropna()`
- B. `remove()` and `add()`
- C. `delete()` and `insert()`
- D. `clear()` and `set()`

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: `fillna()` is used to fill missing values, and `dropna()` is used to remove rows or columns containing missing values.

</details>

---

### Question 6

**Source: Chapter 3 - Linear Regression**

What is the goal of linear regression to minimize?

- A. Sum of predicted values
- B. Residual Sum of Squares (RSS)
- C. Number of features
- D. Number of samples

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Linear regression finds the best fit line by minimizing the Residual Sum of Squares (RSS) or Mean Squared Error (MSE).

</details>

---

### Question 7

**Source: Chapter 3 - Linear Regression**

What problem does multicollinearity cause?

- A. Faster model training
- B. Unstable coefficient estimation
- C. Improved prediction accuracy
- D. Increased data volume

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Multicollinearity occurs when features are highly correlated, causing unstable regression coefficient estimates and making it difficult to interpret each feature's independent effect.

</details>

---

### Question 8

**Source: Chapter 3 - Linear Regression**

What regularization method does Ridge regression use?

- A. L0 regularization
- B. L1 regularization
- C. L2 regularization
- D. L3 regularization

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Ridge regression uses L2 regularization (sum of squared coefficients), while Lasso regression uses L1 regularization (sum of absolute coefficients).

</details>

---

### Question 9

**Source: Chapter 4 - Logistic Regression**

What function does logistic regression use to convert linear output to probability?

- A. ReLU function
- B. Sigmoid function
- C. Tanh function
- D. Softmax function

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Logistic regression uses the Sigmoid function (also called Logistic function) to compress linear output to between 0-1, representing probability.

</details>

---

### Question 10

**Source: Chapter 4 - Logistic Regression**

In a binary classification problem, what happens if you increase the classification threshold?

- A. Precision decreases, recall increases
- B. Precision increases, recall decreases
- C. Both precision and recall increase
- D. Both precision and recall decrease

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Increasing the threshold means stricter criteria for positive class prediction, reducing false positives (increasing precision) but also increasing false negatives (decreasing recall).

</details>

---

### Question 11

**Source: Chapter 4 - Logistic Regression**

What technique is commonly used for multi-class logistic regression?

- A. One-vs-Rest (OvR)
- B. K-means
- C. PCA
- D. Decision Boundary

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: Multi-class problems can be solved using One-vs-Rest (one-vs-all) or Softmax regression.

</details>

---

### Question 12

**Source: Chapter 5 - Decision Trees**

Which parameter in decision trees controls the maximum depth of the tree?

- A. `n_estimators`
- B. `max_depth`
- C. `learning_rate`
- D. `n_neighbors`

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The `max_depth` parameter limits the maximum depth of the decision tree to prevent overfitting.

</details>

---

### Question 13

**Source: Chapter 5 - Decision Trees**

What metric is information gain based on?

- A. Mean Squared Error
- B. Entropy
- C. Accuracy
- D. Recall

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Information gain is based on the concept of entropy, measuring how much a feature reduces the uncertainty in the dataset.

</details>

---

### Question 14

**Source: Chapter 5 - Decision Trees**

Which of the following is NOT a purpose of decision tree pruning?

- A. Prevent overfitting
- B. Improve generalization ability
- C. Increase training speed
- D. Simplify the model

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: The main purposes of pruning are to prevent overfitting, improve generalization, and simplify the model, not to increase training speed.

</details>

---

### Question 15

**Source: Chapter 6 - Random Forest**

What type of learning method does random forest belong to?

- A. Single model
- B. Ensemble learning
- C. Deep learning
- D. Reinforcement learning

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Random forest is an ensemble learning method that improves prediction performance by combining multiple decision trees.

</details>

---

### Question 16

**Source: Chapter 6 - Random Forest**

What are the two aspects of "randomness" in random forest?

- A. Random samples and random features
- B. Random weights and random biases
- C. Random depth and random width
- D. Random training and random testing

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: The randomness in random forest comes from: 1) Bootstrap sampling (random samples), 2) randomly selecting a subset of features at each split.

</details>

---

### Question 17

**Source: Chapter 6 - Random Forest**

What is the main purpose of Bagging?

- A. Increase model complexity
- B. Reduce variance and prevent overfitting
- C. Increase bias
- D. Speed up training

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Bagging trains multiple models and averages their predictions, which can reduce variance and improve model stability.

</details>

---

### Question 18

**Source: Chapter 7 - K-Nearest Neighbors**

What type of learning algorithm is KNN?

- A. Parametric model
- B. Non-parametric model
- C. Probabilistic model
- D. Linear model

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: KNN is a non-parametric model that doesn't require training parameters but uses training data directly during prediction.

</details>

---

### Question 19

**Source: Chapter 7 - K-Nearest Neighbors**

How does the choice of K value affect the KNN model?

- A. Larger K makes the model more complex
- B. Smaller K makes decision boundaries smoother
- C. Larger K makes the model more robust to noise
- D. K value doesn't affect model performance

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Larger K values make decision boundaries smoother and more robust to noise, but may lead to underfitting. Smaller K values are more sensitive and prone to overfitting.

</details>

---

### Question 20

**Source: Chapter 7 - K-Nearest Neighbors**

Why is feature scaling needed before using KNN?

- A. Speed up training
- B. Prevent distance calculation from being dominated by large-valued features
- C. Reduce memory usage
- D. Improve interpretability

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: KNN is based on distance calculation. If features have different scales, large-valued features will dominate the distance calculation, so standardization is needed.

</details>

---

### Question 21

**Source: Chapter 8 - Support Vector Machines**

What is the goal of Support Vector Machines?

- A. Minimize classification errors
- B. Maximize the margin
- C. Minimize number of features
- D. Maximize number of samples

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: SVM's goal is to find the maximum margin hyperplane, maximizing the margin between two classes.

</details>

---

### Question 22

**Source: Chapter 8 - Support Vector Machines**

What is the role of kernel functions in SVM?

- A. Speed up training
- B. Map data to high-dimensional space
- C. Reduce number of features
- D. Decrease model complexity

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Kernel functions (such as RBF) implicitly map data to high-dimensional space, making linearly inseparable data linearly separable in high-dimensional space.

</details>

---

### Question 23

**Source: Chapter 9 - Clustering Analysis**

What does the K-means algorithm aim to minimize?

- A. Inter-cluster distance
- B. Within-Cluster Sum of Squares (WCSS)
- C. Total number of samples
- D. Number of features

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: K-means aims to minimize the Within-Cluster Sum of Squares (WCSS), making each cluster as compact as possible internally.

</details>

---

### Question 24

**Source: Chapter 9 - Clustering Analysis**

What is the advantage of Hierarchical Clustering?

- A. No need to specify the number of clusters in advance
- B. Fastest computation
- C. Only handles numerical data
- D. Uses least memory

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: Hierarchical clustering generates a dendrogram, allowing selection of any number of clusters by cutting the tree, without needing to specify in advance.

</details>

---

### Question 25

**Source: Chapter 10 - Dimensionality Reduction**

What is the main goal of PCA?

- A. Increase data dimensions
- B. Preserve directions of maximum variance
- C. Improve classification accuracy
- D. Generate new features

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: PCA (Principal Component Analysis) projects data onto directions of maximum variance (principal components) through linear transformation, thereby reducing dimensionality.

</details>

---

## 📝 Part 2: Fill in the Blanks

**Instructions**: 1 point each, 10 points total.

### Question 1

**Source: Chapter 1**

Machine learning can be divided into three main categories: **\_\_**, unsupervised learning, and reinforcement learning.

<details>
<summary>View Answer</summary>

**Answer**: Supervised learning

</details>

---

### Question 2

**Source: Chapter 2**

In Pandas, **\_\_** is the primary data structure for storing two-dimensional tabular data.

<details>
<summary>View Answer</summary>

**Answer**: DataFrame

</details>

---

### Question 3

**Source: Chapter 3**

In linear regression, **\_\_** is a commonly used metric for measuring goodness of fit, with a value range from 0 to 1.

<details>
<summary>View Answer</summary>

**Answer**: R² (R-squared / Coefficient of Determination)

</details>

---

### Question 4

**Source: Chapter 4**

The loss function for logistic regression is called **\_\_**, also known as log loss.

<details>
<summary>View Answer</summary>

**Answer**: Cross-Entropy Loss / Log Loss

</details>

---

### Question 5

**Source: Chapter 5**

In decision trees, two commonly used metrics for measuring node purity are Gini impurity and **\_\_**.

<details>
<summary>View Answer</summary>

**Answer**: Entropy / Information Entropy

</details>

---

### Question 6

**Source: Chapter 6**

Random forest uses **\_\_** technique to sample with replacement from the original dataset.

<details>
<summary>View Answer</summary>

**Answer**: Bootstrap / Bootstrap sampling

</details>

---

### Question 7

**Source: Chapter 7**

Common distance metrics in KNN algorithm include Euclidean distance, Manhattan distance, and **\_\_** distance.

<details>
<summary>View Answer</summary>

**Answer**: Minkowski distance / Cosine distance

</details>

---

### Question 8

**Source: Chapter 8**

In SVM, the training samples closest to the decision boundary are called **\_\_**.

<details>
<summary>View Answer</summary>

**Answer**: Support Vectors

</details>

---

### Question 9

**Source: Chapter 9**

**\_\_** is a method for determining the optimal number of clusters in K-means by plotting WCSS against K values.

<details>
<summary>View Answer</summary>

**Answer**: Elbow Method

</details>

---

### Question 10

**Source: Chapter 10**

t-SNE is a **\_\_** dimensionality reduction technique, primarily used for visualization of high-dimensional data.

<details>
<summary>View Answer</summary>

**Answer**: Non-linear / Nonlinear

</details>

---

## 📝 Part 3: Short Answer Questions

**Instructions**: 10 points total. Please answer concisely and clearly.

### Question 1 (5 points)

**Source: Comprehensive Application**

**Question**: Explain the concept of Bias-Variance Tradeoff and how to balance these two in practical applications?

<details>
<summary>View Reference Answer</summary>

**Reference Answer**:

**Concept of Bias-Variance Tradeoff** (3 points):

1. **Bias**: The difference between model predictions and true values, reflecting the degree of underfitting

   - High bias: Model is too simple, cannot capture true data patterns (underfitting)

2. **Variance**: The variability of model predictions across different training datasets, reflecting the degree of overfitting

   - High variance: Model is too complex, overly sensitive to training data (overfitting)

3. **Tradeoff relationship**: Reducing bias usually increases variance, and vice versa

**Balancing Methods** (2 points):

1. **Model complexity adjustment**:

   - Choose models with appropriate complexity
   - Use cross-validation to select the best model

2. **Regularization**:

   - L1/L2 regularization to control model complexity
   - Decision tree pruning

3. **Ensemble methods**:

   - Bagging reduces variance
   - Boosting reduces bias

4. **Feature engineering**:
   - Add meaningful features to reduce bias
   - Remove redundant features to reduce variance

</details>

---

### Question 2 (5 points)

**Source: Comprehensive Application**

**Question**: Compare the advantages and disadvantages of Random Forest and Gradient Boosting, and explain when to choose which algorithm?

<details>
<summary>View Reference Answer</summary>

**Reference Answer**:

**Random Forest** (2.5 points):

**Advantages**:

- Parallel training, fast speed
- Robust to noise and outliers
- Not prone to overfitting
- Minimal hyperparameter tuning needed

**Disadvantages**:

- Larger model size, more memory usage
- Prediction performance may be lower than Boosting
- Difficult to interpret

**Gradient Boosting** (2.5 points):

**Advantages**:

- Usually higher prediction accuracy
- Can handle various loss functions
- More reliable feature importance

**Disadvantages**:

- Sequential training, slower
- Prone to overfitting, requires careful tuning
- Sensitive to noise
- Long training time

**Selection Guidelines**:

**Choose Random Forest**:

- Data has noise and outliers
- Need fast training
- Limited computational resources
- Accuracy requirements are not extremely high

**Choose Gradient Boosting**:

- Need highest prediction accuracy
- Data quality is good
- Have sufficient time for tuning
- Can tolerate longer training time

</details>

---

## 📝 Part 4: Computational Problems

### Question 1: KNN Algorithm Calculation (5 points)

**Source: Chapter 7 - K-Nearest Neighbors**

**Question**:

Given the following training dataset, use KNN algorithm (K=3) with Euclidean distance to predict the class of new sample X = (6, 5).

| Sample | Feature 1 | Feature 2 | Class |
| ------ | --------- | --------- | ----- |
| A      | 2         | 3         | Red   |
| B      | 4         | 5         | Red   |
| C      | 3         | 2         | Blue  |
| D      | 7         | 6         | Blue  |
| E      | 8         | 7         | Blue  |
| F      | 5         | 4         | Red   |

Please calculate:

1. Euclidean distance from new sample X to each training sample (2 points)
2. Find K=3 nearest neighbors (1 point)
3. Predict the class of X (1 point)
4. Would the prediction change if K=5? Why? (1 point)

<details>
<summary>View Detailed Solution</summary>

**Solution**:

**Step 1: Calculate Euclidean distances** (2 points)

Euclidean distance formula: $d = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$

New sample X = (6, 5)

- d(X, A) = √[(6-2)² + (5-3)²] = √[16 + 4] = √20 = **4.47**
- d(X, B) = √[(6-4)² + (5-5)²] = √[4 + 0] = √4 = **2.00**
- d(X, C) = √[(6-3)² + (5-2)²] = √[9 + 9] = √18 = **4.24**
- d(X, D) = √[(6-7)² + (5-6)²] = √[1 + 1] = √2 = **1.41**
- d(X, E) = √[(6-8)² + (5-7)²] = √[4 + 4] = √8 = **2.83**
- d(X, F) = √[(6-5)² + (5-4)²] = √[1 + 1] = √2 = **1.41**

**Step 2: Find K=3 nearest neighbors** (1 point)

Sorted by distance:

1. D: 1.41 (Blue)
2. F: 1.41 (Red)
3. B: 2.00 (Red)
4. E: 2.83 (Blue)
5. C: 4.24 (Blue)
6. A: 4.47 (Red)

K=3 nearest neighbors: D (Blue), F (Red), B (Red)

**Step 3: Predict class** (1 point)

Vote count:

- Red: 2 votes (F, B)
- Blue: 1 vote (D)

**Prediction: Red**

**Step 4: If K=5** (1 point)

K=5 nearest neighbors: D (Blue), F (Red), B (Red), E (Blue), C (Blue)

Vote count:

- Red: 2 votes
- Blue: 3 votes

**K=5 Prediction: Blue**

**Conclusion**: Yes, the prediction changes to Blue when K=5. This shows that the choice of K value affects the prediction result, and the optimal K should be selected through cross-validation.

</details>

---

### Question 2: Model Evaluation (ROC Curve) (5 points)

**Source: Model Evaluation**

**Question**:

A binary classification model's predicted probabilities for 10 test samples are shown in the table below:

| Sample | True Label | Predicted Probability |
| ------ | ---------- | --------------------- |
| 1      | Positive   | 0.90                  |
| 2      | Positive   | 0.85                  |
| 3      | Negative   | 0.75                  |
| 4      | Positive   | 0.70                  |
| 5      | Negative   | 0.60                  |
| 6      | Positive   | 0.55                  |
| 7      | Negative   | 0.50                  |
| 8      | Negative   | 0.40                  |
| 9      | Positive   | 0.35                  |
| 10     | Negative   | 0.20                  |

Please complete:

1. Calculate the confusion matrix when threshold is 0.60 (1 point)
2. Calculate TPR (True Positive Rate) and FPR (False Positive Rate) at this threshold (2 points)
3. How do TPR and FPR change if threshold is changed to 0.50? (1 point)
4. Explain the meaning of ROC curve and the range of AUC (1 point)

<details>
<summary>View Detailed Solution</summary>

**Solution**:

**Step 1: Confusion matrix at threshold 0.60** (1 point)

Predicted as positive (probability ≥ 0.60): Samples 1, 2, 3, 4, 5
Predicted as negative (probability < 0.60): Samples 6, 7, 8, 9, 10

True labels:

- Positive: Samples 1, 2, 4, 6, 9
- Negative: Samples 3, 5, 7, 8, 10

Confusion Matrix:

|                     | Predicted Positive | Predicted Negative |
| ------------------- | ------------------ | ------------------ |
| **Actual Positive** | 3 (TP)             | 2 (FN)             |
| **Actual Negative** | 2 (FP)             | 3 (TN)             |

- TP (True Positive) = 3 (Samples 1, 2, 4)
- FP (False Positive) = 2 (Samples 3, 5)
- FN (False Negative) = 2 (Samples 6, 9)
- TN (True Negative) = 3 (Samples 7, 8, 10)

**Step 2: Calculate TPR and FPR** (2 points)

**TPR (True Positive Rate / Recall / Sensitivity)**:
$$TPR = \frac{TP}{TP + FN} = \frac{3}{3 + 2} = \frac{3}{5} = 0.60$$

**FPR (False Positive Rate)**:
$$FPR = \frac{FP}{FP + TN} = \frac{2}{2 + 3} = \frac{2}{5} = 0.40$$

**Step 3: Changes when threshold is 0.50** (1 point)

At threshold 0.50:

- Predicted as positive: Samples 1, 2, 3, 4, 5, 6, 7
- Predicted as negative: Samples 8, 9, 10

New confusion matrix:

- TP = 4 (Samples 1, 2, 4, 6)
- FP = 3 (Samples 3, 5, 7)
- FN = 1 (Sample 9)
- TN = 2 (Samples 8, 10)

New metrics:

- TPR = 4/(4+1) = 0.80 (increased)
- FPR = 3/(3+2) = 0.60 (increased)

**Conclusion**: Lowering the threshold causes more samples to be predicted as positive, increasing both TPR and FPR.

**Step 4: ROC Curve and AUC** (1 point)

**ROC Curve (Receiver Operating Characteristic Curve)**:

- X-axis: FPR (False Positive Rate)
- Y-axis: TPR (True Positive Rate)
- Plot different (FPR, TPR) points by varying the classification threshold

**AUC (Area Under Curve)**:

- Represents the area under the ROC curve
- Range: **0.5 to 1.0**
- AUC = 0.5: Random guessing
- AUC = 1.0: Perfect classifier
- AUC > 0.8: Generally considered a good model

**Significance**: ROC curve and AUC provide threshold-independent model performance evaluation, suitable for imbalanced class situations.

</details>

---

## 📚 Exam Tips

1. **Understand concepts**: Don't memorize mechanically, understand the principles and applicable scenarios of each algorithm
2. **Practice coding**: Practice implementations, become familiar with scikit-learn library
3. **Calculation practice**: Master distance calculations, decision tree construction, confusion matrix, etc.
4. **Comparative summary**: Create algorithm comparison tables, understand advantages and disadvantages of each
5. **Pay attention to details**: Note parameter meanings, evaluation metric formulas

## 🎯 Key Chapters

- ⭐⭐⭐ Chapter 4 (Logistic Regression): Classification basics, Sigmoid function, evaluation metrics
- ⭐⭐⭐ Chapter 5 (Decision Trees): Information gain, Gini impurity, tree construction
- ⭐⭐⭐ Chapter 6 (Random Forest): Ensemble learning, Bootstrap, feature importance
- ⭐⭐⭐ Chapter 7 (KNN): Distance metrics, K value selection, feature scaling
- ⭐⭐ Chapter 3 (Linear Regression): Least squares, regularization, model evaluation
- ⭐⭐ Chapter 8 (SVM): Support vectors, kernel functions, margin maximization

---

**Good luck with your exam! 🍀**
