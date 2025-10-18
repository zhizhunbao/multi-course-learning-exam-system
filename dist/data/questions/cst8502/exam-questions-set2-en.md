# CST8502 Machine Learning - Comprehensive Exam Question Bank (Set 2)

> **Exam Instructions**: This question bank covers all chapters, including 25 multiple choice questions, 10 fill-in-the-blank questions, short answer questions, 1 confusion matrix calculation question, and 1 decision tree calculation question.
>
> **Total Points**: 55 points
>
> - Multiple Choice: 25 points (1 point each)
> - Fill-in-the-Blank: 10 points (1 point each)
> - Short Answer: 10 points
> - Model Evaluation Calculation (Confusion Matrix): 5 points
> - Decision Tree Calculation: 5 points

---

## 📝 Part 1: Multiple Choice Questions

**Instructions**: 1 point each, 25 points total. Choose the best answer.

### Question 1

**Source: Chapter 1 - Introduction to Machine Learning**

Which of the following tasks is a regression problem?

- A. Image classification
- B. Spam email detection
- C. Stock price prediction
- D. Customer segmentation

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Regression problems predict continuous numerical outputs. Stock price prediction outputs continuous price values, making it a regression problem. Other options are classification or clustering problems.

</details>

---

### Question 2

**Source: Chapter 1 - Introduction to Machine Learning**

What is the main characteristic of reinforcement learning?

- A. Uses labeled data
- B. Learns through rewards and penalties
- C. Discovers data patterns
- D. Reduces data dimensions

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Reinforcement learning interacts with an environment and learns optimal strategies based on received rewards or penalties.

</details>

---

### Question 3

**Source: Chapter 1 - Introduction & Chapter 2 - Data Preprocessing**

In the variance calculation formula, the squared differences are calculated between data points and what value?

- A. Median
- B. Mean
- C. Mode
- D. Maximum

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Variance is the average of squared differences between data points and the mean, with formula $\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \mu)^2$.

</details>

---

### Question 4

**Source: Chapter 2 - Data Preprocessing and k-NN**

What is the formula for Z-score standardization?

- A. (x - min) / (max - min)
- B. (x - mean) / std
- C. x / max
- D. log(x)

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Z-score standardization formula is z = (x - μ) / σ, where μ is the mean and σ is the standard deviation.

</details>

---

### Question 5

**Source: Chapter 2 - Data Preprocessing and k-NN**

In the k-NN algorithm, what problem does an excessively large k value lead to?

- A. Overfitting
- B. Underfitting
- C. Memory overflow
- D. Calculation error

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: An excessively large k value makes the model too simple with overly smooth decision boundaries, leading to underfitting and inability to capture data details.

</details>

---

### Question 6

**Source: Chapter 2 - Data Preprocessing and k-NN**

Manhattan Distance is also known as what?

- A. L2 norm
- B. L1 norm
- C. L∞ norm
- D. Euclidean distance

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Manhattan distance is the L1 norm, with formula $d = \sum_{i=1}^{n}|x_i - y_i|$. Euclidean distance is the L2 norm.

</details>

---

### Question 7

**Source: Chapter 3 - Classification and Decision Trees**

When the entropy of a decision tree node reaches its maximum value, how is the node's purity?

- A. Most pure
- B. Most impure
- C. Medium purity
- D. Cannot determine

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: When entropy is maximum (e.g., in binary classification with equal samples of both classes), the node is most impure. When entropy is 0, the node is most pure.

</details>

---

### Question 8

**Source: Chapter 3 - Classification and Decision Trees**

What is the main improvement of the C4.5 algorithm compared to ID3?

- A. Uses Gini impurity
- B. Uses information gain ratio
- C. Supports regression problems
- D. No pruning needed

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: C4.5 uses gain ratio instead of information gain, reducing bias toward features with many values, and also supports continuous values and missing value handling.

</details>

---

### Question 9

**Source: Chapter 3 - Classification and Decision Trees**

What is the range of Gini Impurity?

- A. [0, 1]
- B. [-1, 1]
- C. [0, ∞)
- D. (-∞, +∞)

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: Gini impurity ranges from [0, 1], where 0 indicates complete purity and larger values indicate more impurity. For binary classification, the maximum is 0.5.

</details>

---

### Question 10

**Source: Chapter 3 - Classification and Decision Trees**

What is the main advantage of Post-pruning compared to Pre-pruning?

- A. Faster
- B. More accurate
- C. Simpler
- D. Less memory usage

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Post-pruning prunes based on the complete tree and is usually more accurate than pre-pruning because it can see the full tree structure before making decisions, avoiding premature stopping.

</details>

---

### Question 11

**Source: Chapter 5 - Outlier Detection**

When using the Z-score method, data points are typically considered outliers when the absolute value of Z-score exceeds what value?

- A. 1
- B. 2
- C. 3
- D. 5

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Typically, data points with |Z| > 3 are considered outliers. This means the point is more than 3 standard deviations from the mean, occurring with about 0.3% probability in a normal distribution.

</details>

---

### Question 12

**Source: Chapter 5 - Outlier Detection**

In the IQR method, what does Q1 represent?

- A. 10th percentile
- B. 25th percentile
- C. 50th percentile
- D. 75th percentile

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Q1 is the first quartile (25th percentile), Q2 is the median (50th percentile), and Q3 is the third quartile (75th percentile).

</details>

---

### Question 13

**Source: Chapter 5 - Outlier Detection**

In the LOF algorithm, if a point's LOF value is close to 1, what does it indicate?

- A. The point is an outlier
- B. The point is normal
- C. Cannot determine
- D. The point is on the boundary

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: LOF ≈ 1 indicates the point's local density is similar to its neighbors, making it a normal point. LOF >> 1 indicates an outlier, LOF < 1 indicates higher density than neighbors.

</details>

---

### Question 14

**Source: Chapter 5 - Outlier Detection**

What is the time complexity of the Isolation Forest algorithm?

- A. O(n²)
- B. O(n log n)
- C. O(n)
- D. O(log n)

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Isolation Forest has an average time complexity of O(n log n), where n is the number of samples. This makes it suitable for large-scale anomaly detection.

</details>

---

### Question 15

**Source: Chapter 5 - Outlier Detection**

Which of the following outlier detection methods does NOT require assumptions about data distribution?

- A. Z-score method
- B. Grubbs test
- C. Isolation Forest
- D. 3σ rule

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Isolation Forest is a tree-based method that doesn't require assumptions about specific data distributions. Z-score, Grubbs test, and 3σ rule all assume normal distribution.

</details>

---

### Question 16

**Source: Chapter 6 - Clustering and k-Means**

What type of learning does the k-Means algorithm belong to?

- A. Supervised learning
- B. Unsupervised learning
- C. Semi-supervised learning
- D. Reinforcement learning

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: k-Means is an unsupervised learning algorithm that doesn't require labeled data and performs clustering based on the intrinsic structure of data.

</details>

---

### Question 17

**Source: Chapter 6 - Clustering and k-Means**

When the silhouette coefficient approaches which value does it indicate the best clustering effect?

- A. -1
- B. 0
- C. 1
- D. Infinity

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: The silhouette coefficient ranges from [-1, 1]. Close to 1 indicates samples are far from other clusters (good clustering); close to -1 indicates possible misassignment; close to 0 indicates on cluster boundary.

</details>

---

### Question 18

**Source: Chapter 6 - Clustering and k-Means**

What is the improvement of k-Means++ compared to standard k-Means?

- A. Uses different distance metrics
- B. Improved centroid initialization strategy
- C. Changed iteration stopping conditions
- D. Automatically determines k value

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: k-Means++ improves clustering quality and convergence speed through intelligent centroid initialization (making initial centroids as far apart as possible).

</details>

---

### Question 19

**Source: Chapter 6 - Clustering and k-Means**

In which situation might k-Means perform poorly?

- A. Clusters are spherical
- B. Clusters have similar sizes
- C. Clusters have complex shapes (non-convex)
- D. Clusters have similar densities

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: k-Means assumes clusters are convex (spherical). For clusters with complex, non-convex shapes (like crescents or rings), performance is poor. Consider using DBSCAN in such cases.

</details>

---

### Question 20

**Source: Chapter 6 - Clustering and k-Means**

In the Elbow Method, what is the "elbow" we're looking for?

- A. The point where WCSS is minimum
- B. The point where WCSS is maximum
- C. The point where WCSS decrease rate significantly slows
- D. The point where k value is maximum

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: The elbow is the inflection point in the WCSS curve where the decrease rate significantly slows, indicating that adding more clusters contributes less to improving clustering, and this k value is typically the optimal choice.

</details>

---

### Question 21

**Source: Chapter 1 - Introduction to Machine Learning**

What typically causes Underfitting?

- A. Model too complex
- B. Model too simple
- C. Too much training data
- D. Too little test data

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Underfitting occurs when the model is too simple to capture the basic patterns in the data, performing poorly on both training and test sets.

</details>

---

### Question 22

**Source: Chapter 1 - Introduction to Machine Learning & Model Evaluation**

In the confusion matrix, what does True Positive (TP) refer to?

- A. Predicted positive, actually positive
- B. Predicted positive, actually negative
- C. Predicted negative, actually positive
- D. Predicted negative, actually negative

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: True Positive (TP) refers to the number of samples that the model predicted as positive and are actually positive. These are correctly classified positive examples.

**Four Indicators in Confusion Matrix**:

- TP (True Positive): Predicted positive, actually positive ✓
- FP (False Positive): Predicted positive, actually negative ✗ (Type I error)
- FN (False Negative): Predicted negative, actually positive ✗ (Type II error)
- TN (True Negative): Predicted negative, actually negative ✓

</details>

---

### Question 23

**Source: Chapter 1 - Introduction to Machine Learning & Model Evaluation**

What is the formula for calculating Accuracy?

- A. TP / (TP + FP)
- B. TP / (TP + FN)
- C. (TP + TN) / (TP + TN + FP + FN)
- D. 2TP / (2TP + FP + FN)

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Accuracy = (TP + TN) / Total samples = (TP + TN) / (TP + TN + FP + FN), representing the proportion of all correct predictions.

**Other Evaluation Metrics**:

- A. Precision = TP / (TP + FP)
- B. Recall/Sensitivity = TP / (TP + FN)
- D. F1-Score = 2TP / (2TP + FP + FN)

</details>

---

### Question 24

**Source: Chapter 1 - Introduction to Machine Learning & Model Evaluation**

Between Precision and Recall, which one focuses more on "among those found as positive, how many are actually positive"?

- A. Precision focuses on this question
- B. Recall focuses on this question
- C. Both focus on it
- D. Neither focuses on it

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**:

- **Precision** = TP / (TP + FP), focuses on "among those found as positive, how many are actually positive" (exactness)
- **Recall** = TP / (TP + FN), focuses on "among actual positives, how many were found" (completeness)

**Memory Tips**:

- Precision → How accurate are the findings
- Recall → How much of the truth was recalled

**Application Scenarios**:

- Spam email detection: Focus more on precision (avoid marking normal emails as spam)
- Cancer detection: Focus more on recall (cannot miss actual cancer cases)

</details>

---

### Question 25

**Source: Chapter 2 - Data Preprocessing and k-NN**

The phenomenon where distance metrics fail in high-dimensional space is called what?

- A. Dimension explosion
- B. Curse of dimensionality
- C. Dimension disaster
- D. Dimension trap

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Curse of Dimensionality refers to the problem that in high-dimensional space, data becomes sparse and distances between all points tend to be similar, causing distance metrics to fail.

</details>

---

## 📝 Part 2: Fill-in-the-Blank Questions

**Instructions**: 1 point each, 10 points total. Fill in with one word or short phrase.

### Question 26

**Source: Chapter 1 - Introduction to Machine Learning & Model Evaluation**

The F1 score is the harmonic mean of \*\*\*\*\_\_\*\*\*\* and \*\*\*\*\_\_\*\*\*\*.

<details>
<summary>View Answer</summary>

**Answer**: Precision and Recall

**Explanation**: F1 = 2 × (Precision × Recall) / (Precision + Recall) = 2TP / (2TP + FP + FN)

</details>

---

### Question 27

**Source: Chapter 1 - Introduction to Machine Learning**

In machine learning, the learning method that does not use labeled data is called \*\*\*\*\_\_\*\*\*\* learning.

<details>
<summary>View Answer</summary>

**Answer**: Unsupervised

</details>

---

### Question 28

**Source: Chapter 2 - Data Preprocessing and k-NN**

The k-NN algorithm doesn't require a training process for prediction; this type of learning is called \*\*\*\*\_\_\*\*\*\* learning.

<details>
<summary>View Answer</summary>

**Answer**: Lazy

</details>

---

### Question 29

**Source: Chapter 3 - Classification and Decision Trees**

In a decision tree, leaf nodes represent \*\*\*\*\_\_\*\*\*\* or predicted values.

<details>
<summary>View Answer</summary>

**Answer**: class (or classification result)

</details>

---

### Question 30

**Source: Chapter 3 - Classification and Decision Trees**

Information gain equals the entropy before splitting minus the \*\*\*\*\_\_\*\*\*\* entropy after splitting.

<details>
<summary>View Answer</summary>

**Answer**: weighted average (or conditional)

</details>

---

### Question 31

**Source: Chapter 5 - Outlier Detection**

The Z-score indicates how many \*\*\*\*\_\_\*\*\*\* a data point is from the mean.

<details>
<summary>View Answer</summary>

**Answer**: standard deviations

</details>

---

### Question 32

**Source: Chapter 5 - Outlier Detection**

In the IQR method, Q2 is also called the \*\*\*\*\_\_\*\*\*\*.

<details>
<summary>View Answer</summary>

**Answer**: median

</details>

---

### Question 33

**Source: Chapter 5 - Outlier Detection**

LOF stands for Local \*\*\*\*\_\_\*\*\*\* Factor.

<details>
<summary>View Answer</summary>

**Answer**: Outlier

</details>

---

### Question 34

**Source: Chapter 6 - Clustering and k-Means**

In the k-Means algorithm, "k" represents the number of \*\*\*\*\_\_\*\*\*\*.

<details>
<summary>View Answer</summary>

**Answer**: clusters

</details>

---

### Question 35

**Source: Chapter 6 - Clustering and k-Means**

The Silhouette Score considers both within-cluster \*\*\*\*\_\_\*\*\*\* and between-cluster \*\*\*\*\_\_\*\*\*\*.

<details>
<summary>View Answer</summary>

**Answer**: cohesion and separation

</details>

---

## 📝 Part 3: Short Answer Questions

**Instructions**: 10 points total. Answer the following questions concisely.

### Question 36 (3 points)

**Source: Chapter 1 - Introduction to Machine Learning**

What are training set, validation set, and test set? What are their respective roles?

<details>
<summary>View Reference Answer</summary>

**Reference Answer**:

**Definitions of Three Datasets** (1.5 points):

- **Training Set**: Used to train the model, allowing it to learn data patterns and regularities
- **Validation Set**: Used to tune model hyperparameters and perform model selection
- **Test Set**: Used to evaluate the final model's generalization performance

**Their Respective Roles** (1.5 points):

- Training Set: Provides learning samples for fitting model parameters
- Validation Set: Helps select the best model and hyperparameters, preventing overfitting
- Test Set: Provides unbiased estimate of model performance, evaluating real-world application effectiveness

**Typical Split Ratio** (additional note): 60%-70% training set, 10%-20% validation set, 10%-20% test set

**Grading Points**:

- Correctly state definitions of three datasets (1.5 points)
- Correctly state their roles (1.5 points)
</details>

---

### Question 37 (4 points)

**Source: Chapter 2 - Data Preprocessing and k-NN**

Compare the differences between normalization (Min-Max Normalization) and standardization (Z-score Standardization), and their respective applicable scenarios.

<details>
<summary>View Reference Answer</summary>

**Reference Answer**:

**Main Differences** (2 points):

- **Normalization**:

  - Formula: $x' = \frac{x - min}{max - min}$
  - Scales data to [0, 1] range
  - Significantly affected by outliers
  - Preserves original data distribution shape

- **Standardization**:
  - Formula: $z = \frac{x - \mu}{\sigma}$
  - Transforms data to mean 0 and standard deviation 1
  - Relatively insensitive to outliers
  - Data follows standard normal distribution

**Applicable Scenarios** (2 points):

- **Normalization suitable for**:

  - Data with clear upper and lower bounds
  - Neural networks (activation functions like sigmoid)
  - Image processing (pixel values 0-255)
  - Data without outliers

- **Standardization suitable for**:
  - Data without clear boundaries
  - Algorithms like logistic regression, SVM
  - Data containing outliers
  - When comparing different features

**Grading Points**:

- Correctly explain differences and formulas of both methods (2 points)
- Correctly explain applicable scenarios (2 points)
</details>

---

### Question 38 (3 points)

**Source: Chapter 3 - Classification and Decision Trees**

Why are decision trees prone to overfitting? List at least three specific methods to prevent decision tree overfitting.

<details>
<summary>View Reference Answer</summary>

**Reference Answer**:

**Why Prone to Overfitting** (1 point):
Decision trees can grow without restriction until they perfectly fit the training data, including noise and outliers. When the tree is too deep or has too many leaf nodes, it memorizes special details of training data rather than learning general patterns, leading to poor performance on new data.

**Methods to Prevent Overfitting** (2 points, 0.5-0.67 points each):

1. **Limit tree depth (max_depth)**: Set maximum depth to prevent tree from becoming too deep
2. **Set minimum samples for splitting (min_samples_split)**: Don't split when node samples are below threshold
3. **Set minimum leaf node samples (min_samples_leaf)**: Ensure leaf nodes have sufficient samples
4. **Post-pruning**: Build complete tree first, then prune branches that don't contribute to validation set performance
5. **Limit number of features (max_features)**: Consider only subset of features for each split
6. **Ensemble methods**: Use random forests, gradient boosting trees, etc.

**Grading Points**:

- Explain why prone to overfitting (1 point)
- List at least 3 specific methods with brief explanations (2 points)
</details>

---

## 📝 Part 4: Decision Tree Calculation Question

**Instructions**: 5 points. Show complete calculation process.

### Question 39 (5 points)

**Source: Chapter 3 - Classification and Decision Trees**

Given the following loan approval dataset, use the ID3 algorithm (based on information gain) to construct the first level of a decision tree (only determine the root node).

**Dataset:**

| No. | Age    | Income | Education | Credit | Approved |
| --- | ------ | ------ | --------- | ------ | -------- |
| 1   | Young  | High   | Bachelor  | Good   | Yes      |
| 2   | Young  | High   | Bachelor  | Good   | Yes      |
| 3   | Middle | High   | Bachelor  | Good   | Yes      |
| 4   | Senior | Medium | Bachelor  | Good   | Yes      |
| 5   | Senior | Low    | College   | Good   | No       |
| 6   | Senior | Low    | College   | Poor   | No       |
| 7   | Middle | Low    | College   | Poor   | No       |
| 8   | Young  | Medium | Bachelor  | Good   | Yes      |
| 9   | Young  | Low    | College   | Poor   | No       |
| 10  | Middle | Medium | College   | Good   | Yes      |

**Requirements**:

1. Calculate the entropy of target variable "Approved" H(Approved) (1 point)
2. Calculate the information gain for feature "Income" IG(Approved, Income) (2 points)
3. Calculate the information gain for feature "Credit" IG(Approved, Credit) (2 points)
4. Determine which feature should be selected as the root node (no need to calculate other features)

**Formula Hints**:

- Entropy: $H(S) = -\sum_{i=1}^{c} p_i \log_2(p_i)$
- Information Gain: $IG(S, A) = H(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} H(S_v)$

<details>
<summary>View Detailed Solution</summary>

**Complete Solution:**

---

**Step 1: Calculate Entropy of Target Variable H(Approved)** (1 point)

Statistics:

- Total samples: 10
- Approved "Yes": 6 (samples 1, 2, 3, 4, 8, 10)
- Approved "No": 4 (samples 5, 6, 7, 9)

Calculate entropy:
$$H(\text{Approved}) = -\frac{6}{10}\log_2(\frac{6}{10}) - \frac{4}{10}\log_2(\frac{4}{10})$$

$$= -0.6 \times (-0.737) - 0.4 \times (-1.322)$$

$$= 0.442 + 0.529 = 0.971$$

**H(Approved) = 0.971**

---

**Step 2: Calculate Information Gain for "Income" Feature** (2 points)

**Statistics for "Income" feature distribution:**

- **High Income**: 3 samples (1, 2, 3)

  - Yes: 3 (1, 2, 3)
  - No: 0
  - $H(\text{High}) = 0$ (Pure!)

- **Medium Income**: 3 samples (4, 8, 10)

  - Yes: 3 (4, 8, 10)
  - No: 0
  - $H(\text{Medium}) = 0$ (Pure!)

- **Low Income**: 4 samples (5, 6, 7, 9)
  - Yes: 0
  - No: 4 (5, 6, 7, 9)
  - $H(\text{Low}) = 0$ (Pure!)

**Calculate weighted average entropy:**
$$H_{\text{Income}} = \frac{3}{10} \times 0 + \frac{3}{10} \times 0 + \frac{4}{10} \times 0 = 0$$

**Calculate information gain:**
$$IG(\text{Approved}, \text{Income}) = 0.971 - 0 = 0.971$$

**IG(Approved, Income) = 0.971** ⭐ (Perfect split!)

---

**Step 3: Calculate Information Gain for "Credit" Feature** (2 points)

**Statistics for "Credit" feature distribution:**

- **Good Credit**: 7 samples (1, 2, 3, 4, 5, 8, 10)

  - Yes: 6 (1, 2, 3, 4, 8, 10)
  - No: 1 (5)
  - $H(\text{Good}) = -\frac{6}{7}\log_2(\frac{6}{7}) - \frac{1}{7}\log_2(\frac{1}{7})$
  - $= -0.857 \times (-0.222) - 0.143 \times (-2.807)$
  - $= 0.190 + 0.401 = 0.591$

- **Poor Credit**: 3 samples (6, 7, 9)
  - Yes: 0
  - No: 3 (6, 7, 9)
  - $H(\text{Poor}) = 0$ (Pure!)

**Calculate weighted average entropy:**
$$H_{\text{Credit}} = \frac{7}{10} \times 0.591 + \frac{3}{10} \times 0 = 0.414$$

**Calculate information gain:**
$$IG(\text{Approved}, \text{Credit}) = 0.971 - 0.414 = 0.557$$

**IG(Approved, Credit) = 0.557**

---

**Step 4: Determine Root Node**

Compare information gains:

- **IG(Approved, Income) = 0.971** ⭐⭐⭐ (Maximum! Perfect split)
- IG(Approved, Credit) = 0.557

**Conclusion: The root node should select the "Income" feature**, because it has the maximum information gain (0.971) and can perfectly split the dataset.

**Analysis**: After selecting "Income", all three child nodes (High, Medium, Low) are pure and don't need further splitting to complete the decision tree construction.

---

**Grading Criteria**:

- Correctly calculate H(Approved) (1 point)
- Correctly calculate IG(Approved, Income), including intermediate steps (2 points)
  - Correctly count each subset (0.5 points)
  - Correctly calculate entropy for each subset (1 point)
  - Correctly calculate information gain (0.5 points)
- Correctly calculate IG(Approved, Credit), including intermediate steps (2 points)
  - Correctly count each subset (0.5 points)
  - Correctly calculate entropy for each subset (1 point)
  - Correctly calculate information gain (0.5 points)
- Partial credit: If calculation method is correct but has arithmetic errors, 80% credit can be awarded

</details>

---

## 🎓 End of Exam

**Total Points: 55 points**

- Multiple Choice (1-25): 25 points
- Fill-in-the-Blank (26-35): 10 points
- Short Answer (36-38): 10 points
- Model Evaluation Calculation (39): 5 points
- Decision Tree Calculation (40): 5 points

---

## 📊 Grading Standards

### A Grade (50-55 points)

- Excellent mastery of all core concepts
- Able to correctly apply algorithms
- Calculation questions have complete steps and accurate results
- Deep understanding of model evaluation metrics and application scenarios

### B Grade (44-49 points)

- Good mastery of most concepts
- Generally able to apply algorithms
- Calculation questions have correct methods, may have minor errors

### C Grade (38-43 points)

- Grasp of basic concepts
- Partially able to apply algorithms
- Understand basic methods for calculation questions

### D Grade (33-37 points)

- Understand some basic concepts
- Weak application ability
- Significant difficulty with calculation questions

### F Grade (<33 points)

- Basic concepts unclear
- Unable to apply algorithms
- Cannot complete calculation questions

---

## 📚 Review Recommendations

### Key Review Content

1. **Chapter 1: Introduction to Machine Learning & Model Evaluation**

   - Definitions and applications of three learning types
   - Roles of training, validation, and test sets
   - Identification and solutions for overfitting and underfitting
   - **Confusion Matrix and Evaluation Metrics** (New Focus!)
     - Meaning of TP, FP, FN, TN
     - Calculation of Accuracy, Precision, Recall, F1 Score
     - Metric selection for different application scenarios (medical, spam, etc.)

2. **Chapter 2: Data Preprocessing and k-NN**

   - Differences between normalization and standardization
   - Advantages and disadvantages of k-NN algorithm
   - Selection of distance measurement methods

3. **Chapter 3: Decision Trees**

   - Manual calculation of entropy and information gain (Important!)
   - Characteristics of different decision tree algorithms
   - Methods to prevent overfitting

4. **Chapter 5: Outlier Detection**

   - Principles and applicable scenarios of various detection methods
   - Statistical-based vs density-based methods
   - Outlier handling strategies

5. **Chapter 6: Clustering**
   - Complete flow of k-Means algorithm
   - Calculation and interpretation of clustering evaluation metrics
   - Methods for selecting k value

### Practice Recommendations

- **Focus on confusion matrix calculation** (New!), understand the four basic indicators and four evaluation metrics
- Do more manual calculations for decision trees, mastering the process of calculating information gain
- Compare advantages, disadvantages, and applicable scenarios of different algorithms
- Understand the meaning of evaluation metrics and judge model performance based on them
- Practice actual operations of data preprocessing
- Understand which evaluation metric to focus on in different application scenarios (medical, recommendation systems, spam, etc.)

---

**Good luck on your exam! 🍀**
