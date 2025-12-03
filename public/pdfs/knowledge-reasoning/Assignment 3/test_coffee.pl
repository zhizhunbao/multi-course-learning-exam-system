:- encoding(utf8).
% Test file for coffee_making.pl
% Load the main program
:- [coffee_making].

% Test helper predicates
test_initial_state :-
    write('Testing initial state...'), nl,
    (cup_location(cupboard, []) -> write('  ✓ cup_location(cupboard, [])'), nl; write('  ✗ cup_location(cupboard, [])'), nl),
    (\+ cupboard_open([]) -> write('  ✓ cupboard is closed'), nl; write('  ✗ cupboard should be closed'), nl),
    (\+ kettle_filled([]) -> write('  ✓ kettle is not filled'), nl; write('  ✗ kettle should not be filled'), nl),
    write('Initial state tests complete.'), nl, nl.

test_actions :-
    write('Testing actions...'), nl,
    (poss([open_cupboard]) -> write('  ✓ poss([open_cupboard])'), nl; write('  ✗ poss([open_cupboard])'), nl),
    (\+ poss([take_cup]) -> write('  ✓ cannot take cup without opening cupboard'), nl; write('  ✗ should not be able to take cup'), nl),
    (poss([take_cup, open_cupboard]) -> write('  ✓ poss([take_cup, open_cupboard])'), nl; write('  ✗ poss([take_cup, open_cupboard])'), nl),
    (poss([fill_kettle]) -> write('  ✓ poss([fill_kettle])'), nl; write('  ✗ poss([fill_kettle])'), nl),
    (\+ poss([plug_kettle]) -> write('  ✓ cannot plug kettle without filling'), nl; write('  ✗ should not be able to plug kettle'), nl),
    write('Action tests complete.'), nl, nl.

test_fluents :-
    write('Testing fluents...'), nl,
    (cupboard_open([open_cupboard]) -> write('  ✓ cupboard_open([open_cupboard])'), nl; write('  ✗ cupboard_open([open_cupboard])'), nl),
    (cup_location(in_hand, [take_cup, open_cupboard]) -> write('  ✓ cup_location(in_hand, [take_cup, open_cupboard])'), nl; write('  ✗ cup_location(in_hand, ...)'), nl),
    (cup_location(counter, [place_cup_on_counter, take_cup, open_cupboard]) -> write('  ✓ cup_location(counter, ...)'), nl; write('  ✗ cup_location(counter, ...)'), nl),
    (kettle_filled([fill_kettle]) -> write('  ✓ kettle_filled([fill_kettle])'), nl; write('  ✗ kettle_filled([fill_kettle])'), nl),
    (kettle_plugged([plug_kettle, fill_kettle]) -> write('  ✓ kettle_plugged([plug_kettle, fill_kettle])'), nl; write('  ✗ kettle_plugged(...)'), nl),
    (water_boiled([wait_for_boil, plug_kettle, fill_kettle]) -> write('  ✓ water_boiled(...)'), nl; write('  ✗ water_boiled(...)'), nl),
    write('Fluent tests complete.'), nl, nl.

test_complete_sequence :-
    write('Testing complete sequence...'), nl,
    S = [stir_coffee, add_coffee, pour_water, wait_for_boil, plug_kettle, fill_kettle, place_cup_on_counter, take_cup, open_cupboard],
    (poss(S) -> write('  ✓ Complete sequence is possible'), nl; write('  ✗ Complete sequence should be possible'), nl),
    (coffee_ready(S) -> write('  ✓ Coffee is ready in final state'), nl; write('  ✗ Coffee should be ready'), nl),
    (cup_location(counter, S) -> write('  ✓ Cup is on counter'), nl; write('  ✗ Cup should be on counter'), nl),
    (cup_has_water(S) -> write('  ✓ Cup has water'), nl; write('  ✗ Cup should have water'), nl),
    (cup_has_coffee(S) -> write('  ✓ Cup has coffee'), nl; write('  ✗ Cup should have coffee'), nl),
    (coffee_stirred(S) -> write('  ✓ Coffee is stirred'), nl; write('  ✗ Coffee should be stirred'), nl),
    write('Complete sequence tests complete.'), nl, nl.

test_planning :-
    write('Testing planning...'), nl,
    (plan(coffee_ready(S), S) ->
        write('  ✓ Planning succeeded'), nl,
        write('  Plan: '), write(S), nl
    ;
        write('  ✗ Planning failed'), nl
    ),
    write('Planning tests complete.'), nl, nl.

% Run all tests
run_all_tests :-
    test_initial_state,
    test_actions,
    test_fluents,
    test_complete_sequence,
    test_planning,
    write('All tests complete!'), nl.

