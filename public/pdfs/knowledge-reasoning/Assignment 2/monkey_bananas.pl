:- encoding(utf8).
% Monkey and Bananas Planning System (using Situation Calculus, SWI-Prolog)
% ------------------------------------------------------
% This program can automatically plan how the monkey can grab the bananas.
% Main components:
%   - Fluents (state-dependent predicates)
%   - Initial state (starting positions and states)
%   - Actions and precondition axioms (when actions can be performed)
%   - Successor state axioms (how the world changes after actions)
%   - Automatic planning algorithm (find shortest action sequence)
%
% ============================================================================
% Problem Description
% ============================================================================
% - Monkey, box, and bananas are at different locations (1, 2, 3)
% - Bananas are hanging high, unreachable from ground
% - Monkey can: go to locations, push box, climb on/off box, grab bananas
% - Goal: monkey has the bananas
%
% ============================================================================

% Discontiguous declarations for better code organization
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
% Fluents: State-dependent predicates
% ============================================================================
%
% The following fluents completely represent the state of the monkey world:
%
% 1. at(monkey, Location, S) - monkey is at Location in situation S
% 2. at(box, Location, S) - box is at Location in situation S
% 3. at(bananas, Location) - bananas are at Location (constant, doesn't change)
% 4. on_box(monkey, S) - monkey is on the box in situation S
% 5. has_bananas(monkey, S) - monkey has the bananas in situation S
%
% Note: We use at/3 for both monkey and box since both can move.
%       Bananas location is constant, so we use at/2 without situation parameter.
%
% Goal State: has_bananas(monkey, S) = true
%
% ============================================================================

% ============================================================================
% Initial State: Starting configuration
% ============================================================================

% Monkey starts at location 1
at(monkey, location(1), []).

% Monkey is not on the box initially
% (represented by the absence of on_box(monkey, []))

% Monkey doesn't have bananas initially
% (represented by the absence of has_bananas(monkey, []))

% Box starts at location 2
at(box, location(2), []).

% Bananas are at location 3 (constant, doesn't need situation parameter)
at(bananas, location(3)).

% ============================================================================
% Actions in this domain:
% ============================================================================
%
% 1. go(Location) - monkey goes to Location
% 2. push(Location) - monkey pushes box to Location
% 3. climb_on - monkey climbs onto the box
% 4. climb_off - monkey climbs off the box
% 5. grab - monkey grabs the bananas
%
% ============================================================================

% ============================================================================
% Precondition Axioms: When actions can be performed
% ============================================================================

% Empty state (initial state) is always valid
poss([]).

% Action: go(L) - monkey goes to location L
% Preconditions:
% 1. Previous state S must be valid
% 2. L must be a valid location
% 3. Monkey must not be on the box (can't walk while on box)
poss([go(L) | S]) :-
    poss(S),
    location_exists(L),
    \+ on_box(monkey, S).

% Action: push(L) - monkey pushes box to location L
% Preconditions:
% 1. Previous state S must be valid
% 2. L must be a valid location
% 3. Monkey must not be on the box
% 4. Monkey must be at the same location as the box
poss([push(L) | S]) :-
    poss(S),
    location_exists(L),
    \+ on_box(monkey, S),
    at(monkey, MonkeyLoc, S),
    at(box, MonkeyLoc, S).

% Action: climb_on - monkey climbs onto the box
% Preconditions:
% 1. Previous state S must be valid
% 2. Monkey must not already be on the box
% 3. Monkey must be at the same location as the box
poss([climb_on | S]) :-
    poss(S),
    \+ on_box(monkey, S),
    at(monkey, MonkeyLoc, S),
    at(box, MonkeyLoc, S).

% Action: climb_off - monkey climbs off the box
% Preconditions:
% 1. Previous state S must be valid
% 2. Monkey must be on the box
poss([climb_off | S]) :-
    poss(S),
    on_box(monkey, S).

% Action: grab - monkey grabs the bananas
% Preconditions:
% 1. Previous state S must be valid
% 2. Monkey must be on the box
% 3. Monkey must not already have the bananas
% 4. Box must be at the same location as the bananas
poss([grab | S]) :-
    poss(S),
    on_box(monkey, S),
    \+ has_bananas(monkey, S),
    at(box, BoxLoc, S),
    at(bananas, BoxLoc).

% ============================================================================
% Successor State Axioms: How the world changes after actions
% ============================================================================

% --- Fluent: at(monkey, Location, S) ---

% Monkey is at L after going to L
at(monkey, L, [go(L) | S]) :-
    poss([go(L) | S]).

% Monkey is at L after pushing box to L
at(monkey, L, [push(L) | S]) :-
    poss([push(L) | S]).

% Other actions: monkey location doesn't change
at(monkey, L, [A | S]) :-
    poss([A | S]),
    A \= go(_),
    A \= push(_),
    at(monkey, L, S).

% --- Fluent: at(box, Location, S) ---

% Box is at L after being pushed to L
at(box, L, [push(L) | S]) :-
    poss([push(L) | S]).

% Other actions: box location doesn't change
at(box, L, [A | S]) :-
    poss([A | S]),
    A \= push(_),
    at(box, L, S).

% --- Fluent: on_box(monkey, S) ---

% Monkey is on box after climbing on
on_box(monkey, [climb_on | S]) :-
    poss([climb_on | S]).

% Monkey stays on box unless climbing off
on_box(monkey, [A | S]) :-
    poss([A | S]),
    A \= climb_off,
    on_box(monkey, S).

% --- Fluent: has_bananas(monkey, S) ---

% Monkey has bananas after grabbing them
has_bananas(monkey, [grab | S]) :-
    poss([grab | S]).

% Once monkey has bananas, they keep them (frame axiom)
has_bananas(monkey, [A | S]) :-
    poss([A | S]),
    has_bananas(monkey, S).

% ============================================================================
% Automatic Planning: Find shortest action sequence
% ============================================================================
% plan(Goal, Plan) is true when:
%   - Plan is a sequence of possible actions
%   - Goal is true in the situation resulting from executing Plan
%   - Searches for shortest plan first (breadth-first)

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
% Usage Examples
% ============================================================================
%
% Example 1: Query initial state
%   ?- at(monkey, location(1), []).
%   true.
%
%   ?- at(box, location(2), []).
%   true.
%
%   ?- at(bananas, location(3)).
%   true.
%
% Example 2: Check if an action is possible
%   ?- poss([go(location(2))]).
%   true.
%
%   ?- poss([climb_on]).
%   false.  % Monkey not at box location
%
% Example 3: Query state after an action
%   ?- at(monkey, location(2), [go(location(2))]).
%   true.
%
% Example 4: Plan to grab the bananas (MAIN GOAL)
%   ?- plan(has_bananas(monkey, S), S).
%   S = [grab, climb_on, push(location(3)), go(location(2))]
%
% Example 5: Verify the plan works
%   ?- has_bananas(monkey, [grab, climb_on, push(location(3)), go(location(2))]).
%   true.
%
% Example 6: Check intermediate states
%   ?- on_box(monkey, [climb_on, push(location(3)), go(location(2))]).
%   true.
%
%   ?- at(box, location(3), [push(location(3)), go(location(2))]).
%   true.
%
% ============================================================================

