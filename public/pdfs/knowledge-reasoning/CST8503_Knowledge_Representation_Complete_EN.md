# CST8503 Knowledge Representation and Reasoning - Complete Course Materials

_Converted and compiled from PDF documents_

---

## 📚 Table of Contents

- [Chapter 1: Introduction to Knowledge Representation](#chapter-1-introduction-to-knowledge-representation)
- [Chapter 2: Prolog Fundamentals](#chapter-2-prolog-fundamentals)
- [Chapter 3: Prolog Debugging](#chapter-3-prolog-debugging)
- [Chapter 4: Prolog Structures and Matching](#chapter-4-prolog-structures-and-matching)
- [Chapter 5: Prolog Lists, Operators and Arithmetic](#chapter-5-prolog-lists-operators-and-arithmetic)
- [Chapter 6: Prolog Negation and Cut](#chapter-6-prolog-negation-and-cut)
- [Chapter 7: Midterm Review](#chapter-7-midterm-review)

---

## Chapter 1: Introduction to Knowledge Representation

### Course Information

- **Course Code**: CST8503: K&R and Reasoning
- **Professor**: Todd Kelley
- **Office**: T315
- **Phone**: 613-727-4723 x7474
- **Email**: kelleyt@algonquincollege.com

### Course Schedule

- **Lecture**: Thursday 2-4pm (A1120)
- **Lab 301**: Thursday 11:30am-1:30pm (J210)
- **Lab 302**: Tuesday 5:00-7:00pm (B220)
- **Asynchronous Activities**: Average 1 hour per week

### 1.1 Knowledge Representation vs Machine Learning vs Artificial Intelligence

#### Artificial Intelligence

Artificial Intelligence software is a category of software solutions for solving problems that are typically considered to need or benefit from intelligence.

**Turing Test**:

- Under certain conditions, if a software system makes you believe it has intelligence, then that software system has passed the intelligence Turing Test
- Passing the Turing Test is considered to require intelligence, because even if intelligence is fake, successfully faking intelligence requires intelligence

#### Machine Learning vs Knowledge Representation

**Machine Learning** focuses on finding patterns in data:

- **Supervised Learning**: Uses labeled datasets containing explicit examples to train the system on what patterns to look for
- **Unsupervised Learning**: The system uses algorithms to find patterns in the data, but without explicit examples of what to look for
- **Reinforcement Learning**: An agent-based paradigm where agents repeatedly choose actions based on policies in states to obtain rewards

**Knowledge Representation** focuses on declarative forms of knowledge suited for processing by specialized reasoning engines:

- Declarative knowledge: facts and rules (knowledge) written in a language
- Patterns (knowledge) are provided directly to the system as facts and rules
- The system (interpreter) knows how to use patterns without needing to learn them

### 1.2 Declarative Knowledge

#### Design Considerations for Knowledge Representation Languages

Need to be able to represent:

- States of the world
- Actions that can occur
- The results of actions in terms of changing the world state

#### Declarative vs Procedural

**Declarative program** (a set of facts/rules):

- A solution is a cup of hot brown water that tastes like coffee
- Boiling water in a kettle produces hot water
- Adding a spoonful of instant coffee to hot water produces brown water that tastes like coffee
- Pouring boiling water into a cup produces a cup of hot water

**Procedural solution**:

1. Take a cup from the cupboard and place it on the counter
2. Fill the kettle with water
3. Plug in the kettle
4. Put a spoonful of instant coffee into the cup on the counter
5. Wait for the kettle to boil
6. Pour water from the kettle into the cup

### 1.3 Declarative Programming

Declarative knowledge has a procedural interpretation. If we combine declarative knowledge with a correctly implemented system with a theoretical foundation (such as a theorem prover like Prolog), we can treat declarative knowledge as a program.

We run the program by issuing queries to the theorem prover (in our case, Prolog). Prolog uses declarative knowledge (the prolog program) to derive through inference conditions under which the query is true (variable bindings).

### 1.4 Facts and Rules Programming

```prolog
% Rules for ancestor relationship
forall X, Y Parent(X,Y) -> Ancestor(X,Y).
forall X,Y Parent(X,Y) and Ancestor(Y,Z) -> Ancestor(X,Z).

% Facts
Parent(john,joe).
Parent(joe,bill).
Parent(bill,jill).
Ancestor(joe,sally).
```

---

## Chapter 2: Prolog Fundamentals

### 2.1 Prolog Basics

The name **Prolog** comes from PROgramming in LOGic.

**Important reminders**:

- Don't try to compare Prolog programming with programming you already know
- No loops, no if statements, no variables of the sort you're used to
- Don't try to translate from Python to Prolog or vice versa

**Prolog = Declarative Programming**:

1. Declare facts and rules (prolog program) |: prompt, or input in file
2. Run prolog interpreter and load the program
3. Issue queries (run the program) ?- prompt
4. Prolog will find a set of variable bindings that make the query true, or declare "no" if the query is not true

### 2.2 Two Contexts

**Context 1: Writing Prolog Programs**

- Input Prolog code in files
- Prompt is |:
- You are making true statements

**Context 2: Running Prolog Programs**

- Input Prolog queries in the Prolog interpreter
- Prompt is ?-
- You are asking questions

```prolog
% Context 1: Writing program
parent(jim,todd).

% Context 2: Running program
?- parent(jim,todd).
?- parent(jim,X).
```

### 2.3 Prolog Programs

A Prolog program is a set of statements called clauses, which are facts and rules.

**Workflow**:

1. **Modeling**: Imagine the world you want to represent, and what's true about that world
2. **Programming**: Write down all relevant true facts and rules about that world
3. **Start prolog interpreter and consult the program file**
4. **Run the program**: Issue queries (questions) to the Prolog interpreter and receive answers

### 2.4 Loading Programs: consult

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

### 2.5 Example: Family Relationships

Consider the following family tree:

```
Jack    Jill
  \      /
   Joan
    |
   Bob
```

**Prolog program**:

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

### 2.6 Predicates and Constants

We defined a 2-ary predicate parent (2 arguments). We use the notation parent/2 to denote the 2-ary parent predicate.

**General form**: predicate(term₁, term₂, ..., termₖ)

### 2.7 Closed World Assumption

Prolog operates under the Closed World Assumption: only what we state and the logical implications of what we state are true.

In our family relationships program, there are only 7 people: no one else exists in the closed world.

### 2.8 Prolog Queries and Variable Binding

Variables start with uppercase letters, or a single underscore is an anonymous variable.

**Query Result Display**:

```prolog
?- parent(P,joan).
P=jack ;      % First solution: jack is joan's parent
P=jill        % After pressing semicolon ; showing second solution: jill is joan's parent
```

**Explanation**:

- When a query has multiple solutions, Prolog displays the first one
- Press `;` (semicolon) to continue searching for the next solution
- Press Enter to stop searching and accept the current solution
- The semicolon `;` in Prolog queries means "or look for the next solution"

**Anonymous variables**:

```prolog
?- parent(X,_).  % Who has a child
X = jack

?- parent(X,Y).  % Who has a child, which child?
X = jack
Y = joan
```

### 2.9 Prolog Rules

**Ancestor relationship rules**:

- If person X is a parent of person Y, then person X is an ancestor of person Y
- If person X is a parent of person Y, and person Y is an ancestor of person Z, then person X is an ancestor of person Z

**Prolog form**:

```prolog
ancestor(X,Y) :- parent(X,Y).
ancestor(X,Z) :- parent(X,Y), ancestor(Y,Z).
```

**Rule syntax**:

- A rule like "if P then Q" is written in Prolog in the opposite way: `Q :- P`
- We read "Q if P", meaning when we try to prove Q is true, we can succeed by proving P is true
- Comma "," in Prolog means "and"
- Semicolon ";" in Prolog means "or" (used in query results to display multiple solutions)
- The scope of a variable is a single clause

---

## Chapter 3: Prolog Debugging

### 3.1 Declarative Meaning

**Context 1**: Writing program in file or at user pseudo file prompt |:

A clause ends with a period. In this context, a clause is a statement that is true because you say it's true.

```prolog
% Example
dead(einstein).  % einstein is dead
blue(sky).       % the sky is blue
person(todd).    % todd is a person
```

**Declaration with variables**:

```prolog
thispred(X).  % for all X, thispred is true for X, whatever X is
```

**Declaration with two arguments**:

```prolog
thispred(arg1, arg2).  % thispred is true for arg1 and arg2
parent(bill, joan).    % bill is a parent of joan
```

### 3.2 Procedural Interpretation

**Program execution steps**:

1. If there are no query portions remaining, return variable bindings
2. Take next portion from the front of the query to scan
3. Scan the left-hand side of facts and rules looking for a match
4. If a fact matches, apply matching variable bindings, go to 1
5. If the left-hand side of a rule matches, apply variable bindings, add the right-hand side of the rule to the front of the query, go to 1
6. If no match and there's a choice point, backtrack to 3
7. Otherwise, fail

### 3.3 Tracing Prolog Execution

**Debugging predicates**:

- `trace/0`: For subsequent goals, go step by step, showing information
- `notrace/0`: Stop further tracing
- `spy(P)`: Specify predicate P (e.g., parent) to be traced
- `nospy(P)`: Stop tracing predicate P

**Trace example**:

```prolog
?- trace.
true.

[trace] ?- parent(X,bob).
Call: (8) parent(_5980, bob) ? creep
Exit: (8) parent(bill, bob) ? creep
X = bill ;
Redo: (8) parent(_5980, bob) ? creep
Exit: (8) parent(joan, bob) ? creep
X = joan.
```

**Trace commands**:

- `c` or space: Continue to the next step of the trace
- `l`: Continue execution, stopping at the next spy point (if any)
- `a`: Abort prolog execution
- `n`: Continue execution in "no debugging" mode
- `s`: Skip tracing the subgoals of this goal

### 3.4 Graphical Tracing

The graphical tracing facility helps programmers visualize the tracing process by showing source code, variable bindings, and the call stack.

**Graphical tracing predicates**:

- `guitracer/0`: Turn on graphical mode
- `gtrace/0`: Turn on graphical mode and trace mode together
- `noguitracer/0`: Turn off graphical mode

---

## Chapter 4: Prolog Structures and Matching

### 4.1 Prolog Syntax

**Data objects**:

```
data objects
├── simple objects
│   ├── constants
│   │   ├── atoms
│   │   └── numbers
│   └── variables
└── structures
```

### 4.2 Atom Syntax (3 Forms)

**(1) String of letters, digits and "\_" beginning with a lowercase letter**:

```
x, x15, x_15, aBC_CBa7, alpha_beta_algorithm, taxi_35, peter, missJones, miss_Jones2
```

**(2) String of special characters**:

```
--->, <==>, <<, .., .::., ::=, [], ., <, >, +, ++, !
```

**(3) String enclosed in single quotes**:

```
'X_35', 'Peter', 'The Beatles'
```

### 4.3 Number Syntax

**Integers**: `1, 1313, 0, -55`

**Real numbers (floating point)**: `3.14, -0.0045, 1.34E-21`

### 4.4 Variable Syntax

String of letters, digits, and underscores beginning with an uppercase letter or underscore:

```
X, Results, Object2B, Participant_list, _x35, _335
```

**Anonymous variable**: Single underscore `_`

**Variable scope**: The lexical scope of a variable name is one clause.

### 4.5 Structures

Structures are objects with multiple components.

**Example**: A date is a structured object with three components

```prolog
date(17, june, 2006)
```

**Functor**: Functor names are chosen by the user, syntax is an atom.

**Tree representation**:

```
date(17, june, 2006)
    |
    date
   /  |  \
  17 june 2006
```

### 4.6 Geometric Object Examples

```prolog
P1 = point(1, 1)
P2 = point(2, 3)
S = seg(P1, P2) = seg(point(1,1), point(2,3))
T = triangle(point(4,2), point(5,4), point(7,1))
```

**Arithmetic expressions as structures**:

```prolog
(a + b) * (c - 5)
*(+(a, b), -(c, 5))
```

### 4.7 Matching

Matching is an operation on terms (structures). Given two terms, they match if they are identical, or can be made identical by properly instantiating variables in the two terms.

**Matching example**:

```prolog
date(D1, M1, 2006) = date(D2, june, Y2)
```

This causes variables to be instantiated as:

```
D1 = D2
M1 = june
Y2 = 2006
```

**Matching algorithm**:

1. If S and T are constants, they match only if they are identical
2. If S is a variable, matching succeeds, S is instantiated to T
3. If T is a variable, matching succeeds, T is instantiated to S
4. If S and T are structures, they match only if:
   - They all have the same principal functor
   - All their corresponding arguments match

### 4.8 Matching vs Unification

**Unification** = Matching + Occur check

**Occur check**: Does one side appear within the other?

Unification is the same as matching, except if one side appears within the other, unification fails.

```prolog
?- X = f(X).  % Matching succeeds, unification fails
```

### 4.9 Representing Two Things are Different

**Two possibilities**:

1. **Negation operator \+** (problematic):

```prolog
\+ X = Y  % Always fails unless X and Y are both instantiated
\+ X = 4  % Always fails unless X is instantiated to something other than 4
```

2. **dif/2 built-in predicate** (better):

```prolog
dif(X,Y)  % Delays comparison until both X and Y are instantiated
```

### 4.10 Computing with Matching

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

---

## Chapter 5: Prolog Lists, Operators and Arithmetic

### 5.1 Prolog Predicate Argument Types

**Parameter mode indicators**:

- `?` parameter: either provides input, or accepts output, or used for both input and output
- Example: `member(?Elem, ?List)`: true if Elem is a member of List

```prolog
?- member(X,[a,b,c]).  % First argument is output, second is input
```

### 5.2 Directives

**Dynamic directive**:

```prolog
:- dynamic predicate/arity.
```

Informs the interpreter that the definition of the predicate may change during execution (using assert/1 and/or retract/1).

**Multifile directive**:

```prolog
:- multifile predicate/arity.
```

Informs the system that the specified predicate may be defined in multiple files.

**Discontiguous directive**:

```prolog
:- discontiguous predicate/arity.
```

Informs the system that clauses of the predicate may not be together in the source file.

### 5.3 Prolog Lists

**List notation examples**:

```prolog
[a, b, c, d]
[]
[ann, tennis, tom, running]
[link(a,b), link(a,c), link(b,d)]
[a, [b,c], d, [], [a,a,a], f(X,Y)]
```

**Head and tail**:

```prolog
L = [a, b, c, d]
a is the head of L
[b, c, d] is the tail of L
```

**Bar notation**:

```prolog
L = [Head | Tail]
L = [a, b, c] = [a | [b, c]] = [a, b | [c]] = [a, b, c | []]
```

### 5.4 List Notation is Syntactic Sugar

**List notation**: `[Head | Tail]`

**Equivalent standard Prolog notation**: `'[|]'(Head, Tail)`

**Equivalent terms**:

```prolog
[a, b, c] = '[|]'(a, '[|]'(b, '[|]'(c, [])))
```

### 5.5 List Membership

```prolog
% member(X, L) means X is a member of list L
member(X, [X | _]).        % X appears as the head of the list
member(X, [_ | L]) :- member(X, L).  % X is in the tail of the list
```

### 5.6 List Concatenation

```prolog
% conc(L1, L2, L3) means L3 is the concatenation of L1 and L2
conc([], L, L).                    % Base case
conc([X | L1], L2, [X | L3]) :-   % Recursive case
    conc(L1, L2, L3).
```

**Concatenation usage**:

```prolog
?- conc([a,b,c], [1,2,3], L).
L = [a,b,c,1,2,3]

?- conc([a,[b,c],d], [a,[],b], L).
L = [a, [b,c], d, a, [], b]
```

### 5.7 List Deletion

```prolog
% del(X, L, NewL) means NewL is a list with the first X deleted from list L
del(X, [X | Tail], Tail).
del(X, [Y | Tail], [Y | Tail1]) :-
    del(X, Tail, Tail1).
```

### 5.8 List Insertion

```prolog
% insert(X, L, NewL) means NewL is a list with X inserted somewhere in list L
insert(X, L, [X | L]).              % Insert X as the head
insert(X, [Y | L], [Y | NewL]) :-   % Insert X in the tail
    insert(X, L, NewL).
```

### 5.9 Sub-lists of a List

```prolog
% sublist(List, Sublist) means Sublist appears as a sublist in List
sublist(S, L) :-
    conc(L1, L2, L),
    conc(S, L3, L2).
```

### 5.10 Operator Notation

Operator notation is just a superficial notational improvement.

**Equivalent notation for arithmetic expressions**:

```prolog
+(*(2,a), *(b,c)) = 2*a + b*c
```

**User-defined operators**:

```prolog
:- op(600, xfx, has).
:- op(600, xfx, supports).

peter has information.
floor supports table.
```

**Operator types**:

- **Infix operators**: xfx, xfy, yfx
- **Prefix operators**: fx, fy
- **Postfix operators**: xf, yf

### 5.11 Arithmetic Operations

**Arithmetic calculation using is**:

```prolog
?- X = 1+2.
X = 1 + 2  % Prolog keeps the expression unevaluated

?- X is 1 + 2.
X = 3      % "is" forces evaluation
```

**Arithmetic operators**:

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

### 5.12 Comparison Predicates

```prolog
X > Y      % X is greater than Y
X < Y      % X is less than Y
X >= Y     % X is greater than or equal to Y
X =< Y     % X is less than or equal to Y
X =:= Y    % X and Y are numerically equal
X =\= Y    % X and Y are numerically not equal
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

### 5.13 List Length

```prolog
% length(L, N): N is the length of list L
length([], 0).
length([_ | L], N) :-
    length(L, N0),
    N is N0 + 1.
```

---

## Chapter 6: Prolog Negation and Cut

### 6.1 Cut Operator

**Cut operator**: The exclamation mark `!` in Prolog

**Important reminder**:

- Cut is non-logical, so in this course we avoid using it
- But we need to know what it means
- When cut (!) appears as a goal in the body of a predicate, it always succeeds
- It discards choice points

**Intuitive meaning**: If the proof process reaches cut in the body of a predicate, then commit to all choices made so far in processing that predicate.

### 6.2 Cut Example (We Don't Use)

**Student grade conversion**:

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

### 6.3 Scope of Cut

Cut discards choice points in R, Q, P, C. Cut does not discard choice points in B or A, because those choice points are outside the scope of the cut.

### 6.4 Negation

**Definition of negation in Prolog**:

```prolog
not(P) :- P, !, fail  % If P is true, then commit and fail
       ;               % This line creates a choice point, discarded by cut
       true.           % P must be false, since cut was not reached
```

This is called **negation-as-failure**. not can be written as a prefix operator: `\+ P`

### 6.5 Negation Example

```prolog
likes(john, X) :- music(X), \+ heavy_metal(X).
```

John likes all music except heavy metal. This is more readable than the cut+fail formulation.

### 6.6 Negation-as-Failure

**Not fully equivalent to negation in logic**:

- Negation-as-failure makes the "Closed World Assumption"
- **Closed World Assumption (CWA)**: Everything that Prolog cannot derive from the program is assumed to be false

**SWI Prolog negation symbol**: `\+ P`

### 6.7 Closed World Assumption Example

Consider this one-line program:

```prolog
round(sun).
```

**How to understand Prolog's answers**:

```prolog
?- round(sun).
true    % True, round(sun) is derivable from the program logic

?- round(earth).
false   % False means: I don't know, cannot derive from the program

?- \+ round(earth).
true    % It's derivable from the program, but only under CWA
```

### 6.8 Problems with Negation

**Example program**:

```prolog
person(jack).
person(judy).
person(jeff).

male(jack).
male(jeff).

female(X) :- \+ male(X).
```

**Unexpected results**:

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

### 6.9 Negation is Non-Logical

**Negation gives the wrong answer when dealing with unbound variables**:

- Terms without unbound variables are called "ground terms"
- The order of negation matters: delay negation whenever possible to increase the chance that all variables are bound

```prolog
?- \+ X = a.
false.

?- \+ X = a, X = b.
false.

?- X = b, \+ X = a.
X = b.
```

### 6.10 Three Cases Where Order Matters

1. **Recursion and infinite loops**:

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

---

## Chapter 7: Midterm Review

### 7.1 Midterm Exam Information

**Exam time**: October 16, 2:00pm

- 1 hour exam, but 1.5 hours allotted per person
- Closed book, no internet
- Part multiple choice on scantron quiz (bring pencil, eraser)
- Part written answers on paper (bring pencil/pen, eraser)

**Coverage**: Material from the course so far

### 7.2 Study Guide

- Review lecture slides/notes
- Review blended activity quizzes
- Review labs and assignments

### 7.3 Possible Questions

**Multiple choice**:

- Similar to quizzes
- May be based on "Check Your Learning" slide questions

**Written answers**:

- Write small programs involving recursion, possibly from labs or assignments
- May be based on "Check Your Learning" slide questions

### 7.4 Specific Question Types

1. **Write predicates like "mymember(X,L)" meaning X is an element of list L**
2. **Write predicates related to direct and indirect relationships (successor/larger, parent/ancestor, etc.)**
3. **Write or debug predicates involving arithmetic**
4. **Explain what the Closed World Assumption means**

### 7.5 Review Points

**Knowledge Representation**:

- Declarative programming
- Prolog language
- CWA, variables, procedural interpretation, matching vs unification

**Prolog Syntax**:

- Structures, lists
- Recursion and examples
- Cut
- Negation-as-failure

---

## 📝 Summary

This course covers the core concepts of Knowledge Representation and Reasoning, from foundational declarative programming concepts to in-depth applications of the Prolog language. By studying these materials, you will be able to:

1. **Understand the differences between knowledge representation and machine learning**
2. **Master Prolog programming fundamentals**
3. **Learn to debug Prolog programs**
4. **Proficiently use Prolog data structures and matching**
5. **Apply lists, operators, and arithmetic operations**
6. **Understand concepts of negation and cut**

These skills lay a solid foundation for subsequent knowledge representation and reasoning applications.

---

_Document generated: 2024_
_Source: Converted and compiled from CST8503 course PDF materials_
