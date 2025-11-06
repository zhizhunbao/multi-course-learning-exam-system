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
from sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
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

# Print formatted step header with step number, title and optional explanation
def print_step_header(step_number, step_title, explanation=None):
    print(f"\n{'='*75}")
    print(f"# STEP {step_number}: {step_title}")
    print(f"{'='*75}")
    if explanation:
        print(f"# Explanation: {explanation}")

# Print formatted section title with separator lines
def print_section_title(title, subtitle=None):
    """
    Print a formatted section title with separator lines.

    Parameters:
    - title: Main title text (will be prefixed with '#')
    - subtitle: Optional subtitle text (will be prefixed with '#')
    """
    print(f"\n{'='*75}")
    print(f"# {title}")
    print(f"{'='*75}")
    if subtitle:
        print(f"# {subtitle}")

# Analyze field type conversion: original type, target type, and conversion reason
def type_conversion(df, field_name, target_type, conversion_reason, field_description=None):
    if field_name not in df.columns:
        print(f"   - Field '{field_name}' not found in dataset")
        return df

    # Get original type directly from DataFrame (before conversion)
    original_type = str(df[field_name].dtype)
    if field_description:
        print(f"   - Field description: {field_description}")
    print(f"   - Original type: {original_type}")
    print(f"   - Target type: {target_type}")
    print(f"   - Conversion reason: {conversion_reason}")

    # Check if conversion is needed
    if original_type == target_type or original_type == target_type.replace('64', '32'):
        print(f"   - Status: No conversion needed (already {target_type})")
        return df

    try:
        # Perform actual type conversion
        if target_type == 'datetime64[ns]':
            df[field_name] = pd.to_datetime(df[field_name], errors='coerce')
        elif target_type == 'category':
            # Convert to category type - pandas handles NaN values correctly in categories
            # Use explicit conversion to avoid any potential downcasting warnings
            df[field_name] = df[field_name].astype('category')
        elif target_type == 'bool':
            # Convert yes/no, Y/N, True/False to boolean
            if df[field_name].dtype == 'object':
                # Map common boolean representations
                bool_map = {
                    'Yes': True, 'Y': True, 'yes': True, 'y': True, 'True': True, 'true': True, 'TRUE': True,
                    'No': False, 'N': False, 'no': False, 'n': False, 'False': False, 'false': False, 'FALSE': False
                }
                df[field_name] = df[field_name].map(bool_map)
                # Fill any unmapped values with False (or handle NaN appropriately)
                # Use where method to avoid FutureWarning about downcasting
                df[field_name] = df[field_name].where(df[field_name].notna(), False)
            df[field_name] = df[field_name].astype('bool')
        elif target_type == 'float64':
            df[field_name] = pd.to_numeric(df[field_name], errors='coerce').astype('float64')
        elif target_type == 'int64':
            # Convert to numeric first (handles NaN)
            numeric_series = pd.to_numeric(df[field_name], errors='coerce')
            # Check if there are any NaN values
            if numeric_series.isna().any():
                # Use nullable integer type (Int64) to preserve NaN
                df[field_name] = numeric_series.astype('Int64')
                print(f"   - Note: Field contains missing values, using nullable integer type (Int64)")
            else:
                # No NaN values, can safely convert to int64
                df[field_name] = numeric_series.astype('int64')
        elif target_type == 'object':
            df[field_name] = df[field_name].astype('object')
        else:
            # Generic conversion
            df[field_name] = df[field_name].astype(target_type)

        new_type = str(df[field_name].dtype)
        print(f"   - Status: Converted successfully to {new_type}")

    except Exception as e:
        print(f"   - Status: Conversion failed - {str(e)}")

    return df

# Print statistical summary for a categorical column including unique values, missing values and top frequencies
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

# Plot distribution charts (histograms, bar charts) for numeric, boolean or categorical variables
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
print_step_header("3.1", "Collect initial data")

random.seed(2025)
np.random.seed(2025)

# Read the data
df = pd.read_csv('TrafficViolations.csv')

print(df.head())

# ============================================================================
# STEP 3.2: Describe data
# ============================================================================
print_step_header("3.2", "Describe data")

# ============================================================================
# 3.2.0. Field Type Analysis (Hardcoded)
# ============================================================================
print_step_header("3.2.0", "Field Type Analysis (Hardcoded)",
                  "Analyze data types for each field for type conversion")

print("\nData types for all 43 fields:")

# Field 1: SeqID
print("\n1. SeqID:")
df = type_conversion(
    df, 'SeqID', 'object',
    "UUID identifier; excluded from models",
    "Unique sequence identifier for the traffic stop record"
)

# Field 2: Date Of Stop
print("\n2. Date Of Stop:")
df = type_conversion(
    df, 'Date Of Stop', 'datetime64[ns]',
    "Enable time-based analysis",
    "Date when the traffic stop occurred"
)

# Field 3: Time Of Stop
print("\n3. Time Of Stop:")
df = type_conversion(
    df, 'Time Of Stop', 'object',
    "Keep as object; extract hour feature for temporal analysis",
    "Time when the traffic stop occurred"
)

# Field 4: Agency
print("\n4. Agency:")
df = type_conversion(
    df, 'Agency', 'category',
    "Reduce memory usage and improve performance",
    "Law enforcement agency that conducted the stop"
)

# Field 5: SubAgency
print("\n5. SubAgency:")
df = type_conversion(
    df, 'SubAgency', 'category',
    "Reduce memory usage and improve performance",
    "Sub-agency or division that conducted the stop"
)

# Field 6: Description
print("\n6. Description:")
df = type_conversion(
    df, 'Description', 'object',
    "For text analysis and feature extraction",
    "Description of the traffic violation incident"
)

# Field 7: Location
print("\n7. Location:")
df = type_conversion(
    df, 'Location', 'object',
    "For text processing and geocoding",
    "Location where the traffic stop occurred"
)

# Field 8: Latitude
print("\n8. Latitude:")
df = type_conversion(
    df, 'Latitude', 'float64',
    "For precise calculations and spatial analysis",
    "Latitude coordinate of the stop location"
)

# Field 9: Longitude
print("\n9. Longitude:")
df = type_conversion(
    df, 'Longitude', 'float64',
    "For precise calculations and spatial analysis",
    "Longitude coordinate of the stop location"
)

# Field 10: Accident
print("\n10. Accident:")
df = type_conversion(
    df, 'Accident', 'bool',
    "For efficient storage and logical operations",
    "Whether an accident was involved"
)

# Field 11: Belts
print("\n11. Belts:")
df = type_conversion(
    df, 'Belts', 'bool',
    "For efficient storage and logical operations",
    "Whether seat belts were used"
)

# Field 12: Personal Injury
print("\n12. Personal Injury:")
df = type_conversion(
    df, 'Personal Injury', 'bool',
    "For efficient storage and logical operations",
    "Whether there was personal injury"
)

# Field 13: Property Damage
print("\n13. Property Damage:")
df = type_conversion(
    df, 'Property Damage', 'bool',
    "For efficient storage and logical operations",
    "Whether there was property damage"
)

# Field 14: Fatal
print("\n14. Fatal:")
df = type_conversion(
    df, 'Fatal', 'bool',
    "For efficient storage and logical operations",
    "Whether the incident was fatal"
)

# Field 15: Commercial License
print("\n15. Commercial License:")
df = type_conversion(
    df, 'Commercial License', 'bool',
    "For efficient storage and logical operations",
    "Whether the driver had a commercial license"
)

# Field 16: HAZMAT
print("\n16. HAZMAT:")
df = type_conversion(
    df, 'HAZMAT', 'bool',
    "For efficient storage and logical operations",
    "Whether hazardous materials were involved"
)

# Field 17: Commercial Vehicle
print("\n17. Commercial Vehicle:")
df = type_conversion(
    df, 'Commercial Vehicle', 'bool',
    "For efficient storage and logical operations",
    "Whether the vehicle was commercial"
)

# Field 18: Alcohol
print("\n18. Alcohol:")
df = type_conversion(
    df, 'Alcohol', 'bool',
    "For efficient storage and logical operations",
    "Whether alcohol was involved"
)

# Field 19: Work Zone
print("\n19. Work Zone:")
df = type_conversion(
    df, 'Work Zone', 'bool',
    "For efficient storage and logical operations",
    "Whether the incident occurred in a work zone"
)

# Field 20: Search Conducted
print("\n20. Search Conducted:")
df = type_conversion(
    df, 'Search Conducted', 'bool',
    "For efficient storage and logical operations",
    "Whether a search was conducted"
)

# Field 21: Search Disposition
print("\n21. Search Disposition:")
df = type_conversion(
    df, 'Search Disposition', 'category',
    "Reduce memory usage and improve performance",
    "Disposition of the search conducted"
)

# Field 22: Search Outcome
print("\n22. Search Outcome:")
df = type_conversion(
    df, 'Search Outcome', 'category',
    "Reduce memory usage and improve performance",
    "Outcome of the search conducted"
)

# Field 23: Search Reason
print("\n23. Search Reason:")
df = type_conversion(
    df, 'Search Reason', 'category',
    "Reduce memory usage and improve performance",
    "Reason for conducting the search"
)

# Field 24: Search Reason For Stop
print("\n24. Search Reason For Stop:")
df = type_conversion(
    df, 'Search Reason For Stop', 'category',
    "Reduce memory usage and improve performance",
    "Reason for the stop that led to search"
)

# Field 25: Search Type
print("\n25. Search Type:")
df = type_conversion(
    df, 'Search Type', 'category',
    "Reduce memory usage and improve performance",
    "Type of search conducted"
)

# Field 26: Search Arrest Reason
print("\n26. Search Arrest Reason:")
df = type_conversion(
    df, 'Search Arrest Reason', 'category',
    "Reduce memory usage and improve performance",
    "Reason for arrest if search led to arrest"
)

# Field 27: State
print("\n27. State:")
df = type_conversion(
    df, 'State', 'category',
    "Reduce memory usage and improve performance",
    "US state where the stop occurred"
)

# Field 28: VehicleType
print("\n28. VehicleType:")
df = type_conversion(
    df, 'VehicleType', 'category',
    "Reduce memory usage and improve performance",
    "Type of vehicle involved"
)

# Field 29: Year
print("\n29. Year:")
df = type_conversion(
    df, 'Year', 'int64',
    "For numeric calculations and filtering. Missing values (NaN) will be filled later when needed",
    "Year of the vehicle"
)

# Field 30: Make
print("\n30. Make:")
df = type_conversion(
    df, 'Make', 'category',
    "Reduce memory usage and improve performance",
    "Make/manufacturer of the vehicle"
)

# Field 31: Model
print("\n31. Model:")
df = type_conversion(
    df, 'Model', 'category',
    "Reduce memory usage and improve performance",
    "Model of the vehicle"
)

# Field 32: Color
print("\n32. Color:")
df = type_conversion(
    df, 'Color', 'category',
    "Reduce memory usage and improve performance",
    "Color of the vehicle"
)

# Field 33: Violation Type
print("\n33. Violation Type:")
df = type_conversion(
    df, 'Violation Type', 'category',
    "Reduce memory usage and improve performance",
    "Type of traffic violation"
)

# Field 34: Charge
print("\n34. Charge:")
df = type_conversion(
    df, 'Charge', 'object',
    "For text analysis and pattern matching",
    "Charge filed against the driver"
)

# Field 35: Article
print("\n35. Article:")
df = type_conversion(
    df, 'Article', 'object',
    "For text analysis and pattern matching",
    "Legal article or statute related to the violation"
)

# Field 36: Contributed To Accident
print("\n36. Contributed To Accident:")
df = type_conversion(
    df, 'Contributed To Accident', 'bool',
    "For efficient storage and logical operations",
    "Whether the violation contributed to an accident"
)

# Field 37: Race
print("\n37. Race:")
df = type_conversion(
    df, 'Race', 'category',
    "Reduce memory usage and improve performance",
    "Race/ethnicity of the driver"
)

# Field 38: Gender
print("\n38. Gender:")
df = type_conversion(
    df, 'Gender', 'category',
    "Reduce memory usage and improve performance",
    "Gender of the driver"
)

# Field 39: Driver City
print("\n39. Driver City:")
df = type_conversion(
    df, 'Driver City', 'category',
    "Categorical field with multiple unique values should use category type to reduce memory usage and improve performance",
    "City where the driver resides"
)

# Field 40: Driver State
print("\n40. Driver State:")
df = type_conversion(
    df, 'Driver State', 'category',
    "Categorical field with limited unique values (US states) should use category type to reduce memory usage and improve performance",
    "US state where the driver resides"
)

# Field 41: DL State
print("\n41. DL State:")
df = type_conversion(
    df, 'DL State', 'category',
    "Categorical field with limited unique values (US states) should use category type to reduce memory usage and improve performance",
    "State that issued the driver's license"
)

# Field 42: Arrest Type
print("\n42. Arrest Type:")
df = type_conversion(
    df, 'Arrest Type', 'category',
    "Reduce memory usage and improve performance",
    "Type of arrest made during the stop"
)

# Field 43: Geolocation
print("\n43. Geolocation:")
df = type_conversion(
    df, 'Geolocation', 'object',
    "Geolocation field may contain coordinate strings or geographic objects; keep as object type for parsing and spatial analysis",
    "Geographic location information of the stop"
)

print("\n" + "="*75)
print("Field type analysis completed (43 fields analyzed)")
print("="*75)

# ============================================================================
# 3.2.1. Dataset Dimensions
# ============================================================================
print_step_header("3.2.1", "Dataset Dimensions")
print(f"  - Total records (rows): {df.shape[0]:,}")
print(f"  - Total features (columns): {df.shape[1]}")

# ============================================================================
# 3.2.2. Column Information
# ============================================================================
print_step_header("3.2.2", "Column Information")
print("  - Column names:")
for idx, col in enumerate(df.columns, 1):
    print(f"    {idx:2d}. {col}")
print("\n  - Data types summary:")
dtype_counts = df.dtypes.value_counts().sort_index()
# Group similar types together for better readability
dtype_summary = {}
for dtype, count in dtype_counts.items():
    dtype_str = str(dtype)
    # Normalize dtype names: extract base type
    if dtype_str.startswith('category'):
        base_type = 'category'
    elif dtype_str.startswith('datetime'):
        base_type = 'datetime64[ns]'
    elif dtype_str.startswith('int'):
        base_type = 'int64' if 'Int64' in dtype_str or 'Int' in dtype_str else dtype_str
    elif dtype_str.startswith('float'):
        base_type = 'float64'
    else:
        base_type = dtype_str

    if base_type not in dtype_summary:
        dtype_summary[base_type] = 0
    dtype_summary[base_type] += count

# Print summary sorted by count (descending), then by type name
for dtype, count in sorted(dtype_summary.items(), key=lambda x: (-x[1], x[0])):
    print(f"    - {dtype}: {count} column{'s' if count != 1 else ''}")

# ============================================================================
# 3.2.3. Data Quality Assessment
# ============================================================================
print_step_header("3.2.3", "Data Quality Assessment")
total_missing = df.isnull().sum().sum()
total_cells = df.shape[0] * df.shape[1]
missing_pct = (total_missing / total_cells) * 100
print(f"  - Total missing values: {total_missing:,}")
print(f"  - Missing value percentage: {missing_pct:.2f}%")
if total_missing > 0:
    print("  - Columns with missing values:")
    missing_cols = df.columns[df.isnull().any()].tolist()
    for col in missing_cols:
        missing_count = df[col].isnull().sum()
        missing_pct_col = (missing_count / df.shape[0]) * 100
        print(f"    - {col}: {missing_count:,} ({missing_pct_col:.2f}%)")

# ============================================================================
# 3.2.4. Data Preview
# ============================================================================
print_step_header("3.2.4", "Data Preview")
print("  - First 5 rows:")
print(df.head())
print("\n  - Data schema (df.info()):")
df.info()

# ============================================================================
# 3.2.5. Basic Statistics
# ============================================================================
print_step_header("3.2.5", "Basic Statistics")
numeric_cols_preview = df.select_dtypes(include=[np.number]).columns.tolist()
if numeric_cols_preview:
    print_section_title("Numeric columns", "Descriptive statistics for numeric columns:")
    print(df[numeric_cols_preview].describe())

categorical_cols_preview = df.select_dtypes(include=['object']).columns.tolist()
if categorical_cols_preview:
    print_section_title("Categorical columns", "Unique values count for categorical columns:")
    # Calculate unique counts and sort by count (descending)
    col_unique_counts = [(col, df[col].nunique()) for col in categorical_cols_preview]
    col_unique_counts.sort(key=lambda x: x[1], reverse=True)
    for col, unique_count in col_unique_counts:
        print(f"    - {col}: {unique_count} unique values")

boolean_cols_preview = df.select_dtypes(include=['bool']).columns.tolist()
if boolean_cols_preview:
    print_section_title("Boolean columns", "Value counts for boolean columns:")
    for col in boolean_cols_preview:
        value_counts = df[col].value_counts()
        print(f"    - {col}:")
        for val, count in value_counts.items():
            pct = (count / len(df)) * 100
            print(f"      - {val}: {count:,} ({pct:.2f}%)")

# ============================================================================
# STEP 3.3: Explore data
# ============================================================================
print_step_header("3.3", "Explore data")

# ============================================================================
# 3.3.1: Univariate Analysis
# ============================================================================
print_step_header("3.3.1", "Univariate Analysis")

# Identify different types of columns
numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
bool_cols = df.select_dtypes(include=[bool]).columns.tolist()
categorical_cols = df.select_dtypes(include=['object']).columns.tolist()

# Exclude ID and geolocation tuple columns from analysis
exclude_cols = ['SeqID']  # Add other ID columns if needed
numeric_cols = [col for col in numeric_cols if col not in exclude_cols]
categorical_cols = [col for col in categorical_cols if col not in exclude_cols]

print("\nColumn type summary:")
print(f"  - Numeric columns: {len(numeric_cols)}")
print(f"  - Boolean columns: {len(bool_cols)}")
print(f"  - Categorical columns: {len(categorical_cols)}")

# ============================================================================
# 3.3.1.1: Numeric Variable Distributions
# ============================================================================
print_step_header("3.3.1.1", "Numeric Variable Distributions",
                  "Visualize distributions of numeric variables")
if numeric_cols:
    plot_distributions(df, numeric_cols, var_type='numeric')
    print("\nNumeric variables explored:")
    for col in numeric_cols:
        print(f"  - {col}")

    # Print concise conclusions
    print("\n# Conclusions:")
    for col in numeric_cols:
        if col in df.columns:
            # Calculate key statistics
            mean_val = df[col].mean()
            median_val = df[col].median()
            q25 = df[col].quantile(0.25)
            q75 = df[col].quantile(0.75)

            # Determine distribution characteristics
            if col.lower() == 'latitude':
                print(f"  - {col}: Concentrated in 38-40° (main peak) and 0-5° (minor peak)")
                print("    → Geographic bias: Data primarily from mid-high latitude regions")
            elif col.lower() == 'longitude':
                print(f"  - {col}: Concentrated around -75° (main peak) and 0° (minor peak)")
                print("    → Geographic bias: Data primarily from central North America")
            elif col.lower() == 'year':
                print(f"  - {col}: Highly concentrated in 2000 (main peak)")
                print("    → Temporal bias: Data primarily from year 2000")
            else:
                # Generic conclusion for other numeric variables
                if abs(mean_val - median_val) / (df[col].std() + 1e-10) < 0.1:
                    dist_type = "approximately symmetric"
                elif mean_val > median_val:
                    dist_type = "right-skewed"
                else:
                    dist_type = "left-skewed"
                print(f"  - {col}: Mean={mean_val:.2f}, Median={median_val:.2f}, Range=[{q25:.2f}, {q75:.2f}], {dist_type}")

    print("\n  → Overall: Strong geographic and temporal concentration may affect model generalization")

# ============================================================================
# 3.3.1.2: Boolean Variable Distributions
# ============================================================================
print_step_header("3.3.1.2", "Boolean Variable Distributions",
                  "Visualize distributions of boolean variables")
if bool_cols:
    plot_distributions(df, bool_cols, var_type='boolean')
    print("\nBoolean variables explored:")
    for col in bool_cols:
        print_categorical_summary(df, col)

# ============================================================================
# 3.3.1.3: Categorical Variable Distributions
# ============================================================================
print_step_header("3.3.1.3", "Categorical Variable Distributions",
                  "Visualize distributions of categorical variables")
# Select key categorical columns for visualization (avoid high cardinality)
key_categorical_cols = []
for col in categorical_cols:
    unique_count = df[col].nunique()
    if unique_count <= 20:  # Only visualize categorical with reasonable cardinality
        key_categorical_cols.append(col)

if key_categorical_cols:
    plot_distributions(df, key_categorical_cols, var_type='categorical')
    print("\nCategorical variables with low cardinality explored:")
    for col in key_categorical_cols:
        print_categorical_summary(df, col)

# Summary statistics for high cardinality categorical columns
high_cardinality_cols = [col for col in categorical_cols if col not in key_categorical_cols]
if high_cardinality_cols:
    print("\nHigh cardinality categorical variables (summary only):")
    for col in high_cardinality_cols[:10]:  # Show first 10
        print_categorical_summary(df, col)

# ============================================================================
# 3.3.2: Bivariate Analysis
# ============================================================================
print_step_header("3.3.2", "Bivariate Analysis",
                  "Analyze relationships between pairs of variables")

# ============================================================================
# 3.3.2.1: Correlation Analysis for Numeric Variables
# ============================================================================
print_step_header("3.3.2.1", "Correlation Analysis",
                  "Correlation matrix for numeric variables")
if len(numeric_cols) > 1:
    correlation_matrix = df[numeric_cols].corr()
    plt.figure(figsize=(12, 10))
    sns.heatmap(correlation_matrix, annot=True, fmt='.2f', cmap='coolwarm',
                center=0, square=True, linewidths=1, cbar_kws={"shrink": 0.8})
    plt.title('Correlation Matrix of Numeric Variables')
    plt.tight_layout()
    plt.show()

    # Find strong correlations (absolute value > 0.7)
    print("\nStrong correlations (|r| > 0.7):")
    strong_corr_pairs = []
    for i in range(len(correlation_matrix.columns)):
        for j in range(i+1, len(correlation_matrix.columns)):
            corr_val = correlation_matrix.iloc[i, j]
            if abs(corr_val) > 0.7:
                strong_corr_pairs.append((correlation_matrix.columns[i],
                                         correlation_matrix.columns[j], corr_val))

    if strong_corr_pairs:
        for col1, col2, corr in strong_corr_pairs:
            print(f"  - {col1} <-> {col2}: {corr:.3f}")
    else:
        print("  - No strong correlations found (|r| > 0.7)")

# ============================================================================
# 3.3.2.2: Categorical vs Target Variable Analysis
# ============================================================================
print_step_header("3.3.2.2", "Categorical vs Target Variable Analysis",
                  "Analyze relationships between categorical variables and target")
# Assuming Violation Type is a key target variable
if 'Violation Type' in df.columns:
    target_col = 'Violation Type'
    print(f"\nAnalyzing relationships with target variable: {target_col}")

    # Analyze key categorical variables against target
    key_cats_for_target = [col for col in key_categorical_cols[:5]
                          if col != target_col]

    if key_cats_for_target:
        fig, axes = plt.subplots(len(key_cats_for_target), 1,
                                figsize=(12, 5*len(key_cats_for_target)))
        if len(key_cats_for_target) == 1:
            axes = [axes]

        for idx, col in enumerate(key_cats_for_target):
            ax = axes[idx]
            crosstab = pd.crosstab(df[col], df[target_col], normalize='index') * 100
            crosstab.plot(kind='bar', ax=ax, stacked=True)
            ax.set_title(f'{col} vs {target_col}')
            ax.set_xlabel(col)
            ax.set_ylabel('Percentage (%)')
            ax.legend(title=target_col, bbox_to_anchor=(1.05, 1), loc='upper left')
            ax.tick_params(axis='x', rotation=45)

        plt.tight_layout()
        plt.show()

# ============================================================================
# 3.3.2.3: Boolean vs Target Variable Analysis
# ============================================================================
print_step_header("3.3.2.3", "Boolean vs Target Variable Analysis",
                  "Analyze relationships between boolean variables and target")
if 'Violation Type' in df.columns and bool_cols:
    target_col = 'Violation Type'
    print(f"\nAnalyzing boolean variables against target: {target_col}")

    # Select first few boolean columns for analysis
    bool_cols_to_analyze = bool_cols[:6]

    if bool_cols_to_analyze:
        n_cols = 3
        n_rows = (len(bool_cols_to_analyze) + n_cols - 1) // n_cols
        fig, axes = plt.subplots(n_rows, n_cols, figsize=(15, 5*n_rows))

        if n_rows == 1 and n_cols == 1:
            axes = [axes]
        elif n_rows == 1:
            axes = axes.flatten()
        else:
            axes = axes.flatten()

        for idx, col in enumerate(bool_cols_to_analyze):
            ax = axes[idx]
            crosstab = pd.crosstab(df[col], df[target_col], normalize='index') * 100
            crosstab.plot(kind='bar', ax=ax, stacked=True)
            ax.set_title(f'{col} vs {target_col}')
            ax.set_xlabel(col)
            ax.set_ylabel('Percentage (%)')
            ax.legend(title=target_col, fontsize=8)
            ax.tick_params(axis='x', rotation=0)

        # Hide unused subplots
        for idx in range(len(bool_cols_to_analyze), len(axes)):
            axes[idx].set_visible(False)

        plt.tight_layout()
        plt.show()

# ============================================================================
# 3.3.3: Time Series Analysis
# ============================================================================
print_step_header("3.3.3", "Time Series Analysis",
                  "Analyze temporal patterns and trends")

# ============================================================================
# 3.3.3.1: DateTime Feature Extraction
# ============================================================================
print_step_header("3.3.3.1", "DateTime Feature Extraction",
                  "Extract temporal features from date/time columns")

# Check if date/time columns exist
date_col = None
time_col = None

for col in df.columns:
    if 'date' in col.lower() or 'Date' in col:
        date_col = col
    if 'time' in col.lower() and 'date' not in col.lower():
        time_col = col

if date_col:
    print(f"\nFound date column: {date_col}")
    # Convert to datetime if not already
    if df[date_col].dtype == 'object':
        df['Date_parsed'] = pd.to_datetime(df[date_col], errors='coerce')
    else:
        df['Date_parsed'] = df[date_col]

    # Extract temporal features
    df['Year'] = df['Date_parsed'].dt.year
    df['Month'] = df['Date_parsed'].dt.month
    df['Day'] = df['Date_parsed'].dt.day
    df['DayOfWeek'] = df['Date_parsed'].dt.dayofweek  # 0=Monday, 6=Sunday
    df['WeekOfYear'] = df['Date_parsed'].dt.isocalendar().week
    df['Quarter'] = df['Date_parsed'].dt.quarter

    print("  - Temporal features created: Year, Month, Day, DayOfWeek, WeekOfYear, Quarter")

if time_col:
    print(f"\nFound time column: {time_col}")
    # Try to parse time
    if df[time_col].dtype == 'object':
        try:
            df['Time_parsed'] = pd.to_datetime(df[time_col], format='%H:%M:%S', errors='coerce')
            df['Hour'] = df['Time_parsed'].dt.hour
            print("  - Temporal feature created: Hour")
        except (ValueError, TypeError):
            print(f"  - Could not parse time column: {time_col}")

# ============================================================================
# 3.3.3.2: Temporal Trend Analysis
# ============================================================================
print_step_header("3.3.3.2", "Temporal Trend Analysis",
                  "Visualize trends over time")

if 'Year' in df.columns:
    # Violations by year
    if 'Violation Type' in df.columns:
        fig, axes = plt.subplots(2, 1, figsize=(12, 10))

        # Total violations by year
        year_counts = df['Year'].value_counts().sort_index()
        axes[0].plot(year_counts.index, year_counts.values, marker='o', linewidth=2, markersize=8)
        axes[0].set_title('Total Traffic Violations by Year')
        axes[0].set_xlabel('Year')
        axes[0].set_ylabel('Number of Violations')
        axes[0].grid(True, alpha=0.3)

        # Violations by type over years
        violation_by_year = pd.crosstab(df['Year'], df['Violation Type'])
        violation_by_year.plot(kind='line', ax=axes[1], marker='o', linewidth=2, markersize=6)
        axes[1].set_title('Violation Types by Year')
        axes[1].set_xlabel('Year')
        axes[1].set_ylabel('Number of Violations')
        axes[1].legend(title='Violation Type')
        axes[1].grid(True, alpha=0.3)

        plt.tight_layout()
        plt.show()

if 'Month' in df.columns:
    # Violations by month
    month_counts = df['Month'].value_counts().sort_index()
    plt.figure(figsize=(12, 5))
    month_counts.plot(kind='bar', edgecolor='black')
    plt.title('Traffic Violations by Month')
    plt.xlabel('Month')
    plt.ylabel('Number of Violations')
    plt.xticks(range(12), ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
    plt.grid(True, alpha=0.3, axis='y')
    plt.tight_layout()
    plt.show()

if 'DayOfWeek' in df.columns:
    # Violations by day of week
    dow_counts = df['DayOfWeek'].value_counts().sort_index()
    plt.figure(figsize=(10, 5))
    dow_counts.plot(kind='bar', edgecolor='black')
    plt.title('Traffic Violations by Day of Week')
    plt.xlabel('Day of Week')
    plt.ylabel('Number of Violations')
    plt.xticks(range(7), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], rotation=0)
    plt.grid(True, alpha=0.3, axis='y')
    plt.tight_layout()
    plt.show()

if 'Hour' in df.columns:
    # Violations by hour of day
    hour_counts = df['Hour'].value_counts().sort_index()
    plt.figure(figsize=(12, 5))
    hour_counts.plot(kind='bar', edgecolor='black')
    plt.title('Traffic Violations by Hour of Day')
    plt.xlabel('Hour of Day')
    plt.ylabel('Number of Violations')
    plt.xticks(rotation=0)
    plt.grid(True, alpha=0.3, axis='y')
    plt.tight_layout()
    plt.show()

# ============================================================================
# 3.3.4: Geospatial Analysis
# ============================================================================
print_step_header("3.3.4", "Geospatial Analysis",
                  "Analyze spatial patterns and geographic distributions")

if 'Latitude' in df.columns and 'Longitude' in df.columns:
    # Check for valid coordinates
    valid_coords = df[(df['Latitude'].notna()) & (df['Longitude'].notna()) &
                     (df['Latitude'] != 0) & (df['Longitude'] != 0)]

    if len(valid_coords) > 0:
        print(f"\nValid coordinate records: {len(valid_coords):,} ({len(valid_coords)/len(df)*100:.1f}%)")

        # Sample for visualization if too many points
        sample_size = min(10000, len(valid_coords))
        if len(valid_coords) > sample_size:
            sample_coords = valid_coords.sample(n=sample_size, random_state=2025)
            print(f"  - Sampling {sample_size:,} points for visualization")
        else:
            sample_coords = valid_coords

        # Scatter plot of violations
        plt.figure(figsize=(12, 8))
        plt.scatter(sample_coords['Longitude'], sample_coords['Latitude'],
                   alpha=0.3, s=1, c='red')
        plt.title('Geographic Distribution of Traffic Violations')
        plt.xlabel('Longitude')
        plt.ylabel('Latitude')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.show()

        # Heatmap by violation type if available
        if 'Violation Type' in df.columns:
            fig, axes = plt.subplots(2, 2, figsize=(15, 12))
            axes = axes.flatten()

            violation_types = df['Violation Type'].unique()
            for idx, vtype in enumerate(violation_types[:4]):
                ax = axes[idx]
                vtype_coords = valid_coords[valid_coords['Violation Type'] == vtype]
                if len(vtype_coords) > sample_size:
                    vtype_coords = vtype_coords.sample(n=sample_size, random_state=2025)

                ax.scatter(vtype_coords['Longitude'], vtype_coords['Latitude'],
                          alpha=0.3, s=1, c=f'C{idx}')
                ax.set_title(f'{vtype} Violations')
                ax.set_xlabel('Longitude')
                ax.set_ylabel('Latitude')
                ax.grid(True, alpha=0.3)

            plt.tight_layout()
            plt.show()
    else:
        print("  - No valid coordinate data found")
else:
    print("  - Latitude/Longitude columns not found or not available")

# ============================================================================
# 3.3.5: Association Analysis
# ============================================================================
print_step_header("3.3.5", "Association Analysis",
                  "Identify relationships and patterns between variables")

# ============================================================================
# 3.3.5.1: Categorical Variable Associations
# ============================================================================
print_step_header("3.3.5.1", "Categorical Variable Associations",
                  "Analyze associations between categorical variables")

# Select key categorical variables for association analysis
key_cats_for_assoc = [col for col in key_categorical_cols[:6]
                      if df[col].nunique() <= 10]

if len(key_cats_for_assoc) >= 2:
    # Create a crosstab matrix visualization
    if 'Violation Type' in key_cats_for_assoc:
        target = 'Violation Type'
        others = [col for col in key_cats_for_assoc if col != target][:3]

        if others:
            fig, axes = plt.subplots(1, len(others), figsize=(15, 5))
            if len(others) == 1:
                axes = [axes]

            for idx, col in enumerate(others):
                ax = axes[idx]
                crosstab = pd.crosstab(df[target], df[col], normalize='columns') * 100
                sns.heatmap(crosstab, annot=True, fmt='.1f', cmap='YlOrRd', ax=ax,
                           cbar_kws={'label': 'Percentage (%)'})
                ax.set_title(f'{target} vs {col}')
                ax.set_xlabel(col)
                ax.set_ylabel(target)

            plt.tight_layout()
            plt.show()

# ============================================================================
# 3.3.5.2: Boolean Variable Combinations
# ============================================================================
print_step_header("3.3.5.2", "Boolean Variable Combinations",
                  "Analyze combinations of boolean variables")

if len(bool_cols) >= 2:
    # Analyze relationships between key boolean variables
    key_bools = bool_cols[:4]  # Select first 4 boolean variables

    if len(key_bools) >= 2:
        # Create correlation matrix for boolean variables
        bool_corr = df[key_bools].astype(int).corr()
        plt.figure(figsize=(8, 6))
        sns.heatmap(bool_corr, annot=True, fmt='.3f', cmap='coolwarm',
                   center=0, square=True, linewidths=1)
        plt.title('Correlation Matrix of Boolean Variables')
        plt.tight_layout()
        plt.show()

# ============================================================================
# 3.3.6: Outlier Detection (Preliminary)
# ============================================================================
print_step_header("3.3.6", "Outlier Detection (Preliminary)",
                  "Identify potential outliers in numeric variables")

if numeric_cols:
    print("\nOutlier detection using IQR method:")
    for col in numeric_cols[:5]:  # Analyze first 5 numeric columns
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR

        outliers = df[(df[col] < lower_bound) | (df[col] > upper_bound)]
        outlier_pct = (len(outliers) / len(df)) * 100

        if outlier_pct > 0:
            print(f"  - {col}: {len(outliers):,} outliers ({outlier_pct:.2f}%)")
            print(f"    Range: [{lower_bound:.2f}, {upper_bound:.2f}]")
            print(f"    Actual range: [{df[col].min():.2f}, {df[col].max():.2f}]")

# ============================================================================
# 3.3.7: Data Quality Check
# ============================================================================
print_step_header("3.3.7", "Data Quality Check",
                  "Verify data consistency and completeness")

# ============================================================================
# 3.3.7.1: Data Consistency Check
# ============================================================================
print_step_header("3.3.7.1", "Data Consistency Check",
                  "Check for logical inconsistencies in data")

# Check for logical inconsistencies
inconsistencies = []

# Example: If Accident is Yes, but no Personal Injury or Property Damage
if 'Accident' in df.columns and 'Personal Injury' in df.columns and 'Property Damage' in df.columns:
    accident_no_damage = df[(df['Accident']) &
                            (~df['Personal Injury']) &
                            (~df['Property Damage'])]
    if len(accident_no_damage) > 0:
        inconsistencies.append(f"Accidents with no injury/damage: {len(accident_no_damage):,}")

# Example: Fatal accidents should have Personal Injury
if 'Fatal' in df.columns and 'Personal Injury' in df.columns:
    fatal_no_injury = df[(df['Fatal']) & (~df['Personal Injury'])]
    if len(fatal_no_injury) > 0:
        inconsistencies.append(f"Fatal accidents with no personal injury: {len(fatal_no_injury):,}")

if inconsistencies:
    print("\nPotential data inconsistencies found:")
    for issue in inconsistencies:
        print(f"  - {issue}")
else:
    print("\n  - No obvious logical inconsistencies detected")

# ============================================================================
# 3.3.7.2: Data Completeness Check
# ============================================================================
print_step_header("3.3.7.2", "Data Completeness Check",
                  "Assess completeness of key variables")

# Check completeness of key variables
key_variables = ['Violation Type', 'Date Of Stop', 'Time Of Stop']
if 'Latitude' in df.columns:
    key_variables.append('Latitude')
if 'Longitude' in df.columns:
    key_variables.append('Longitude')

print("\nCompleteness of key variables:")
for var in key_variables:
    if var in df.columns:
        missing = df[var].isnull().sum()
        missing_pct = (missing / len(df)) * 100
        completeness = 100 - missing_pct
        print(f"  - {var}: {completeness:.2f}% complete ({missing:,} missing)")

# ============================================================================
# 3.3.8: Exploratory Queries
# ============================================================================
print_step_header("3.3.8", "Exploratory Queries",
                  "Answer specific questions about the data")

# Example queries
print("\nExploratory queries and insights:")

# Query 1: Most common violation types
if 'Violation Type' in df.columns:
    print("\n1. Most common violation types:")
    violation_counts = df['Violation Type'].value_counts()
    for vtype, count in violation_counts.items():
        pct = (count / len(df)) * 100
        print(f"   - {vtype}: {count:,} ({pct:.1f}%)")

# Query 2: Violations by time period
if 'Hour' in df.columns:
    print("\n2. Peak violation hours:")
    peak_hours = df['Hour'].value_counts().head(5)
    for hour, count in peak_hours.items():
        print(f"   - Hour {hour:02d}:00: {count:,} violations")

# Query 3: Violations involving accidents
if 'Accident' in df.columns:
    accident_violations = df[df['Accident']]
    print(f"\n3. Violations involving accidents: {len(accident_violations):,} ({len(accident_violations)/len(df)*100:.2f}%)")
    if 'Violation Type' in df.columns:
        accident_by_type = accident_violations['Violation Type'].value_counts()
        print("   Violation types in accidents:")
        for vtype, count in accident_by_type.items():
            print(f"     - {vtype}: {count:,}")

# Query 4: Geographic distribution
if 'State' in df.columns:
    print("\n4. Top states for violations:")
    top_states = df['State'].value_counts().head(5)
    for state, count in top_states.items():
        pct = (count / len(df)) * 100
        print(f"   - {state}: {count:,} ({pct:.1f}%)")

print("\n" + "="*75)
print("Data exploration completed!")
print("="*75)


# ============================================================================
# 3.4. Verify data quality
# ============================================================================
print_step_header("3.4", "Verify data quality")

# ============================================================================
# Data Quality Verification Dimensions:
# 1. Completeness - Missing value checks
# 2. Accuracy - Data accuracy and real-world constraints
# 3. Consistency - Logical consistency and cross-field consistency
# 4. Validity - Data format, type, and value range compliance
# 5. Uniqueness - Duplicate data checks
# 6. Timeliness - Data freshness and temporal reasonableness
# 7. Reasonableness - Data distribution and value reasonableness
# 8. Integrity - Data integrity constraints and foreign key relationships (if applicable)
# ============================================================================

# Initialize quality report
quality_report = {
    'completeness': {},
    'accuracy': [],
    'consistency': [],
    'validity': [],
    'uniqueness': {},
    'timeliness': [],
    'reasonableness': [],
    'integrity': []
}

# ============================================================================
# 3.4.1: Completeness Check
# ============================================================================
print_step_header("3.4.1", "Completeness Check",
                  "Check for missing values and data completeness")

print("\nMissing value analysis:")
missing_summary = df.isnull().sum()
missing_pct = (missing_summary / len(df)) * 100

# Identify columns with missing values
cols_with_missing = missing_summary[missing_summary > 0].sort_values(ascending=False)

if len(cols_with_missing) > 0:
    print(f"\nColumns with missing values ({len(cols_with_missing)} total):")
    for col in cols_with_missing.index:
        missing_count = missing_summary[col]
        missing_percentage = missing_pct[col]
        quality_report['completeness'][col] = {
            'missing_count': int(missing_count),
            'missing_percentage': float(missing_percentage),
            'completeness': float(100 - missing_percentage)
        }
        print(f"  - {col}: {missing_count:,} missing ({missing_percentage:.2f}%)")

    # Visualize missing data
    if len(cols_with_missing) > 0:
        plt.figure(figsize=(12, max(6, len(cols_with_missing) * 0.5)))
        cols_to_plot = cols_with_missing.head(20).index  # Plot top 20
        missing_data = pd.DataFrame({
            'Column': cols_to_plot,
            'Missing Count': [missing_summary[col] for col in cols_to_plot],
            'Missing %': [missing_pct[col] for col in cols_to_plot]
        })

        plt.subplot(1, 2, 1)
        plt.barh(range(len(cols_to_plot)), missing_data['Missing Count'])
        plt.yticks(range(len(cols_to_plot)), missing_data['Column'])
        plt.xlabel('Missing Count')
        plt.title('Missing Values Count')
        plt.gca().invert_yaxis()

        plt.subplot(1, 2, 2)
        plt.barh(range(len(cols_to_plot)), missing_data['Missing %'])
        plt.yticks(range(len(cols_to_plot)), missing_data['Column'])
        plt.xlabel('Missing Percentage (%)')
        plt.title('Missing Values Percentage')
        plt.gca().invert_yaxis()

        plt.tight_layout()
        plt.show()
else:
    print("  ✓ No missing values found in any column")

# Overall completeness score
total_cells = len(df) * len(df.columns)
missing_cells = missing_summary.sum()
overall_completeness = ((total_cells - missing_cells) / total_cells) * 100
quality_report['completeness']['overall'] = float(overall_completeness)
print(f"\nOverall data completeness: {overall_completeness:.2f}%")

# ============================================================================
# 3.4.2: Accuracy Check
# ============================================================================
print_step_header("3.4.2", "Accuracy Check",
                  "Verify data accuracy and real-world constraints")

# Check date ranges
if 'Date_parsed' in df.columns:
    valid_dates = df['Date_parsed'].dropna()
    if len(valid_dates) > 0:
        min_date = valid_dates.min()
        max_date = valid_dates.max()
        print("\nDate range check:")
        print(f"  - Minimum date: {min_date}")
        print(f"  - Maximum date: {max_date}")

        # Check for future dates (assuming data should not contain future dates)
        from datetime import datetime
        today = datetime.now()
        future_dates = valid_dates[valid_dates > pd.Timestamp(today)]
        if len(future_dates) > 0:
            quality_report['accuracy'].append(f"Future dates found: {len(future_dates):,}")
            print(f"  ⚠ Warning: {len(future_dates):,} records with future dates")
        else:
            print("  ✓ No future dates found")

        # Check for very old dates (e.g., before 1900)
        old_dates = valid_dates[valid_dates < pd.Timestamp('1900-01-01')]
        if len(old_dates) > 0:
            quality_report['accuracy'].append(f"Very old dates found: {len(old_dates):,}")
            print(f"  ⚠ Warning: {len(old_dates):,} records with dates before 1900")

# Check coordinate ranges (Latitude: -90 to 90, Longitude: -180 to 180)
if 'Latitude' in df.columns and 'Longitude' in df.columns:
    print("\nCoordinate range check:")
    valid_lat = df['Latitude'].dropna()
    valid_lon = df['Longitude'].dropna()

    if len(valid_lat) > 0:
        invalid_lat = valid_lat[(valid_lat < -90) | (valid_lat > 90)]
        if len(invalid_lat) > 0:
            quality_report['accuracy'].append(f"Invalid latitude values: {len(invalid_lat):,}")
            print(f"  ⚠ Warning: {len(invalid_lat):,} records with invalid latitude (should be -90 to 90)")
        else:
            print("  ✓ All latitude values in valid range [-90, 90]")

    if len(valid_lon) > 0:
        invalid_lon = valid_lon[(valid_lon < -180) | (valid_lon > 180)]
        if len(invalid_lon) > 0:
            quality_report['accuracy'].append(f"Invalid longitude values: {len(invalid_lon):,}")
            print(f"  ⚠ Warning: {len(invalid_lon):,} records with invalid longitude (should be -180 to 180)")
        else:
            print("  ✓ All longitude values in valid range [-180, 180]")

# Check for zero coordinates (often indicate missing data)
if 'Latitude' in df.columns and 'Longitude' in df.columns:
    zero_coords = df[(df['Latitude'] == 0) & (df['Longitude'] == 0)]
    if len(zero_coords) > 0:
        quality_report['accuracy'].append(f"Zero coordinates (likely missing): {len(zero_coords):,}")
        print(f"  ⚠ Warning: {len(zero_coords):,} records with zero coordinates (0, 0)")

if not quality_report['accuracy']:
    print("\n  ✓ No accuracy issues detected")

# ============================================================================
# 3.4.3: Consistency Check
# ============================================================================
print_step_header("3.4.3", "Consistency Check",
                  "Check for logical consistency across fields")

# Check logical relationships between fields
inconsistencies = []

# Accident-related consistency
if 'Accident' in df.columns:
    if 'Personal Injury' in df.columns and 'Property Damage' in df.columns:
        # Accidents should typically have either injury or damage
        accident_no_damage = df[(df['Accident']) &
                                (~df['Personal Injury']) &
                                (~df['Property Damage'])]
        if len(accident_no_damage) > 0:
            pct = (len(accident_no_damage) / len(df[df['Accident']])) * 100
            inconsistencies.append(f"Accidents with no injury/damage: {len(accident_no_damage):,} ({pct:.1f}% of accidents)")

    # Fatal accidents must have personal injury
    if 'Fatal' in df.columns and 'Personal Injury' in df.columns:
        fatal_no_injury = df[(df['Fatal']) & (~df['Personal Injury'])]
        if len(fatal_no_injury) > 0:
            inconsistencies.append(f"Fatal accidents with no personal injury: {len(fatal_no_injury):,}")

# Time consistency (if time fields exist)
if 'Hour' in df.columns:
    invalid_hours = df[(df['Hour'] < 0) | (df['Hour'] > 23)]
    if len(invalid_hours) > 0:
        inconsistencies.append(f"Invalid hour values (not 0-23): {len(invalid_hours):,}")

if 'Month' in df.columns:
    invalid_months = df[(df['Month'] < 1) | (df['Month'] > 12)]
    if len(invalid_months) > 0:
        inconsistencies.append(f"Invalid month values (not 1-12): {len(invalid_months):,}")

if 'Day' in df.columns:
    invalid_days = df[(df['Day'] < 1) | (df['Day'] > 31)]
    if len(invalid_days) > 0:
        inconsistencies.append(f"Invalid day values (not 1-31): {len(invalid_days):,}")

quality_report['consistency'] = inconsistencies

if inconsistencies:
    print("\nConsistency issues found:")
    for issue in inconsistencies:
        print(f"  ⚠ {issue}")
else:
    print("\n  ✓ No consistency issues detected")

# ============================================================================
# 3.4.4: Validity Check
# ============================================================================
print_step_header("3.4.4", "Validity Check",
                  "Verify data format, type, and value ranges")

validity_issues = []

# Check data types
print("\nData type validation:")
for col in df.columns:
    expected_types = {
        'SeqID': ['int64', 'int32', 'object'],
        'Date': ['datetime64[ns]', 'object'],
        'Time': ['object', 'datetime64[ns]'],
        'Latitude': ['float64', 'float32'],
        'Longitude': ['float64', 'float32']
    }

    # Check if column name matches expected type patterns
    col_lower = col.lower()
    actual_type = str(df[col].dtype)

    # Check for boolean columns that might be stored as other types
    if 'bool' in col_lower or col in ['Accident', 'Fatal', 'Personal Injury', 'Property Damage']:
        if actual_type not in ['bool', 'bool_']:
            if df[col].dtype == 'object':
                # Check if it's boolean-like string
                unique_vals = df[col].dropna().unique()
                if all(str(val).lower() in ['true', 'false', '1', '0', 'yes', 'no'] for val in unique_vals):
                    validity_issues.append(f"{col}: Boolean-like values stored as object type")
            else:
                validity_issues.append(f"{col}: Expected boolean type, got {actual_type}")

# Check for unexpected values in categorical columns
print("\nCategorical value validation:")
key_categorical = [col for col in df.select_dtypes(include=['object']).columns
                   if df[col].nunique() <= 20][:10]

for col in key_categorical:
    # Check for unexpected whitespace or special characters
    if df[col].dtype == 'object':
        # Check for leading/trailing whitespace
        has_whitespace = df[col].astype(str).str.strip().ne(df[col].astype(str)).any()
        if has_whitespace:
            validity_issues.append(f"{col}: Contains leading/trailing whitespace")

        # Check for empty strings
        empty_strings = (df[col].astype(str).str.strip() == '').sum()
        if empty_strings > 0:
            validity_issues.append(f"{col}: Contains {empty_strings:,} empty strings")

quality_report['validity'] = validity_issues

if validity_issues:
    print("\nValidity issues found:")
    for issue in validity_issues[:10]:  # Show first 10
        print(f"  ⚠ {issue}")
    if len(validity_issues) > 10:
        print(f"  ... and {len(validity_issues) - 10} more issues")
else:
    print("  ✓ No validity issues detected")

# ============================================================================
# 3.4.5: Uniqueness Check
# ============================================================================
print_step_header("3.4.5", "Uniqueness Check",
                  "Check for duplicate records and unique constraints")

# Check for duplicate rows
duplicate_rows = df.duplicated()
num_duplicates = duplicate_rows.sum()

if num_duplicates > 0:
    print(f"\n  ⚠ Found {num_duplicates:,} duplicate rows ({num_duplicates/len(df)*100:.2f}%)")
    quality_report['uniqueness']['duplicate_rows'] = int(num_duplicates)

    # Show sample duplicates
    if num_duplicates > 0:
        sample_duplicates = df[duplicate_rows].head(5)
        print("\n  Sample duplicate rows:")
        print(sample_duplicates.to_string())
else:
    print("\n  ✓ No duplicate rows found")
    quality_report['uniqueness']['duplicate_rows'] = 0

# Check for duplicate IDs (if ID column exists)
if 'SeqID' in df.columns:
    duplicate_ids = df['SeqID'].duplicated()
    num_duplicate_ids = duplicate_ids.sum()

    if num_duplicate_ids > 0:
        print(f"\n  ⚠ Found {num_duplicate_ids:,} duplicate IDs ({num_duplicate_ids/len(df)*100:.2f}%)")
        quality_report['uniqueness']['duplicate_ids'] = int(num_duplicate_ids)

        # Show sample duplicate IDs
        if num_duplicate_ids > 0:
            dup_id_values = df[df['SeqID'].duplicated(keep=False)]['SeqID'].unique()[:5]
            print(f"  Sample duplicate ID values: {dup_id_values}")
    else:
        print("\n  ✓ All IDs are unique")
        quality_report['uniqueness']['duplicate_ids'] = 0

# Check for columns that should be unique but aren't
# (This would be domain-specific - adjust based on your data)

# ============================================================================
# 3.4.6: Timeliness Check
# ============================================================================
print_step_header("3.4.6", "Timeliness Check",
                  "Check data freshness and temporal consistency")

timeliness_issues = []

if 'Date_parsed' in df.columns:
    valid_dates = df['Date_parsed'].dropna()
    if len(valid_dates) > 0:
        from datetime import datetime
        today = datetime.now()

        # Check data recency
        max_date = valid_dates.max()
        if isinstance(max_date, pd.Timestamp):
            days_old = (today - max_date.to_pydatetime()).days
            print("\nData freshness:")
            print(f"  - Most recent date: {max_date.date()}")
            print(f"  - Days since latest record: {days_old}")

            if days_old > 365:
                timeliness_issues.append(f"Data is {days_old} days old (may be outdated)")
            elif days_old > 180:
                timeliness_issues.append(f"Data is {days_old} days old (moderately old)")

        # Check for data gaps (if applicable)
        if len(valid_dates) > 1:
            date_range = valid_dates.max() - valid_dates.min()
            expected_records = date_range.days + 1
            actual_records = len(valid_dates)

            if actual_records < expected_records * 0.9:  # Less than 90% of expected
                timeliness_issues.append(f"Potential data gaps: {actual_records:,} records for {date_range.days} days")

quality_report['timeliness'] = timeliness_issues

if timeliness_issues:
    print("\nTimeliness issues found:")
    for issue in timeliness_issues:
        print(f"  ⚠ {issue}")
else:
    print("\n  ✓ No timeliness issues detected")

# ============================================================================
# 3.4.7: Reasonableness Check
# ============================================================================
print_step_header("3.4.7", "Reasonableness Check",
                  "Check if data values are within reasonable ranges")

reasonableness_issues = []

# Check numeric columns for unreasonable values
numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
numeric_cols = [col for col in numeric_cols if col not in ['SeqID']]

print("\nReasonableness checks for numeric variables:")

for col in numeric_cols[:10]:  # Check first 10 numeric columns
    col_data = df[col].dropna()
    if len(col_data) > 0:
        # Check for extreme outliers using IQR
        Q1 = col_data.quantile(0.25)
        Q3 = col_data.quantile(0.75)
        IQR = Q3 - Q1

        if IQR > 0:  # Avoid division by zero
            lower_bound = Q1 - 3 * IQR  # More extreme than typical 1.5*IQR
            upper_bound = Q3 + 3 * IQR

            extreme_outliers = col_data[(col_data < lower_bound) | (col_data > upper_bound)]
            if len(extreme_outliers) > 0:
                outlier_pct = (len(extreme_outliers) / len(col_data)) * 100
                if outlier_pct > 5:  # More than 5% extreme outliers
                    reasonableness_issues.append(
                        f"{col}: {len(extreme_outliers):,} extreme outliers ({outlier_pct:.1f}%)"
                    )

# Check for negative values where they shouldn't exist
for col in numeric_cols:
    if 'count' in col.lower() or 'number' in col.lower() or 'age' in col.lower():
        negative_values = df[df[col] < 0]
        if len(negative_values) > 0:
            reasonableness_issues.append(f"{col}: {len(negative_values):,} negative values found")

quality_report['reasonableness'] = reasonableness_issues

if reasonableness_issues:
    print("\nReasonableness issues found:")
    for issue in reasonableness_issues[:10]:  # Show first 10
        print(f"  ⚠ {issue}")
    if len(reasonableness_issues) > 10:
        print(f"  ... and {len(reasonableness_issues) - 10} more issues")
else:
    print("  ✓ No obvious reasonableness issues detected")

# ============================================================================
# 3.4.8: Integrity Check
# ============================================================================
print_step_header("3.4.8", "Integrity Check",
                  "Check referential integrity and data relationships")

integrity_issues = []

# Check for referential integrity (if applicable)
# Example: If there are foreign key relationships, check them here

# Check for orphaned records (domain-specific)
# This would depend on your specific data model

# Check for required fields (business rules)
required_fields = ['Violation Type', 'Date Of Stop']  # Adjust based on your requirements
for field in required_fields:
    if field in df.columns:
        missing_required = df[field].isnull().sum()
        if missing_required > 0:
            integrity_issues.append(f"Required field '{field}' missing in {missing_required:,} records")
    else:
        integrity_issues.append(f"Required field '{field}' not found in dataset")

quality_report['integrity'] = integrity_issues

if integrity_issues:
    print("\nIntegrity issues found:")
    for issue in integrity_issues:
        print(f"  ⚠ {issue}")
else:
    print("\n  ✓ No integrity issues detected")

# ============================================================================
# 3.4.9: Data Quality Summary Report
# ============================================================================
print_step_header("3.4.9", "Data Quality Summary Report",
                  "Overall data quality assessment")

print("\n" + "="*75)
print("DATA QUALITY SUMMARY REPORT")
print("="*75)

# Calculate overall quality score
total_issues = (len(quality_report['accuracy']) +
                len(quality_report['consistency']) +
                len(quality_report['validity']) +
                len(quality_report['timeliness']) +
                len(quality_report['reasonableness']) +
                len(quality_report['integrity']))

completeness_score = quality_report['completeness'].get('overall', 100)
uniqueness_score = 100 if quality_report['uniqueness'].get('duplicate_rows', 0) == 0 else 80

# Weighted quality score
quality_score = (
    completeness_score * 0.3 +  # 30% weight on completeness
    uniqueness_score * 0.2 +     # 20% weight on uniqueness
    max(0, 100 - total_issues * 5) * 0.5  # 50% weight on other issues
)

print(f"\nOverall Data Quality Score: {quality_score:.1f}/100")
print("\nBreakdown:")
print(f"  - Completeness: {completeness_score:.1f}%")
print(f"  - Uniqueness: {uniqueness_score:.1f}%")
print(f"  - Issues found: {total_issues}")

if total_issues == 0:
    print("\n  ✓ Excellent data quality - no issues detected!")
elif total_issues <= 5:
    print("\n  ✓ Good data quality - minor issues detected")
elif total_issues <= 15:
    print("\n  ⚠ Moderate data quality - some issues need attention")
else:
    print("\n  ⚠ Poor data quality - significant issues need resolution")

print("\n" + "="*75)
print("Data quality verification completed!")
print("="*75)


# ============================================================================
# 3.5. Field Selection for Tasks
# ============================================================================
print_step_header("3.5", "Field Selection for Tasks")

print("\n" + "="*75)
print("FIELD SELECTION ANALYSIS FOR TASKS")
print("="*75)

# Get all available columns
all_columns = df.columns.tolist()

# ============================================================================
# 3.5.1: Field Selection for Task 1 - Classification (Decision Tree)
# ============================================================================
print_step_header("3.5.1", "Field Selection for Task 1 - Classification (Decision Tree)",
                  "Identify fields needed for classification task to predict violation types")

print("\nTask 1: Classification by Decision Tree")
print("Objective: Predict 'Violation Type' based on contributing factors")
print("\nRequired Fields:")

# Define fields for classification task
classification_fields = {
    'Target Variable (Required)': [],
    'Predictor Variables (Recommended)': [],
    'Excluded Fields': []
}

# Target variable
if 'Violation Type' in df.columns:
    classification_fields['Target Variable (Required)'].append('Violation Type')
    print("\n1. Target Variable (Required):")
    print("   - Violation Type: Class variable to be predicted")
    print(f"     * Unique values: {df['Violation Type'].nunique()}")
    print(f"     * Missing values: {df['Violation Type'].isnull().sum():,}")

# Predictor variables - time-related
print("\n2. Predictor Variables - Time Features:")
time_fields = []
for col in ['Date Of Stop', 'Time Of Stop', 'Year', 'Month', 'Day', 'Hour', 'DayOfWeek', 'Weekday']:
    if col in df.columns:
        time_fields.append(col)
        classification_fields['Predictor Variables (Recommended)'].append(col)
        print(f"   - {col}: Temporal patterns affecting violations")

# Predictor variables - location-related
print("\n3. Predictor Variables - Location Features:")
location_fields = []
for col in ['Location', 'State', 'Latitude', 'Longitude', 'Agency', 'SubAgency']:
    if col in df.columns:
        location_fields.append(col)
        classification_fields['Predictor Variables (Recommended)'].append(col)
        print(f"   - {col}: Geographic patterns affecting violations")

# Predictor variables - vehicle/driver-related
print("\n4. Predictor Variables - Vehicle/Driver Features:")
vehicle_fields = []
for col in ['VehicleType', 'Make', 'Model', 'Color', 'Year', 'State']:
    if col in df.columns:
        vehicle_fields.append(col)
        classification_fields['Predictor Variables (Recommended)'].append(col)
        print(f"   - {col}: Vehicle/driver characteristics")

# Predictor variables - incident-related
print("\n5. Predictor Variables - Incident Features:")
incident_fields = []
for col in ['Accident', 'Fatal', 'Personal Injury', 'Property Damage', 'Belts', 'Alcohol']:
    if col in df.columns:
        incident_fields.append(col)
        classification_fields['Predictor Variables (Recommended)'].append(col)
        print(f"   - {col}: Incident characteristics")

# Predictor variables - violation-related
print("\n6. Predictor Variables - Violation Context:")
violation_context_fields = []
for col in ['Description', 'Charge', 'Arrest Type', 'Contributed To Accident']:
    if col in df.columns:
        violation_context_fields.append(col)
        classification_fields['Predictor Variables (Recommended)'].append(col)
        print(f"   - {col}: Violation context information")

# Excluded fields
print("\n7. Excluded Fields:")
excluded_for_classification = ['SeqID', 'ObjectId']  # ID fields that shouldn't be used as predictors
for col in excluded_for_classification:
    if col in df.columns:
        classification_fields['Excluded Fields'].append(col)
        print(f"   - {col}: Unique identifier (not suitable as predictor)")

print("\nSummary for Task 1:")
print(f"  - Total fields selected: {len(classification_fields['Target Variable (Required)']) + len(classification_fields['Predictor Variables (Recommended)'])}")
print(f"  - Target variable: {len(classification_fields['Target Variable (Required)'])}")
print(f"  - Predictor variables: {len(classification_fields['Predictor Variables (Recommended)'])}")
print(f"  - Excluded fields: {len(classification_fields['Excluded Fields'])}")

# ============================================================================
# 3.5.2: Field Selection for Task 2 - Clustering (KMeans)
# ============================================================================
print_step_header("3.5.2", "Field Selection for Task 2 - Clustering (KMeans)",
                  "Identify fields needed for clustering task to group similar violations")

print("\nTask 2: Clustering by KMeans")
print("Objective: Group similar violations together to identify patterns")
print("\nRequired Fields:")

# Define fields for clustering task
clustering_fields = {
    'Required Features': [],
    'Optional Features': [],
    'Excluded Fields': []
}

# Numeric features for clustering (required for KMeans)
print("\n1. Numeric Features (Required for KMeans):")
numeric_features = []
for col in numeric_cols:
    if col not in ['SeqID']:  # Exclude ID columns
        numeric_features.append(col)
        clustering_fields['Required Features'].append(col)
        print(f"   - {col}: Numeric feature for distance calculation")

# Geographic coordinates (important for clustering)
print("\n2. Geographic Features (Important for Spatial Clustering):")
geo_features = []
for col in ['Latitude', 'Longitude']:
    if col in df.columns:
        geo_features.append(col)
        if col not in clustering_fields['Required Features']:
            clustering_fields['Required Features'].append(col)
        print(f"   - {col}: Spatial coordinates (may need special handling/regions)")

# Temporal features (converted to numeric)
print("\n3. Temporal Features (Converted to Numeric):")
temporal_clustering = []
for col in ['Year', 'Month', 'Day', 'Hour', 'DayOfWeek']:
    if col in df.columns:
        temporal_clustering.append(col)
        if col not in clustering_fields['Required Features']:
            clustering_fields['Required Features'].append(col)
        print(f"   - {col}: Temporal feature (numeric representation)")

# Categorical features (need encoding for clustering)
print("\n4. Categorical Features (Require Encoding):")
categorical_clustering = []
for col in ['State', 'Location', 'VehicleType', 'Make', 'Color']:
    if col in df.columns and col not in clustering_fields['Required Features']:
        categorical_clustering.append(col)
        clustering_fields['Optional Features'].append(col)
        print(f"   - {col}: Categorical feature (requires encoding before clustering)")

# Boolean features (can be treated as numeric 0/1)
print("\n5. Boolean Features (Treated as Binary):")
boolean_clustering = []
for col in bool_cols:
    if col not in clustering_fields['Required Features']:
        boolean_clustering.append(col)
        clustering_fields['Optional Features'].append(col)
        print(f"   - {col}: Boolean feature (binary encoding)")

# Excluded fields
print("\n6. Excluded Fields:")
excluded_for_clustering = ['SeqID', 'ObjectId', 'Violation Type']  # Violation Type is the target, not for clustering
for col in excluded_for_clustering:
    if col in df.columns:
        clustering_fields['Excluded Fields'].append(col)
        print(f"   - {col}: Not suitable for clustering (ID or target variable)")

print("\nSummary for Task 2:")
print(f"  - Required numeric features: {len([f for f in clustering_fields['Required Features'] if f in numeric_cols])}")
print(f"  - Total features (including encoded): {len(clustering_fields['Required Features']) + len(clustering_fields['Optional Features'])}")
print("  - Note: Categorical features need encoding (Label Encoding or One-Hot Encoding)")
print("  - Note: Geographic features may need special handling (create regions or use scaling)")

# ============================================================================
# 3.5.3: Field Selection for Task 3 - Outlier Detection (LOF & Isolation Forest)
# ============================================================================
print_step_header("3.5.3", "Field Selection for Task 3 - Outlier Detection (LOF & Isolation Forest)",
                  "Identify fields needed for outlier detection task")

print("\nTask 3: Outlier Detection by LOF and Isolation Forest")
print("Objective: Identify anomalous violations that deviate from normal patterns")
print("\nRequired Fields:")

# Define fields for outlier detection task
outlier_fields = {
    'Key Features': [],
    'Supporting Features': [],
    'Excluded Fields': []
}

# Numeric features (primary for outlier detection)
print("\n1. Numeric Features (Primary for Outlier Detection):")
numeric_outlier = []
for col in numeric_cols:
    if col not in ['SeqID']:
        numeric_outlier.append(col)
        outlier_fields['Key Features'].append(col)
        print(f"   - {col}: Numeric feature for distance-based anomaly detection")

# Temporal features
print("\n2. Temporal Features (Anomaly Patterns in Time):")
temporal_outlier = []
for col in ['Year', 'Month', 'Day', 'Hour', 'DayOfWeek']:
    if col in df.columns:
        temporal_outlier.append(col)
        if col not in outlier_fields['Key Features']:
            outlier_fields['Key Features'].append(col)
        print(f"   - {col}: Temporal feature (detect unusual time patterns)")

# Geographic features
print("\n3. Geographic Features (Spatial Anomalies):")
geo_outlier = []
for col in ['Latitude', 'Longitude']:
    if col in df.columns:
        geo_outlier.append(col)
        if col not in outlier_fields['Key Features']:
            outlier_fields['Key Features'].append(col)
        print(f"   - {col}: Spatial feature (detect unusual locations)")

# Incident-related boolean features
print("\n4. Incident Features (Unusual Incident Patterns):")
incident_outlier = []
for col in ['Accident', 'Fatal', 'Personal Injury', 'Property Damage']:
    if col in df.columns:
        incident_outlier.append(col)
        outlier_fields['Supporting Features'].append(col)
        print(f"   - {col}: Incident indicator (detect unusual combinations)")

# Categorical features (may need encoding)
print("\n5. Categorical Features (Unusual Categories):")
categorical_outlier = []
for col in ['State', 'Location', 'VehicleType', 'Agency']:
    if col in df.columns and col not in outlier_fields['Key Features']:
        categorical_outlier.append(col)
        outlier_fields['Supporting Features'].append(col)
        print(f"   - {col}: Categorical feature (detect unusual categories, requires encoding)")

# Excluded fields
print("\n6. Excluded Fields:")
excluded_for_outlier = ['SeqID', 'ObjectId', 'Description']  # Description might be too high cardinality
for col in excluded_for_outlier:
    if col in df.columns:
        outlier_fields['Excluded Fields'].append(col)
        print(f"   - {col}: Not suitable for outlier detection (ID or high cardinality text)")

print("\nSummary for Task 3:")
print(f"  - Key features: {len(outlier_fields['Key Features'])}")
print(f"  - Supporting features: {len(outlier_fields['Supporting Features'])}")
print("  - Note: Both LOF and Isolation Forest can handle numeric features directly")
print("  - Note: Categorical features need encoding before use")

# ============================================================================
# 3.5.4: Comparison of Field Selection Across Tasks
# ============================================================================
print_step_header("3.5.4", "Comparison of Field Selection Across Tasks",
                  "Compare field requirements across different tasks")

print("\n" + "="*75)
print("FIELD SELECTION COMPARISON")
print("="*75)

# Create comparison table
print("\nField Usage Summary:")
print(f"\n{'Field Name':<30} {'Task 1 (Classification)':<25} {'Task 2 (Clustering)':<25} {'Task 3 (Outlier Detection)':<25}")
print("-" * 105)

# Common fields across all tasks
common_fields = set(classification_fields['Predictor Variables (Recommended)']) & \
                set(clustering_fields['Required Features'] + clustering_fields['Optional Features']) & \
                set(outlier_fields['Key Features'] + outlier_fields['Supporting Features'])

# All unique fields used in any task
all_task_fields = set(classification_fields['Predictor Variables (Recommended)']) | \
                  set(clustering_fields['Required Features'] + clustering_fields['Optional Features']) | \
                  set(outlier_fields['Key Features'] + outlier_fields['Supporting Features'])

# Show common fields
print("\nCommon Fields (Used in All Tasks):")
for field in sorted(common_fields):
    if field in df.columns:
        print(f"  - {field}")

# Show task-specific fields
print("\nTask-Specific Fields:")
task1_only = set(classification_fields['Predictor Variables (Recommended)']) - \
              set(clustering_fields['Required Features'] + clustering_fields['Optional Features']) - \
              set(outlier_fields['Key Features'] + outlier_fields['Supporting Features'])
if task1_only:
    print(f"\n  Task 1 Only ({len(task1_only)} fields):")
    for field in sorted(task1_only):
        print(f"    - {field}")

task2_only = set(clustering_fields['Required Features'] + clustering_fields['Optional Features']) - \
             set(classification_fields['Predictor Variables (Recommended)']) - \
             set(outlier_fields['Key Features'] + outlier_fields['Supporting Features'])
if task2_only:
    print(f"\n  Task 2 Only ({len(task2_only)} fields):")
    for field in sorted(task2_only):
        print(f"    - {field}")

task3_only = set(outlier_fields['Key Features'] + outlier_fields['Supporting Features']) - \
             set(classification_fields['Predictor Variables (Recommended)']) - \
             set(clustering_fields['Required Features'] + clustering_fields['Optional Features'])
if task3_only:
    print(f"\n  Task 3 Only ({len(task3_only)} fields):")
    for field in sorted(task3_only):
        print(f"    - {field}")

print("\n" + "="*75)
print("Field selection analysis completed!")
print("="*75)
print("\nNote: The actual field selection in each task's data preparation step")
print("      (4.1.1, 5.1.1, 6.1.1) should follow these recommendations based on")
print("      data availability, quality, and task-specific requirements.")


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
