# Assignment 2: Clustering & Outlier Detection

**Course**: CST8502
**Tool**: RapidMiner
**Due Date**: Check Brightspace for due dates

_Generated from PDF document_

---

## Table of Contents

- [Introduction](#introduction)
- [Data Preparation](#data-preparation)
- [Outlier Detection](#outlier-detection)
- [Clustering](#clustering)
- [Loop Parameters](#loop-parameters)
- [Outlier Detection by Clustering](#outlier-detection-by-clustering)
- [Common Outliers](#common-outliers)
- [Submission Requirements](#submission-requirements)

---

## Introduction

### Assignment Objective

The goal of this assignment is to cluster the **Heart Failure dataset** using kMeans and find outliers using:

- "Detect Outlier (LOF)"
- "Detect Outlier (Distances)"
- Clustering approach

### Naming Convention

**Important**: Every operator should be named like `<<firstname>>_<<operator>>` (Example: `Anu_Normalize`).

As you are not creating tables in this assignment, there will be specific marks for following the naming conventions.

### Process Template

The general template of the full process must look like this:

```
[Data Input] → [GeneralPrep] → [DistancePrep]
                                    ↓
            [Outliers] ← [DistancePrep] → [ClusteringResults]
                                    ↓              ↓
                         [OutliersByClustering] ← [LoopParameters]
```

Once you get outliers from outlier detection methods and clustering approaches, you should join them to see the instances flagged as outliers by all approaches (the final join and filtering is not shown in the above template).

### Required Subprocesses

You must have subprocesses named:

- `GeneralPrep` - Data preparation
- `DistancePrep` - Distance-based preparation
- `Outliers` - Outlier detection
- `ClusteringResults` - Clustering results
- `LoopParameters` - Loop parameters
- `OutliersByClustering` - Outlier detection by clustering

---

## Data Preparation

### 1. Load the Data

Load the data into RapidMiner.

### 2. GeneralPrep

As part of **GeneralPrep**, perform the following steps:

1. Remove any duplicates
2. Generate an ID
3. Set the correct data types for each attribute
4. Set the role if you have any special attributes (like class etc.)

Now, we have the original data ready to apply model-specific preparation steps.

**Multiply it** so that we can use the original data to join with various results.

### 3. DistancePrep

We will be using **distance-based methods** for clustering and outlier detection. So, make sure to prepare your data accordingly:

- **Numerical columns** should be **normalized**
- **Nominal columns** should be **one-hot encoded** (must use "Nominal to Numerical" operator)

### 4. Attribute Lists

Include the list of attributes that you have:

- **Normalized**
- **One-hot encoded**

### 5. Multiply Prepared Data

Multiple the prepared data so that we can use it for various analyses.

### 6. Screenshot Requirements

Take a screenshot of the current process and subprocesses – **GeneralPrep** and **DistancePrep** and paste them in the answer document.

---

## Outlier Detection

### 7. LOF Outlier Detection

Do outlier detection using **LOF (Local Outlier Factor)**:

1. Use "Generate Outlier Flag" operator to convert outlier score to an outlier flag
2. When you generate a flag, you can keep the contamination factor as **5% (0.05)**
3. Join this result with the original data to see original attributes

### 8. Distance-based Outlier Detection

Use **Detect Outliers (distances)** operator to detect outliers:

1. This will create a new column named `outlier`
2. Set the number of outliers as **45**, which is around 5% of the total number of instances
3. Join with the original data to see original attributes

### 9. Rename Outlier Columns

1. Rename outlier columns as:
   - `LOF_Outlier`
   - `Distances_Outlier`
2. As we cannot keep more than one column with the role "Outlier", change the role of `Distances_outlier` to **"Interpretation"**

### 10. Join Both Results

Join both results and filter those instances flagged as outliers by both methods.

Take a screenshot of the filtered instances and paste it in the answer document.

### 11. Subprocess Screenshot

Take a screenshot of the subprocess and paste it in the answer document.

---

## Clustering

### 12. kMeans Clustering

Run **kMeans** with **k=8** and join the clustered results with the original attributes.

### 13. Cluster Pattern Analysis

Find the patterns of each cluster (why those instances are clustered together):

- If you have a **Cluster Model Visualizer** operator, use it to get more details about the patterns in each cluster
- If not, do a manual analysis

### 14. Cluster Interpretations

Include your interpretations for each cluster in the answer document.

### 15. Subprocess Screenshot

Take a screenshot of the subprocess and paste it in the answer document.

---

## Loop Parameters

### 16. Parameter Loop

Use **"Loop parameters"** operator to run kMeans multiple times:

1. Once you get the result, from the **"plot view"** tab
2. Plot the **elbow diagram**
3. Paste it in the answer document

### 17. Subprocess Screenshot

Take a screenshot of the subprocess and paste it in the answer document.

---

## Outlier Detection by Clustering

### 18. Redo Clustering

Redo clustering with **k=20** to see outliers.

### 19. Filter Small Clusters

Filter those clusters with **less than 10 instances** in it:

1. Filter the instances in those small clusters
2. You must use **aggregate**, **filter examples** and **join** operators for this task
3. Paste a screenshot of the filtered instances in the answer document

### 20. Subprocess Screenshot

Paste a screenshot of the subprocess and paste it in the answer document.

---

## Common Outliers

### 21. Join Outlier Results

Join the results from **Outliers** and **OutliersByClustering** subprocesses to get the outliers flagged by all three approaches.

### 22. Outliers Screenshot

Take a screenshot of the outliers and paste it in the answer document.

### 23. Outlier Interpretation

Interpret why they are outliers and include your reasoning in the answer document.

### 24. Final Join Process Screenshot

Paste the screenshot of the process where you do the final join and filtering.

### 25. Complete Process Screenshot

Now, take a screenshot of the entire process and paste it in the answer document.

---

## Submission Requirements

In order to get grades:

1. **For the demo**: You should be ready with your **rmp file** in RapidMiner
2. **Submit**: The **rmp file AND the answer document** to Brightspace
   - ⚠️ Your lab will **not be graded** if you miss the rmp file OR the answer document
3. **File format**: Don't zip files. Zipped files will not be graded

---
