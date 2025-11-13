# CST8503 Situation Calculus & Planning - Exam Question Bank

> **Exam Instructions**: This question bank focuses on Situation Calculus and Planning topics, including 30 multiple choice questions, 10 fill-in-the-blank questions, short answer questions, and Prolog programming questions.
>
> **Total Points**: 60 points
>
> - Multiple Choice: 30 points (1 point each)
> - Fill-in-the-Blank: 10 points (1 point each)
> - Short Answer: 15 points
> - Prolog Programming: 5 points

---

## 📝 Part 1: Multiple Choice Questions

**Instructions**: 1 point each, 30 points total. Choose the best answer.

### Question 1

**Source: Situation Calculus - Introduction**

What is the Situation Calculus?

- A. A second-order predicate language for static worlds
- B. A first-order predicate language for representing and reasoning about dynamical worlds
- C. A programming language for creating AI systems
- D. A type of machine learning algorithm

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Situation calculus is a first-order predicate language designed specifically for representing and reasoning about dynamical worlds - environments where things change over time due to actions.

**Detailed Explanation**:

- First introduced by John McCarthy in 1963
- Developed further by the KR group at the University of Toronto (Ray Reiter, Hector Levesque)
- Unlike traditional logic that describes static facts, situation calculus allows us to express "what happens after performing an action"

</details>

---

### Question 2

**Source: Situation Calculus - Basic Elements**

Which of the following are the three basic elements of situation calculus?

- A. Actions, States, and Goals
- B. Actions, Fluents, and Situations
- C. Predicates, Functions, and Variables
- D. Objects, Relations, and Conditions

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The three basic elements of situation calculus are:

1. **Actions** - Operations that can be performed in the world
2. **Fluents** - Predicates describing world state that change over time
3. **Situations** - Action histories representing sequences of executed actions

**Detailed Explanation**:

- Actions are the only mechanism for changing the world
- Fluents are "fluid" predicates whose truth values change as actions are executed
- Situations record "what happened" to determine "what the current state is"

</details>

---

### Question 3

**Source: Situation Calculus - Situations**

In modern situation calculus, what does a situation represent?

- A. The current state of the world
- B. A snapshot of all fluent values
- C. An action history or course of action
- D. A goal to be achieved

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: In modern situation calculus, a situation is an action history - a sequence of actions that have been executed, not the state itself.

**Detailed Explanation**:

- **Important distinction**: Situation ≠ State
- States describe "what is," situations describe "how we got here"
- The same state may be reached by different action sequences, but each sequence is unique
- From action history we can deduce current state, but from state alone we cannot deduce history

</details>

---

### Question 4

**Source: Situation Calculus - Situations**

What does the special symbol `S₀` (or `[]` in Prolog) represent?

- A. The final situation after all actions
- B. The initial situation where no actions have occurred
- C. An undefined situation
- D. An error state

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: S₀ (or `[]` in Prolog notation) represents the initial situation where no actions have occurred yet - the starting point for all action histories.

**Detailed Explanation**:

- All situations are built from S₀ using the `do` function
- Example: `do(pick_up(b1), S₀)` represents executing pick_up on the initial situation
- In Prolog, we use the empty list `[]` for convenience

</details>

---

### Question 5

**Source: Situation Calculus - Situations**

How should the situation `do(put_down(b1), do(move(x,y), do(pick_up(b1), S)))` be read?

- A. Put down b1, then move(x,y), then pick up b1
- B. Pick up b1, then move(x,y), then put down b1
- C. All actions happen simultaneously
- D. The order doesn't matter

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Situations are read inside-out (right to left): starting from S, first execute pick_up(b1), then move(x,y), finally put_down(b1).

**Detailed Explanation**:

- Written outside-in, but read inside-out (like peeling an onion)
- The innermost `do` is the first action
- The outermost `do` is the last action
- In Prolog list notation: `[put_down(b1), move(x,y), pick_up(b1)]` reads right to left

</details>

---

### Question 6

**Source: Situation Calculus - Fluents**

Why are predicates that describe world state called "fluents"?

- A. Because they flow from one situation to another
- B. Because their truth values are fluid/change due to actions
- C. Because they describe fluid dynamics
- D. Because they are flexible in their definitions

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Fluents are called "fluent" because their truth values flow/change as actions are executed. The name comes from Latin "fluere" meaning "to flow."

**Detailed Explanation**:

- Unlike static predicates (e.g., "2+2=4"), fluents are dynamic
- A fluent may be true in one situation and false in another
- Examples: `on(b1,b2,s)`, `clear(b1,s)`, `holding(b3,s)`
- All fluents must include a situation parameter as their last argument

</details>

---

### Question 7

**Source: Situation Calculus - Fluents**

Which of the following is a properly formed fluent?

- A. `on(block(b1), block(b2))`
- B. `clear(block(b1))`
- C. `holding(block(b3), s)`
- D. `move(b1, b2, b3)`

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: A fluent must include a situation parameter. `holding(block(b3), s)` is the only option that includes the situation `s` as the last argument.

**Detailed Explanation**:

- Options A and B are missing the situation parameter
- Option D is an action, not a fluent
- Fluents describe state; actions describe change

</details>

---

### Question 8

**Source: Situation Calculus - Action Schema**

In the blocks world, why do we use an action schema like `move(Block,Src,Dst)` instead of listing all individual actions?

- A. To save memory
- B. To represent many individual actions with a single expression
- C. Because Prolog requires schemas
- D. To make the code run faster

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: An action schema is a template representing many individual actions with a single expression, making the representation more concise and general.

**Detailed Explanation**:

- With 3 blocks and 7 positions (3 blocks + 4 locations), there are 3×7×7 = 147 possible moves
- One schema `move(Block,Src,Dst)` captures all of them
- More maintainable: when blocks/positions change, only parameters need updating
- Not all 147 combinations are valid; preconditions filter which actions are executable

</details>

---

### Question 9

**Source: Situation Calculus - Axioms**

What are axioms in the context of situation calculus?

- A. Mathematical theorems that need to be proved
- B. Initial statements (logical formulae) that we make when representing a domain
- C. Prolog syntax rules
- D. Error messages in the system

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Axioms are the foundational statements and rules we establish when describing a domain - like the basic rules in a game manual.

**Detailed Explanation**:

- Axioms don't need proof; they serve as the starting point for reasoning
- They describe what can be done under what conditions and what happens after actions
- Like an operations manual for a robot, specifying rules to follow in that domain

</details>

---

### Question 10

**Source: Situation Calculus - Precondition Axioms**

What is the general form of a precondition axiom?

- A. `Poss(A(x⃗), s) ≡ Φ(x⃗, s)`
- B. `R(y⃗, do(A(x⃗), s)) ≡ γ(y⃗, A(x⃗), s)`
- C. `do(a, s) → s`
- D. `Fluent(x, s) ⊃ Action(x)`

<details>
<summary>View Answer</summary>

**Answer: A**

**Explanation**: The general form of a precondition axiom is `Poss(A(x⃗), s) ≡ Φ(x⃗, s)`, which states that action A is possible in situation s if and only if conditions Φ are satisfied.

**Detailed Explanation**:

- `Poss(A(x⃗), s)` means "action A is possible in situation s"
- `≡` means "if and only if" (biconditional)
- `Φ(x⃗, s)` is a logical formula using fluents to characterize when A is possible
- This prevents invalid/impossible actions from being considered

</details>

---

### Question 11

**Source: Situation Calculus - Precondition Axioms**

In the blocks world precondition axiom for `move(Block,From,To)`, which condition is NOT required?

- A. The block must exist
- B. The block must be clear
- C. The block must be red
- D. The destination must be clear

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: The color of the block is not relevant to whether it can be moved. Required conditions include: block exists, block is clear, destination exists and is clear, block is at source position.

**Detailed Explanation**:
Required preconditions:

- `block_exists(Block)` - Block must exist
- `clear(Block,S)` - Block must be clear (nothing on top)
- `clear(To,S)` - Destination must be clear
- `on(Block,From,S)` - Block must actually be at source
- `Block \= To` - Cannot move block onto itself

</details>

---

### Question 12

**Source: Situation Calculus - Successor State Axioms**

What do successor state axioms describe?

- A. When actions can be executed
- B. How world state changes after executing an action
- C. The initial state of the world
- D. The goal conditions to achieve

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Successor state axioms describe how world state changes after executing an action - they specify the effects of actions.

**Detailed Explanation**:

- For each fluent, we specify: when it becomes true, false, or remains unchanged
- Precondition axioms tell us "when can we do it"
- Successor state axioms tell us "what happens after we do it"
- Together they completely describe an action's executability and effects

</details>

---

### Question 13

**Source: Situation Calculus - Successor State Axioms**

A successor state axiom for fluent R states that R is true after action A if and only if:

- A. A makes R true
- B. R was already true
- C. A makes R true, OR (R was already true AND A does not make R false)
- D. A is possible in the current situation

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: The successor state axiom covers two cases: (1) the action makes R true (positive effect), or (2) R was already true and the action doesn't make R false (persistence).

**Detailed Explanation**:
This formula addresses the Frame Problem:

- **Case 1**: Action's direct effect makes R true
- **Case 2**: R persists because it was true and the action doesn't falsify it
- This avoids listing everything that doesn't change (which would be vast)

</details>

---

### Question 14

**Source: Situation Calculus - Successor State Axioms**

In the successor state axiom for `on(X,Y,S)`, when does `on(BlockA, BlockC, s')` become true after executing action A?

- A. Only if A = move(BlockA, BlockB, BlockC)
- B. Only if on(BlockA, BlockC, s) was already true
- C. If A = move(BlockA, BlockB, BlockC) OR (on(BlockA, BlockC, s) was true AND A ≠ move(BlockA, BlockC, \_))
- D. Whenever any move action is executed

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: `on(BlockA, BlockC, s')` is true if either: (1) the action moved BlockA to BlockC, or (2) BlockA was already on BlockC and the action didn't move it away.

**Detailed Explanation**:

- **Positive effect**: `A = move(BlockA, BlockB, BlockC)` makes it true
- **Persistence**: `on(BlockA, BlockC, s) ∧ ¬(A = move(BlockA, BlockC, _))` keeps it true
- Other actions don't affect the `on` relationship

</details>

---

### Question 15

**Source: Situation Calculus - Domain Axiomatization**

What is meant by "axiomatizing a domain"?

- A. Proving mathematical theorems about the domain
- B. Writing down statements that define what is true about a domain
- C. Creating a database of all possible states
- D. Optimizing the domain for performance

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Axiomatizing a domain means writing down logical statements (axioms) that define what is true about a domain - creating a "rulebook" for the AI system.

**Detailed Explanation**:
A domain is a specific area of knowledge (e.g., blocks world, taxi world, kitchen world)

- Axioms enable computers to understand domain rules and relationships
- They support reasoning (deducing new facts) and planning (reaching goal states)
- Must be complete, accurate, and concise

</details>

---

### Question 16

**Source: Situation Calculus - Domain Axiomatization Steps**

What are the correct steps to axiomatize a domain, in order?

- A. Actions → Fluents → Preconditions → Initial State → Successor States
- B. Understand domain → Fluents → Actions → Preconditions → Successor States → Initial State
- C. Initial State → Actions → Fluents → Preconditions → Successor States
- D. Preconditions → Successor States → Actions → Fluents → Initial State

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The correct order is:

1. Understand the domain
2. Determine fluents (state description)
3. Determine actions (change mechanisms)
4. Determine precondition axioms (execution conditions)
5. Determine successor state axioms (change laws)
6. Determine initial state (starting point)

**Detailed Explanation**:

- Start by understanding what you're modeling
- Identify what needs tracking (fluents)
- Identify what can change things (actions)
- Define when changes can happen (preconditions)
- Define what changes occur (successor states)
- Define the starting point (initial state)

</details>

---

### Question 17

**Source: Planning - Introduction**

What is planning in artificial intelligence?

- A. Writing code to implement a system
- B. Finding a sequence of actions to achieve a goal state from an initial state
- C. Organizing project tasks and deadlines
- D. Debugging errors in a program

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Planning is the problem of finding a sequence of actions that transforms an initial state into a desired goal state.

**Detailed Explanation**:

- Like planning a route on a map or deciding steps to accomplish a task
- Planning systems can automatically find action sequences
- Examples: robots planning object movements, autonomous vehicles planning routes, game AI planning strategies

</details>

---

### Question 18

**Source: Planning - Blocks World**

In the blocks world planning problem, what does `clear(X, S)` mean?

- A. Block X is transparent
- B. Block X has been removed from the world
- C. Position X has nothing on top of it in situation S
- D. Block X is ready to be deleted

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: `clear(X, S)` is a fluent meaning that position X (which can be a block or location) has nothing on top of it in situation S.

**Detailed Explanation**:

- A clear block can be moved
- A clear location can have something placed on it
- "Clear" is essential for determining valid moves in planning

</details>

---

### Question 19

**Source: Planning - Prolog Implementation**

Why might the query `?- clear(location(3), S).` cause a stack overflow in depth-first planning?

- A. The query syntax is incorrect
- B. Location 3 doesn't exist
- C. Depth-first search may explore infinite sequences of actions
- D. There are too many blocks in the world

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Depth-first search can get stuck exploring infinitely long plans (like moving blocks back and forth repeatedly) without finding a solution, eventually running out of stack space.

**Detailed Explanation**:

- Depth-first explores one path as deep as possible before backtracking
- Actions can undo each other, creating cycles (move b to location 2, move b back to 3, repeat...)
- Without cycle detection, it keeps going deeper until stack overflow occurs

</details>

---

### Question 20

**Source: Planning - Search Strategies**

What is the main advantage of breadth-first search over depth-first search in planning?

- A. Breadth-first uses less memory
- B. Breadth-first runs faster
- C. Breadth-first avoids infinite descent by exploring all plans of a given length before increasing the length
- D. Breadth-first finds longer plans

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Breadth-first search explores all plans of length N before trying length N+1, avoiding the problem of getting stuck in infinitely long branches.

**Detailed Explanation**:

- Explores level-by-level like ripples spreading out
- Guarantees finding the shortest solution
- Complete: if a solution exists with finite length, breadth-first will find it
- Trade-off: requires more memory to store all plans of current length

</details>

---

### Question 21

**Source: Planning - Breadth-First Strategy**

In breadth-first planning, what order are plans explored?

- A. Longest plans first, then shorter plans
- B. Random order
- C. All plans of length 1, then all plans of length 2, then length 3, etc.
- D. Most promising plans first based on heuristics

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Breadth-first planning systematically explores all plans of increasing length: first all 1-action plans, then all 2-action plans, and so on.

**Detailed Explanation**:

- Level 0: Initial situation (no actions)
- Level 1: All single-action plans
- Level 2: All 2-action plans
- Level N: All N-action plans
- Stops when a plan satisfies the goal

</details>

---

### Question 22

**Source: Planning - Prolog Implementation**

What does the following Prolog code implement?

```prolog
tryposs(S, S) :- poss(S).
tryposs(X, S) :- tryposs([_|X], S).
```

- A. Depth-first search
- B. Breadth-first search
- C. Random search
- D. Binary search

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: This code implements breadth-first search by systematically trying plans of increasing length through backtracking.

**Detailed Explanation**:

- Base case: `tryposs(S, S)` checks if S is a valid plan
- Recursive case: `tryposs([_|X], S)` tries with one more action
- Through backtracking, tries: `[]`, `[_]`, `[_,_]`, `[_,_,_]`, etc.
- This explores all plans of length N before trying length N+1

</details>

---

### Question 23

**Source: Planning - Depth-First vs Breadth-First**

Why can depth-first planning get stuck in cycles?

- A. Because Prolog has a bug
- B. Because actions can undo each other, creating infinite loops
- C. Because the initial state is incorrect
- D. Because the goal is unreachable

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Actions can often undo other actions (e.g., move b to location 2, then move it back to location 3), creating cycles that depth-first search can explore forever.

**Detailed Explanation**:
Without cycle detection:

- Depth-first keeps exploring longer paths
- May repeatedly visit the same states in different orders
- Creates infinitely long plans without finding a solution
- Eventually causes stack overflow

</details>

---

### Question 24

**Source: Planning - Completeness**

What does it mean for a search strategy to be "complete"?

- A. It finds all possible solutions
- B. It runs without errors
- C. If a solution exists with finite length, the strategy will find it
- D. It finds solutions quickly

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: A complete search strategy guarantees that if a solution exists with finite length, the strategy will eventually find it.

**Detailed Explanation**:

- Breadth-first search is complete for planning problems
- Depth-first search is not complete (may get stuck in infinite branches)
- Completeness doesn't guarantee efficiency, just eventual success

</details>

---

### Question 25

**Source: Planning - Optimality**

If breadth-first planning finds a solution, what can we say about it?

- A. It's the fastest plan to execute
- B. It's the only possible plan
- C. It's guaranteed to be among the shortest possible plans
- D. It uses the least memory

<details>
<summary>View Answer</summary>

**Answer: C**

**Explanation**: Breadth-first search explores plans in order of increasing length, so the first solution found is guaranteed to be among the shortest.

**Detailed Explanation**:

- Explores all 1-action plans before any 2-action plans
- Explores all 2-action plans before any 3-action plans
- Therefore, the first solution found has minimum length
- This is called "optimal" with respect to plan length

</details>

---

### Question 26

**Source: Situation Calculus - Prolog Conventions**

In Prolog situation calculus implementations, why do we represent situations as lists?

- A. Because Prolog only supports lists
- B. For efficiency and to use Prolog's built-in list operations
- C. Because the textbook requires it
- D. To make debugging easier

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: Using lists makes the representation more concise, readable, and allows use of rich Prolog list operations like append, member, etc.

**Detailed Explanation**:
Conversion rules:

- Initial situation S → empty list `[]`
- `do(a,s)` → `[a|s]` (list constructor)
- Nested `do` functions become linear lists
- More idiomatic Prolog style

</details>

---

### Question 27

**Source: Situation Calculus - Prolog Implementation**

What does `poss([move(Block,From,To)|S])` check?

- A. Whether the move action has been executed
- B. Whether the move action is possible in situation S
- C. Whether the block exists
- D. Whether the situation is valid

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: `poss([move(Block,From,To)|S])` checks whether the move action satisfies all preconditions in situation S.

**Detailed Explanation**:
The precondition axiom checks:

- Block exists and is clear
- Destination exists and is clear
- Block is not being moved onto itself
- Block is actually at the source position

</details>

---

### Question 28

**Source: Planning - Successor State Axioms**

In the successor state axiom for `clear(X,S)`, what does the rule `clear(X,[move(Z,X,Y)|S]) :- poss([move(Z,X,Y)|S])` mean?

- A. X becomes clear if we move something TO X
- B. X becomes clear if we move something FROM X
- C. X stays clear after any move
- D. X is never clear

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: This rule states that position X becomes clear when we move block Z FROM X to Y, because removing something from X makes it clear.

**Detailed Explanation**:

- `move(Z,X,Y)` means move block Z from position X to position Y
- After this move, X has nothing on it anymore
- Therefore X is clear
- This is the "positive effect" rule for the clear fluent

</details>

---

### Question 29

**Source: Planning - Persistence**

What is the "persistence" rule in successor state axioms?

- A. Plans must be saved to disk
- B. Fluents that were true stay true unless an action makes them false
- C. Actions persist forever once executed
- D. The system never forgets the initial state

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The persistence rule states that things that were true remain true unless an action specifically changes them - addressing the Frame Problem.

**Detailed Explanation**:
Example for `on(X,Y,S)`:

```prolog
on(X,Y,[A|S]) :- poss([A|S]), A \= move(X,Y,_), on(X,Y,S).
```

- X stays on Y if it was on Y before
- AND the action doesn't move X away from Y
- This avoids having to list every action that doesn't affect on(X,Y)

</details>

---

### Question 30

**Source: Planning - Frame Problem**

What is the Frame Problem that successor state axioms help solve?

- A. How to draw boxes around objects
- B. How to specify what changes and what stays the same after actions without listing everything
- C. How to create efficient data structures
- D. How to optimize Prolog queries

<details>
<summary>View Answer</summary>

**Answer: B**

**Explanation**: The Frame Problem is about efficiently specifying what changes and what persists after actions, without having to explicitly list every fact that doesn't change.

**Detailed Explanation**:

- In a complex world, most things don't change when an action occurs
- Listing everything that doesn't change would be impractical
- Successor state axioms solve this by:
  - Explicitly stating what makes a fluent true/false
  - Using persistence rules: "stays true unless made false"
- This compact representation is manageable and complete

</details>

---

## 📝 Part 2: Fill-in-the-Blank Questions

**Instructions**: 1 point each, 10 points total. Fill in the blanks with the most appropriate answer.

### Question 31

**Source: Situation Calculus - Basic Elements**

The three basic elements of situation calculus are \***\*\_\_\*\***, fluents, and situations.

<details>
<summary>View Answer</summary>

**Answer**: actions

**Explanation**: The three basic elements are actions (operations that change the world), fluents (predicates describing world state), and situations (action histories).

</details>

---

### Question 32

**Source: Situation Calculus - Fluents**

Fluents are predicates that take a \***\*\_\_\*\*** argument and represent statements whose truth value changes due to actions.

<details>
<summary>View Answer</summary>

**Answer**: situation

**Explanation**: All fluents must include a situation parameter as their last argument because their truth values depend on which situation (action history) we're in.

</details>

---

### Question 33

**Source: Situation Calculus - Situations**

In modern situation calculus, a situation represents an \***\*\_\_\*\*** \***\*\_\_\*\***, not a state.

<details>
<summary>View Answer</summary>

**Answer**: action history

**Explanation**: A key distinction in modern situation calculus is that situations represent action histories (sequences of actions) rather than states (descriptions of how the world is).

</details>

---

### Question 34

**Source: Situation Calculus - Initial Situation**

The special symbol \***\*\_\_\*\*** (or `[]` in Prolog) represents the initial situation where no actions have occurred.

<details>
<summary>View Answer</summary>

**Answer**: S₀ or S (accept either)

**Explanation**: S₀ (S-zero or just S) represents the initial situation. In Prolog implementations, we use the empty list `[]` for convenience.

</details>

---

### Question 35

**Source: Situation Calculus - Axioms**

A domain is formalized by writing down \***\*\_\_\*\*** that define what is true about the domain.

<details>
<summary>View Answer</summary>

**Answer**: axioms

**Explanation**: Axioms are the foundational statements and rules that define what is true about a domain - the "rulebook" for that world.

</details>

---

### Question 36

**Source: Situation Calculus - Precondition Axioms**

\***\*\_\_\*\*** axioms specify under what conditions each action is possible.

<details>
<summary>View Answer</summary>

**Answer**: Precondition or Action precondition (accept either)

**Explanation**: Precondition axioms (or action precondition axioms) specify when an action can be executed by listing the conditions that must be satisfied.

</details>

---

### Question 37

**Source: Situation Calculus - Successor State Axioms**

\***\*\_\_\*\*** \***\*\_\_\*\*** axioms specify what is true after an action occurrence.

<details>
<summary>View Answer</summary>

**Answer**: Successor state

**Explanation**: Successor state axioms describe how world state changes after executing an action - specifying the effects of actions.

</details>

---

### Question 38

**Source: Planning - Search Strategy**

**\_\_\_\_**-first search avoids infinite descent by exploring all plans of a given length before increasing the length.

<details>
<summary>View Answer</summary>

**Answer**: Breadth

**Explanation**: Breadth-first search explores systematically level by level, checking all plans of length N before any plans of length N+1.

</details>

---

### Question 39

**Source: Planning - Depth-First Problem**

Depth-first planning may not terminate because actions can undo each other, creating \***\*\_\_\*\***.

<details>
<summary>View Answer</summary>

**Answer**: cycles or infinite loops (accept either)

**Explanation**: When actions can reverse each other's effects, depth-first search can get trapped exploring the same states repeatedly in different orders, creating infinite loops.

</details>

---

### Question 40

**Source: Planning - Optimality**

Breadth-first search guarantees finding the \***\*\_\_\*\*** possible plan.

<details>
<summary>View Answer</summary>

**Answer**: shortest or optimal (accept either)

**Explanation**: Because breadth-first explores plans in order of increasing length, the first solution found is guaranteed to be among the shortest (optimal with respect to length).

</details>

---

## 📝 Part 3: Short Answer Questions

**Instructions**: Answer in 2-4 sentences. 15 points total.

### Question 41 (3 points)

**Source: Situation Calculus - Situations vs States**

Explain the key difference between a "situation" and a "state" in situation calculus. Why is this distinction important?

<details>
<summary>View Answer</summary>

**Answer**:

A situation represents an action history (the sequence of actions that have been performed), while a state describes what the world looks like at a particular point in time. This distinction is important because the same state can be reached through different action sequences, but each sequence is unique. From an action history we can deduce the current state, but from a state alone we cannot determine how we got there, which is crucial for reasoning about actions and change.

**Key Points**:

- Situation = action history (how we got here)
- State = world configuration (what is true now)
- Uniqueness of action sequences
- Enables traceability and reasoning

</details>

---

### Question 42 (3 points)

**Source: Situation Calculus - Precondition Axioms**

In plain English, what is being specified when precondition axioms are written down for a domain? Provide an example from the blocks world.

<details>
<summary>View Answer</summary>

**Answer**:

Precondition axioms specify "under what conditions an action can be executed" - like game rules that define when operations are valid. They describe what the world must be like before an action can be performed. For example, in the blocks world, to move block A from position B to position C, the preconditions might include: block A must exist, block A must be clear (nothing on top), position C must be clear, and block A must actually be at position B.

**Key Points**:

- Defines execution conditions for actions
- Prevents impossible/invalid actions
- Example includes multiple realistic preconditions
- Uses domain-specific context (blocks world)

</details>

---

### Question 43 (3 points)

**Source: Situation Calculus - Successor State Axioms**

In plain English, what is being specified when successor state axioms are written down for a domain? Why do we need both positive and negative effects?

<details>
<summary>View Answer</summary>

**Answer**:

Successor state axioms specify "how world state changes after executing an action" - describing the effects of actions. We need to specify both when a fluent becomes true (positive effect) and when it becomes false (negative effect) to accurately predict the world after an action. We also need to specify persistence (when things stay the same), which addresses the Frame Problem by avoiding the need to list everything that doesn't change.

**Key Points**:

- Describes action effects/consequences
- Positive effects (what becomes true)
- Negative effects (what becomes false)
- Persistence (what stays the same)
- Addresses the Frame Problem

</details>

---

### Question 44 (3 points)

**Source: Planning - Depth-First vs Breadth-First**

Why does depth-first planning sometimes fail to find a solution even when one exists? How does breadth-first search solve this problem?

<details>
<summary>View Answer</summary>

**Answer**:

Depth-first planning can get stuck in infinite branches because actions can undo each other, creating cycles (e.g., moving a block back and forth repeatedly). Depth-first search explores one path as deeply as possible, so if it enters an infinite branch, it never backtracks to try other options, eventually causing a stack overflow. Breadth-first search solves this by exploring all plans of length N before trying length N+1, ensuring systematic exploration of all possibilities and guaranteeing that if a finite solution exists, it will be found.

**Key Points**:

- Depth-first can enter infinite branches
- Actions creating cycles
- Breadth-first explores level-by-level
- Completeness guarantee

</details>

---

### Question 45 (3 points)

**Source: Situation Calculus - Domain Axiomatization**

List the six steps to axiomatize a domain in order. Briefly explain why this order makes sense.

<details>
<summary>View Answer</summary>

**Answer**:

The six steps are: (1) Understand the domain, (2) Determine fluents, (3) Determine actions, (4) Determine precondition axioms, (5) Determine successor state axioms, (6) Determine initial state. This order makes sense because we must first understand what we're modeling before we can identify what needs tracking (fluents), what can cause changes (actions), when changes can happen (preconditions), what changes occur (successor states), and finally where we start (initial state). Each step builds on the previous ones.

**Key Points**:

- All six steps listed correctly in order
- Logical progression explanation
- Each step builds on previous ones
- Demonstrates understanding of dependencies

</details>

---

## 📝 Part 4: Prolog Programming Question

**Instructions**: Write Prolog code. 5 points total.

### Question 46 (5 points)

**Source: Situation Calculus & Planning - Implementation**

Consider a simplified robot world with the following elements:

- A robot can be at different locations: `location(1)`, `location(2)`, `location(3)`
- The robot can carry one item at a time
- Actions: `goto(From, To)` and `pickup(Item)`

Write the following Prolog predicates:

a) A precondition axiom for `goto(From, To)` that requires:

- The robot must be at location From
- From and To must be different locations

b) A successor state axiom for the fluent `at(Robot, Loc, S)` that becomes true when the robot moves to that location

<details>
<summary>View Answer</summary>

**Answer**:

```prolog
% a) Precondition axiom for goto action
poss([goto(From, To)|S]) :-
    location_exists(From),
    location_exists(To),
    From \= To,
    at(robot, From, S).

% b) Successor state axiom for at(Robot, Loc, S)
% Case 1: Robot is at Loc if we just moved there
at(robot, Loc, [goto(From, Loc)|S]) :-
    poss([goto(From, Loc)|S]).

% Case 2: Robot stays at Loc if it was there and didn't move away
at(robot, Loc, [A|S]) :-
    poss([A|S]),
    A \= goto(Loc, _),
    at(robot, Loc, S).

% Helper facts (example)
location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).
```

**Grading Rubric** (5 points total):

- Precondition axiom structure correct (1 point)
- All required preconditions checked (1 point)
- Successor state axiom "becomes true" case (1.5 points)
- Successor state axiom "persistence" case (1.5 points)

**Key Elements**:

- Proper use of `poss/1` predicate
- Correct situation notation with lists
- Proper use of `\=` for inequality
- Both positive effect and persistence cases in successor state axiom

</details>

---

## 🎓 End of Exam

**Scoring Summary**:

- Multiple Choice: **\_** / 30 points
- Fill-in-the-Blank: **\_** / 10 points
- Short Answer: **\_** / 15 points
- Prolog Programming: **\_** / 5 points
- **Total: **\_** / 60 points**

**Grading Scale**:

- A: 54-60 points (90-100%)
- B: 48-53 points (80-89%)
- C: 42-47 points (70-79%)
- D: 36-41 points (60-69%)
- F: Below 36 points (Below 60%)

---

**Exam Version**: 1.0
**Date Created**: November 2024
**Topics Covered**: Situation Calculus, Planning, Breadth-First Search, Prolog Implementation
