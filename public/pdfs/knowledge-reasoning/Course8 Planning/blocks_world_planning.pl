% Situation Calculus

% Static predication - Domain objects
block_exists(block(a)).
block_exists(block(b)).
block_exists(block(c)).

location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).
location_exists(location(4)).

% Sitcalc precondition axioms
% Base case
poss([]).

% Recursive case
poss([move(Block, From, To) | S]) :-
    poss(S),
    block_exists(Block),
    clear(Block, S),
    on(Block, From, S),
    Block \= To,
    ( location_exists(From) ; block_exists(From) ),
    ( location_exists(To) ; block_exists(To) ),
    clear(To, S).

% Sitcalc Successor State Axioms for clear/2
% Initial state
clear(block(c), []).
clear(block(b), []).
clear(location(2), []).
clear(location(4), []).

% After executing an action
clear(X, [move(_, X, _) | S]) :-
    poss([move(_, X, _) | S]).

clear(X, [A | S]) :-
    poss([A | S]),
    A \= move(_, _, X),
    clear(X, S).

% Sitcalc Successor State Axioms for on/3
% Initial state
on(block(a), location(1), []).
on(block(b), location(3), []).
on(block(c), block(a), []).

% After executing an action
on(X, Y, [move(X, Z, Y) | S]) :-
    poss([move(X, Z, Y) | S]).

on(X, Y, [A | S]) :-
    poss([A | S]),
    A \= move(X, Y, _),
    on(X, Y, S).


% ============================================
% Test Code
% ============================================

% Test predicate with detailed logging
test :-
    write('========================================'), nl,
    write('Starting Tests...'), nl,
    write('========================================'), nl, nl,

    write('Executing: clear(block(c), [])'), nl,
    (   clear(block(c), []) ->
        write('  -> Result: SUCCESS (returned true)'), nl
    ;   write('  -> Result: FAILED (returned false)'), nl
    ),
    nl,

    write('Executing: clear(block(b), [])'), nl,
    (   clear(block(b), []) ->
        write('  -> Result: SUCCESS (returned true)'), nl
    ;   write('  -> Result: FAILED (returned false)'), nl
    ),
    nl,

    write('Executing: on(block(a), location(1), [])'), nl,
    (   on(block(a), location(1), []) ->
        write('  -> Result: SUCCESS (returned true)'), nl
    ;   write('  -> Result: FAILED (returned false)'), nl
    ),
    nl,

    write('Executing: on(block(c), block(a), [])'), nl,
    (   on(block(c), block(a), []) ->
        write('  -> Result: SUCCESS (returned true)'), nl
    ;   write('  -> Result: FAILED (returned false)'), nl
    ),
    nl,

    write('Executing: poss([])'), nl,
    (   poss([]) ->
        write('  -> Result: SUCCESS (returned true)'), nl
    ;   write('  -> Result: FAILED (returned false)'), nl
    ),
    nl,

    write('========================================'), nl,
    write('All tests completed!'), nl,
    write('========================================'), nl.
