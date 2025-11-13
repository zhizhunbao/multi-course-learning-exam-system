# CST8503 Assn2 SitCalc Monkey

---

CST8503 Assignment 2 SitCalc Monkey and Bananas

## Overview

The famous Monkey and Bananas problem has many variations, solutions, and implementations. The purpose of this assignment is to gain skill in Knowledge Representation, Logic Programming, and Planning by applying the Situation Calculus and Prolog to a specific version of the problem.

When you have finished this assignment, you will have the ability to use the following Situation Calculus and Prolog concepts in Prolog programs to solve planning problems:

- Situation Calculus axiomatizations
- Identify actions for a domain
- Identify fluents for a domain
- Write precondition axioms for a domain
- Write successor state axioms for a domain
- Formulate Situation Calculus axiomatizations as Prolog clauses
- Implement and debug Prolog clauses to solve a planning problem

### Plain-Language Overview

- You will practice describing how a small world works using logic instead of plain words.
- You will write Prolog code that lists what the monkey can do and what is true after each action.
- By the end, you should be comfortable using logic rules to help a program find a plan.

## Monkey and Bananas Problem

In this assignment, we will consider this exact version of the Monkey and Bananas problem:

- There is a monkey, a single bunch of bananas (or one banana, if you prefer), and a box
- The monkey, box, and bananas are each at different locations to start, Locations 1, 2, and 3
- The bananas are hanging too high for the monkey to reach, but if the monkey climbs on top of the box, the monkey can grab the bananas
- The monkey is analogous to a robot with the following basic functionality:
  - The monkey can go to a specific location
  - The monkey can push the box to a specific location
  - The monkey can climb onto and climb off the box
  - If the conditions are right, the monkey can grab the bananas

The monkey needs to plan a sequence of actions that will result in achieving the goal: the monkey having the bananas

### Plain-Language Problem Description

- Think of a puzzle where the monkey needs to bring a box under the bananas, climb up, and grab them.
- The monkey can walk, push the box, climb on/off, and take the bananas when ready.
- Your job is to describe those abilities clearly so a computer can search for the right sequence.

## The State of the world

Carefully read the above description of the problem. At this stage in solving the problem, we are thinking about how to use fluents (predicates that have a situation argument) to represent what is true about this little world.

What fluents are sufficient to completely represent the state of this world? Think about the questions that can be asked about this world at any given time. If someone asks, for example, “What is the location of the monkey?”, then will one or more of your fluents be sufficient to give the answer to that question? Concentrate on the relevant questions, given the description. For example, “How much does the monkey weigh?” or “What color is the monkey?” are not relevant questions, given the description.

What is the goal in terms of your fluents? In other words, what fluent (or set of fluents) indicates whether the goal has been achieved or not?

Write down the fluents in a prolog program file in Prolog notation.

Indicate in a comment what is the Goal state in terms of those fluents.

### Plain-Language State Explanation

- List facts that answer key questions like “Where is the monkey?” or “Does the monkey have the bananas?”.
- Only include facts that matter for solving the puzzle; ignore things like color or weight.
- Clearly state which fact (or facts) mean the goal is reached—for example, “monkey has bananas”.

## Actions: how does the world change

At this stage, we are thinking about how the state of our monkey world can change. In other words, what actions are relevant in this world? We are thinking only about the things the monkey (robot) can do, since according to the description, the bananas and the box cannot perform any actions.

In a comment in your Prolog program, write down the set of actions relevant to this world.

### Plain-Language Actions Explanation

- Make a short list of what the monkey can do: walk, push the box, climb, grab bananas.
- Each action should be something the monkey can actually perform in this puzzle.
- Write them as Prolog facts or comments so the program knows which moves are allowed.

## Precondition Axioms

Here we are thinking about the conditions (in terms of fluents) under which each action possible.

In your program, write down the precondition axiom for each action in the domain.

### Plain-Language Preconditions Explanation

- For every action, say when it is allowed. Example: to push the box, the monkey must be at the box.
- These rules prevent impossible moves, like pushing the box when the monkey is somewhere else.
- Write each rule in Prolog so the program checks the conditions before choosing an action.

## Successor State Axioms

Here we are concerned with how does the state change (or not change) after each action occurrence?

In your Prolog program, write down the successor state axiom for each fluent in the domain.

### Plain-Language Successor Explanation

- Describe how each fact changes (or stays the same) after an action happens.
- Example: after a “go to location 2” action, the monkey’s location fact becomes location 2.
- Successor state axioms keep track of the world step by step as actions happen.

## Planning the Goal

Finish and run the Prolog program that implements this domain, including a Prolog procedure to implement the planning to achieve the goal:

```prolog
%plan(g(S),S) is true when g(S) is a formula (the goal state depending on S) that is true, and S is an action history (the plan)

plan(Goal,Plan):-bposs(Plan),Goal.

%bposs(S) is true when S is a sequence of possible actions considering shortest sequences first

bposs(S) :- tryposs([],S).

% tryposs(S,S) is true when S is a sequence of possible actions considering shortest sequences first (breadth first search for possible action sequences)

tryposs(S,S) :- poss(S).

tryposs(X,S) :- tryposs([_|X],S).
```

### Plain-Language Planning Explanation

- `plan/2` tries different action sequences until the goal facts are true.
- `bposs/1` and `tryposs/2` explore possible actions in order of shortest plan first.
- The search continues until it finds a sequence where the monkey ends up holding the bananas.

## Demonstration

Submit your prolog program file (use a “.prolog” extension to avoid the “.pl” problem) to Brightspace

Then show your lab instructor that your program can produce a plan for the monkey to grab the bananas, in other words, has_bananas(y,S) is true for some sequence of actions S.

Be prepared to explain your solution and answer questions.

### Plain-Language Demonstration Notes

- Turn in the Prolog file you created so your instructor can review the logic.
- Be ready to run the program and show it finds a plan where the monkey gets the bananas.
- Make sure you can explain the steps your code takes and answer follow-up questions.
