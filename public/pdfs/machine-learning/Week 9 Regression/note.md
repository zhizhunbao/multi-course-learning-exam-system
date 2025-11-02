# 1. Learned so far

Regression
supervised (labeled data)

- classification (predict discrete label)
  -- kNN, DT, random forest, logistic regression
- regression (predict continuous values - ex. house price)

unsupervised (unlabeled data)

- clustering (grouping data)
  -- kmeans
- outlier detection (detect instances that deviate a lot)
  -- LOF, ISF, outliers by clustering

# 2. Final Exame will Test

height: 160 cm
weight: 60 kg, 75 kg, 55, 48, 62.4

1. given data, find the best line from a few given lines
2. given data, find the best fit line
3. given data, find how efficient is your best fit line

height --> weight
weight is dependent on the height
one dependent factor, one independent factor
one independent factor decides the value of on dependent

- simple linear regression

-266.53 + 6.1376h
weight of height: 6.1376

#BR, #WR, location， type --> price
price is dependent on #BR, #WR, location and type
multiple independent factors decide one.

- multiple regression
  a1: #BR, w1: weight of a1
  a2: #WR, w2: weight of a2
  a3: location, w3: weight of a3
  a4: type, w4: weight of a4

price: a1w1 + a2w2 + a3w3 + a4w4 + bias

#BR, #WR, location, type --> price & size
price and size are dependent on #BR, #WR, location and type
multiple independent factors decide multiple dependent factor

- multivariate regression

Logistic Regression - classification using regression technique

create the model - create an object and set all parameters
fit the model using train set ==> tree
predict using the tree for the test instances

# 3. Finding m and b

## Calculation Table / 计算表格

| xᵢ      | yᵢ  | x̄    | xᵢ - x̄ | (xᵢ - x̄)² | ȳ     | yᵢ - ȳ | (yᵢ - ȳ)²   | (xᵢ - x̄)(yᵢ - ȳ) |
| ------- | --- | ---- | ------ | --------- | ----- | ------ | ----------- | ---------------- |
| 63      | 127 | 69.3 | -6.3   | 39.69     | 158.8 | -31.8  | 1011.24     | 200.34           |
| 64      | 121 | 69.3 | -5.3   | 28.09     | 158.8 | -37.8  | 1428.84     | 200.34           |
| 66      | 142 | 69.3 | -3.3   | 10.89     | 158.8 | -16.8  | 282.24      | 55.44            |
| 69      | 157 | 69.3 | -0.3   | 0.09      | 158.8 | -1.8   | 3.24        | 0.54             |
| 69      | 162 | 69.3 | -0.3   | 0.09      | 158.8 | 3.2    | 10.24       | -0.96            |
| 71      | 156 | 69.3 | 1.7    | 2.89      | 158.8 | -2.8   | 7.84        | -4.76            |
| 71      | 169 | 69.3 | 1.7    | 2.89      | 158.8 | 10.2   | 104.04      | 17.34            |
| 72      | 165 | 69.3 | 2.7    | 7.29      | 158.8 | 6.2    | 38.44       | 16.74            |
| 73      | 181 | 69.3 | 3.7    | 13.69     | 158.8 | 22.2   | 492.84      | 82.14            |
| 75      | 208 | 69.3 | 5.7    | 32.49     | 158.8 | 49.2   | 2420.64     | 280.44           |
| **Sum** |     |      |        | **138.1** |       |        | **5799.60** | **847.6**        |

**Key Values:**

- x̄ (mean of x) = 69.3
- ȳ (mean of y) = 158.8
- Σ(xᵢ - x̄)² = 138.1
- Σ(yᵢ - ȳ)² = 5799.60
- Σ(xᵢ - x̄)(yᵢ - ȳ) = 847.6

## Formulas / 公式

### Step 1: Calculate slope m (斜率)

```
m = Σ(xᵢ - x̄)(yᵢ - ȳ) / Σ(xᵢ - x̄)²
m = 847.6 / 138.1
m = 6.1375815
```

### Step 2: Calculate intercept b (截距)

```
b = ȳ - m × x̄
b = 158.8 - 6.1375815 × 69.3
b = -266.5344
```

### Final Equation / 最终方程

```
y = 6.1375815x - 266.5344
```

or

```
weight = 6.1375815 × height - 266.5344
```

y =mx + b
b = y - mx
= avg(y) - m \* avg(x)
= 158.8 - 6.1376 \* 69.3
= -266.5344

---

# 4. Multiple Regression / 多元回归

## Simple vs Multiple / 简单 vs 多元

- **Simple:** 1 个自变量 → `y = mx + b`（例如：身高 → 体重）
- **Multiple:** 多个自变量 → `y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b`

## Example: CPU.arff / 示例

```
class = 0.0491 × MYCT + 0.0152 × MMIN + 0.0056 × MMAX +
        0.6298 × CACH + 1.4599 × CHMAX - 56.075
```

**Weights / 权重：**

- 正权重：变量增加 → 结果增加
- 负权重：变量增加 → 结果减少
- 权重越大 → 影响越大（CHMAX 和 CACH 影响最大）
