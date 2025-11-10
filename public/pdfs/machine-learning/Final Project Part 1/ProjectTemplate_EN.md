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
