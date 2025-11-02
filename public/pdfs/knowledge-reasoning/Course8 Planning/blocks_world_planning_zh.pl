% 积木世界 规划（情况演算，SWI‑Prolog）
% ------------------------------------------------------
% 本文件实现：
%   - 领域对象（积木、位置）
%   - 初始情景（S = []）的事实
%   - 先决条件（poss/1）
%   - 后继状态公理：clear/2 与 on/3
%   - 按计划长度进行的广度优先规划：bposs/1, tryposs/2, plan/2
%
% 用法（在 SWI‑Prolog 中）：
%   ?- ["public/pdfs/knowledge-reasoning/Course8 Planning/blocks_world_planning_zh.pl"].
%
%   % 求使 location(3) 变为清空（clear）的最短计划
%   ?- plan(clear(location(3), S), S).
%   S = [move(block(b), location(3), location(2))].
%
%   % 求叠塔：a 在 b 上，b 在 c 上 的最短计划
%   ?- plan((on(block(a), block(b), S), on(block(b), block(c), S)), S).
%   S = ...  % 最短的 move/3 序列
%
% 说明：
%   - 情景（situation）用动作列表表示，空列表 [] 表示初始情景。
%   - [A | S] 表示：先执行动作 A，再经历历史 S。
%   - poss/1 用于检查一个计划（动作列表）是否可自初始情景执行。
%   - plan/2 通过按计划长度的广度优先搜索避免深度优先的非终止问题。


% ------------------------
% 领域对象（Domain Objects）
% ------------------------
block_exists(block(a)).
block_exists(block(b)).
block_exists(block(c)).

location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).
location_exists(location(4)).

% 支撑体可以是积木或位置
support_exists(X) :- block_exists(X).
support_exists(X) :- location_exists(X).


% ------------------------
% 初始情景（S = []）
% ------------------------
% 初始情景下的 clear/2 与 on/3 事实
clear(location(2), []).
clear(location(4), []).
clear(block(b), []).
clear(block(c), []).

on(block(a), location(1), []).
on(block(b), location(3), []).
on(block(c), block(a), []).


% ------------------------
% 计划的先决条件（poss/1）
% ------------------------
% 基本情形：空计划可执行
poss([]).

% 非空计划 [move(Block, From, To) | S] 可执行当且仅当：
%   - S 可执行
%   - Block 存在且在 S 中是 clear 的
%   - From/To 均为合法支撑体，且在 S 中 Block 在 From 上
%   - To 在 S 中是 clear 的，且 To 与 Block 不同
poss([move(Block, From, To) | S]) :-
    poss(S),
    block_exists(Block),
    clear(Block, S),
    support_exists(To),
    Block \\= To,
    clear(To, S),
    support_exists(From),
    on(Block, From, S).


% ------------------------
% 后继状态公理（Successor State Axioms）
% ------------------------
% clear/2：若执行 [move(_, X, _) | S]，则 X 变为 clear（有东西从 X 上移走）
clear(X, [move(_, X, _) | S]) :-
    poss([move(_, X, _) | S]).

% 其余情况：clear(X, [A | S]) 在非目标情况下保持不变（除非 X 是本次移动的目的地）
clear(X, [A | S]) :-
    poss([A | S]),
    A \\= move(_, _, X),
    clear(X, S).

% on/3：若执行 [move(X, Z, Y) | S]，则 X 在 Y 上
on(X, Y, [move(X, Z, Y) | S]) :-
    poss([move(X, Z, Y) | S]).

% 其余情况：on(X, Y, [A | S]) 在非相关移动时保持不变（除非 X 被从 Y 上移走）
on(X, Y, [A | S]) :-
    poss([A | S]),
    A \\= move(X, Y, _),
    on(X, Y, S).


% ------------------------
% 按计划长度的广度优先规划
% ------------------------
% plan/2：按长度从短到长枚举候选计划，满足 Goal 即返回最短计划 Plan
plan(Goal, Plan) :-
    bposs(Plan),
    call(Goal).

% bposs/1：从空列表开始，逐步增大计划长度
bposs(S) :-
    tryposs([], S).

% 若 S 在 poss/1 下可执行，则返回 S
tryposs(S, S) :-
    poss(S).

% 否则增加一个占位动作（仅增长度），继续搜索
tryposs(X, S) :-
    tryposs([_ | X], S).


% ------------------------
% 便捷查询（可选）
% ------------------------
% location(3) 清空的最短计划
shortest_to_clear_location3(S) :-
    plan(clear(location(3), S), S).

% 构建 a 在 b 上，b 在 c 上 的最短计划
shortest_to_stack_abc(S) :-
    plan((on(block(a), block(b), S), on(block(b), block(c), S)), S).
