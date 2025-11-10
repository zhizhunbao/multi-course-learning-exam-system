General Prep
exclude all different IDs
remove duplicates
generate IDs
set correct data types
set role for class column

Modeling

- supervised
  - classification: KNN, DT, RF, LR
  - regression: simple, multiple, multivariate
- unsupervised
  - clustering: KMeans
  - outlier detection: LOF, ISF, clustering

Regression
Simple: one independent factor decides one dependent factor
Multiple: multiple independent factors decide one dependent factor
Multivariate: multiple independent factors decide multiple
Logistic: classification task using regression concept

a1, a2, a3
w1, w2, w3
w1a1 + w2a2 + w3a3 + bias --> continuous value ->

w1a1 + w2a2 + w3a3 + bias --> function --> c1, c2

## Neural Networks - Multi-layer Perceptron (MLP)

<img src="./10_CST8502_NeuralNetworks4_images/page_008_img_01.png" alt="图片" width="55%" />

5 5 5

### 🔥 期末考点：hidden_layer_sizes 参数解读

**例子：** `hidden_layer_sizes = (25, 15, 5, 3)`

**解读规则：**

- **层数（layers）：** 元组中元素的个数 = 4 层
- **每层的节点数：**
  - Layer 1: 25 nodes
  - Layer 2: 15 nodes
  - Layer 3: 5 nodes
  - Layer 4: 3 nodes

**关键点：**

- 元组的长度 = 隐藏层的数量
- 元组中的每个数字 = 该层中神经元的数量
- 元组是有序的，从左到右依次对应第 1 层、第 2 层、第 3 层...

**更多例子：**

- `(50,)` → 1 个隐藏层，50 个节点
- `(100, 50)` → 2 个隐藏层，第 1 层 100 个节点，第 2 层 50 个节点
- `(64, 32, 16)` → 3 个隐藏层，分别有 64、32、16 个节点

dataset

divide into train & test

initialize your model

fit the model on train set -> model

using the model, predict for test set - predicted class

now we have actual class, predicted class

compare these to find confusion matrix, accuracy etc. ,
