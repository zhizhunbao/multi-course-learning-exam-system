# CST8503 08 Planning

_从 PDF 文档转换生成_

---

## 目录

- [课程概述](#课程概述)
- [积木世界问题](#积木世界问题)
- [动作模式](#动作模式)
- [情境演算 (Situation Calculus)](#情境演算-situation-calculus)
  - [初始状态](#初始状态)
  - [前置条件公理](#前置条件公理)
  - [后继状态公理](#后继状态公理)
- [示例查询](#示例查询)
- [深度优先搜索与无限循环](#深度优先搜索与无限循环)
- [广度优先规划](#广度优先规划)
  - [实现广度优先规划](#实现广度优先规划)
- [学习检查](#学习检查)

---

## 课程概述

在本次课程中，我们将探讨以下内容：

1. **知识表示的应用** (Applications of Knowledge Representation)
2. **规划** (Planning)
3. **广度优先 vs 深度优先规划** (Breadth-first vs Depth-first planning)
4. **Prolog 编程** (Prolog Programming)

![Planning](./CST8503_08_Planning_images/page_001_img_01.png)

---

## 积木世界问题

### 问题描述

一个经典的积木世界问题包含：

- **三个积木块**：`block(a)`, `block(b)`, `block(c)`
- **四个位置**：`location(1)`, `location(2)`, `location(3)`, `location(4)`

### 初始状态关系

```
on(block(c), block(a))
on(block(a), location(1))
on(block(b), location(3))
clear(location(2))
clear(location(4))
clear(block(b))
clear(block(c))
```

### 目标状态

例如，构建一个由 a, b, c 组成的堆叠，目标表示为：

```
on(block(a), block(b))
on(block(b), block(c))
```

---

## 动作模式

**Action Schema（动作模式）**：使用变量来表示多个动作

```
move(X, Y, Z)
```

其中：

- `X` 代表任何积木块
- `Y`, `Z` 代表任何积木块或位置

---

## 情境演算 (Situation Calculus)

情境演算是用于表示动态世界的逻辑形式化方法。

### 初始状态

```prolog
% 积木块定义
block_exists(block(a)).
block_exists(block(b)).
block_exists(block(c)).

% 位置定义
location_exists(location(1)).
location_exists(location(2)).
location_exists(location(3)).
location_exists(location(4)).

% 初始状态
clear(location(2), []).
clear(location(4), []).
clear(block(b), []).
clear(block(c), []).
on(block(a), location(1), []).
on(block(b), location(3), []).
on(block(c), block(a), []).
```

**要素说明**：

- **动作**：`move(X, Y, Z)`
- **流式断言（Fluents）**：`clear`, `on`

### 前置条件公理

```prolog
% 前置条件公理
% 动作 move(Block, From, To) 可行的条件：
poss([move(Block, From, To) | S]) :-
    block_exists(Block),
    clear(Block, S),
    (location_exists(To) ; block_exists(To)),
    Block \= To,
    clear(To, S),
    (location_exists(From) ; block_exists(From)),
    on(Block, From, S).
```

### 后继状态公理

```prolog
% 后继状态公理

% clear 的后继状态
clear(X, [move(Z, X, Y) | S]) :-
    poss([move(Z, X, Y) | S]).
clear(X, [A | S]) :-
    poss([A | S]),
    A \= move(_, _, X),
    clear(X, S).

% on 的后继状态
on(X, Y, [move(X, Z, Y) | S]) :-
    poss([move(X, Z, Y) | S]).
on(X, Y, [A | S]) :-
    poss([A | S]),
    A \= move(X, Y, _),
    on(X, Y, S).
```

---

## 示例查询

### 简单查询

**查询**：如何将 `block(b)` 移动到 `location(2)`？

```prolog
?- on(block(b), location(2), S).
S = [move(block(b), location(3), location(2))].
```

### 问题示例

**查询**：如何使 `location(3)` 变为空闲？

```prolog
?- clear(location(3), S).
ERROR: Stack limit (1.0Gb) exceeded
```

**问题**：规划真的这么容易吗？并非如此！这个查询会导致栈溢出错误。

---

## 深度优先搜索与无限循环

### 问题分析

当执行 `clear(location(3), S)` 查询时，Prolog 使用深度优先搜索，会陷入无限循环。

### 跟踪示例

```prolog
[trace] ?- clear(location(3), S).
```

**执行流程**：

```
Call: (10) clear(location(3), _3838) ? creep
% Location(3) 如果从它上面移走某个东西就会变空闲

Call: (11) poss([move(_5048, location(3), _5052) | _5030]) ? creep
% 我们能移动一个积木块吗？

Call: (12) block_exists(_5048) ? creep
Exit: (12) block_exists(block(a)) ? creep
% block(a) 是积木块吗？

Call: (12) clear(block(a), _5030) ? creep
% block(a) 是空闲的吗？

Call: (13) poss([move(_8080, block(a), _8084) | _8062]) ? creep
% 我们能从 block(a) 上移动一个积木块吗？

Call: (14) block_exists(_8080) ? creep
Exit: (14) block_exists(block(a)) ? creep
% block(a) 是积木块吗？

Call: (14) clear(block(a), _8062) ? creep
% block(a) 是空闲的吗？(陷入无限循环)

Call: (15) poss([move(_11112, block(a), _11116) | _11094]) ? creep
...
```

**问题原因**：

- Prolog 使用深度优先搜索
- 它沿着搜索树的无限长分支下降
- 深度优先规划包含无限序列的来回移动积木块

---

## 广度优先规划

### 基本思想

我们正在搜索一个规划树。

**深度优先规划的问题**：

- 包含无限序列的来回移动积木块

**解决方案**：

- 通过安排广度优先搜索来修复深度优先的无限循环问题
- 首先生成长度为 1 的规划，直到其中一个满足目标
- 一旦长度为 1 的规划用尽，我们继续生成长度为 2 的规划
- 依此类推，直到目标成功，然后我们就得到了规划

### 示例：长度为 1 的规划

```prolog
?- poss([A]), clear(location(3), [A]).
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
```

### 示例：长度为 2 的规划

```prolog
?- poss([B, A]), clear(location(3), [B, A]).
B = move(block(b), location(2), location(4)),
A = move(block(b), location(3), location(2))
...etc...
```

### 实现广度优先规划

```prolog
% 通过广度优先搜索规划来实现目标
plan(Goal, Plan) :-
    bposs(Plan),
    Goal.

bposs(S) :-
    tryposs([], S).

tryposs(S, S) :-
    poss(S).  % S 是一个规划；否则...

tryposs(X, S) :-
    tryposs([_ | X], S).  % 增加规划长度
```

**使用示例**：

```prolog
?- plan(clear(location(3), S), S).
S = [move(block(b), location(3), location(2))].
```

---

## 学习检查

### 思考问题

1. **为什么"正常"的规划查询不总是终止？**

   - 深度优先搜索可能会沿着无限长的搜索分支下降
   - 规划可能包含无限序列的重复动作（如来回移动积木块）

2. **广度优先规划查询如何解决这个问题？**
   - 广度优先搜索按规划长度递增的顺序搜索
   - 先尝试所有长度为 1 的规划，然后是长度为 2 的规划，依此类推
   - 这确保在找到解之前不会探索无限长的分支

---

_注: 共提取了 1 张图片_
