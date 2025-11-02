# CST8502 - Lab 5 Python

# CST8502 - 实验 5 Python

**Due Date:** Check Brightspace for due dates.
**截止日期：** 请查看 Brightspace 了解截止日期。

---

## Introduction

## 简介

The goal of this lab is to perform classification using Decision Trees and kNN on Titanic dataset in Python. All tasks should be done in Python.
本实验的目标是在 Python 中使用决策树和 kNN 对泰坦尼克号数据集进行分类。所有任务都应在 Python 中完成。

**Set the random seed as 2025.** Once this is set, it ensures consistent randomness across the script. You can do this by setting `random_state` in various methods and seed for random and numpy (after importing corresponding libraries, you can set `random.seed(2025)` and `np.random.seed(2025)`).
**将随机种子设置为 2025。** 一旦设置好，它将确保脚本中随机性的一致性。你可以通过在 various 方法中设置 `random_state` 以及为 random 和 numpy 设置种子来实现（在导入相应库后，你可以设置 `random.seed(2025)` 和 `np.random.seed(2025)`）。

Make sure to follow every step as given in this document. Otherwise, your answers will be different and autograder will mark it wrong.
请确保按照本文档中的每个步骤进行操作。否则，你的答案将有所不同，自动评分器会将其标记为错误。

---

## Steps

## 步骤

All these steps should be done in Python:
所有这些步骤都应在 Python 中完成：

### Decision Tree Classification

### 决策树分类

1. **Set random seed.**
   **设置随机种子。**
2. **Load the given titanic.csv file** and print number of instances, attributes and first 5 instances (this print should be with corresponding messages like "Number of instances: xxx" etc).
   **加载给定的 titanic.csv 文件**并打印实例数量、属性数量和前 5 个实例（此打印应该带有相应的消息，如"实例数：xxx"等）。
3. **Check for data quality issues** and remove all irrelevant columns.
   **检查数据质量问题**并删除所有不相关的列。
4. **Create new columns** for AgeGroup, Relatives and Fare (Free if 0, Low if less than 50, average if less than 100, high otherwise). (Refer to lab 3 for instructions for AgeGroup and Relatives)
   **创建新列**用于年龄组（AgeGroup）、亲属（Relatives）和票价（Fare）（如果为 0 则为免费，小于 50 则为低价，小于 100 则为平均价，否则为高价）。（有关年龄组和亲属的说明，请参考实验 3）
5. **Print the first 5 rows.** You should have Passenger class, sex, age group, relatives, fare and embarked as attributes.
   **打印前 5 行。** 你应该有乘客等级、性别、年龄组、亲属、票价和登船地点作为属性。
6. Scikit-learn decision tree will not accept categorical data, so, **apply one-hot encoding** to convert the attributes to binary.
   Scikit-learn 决策树不接受分类数据，因此，**应用独热编码**将属性转换为二进制。
7. **Split data into train and test set.** (Refer to https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html)
   **将数据拆分为训练集和测试集。** （参考 https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html）
8. **Fit Decision Tree model** in Scikit-learn Package for the train set. (Refer to https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html#sklearn.tree.DecisionTreeClassifier)
   **拟合决策树模型**在 Scikit-learn 包中的训练集上。（参考 https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html#sklearn.tree.DecisionTreeClassifier）
9. **Predict the survival for the test set.** Print accuracy and confusion matrix.
   **预测测试集的生存情况。** 打印准确率和混淆矩阵。
10. **Visualize the decision tree** (tree should be readable).
    **可视化决策树**（树应该是可读的）。
11. **Write 5 rules** in the answer document.
    **在答案文档中写下 5 条规则。**

### kNN Classification

### kNN 分类

12. Now, **prepare dataset for distance-based methods.** Start with the original dataset and split into test and train sets. Make sure to have passenger class, sex, age, number of relatives, fare, and embarked as attributes.
    现在，**准备用于基于距离方法的数据集。** 从原始数据集开始，拆分为测试集和训练集。确保有乘客等级、性别、年龄、亲属数量、票价和登船地点作为属性。
13. **Extract the passenger title** (e.g., Mr., Mrs., Master, etc.) from each name. Next, calculate the average age for each title group using only passengers with valid age values. Finally, replace the missing age values with the corresponding group average based on the passenger's title.
    **提取乘客头衔**（例如，先生、夫人、少爷等）从每个姓名中。接下来，仅使用具有有效年龄值的乘客计算每个头衔组的平均年龄。最后，根据乘客的头衔，用相应的组平均值替换缺失的年龄值。
14. **Numerical columns** like Fare, Age etc. should be normalized. When you normalize, fit the scaler on train set and apply the scaler on the train and test set.
    **数值列**如票价、年龄等应进行归一化。当你归一化时，在训练集上拟合缩放器，然后在训练集和测试集上应用缩放器。
15. **Categorical columns** like PClass, Embarked etc. should be one-hot encoded.
    **分类列**如乘客等级、登船地点等应进行独热编码。
16. **Perform classification using kNN** and print the results. (https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html)
    **使用 kNN 执行分类**并打印结果。（https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html）

### Bonus

### 加分项

17. **Bonus:** As a bonus activity, you can try other tree-based classifiers that takes nominal columns as is (without one-hot encoding) and creates tree model. If you try any other models that works with nominal columns, make sure to fit a tree on the train set and test it with the test set. Print confusion matrix, accuracy and then visualize the tree. This should be separate from the rest of the code and should be done as a separate section.
    **加分项：** 作为加分活动，你可以尝试其他基于树的分类器，这些分类器可以直接使用标称列（无需独热编码）并创建树模型。如果你尝试任何其他与标称列配合使用的模型，请确保在训练集上拟合树并用测试集对其进行测试。打印混淆矩阵、准确率，然后可视化树。这应该与其余代码分开，并作为单独的部分完成。

---

## Submission Requirements

## 提交要求

To get grades:
要获得成绩：

1. You should be ready with your Python code and results.
   你应该准备好你的 Python 代码和结果。
2. Submit your answer document AND colab notebook/jupyter notebook. Failure to submit any of these will end up in a grade of 0 for the lab.
   提交你的答案文档以及 colab 笔记本/jupyter 笔记本。未能提交任何一项将导致实验成绩为 0。
3. **DO NOT ZIP.** Zipped files will not be graded.
   **不要压缩文件。** 压缩的文件不会被评分。

---
