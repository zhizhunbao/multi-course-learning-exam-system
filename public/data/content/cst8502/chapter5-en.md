## 📚 Concepts

### Core Ideas in Outlier Detection

- **Outlier**: A data point that significantly deviates from other observations in a dataset.
- **Outlier Detection**: Identifying observations that do not conform to expected patterns.
- **Anomaly Detection**: Discovering rare events, unusual observations, or suspicious activities.
- **Novelty Detection**: Recognizing new patterns that differ from the training data distribution.

### Types of Outliers

1. **Point Anomalies**
   - A single observation is abnormal.
   - Most common type of anomaly.
   - Example: An unusually high credit card transaction amount.

2. **Contextual Anomalies**
   - An observation is abnormal in a specific context.
   - Depends on situational attributes.
   - Example: A temperature of −10°C during summer.

3. **Collective Anomalies**
   - A group of data points exhibits anomalous behavior collectively.
   - Individual points may appear normal.
   - Example: Suspicious patterns in network traffic.

### Causes of Outliers

- **Data Entry Errors**: Human mistakes during manual data entry.
- **Measurement Errors**: Faulty sensors or instrument inaccuracies.
- **Experimental Errors**: Improper sample handling or preparation.
- **Processing Errors**: Mistakes during computation or data transformation.
- **Natural Variation**: Genuine extreme values in the data.
- **Fraudulent Behavior**: Malicious or deceptive activity.

## 🔍 Explanation

### Statistical Methods

**1. Z-Score Method**
$$z = \frac{x - \mu}{\sigma}$$

- **Rule of Thumb**: |z| > 3 typically indicates an outlier.
- **Assumption**: Data follows a normal distribution.
- **Strengths**: Simple and intuitive.
- **Limitations**: Sensitive to outliers (mean and standard deviation can be skewed).

```python
from scipy import stats
import numpy as np

def detect_outliers_zscore(data, threshold=3):
    z_scores = np.abs(stats.zscore(data))
    return np.where(z_scores > threshold)[0]

# Example
data = [10, 12, 14, 12, 11, 15, 100, 13, 12]
outliers = detect_outliers_zscore(data)
print(f'Outlier indices: {outliers}')
```

**2. Modified Z-Score**

Uses the Median Absolute Deviation (MAD):
$$Modified\ Z = \frac{0.6745(x_i - median)}{MAD}$$
$$MAD = median(|x_i - median|)$$

- **Strengths**: More robust to outliers.
- **Threshold**: Often 3.5.

**3. Interquartile Range (IQR) Method**

$$IQR = Q3 - Q1$$
$$Lower\ Bound = Q1 - 1.5 \times IQR$$
$$Upper\ Bound = Q3 + 1.5 \times IQR$$

- **Q1**: 25th percentile.
- **Q3**: 75th percentile.
- **Strengths**: Robust to outliers and distribution-free.
- **Visualization**: Box plots.

```python
def detect_outliers_iqr(data):
    Q1 = np.percentile(data, 25)
    Q3 = np.percentile(data, 75)
    IQR = Q3 - Q1

    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    outliers = [i for i, x in enumerate(data) if x < lower_bound or x > upper_bound]
    return outliers, lower_bound, upper_bound

# Example
data = [10, 12, 14, 12, 11, 15, 100, 13, 12]
outliers, lower, upper = detect_outliers_iqr(data)
print(f'Outlier indices: {outliers}')
print(f'Normal range: [{lower:.2f}, {upper:.2f}]')
```

### Distance-Based Methods

**1. k-Nearest Neighbor Distance**

- Compute the distance from each point to its k-th nearest neighbor.
- Points with large distances are labeled as outliers.
- **Strengths**: Simple and non-parametric.
- **Limitations**: Computationally expensive; sensitive to the choice of k.

**2. Local Outlier Factor (LOF)**

$$LOF(A) = \frac{\sum_{B \in N_k(A)} \frac{lrd(B)}{lrd(A)}}{|N_k(A)|}$$

Where:
- lrd = local reachability density.
- $N_k(A)$ = k nearest neighbors of A.

**Interpretation:**

- LOF ≈ 1: Similar density as neighbors (normal).
- LOF >> 1: Much lower density than neighbors (anomaly).
- LOF < 1: Higher density than neighbors (normal).

```python
from sklearn.neighbors import LocalOutlierFactor

lof = LocalOutlierFactor(n_neighbors=20, contamination=0.1)
predictions = lof.fit_predict(X)  # -1 = outlier, 1 = normal
scores = lof.negative_outlier_factor_
outliers = np.where(predictions == -1)[0]
print(f'Detected {len(outliers)} outliers')
```

### Density-Based Methods

**DBSCAN (Density-Based Spatial Clustering of Applications with Noise)**

- Points not assigned to any cluster are labeled as noise/outliers.
- **Parameters**:
  - `eps`: Neighborhood radius.
  - `min_samples`: Minimum number of points to form a dense region.

```python
from sklearn.cluster import DBSCAN

dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(X)
outliers = np.where(labels == -1)[0]
print(f'Detected {len(outliers)} outliers')
```

### Machine Learning Methods

**1. Isolation Forest**

**Idea:**

- Outliers are easier to isolate.
- Build random decision trees.
- Anomalies have shorter average path lengths.

```python
from sklearn.ensemble import IsolationForest

iso_forest = IsolationForest(
    n_estimators=100,
    contamination=0.1,
    random_state=42,
)
predictions = iso_forest.fit_predict(X)  # -1 = outlier
outliers = np.where(predictions == -1)[0]
print(f'Detected {len(outliers)} outliers')

scores = iso_forest.score_samples(X)
```

**2. One-Class SVM**

**Idea:**

- Learn the boundary of the normal class in feature space.
- Points outside the boundary are considered anomalies.
- Works well with kernel methods.

```python
from sklearn.svm import OneClassSVM

oc_svm = OneClassSVM(kernel='rbf', nu=0.05, gamma='scale')
predictions = oc_svm.fit_predict(X)
outliers = np.where(predictions == -1)[0]
print(f'Detected {len(outliers)} outliers')
```

**3. Autoencoders**

- Neural networks that learn to reconstruct normal data.
- Reconstruction error increases for anomalies.
- Suitable for high-dimensional or complex data.

```python
import tensorflow as tf
from tensorflow.keras import layers

input_dim = X_train.shape[1]

autoencoder = tf.keras.Sequential([
    layers.Input(shape=(input_dim,)),
    layers.Dense(32, activation='relu'),
    layers.Dense(16, activation='relu'),
    layers.Dense(32, activation='relu'),
    layers.Dense(input_dim, activation='linear'),
])

autoencoder.compile(optimizer='adam', loss='mse')
autoencoder.fit(X_train, X_train, epochs=50, batch_size=32, validation_split=0.1)

reconstructions = autoencoder.predict(X)
errors = np.mean(np.square(X - reconstructions), axis=1)
threshold = np.percentile(errors, 95)
outliers = np.where(errors > threshold)[0]
print(f'Detected {len(outliers)} outliers')
```

### Evaluation Metrics

- **Precision / Recall / F1 Score**: Particularly relevant when anomalies are rare.
- **ROC-AUC / PR-AUC**: Evaluate ranking-based detectors.
- **Confusion Matrix**: Summarize detection performance.
- **Cost-Based Metrics**: Consider the cost of false positives vs. false negatives.

### Practical Workflow

1. Understand the domain and define anomalies.
2. Explore the data; visualize distributions and relationships.
3. Clean data and handle missing values.
4. Choose appropriate detection methods (statistical, distance-based, or ML).
5. Tune hyperparameters and evaluate using labeled or proxy data.
6. Deploy the model and monitor drift or changing behavior.
7. Iterate with feedback from domain experts.

## 📜 History

- **1960s–1970s**: Statistical methods (z-score, Grubbs test) introduced.
- **1980s**: Distance-based and density-based concepts explored.
- **1990s**: Clustering-based approaches and robust statistics gained traction.
- **2000s**: Isolation Forest, LOF, and ensemble methods emerged.
- **2010s to Present**: Deep learning, autoencoders, GANs, and streaming anomaly detection systems.

## 💪 Exercises

### Practice Problems

1. Use z-score and IQR to detect outliers in the dataset `[1, 2, 2, 3, 2, 100, 2, 3, 4]`. Compare the results.
2. Compute the LOF scores for a small 2D dataset and interpret the outcome.
3. Build an Isolation Forest on a synthetic dataset with 5% anomalies and evaluate using precision and recall.
4. Design an autoencoder architecture for anomaly detection on the MNIST dataset. What reconstruction threshold would you choose?
5. Apply DBSCAN to network traffic data and identify potential intrusion patterns.

### Projects

**Project 1: Credit Card Fraud Detection**

- Dataset: Imbalanced credit card transactions with fraud labels.
- Tasks: Explore data, resample if needed, apply Isolation Forest and One-Class SVM, evaluate using precision-recall.

**Project 2: Industrial Sensor Monitoring**

- Dataset: Time-series sensor readings from equipment.
- Tasks: Use rolling z-scores, LOF, and LSTM autoencoders to detect anomalies; visualize events.

**Project 3: Web Traffic Monitoring**

- Dataset: Hourly website visits.
- Tasks: Apply seasonal decomposition, detect contextual anomalies, and use Prophet or ARIMA with anomaly thresholds.

## 🎯 Check Your Understanding

### Multiple Choice

1. Which method is most robust to extreme outliers?
   - A. Standard z-score
   - B. IQR method
   - C. Mean absolute deviation
   - D. Linear regression

2. LOF primarily measures:
   - A. Global distance from mean
   - B. Local density deviation
   - C. Cluster center distance
   - D. Reconstruction error

3. Which algorithm isolates anomalies using random splits?
   - A. DBSCAN
   - B. Isolation Forest
   - C. One-Class SVM
   - D. k-Means

4. The parameter `nu` in One-Class SVM corresponds to:
   - A. Learning rate
   - B. Kernel width
   - C. Upper bound on fraction of anomalies
   - D. Number of neighbors

5. Which of the following best handles contextual anomalies in time series?
   - A. Basic z-score
   - B. LOF
   - C. Seasonal decomposition with residual analysis
   - D. Linear regression without interaction terms

### True or False

1. Isolation Forest requires labeled anomalies for training. (False)
2. IQR works well even when data is heavily skewed. (False)
3. Autoencoders require only normal data for training in novelty detection. (True)
4. DBSCAN can automatically detect the number of clusters. (True)
5. LOF is sensitive to the choice of k neighbors. (True)
6. Z-scores assume a normal distribution. (True)
7. One-Class SVM can use non-linear kernels. (True)
8. Anomaly detection always aims to minimize false positives. (False)

### Short Answer

1. Compare the advantages and disadvantages of Isolation Forest and One-Class SVM.
2. How would you set the contamination parameter when the true anomaly rate is unknown?
3. What strategies can help evaluate anomaly detectors without labeled data?
4. Explain the difference between novelty detection and outlier detection.
5. Describe how to handle concept drift in streaming anomaly detection.

## 🧠 Advanced Topics

- Streaming anomaly detection (e.g., ADWIN, Twitter’s AnomalyDetection).
- Probabilistic models (Gaussian Mixture Models, Bayesian networks).
- Graph-based anomaly detection (community detection, subgraph anomalies).
- Deep generative models (Variational Autoencoders, GAN-based detectors).
- Explainability for anomaly detection (feature attribution, SHAP for Isolation Forest).
- Active learning with human-in-the-loop review systems.

## 🔧 Tooling and Libraries

- **scikit-learn**: IsolationForest, OneClassSVM, LocalOutlierFactor, DBSCAN.
- **PyOD**: A comprehensive Python toolkit for outlier detection.
- **TensorFlow / PyTorch**: Custom autoencoder and deep-learning models.
- **statsmodels**: Time-series decomposition and statistical tests.
- **ELK / Grafana**: Monitoring and alerting pipelines.

## 📖 Learning Resources

- *Outlier Analysis* – Charu C. Aggarwal.
- scikit-learn documentation on anomaly detection.
- PyOD library examples and tutorials.
- Coursera: Anomaly Detection in Time Series Data.
- Kaggle competitions on fraud detection.

## 🎯 Learning Objectives Checklist

After completing this chapter, you should be able to:

- ✅ Define different types of outliers and their causes.
- ✅ Apply statistical, distance-based, and density-based detection methods.
- ✅ Build and tune machine learning models for anomaly detection.
- ✅ Evaluate detectors using appropriate metrics.
- ✅ Implement end-to-end anomaly detection pipelines for real-world problems.
- ✅ Understand advanced techniques such as autoencoders and streaming detection.

---

**Next chapter:** Chapter 6 explores clustering algorithms with a focus on k-means and its practical applications.
