# Chapter 5: Prolog Lists, Operators, and Arithmetic

**Source**: CST8503 Course Material - Knowledge Representation and Reasoning

---

## 5.1 Prolog Predicate Argument Types

**Argument Mode Indicators**:

- `?` argument: Either supplies input, or accepts output, or is used for both input and output
- Example: `member(?Elem, ?List)`: True if Elem is a member of List

```prolog
?- member(X,[a,b,c]).  % First argument is output, second is input
```

**Source**: Predicate Argument Types

---

## 5.2 Directives

**Dynamic Directive**:

```prolog
:- dynamic predicate/arity.
```

Tells the interpreter that definition of the predicate may change during execution (using assert/1 and/or retract/1).

**Multifile Directive**:

```prolog
:- multifile predicate/arity.
```

Tells the system that the specified predicate may be defined in multiple files.

**Discontiguous Directive**:

```prolog
:- discontiguous predicate/arity.
```

Tells the system that clauses of the predicate may not be together in the source file.

**Source**: Prolog Directive Explanations

---

## 5.3 Prolog Lists

**List Notation Examples**:

```prolog
[a, b, c, d]
[]
[ann, tennis, tom, running]
[link(a,b), link(a,c), link(b,d)]
[a, [b,c], d, [], [a,a,a], f(X,Y)]
```

**Head and Tail**:

```prolog
L = [a, b, c, d]
a is the head of L
[b, c, d] is the tail of L
```

**Bar Notation**:

```prolog
L = [Head | Tail]
L = [a, b, c] = [a | [b, c]] = [a, b | [c]] = [a, b, c | []]
```

**Source**: Prolog List Syntax

---

## 5.4 List Notation is Syntactic Sugar

**List Notation**: `[Head | Tail]`

**Equivalent Standard Prolog Notation**: `'[|]'(Head, Tail)`

**Equivalent Terms**:

```prolog
[a, b, c] = '[|]'(a, '[|]'(b, '[|]'(c, [])))
```

**Source**: List Syntactic Sugar

---

## 5.5 List Membership

```prolog
% member(X, L) means X is a member of list L
member(X, [X | _]).        % X appears as the head of the list
member(X, [_ | L]) :- member(X, L).  % X is in the tail of the list
```

**Source**: List Membership Predicate

---

## 5.6 List Concatenation

```prolog
% conc(L1, L2, L3) means L3 is the concatenation of L1 and L2
conc([], L, L).                    % Base case
conc([X | L1], L2, [X | L3]) :-   % Recursive case
    conc(L1, L2, L3).
```

**Use of Concatenation**:

```prolog
?- conc([a,b,c], [1,2,3], L).
L = [a,b,c,1,2,3]

?- conc([a,[b,c],d], [a,[],b], L).
L = [a, [b,c], d, a, [], b]
```

**Source**: List Concatenation Predicate

---

## 5.7 List Deletion

```prolog
% del(X, L, NewL) means NewL is the list obtained by deleting the first X from list L
del(X, [X | Tail], Tail).
del(X, [Y | Tail], [Y | Tail1]) :-
    del(X, Tail, Tail1).
```

**Source**: List Deletion Predicate

---

## 5.8 List Insertion

```prolog
% insert(X, L, NewL) means NewL is the list obtained by inserting X at any position in list L
insert(X, L, [X | L]).              % Insert X as head
insert(X, [Y | L], [Y | NewL]) :-   % Insert X in tail
    insert(X, L, NewL).
```

**Source**: List Insertion Predicate

---

## 5.9 Sublist of a List

```prolog
% sublist(List, Sublist) means Sublist appears as a sublist in List
sublist(S, L) :-
    conc(L1, L2, L),
    conc(S, L3, L2).
```

**Source**: Sublist Predicate

---

## 5.10 Operator Notation

Operator notation is only a superficial syntactic improvement.

**Equivalent Notation for Arithmetic Expressions**:

```prolog
+(*(2,a), *(b,c)) = 2*a + b*c
```

**User-Defined Operators**:

```prolog
:- op(600, xfx, has).
:- op(600, xfx, supports).

peter has information.
floor supports table.
```

**Operator Types**:

- **Infix operators**: xfx, xfy, yfx
- **Prefix operators**: fx, fy
- **Postfix operators**: xf, yf

**Source**: Prolog Operator Syntax

---

## 5.11 Arithmetic Operations

**Using is for Arithmetic Calculation**:

```prolog
?- X = 1+2.
X = 1 + 2  % Prolog keeps the expression uncalculated

?- X is 1 + 2.
X = 3      % "is" forces calculation
```

**Arithmetic Operators**:

- `+, -, *, /, **`: Addition, subtraction, multiplication, division, exponentiation
- `//, mod`: Integer operations
- `sin, cos, log, ...`: Standard functions

**Examples**:

```prolog
?- X is 2 + sin(3.14/2).
X = 2.9999996829318345

?- A is 11/3.
A = 3.6666666666666665

?- B is 11//3.
B = 3

?- C is 11 mod 3.
C = 2
```

**Source**: Prolog Arithmetic Operations

---

## 5.12 Comparison Predicates

```prolog
X > Y      % X is greater than Y
X < Y      % X is less than Y
X >= Y     % X is greater than or equal to Y
X =< Y     % X is less than or equal to Y
X =:= Y    % X and Y are equal numerically
X =\= Y    % X and Y are not equal numerically
```

**Examples**:

```prolog
?- 315 * 3 >= 250*4.
yes

?- 2+5 = 5+2.
no

?- 2+5 =:= 5+2.
yes
```

**Source**: Prolog Comparison Predicates

---

## 5.13 List Length

```prolog
% length(L, N): N is the length of list L
length([], 0).
length([_ | L], N) :-
    length(L, N0),
    N is N0 + 1.
```

**Source**: List Length Predicate
