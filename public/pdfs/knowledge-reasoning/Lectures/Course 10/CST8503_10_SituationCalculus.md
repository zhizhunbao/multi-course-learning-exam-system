# CST8503 10 SituationCalculus

_从 PDF 文档转换生成_

_注: 共提取了 1 张图片_

## 第 1 页

**Knowledge Representation:**
**Situation Calculus**

![图片](./CST8503_10_SituationCalculus_images/page_001_img_01.png)

---

## 第 2 页

**Situation Calculus**

The Situation Calculus is a first-order predicate language designed for representing and reasoning about dynamical worlds [https://en.wikipedia.org/wiki/Situation_calculus](https://en.wikipedia.org/wiki/Situation_calculus)

Note: first-order predicate calculus is actually an infinite family of languages. The version of the situation calculus we will use in this course is a member of that family.

First introduced by John McCarthy in 1963. Developed further by the KR group at the University of Toronto: see papers/books by Ray Reiter, Hector Levesque

**Plain English Explanation:**

**What is Situation Calculus?**

Situation calculus is a formal language for describing and reasoning about dynamic worlds - environments where things change over time due to actions. Traditional logic can only describe static facts, but situation calculus allows us to express "what happens after performing an action."

**Why "First-Order Predicate Language"?**

First-order predicate logic can express properties of objects and relationships between them (e.g., "block b1 is on block b2"). "First-order" means we describe objects and their properties, but not properties of properties (that would be second-order logic). The situation calculus we use is one member of this language family.

**Historical Context:**

Introduced by AI pioneer John McCarthy in 1963, then further developed by the Knowledge Representation (KR) group at the University of Toronto, particularly Ray Reiter and Hector Levesque. It's a foundational theory for knowledge representation and reasoning in AI.

---

## 第 3 页

**Situation Calculus (cont'd)**

The basic elements of the calculus are:

- The actions that can be performed in the world
- The fluents that describe the state of the world
- The situations that represent courses of action

A domain is formalized by a number of axioms, namely:

- Action precondition axioms, one for each action
- Successor state axioms, one for each fluent
- Axioms describing the initial state of the world
- The foundational axioms of the situation calculus

**Plain English Explanation:**

**Three Basic Elements:**

1. **Actions** - Operations that can be performed in the world (e.g., "pick up block", "move block"). Actions are the only way to change the world.

2. **Fluents** - Predicates describing world state. Called "fluent" because their truth values flow/change as actions are executed (e.g., "block b1 is on block b2" may become false after a move action).

3. **Situations** - Action histories representing sequences of executed actions (e.g., "pick up, then move, then put down"). Situations record "what happened" to determine "what the current state is."

**Formalizing a Domain with Axioms:**

1. **Action Precondition Axioms** - Specify "when can this action be executed" (e.g., can only move a block if nothing is on top of it).

2. **Successor State Axioms** - Specify "how does a fluent change after an action" (e.g., after moving b1, `on(b1, b2)` becomes false, `on(b1, b3)` becomes true).

3. **Initial State Axioms** - Describe the world before any actions occur (the starting point for reasoning).

4. **Foundational Axioms** - Implicit rules of situation calculus itself (we focus on the above three types).

---

## 第 4 页

**Situation Calculus (cont'd)**

The basic elements of the calculus:

- actions are things
- fluents are predicates that give state of the world which depends on situation
- situations are effectively lists of actions (read right to left)

A domain is formalized by a number of axioms, namely:

- Action precondition axioms: under what conditions is each action possible?
- Successor state axioms: what is true after an action occurrence?
- Initial State axioms: what is true before any action happens?
- Foundational Axioms: implicit for us -- we concentrate on the above

**Plain English Explanation:**

**Detailed Element Descriptions:**

1. **Actions are "things"** - Actions are concrete entities that can be referenced like objects (e.g., `pick_up(block(b1))` is a specific action object).

2. **Fluents depend on situations** - A fluent's truth value depends on which situation we're in. For example, `on(b1, b2, s)` means "in situation s, block b1 is on block b2." The same fluent may have different truth values in different situations.

3. **Situations are essentially action lists (read right to left)** - For example, `do(put_down(b1), do(move(x,y), do(pick_up(b1), S)))` represents: starting from S, first execute pick_up(b1), then move(x,y), finally put_down(b1). Note: written outside-in, but read inside-out.

**Understanding the Four Axiom Types:**

1. **Precondition Axioms** - Answer "when can this action be performed?" Like game rules specifying required conditions.

2. **Successor State Axioms** - Answer "what becomes true after this action?" Describe action effects and how they change world state.

3. **Initial State Axioms** - Answer "what is the world like initially?" The starting point for all reasoning.

4. **Foundational Axioms** - The intrinsic rules of situation calculus itself (implicit, we don't write them explicitly).

---

## 第 5 页

**Axioms**

What are axioms?
Axioms are the initial statements (logical formulae) that we make when we are representing a domain

What do I mean by a domain?
A domain is a part of the world that's relevant to the reasoning we want to do, for example

- In a block-stacking domain, we would write down everything we can about blocks, stacking, moving, putting down, and so
- If we want to represent a bigger subset of the world, there is more we need to write down to represent that world

**Plain English Explanation:**

**What are Axioms?**

Axioms are the foundational statements and rules we establish when describing a domain - like the basic rules in a game manual (e.g., "rooks move in straight lines" in chess). They don't need proof; they serve as the starting point for reasoning.

**What is a Domain?**

A domain is the specific "small world" we're focusing on. For example, in a blocks world domain, we care about block positions and movements, but not their colors or prices. The larger the domain, the more we need to describe; the smaller, the simpler the description.

**Why Do We Need Axioms?**

Axioms allow computers to know "what can be done under what conditions" and "what happens after an action." They're like an operations manual for a robot, specifying the rules to follow in that domain.

---

## 第 6 页

**Actions**

We will concentrate on simple actions whose effects don't depend on time. The formalism works with complex/concurrent actions, and actions that depend on time, but we will keep things simple.

Actions are the mechanism for aspects of our domain to change.

Example actions:

- `pick_up(block(block1))`
- `move_to(location(x),location(y))`
- `put_down(block(block1))`

**Plain English Explanation:**

**What are Actions?**

Actions are operations that change world state - the bridge between "what is" and "what becomes." Each action execution transitions the world from one state to another. Actions are the only mechanism for change; without them, the world stays unchanged.

**Why Focus on Simple Actions?**

We study simple actions whose effects don't depend on time. For example, "pick up block" has the same effect whenever executed. While the formalism can handle complex/concurrent actions, we start simple for clarity.

**Example Actions:**

- `pick_up(block(block1))` - Pick up block 1
- `move_to(location(x),location(y))` - Move from location x to y
- `put_down(block(block1))` - Put down block 1

---

## 第 7 页

**Action Schema**

Sometimes we represent a number of actions with a single expression called an Action Schema.

**Blocks World Action Schema:** `move(Block,Src,Dst)`

3 blocks, 4 positions in the blocks world of this course

Single expression representing all the individual actions -- all combinations of (Block,Src,Dst), of which there are 3x7x7:

```
move(block(b1),block(b1),block(b1))
move(block(b1),block(b1),block(b2))
move(block(b1),block(b1),block(b3))
move(block(b1),block(b1),position(p1))
…. etc …. etc …
```

**Plain English Explanation:**

**What is an Action Schema?**

An action schema is a template representing many individual actions with a single expression. Like a mathematical function `f(x)` representing countless values, `move(Block,Src,Dst)` represents all possible move actions.

**Why Use Action Schemas?**

- **Space efficient**: With 3 blocks and 4 positions, there are 147 possible moves (3×7×7). Listing all would be lengthy.
- **Clarity**: One pattern `move(Block,Src,Dst)` captures the essence of "moving a block."
- **Flexibility**: When blocks or positions change, only parameters need updating, not all actions.

**Understanding `move(Block,Src,Dst)`:**

- `Block` - The block to move (b1, b2, b3)
- `Src` - Source position where block currently is (another block or a position)
- `Dst` - Destination where block moves to (another block or a position)

**Why 3×7×7 = 147 combinations?**

- 3 blocks to move
- 7 source positions (3 blocks + 4 positions)
- 7 destination positions (3 blocks + 4 positions)

**Note:** Not all 147 combinations are valid (e.g., can't move block onto itself). Action schemas help us systematically consider all possibilities, then use preconditions to filter which actions are actually executable.

---

## 第 8 页

**Fluents**

Fluents are predicates that take a situation argument. They are called fluents because they represent statements whose truth value changes (due to actions). They take a situation (action history) as the last argument.

Fluents are used to represent the situation-dependent state of the world (hence their last argument is a situation).

Examples of Fluents being used to make statements:

- `on(block(block1),block(block2),s)`
- `holding(block(block3),s)`
- `position(location(x),location(y),s)`

**Plain English Explanation:**

**What are Fluents?**

Fluents are predicates that take a situation argument. Called "fluent" because their truth values flow/change with actions (Latin "fluere" = to flow). Unlike static predicates (e.g., "2+2=4"), fluents are dynamic - they may be true now but false after an action.

**Fluent Characteristics:**

1. **Must include situation parameter** - The last argument is always the situation, because the same fluent may have different truth values in different situations.

2. **Describe situation-dependent world state** - Fluents cannot exist independently; they must specify "in which situation" the state holds.

**Example Fluents:**

1. `on(block(block1),block(block2),s)` - In situation s, block1 is on block2. This binary relation may change after move actions.

2. `holding(block(block3),s)` - In situation s, holding block3. Becomes true after pick_up, false after put_down.

3. `position(location(x),location(y),s)` - In situation s, position is from location x to y. Changes after move actions.

**Why Fluents?**

In dynamic worlds, we need to describe changing states. Fluents enable us to express "what the world becomes after performing actions" - the foundation for reasoning and planning.

---

## 第 9 页

**Situations**

It's tempting to think of a situation as a state, but in the modern versions of the situation calculus, a situation is:

- an action history, or in other words, a course of action
- There is a distinguished function symbol S representing the action history of no action
- There is a distinguished function symbol `do(a,s)` representing the situation (action history) resulting from doing a "in" or equivalently "after" s

Example situations:

- `do(pick_up(block(block1)),S)`
- `do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))`

**Plain English Explanation:**

**What are Situations?**

**Important: Situation ≠ State**

In modern situation calculus, a situation is an **action history** (what actions were performed in what order), not a state (what the world looks like now). States describe "what is," situations describe "how we got here."

**Situation Essentials:**

1. **Situation as Action History** - Records which actions were executed and in what order, like a game replay showing player operations.

2. **Special Symbol S** - Represents the initial situation where no actions have occurred yet (the starting point for all action histories).

3. **Function Symbol `do(a,s)`** - Represents the new situation resulting from performing action a in situation s (appending a new operation to the history).

**Example Situations:**

1. `do(pick_up(block(block1)),S)` - The situation after picking up block1 from the initial state. Action history = [pick_up(block(block1))].

2. `do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))` - Read inside-out: first pick_up(block1), then move(x,y), finally put_down(block1). Action history = [pick_up, move, put_down].

**Why Action History Instead of State?**

- **Uniqueness**: The same state may be reached by different action sequences, but each sequence is unique.
- **Traceability**: Action history tells us "how we got here."
- **Inference**: From action history we can deduce current state; from state alone we cannot deduce history.

Think of state as a photograph (what things look like now) vs. situation as a video (what happened from start to now).

---

## 第 10 页

**Situation observations**

```
do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))
```

1. This represents a course of action consisting of three actions, in order: `pick_up(block(block1))`, `move(location(x),location(y))`, `put_down(block(block1))`
2. Similarity to peano number theory:

   - `succ(succ(succ(0)))` is the formal representation of 3

3. Similarity to prolog lists, using the dot (.) functor notation:

   - `. (put_down(block(block1)),.(move(location(x),location(y)),.(pick_up(block(block1)),[ ])))`
   - or in prolog regular notation for lists: `[put_down(block(block1)),move(location(x),location(y)),pick_up(block(block1))]`

**Plain English Explanation:**

**Understanding Situation Representation:**

**1. Reading the Action Sequence**

This situation represents three actions in order: pick_up(block1), then move(x,y), then put_down(block1). Written outside-in but read inside-out - like peeling an onion, the outermost layer is the last action, innermost is the first.

**2. Similarity to Peano Number Theory**

- Peano numbers use `succ` (successor) function: `0`, `succ(0)` = 1, `succ(succ(0))` = 2, `succ(succ(succ(0)))` = 3
- Situation calculus parallels this: `do` is like `succ`, `S` is like `0`, `do(a,S)` is like `succ(0)`, `do(a2, do(a1, S))` is like `succ(succ(0))`
- Both build larger structures by repeatedly applying a function

**3. Similarity to Prolog Lists**

- Empty list `[]` represents initial situation S
- List `[a1, a2, a3]` represents a sequence of three actions
- Dot notation `.` is the internal list representation
- `do(put_down(...), do(move(...), do(pick_up(...), S)))` equals Prolog list `[put_down(...), move(...), pick_up(...)]`
- Note: List written left-to-right, but executed right-to-left (rightmost action executes first)

**Practical Use:**

In Prolog programs, we typically use list notation `[a1, a2, a3]` instead of nested `do` functions - more concise and idiomatic. Both representations are equivalent and interconvertible.

---

## 第 11 页

**Situation observations (cont'd)**

```
do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))
```

We can be really clever Prolog programmers and adopt the following convention for situations:

1. The special situation where nothing has happened, S will be 0, represented by the special Prolog atom `[]`
2. The function symbol do will be represented by the list functor
3. `do(a,S)` will be written in Prolog as `[a]` or `[a|[]]`
4. `do(a,S)` will be written in Prolog as `[a|S]`

The above situation becomes a Prolog list, read RIGHT to LEFT:

```
[put_down(block(block1)),move(location(x),location(y)),pick_up(block(block1))]
```

**Plain English Explanation:**

**Prolog Situation Representation Convention:**

**Why Use Lists in Prolog?**

Nested `do` functions are cumbersome in practice. Prolog lists are the natural way to represent sequences - more concise and readable. We establish a convention to convert theoretical `do` notation to Prolog list notation.

**Conversion Rules:**

1. **Initial situation S → empty list `[]`** - Represents "no actions yet," like 0 in counting.

2. **`do` function → list constructor** - `do(a,s)` becomes `[a|s]`, meaning "prepend element a to list s."

3. **Single action** - `do(a,S)` becomes `[a]` or `[a|[]]` (equivalent).

4. **Multiple actions** - `do(a, do(b, S))` becomes `[a|[b|[]]]` = `[a,b]`.

**Example Conversion:**

- Theoretical: `do(put_down(...),do(move(...),do(pick_up(...),S)))`
- Prolog list: `[put_down(...), move(...), pick_up(...)]`

**Understanding "Read Right to Left":**

In `do` nesting, innermost is first; in lists, **execution order is right-to-left** (first action is rightmost).

Example: `[put_down(...), move(...), pick_up(...)]`

- Execution order: pick_up (right) → move (middle) → put_down (left)
- Written left-to-right, executed right-to-left

**Advantages in Practice:**

- **Concise**: List notation is much shorter
- **Readable**: Linear structure easier to understand than nested functions
- **Operable**: Rich Prolog list operations available (`append`, `member`, etc.)
- **Idiomatic**: Prolog programmers naturally use lists for sequences

**Note:** Convention differs in representation only; semantics are equivalent.

---

## 第 12 页

**Action precondition axioms**

For each action, we need to state up front where that action is possible and where it isn't possible. "where" here means: "after which courses of action?" or alternatively we could say "in which situations?"

General form of precondition axiom:

**Poss(A(x⃗), s) ≡ Φ(x⃗, s)**

- `A(x⃗)` is an action, where `x⃗` represents all the arguments of the action
- `Φ(x⃗, s)` is a logical formula involving fluents, characterizing the state where `A(x⃗)` is possible

**Plain English Explanation:**

**What are Precondition Axioms?**

Precondition axioms specify "under what conditions an action can be executed" - like game rules defining when operations are valid. For each action, we must clearly state in which situations it can or cannot be executed.

**Understanding "where":**

"Where" here doesn't mean physical location, but rather "in which situation" or "after which action sequences" the action becomes possible.

**General Form: Poss(A(x⃗), s) ≡ Φ(x⃗, s)**

- **Poss(A(x⃗), s)** - "In situation s, action A(x⃗) is possible (can be executed)"

  - `A(x⃗)` is an action with arguments `x⃗`
  - `s` is the current situation (action history)

- **≡** - "if and only if" (biconditional/necessary and sufficient condition)

- **Φ(x⃗, s)** - A logical formula using fluents to characterize the state where A(x⃗) is possible
  - Examples: "block b1 is clear," "block b3 is clear," "block b1 is on b2"

**Example for Moving Blocks:**

Preconditions might include:

- Block to move has nothing on top (clear)
- Destination position is empty (clear)
- Block is actually at source position (on)

**Why Preconditions?**

Prevent invalid/impossible actions (e.g., can't move non-existent block, can't place block on occupied position). Preconditions ensure we only consider "reasonable" action sequences.

---

## 第 13 页

**Action Precondition axioms (cont'd)**

Example Precondition axiom (next slide)

- `move(x,y,z)` denotes an action of moving Block x from Block y to Block z
- `on(x,y,s)` means that Block x is on Position or Block y in Situation S
- `clear(x,s)` means that Block x is clear in Situation s

**Plain English Explanation:**

**Understanding the Notation:**

Before examining the specific precondition axiom, understand these symbols:

1. **`move(x,y,z)`** - Move action: "move block x from position y to position z"

   - `x` - Block to move
   - `y` - Source position (another block or location)
   - `z` - Destination position (another block or location)
   - Example: `move(b1, b2, b3)` moves block b1 from b2 to b3

2. **`on(x,y,s)`** - Position relation fluent: "in situation s, block x is on position y"

   - Example: `on(b1, b2, s)` means block b1 is on block b2 in situation s

3. **`clear(x,s)`** - Clear state fluent: "in situation s, block x is clear (nothing on top)"
   - Example: `clear(b1, s)` means block b1 has nothing on top and can be moved

**Role in Preconditions:**

These fluents describe what must be true before executing an action. For `move(x,y,z)`, preconditions might include:

- `on(x,y,s)` - Block x is actually at position y
- `clear(x,s)` - Block x has nothing on top
- `clear(z,s)` - Destination z is empty

Next slide shows the actual Prolog precondition axiom code.

---

## 第 14 页

**Sitcalc precondition axiom**

```prolog
% Let's add comments to this code together
poss([move(Block,From,To)|S]):-
    block_exists(Block),
    clear(Block,S),
    (location_exists(To) ; block_exists(To)),
    Block \= To,
    clear(To,S),
    (location_exists(From);block_exists(From)),
    on(Block,From,S).
```

**Plain English Explanation:**

**Prolog Precondition Axiom Code:**

This code defines preconditions for the "move block" action. Let's examine each condition:

**Overall Structure:**

`poss([move(Block,From,To)|S]):-` means "the move action is possible in situation `[move(...)|S]`"

- Uses list notation: `[move(...)|S]` represents executing move on top of situation S
- All conditions after `:-` must be satisfied (comma = AND)

**Condition Breakdown:**

1. **`block_exists(Block)`** - The block to move must exist (can't move non-existent block)

2. **`clear(Block,S)`** - Block must be clear (nothing on top). Like "to pick up a box, remove what's on top first"

3. **`(location_exists(To) ; block_exists(To))`** - Destination must exist (either a location OR a block). Semicolon = OR. Ensures valid destination.

4. **`Block \= To`** - Block cannot equal destination (`\=` = not equal). Prevents moving block onto itself.

5. **`clear(To,S)`** - Destination must be clear/empty. Can't place block where something already exists.

6. **`(location_exists(From);block_exists(From))`** - Source must exist (location or block). Ensures valid source.

7. **`on(Block,From,S)`** - Block must actually be at source position. Most important: can only move what's actually there.

**Logic:**

All conditions must be **simultaneously satisfied** (commas = AND). If any fails, action cannot execute. This ensures only "reasonable" moves are considered.

**Practical Use:**

When a planning system wants to execute `move(b1, b2, b3)`, it checks these preconditions. If all satisfied, action executes; otherwise, other actions must first establish the preconditions.

---

## 第 15 页

**Action Precondition axioms observations**

With situations, we observed that it is convenient to use Prolog's list notation:

- The empty list `[]` can represent the initial situation S
- List notation `[A|S]` can represent the situation `do(a,s)`

We make a similar observation that the `Poss(a,s)` predicate (two arguments):

```prolog
poss(move(BlockA,BlockB),S) :-  % two arguments for poss
    clear(BlockA,S),
    on(BlockA,BlockB,S),
    clear(BlockC,S).
```

could be equivalently written using Prolog list notation (one argument) as:

```prolog
poss([move(BlockA,BlockB)|S]) :-  % one argument for poss
    clear(BlockA,S),
    on(BlockA,BlockB,S),
    clear(BlockC,S).
```

Whether to use `poss/2` or `poss/1` is arbitrary, but we must be consistent!

**Plain English Explanation:**

**Two Ways to Represent Preconditions:**

Recall that situations can be represented as Prolog lists: `[]` for initial situation S, `[A|S]` for executing A on situation S.

**Approach 1: Two arguments `poss/2`**

```prolog
poss(move(BlockA,BlockB), S) :- ...
```

- First argument: action itself
- Second argument: situation S
- Meaning: "action is possible in situation S"

**Approach 2: One argument `poss/1` (list notation)**

```prolog
poss([move(BlockA,BlockB)|S]) :- ...
```

- Single argument: `[move(...)|S]` (action embedded in situation)
- Meaning: "this action is possible in situation `[move(...)|S]`"

**Equivalence:**

Both are logically equivalent - `poss(a, s)` and `poss([a|s])` express the same thing. One separates action and situation, the other combines them.

**Why Two Approaches?**

- `poss/2` - More intuitive, clearly distinguishes action from situation
- `poss/1` - More concise, consistent with list notation for situations, more idiomatic Prolog

**Critical: Be Consistent!**

Choose one approach and use it throughout your entire program. Mixing them causes logic errors.

**Practical Recommendation:**

This course typically uses `poss/1` (list notation) because it's consistent with situation representation, more concise, and more idiomatic in Prolog.

---

## 第 16 页

**Successor State Axioms**

For each fluent, we need to state up front the conditions under which it becomes true, false, or remains unchanged.

The form of a successor state axiom is:

**Poss(A(x⃗), s) ⊃ R(y⃗, do(A(x⃗), s)) ≡ γ(y⃗, A(x⃗), s) ∨ R(y⃗, s) ∧ ¬γ(y⃗, A(x⃗), s)**

where:

- `γ(y⃗, A(x⃗), s)` represents the conditions under which `R(y⃗, do(A(x⃗), s))` is true
- `γ(y⃗, A(x⃗), s)` represent the conditions under which `R(y⃗, do(A(x⃗), s))` is false

**Plain English Explanation:**

**What are Successor State Axioms?**

Successor state axioms describe "how world state changes after executing an action." For each fluent, we specify: under what conditions it becomes true, becomes false, or remains unchanged. This describes action "effects" - what happens after performing the action.

**Why Successor State Axioms?**

- Precondition axioms tell us "when can we perform an action"
- Successor state axioms tell us "what happens after performing the action"
- Together they completely describe an action: both executability and effects

**General Form: Poss(A(x⃗), s) ⊃ R(y⃗, do(A(x⃗), s)) ≡ γ(y⃗, A(x⃗), s) ∨ R(y⃗, s) ∧ ¬γ(y⃗, A(x⃗), s)**

Breaking down the formula:

- **Poss(A(x⃗), s) ⊃** - If action A is possible in situation s (preconditions satisfied)
- **R(y⃗, do(A(x⃗), s))** - Fluent R after executing action A
- **≡** - If and only if (biconditional)
- **γ(y⃗, A(x⃗), s)** - Conditions under which A makes R true
- **∨** - Or
- **R(y⃗, s) ∧ ¬γ(y⃗, A(x⃗), s)** - R was already true AND A doesn't make R false

**Plain Language:**

Fluent R becomes true after executing A if and only if:

- **Case 1**: Action A makes R true (positive effect), OR
- **Case 2**: R was already true AND A doesn't make R false (persistence)

**Notation:**

- γ⁺ - Conditions making R true (positive effect)
- γ⁻ - Conditions making R false (negative effect)

**Significance:**

This formula enables accurate prediction of fluent states after action execution, considering three scenarios: becomes true, becomes false, remains unchanged. This is foundational for reasoning and planning.

---

## 第 17 页

**Successor State Axioms (cont'd)**

In English, we would read the Successor State Axiom as:

If Action A is possible in s, then

    R is true after performing A in s if and only if the conditions are such that A makes R become true,

    or

    R was already true, and conditions are such that A does not make R false.

**Plain English Explanation:**

**Reading the Successor State Axiom:**

"If action A is possible in s, then R is true after performing A if and only if: A makes R become true, OR R was already true and A does not make R false."

**Step-by-Step:**

1. **Precondition**: "If action A is possible in s" - Action's preconditions are satisfied; we only care about effects of executable actions.

2. **Conclusion**: "R is true after A if and only if..."

3. **Two Cases** (at least one must hold):

   **Case 1: A makes R true (positive effect)**

   - Action's direct effect
   - Example: After "move b1 to b2," `on(b1, b2, s)` becomes true

   **Case 2: R persists (persistence)**

   - R was true before, and A doesn't make R false
   - Example: `on(b1, b2, s)` true before "move b3 to b4," still true after (moving b3 doesn't affect b1-b2 relationship)

**Key Points:**

- **"If and only if"** - Necessary and sufficient; no other cases exist
- **"OR"** - Either case suffices
- **"AND"** in Case 2 - Both conditions must hold (R already true AND A doesn't falsify R)

**Example: `on(b1, b2, s)`**

After `move(b1, b2, b3)`:

- Case 1: Makes `on(b1, b3, s)` true
- Case 2 doesn't apply: `on(b1, b2, s)` becomes false

After `move(b3, b4, b5)`:

- Case 1 doesn't apply: Doesn't make `on(b1, b2, s)` true
- Case 2: If `on(b1, b2, s)` was true and this action doesn't falsify it, it remains true

**Design Rationale:**

This addresses the Frame Problem by explicitly stating what changes and what persists, avoiding the need to list everything that doesn't change (which would be vast).

---

## 第 18 页

**Successor State Axioms**

Successor State Axiom for `on(X,Y,S)`:

**Poss(A(x⃗), s) ⊃ on(BlockA, BlockC, do(A(x⃗), s)) ≡ A(x⃗) = move(BlockA, BlockB, BlockC) ∨ on(BlockA, BlockC, s) ∧ ¬(A(x⃗) = move(BlockA, BlockC, Someblock))**

where:

- `γ(y⃗, A(x⃗), s)` represents the conditions under which `R(y⃗, do(A(x⃗), s))` is true
  - `A(x⃗) = move(BlockA, BlockB, BlockC)`
- `γ(y⃗, A(x⃗), s)` represent the conditions under which `R(y⃗, do(A(x⃗), s))` is false
  - `A(x⃗) = move(BlockA, BlockC, Someblock)`

**Plain English Explanation:**

**Successor State Axiom for `on(X,Y,S)`:**

This axiom specifically describes how the fluent "block X is on position Y" changes after action execution.

**Formula: Poss(A(x⃗), s) ⊃ on(BlockA, BlockC, do(A(x⃗), s)) ≡ A(x⃗) = move(BlockA, BlockB, BlockC) ∨ on(BlockA, BlockC, s) ∧ ¬(A(x⃗) = move(BlockA, BlockC, Someblock))**

Breaking down:

- **Left side**: `on(BlockA, BlockC, do(A(x⃗), s))` - After executing A, BlockA is on BlockC
- **Right side**: Two cases (at least one must hold)

**Case 1: `A(x⃗) = move(BlockA, BlockB, BlockC)` (positive effect)**

- The action is moving BlockA to BlockC
- Makes `on(BlockA, BlockC, s)` true
- Example: After `move(b1, b2, b3)`, `on(b1, b3, s)` becomes true

**Case 2: `on(BlockA, BlockC, s) ∧ ¬(A(x⃗) = move(BlockA, BlockC, Someblock))` (persistence)**

- BlockA was already on BlockC, and the action doesn't move BlockA away from BlockC
- Example: `on(b1, b2, s)` was true; after `move(b3, b4, b5)`, still true (moving b3 doesn't affect b1-b2)

**Notation:**

- **γ⁺ (makes R true)**: `A(x⃗) = move(BlockA, BlockB, BlockC)` - Moving BlockA to BlockC
- **γ⁻ (makes R false)**: `A(x⃗) = move(BlockA, BlockC, Someblock)` - Moving BlockA away from BlockC to anywhere else

**Examples for `on(b1, b2, s)`:**

1. After `move(b1, table, b2)`: Case 1 satisfied → `on(b1, b2, s)` true
2. After `move(b1, b2, b3)`: Neither case satisfied (Case 2 fails because b1 is moved away from b2) → `on(b1, b2, s)` false
3. After `move(b3, b4, b5)`: Case 2 satisfied (if `on(b1, b2, s)` was true and b1 isn't moved) → `on(b1, b2, s)` remains true

**Design:**

Explicitly states what makes `on` true/false. Other actions don't affect `on` (persist). Avoids listing all actions that don't change `on` state.

---

## 第 19 页

**SitCalc successor state axioms (Prolog Syntax)**

```prolog
% Let's add comments to this code together
clear(X,[move(_,X,_)|S]):-
    poss([move(_,X,_)|S]).

clear(X,[A|S]):-
    poss([A|S]),
    A \= move(_,_,X),
    clear(X,S).

on(X,Y,[move(X,Z,Y)|S]):-
    poss([move(X,Z,Y)|S]).

on(X,Y,[A|S]):-
    poss([A|S]),
    A \= move(X,Y,_),
    on(X,Y,S).
```

**Plain English Explanation:**

**Prolog Successor State Axiom Code:**

This code implements successor state axioms for two fluents: `clear` and `on`.

**1. `clear(X,S)` Successor State Axiom:**

**Rule 1:**

```prolog
clear(X,[move(_,X,_)|S]):- poss([move(_,X,_)|S]).
```

- If the action moves something FROM X (indicated by `move(_,X,_)` where X is the source), then X becomes clear
- `_` is Prolog wildcard meaning "any value"
- When a block is moved away from X, X becomes clear

**Rule 2:**

```prolog
clear(X,[A|S]):- poss([A|S]), A \= move(_,_,X), clear(X,S).
```

- If action doesn't place anything onto X (`A \= move(_,_,X)`) AND X was clear before, then X remains clear
- Persistence rule: X stays clear unless something moves onto it

**2. `on(X,Y,S)` Successor State Axiom:**

**Rule 1:**

```prolog
on(X,Y,[move(X,Z,Y)|S]):- poss([move(X,Z,Y)|S]).
```

- If action moves X from Z to Y, then X is on Y after the action
- "Becomes true" rule: direct effect of moving X to Y

**Rule 2:**

```prolog
on(X,Y,[A|S]):- poss([A|S]), A \= move(X,Y,_), on(X,Y,S).
```

- If action doesn't move X away from Y (`A \= move(X,Y,_)`) AND X was on Y before, then X remains on Y
- Persistence rule: X stays on Y unless explicitly moved away

**Overall Logic:**

Each fluent has two rules:

1. **Rule 1**: Describes "what action makes this fluent true"
2. **Rule 2**: Describes "when this fluent persists (stays true)"

**Prolog Execution:**

Prolog tries rules top-to-bottom. If Rule 1 succeeds, use it; otherwise try Rule 2. This implements OR logic: either becomes true or persists.

**Example Queries:**

- Query: "Is `on(b1,b3,S)` true in `[move(b1,b2,b3)|S]`?"

  - Rule 1 matches: `move(b1,b2,b3)` moves b1 to b3
  - If `poss([move(b1,b2,b3)|S])` true, then `on(b1,b3,S)` true

- Query: "Is `on(b1,b2,S)` true in `[move(b3,b4,b5)|S]`?"
  - Rule 1 doesn't match: action doesn't move b1 to b2
  - Rule 2 matches: action doesn't move b1 from b2; if `on(b1,b2,S)` was true in S, remains true

---

## 第 20 页

**Axiomatizing a Domain**

- **Axiomatizing a Domain** means that an axiomatizer (you?) writes down statements that define what is true about a domain.
- **What is a Domain?**
  A Domain is a specific area or field of knowledge, expertise, or subject matter that an AI system or knowledge base is designed to understand and reason about
- **Examples of domains:**

  - Taxi domain: taxis pick up passengers and drop them off at destinations
  - Kitchen domain: a robot makes dinner in a kitchen
  - Cardiology domain: a doctor sees heart patients, interviews them, conducts tests, and diagnoses them

**Plain English Explanation:**

**What is Axiomatizing a Domain?**

Axiomatizing means writing down logical statements (axioms) that define what is true about a domain - like creating a "rulebook" telling the computer what exists, what can be done, and what happens after actions.

**What is a Domain?**

A domain is a specific area of knowledge or subject matter that an AI system is designed to understand and reason about (e.g., blocks world, taxi world, kitchen world).

**Domain Characteristics:**

- **Bounded**: Focuses only on what's relevant, ignoring outside concerns
- **Ruled**: Objects, actions, and states follow specific rules
- **Reason-able**: Axioms enable inferring new knowledge within the domain

**Domain Examples:**

1. **Taxi Domain**

   - Objects: taxis, passengers, destinations
   - Actions: pick up passenger, drop off passenger
   - States: taxi location, passenger location, whether passenger is in taxi
   - Rules: can only pick up if at passenger location; can only drop off if passenger is in taxi

2. **Kitchen Domain**

   - Objects: robot, ingredients, utensils, dishes
   - Actions: get ingredient, chop, cook, plate
   - States: ingredient location, whether chopped/cooked
   - Rules: must have ingredient to chop; must chop before cooking

3. **Cardiology Domain**
   - Objects: doctor, patients, symptoms, tests, diagnoses
   - Actions: see patient, interview, conduct tests, diagnose
   - States: patient symptoms, test results, diagnosis
   - Rules: must test before diagnosing; certain symptom combinations indicate specific diseases

**Why Axiomatize?**

- **Computer understanding**: Axioms enable computers to understand domain rules and relationships
- **Support reasoning**: Enable deducing new facts
- **Support planning**: Enable planning how to reach goal states

**Axiomatization Challenges:**

- **Completeness**: Must cover all important rules and relationships
- **Accuracy**: Must accurately reflect domain reality
- **Conciseness**: Complete yet avoiding redundancy

---

## 第 21 页

**Steps to Axiomatize a Domain**

In the following steps, the word "determine" implies "write down"

1. Understand the domain by reading about it, studying it, and thinking about it
2. Determine the set of fluents that are sufficient to represent a state in the domain
3. Determine the set of actions that effect (bring about) change in the state (fluent truth values)
4. Determine the precondition axioms for actions in terms of fluents
5. Determine the successor state axiom for each fluent
6. Determine the fluent values in the initial situation s0 (we use `[]` for s0).

**Plain English Explanation:**

**Steps to Axiomatize a Domain:**

A systematic process to completely describe a domain. "Determine" means "identify and write down."

**Step 1: Understand the domain**

- Read, study, and think deeply about the domain
- Read documentation, observe scenarios, think about objects/relationships/rules
- Consult domain experts if available

**Step 2: Determine fluent set**

- Identify fluents sufficient to represent any domain state
- Think: "What information needs tracking?"
- Example (blocks world): `on` (which block on which position), `clear` (which block/position is clear)
- Ensure complete state representation

**Step 3: Determine action set**

- Identify all actions that can change state (fluent truth values)
- Think: "What operations can be performed?"
- Example (blocks world): `move`, `pick_up`, `put_down`

**Step 4: Determine precondition axioms for actions**

- For each action, write precondition axiom using fluents describing "when can this action execute"
- Think: "What conditions must hold to execute this action?"
- Example: moving block requires block is clear, destination is clear, etc.

**Step 5: Determine successor state axiom for each fluent**

- For each fluent, write successor state axiom describing "how does this fluent change after actions"
- Think: "What actions make it true? What actions make it false?"
- Example: `on(X,Y,S)` becomes true after `move(X,Z,Y)`, false after `move(X,Y,W)`

**Step 6: Determine initial state**

- Specify all fluent values in initial situation s0 (we use `[]`)
- List truth values of all fluents initially
- Ensure initial state is complete and consistent

**Process Flow:**

Understand → State Description (fluents) → Change Mechanisms (actions) → Execution Conditions (preconditions) → Change Laws (successor states) → Starting Point (initial state)

**Practical Tips:**

- **Iterative**: Not done in one pass; expect multiple iterations
- **Start simple**: Handle core objects/actions first, expand gradually
- **Validate**: Test axioms with examples
- **Document**: Record decisions and rationale

**Completion Checklist:**

- [ ] All important state information expressible with fluents
- [ ] All important actions listed
- [ ] Each action has precondition axiom
- [ ] Each fluent has successor state axiom
- [ ] Initial state completely defined
- [ ] No contradictions among axioms

---

## 第 22 页

**Time to check your learning!**

Let's see how many key concepts from Situation Calculus you recall by answering the following questions!

1. In plain English, what is being specified when Precondition Axioms are written down for a domain?
2. In plain English, what is being specified when Successor State Axioms are written down for a domain?
3. What is meant by "domain" in the above two questions?

**Plain English Explanation:**

**Knowledge Check Questions:**

**Question 1: What do Precondition Axioms specify?**

- **Answer**: Precondition axioms specify "under what conditions an action can be executed"
- **Like**: Game rules telling you "when you can perform this operation"
- **Specifically**: Using fluents to describe what the world must be like before the action
- **Example**: To move a block, the block must be clear, destination must be clear, block must be at source position

**Question 2: What do Successor State Axioms specify?**

- **Answer**: Successor state axioms specify "how world state changes after executing an action"
- **Like**: Describing action "effects" - "what happens after doing this action"
- **Specifically**: For each fluent, stating which actions make it true, false, or leave it unchanged
- **Example**: After `move(b1, b2, b3)`, `on(b1, b3, s)` becomes true, `on(b1, b2, s)` becomes false

**Question 3: What is meant by "domain"?**

- **Answer**: A domain is a specific area of knowledge or subject matter
- **Like**: The "small world" we're focusing on (e.g., blocks world, taxi world)
- **Characteristics**:
  - Bounded: Focuses only on what's within the domain
  - Ruled: Objects, actions, and states follow specific rules
  - Reason-able: Axioms enable inferring new knowledge
- **Examples**: blocks world, kitchen world, cardiology domain

**How to Answer:**

- Use your own words in plain English
- No need for complex logical symbols
- Use examples to illustrate
- Show you understand core concepts

**Review Summary:**

- **Precondition axioms** = "when can we do it"
- **Successor state axioms** = "what happens after we do it"
- **Domain** = "the small world we're focusing on"

---
