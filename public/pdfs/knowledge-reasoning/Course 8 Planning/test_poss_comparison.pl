:- encoding(utf8).

% Test file to compare two poss rules

% Initial state facts
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

:- discontiguous on/3.
:- discontiguous clear/2.

% Base case
poss([]).

% Successor state axioms (simplified for testing)
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

% ============================================
% VERSION 1: First rule (returns false)
% ============================================
poss_v1([move(Block,From,To)|S]):-
    block_exists(Block),
    clear(Block, S),
    on(Block, From, S),
    Block \= To,
    ( location_exists(From) ; block_exists(From) ),
    ( location_exists(To) ; block_exists(To) ),
    clear(To, S).

% ============================================
% VERSION 2: Second rule (works)
% ============================================
poss_v2([move(Block,From,To)|S]):-
    block_exists(Block),
    clear(Block,S),
    (location_exists(To) ; block_exists(To)),
    Block \= To,
    clear(To,S),
    (location_exists(From);block_exists(From)),
    on(Block,From,S).

