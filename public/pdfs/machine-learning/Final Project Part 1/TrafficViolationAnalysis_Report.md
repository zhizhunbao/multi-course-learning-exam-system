
# 1. Introduction

Traffic violations present significant challenges for urban traffic management
systems worldwide. Understanding patterns and contributing factors in traffic
violations can help law enforcement agencies allocate resources more effectively,
improve road safety, and reduce traffic-related incidents.

This project applies machine learning techniques to analyze traffic violation
data from Montgomery County, aiming to identify key factors that contribute to
different types of violations and detect anomalous patterns in the data.

Project Title: Discovering Contributing Factors to Traffic Violations -
A Comprehensive Machine Learning Approach Using Classification, Clustering,
and Anomaly Detection

Authors:

- Joseph Weng - 041076091
- Hye Ran Yoo - 041145212
- Peng Wang - 041107730


# 2. Business Understanding

## 2.1. Determine business objectives

Classification Question:
"What are the key contributing factors that lead to different types of traffic
violations in Montgomery County?"

This question will be answered through classification analysis using decision
trees, which will identify the most important factors (such as time, location,
vehicle characteristics, etc.) that determine different violation types.

Primary Business Objectives:

1. Enhance Public Safety

   - Identify patterns in traffic violations to improve road safety
   - Reduce traffic-related accidents and incidents

2. Optimize Resource Allocation

   - Help law enforcement agencies allocate patrol resources more efficiently
   - Focus enforcement efforts on high-risk areas and time periods

3. Improve Traffic Management

   - Understand contributing factors to traffic violations
   - Develop targeted prevention strategies based on data insights

4. Detect Anomalies
   - Identify unusual patterns or outliers that may indicate:
     - Fraudulent activities
     - Data quality issues
     - Systemic problems requiring investigation


## 2.2. Assess situation

Available Resources:

- Montgomery County Traffic Violations dataset (covering multiple years)
- Machine learning expertise and tools (Python, scikit-learn, pandas, etc.)
- Computing resources for data processing and analysis
- Team of 3 data scientists with complementary skills

Constraints:

- Data quality and completeness may vary across different time periods
- Privacy considerations in handling personal and location information
- Need to balance between data granularity and computational efficiency
- Project timeline: Part 1 due Nov 7, Part 2 due Nov 21, Presentations Nov 24-Dec 5

Assumptions:

- Historical traffic violation patterns can inform future prevention strategies
- Data contains sufficient information to identify meaningful patterns
- Violations are consistently reported and recorded across the dataset timeframe
- Selected features have predictive power for violation types

Risks:

- Data availability risks: Data may be incomplete, inconsistent across time
  periods, or have missing critical fields that could affect analysis quality
- Technical risks: Selected algorithms may not perform well on this dataset,
  computational resources may be insufficient for large-scale processing
- Timeline risks: Data cleaning and preparation may take longer than expected,
  model tuning may require more iterations than anticipated


## 2.3. Determine data mining goals

Required by project instructions - Three main data mining tasks:

1. Classification Task (Decision Tree)
   Goal: Build a decision tree model to identify key contributing factors that
    lead to different types of traffic violations
   Target Variable: Violation Type (class variable)
   Features: Time, location, vehicle characteristics, driver demographics, etc.
   Success Criteria:

   - Model achieves reasonable accuracy (>70%)
   - Decision tree rules are interpretable and actionable
   - Feature importance rankings provide meaningful insights

2. Clustering Task (KMeans)
   Goal: Group similar violations together to identify common patterns
   Expected Patterns:

   - High-risk time periods (rush hours, weekends, holidays)
   - Geographic hotspots (specific locations or regions)
   - Violation combinations (e.g., speeding + no seatbelt)
      Success Criteria:
   - Clustering results reveal meaningful and interpretable groups
   - Clusters show distinct characteristics
   - Optimal k value determined using elbow method

3. Outlier Detection (LOF + Distance-based methods)
   Goal: Identify anomalous violations that deviate significantly from normal
    patterns
   Potential Outliers:
   - Data errors or inconsistencies
   - Unusual circumstances (extreme weather, special events)
   - Fraudulent activities requiring investigation
      Success Criteria:
   - Outlier detection identifies genuinely unusual cases
   - Both methods (LOF and distance-based) produce consistent results
   - Detected outliers warrant further investigation

Data Mining Success Criteria:

- All three tasks completed with documented methodology
- Results are interpretable and provide actionable insights
- Models validated using appropriate evaluation metrics
- Cross-validation applied for classification task


## 2.4. Produce project plan

Project Implementation Plan:

Tool Selection: Python (scikit-learn, pandas, numpy, matplotlib, seaborn)

Workload Distribution:

| Team Member                 | Primary Task                       | Responsibilities                                                                  |
| --------------------------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| **Hye Ran Yoo** (041145212) | Classification (Decision Tree)     | • Data preparation<br>• Build DT model<br>• Cross-validation<br>• Interpret rules |
| **Joseph Weng** (041076091) | Clustering (KMeans)                | • Feature selection<br>• Elbow method<br>• Build clusters<br>• Interpret groups   |
| **Peng Wang** (041107730)   | Outlier Detection (LOF + Distance) | • LOF method<br>• Distance method<br>• Combine results<br>• Analyze outliers      |
| **All Members**             | Shared Responsibilities            | • Data exploration<br>• Documentation<br>• Presentation prep                      |

Project Timeline:

Phase 1: Business Understanding & Data Understanding (Week 1-2)

- Define business objectives and data mining goals
- Collect and explore initial data
- Perform data quality assessment
- Due: November 7, 2025

Phase 2: Data Preparation (Week 2-3)

- Clean and preprocess data
- Handle missing values and outliers
- Feature engineering and selection
- Create separate datasets for each task

Phase 3: Modeling & Evaluation (Week 3-4)

- Build classification model (Joseph)
- Build clustering model (Hye Ran)
- Build outlier detection models (Peng)
- Validate and tune models
- Due: November 21, 2025

Phase 4: Presentation Preparation (Week 4-5)

- Interpret results and extract insights
- Create presentation slides
- Practice presentation
- Presentations: November 24 - December 5, 2025

Key Milestones:
✓ Part 1 Submission: November 7, 2025

- Sections 1-3 (Introduction, Business Understanding, Data Understanding)
- Sections 4.1, 5.1, 6.1 (Data Preparation for each task)

✓ Part 2 Submission: November 21, 2025

- Complete modeling and evaluation sections
- Final report and code files

✓ Final Presentation: November 24 - December 5, 2025

- 30-minute team presentation
- ~10 minutes per team member


# 3. Data Understanding

## 3.1. Collect initial data

Dataset loaded: 2,057,983 records × 43 columns from D:\BaiduSyncdisk\workspace\algonquin_workspace\multi-course-learning-exam-system\public\pdfs\machine-learning\Final Project Part 1\TrafficViolations.csv

## 3.2. Describe data

Data description: 3 numeric, 27 categorical, 12 boolean columns

## 3.3. Explore data

Data exploration: 3 numeric, 12 boolean, 26 categorical variables visualized

![Figure 1](images/figure_001.png)


![Figure 2](images/figure_002.png)


Time Of Stop:
  - Unique values: 1,440
  - Missing values: 0 (0.00%)
  - Most frequent:
    - 23:30:00: 2,996 (0.1%)
  - Note: High cardinality (1,440 unique values) - consider grouping for analysis

Agency:
  - Unique values: 1
  - Missing values: 0 (0.00%)
  - Top values:
    - MCP: 2,057,983 (100.0%)

SubAgency:
  - Unique values: 9
  - Missing values: 0 (0.00%)
  - Top values:
    - 4th District, Wheaton: 447,698 (21.8%)
    - 3rd District, Silver Spring: 372,089 (18.1%)
    - 2nd District, Bethesda: 323,290 (15.7%)
    - 6th District, Gaithersburg / Montgomery Village: 260,216 (12.6%)
    - 5th District, Germantown: 244,108 (11.9%)
    - 1st District, Rockville: 239,625 (11.6%)
    - Headquarters and Special Operations: 170,947 (8.3%)
    - W15: 7 (0.0%)
    - S15: 3 (0.0%)

Description:
  - Unique values: 17,721
  - Missing values: 10 (0.00%)
  - Most frequent:
    - DRIVER FAILURE TO OBEY PROPERLY PLACED TRAFFIC CONTROL DEVICE INSTRUCTIONS: 170,319 (8.3%)
  - Note: High cardinality (17,721 unique values) - consider grouping for analysis

Location:
  - Unique values: 268,060
  - Missing values: 4 (0.00%)
  - Most frequent:
    - MONTGOMERY VILLAGE AVE @ RUSSELL AVE: 2,447 (0.1%)
  - Note: High cardinality (268,060 unique values) - consider grouping for analysis

Search Disposition:
  - Unique values: 7
  - Missing values: 1,968,671 (95.66%)
  - Top values:
    - Nothing: 38,752 (1.9%)
    - Contraband Only: 22,814 (1.1%)
    - Property Only: 14,763 (0.7%)
    - Contraband and Property: 12,964 (0.6%)
    - DUI: 12 (0.0%)
    - marijuana: 4 (0.0%)
    - nothing: 3 (0.0%)

Search Outcome:
  - Unique values: 5
  - Missing values: 801,209 (38.93%)
  - Top values:
    - Warning: 633,691 (30.8%)
    - Citation: 523,988 (25.5%)
    - Arrest: 62,634 (3.0%)
    - SERO: 36,458 (1.8%)
    - Recovered Evidence: 3 (0.0%)

Search Reason:
  - Unique values: 10
  - Missing values: 1,968,671 (95.66%)
  - Top values:
    - Incident to Arrest: 51,592 (2.5%)
    - Probable Cause: 21,676 (1.1%)
    - Consensual: 12,409 (0.6%)
    - K-9: 1,969 (0.1%)
    - Other: 1,119 (0.1%)
    - Exigent Circumstances: 535 (0.0%)
    - Probable Cause for CDS: 5 (0.0%)
    - plain view marijuana: 3 (0.0%)
    - Arrest/Tow: 3 (0.0%)
    - DUI: 1 (0.0%)

Search Reason For Stop:
  - Unique values: 836
  - Missing values: 782,221 (38.01%)
  - Most frequent:
    - 21-201(a1): 153,138 (7.4%)
  - Note: High cardinality (836 unique values) - consider grouping for analysis

Search Type:
  - Unique values: 6
  - Missing values: 1,968,679 (95.66%)
  - Top values:
    - Both: 66,906 (3.3%)
    - Property: 11,952 (0.6%)
    - Person: 10,436 (0.5%)
    - car: 4 (0.0%)
    - PC: 3 (0.0%)
    - Search Incidental: 3 (0.0%)

## 3.4. Verify data quality

Data quality: 887,412 duplicates, 17 columns with missing values

![Figure 3](images/figure_003.png)


# 4. Classification by Decision Tree

## 4.1. Data Preparation for Classification

### 4.1.1. Select data

Classification setup: 24 features selected for predicting Violation Type

![Figure 4](images/figure_004.png)


### 4.1.2. Clean data

Data cleaning: 2,057,983 → 1,170,571 (removed 887,412 duplicates) → 1,170,083 rows (after removing missing target), 3 classes retained

![Figure 5](images/figure_005.png)


### 4.1.3. Construct data

Feature engineering: Created 6 new temporal and vehicle features

![Figure 6](images/figure_006.png)


### 4.1.4. Integrate data

Feature integration: 23 features integrated across 5 categories

![Figure 7](images/figure_007.png)


### 4.1.5. Format data

Data formatting: 1,170,083 samples × 23 features, 3 classes prepared

![Figure 8](images/figure_008.png)


## 4.2. Modelling

### 4.2.1. Select modeling techniques

Model selection: Decision Tree Classifier (interpretable, suitable for classification)

### 4.2.2. Generate test design

Test design: Train/Test split 70%/30% with stratification + Cross-validation (5-fold CV) for model validation (as per project requirements)

![Figure 9](images/figure_009.png)


### 4.2.3. Build model

Model Performance: Training accuracy: 64.25% | Test accuracy: 64.24%

![Figure 10](images/figure_010.png)


### 4.2.4. Assess model

Model Assessment: Train accuracy 64.25%, Test accuracy 64.24%, CV accuracy 63.69% (±0.62%)
Top 3 Features: Contributed To Accident (38.7%), VehicleAge (17.8%), Hour (16.6%)

![Figure 11](images/figure_011.png)


![Figure 12](images/figure_012.png)


## 4.3. Evaluation

### 4.3.1. Evaluate results

Model Performance: Train 64.25% | Test 64.24% | CV 63.69% (±1.24%)

![Figure 13](images/figure_013.png)


### 4.3.2. Interpret results

Confusion Matrix: 3×3 classification results

![Figure 14](images/figure_014.png)


### 4.3.3. Review of process

Process review: Complete workflow from data preparation to model evaluation

![Figure 15](images/figure_015.png)


### 4.3.4. Determine next steps

Classification complete: 3 classes, 23 features, Test accuracy 64.24%

![Figure 16](images/figure_016.png)


# 5. Clustering by KMeans

## 5.1. Data Preparation for Clustering

### 5.1.1. Select Data - Select and justify features for clustering

Clustering setup: 17 features selected for pattern discovery

![Figure 17](images/figure_017.png)


### 5.1.2. Clean Data

Data cleaning: 2,057,983 → 2,057,983 rows (removed rows with missing coordinates; no rows removed as all coordinates were present)

![Figure 18](images/figure_018.png)


### 5.1.3. Construct Data - Feature Engineering

Feature engineering: Created 7 features (6 temporal/vehicle, 1 geographic region)
- Temporal/Vehicle: mean VehicleAge=17.3yr
- Geographic: 8 regions created from Latitude/Longitude clustering

![Figure 19](images/figure_019.png)


### 5.1.4. Integrate Data

Feature integration: 19 features across 5 categories

![Figure 20](images/figure_020.png)


### 5.1.5. Format Data - Encode, scale, and validate

Data formatting: Encoded 5 categorical, scaled 10,000 × 19 features

![Figure 21](images/figure_021.png)


## 5.2. Modelling

### 5.2.1. Select modeling techniques

Model selection: KMeans Clustering (unsupervised, pattern identification, interpretable)

### 5.2.2. Generate test design

Test design: Elbow Method + Silhouette + Davies-Bouldin, testing k=2-10

![Figure 22](images/figure_022.png)


Selected optimal k: 4

### 5.2.3. Build model

KMeans Clustering: k=4, Silhouette=0.212, DB=1.547, Inertia=153065

![Figure 23](images/figure_023.png)


### 5.2.4. Assess model

Cluster Characteristics: 4 clusters analyzed with key features

![Figure 24](images/figure_024.png)


![Figure 25](images/figure_025.png)


![Figure 26](images/figure_026.png)


Model Assessment: k=4, Silhouette=0.212, DB=1.547, Outliers=100 (1.00%)

## 5.3. Evaluation

### 5.3.1. Evaluate results

Clustering Results: 10,000 records, k=4, Silhouette=0.212, DB=1.547, Inertia=153065

![Figure 27](images/figure_027.png)


### 5.3.2. Interpret results

Cluster interpretation: 4 distinct patterns identified

![Figure 28](images/figure_028.png)


### 5.3.3. Review of process

Process review: Complete clustering workflow from data preparation to evaluation

![Figure 29](images/figure_029.png)


### 5.3.4. Determine next steps

Clustering complete: k=4, 10,000 records, Silhouette=0.212

![Figure 30](images/figure_030.png)


# 6. Outlier Detection by LOF and Distance-based method

## 6.1. Data Preparation for Outlier Detection

### 6.1.1. Select Data - Select and justify features for outlier detection

Outlier detection setup: 2,057,983 rows × 22 columns, 19 modeling features

![Figure 31](images/figure_031.png)


### 6.1.2. Clean Data

1. Duplicate Removal:
   - Initial records: 2,057,983
   - Duplicates removed: 887,412 (based on SeqID)
   - Records after deduplication: 1,170,571

2. Missing Values Handling:
   - Records before handling: 1,170,571
   - Columns with missing values: 2
   - Columns filled (<=50% missing): 2
     • Location: <0.01% (2 missing) missing, filled with mode
     • Year: 0.84% missing, filled with median
   - Columns removed: 0
   - Records after handling: 1,170,571
   - Columns after handling: 22

3. Data Validation & Invalid Record Removal:
   - Records before validation: 1,170,571
   - Invalid values detected:
     • Invalid Year: 1,428 (out of range [1900, 2025])
     • Date out of range: 334,113 (not in [2015-01-01, 2025-12-31])
   - Total invalid values: 335,541
   - Records removed: 335,072
   - Records after validation: 10,000

4. Stratified Sampling:
   - Original dataset size: 835,499
   - Target sample size: 10,000
   - Sampling fraction: 0.0120 (1.20%)
   - Final sample size: 10,000
   - Accident class distribution after sampling:
     • False: 9,813 (98.13%)
     • True: 187 (1.87%)
OVERALL SUMMARY:
2,057,983 → 10,000 rows
Reduction: 99.51%
Final dataset: 10,000 rows × 22 columns

![Figure 32](images/figure_032.png)


### 6.1.3. Construct Data - Feature Engineering
✓ Temporal Features Created:
- Hour (0-23): 0-23
- Month (1-12): 1-12
- DayOfWeek (0=Mon, 6=Sun): 0-6
- IsWeekend: 1,719 weekend records (17.2%)
- TimeOfDay: {'Evening': np.int64(3061), 'Morning': np.int64(2972), 'Afternoon': np.int64(2716), 'Night': np.int64(1251)}

✓ Vehicle Age Feature:
- Mean: 14.9 years
- Range: 0-50 years
- Distribution: {'Middle': np.int64(4417), 'Old': np.int64(4401), 'Recent': np.int64(900), 'New': np.int64(282)}

✓ Binning Features Created:
- Hour_Binned: {'Morning': np.int64(3144), 'Evening': np.int64(2706), 'Afternoon': np.int64(2640), 'Night': np.int64(1510)}
- VehicleAge_Binned: {'Middle': np.int64(4417), 'Old': np.int64(4401), 'Recent': np.int64(900), 'New': np.int64(282)}

![Figure 33](images/figure_033.png)


### 6.1.4. Integrate Data

Feature integration: 22 final features (7 numeric, 10 boolean, 5 categorical)

### 6.1.5. Format Data - Encode, scale, and validate
Data Formatting Summary

[Step 1] Categorical Variable Encoding:
• Encoded features: 5
  1. VehicleType: 19 unique values → encoded as VehicleType_encoded
  2. SubAgency: 7 unique values → encoded as SubAgency_encoded
  3. Gender: 3 unique values → encoded as Gender_encoded
  4. Race: 6 unique values → encoded as Race_encoded
  5. TimeOfDay: 4 unique values → encoded as TimeOfDay_encoded

[Step 2] Feature Matrix Integration:
• Numerical features: 7
• Boolean features: 10
• Encoded categorical features: 5
• Total modeling features: 22
• Matrix shape: 10,000 rows × 22 columns

[Step 3] Boolean Feature Conversion:
• Converted 10 boolean features to integers (0/1)

[Step 4] Feature Scaling (StandardScaler):
• Scaling method: StandardScaler (mean=0, std=1)
• Scaled matrix shape: 10,000 rows × 22 columns
• Mean values: [-0.0000, 0.0000]
• Std values: [0.0000, 1.0000]

[Step 5] Data Quality Validation:
✓ Quality check passed: No NaN or infinite values found
• NaN values: 0
• Infinite values: 0
Summary: Successfully formatted 10,000 samples with 22 features
• Original dataset size: 835,499 rows
• Final feature matrix: 10,000 rows × 22 columns

![Figure 34](images/figure_034.png)


## 6.2. Modelling

### 6.2.1. Select modeling techniques
Model Selection Summary

Selected Methods: LOF + Distance-based Outlier Detection
• Method 1: Local Outlier Factor (LOF)
  - Rationale: Detects local density-based outliers, suitable for identifying
    violations that deviate from their local neighborhood patterns
  - Advantages: Effective for detecting anomalies in high-dimensional spaces
• Method 2: Distance-based Outlier Detection
  - Rationale: Uses k-nearest neighbors distance to identify global outliers
  - Advantages: Complements LOF by detecting outliers based on global distance patterns
• Combined Approach: Both methods used together for high-confidence outlier detection
  - Strategy: Common outliers detected by both methods are considered high-confidence
  - Justification: As per project requirements, both methods must be implemented

### 6.2.2. Generate test design
Test Design Summary

Test Design Configuration:
• LOF Parameters:
  - n_neighbors: 20 (number of neighbors to consider for local density)
  - contamination: 0.01 (expected proportion of outliers, 1% of dataset)
  - Rationale: Small contamination rate ensures only high-confidence outliers are detected
• Distance-based Parameters:
  - k_neighbors: 20 (number of nearest neighbors for distance calculation)
  - Threshold: 99th percentile (top 1% of distances considered outliers)
  - Rationale: Matches LOF contamination rate for consistent comparison
• Common Outlier Strategy:
  - Approach: Identify outliers detected by both methods
  - Rationale: High-confidence outliers require agreement from both detection methods
  - Expected Outcome: More reliable outlier detection with reduced false positives

### 6.2.3. Build model
Model Building Summary

[Step 1] LOF Model Construction:
• Dataset size: 10,000 samples × 22 features
• Model parameters:
  - n_neighbors: 20
  - contamination: 0.01 (1% of data expected as outliers)
  - novelty: False (fit_predict mode)
• Model training: LOF model fitted on scaled feature matrix
• Output: Outlier labels (-1 for outliers, 1 for inliers) and LOF scores
• Results stored: LOF_score and LOF_outlier columns added to dataframe

[Step 2] Distance-based Model Construction:
• Distance calculation method: k-nearest neighbors average distance
• Model parameters:
  - k_neighbors: 20 (excluding the point itself)
  - Threshold method: 99th percentile (top 1% as outliers)
• Distance computation:
  - NearestNeighbors fitted on scaled feature matrix
  - Average distance to k nearest neighbors calculated for each point
  - Threshold: 4.0832 (99th percentile)
• Output: Distance scores and outlier labels
• Results stored: Distance_score and Distance_outlier columns added to dataframe

[Step 3] Model Integration:
• Both models successfully trained on 10,000 samples
• Feature matrix: 22 scaled features
• Scaling: StandardScaler applied (mean=0, std=1)

Summary: Successfully built two outlier detection models
• LOF model: Trained with n_neighbors=20, contamination=0.01
• Distance-based model: Trained with k=20, threshold=99th percentile
• Both models ready for outlier detection and comparison

![Figure 35](images/figure_035.png)


### 6.2.4. Assess model
Model Assessment Summary

[Step 1] Outlier Detection Results:
• LOF Method:
  - Outliers detected: 100 (1.00% of dataset)
  - Inliers: 9,900 (99.00%)
  - Interpretation: Local density-based outliers identified
• Distance-based Method:
  - Outliers detected: 100 (1.00% of dataset)
  - Inliers: 9,900 (99.00%)
  - Interpretation: Global distance-based outliers identified

[Step 2] Common Outlier Analysis:
• High-confidence outliers (both methods agree): 55 (0.550%)
• LOF-only outliers: 45 (0.45%)
• Distance-only outliers: 45 (0.45%)
• Method agreement:
  - 55.0% of LOF outliers also detected by distance method
  - 55.0% of distance-based outliers also detected by LOF
  - Interpretation: 55 outliers have high confidence (both methods agree)

[Step 3] Model Performance Assessment:
• Dataset size: 10,000 records
• Feature dimensions: 22 scaled features
• Detection rate: 0.550% high-confidence outliers
• Common outliers available for detailed analysis: 55 records
• Results stored: Common_outlier column added to dataframe

Summary: Model assessment completed
• LOF outliers: 100 (1.00%)
• Distance-based outliers: 100 (1.00%)
• High-confidence common outliers: 55 (0.550%)

![Figure 36](images/figure_036.png)


## 6.3. Evaluation

### 6.3.1. Evaluate results
Evaluation Summary

[Step 1] Overall Detection Results:
• Dataset size: 10,000 records
• LOF method: 100 outliers detected (1.00% of dataset)
• Distance-based method: 100 outliers detected (1.00% of dataset)
• Common outliers: 55 (0.550% of dataset)

[Step 2] Method Comparison Analysis:
• LOF-only outliers: 45 (0.45%)
  - Interpretation: Detected by local density analysis only
• Distance-only outliers: 45 (0.45%)
  - Interpretation: Detected by global distance analysis only
• Common outliers: 55 (0.550%)
  - Interpretation: High-confidence outliers detected by both methods

[Step 3] Outlier Characteristics Analysis:
• Accident rate comparison:
  - Outliers: 38.2%
  - Normal cases: 1.7%
  - Difference: 36.5 percentage points
• Alcohol involvement:
  - Outliers: 1.8%
  - Normal cases: 0.0%
  - Difference: 1.8 percentage points
• Vehicle age:
  - Outliers: 14.6 years average
  - Normal cases: 14.9 years average
  - Difference: 0.3 years

Summary: Evaluation completed for outlier detection
• Total records evaluated: 10,000
• LOF outliers: 100 (1.00%)
• Distance-based outliers: 100 (1.00%)
• High-confidence common outliers: 55 (0.550%)

![Figure 37](images/figure_037.png)


![Figure 38](images/figure_038.png)


![Figure 39](images/figure_039.png)


### 6.3.2. Interpret results
Results Interpretation Summary

[Step 1] Outlier Detection Interpretation:
• Common outliers: 55 (0.550% of dataset)
  - Significance: Detected by both LOF and distance-based methods
  - Confidence level: High (dual-method agreement)
  - Interpretation: These outliers represent high-confidence anomalies

[Step 2] Method-Specific Outlier Interpretation:
• LOF-only outliers: 45 (0.45%)
  - Interpretation: Local density anomalies - violations that deviate
    significantly from their local neighborhood patterns
  - Use case: Identifying context-specific unusual patterns
• Distance-only outliers: 45 (0.45%)
  - Interpretation: Global distance anomalies - violations that are
    far from the majority of data points in feature space
  - Use case: Identifying extreme cases across all features

[Step 3] Combined Method Interpretation:
• High-confidence outliers (both methods): 55 (0.550%)
  - Interpretation: These outliers are both locally and globally anomalous
  - Reliability: Highest confidence due to dual-method agreement
  - Action: Priority candidates for investigation and validation

Summary: Results interpretation completed
• Total outliers identified: 145
• High-confidence outliers: 55 (0.550%)
• Interpretation: Dual-method detection provides robust outlier identification

![Figure 40](images/figure_040.png)


### 6.3.3. Review of process
Process Review Summary

[Step 1] Data Preparation Phase:
• Data selection: 10,000 records selected
• Feature engineering: 22 features created
• Data cleaning: Duplicates removed, missing values handled
• Data formatting: Encoded, scaled, and validated

[Step 2] Model Selection Phase:
• Methods selected: LOF + Distance-based outlier detection
• Rationale: Dual-method approach for high-confidence detection
• Parameters configured: n_neighbors=20, contamination=0.01

[Step 3] Model Execution Phase:
• LOF model: Successfully trained and applied
• Distance-based model: Successfully trained and applied
• Results: Outlier labels and scores generated for all records

[Step 4] Evaluation Phase:
• Outlier detection: 100 LOF outliers, 100 distance outliers
• Common outliers: 55 high-confidence outliers identified
• Analysis: Characteristics compared between outliers and normal cases

Summary: Complete workflow executed successfully
• Process: Data preparation → Model selection → Execution → Evaluation
• Dataset: 10,000 records × 22 features
• Outcome: 55 high-confidence outliers identified

![Figure 41](images/figure_041.png)


### 6.3.4. Determine next steps
Next Steps Summary

[Step 1] Task Completion Status:
• Outlier detection: ✓ Completed
• Methods applied: LOF + Distance-based
• High-confidence outliers: 55 (0.550%)

[Step 2] Key Results Summary:
• Dataset processed: 10,000 records × 22 features
• LOF outliers: 100 (1.00%)
• Distance-based outliers: 100 (1.00%)
• Common outliers: 55 (0.550%)
• Normal cases: 9,945 (99.45%)

[Step 3] Recommended Next Steps:
• Immediate actions:
  1. Validate 55 high-confidence outliers for data quality issues
  2. Investigate outlier characteristics for fraud detection opportunities
  3. Review geographic and temporal patterns of detected outliers
• Future improvements:
  1. Integrate outlier detection results with classification and clustering findings
  2. Develop automated monitoring system for real-time outlier detection
  3. Refine detection parameters based on domain expert feedback

Summary: Outlier detection task completed successfully
• High-confidence outliers identified: 55 (0.550%)
• Dataset: 10,000 records, 22 features
• Ready for: Integration with other analysis tasks and further investigation

![Figure 42](images/figure_042.png)


# 7. Conclusion

## 7.1. Dataset and Project Overview

### Q1: What is the scale and quality of the dataset used in this project?

Answer:
The project analyzed traffic violation data from Montgomery County with the following characteristics:
• Initial dataset size: 2,057,983 records
• After data cleaning and preparation: 10,000 records
• Data reduction: 99.5% of records removed during cleaning
• Features engineered: 22 total features
• Duplicate records found: 887,412 (43.12% of original data)
• Data quality: High cardinality in location data (268,060 unique locations)
• Missing values: >95% missing in search-related fields

### Q2: What is the business question this project addresses?

Answer:
Business Question: 'What are the key contributing factors that lead to different
types of traffic violations?'

This project successfully applied three machine learning techniques to answer this question:
1. Classification (Decision Tree) - to identify key factors for violation types
2. Clustering (KMeans) - to discover violation patterns
3. Outlier Detection (LOF + Distance-based) - to identify anomalies

## 7.2. Classification Task Questions

### Q3: How accurate is the classification model in predicting violation types?

Answer:
The Decision Tree model achieved the following performance:
• Cross-Validation Accuracy: 63.69% (±1.24%)
• Target Accuracy: 70%
• Status: ✗ TARGET NOT MET - Below target by 6.3 percentage points
• Evidence: The model correctly classifies 63.7% of violation types
with a 95% confidence interval of 62.45% to 64.93%
• Reason: The complexity of violation types and feature interactions may require
more sophisticated models or additional feature engineering

### Q4: What are the most important factors that contribute to different violation types?

Answer:
Feature importance analysis reveals the following key factors:
• Most Important Feature: Contributed To Accident (38.7% importance) - This single feature accounts for 38.7% of the decision-making power - Evidence: The decision tree uses this feature as the primary split point

• Top 3 Most Important Features: 1. Contributed To Accident: 38.7% importance - Contributes 38.7% to violation type classification 2. VehicleAge: 17.8% importance - Contributes 17.8% to violation type classification 3. Hour: 16.6% importance - Contributes 16.6% to violation type classification

• Combined Importance: The top 3 features account for 73.1% of classification power
• Interpretation: These features are the primary drivers in the decision tree
for classifying violation types, providing actionable insights for enforcement

## 7.3. Clustering Task Questions

### Q5: How many distinct violation patterns were identified through clustering?

Answer:
KMeans clustering with Elbow Method identified 4 distinct violation patterns:
• Optimal number of clusters (k): 4
• Clustering Quality Metrics:
  - Silhouette Score: 0.212 (range: -1 to 1, higher is better)
    * Interpretation: Score of 0.212 indicates moderate clustering quality
    * Evidence: Clusters show some separation but may benefit from refinement
  - Davies-Bouldin Score: 1.547 (lower is better)
    * Evidence: Lower score indicates better cluster separation

### Q6: What characteristics distinguish different violation pattern clusters?

Answer:
Analysis of 4 clusters reveals distinct violation profiles:

Cluster 0 (1,961 records, 19.6% of data):
• Weekend Activity: 100.0%
• Accident Rate: 0.0%
• Alcohol Involvement: 0.1%
• Average Vehicle Age: 17.3 years
• Peak Hour: 22:00
• Pattern Type: Weekend violation pattern

Cluster 1 (7,531 records, 75.3% of data):
• Weekend Activity: 0.0%
• Accident Rate: 0.0%
• Alcohol Involvement: 0.1%
• Average Vehicle Age: 16.8 years
• Peak Hour: 22:00
• Pattern Type: General violation pattern

Cluster 2 (250 records, 2.5% of data):
• Weekend Activity: 11.6%
• Accident Rate: 1.2%
• Alcohol Involvement: 0.4%
• Average Vehicle Age: 5.3 years
• Peak Hour: 8:00
• Pattern Type: General violation pattern

Cluster 3 (258 records, 2.6% of data):
• Weekend Activity: 32.9%
• Accident Rate: 100.0%
• Alcohol Involvement: 0.8%
• Average Vehicle Age: 17.6 years
• Peak Hour: 22:00
• Pattern Type: High-risk cluster with frequent accidents

## 7.4. Outlier Detection Questions

### Q7: How many outliers were detected, and what methods were used?

Answer:
Two complementary methods were used to detect anomalies:
• Method 1 - LOF (Local Outlier Factor): - Detected: 100 outliers (1.00% of dataset) - Parameters: n_neighbors=20, contamination=0.01
• Method 2 - Distance-based: - Detected: 100 outliers (1.00% of dataset) - Parameters: k=20 neighbors, 99th percentile threshold
• High-Confidence Outliers (both methods agree): - Common outliers: 55 (0.550% of dataset)
- Method agreement: 55.0% overlap between methods - Evidence: Both methods independently identified 55 records as outliers

### Q8: What makes the detected outliers different from normal violations?

Answer:
Analysis of 55 high-confidence outliers reveals significant differences:

• Accident Rate Comparison: - Outliers: 38.2% accident rate - Normal cases: 1.7% accident rate - Difference: 36.5 percentage points
- Evidence: Outliers have 22.9x higher accident rate than normal cases

• Alcohol Involvement: - Outliers: 1.8% - Normal cases: 0.0% - Difference: 1.8 percentage points

• Vehicle Age: - Outliers: 14.6 years average - Normal cases: 14.9 years average - Difference: 0.3 years

• Interpretation:
These outliers represent high-risk scenarios requiring immediate attention
rather than just data errors, as evidenced by their 22.9x higher
accident rate compared to normal violations.

## 7.5. Unexpected Findings and Surprises

### Q9: What unexpected data quality issues were discovered?

Answer:
Several significant data quality issues were identified:
• Duplicate Records: - Found: 887,412 duplicate records - Percentage: 43.12% of original dataset - Impact: These duplicates were removed during data cleaning
• Location Data Complexity: - Unique locations: 268,060 distinct locations - Evidence: High cardinality suggests diverse geographic patterns
• Missing Values: - Search-related fields: >95% missing values - Evidence: These fields were excluded from modeling due to insufficient data
• Conclusion: These findings highlight the importance of thorough data cleaning

### Q10: Were the model performance expectations met?

Answer:
Classification Task:
• Expected: Model accuracy >70% with interpretable decision tree rules
• Result: ✗ PARTIALLY DENIED - Accuracy below target
• Evidence: Achieved 63.69% vs 70% target - Gap: 6.3 percentage points below target
• However: Feature importance revealed 'Contributed To Accident' as dominant factor (38.7%)
• Interpretation: Despite lower accuracy, the model provides interpretable insights
with 'Contributed To Accident' being the primary driver, suggesting accident-related
violations have distinct characteristics that are easier to classify

Clustering Task:
• Expected: Identify high-risk time periods, geographic hotspots, and violation patterns
• Result: ✓ CONFIRMED - Successfully identified: - Evidence: 4 distinct violation patterns with geographic and temporal characteristics - Evidence: Cluster characteristics reveal different risk profiles - Evidence: Outliers within clusters detected for investigation

Outlier Detection:
• Expected: Both methods (LOF and distance-based) produce consistent results
• Result: ✓ CONFIRMED - 55.0% agreement between methods - Evidence: 55 high-confidence outliers identified by both methods - Evidence: Both methods independently flagged the same 55 records

### Q11: What were the most surprising findings about outlier characteristics?

Answer:
The most surprising finding is the dramatic difference in accident rates:
• Outlier Accident Rate: 38.2%
• Normal Case Accident Rate: 1.7%
• Ratio: 22.9x higher in outliers
• Evidence: Outliers have 36.5 percentage points
higher accident rate than normal violations
• Interpretation: This suggests outliers represent high-risk scenarios requiring
immediate attention rather than just data errors
• Actionable Insight: These 55 outliers warrant priority investigation
for fraud detection and targeted enforcement strategies

## 7.6. Actionable Insights and Interpretation

### Q12: What actionable insights can law enforcement derive from the decision tree?

Answer:
The decision tree provides interpretable rules with the following insights:
• Primary Decision Factor: Contributed To Accident (38.7% importance) - Evidence: This feature is used as the root decision point in the tree - Rule: If Contributed To Accident = True → Higher probability of certain violation types
• Secondary Factors: - Time-based splits (Hour) → Different patterns for morning/evening violations - Vehicle age splits → Older vehicles associated with different violation patterns
• Actionable Recommendations: 1. Prioritize stops based on Contributed To Accident likelihood - Evidence: 38.7% of classification power 2. Optimize time-based patrol scheduling using hour patterns - Evidence: Time of day is a significant contributing factor 3. Target enforcement based on vehicle age - Evidence: Vehicle age splits reveal distinct violation patterns

### Q13: What are the potential reasons for outlier status, and what actions should be taken?

Answer:
Analysis of 55 high-confidence outliers reveals:

• Statistical Evidence: - Accident Rate: 38.2% (vs normal: 1.7%) \* Difference: 36.5 percentage points - Alcohol Involvement: 1.8% - Average Vehicle Age: 14.6 years

• Potential Reasons for Outlier Status: 1. Extreme combinations of risk factors - Example: alcohol + accident + old vehicle (14.6 years avg) - Evidence: 38.2% accident rate vs 1.7% normal 2. Unusual temporal patterns - Evidence: Violations at atypical hours detected by both methods 3. Geographic anomalies - Evidence: Violations in low-traffic areas identified 4. Data quality issues - Evidence: 55 records flagged by both detection methods 5. Special circumstances - Evidence: Events, weather, or road conditions may contribute

• Recommended Actions (Prioritized): 1. Review 55 outlier records for data quality issues - Priority: High (both methods agree) 2. Investigate high-risk outlier patterns for fraud detection - Evidence: 38.2% accident rate suggests high-risk scenarios 3. Validate geographic coordinates for outliers - Evidence: Geographic anomalies detected 4. Consider these cases for targeted enforcement strategies - Evidence: 55 cases represent 0.550% of data

## 7.7. Limitations and Future Work

### Q14: What are the current limitations and how can they be addressed?

Answer:
Current Limitations and Improvement Opportunities:

1. Model Performance Improvements:
   • Current Status: Classification accuracy = 63.7%
   • Gap: 6.3 percentage points below 70% target
   • Improvement Strategies:
   - Hyperparameter tuning (max_depth, min_samples_split, criterion)
   - Ensemble methods (Random Forest, Gradient Boosting, XGBoost)
   - Feature selection optimization
   - Handling class imbalance if present
   • Expected Impact: Could potentially improve accuracy by 5-15 percentage points

2. Feature Engineering Enhancements:
   • Current Features: 22 features used
   • Missing Context: Weather, road conditions, traffic density
   • Recommendations:
   - Add weather conditions at time of violation
   - Include road type and condition data
   - Integrate traffic density metrics
   - Incorporate historical violation patterns by location
   • Expected Impact: Additional context could improve model accuracy and interpretability

3. Methodological Improvements:
   • Current Methods: Decision Tree, KMeans, LOF + Distance-based
   • Recommendations:
   - Validate outlier findings with domain experts
   - Explore additional clustering algorithms (DBSCAN, Hierarchical)
   - Implement time-series analysis for temporal patterns
   - Consider deep learning approaches for complex pattern recognition
   • Expected Impact: More robust and comprehensive analysis

4. Data Quality and Collection:
   • Current Issues:
   - 887,412 duplicate records found (43.12% of data)
   - > 95% missing values in search-related fields
   - 268,060 unique locations (high cardinality)
   • Recommendations:
   - Address missing values in search-related fields
   - Validate and standardize location data
   - Consider collecting additional features identified as important
   • Expected Impact: Improved data quality would enhance model reliability

## 7.8. Final Summary

### Q15: What are the key achievements and takeaways from this project?

Answer:
This project successfully completed all required data mining tasks with the following achievements:

✓ Classification Task: - Method: Decision Tree with cross-validation - Accuracy: 63.69% (±1.24%) - Key Finding: Contributed To Accident is the most important factor (38.7%) - Deliverable: Interpretable decision rules for law enforcement

✓ Clustering Task: - Method: KMeans with optimal k selection - Clusters Identified: 4 distinct violation patterns - Quality: Silhouette Score = 0.212, Davies-Bouldin = 1.547 - Deliverable: Geographic and temporal violation patterns

✓ Outlier Detection Task: - Methods: LOF + Distance-based (combined approach) - High-Confidence Outliers: 55 (0.550%) - Key Finding: Outliers have 38.2% accident rate (vs normal: 1.7%) - Deliverable: Anomaly detection for fraud and data quality issues

✓ Methodology: - Framework: Comprehensive analysis following CRISP-DM methodology - Dataset: 2,057,983 initial records → 10,000 after preparation - Features: 22 engineered features

Key Takeaways:
• The results provide actionable insights for traffic violation analysis
• Enforcement strategy optimization can be informed by the identified patterns
• Despite some limitations, the project successfully addresses the business question
• Future work can address identified limitations to further improve results
