# CST 8503 - Fall 2025 - Final Exam Practice Questions

## Final Exam Information

**CST8903 Final Exam Tuesday Dec 9th 9:30-11:30am A120**

- 1.5 hr test in 2 hours
- Closed book, no internet
- Part multiple choice Scantron Quiz (bring pencil, eraser)
- Part written answers on paper (bring pens/biro/erasers)
- Covers material so far in course

**Note: Based on the exam format, questions will be:**

- **Multiple Choice**:

  - Similar to hybrid quizzes and Midterm questions,
  - could be based on "Check your learning" slide questions

- **Written Answer**:
  - Write small programs involving recursion (possibly from lab or assignment)
  - Axiomatize a simple domain (Blocks World or simpler)
  - Could be based on "Check your learning" slide questions

---

## Part 1: Multiple Choice Questions

### From Midterm Exam (Questions 1-25)

#### Question 1

**What is the result of the following Prolog query? X is Y + 4, Y = 4.**

a. X=8
b. Variable instantiation error. ✓
c. X=4, Y=4
d. X=8, Y=4
e. None of these answers.

**Explanation:** In Prolog, the `is` operator (算术求值运算符) requires its right operand to be instantiated (已实例化), but Y is unbound when `X is Y + 4` is evaluated, causing a variable instantiation error (变量实例化错误).

---

#### Question 2

**Which of the following queries will turn on tracing during a Prolog session?**

a. noguitracer.
b. None of these answers.
c. trace. ✓
d. guitracer.
e. notrace.

**Explanation:** `trace.` is the built-in predicate (内置谓词) in Prolog that enables goal tracing (目标追踪) for debugging program execution.

---

#### Question 3

**Which of the following statements about the cut (!) goal in Prolog is true?**

a. We avoid it in this course if possible because we try for purely logical Prolog
b. None of these answers.
c. It can increase efficiency by reducing unnecessary backtracking.
d. All of these answers. ✓
e. In some situations it changes the logical meaning of a program.

**Explanation:** All statements about the cut operator `!` (切割操作符) are correct: it can change logical meaning, improve efficiency by reducing backtracking (回溯), but we avoid it to maintain purely logical Prolog.

---

#### Question 4

**What variable bindings would result from the following Prolog Query? [H|T] = [a,b,c].**

a. H = a, T = [b,c] ✓
b. H=[], T=[a,b,c]
c. H= [a,b,c), T= []
d. H=[a], T= [b,c]
e. None of these answers.

**Explanation:** The list pattern `[H|T]` (列表模式) uses unification (合一) to match the list structure. In Prolog, `[a,b,c]` is equivalent to `[a|[b,c]]`, which means the first element `a` is the head (头部) and `[b,c]` is the tail (尾部). When `[H|T] = [a,b,c]` is executed, H unifies with `a` and T unifies with `[b,c]`, resulting in the bindings `H = a, T = [b,c]`.

---

#### Question 5

**What is declarative programming?**

a. A programming paradigm where a solution is achieved when message passing between objects stabilizes.
b. All of these answers.
c. None of these answers.
d. A programming paradigm where the programmer describes the solution rather than the steps required to produce the solution. ✓
e. A programming paradigm where the programmer declares ordered operations for building a solution.

**Explanation:** Declarative programming (声明式编程) focuses on describing what the solution is, not how to compute it step-by-step, which is characteristic of procedural programming (过程式编程).

---

#### Question 6

**What would be the result of the following query in Prolog? X = [x], \+ x = [x, y, z].**

a. None of these answers.
b. Variable instantiation error.
c. X = [x] ✓
d. X = [x, y, z]
e. false

**Explanation:**

**English:**

The query `X = [x], \+ x = [x, y, z]` executes left-to-right.

**Step 1:** `X = [x]` succeeds, binding X to the list `[x]`. This is a unification operation where the variable `X` is bound to the list containing the atom `x`.

**Step 2:** `\+ x = [x, y, z]` is evaluated. The `\+` operator is simply an inversion operator. To evaluate `\+ Goal`, Prolog first evaluates `Goal`, then inverts the result:

- Success returns `true`, failure returns `false`
- If `Goal` succeeds (returns `true`), then `\+ Goal` fails (returns `false`)
- If `Goal` fails (returns `false`), then `\+ Goal` succeeds (returns `true`)

**Step 3:** The subgoal `x = [x, y, z]` is evaluated. Here, `x` is an atom and `[x, y, z]` is a list. Atoms and lists are different data types in Prolog, so unification fails. In this specific case, the failure also means the statement is false (type mismatch is certain).

**Step 4:** Since `x = [x, y, z]` fails (returns `false`), the inversion `\+ x = [x, y, z]` succeeds (returns `true`).

**Result:** The entire query succeeds with `X = [x]`.

**Note on the `\+` operator:** In Prolog, success returns `true` and failure returns `false`. The `\+` operator is simply an inversion operator: it inverts the result of the goal. If a goal succeeds (`true`), its inversion fails (`false`); if a goal fails (`false`), its inversion succeeds (`true`).

**Note on terminology:** Prolog terminology calls this "negation as failure", but this term is misleading. The `\+` operator is simply an inversion operator that flips `true` to `false` and `false` to `true`. The term "negation as failure" suggests that negation equals failure, which is incorrect. A more accurate description is: "inversion operator" or "negation implemented by inverting the result".

---

**中文：**

查询 `X = [x], \+ x = [x, y, z]` 从左到右执行。

**第一步：** `X = [x]` 成功，将 X 绑定到列表 `[x]`。这是一个统一操作，变量 `X` 被绑定到包含原子 `x` 的列表。

**第二步：** 评估 `\+ x = [x, y, z]`。`\+` 操作符就是取反操作符。要计算 `\+ Goal`，Prolog 先计算 `Goal`，然后取反结果：

- 成功返回 `true`，失败返回 `false`
- 如果 `Goal` 成功（返回 `true`），则 `\+ Goal` 失败（返回 `false`）
- 如果 `Goal` 失败（返回 `false`），则 `\+ Goal` 成功（返回 `true`）

**第三步：** 评估子目标 `x = [x, y, z]`。这里，`x` 是原子，`[x, y, z]` 是列表。原子和列表在 Prolog 中是不同的数据类型，所以统一失败。在这个具体例子中，失败也意味着该语句是假的（类型不匹配是确定的）。

**第四步：** 因为 `x = [x, y, z]` 失败（返回 `false`），所以取反 `\+ x = [x, y, z]` 成功（返回 `true`）。

**结果：** 整个查询成功，答案为 `X = [x]`。

**关于 `\+` 操作符的说明：** 在 Prolog 中，成功返回 `true`，失败返回 `false`。`\+` 操作符就是取反操作符：它取反目标的结果。如果目标成功（`true`），其取反失败（`false`）；如果目标失败（`false`），其取反成功（`true`）。

**关于术语的说明：** Prolog 术语称之为"否定即失败"（negation as failure），但这个术语容易误导。`\+` 操作符就是取反操作符，将 `true` 翻转为 `false`，将 `false` 翻转为 `true`。"否定即失败"这个术语暗示"否定 = 失败"，这是不正确的。更准确的描述是："取反操作符"或"通过取反结果实现的否定"。

---

#### Question 7

**Which of the following is a variable in Prolog?**

a. All of these answers.
b. var x
c. 'X'
d. x
e. A ✓

**Explanation:** In Prolog, variables (变量) start with an uppercase letter or underscore; `A` is a variable, while `x` (lowercase) is an atom (原子), and `'X'` (quoted) is also an atom.

---

#### Question 8

**In Prolog, what is the difference between [a] and [h|[]]?**

a. [h|[]] is a syntax error and [a] is a list.
b. None of these answers.
c. Each is a one-element list with a different element. ✓
d. [a] has one element and [h|[]] has two elements.
e. There is no difference, as they both mean [a]

**Explanation:** `[a]` is a list containing the atom `a`, while `[h|[]]` is a list with head `h` and empty tail, so they are different one-element lists with different elements.

---

#### Question 9

**What is a functor in Prolog?**

a. The head of a clause that includes the :- symbol.
b. All of these answers.
c. None of these answers.
d. Any one of the arguments of a structure.
e. The name (an atom) at the beginning of a structure, together with its arity. ✓

**Explanation:** A functor (函子) in Prolog is the name and arity (元数) of a structure, such as `parent/2` where `parent` is the name and `2` is the arity indicating two arguments.

---

#### Question 10

**Which of the following statements is true about the anonymous variable in Prolog?**

a. All of these answers. ✓
b. None of these answers.
c. It is written as a single underscore, \_.
d. When a variable appears only once in a clause, it can be replaced by the anonymous variable to avoid the singleton variable warning.
e. When it occurs more than once in a clause, it can match different things.

**Explanation:** The anonymous variable `_` (匿名变量) is written as a single underscore, can replace singleton variables (单例变量) to avoid warnings, and each occurrence can match different values.

---

#### Question 11

**Which of the following statements about negation in Prolog is true, given some goal G?**

a. \+ G is safest if any variables within G are already instantiated. ✓
b. \+ G is safest if none of the variables within G are instantiated.
c. None of these answers.
d. \+ G will always fail if G contains uninstantiated variables.
e. \+ G will always succeed if G contains uninstantiated variables.

**Explanation:** Negation as failure `\+` (否定即失败) is safest when variables in G are instantiated (已实例化) because uninstantiated variables (未实例化变量) can lead to incorrect results.

---

#### Question 12

**What is the result of the following Prolog query? X is 7 + 2.**

a. X='7+2'
b. X=7+2
c. None of these answers.
d. X = '9'
e. X=9 ✓

**Explanation:** The `is` operator (算术求值运算符) evaluates the arithmetic expression `7 + 2` and binds X to the numeric result `9`, not the unevaluated expression.

---

#### Question 13

**What is the result of the following Prolog query? X = 1 + 5.**

a. X=1+5 ✓
b. X='1+5'
c. None of these answers.
d. X='6'
e. X=6

**Explanation:** The `=` operator performs unification (合一), not arithmetic evaluation, so X is bound to the structure `1+5` rather than the number `6`.

---

#### Question 14

**What is a structure generally in Prolog?**

a. Only the body of a clause that includes the :- symbol.
b. Only any clause that includes the :- symbol.
c. All of these answers.
d. None of these answers.
e. An object that has several components, namely, a functor and arguments. ✓

**Explanation:** A structure (结构) in Prolog is a compound term consisting of a functor (函子) and its arguments, such as `parent(john, mary)`.

---

#### Question 15

**What is the Closed World Assumption (CWA) in Prolog?**

a. All of these answers.
b. The assumption that the results of a specific query cannot change during a Prolog session.
c. The assumption that if something cannot be proven to be true, then it is false. ✓
d. The assumption that no new clauses will be added to a Prolog program while it is running.
e. None of these answers.

**Explanation:** The Closed World Assumption (CWA, 封闭世界假设) means that if a fact cannot be proven true from the knowledge base (知识库), it is assumed to be false.

---

#### Question 16

**What is the meaning of P :- Q, R. in a Prolog program?**

a. None of these answers.
b. P is true if Q and R are true.
c. If Q and R, then P.
d. All of these answers. ✓
e. From Q and R follows P.

**Explanation:** The rule `P :- Q, R.` means P is true if both Q and R are true, which can be read as "if Q and R, then P" or "P follows from Q and R".

---

#### Question 17

**How would we write if X is a student, then X is a person as a Prolog rule?**

a. isa(X,student) :- isa(X,person).
b. person(X) :- student(X). ✓
c. student(X) :- person(X).
d. X isa student :- X isa person.
e. student(X) :- X, person(X).

**Explanation:** The rule `person(X) :- student(X).` correctly states that if X is a student, then X is a person, following the logical implication direction.

---

#### Question 18

**What is the meaning of Q :- P. in a Prolog program?**

a. Q is true if P is true.
b. None of these answers. ✓
c. Q implies P.
d. If Q then P.
e. All of these answers.

**Explanation:** The rule `Q :- P.` means "Q is true if P is true" (Q if P), not "Q implies P" or "if Q then P", so none of the other options correctly describe it.

---

#### Question 19

**What is the difference between matching and unification?**

a. matching a variable with a structure involves checking to ensure the variable does not occur within the structure.
b. All of these answers.
c. None of these answers.
d. unification results in variable bindings, whereas matching results in variable values. ✓
e. There is no difference.

**Explanation:** Unification (合一) is the process of making two terms identical by binding variables, while matching (匹配) is a simpler concept; in Prolog, we use unification which creates variable bindings (变量绑定).

---

#### Question 20

**What would be the result of the following query in Prolog? \+ X = [X, Y, Z].**

a. Variable instantiation error.
b. true
c. None of these answers.
d. false ✓
e. X = []

**Explanation:** The query `\+ X = [X, Y, Z]` fails because X cannot be equal to a list containing itself (this would create a circular structure), so negation as failure (否定即失败) returns false.

---

#### Question 21

**Which of the following terms is a Prolog atom?**

a. None of these answers.
b. B
c. C.
d. var ✓
e. 3

**Explanation:** In Prolog, an atom (原子) is a constant identifier; `var` (lowercase) is an atom, while `B` and `C` (uppercase) are variables, and `3` is a number.

---

#### Question 22

**What would be the result of the following Prolog query? a _ b = _(a,b).**

a. a=a, b=b
b. None of these answers.
c. true
d. false
e. Syntax error ✓

**Explanation:** The expression `a _ b = _(a,b)` contains a syntax error because `_` (underscore) cannot be used as an infix operator between atoms in this way.

---

#### Question 23

**Which statement about the consult predicate in Prolog is true?**

a. All of these answers.
b. [file]. is an abbreviation for ['file.pl'].
c. When consulting, the special file user indicates the Prolog source code should be read from the user at the terminal.
d. [file]. is an abbreviation for consult(file).
e. It reads Prolog source code from a file. ✓

**Explanation:** The `consult` predicate (consult 谓词) loads Prolog source code from a file; `[file].` is an abbreviation for `consult(file).`, and `user` is a special file for terminal input.

---

#### Question 24

**What is the arity of a Prolog predicate?**

a. None of these answers.
b. The number of arguments the predicate takes. ✓
c. The number of clauses used to define the predicate.
d. The number of variables used to define the predicate.
e. The number of answers the predicate can produce when queried.

**Explanation:** The arity (元数) of a predicate is the number of arguments it takes, such as `parent/2` having arity 2.

---

#### Question 25

**What is meant by arity in Prolog?**

a. None of these answers.
b. All of these answers.
c. The number of answers that a query can produce.
d. The number of clauses that define a single predicate.
e. An integer associated with a functor or predicate, indicating its number of arguments. ✓

**Explanation:** Arity (元数) is an integer indicating the number of arguments a functor (函子) or predicate (谓词) takes, written as `name/arity`.

---

### From Quiz 1 (Questions 26-35)

#### Question 26

**Which of the following things is a prolog variable?**

a. None of these answers
b. a
c. 'Jack'
d. "Jack"
e. All of these answers

**Explanation:** None of these are Prolog variables (变量); `a` is an atom (原子), `'Jack'` is a quoted atom, and `"Jack"` is a string (字符串). Variables start with uppercase letters.

---

#### Question 27

**Which of the following things is a prolog atom, or constant?**

a. None of these answers
b. jack
c. All of these answers
d. \_jack
e. Jack

**Explanation:** All are atoms (原子) or constants: `jack` (lowercase atom), `Jack` (uppercase atom when quoted), and `\_jack` (atom starting with underscore followed by letters).

---

#### Question 28

**Which of the following things is a prolog atom, or constant?**

a. Var
b. All of these answers
c. None of these answers
d. A
e. var(a)

**Explanation:** All are atoms (原子): `Var` and `A` are atoms (not variables when used as constants), and `var(a)` is a structure (结构) with functor `var` and argument `a`.

---

#### Question 29

**Which of the following things is syntactically correct prolog?**

a. +(1,2)
b. that(X,4)
c. All of these answers
d. None of these answers
e. this(3,4)

**Explanation:** All are syntactically correct Prolog structures (结构): `+(1,2)` (infix operator as functor), `that(X,4)` (structure with variable), and `this(3,4)` (structure with constants).

---

#### Question 30

**Which of the following things is a prolog structure?**

a. None of these answers
b. triangle(A,B,C)
c. 3
d. All of these answers
e. a

**Explanation:** `triangle(A,B,C)` is a structure (结构) with functor `triangle` and three arguments; `3` is a number and `a` is an atom, not structures.

---

#### Question 31

**Which of the following is a correct prolog clause that would mean "c is true if a and b are true"?**

a. a,b:-c.
b. a:-b,c
c. :-c,a,b.
d. None of these answers
e. All of these answers

**Explanation:** None are correct; the correct syntax is `c :- a, b.` meaning "c is true if a and b are true". The other options have incorrect syntax or wrong direction.

---

#### Question 32

**Which of the following statements is true about prolog variables?**

a. None of these answers
b. The scope of a prolog variable is the set of clauses in the prolog program
c. All of these answers
d. The scope of a prolog variable is a single clause ending in a period
e. The scope of a prolog variable depends on how the variable is declared by the prolog programmer

**Explanation:** The scope (作用域) of a Prolog variable is a single clause (子句) ending in a period; variables are local to each clause and cannot be declared globally.

---

#### Question 33

**What does "scope" of a prolog variable mean?**

a. It means that all instances of a variable with the same name occurring in the same scope are the same value, and the scope of a non-anonymous variable is the whole set of prolog clauses in which it appears
b. None of these answers
c. It means that all instances of a non-anonymous variable with the same name occurring in the same scope are the same value, and the scope of a non-anonymous variable is the single prolog clause in which it appears
d. All of these answers
e. The scope of a variable governs the values that a prolog variable can take, for example, numbers versus strings.

**Explanation:** The scope (作用域) means all instances of a non-anonymous variable (非匿名变量) with the same name in the same scope share the same value, and the scope is the single clause (子句) in which it appears.

---

#### Question 34

**Which of the following statements is true?**

a. Declarative knowledge expressed as prolog clauses never has a procedural interpretation
b. Declarative knowledge expressed as prolog clauses always has a procedural interpretation that does not depend on the ordering of the clauses
c. None of these answers
d. All of these answers
e. Declarative knowledge expressed as prolog clauses does not depend on the ordering of the clauses, but in general the procedural interpretation of prolog clauses does depend on the ordering of the clauses

**Explanation:** Declarative knowledge (声明式知识) as Prolog clauses (子句) doesn't depend on clause ordering, but the procedural interpretation (过程式解释) does depend on ordering, affecting execution order and backtracking (回溯).

---

#### Question 35

**Which of the following statements is true?**

a. Prolog programs assume that a query will be issued to begin program execution, similarly to the way a Java program assumes its main method will be invoked to begin program execution
b. All of these answers
c. In order to implement iteration with prolog, the programmer needs to implement recursion, because prolog does not have a loop construct
d. None of these answers
e. Prolog programs rely on a prolog interpreter in order to run, analogously to how Java programs rely on a Java Virtual Machine in order to run

**Explanation:** All statements are true: Prolog uses queries (查询) to start execution, requires recursion (递归) for iteration since there are no loops, and relies on an interpreter (解释器) to run.

---

### From Quiz 2 (Questions 36-41)

#### Question 36

**Which of the following queries would not generate an error when issued to the SWI prolog interpreter?**

a. sort[(d,a),S].
b. sort([d,a],S). ✓
c. sort(d,a,S).
d. sort((d,a),S).

**Explanation:** `sort([d,a],S)` is correct syntax; `sort` expects a list as the first argument, and `[d,a]` is a proper list (列表) syntax.

---

#### Question 37

**Which of the following queries would generate an error when issued to the SWI prolog interpreter?**

a. member([c,a,d],[]).
b. member(c,[c,a,d]).
c. member([],[c,a,d]).
d. Member(a,[c,a,d]). ✓

**Explanation:** `Member` (uppercase) would generate an error because Prolog is case-sensitive and the built-in predicate (内置谓词) is `member` (lowercase), not `Member`.

---

#### Question 38

**Which of the following prolog queries would return true with a SWI prolog interpreter?**

a. sort([a,b,c],[a,b,c]). ✓
b. sort(a,[a,b,c]).
c. sort([a,b,c],[d,e,f]).
d. sort([a,b,c],[c,a,b]).

**Explanation:** `sort([a,b,c],[a,b,c])` returns true because the first list is already sorted, so it matches the sorted second list.

---

#### Question 39

**Which of the following queries would return false with a SWI prolog interpreter?**

a. sort([a,b],S).
b. sort([a,b],[b,a]). ✓
c. sort([],[]).
d. sort([],S).

**Explanation:** `sort([a,b],[b,a])` returns false because `[a,b]` sorted is `[a,b]`, not `[b,a]`, so the second argument doesn't match the sorted version.

---

#### Question 40

**Which of the following prolog rules is most likely to generate an infinite loop?**

a. member(A,[H|T]):-member(A,T).
b. member(A,[A|T]):-member(A,T).
c. transitive(A,C):-transitive(A,B),transitive(B,C). ✓
d. transitive(A,C):-joined(A,B),transitive(B,C).

**Explanation:** `transitive(A,C):-transitive(A,B),transitive(B,C)` is most likely to loop infinitely (无限循环) because it calls itself recursively without a base case (基础情况) or termination condition (终止条件).

---

#### Question 41

**Which of the following prolog rules is least likely to generate an infinite loop?**

a. visit([H|T]):-visit(T). ✓
b. visit(A):-visit(B).
c. visit(A,B):-visit(A,I),visit(I,B).
d. visit([H|T]):-visit(A),visit(T).

**Explanation:** `visit([H|T]):-visit(T)` is least likely to loop because it processes a list (列表) recursively with a decreasing argument (递减参数), eventually reaching the empty list base case.

---

### From Quiz 5 - Conjunctive Normal Form (Questions 42-51)

#### Question 42

**Which of the following is closer to Conjunctive Normal Form than the others?**

a. P ⊃ Q
b. ¬(P ∧ Q)
c. ¬(¬P ∧ Q)
d. ¬P ∨ ¬Q ✓
e. P ≡ Q

**Explanation:** `¬P ∨ ¬Q` is closest to Conjunctive Normal Form (CNF, 合取范式) as it's a disjunction (析取) of literals (文字), which is a clause (子句) in CNF.

---

#### Question 43

**Which of the following statements is true about converting to Conjunctive Normal Form?**

a. None of these answers
b. All of these answers
c. ¬∃x p(x) would be replaced with ¬p(x)
d. P ≡ Q would be replaced with ¬P ∨ Q
e. ∀x p(x) would be replaced with ¬p(x)

**Explanation:** None of these conversion statements are correct; they don't follow the proper steps for converting to CNF (合取范式), which involves eliminating implications, moving negations inward, and distributing disjunctions over conjunctions.

---

#### Question 44

**Which of the following is in Conjunctive Normal Form?**

a. ¬p(A)
b. p(A)
c. All of these answers ✓
d. ¬p(A(x))
e. None of these answers

**Explanation:** All are in CNF (合取范式) because they are single literals (文字) or negated literals, which are valid clauses (子句) in CNF (a conjunction of one clause).

---

#### Question 45

**Which of the following statements is true about converting to Conjunctive Normal Form?**

a. All of these answers
b. ∀x p(x) would be replaced with ¬p(x)
c. P ≡ Q would be replaced with ¬P ∨ Q
d. P ⊃ Q would be replaced with ¬P ∨ Q ✓
e. None of these answers

**Explanation:** When converting to CNF (合取范式), the implication `P ⊃ Q` (equivalent to `¬P ∨ Q`) is correctly replaced with `¬P ∨ Q`, which is a disjunction (析取) of literals.

---

#### Question 46

**Which of the following statements is true about converting to Conjunctive Normal Form?**

a. ∀x ∀y ∃z p(z) becomes p(A(x, y)) with a 2-place skolem function A ✓
b. All of these answers
c. ∀x p(x) would be replaced with ¬p(x)
d. P ≡ Q would be replaced with ¬P ∨ Q
e. None of these answers

**Explanation:** When eliminating existential quantifiers (存在量词) in CNF conversion, `∃z` under `∀x ∀y` is replaced with a Skolem function (Skolem 函数) `A(x,y)` that depends on the universally quantified variables (全称量词变量).

---

#### Question 47

**What is the Conjunctive Normal Form of ∀x∃y p(x) ⊃ q(y,x)?**

a. ¬p(x) ∨ q(y,x)
b. ¬p(x) ⊃ q(A(x),x) where A is a 1-place skolem function
c. ¬p(x) ∨ q(A(x),x) where A is a 1-place skolem function ✓
d. p(x) ⊃ q(A(x),x) where A is a 1-place skolem function
e. None of these answers

**Explanation:** Converting `∀x∃y p(x) ⊃ q(y,x)` to CNF (合取范式): first eliminate implication to `¬p(x) ∨ q(y,x)`, then Skolemize (Skolem 化) `∃y` with function `A(x)` to get `¬p(x) ∨ q(A(x),x)`.

---

#### Question 48

**Which of the following is in Conjunctive Normal Form?**

a. ∀x(p(x) ∨ q(x))
b. (p(x) ∨ (q(x) ∧ q(y)))
c. (p(x) ∨ q(x)) ∧ (p(x) ∨ q(y))
d. All of these answers ✓
e. None of these answers

**Explanation:** All are in CNF (合取范式): they are conjunctions (合取) of disjunctions (析取) of literals (文字), which is the definition of CNF.

---

#### Question 49

**What is the Conjunctive Normal Form of ∀x∀y p(x) ≡ q(y)?**

a. ∀x∀y(¬p(x) ∨ q(y)) ∧ (¬q(y) ∨ p(x))
b. None of these answers
c. (¬p(x) ∨ q(y)) ∧ (¬q(y) ∨ p(x)) ✓
d. ¬p(x) ∨ q(y) ∧ ¬q(y) ∨ p(x)
e. All of these answers

**Explanation:** The CNF (合取范式) of `∀x∀y p(x) ≡ q(y)` is `(¬p(x) ∨ q(y)) ∧ (¬q(y) ∨ p(x))` after converting the equivalence (等价) to two implications and eliminating quantifiers (量词).

---

#### Question 50

**Which of the following is in Conjunctive Normal Form?**

a. ∃x p(x)
b. None of these answers ✓
c. ¬∀x p(x)
d. All of these answers
e. ¬∃x p(x)

**Explanation:** None are in CNF (合取范式) because they contain quantifiers (量词) or negations of quantifiers, which must be eliminated before a formula can be in CNF.

---

#### Question 51

**Which of the following is in Conjunctive Normal Form?**

a. All of these answers ✓
b. None of these answers
c. ¬P ∨ Q
d. ¬P
e. ¬P ∨ ¬Q

**Explanation:** All are in CNF (合取范式): they are disjunctions (析取) of literals (文字), which are valid clauses (子句) in CNF (a conjunction of one or more clauses).

---

### From Quiz 2 - In-Class (Questions 52-61)

#### Question 52

**What would be the variable bindings associated with the following Prolog query? `[H|T] = [[a]].`**

a. H = [a], T = [a]
b. H = [], T = [a]
c. H = [a], T = [] ✓
d. H = a, T = []
e. No bindings because it would be false

**Explanation:** The list `[[a]]` has one element which is `[a]`, so `[H|T] = [[a]]` binds H to `[a]` (the head) and T to `[]` (the empty tail).

---

#### Question 53

**Given the builtin predicate `member(X, Y)` which means element X is a member of the list Y, which of the following queries would generate an error when issued to the SWI Prolog interpreter?**

a. `member([c,a,d],[]).` ✓
b. `Member(a,[c,a,d]).`
c. `member([],[c,a,d]).`
d. `member([],[[]]).`
e. `member(c, [c,a,d]).`

**Explanation:** `member([c,a,d],[])` would generate an error because `member/2` expects the first argument to be an element, not a list, and checking if a list is a member of an empty list is invalid.

---

#### Question 54

**Which of the following is a correct Prolog clause that would mean "c is true if a and b are true"?**

a. `a:-b.c.`
b. None of these answers
c. All of these answers
d. `c:-a,b.` ✓
e. `a.b:-c.`

**Explanation:** `c:-a,b.` is the correct syntax meaning "c is true if a and b are true", where `:-` is the implication operator (蕴含运算符) and `,` represents conjunction (合取).

---

#### Question 55

**Which of the following things is a NOT a Prolog variable?**

a. All of these answers
b. None of these answers
c. `_` ✓
d. `Abc`
e. `abc`

**Explanation:** `_` (single underscore) is the anonymous variable (匿名变量), not a regular variable; `Abc` (uppercase) is a variable, and `abc` (lowercase) is an atom (原子).

---

#### Question 56

**Which of the following things is a Prolog variable?**

a. `_abc` ✓
b. `_`
c. All of these answers
d. `A`
e. None of these answers

**Explanation:** `_abc` (underscore followed by letters) is a Prolog variable (变量); `_` alone is the anonymous variable (匿名变量), and `A` (uppercase) is also a variable.

---

#### Question 57

**Which of the following things is syntactically correct Prolog code?**

a. `This(That).`
b. None of these answers
c. All of these answers
d. `this(that).` ✓
e. `_(this).`

**Explanation:** `this(that).` is syntactically correct Prolog code (Prolog 代码) - a fact (事实) with a structure (结构) containing two atoms (原子); the others have syntax issues.

---

#### Question 58

**Assuming `person(X)` means that X is a person, what is the meaning of `person(X)` when it is in a Prolog code file, or when it is typed at a Prolog `|:` prompt?**

a. None of these answers
b. All of these answers
c. everything is a person ✓
d. something named "X" is a person
e. there is at least one thing that is a person

**Explanation:** When `person(X)` appears in a Prolog program file (程序文件), it means "everything is a person" (universal quantification, 全称量化) because X is universally quantified in the clause (子句).

---

#### Question 59

**Which of the following things is a Prolog variable?**

a. None of these answers ✓
b. `23`
c. All of these answers
d. `a`
e. `'Name'`

**Explanation:** None are Prolog variables (变量): `23` is a number (数字), `a` is an atom (原子), and `'Name'` is a quoted atom (引号原子), not variables.

---

#### Question 60

**Assuming `happy(X)` is true when X is happy, what is the meaning of `happy(X)` when it is typed at a `?-` prompt as a Prolog query?**

a. None of these answers
b. there is at least one thing that is happy ✓
c. everything is happy
d. All of these answers
e. something named "X" is happy

**Explanation:** When `happy(X)` is typed as a query (查询) at the `?-` prompt, it means "there is at least one thing that is happy" (existential quantification, 存在量化) because the query asks if such an X exists.

---

#### Question 61

**Given the builtin predicate `member(X, Y)` which means element X is a member of the list Y, which of the following Prolog queries would return true with a SWI Prolog interpreter?**

a. `member([],[]).`
b. `meinber([a,b,c],[d,e,f]).`
c. `member(d,[a,b,c]).`
d. `member([],[a,b,c,[]]).` ✓
e. `member([a],[c,a,b]).`

**Explanation:** `member([],[a,b,c,[]])` returns true because the empty list `[]` is an element in the list `[a,b,c,[]]`, so it is a member (成员) of that list.

---

### From Quiz 4 - In-Class (Questions 62-71)

#### Question 62

**Which of the following statements is true regarding Declarative knowledge and programming?**

a. Declarative knowledge takes the form of general facts and rules that are known to the programmer. ✓
b. Declarative knowledge is always procedural in nature.
c. Declarative knowledge cannot be expressed in Prolog.
d. All of these answers
e. None of these answers

**Explanation:** Declarative knowledge (声明式知识) consists of facts (事实) and rules (规则) that describe what is true, rather than how to compute it, and can be expressed in Prolog.

---

#### Question 63

**Which of the following is a benefit of using breadth-first search in planning?**

a. Breadth-first search always finds the optimal solution faster than depth-first search.
b. Breadth-first search tries shortest plans first and will not go infinitely deep unnecessarily. ✓
c. Breadth-first search uses less memory than depth-first search.
d. All of these answers
e. None of these answers

**Explanation:** Breadth-first search (广度优先搜索) explores shorter plans (计划) first before longer ones, preventing infinite depth exploration (无限深度探索) and ensuring termination if a solution exists.

---

#### Question 64

**Which of the following statements is true regarding axioms?**

a. Axioms are only used in mathematical proofs.
b. Axioms cannot be expressed in logical form.
c. All of these answers
d. Axioms are the logical statements we make when representing a domain like the blocks world. ✓
e. None of these answers

**Explanation:** Axioms (公理) are logical statements (逻辑语句) used to represent knowledge about a domain (领域), such as the blocks world (积木世界), specifying facts and rules about the domain.

---

#### Question 65

**Why are function symbols 'do' and 's' not used in Situation Calculus Prolog programs in the course?**

a. They are not part of the Situation Calculus formalization.
b. We take advantage of the parallels between Prolog's list structures and Situations when we implement Situations in Prolog. ✓
c. They cause infinite loops in Prolog.
d. All of these answers
e. None of these answers

**Explanation:** In Prolog implementations of Situation Calculus (情境演算), we use lists (列表) to represent situations (情境) directly, avoiding the need for function symbols `do` and `s` by leveraging Prolog's list structures (列表结构).

---

#### Question 66

**Which of the following statements is true regarding the Situation Calculus?**

a. Situation Calculus cannot represent actions.
b. All of these answers
c. Precondition Axioms specify the necessary conditions for action occurrences. ✓
d. None of these answers
e. Situation Calculus only works with propositional logic.

**Explanation:** Precondition Axioms (前提公理) in Situation Calculus (情境演算) specify when actions (动作) are possible, stating the necessary conditions (必要条件) for action occurrences (动作发生).

---

#### Question 67

**Which of the following statements is true regarding situations in the Situation Calculus?**

a. Situations represent a sequence of actions. ✓
b. Situations are only used in planning problems.
c. All of these answers
d. None of these answers
e. Situations cannot be represented in Prolog.

**Explanation:** Situations (情境) in Situation Calculus (情境演算) represent sequences of actions (动作序列), where each situation is the result of applying actions starting from the initial situation (初始情境).

---

#### Question 68

**What is the role of the predicate 'Poss' in the Situation Calculus?**

a. It takes an action and a situation as arguments, and it means that the action is possible in the situation. ✓
b. It represents the initial situation.
c. It specifies the effects of actions.
d. All of these answers
e. None of these answers

**Explanation:** The `Poss` predicate (Poss 谓词) in Situation Calculus (情境演算) takes an action (动作) and a situation (情境) as arguments and means the action is possible (可能的) in that situation, representing precondition axioms (前提公理).

---

#### Question 69

**Which of the following statements is true regarding procedural vs. declarative programs?**

a. Procedural programs are always more efficient than declarative programs.
b. Declarative programs cannot be executed.
c. All of these answers
d. None of these answers
e. A declarative program is concerned with describing the solution rather than listing an ordering of steps that would result in the solution. ✓

**Explanation:** Declarative programs (声明式程序) describe what the solution is, not how to compute it step-by-step, unlike procedural programs (过程式程序) which specify ordered operations.

---

#### Question 70

**What are fluents in the Situation Calculus?**

a. Fluents are actions that can be performed.
b. Fluents are situations in the domain.
c. All of these answers
d. Fluents represent statements whose truth value can change depending on the situation. ✓
e. None of these answers

**Explanation:** Fluents (流式谓词) in Situation Calculus (情境演算) are predicates (谓词) whose truth values (真值) can change across different situations (情境), representing dynamic properties of the world.

---

#### Question 71

**Which of the following statements is true regarding the Situation Calculus?**

a. Situation Calculus cannot handle multiple agents.
b. All of these answers
c. Successor State Axioms specify what is true after an action occurrence. ✓
d. None of these answers
e. Situation Calculus only works with first-order logic.

**Explanation:** Successor State Axioms (后继状态公理) in Situation Calculus (情境演算) specify how fluents (流式谓词) change after an action (动作) occurs, describing what is true in the resulting situation (情境).

---

## Part 2: Written/Programming Questions

### From Midterm Exam

#### Question 1: has_element(List,X) (6 marks)

**Without using any built-in predicate(s), write a Prolog predicate `has_element(List,X)` that is true whenever list `List` has element `X`.**

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

**Explanation:** This predicate (谓词) uses recursion (递归) to check if element X is in the list: the base case checks if X matches the head (头部), and the recursive case (递归情况) checks the tail (尾部).

---

#### Question 2: mylist(List) (5 marks)

**Without using any built-in predicate(s), write a Prolog predicate `mylist(List)` that is true whenever its single argument `List` is a list.**

**Solution:**

```prolog
mylist([]).
mylist([H|T]) :- mylist(T).
```

**Explanation:** This predicate (谓词) recursively checks if the argument is a list (列表): the empty list `[]` is a list, and `[H|T]` is a list if `T` is a list, using structural recursion (结构递归).

---

#### Question 3: Correcting mylength Predicate (6 marks)

**The following Prolog predicate mylength(List, Length) about the length of a list has errors/bugs. Re-write the procedure to correct the errors/bugs.**

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

#### Question 4: reachable Predicate (8 marks)

**Consider a world consisting of a set of islands that are connected by bridges. Two islands are connected if there is a bridge between them. Write a Prolog predicate reachable(Island1,Island2) which means that a person on island Island1 could walk over one or more bridges to reach island Island2. Assume there is an existing correctly-written Prolog predicate you can use (without writing it), bridge(Island1,Island2), which is true when island Island1 is connected to Island2 by a bridge.**

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

**Explanation:** This predicate (谓词) uses recursion (递归) to find reachability (可达性): directly via one bridge (桥), or indirectly by finding an intermediate island (中间岛屿) and recursively checking reachability from there.

---

## Part 3: Check Your Learning Questions from Lectures

### From Lecture 01: KR Intro

**Source: CST8503_01_KR_Intro.md**

#### Check Your Learning 1 (Page 12)

**How does the computer system obtain the relevant patterns in the data:**

- with supervised Machine Learning?
- with unsupervised Machine Learning?
- with Declarative programming?

---

#### Check Your Learning 2 (Page 17)

**What are three things that Knowledge Representation languages need to represent?**

**What else is needed besides Declarative Knowledge in order for a Declarative program to run?**

---

### From Lecture 02: Prolog Intro

**Source: CST8503_02_Prolog_Intro.md**

#### Check Your Learning 1 (Page 15)

**What built-in predicate do we use to load programs from files into the prolog interpreter?**

**When the user is consulted, to type facts/rules directly into a prolog interpreter, what happens to those facts/rules when the prolog interpreter is terminated?**

---

#### Check Your Learning 2 (Page 25)

**What is meant by the arity of a predicate?**

**What constitutes a prolog variable?**

**What is the closed world assumption?**

---

#### Check Your Learning 3 (Page 30)

**How would we write "if a then b" as a Prolog rule?**

**How would we write "if X is a student, then X is a person" as a Prolog rule?**

---

### From Lecture 03: Prolog Debugging

**Source: CST8503_03_Prolog_Debugging.md**

#### Check Your Learning 1 (Page 20)

**How does the user turn on goal tracing?**

**How does the user turn off goal tracing?**

**What command would abort the goal and return to the prolog prompt?**

---

#### Check Your Learning 2 (Page 22)

**How can the programmer turn on graphical tracing?**

**What is the difference between guitracer(0) and gtrace(0)?**

---

### From Lecture 04: Prolog Structures Matching

**Source: CST8503_04_Prolog_Structures_Matching.md**

#### Check Your Learning 1 (Page 19)

**What is the relationship between Prolog structures, and trees?**

**What is special about an anonymous variable?**

**What are the parts of a prolog structure called?**

Example: `this(that(0),theother)`

---

#### Check Your Learning 2 (Page 28)

**What is the difference between matching and unification?**

**What can an unbound Prolog variable match with?**

---

### From Lecture 05: Prolog Lists Ops Arith

**Source: CST8503_05_Prolog_Lists_Ops_Arith.md**

#### Check Your Learning 1 (Page 20)

**What is the difference between `'[|]'(a,[])` and `[a]`?**

**What is the difference between `[a]` and `[a|[ ]]`?**

---

#### Check Your Learning 2 (Page 28)

**What is the difference between the two following prolog statements:**

- `X is 3 + 4`
- `X = 3 + 4`

---

### From Lecture 08: Planning

**Source: CST8503_08_Planning.md**

#### Check Your Learning (Page 15)

**Why does a "normal" planning query not always terminate?**

**How does a breadth-first planning query address that problem?**

---

### From Lecture 09: KR Logic

**Source: CST8503_09_KR_Logic.md**

#### Check Your Learning 1 (Page 10)

**Fill in the truth table:**

---

#### Check Your Learning 2 (Page 29)

**Which of the following are FOL terms or not FOL terms:**

- → 𝑥
- 𝑥
- 𝑥 > 𝑦
- todd
- temperature_of(todd)
- loves(cathy,joseph)

---

#### Check Your Learning 3 (Page 31)

**If Higher-Order logics are more expressive, why do we limit ourselves to First-Order logic in this course?**

---

### From Lecture 10: Situation Calculus

**Source: CST8503_10_SituationCalculus.md**

#### Check Your Learning (Page 22)

**In plain English, what is being specified when Precondition Axioms are written down for a domain?**

**In plain English, what is being specified when Successor State Axioms are written down for a domain?**

**What is meant by "domain" in the above two questions?**

---

## Part 4: Lab and Assignment Examples

### Lab 1: Prolog Basics

**Source: Lab1 Prolog Basics/hello.txt**

#### Example Program

```prolog
hello(world).
```

---

### Lab 2: Debugging

**Source: Lab2 Debugging/**

#### Example 1: greater/2

```prolog
successor(two,   one).
successor(three, two).
successor(four,  three).
successor(five,  four).
successor(six,   five).
successor(seven, six).
successor(eight, seven).

greater(Y, X) :- successor(Y, X).
greater(Y, X) :- successor(Z, X), greater(Y, Z).
```

---

#### Example 2: mymember/2

```prolog
mymember(H, [H|_]).
mymember(H, [_|T]) :- mymember(H, T).
```

---

#### Example 3: tasty/1

```prolog
vegetables(carrot).
vegetables(cucumber).

bread(rye).
bread(wheat).

cake(carrot).
cake(chocolate).

tasty(X) :- vegetables(X), cake(X).
```

---

### Lab 3: Prolog Programming

**Source: Lab3 Prolog Programming/041107730_Lab3.txt**

#### Geometric Objects Program

```prolog
% ============================================================
% FACTS
% ============================================================

point_exists(point(1,1)).
point_exists(point(2,3)).
point_exists(point(3,2)).
point_exists(point(4,5)).
point_exists(point(2,6)).
point_exists(point(4,3)).
point_exists(point(4,6)).

% ============================================================
% RULES
% ============================================================

seg_exists(seg(P1,P2)) :-
    point_exists(P1),
    point_exists(P2),
    dif(P1,P2).

triangle_exists(triangle(A,B,C)) :-
    seg_exists(seg(A,B)),
    seg_exists(seg(B,C)),
    seg_exists(seg(A,C)).

rectangle_exists(rectangle(
    seg(point(X1,Y1), point(X1,Y2)),
    seg(point(X2,Y1), point(X2,Y2))
)) :-
    dif(X1,X2),
    dif(Y1,Y2),
    point_exists(point(X1,Y1)),
    point_exists(point(X1,Y2)),
    point_exists(point(X2,Y1)),
    point_exists(point(X2,Y2)).
```

---

### Lab 4: Prolog Lists

**Source: Lab4 Prolog Lists/lab4.txt**

#### List Operations Program

```prolog
% =========================================
% mycount(List, Count)
% =========================================

mycount([], 0).

mycount([_|T], N) :-
    var(N),
    mycount(T, N1),
    N is N1 + 1.

mycount(L, N) :-
    integer(N), N > 0,
    N1 is N - 1,
    L = [_|T],
    mycount(T, N1).

mycount([], N) :-
    integer(N),
    N =:= 0.

% =========================================
% nth(N, List, Item)
% =========================================

nth(N, List, Item) :-
    append(Prefix, [Item|_Rest], List),
    mycount(Prefix, K),
    N is K + 1.

% =========================================
% funnylist(L)
% =========================================

funnylist(L) :-
    length(S, 5),
    member(w, S),
    append(S, Mid, L),
    append(_, S, Mid).
```

---

### Lab 5: KR Blocks

**Source: Lab5 KR Blocks/CST8503_Lab5_KR_Blocks_EN.md**

#### Blocks World Planning Problem

**Overview:**

- Write a Prolog program that implements Knowledge Representation of a Blocks domain
- Solve a planning blocks world planning problem using Knowledge Representation and Prolog

**Domain Description:**

- There are three blocks: block(a), block(b), block(c)
- There are four positions: position(1), position(2), position(3), position(4)
- A position or block is considered clear if it has no block on top of it
- Initially: Block a is on Position 1, Block b is on Position 3, Block c is on Block a
- The robot can move a clear block from its current position to a new clear position or a new clear block

**Key Concepts:**

- **Fluents**: Predicates that take a situation (list of actions) argument in the last position
- **Actions**: move(Block, From, To) - move a block from one location to another
- **Precondition Axioms**: Specify when each action is possible
- **Successor State Axioms**: Specify how the state changes after each action
- **Planning**: Use breadth-first search to find a sequence of actions to achieve a goal

**Planning Procedure:**

```prolog
% plan(g(S),S) means that S is a plan to achieve g, where g is the goal state that depends on a Situation S.
plan(Goal,Plan) :- bposs(Plan), Goal.

bposs(S) :- tryposs([],S).

tryposs(S,S) :- poss(S).  % Note this uses single argument poss
tryposs(X,S) :- tryposs([_|X],S).
```

**Example Goals:**

- Move Block a to Position 2: `on(block(a), position(2), S)`
- Move Block a to Position 3: `on(block(a), position(3), S)`

#### Complete Blocks World Implementation

**Source: Lab5 KR Blocks/blocks_world_planning.txt**

```prolog
:- encoding(utf8).

:- discontiguous on/3.
:- discontiguous clear/2.

% ============================================================================
% Initial State: Starting positions of blocks
% ============================================================================

block_exists(block(a)).
block_exists(block(b)).
block_exists(block(c)).

location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).
location_exists(location(4)).

clear(block(c), []).
clear(block(b), []).
clear(location(2), []).
clear(location(4), []).

on(block(a), location(1), []).
on(block(b), location(3), []).
on(block(c), block(a), []).

% ============================================================================
% Precondition Axioms: When blocks can be moved
% ============================================================================

poss([]).

poss([move(Block,From,To)|S]):-
    poss(S),
    block_exists(Block),
    clear(Block,S),
    (location_exists(To) ; block_exists(To)),
    Block \= To,
    clear(To,S),
    (location_exists(From);block_exists(From)),
    on(Block,From,S).

% ============================================================================
% Successor State Axioms: How block positions change after moves
% ============================================================================

clear(X,[move(Z,X,Y)|S]):-
    poss([move(Z,X,Y)|S]).

clear(X, [A | S]) :-
    poss([A | S]),
    A \= move(_, _, X),
    clear(X, S).

on(X, Y, [move(X, Z, Y) | S]) :-
    poss([move(X, Z, Y) | S]).

on(X, Y, [A | S]) :-
    poss([A | S]),
    A \= move(X, Y, _),
    on(X, Y, S).

% ============================================================================
% Automatic Planning: Find shortest move sequence
% ============================================================================

plan(Goal, Plan) :-
    bposs(Plan),
    call(Goal).

bposs(S) :-
    tryposs([], S).

tryposs(S, S) :-
    poss(S).

tryposs(X, S) :-
    tryposs([_ | X], S).
```

---

### Assignment 1: Family Tree

**Source: Assignment 1 Family Tree/family_tree.txt**

#### Family Relationships Program

```prolog
% ==========================================
% Parent relationships
% ==========================================

parent(henry, joe).
parent(henry, susan).
parent(joe, brad).
parent(susan, jeff).
parent(julie, henry).

% ==========================================
% Gender facts
% ==========================================

male(henry).
male(joe).
male(brad).
male(jeff).

female(susan).
female(julie).

% ==========================================
% Derived rules
% ==========================================

grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

grandchild(Z, X) :- parent(X, Y), parent(Y, Z).

sister(X, Y) :- parent(Z, X), parent(Z, Y), female(X), X \= Y.

aunt(X, Z) :- sister(X, Y), parent(Y, Z).

ancestor(X, Z) :- parent(X, Z).

ancestor(X, Z) :- parent(X, Y), ancestor(Y, Z).
```

**Key Concepts:**

- **Facts**: Direct relationships (parent, gender)
- **Rules**: Derived relationships (grandparent, sister, aunt, ancestor)
- **Recursion**: Used in ancestor/2 to traverse the family tree

---

### Assignment 2: SitCalc Monkey

**Source: Assignment 2/CST8503_Assn2_SitCalc_Monkey.md**

#### Monkey and Bananas Problem

**Problem Description:**

- There is a monkey, a single bunch of bananas, and a box
- The monkey, box, and bananas are each at different locations (Locations 1, 2, and 3)
- The bananas are hanging too high for the monkey to reach
- If the monkey climbs on top of the box, the monkey can grab the bananas

**Actions:**

- The monkey can go to a specific location
- The monkey can push the box to a specific location
- The monkey can climb onto and climb off the box
- If the conditions are right, the monkey can grab the bananas

**Goal:**

- The monkey having the bananas: `has_bananas(y, S)`

**Key Steps:**

1. **Identify Fluents**: What facts represent the state of the world?

   - Location of monkey, box, bananas
   - Whether monkey is on box
   - Whether monkey has bananas

2. **Identify Actions**: What can the monkey do?

   - `go_to(Location)`
   - `push_box(Location)`
   - `climb_on_box`
   - `climb_off_box`
   - `grab_bananas`

3. **Precondition Axioms**: When is each action possible?

   - Example: `poss([grab_bananas|S]) :- monkey_at(bananas_location, S), on_box(y, S).`

4. **Successor State Axioms**: How does the state change after each action?

   - Example: `monkey_at(Loc, [go_to(Loc)|S]) :- poss([go_to(Loc)|S]).`

5. **Planning**: Use breadth-first search to find a plan

```prolog
plan(Goal,Plan):-bposs(Plan),Goal.

bposs(S) :- tryposs([],S).

tryposs(S,S) :- poss(S).
tryposs(X,S) :- tryposs([_|X],S).
```

#### Complete Monkey and Bananas Implementation

**Source: Assignment 2/monkey_bananas.txt**

```prolog
:- encoding(utf8).

:- discontiguous at/3.
:- discontiguous at/2.
:- discontiguous on_box/2.
:- discontiguous has_bananas/2.

% ============================================================================
% Domain Elements: Locations
% ============================================================================

location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).

% ============================================================================
% Initial State: Starting configuration
% ============================================================================

at(monkey, location(1), []).
at(box, location(2), []).
at(bananas, location(3)).

% ============================================================================
% Precondition Axioms: When actions can be performed
% ============================================================================

poss([]).

poss([go(L) | S]) :-
    poss(S),
    location_exists(L),
    \+ on_box(monkey, S).

poss([push(L) | S]) :-
    poss(S),
    location_exists(L),
    \+ on_box(monkey, S),
    at(monkey, MonkeyLoc, S),
    at(box, MonkeyLoc, S).

poss([climb_on | S]) :-
    poss(S),
    \+ on_box(monkey, S),
    at(monkey, MonkeyLoc, S),
    at(box, MonkeyLoc, S).

poss([climb_off | S]) :-
    poss(S),
    on_box(monkey, S).

poss([grab | S]) :-
    poss(S),
    on_box(monkey, S),
    \+ has_bananas(monkey, S),
    at(box, BoxLoc, S),
    at(bananas, BoxLoc).

% ============================================================================
% Successor State Axioms: How the world changes after actions
% ============================================================================

at(monkey, L, [go(L) | S]) :-
    poss([go(L) | S]).

at(monkey, L, [push(L) | S]) :-
    poss([push(L) | S]).

at(monkey, L, [A | S]) :-
    poss([A | S]),
    A \= go(_),
    A \= push(_),
    at(monkey, L, S).

at(box, L, [push(L) | S]) :-
    poss([push(L) | S]).

at(box, L, [A | S]) :-
    poss([A | S]),
    A \= push(_),
    at(box, L, S).

on_box(monkey, [climb_on | S]) :-
    poss([climb_on | S]).

on_box(monkey, [A | S]) :-
    poss([A | S]),
    A \= climb_off,
    on_box(monkey, S).

has_bananas(monkey, [grab | S]) :-
    poss([grab | S]).

has_bananas(monkey, [A | S]) :-
    poss([A | S]),
    has_bananas(monkey, S).

% ============================================================================
% Automatic Planning: Find shortest action sequence
% ============================================================================

plan(Goal, Plan) :-
    bposs(Plan),
    call(Goal).

bposs(S) :-
    tryposs([], S).

tryposs(S, S) :-
    poss(S).

tryposs(X, S) :-
    tryposs([_ | X], S).
```

---

### Assignment 3: KR Coffee

**Source: Assignment 3/CST8503_Assn3_KR_Coffee.md**

#### Coffee Making Domain

**Problem Description:**
A robot plans to make a cup of instant coffee. The robot needs to:

1. Open the cupboard, then take a cup from the cupboard and place it on the counter
2. Fill a kettle with water, and then plug the kettle in
3. After the robot waits for the water to boil, it will pour hot water into the cup
4. Add instant coffee to the cup
5. With the hot water and coffee in the cup, the robot can stir the coffee to complete the process

**Goal:**

- Make coffee from start to finish with at most 9 steps or actions
- Goal state: `coffee_ready(y, S)` or similar fluent indicating coffee is complete

**Key Steps:**

1. **Identify Fluents**:

   - Cupboard state (open/closed)
   - Cup location (cupboard/counter)
   - Kettle state (filled/empty, plugged/unplugged, boiled/not boiled)
   - Water in cup (yes/no)
   - Coffee in cup (yes/no)
   - Coffee stirred (yes/no)

2. **Identify Actions**:

   - `open_cupboard`
   - `take_cup`
   - `fill_kettle`
   - `plug_kettle`
   - `wait_for_boil`
   - `pour_water`
   - `add_coffee`
   - `stir_coffee`

3. **Precondition Axioms**: Specify when each action is possible

   - Example: `poss([take_cup|S]) :- cupboard_open(y, S), cup_in_cupboard(y, S).`

4. **Successor State Axioms**: Specify how state changes after each action

   - Example: `cupboard_open(y, [open_cupboard|S]) :- poss([open_cupboard|S]).`

5. **Initial State**: Specify the initial values of all fluents

   - Example: `cupboard_open(n, []).`, `cup_in_cupboard(y, []).`

6. **Planning**: Use breadth-first search to find a sequence of actions

```prolog
plan(g(S),S):- bposs(S), g(S).

bposs(S) :- tryposs([],S).

tryposs(S,S) :- poss(S).
tryposs(X,S) :- tryposs([_|X],S).
```

#### Complete Coffee Making Implementation

**Source: Assignment 3/coffee_making.txt**

```prolog
:- encoding(utf8).

:- discontiguous cupboard_open/1.
:- discontiguous cup_location/2.
:- discontiguous kettle_filled/1.
:- discontiguous kettle_plugged/1.
:- discontiguous water_boiled/1.
:- discontiguous cup_has_water/1.
:- discontiguous cup_has_coffee/1.
:- discontiguous coffee_stirred/1.

% ============================================================================
% Initial State: Starting configuration
% ============================================================================

cup_location(cupboard, []).

% ============================================================================
% Precondition Axioms: When actions can be performed
% ============================================================================

poss([]).

poss([open_cupboard | S]) :-
    poss(S),
    \+ cupboard_open(S).

poss([take_cup | S]) :-
    poss(S),
    cupboard_open(S),
    cup_location(cupboard, S).

poss([place_cup_on_counter | S]) :-
    poss(S),
    cup_location(in_hand, S).

poss([fill_kettle | S]) :-
    poss(S),
    \+ kettle_filled(S).

poss([plug_kettle | S]) :-
    poss(S),
    kettle_filled(S),
    \+ kettle_plugged(S).

poss([wait_for_boil | S]) :-
    poss(S),
    kettle_plugged(S),
    \+ water_boiled(S).

poss([pour_water | S]) :-
    poss(S),
    water_boiled(S),
    cup_location(counter, S),
    \+ cup_has_water(S).

poss([add_coffee | S]) :-
    poss(S),
    cup_location(counter, S),
    \+ cup_has_coffee(S).

poss([stir_coffee | S]) :-
    poss(S),
    cup_has_water(S),
    cup_has_coffee(S),
    \+ coffee_stirred(S).

% ============================================================================
% Successor State Axioms: How the world changes after actions
% ============================================================================

cupboard_open([open_cupboard | S]) :-
    poss([open_cupboard | S]).

cupboard_open([A | S]) :-
    poss([A | S]),
    A \= open_cupboard,
    cupboard_open(S).

cup_location(in_hand, [take_cup | S]) :-
    poss([take_cup | S]).

cup_location(counter, [place_cup_on_counter | S]) :-
    poss([place_cup_on_counter | S]).

cup_location(Loc, [A | S]) :-
    poss([A | S]),
    A \= take_cup,
    A \= place_cup_on_counter,
    cup_location(Loc, S).

kettle_filled([fill_kettle | S]) :-
    poss([fill_kettle | S]).

kettle_filled([A | S]) :-
    poss([A | S]),
    A \= fill_kettle,
    kettle_filled(S).

kettle_plugged([plug_kettle | S]) :-
    poss([plug_kettle | S]).

kettle_plugged([A | S]) :-
    poss([A | S]),
    A \= plug_kettle,
    kettle_plugged(S).

water_boiled([wait_for_boil | S]) :-
    poss([wait_for_boil | S]).

water_boiled([A | S]) :-
    poss([A | S]),
    A \= wait_for_boil,
    water_boiled(S).

cup_has_water([pour_water | S]) :-
    poss([pour_water | S]).

cup_has_water([A | S]) :-
    poss([A | S]),
    A \= pour_water,
    cup_has_water(S).

cup_has_coffee([add_coffee | S]) :-
    poss([add_coffee | S]).

cup_has_coffee([A | S]) :-
    poss([A | S]),
    A \= add_coffee,
    cup_has_coffee(S).

coffee_stirred([stir_coffee | S]) :-
    poss([stir_coffee | S]).

coffee_stirred([A | S]) :-
    poss([A | S]),
    A \= stir_coffee,
    coffee_stirred(S).

% ============================================================================
% Automatic Planning: Find shortest action sequence
% ============================================================================

plan(Goal, Plan) :-
    bposs(Plan),
    call(Goal).

bposs(S) :-
    tryposs([], S).

tryposs(S, S) :-
    poss(S).

tryposs(X, S) :-
    tryposs([_ | X], S).

% ============================================================================
% Goal State: Coffee is ready
% ============================================================================

coffee_ready(S) :-
    coffee_stirred(S),
    cup_has_water(S),
    cup_has_coffee(S).
```

**Key Concepts:**

- Situation Calculus axiomatization
- Precondition and Successor State Axioms
- Breadth-first planning
- Representing a practical domain (coffee making) using logic
