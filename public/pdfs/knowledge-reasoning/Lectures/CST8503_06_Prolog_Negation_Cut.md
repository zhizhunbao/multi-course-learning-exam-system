# CST8503 06 Prolog Negation Cut
_从 PDF 文档转换生成_

---
_注: 共提取了 1 张图片_

## 第 1 页

![图片](./CST8503_06_Prolog_Negation_Cut_images/page_001_img_01.png)

Prolog Cut and Negation

---

## 第 2 页

Lesson Overview (Agenda)
In the following lesson, we will explore:
### Prolog cut operator
### Prolog Negation

---

## 第 3 页

Cut operator
- The cut operator in Prolog is the exclamation point: !
- Cut is non-logical, so in this course we avoid using it, but…
- We do need to know what it means
- When cut (!) appears as a goal in the body of a predicate
it is always true,
- it discards choice points (see scope of cut slide below)
- • Intuitively cut means "if the proof process gets to a cut in a predicate
body, then commit to all choices made so far while working on that
predicate"

---

## 第 4 页

Example of cut (we would not use it).
### Student Grades
Numeric Grade Letter Grade
### A+
### A
### A-
### B+
### B
### B-
### C+
### C
### C-
### D+
### D
### D-
### F

| Numeric Grade | Letter Grade |
| --- | --- |
| 90 | A+ |
| 85 | A |
| 80 | A- |
| 77 | B+ |
| 73 | B |
| 70 | B- |
| 67 | C+ |
| 63 | C |
| 60 | C- |
| 57 | D+ |
| 53 | D |
| 50 | D- |
| 0 | F |

---

## 第 5 页

Prolog: Convert Number Grade to Letter
### Code Numeri Letter
c Grade Grade

```prolog
convert(X,'A+'):-X>=90,!. 90 A+
convert(X,'A'):-X>=85,!. 85 A
convert(X,'A-'):-X>=80,!. 80 A-
convert(X,'B+'):-X>=77,!. 77 B+
convert(X,'B'):-X>=73,!. 73 B
convert(X,'B-'):-X>=70,!. 70 B-
convert(X,'C+'):-X>=67,!. 67 C+
convert(X,'C'):-X>=63,!. 63 C
convert(X,'C-'):-X>=60,!. 60 C-
convert(X,'D+'):-X>=57,!. 57 D+
convert(X,'D'):-X>=53,!. 53 D
convert(X,'D-'):-X>=50,!. 50 D-
convert(X,'F'). 0 F
```

| Code | Numeri
c Grade | Letter
Grade |
| --- | --- | --- |
| convert(X,'A+'):-X>=90,!. | 90 | A+ |
| convert(X,'A'):-X>=85,!. | 85 | A |
| convert(X,'A-'):-X>=80,!. | 80 | A- |
| convert(X,'B+'):-X>=77,!. | 77 | B+ |
| convert(X,'B'):-X>=73,!. | 73 | B |
| convert(X,'B-'):-X>=70,!. | 70 | B- |
| convert(X,'C+'):-X>=67,!. | 67 | C+ |
| convert(X,'C'):-X>=63,!. | 63 | C |
| convert(X,'C-'):-X>=60,!. | 60 | C- |
| convert(X,'D+'):-X>=57,!. | 57 | D+ |
| convert(X,'D'):-X>=53,!. | 53 | D |
| convert(X,'D-'):-X>=50,!. | 50 | D- |
| convert(X,'F'). | 0 | F |

---

## 第 6 页

Seems to work? (no, not good)
Grade = 'A'.

```prolog
?- convert(85,Grade).
?- convert(85,'C-').
true.
```

---

## 第 7 页

- Cut can result in wrong answers because it is non-logical
- We stay as purely logical as we can, so we avoid cut
- Bad code can be inefficient compared to good code, so we need to make
sure we write good code, but we don't use cut to increase efficiency in this
course

---

## 第 8 页

### THE SCOPE OF CUT
- This cut discards choice points in R, Q, P, C
- The two rules for C are a choice point when
C :- P, Q, R, !, S, T, U.
trying to prove C, for example.
C :- V.
- The cut does not discard choice points in B
A :- B, C, D.
or A because those choice points are out of
?- A. the scope of the cut: scope shown in RED
A
### B C D
### P, Q, R, !, S, T, U V
The cut is not “visible” from A(cut is nested too deep from point of view of A)

---

## 第 9 页

### Negation
- In Prolog, negation is defined as:
P, !, fail % if P is true, then commit to fail
; % this line makes a choice point that would be discarded by the cut
true. % P must be false because the cut wasn't reached
% so not(P) is true
- This is called negation as failure
- not can be written as a prefix operator: \+ P

```prolog
not( P) :-
```

---

## 第 10 页

### Negation Example

```prolog
likes(john, X) :-
music(X),
\+ heavy_metal(X).
- John likes all music except heavy_metal
- This is more readable than the formulation with cut + fail
```

---

## 第 11 页

Negation as Failure
- Not exactly the same as negation in logic (mathematics)
- Negation as failure makes the “closed world assumption”
- Standard abbreviation: CWA = Closed World Assumption
- The CWA is: Everything that Prolog cannot derive from the
program is assumed to be false
- SWI Prolog notation for not P is:
### \+ P

---

## 第 12 页

### Closed World Assumption
- What does yes/no mean under CWA? Consider this single line program:

```prolog
round(sun).
- How should Prolog’s answers be understood in the following?
?- round(sun).
true % true, round(sun) logically follows from program
?- round(earth).
false % false means: I don’t know, can’t be derived from program
?- \+ round(earth).
true % It follows from the program, but only under CWA
```

---

## 第 13 页

Problems with Negation
- Negation as failure is defined through non-logical cut, so we can expect some
difficulties. Consider this example:
% person(X) means that X is a person

```prolog
person(jack).
person(judy).
person(jeff).
% male(X) means that X is male
male(jack).
male(jeff).
% female(X) means that X is female
female(X):-
\+ male(X).
```

---

## 第 14 页

Unexpected results due to negation

```prolog
?- male(jack).
true.
?- female(judy).
true.
?- male(X).
X = jack ;
X = jeff.
?- female(X).
false. % nobody is female
?- female(judy).
true. % judy is female but nobody is female?
?-
```

---

## 第 15 页

Negation is non-logical
- Negation gives incorrect answers when the negated term involves unbound variables
- A term with no unbound variables is called a "gound term"
- Order matters with negation: delay negation as much as possible to increase chances
all variables will be bound
?- \+ X = a.
false.
?- \+ X = a, X = b.
false.
?- X = b, \+ X =a.
X = b.
?-

---

## 第 16 页

When does order matter due to unbound variables?
- Each of these is a problem if we change the order:
### Recursion and infinite loops
X = 4, Y is X * 3. % arithmetic after X is bound by X = 4
### Negation
X = b, \+ X = a. % negation after X is bound by X = b

```prolog
ancestor(X,Z):-
parent(X,Y),
ancestor(Y,Z). % recursion after Y is bound by parent(X,Y)
1. Arithmetic
```

---

## 第 17 页

### Conclusion
In this lesson, you learned about Prolog negation, and the cut operator.
In the next lesson, you will learn to use knowledge representation when developing
Prolog programs.

---

