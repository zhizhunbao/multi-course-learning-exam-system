# CST8503 Lab5 Knowledge Representation and Planning

---

## Blocks World

## Overview

We build on your experience from previous labs to write a Prolog program that implements Knowledge Representation of a Blocks domain.

When you have finished this lab exercise, you will have practiced the ability to

- Write logical axioms (Prolog clauses – facts or rules) to represent a blocks domain from a robot's perspective

- Solve a planning blocks world planning problem using Knowledge Representation and Prolog

- Use a graphical tracing utility to watch your programs execute

## Blocks Domain

We will be representing the following domain:

- There are three blocks that exist in this world, named block(a), block(b), and block(c).

- There are four positions that exist where the three blocks can be placed, named position(1), position(2), position(3), and position(4).

- A position or block is considered clear if it has no block on top of it.

- Initially, Block a is on Position 1, Block b is on Position 3, and Block c is on Block a.

- The robot has the ability to move a clear block from its current position to a new clear position or a new clear block.

## The State of the World

Now that some aspect of our worlds can change due to actions, in addition to statements that are unaffected by actions, we will need to make statements that depend on what actions have happened. For this we use a type of predicate called a fluent. A fluent is a predicate that takes a situation (list of actions) argument in the last position. Intuitively, a fluent is used to state what is true after a list (perhaps an empty list) of actions happens.

What fluents and regular predicates are sufficient to completely represent the state of this blocks world? HINT: think about the first four bullets in the domain description.

Prolog code/comments: Write down the declarative comment for each of the fluent names and predicate names that will represent the state of the blocks world described above.

## Actions: How Does the World Change

What actions are relevant in this world? We are thinking only about the things the robot can do. HINT: think about the fifth bullet in the domain description above.

Write down the set of actions relevant to this world. HINT: there is one action expression, with variables in argument positions.

## Precondition Axioms

Under which conditions is each action possible? We will use a special fluent with the following declarative comment:

```
% poss([A|S]) means that action A is possible after the list of actions S has been carried out from right, to left.
% After we're comfortable with this concept, we can graduate to say that A is possible in S,
% as long as we remember that S is not a state that the world can be in.
% A situation is a list of actions with the earliest action on the right side and the most recent action on the left side.
```

Note: in the situation calculus, poss has two arguments as in poss(A,S), but since action sequences read from right to left, we will find it convenient to use the list [A|S] as a single argument for poss/1, so poss([A|S]) is what we'll use in our Prolog code.

Prolog coding: Write down the precondition axiom for each action in the domain. There is one action schema in this case, so there will be one precondition axiom.

## Successor State Axioms

How does the state change (or not) after each action occurrence?

Prolog Coding: write down the successor state axiom (prolog rule) for each fluent in the domain. Each one will have this form:

```
fluentname(arg1, arg2, …, [A | S]) :-  % note that [A|S] is a situation with most recent action A
    poss([A|S]),  % could have chosen poss(A,S) but we chose poss([A|S])
                  % that is, we defined poss/1 above instead of poss/2
    (
        A = <action that makes fluentname true>
    ;
        A \= <action that makes fluentname false>,
        fluentname(arg1,arg2, …, S)
    ).
```

## Planning the Goal

Write and run the prolog program that implements this domain (use the axioms you wrote above), including a prolog procedure to implement the planning to achieve the goal:

```
% plan(g(S),S) means that S is a plan to achieve g, where g is the goal state that depends on a Situation S.
plan(Goal,Plan) :- bposs(Plan), Goal.

bposs(S) :- tryposs([],S).

tryposs(S,S) :- poss(S).  % Note this uses single argument poss
tryposs(X,S) :- tryposs([_|X],S).
```

Write down various Goal states in terms of the fluents that represent a state in the world:

- Can your robot plan a course of action to move Block a to Position 2? What goal does this correspond to?

- Can your robot plan a course of action to move Block a to Position 3? What goal does this correspond to?

## Demonstration

- Explain how the logical axioms represent a blocks domain from a robot's perspective

- Run queries to show that you have solved the blocks world planning problem using Knowledge Representation and Prolog

---

_This document is translated from CST8503_Lab5_KR_Blocks.docx_
