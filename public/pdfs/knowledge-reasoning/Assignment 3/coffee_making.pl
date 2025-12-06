:- encoding(utf8).
% Robot Coffee Making Planning System (using Situation Calculus, SWI-Prolog)
% ------------------------------------------------------
% This program can automatically plan how the robot can make a cup of instant coffee.
% Main components:
%   - Fluents (state-dependent predicates)
%   - Initial state (starting states)
%   - Actions and precondition axioms (when actions can be performed)
%   - Successor state axioms (how the world changes after actions)
%   - Automatic planning algorithm (find shortest action sequence)
%
% ============================================================================
% Problem Description
% ============================================================================
% - Robot needs to make a cup of instant coffee
% - Steps required:
%   1. Open the cupboard, take a cup from the cupboard and place it on the counter
%   2. Fill a kettle with water, and then plug the kettle in
%   3. Wait for the water to boil, then pour hot water into the cup
%   4. Add instant coffee to the cup
%   5. Stir the coffee to complete the process
% - Goal: coffee is ready (stirred with hot water and coffee in the cup)
%
% ============================================================================

% Discontiguous declarations for better code organization
:- discontiguous cupboard_open/1.
:- discontiguous cup_location/2.
:- discontiguous kettle_filled/1.
:- discontiguous kettle_plugged/1.
:- discontiguous water_boiled/1.
:- discontiguous cup_has_water/1.
:- discontiguous cup_has_coffee/1.
:- discontiguous coffee_stirred/1.

% ============================================================================
% Fluents: State-dependent predicates
% ============================================================================
%
% cupboard_open(S) - cupboard is open in situation S
% cup_location(Location, S) - cup is at Location (cupboard/counter) in situation S
% kettle_filled(S) - kettle is filled with water in situation S
% kettle_plugged(S) - kettle is plugged in in situation S
% water_boiled(S) - water has boiled in situation S
% cup_has_water(S) - cup has water in situation S
% cup_has_coffee(S) - cup has coffee in situation S
% coffee_stirred(S) - coffee has been stirred in situation S
%
% ============================================================================

% ============================================================================
% Initial State: Starting configuration
% ============================================================================

cup_location(cupboard, []).

% ============================================================================
% Actions in this domain:
% ============================================================================
%
% 1. open_cupboard - robot opens the cupboard
% 2. take_cup - robot takes cup from cupboard
% 3. place_cup_on_counter - robot places cup on counter
% 4. fill_kettle - robot fills kettle with water
% 5. plug_kettle - robot plugs in the kettle
% 6. wait_for_boil - robot waits for water to boil
% 7. pour_water - robot pours hot water into cup
% 8. add_coffee - robot adds instant coffee to cup
% 9. stir_coffee - robot stirs the coffee
%
% ============================================================================

% ============================================================================
% Precondition Axioms: When actions can be performed
% ============================================================================

% Empty state (initial state) is always valid
poss([]).

% Action: open_cupboard - robot opens the cupboard
% Preconditions:
% 1. Previous state S must be valid
% 2. Cupboard must not already be open
poss([open_cupboard | S]) :-
    poss(S),
    \+ cupboard_open(S).

% Action: take_cup - robot takes cup from cupboard
% Preconditions:
% 1. Previous state S must be valid
% 2. Cupboard must be open
% 3. Cup must be in the cupboard
poss([take_cup | S]) :-
    poss(S),
    cupboard_open(S),
    cup_location(cupboard, S).

% Action: place_cup_on_counter - robot places cup on counter
% Preconditions:
% 1. Previous state S must be valid
% 2. Cup must be in hand (after take_cup)
poss([place_cup_on_counter | S]) :-
    poss(S),
    cup_location(in_hand, S).

% Action: fill_kettle - robot fills kettle with water
% Preconditions:
% 1. Previous state S must be valid
% 2. Kettle must not already be filled
poss([fill_kettle | S]) :-
    poss(S),
    \+ kettle_filled(S).

% Action: plug_kettle - robot plugs in the kettle
% Preconditions:
% 1. Previous state S must be valid
% 2. Kettle must be filled
% 3. Kettle must not already be plugged in
poss([plug_kettle | S]) :-
    poss(S),
    kettle_filled(S),
    \+ kettle_plugged(S).

% Action: wait_for_boil - robot waits for water to boil
% Preconditions:
% 1. Previous state S must be valid
% 2. Kettle must be plugged in
% 3. Water must not already be boiled
poss([wait_for_boil | S]) :-
    poss(S),
    kettle_plugged(S),
    \+ water_boiled(S).

% Action: pour_water - robot pours hot water into cup
% Preconditions:
% 1. Previous state S must be valid
% 2. Water must be boiled
% 3. Cup must be on counter
% 4. Cup must not already have water
poss([pour_water | S]) :-
    poss(S),
    water_boiled(S),
    cup_location(counter, S),
    \+ cup_has_water(S).

% Action: add_coffee - robot adds instant coffee to cup
% Preconditions:
% 1. Previous state S must be valid
% 2. Cup must be on counter
% 3. Cup must not already have coffee
poss([add_coffee | S]) :-
    poss(S),
    cup_location(counter, S),
    \+ cup_has_coffee(S).

% Action: stir_coffee - robot stirs the coffee
% Preconditions:
% 1. Previous state S must be valid
% 2. Cup must have water
% 3. Cup must have coffee
% 4. Coffee must not already be stirred
poss([stir_coffee | S]) :-
    poss(S),
    cup_has_water(S),
    cup_has_coffee(S),
    \+ coffee_stirred(S).

% ============================================================================
% Successor State Axioms: How the world changes after actions
% ============================================================================

% --- Fluent: cupboard_open(S) ---

% Cupboard is open after opening it
cupboard_open([open_cupboard | S]) :-
    poss([open_cupboard | S]).

% Cupboard stays open once opened (frame axiom)
cupboard_open([A | S]) :-
    poss([A | S]),
    A \= open_cupboard,
    cupboard_open(S).

% --- Fluent: cup_location(Location, S) ---

% Cup is in hand after taking it from cupboard
cup_location(in_hand, [take_cup | S]) :-
    poss([take_cup | S]).

% Cup is on counter after placing it
cup_location(counter, [place_cup_on_counter | S]) :-
    poss([place_cup_on_counter | S]).

% Cup location doesn't change for other actions
cup_location(Loc, [A | S]) :-
    poss([A | S]),
    A \= take_cup,
    A \= place_cup_on_counter,
    cup_location(Loc, S).

% --- Fluent: kettle_filled(S) ---

% Kettle is filled after filling it
kettle_filled([fill_kettle | S]) :-
    poss([fill_kettle | S]).

% Kettle stays filled once filled (frame axiom)
kettle_filled([A | S]) :-
    poss([A | S]),
    A \= fill_kettle,
    kettle_filled(S).

% --- Fluent: kettle_plugged(S) ---

% Kettle is plugged in after plugging it
kettle_plugged([plug_kettle | S]) :-
    poss([plug_kettle | S]).

% Kettle stays plugged in once plugged (frame axiom)
kettle_plugged([A | S]) :-
    poss([A | S]),
    A \= plug_kettle,
    kettle_plugged(S).

% --- Fluent: water_boiled(S) ---

% Water is boiled after waiting for it to boil
water_boiled([wait_for_boil | S]) :-
    poss([wait_for_boil | S]).

% Water stays boiled once boiled (frame axiom)
water_boiled([A | S]) :-
    poss([A | S]),
    A \= wait_for_boil,
    water_boiled(S).

% --- Fluent: cup_has_water(S) ---

% Cup has water after pouring water
cup_has_water([pour_water | S]) :-
    poss([pour_water | S]).

% Cup keeps water once it has water (frame axiom)
cup_has_water([A | S]) :-
    poss([A | S]),
    A \= pour_water,
    cup_has_water(S).

% --- Fluent: cup_has_coffee(S) ---

% Cup has coffee after adding coffee
cup_has_coffee([add_coffee | S]) :-
    poss([add_coffee | S]).

% Cup keeps coffee once it has coffee (frame axiom)
cup_has_coffee([A | S]) :-
    poss([A | S]),
    A \= add_coffee,
    cup_has_coffee(S).

% --- Fluent: coffee_stirred(S) ---

% Coffee is stirred after stirring it
coffee_stirred([stir_coffee | S]) :-
    poss([stir_coffee | S]).

% Coffee stays stirred once stirred (frame axiom)
coffee_stirred([A | S]) :-
    poss([A | S]),
    A \= stir_coffee,
    coffee_stirred(S).

% ============================================================================
% Automatic Planning: Find shortest action sequence
% ============================================================================
% This implements breadth-first search to find the shortest plan that achieves
% the goal. The search explores all plans of length 0, then length 1, then
% length 2, etc., until it finds a plan that satisfies the goal.
%
% Note: For problems with many actions (like this coffee-making problem with
% 9 actions), the search space is large and planning may take a long time.
% This is expected behavior for breadth-first search without heuristics.

plan(Goal, Plan) :-
    bposs(Plan),
    call(Goal).

% bposs(S): Generate plans in breadth-first order (shortest first)
bposs(S) :-
    tryposs([], S).

% tryposs(S, S): Base case - S is a valid plan
tryposs(S, S) :-
    poss(S).

% tryposs(X, S): Recursive case - try with one more action
tryposs(X, S) :-
    tryposs([_ | X], S).

% ============================================================================
% Goal States: Different goals for planning
% ============================================================================

% Goal 1: Coffee is ready (complete goal)
% The goal state is that coffee is ready, which means:
% - Coffee has been stirred
% - Cup has water
% - Cup has coffee
coffee_ready(S) :-
    coffee_stirred(S),
    cup_has_water(S),
    cup_has_coffee(S).

% Goal 2: Cup is prepared on counter
% Goal: Cup is placed on the counter and ready for ingredients
cup_prepared(S) :-
    cup_location(counter, S).

% Goal 3: Kettle is ready to boil
% Goal: Kettle is filled and plugged in, ready to boil water
kettle_ready_to_boil(S) :-
    kettle_filled(S),
    kettle_plugged(S).

% Goal 4: Water is boiled and ready
% Goal: Water has been boiled and is ready to pour
water_boiled_ready(S) :-
    water_boiled(S).

% Goal 5: Cup has both water and coffee (but not stirred yet)
% Goal: All ingredients are in the cup, ready to stir
cup_with_ingredients(S) :-
    cup_has_water(S),
    cup_has_coffee(S),
    \+ coffee_stirred(S).

% Goal 6: Cupboard is open
% Goal: Cupboard has been opened
cupboard_opened(S) :-
    cupboard_open(S).

% Goal 7: Cup is in hand
% Goal: Cup has been taken from cupboard
cup_in_hand(S) :-
    cup_location(in_hand, S).

% Goal 8: Kettle preparation complete (filled and plugged)
% Goal: Kettle is fully prepared for boiling
kettle_prepared(S) :-
    kettle_filled(S),
    kettle_plugged(S).

% Goal 9: Water poured into cup
% Goal: Hot water has been poured into the cup
water_in_cup(S) :-
    cup_has_water(S).

% Goal 10: Coffee added to cup
% Goal: Coffee has been added to the cup
coffee_in_cup(S) :-
    cup_has_coffee(S).

% Goal 11: Ready to add coffee (cup on counter, has water)
% Goal: Cup is ready to receive coffee
ready_to_add_coffee(S) :-
    cup_location(counter, S),
    cup_has_water(S),
    \+ cup_has_coffee(S).

% Goal 12: Ready to pour water (cup on counter, water boiled)
% Goal: Ready to pour hot water into cup
ready_to_pour_water(S) :-
    cup_location(counter, S),
    water_boiled(S),
    \+ cup_has_water(S).

% Goal 13: Ready to stir (cup has water and coffee)
% Goal: Ready to stir the coffee
ready_to_stir(S) :-
    cup_has_water(S),
    cup_has_coffee(S),
    \+ coffee_stirred(S).

% ============================================================================
% Usage Examples
% ============================================================================
% Example 1: Main planning query - Complete coffee making
% ?- plan(coffee_ready(S), S).
% Note: This may take several minutes due to the large search space (9 actions).
% Example result: S = [stir_coffee, pour_water, wait_for_boil, plug_kettle, fill_kettle, add_coffee, place_cup_on_counter, take_cup, open_cupboard]
%
% Example 2: Plan to prepare cup on counter
% ?- plan(cup_prepared(S), S).
% Result: S = [open_cupboard, take_cup, place_cup_on_counter]
%
% Example 3: Plan to get kettle ready to boil
% ?- plan(kettle_ready_to_boil(S), S).
% Result: S = [fill_kettle, plug_kettle]
%
% Example 4: Plan to boil water
% ?- plan(water_boiled_ready(S), S).
% Result: S = [fill_kettle, plug_kettle, wait_for_boil]
%
% Example 5: Plan to get cup with ingredients (water + coffee, not stirred)
% ?- plan(cup_with_ingredients(S), S).
% Result: S = [open_cupboard, take_cup, place_cup_on_counter, fill_kettle, plug_kettle, wait_for_boil, pour_water, add_coffee]
%
% Example 6: Plan to open cupboard
% ?- plan(cupboard_opened(S), S).
% Result: S = [open_cupboard]
%
% Example 7: Plan to get cup in hand
% ?- plan(cup_in_hand(S), S).
% Result: S = [open_cupboard, take_cup]
%
% Example 8: Plan to prepare kettle
% ?- plan(kettle_prepared(S), S).
% Result: S = [fill_kettle, plug_kettle]
%
% Example 9: Plan to pour water into cup
% ?- plan(water_in_cup(S), S).
% Result: S = [open_cupboard, take_cup, place_cup_on_counter, fill_kettle, plug_kettle, wait_for_boil, pour_water]
%
% Example 10: Plan to add coffee to cup
% ?- plan(coffee_in_cup(S), S).
% Result: S = [open_cupboard, take_cup, place_cup_on_counter, add_coffee]
%
% Example 11: Plan to get ready to add coffee
% ?- plan(ready_to_add_coffee(S), S).
% Result: S = [open_cupboard, take_cup, place_cup_on_counter, fill_kettle, plug_kettle, wait_for_boil, pour_water]
%
% Example 12: Plan to get ready to pour water
% ?- plan(ready_to_pour_water(S), S).
% Result: S = [open_cupboard, take_cup, place_cup_on_counter, fill_kettle, plug_kettle, wait_for_boil]
%
% Example 13: Plan to get ready to stir
% ?- plan(ready_to_stir(S), S).
% Result: S = [open_cupboard, take_cup, place_cup_on_counter, fill_kettle, plug_kettle, wait_for_boil, pour_water, add_coffee]
% ============================================================================

