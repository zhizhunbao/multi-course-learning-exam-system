:- encoding(utf8).

% 详细测试：分析两个 poss 规则的区别

% 初始状态
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

poss([]).

% 后继状态公理
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
% 第一个规则：先检查 clear(Block, S)，再检查 on(Block, From, S)
% ============================================
poss_v1([move(Block,From,To)|S]):-
    block_exists(Block),
    clear(Block, S),              % ← 问题：此时 From 还未绑定！
    on(Block, From, S),           % ← 需要 From 绑定，但上面 clear 可能失败
    Block \= To,
    ( location_exists(From) ; block_exists(From) ),
    ( location_exists(To) ; block_exists(To) ),
    clear(To, S).

% ============================================
% 第二个规则：先绑定 To 和 From，再检查 clear 和 on
% ============================================
poss_v2([move(Block,From,To)|S]):-
    block_exists(Block),
    clear(Block,S),
    (location_exists(To) ; block_exists(To)),  % ← 先绑定 To
    Block \= To,
    clear(To,S),                                % ← To 已绑定
    (location_exists(From);block_exists(From)), % ← 再绑定 From
    on(Block,From,S).                          % ← From 已绑定

% 测试查询
% ?- poss_v1([move(block(c), block(a), location(2))]).
% ?- poss_v2([move(block(c), block(a), location(2))]).

