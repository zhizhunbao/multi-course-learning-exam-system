# CST 8503 - Fall 2025 - Midterm Exam

## 20% - Todd Kelley

### 25 Multiple Choice Questions - 1 Minute Per Question

**PRINT Name:** Wang Peng
**Test Version:** 202
**One-Answer Multiple Choice:** 25 Questions - 10 of 20%

**Instructions:**

- Fill in the bubbles for your Name and Answers with pencil only, no pen.
- Manage your time. Answer questions you know, first. One Answer per question.

---

## Multiple Choice Questions (1-25)

### Question 1

**What is the result of the following Prolog query? X is Y + 4, Y = 4.**

a. X=8
b. Variable instantiation error. ✓
c. X=4, Y=4
d. X=8, Y=4
e. None of these answers.

---

### Question 2

**Which of the following queries will turn on tracing during a Prolog session?**

a. noguitracer.
b. None of these answers.
c. trace. ✓
d. guitracer.
e. notrace.

---

### Question 3

**Which of the following statements about the cut (!) goal in Prolog is true?**

a. We avoid it in this course if possible because we try for purely logical Prolog
b. None of these answers.
c. It can increase efficiency by reducing unnecessary backtracking.
d. All of these answers. ✓
e. In some situations it changes the logical meaning of a program.

---

### Question 4

**What variable bindings would result from the following Prolog Query? [H|T] = [a,b,c].**

a. H = a, T = [b,c] ✓
b. H=[], T=[a,b,c]
c. H= [a,b,c), T= []
d. H=[a], T= [b,c]
e. None of these answers.

---

### Question 5

**What is declarative programming?**

a. A programming paradigm where a solution is achieved when message passing between objects stabilizes.
b. All of these answers.
c. None of these answers.
d. A programming paradigm where the programmer describes the solution rather than the steps required to produce the solution. ✓
e. A programming paradigm where the programmer declares ordered operations for building a solution.

---

### Question 6

**What would be the result of the following query in Prolog? X = [x], \+ x = [x, y, z].**

a. None of these answers.
b. Variable instantiation error.
c. X = [x] ✓
d. X = [x, y, z]
e. false

---

### Question 7

**Which of the following is a variable in Prolog?**

a. All of these answers.
b. var x
c. 'X'
d. x
e. A ✓

---

### Question 8

**In Prolog, what is the difference between [a] and [h|[]]?**

a. [h|[]] is a syntax error and [a] is a list.
b. None of these answers.
c. Each is a one-element list with a different element. ✓
d. [a] has one element and [h|[]] has two elements.
e. There is no difference, as they both mean [a]

---

### Question 9

**What is a functor in Prolog?**

a. The head of a clause that includes the :- symbol.
b. All of these answers.
c. None of these answers.
d. Any one of the arguments of a structure.
e. The name (an atom) at the beginning of a structure, together with its arity. ✓

---

### Question 10

**Which of the following statements is true about the anonymous variable in Prolog?**

a. All of these answers. ✓
b. None of these answers.
c. It is written as a single underscore, \_.
d. When a variable appears only once in a clause, it can be replaced by the anonymous variable to avoid the singleton variable warning.
e. When it occurs more than once in a clause, it can match different things.

---

### Question 11

**Which of the following statements about negation in Prolog is true, given some goal G?**

a. \+ G is safest if any variables within G are already instantiated. ✓
b. \+ G is safest if none of the variables within G are instantiated.
c. None of these answers.
d. \+ G will always fail if G contains uninstantiated variables.
e. \+ G will always succeed if G contains uninstantiated variables.

---

### Question 12

**What is the result of the following Prolog query? X is 7 + 2.**

a. X='7+2'
b. X=7+2
c. None of these answers.
d. X = '9'
e. X=9 ✓

---

### Question 13

**What is the result of the following Prolog query? X = 1 + 5.**

a. X=1+5 ✓
b. X='1+5'
c. None of these answers.
d. X='6'
e. X=6

---

### Question 14

**What is a structure generally in Prolog?**

a. Only the body of a clause that includes the :- symbol.
b. Only any clause that includes the :- symbol.
c. All of these answers.
d. None of these answers.
e. An object that has several components, namely, a functor and arguments. ✓

---

### Question 15

**What is the Closed World Assumption (CWA) in Prolog?**

a. All of these answers.
b. The assumption that the results of a specific query cannot change during a Prolog session.
c. The assumption that if something cannot be proven to be true, then it is false. ✓
d. The assumption that no new clauses will be added to a Prolog program while it is running.
e. None of these answers.

---

### Question 16

**What is the meaning of P :- Q, R. in a Prolog program?**

a. None of these answers.
b. P is true if Q and R are true.
c. If Q and R, then P.
d. All of these answers. ✓
e. From Q and R follows P.

---

### Question 17

**How would we write if X is a student, then X is a person as a Prolog rule?**

a. isa(X,student) :- isa(X,person).
b. person(X) :- student(X). ✓
c. student(X) :- person(X).
d. X isa student :- X isa person.
e. student(X) :- X, person(X).

---

### Question 18

**What is the meaning of Q :- P. in a Prolog program?**

a. Q is true if P is true.
b. None of these answers. ✓
c. Q implies P.
d. If Q then P.
e. All of these answers.

---

### Question 19

**What is the difference between matching and unification?**

a. matching a variable with a structure involves checking to ensure the variable does not occur within the structure.
b. All of these answers.
c. None of these answers.
d. unification results in variable bindings, whereas matching results in variable values. ✓
e. There is no difference.

---

### Question 20

**What would be the result of the following query in Prolog? \+ X = [X, Y, Z].**

a. Variable instantiation error.
b. true
c. None of these answers.
d. false ✓
e. X = []

---

### Question 21

**Which of the following terms is a Prolog atom?**

a. None of these answers.
b. B
c. C.
d. var ✓
e. 3

---

### Question 22

**What would be the result of the following Prolog query? a _ b = _(a,b).**

a. a=a, b=b
b. None of these answers.
c. true
d. false
e. Syntax error ✓

---

### Question 23

**Which statement about the consult predicate in Prolog is true?**

a. All of these answers.
b. [file]. is an abbreviation for ['file.pl'].
c. When consulting, the special file user indicates the Prolog source code should be read from the user at the terminal.
d. [file]. is an abbreviation for consult(file).
e. It reads Prolog source code from a file. ✓

---

### Question 24

**What is the arity of a Prolog predicate?**

a. None of these answers.
b. The number of arguments the predicate takes. ✓
c. The number of clauses used to define the predicate.
d. The number of variables used to define the predicate.
e. The number of answers the predicate can produce when queried.

---

### Question 25

**What is meant by arity in Prolog?**

a. None of these answers.
b. All of these answers.
c. The number of answers that a query can produce.
d. The number of clauses that define a single predicate.
e. An integer associated with a functor or predicate, indicating its number of arguments. ✓

---

## Programming Questions (Handwritten Solutions)

### Question 1: has_element(List,X)

**Without using any built-in predicate(s), write a Prolog predicate `has_element(List,X)` that is true whenever list `List` has element `X`. (6 marks)**

**Solution:**

```prolog
has_element([H|_], X) :- X = H.
has_element([_|T], X) :- has_element(T, X).
```

**Alternative base case:**

```prolog
has_element([X|_], X).
has_element([_|T], X) :- has_element(T, X).
```

---

### Question 2: mylist(List)

**Without using any built-in predicate(s), write a Prolog predicate `mylist(List)` that is true whenever its single argument `List` is a list. (5 marks)**

**Solution:**

```prolog
mylist([]).
mylist([H|T]) :- mylist(T).
```

---

### Question 3: Correcting mylength Predicate

**The following Prolog predicate mylength(List, Length) about the length of a list has errors/bugs. Re-write the procedure to correct the errors/bugs. (6 marks)**

**Original (Incorrect) Code:**

```prolog
mylength([],1).
mylength([_tail], Length):-
    Length = Length - 1,
    mylength(tail, Length).
```

**Corrected Code:**

```prolog
mylength([], 0).
mylength([H|T], N) :-
    mylength(T, NO),
    N is NO + 1.
```

**Errors corrected:**

1. Base case: Empty list should have length 0, not 1
2. Recursive case: Should use `[H|T]` pattern instead of `[_tail]`
3. Should use `is` for arithmetic instead of `=`
4. Should increment length (NO + 1) instead of decrementing
5. Should call `mylength(T, NO)` with tail `T`, not `tail`

---

### Question 4: reachable Predicate

**Consider a world consisting of a set of islands that are connected by bridges. Two islands are connected if there is a bridge between them. Write a Prolog predicate reachable(Island1,Island2) which means that a person on island Island1 could walk over one or more bridges to reach island Island2. Assume there is an existing correctly-written Prolog predicate you can use (without writing it), bridge(Island1,Island2), which is true when island Island1 is connected to Island2 by a bridge. (8 marks)**

**Solution:**

```prolog
% Direct reachability (one bridge)
reachable(I1, I2) :-
    bridge(I1, I2).

% Indirect reachability (multiple bridges)
reachable(I1, I3) :-
    bridge(I1, I2),
    reachable(I2, I3).
```

**Explanation:**

- First clause: Direct reachability via a single bridge
- Second clause: Indirect reachability through intermediate islands (recursive)

---

## Answer Key Summary

**Multiple Choice Answers:**

1. b, 2. c, 3. d, 4. a, 5. d, 6. c, 7. e, 8. c, 9. e, 10. a, 11. a, 12. e, 13. a, 14. e, 15. c, 16. d, 17. b, 18. b, 19. d, 20. d, 21. d, 22. e, 23. e, 24. b, 25. e

---

_Scanned with CamScanner_
