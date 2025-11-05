# ============================================================================
# Import Libraries
# ============================================================================
import os
import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.cluster import KMeans
from sklearn.neighbors import LocalOutlierFactor
from sklearn.ensemble import IsolationForest
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score, davies_bouldin_score
import seaborn as sns

# Change working directory to script's directory to ensure relative paths work
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# ============================================================================
# Helper Functions
# ============================================================================

def print_step_header(step_number, step_title, explanation=None):
    print(f"\n{'='*75}")
    print(f"# STEP {step_number}: {step_title}")
    print(f"{'='*75}")
    if explanation:
        print(f"# Explanation: {explanation}")

def print_categorical_summary(df, col):

    unique_count = df[col].nunique()
    null_count = df[col].isnull().sum()
    null_pct = (null_count / len(df)) * 100

    print(f"\n{col}:")
    print(f"  - Unique values: {unique_count:,}")
    print(f"  - Missing values: {null_count:,} ({null_pct:.2f}%)")

    # Show top values based on cardinality
    if unique_count <= 20:
        top_n = 10
        label = "Top values"
    elif unique_count <= 100:
        top_n = 5
        label = "Top 5 values"
    else:
        top_n = 1
        label = "Most frequent"

    value_counts = df[col].value_counts().head(top_n)
    print(f"  - {label}:")
    for val, count in value_counts.items():
        pct = (count / len(df)) * 100
        print(f"    * {val}: {count:,} ({pct:.1f}%)")

    if unique_count > 100:
        print(f"  - Note: High cardinality ({unique_count:,} unique values) - consider grouping for analysis")

def plot_distributions(df, columns, var_type='numeric'):

    if len(columns) == 0:
        return

    n_cols = min(3, len(columns))
    n_rows = (len(columns) + n_cols - 1) // n_cols

    fig, axes = plt.subplots(n_rows, n_cols, figsize=(15, 5*n_rows))

    # Handle different subplot configurations
    if n_rows == 1 and n_cols == 1:
        # Single subplot: axes is a single Axes object
        axes = [axes]
    elif n_rows == 1:
        # Single row: axes is a 1D array
        axes = axes.flatten() if hasattr(axes, 'flatten') else [axes]
    else:
        # Multiple rows: axes is a 2D array
        axes = axes.flatten()

    for idx, col in enumerate(columns):
        ax = axes[idx]

        if var_type == 'numeric':
            # Histogram for numeric variables
            df[col].hist(bins=50, ax=ax, edgecolor='black')
            ax.set_title(f'Distribution of {col}')
            ax.set_xlabel(col)
            ax.set_ylabel('Frequency')
            ax.grid(True, alpha=0.3)

        elif var_type == 'boolean':
            # Bar chart for boolean variables
            value_counts = df[col].value_counts()

            # Use different colors for True/False
            colors = ['#1f77b4' if val else '#ff7f0e' for val in value_counts.index]
            value_counts.plot(kind='bar', ax=ax, edgecolor='black', color=colors)
            ax.set_title(f'Distribution of {col}')
            ax.set_xlabel(col)
            ax.set_ylabel('Frequency')
            ax.tick_params(axis='x', rotation=0)
            ax.grid(True, alpha=0.3, axis='y')

            # Add percentage labels on bars
            total = len(df[col].dropna())
            for i, (val, count) in enumerate(value_counts.items()):
                pct = (count / total) * 100 if total > 0 else 0
                ax.text(i, count, f'{count:,}\n({pct:.1f}%)',
                       ha='center', va='bottom', fontsize=9)

        elif var_type == 'categorical':
            # Bar chart for categorical variables
            unique_count = df[col].nunique()

            if unique_count <= 20:
                # Show all values
                value_counts = df[col].value_counts()
            else:
                # Show top 10
                value_counts = df[col].value_counts().head(10)

            value_counts.plot(kind='bar', ax=ax, edgecolor='black')
            ax.set_title(f'Distribution of {col}')
            ax.set_xlabel(col)
            ax.set_ylabel('Frequency')
            ax.tick_params(axis='x', rotation=45)
            ax.grid(True, alpha=0.3, axis='y')

    # Hide unused subplots
    for idx in range(len(columns), len(axes)):
        axes[idx].set_visible(False)

    plt.tight_layout()
    plt.show()

# ============================================================================
# SECTION 3: DATA UNDERSTANDING
# ============================================================================

# ============================================================================
# STEP 3.1: Collect initial data
# ============================================================================
# Explanation: Collect initial data from Montgomery County Traffic Violations dataset.
print_step_header("3.1", "Collect initial data",
                  "Collect initial data from Montgomery County Traffic Violations dataset.")

random.seed(2025)
np.random.seed(2025)

# Read the data
df = pd.read_csv('TrafficViolations.csv')
print(df.head())

# ============================================================================
# STEP 3.2: Describe data
# ============================================================================
# Explanation: Describe dataset characteristics and preliminary exploration
print_step_header("3.2", "Describe data",
                  "Describe dataset characteristics and preliminary exploration")

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

# ============================================================================
# STEP 3.3: Explore data
# ============================================================================
# Explanation: Visualize data, identify relationships among data, query data etc.
print_step_header("3.3", "Explore data",
                  "Visualize data, identify relationships among data, query data etc.")

numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
bool_cols = df.select_dtypes(include=[bool]).columns.tolist()
categorical_cols = df.select_dtypes(include=['object']).columns.tolist()

# ============================================================================
# STEP 3.3.1: Statistical summaries
# ============================================================================
# Explanation: Basic statistical analysis for numeric and categorical variables
print_step_header("3.3.1", "Statistical summaries",
                  "Basic statistical analysis for numeric and categorical variables")

# Exclude ID and geolocation tuple columns from analysis
exclude_cols = ['SeqID', 'Geolocation']
analysis_numeric_cols = [col for col in numeric_cols if col not in exclude_cols]
analysis_bool_cols = [col for col in bool_cols if col not in exclude_cols]
analysis_categorical_cols = [col for col in categorical_cols if col not in exclude_cols]

# Print numeric columns summary
if len(analysis_numeric_cols) > 0:
    print("\nNumeric Variables Summary:")
    print(df[analysis_numeric_cols].describe())

# Print boolean columns summary
if len(analysis_bool_cols) > 0:
    print("\nBoolean Variables Summary:")
    for col in analysis_bool_cols:
        value_counts = df[col].value_counts()
        total = len(df[col].dropna())
        null_count = df[col].isnull().sum()

        print(f"\n{col}:")
        for val, count in value_counts.items():
            pct = (count / total) * 100 if total > 0 else 0
            print(f"  {val}: {count:,} ({pct:.2f}%)")
        if null_count > 0:
            print(f"  Missing values: {null_count:,} ({(null_count / len(df)) * 100:.2f}%)")

# Print categorical columns summary
print("\nCategorical Variables Summary:")
print(f"Total categorical variables: {len(analysis_categorical_cols)}")
print("\n" + "="*75)
for col in analysis_categorical_cols:
    print_categorical_summary(df, col)

# ============================================================================
# 3.3.2: Data visualization
# ============================================================================
# Explanation: Visualize data distributions and relationships
# Organized by priority: focus on most informative variables
print_step_header("3.3.2", "Data visualization",
                  "Visualize data distributions and relationships")

# ============================================================================
# Priority-based variable classification
# ============================================================================
# Classify variables by priority for visualization strategy
priority_1_numeric = analysis_numeric_cols  # All numeric variables
priority_2_categorical_key = []  # Categorical with unique <= 10
priority_3_categorical_medium = []  # Categorical with unique 11-20
priority_4_boolean = analysis_bool_cols  # Boolean variables
priority_5_categorical_high = []  # Categorical with unique > 20 (no plots)

for col in analysis_categorical_cols:
    unique_count = df[col].nunique()
    if unique_count <= 10:
        priority_2_categorical_key.append(col)
    elif 11 <= unique_count <= 20:
        priority_3_categorical_medium.append(col)
    else:
        priority_5_categorical_high.append(col)

print("\n" + "-"*75)
print("Variable Classification by Priority")
print("-"*75)
print(f"Priority 1 - Numeric Variables (All visualized): {len(priority_1_numeric)} variable(s)")
print(f"Priority 2 - Key Categorical Variables (unique ≤ 10, all visualized): {len(priority_2_categorical_key)} variable(s)")
print(f"Priority 3 - Medium Categorical Variables (unique 11-20, selectively visualized): {len(priority_3_categorical_medium)} variable(s)")
print(f"Priority 4 - Boolean Variables (optional visualization): {len(priority_4_boolean)} variable(s)")
print(f"Priority 5 - High Cardinality Categorical Variables (>20 unique, summary only): {len(priority_5_categorical_high)} variable(s)")

# ============================================================================
# 3.3.2.1: Priority 1 - Numeric Variables
# ============================================================================
# Explanation: Numeric variables are essential for understanding distributions
print("\n" + "-"*75)
print("3.3.2.1: Priority 1 - Distribution of Numeric Variables")
print("         (All numeric variables)")
print("-"*75)
if len(priority_1_numeric) > 0:
    print(f"\nDisplaying distribution plots for {len(priority_1_numeric)} numeric variable(s)...")
    plot_distributions(df, priority_1_numeric, var_type='numeric')
else:
    print("\nNo numeric variables to visualize.")

# ============================================================================
# 3.3.2.2: Priority 2 - Key Categorical Variables
# ============================================================================
# Explanation: Categorical variables with <=10 unique values are highly informative
print("\n" + "-"*75)
print("3.3.2.2: Priority 2 - Distribution of Key Categorical Variables")
print("         (Categorical variables with unique ≤ 10)")
print("-"*75)
if len(priority_2_categorical_key) > 0:
    print(f"\nDisplaying distribution plots for {len(priority_2_categorical_key)} key categorical variable(s)...")
    plot_distributions(df, priority_2_categorical_key, var_type='categorical')
else:
    print("\nNo key categorical variables to visualize.")

# ============================================================================
# 3.3.2.3: Priority 3 - Medium Categorical Variables
# ============================================================================
# Explanation: Categorical variables with 11-20 unique values (selective visualization)
print("\n" + "-"*75)
print("3.3.2.3: Priority 3 - Distribution of Medium Categorical Variables")
print("         (Categorical variables with unique 11-20)")
print("-"*75)
if len(priority_3_categorical_medium) > 0:
    # For this dataset, we have only 2 variables in this category, so we visualize all
    # In general, you might want to select 5-10 most important ones
    selected_medium = priority_3_categorical_medium  # Select all for this dataset
    print(f"\nDisplaying distribution plots for {len(selected_medium)} medium categorical variable(s)...")
    print(f"Selected variables: {', '.join(selected_medium)}")
    plot_distributions(df, selected_medium, var_type='categorical')
else:
    print("\nNo medium categorical variables to visualize.")

# ============================================================================
# 3.3.2.4: Priority 4 - Boolean Variables
# ============================================================================
# Explanation: Boolean variables (optional visualization - statistical summary is usually sufficient)
print("\n" + "-"*75)
print("3.3.2.4: Priority 4 - Distribution of Boolean Variables")
print("         (Optional visualization, statistical summary is usually sufficient)")
print("-"*75)
if len(priority_4_boolean) > 0:
    print(f"\nDisplaying distribution plots for {len(priority_4_boolean)} boolean variable(s)...")
    print("Note: Statistical summary already provided in Step 3.3.1")
    plot_distributions(df, priority_4_boolean, var_type='boolean')
else:
    print("\nNo boolean variables to visualize.")

# ============================================================================
# 3.3.2.5: Priority 5 - High Cardinality Categorical Variables
# ============================================================================
# Explanation: High cardinality categorical variables are not visualized
# Statistical summaries (from Step 3.3.1) are sufficient for these variables
print("\n" + "-"*75)
print("3.3.2.5: Priority 5 - High Cardinality Categorical Variables")
print("         (No visualization, statistical summary only)")
print("-"*75)
if len(priority_5_categorical_high) > 0:
    print(f"\n{len(priority_5_categorical_high)} high cardinality categorical variable(s) identified.")
    print("These variables are not visualized due to high unique value counts.")
    print("Statistical summaries for these variables are available in Step 3.3.1.")
    print("\nHigh cardinality variables (unique > 20):")
    for col in priority_5_categorical_high:
        unique_count = df[col].nunique()
        print(f"  - {col}: {unique_count:,} unique values")
else:
    print("\nNo high cardinality categorical variables found.")

print("\n" + "="*75)
print("✓ Data visualization completed!")
print("="*75)
print(f"  - Total variables visualized: {len(priority_1_numeric) + len(priority_2_categorical_key) + len(priority_3_categorical_medium) + len(priority_4_boolean)}")
print(f"  - Variables with statistical summary only: {len(priority_5_categorical_high)}")

# ============================================================================
# STEP 3.4: Verify data quality
# ============================================================================
# Explanation: Check completeness, consistency, accuracy, duplicates, and timeliness
print_step_header("3.4", "Verify data quality",
                  "Check completeness, consistency, accuracy, duplicates, and timeliness")

# Get all columns excluding ID and geolocation
exclude_cols = ['SeqID', 'Geolocation']
all_analysis_cols = [col for col in df.columns if col not in exclude_cols]

# ============================================================================
# 3.4.1: Check completeness (missing values)
# ============================================================================
print("\n" + "-"*75)
print("3.4.1: Completeness Check (Missing Values)")
print("-"*75)

missing_summary = df[all_analysis_cols].isnull().sum()
columns_with_missing = missing_summary[missing_summary > 0]

print(f"\nTotal columns analyzed: {len(all_analysis_cols)}")
print(f"Columns with missing values: {len(columns_with_missing)}")

if len(columns_with_missing) > 0:
    print("\nMissing Value Details:")
    print("-" * 75)
    for col in columns_with_missing.index:
        missing_count = missing_summary[col]
        missing_pct = (missing_count / len(df)) * 100
        col_type = df[col].dtype
        print(f"\n  {col}:")
        print(f"    - Missing count: {missing_count:,}")
        print(f"    - Missing percentage: {missing_pct:.2f}%")
        print(f"    - Data type: {col_type}")
else:
    print("\n✓ No missing values found in any column")

# ============================================================================
# 3.4.2: Check consistency
# ============================================================================
print("\n" + "-"*75)
print("3.4.2: Consistency Check")
print("-"*75)

# Check for inconsistent data types
print("\nData Type Consistency:")
for col in all_analysis_cols:
    col_type = df[col].dtype
    if col_type == 'object':
        # Check for mixed types in object columns
        non_null_values = df[col].dropna()
        if len(non_null_values) > 0:
            # Check if all non-null values are strings
            all_strings = all(isinstance(x, str) for x in non_null_values.head(100))
            if not all_strings:
                print(f"  ⚠ {col}: Mixed types detected in object column")

# Check for inconsistent encoding (e.g., 'N/A', 'NA', 'null', 'NULL', etc.)
print("\nInconsistent Encoding Check:")
inconsistent_encodings = ['N/A', 'NA', 'null', 'NULL', 'None', 'NONE', 'nan', 'NaN']
for col in analysis_categorical_cols:
    if col in df.columns:
        unique_values = df[col].dropna().unique()
        found_inconsistent = [val for val in unique_values if str(val).strip() in inconsistent_encodings]
        if found_inconsistent:
            count = df[col].isin(found_inconsistent).sum()
            print(f"  ⚠ {col}: Found inconsistent encoding values: {found_inconsistent} ({count:,} occurrences)")

# Check for inconsistent case (if applicable)
print("\nCase Consistency Check:")
for col in analysis_categorical_cols[:10]:  # Check first 10 categorical columns
    if col in df.columns and df[col].dtype == 'object':
        non_null_values = df[col].dropna().head(1000)
        if len(non_null_values) > 0:
            # Check if values have inconsistent casing
            sample_values = non_null_values.unique()[:20]
            if len(sample_values) > 1:
                # Check if there are both upper and lower case versions
                lower_values = [str(v).lower() for v in sample_values]
                if len(lower_values) != len(set(lower_values)):
                    print(f"  ⚠ {col}: Potential case inconsistency detected (sample check)")

# ============================================================================
# 3.4.3: Check accuracy (value ranges and logical consistency)
# ============================================================================
print("\n" + "-"*75)
print("3.4.3: Accuracy Check (Value Ranges and Logical Consistency)")
print("-"*75)

accuracy_issues = []

# Check numeric columns for reasonable ranges
print("\nNumeric Value Range Check:")
for col in analysis_numeric_cols:
    if col == 'Latitude':
        # Latitude should be between -90 and 90
        invalid = ((df[col] < -90) | (df[col] > 90)).sum()
        if invalid > 0:
            accuracy_issues.append((col, f"Latitude out of range [-90, 90]: {invalid:,} values"))
            print(f"  ⚠ {col}: {invalid:,} values outside valid range [-90, 90]")
    elif col == 'Longitude':
        # Longitude should be between -180 and 180
        invalid = ((df[col] < -180) | (df[col] > 180)).sum()
        if invalid > 0:
            accuracy_issues.append((col, f"Longitude out of range [-180, 180]: {invalid:,} values"))
            print(f"  ⚠ {col}: {invalid:,} values outside valid range [-180, 180]")
    elif col == 'Year':
        # Year should be reasonable (e.g., 1900-2100)
        invalid = ((df[col] < 1900) | (df[col] > 2100)).sum()
        if invalid > 0:
            accuracy_issues.append((col, f"Year out of reasonable range [1900, 2100]: {invalid:,} values"))
            print(f"  ⚠ {col}: {invalid:,} values outside reasonable range [1900, 2100]")

if len(accuracy_issues) == 0:
    print("  ✓ No obvious value range issues detected")

# Check for logical inconsistencies in boolean/binary columns
print("\nLogical Consistency Check:")
# Check if all binary columns have only expected values
for col in analysis_bool_cols:
    if col in df.columns:
        unique_values = df[col].dropna().unique()
        # Boolean should only have True/False or Yes/No
        if len(unique_values) > 2:
            print(f"  ⚠ {col}: More than 2 unique values found: {unique_values}")

# ============================================================================
# 3.4.4: Check duplicates
# ============================================================================
print("\n" + "-"*75)
print("3.4.4: Duplicate Check")
print("-"*75)

# Check for duplicate rows
duplicate_rows = df.duplicated().sum()
print(f"\nDuplicate rows: {duplicate_rows:,}")
if duplicate_rows > 0:
    print(f"  Percentage of duplicates: {(duplicate_rows / len(df)) * 100:.2f}%")
    print("  ⚠ Action recommended: Remove duplicate rows if not intentional")
else:
    print("  ✓ No duplicate rows found")

# Check for duplicate IDs (should be unique)
if 'SeqID' in df.columns:
    duplicate_ids = df['SeqID'].duplicated().sum()
    print(f"\nDuplicate IDs (SeqID): {duplicate_ids:,}")
    if duplicate_ids > 0:
        print("  ⚠ Action required: SeqID should be unique!")
    else:
        print("  ✓ SeqID is unique")

# ============================================================================
# 3.4.5: Check timeliness (if date/time columns exist)
# ============================================================================
print("\n" + "-"*75)
print("3.4.5: Timeliness Check")
print("-"*75)

# Check date columns if they exist
date_cols = [col for col in df.columns if 'date' in col.lower() or 'time' in col.lower()]
if len(date_cols) > 0:
    print("\nDate/Time Column Analysis:")
    for col in date_cols:
        if col in df.columns:
            print(f"\n  {col}:")
            # Try to convert to datetime if possible
            try:
                # Sample check
                sample = df[col].dropna().head(100)
                if len(sample) > 0:
                    # Check format consistency
                    print(f"    - Non-null values: {df[col].notna().sum():,}")
                    print(f"    - Sample values: {sample.head(3).tolist()}")
            except Exception:
                print("    - Note: Could not parse as datetime")

print("\n" + "="*75)
print("Data Quality Verification Summary")
print("="*75)
print(f"  - Columns with missing values: {len(columns_with_missing)}")
print(f"  - Duplicate rows: {duplicate_rows:,}")
print(f"  - Accuracy issues found: {len(accuracy_issues)}")
print("\n✓ Data quality verification completed!")



# ============================================================================
# SECTION 4: CLASSIFICATION BY DECISION TREES
# SECTION 4.1: DATA PREPARATION
# ============================================================================
# By: Hye Ran Yoo (041145212)

# ============================================================================
# STEP 4.1.1: Select data
# ============================================================================
print_step_header("4.1.1", "Select data")

# ============================================================================
# STEP 4.1.2: Clean data
# ============================================================================
print_step_header("4.1.2", "Clean data")


# ============================================================================
# SECTION 5: CLUSTERING BY KMEANS
# SECTION 5.1: DATA PREPARATION
# ============================================================================
# By: Joseph Weng (041076091)

# ============================================================================
# STEP 5.1.1: Select data
# ============================================================================
print_step_header("5.1.1", "Select data")

# ============================================================================
# STEP 5.1.2: Clean data
# ============================================================================
print_step_header("5.1.2", "Clean data")


# ============================================================================
# SECTION 6: OUTLIER DETECTION BY LOF AND ISOLATION FOREST
# SECTION 6.1: DATA PREPARATION
# ============================================================================
# By: Peng Wang (041107730)

# ============================================================================
# STEP 6.1.1: Select data
# ============================================================================
print_step_header("6.1.1", "Select data")

# ============================================================================
# STEP 6.1.2: Clean data
# ============================================================================
print_step_header("6.1.2", "Clean data")

# ============================================================================
# STEP 6.1.3: Construct data
# ============================================================================
print_step_header("6.1.3", "Construct data")
