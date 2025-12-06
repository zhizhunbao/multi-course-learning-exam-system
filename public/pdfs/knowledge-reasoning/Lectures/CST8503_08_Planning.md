# CST8503 08 Planning
_从 PDF 文档转换生成_

---
_注: 共提取了 1 张图片_

## 第 1 页

![图片](./CST8503_08_Planning_images/page_001_img_01.png)

### Planning

---

## 第 2 页

Lesson Overview (Agenda)
In the following lesson, we will explore:
### Applications of Knowledge Representation
### Planning
### Breadth-first vs Depth-first planning
### Prolog Programming

---

## 第 3 页

### A BLOCKS WORLD PROBLEM
c
a b
1 2 3 4
▪
Three blocks block(a), block(b), block(c)
▪
four locations location(1), location(2), location(3), location(4)
▪
Relationships in initial state:
on(block(c),block(a)), on(block(a),location(1)), on(block(b),location(3)),
clear(location(2)), clear(location(4)), clear(block(b)), clear(block(c))
▪
Goal of plan e.g. build stack a, b, c : Goal stated
as: (on(block(a),block(b)), on(block(b),block(c)))

---

## 第 4 页

Action schema
▪
Represents a number of actions by using variables
▪
move( X, Y, Z)
X stands for any block
Y, Z stand for any block or location

---

## 第 5 页

block_exists(block(a)).
### Situation Calculus Blocks World
block_exists(block(b)).
block_exists(block(c)).
location_exists(location(1)).
### Initial State:
Action: move(X,Y,Z) location_exists(location(2)).
Fluents: clear, on location_exists(location(3)).
location_exists(location(4)).
clear(location(2),[]).
clear(location(4),[]).
clear(block(b),[]).
clear(block(c),[]).
on(block(a), location(1),[]).
on(block(b), location(3),[]).
on(block(c), block(a),[]).

---

## 第 6 页

Sitcalc precondition axiom
%Let's add comments to this code together
poss([move(Block,From,To)|S]):-
block_exists(Block),
clear(Block,S),
(location_exists(To) ; block_exists(To)),
Block \= To,
clear(To,S),
(location_exists(From);block_exists(From)),

```prolog
on(Block,From,S).
```

---

## 第 7 页

SitCalc successor state axioms
% Let's add comments to this code together
clear(X,[move(Z,X,Y)|S]):- poss([move(Z,X,Y)|S]).
A \= move(_,_,X),
A \= move(X,Y,_),

```prolog
clear(X,[A|S]):-
poss([A|S]),
clear(X,S).
on(X,Y,[move(X,Z,Y)|S]):- poss([move(X,Z,Y)|S]).
on(X,Y,[A|S]):-
poss([A|S]),
on(X,Y,S).
```

---

## 第 8 页

### Sample Queries
?- on(block(b),location(2),S).
S = [move(block(b), location(3), location(2))] .
?-
Is planning that easy? Not so fast…
?- clear(location(3),S).
ERROR: Stack limit (1.0Gb) exceeded

---

## 第 9 页

Depth-first search and Infinite Loops
[trace] ?- clear(location(3),S). What's Happening?
Call: (10) clear(location(3), _3838) ? creep Location(3) is clear if we move something from it
Call: (11) poss([move(_5048, location(3), _5052)|_5030]) ? creep Can we move a block?
Call: (12) block_exists(5048) ? creep
Exit: (12) block_exists(block(a)) ? creep Is block(a) a block?
Call: (12) clear(block(a), _5030) ? creep Is block(a) clear?
Call: (13) poss([move(_8080, block(a), _8084)|_8062]) ? creep Can we move a block from block(a)?
Call: (14) block_exists(_8080) ? creep No progress since 12
Exit: (14) block_exists(block(a)) ? creep Is block(a) a block?
Call: (14) clear(block(a), _8062) ? creep Is block(a) clear? (in infinite loop)
Call: (15) poss([move(_11112, block(a), _11116)|_11094]) ? creep
Call: (16) block(_11112) ? creep
Exit: (16) block_exists(block(a)) ? creep
Call: (16) clear(block(a), _11094) ? creep
In this case, Prolog is
Call: (17) poss([move(_14144, block(a), _14148)|_14126]) ? creep
Call: (18) block_exists(_14144) ? creep descending an
Exit: (18) block_exists(block(a)) ? creep
infinitely long branch
Call: (18) clear(block(a), _14126) ? creep
of the search tree
Call: (19) poss([move(_17176, block(a), _17180)|_17158]) ?

---

## 第 10 页

### Breadth First Planning
We are searching a tree of plans.
Depth first plans include an infinite sequence of moving a block back and forth.
We can fix the depth-first infinite loop problem by arranging for a breadth first search
We first generate a plans of length 1, until one of them satisfies the goal
Once plans of length 1 are exhausted, we move on to plans of length 2
And so on, until the goal succeeds, then we have our plan.

---

## 第 11 页

Breadth-first planning (cont'd)
First, try a plan of length 1
?- poss([A]),clear(location(3),[A]).
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

---

## 第 12 页

Breadth-first planning (cont'd)
First, try a plan of length 2
?- poss([B,A]),clear(location(3),[B,A]).
B = move(block(b), location(2), location(4)),
A = move(block(b), location(3), location(2))
…etc…

---

## 第 13 页

We can implement breadth-first
planning
% plan for a goal by doing a breadth-first search for plans

```prolog
plan(Goal,Plan):-bposs(Plan),Goal.
bposs(S) :- tryposs([],S).
tryposs(S,S) :- poss(S). %S is a plan; otherwise..
tryposs(X,S) :- tryposs([_|X],S). %increase plan length
```

---

## 第 14 页

Implement breadth-first
planning (cont'd)
?- plan(clear(location(3),S),S).
S = [move(block(b), location(3), location(2))]

---

## 第 15 页

Time to check your learning!
Let’s see how many key concepts from Planning you recall by answering the
following questions!
Why does a "normal" planning query not always terminate?
How does a breadth-first planning query address that problem?

---

