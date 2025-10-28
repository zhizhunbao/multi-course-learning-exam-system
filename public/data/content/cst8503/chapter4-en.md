# Chapter 4: Prolog Structures and Matching

**Source**: CST8503 Course Material - Knowledge Representation and Reasoning

---

## 4.1 Prolog Syntax

**Data Objects**:

```
data objects
├── simple objects
│   ├── constants
│   │   ├── atoms
│   │   └── numbers
│   └── variables
└── structures
```

**Source**: Prolog Syntax Structure

---

## 4.2 Atom Syntax (3 Forms)

**(1) String of letters, digits, and "\_" starting with a lowercase letter**:

```
x, x15, x_15, aBC_CBa7, alpha_beta_algorithm, taxi_35, peter, missJones, miss_Jones2
```

**(2) Special character strings**:

```
--->, <==>, <<, .., .::., ::=, [], ., <, >, +, ++, !
```

**(3) String in single quotes**:

```
'X_35', 'Peter', 'The Beatles'
```

**Source**: Prolog Atom Syntax

---

## 4.3 Number Syntax

**Integers**: `1, 1313, 0, -55`

**Real Numbers (floating point)**: `3.14, -0.0045, 1.34E-21`

**Source**: Prolog Number Syntax

---

## 4.4 Variable Syntax

String of letters, digits, and underscores starting with a capital letter or underscore:

```
X, Results, Object2B, Participant_list, _x35, _335
```

**Anonymous Variable**: Single underscore `_`

**Variable Scope**: Lexical scope of a variable name is one clause.

**Source**: Prolog Variable Syntax

---

## 4.5 Structures

Structures are objects with multiple components.

**Example**: A date is a structured object with three components

```prolog
date(17, june, 2006)
```

**Functor**: The functor name is chosen by the user, the syntax is an atom.

**Tree Representation**:

```
date(17, june, 2006)
    |
    date
   /  |  \
  17 june 2006
```

**Source**: Prolog Structure Syntax

---

## 4.6 Geometric Object Example

```prolog
P1 = point(1, 1)
P2 = point(2, 3)
S = seg(P1, P2) = seg(point(1,1), point(2,3))
T = triangle(point(4,2), point(5,4), point(7,1))
```

**Arithmetic Expression as Structure**:

```prolog
(a + b) * (c - 5)
*(+(a, b), -(c, 5))
```

**Source**: Structure Example

---

## 4.7 Matching

Matching is an operation on terms (structures). Given two terms, they match if they are identical or if we can make them identical by correctly instantiating variables in both terms.

**Matching Example**:

```prolog
date(D1, M1, 2006) = date(D2, june, Y2)
```

This results in variables being instantiated as:

```
D1 = D2
M1 = june
Y2 = 2006
```

**Matching Algorithm**:

1. If S and T are constants, they match only if they are identical
2. If S is a variable, matching succeeds, S is instantiated to T
3. If T is a variable, matching succeeds, T is instantiated to S
4. If S and T are structures, they match only if:
   - They both have the same principal functor
   - All their corresponding arguments match

**Source**: Matching Algorithm

---

## 4.8 Matching vs Unification

**Unification** = Matching + Occur Check

**Occur Check**: Does one side appear inside the other?

Unification is the same as matching, except that unification fails if one side appears inside the other.

```prolog
?- X = f(X).  % Matching succeeds, unification fails
```

**Source**: Matching vs Unification Difference

---

## 4.9 Representing Two Things are Different

**Two Possibilities**:

1. **Negation operator \+** (problematic):

```prolog
\+ X = Y  % Always fails unless X and Y are both instantiated
\+ X = 4  % Always fails unless X is instantiated to something other than 4
```

2. **Built-in predicate dif/2** (better):

```prolog
dif(X,Y)  % Delays comparison until X and Y are both instantiated
```

**Source**: Methods to Represent Differences

---

## 4.10 Computing with Matching

```prolog
% Definition of vertical and horizontal segments
vertical(seg(point(X1,Y1), point(X1, Y2))).
horizontal(seg(point(X1,Y1), point(X2, Y1))).

?- vertical(seg(point(1,1), point(1, 3))).
yes

?- vertical(seg(point(1,1), point(2, Y))).
no

?- vertical(seg(point(2,3), P)).
P = point(2, _173).
```

**Source**: Computing with Matching
