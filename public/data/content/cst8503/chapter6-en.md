# Chapter 6: Prolog Negation and Cut

**Source**: CST8503 Course Material - Knowledge Representation and Reasoning

---

## 6.1 The Cut Operator

**Cut Operator**: The exclamation mark `!` in Prolog

**Important Reminder**:

- The cut is non-logical, so we avoid using it in this course
- But we need to know what it means
- When the cut (!) appears as a goal in the body of a predicate, it always succeeds
- It discards choice points

**Intuitive Meaning**: If the proof process reaches the cut in the body of a predicate, then commit to all choices made so far in processing that predicate.

**Source**: Cut Operator Explanation

---

## 6.2 Cut Examples (We Don't Use)

**Student Grade Conversion**:

```prolog
convert(X,'A+'):-X>=90,!.
convert(X,'A'):-X>=85,!.
convert(X,'A-'):-X>=80,!.
convert(X,'B+'):-X>=77,!.
convert(X,'B'):-X>=73,!.
convert(X,'B-'):-X>=70,!.
convert(X,'C+'):-X>=67,!.
convert(X,'C'):-X>=63,!.
convert(X,'C-'):-X>=60,!.
convert(X,'D+'):-X>=57,!.
convert(X,'D'):-X>=53,!.
convert(X,'D-'):-X>=50,!.
convert(X,'F').
```

**Problem**:

```prolog
?- convert(85,Grade).
Grade = 'A'.

?- convert(85,'C-').
true.  % This is wrong!
```

**Source**: Cut Examples

---

## 6.3 Scope of Cut

The cut discards choice points in R, Q, P, C. The cut does not discard choice points in B or A, because those choice points are outside the scope of the cut.

**Source**: Cut Scope Explanation

---

## 6.4 Negation

**Negation in Prolog Definition**:

```prolog
not(P) :- P, !, fail  % If P is true, commit to failure
       ;              % This line creates a choice point, which the cut discards
       true.          % P must be false, because the cut was not reached
```

This is called **negation as failure**. not can be written as a prefix operator: `\+ P`

**Source**: Negation Definition

---

## 6.5 Negation Examples

```prolog
likes(john, X) :- music(X), \+ heavy_metal(X).
```

John likes all music except heavy metal. This is more readable than the formulation with cut+fail.

**Source**: Negation Examples

---

## 6.6 Negation as Failure

**Not exactly equivalent to negation in logic**:

- Negation as failure makes the "Closed World Assumption"
- **Closed World Assumption (CWA)**: Everything that Prolog cannot derive from the program is assumed to be false

**SWI Prolog negation symbol**: `\+ P`

**Source**: Negation as Failure Explanation

---

## 6.7 Closed World Assumption Example

Consider this one-line program:

```prolog
round(sun).
```

**How Prolog's answers should be understood**:

```prolog
?- round(sun).
true    % True, round(sun) is derived from program logic

?- round(earth).
false   % False means: I don't know, cannot derive from the program

?- \+ round(earth).
true    % It is derived from the program, but only under CWA
```

**Source**: Closed World Assumption Example

---

## 6.8 Problems with Negation

**Example Program**:

```prolog
person(jack).
person(judy).
person(jeff).

male(jack).
male(jeff).

female(X) :- \+ male(X).
```

**Unexpected Results**:

```prolog
?- male(jack).
true.

?- female(judy).
true.

?- male(X).
X = jack ;
X = jeff.

?- female(X).
false.  % No one is female?

?- female(judy).
true.   % judy is female but no one is female?
```

**Source**: Problems with Negation Examples

---

## 6.9 Negation is Non-Logical

**Negation gives wrong answers when involving terms with unbound variables**:

- Terms with no unbound variables are called "ground terms"
- The order of negation matters: delay negation as much as possible to increase the chance that all variables are bound

```prolog
?- \+ X = a.
false.

?- \+ X = a, X = b.
false.

?- X = b, \+ X = a.
X = b.
```

**Source**: Negation is Non-Logical

---

## 6.10 Three Cases Where Order Matters

1. **Recursion and Infinite Loops**:

```prolog
ancestor(X,Z) :- parent(X,Y), ancestor(Y,Z).
% Recursion after Y is bound by parent(X,Y)
```

2. **Arithmetic**:

```prolog
X = 4, Y is X * 3.
% Arithmetic after X is bound by X = 4
```

3. **Negation**:

```prolog
X = b, \+ X = a.
% Negation after X is bound by X = b
```

**Source**: Cases Where Order Matters
