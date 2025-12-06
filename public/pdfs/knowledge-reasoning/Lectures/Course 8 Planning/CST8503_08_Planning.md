# CST8503 08 Planning

_从 PDF 文档转换生成_

---

_注: 共提取了 1 张图片_

## 第 1 页

**Planning**

![图片](./CST8503_08_Planning_images/page_001_img_01.png)

---

## 第 2 页

**Lesson Overview (Agenda)**

In the following lesson, we will explore:

1. Applications of Knowledge Representation
2. Planning
3. Breadth-first vs Depth-first planning
4. Prolog Programming

**Plain English Explanation:**

**What is Planning?**

Planning is a fundamental problem in artificial intelligence that involves finding a sequence of actions to achieve a goal state from an initial state. Think of it like planning a route on a map or deciding the steps needed to accomplish a task.

**Why Study Planning?**

- In real-world scenarios, we constantly need to make plans to complete tasks
- Examples include: robots planning how to move objects, autonomous vehicles planning routes, game AI planning strategies
- Planning systems can automatically find action sequences that transform an initial state into a desired goal state

**What This Lesson Covers:**

1. **Applications of Knowledge Representation**: How we use logic to represent the world and actions
2. **Planning**: How to automatically generate plans to achieve goals
3. **Search Strategy Comparison**: Understanding the differences between depth-first and breadth-first search in planning contexts
4. **Prolog Programming**: Implementing planning systems using Prolog

---

## Blocks World Problem Setup

![图片](./CST8503_08_Planning_images/page_001_img_01.png)

**A BLOCKS WORLD PROBLEM**

- Three blocks `block(a)`, `block(b)`, `block(c)`
- Four locations `location(1)`, `location(2)`, `location(3)`, `location(4)`
- Relationships in the initial state:
  - `on(block(c), block(a))`
  - `on(block(a), location(1))`
  - `on(block(b), location(3))`
  - `clear(location(2))`, `clear(location(4))`
  - `clear(block(b))`, `clear(block(c))`
- Goal example: build the stack a, b, c so that
  - `on(block(a), block(b))`
  - `on(block(b), block(c))`

**Plain English Explanation:**

**Understanding the Blocks World:**

The blocks world is a classic planning problem in AI that's simple enough to understand but complex enough to be interesting. Here's what we have:

- **3 blocks**: a, b, and c (these are the objects we can manipulate)
- **4 locations**: numbered 1 through 4 (these are positions where blocks can be placed)

**Initial State:**

The initial configuration tells us where everything is at the start:

- Block c is on top of block a
- Block a is at location 1 (with c on top of it)
- Block b is at location 3 (by itself)
- Locations 2 and 4 are empty (clear)
- Blocks b and c have nothing on top of them (they are clear)

**Goal State:**

We want to rearrange the blocks so that:

- Block a is on top of block b
- Block b is on top of block c
- This creates a tower: c (bottom), b (middle), a (top)

**The Planning Challenge:**

Planning involves finding a sequence of actions (moves) that transforms the initial state into the goal state. We need to figure out which blocks to move, in what order, to achieve our goal while respecting the rules (like not moving a block that has another block on top of it).

---

## Action Schema for Moves

**Action schema**

- Represents a number of related actions using variables.
- Schema: `move(X, Y, Z)`
  - `X` stands for any block.
  - `Y` and `Z` stand for any block or location.

**Plain English Explanation:**

**What is an Action Schema?**

An action schema is like a template or pattern that represents many related actions using variables. Instead of writing out every single possible move individually, we use one general formula.

**Understanding `move(X, Y, Z)`:**

- **`X`**: The block we want to move (can be a, b, or c)
- **`Y`**: The source - where the block currently is (can be another block or a location)
- **`Z`**: The destination - where we want to move the block to (can be another block or a location)

**Why Use a Schema?**

- **Efficiency**: Instead of defining hundreds of individual actions, one schema covers all possible moves
- **Generality**: By substituting different values for X, Y, and Z, we get specific actions like:
  - `move(a, b, c)` means "move block a from block b to block c"
  - `move(b, location(3), location(2))` means "move block b from location 3 to location 2"
- **Flexibility**: As we add more blocks, the same schema still works

---

## Situation Calculus Specification

**Situation Calculus Blocks World Facts**

```
block_exists(block(a)).
block_exists(block(b)).
block_exists(block(c)).
location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).
location_exists(location(4)).
clear(location(2), []).
clear(location(4), []).
clear(block(b), []).
clear(block(c), []).
on(block(a), location(1), []).
on(block(b), location(3), []).
on(block(c), block(a), []).
```

- Action: `move(X, Y, Z)`
- Fluents: `clear`, `on`
- Initial situation represented by `[]`.

**Plain English Explanation:**

**Representing the World in Situation Calculus:**

Situation calculus is a formal way to describe a changing world. In our blocks world, we need to specify:

**1. Object Declarations:**

- `block_exists(block(a))`, `block_exists(block(b))`, `block_exists(block(c))` - These state that blocks a, b, and c exist
- `location_exists(location(1))` through `location_exists(location(4))` - These state that locations 1-4 exist

**2. Fluents (State-Dependent Predicates):**

- **`clear(X, S)`**: In situation S, position X has nothing on top of it
- **`on(X, Y, S)`**: In situation S, block X is on position Y

**3. Initial Situation `[]`:**

- The empty list `[]` represents the initial situation (before any actions are taken)
- All the facts with `[]` as the last argument describe what's true initially:
  - `clear(location(2), [])` - Location 2 is initially clear
  - `on(block(c), block(a), [])` - Block c is initially on block a

**Why This Matters:**

These facts form the foundation for planning and reasoning. The planner uses this information to determine what actions are possible and what the world will look like after actions are performed.

---

## Preconditions for Moves

**Sitcalc precondition axiom**

```prolog
% Let's add comments to this code together
poss([move(Block,From,To)|S]) :-
    block_exists(Block),
    clear(Block,S),
    (location_exists(To) ; block_exists(To)),
    Block \= To,
    clear(To,S),
    (location_exists(From) ; block_exists(From)),
    on(Block,From,S).
```

**Plain English Explanation:**

**Understanding Precondition Axioms:**

A precondition axiom specifies when an action is possible. It's like a checklist that must be satisfied before we can perform an action. For the `move` action, we need to check several conditions:

**Breaking Down Each Condition:**

1. **`block_exists(Block)`**: The block we want to move must actually exist

   - Can't move a non-existent block!

2. **`clear(Block, S)`**: The block must be clear (nothing on top of it)

   - We can only move a block if nothing is sitting on it

3. **`(location_exists(To) ; block_exists(To))`**: The destination must exist

   - Either it's a valid location OR it's another block
   - The semicolon `;` means "OR" in Prolog

4. **`Block \= To`**: The block cannot be moved onto itself

   - `\=` means "not equal to"
   - This prevents nonsensical moves like `move(a, somewhere, a)`

5. **`clear(To, S)`**: The destination must be clear

   - We can only place a block where there's nothing already

6. **`(location_exists(From) ; block_exists(From))`**: The source must exist

   - The place we're moving from must be valid

7. **`on(Block, From, S)`**: The block must actually be at the source location
   - We can only move a block from where it currently is

**Why These Preconditions?**

These conditions ensure that only valid, physically possible moves are considered during planning. Without them, the planner might try impossible actions like moving blocks that don't exist or moving a block that has other blocks stacked on top of it.

---

## Successor State Axioms

**SitCalc successor state axioms**

```prolog
clear(X,[move(Z,X,Y)|S]) :-
    poss([move(Z,X,Y)|S]).
clear(X,[A|S]) :-
    poss([A|S]),
    A \= move(_,_,X),
    clear(X,S).

on(X,Y,[move(X,Z,Y)|S]) :-
    poss([move(X,Z,Y)|S]).
on(X,Y,[A|S]) :-
    poss([A|S]),
    A \= move(X,Y,_),
    on(X,Y,S).
```

**Plain English Explanation:**

**Understanding Successor State Axioms:**

Successor state axioms describe how the world changes after an action is performed. They tell us what becomes true or false after executing an action.

**Axioms for `clear(X, S)`:**

**Rule 1: When does something become clear?**

```prolog
clear(X,[move(Z,X,Y)|S]) :- poss([move(Z,X,Y)|S]).
```

- If we move block Z FROM position X TO position Y, then X becomes clear
- Example: If block a was on location 1, and we move it away, location 1 becomes clear

**Rule 2: When does something stay clear?**

```prolog
clear(X,[A|S]) :- poss([A|S]), A \= move(_,_,X), clear(X,S).
```

- X stays clear if it was already clear AND the action doesn't move anything TO X
- `A \= move(_,_,X)` means "the action is not moving something onto X"
- This is the "persistence" rule - things stay clear unless something changes them

**Axioms for `on(X, Y, S)`:**

**Rule 1: When does a block get placed on something?**

```prolog
on(X,Y,[move(X,Z,Y)|S]) :- poss([move(X,Z,Y)|S]).
```

- Block X is on Y if we just executed `move(X, Z, Y)` - moving X from Z to Y
- Example: After `move(a, location(1), b)`, block a is on block b

**Rule 2: When does a block stay where it is?**

```prolog
on(X,Y,[A|S]) :- poss([A|S]), A \= move(X,Y,_), on(X,Y,S).
```

- Block X stays on Y if it was already on Y AND the action doesn't move X away from Y
- `A \= move(X,Y,_)` means "the action is not moving X from Y to somewhere else"

**Why These Axioms Matter:**

These rules solve the "frame problem" - they explicitly state what changes and what stays the same. This allows the planner to correctly predict the state of the world after any sequence of actions.

---

## Sample Planning Queries

**Queries and Observations**

```prolog
?- on(block(b), location(2), S).
S = [move(block(b), location(3), location(2))].

?- clear(location(3), S).
ERROR: Stack limit (1.0Gb) exceeded
```

- Planning may not terminate if the search strategy explores an infinite branch.
- The example above shows Prolog exceeding the stack limit while searching.

**Plain English Explanation:**

**Query 1: Success!**

```prolog
?- on(block(b), location(2), S).
S = [move(block(b), location(3), location(2))].
```

- **What we asked**: "Find a situation S where block b is at location 2"
- **What Prolog found**: A single-action plan: move block b from location 3 to location 2
- This works because in the initial state, block b is at location 3 and is clear, so it can be moved

**Query 2: Stack Overflow!**

```prolog
?- clear(location(3), S).
ERROR: Stack limit (1.0Gb) exceeded
```

- **What we asked**: "Find a situation S where location 3 is clear"
- **What went wrong**: Prolog got stuck in an infinite loop and ran out of memory
- **Why it happened**: The depth-first search kept exploring longer and longer plans (moving blocks back and forth) without finding a solution

**The Problem:**

This demonstrates a critical issue with planning: some goals might require exploring infinitely long sequences of actions. We need a better search strategy to avoid getting trapped in these infinite branches. This is where breadth-first search comes in!

---

## Depth-First vs Breadth-First Search

**Depth-first search and infinite loops**

```
[trace] ?- clear(location(3), S).
Call: (10) clear(location(3), _3838) ? creep
Call: (11) poss([move(_5048, location(3), _5052)|_5030]) ? creep
Call: (12) block_exists(_5048) ? creep
...
Call: (18) clear(block(a), _14126) ? creep
Call: (19) poss([move(_17176, block(a), _17180)|_17158]) ?
```

- Depth-first search may revisit similar states endlessly, causing non-termination.
- Prolog descends an infinitely long branch while trying to prove `clear(location(3), S)`.

**Plain English Explanation:**

**What's Happening in the Trace:**

The trace shows Prolog trying to find a plan to make location 3 clear:

1. **Call (10)**: Try to prove `clear(location(3), S)` - "Is location 3 clear in some situation S?"
2. **Call (11)**: Check if a move action is possible - trying to generate possible moves
3. **Call (12)**: Check if a block exists
4. ... (more calls)
5. **Call (18)**: Now checking `clear(block(a), _)` - going deeper
6. **Call (19)**: Checking another possible move

**The Infinite Loop Problem:**

- **Depth-First Strategy**: Prolog explores one path as deep as possible before backtracking
- **The Trap**: The planner keeps trying longer and longer sequences like:
  - Move block b to location 2
  - Move block b back to location 3
  - Move block b to location 2 again
  - Move block b back to location 3 again
  - ... (forever)
- **Result**: Prolog keeps going deeper into this infinite branch, never finding a solution, until it runs out of stack space

**Why This Happens:**

In planning, actions can often be undone by other actions, creating cycles. Without a mechanism to detect or avoid these cycles, depth-first search can get trapped exploring the same states over and over in different orders, creating infinitely long plans.

---

## Breadth-First Planning Strategy

**Breadth First Planning**

- We are searching a tree of possible plans.
- Depth-first planning may include infinite sequences of moves.
- Breadth-first search avoids infinite descent by exploring all plans of a given length before increasing the length.
- Process:
  1. Generate all plans of length 1 and test goals.
  2. If none succeed, generate plans of length 2, and so on.
  3. Stop when a plan satisfies the goal.

**Plain English Explanation:**

**The Breadth-First Advantage:**

Think of planning as searching through a tree of possible plans. Breadth-first search explores this tree level by level, like ripples spreading out from a stone dropped in water.

**How It Works:**

**Level 0**: Start with the initial situation (no actions)

- Check: Does this satisfy the goal? If yes, done!

**Level 1**: Try all possible single-action plans

- Generate: All plans with exactly 1 action
- Test each: Does it achieve the goal?
- If yes, we found the shortest plan! If no, continue...

**Level 2**: Try all possible 2-action plans

- Generate: All plans with exactly 2 actions
- Test each: Does it achieve the goal?
- Continue...

**Level N**: Try all plans with N actions

- Eventually we'll either find a solution or exhaust all possibilities

**Why This Solves the Infinite Loop Problem:**

- **Systematic Exploration**: We check all short plans before trying longer ones
- **Guaranteed Shortest Solution**: The first solution we find is guaranteed to be among the shortest
- **No Infinite Descent**: We never get stuck exploring infinitely long plans because we increase length gradually
- **Completeness**: If a solution exists, we will find it (assuming it has finite length)

**Trade-off:**

- **Pro**: Guaranteed to find the shortest solution (if one exists)
- **Con**: Requires more memory to store all plans of the current length

---

## Breadth-First Planning Examples

**Plans of length 1**

```prolog
?- poss([A]), clear(location(3), [A]).
A = move(block(b), location(3), location(2)) ;
A = move(block(b), location(3), location(2)) ;
A = move(block(b), location(3), location(2)) ;
A = move(block(b), location(3), location(4)) ;
A = move(block(b), location(3), location(4)) ;
A = move(block(b), location(3), location(4)) ;
A = move(block(b), location(3), block(c)) ;
A = move(block(b), location(3), block(c)) ;
A = move(block(b), location(3), block(c)) ;
false.
```

**Plans of length 2**

```prolog
?- poss([B, A]), clear(location(3), [B, A]).
B = move(block(b), location(2), location(4)),
A = move(block(b), location(3), location(2)) ...
```

**Plain English Explanation:**

**Understanding the Examples:**

**Plans of Length 1:**

The query `poss([A]), clear(location(3), [A])` asks: "Is there a single action A that makes location 3 clear?"

Prolog finds multiple solutions (some duplicates shown due to multiple ways to derive the same result):

- `move(block(b), location(3), location(2))` - Move block b from location 3 to location 2
- `move(block(b), location(3), location(4))` - Move block b from location 3 to location 4
- `move(block(b), location(3), block(c))` - Move block b from location 3 to block c

All of these work because they move block b away from location 3, making it clear!

**Plans of Length 2:**

If no single action worked, we'd try `poss([B, A]), clear(location(3), [B, A])` - two actions in sequence.

The result shows plans like:

- First action B: `move(block(b), location(2), location(4))`
- Second action A: `move(block(b), location(3), location(2))`

**The Systematic Approach:**

- **Layer 1**: Check all 1-action plans
- **Layer 2**: If needed, check all 2-action plans
- **Layer 3**: If needed, check all 3-action plans
- **Stop**: As soon as we find a plan that satisfies the goal

This ensures we always find a shortest plan and never get stuck in infinite loops!

---

## Breadth-First Planning Implementation

**Prolog implementation**

```prolog
plan(Goal, Plan) :-
    bposs(Plan),
    Goal.

bposs(S) :-
    tryposs([], S).

tryposs(S, S) :-
    poss(S).              % S is a plan
tryposs(X, S) :-
    tryposs([_|X], S).    % increase plan length
```

**Example query**

```prolog
?- plan(clear(location(3), S), S).
S = [move(block(b), location(3), location(2))]
```

**Plain English Explanation:**

**Understanding the Prolog Implementation:**

**The `plan/2` Predicate:**

```prolog
plan(Goal, Plan) :-
    bposs(Plan),
    Goal.
```

- **Purpose**: Find a plan that achieves the goal
- **How it works**:
  1. Generate a possible plan using `bposs(Plan)`
  2. Check if the `Goal` is satisfied in that plan
  3. If both succeed, `Plan` contains our solution

**The `bposs/1` Predicate:**

```prolog
bposs(S) :-
    tryposs([], S).
```

- **Purpose**: Generate plans in breadth-first order
- Starts with an empty accumulator `[]` and builds up to plan `S`

**The `tryposs/2` Predicate - The Clever Part:**

```prolog
tryposs(S, S) :-
    poss(S).              % S is a plan (base case)

tryposs(X, S) :-
    tryposs([_|X], S).    % increase plan length (recursive case)
```

**How `tryposs/2` Works:**

- **Base Case**: `tryposs(S, S)` - If `S` is a valid plan (checked by `poss(S)`), we're done
- **Recursive Case**: `tryposs(X, S)` - Try with one more action by prepending a wildcard `_`

**The Magic - Breadth-First Order:**

When Prolog tries to satisfy `tryposs([], S)`:

1. First try: `tryposs([], [])` - 0 actions (length 0)
2. Second try: `tryposs([_], [_])` - 1 action (length 1)
3. Third try: `tryposs([_,_], [_,_])` - 2 actions (length 2)
4. And so on...

By using backtracking, this systematically tries plans of increasing length, implementing breadth-first search!

**Example Query Result:**

```prolog
?- plan(clear(location(3), S), S).
S = [move(block(b), location(3), location(2))]
```

- **Goal**: Make location 3 clear
- **Solution**: A single-action plan - move block b away from location 3
- **Why this is optimal**: It's the shortest possible plan (only 1 action needed)

---

## Knowledge Check

**Questions**

1. Why does a "normal" (depth-first) planning query not always terminate?
2. How does a breadth-first planning query address that problem?

**Plain English Explanation:**

**Question 1: Why doesn't depth-first planning always terminate?**

**Answer:**

Depth-first planning can get stuck in infinite loops because:

1. **Cyclic Actions**: Actions can undo each other, creating cycles

   - Example: Move block b to location 2, then move it back to location 3, then back to 2, etc.

2. **No Length Limit**: Depth-first search has no built-in mechanism to stop exploring longer paths

   - It keeps going deeper: 1 action, 2 actions, 3 actions, 100 actions, 1000 actions...

3. **Priority to Depth**: It explores one branch completely before trying alternatives

   - If that branch is infinite, it never gets to try other (potentially successful) branches

4. **Stack Overflow**: Eventually runs out of memory (stack space) and crashes

**Question 2: How does breadth-first planning solve this?**

**Answer:**

Breadth-first planning avoids the infinite loop problem through:

1. **Level-by-Level Exploration**: Explores all plans of length N before trying length N+1

   - Checks all 1-action plans, then all 2-action plans, then all 3-action plans, etc.

2. **Guaranteed Progress**: Always makes progress toward finding shorter solutions first

   - Won't get stuck exploring infinitely long plans

3. **Completeness**: If a solution exists with finite length, breadth-first will find it

   - The first solution found is guaranteed to be among the shortest

4. **Systematic Coverage**: All possible plans are eventually considered
   - No infinite branch can block exploration of other branches

**Key Insight:**

The difference is like searching for your keys:

- **Depth-first**: Look in one room, then the closet, then a box in the closet, then a smaller box in that box... (might search one room forever)
- **Breadth-first**: Check all rooms on this floor first, then go deeper into closets and boxes (systematic and complete)

---
