# CST8503 K&R and Reasoning - Comprehensive Exam Question Bank

> **Exam Instructions**: This question bank covers all chapters, including 25 multiple choice questions, 10 fill-in-the-blank questions, short answer questions, and Prolog programming questions.
>
> **Total Points**: 50 points
>
> - Multiple Choice: 25 points (1 point each)
> - Fill-in-the-Blank: 10 points (1 point each)
> - Short Answer: 10 points
> - Prolog Programming: 5 points

---

## 📝 Part 1: Multiple Choice Questions

**Instructions**: 1 point each, 25 points total. Choose the best answer.

### Question 1

**Source: Chapter 1 - Introduction to K&R**

Which of the following is NOT one of the three main types of machine learning?

- A. Supervised Learning
- B. Unsupervised Learning
- C. K&R
- D. Reinforcement Learning

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: K&R is an independent field of study that focuses on declarative knowledge forms, not a type of machine learning. The three main types of machine learning are supervised learning, unsupervised learning, and reinforcement learning.

**Detailed Explanation**:

- **K&R** focuses on declarative knowledge forms suitable for specialized reasoning engines
- **Machine Learning** focuses on finding patterns in data
- These two fields, while both involving AI, have fundamentally different approaches

</details>

---

### Question 2

**Source: Chapter 1 - Introduction to K&R**

Which statement correctly describes declarative programs?

- A. They describe how to execute a series of steps to achieve a goal
- B. They describe what constitutes a solution
- C. They require explicit execution order
- D. They are identical to procedural programs

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Declarative programs describe "what" constitutes a solution, not "how" to achieve it. They use facts and rules to describe the desired outcome.

**Detailed Explanation**:

- **Declarative Programs**: Describe what the solution should be
- **Procedural Programs**: Describe how to solve a problem through steps
- **Prolog** is a language based on the declarative paradigm

</details>

---

### Question 3

**Source: Chapter 2 - Prolog Basics**

In Prolog, what does the `|:` prompt indicate?

- A. Running a program
- B. Writing a program
- C. Making a query
- D. Loading a file

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The `|:` prompt indicates that you are in the context of writing a Prolog program, i.e., entering Prolog code in a file.

**Detailed Explanation**:

- **Context 1**: `|:` - Writing a program (in file or user pseudo-file)
- **Context 2**: `?-` - Running a program (making queries)
- **user**: Special filename that allows direct input in interactive mode

</details>

---

### Question 4

**Source: Chapter 2 - Prolog Basics**

What does the Closed World Assumption (CWA) mean in Prolog?

- A. Only what is stated and what follows by logical implication is true
- B. All unknown things are assumed to be true
- C. Prolog considers all possibilities outside the program
- D. Variables can represent any possible value

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: The Closed World Assumption is a core concept in Prolog, meaning only what we explicitly state and what can be derived through logical inference is true.

**Detailed Explanation**:

- **Closed World**: The program defines the entire universe
- **Only stated things**: Things not explicitly listed in the program are considered non-existent
- **Logical implication**: Conclusions derivable from facts and rules are considered true

</details>

---

### Question 5

**Source: Chapter 2 - Prolog Basics**

In the Prolog rule `ancestor(X,Z) :- parent(X,Y), ancestor(Y,Z).`, what does the comma "," represent?

- A. Or
- B. And
- C. Not
- D. Implies

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: In Prolog, the comma "," represents logical "and", meaning all conditions must be true.

**Detailed Explanation**:

- **Rule format**: `Head :- Body.`
- **Comma means AND**: `parent(X,Y), ancestor(Y,Z)` means both conditions must be satisfied
- **Semantics**: If X is a parent of Y, and Y is an ancestor of Z, then X is an ancestor of Z

</details>

---

### Question 6

**Source: Chapter 3 - Prolog Debugging**

What does the predicate `trace/0` do in Prolog debugging?

- A. Stop execution under certain conditions
- B. Display step-by-step execution information for subsequent goals
- C. Show all predicate definitions
- D. Clear all traces

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: `trace/0` is a debugging predicate that displays detailed step-by-step information for subsequent execution, helping you understand how Prolog reasons.

**Detailed Explanation**:

- **Call**: Shows when a predicate is called
- **Exit**: Shows successful return
- **Fail**: Shows failure
- **Redo**: Shows backtracking
- **Trace commands**: c (continue), a (abort), n (no debugging)

</details>

---

### Question 7

**Source: Chapter 3 - Prolog Debugging**

What does "Call" represent in trace mode?

- A. Predicate successfully returned
- B. Predicate is being called
- C. Backtracking occurred
- D. Predicate failed

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: "Call" indicates that Prolog is attempting to invoke this predicate to satisfy some goal.

**Detailed Explanation**:

- **Call**: Attempt to prove goal is true
- **Exit**: Successfully found match and returned variable bindings
- **Fail**: Could not find a match
- **Redo**: Backtrack to find another solution

</details>

---

### Question 8

**Source: Chapter 4 - Prolog Structures and Matching**

Which of the following is a valid Prolog atom?

- A. X_35
- B. 'X_35'
- C. x35
- D. Both B and C

<details>
<summary>View Answer</summary>

**Answer: D**

**Explanation**: `x35` is a valid atom (starts with lowercase), and `'X_35'` is also a valid atom (using quotes). `X_35` without quotes is not valid as it starts with an uppercase letter.

**Detailed Explanation**:

- **Atom syntax**: String starting with lowercase `x15, abc`
- **Special characters**: Strings used directly `[]`
- **Quoted strings**: Any characters `'X_35', 'Peter'`

</details>

---

### Question 9

**Source: Chapter 4 - Prolog Structures and Matching**

What is the difference between matching and unification?

- A. There is no difference
- B. Unification includes occurs check
- C. Matching includes occurs check
- D. Unification is faster

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Unification = Matching + Occurs Check. The occurs check detects whether one side appears inside the other, and if so, unification fails.

**Detailed Explanation**:

- **Matching**: `X = f(X)` succeeds
- **Unification**: `X = f(X)` fails (avoids infinite loops)
- **Occurs check**: Prevents variable binding to structures containing themselves

</details>

---

### Question 10

**Source: Chapter 4 - Prolog Structures and Matching**

In `vertical(seg(point(X1,Y1), point(X1, Y2)))`, what makes this segment vertical?

- A. The two points have the same Y coordinate
- B. The two points have different X coordinates
- C. The two points have the same X coordinate
- D. The two points have different X and Y coordinates

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: A vertical segment means the two endpoints have the same X coordinate, which is enforced by reusing the variable X1.

**Detailed Explanation**:

- **Vertical**: `point(X1,Y1), point(X1, Y2)` - X is same
- **Horizontal**: `point(X1,Y1), point(X2, Y1)` - Y is same
- **Matching rule**: Same variable names must bind to same value

</details>

---

### Question 11

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

In the Prolog list `[a, b, c]`, which expression represents the tail?

- A. `[a, b, c]`
- B. `[b, c]`
- C. `a`
- D. `[]`

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The tail of a list is the remaining portion after removing the first element, i.e., `[b, c]`.

**Detailed Explanation**:

- **Head**: First element `a`
- **Tail**: Remaining portion `[b, c]`
- **Notation**: `[Head | Tail]` = `[a | [b, c]]`

</details>

---

### Question 12

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

What is the definition of `member/2`?

- A. `member(X, [X | _]).` and `member(X, [_ | L]) :- member(X, L).`
- B. `member(X, [X]).`
- C. `member(X, [Y]) :- member(X, Y).`
- D. None of the above

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: The complete definition of `member/2` consists of two clauses: X appears as the head of the list, or X is in the tail of the list.

**Detailed Explanation**:

- **Base case**: X appears as head `member(X, [X | _]).`
- **Recursive case**: X is in tail `member(X, [_ | L]) :- member(X, L).`

</details>

---

### Question 13

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

In Prolog, what is the difference between `X = 1+2` and `X is 1+2`?

- A. There is no difference
- B. The first expression computes, the second doesn't
- C. The first expression keeps unevaluated form, the second forces evaluation
- D. Both will cause errors

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: `X = 1+2` merely binds `X` to the structure `+(1, 2)`, while `X is 1+2` forces computation and binds `X` to the result `3`.

**Detailed Explanation**:

- **`=` operator**: Structure matching, no arithmetic computation
- **`is` operator**: Forces arithmetic computation
- **Arithmetic expressions**: Prolog does not automatically compute expressions by default

</details>

---

### Question 14

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

In Prolog arithmetic comparison, what does `X =:= Y` represent?

- A. X and Y are the same object
- B. X and Y have the same structure
- C. X and Y are numerically equal
- D. X and Y are not equal

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: `=:=` is the numerical equality operator, which evaluates both sides and compares the results.

**Detailed Explanation**:

- **`X =:= Y`**: Numerical equality (compare after evaluation)
- **`X = Y`**: Structure unification (no evaluation)
- **Example**: `2+5 =:= 5+2` is true, but `2+5 = 5+2` is false

</details>

---

### Question 15

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

What does the directive `:- op(600, xfx, has).` do?

- A. Declares an infix operator
- B. Declares a prefix operator
- C. Declares a postfix operator
- D. Has no meaning

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: `xfx` indicates this is an infix operator, `has` is the operator name, and 600 is the priority.

**Detailed Explanation**:

- **xfx**: Infix operator (arguments on both sides)
- **fx, fy**: Prefix operators
- **xf, yf**: Postfix operators
- **Priority**: Higher number means higher priority

</details>

---

### Question 16

**Source: Chapter 6 - Prolog Negation and Cut**

In Prolog, what does the cut operator `!` do?

- A. Immediately fail
- B. Discard choice points
- C. Backtrack
- D. Stop execution

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The cut operator always succeeds, but it commits to all choices made up to that point, discarding choice points and preventing backtracking.

**Detailed Explanation**:

- **Cut**: Non-logical construct that discards choice points
- **Intuitive meaning**: Commit to all choices made up to this point
- **Problem**: May lead to unexpected behavior
- **Recommendation**: Avoid using unless really necessary

</details>

---

### Question 17

**Source: Chapter 6 - Prolog Negation and Cut**

What does the negation as failure `\+ P` mean?

- A. P is true
- B. P is false or cannot be proven true
- C. P could be true or false
- D. None of the above

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Negation as failure works under the closed world assumption: if P cannot be proven true, then P is considered false.

**Detailed Explanation**:

- **Negation as failure**: `\+ P` succeeds when P cannot be proven
- **Closed World Assumption**: Whatever cannot be derived from the program is false
- **Non-logical**: Not exactly equivalent to logical negation

</details>

---

### Question 18

**Source: Chapter 6 - Prolog Negation and Cut**

Why does `female(X)` return `false` when queried, but `female(judy)` returns `true`?

- A. Program error
- B. Problems with negation and unbound variables
- C. Problems with closed world assumption
- D. Both B and C

<details>
<summary>View Answer</summary>

**Answer: D**

**Explanation**: This is a classic problem with negation as failure and unbound variables. When querying `female(X)`, `\+ male(X)` fails immediately because X is unbound. Only when a specific person is explicitly mentioned does the query succeed.

**Detailed Explanation**:

- **Negation and unbound variables**: `\+ P(X)` may give unexpected results when X is unbound
- **Closed world assumption**: Affects the semantics of negation
- **Solution**: Bind variables before using negation

</details>

---

### Question 19

**Source: Chapter 6 - Prolog Negation and Cut**

Given the program:

```prolog
person(jack).
person(judy).
male(jack).
female(X) :- \+ male(X).
```

Which query will succeed?

- A. `female(X)`
- B. `female(judy)`
- C. `female(jack)`
- D. Both A and B

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Only `female(judy)` will succeed. `female(X)` will fail due to unbound variables, and `female(jack)` will fail because jack is male.

**Detailed Explanation**:

- **Negation with unbound variables**: Always fails immediately
- **Negation after binding**: Can work correctly
- **Order matters**: Bind all variables before using negation

</details>

---

### Question 20

**Source: Chapter 7 - Midterm Review**

The midterm exam covers which of the following?

- A. Prolog syntax and rules
- B. Recursive programming
- C. Arithmetic operations
- D. All of the above

<details>
<summary>View Answer</summary>

**Answer: D**

**Explanation**: The midterm exam covers all content from chapters 1-7, including Prolog basics, syntax, rules, recursion, arithmetic, etc.

**Detailed Explanation**:

- **Knowledge representation concepts**: Declarative programming, CWA
- **Prolog basics**: Facts, rules, queries
- **Syntax**: Structures, lists, matching
- **Advanced features**: Recursion, arithmetic, negation

</details>

---

### Question 21

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

In Prolog, what is `['a' | Tail]` equivalent to?

- A. `'[|]'(a, Tail)`
- B. `a(Tail)`
- C. `[]`
- D. `[a, Tail]`

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: List notation is syntactic sugar. `['a' | Tail]` is internally represented as the structure `'[|]'(a, Tail)`.

**Detailed Explanation**:

- **Syntactic sugar**: List notation is for convenience
- **Standard form**: `'[|]'` is the main functor for lists
- **Complete form**: `[a,b,c]` = `'[|]'(a, '[|]'(b, '[|]'(c, [])))`

</details>

---

### Question 22

**Source: Chapter 4 - Prolog Structures and Matching**

In the matching algorithm, what happens if S is a variable?

- A. Matching succeeds only if S and T are the same
- B. Matching always fails
- C. Matching succeeds, S is instantiated to T
- D. Matching succeeds, S and T are swapped

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: If S is a variable, matching always succeeds and S is bound to T.

**Detailed Explanation**:

- **Matching algorithm**: Handles special case of variables
- **Instantiation**: Variable binding to a value
- **Unification**: Variables, once bound, cannot change

</details>

---

### Question 23

**Source: Chapter 3 - Prolog Debugging**

In Prolog tracing, what does `spy(P)` do?

- A. Traces all predicates
- B. Traces only predicate P
- C. Removes predicate P
- D. Stops tracing predicate P

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: `spy(P)` is used to specify that a particular predicate should be traced, which is very useful when debugging large programs.

**Detailed Explanation**:

- **spy**: Selectively trace specific predicates
- **nospy**: Stop tracing specific predicates
- **trace**: Trace all predicates
- **notrace**: Stop all tracing

</details>

---

### Question 24

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

What does `conc/3` do?

- A. Delete list elements
- B. Concatenate two lists
- C. Find list membership
- D. Calculate list length

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: `conc(L1, L2, L3)` means L3 is the concatenation of L1 and L2.

**Detailed Explanation**:

- **Recursive definition**: Base case and recursive case
- **Efficiency**: Linear time, O(n)
- **Application**: Foundation for list operations

</details>

---

### Question 25

**Source: Chapter 2 - Prolog Basics**

Given the following program:

```prolog
parent(jack, joan).
parent(jill, joan).
parent(bill, bob).
parent(joan, bob).
```

What does the query `?- parent(joan, X).` return?

- A. Only one answer
- B. Two answers
- C. Three answers
- D. No answers

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: According to the given program, joan has only one child bob, so the query returns only one answer `X = bob`.

**Detailed Explanation**:

- **Query semantics**: Find all variable bindings satisfying the condition
- **Result**: `X = bob`
- **Backtracking**: No other matches found

</details>

---

## 📝 Part 2: Fill-in-the-Blank Questions

**Instructions**: 1 point each, 10 points total. Fill in the blank with the correct answer.

### Question 26

**Source: Chapter 2 - Prolog Basics**

In Prolog, identifiers starting with an uppercase letter are ****\_\_****.

<details>
<summary>View Answer</summary>

**Answer: variables**

**Explanation**: In Prolog, identifiers starting with uppercase letters represent variables, while those starting with lowercase letters represent atoms.

</details>

---

### Question 27

**Source: Chapter 2 - Prolog Basics**

The "****\_\_**** World" assumption means that only what is explicitly stated and what can be derived through logical inference is true.

<details>
<summary>View Answer</summary>

**Answer: Closed**

**Explanation**: The Closed World Assumption (CWA) is a core concept in Prolog.

</details>

---

### Question 28

**Source: Chapter 3 - Prolog Debugging**

In Prolog debugging, the `__________` command is used to stop and wait for user input after each step in tracing.

<details>
<summary>View Answer</summary>

**Answer: trace**

**Explanation**: `trace/0` turns on trace mode, displaying each step of execution.

</details>

---

### Question 29

**Source: Chapter 4 - Prolog Structures and Matching**

In Prolog, the main function name of a structure is called a ****\_\_****.

<details>
<summary>View Answer</summary>

**Answer: functor**

**Explanation**: The functor is the name part of a structure, for example, in `date(17, june, 2006)`, `date` is the functor.

</details>

---

### Question 30

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

The alternative representation of a list uses the pipe notation: `[Head | __________]`.

<details>
<summary>View Answer</summary>

**Answer: Tail**

**Explanation**: `[Head | Tail]` splits a list into its head element and tail list.

</details>

---

### Question 31

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

The operator `is` in Prolog is used to force ****\_\_**** computation.

<details>
<summary>View Answer</summary>

**Answer: arithmetic**

**Explanation**: `X is 1+2` evaluates the expression and binds the result to X, while `X = 1+2` only does structure matching.

</details>

---

### Question 32

**Source: Chapter 6 - Prolog Negation and Cut**

The `__________` operator `!` is used to discard choice points and prevent backtracking.

<details>
<summary>View Answer</summary>

**Answer: cut**

**Explanation**: The cut operator is non-logical and commits to all choices made up to the current point.

</details>

---

### Question 33

**Source: Chapter 6 - Prolog Negation and Cut**

"Negation as ****\_\_****" is represented by `\+` in Prolog and works under the closed world assumption.

<details>
<summary>View Answer</summary>

**Answer: Failure**

**Explanation**: Negation as Failure means that if P cannot be proven true, then P is considered false.

</details>

---

### Question 34

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

`member(X, [X | _])` means X is the ****\_\_**** of the list.

<details>
<summary>View Answer</summary>

**Answer: head or first element**

**Explanation**: This is the base case of `member/2`, where X appears as the first element of the list.

</details>

---

### Question 35

**Source: Chapter 4 - Prolog Structures and Matching**

In the matching algorithm, when comparing two ****\_\_****, they must have the same main functor and all corresponding arguments must match.

<details>
<summary>View Answer</summary>

**Answer: structures**

**Explanation**: If S and T are both structures, they match only if they have the same main functor and all corresponding arguments match.

</details>

---

## 📝 Part 3: Short Answer Questions

**Instructions**: 10 points total. Provide detailed written answers.

### Question 36 (3 points)

**Source: Chapter 1 - Introduction to K&R**

Explain the difference between declarative and procedural programming, and give an example of making coffee to illustrate.

<details>
<summary>View Answer</summary>

**Answer points:**

**Declarative Programming**:

- Describes "what" constitutes a solution
- Uses facts and rules
- Leaves implementation details to interpreter/inference engine
- Example: A cup of hot brown water that tastes like coffee
  - Boiling water in a kettle produces hot water
  - Adding instant coffee to hot water produces brown water that tastes like coffee

**Procedural Programming**:

- Describes "how" to execute steps
- Clear sequence of steps
- Requires detailed execution instructions
- Example: Steps to make coffee
  1. Take cup from cabinet
  2. Fill kettle with water
  3. Plug in kettle
  4. Wait for water to boil
  5. Pour hot water into cup

**Key Difference**:

- Declarative: Describes the result
- Procedural: Describes the process

</details>

---

### Question 37 (3 points)

**Source: Chapter 3 - Prolog Debugging**

Explain the procedural interpretation steps in Prolog. Given the query `ancestor(jack, bob)`, describe how Prolog executes (assuming appropriate parent facts and ancestor rules).

<details>
<summary>View Answer</summary>

**Answer points:**

**Prolog Execution Steps:**

1. If no query parts remain, return variable bindings
2. Take next part of query from front to scan
3. Scan left sides of facts and rules for matches
4. If fact matches, apply variable bindings, go to 1
5. If rule left side matches, apply variable bindings, add rule right side to front of query, go to 1
6. If no match and choice point exists, backtrack to 3
7. Otherwise, fail

**Specific Example: Query `ancestor(jack, bob)`**

1. **Scan for match**: Look for match of `ancestor(jack, bob)`
2. **Match rule**: Match `ancestor(X,Z) :- parent(X,Y), ancestor(Y,Z).`
3. **Bind variables**: X=jack, Z=bob
4. **Add right side**: `parent(jack,Y), ancestor(Y,bob)`
5. **Prove first part**: `parent(jack,Y)` matches fact `parent(jack,joan)`
6. **Bind Y=joan**: Now need to prove `ancestor(joan,bob)`
7. **Continue recursion**: Repeat similar process

**Backtrack mechanism**:

- If a subgoal fails, return to previous choice point
- Try another match
- Continue until success or all possibilities exhausted

</details>

---

### Question 38 (4 points)

**Source: Chapter 6 - Prolog Negation and Cut**

Explain why the following program produces surprising results:

```prolog
person(jack).
person(judy).
person(jeff).

male(jack).
male(jeff).

female(X) :- \+ male(X).
```

Specifically explain:

1. Why does `male(X)` return two answers?
2. Why does `female(X)` return false?
3. Why does `female(judy)` return true?
4. What does this illustrate about negation in Prolog?

<details>
<summary>View Answer</summary>

**Answer points:**

1. **`male(X)` returns two answers**:

   - Query `male(X)` finds all males
   - X=jack is one answer
   - After backtracking finds X=jeff
   - As expected

2. **`female(X)` returns false**:

   - Query `female(X)` calls `\+ male(X)`
   - X is unbound at this time
   - `\+ male(X)` tries to prove `male(X)`, which always succeeds for unbound X
   - Therefore `\+ male(X)` fails
   - Negation as failure doesn't work correctly with unbound variables

3. **`female(judy)` returns true**:

   - Query `female(judy)` calls `\+ male(judy)`
   - judy is now bound
   - `male(judy)` fails (judy is not male)
   - Therefore `\+ male(judy)` succeeds
   - This is correct behavior

4. **Illustrated problem**:
   - **Negation and unbound variables**: Negation as failure gives wrong answer with unbound variables
   - **Closed world assumption**: Negation only makes sense under closed world assumption
   - **Ground term requirement**: Correctness of negation requires all variables to be bound
   - **Order dependency**: It's important to bind variables before using negation

**Suggested solution**:

- Bind variables before using negation
- For example: `female(X) :- person(X), \+ male(X).`

</details>

---

## 📝 Part 4: Prolog Programming Question (5 points)

**Instructions**: 5 points total. Write Prolog code.

### Question 39 (5 points)

**Source: Chapter 5 - Prolog Lists, Operators and Arithmetic**

Write a Prolog predicate `mymax(List, Max)` where `List` is a non-empty list of non-negative integers, and `Max` is the maximum value in the list.

**Requirements**:

1. Use recursion
2. Do not use built-in predicates (e.g., `max/2`)
3. Give complete definition
4. List base case and recursive case

Write the code and explain your solution.

<details>
<summary>View Answer</summary>

**Answer:**

```prolog
% Base case: single element list
mymax([X], X).

% Recursive case: multiple element list
mymax([H | T], Max) :-
    mymax(T, MaxTail),          % Find max of tail
    (H >= MaxTail, Max = H;     % If head is larger, Max is head
     H < MaxTail, Max = MaxTail). % Otherwise Max is tail maximum
```

**Or a more concise version:**

```prolog
% Base case
mymax([X], X).

% Recursive case
mymax([H | T], Max) :-
    mymax(T, MaxTail),
    max_of_two(H, MaxTail, Max).

% Helper predicate: larger of two numbers
max_of_two(A, B, A) :- A >= B.
max_of_two(A, B, B) :- B > A.
```

**Explanation:**

1. **Base case**: `mymax([X], X)` - A single element list, maximum is that element.

2. **Recursive case**:

   - `mymax([H | T], Max)` - H is the head, T is the tail
   - First recursively find the maximum of tail T `MaxTail`
   - Then compare H and MaxTail, choose the larger as Max

3. **Execution flow example**:

   ```prolog
   ?- mymax([3, 7, 2, 9, 5], Max).
   % Recursive call chain:
   % mymax([3, 7, 2, 9, 5], Max)
   % -> mymax([7, 2, 9, 5], Max1)
   %    -> mymax([2, 9, 5], Max2)
   %       -> mymax([9, 5], Max3)
   %          -> mymax([5], 5)
   %          <- Max3 = 9
   %       <- Max2 = 9
   %    <- Max1 = 9
   % Max = 9
   ```

4. **Characteristics**:

   - **Recursion**: Problem decomposed into smaller subproblems
   - **Accumulative**: Progressively determine maximum through comparison
   - **Termination**: Base case ensures recursion terminates

5. **Alternative implementation**:
   - Can use arithmetic comparison operators `>=` and `<`
   - Can use helper predicates for better readability
   - Both yield the same result

</details>

---

## 📌 Summary

This question bank covers core content from the CST8503 K&R and Reasoning course:

- **K&R vs Machine Learning**: Understanding declarative programming paradigm
- **Prolog Basics**: Mastering facts, rules, queries, and closed world assumption
- **Debugging Techniques**: Learning to use trace and spy for debugging
- **Data Structures**: Understanding structures, lists, and matching mechanisms
- **Advanced Features**: Mastering arithmetic, operators, recursion, and negation

By mastering these contents, you will be able to:

1. Understand basic principles of knowledge representation
2. Write simple Prolog programs
3. Debug and explain Prolog execution processes
4. Understand recursion and list operations
5. Correctly use negation and arithmetic operations

---

_Question bank generated: 2024_
_Source: CST8503 K&R and Reasoning course materials_
