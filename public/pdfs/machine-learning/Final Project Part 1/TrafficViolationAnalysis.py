# ============================================================================
# Import Libraries
# ============================================================================
import os
import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.cluster import KMeans
from sklearn.neighbors import LocalOutlierFactor
from sklearn.ensemble import IsolationForest
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score, davies_bouldin_score

script_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(script_dir, 'TrafficViolations.csv')

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
            # Convert to object type instead of category for better compatibility with statistical calculations
            df[field_name] = df[field_name].astype('object')
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
                print("   - Note: Field contains missing values, using nullable integer type (Int64)")
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
print_step_header("3", "Data Understanding")

# ============================================================================
# STEP 3.1: Collect initial data
# ============================================================================
print_step_header("3.1", "Collect initial data")

# ============================================================================
# 3.1.1. Data Source
# ============================================================================
# Dataset: Traffic Violations dataset from Montgomery County
# Data Source URL: https://data.montgomerycountymd.gov/Public-Safety/Traffic-Violations/4mse-ku6q/about_data
# Format: CSV file
# File location: TrafficViolations.csv

# ============================================================================
# 3.1.2. Data Loading
# ============================================================================
print_step_header("3.1", "Data Loading")

random.seed(2025)
np.random.seed(2025)
df = pd.read_csv(csv_path)
print(df.head())

# ============================================================================
# STEP 3.2: Describe data
# ============================================================================
print_step_header("3.2", "Describe data")

# ============================================================================
# 3.2.1. Field Type Analysis (Hardcoded)
# ============================================================================
print_step_header("3.2.0", "Field Type Analysis (Hardcoded)")

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
    "For time-based analysis, trend analysis, seasonal pattern identification, and temporal feature engineering",
    "Date when the traffic stop occurred"
)

# Field 3: Time Of Stop
print("\n3. Time Of Stop:")
df = type_conversion(
    df, 'Time Of Stop', 'object',
    "For temporal pattern analysis, hour feature extraction, and time-of-day violation pattern identification",
    "Time when the traffic stop occurred"
)

# Field 4: Agency
print("\n4. Agency:")
df = type_conversion(
    df, 'Agency', 'object',
    "For inter-agency comparison, grouping analysis, and law enforcement efficiency assessment",
    "Law enforcement agency that conducted the stop"
)

# Field 5: SubAgency
print("\n5. SubAgency:")
df = type_conversion(
    df, 'SubAgency', 'object',
    "For sub-agency comparison, regional grouping analysis, and enforcement pattern identification",
    "Sub-agency or division that conducted the stop"
)

# Field 6: Description
print("\n6. Description:")
df = type_conversion(
    df, 'Description', 'object',
    "For violation description text analysis, keyword extraction, and violation pattern identification from text",
    "Description of the traffic violation incident"
)

# Field 7: Location
print("\n7. Location:")
df = type_conversion(
    df, 'Location', 'object',
    "For location text analysis, geocoding, address parsing, and geographic feature engineering",
    "Location where the traffic stop occurred"
)

# Field 8: Latitude
print("\n8. Latitude:")
df = type_conversion(
    df, 'Latitude', 'float64',
    "For precise geographic calculations, spatial analysis, hotspot identification, and geographic feature engineering",
    "Latitude coordinate of the stop location"
)

# Field 9: Longitude
print("\n9. Longitude:")
df = type_conversion(
    df, 'Longitude', 'float64',
    "For precise geographic calculations, spatial analysis, hotspot identification, and geographic feature engineering",
    "Longitude coordinate of the stop location"
)

# Field 10: Accident
print("\n10. Accident:")
df = type_conversion(
    df, 'Accident', 'bool',
    "For accident correlation analysis, risk factor identification, and conditional filtering",
    "Whether an accident was involved"
)

# Field 11: Belts
print("\n11. Belts:")
df = type_conversion(
    df, 'Belts', 'bool',
    "For safety measure analysis, accident severity correlation analysis, and feature engineering",
    "Whether seat belts were used"
)

# Field 12: Personal Injury
print("\n12. Personal Injury:")
df = type_conversion(
    df, 'Personal Injury', 'bool',
    "For accident severity analysis, risk assessment, and outcome prediction",
    "Whether there was personal injury"
)

# Field 13: Property Damage
print("\n13. Property Damage:")
df = type_conversion(
    df, 'Property Damage', 'bool',
    "For accident consequence analysis, loss assessment, and risk factor identification",
    "Whether there was property damage"
)

# Field 14: Fatal
print("\n14. Fatal:")
df = type_conversion(
    df, 'Fatal', 'bool',
    "For severe accident analysis, fatal factor identification, and risk assessment",
    "Whether the incident was fatal"
)

# Field 15: Commercial License
print("\n15. Commercial License:")
df = type_conversion(
    df, 'Commercial License', 'bool',
    "For driver type analysis, violation pattern identification, and feature engineering",
    "Whether the driver had a commercial license"
)

# Field 16: HAZMAT
print("\n16. HAZMAT:")
df = type_conversion(
    df, 'HAZMAT', 'bool',
    "For hazardous material transport analysis, risk assessment, and special vehicle identification",
    "Whether hazardous materials were involved"
)

# Field 17: Commercial Vehicle
print("\n17. Commercial Vehicle:")
df = type_conversion(
    df, 'Commercial Vehicle', 'bool',
    "For vehicle type analysis, commercial vehicle violation pattern identification, and feature engineering",
    "Whether the vehicle was commercial"
)

# Field 18: Alcohol
print("\n18. Alcohol:")
df = type_conversion(
    df, 'Alcohol', 'bool',
    "For DUI analysis, serious violation identification, and risk factor analysis",
    "Whether alcohol was involved"
)

# Field 19: Work Zone
print("\n19. Work Zone:")
df = type_conversion(
    df, 'Work Zone', 'bool',
    "For construction zone analysis, special area violation pattern identification, and risk assessment",
    "Whether the incident occurred in a work zone"
)

# Field 20: Search Conducted
print("\n20. Search Conducted:")
df = type_conversion(
    df, 'Search Conducted', 'bool',
    "For search behavior analysis, enforcement pattern identification, and conditional filtering",
    "Whether a search was conducted"
)

# Field 21: Search Disposition
print("\n21. Search Disposition:")
df = type_conversion(
    df, 'Search Disposition', 'object',
    "For search disposition type analysis, enforcement procedure assessment, and grouped statistics",
    "Disposition of the search conducted"
)

# Field 22: Search Outcome
print("\n22. Search Outcome:")
df = type_conversion(
    df, 'Search Outcome', 'object',
    "For search outcome analysis, search effectiveness evaluation, and pattern identification",
    "Outcome of the search conducted"
)

# Field 23: Search Reason
print("\n23. Search Reason:")
df = type_conversion(
    df, 'Search Reason', 'object',
    "For search reason analysis, enforcement reasonableness assessment, and reason categorization",
    "Reason for conducting the search"
)

# Field 24: Search Reason For Stop
print("\n24. Search Reason For Stop:")
df = type_conversion(
    df, 'Search Reason For Stop', 'object',
    "For stop reason analysis, search trigger factor identification, and correlation analysis",
    "Reason for the stop that led to search"
)

# Field 25: Search Type
print("\n25. Search Type:")
df = type_conversion(
    df, 'Search Type', 'object',
    "For search type analysis, enforcement method categorization, and pattern identification",
    "Type of search conducted"
)

# Field 26: Search Arrest Reason
print("\n26. Search Arrest Reason:")
df = type_conversion(
    df, 'Search Arrest Reason', 'object',
    "For arrest reason analysis, search-to-arrest correlation analysis, and outcome prediction",
    "Reason for arrest if search led to arrest"
)

# Field 27: State
print("\n27. State:")
df = type_conversion(
    df, 'State', 'object',
    "For geographic grouping analysis, inter-regional comparison, and geographic feature engineering",
    "US state where the stop occurred"
)

# Field 28: VehicleType
print("\n28. VehicleType:")
df = type_conversion(
    df, 'VehicleType', 'object',
    "For vehicle type analysis, violation pattern identification, and feature engineering",
    "Type of vehicle involved"
)

# Field 29: Year
print("\n29. Year:")
df = type_conversion(
    df, 'Year', 'int64',
    "For vehicle age analysis, numeric calculations, filtering, and feature engineering. Missing values (NaN) will be filled later when needed",
    "Year of the vehicle"
)

# Field 30: Make
print("\n30. Make:")
df = type_conversion(
    df, 'Make', 'object',
    "For vehicle brand analysis, inter-brand violation pattern comparison, and feature engineering",
    "Make/manufacturer of the vehicle"
)

# Field 31: Model
print("\n31. Model:")
df = type_conversion(
    df, 'Model', 'object',
    "For vehicle model analysis, specific model violation pattern identification, and feature engineering",
    "Model of the vehicle"
)

# Field 32: Color
print("\n32. Color:")
df = type_conversion(
    df, 'Color', 'object',
    "For vehicle color analysis, color-violation correlation analysis, and feature engineering",
    "Color of the vehicle"
)

# Field 33: Violation Type
print("\n33. Violation Type:")
df = type_conversion(
    df, 'Violation Type', 'object',
    "For violation type classification analysis, violation pattern identification, and target variable construction",
    "Type of traffic violation"
)

# Field 34: Charge
print("\n34. Charge:")
df = type_conversion(
    df, 'Charge', 'object',
    "For legal charge analysis, charge pattern identification, and legal text pattern matching",
    "Charge filed against the driver"
)

# Field 35: Article
print("\n35. Article:")
df = type_conversion(
    df, 'Article', 'object',
    "For legal article analysis, statute pattern identification, and legal text pattern matching",
    "Legal article or statute related to the violation"
)

# Field 36: Contributed To Accident
print("\n36. Contributed To Accident:")
df = type_conversion(
    df, 'Contributed To Accident', 'bool',
    "For violation-accident correlation analysis, causal relationship identification, and risk assessment",
    "Whether the violation contributed to an accident"
)

# Field 37: Race
print("\n37. Race:")
df = type_conversion(
    df, 'Race', 'object',
    "For demographic analysis, fairness assessment, and grouped comparison analysis",
    "Race/ethnicity of the driver"
)

# Field 38: Gender
print("\n38. Gender:")
df = type_conversion(
    df, 'Gender', 'object',
    "For gender analysis, gender-based violation pattern difference analysis, and grouped statistics",
    "Gender of the driver"
)

# Field 39: Driver City
print("\n39. Driver City:")
df = type_conversion(
    df, 'Driver City', 'object',
    "For driver residence location analysis, geographic pattern identification, and feature engineering",
    "City where the driver resides"
)

# Field 40: Driver State
print("\n40. Driver State:")
df = type_conversion(
    df, 'Driver State', 'object',
    "For driver residence state analysis, cross-state violation pattern identification, and geographic feature engineering",
    "US state where the driver resides"
)

# Field 41: DL State
print("\n41. DL State:")
df = type_conversion(
    df, 'DL State', 'object',
    "For license issuing state analysis, cross-state driving pattern identification, and feature engineering",
    "State that issued the driver's license"
)

# Field 42: Arrest Type
print("\n42. Arrest Type:")
df = type_conversion(
    df, 'Arrest Type', 'object',
    "For arrest type analysis, arrest pattern categorization, and outcome prediction",
    "Type of arrest made during the stop"
)

# Field 43: Geolocation
print("\n43. Geolocation:")
df = type_conversion(
    df, 'Geolocation', 'object',
    "For spatial analysis, geographic pattern identification, and coordinate parsing. Field may contain coordinate strings or geographic objects",
    "Geographic location information of the stop"
)

print("\n" + "="*75)
print("Field type analysis completed (43 fields analyzed)")
print("="*75)

# ============================================================================
# 3.2.2. Data Preview
# ============================================================================
print_step_header("3.2.4", "Data Preview")
df.info()

# ============================================================================
# 3.2.3. Basic Statistics
# ============================================================================
print_step_header("3.2.6", "Basic Statistics")
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

# Identify different types of columns
numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
bool_cols = df.select_dtypes(include=[bool]).columns.tolist()
categorical_cols = df.select_dtypes(include=['object']).columns.tolist()

# Exclude ID and geolocation tuple columns from analysis
exclude_cols = ['SeqID']  # Add other ID columns if needed
numeric_cols = [col for col in numeric_cols if col not in exclude_cols]
categorical_cols = [col for col in categorical_cols if col not in exclude_cols]

# ============================================================================
# 3.3.1: Numeric Variable Distributions
# ============================================================================
print_step_header("3.3.1.1", "Numeric Variable Distributions")
if numeric_cols:
    plot_distributions(df, numeric_cols, var_type='numeric')

# ============================================================================
# 3.3.2: Boolean Variable Distributions
# ============================================================================
print_step_header("3.3.1.2", "Boolean Variable Distributions")
if bool_cols:
    plot_distributions(df, bool_cols, var_type='boolean')

# ============================================================================
# 3.3.3: Categorical Variable Distributions
# ============================================================================
print_step_header("3.3.1.3", "Categorical Variable Distributions")
# Print summary statistics for all categorical variables (no visualization)
if categorical_cols:
    print("\nAll categorical variables explored:")
    for col in categorical_cols:
        print_categorical_summary(df, col)

# ============================================================================
# 3.4. Verify data quality
# ============================================================================
print_step_header("3.4", "Verify data quality")

# ============================================================================
# 3.4.1. duplicate data
# ============================================================================
print_step_header("3.4.1", "duplicate data")
# Group by SeqID and check for duplicate counts
seqid_counts = df['SeqID'].value_counts()
duplicate_seqids = seqid_counts[seqid_counts > 1].sort_values(ascending=False)

if not duplicate_seqids.empty:
    print(f"  - SeqID values with duplicates: {len(duplicate_seqids)}")
    print("  - Top 5 duplicate SeqID counts (descending):")
    print(duplicate_seqids.head(5).to_string())
else:
    print("  - No duplicate SeqID values found")

# ============================================================================
# 3.4.2. Columns with missing values
# ============================================================================
print_step_header("3.4.2", "Columns with missing values")
missing_cols = df.columns[df.isnull().any()].tolist()
# Sort columns by missing count (descending)
missing_data = [(col, df[col].isnull().sum()) for col in missing_cols]
missing_data.sort(key=lambda x: x[1], reverse=True)
for col, missing_count in missing_data:
    missing_pct_col = (missing_count / df.shape[0]) * 100
    print(f"  - {col}: {missing_count:,} ({missing_pct_col:.2f}%)")

# ============================================================================
# 4. Classification by Decision Tree
# ============================================================================
print_step_header("4", "Classification by Decision Tree")

# ============================================================================
# 4.1. Data Preparation for Classification
# ============================================================================
print_step_header("4.1", "Data Preparation for Classification")

# ============================================================================
# 4.1.1. Select data
# ============================================================================
print_step_header("4.1.1", "Select data")

# Create a copy for classification
df_classify = df.copy()

# Select relevant attributes for classification
classification_features = [
    'Date Of Stop', 'Time Of Stop',  # Temporal features
    'SubAgency', 'Location', 'Latitude', 'Longitude',  # Location features
    'Accident', 'Personal Injury', 'Property Damage', 'Fatal',  # Accident-related
    'Belts', 'Alcohol', 'Work Zone',  # Risk factors
    'Commercial License', 'Commercial Vehicle', 'HAZMAT',  # Driver/vehicle type
    'State', 'VehicleType', 'Year', 'Make', 'Color',  # Vehicle characteristics
    'Contributed To Accident',  # Accident contribution
    'Race', 'Gender'  # Demographics
]

target_variable = 'Violation Type'  # Class variable

print(f"Selected {len(classification_features)} features for classification")
print(f"Target variable: {target_variable}")

# ============================================================================
# 4.1.2. Clean data
# ============================================================================
print_step_header("4.1.2", "Clean data")

# Remove rows with missing target variable
print(f"Original dataset size: {len(df_classify):,} rows")
df_classify = df_classify.dropna(subset=[target_variable])
print(f"After removing missing target: {len(df_classify):,} rows")

# Check class distribution
print("\nClass distribution before filtering:")
class_counts = df_classify[target_variable].value_counts()
print(class_counts.head(10))

# Keep only top violation types to make the problem more manageable
# Filter to keep violation types with at least 1000 instances
min_instances = 1000
valid_violations = class_counts[class_counts >= min_instances].index.tolist()
df_classify = df_classify[df_classify[target_variable].isin(valid_violations)]

print(f"\nAfter filtering to violation types with >= {min_instances} instances:")
print(f"Dataset size: {len(df_classify):,} rows")
print(f"Number of classes: {len(valid_violations)}")
print("Class distribution:")
print(df_classify[target_variable].value_counts())

# ============================================================================
# 4.1.3. Construct data
# ============================================================================
print_step_header("4.1.3", "Construct data")

# Create temporal features
print("Creating temporal features...")

# Extract hour from Time Of Stop
df_classify['Hour'] = pd.to_datetime(df_classify['Time Of Stop'], format='%H:%M:%S', errors='coerce').dt.hour

# Extract date features
df_classify['Month'] = df_classify['Date Of Stop'].dt.month
df_classify['DayOfWeek'] = df_classify['Date Of Stop'].dt.dayofweek
df_classify['IsWeekend'] = (df_classify['DayOfWeek'] >= 5).astype(int)

# Create time of day categories
def categorize_time_of_day(hour):
    if pd.isna(hour):
        return 'Unknown'
    elif 6 <= hour < 12:
        return 'Morning'
    elif 12 <= hour < 18:
        return 'Afternoon'
    elif 18 <= hour < 22:
        return 'Evening'
    else:
        return 'Night'

df_classify['TimeOfDay'] = df_classify['Hour'].apply(categorize_time_of_day)

# Calculate vehicle age
current_year = 2024
df_classify['VehicleAge'] = current_year - df_classify['Year'].fillna(current_year)

print("Created features: Hour, Month, DayOfWeek, IsWeekend, TimeOfDay, VehicleAge")

# ============================================================================
# 4.1.4. Integrate data
# ============================================================================
print_step_header("4.1.4", "Integrate data")

# Select final features for classification
final_features = [
    'Hour', 'Month', 'DayOfWeek', 'IsWeekend',  # Temporal
    'Latitude', 'Longitude',  # Geographic
    'VehicleAge',  # Vehicle
    'Accident', 'Personal Injury', 'Property Damage', 'Fatal',  # Accident
    'Belts', 'Alcohol', 'Work Zone',  # Risk factors
    'Commercial License', 'Commercial Vehicle', 'HAZMAT',  # Driver/vehicle type
    'Contributed To Accident',  # Accident contribution
    'SubAgency', 'VehicleType', 'Gender', 'Race', 'TimeOfDay'  # Categorical
]

print(f"Final selected features: {len(final_features)}")

# ============================================================================
# 4.1.5. Format data
# ============================================================================
print_step_header("4.1.5", "Format data")

# Encode categorical variables
print("Encoding categorical variables...")

categorical_features_classify = ['SubAgency', 'VehicleType', 'Gender', 'Race', 'TimeOfDay']
label_encoders_classify = {}

for feature in categorical_features_classify:
    le = LabelEncoder()
    df_classify[feature] = df_classify[feature].fillna('Unknown')
    df_classify[feature + '_encoded'] = le.fit_transform(df_classify[feature].astype(str))
    label_encoders_classify[feature] = le
    print(f"  - Encoded {feature}: {len(le.classes_)} unique values")

# Prepare feature matrix
numeric_features_classify = [
    'Hour', 'Month', 'DayOfWeek', 'IsWeekend',
    'Latitude', 'Longitude', 'VehicleAge'
]

boolean_features_classify = [
    'Accident', 'Personal Injury', 'Property Damage', 'Fatal',
    'Belts', 'Alcohol', 'Work Zone',
    'Commercial License', 'Commercial Vehicle', 'HAZMAT',
    'Contributed To Accident'
]

encoded_features_classify = [feat + '_encoded' for feat in categorical_features_classify]

all_features_classify = numeric_features_classify + boolean_features_classify + encoded_features_classify

# Create feature matrix and target
X_classify = df_classify[all_features_classify].copy()
y_classify = df_classify[target_variable].copy()

# Convert boolean to int
for col in boolean_features_classify:
    X_classify[col] = X_classify[col].astype(int)

# Handle missing values
X_classify = X_classify.fillna(0)

print(f"\nFeature matrix shape: {X_classify.shape}")
print(f"Target variable shape: {y_classify.shape}")
print(f"Number of classes: {y_classify.nunique()}")

# ============================================================================
# 4.2. Decision Tree Classification
# ============================================================================
print_step_header("4.2", "Decision Tree Classification")

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X_classify, y_classify, test_size=0.3, random_state=2025, stratify=y_classify
)

print(f"Training set size: {len(X_train):,} ({len(X_train)/len(X_classify)*100:.1f}%)")
print(f"Testing set size: {len(X_test):,} ({len(X_test)/len(X_classify)*100:.1f}%)")

# ============================================================================
# 4.2.1. Build initial Decision Tree
# ============================================================================
print_step_header("4.2.1", "Build Initial Decision Tree")

# Create and train decision tree
dt_classifier = DecisionTreeClassifier(
    max_depth=5,  # Limit depth for interpretability
    min_samples_split=50,
    min_samples_leaf=20,
    random_state=2025
)

dt_classifier.fit(X_train, y_train)

# Make predictions
y_pred_train = dt_classifier.predict(X_train)
y_pred_test = dt_classifier.predict(X_test)

# Evaluate performance
train_accuracy = accuracy_score(y_train, y_pred_train)
test_accuracy = accuracy_score(y_test, y_pred_test)

print("\nInitial Decision Tree Performance:")
print(f"  - Training accuracy: {train_accuracy:.4f} ({train_accuracy*100:.2f}%)")
print(f"  - Testing accuracy: {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")

# Confusion Matrix
print("\nConfusion Matrix (Test Set):")
cm = confusion_matrix(y_test, y_pred_test)
print(cm)

# Classification Report
print("\nClassification Report (Test Set):")
print(classification_report(y_test, y_pred_test))

# Feature importance
feature_importance = pd.DataFrame({
    'Feature': all_features_classify,
    'Importance': dt_classifier.feature_importances_
}).sort_values('Importance', ascending=False)

print("\nTop 10 Most Important Features:")
print(feature_importance.head(10).to_string(index=False))

# ============================================================================
# 4.2.2. Visualize Decision Tree
# ============================================================================
print_step_header("4.2.2", "Visualize Decision Tree")

# Plot decision tree (simplified view)
plt.figure(figsize=(25, 15))
plot_tree(dt_classifier,
          feature_names=all_features_classify,
          class_names=dt_classifier.classes_,
          filled=True,
          fontsize=8,
          max_depth=3)  # Only show top 3 levels for readability
plt.title('Decision Tree for Traffic Violation Classification (Top 3 Levels)', fontsize=16)
plt.tight_layout()
plt.show()

# Plot feature importance
plt.figure(figsize=(12, 6))
top_features = feature_importance.head(15)
plt.barh(top_features['Feature'], top_features['Importance'], edgecolor='black')
plt.xlabel('Importance')
plt.ylabel('Feature')
plt.title('Top 15 Feature Importances for Violation Type Classification')
plt.gca().invert_yaxis()
plt.grid(True, alpha=0.3, axis='x')
plt.tight_layout()
plt.show()

# ============================================================================
# 4.2.3. Print Decision Tree Rules
# ============================================================================
print_step_header("4.2.3", "Decision Tree Rules")

tree_rules = export_text(dt_classifier, feature_names=all_features_classify, max_depth=3)
print("Decision Tree Rules (Top 3 levels):")
print(tree_rules)

print("\n" + "="*75)
print("# Classification Analysis Complete")
print("="*75)
print("Summary:")
print(f"  - Dataset size: {len(X_classify):,} records")
print(f"  - Number of classes: {y_classify.nunique()}")
print(f"  - Features used: {len(all_features_classify)}")
print(f"  - Training accuracy: {train_accuracy:.4f} ({train_accuracy*100:.2f}%)")
print(f"  - Testing accuracy: {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")
print("="*75)

# ============================================================================
# 5. Clustering by KMeans
# ============================================================================
print_step_header("5", "Clustering by KMeans")

# ============================================================================
# 5.1. Data Preparation for Clustering
# ============================================================================
print_step_header("5.1", "Data Preparation for Clustering")

# ============================================================================
# 5.1.1. Select data
# ============================================================================
print_step_header("5.1.1", "Select data")

# Create a copy for clustering
df_cluster = df.copy()

# Select relevant attributes for clustering
# Focus on features that can reveal patterns in violations
clustering_features = [
    'Date Of Stop', 'Time Of Stop',  # Temporal
    'Latitude', 'Longitude',  # Geographic
    'Accident', 'Personal Injury', 'Property Damage', 'Fatal',  # Severity
    'Alcohol', 'Work Zone',  # Risk factors
    'Commercial Vehicle', 'HAZMAT',  # Vehicle type
    'Year',  # Vehicle age
    'VehicleType', 'SubAgency', 'Gender', 'Race'  # Categorical
]

print(f"Selected {len(clustering_features)} features for clustering")

# ============================================================================
# 5.1.2. Clean data
# ============================================================================
print_step_header("5.1.2", "Clean data")

print(f"Original dataset size: {len(df_cluster):,} rows")

# Remove rows with missing critical coordinates
df_cluster = df_cluster.dropna(subset=['Latitude', 'Longitude'])
print(f"After removing missing coordinates: {len(df_cluster):,} rows")

# ============================================================================
# 5.1.3. Construct data
# ============================================================================
print_step_header("5.1.3", "Construct data")

# Create temporal features
print("Creating temporal features...")

df_cluster['Hour'] = pd.to_datetime(df_cluster['Time Of Stop'], format='%H:%M:%S', errors='coerce').dt.hour
df_cluster['Month'] = df_cluster['Date Of Stop'].dt.month
df_cluster['DayOfWeek'] = df_cluster['Date Of Stop'].dt.dayofweek
df_cluster['IsWeekend'] = (df_cluster['DayOfWeek'] >= 5).astype(int)

# Time of day
df_cluster['TimeOfDay'] = df_cluster['Hour'].apply(categorize_time_of_day)

# Vehicle age
df_cluster['VehicleAge'] = current_year - df_cluster['Year'].fillna(current_year)

print("Created features: Hour, Month, DayOfWeek, IsWeekend, TimeOfDay, VehicleAge")

# ============================================================================
# 5.1.4. Integrate data
# ============================================================================
print_step_header("5.1.4", "Integrate data")

final_features_cluster = [
    'Hour', 'Month', 'DayOfWeek', 'IsWeekend',
    'Latitude', 'Longitude',
    'VehicleAge',
    'Accident', 'Personal Injury', 'Property Damage', 'Fatal',
    'Alcohol', 'Work Zone',
    'Commercial Vehicle', 'HAZMAT',
    'VehicleType', 'SubAgency', 'Gender', 'Race', 'TimeOfDay'
]

print(f"Final selected features: {len(final_features_cluster)}")

# ============================================================================
# 5.1.5. Format data
# ============================================================================
print_step_header("5.1.5", "Format data")

# Encode categorical variables
print("Encoding categorical variables...")

categorical_features_cluster = ['VehicleType', 'SubAgency', 'Gender', 'Race', 'TimeOfDay']
label_encoders_cluster = {}

for feature in categorical_features_cluster:
    le = LabelEncoder()
    df_cluster[feature] = df_cluster[feature].fillna('Unknown')
    df_cluster[feature + '_encoded'] = le.fit_transform(df_cluster[feature].astype(str))
    label_encoders_cluster[feature] = le
    print(f"  - Encoded {feature}: {len(le.classes_)} unique values")

# Prepare feature matrix
numeric_features_cluster = [
    'Hour', 'Month', 'DayOfWeek', 'IsWeekend',
    'Latitude', 'Longitude', 'VehicleAge'
]

boolean_features_cluster = [
    'Accident', 'Personal Injury', 'Property Damage', 'Fatal',
    'Alcohol', 'Work Zone',
    'Commercial Vehicle', 'HAZMAT'
]

encoded_features_cluster = [feat + '_encoded' for feat in categorical_features_cluster]

all_features_cluster = numeric_features_cluster + boolean_features_cluster + encoded_features_cluster

# Create feature matrix
X_cluster = df_cluster[all_features_cluster].copy()

# Convert boolean to int
for col in boolean_features_cluster:
    X_cluster[col] = X_cluster[col].astype(int)

# Handle missing values
X_cluster = X_cluster.fillna(0)

print(f"\nFeature matrix shape: {X_cluster.shape}")

# Scale features
print("\nScaling features using StandardScaler...")
scaler_cluster = StandardScaler()
X_cluster_scaled = scaler_cluster.fit_transform(X_cluster)

print(f"Scaled feature matrix shape: {X_cluster_scaled.shape}")

# Sample data if too large (for computational efficiency)
if len(X_cluster_scaled) > 10000:
    sample_size = 10000
    sample_indices = np.random.choice(len(X_cluster_scaled), sample_size, replace=False)
    X_cluster_sampled = X_cluster_scaled[sample_indices]
    df_cluster_sampled = df_cluster.iloc[sample_indices].copy()
    print(f"\nSampled {sample_size:,} records for clustering")
else:
    X_cluster_sampled = X_cluster_scaled
    df_cluster_sampled = df_cluster.copy()
    print(f"\nUsing all {len(X_cluster_scaled):,} records for clustering")

# ============================================================================
# 5.2. KMeans Clustering
# ============================================================================
print_step_header("5.2", "KMeans Clustering")

# ============================================================================
# 5.2.1. Find Optimal K using Elbow Method
# ============================================================================
print_step_header("5.2.1", "Find Optimal K using Elbow Method")

print("Testing k values from 2 to 10...")

inertias = []
silhouette_scores = []
davies_bouldin_scores = []
k_range = range(2, 11)

for k in k_range:
    print(f"  Testing k={k}...")
    kmeans = KMeans(n_clusters=k, random_state=2025, n_init=10, max_iter=300)
    cluster_labels = kmeans.fit_predict(X_cluster_sampled)

    inertias.append(kmeans.inertia_)
    silhouette_scores.append(silhouette_score(X_cluster_sampled, cluster_labels))
    davies_bouldin_scores.append(davies_bouldin_score(X_cluster_sampled, cluster_labels))

    print(f"    - Inertia: {kmeans.inertia_:.2f}")
    print(f"    - Silhouette Score: {silhouette_scores[-1]:.4f}")
    print(f"    - Davies-Bouldin Score: {davies_bouldin_scores[-1]:.4f}")

# Plot elbow curve
fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# Inertia (Elbow Method)
axes[0].plot(k_range, inertias, 'bo-', linewidth=2, markersize=8)
axes[0].set_xlabel('Number of Clusters (k)')
axes[0].set_ylabel('Inertia (Within-cluster sum of squares)')
axes[0].set_title('Elbow Method for Optimal k')
axes[0].grid(True, alpha=0.3)

# Silhouette Score (higher is better)
axes[1].plot(k_range, silhouette_scores, 'go-', linewidth=2, markersize=8)
axes[1].set_xlabel('Number of Clusters (k)')
axes[1].set_ylabel('Silhouette Score')
axes[1].set_title('Silhouette Score for Different k')
axes[1].grid(True, alpha=0.3)

# Davies-Bouldin Score (lower is better)
axes[2].plot(k_range, davies_bouldin_scores, 'ro-', linewidth=2, markersize=8)
axes[2].set_xlabel('Number of Clusters (k)')
axes[2].set_ylabel('Davies-Bouldin Score')
axes[2].set_title('Davies-Bouldin Score for Different k')
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Select optimal k (you can adjust based on the plots)
optimal_k = 5  # This can be adjusted based on elbow curve
print(f"\nSelected optimal k: {optimal_k}")

# ============================================================================
# 5.2.2. Build KMeans Model with Optimal K
# ============================================================================
print_step_header("5.2.2", "Build KMeans Model with Optimal K")

print(f"Building KMeans model with k={optimal_k}...")

kmeans_final = KMeans(n_clusters=optimal_k, random_state=2025, n_init=10, max_iter=300)
cluster_labels = kmeans_final.fit_predict(X_cluster_sampled)

df_cluster_sampled['Cluster'] = cluster_labels

print("\nKMeans Clustering Results:")
print(f"  - Number of clusters: {optimal_k}")
print(f"  - Inertia: {kmeans_final.inertia_:.2f}")
print(f"  - Silhouette Score: {silhouette_score(X_cluster_sampled, cluster_labels):.4f}")
print(f"  - Davies-Bouldin Score: {davies_bouldin_score(X_cluster_sampled, cluster_labels):.4f}")

# Display results - Cluster distribution
print("\nCluster Distribution:")
cluster_counts = pd.Series(cluster_labels).value_counts().sort_index()
for cluster_id, count in cluster_counts.items():
    pct = (count / len(cluster_labels)) * 100
    print(f"  - Cluster {cluster_id}: {count:,} records ({pct:.2f}%)")

# ============================================================================
# 5.2.3. Analyze Cluster Characteristics
# ============================================================================
print_step_header("5.2.3", "Analyze Cluster Characteristics")

for cluster_id in range(optimal_k):
    print(f"\n{'='*75}")
    print(f"# Cluster {cluster_id} Characteristics")
    print(f"{'='*75}")

    cluster_data = df_cluster_sampled[df_cluster_sampled['Cluster'] == cluster_id]

    print(f"\nSize: {len(cluster_data):,} records ({len(cluster_data)/len(df_cluster_sampled)*100:.2f}%)")

    print("\nTemporal patterns:")
    print(f"  - Most common hour: {cluster_data['Hour'].mode().values[0]}")
    print(f"  - Most common month: {cluster_data['Month'].mode().values[0]}")
    print(f"  - Weekend violations: {cluster_data['IsWeekend'].sum()} ({cluster_data['IsWeekend'].mean()*100:.1f}%)")

    print("\nGeographic center:")
    print(f"  - Mean Latitude: {cluster_data['Latitude'].mean():.4f}")
    print(f"  - Mean Longitude: {cluster_data['Longitude'].mean():.4f}")

    print("\nAccident-related:")
    print(f"  - Accident: {cluster_data['Accident'].sum()} ({cluster_data['Accident'].mean()*100:.1f}%)")
    print(f"  - Personal Injury: {cluster_data['Personal Injury'].sum()} ({cluster_data['Personal Injury'].mean()*100:.1f}%)")
    print(f"  - Property Damage: {cluster_data['Property Damage'].sum()} ({cluster_data['Property Damage'].mean()*100:.1f}%)")
    print(f"  - Fatal: {cluster_data['Fatal'].sum()} ({cluster_data['Fatal'].mean()*100:.1f}%)")

    print("\nRisk factors:")
    print(f"  - Alcohol: {cluster_data['Alcohol'].sum()} ({cluster_data['Alcohol'].mean()*100:.1f}%)")
    print(f"  - Work Zone: {cluster_data['Work Zone'].sum()} ({cluster_data['Work Zone'].mean()*100:.1f}%)")

    print("\nVehicle characteristics:")
    print(f"  - Average Vehicle Age: {cluster_data['VehicleAge'].mean():.1f} years")
    print(f"  - Commercial Vehicle: {cluster_data['Commercial Vehicle'].sum()} ({cluster_data['Commercial Vehicle'].mean()*100:.1f}%)")

    print("\nTop 5 Violation Types:")
    top_violations = cluster_data['Violation Type'].value_counts().head(5)
    for vtype, count in top_violations.items():
        print(f"  - {vtype}: {count} ({count/len(cluster_data)*100:.1f}%)")

# ============================================================================
# 5.2.4. Visualize Clusters
# ============================================================================
print_step_header("5.2.4", "Visualize Clusters")

# Visualize clusters in geographic space
plt.figure(figsize=(12, 8))
scatter = plt.scatter(df_cluster_sampled['Longitude'],
                     df_cluster_sampled['Latitude'],
                     c=df_cluster_sampled['Cluster'],
                     cmap='viridis',
                     alpha=0.6,
                     s=10)
plt.colorbar(scatter, label='Cluster')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.title(f'KMeans Clustering Results (k={optimal_k}) - Geographic Distribution')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Visualize clusters using PCA for 2D projection
print("\nReducing dimensions using PCA for visualization...")
pca = PCA(n_components=2, random_state=2025)
X_pca = pca.fit_transform(X_cluster_sampled)

plt.figure(figsize=(12, 8))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1],
                     c=cluster_labels,
                     cmap='viridis',
                     alpha=0.6,
                     s=10)
plt.colorbar(scatter, label='Cluster')
plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]*100:.1f}% variance)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]*100:.1f}% variance)')
plt.title(f'KMeans Clustering Results (k={optimal_k}) - PCA Projection')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# ============================================================================
# 5.2.5. Outlier Detection from Clusters
# ============================================================================
print_step_header("5.2.5", "Outlier Detection from Clusters")

# Find outliers based on distance from cluster centers
distances = kmeans_final.transform(X_cluster_sampled)
min_distances = distances.min(axis=1)

# Define outliers as points far from their cluster center (top 1%)
outlier_threshold = np.percentile(min_distances, 99)
cluster_outliers = min_distances > outlier_threshold

# Display results
n_cluster_outliers = cluster_outliers.sum()
print("Outlier detection based on cluster distance:")
print(f"  - Outlier threshold (99th percentile): {outlier_threshold:.4f}")
print(f"  - Number of outliers detected: {n_cluster_outliers:,} ({n_cluster_outliers/len(df_cluster_sampled)*100:.2f}%)")

df_cluster_sampled['Cluster_Outlier'] = cluster_outliers
df_cluster_sampled['Distance_to_Center'] = min_distances

# Show outlier records
if n_cluster_outliers > 0:
    print("\nTop 10 cluster-based outliers (furthest from centers):")
    cluster_outlier_records = df_cluster_sampled[cluster_outliers].nlargest(10, 'Distance_to_Center')[
        ['SeqID', 'Date Of Stop', 'Time Of Stop', 'Location',
         'Violation Type', 'Cluster', 'Distance_to_Center']
    ]
    print(cluster_outlier_records.to_string(index=False))

# Visualize outliers
plt.figure(figsize=(12, 8))
plt.scatter(df_cluster_sampled[~cluster_outliers]['Longitude'],
           df_cluster_sampled[~cluster_outliers]['Latitude'],
           c='blue', alpha=0.3, s=1, label='Normal')
plt.scatter(df_cluster_sampled[cluster_outliers]['Longitude'],
           df_cluster_sampled[cluster_outliers]['Latitude'],
           c='red', alpha=0.8, s=20, label='Outliers')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.title(f'Cluster-based Outliers (n={n_cluster_outliers:,})')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

print("\n" + "="*75)
print("# Clustering Analysis Complete")
print("="*75)
print("Summary:")
print(f"  - Dataset size: {len(df_cluster_sampled):,} records")
print(f"  - Features used: {len(all_features_cluster)}")
print(f"  - Optimal k: {optimal_k}")
print(f"  - Silhouette Score: {silhouette_score(X_cluster_sampled, cluster_labels):.4f}")
print(f"  - Cluster-based outliers: {n_cluster_outliers:,} ({n_cluster_outliers/len(df_cluster_sampled)*100:.2f}%)")
print("="*75)

# ============================================================================
# 6. Outlier Detection by LOF and Isolation Forest (ISF) (and common outliers)
# ============================================================================
print_step_header("6", "Outlier Detection by LOF and Isolation Forest")

# ============================================================================
# 6.1. Data Preparation for Outlier Detection
# ============================================================================
print_step_header("6.1", "Data Preparation for Outlier Detection")

# Create a copy for outlier detection
df_outlier = df.copy()

# ============================================================================
# 6.1.1. Select Data
# ============================================================================
# Requirement: At least 10 relevant attributes for anomaly detection
# Goal: Identify abnormal traffic patterns (fraud, data issues, systemic problems)
# Outcome: Multi-dimensional feature set covering spatial, temporal, severity, risk factors, and other key perspectives

print_step_header("6.1.1", "Select Data - Select and justify features for outlier detection")

# Define feature groups (10+ modeling attributes required)
feature_groups = {
    'Geographic': ['Latitude', 'Longitude'],
    'Temporal': ['Date Of Stop', 'Time Of Stop'],
    'Severity': ['Accident', 'Personal Injury', 'Property Damage', 'Fatal'],  # KEY
    'Risk': ['Alcohol', 'Work Zone'],
    'Vehicle': ['Year', 'VehicleType', 'Commercial Vehicle', 'HAZMAT'],
    'Safety': ['Belts', 'Contributed To Accident'],
    'Demographics': ['Gender', 'Race'],
    'Enforcement': ['SubAgency'],
    'Auxiliary': ['SeqID', 'Location', 'Violation Type']  # Non-modeling
}

# Extract feature lists
geographic_features = feature_groups['Geographic']
temporal_features = feature_groups['Temporal']
severity_features = feature_groups['Severity']
risk_features = feature_groups['Risk']
vehicle_features = feature_groups['Vehicle']
safety_features = feature_groups['Safety']
demographic_features = feature_groups['Demographics']
enforcement_features = feature_groups['Enforcement']
auxiliary_features = feature_groups['Auxiliary']

# Consolidate all features
selected_features = (
    auxiliary_features + geographic_features + temporal_features +
    severity_features + risk_features + vehicle_features +
    safety_features + demographic_features + enforcement_features
)

# Filter dataset to selected features
df_outlier = df_outlier[selected_features].copy()

# Display results
modeling_features_count = len(selected_features) - len(auxiliary_features)
print("\n【Dataset Overview】")
print(f"- Total: {len(selected_features)} features ({modeling_features_count} modeling + {len(auxiliary_features)} auxiliary)")
print(f"- Shape: {df_outlier.shape[0]:,} rows × {df_outlier.shape[1]} columns")

print("\n【Feature Groups】")
for group_name, features in feature_groups.items():
    print(f"- {group_name}: {features}")

# ============================================================================
# 6.1.2. Clean Data
# ============================================================================
# Requirement: Remove duplicates, handle missing values, validate data quality
# Goal: Ensure data integrity and reliability for accurate anomaly detection
# Outcome: Clean, validated dataset ready for feature engineering

print_step_header("6.1.2", "Clean Data")

# ============================================================================
# Step 1: Remove duplicate rows
# ============================================================================
print_step_header("Step 1", "Remove duplicate rows")

# Record initial state
rows_before = df_outlier.shape[0]

# Remove duplicates (keep first occurrence)
df_outlier.drop_duplicates(subset=['SeqID'], keep='first', inplace=True)

# Display results
rows_after = df_outlier.shape[0]
duplicates_removed = rows_before - rows_after
print("\n【Deduplication Results】")
print(f"- Records before: {rows_before:,}")
print(f"- Records after: {rows_after:,}")
print(f"- Duplicates removed: {duplicates_removed:,} ({duplicates_removed/rows_before*100:.2f}%)")
print("- Strategy: Keep first occurrence based on SeqID")

if duplicates_removed == 0:
    print("- ✓ No duplicate records found")

# ============================================================================
# Step 2: Check missing values
# ============================================================================
print_step_header("Step 2", "Check missing values")

# Check missing values
missing_stats = df_outlier.isnull().sum()
missing_stats_pct = (missing_stats / len(df_outlier) * 100).round(2)

# Display results
print("\n【Missing Values Overview】")
if missing_stats[missing_stats > 0].empty:
    print("- No missing values found")
else:
    print(pd.DataFrame({
        'Missing Count': missing_stats[missing_stats > 0],
        'Percentage': missing_stats_pct[missing_stats > 0]
    }))
print("\nNote: Missing values will be handled after feature engineering")

# ============================================================================
# Step 3: Data validation and remove invalid records
# ============================================================================
print_step_header("Step 3", "Data validation and remove invalid records")

# 1. Geographic coordinate validation
invalid_lat = ((df_outlier['Latitude'] < -90) | (df_outlier['Latitude'] > 90)).sum()
invalid_lon = ((df_outlier['Longitude'] < -180) | (df_outlier['Longitude'] > 180)).sum()

# 2. Temporal validation
invalid_year = ((df_outlier['Year'] < 1900) | (df_outlier['Year'] > 2025)).sum()

# Date validation (already datetime from earlier conversion)
invalid_date = df_outlier['Date Of Stop'].isnull().sum()
invalid_date_range = ((df_outlier['Date Of Stop'] < '2015-01-01') | (df_outlier['Date Of Stop'] > '2025-12-31')).sum()

# Time validation (convert to time for validation)
df_outlier['Time Of Stop Parsed'] = pd.to_datetime(df_outlier['Time Of Stop'], format='%H:%M:%S', errors='coerce')
invalid_time = df_outlier['Time Of Stop Parsed'].isnull().sum()

# 3. Binary fields validation (should be bool: True/False)
binary_fields = [
    'Accident', 'Personal Injury', 'Property Damage', 'Fatal',
    'Alcohol', 'Work Zone', 'Belts', 'Contributed To Accident',
    'Commercial Vehicle', 'HAZMAT'
]
# Count invalid binary values (should only be True/False)
invalid_binary = sum((~df_outlier[field].isin([True, False])).sum() for field in binary_fields)

# Display validation results before removal
print("\n【Data Quality Checks】")
print("1. Geographic Coordinates:")
print(f"   - Invalid Latitude values: {invalid_lat}")
print(f"   - Invalid Longitude values: {invalid_lon}")
print("2. Temporal:")
print(f"   - Invalid Year values: {invalid_year}")
print(f"   - Invalid Date Of Stop (null): {invalid_date}")
print(f"   - Invalid Date Of Stop (out of range 2015-2025): {invalid_date_range}")
print(f"   - Invalid Time Of Stop (null): {invalid_time}")
print("3. Binary Fields (True/False):")
print(f"   - Invalid boolean values: {invalid_binary}")

# Remove invalid records
rows_before_validation = df_outlier.shape[0]
valid_mask = (
    (df_outlier['Latitude'] >= -90) & (df_outlier['Latitude'] <= 90) &
    (df_outlier['Longitude'] >= -180) & (df_outlier['Longitude'] <= 180) &
    (df_outlier['Year'] >= 1900) & (df_outlier['Year'] <= 2025) &
    (df_outlier['Date Of Stop'].notnull()) &
    (df_outlier['Date Of Stop'] >= '2015-01-01') & (df_outlier['Date Of Stop'] <= '2025-12-31') &
    (df_outlier['Time Of Stop Parsed'].notnull())
)
# Check each binary field for valid boolean values
for field in binary_fields:
    valid_mask &= df_outlier[field].isin([True, False])

df_outlier = df_outlier[valid_mask]

# Drop the temporary parsed time column
df_outlier.drop('Time Of Stop Parsed', axis=1, inplace=True)

# Display results
rows_removed = rows_before_validation - df_outlier.shape[0]
print("\n【Data Validation Results】")
print(f"- Removed {rows_removed:,} records with invalid data")
print(f"- Remaining records: {df_outlier.shape[0]:,}")

# ============================================================================
# Step 4: Apply sampling technique (stratified sampling)
# ============================================================================
print_step_header("Step 4", "Apply sampling technique (stratified sampling)")

# Calculate sample size (as per project requirements: 10,000 records)
original_size = len(df_outlier)
target_sample_size = 10000

if original_size > target_sample_size:
    sample_fraction = target_sample_size / original_size

    # Stratified sampling by 'Accident' (key severity indicator)
    # This ensures the proportion of each class is maintained in the sample
    df_outlier = df_outlier.groupby('Accident', group_keys=False).apply(
        lambda x: x.sample(frac=sample_fraction, random_state=2025)
    )

    # Display results
    print("\n【Sampling Results】")
    print(f"- Original size: {original_size:,} records")
    print(f"- Sample size: {len(df_outlier):,} records ({len(df_outlier)/original_size*100:.1f}%)")
    print("- Sampling method: Stratified sampling by 'Accident'")
    print(f"- Sampling fraction: {sample_fraction:.4f}")
    print("- Random state: 2025 (for reproducibility)")
    print("- Reason: Outlier detection algorithms (LOF, Isolation Forest) are computationally expensive")
    print("\n- Accident distribution maintained:")
    accident_dist = df_outlier['Accident'].value_counts(normalize=True).round(4)
    for val, pct in accident_dist.items():
        print(f"    {val}: {pct:.2%}")
else:
    print("\n【Sampling Results】")
    print(f"- Dataset size ({original_size:,}) is within acceptable range.")
    print("- No sampling needed.")

print(f"\n{'='*75}")
print(f"✓ Dataset size after cleaning and sampling: {len(df_outlier):,} rows")
print(f"{'='*75}")

# ============================================================================
# 6.1.3. Construct Data
# ============================================================================
# Requirement: Feature engineering - create new meaningful attributes
# Goal: Extract temporal patterns and vehicle characteristics to enhance anomaly detection capability
# Outcome: Enriched feature set with temporal components, vehicle age, and optional binning features

print_step_header("6.1.3", "Construct Data - Feature Engineering")

# ============================================================================
# Step 1: Create temporal features
# ============================================================================
print_step_header("Step 1", "Create temporal features")

# Combine date and time
# Time Of Stop is already a string format HH:MM:SS
df_outlier['DateTime'] = pd.to_datetime(
    df_outlier['Date Of Stop'].astype(str) + ' ' + df_outlier['Time Of Stop'].astype(str),
    errors='coerce'
)

# Extract temporal components
df_outlier['Hour'] = df_outlier['DateTime'].dt.hour
df_outlier['Month'] = df_outlier['DateTime'].dt.month
df_outlier['DayOfWeek'] = df_outlier['DateTime'].dt.dayofweek  # 0=Monday, 6=Sunday
df_outlier['IsWeekend'] = (df_outlier['DayOfWeek'] >= 5).astype(int)

# Create time of day categories
def categorize_time_of_day(hour):
    if pd.isna(hour):
        return 'Unknown'
    elif 0 <= hour < 6:
        return 'Night'
    elif 6 <= hour < 12:
        return 'Morning'
    elif 12 <= hour < 18:
        return 'Afternoon'
    else:
        return 'Evening'

df_outlier['TimeOfDay'] = df_outlier['Hour'].apply(categorize_time_of_day)

# Display results
print("\n【Temporal Features Created】")
print("- Hour: 0-23")
print("- Month: 1-12")
print("- DayOfWeek: 0-6 (0=Monday)")
print("- IsWeekend: 0/1")
print("- TimeOfDay: Night/Morning/Afternoon/Evening")

# ============================================================================
# Step 2: Create vehicle age feature
# ============================================================================
print_step_header("Step 2", "Create vehicle age feature")

# Calculate vehicle age
current_year = 2025
df_outlier['VehicleAge'] = current_year - df_outlier['Year']

# Handle outliers: cap at reasonable maximum (50 years for very old vehicles)
df_outlier['VehicleAge'] = df_outlier['VehicleAge'].clip(lower=0, upper=50)

# Display results
print("\n【Vehicle Age Statistics】")
print(f"- Formula: VehicleAge = {current_year} - Year")
print(f"- Mean age: {df_outlier['VehicleAge'].mean():.1f} years")
print(f"- Median age: {df_outlier['VehicleAge'].median():.1f} years")
print(f"- Range: {df_outlier['VehicleAge'].min():.0f} - {df_outlier['VehicleAge'].max():.0f} years")
print("- Outliers capped at 50 years")

# ============================================================================
# Step 3: Create binning features (optional)
# ============================================================================
print_step_header("Step 3", "Create binning features (optional)")

# VehicleAge binning using if conditions
def bin_vehicle_age(age):
    if age <= 3:
        return 'New'
    elif age <= 7:
        return 'Recent'
    elif age <= 15:
        return 'Middle'
    else:
        return 'Old'

df_outlier['VehicleAge_Binned'] = df_outlier['VehicleAge'].apply(bin_vehicle_age)

# Hour binning using if conditions
def bin_hour(hour):
    if hour <= 6:
        return 'Night'
    elif hour <= 12:
        return 'Morning'
    elif hour <= 18:
        return 'Afternoon'
    else:
        return 'Evening'

df_outlier['Hour_Binned'] = df_outlier['Hour'].apply(bin_hour)

# Display results
print("\n【Binning Features Created】")
print(f"- VehicleAge_Binned: {df_outlier['VehicleAge_Binned'].value_counts().to_dict()}")
print(f"- Hour_Binned: {df_outlier['Hour_Binned'].value_counts().to_dict()}")
print("\nNote: Binning is optional. These features can be used or excluded based on model performance.")

# ============================================================================
# Step 4: Handle missing values after feature engineering
# ============================================================================
print_step_header("Step 4", "Handle missing values after feature engineering")

# Check missing values after feature engineering
rows_before = df_outlier.shape[0]
missing_stats = df_outlier.isnull().sum()
missing_stats_pct = (missing_stats / len(df_outlier) * 100).round(2)

# Display results
print("\n【Missing Values After Feature Engineering】")
if missing_stats[missing_stats > 0].empty:
    print("- No missing values found")
else:
    print(pd.DataFrame({
        'Missing Count': missing_stats[missing_stats > 0],
        'Percentage': missing_stats_pct[missing_stats > 0]
    }))

# Strategy: Remove rows with missing values
# Reason: Missing values are minimal (<1%), deletion preserves data quality
if missing_stats[missing_stats > 0].any():
    df_outlier.dropna(inplace=True)

    # Display results
    rows_after = df_outlier.shape[0]
    print("\n【Missing Value Handling Results】")
    print(f"- Records before: {rows_before:,}")
    print(f"- Records after: {rows_after:,}")
    print(f"- Records removed: {rows_before - rows_after:,} ({(rows_before - rows_after)/rows_before*100:.2f}%)")
    print("- Strategy: Delete rows with any missing values")
    print("- Reason: Missing values minimal, complete data is more reliable for outlier detection")
else:
    print("\n【Missing Value Handling Results】")
    print("- No missing values to handle")
    print("- All records retained")

# ============================================================================
# 6.1.4. Integrate Data
# ============================================================================
# Requirement: Organize features by type, check for redundancy and multicollinearity
# Goal: Ensure feature independence and avoid redundant information
# Outcome: Well-organized feature set with minimal redundancy, ready for modeling

print_step_header("6.1.4", "Integrate Data - Define feature categories and check redundancy")

# ============================================================================
# Step 1: Define feature categories and check redundancy
# ============================================================================
print_step_header("Step 1", "Define feature categories and check redundancy")

# Define modeling feature categories
numerical_features = ['Latitude', 'Longitude', 'Hour', 'Month', 'DayOfWeek', 'IsWeekend', 'VehicleAge']

boolean_features = [
    'Accident', 'Personal Injury', 'Property Damage', 'Fatal',
    'Alcohol', 'Work Zone', 'Commercial Vehicle', 'HAZMAT',
    'Belts', 'Contributed To Accident'
]

categorical_features = ['VehicleType', 'SubAgency', 'Gender', 'Race', 'TimeOfDay']

# Optional binned features (not included in main modeling)
optional_binned_features = ['VehicleAge_Binned', 'Hour_Binned']

# Check redundancy
# Original time columns (Date Of Stop, Time Of Stop) will NOT be used for modeling
# Only use engineered temporal features

# Display results
total_features = len(numerical_features) + len(boolean_features) + len(categorical_features)
print("\n【Final Modeling Features】")
print(f"- Total: {total_features} features (≥ 10 ✓)")
print("\n【Feature Categories】")
print(f"- Numerical: {len(numerical_features)} features")
print(f"  {numerical_features}")
print(f"- Boolean: {len(boolean_features)} features")
print(f"  {boolean_features}")
print(f"- Categorical: {len(categorical_features)} features")
print(f"  {categorical_features}")
print("\n【Feature Purpose by Dimension】")
print("- Spatial: Latitude, Longitude")
print("- Temporal: Hour, Month, DayOfWeek, IsWeekend, TimeOfDay")
print("- Severity: Accident, Personal Injury, Property Damage, Fatal")
print("- Risk: Alcohol, Work Zone")
print("- Vehicle: VehicleAge, VehicleType, Commercial Vehicle, HAZMAT")
print("- Enforcement: SubAgency")
print("- Demographics: Gender, Race")
print("- Safety: Belts, Contributed To Accident")

# ============================================================================
# Step 2: Correlation analysis
# ============================================================================
print_step_header("Step 2", "Correlation analysis")

# Calculate correlation matrix for numerical features
correlation_matrix = df_outlier[numerical_features].corr()

# Identify highly correlated pairs (|correlation| > 0.8)
high_corr_pairs = []
for i in range(len(correlation_matrix.columns)):
    for j in range(i+1, len(correlation_matrix.columns)):
        corr_value = correlation_matrix.iloc[i, j]
        if abs(corr_value) > 0.8:
            high_corr_pairs.append((
                correlation_matrix.columns[i],
                correlation_matrix.columns[j],
                corr_value
            ))

# Visualize correlation matrix
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, fmt='.2f', cmap='coolwarm', center=0,
            square=True, linewidths=1, cbar_kws={"shrink": 0.8})
plt.title('Feature Correlation Matrix', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# Display results
print("\n【Correlation Analysis】")
print(f"- Numerical features analyzed: {len(numerical_features)}")
print(f"- Highly correlated pairs (|r| > 0.8): {len(high_corr_pairs)}")

if high_corr_pairs:
    print("\n【High Correlation Pairs】")
    for feat1, feat2, corr in high_corr_pairs:
        print(f"  {feat1} ↔ {feat2}: {corr:.3f}")
    print("Note: Review and potentially remove one feature from each highly correlated pair")
else:
    print("\n- No highly correlated pairs found (|r| > 0.8)")

# Diagnostic: Check Latitude-Longitude distribution
print("\n【Geographic Coordinates Diagnostic】")
print(f"- Latitude range: [{df_outlier['Latitude'].min():.4f}, {df_outlier['Latitude'].max():.4f}]")
print(f"- Longitude range: [{df_outlier['Longitude'].min():.4f}, {df_outlier['Longitude'].max():.4f}]")
print(f"- Latitude std: {df_outlier['Latitude'].std():.6f}")
print(f"- Longitude std: {df_outlier['Longitude'].std():.6f}")
print(f"- Lat-Lon correlation: {df_outlier['Latitude'].corr(df_outlier['Longitude']):.4f}")
if abs(df_outlier['Latitude'].corr(df_outlier['Longitude'])) > 0.95:
    print("⚠️  Warning: Very high correlation detected (unusual for traffic data)")

# ============================================================================
# 6.1.5. Format Data
# ============================================================================
# Requirement: Encode categorical variables, scale numerical features, validate data quality
# Goal: Transform data into algorithm-ready format for distance-based anomaly detection
# Outcome: Fully prepared, scaled feature matrix ready for outlier detection algorithms

print_step_header("6.1.5", "Format Data - Encode, scale, and validate")

# ============================================================================
# Step 1: Encode categorical variables
# ============================================================================
print_step_header("Step 1", "Encode categorical variables")

# Initialize encoders dictionary
encoders = {}

# Encode categorical features
for feature in categorical_features:
    # Apply LabelEncoder
    le = LabelEncoder()
    # Fill NaN with 'Unknown' before encoding
    df_outlier[feature] = df_outlier[feature].fillna('Unknown')
    df_outlier[f'{feature}_encoded'] = le.fit_transform(df_outlier[feature].astype(str))

    # Save encoder for later interpretation
    encoders[feature] = le

# Display results
print("\n【Encoding Results】")
for feature in categorical_features:
    le = encoders[feature]
    print(f"- {feature}: {len(le.classes_)} unique values → encoded")

# ============================================================================
# Step 2: Create feature matrix and validate data types
# ============================================================================
print_step_header("Step 2", "Create feature matrix and validate data types")

# Create feature matrix: integrate numerical, boolean, encoded features
encoded_categorical_features = [f'{f}_encoded' for f in categorical_features]
all_modeling_features = numerical_features + boolean_features + encoded_categorical_features

# Convert boolean features to integers (0/1)
for feature in boolean_features:
    df_outlier[feature] = df_outlier[feature].astype(int)

# Create feature matrix
X_outlier = df_outlier[all_modeling_features].copy()

# Display results
print("\n【Feature Matrix】")
print(f"- Shape: {X_outlier.shape[0]:,} rows × {X_outlier.shape[1]} columns")
print(f"- Data types: {X_outlier.dtypes.value_counts().to_dict()}")
print(f"- Missing values: {X_outlier.isnull().sum().sum()}")

# ============================================================================
# Step 3: Feature scaling
# ============================================================================
print_step_header("Step 3", "Feature scaling")

# Initialize scaler
scaler = StandardScaler()

# Fit and transform features
X_outlier_scaled = scaler.fit_transform(X_outlier)

# Convert back to DataFrame for readability
X_outlier_scaled_df = pd.DataFrame(
    X_outlier_scaled,
    columns=X_outlier.columns,
    index=X_outlier.index
)

# Display results
print("\n【Scaling Results】")
print("- Method: StandardScaler (mean=0, std=1)")
print(f"- Scaled matrix shape: {X_outlier_scaled.shape}")
print(f"- Mean after scaling: {X_outlier_scaled_df.mean().mean():.6f}")
print(f"- Std after scaling: {X_outlier_scaled_df.std().mean():.6f}")

# ============================================================================
# Step 4: Final validation
# ============================================================================
print_step_header("Step 4", "Final validation")

# Check for NaN values
nan_count = np.isnan(X_outlier_scaled).sum()

# Check for Inf values
inf_count = np.isinf(X_outlier_scaled).sum()

# Display results
print("\n【Data Quality Checks】")
print(f"- NaN values: {nan_count}")
print(f"- Inf values: {inf_count}")

# Confirm shape and data types
print("\n【Final Feature Matrix】")
print(f"- Shape: {X_outlier_scaled.shape[0]:,} rows × {X_outlier_scaled.shape[1]} columns")
print(f"- Memory usage: {X_outlier_scaled.nbytes / 1024**2:.2f} MB")

# Data quality confirmation
print("\n【Validation Results】")
print(f"✓ Final dataset: {X_outlier_scaled.shape[0]:,} records × {X_outlier_scaled.shape[1]} features")
print("✓ Data is ready for outlier detection algorithms")

print(f"\n{'='*75}")
print("# Data Preparation Complete")
print(f"{'='*75}")

# ============================================================================
# 6.2. Outlier Detection Modeling
# ============================================================================
print_step_header("6.2", "Outlier Detection Modeling")

# Store feature names for later use
all_features = all_modeling_features

# ============================================================================
# 6.2.1. Local Outlier Factor (LOF)
# ============================================================================
print_step_header("6.2.1", "Local Outlier Factor (LOF)")

print("\n【LOF Configuration】")
print("- Algorithm: Local Outlier Factor")
print("- n_neighbors: 20 (number of neighbors to consider)")
print("- contamination: 0.01 (expected proportion of outliers: 1%)")
print("- novelty: False (outlier detection mode)")
print("\nLOF detects outliers by measuring the local density deviation of a data point with respect to its neighbors.")

# Apply LOF
lof = LocalOutlierFactor(n_neighbors=20, contamination=0.01, novelty=False)
lof_labels = lof.fit_predict(X_outlier_scaled)

# -1 for outliers, 1 for inliers
outliers_lof = (lof_labels == -1)

# Get LOF scores (negative outlier factor)
lof_scores = lof.negative_outlier_factor_
df_outlier['LOF_score'] = lof_scores
df_outlier['LOF_outlier'] = outliers_lof

# Display results
n_outliers_lof = outliers_lof.sum()
print("\n【LOF Results】")
print(f"- Total outliers detected: {n_outliers_lof:,} ({n_outliers_lof/len(df_outlier)*100:.2f}%)")
print(f"- Total inliers: {(~outliers_lof).sum():,} ({(~outliers_lof).sum()/len(df_outlier)*100:.2f}%)")
print(f"- LOF score range: [{lof_scores.min():.4f}, {lof_scores.max():.4f}]")
print(f"- Mean LOF score: {lof_scores.mean():.4f}")

# Show top 10 outliers by LOF score (most negative scores are most anomalous)
print("\n【Top 10 Most Anomalous Records by LOF】")
print("(Lower scores = more anomalous)")
top_lof_outliers = df_outlier.nsmallest(10, 'LOF_score', keep='first')[
    ['SeqID', 'Date Of Stop', 'Time Of Stop', 'Location',
     'Violation Type', 'VehicleType', 'LOF_score']
]
print(top_lof_outliers.to_string(index=False))

# ============================================================================
# 6.2.2. Isolation Forest (ISF)
# ============================================================================
print_step_header("6.2.2", "Isolation Forest (ISF)")

print("\n【ISF Configuration】")
print("- Algorithm: Isolation Forest")
print("- n_estimators: 100 (number of isolation trees)")
print("- contamination: 0.01 (expected proportion of outliers: 1%)")
print("- random_state: 2025 (for reproducibility)")
print("\nIsolation Forest detects outliers by isolating observations through random feature selection.")

# Apply Isolation Forest
isf = IsolationForest(n_estimators=100, contamination=0.01, random_state=2025)
isf_labels = isf.fit_predict(X_outlier_scaled)

# -1 for outliers, 1 for inliers
outliers_isf = (isf_labels == -1)

# Get anomaly scores
isf_scores = isf.score_samples(X_outlier_scaled)
df_outlier['ISF_score'] = isf_scores
df_outlier['ISF_outlier'] = outliers_isf

# Display results
n_outliers_isf = outliers_isf.sum()
print("\n【Isolation Forest Results】")
print(f"- Total outliers detected: {n_outliers_isf:,} ({n_outliers_isf/len(df_outlier)*100:.2f}%)")
print(f"- Total inliers: {(~outliers_isf).sum():,} ({(~outliers_isf).sum()/len(df_outlier)*100:.2f}%)")
print(f"- ISF score range: [{isf_scores.min():.4f}, {isf_scores.max():.4f}]")
print(f"- Mean ISF score: {isf_scores.mean():.4f}")

# Show top 10 outliers by ISF score (most negative scores are most anomalous)
print("\n【Top 10 Most Anomalous Records by ISF】")
print("(Lower scores = more anomalous)")
top_isf_outliers = df_outlier.nsmallest(10, 'ISF_score', keep='first')[
    ['SeqID', 'Date Of Stop', 'Time Of Stop', 'Location',
     'Violation Type', 'VehicleType', 'ISF_score']
]
print(top_isf_outliers.to_string(index=False))

# ============================================================================
# 6.2.3. Common Outliers Detection
# ============================================================================
print_step_header("6.2.3", "Common Outliers Detection (LOF ∩ ISF)")

# Find common outliers detected by both methods
common_outliers = outliers_lof & outliers_isf
df_outlier['Common_outlier'] = common_outliers

# Display results
n_common_outliers = common_outliers.sum()
print("\n【Common Outliers Analysis】")
print("Outliers detected by BOTH LOF and ISF are considered high-confidence anomalies.")
print(f"\n- LOF outliers: {n_outliers_lof:,} ({n_outliers_lof/len(df_outlier)*100:.2f}%)")
print(f"- ISF outliers: {n_outliers_isf:,} ({n_outliers_isf/len(df_outlier)*100:.2f}%)")
print(f"- Common outliers (LOF ∩ ISF): {n_common_outliers:,} ({n_common_outliers/len(df_outlier)*100:.4f}%)")

# Calculate overlap percentage
if n_outliers_lof > 0 and n_outliers_isf > 0:
    lof_overlap = n_common_outliers / n_outliers_lof * 100
    isf_overlap = n_common_outliers / n_outliers_isf * 100
    print(f"- Overlap with LOF: {lof_overlap:.2f}%")
    print(f"- Overlap with ISF: {isf_overlap:.2f}%")

if n_common_outliers > 0:
    # Display common outliers
    print(f"\n【All {n_common_outliers} Common Outliers】")
    common_outlier_records = df_outlier[common_outliers][
        ['SeqID', 'Date Of Stop', 'Time Of Stop', 'Location',
         'Violation Type', 'VehicleType', 'VehicleAge',
         'Accident', 'Personal Injury', 'Fatal', 'Alcohol',
         'LOF_score', 'ISF_score']
    ].sort_values('LOF_score')
    print(common_outlier_records.to_string(index=False))

    # Analyze characteristics of common outliers
    print(f"\n{'='*75}")
    print("# Characteristics of Common Outliers")
    print(f"{'='*75}")

    common_outlier_df = df_outlier[common_outliers]

    print("\n【Accident-related Features】")
    print(f"- Accident: {common_outlier_df['Accident'].sum()} ({common_outlier_df['Accident'].mean()*100:.1f}%)")
    print(f"- Personal Injury: {common_outlier_df['Personal Injury'].sum()} ({common_outlier_df['Personal Injury'].mean()*100:.1f}%)")
    print(f"- Property Damage: {common_outlier_df['Property Damage'].sum()} ({common_outlier_df['Property Damage'].mean()*100:.1f}%)")
    print(f"- Fatal: {common_outlier_df['Fatal'].sum()} ({common_outlier_df['Fatal'].mean()*100:.1f}%)")

    print("\n【Risk Factors】")
    print(f"- Alcohol: {common_outlier_df['Alcohol'].sum()} ({common_outlier_df['Alcohol'].mean()*100:.1f}%)")
    print(f"- Work Zone: {common_outlier_df['Work Zone'].sum()} ({common_outlier_df['Work Zone'].mean()*100:.1f}%)")

    print("\n【Vehicle Characteristics】")
    print(f"- Average Vehicle Age: {common_outlier_df['VehicleAge'].mean():.1f} years")
    print(f"- Commercial Vehicle: {common_outlier_df['Commercial Vehicle'].sum()} ({common_outlier_df['Commercial Vehicle'].mean()*100:.1f}%)")

    print("\n【Violation Type Distribution】")
    violation_type_counts = common_outlier_df['Violation Type'].value_counts()
    for vtype, count in violation_type_counts.items():
        pct = count / len(common_outlier_df) * 100
        print(f"  - {vtype}: {count} ({pct:.1f}%)")

    print("\n【Interpretation】")
    print("Common outliers represent records that are anomalous according to both algorithms.")
    print("These are high-confidence outliers that may indicate:")
    print("  - Data quality issues (incorrect entries)")
    print("  - Unusual combinations of features")
    print("  - Rare but legitimate edge cases")
    print("  - Potential fraud or misreporting")
else:
    print("\n【No Common Outliers Found】")
    print("LOF and ISF detected different sets of outliers.")
    print("This suggests:")
    print("  - The two algorithms focus on different aspects of anomaly")
    print("  - LOF: Local density-based anomalies")
    print("  - ISF: Global isolation-based anomalies")
    print("  - Consider analyzing both sets separately for comprehensive insights")

# ============================================================================
# 6.3. Outlier Detection Visualization
# ============================================================================
print_step_header("6.3", "Outlier Detection Visualization")

# ============================================================================
# Visualization 1: Geographic Distribution of Outliers
# ============================================================================
print("\n【Visualization 1: Geographic Distribution】")
print("Displaying outliers in geographic space (Latitude vs Longitude)")

fig, axes = plt.subplots(1, 3, figsize=(20, 6))

# Plot 1: LOF outliers
axes[0].scatter(df_outlier[~outliers_lof]['Longitude'],
                df_outlier[~outliers_lof]['Latitude'],
                c='blue', alpha=0.3, s=1, label='Inliers')
axes[0].scatter(df_outlier[outliers_lof]['Longitude'],
                df_outlier[outliers_lof]['Latitude'],
                c='red', alpha=0.8, s=10, label='Outliers', edgecolors='darkred')
axes[0].set_xlabel('Longitude', fontsize=11)
axes[0].set_ylabel('Latitude', fontsize=11)
axes[0].set_title(f'LOF Outliers (n={n_outliers_lof:,})', fontsize=12, fontweight='bold')
axes[0].legend(loc='best')
axes[0].grid(True, alpha=0.3)

# Plot 2: ISF outliers
axes[1].scatter(df_outlier[~outliers_isf]['Longitude'],
                df_outlier[~outliers_isf]['Latitude'],
                c='blue', alpha=0.3, s=1, label='Inliers')
axes[1].scatter(df_outlier[outliers_isf]['Longitude'],
                df_outlier[outliers_isf]['Latitude'],
                c='orange', alpha=0.8, s=10, label='Outliers', edgecolors='darkorange')
axes[1].set_xlabel('Longitude', fontsize=11)
axes[1].set_ylabel('Latitude', fontsize=11)
axes[1].set_title(f'Isolation Forest Outliers (n={n_outliers_isf:,})', fontsize=12, fontweight='bold')
axes[1].legend(loc='best')
axes[1].grid(True, alpha=0.3)

# Plot 3: Common outliers
axes[2].scatter(df_outlier[~common_outliers]['Longitude'],
                df_outlier[~common_outliers]['Latitude'],
                c='blue', alpha=0.3, s=1, label='Inliers')
axes[2].scatter(df_outlier[common_outliers]['Longitude'],
                df_outlier[common_outliers]['Latitude'],
                c='purple', alpha=0.9, s=30, label='Common Outliers',
                edgecolors='darkviolet', linewidths=1.5, marker='*')
axes[2].set_xlabel('Longitude', fontsize=11)
axes[2].set_ylabel('Latitude', fontsize=11)
axes[2].set_title(f'Common Outliers (LOF ∩ ISF) (n={n_common_outliers:,})', fontsize=12, fontweight='bold')
axes[2].legend(loc='best')
axes[2].grid(True, alpha=0.3)

plt.suptitle('Geographic Distribution of Outliers', fontsize=14, fontweight='bold', y=1.00)
plt.tight_layout()
plt.show()

# ============================================================================
# Visualization 2: Anomaly Score Distributions
# ============================================================================
print("\n【Visualization 2: Anomaly Score Distributions】")
print("Displaying distributions of LOF and ISF scores")

fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# LOF score distribution
axes[0].hist(df_outlier['LOF_score'], bins=50, edgecolor='black', alpha=0.7, color='skyblue')
if outliers_lof.sum() > 0:
    outlier_threshold_lof = df_outlier[outliers_lof]['LOF_score'].max()
    axes[0].axvline(outlier_threshold_lof,
                    color='red', linestyle='--', linewidth=2,
                    label=f'Outlier threshold ({outlier_threshold_lof:.2f})')
axes[0].set_xlabel('LOF Score (Negative Outlier Factor)', fontsize=11)
axes[0].set_ylabel('Frequency', fontsize=11)
axes[0].set_title('Distribution of LOF Scores', fontsize=12, fontweight='bold')
axes[0].legend(loc='best')
axes[0].grid(True, alpha=0.3, axis='y')

# ISF score distribution
axes[1].hist(df_outlier['ISF_score'], bins=50, edgecolor='black', alpha=0.7, color='lightsalmon')
if outliers_isf.sum() > 0:
    outlier_threshold_isf = df_outlier[outliers_isf]['ISF_score'].max()
    axes[1].axvline(outlier_threshold_isf,
                    color='red', linestyle='--', linewidth=2,
                    label=f'Outlier threshold ({outlier_threshold_isf:.2f})')
axes[1].set_xlabel('ISF Score (Anomaly Score)', fontsize=11)
axes[1].set_ylabel('Frequency', fontsize=11)
axes[1].set_title('Distribution of Isolation Forest Scores', fontsize=12, fontweight='bold')
axes[1].legend(loc='best')
axes[1].grid(True, alpha=0.3, axis='y')

plt.suptitle('Anomaly Score Distributions', fontsize=14, fontweight='bold', y=1.00)
plt.tight_layout()
plt.show()

# ============================================================================
# Visualization 3: Comparison of Outlier Detection Methods
# ============================================================================
print("\n【Visualization 3: Venn Diagram Comparison】")

# Create a simple bar chart showing the overlap
fig, ax = plt.subplots(figsize=(10, 6))

categories = ['LOF Only', 'ISF Only', 'Both (LOF ∩ ISF)']
lof_only = n_outliers_lof - n_common_outliers
isf_only = n_outliers_isf - n_common_outliers
counts = [lof_only, isf_only, n_common_outliers]
colors = ['#ff7f7f', '#ffb347', '#9370db']

bars = ax.bar(categories, counts, color=colors, edgecolor='black', linewidth=1.5, alpha=0.8)

# Add count labels on bars
for i, (bar, count) in enumerate(zip(bars, counts)):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height,
            f'{count}\n({count/len(df_outlier)*100:.2f}%)',
            ha='center', va='bottom', fontsize=11, fontweight='bold')

ax.set_ylabel('Number of Outliers', fontsize=12)
ax.set_title('Comparison of Outlier Detection Methods', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3, axis='y')
plt.tight_layout()
plt.show()

# ============================================================================
# Final Summary
# ============================================================================
print(f"\n{'='*75}")
print("# OUTLIER DETECTION ANALYSIS COMPLETE")
print(f"{'='*75}")

print("\n【Dataset Summary】")
print(f"- Original dataset: {len(df):,} records")
print(f"- After cleaning and sampling: {len(df_outlier):,} records")
print(f"- Features used for modeling: {len(all_features)}")

print("\n【Algorithm Performance】")
print(f"- LOF outliers: {n_outliers_lof:,} ({n_outliers_lof/len(df_outlier)*100:.2f}%)")
print(f"- ISF outliers: {n_outliers_isf:,} ({n_outliers_isf/len(df_outlier)*100:.2f}%)")
print(f"- Common outliers (LOF ∩ ISF): {n_common_outliers:,} ({n_common_outliers/len(df_outlier)*100:.4f}%)")
if n_outliers_lof > 0 and n_outliers_isf > 0:
    print(f"- Agreement rate: {n_common_outliers / min(n_outliers_lof, n_outliers_isf) * 100:.2f}%")

print("\n【Key Insights】")
print("1. Local Outlier Factor (LOF):")
print("   - Detects outliers based on local density deviation")
print("   - Effective for finding outliers in varying density regions")
print("2. Isolation Forest (ISF):")
print("   - Detects outliers based on isolation mechanism")
print("   - Effective for high-dimensional data and global anomalies")
print("3. Common Outliers:")
print("   - High-confidence anomalies detected by both methods")
print("   - Recommended for priority investigation")

print("\n【Recommendations】")
print("- Investigate common outliers first (highest confidence)")
print("- Review method-specific outliers for domain insights")
print("- Consider outliers for:")
print("  * Data quality improvement")
print("  * Business rule validation")
print("  * Fraud detection")
print("  * Exception handling in operational systems")

print(f"\n{'='*75}")
print("✓ Section 6: Outlier Detection Complete")
print(f"{'='*75}")

