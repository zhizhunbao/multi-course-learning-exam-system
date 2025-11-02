# CST8503 08 规划（Planning）

_由 PDF 文档转换并翻译整理_

---

## 目录

- 课时概览（议程）
- 知识表示的应用
- 规划（Planning）
- 宽度优先 vs 深度优先 规划
- Prolog 编程
- 积木世界（Blocks World）问题

---

## 第 1 页

### 规划（Planning）

---

## 第 2 页

### 课时概览（议程）

本课将探讨：

- 知识表示的应用
- 规划（Planning）
- 宽度优先 vs 深度优先 规划
- Prolog 编程

---

## 第 3 页

### 积木世界（Blocks World）问题

- 三个积木：`block(a)`, `block(b)`, `block(c)`
- 四个位置：`location(1)`, `location(2)`, `location(3)`, `location(4)`
- 初始状态关系：
  - `on(block(c), block(a))`
  - `on(block(a), location(1))`
  - `on(block(b), location(3))`
  - `clear(location(2))`, `clear(location(4))`
  - `clear(block(b))`, `clear(block(c))`
- 目标示例：搭建 a, b, c 的堆叠
  - 目标：`on(block(a), block(b)), on(block(b), block(c))`

---

## 第 4 页

### 动作模式（Action schema）

- 使用变量来表示一类动作
- `move(X, Y, Z)`
  - `X` 代表任意积木
  - `Y`, `Z` 代表任意积木或位置

---

## 第 4.1 页

### 快速直觉：情景与计划（更亲民的解释）

- 把“情景（situation）”看成“到目前为止的历史”。空历史 `[]` 就是起点。
- 一个计划是列表，如 `[A1, A2, A3]`，表示依次执行 `A1`、`A2`、`A3`。
- `[A | S]` 表示“在历史 `S` 之后，下一步执行 `A`”。当 `S = []` 时，`[A | []]` 就是 `[A]`。
- `poss([A | S])` 问的是：在历史 `S` 之后，执行 `A` 的前提条件是否满足？

小图示：

```
历史 S  --执行 A-->  新情景 [A | S]
[]       --执行 A-->  [A]
```

---

## 第 5 页

#### 阅读本页的 Prolog/情景演算（Situation Calculus）代码前提示

- Prolog 基础：事实与规则，变量以大写开头，查询使用 `?- Goal.`
- 情景演算（Situation Calculus）：
  - 由 John McCarthy 提出，用于表示通过动作而变化的世界。背景：McCarthy (1963)；规范化形式：Reiter (2001)。
  - 关键概念：对象常量（如 `block(a)`）、动作（如 `move(X, Y, Z)`）、随情景变化的流项（fluents，如 `on/3`, `clear/2`），以及表示执行历史（动作序列）的情景参数 `S`。
  - 初始情景记为空列表 `[]`，表示“尚未执行任何动作”。
- 积木世界建模：积木可以放在积木或位置之上；`clear(X, S)` 表示 X 顶部在情景 S 中是空的；`on(X, Y, S)` 表示在情景 S 中 X 在 Y 上。
- 代码风格：本文将流项写为带显式情景参数的谓词（例如 `on(Block, Support, S)`），用于表达“性质在情景 S 中成立”。
- 参考：
  - McCarthy, J. (1963). Situations, Actions, and Causal Laws. [overview](https://plato.stanford.edu/entries/sitcalc/)
  - Reiter, R. (2001). Knowledge in Action. MIT Press. [book page](https://mitpress.mit.edu/9780262182229/knowledge-in-action/)
  - SWI‑Prolog 文档：[https://www.swi-prolog.org/](https://www.swi-prolog.org/)

### 情景演算：积木世界 — 初始事实与流项

```prolog
% 领域对象
block_exists(block(a)).
block_exists(block(b)).
block_exists(block(c)).

location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).
location_exists(location(4)).

% 动作模式（将积木 X 从 Y 放到 Z 上）
% move(X, Y, Z) 其中 X 是积木；Y/Z 可以是积木或位置

% 初始状态 S = [] 下的流项
clear(location(2), []).
clear(location(4), []).
clear(block(b), []).
clear(block(c), []).

on(block(a), location(1), []).
on(block(b), location(3), []).
on(block(c), block(a), []).
```

---

## 第 6 页

### 情景演算：可执行性公理（precondition axiom）

在生成或检查任何计划之前，我们必须知道一个动作何时可执行。谓词 `poss([HeadAction | S])` 编码了情景 `S` 中首个动作的前提条件。对 `move(Block, From, To)` 而言，只有当：

- `Block` 存在且在 `S` 中是清空的（clear）。
- `To` 是有效支撑（位置或积木），且不同于 `Block`，并且在 `S` 中是清空的。
- `From` 是有效支撑，且 `Block` 在 `S` 中当前位于 `From` 上。

```prolog
% 当且仅当首个动作在 S 中可执行时，计划可执行
% move(Block, From, To) 的前提条件
poss([move(Block, From, To) | S]) :-
    block_exists(Block),
    clear(Block, S),
    ( location_exists(To) ; block_exists(To) ),
    Block \= To,
    clear(To, S),
    ( location_exists(From) ; block_exists(From) ),
    on(Block, From, S).
```

#### 教程：如何使用 `poss/1`

- 用大白话说：现在能不能迈出“下一步”？
- 作用：判断某个计划的首个动作在情景 `S` 中是否可执行。
- 形式：`poss([Action | S])`，其中 `S` 是过去动作构成的列表（即情景）。
- 语义：`S` 是“过去的历史”。`[Action | S]` 表示“在 `S` 之后先做 `Action`”。初始情景 `S = []` 时，`[Action | []]` 与 `[Action]` 等价。
- 单步检查（单动作计划）：此处 `S0 = []` 表示初始情景：

```prolog
S0 = [],
?- poss([move(block(b), location(3), location(2)) | S0]).
true.

% 在初始情景下也可使用等价的简写：
?- poss([move(block(b), location(3), location(2))]).
true.

% 该查询失败：因为初始状态下 block(a) 顶部并不清空（block(c) 在 a 上）
S0 = [],
?- poss([move(block(a), location(1), block(c)) | S0]).
false.

% 在初始情景下的等价简写：
?- poss([move(block(a), location(1), block(c))]).
false.
```

- 多步检查：令 `S1` 为先前（已执行）的动作历史，例如先把 `c` 从 `a` 上移走以释放 `a`：

```prolog
S1 = [move(block(c), block(a), location(4)) | []],
?- poss([move(block(a), location(1), block(b)) | S1]).
true.
```

- 规划：本讲义中的 `poss/1` 仅在给定情景参数 `S` 下检查“首个动作”的前提条件。若要验证“整个计划”或自动搜索计划，请结合宽度优先规划器（见第 11–14 页）：

```prolog
?- plan(clear(location(3), S), S).
S = [move(block(b), location(3), location(2))].
```

- 注意与常见误区：
  - `poss/1` 是用户自定义谓词（非 Prolog 内建）。
  - 它只根据提供的情景参数 `S` 判断首个动作是否可执行；若不与候选计划生成器（`bposs/1`, `tryposs/2`）配合，不会自动枚举动作、也不保证列表尾部 `S` 自身可执行。
  - 在 Prolog 中，`[Action]` 是 `[Action | []]`（初始情景）的简写。

---

## 第 7 页

### 情景演算：后继状态公理（successor state axioms）

后继状态公理定义了在执行首个动作之后流项如何变化。它们提供了简洁的、避免帧公理爆炸的非单调描述：

- `clear/2`：当某物从 X 上移走时变为真；否则保持不变，除非 X 成为某个移动的目的地。
- `on/3`：当 X 被移动到 Y 上时变为真；否则保持不变，除非 X 从 Y 上被移走。

```prolog
% 执行动作后 clear/2 的定义
clear(X, [move(_, X, _) | S]) :-
    poss([move(_, X, _) | S]).

clear(X, [A | S]) :-
    poss([A | S]),
    A \= move(_, _, X),
    clear(X, S).

% 执行动作后 on/3 的定义
on(X, Y, [move(X, Z, Y) | S]) :-
    poss([move(X, Z, Y) | S]).

on(X, Y, [A | S]) :-
    poss([A | S]),
    A \= move(X, Y, _),
    on(X, Y, S).
```

---

## 第 8 页

### 查询示例（Sample Queries）

以下查询说明：虽然有些目标很容易（单步即可），但在默认的深度优先搜索（DFS）下，其他查询可能不终止。比如不限制计划长度地询问 `clear(location(3), S)`，会让 DFS 追逐无限的“来回移动”分支。

```prolog
?- on(block(b), location(2), S).
S = [move(block(b), location(3), location(2))].
```

看起来规划很简单？别急……

```prolog
?- clear(location(3), S).
ERROR: Stack limit (1.0Gb) exceeded
```

---

## 第 9 页

### 深度优先搜索与无限循环

Prolog 中的纯 DFS 会在回溯前将某个分支探索到任意深度。在包含可逆动作的规划域中，存在无限分支（例如将一个积木在两个位置之间来回移动），这会导致某些查询不终止，除非我们改变搜索策略。

```prolog
?- clear(location(3), S).
% ... Prolog 跟踪显示 DFS 下降到一个无限长的分支 ...
```

---

## 第 10 页

### 宽度优先规划（Breadth First Planning）

- 我们在搜索“计划”的树。
- 深度优先的计划可能包含无限序列（在两个位置之间来回移动）。
- 解决思路：按计划长度进行宽度优先搜索。
- 步骤：
  - 生成所有长度为 1 的计划；若有计划满足目标，立即停止。
  - 否则，生成所有长度为 2 的计划。
  - 不断增加长度，直到出现满足目标的计划。

---

## 第 11 页

### 宽度优先规划（续）

为避免 DFS 不终止，我们按计划长度逐步搜索。先尝试所有长度为 1 的计划，再尝试长度为 2 的计划，依此类推。下列查询固定了计划长度，并询问在执行该计划后目标是否成立。

```prolog
% 首先，尝试长度为 1 的计划
?- poss([A]), clear(location(3), [A]).
```

---

## 第 12 页

### 宽度优先规划（续）

现在我们尝试所有长度为 2 的计划，然后是长度为 3 的计划，等等。因为每个长度的候选集合都是有限的，所以每一阶段的搜索都会终止，并且会首先找到最短解。

```prolog
% 接着，尝试长度为 2 的计划
?- poss([B, A]), clear(location(3), [B, A]).
B = move(block(b), location(2), location(4)),
A = move(block(b), location(3), location(2))
% …等…
```

---

## 第 13 页

### 我们可以实现宽度优先规划

下面的编码将两个关注点分离：

- `bposs/1` 与 `tryposs/2` 按计划长度递增（对长度进行宽度优先）枚举候选计划。
- `plan/2` 接收任意目标（例如 `clear(location(3), S)`），并返回使目标成立的最短计划 `Plan`。

```prolog
% 通过对计划长度进行宽度优先搜索来为某个目标规划
plan(Goal, Plan) :-
    bposs(Plan),
    Goal.

bposs(S) :-
    tryposs([], S).

tryposs(S, S) :-
    poss(S). % S 是一个可执行的计划

tryposs(X, S) :-
    tryposs([_ | X], S). % 增加计划长度
```

---

## 第 14 页

### 实现宽度优先规划（续）

`plan/2` 在给定公理下给出实现目标的最短动作序列。下面的例子展示了使 `location(3)` 变为空所需的最小计划。替换为其他目标（例如把 `a` 堆在 `b` 上，再堆在 `c` 上），即可得到相应的最短计划。

```prolog
?- plan(clear(location(3), S), S).
S = [move(block(b), location(3), location(2))]
```

---

## 第 15 页

### 自测（Check your learning）

通过回答以下问题回顾本课规划主题的关键概念：

1. 为什么“常规”的规划查询不总是会终止？
2. 宽度优先的规划查询如何解决这个问题？

---
