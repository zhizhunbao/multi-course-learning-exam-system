# Chapter 2: Prolog Basics

**Source**: CST8503 Course Material - Knowledge Representation and Reasoning

---

## 2.1 Prolog Basics

**Prolog** stands for PROgramming in LOGic.

**Important Reminder**:

- Do not try to compare Prolog programming with the programming you know
- No loops, no if statements, no variables of the kind you are used to
- Do not try to translate from Python to Prolog or vice versa

**Prolog = Declarative Programming**:

1. Declare facts and rules (the Prolog program) |: prompt, or type in a file
2. Run the Prolog interpreter and load the program
3. Issue queries (run the program) ?- prompt
4. Prolog will find a set of variable bindings that make the query true, or declare "no" if the query is not true

**Source**: Prolog Basics Introduction

---

## 2.2 Two Contexts

**Context 1: Writing Prolog Programs**

- Type Prolog code in a file
- Prompt is |:
- You are making true statements

**Context 2: Running Prolog Programs**

- Type Prolog queries in the Prolog interpreter
- Prompt is ?-
- You are asking questions

```prolog
% Context 1: Writing the program
parent(jim,todd).

% Context 2: Running the program
?- parent(jim,todd).
?- parent(jim,X).
```

**Source**: Prolog Two Contexts Explanation

---

## 2.3 Prolog Programs

A Prolog program is a set of statements called clauses that are facts and rules.

**Workflow**:

1. **Modeling**: Imagine the world you want to represent, and what is true about that world
2. **Programming**: Write down all relevant true facts and rules about that world
3. **Start prolog interpreter and consult the program file**
4. **Run the program**: Issue queries (questions) to the Prolog interpreter and receive answers

**Source**: Prolog Program Workflow

---

## 2.4 Loading Programs: consult

```prolog
?- consult(myfile).
?- consult('myfile.pl').
?- consult('/path/to/the/file/myfile.pl').

% List notation
?- [myfile].
?- ['myfile.pl'].
?- [file1, file2, 'file3.1'].
```

**Special filename "user"**:

```prolog
?- [user].
|: abc.
|: like(zzz).
|: ^D
% user://1 compiled 0.00 sec, 2 clauses
true.
```

**Source**: Prolog Loading Program Commands

---

## 2.5 Example: Family Relationships

Consider the following family tree:

```
Jack    Jill
  \      /
   Joan
    |
   Bob
```

**Prolog Program**:

```prolog
% parent(X,Y) means X is a parent of Y
parent(jack, joan).
parent(jill, joan).
parent(bill, bob).
parent(joan, bob).
parent(joan, gary).
parent(gary, kim).
parent(ann, kim).
```

**Source**: Family Relationship Example

---

## 2.6 Predicates and Constants

We defined a 2-place predicate parent (2 arguments). We use the notation parent/2 to indicate the 2-place parent predicate.

**General Form**: predicate(term₁, term₂, ..., termₖ)

**Source**: Prolog Predicate Syntax

---

## 2.7 Closed World Assumption

Prolog operates according to the Closed World Assumption: only what we state and what we state logically entails is true.

In our family relationship program, there are only 7 people: in the closed world, no other people exist.

**Source**: Closed World Assumption (CWA)

---

## 2.8 Prolog Queries and Variable Bindings

Variables begin with capital letters, or a single underscore is an anonymous variable.

```prolog
?- parent(P,joan).
P=jack ;
P=jill
```

**Anonymous Variable**:

```prolog
?- parent(X,_).  % Who has children
X = jack

?- parent(X,Y).  % Who has children, and which child?
X = jack
Y = joan
```

**Source**: Prolog Query and Variable Example

---

## 2.9 Prolog Rules

**Ancestor Relationship Rules**:

- If person X is a parent of person Y, then person X is an ancestor of person Y
- If person X is a parent of person Y, and person Y is an ancestor of person Z, then person X is an ancestor of person Z

**Prolog Form**:

```prolog
ancestor(X,Y) :- parent(X,Y).
ancestor(X,Z) :- parent(X,Y), ancestor(Y,Z).
```

**Rule Syntax**:

- Rules like "if P then Q" are written in Prolog the opposite way: `Q :- P`
- We read "Q if P", meaning when we try to prove Q is true, we can succeed by proving P is true
- Comma "," in Prolog means "and"
- Variable scope is a single clause

**Source**: Prolog Rule Syntax
