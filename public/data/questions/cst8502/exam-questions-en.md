# CST8502 Machine Learning - Comprehensive Exam Question Bank

> **Exam Instructions**: This question bank covers all chapters, including 25 multiple choice questions, 10 fill-in-the-blank questions, short answer questions, and 1 decision tree calculation question.
>
> **Total Points**: 50 points
>
> - Multiple Choice: 25 points (1 point each)
> - Fill-in-the-Blank: 10 points (1 point each)
> - Short Answer: 10 points
> - Decision Tree Calculation: 5 points

---

## 📝 Part 1: Multiple Choice Questions

**Instructions**: 1 point each, 25 points total. Choose the best answer.

### Question 1

**Source: Chapter 1 - Introduction to Machine Learning**

Which of the following is NOT one of the three main types of machine learning?

- A. Supervised Learning
- B. Unsupervised Learning
- C. Deterministic Learning
- D. Reinforcement Learning

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: The three main types of machine learning are supervised learning, unsupervised learning, and reinforcement learning. Deterministic learning is not a standard machine learning classification.

</details>

---

### Question 2

**Source: Chapter 1 - Introduction to Machine Learning**

In supervised learning, spam email detection is what type of problem?

- A. Regression problem
- B. Classification problem
- C. Clustering problem
- D. Dimensionality reduction problem

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Spam email detection requires classifying emails as "spam" or "not spam," which is a binary classification problem.

**Detailed Analysis**:

- **Classification Problem**: Output is discrete class labels (spam/not spam)
- **Supervised Learning**: Requires large amounts of labeled training data to learn classification patterns
- **Binary Classification**: Only two possible output results
- **Feature Extraction**: Classification based on email content, sender, keywords, and other features
- **Application**: Email systems automatically filter spam to improve user experience

**Other Options Analysis**:

- A. Regression Problem: Predicts continuous numerical values, not suitable for classification tasks
- C. Clustering Problem: Unsupervised learning that doesn't require labeled data
- D. Dimensionality Reduction: Reduces data dimensions without involving classification

</details>

---

### Question 3

**Source: Chapter 1 - Introduction & Chapter 2 - Data Preprocessing**

What characteristic of data does Standard Deviation measure?

- A. Central location
- B. Dispersion
- C. Skewness
- D. Correlation

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Standard deviation and variance are both used to measure the degree of dispersion or spread in data.

</details>

---

### Question 4

**Source: Chapter 2 - Data Preprocessing and k-NN**

What range does Min-Max normalization scale data to?

- A. [-1, 1]
- B. [0, 1]
- C. [0, 100]
- D. Any range

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Min-Max normalization formula is x' = (x - min) / (max - min), which scales data to the range [0, 1].

</details>

---

### Question 5

**Source: Chapter 2 - Data Preprocessing and k-NN**

In the k-NN algorithm, what problem does a smaller k value lead to?

- A. Underfitting
- B. Overfitting
- C. Slow computation
- D. Insufficient memory

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: A smaller k value makes the model more complex and more susceptible to noise, leading to overfitting.

</details>

---

### Question 6

**Source: Chapter 2 - Data Preprocessing and k-NN**

Which distance metric is NOT suitable for the k-NN algorithm?

- A. Euclidean distance
- B. Manhattan distance
- C. Cosine similarity
- D. All of the above are suitable

<details>
<summary>View Answer</summary>

**Answer: D**

**Explanation**: k-NN can use multiple distance metrics, including Euclidean distance, Manhattan distance, and cosine similarity.

</details>

---

### Question 7

**Source: Chapter 3 - Classification and Decision Trees**

In decision trees, Information Gain is based on what concept?

- A. Variance
- B. Entropy
- C. Mean
- D. Median

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Information gain is based on the concept of entropy, measuring a feature's contribution to reducing uncertainty.

</details>

---

### Question 8

**Source: Chapter 3 - Classification and Decision Trees**

What criterion does the ID3 algorithm use to select splitting features?

- A. Gini impurity
- B. Information gain
- C. Variance reduction
- D. Chi-square statistic

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The ID3 algorithm uses information gain as the feature selection criterion.

</details>

---

### Question 9

**Source: Chapter 3 - Classification and Decision Trees**

Which algorithm can be used for both classification and regression problems?

- A. ID3
- B. C4.5
- C. CART
- D. All of the above

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: CART (Classification and Regression Trees) can be used for both classification and regression problems, while ID3 and C4.5 are primarily used for classification.

</details>

---

### Question 10

**Source: Chapter 3 - Classification and Decision Trees**

What is the main advantage of Pre-pruning?

- A. More accurate
- B. Faster
- C. More complex
- D. More stable

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Pre-pruning stops splitting early during decision tree construction, making it faster and saving computational resources.

</details>

---

### Question 11

**Source: Chapter 5 - Outlier Detection**

The Z-Score Method assumes data follows what distribution?

- A. Uniform distribution
- B. Normal distribution
- C. Poisson distribution
- D. Exponential distribution

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The Z-score method is based on the normal distribution assumption, using mean and standard deviation to identify outliers.

</details>

---

### Question 12

**Source: Chapter 5 - Outlier Detection**

In the IQR method, what are points beyond Q3 + 1.5×IQR typically considered?

- A. Normal values
- B. Outliers
- C. Missing values
- D. Median

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The IQR method defines outliers as values less than Q1 - 1.5×IQR or greater than Q3 + 1.5×IQR.

</details>

---

### Question 13

**Source: Chapter 5 - Outlier Detection**

The LOF (Local Outlier Factor) algorithm is based on what principle?

- A. Distance
- B. Density
- C. Statistical testing
- D. Clustering

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The LOF algorithm is based on the density principle, comparing each point's local density with its neighbors' local density.

</details>

---

### Question 14

**Source: Chapter 5 - Outlier Detection**

In Isolation Forest, what characterizes outliers?

- A. Longer path length
- B. Shorter path length
- C. Higher density
- D. Closer distance

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Isolation Forest is based on the principle that outliers are easier to "isolate," so outliers have shorter average path lengths.

</details>

---

### Question 15

**Source: Chapter 5 - Outlier Detection**

Autoencoder detection of outliers is based on what metric?

- A. Distance
- B. Density
- C. Reconstruction error
- D. Classification probability

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Autoencoders learn to compress and reconstruct normal data, so outliers typically have larger reconstruction errors.

</details>

---

### Question 16

**Source: Chapter 6 - Clustering and k-Means**

What is the main objective of the k-Means algorithm?

- A. Maximize inter-cluster distance
- B. Minimize Within-Cluster Sum of Squares (WCSS)
- C. Maximize silhouette coefficient
- D. Minimize number of clusters

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The k-Means algorithm aims to minimize the Within-Cluster Sum of Squares (WCSS).

</details>

---

### Question 17

**Source: Chapter 6 - Clustering and k-Means**

What is the range of the Silhouette Score?

- A. [0, 1]
- B. [-1, 1]
- C. [0, ∞)
- D. (-∞, +∞)

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The silhouette coefficient ranges from [-1, 1], where values close to 1 indicate good clustering and values close to -1 indicate possibly incorrect assignment.

</details>

---

### Question 18

**Source: Chapter 6 - Clustering and k-Means**

What aspect of k-Means does the k-Means++ algorithm mainly improve?

- A. Convergence speed
- B. Centroid initialization
- C. Distance calculation
- D. Cluster number selection

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: k-Means++ improves the centroid initialization method, making centroids more dispersed and achieving better clustering results.

</details>

---

### Question 19

**Source: Chapter 6 - Clustering and k-Means**

Which of the following is NOT an assumption of the k-Means algorithm?

- A. Clusters are spherical
- B. Clusters have similar sizes
- C. Clusters have similar densities
- D. Clusters can overlap

<details>
<summary>View Answer</summary>

**Answer: D**

**Explanation**: k-Means assumes clusters are non-overlapping, spherical, and have similar sizes and densities.

</details>

---

### Question 20

**Source: Chapter 6 - Clustering and k-Means**

What is the main advantage of Mini-Batch k-Means?

- A. More accurate
- B. Faster
- C. More stable
- D. Automatically determines cluster number

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Mini-Batch k-Means uses small batches of data for iteration, greatly improving computational speed and making it suitable for large datasets.

</details>

---

### Question 21

**Source: Chapter 1 - Introduction to Machine Learning**

What is the typical characteristic of Overfitting?

- A. Poor performance on both training and test sets
- B. Good performance on training set, poor on test set
- C. Poor performance on training set, good on test set
- D. Good performance on both training and test sets

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Overfitting means the model performs well on training data but poorly on test data, losing generalization ability.

</details>

---

### Question 22

**Source: Chapter 1 - Introduction to Machine Learning**

What is the main purpose of Cross-Validation?

- A. Speed up training
- B. Evaluate model generalization ability
- C. Reduce memory usage
- D. Simplify the model

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Cross-validation evaluates a model's generalization ability by training and testing on different data subsets.

</details>

---

### Question 23

**Source: Chapter 2 - Data Preprocessing and k-NN**

Which of the following is NOT a common method for handling missing values?

- A. Delete rows with missing values
- B. Fill with mean
- C. Fill with random values
- D. Interpolation

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Filling with random values is not a common missing value handling method because it introduces additional noise. Common methods include deletion, filling with mean/median/mode, and interpolation.

</details>

---

### Question 24

**Source: Chapter 2 - Data Preprocessing and k-NN**

What effect does One-Hot Encoding have on the number of features?

- A. Decreases the number of features
- B. Increases the number of features
- C. Keeps the number of features unchanged
- D. Deletes features

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: One-hot encoding converts one categorical feature into multiple binary features, thus increasing the number of features.

</details>

---

### Question 25

**Source: Chapter 2 - Data Preprocessing and k-NN**

What problem does the Curse of Dimensionality refer to?

- A. Too few features
- B. Too little data
- C. Distance loses meaning in high-dimensional space
- D. Algorithm too complex

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: The curse of dimensionality refers to the problem that in high-dimensional space, distance metrics become ineffective and distances between all points tend to be similar.

</details>

---

## 📝 Part 2: Fill-in-the-Blank Questions

**Instructions**: 1 point each, 10 points total. Fill in with one word or short phrase.

### Question 26

**Source: Chapter 1 - Introduction to Machine Learning**

In machine learning, the learning method that uses labeled data for training is called \***\*\_\_\*\*** learning.

<details>
<summary>View Answer</summary>

**Answer**: Supervised

</details>

---

### Question 27

**Source: Chapter 2 - Data Preprocessing and k-NN**

After Z-score Normalization, the data has a mean of 0 and a standard deviation of \***\*\_\_\*\***.

<details>
<summary>View Answer</summary>

**Answer**: 1

</details>

---

### Question 28

**Source: Chapter 2 - Data Preprocessing and k-NN**

In the k-NN algorithm, "k" represents the number of nearest \***\*\_\_\*\***.

<details>
<summary>View Answer</summary>

**Answer**: neighbors

</details>

---

### Question 29

**Source: Chapter 3 - Classification and Decision Trees**

In a decision tree, an entropy of 0 indicates that the node is \***\*\_\_\*\*** (completely pure).

<details>
<summary>View Answer</summary>

**Answer**: pure

</details>

---

### Question 30

**Source: Chapter 3 - Classification and Decision Trees**

The CART algorithm uses \***\*\_\_\*\*** impurity as the splitting criterion.

<details>
<summary>View Answer</summary>

**Answer**: Gini

</details>

---

### Question 31

**Source: Chapter 5 - Outlier Detection**

IQR is the third quartile (Q3) minus the first quartile (Q1), representing the \***\*\_\_\*\*** range.

<details>
<summary>View Answer</summary>

**Answer**: Interquartile (or middle 50%)

</details>

---

### Question 32

**Source: Chapter 5 - Outlier Detection**

In the LOF algorithm, an LOF value much greater than 1 indicates that the point is an \***\*\_\_\*\***.

<details>
<summary>View Answer</summary>

**Answer**: outlier

</details>

---

### Question 33

**Source: Chapter 5 - Outlier Detection**

The Isolation Forest algorithm is based on an ensemble of \***\*\_\_\*\*** decision trees.

<details>
<summary>View Answer</summary>

**Answer**: random

</details>

---

### Question 34

**Source: Chapter 6 - Clustering and k-Means**

In the k-Means algorithm, the center point of a cluster is called a \***\*\_\_\*\***.

<details>
<summary>View Answer</summary>

**Answer**: centroid

</details>

---

### Question 35

**Source: Chapter 6 - Clustering and k-Means**

The Elbow Method selects the optimal number of clusters by plotting \***\*\_\_\*\*** against k values.

<details>
<summary>View Answer</summary>

**Answer**: WCSS (or Within-Cluster Sum of Squares)

</details>

---

## 📝 Part 3: Short Answer Questions

**Instructions**: 10 points total. Answer the following questions concisely.

### Question 36 (3 points)

**Source: Chapter 1 - Introduction to Machine Learning**

Explain the main differences between supervised learning and unsupervised learning, and provide one application example for each.

<details>
<summary>View Reference Answer</summary>

**Reference Answer**:

**Main Differences** (1.5 points):

- Supervised learning uses labeled data (with inputs and corresponding correct outputs), aiming to learn the mapping relationship from inputs to outputs.
- Unsupervised learning uses unlabeled data, aiming to discover hidden patterns and structures in the data.

**Application Examples** (1.5 points):

- Supervised learning: spam email detection, house price prediction, image classification
- Unsupervised learning: customer segmentation, anomaly detection, topic discovery

**Grading Points**:

- Clearly explain the difference in data labeling (1 point)
- Explain the difference in learning objectives (0.5 points)
- At least one correct example for each type (1.5 points)
</details>

---

### Question 37 (4 points)

**Source: Chapter 2 - Data Preprocessing and k-NN**

What are the advantages and disadvantages of the k-NN algorithm? Explain how to choose an appropriate k value.

<details>
<summary>View Reference Answer</summary>

**Reference Answer**:

**Advantages** (1.5 points):

- Simple and easy to understand and implement
- No training process required (lazy learning)
- Works well with non-linear data
- Can be used for both classification and regression

**Disadvantages** (1.5 points):

- High computational cost (needs to calculate distances to all points)
- High memory requirements (needs to store all training data)
- Sensitive to feature scaling
- Affected by the curse of dimensionality

**Choosing k Value** (1 point):

- Use cross-validation to evaluate performance of different k values
- Plot k value vs. performance curve
- Consider odd k values to avoid ties
- Rule of thumb: k ≈ √n
- Small k → overfitting, large k → underfitting

**Grading Points**:

- List at least 3 advantages (1.5 points)
- List at least 3 disadvantages (1.5 points)
- Explain k value selection methods (1 point)
</details>

---

### Question 38 (3 points)

**Source: Chapter 1 - Introduction & Chapter 3 - Decision Trees**

What is overfitting? How can overfitting in decision trees be avoided?

<details>
<summary>View Reference Answer</summary>

**Reference Answer**:

**Overfitting Definition** (1 point):
Overfitting occurs when a model performs very well on training data but poorly on new data (test data), because the model has learned noise and special details in the training data, losing generalization ability.

**Avoidance Methods** (2 points):

- **Pre-pruning**: Limit maximum depth, minimum samples for splitting, minimum samples per leaf node
- **Post-pruning**: Build the complete tree first, then remove unnecessary branches
- **Use validation set**: Evaluate model performance on independent data
- **Ensemble methods**: Use random forests, gradient boosting, etc.
- **Regularization**: Cost complexity pruning

**Grading Points**:

- Clear definition of overfitting (1 point)
- List at least 3 avoidance methods (2 points)
</details>

---

## 📝 Part 4: Decision Tree Calculation Question

**Instructions**: 5 points. Show complete calculation process.

### Question 39 (5 points)

**Source: Chapter 3 - Classification and Decision Trees**

Given the following weather dataset, use the ID3 algorithm (based on information gain) to construct the first level of a decision tree (only determine the root node).

**Dataset:**

| No. | Weather  | Temperature | Humidity | Wind   | Play |
| --- | -------- | ----------- | -------- | ------ | ---- |
| 1   | Sunny    | Hot         | High     | Weak   | No   |
| 2   | Sunny    | Hot         | High     | Strong | No   |
| 3   | Overcast | Hot         | High     | Weak   | Yes  |
| 4   | Rain     | Mild        | High     | Weak   | Yes  |
| 5   | Rain     | Cool        | Normal   | Weak   | Yes  |
| 6   | Rain     | Cool        | Normal   | Strong | No   |
| 7   | Overcast | Cool        | Normal   | Strong | Yes  |
| 8   | Sunny    | Mild        | High     | Weak   | No   |
| 9   | Sunny    | Cool        | Normal   | Weak   | Yes  |
| 10  | Rain     | Mild        | Normal   | Weak   | Yes  |

**Requirements**:

1. Calculate the entropy of target variable "Play" H(Play) (1 point)
2. Calculate the information gain for feature "Weather" IG(Play, Weather) (2 points)
3. Calculate the information gain for feature "Humidity" IG(Play, Humidity) (2 points)
4. Determine which feature should be selected as the root node (no need to calculate other features)

**Formula Hints**:

- Entropy: $H(S) = -\sum_{i=1}^{c} p_i \log_2(p_i)$
- Information Gain: $IG(S, A) = H(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} H(S_v)$

<details>
<summary>View Detailed Solution</summary>

**Complete Solution:**

---

**Step 1: Calculate Entropy of Target Variable H(Play)** (1 point)

Statistics:

- Total samples: 10
- Play "Yes": 6 (samples 3, 4, 5, 7, 9, 10)
- Play "No": 4 (samples 1, 2, 6, 8)

Calculate entropy:
$$H(Play) = -\frac{6}{10}\log_2(\frac{6}{10}) - \frac{4}{10}\log_2(\frac{4}{10})$$

$$= -0.6 \times (-0.737) - 0.4 \times (-1.322)$$

$$= 0.442 + 0.529 = 0.971$$

**H(Play) = 0.971**

---

**Step 2: Calculate Information Gain for "Weather" Feature** (2 points)

**Statistics for "Weather" feature distribution:**

- **Sunny**: 4 samples (1, 2, 8, 9)

  - Yes: 1 (9)
  - No: 3 (1, 2, 8)
  - $H(Sunny) = -\frac{1}{4}\log_2(\frac{1}{4}) - \frac{3}{4}\log_2(\frac{3}{4})$
  - $= -0.25 \times (-2) - 0.75 \times (-0.415)$
  - $= 0.5 + 0.311 = 0.811$

- **Overcast**: 2 samples (3, 7)

  - Yes: 2 (3, 7)
  - No: 0
  - $H(Overcast) = 0$ (Pure!)

- **Rain**: 4 samples (4, 5, 6, 10)
  - Yes: 3 (4, 5, 10)
  - No: 1 (6)
  - $H(Rain) = -\frac{3}{4}\log_2(\frac{3}{4}) - \frac{1}{4}\log_2(\frac{1}{4})$
  - $= -0.75 \times (-0.415) - 0.25 \times (-2)$
  - $= 0.311 + 0.5 = 0.811$

**Calculate weighted average entropy:**
$$H_{Weather} = \frac{4}{10} \times 0.811 + \frac{2}{10} \times 0 + \frac{4}{10} \times 0.811$$
$$= 0.324 + 0 + 0.324 = 0.648$$

**Calculate information gain:**
$$IG(Play, Weather) = 0.971 - 0.648 = 0.323$$

**IG(Play, Weather) = 0.323**

---

**Step 3: Calculate Information Gain for "Humidity" Feature** (2 points)

**Statistics for "Humidity" feature distribution:**

- **High**: 5 samples (1, 2, 3, 4, 8)

  - Yes: 2 (3, 4)
  - No: 3 (1, 2, 8)
  - $H(High) = -\frac{2}{5}\log_2(\frac{2}{5}) - \frac{3}{5}\log_2(\frac{3}{5})$
  - $= -0.4 \times (-1.322) - 0.6 \times (-0.737)$
  - $= 0.529 + 0.442 = 0.971$

- **Normal**: 5 samples (5, 6, 7, 9, 10)
  - Yes: 4 (5, 7, 9, 10)
  - No: 1 (6)
  - $H(Normal) = -\frac{4}{5}\log_2(\frac{4}{5}) - \frac{1}{5}\log_2(\frac{1}{5})$
  - $= -0.8 \times (-0.322) - 0.2 \times (-2.322)$
  - $= 0.258 + 0.464 = 0.722$

**Calculate weighted average entropy:**
$$H_{Humidity} = \frac{5}{10} \times 0.971 + \frac{5}{10} \times 0.722$$
$$= 0.486 + 0.361 = 0.847$$

**Calculate information gain:**
$$IG(Play, Humidity) = 0.971 - 0.847 = 0.124$$

**IG(Play, Humidity) = 0.124**

---

**Step 4: Determine Root Node**

Compare information gains:

- **IG(Play, Weather) = 0.323** ⭐ (Maximum)
- IG(Play, Humidity) = 0.124

**Conclusion: The root node should select the "Weather" feature**, because it has the maximum information gain.

---

**Grading Criteria**:

- Correctly calculate H(Play) (1 point)
- Correctly calculate IG(Play, Weather), including intermediate steps (2 points)
  - Correctly count each subset (0.5 points)
  - Correctly calculate entropy for each subset (1 point)
  - Correctly calculate information gain (0.5 points)
- Correctly calculate IG(Play, Humidity), including intermediate steps (2 points)
  - Correctly count each subset (0.5 points)
  - Correctly calculate entropy for each subset (1 point)
  - Correctly calculate information gain (0.5 points)
- Partial credit: If the calculation method is correct but has arithmetic errors, 80% credit can be awarded

</details>

---

## 🎓 End of Exam

**Total Points: 50 points**

- Multiple Choice (1-25): 25 points
- Fill-in-the-Blank (26-35): 10 points
- Short Answer (36-38): 10 points
- Decision Tree Calculation (39): 5 points

---

## 📊 Grading Standards

### A Grade (45-50 points)

- Excellent mastery of all core concepts
- Able to correctly apply algorithms
- Calculation questions have complete steps and accurate results

### B Grade (40-44 points)

- Good mastery of most concepts
- Generally able to apply algorithms
- Calculation questions have correct methods, may have minor errors

### C Grade (35-39 points)

- Grasp of basic concepts
- Partially able to apply algorithms
- Understand basic methods for calculation questions

### D Grade (30-34 points)

- Understand some basic concepts
- Weak application ability
- Significant difficulty with calculation questions

### F Grade (<30 points)

- Basic concepts unclear
- Unable to apply algorithms
- Cannot complete calculation questions

---

## 📚 Review Recommendations

### Key Review Content

1. **Chapter 1: Introduction to Machine Learning**

   - Differences between the three learning types
   - Overfitting and underfitting
   - Basic statistical concepts

2. **Chapter 2: Data Preprocessing and k-NN**

   - Formulas and applications of normalization and standardization
   - k-NN algorithm principles and k value selection
   - Distance measurement methods

3. **Chapter 3: Decision Trees**

   - Calculation of entropy and information gain (Important!)
   - Differences between ID3, C4.5, and CART
   - Pruning techniques

4. **Chapter 5: Outlier Detection**

   - Z-score method and IQR method
   - LOF and Isolation Forest principles
   - Outlier handling strategies

5. **Chapter 6: Clustering**
   - k-Means algorithm steps
   - WCSS and silhouette coefficient
   - k value selection methods

### Practice Recommendations

- Do more manual calculations, especially entropy and information gain for decision trees
- Understand the advantages, disadvantages, and applicable scenarios of each algorithm
- Be able to compare characteristics of different algorithms
- Master the meaning and calculation of evaluation metrics

---

**Good luck on your exam! 🍀**
