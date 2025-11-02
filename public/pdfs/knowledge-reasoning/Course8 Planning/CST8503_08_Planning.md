# CST8503 08 Planning

_从 PDF 文档转换生成_

---

## Contents

- Lesson Overview (Agenda)
- Applications of Knowledge Representation
- Planning
- Breadth-first vs Depth-first planning
- Prolog Programming
- A BLOCKS WORLD PROBLEM

---

## Page 1

### Planning

---

## Page 2

### Lesson Overview (Agenda)

In this lesson, we will explore:

- Applications of Knowledge Representation
- Planning
- Breadth-first vs Depth-first planning
- Prolog Programming

---

## Page 3

### A BLOCKS WORLD PROBLEM

- Three blocks: `block(a)`, `block(b)`, `block(c)`
- Four locations: `location(1)`, `location(2)`, `location(3)`, `location(4)`
- Initial state relationships:
  - `on(block(c), block(a))`
  - `on(block(a), location(1))`
  - `on(block(b), location(3))`
  - `clear(location(2))`, `clear(location(4))`
  - `clear(block(b))`, `clear(block(c))`
- Example goal: build stack a, b, c
  - Goal: `on(block(a), block(b)), on(block(b), block(c))`

---

## Page 4

### Action schema

- Represents a number of actions by using variables
- `move(X, Y, Z)`
  - `X` stands for any block
  - `Y`, `Z` stand for any block or location

---

## Page 4.1

### Quick intuition: situations and plans (beginner-friendly)

- A situation is the “history so far.” The empty history `[]` is the start.
- A plan is a list like `[A1, A2, A3]`: do `A1`, then `A2`, then `A3`.
- `[A | S]` means “do action `A` next, after history `S`.” When `S = []`, `[A | []]` is `[A]`.
- `poss([A | S])` asks: are the preconditions true so we can do `A` next after `S`?

Tiny picture:

```
history S  --do A-->  new situation [A | S]
[]          --do A-->  [A]
```

---

## Page 5

#### Before you read the Prolog/Situation Calculus code on this page

- Prolog basics: facts and rules, variables start with uppercase, queries use `?- Goal.`
- Situation Calculus:
  - Introduced by John McCarthy to represent worlds that change via actions. Background: McCarthy (1963); canonical formalization: Reiter (2001).
  - Key ideas: object constants (e.g., `block(a)`), actions (e.g., `move(X, Y, Z)`), fluents that vary with situations (e.g., `on/3`, `clear/2`), and a situation argument `S` that denotes the history (sequence) of executed actions.
  - The initial situation is written as the empty list `[]`, meaning “no actions have been executed yet.”
- Blocks World modeling: blocks can be on blocks or locations; `clear(X, S)` means the top of X is free; `on(X, Y, S)` means X is on Y.
- Code style: this handout writes fluents as predicates with an explicit situation parameter (e.g., `on(Block, Support, S)`) to state “the property holds in situation S.”
- References:
  - McCarthy, J. (1963). Situations, Actions, and Causal Laws. [overview](https://plato.stanford.edu/entries/sitcalc/)
  - Reiter, R. (2001). Knowledge in Action. MIT Press. [book page](https://mitpress.mit.edu/9780262182229/knowledge-in-action/)
  - SWI‑Prolog documentation: [https://www.swi-prolog.org/](https://www.swi-prolog.org/)

### Situation Calculus: Blocks World — Initial Facts and Fluents

```prolog
% Domain objects
block_exists(block(a)).
block_exists(block(b)).
block_exists(block(c)).

location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).
location_exists(location(4)).

% Action schema (place block X from Y onto Z)
% move(X, Y, Z) where X is a block; Y/Z are block or location

% Fluents at initial state S = []
clear(location(2), []).
clear(location(4), []).
clear(block(b), []).
clear(block(c), []).

on(block(a), location(1), []).
on(block(b), location(3), []).
on(block(c), block(a), []).
```

---

## Page 6

### SitCalc precondition axiom

Before generating or checking any plan, we must know when an action is executable. The predicate `poss([HeadAction | S])` encodes the preconditions for the head action in situation `S`. For `move(Block, From, To)`, the move is allowed only if:

- `Block` exists and is clear in `S`.
- `To` is a valid support (location or block), different from `Block`, and is clear in `S`.
- `From` is a valid support and `Block` is currently on `From` in `S`.

```prolog
% A plan is executable if its head action is executable in S
% Preconditions for move(Block, From, To)
poss([move(Block, From, To) | S]) :-
    block_exists(Block),
    clear(Block, S),
    ( location_exists(To) ; block_exists(To) ),
    Block \= To,
    clear(To, S),
    ( location_exists(From) ; block_exists(From) ),
    on(Block, From, S).
```

#### Tutorial: Using `poss/1`

- In plain words: “Can I take this next step now?”
- Purpose: decide whether the head action of a plan is executable in situation `S`.
- Signature: `poss([Action | S])` where `S` is a list of past actions (the situation).
- Semantics: `S` is the prior history. `[Action | S]` means “do `Action` next, after `S`.” If `S = []`, `[Action | []]` equals `[Action]`.
- One-step checks (single-action plans). Here `S0 = []` is the initial situation:

```prolog
S0 = [],
?- poss([move(block(b), location(3), location(2)) | S0]).
true.

% Equivalent shorthand at the initial situation:
?- poss([move(block(b), location(3), location(2))]).
true.

% This fails because block(a) is NOT clear initially (block(c) is on a)
S0 = [],
?- poss([move(block(a), location(1), block(c)) | S0]).
false.

% Equivalent shorthand at the initial situation:
?- poss([move(block(a), location(1), block(c))]).
false.
```

- Multi-step checks. Let `S1` be a prior (already executed) action history, e.g. moving `c` off `a` to free `a`:

```prolog
S1 = [move(block(c), block(a), location(4)) | []],
?- poss([move(block(a), location(1), block(b)) | S1]).
true.
```

- Planning: `poss/1` checks only the head action against the provided situation list. To validate whole plans or search for a plan, use the breadth-first planner (see Pages 11–14):

```prolog
?- plan(clear(location(3), S), S).
S = [move(block(b), location(3), location(2))].
```

- Notes and pitfalls:
  - `poss/1` is user-defined (not a Prolog built-in).
  - It evaluates preconditions in the given situation argument `S`; it does not by itself enumerate actions or guarantee the tail `S` is executable unless combined with the generator (`bposs/1`, `tryposs/2`).
  - In Prolog, `[Action]` is shorthand for `[Action | []]` (initial situation).

---

## Page 7

### SitCalc successor state axioms

Successor State Axioms define how fluents change after executing the head action. They provide a compact, non-monotonic description that avoids frame axioms explosion:

- `clear/2`: becomes true when something moves off X; otherwise it persists unless X is the destination of a move.
- `on/3`: becomes true when X is moved to Y; otherwise it persists unless X is moved from Y.

```prolog
% clear/2 after executing an action
clear(X, [move(_, X, _) | S]) :-
    poss([move(_, X, _) | S]).

clear(X, [A | S]) :-
    poss([A | S]),
    A \= move(_, _, X),
    clear(X, S).

% on/3 after executing an action
on(X, Y, [move(X, Z, Y) | S]) :-
    poss([move(X, Z, Y) | S]).

on(X, Y, [A | S]) :-
    poss([A | S]),
    A \= move(X, Y, _),
    on(X, Y, S).
```

---

## Page 8

### Sample Queries

These queries illustrate that while some goals are easy (a single move), others can cause non-termination under default depth-first search (DFS). Asking for `clear(location(3), S)` without bounding plan length lets DFS chase infinite back-and-forth moves.

```prolog
?- on(block(b), location(2), S).
S = [move(block(b), location(3), location(2))].
```

Is planning that easy? Not so fast…

```prolog
?- clear(location(3), S).
ERROR: Stack limit (1.0Gb) exceeded
```

---

## Page 9

### Depth-first search and Infinite Loops

Pure DFS in Prolog explores one branch to arbitrary depth before backtracking. In planning domains with reversible actions, there are infinite branches (e.g., moving a block back and forth), which leads to non-termination for some queries unless we change the search strategy.

```prolog
?- clear(location(3), S).
% ... Prolog trace shows DFS descending an infinitely long branch ...
```

---

## Page 10

### Breadth First Planning

- We are searching a tree of plans.
- Depth-first plans can include an infinite sequence of moving a block back and forth.
- Fix: arrange a breadth-first search over plan length.
- Procedure:
  - Generate all plans of length 1; if one satisfies the goal, stop.
  - Otherwise, generate all plans of length 2.
  - Continue increasing length until a plan satisfies the goal.

---

## Page 11

### Breadth-first planning (cont'd)

To avoid DFS non-termination, we search by increasing plan length. First try all length-1 plans, then length-2, and so on. The queries below fix the plan length and ask whether the goal holds after executing that plan.

```prolog
% First, try a plan of length 1
?- poss([A]), clear(location(3), [A]).
```

---

## Page 12

### Breadth-first planning (cont'd)

Now we try all plans of length 2, then 3, etc. Because each length is finite, the search terminates at each stage and finds the shortest solution first.

```prolog
% Next, try a plan of length 2
?- poss([B, A]), clear(location(3), [B, A]).
B = move(block(b), location(2), location(4)),
A = move(block(b), location(3), location(2))
% …etc…
```

---

## Page 13

### We can implement breadth-first planning

The following encoding separates two concerns:

- `bposs/1` and `tryposs/2` enumerate candidate plans by increasing length (breadth-first over length).
- `plan/2` plugs in an arbitrary goal (e.g., `clear(location(3), S)`) and returns a shortest plan `Plan` that makes the goal true.

```prolog
% Plan for a goal by doing a breadth-first search over plan length
plan(Goal, Plan) :-
    bposs(Plan),
    Goal.

bposs(S) :-
    tryposs([], S).

tryposs(S, S) :-
    poss(S). % S is a plan

tryposs(X, S) :-
    tryposs([_ | X], S). % increase plan length
```

---

## Page 14

### Implement breadth-first planning (cont'd)

`plan/2` yields the shortest sequence of moves that achieves the goal under the given axioms. The example shows the minimal plan to make `location(3)` clear. Substitute other goals (e.g., stacking `a` on `b` on `c`) to obtain their shortest plans.

```prolog
?- plan(clear(location(3), S), S).
S = [move(block(b), location(3), location(2))]
```

---

## Page 15

### Check your learning

Let’s see how many key concepts from Planning you recall by answering the following:

1. Why does a "normal" planning query not always terminate?
2. How does a breadth-first planning query address that problem?

---
