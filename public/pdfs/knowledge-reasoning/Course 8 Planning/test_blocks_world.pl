:- encoding(utf8).
% Blocks World Planning System - Test Script
% ============================================================================
% This script tests all the functionality of the blocks world planning system.
% Run with: swipl test_blocks_world.pl
% ============================================================================

:- consult('blocks_world_planning.pl').

% Test counter
:- dynamic test_count/1.
:- dynamic pass_count/1.
:- dynamic fail_count/1.

test_count(0).
pass_count(0).
fail_count(0).

% Helper predicates for running tests
increment_test :-
    retract(test_count(N)),
    N1 is N + 1,
    assert(test_count(N1)).

increment_pass :-
    retract(pass_count(N)),
    N1 is N + 1,
    assert(pass_count(N1)).

increment_fail :-
    retract(fail_count(N)),
    N1 is N + 1,
    assert(fail_count(N1)).

% Test runner: run a test and report result
test(Description, Goal) :-
    increment_test,
    (   call(Goal)
    ->  increment_pass,
        format('✓ PASS: ~w~n', [Description])
    ;   increment_fail,
        format('✗ FAIL: ~w~n', [Description])
    ).

% Test runner with expected value
test_value(Description, Goal, Expected) :-
    increment_test,
    (   call(Goal),
        Goal = Expected
    ->  increment_pass,
        format('✓ PASS: ~w~n', [Description])
    ;   increment_fail,
        format('✗ FAIL: ~w (expected: ~w)~n', [Description, Expected])
    ).

% Print test summary
print_summary :-
    test_count(Total),
    pass_count(Passed),
    fail_count(Failed),
    format('~n========================================~n', []),
    format('Test Summary:~n', []),
    format('  Total:  ~d~n', [Total]),
    format('  Passed: ~d~n', [Passed]),
    format('  Failed: ~d~n', [Failed]),
    format('========================================~n', []).

% ============================================================================
% Test Suite
% ============================================================================

run_all_tests :-
    format('~n========================================~n', []),
    format('Blocks World Planning System - Test Suite~n', []),
    format('========================================~n~n', []),

    format('Test 1: Query initial state~n', []),
    test('block c is on block a in initial state', on(block(c), block(a), [])),
    test('block c is clear in initial state', clear(block(c), [])),
    test('block b is clear in initial state', clear(block(b), [])),
    test('location 2 is clear in initial state', clear(location(2), [])),
    test('block a is on location 1 in initial state', on(block(a), location(1), [])),
    test('block b is on location 3 in initial state', on(block(b), location(3), [])),

    format('~nTest 2: Query state after a move~n', []),
    test('block c is on location 2 after moving from block a',
         on(block(c), location(2), [move(block(c), block(a), location(2))])),
    test('block a is clear after moving block c away',
         clear(block(a), [move(block(c), block(a), location(2))])),
    test('location 2 is not clear after placing block c on it',
         \+ clear(location(2), [move(block(c), block(a), location(2))])),

    format('~nTest 3: Check if moves are possible~n', []),
    test('move block c from block a to location 2 is possible',
         poss([move(block(c), block(a), location(2))])),
    test('move block b from location 3 to location 4 is possible',
         poss([move(block(b), location(3), location(4))])),
    test('move block a from location 1 to block c is NOT possible (c is on a)',
         \+ poss([move(block(a), location(1), block(c))])),
    test('move block c to itself is NOT possible',
         \+ (block_exists(Block), poss([move(Block, _, Block)]))),

    format('~nTest 4: Plan to achieve goal state (finding shortest plan)~n', []),
    (   plan(on(block(c), location(2), Plan), Plan), !,
        Plan = [move(block(c), block(a), location(2))],
        test('found shortest plan to put block c on location 2', true)
    ;   test('found shortest plan to put block c on location 2', false)
    ),

    format('~nTest 5: Plan to stack blocks~n', []),
    (   plan(on(block(b), block(c), Plan), Plan), !,
        length(Plan, Length),
        Length >= 2,
        test('found plan to put block b on top of block c', true),
        format('  Plan found: ~w (length: ~d)~n', [Plan, Length])
    ;   test('found plan to put block b on top of block c', false)
    ),

    format('~nTest 6: Complex state transitions~n', []),
    test('after moving c to location 2, a is on location 1',
         on(block(a), location(1), [move(block(c), block(a), location(2))])),
    test('after moving c to location 2, b is still on location 3',
         on(block(b), location(3), [move(block(c), block(a), location(2))])),

    print_summary.

% ============================================================================
% Main entry point
% ============================================================================

:- initialization(run_all_tests, main).

