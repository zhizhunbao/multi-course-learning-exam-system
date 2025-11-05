# Discovering Contributing Factors to Traffic Violations: A Comprehensive Machine Learning Approach Using Classification, Clustering, and Anomaly Detection

**Authors:**

- Joseph Weng - 041076091
- Hye Ran Yoo - 041145212
- Peng Wang - 041107730

**Date:** November 7, 2025

## 1. Introduction

Traffic violations present significant challenges for urban traffic management systems worldwide.
Understanding patterns and contributing factors in traffic violations can help law enforcement agencies allocate resources more effectively, improve road safety, and reduce traffic-related incidents.
This project applies machine learning techniques to analyze traffic violation data from Montgomery County, aiming to identify key factors that contribute to different types of violations and detect anomalous patterns in the data.

## 2. Business Understanding

### 2.1. Determine business objectives

**Classification Question:**

"What are the key contributing factors that lead to different types of traffic violations in Montgomery County?"

This question will be answered through classification analysis using decision trees, which will identify the most important factors (such as time, location, vehicle characteristics, weather conditions, etc.) that determine different violation types.

**Primary Business Objectives:**

- **Enhance Public Safety**: Identify patterns in traffic violations to improve road safety and reduce accidents
- **Optimize Resource Allocation**: Help law enforcement agencies allocate patrol resources more efficiently based on violation patterns
- **Improve Traffic Management**: Understand contributing factors to traffic violations to develop targeted prevention strategies
- **Detect Anomalies**: Identify unusual patterns or outliers that may indicate fraudulent activities, data quality issues, or systemic problems

### 2.2. Assess situation

**Available Resources:**

- Montgomery County Traffic Violations dataset (covering multiple years)
- Machine learning expertise and tools (Python, scikit-learn, pandas, etc.)
- Computing resources for data processing and analysis

**Requirements, Assumptions, and Constraints:**

**Constraints:**

- Data quality and completeness may vary across different time periods
- Privacy considerations in handling personal and location information
- Need to balance between data granularity and computational efficiency

**Assumptions:**

- Historical traffic violation patterns can inform future prevention strategies
- Data contains sufficient information to identify meaningful patterns
- Violations are consistently reported and recorded across the dataset timeframe

**Risks:**

- **Data availability risks:** Data may be incomplete, inconsistent across time periods, or have missing critical fields that could affect analysis quality
- **Technical risks:** Selected algorithms may not perform well on this dataset, computational resources may be insufficient for large-scale processing, or tool compatibility issues may arise
- **Timeline risks:** Data cleaning and preparation may take longer than expected, model tuning and optimization may require more iterations than anticipated, or unexpected technical challenges may delay project milestones

### 2.3. Determine data mining goals

**Required by project instructions - Three main tasks:**

1. **Classification Task**: Build a decision tree model to identify key contributing factors that lead to different types of traffic violations, using violation type as the class variable
2. **Clustering Task**: Group similar violations together to identify common patterns (e.g., high-risk time periods, locations, or violation combinations)
3. **Outlier Detection**: Identify anomalous violations that deviate significantly from normal patterns, which may indicate data errors, unusual circumstances, or fraudulent activities

**Data Mining Success Criteria:**

- Classification model achieves reasonable accuracy (e.g., >70%) and is interpretable
- Clustering results reveal meaningful and interpretable groups
- Outlier detection identifies genuinely unusual cases that warrant investigation

### 2.4. Produce project plan

**Project Methodology**: Follow CRISP-DM (Cross-Industry Standard Process for Data Mining)

**Workload Distribution Table:**

| Steps / Tool                                                     | Sub-task                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Name of the student                 |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Introduction                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Hye Ran Yoo, Joseph Weng, Peng Wang |
| Business Understanding                                           | 2.1. Determine business objectives; 2.2. Assess situation (resources, constraints, assumptions); 2.3. Determine data mining goals; 2.4. Produce project plan                                                                                                                                                                                                                                                                                                                     | Hye Ran Yoo, Joseph Weng, Peng Wang |
| Data Understanding                                               | 3.1. Collect initial data; 3.2. Describe data; 3.3. Explore data; 3.4. Verify data quality._Note: Each group must collectively understand all attributes. Individually, each member is responsible for understanding at least one-third of the attributes, assuming the group consists of three members. Once assigned, document the attribute names along with the names of the members who have understood them._                                                              | Hye Ran Yoo, Joseph Weng, Peng Wang |
| **Task 1 – Classification by Decision Tree (DT)**                | _（Individual task）_                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Hye Ran Yoo**                     |
| &nbsp;&nbsp;&nbsp;&nbsp;Data Preparation                         | 4.1.1. Select data (filtering & sampling to 10,000 instances, select relevant attributes, set role for class attribute); 4.1.2. Clean data (remove duplicates, handle missing data); 4.1.3. Construct data (binning if needed <10 bins, scaling if needed, type conversions); 4.1.4. Integrate data (generate/assign ID); 4.1.5. Format data (set correct data types)                                                                                                            | Hye Ran Yoo                         |
| &nbsp;&nbsp;&nbsp;&nbsp;Modeling & Evaluation                    | 4.2.1. Select modeling techniques; 4.2.2. Generate test design; 4.2.3. Build model (Build Decision Tree model, apply cross-validation); 4.2.4. Assess model (Evaluate model performance, confusion matrices, accuracy metrics); 4.3.1. Evaluate results; 4.3.2. Interpret results (Interpret DT rules, explain classification results, analyze model accuracy and importance); 4.3.3. Review of process; 4.3.4. Determine next steps                                             | Hye Ran Yoo                         |
| &nbsp;&nbsp;&nbsp;&nbsp;Interpretation of Results                | _(Included in 4.3.2. Interpret results above)_                                                                                                                                                                                                                                                                                                                                                                                                                                   | Hye Ran Yoo                         |
| **Task 2 – Clustering & identify outliers from clusters**        | _（Individual task）_                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Joseph Weng**                     |
| &nbsp;&nbsp;&nbsp;&nbsp;Data Preparation                         | 5.1.1. Select data (filtering & sampling to 10,000 instances, select relevant attributes for clustering); 5.1.2. Clean data (remove duplicates, handle missing data); 5.1.3. Construct data (scaling required for kMeans, type conversions, special handling for latitude/longitude to create regions); 5.1.4. Integrate data (generate/assign ID); 5.1.5. Format data (set correct data types)                                                                                  | Joseph Weng                         |
| &nbsp;&nbsp;&nbsp;&nbsp;Modeling & Evaluation                    | 5.2.1. Select modeling techniques; 5.2.2. Generate test design; 5.2.3. Build model (Apply kMeans clustering, use elbow method to find best k value); 5.2.4. Assess model (Identify outliers from clusters, evaluate clustering results); 5.3.1. Evaluate results; 5.3.2. Interpret results (Explain why instances are clustered together, identify patterns in clusters, interpret outlier instances found from clusters); 5.3.3. Review of process; 5.3.4. Determine next steps | Joseph Weng                         |
| &nbsp;&nbsp;&nbsp;&nbsp;Interpretation of Results                | _(Included in 5.3.2. Interpret results above)_                                                                                                                                                                                                                                                                                                                                                                                                                                   | Joseph Weng                         |
| **Task 3 – Outlier Detection by LOF and Isolation Forest (ISF)** | _（Individual task）_                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Peng Wang**                       |
| &nbsp;&nbsp;&nbsp;&nbsp;Data Preparation                         | 6.1.1. Select data (filtering & sampling to 10,000 instances, select relevant attributes for outlier detection); 6.1.2. Clean data (remove duplicates, handle missing data); 6.1.3. Construct data (scaling if needed, type conversions); 6.1.4. Integrate data (generate/assign ID); 6.1.5. Format data (set correct data types)                                                                                                                                                | Peng Wang                           |
| &nbsp;&nbsp;&nbsp;&nbsp;Modeling & Evaluation                    | 6.2.1. Select modeling techniques; 6.2.2. Generate test design; 6.2.3. Build model (Apply LOF method, apply Isolation Forest method); 6.2.4. Assess model (Combine results from both approaches, identify common outliers); 6.3.1. Evaluate results; 6.3.2. Interpret results (Explain reasons why instances are outliers, analyze outlier characteristics, provide detailed interpretation of outlier instances); 6.3.3. Review of process; 6.3.4. Determine next steps         | Peng Wang                           |
| &nbsp;&nbsp;&nbsp;&nbsp;Interpretation of Results                | _(Included in 6.3.2. Interpret results above)_                                                                                                                                                                                                                                                                                                                                                                                                                                   | Peng Wang                           |
| Compare Model results                                            | 1. Compare classification, clustering, and outlier detection results; 2. Identify common patterns across different models; 3. Discuss model performance and limitations; 4. Summarize key findings from all three tasks                                                                                                                                                                                                                                                          | Hye Ran Yoo, Joseph Weng, Peng Wang |
| Conclusion                                                       | 1. Summarize project findings; 2. Discuss business implications; 3. Identify limitations and future work; 4. Provide recommendations based on analysis results                                                                                                                                                                                                                                                                                                                   | Hye Ran Yoo, Joseph Weng, Peng Wang |

**Project Timeline:**

- **Part 1**: November 7, 2025
  - Sections 1-3, 4.1, 5.1, 6.1 (Business Understanding, Data Understanding, Data Preparation)
- **Part 2**: November 21, 2025
  - Sections 4.2-4.3, 5.2-5.3, 6.2-6.3, 7 (Modeling, Evaluation, Conclusion)
  - Presentation slides
- **Presentation**: November 24 - December 5, 2025
  - Each team member presents their individual contribution (~10 minutes)

**Tools and Technology:**

Tools: Python (shared across the team for consistency)

## 3. Data Understanding

### 3.1. Collect initial data

#### 3.1.1. Data Source

- Dataset: Traffic Violations dataset from Montgomery County
- Data Source URL: [https://data.montgomerycountymd.gov/Public-Safety/Traffic-Violations/4mse-ku6q/about_data](https://data.montgomerycountymd.gov/Public-Safety/Traffic-Violations/4mse-ku6q/about_data)
- Format: CSV file
- File location: `TrafficViolations.csv`

#### 3.1.2. Data Loading

```python
import pandas as pd

# Read the data
df = pd.read_csv('TrafficViolations.csv')
print(df.head())
```

### 3.2. Describe data

#### 3.2.1. Data structure overview

```python
# ============================================================================
# STEP 3.2: Describe data
# ============================================================================
# Explanation: Describe dataset characteristics and preliminary exploration

# Number of records and attributes
print("Dataset Overview:")
print(f"  - Total records: {df.shape[0]:,}")
print(f"  - Total columns: {df.shape[1]}")

# Basic data schema (includes data types, non-null counts and memory usage)
print("\nBasic data schema:")
df.info()

# Also display detailed info for each column (original format)
print("\nDetailed Column Information (Original Format):")
print("="*80)
for col in df.columns:
    print(f"\nColumn: {col}")
    print(df[col].describe(include='all'))
    print("-" * 80)
```

#### 3.2.2. Attribute description

- **Data Type Classification:**

  In machine learning, data types are typically classified into several categories beyond the basic three (Nominal, Ordinal, Numerical):

  - **Nominal (Categorical)**: Unordered categories (e.g., colors, cities, gender)
  - **Ordinal**: Ordered categories with meaningful sequence but unequal intervals (e.g., ratings, education levels)
  - **Numerical (Continuous)**: Continuous numeric values (e.g., height, weight, temperature)
  - **Numerical (Discrete)**: Integer numeric values from counting (e.g., number of items, age in years)
  - **Binary/Boolean**: Two possible values (Yes/No, True/False, 0/1)
  - **Date/Time**: Temporal data (dates, timestamps, time of day)
  - **Text/String**: Free-form text data requiring NLP techniques
  - **ID/Identifier**: Unique identifiers (UUIDs, IDs) - typically excluded from models
  - **Geospatial**: Geographic coordinates or spatial data (latitude/longitude pairs, regions)

- **Attribute Table**

  | #   | Attribute               | Data Type              | Meaning and interpretation                                     | Assigned To |
  | --- | ----------------------- | ---------------------- | -------------------------------------------------------------- | ----------- |
  | 1   | SeqID                   | ID/Identifier          | Unique sequential identifier for each traffic stop record      | Hye Ran Yoo |
  | 2   | Date Of Stop            | Date/Time              | Date when the traffic stop occurred                            | Hye Ran Yoo |
  | 3   | Time Of Stop            | Date/Time              | Time of day when the traffic stop occurred                     | Hye Ran Yoo |
  | 4   | Agency                  | Nominal                | Law enforcement agency that conducted the stop                 | Hye Ran Yoo |
  | 5   | SubAgency               | Nominal                | Police district or sub-agency responsible for the stop         | Hye Ran Yoo |
  | 6   | Description             | Text/String            | Textual description of the violation or traffic stop reason    | Hye Ran Yoo |
  | 7   | Location                | Text/String            | Street address or location description where the stop occurred | Hye Ran Yoo |
  | 8   | Latitude                | Numerical (Continuous) | Geographic latitude coordinate of the traffic stop location    | Hye Ran Yoo |
  | 9   | Longitude               | Numerical (Continuous) | Geographic longitude coordinate of the traffic stop location   | Hye Ran Yoo |
  | 10  | Accident                | Binary                 | Whether an accident was involved in the traffic stop           | Hye Ran Yoo |
  | 11  | Belts                   | Binary                 | Whether seat belts were used (violation if No)                 | Hye Ran Yoo |
  | 12  | Personal Injury         | Binary                 | Whether personal injury occurred during the incident           | Hye Ran Yoo |
  | 13  | Property Damage         | Binary                 | Whether property damage occurred during the incident           | Hye Ran Yoo |
  | 14  | Fatal                   | Binary                 | Whether the incident resulted in a fatality                    | Hye Ran Yoo |
  | 15  | Commercial License      | Binary                 | Whether the driver has a commercial driver's license           | Joseph Weng |
  | 16  | HAZMAT                  | Binary                 | Whether the vehicle was carrying hazardous materials           | Joseph Weng |
  | 17  | Commercial Vehicle      | Binary                 | Whether the vehicle is a commercial vehicle                    | Joseph Weng |
  | 18  | Alcohol                 | Binary                 | Whether alcohol was involved in the traffic stop               | Joseph Weng |
  | 19  | Work Zone               | Binary                 | Whether the stop occurred in a work zone                       | Joseph Weng |
  | 20  | Search Conducted        | Binary                 | Whether a search was conducted during the stop                 | Joseph Weng |
  | 21  | Search Disposition      | Nominal                | Result or outcome of the search conducted                      | Joseph Weng |
  | 22  | Search Outcome          | Nominal                | Outcome or consequence of the search                           | Joseph Weng |
  | 23  | Search Reason           | Nominal                | Reason why the search was conducted                            | Joseph Weng |
  | 24  | Search Reason For Stop  | Nominal                | Legal code or reason for the traffic stop                      | Joseph Weng |
  | 25  | Search Type             | Nominal                | Type of search conducted (e.g., vehicle, person, both)         | Joseph Weng |
  | 26  | Search Arrest Reason    | Nominal                | Reason for arrest if arrest occurred during search             | Joseph Weng |
  | 27  | State                   | Nominal                | US state where the traffic stop occurred                       | Joseph Weng |
  | 28  | VehicleType             | Nominal                | Type or category of vehicle (automobile, truck, etc.)          | Joseph Weng |
  | 29  | Year                    | Numerical (Discrete)   | Model year of the vehicle involved                             | Joseph Weng |
  | 30  | Make                    | Nominal                | Vehicle manufacturer or brand (e.g., Toyota, Ford)             | Peng Wang   |
  | 31  | Model                   | Nominal                | Specific vehicle model name                                    | Peng Wang   |
  | 32  | Color                   | Nominal                | Color of the vehicle involved                                  | Peng Wang   |
  | 33  | Violation Type          | Nominal                | Type of violation issued (Warning, Citation, etc.)             | Peng Wang   |
  | 34  | Charge                  | Nominal                | Legal charge code or statute violated                          | Peng Wang   |
  | 35  | Article                 | Nominal                | Legal article or section under which violation was issued      | Peng Wang   |
  | 36  | Contributed To Accident | Binary (Boolean)       | Whether the violation contributed to causing an accident       | Peng Wang   |
  | 37  | Race                    | Nominal                | Race or ethnicity of the driver (sensitive attribute)          | Peng Wang   |
  | 38  | Gender                  | Nominal                | Gender of the driver (sensitive attribute)                     | Peng Wang   |
  | 39  | Driver City             | Nominal                | City of residence of the driver                                | Peng Wang   |
  | 40  | Driver State            | Nominal                | State of residence of the driver                               | Peng Wang   |
  | 41  | DL State                | Nominal                | State that issued the driver's license                         | Peng Wang   |
  | 42  | Arrest Type             | Nominal                | Type of arrest or enforcement action taken                     | Peng Wang   |
  | 43  | Geolocation             | Geospatial/Tuple       | Geographic coordinates as a tuple (lat, long)                  | Peng Wang   |

- **Attribute Analysis with Task Usage**

  | Attribute               | Value Range/Categories                                                                                               | Task Usage / Role                                     | Modification & Usage Suggestions                                                                    |
  | ----------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
  | SeqID                   | 1,170,571 unique values (UUID format);<br />Top: 33c49de3-9e36-4f36-9326-b59a95e86fe8 (freq: 59)                     | ID only (not used in models)                          | Exclude from models                                                                                 |
  | Date Of Stop            | 5,052 unique dates;<br />Top: 03/17/2015 (freq: 1,281); No nulls                                                     | T1: Feature; T2: Feature; T3: Feature                 | Extract day of week, month, season, year; Consider weekend vs weekday patterns                      |
  | Time Of Stop            | 1,440 unique times; Top: 23:30:00 (freq: 2,996); No nulls                                                            | T1: Feature; T2: Feature; T3: Feature                 | Extract hour; Convert to categorical (morning/afternoon/evening/night); Consider rush hour patterns |
  | Agency                  | 1 unique value: MCP (all records); No nulls                                                                          | Exclude (constant value)                              | Exclude - constant value                                                                            |
  | SubAgency               | 9 unique districts; Top: 4th District, Wheaton (freq: 447,698); No nulls                                             | T1: Feature; T2: Feature                              | One-hot encoding or target encoding                                                                 |
  | Description             | 17,721 unique descriptions; Top: DRIVER FAILURE TO OBEY PROPERLY PLACED TRAFFIC... (freq: 170,319); 10 nulls (0.00%) | T1: Feature (with feature engineering)                | Use NLP techniques (TF-IDF, embeddings) or group by keywords; Drop rare categories; Handle 10 nulls |
  | Location                | 268,060 unique locations; Top: MONTGOMERY VILLAGE AVE @ RUSSELL AVE (freq: 2,447); 4 nulls (0.00%)                   | T3: Feature (for anomaly detection)                   | Group by area/neighborhood; Use with Latitude/Longitude; Handle 4 nulls                             |
  | Latitude                | Range: 0.0 to 41.54; Mean: 36.16; Std: 10.29; No nulls                                                               | T1: Feature; T2: Feature (high priority); T3: Feature | Normalize/Standardize; Check outliers (0.0 may be missing); Cluster with Longitude                  |
  | Longitude               | Range: -151.26 to 39.06; Mean: -71.34; Std: 20.30; No nulls                                                          | T1: Feature; T2: Feature (high priority); T3: Feature | Normalize/Standardize; Check outliers; Cluster with Latitude                                        |
  | Accident                | Yes/No; No: 2,001,624 (97.3%); Yes: 56,359 (2.7%); No nulls                                                          | T1: Target; T2: Feature; T3: Feature                  | T1: Label encoding (target); T2/T3: Label encoding (0/1)                                            |
  | Belts                   | Yes/No; No: 1,993,899 (96.8%); Yes: 64,084 (3.2%); No nulls                                                          | T1: Feature; T2: Feature                              | Label encoding (0/1)                                                                                |
  | Personal Injury         | Yes/No; No: 2,032,913 (98.7%); Yes: 25,070 (1.3%); No nulls                                                          | T1: Feature; T3: Feature                              | Label encoding (0/1); Check feature importance                                                      |
  | Property Damage         | Yes/No; No: 2,012,921 (97.7%); Yes: 45,062 (2.3%); No nulls                                                          | T1: Feature; T2: Feature; T3: Feature                 | Label encoding (0/1)                                                                                |
  | Fatal                   | Yes/No; No: 2,057,416 (99.97%); Yes: 567 (0.03%); No nulls                                                           | T3: Feature (for rare event detection)                | Label encoding (0/1); Note: Extremely imbalanced                                                    |
  | Commercial License      | Yes/No; No: 2,000,390 (97.2%); Yes: 57,593 (2.8%); No nulls                                                          | T1: Feature; T2: Feature                              | Label encoding (0/1)                                                                                |
  | HAZMAT                  | Yes/No; No: 2,057,830 (99.99%); Yes: 153 (0.01%); No nulls                                                           | T3: Feature (for rare event detection)                | Label encoding (0/1); Note: Extremely imbalanced                                                    |
  | Commercial Vehicle      | Yes/No; No: 2,051,357 (99.6%); Yes: 6,626 (0.4%); No nulls                                                           | T1: Feature; T2: Feature                              | Label encoding (0/1); Check feature importance                                                      |
  | Alcohol                 | Yes/No; No: 2,055,374 (99.8%); Yes: 2,609 (0.2%); No nulls                                                           | T1: Feature; T3: Feature                              | Label encoding (0/1); Note: Extremely imbalanced                                                    |
  | Work Zone               | Yes/No; No: 2,057,538 (99.99%); Yes: 445 (0.01%); No nulls                                                           | T3: Feature (for rare event detection)                | Label encoding (0/1); Note: Extremely imbalanced                                                    |
  | Search Conducted        | Yes/No; No: 1,186,753 (93.0%); Yes: 89,312 (7.0%); 781,918 nulls (38.0%)                                             | T1: Feature; T3: Feature                              | Impute nulls or create "Unknown" category; Label encoding (0/1)                                     |
  | Search Disposition      | 7 unique values; Top: Nothing (freq: 38,752); 1,967,671 nulls (95.7%)                                                | Exclude (95.7% missing)                               | Exclude or create "No Search" category; One-hot encoding if kept                                    |
  | Search Outcome          | 5 unique values; Top: Warning (freq: 633,691); 801,209 nulls (38.9%)                                                 | T1: Feature; T3: Feature                              | Impute nulls based on Search Conducted or create "No Search" category; One-hot encoding             |
  | Search Reason           | 10 unique values; Top: Incident to Arrest (freq: 51,592); 1,967,671 nulls (95.7%)                                    | Exclude (95.7% missing)                               | Exclude or create "No Search" category; One-hot encoding if kept                                    |
  | Search Reason For Stop  | 836 unique codes; Top: 21-201(a1) (freq: 153,138); 802,221 nulls (38.9%)                                             | T1: Feature (with grouping)                           | Group by code pattern or top categories; Target encoding or grouping; Handle 38.9% nulls            |
  | Search Type             | 6 unique types; Top: Both (freq: 66,906); 1,967,679 nulls (95.7%)                                                    | Exclude (95.7% missing)                               | Exclude or create "No Search" category; One-hot encoding if kept                                    |
  | Search Arrest Reason    | 11 unique reasons; Top: Stop (freq: 39,929); 1,996,217 nulls (97.0%)                                                 | Exclude (97.0% missing)                               | Exclude; One-hot encoding if kept                                                                   |
  | State                   | 72 unique states; Top: MD (freq: 1,787,437, 86.8%); 59 nulls (0.00%)                                                 | T1: Feature; T2: Feature                              | One-hot encoding or target encoding; Group rare states; Handle 59 nulls                             |
  | VehicleType             | 36 unique types; Top: 02 - Automobile (freq: 1,824,314, 88.6%); No nulls                                             | T1: Feature; T2: Feature; T3: Feature                 | One-hot encoding or target encoding                                                                 |
  | Year                    | Range: 0 to 9999; Mean: 2007.6; Median: 2008; Std: 85.1; 50,635 nulls (2.5%)                                         | T1: Feature; T3: Feature (data quality check)         | Filter outliers (0, 9999 invalid); Impute nulls (median: 2008); Consider binning or age calculation |
  | Make                    | 4,918 unique makes; Top: TOYOTA (freq: 239,297, 11.6%); 74 nulls (0.00%)                                             | T1: Feature (with grouping); T2: Feature              | Group rare makes into "Other"; Target encoding or top-N one-hot; Handle 74 nulls                    |
  | Model                   | 23,324 unique models; Top: 4S (freq: 199,319, 9.7%); 223 nulls (0.01%)                                               | Exclude (very high cardinality)                       | Group rare models; Consider combining with Make; Target encoding or exclude; Handle 223 nulls       |
  | Color                   | 26 unique colors; Top: BLACK (freq: 434,242, 21.3%); 22,267 nulls (1.1%)                                             | T1: Feature; T2: Feature; T3: Feature                 | One-hot encoding or target encoding; Handle 22,267 nulls                                            |
  | Violation Type          | 4 unique types; Top: Warning (freq: 1,082,088, 52.5%); No nulls                                                      | T1: Feature; T2: Feature; T3: Feature                 | T1: One-hot encoding (feature); T2/T3: One-hot encoding (feature)                                   |
  | Charge                  | 1,199 unique charge codes; Top: 21-801.1 (freq: 284,319, 13.8%); No nulls                                            | T1: Feature (with grouping); T3: Feature              | Group by code pattern (first digits) or top categories; Target encoding or grouping                 |
  | Article                 | 6 unique articles; Top: Transportation Article (freq: 1,945,847, 98.9%); 92,208 nulls (4.5%)                         | T1: Feature; T2: Feature                              | One-hot encoding; Create "Unknown" category for nulls                                               |
  | Contributed To Accident | True/False; False: 2,001,624 (97.3%); True: 56,359 (2.7%); No nulls                                                  | T1: Feature                                           | Label encoding (0/1); Note: Highly correlated with Accident (target) - can be used as feature       |
  | Race                    | 6 unique races; Top: WHITE (freq: 687,705, 33.4%); No nulls                                                          | T2: Feature (optional, ethical considerations)        | One-hot encoding; Note: Sensitive attribute - consider ethical implications                         |
  | Gender                  | 3 unique values (M/F/U); Top: M (freq: 1,385,905, 67.3%); No nulls                                                   | T2: Feature (optional, ethical considerations)        | One-hot encoding or label encoding; Note: Sensitive attribute - consider ethical implications       |
  | Driver City             | 9,348 unique cities; Top: SILVER SPRING (freq: 500,287, 24.3%); 517 nulls (0.03%)                                    | T1: Feature (with grouping); T3: Feature              | Group rare cities or use geographic clustering; Target encoding or top-N; Handle 517 nulls          |
  | Driver State            | 68 unique states; Top: MD (freq: 1,860,625, 90.4%); 11 nulls (0.00%)                                                 | T1: Feature; T2: Feature                              | One-hot encoding or target encoding; Group rare states; Handle 11 nulls                             |
  | DL State                | 72 unique states; Top: MD (freq: 1,794,583, 87.2%); 9,929 nulls (0.48%)                                              | T1: Feature (if different from Driver State)          | One-hot encoding or target encoding; Consider if different from Driver State; Handle 9,929 nulls    |
  | Arrest Type             | 19 unique types; Top: A - Marked Patrol (freq: 1,648,941, 80.0%); No nulls                                           | T1: Feature; T2: Feature                              | One-hot encoding or target encoding                                                                 |
  | Geolocation             | 1,019,918 unique locations; Top: (0.0, 0.0) (freq: 154,148, 7.5%); No nulls                                          | Exclude (use Latitude/Longitude instead)              | Use Latitude/Longitude instead; Check (0.0, 0.0) as missing data indicator                          |

**Task Assignment Summary:**

- **Hye Ran Yoo**: Attributes 1-14 (14 attributes)
- **Joseph Weng**: Attributes 15-29 (15 attributes)
- **Peng Wang**: Attributes 30-43 (14 attributes)

**Task-Field Mapping:**

This section provides a summary of which fields are used in each task:

**T1 - Classification by Decision Tree (DT):**

- **Target Variable:** Accident
- **Features (28 attributes):**
  - Date Of Stop, Time Of Stop, SubAgency, Description, Latitude, Longitude
  - Belts, Personal Injury, Property Damage
  - Commercial License, Commercial Vehicle, Alcohol
  - Search Conducted, Search Outcome, Search Reason For Stop
  - State, VehicleType, Year, Make, Color
  - Violation Type, Charge, Article, Contributed To Accident
  - Driver City, Driver State, DL State, Arrest Type

**T2 - Clustering & Identify Outliers from Clusters:**

- **Features (20 attributes, with 2 optional):**
  - Date Of Stop, Time Of Stop, SubAgency
  - Latitude (high priority), Longitude (high priority)
  - Accident, Belts, Property Damage
  - Commercial License, Commercial Vehicle
  - State, VehicleType, Make, Color
  - Violation Type, Article
  - Driver State, Arrest Type
  - Race (optional, ethical considerations), Gender (optional, ethical considerations)

**T3 - Outlier Detection by LOF and Isolation Forest (ISF):**

- **Features (19 attributes):**
  - Date Of Stop, Time Of Stop, Location
  - Latitude, Longitude
  - Accident, Personal Injury, Property Damage, Fatal
  - HAZMAT, Work Zone, Search Conducted, Search Outcome
  - VehicleType, Year, Color
  - Violation Type, Charge, Driver City

### 3.3. Explore data

#### 3.3.1. Statistical summaries

**Explanation:** Basic statistical analysis for numeric and categorical variables

**Numeric Variables Summary:**

| Variable  | Count     | Mean    | Std   | Min     | 25%     | 50%     | 75%     | Max     |
| --------- | --------- | ------- | ----- | ------- | ------- | ------- | ------- | ------- |
| Latitude  | 2,057,983 | 36.16   | 10.29 | 0.00    | 39.02   | 39.07   | 39.14   | 41.54   |
| Longitude | 2,057,983 | -71.34  | 20.30 | -151.26 | -77.19  | -77.09  | -77.03  | 39.06   |
| Year      | 2,047,348 | 2007.57 | 85.11 | 0.00    | 2003.00 | 2008.00 | 2013.00 | 9999.00 |

**Boolean Variables Summary:**

Contributed To Accident:
False: 2,001,624 (97.26%)
True: 56,359 (2.74%)

**Categorical Variables Summary:**

Total categorical variables: 37

**Key Findings:**

**Date Of Stop:**

- Unique values: 5,052
- Missing values: 0 (0.00%)
- Most frequent: '03/17/2015' (1,281 occurrences, 0.1%)
- Note: High cardinality (5,052 unique values) - consider grouping for analysis

**Time Of Stop:**

- Unique values: 1,440
- Missing values: 0 (0.00%)
- Most frequent: '23:30:00' (2,996 occurrences, 0.1%)
- Note: High cardinality (1,440 unique values) - consider grouping for analysis

**Agency:**

- Unique values: 1
- Missing values: 0 (0.00%)
- Top values:
  - MCP: 2,057,983 (100.0%)

**SubAgency:**

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

**Description:**

- Unique values: 17,721
- Missing values: 10 (0.00%)
- Most frequent: 'DRIVER FAILURE TO OBEY PROPERLY PLACED TRAFFIC CONTROL DEVICE INSTRUCTIONS' (170,319 occurrences, 8.3%)
- Note: High cardinality (17,721 unique values) - consider grouping for analysis

**Location:**

- Unique values: 268,060
- Missing values: 4 (0.00%)
- Most frequent: 'MONTGOMERY VILLAGE AVE @ RUSSELL AVE' (2,447 occurrences, 0.1%)
- Note: High cardinality (268,060 unique values) - consider grouping for analysis

**Accident:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,001,624 (97.3%)
  - Yes: 56,359 (2.7%)

**Belts:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 1,993,899 (96.9%)
  - Yes: 64,084 (3.1%)

**Personal Injury:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,032,913 (98.8%)
  - Yes: 25,070 (1.2%)

**Property Damage:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,012,921 (97.8%)
  - Yes: 45,062 (2.2%)

**Fatal:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,057,416 (100.0%)
  - Yes: 567 (0.0%)

**Commercial License:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,000,390 (97.2%)
  - Yes: 57,593 (2.8%)

**HAZMAT:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,057,830 (100.0%)
  - Yes: 153 (0.0%)

**Commercial Vehicle:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,051,357 (99.7%)
  - Yes: 6,626 (0.3%)

**Alcohol:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,055,374 (99.9%)
  - Yes: 2,609 (0.1%)

**Work Zone:**

- Unique values: 2
- Missing values: 0 (0.00%)
- Top values:
  - No: 2,057,538 (100.0%)
  - Yes: 445 (0.0%)

**Search Conducted:**

- Unique values: 2
- Missing values: 781,918 (37.99%)
- Top values:
  - No: 1,186,753 (57.7%)
  - Yes: 89,312 (4.3%)

**Search Disposition:**

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

**Search Outcome:**

- Unique values: 5
- Missing values: 801,209 (38.93%)
- Top values:
  - Warning: 633,691 (30.8%)
  - Citation: 523,988 (25.5%)
  - Arrest: 62,634 (3.0%)
  - SERO: 36,458 (1.8%)
  - Recovered Evidence: 3 (0.0%)

**Search Reason:**

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

**Search Reason For Stop:**

- Unique values: 836
- Missing values: 782,221 (38.01%)
- Most frequent: '21-201(a1)' (153,138 occurrences, 7.4%)
- Note: High cardinality (836 unique values) - consider grouping for analysis

**Search Type:**

- Unique values: 6
- Missing values: 1,968,679 (95.66%)
- Top values:
  - Both: 66,906 (3.3%)
  - Property: 11,952 (0.6%)
  - Person: 10,436 (0.5%)
  - car: 4 (0.0%)
  - PC: 3 (0.0%)
  - Search Incidental: 3 (0.0%)

**Search Arrest Reason:**

- Unique values: 11
- Missing values: 1,996,217 (97.00%)
- Top values:
  - Stop: 39,929 (1.9%)
  - Search: 11,718 (0.6%)
  - Other: 6,886 (0.3%)
  - Warrant: 3,173 (0.2%)
  - Traffic: 28 (0.0%)
  - DUI: 13 (0.0%)
  - alcohol: 6 (0.0%)
  - Marihuana: 5 (0.0%)
  - driving: 3 (0.0%)
  - Criminal: 3 (0.0%)

**State:**

- Unique values: 72
- Missing values: 59 (0.00%)
- Top 5 values:
  - MD: 1,787,437 (86.9%)
  - VA: 97,522 (4.7%)
  - DC: 50,744 (2.5%)
  - XX: 16,414 (0.8%)
  - PA: 14,228 (0.7%)

**VehicleType:**

- Unique values: 36
- Missing values: 0 (0.00%)
- Top 5 values:
  - 02 - Automobile: 1,824,314 (88.6%)
  - 05 - Light Duty Truck: 107,898 (5.2%)
  - 28 - Other: 35,070 (1.7%)
  - 03 - Station Wagon: 28,542 (1.4%)
  - 01 - Motorcycle: 19,004 (0.9%)

**Make:**

- Unique values: 4,918
- Missing values: 74 (0.00%)
- Most frequent: 'TOYOTA' (239,297 occurrences, 11.6%)
- Note: High cardinality (4,918 unique values) - consider grouping for analysis

**Model:**

- Unique values: 23,324
- Missing values: 223 (0.01%)
- Most frequent: '4S' (199,319 occurrences, 9.7%)
- Note: High cardinality (23,324 unique values) - consider grouping for analysis

**Color:**

- Unique values: 26
- Missing values: 22,267 (1.08%)
- Top 5 values:
  - BLACK: 434,242 (21.1%)
  - SILVER: 364,068 (17.7%)
  - WHITE: 339,556 (16.5%)
  - GRAY: 250,933 (12.2%)
  - RED: 156,494 (7.6%)

**Violation Type:**

- Unique values: 4
- Missing values: 0 (0.00%)
- Top values:
  - Warning: 1,082,088 (52.6%)
  - Citation: 883,687 (42.9%)
  - ESERO: 91,306 (4.4%)
  - SERO: 902 (0.0%)

**Charge:**

- Unique values: 1,199
- Missing values: 0 (0.00%)
- Most frequent: '21-801.1' (284,319 occurrences, 13.8%)
- Note: High cardinality (1,199 unique values) - consider grouping for analysis

**Article:**

- Unique values: 6
- Missing values: 92,208 (4.48%)
- Top values:
  - Transportation Article: 1,945,847 (94.6%)
  - Maryland Rules: 19,833 (1.0%)
  - BR: 61 (0.0%)
  - TG: 22 (0.0%)
  - 1A: 9 (0.0%)
  - 00: 3 (0.0%)

**Race:**

- Unique values: 6
- Missing values: 0 (0.00%)
- Top values:
  - WHITE: 687,705 (33.4%)
  - BLACK: 652,464 (31.7%)
  - HISPANIC: 461,558 (22.4%)
  - OTHER: 136,768 (6.6%)
  - ASIAN: 115,968 (5.6%)
  - NATIVE AMERICAN: 3,520 (0.2%)

**Gender:**

- Unique values: 3
- Missing values: 0 (0.00%)
- Top values:
  - M: 1,385,905 (67.3%)
  - F: 668,567 (32.5%)
  - U: 3,511 (0.2%)

**Driver City:**

- Unique values: 9,348
- Missing values: 517 (0.03%)
- Most frequent: 'SILVER SPRING' (500,287 occurrences, 24.3%)
- Note: High cardinality (9,348 unique values) - consider grouping for analysis

**Driver State:**

- Unique values: 68
- Missing values: 11 (0.00%)
- Top 5 values:
  - MD: 1,860,625 (90.4%)
  - DC: 67,528 (3.3%)
  - VA: 62,574 (3.0%)
  - PA: 10,146 (0.5%)
  - FL: 7,191 (0.3%)

**DL State:**

- Unique values: 72
- Missing values: 929 (0.05%)
- Top 5 values:
  - MD: 1,794,583 (87.2%)
  - DC: 68,495 (3.3%)
  - VA: 66,560 (3.2%)
  - XX: 29,511 (1.4%)
  - PA: 12,003 (0.6%)

**Arrest Type:**

- Unique values: 19
- Missing values: 0 (0.00%)
- Top values:

  - A - Marked Patrol: 1,648,941 (80.1%)
  - Q - Marked Laser: 198,214 (9.6%)
  - B - Unmarked Patrol: 96,368 (4.7%)
  - L - Motorcycle: 20,822 (1.0%)
  - G - Marked Moving Radar (Stationary): 19,595 (1.0%)
  - S - License Plate Recognition: 16,404 (0.8%)
  - E - Marked Stationary Radar: 15,987 (0.8%)
  - O - Foot Patrol: 14,901 (0.7%)
  - R - Unmarked Laser: 10,678 (0.5%)
  - M - Marked (Off-Duty): 5,503 (0.3%)

#### 3.3.2: Data visualization

### 3.4. Verify data quality

## 4. Classification by Decision Trees

_By: Hye Ran Yoo (041145212)_

### 4.1. Data Preparation

#### 4.1.1. Select data

**Target Dataset:**

- Filter dataset to most recent complete year (avoiding partial year 2025 if applicable)
- If data volume exceeds 10,000 instances after filtering, apply stratified sampling to obtain a representative sample of 10,000 records
- Ensure stratified sampling maintains proportional distribution of the classification target variable

**Attribute Selection for Classification:**

- **Target Variable**: Violation type or severity level (to be determined after data exploration)
- **Candidate Features** (at least 10 attributes required):
  - Time-related attributes (if available):
    - Hour of day
    - Day of week (Weekday/Weekend)
    - Month
    - Season
    - Time of day category (Morning, Afternoon, Evening, Night, Late Night)
  - Location attributes:
    - Geographic region (after clustering coordinates if latitude/longitude available)
    - Area type (residential, commercial, highway, etc.)
  - Violation characteristics:
    - Vehicle type
    - Vehicle model year (if available)
  - Fine and officer information:
    - Fine amount (binned into categories)
    - Officer experience (if available)
  - Derived attributes:
    - Traffic density estimates (if applicable)
    - Weather conditions (if available)
    - Day type (holiday vs. regular day)

**Selection Criteria:**

- Attributes must have predictive power for the target variable
- Remove highly correlated redundant attributes
- Ensure attributes are categorical or can be discretized appropriately for decision tree analysis

#### 4.1.2. Clean data

**Missing Value Handling:**

- Identify missing values in each selected attribute
- For categorical attributes: replace missing values with mode or create "Unknown" category
- For numerical attributes: replace missing values with median or mean, or use binning to create "Unknown" category
- Consider removing records with critical missing values if percentage is small (<5%)

**Outlier Handling:**

- Detect outliers in numerical attributes using IQR method
- Decide on treatment: cap outliers, remove, or create special "extreme" categories
- Document any removed records for transparency

**Duplicate Removal:**

- Identify and remove exact duplicate records
- Check for near-duplicates based on key attributes (date, time, location, violation type)
- Keep first occurrence when duplicates are found

**Data Validation:**

- Verify logical consistency (e.g., date ranges, valid coordinates)
- Ensure categorical values match expected categories
- Flag and handle any inconsistent or invalid entries

#### 4.1.3. Construct data

**New Attribute Creation:**
Based on available data, construct the following attributes:

1. **TimeOfDay** (from timestamp):

   - Morning: 6:00-11:59
   - Afternoon: 12:00-17:59
   - Evening: 18:00-21:59
   - Night: 22:00-01:59
   - Late Night: 02:00-05:59

2. **DayType** (from date):

   - Weekday: Monday-Friday
   - Weekend: Saturday-Sunday

3. **Season** (from date):

   - Spring: March-May
   - Summer: June-August
   - Fall: September-November
   - Winter: December-February

4. **FineCategory** (from fine amount):

   - Low: $0-50
   - Medium: $51-200
   - High: $201-500
   - Very High: $501+

5. **GeographicRegion** (if coordinates available):

   - Apply kMeans clustering on latitude/longitude
   - Create 5-8 distinct regions
   - Assign region labels to each record

**Transformations:**

- Convert numerical continuous attributes to categorical bins where appropriate
- Ensure target variable is properly encoded as categorical

#### 4.1.4. Integrate data

**Data Integration Steps:**

- Combine all constructed and selected attributes into a single dataset
- Verify referential integrity between attributes
- Ensure consistent ID assignment across all records
- Create final integrated dataset ready for modeling

**Quality Check:**

- Confirm no missing values in final dataset
- Verify data types are correct for each attribute
- Check data distribution remains balanced

#### 4.1.5. Format data

**Data Formatting:**

- Set correct data types: categorical attributes as category type, numerical as appropriate
- Encode categorical attributes using ordinal encoder if order matters
- Ensure target variable is properly labeled
- Split data into training and testing sets (typically 70/30 or 80/20)
- Apply stratified sampling to training/test split to maintain class distribution

**Final Dataset Specifications:**

- Total instances: 10,000 (or as available after sampling)
- Number of attributes: At least 10 features plus target variable
- Data types: All categorical/binned attributes ready for decision tree
- Missing values: 0%
- Target distribution: Document class distribution for reference

**Documentation:**

- Create data dictionary documenting all attributes, their types, and categories
- Save processed dataset for modeling phase
- Document any transformations applied

### 4.2. Modelling

#### 4.2.1. Select modeling techniques

**Decision Tree Classifier:**

- **Algorithm**: CART (Classification and Regression Trees) using Gini impurity
- **Rationale**: Decision trees provide interpretable rules and can handle categorical features well after encoding
- **Implementation**: sklearn DecisionTreeClassifier
- **Key Parameters to Tune**:
  - `max_depth`: Control tree complexity to prevent overfitting
  - `min_samples_split`: Minimum samples required to split a node
  - `min_samples_leaf`: Minimum samples required at a leaf node
  - `criterion`: Gini impurity or entropy for splitting

**Alternative Techniques Considered:**

- Random Forest: Ensemble method that might improve accuracy but reduces interpretability
- k-NN: Distance-based classifier, but less interpretable for business insights

#### 4.2.2. Generate test design

**Train-Test Split Strategy:**

- Split ratio: 80% training, 20% testing
- Stratified sampling: Maintain class distribution in both sets
- Random seed: Fixed seed (e.g., 2025) for reproducibility

**Cross-Validation Strategy:**

- Use 5-fold cross-validation for hyperparameter tuning
- Stratified k-fold to maintain class distribution in each fold

**Model Evaluation Metrics:**

- **Primary Metrics**:
  - Accuracy: Overall classification correctness
  - Confusion Matrix: Detailed breakdown of true/false positives/negatives
  - Precision, Recall, F1-Score: Per-class performance metrics
- **Additional Metrics**:
  - Feature Importance: Identify most influential attributes
  - Tree Depth and Complexity: Assess model complexity

#### 4.2.3. Build model

**Model Training Process:**

1. **Feature Encoding**:

   - Apply one-hot encoding to categorical features
   - Ensure all features are in numeric format

2. **Hyperparameter Tuning**:

   - Grid search or random search over parameter space:
     - `max_depth`: [3, 5, 7, 10, 15, None]
     - `min_samples_split`: [2, 5, 10, 20]
     - `min_samples_leaf`: [1, 2, 4, 8]
   - Select parameters that maximize cross-validation accuracy while preventing overfitting

3. **Model Training**:

   - Train decision tree with selected hyperparameters
   - Record training time and model size

4. **Tree Visualization**:

   - Visualize decision tree structure (limited depth for readability)
   - Extract and document key decision rules

**Model Output:**

- Trained decision tree classifier
- Feature importance scores
- Decision tree visualization
- Extracted IF-THEN rules (top 5-10 rules)

#### 4.2.4. Assess model

**Model Performance Assessment:**

- **Training Set Performance**:

  - Calculate accuracy, precision, recall, F1-score on training data
  - Identify potential overfitting if training accuracy is much higher than validation accuracy

- **Test Set Performance**:

  - Evaluate on held-out test set (unseen during training)
  - Calculate confusion matrix and all classification metrics
  - Compare test performance with training performance

**Model Complexity Analysis:**

- Tree depth and number of leaves
- Number of features used in splits
- Assess if model is too simple (underfitting) or too complex (overfitting)

**Business Relevance Assessment:**

- Interpretability: Can decision rules be explained to stakeholders?
- Feature importance: Do identified key factors align with domain knowledge?
- Actionability: Can insights be translated into actionable prevention strategies?

### 4.3. Evaluation

#### 4.3.1. Evaluate results

**Performance Summary:**

- Test set accuracy: [To be filled after model training]
- Precision, Recall, F1-Score for each violation type:
  - [Class 1]: Precision = [X], Recall = [Y], F1 = [Z]
  - [Class 2]: Precision = [X], Recall = [Y], F1 = [Z]
  - [Additional classes...]

**Confusion Matrix Analysis:**

- Present confusion matrix visualization
- Identify most commonly confused violation types
- Analyze false positives and false negatives

**Feature Importance Ranking:**

- Top 10 most important features for classification:

  1. [Feature 1]: [Importance score]
  2. [Feature 2]: [Importance score]

  - [Continue for top 10...]

**Model Comparison:**

- Compare decision tree performance with baseline (e.g., majority class classifier)
- Document any attempts with alternative models and their results

#### 4.3.2. Interpret results

**Key Decision Rules:**

Extract and interpret top 5-10 IF-THEN rules from the decision tree:

1. **Rule 1**: IF [condition] THEN [violation type]

   - Business interpretation: [Explain what this rule means for traffic management]

2. **Rule 2**: IF [condition] THEN [violation type]

   - Business interpretation: [Explain implications]
   - [Continue for other rules...]

**Feature Insights:**

- **Most Influential Factors**: Based on feature importance, identify the top contributing factors
  - Example insights:
    - Time-related factors (e.g., hour of day, day type) have high importance
    - Geographic location significantly influences violation types
    - Fine amount correlates with certain violation patterns

**Business Implications:**

- **Resource Allocation**: Identify high-risk time periods and locations for targeted patrol deployment
- **Prevention Strategies**: Develop targeted prevention campaigns based on identified patterns
- **Policy Recommendations**: Suggest policy changes based on decision tree insights

#### 4.3.3. Review of process

**Data Preparation Review:**

- Data quality: Assess if data cleaning and preprocessing were adequate
- Feature engineering: Review if constructed features improved model performance
- Sample size: Evaluate if 10,000 instances were sufficient for stable model

**Modeling Process Review:**

- Hyperparameter tuning: Assess if search space was comprehensive
- Model selection: Justify choice of decision tree over alternatives
- Validation strategy: Evaluate if cross-validation prevented overfitting effectively

**Lessons Learned:**

- Challenges encountered during the process
- Solutions implemented
- Areas for improvement in future iterations

#### 4.3.4. Determine next steps

**Immediate Actions:**

- Implement identified prevention strategies based on decision rules
- Monitor violation patterns to validate model predictions
- Collect additional data if model performance is insufficient

**Future Enhancements:**

- Explore ensemble methods (Random Forest) for improved accuracy
- Incorporate additional features (weather data, traffic density) if available
- Develop separate models for different violation categories
- Implement model retraining pipeline for continuous improvement

## 5. Clustering by kMeans (clustering and finding outliers)

_By: Joseph Weng (041076091)_

### 5.1. Data Preparation

#### 5.1.1. Select data

**Dataset Selection:**

- Use same temporal filtering as classification task
- Apply stratified sampling to 10,000 instances if necessary
- Consider selecting a subset of attributes optimal for clustering

**Attribute Selection for Clustering:**
Clustering requires numerical attributes. Selected attributes include:

- **Geographic Attributes**:

  - Latitude, Longitude (if available)
  - Distance from city center
  - Local population density

- **Temporal Attributes**:

  - Hour of day (numerical 0-23)
  - Day of week (numerical 0-6)
  - Month (numerical 1-12)

- **Violation Attributes**:

  - Fine amount
  - Violation severity score (if derivable)

- **Behavioral Attributes**:

  - Time since last violation (if traceable)
  - Number of violations in surrounding area

**Selection Strategy:**

- Prioritize attributes that reveal natural groupings in violation patterns
- Ensure sufficient variation in attributes to form meaningful clusters
- Consider dimensionality reduction if too many features

#### 5.1.2. Clean data

**Cleaning Requirements:**

- Handle missing values in numerical attributes (impute with median or remove)
- Cap or transform outliers to prevent them from dominating clusters
- Remove duplicates and irrelevant records
- Ensure numerical attributes are on similar scales (prepare for normalization)

#### 5.1.3. Construct data

**Feature Engineering:**

- Normalize all numerical attributes to 0-1 scale using MinMaxScaler or StandardScaler
- Create composite features (e.g., density-adjusted violation rate)
- Derive temporal patterns from raw timestamps
- Calculate distance-based features if applicable

**Geographic Processing:**

- If latitude/longitude available, ensure valid coordinate ranges
- Optionally convert to local coordinate system for more accurate distance calculations
- Create spatial features (distance metrics, neighborhood indicators)

#### 5.1.4. Integrate data

**Integration:**

- Combine all selected and constructed numerical attributes
- Verify data consistency
- Create integrated dataset with standardized scales

#### 5.1.5. Format data

**Final Formatting:**

- Scale all numerical attributes (MinMax or Standard scaling)
- Remove any remaining categorical attributes or convert to numerical
- Ensure all attributes are in compatible formats
- Save formatted dataset for kMeans clustering

**Outlier Detection by Clustering Approach:**

- After clustering, identify outliers as:
  - Points that are far from their cluster centroids
  - Points in very small clusters (potential anomalies)
  - Points with high intra-cluster distance
- Document outlier identification criteria and thresholds

### 5.2. Modelling

#### 5.2.1. Select modeling techniques

**k-Means Clustering:**

- **Algorithm**: k-Means clustering for grouping similar violation patterns
- **Rationale**: Effective for identifying natural groupings in numerical data; computationally efficient
- **Implementation**: sklearn KMeans
- **Key Parameters**:
  - `n_clusters`: Number of clusters (k) - determined by elbow method and silhouette analysis
  - `init`: Initialization method ('k-means++' recommended)
  - `max_iter`: Maximum iterations for convergence
  - `random_state`: For reproducibility

**Clustering-based Outlier Detection:**

- Identify outliers as:
  - Points far from cluster centroids (distance > threshold)
  - Points in small clusters (cluster size < threshold)
  - Points with high intra-cluster distance

#### 5.2.2. Generate test design

**Optimal k Selection Strategy:**

- **Elbow Method**: Plot WCSS (Within-Cluster Sum of Squares) vs. k values
  - Test k values from 2 to 15 or until clear elbow appears
- **Silhouette Analysis**: Calculate silhouette coefficient for different k values
  - Select k with highest average silhouette score
- **Domain Knowledge**: Consider interpretability and business relevance

**Evaluation Metrics:**

- **Clustering Quality Metrics**:
  - WCSS (Within-Cluster Sum of Squares): Measure of cluster compactness
  - Silhouette Score: Measures cohesion within clusters and separation between clusters
  - Davies-Bouldin Index: Lower is better (measures cluster separation)
- **Outlier Detection Metrics**:
  - Percentage of identified outliers
  - Distribution of outliers across clusters
  - Average distance of outliers from centroids

**Visualization Strategy:**

- 2D/3D scatter plots of clusters (using PCA if dimensionality > 3)
- Elbow curve plot
- Silhouette plot for selected k
- Cluster centroids comparison

#### 5.2.3. Build model

**Model Training Process:**

1. **Determine Optimal k**:

   - Apply elbow method: Train k-Means for k = 2 to 15
   - Calculate WCSS for each k value
   - Plot WCSS vs. k and identify elbow point
   - Calculate silhouette scores for candidate k values
   - Select optimal k based on elbow method, silhouette score, and interpretability

2. **Train Final Model**:

   - Train k-Means with optimal k value
   - Run multiple initializations and select best result (lowest WCSS)
   - Assign cluster labels to all data points

3. **Outlier Identification**:

   - Calculate distance from each point to its cluster centroid
   - Identify outliers using:
     - Threshold method: Points with distance > (mean + 2\*std) from centroid
     - Small cluster method: Points in clusters with size < 1% of total data
   - Document outlier criteria and thresholds used

**Model Output:**

- Trained k-Means model with optimal k clusters
- Cluster labels for all data points
- Cluster centroids (mean values for each feature per cluster)
- Identified outlier points and their characteristics
- Visualization plots (elbow curve, silhouette plot, cluster visualization)

#### 5.2.4. Assess model

**Clustering Quality Assessment:**

- **Silhouette Score**: [Value] (range: -1 to 1, higher is better)
  - Interpretation: [Good/Fair/Poor clustering quality]
- **WCSS**: [Value] - Lower is better, but decreases with increasing k
- **Davies-Bouldin Index**: [Value] - Lower indicates better separation

**Cluster Characterization:**

For each cluster, describe:

- **Cluster 1**:

  - Size: [Number] instances ([Percentage]% of data)
  - Characteristics: [Describe key attributes - e.g., "High fine amounts, evening violations, urban areas"]
  - Centroid values: [Mean values for key features]
  - Business interpretation: [What this cluster represents]

- **Cluster 2**: [Similar structure...]

  - [Continue for all clusters]

**Outlier Assessment:**

- Total outliers identified: [Number] ([Percentage]%)
- Outlier distribution across clusters: [Breakdown by cluster]
- Average distance from centroids: [Value]
- Characteristics of outliers: [Common patterns in outlier features]

**Model Stability Assessment:**

- Run k-Means multiple times with different random seeds
- Assess consistency of cluster assignments
- If clusters vary significantly, consider k-Means++ initialization or increase max_iter

### 5.3. Evaluation

#### 5.3.1. Evaluate results

**Clustering Results Summary:**

- Optimal k selected: [Value] clusters
- Silhouette Score: [Value]
- WCSS: [Value]
- Davies-Bouldin Index: [Value]

**Cluster Distribution:**

- Cluster sizes: [List distribution of instances across clusters]
- Cluster balance: [Assess if clusters are balanced or imbalanced]

**Outlier Detection Results:**

- Total outliers detected: [Number] out of [Total] instances ([Percentage]%)
- Outlier breakdown by cluster: [Table or list showing outliers per cluster]
- Outlier characteristics summary: [Key patterns in outlier data]

**Visualization Results:**

- Present elbow curve showing optimal k selection
- Display cluster visualization (2D/3D plots with cluster assignments)
- Show silhouette plot for selected k

#### 5.3.2. Interpret results

**Cluster Interpretation:**

For each cluster, provide business interpretation:

- **Cluster 1: [Name/Description]**

  - Pattern: [Describe the violation pattern - e.g., "Evening rush-hour violations in commercial districts"]
  - Key attributes: [List dominant characteristics]
  - Business insight: [What does this mean for traffic management?]
  - Recommendations: [Suggested actions based on this cluster]

- **Cluster 2**: [Similar interpretation...]

  - [Continue for all clusters]

**Outlier Interpretation:**

- **Common Outlier Patterns**:

  - Pattern 1: [Describe - e.g., "Extremely high fine amounts at unusual times"]
  - Pattern 2: [Describe - e.g., "Violations in remote locations with atypical characteristics"]
  - [Additional patterns...]

- **Business Implications of Outliers**:

  - Potential data quality issues: [Outliers that may indicate errors]
  - Unusual cases warranting investigation: [Outliers requiring further analysis]
  - Potential fraudulent activities: [If applicable]

**Pattern Discovery:**

- **Temporal Patterns**: [Identify time-related clusters]
- **Geographic Patterns**: [Identify location-related clusters]
- **Severity Patterns**: [Identify violation severity-related clusters]

#### 5.3.3. Review of process

**Data Preparation Review:**

- Feature selection: Assess if selected numerical attributes were appropriate for clustering
- Normalization: Evaluate if scaling method (MinMax/Standard) was effective
- Dimensionality: Consider if dimensionality reduction would improve results

**Modeling Process Review:**

- k selection: Assess if elbow method and silhouette analysis provided clear optimal k
- k
- Initialization: Evaluate if k-means++ initialization improved convergence
- Convergence: Check if max_iter was sufficient for model convergence

**Outlier Detection Review:**

- Threshold selection: Assess if outlier detection thresholds were appropriate
- Multiple criteria: Evaluate effectiveness of combining distance-based and cluster-size-based methods

**Lessons Learned:**

- Challenges: [Document challenges encountered]
- Solutions: [Solutions implemented]
- Improvements: [Areas for future improvement]

#### 5.3.4. Determine next steps

**Immediate Actions:**

- Validate cluster interpretations with domain experts
- Investigate identified outliers for data quality or business anomalies
- Implement resource allocation based on cluster patterns

**Future Enhancements:**

- Experiment with different clustering algorithms (DBSCAN, Hierarchical clustering)
- Incorporate additional features for more nuanced clustering
- Develop dynamic clustering approach for time-evolving patterns
- Integrate clustering results with classification model for hybrid approach

## 6. Outlier Detection by LOF and Isolation Forest (ISF) (and common outliers)

_By: Peng Wang (041107730)_

### 6.1. Data Preparation

#### 6.1.1. Select data

**Dataset Selection:**

- Use same temporal filtering as classification task
- Apply stratified sampling to 10,000 instances if necessary
- Focus on numerical attributes suitable for distance-based outlier detection

**Attribute Selection for Outlier Detection:**

LOF (Local Outlier Factor) and Isolation Forest work best with numerical attributes:

- **All Numerical Attributes** from original dataset:

  - Temporal features (hour, day, month as numerical values)
  - Fine amounts
  - Geographic coordinates (if available)
  - Vehicle model year (if available)
  - Any severity scores

- **Transformed Attributes**:

  - Encoded categorical features (if necessary)
  - Composite features derived from multiple attributes

**Selection Criteria:**

- Include attributes that might reveal different types of outliers
- Ensure numerical representation for distance-based methods
- Balance between comprehensive feature set and computational efficiency

#### 6.1.2. Clean data

**Pre-processing Requirements:**

- Handle missing values in numerical attributes:
  - Impute with median for robust handling
  - Consider marking imputed values for analysis
- Remove duplicates that would affect outlier statistics
- Document any records removed during cleaning

**Outlier Pre-treatment:**

- Note: Initial dataset may contain outliers that need detection
- Do not pre-remove apparent outliers as they are the targets of detection
- Only remove obvious data quality issues (invalid values, corrupted records)

#### 6.1.3. Construct data

**Normalization:**

- **Standard Scaler**: For LOF distance calculations, use Standard Scaler to center data at mean and scale to unit variance
- **MinMax Scaler**: As alternative, normalize to [0,1] range for Isolation Forest
- \*\*MinMax
- Document which scaling method is used for each method

**Feature Engineering:**

- Create derived features that might enhance outlier detection:
  - Distance from mean for each attribute
  - Z-scores for key attributes
  - Interaction terms for highly correlated attributes
- Ensure no leakage in feature creation

#### 6.1.4. Integrate data

**Final Dataset:**

- Combine all numerical attributes
- Apply chosen normalization method(s)
- Verify data consistency
- Create clean dataset ready for LOF and Isolation Forest algorithms

#### 6.1.5. Format data

**Final Formatting:**

- Ensure all attributes are numerical and scaled
- Remove any remaining categorical attributes or properly encode them
- Split into training/testing sets if required by chosen implementation
- Save processed datasets for both methods

**Documentation:**

- Document scaling methods used
- Create data dictionary
- Note any special considerations for outlier detection context

### 6.2. Modelling

#### 6.2.1. Select modeling techniques

**Local Outlier Factor (LOF):**

- **Algorithm**: Density-based outlier detection using local reachability density
- **Rationale**: Effective for detecting outliers in regions of varying density; identifies local anomalies
- **Implementation**: sklearn LocalOutlierFactor
- **Key Parameters**:
  - `n_neighbors`: Number of neighbors to consider (typically 5-20)
- `n_neighbors`
  - `contamination`: Expected proportion of outliers (0.0 to 0.5)
- `contamination`
  - `metric`: Distance metric (default: 'minkowski' with p=2 for Euclidean)
- `metric`

**Isolation Forest (ISF):**

- **Algorithm**: Tree-based ensemble method that isolates outliers by random partitioning
- **Rationale**: Efficient for high-dimensional data; does not require distance calculations; effective for detecting global outliers
- **Implementation**: sklearn IsolationForest
- **Key Parameters**:
  - `n_estimators`: Number of trees in the ensemble (typically 100-200)
- `n_estimators`
  - `contamination`: Expected proportion of outliers
- `contamination`
  - `max_samples`: Number of samples to draw for each tree (default: 'auto')
- `max_samples`
  - `random_state`: For reproducibility
- `random_state`

**Traditional Statistical Methods:**

- **Z-Score Method**: Identify outliers beyond ±3 standard deviations from mean
- \*\*Z
- **IQR Method**: Identify outliers beyond Q1 - 1.5×IQR or Q3 + 1.5×IQR
- \*\*IQR

#### 6.2.2. Generate test design

**Outlier Detection Strategy:**

- Apply multiple methods (LOF, Isolation Forest, Z-score, IQR) for comprehensive detection
- Compare results across methods to identify consensus outliers
- Analyze method-specific outliers (detected by only one method)

**Contamination Parameter Selection:**

- Start with expected outlier proportion (e.g., 5% = 0.05)
- Adjust based on domain knowledge and validation results
- Consider different contamination levels for sensitivity analysis

**Evaluation Metrics:**

- **Outlier Detection Metrics**:
  - Number and percentage of outliers detected by each method
  - Overlap between methods (consensus outliers)
  - Outlier scores/ranks for each method
- **Method Comparison**:
  - Venn diagram or overlap matrix showing method agreement
  - Comparison of outlier characteristics across methods

**Validation Strategy:**

- Manual review of top outliers from each method
- Compare with domain expert knowledge
- Analyze false positives (normal cases flagged as outliers)

#### 6.2.3. Build model

**LOF Model Training:**

1. **Parameter Tuning**:

   - Test different `n_neighbors` values (5, 10, 15, 20)
   - Set `contamination` based on expected outlier rate
   - Use Standard Scaler for distance calculations

2. **Model Training**:

   - Fit LOF model on normalized data
   - Obtain outlier labels (-1 for outliers, 1 for inliers)
   - Extract LOF scores (higher = more outlier-like)

**Isolation Forest Model Training:**

1. **Parameter Tuning**:

   - Set `n_estimators` (e.g., 100)
   - Set `contamination` to match LOF for comparison
   - Use default `max_samples='auto'` or specify sample size

2. **Model Training**:

   - Fit Isolation Forest on normalized data
   - Obtain outlier labels (-1 for outliers, 1 for inliers)
   - Extract anomaly scores (negative scores indicate outliers)

**Statistical Methods Application:**

1. **Z-Score Method**:

   - Calculate Z-scores for each feature
   - Identify outliers where |Z-score| > 3
   - Count outliers per instance (instances with outliers in multiple features)

2. **IQR Method**:

   - Calculate Q1, Q3, and IQR for each numerical feature
   - Identify outliers beyond [Q1 - 1.5×IQR, Q3 + 1.5×IQR]
   - Aggregate outliers across features per instance

**Model Output:**

- LOF outlier labels and scores
- Isolation Forest outlier labels and anomaly scores
- Z-score and IQR outlier flags
- Consensus outliers (detected by multiple methods)
- Visualization of outlier distributions

#### 6.2.4. Assess model

**Method Comparison:**

- **Outlier Count Comparison**:

  - LOF detected: [Number] outliers ([Percentage]%)
  - Isolation Forest detected: [Number] outliers ([Percentage]%)
  - Z-Score detected: [Number] outliers ([Percentage]%)
  - IQR detected: [Number] outliers ([Percentage]%)

- **Method Agreement**:

  - Consensus outliers (detected by ≥2 methods): [Number]
  - LOF-only outliers: [Number]
  - Isolation Forest-only outliers: [Number]
  - Create Venn diagram or overlap matrix

**Outlier Characteristics Analysis:**

- **Consensus Outliers** (most reliable):

  - Average feature values: [Summary statistics]
  - Common patterns: [Describe characteristics]
  - Business interpretation: [What do these outliers represent?]

- **Method-Specific Outliers**:

  - LOF-specific: [Characteristics of outliers detected only by LOF]
  - Isolation Forest-specific: [Characteristics]

**Score Distribution Analysis:**

- Plot distribution of LOF scores and Isolation Forest anomaly scores
- Identify threshold regions where outliers cluster
- Compare score distributions between detected outliers and inliers

**Method Performance Assessment:**

- **LOF Performance**:
- \*\*LOF

  - Strengths: Good at detecting local density anomalies
  - Limitations: Sensitive to n_neighbors parameter; computationally expensive for large datasets

- **Isolation Forest Performance**:

  - Strengths: Fast, scalable, handles high-dimensional data well
  - Limitations: May miss local anomalies in dense regions

- **Statistical Methods Performance**:

  - Z-Score: Simple but assumes normal distribution
  - IQR: Robust to outliers but may miss subtle anomalies

### 6.3. Evaluation

#### 6.3.1. Evaluate results

**Outlier Detection Summary:**

- Total unique outliers detected: [Number] ([Percentage]% of dataset)
- Consensus outliers (detected by ≥2 methods): [Number] ([Percentage]%)
- High-confidence outliers (detected by ≥3 methods): [Number] ([Percentage]%)

**Method-Specific Results:**

- **LOF Results**:

  - Outliers detected: [Number]
  - Average LOF score: [Value] (typical range: 0.5-2.0, >1 indicates outlier)
  - Distribution: [Summary of outlier characteristics]

- **Isolation Forest Results**:

  - Outliers detected: [Number]
  - Average anomaly score: [Value] (negative values indicate outliers)
  - Distribution: [Summary]

- **Z-Score Results**:

  - Instances with |Z| > 3 in any feature: [Number]
  - Instances with multiple feature outliers: [Number]

- **IQR Results**:

  - Instances beyond IQR bounds: [Number]
  - Distribution across features: [Breakdown]

**Visualization Results:**

- Outlier score distributions for each method
- Venn diagram showing method overlap
- Feature-wise outlier visualization (box plots, scatter plots)
- 2D/3D projections showing outlier locations

#### 6.3.2. Interpret results

**Outlier Categories:**

- **Category 1: Data Quality Issues**

  - Characteristics: [Describe - e.g., "Invalid values, missing data patterns, encoding errors"]
  - Examples: [Provide specific examples from data]
  - Action: [Recommend data cleaning steps]

- **Category 2: Unusual Business Cases**

  - Characteristics: [Describe - e.g., "Extremely high fines, violations at unusual times/locations"]
  - Examples: [Specific cases]
  - Action: [Recommend investigation or policy review]

- **Category 3: Potential Fraudulent Activity**

  - Characteristics: [Describe suspicious patterns]
  - Examples: [Specific cases]
  - Action: [Recommend fraud investigation]

**Method-Specific Insights:**

- **LOF Insights**:

  - Best at detecting: Local density anomalies, clusters of unusual cases
  - Typical patterns: [Describe LOF-specific outlier patterns]

- **Isolation Forest Insights**:

  - Best at detecting: Global outliers, high-dimensional anomalies
  - Typical patterns: [Describe ISF-specific outlier patterns]

- **Statistical Methods Insights**:

  - Z-Score: Detects extreme values in normally distributed features
  - IQR: Detects outliers in non-normal distributions, robust method

**Business Implications:**

- **Data Quality Improvements**: [Recommendations based on detected quality issues]
- **Policy Review**: [Suggestions based on unusual violation patterns]
- **Investigation Priorities**: [Rank outliers for manual investigation]
- **Monitoring Recommendations**: [Suggest ongoing monitoring for outlier patterns]

#### 6.3.3. Review of process

**Data Preparation Review:**

- Feature selection: Assess if numerical attributes were comprehensive for outlier detection
- Normalization: Evaluate if Standard Scaler was appropriate for LOF distance calculations
- Scaling consistency: Check if different scaling methods affected outlier detection

**Modeling Process Review:**

- Parameter selection: Assess if contamination and n_neighbors were well-tuned
- Method selection: Justify use of multiple methods for comprehensive detection
- Consensus approach: Evaluate effectiveness of combining multiple methods

**Validation Review:**

- Manual validation: Assess if top outliers were verified by domain experts
- False positive rate: Document cases where normal instances were flagged
- False negative assessment: Consider if any known anomalies were missed

**Lessons Learned:**

- Challenges: [Document challenges in outlier detection]
- Solutions: [Solutions implemented]
- Best practices: [Key takeaways for future outlier detection]

#### 6.3.4. Determine next steps

**Immediate Actions:**

- Investigate high-confidence outliers (detected by ≥3 methods)
- Address data quality issues identified through outlier detection
- Validate outlier interpretations with domain experts
- Implement data cleaning based on identified quality issues

**Future Enhancements:**

- Explore ensemble outlier detection methods
- Develop automated outlier monitoring system
- Incorporate contextual information for smarter outlier detection
- Create outlier scoring system combining multiple methods
- Integrate outlier detection into real-time data pipeline

## 7. Conclusion

### 7.1. Project Summary

This project successfully applied machine learning techniques to analyze traffic violation patterns in Montgomery County, achieving the following objectives:

- **Classification Task**: Developed a decision tree model to identify key contributing factors leading to different types of traffic violations
- **Clustering Task**: Applied k-Means clustering to discover natural groupings in violation patterns and identify outliers
- **Outlier Detection**: Implemented multiple outlier detection methods (LOF, Isolation Forest, statistical methods) to identify anomalous violations

**Key Achievements:**

- Identified [Number] key factors influencing violation types through decision tree analysis
- Discovered [Number] distinct violation pattern clusters revealing temporal, geographic, and severity patterns
- Detected [Number] outlier cases warranting investigation for data quality issues, unusual circumstances, or potential fraud

### 7.2. Key Findings

#### 7.2.1. Classification Insights

- **Top Contributing Factors**:

  1. [Factor 1]: [Impact description]
  2. [Factor 2]: [Impact description]
  3. [Additional factors...]

- **Decision Rules**: [Number] interpretable IF-THEN rules extracted from decision tree
- **Model Performance**: Achieved [X]% accuracy on test set, demonstrating reasonable predictive capability

#### 7.2.2. Clustering Insights

- **Violation Pattern Clusters**: Identified [Number] distinct clusters representing different violation behaviors:

  - [Cluster description 1]
  - [Cluster description 2]
  - [Additional clusters...]

- **Geographic Patterns**: [Describe spatial patterns discovered]
- **Temporal Patterns**: [Describe time-related patterns]

#### 7.2.3. Outlier Detection Insights

- **Consensus Outliers**: [Number] outliers detected by multiple methods, indicating high-confidence anomalies
- **Outlier Categories**:
  - Data quality issues: [Number] cases requiring data cleaning
  - Unusual business cases: [Number] cases warranting policy review
  - Potential fraud: [Number] cases requiring investigation

### 7.3. Business Value

**Resource Allocation Optimization:**

- Identified high-risk time periods and locations for targeted patrol deployment
- Recommended resource allocation based on violation pattern clusters

**Prevention Strategy Development:**

- Developed targeted prevention campaigns based on decision tree rules
- Identified key factors for intervention strategies

**Data Quality Improvement:**

- Identified data quality issues through outlier detection
- Recommended data cleaning procedures

**Policy Recommendations:**

- Suggested policy changes based on identified patterns
- Highlighted areas requiring investigation or review

### 7.4. Methodological Contributions

**Multi-Method Approach:**

- Demonstrated value of combining classification, clustering, and outlier detection for comprehensive analysis
- Showed complementary nature of different outlier detection methods

**CRISP-DM Adherence:**

- Successfully followed CRISP-DM methodology throughout the project
- Demonstrated thoroughness in each phase (Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation)

### 7.5. Limitations and Future Work

**Limitations:**

- Sample size: Limited to 10,000 instances may not capture all patterns
- Feature availability: Some potentially useful features may not be available in the dataset
- Model complexity: Decision tree may oversimplify complex relationships

**Future Enhancements:**

- Explore ensemble methods (Random Forest) for improved classification accuracy
- Incorporate additional data sources (weather, traffic density, events)
- Develop real-time monitoring system for violation patterns
- Implement model retraining pipeline for continuous improvement
- Explore deep learning approaches for complex pattern recognition

### 7.6. Conclusion

This project successfully demonstrated the application of machine learning techniques to traffic violation analysis, providing actionable insights for traffic management and law enforcement resource allocation. The combination of classification, clustering, and outlier detection methods provided a comprehensive understanding of violation patterns and contributed to the business objectives of enhancing public safety, optimizing resource allocation, improving traffic management, and detecting anomalies.

The findings from this analysis can inform evidence-based decision-making for traffic management policies and resource deployment strategies.

---

**Note:** You must update your table of contents to reflect correct page numbers
