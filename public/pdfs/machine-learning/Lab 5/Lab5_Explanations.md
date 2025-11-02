# Lab 5 Step-by-Step Explanations

## STEP 1: Random Seed

Fixed random seeds (2025) are initialized for both Python's random module and NumPy's random number generator to ensure reproducible results across multiple runs.

---

## STEP 2: Load Data and Print Stats

The Titanic dataset is imported from CSV and basic information is displayed: total instance count, attribute count, and a preview of the first 5 rows.

---

## STEP 3: Quality Check

Missing values are identified and reported. Irrelevant columns (PassengerId, Name, Ticket, Cabin) are removed. Relevant features retained: Pclass, Sex, Age, SibSp, Parch, Fare, Embarked, and Survived.

---

## STEP 4: Creation of New Columns

Numerical data is discretized into categories. AgeGroup: NK (missing), Baby (<3), Child (3-12), Teen (13-19), Adult (20-60), Senior (60+). SibSp and Parch are summed into Relatives, then categorized: None (0), One (1), Few (2-4), Many (5+). Fare groups: Free (0), Low (<50), average (<100), high (≥100).

---

## STEP 5: First 5 Rows

The final feature set is displayed: Pclass, Sex, AgeGroup, RelativesCategory, FareCategory, Embarked, and Survived.

---

## STEP 6: One-Hot Encoding

Categorical variables are converted into binary columns using one-hot encoding. Features and target are separated. Each category becomes its own binary column (0/1).

---

## STEP 7: Train-Test Split

The dataset is split 80% training and 20% testing with stratification to preserve label distribution in both sets.

---

## STEP 8: Model Fitting

A DecisionTreeClassifier is trained on the training set. The tree structure is built by recursive splits on feature conditions.

---

## STEP 9: Prediction, Accuracy, Confusion Matrix

Predictions are made on the test set. Accuracy is the proportion of correct predictions. A confusion matrix summarizes TP, FP, TN, and FN, visualized with a heatmap.

---

## STEP 10: Tree Visualization

The decision tree is visualized. One-hot encoded feature names are mapped to readable labels (e.g., "Sex_male <= 0.5" → "Sex = female") and the tree is displayed with a max depth of 3.

---

## STEP 11: Extract 5 Rules

Five IF-THEN rules are extracted from the tree and printed in human-readable form.

---

## STEP 12: Data Prep for Distance-Based Approach

Data are prepared for kNN: SibSp and Parch are summed into Relatives, and the dataset is split into train and test sets.

---

## STEP 13: Handle Missing Age

Titles are extracted from Name. Average age per title is computed from the training set only. Missing Age values are filled using these averages, then Name and Title are dropped.

---

## STEP 14: Scaling

Numerical features (Age, Relatives, Fare) are standardized (mean 0, std 1) to normalize scales for distance calculations in kNN.

---

## STEP 15: One-Hot Encoding

Categories are one-hot encoded. Categorical missing values are filled with the mode. Train and test sets are aligned to ensure identical feature columns.

---

## STEP 16: kNN Fit & Predict

A KNeighborsClassifier (k=5) is trained. Each test instance is classified by majority vote of its five nearest neighbors. Accuracy and a confusion matrix are computed.

---

## STEP 17: Bonus - RandomForest

RandomForestClassifier aggregates the predictions of multiple trees by voting.

### STEP 17.1: Prepare Data and Create Relatives Feature

Relatives is created by summing SibSp and Parch.

### STEP 17.2: Split into Train/Test Sets First

Train-test split is performed before preprocessing to avoid leakage.

### STEP 17.3: Handle Missing Age

Titles are extracted and used to impute missing ages from training-only statistics; Name and Title are removed.

### STEP 17.4: Handle Other Missing Values

Missing values are filled with the median (numerical) or mode (categorical) from the training set.

### STEP 17.5: Encode Categorical Features Using OrdinalEncoder

Categoricals are mapped to integers via OrdinalEncoder (e.g., Sex: male=0, female=1).

### STEP 17.6: Model Training and Evaluation

RandomForest with 100 trees (max_depth=5) is trained. Accuracy and a confusion matrix are computed and visualized.

### STEP 17.7: Visualize Tree

The first tree from the ensemble is visualized with matplotlib; OrdinalEncoder enables simpler trees without requiring Graphviz.

