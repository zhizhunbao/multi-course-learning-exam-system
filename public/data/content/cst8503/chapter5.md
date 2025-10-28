# 第 5 章：Prolog 列表、操作符与算术

**来源**: CST8503 课程材料 - Knowledge Representation and Reasoning

---

## 5.1 Prolog 谓词参数类型

**参数模式指示器**：

- `?` 参数：要么提供输入，要么接受输出，或者用于输入和输出
- 示例：`member(?Elem, ?List)`: 如果 Elem 是 List 的成员则为真

```prolog
?- member(X,[a,b,c]).  % 第一个参数是输出，第二个参数是输入
```

**来源**: 谓词参数类型

---

## 5.2 指令

**动态指令**：

```prolog
:- dynamic predicate/arity.
```

告知解释器谓词的定义可能在执行期间改变（使用 assert/1 和/或 retract/1）。

**多文件指令**：

```prolog
:- multifile predicate/arity.
```

告知系统指定的谓词可能在多个文件中定义。

**不连续指令**：

```prolog
:- discontiguous predicate/arity.
```

告知系统谓词的子句可能在源文件中不在一起。

**来源**: Prolog 指令说明

---

## 5.3 Prolog 列表

**列表表示法示例**：

```prolog
[a, b, c, d]
[]
[ann, tennis, tom, running]
[link(a,b), link(a,c), link(b,d)]
[a, [b,c], d, [], [a,a,a], f(X,Y)]
```

**头部和尾部**：

```prolog
L = [a, b, c, d]
a 是 L 的头部
[b, c, d] 是 L 的尾部
```

**竖线表示法**：

```prolog
L = [Head | Tail]
L = [a, b, c] = [a | [b, c]] = [a, b | [c]] = [a, b, c | []]
```

**来源**: Prolog 列表语法

---

## 5.4 列表表示法是语法糖

**列表表示法**: `[Head | Tail]`

**等效的标准 Prolog 表示法**: `'[|]'(Head, Tail)`

**等效项**：

```prolog
[a, b, c] = '[|]'(a, '[|]'(b, '[|]'(c, [])))
```

**来源**: 列表语法糖

---

## 5.5 列表成员

```prolog
% member(X, L) 意味着X是列表L的成员
member(X, [X | _]).        % X作为列表的头部出现
member(X, [_ | L]) :- member(X, L).  % X在列表的尾部中
```

**来源**: 列表成员谓词

---

## 5.6 列表连接

```prolog
% conc(L1, L2, L3) 意味着L3是L1和L2的连接
conc([], L, L).                    % 基本情况
conc([X | L1], L2, [X | L3]) :-   % 递归情况
    conc(L1, L2, L3).
```

**连接的使用**：

```prolog
?- conc([a,b,c], [1,2,3], L).
L = [a,b,c,1,2,3]

?- conc([a,[b,c],d], [a,[],b], L).
L = [a, [b,c], d, a, [], b]
```

**来源**: 列表连接谓词

---

## 5.7 列表删除

```prolog
% del(X, L, NewL) 意味着NewL是从列表L中删除第一个X的列表
del(X, [X | Tail], Tail).
del(X, [Y | Tail], [Y | Tail1]) :-
    del(X, Tail, Tail1).
```

**来源**: 列表删除谓词

---

## 5.8 列表插入

```prolog
% insert(X, L, NewL) 意味着NewL是在列表L中任意位置插入X的列表
insert(X, L, [X | L]).              % 将X插入为头部
insert(X, [Y | L], [Y | NewL]) :-   % 将X插入到尾部
    insert(X, L, NewL).
```

**来源**: 列表插入谓词

---

## 5.9 列表的子列表

```prolog
% sublist(List, Sublist) 意味着Sublist作为子列表出现在List中
sublist(S, L) :-
    conc(L1, L2, L),
    conc(S, L3, L2).
```

**来源**: 子列表谓词

---

## 5.10 操作符表示法

操作符表示法只是表面的符号改进。

**算术表达式的等效表示法**：

```prolog
+(*(2,a), *(b,c)) = 2*a + b*c
```

**用户定义的操作符**：

```prolog
:- op(600, xfx, has).
:- op(600, xfx, supports).

peter has information.
floor supports table.
```

**操作符类型**：

- **中缀操作符**: xfx, xfy, yfx
- **前缀操作符**: fx, fy
- **后缀操作符**: xf, yf

**来源**: Prolog 操作符语法

---

## 5.11 算术操作

**使用 is 进行算术计算**：

```prolog
?- X = 1+2.
X = 1 + 2  % Prolog保持表达式未计算

?- X is 1 + 2.
X = 3      % "is"强制计算
```

**算术操作符**：

- `+, -, *, /, **`: 加法、减法、乘法、除法、幂
- `//, mod`: 整数运算
- `sin, cos, log, ...`: 标准函数

**示例**：

```prolog
?- X is 2 + sin(3.14/2).
X = 2.9999996829318345

?- A is 11/3.
A = 3.6666666666666665

?- B is 11//3.
B = 3

?- C is 11 mod 3.
C = 2
```

**来源**: Prolog 算术操作

---

## 5.12 比较谓词

```prolog
X > Y      % X大于Y
X < Y      % X小于Y
X >= Y     % X大于等于Y
X =< Y     % X小于等于Y
X =:= Y    % X和Y数值相等
X =\= Y    % X和Y数值不相等
```

**示例**：

```prolog
?- 315 * 3 >= 250*4.
yes

?- 2+5 = 5+2.
no

?- 2+5 =:= 5+2.
yes
```

**来源**: Prolog 比较谓词

---

## 5.13 列表长度

```prolog
% length(L, N): N是列表L的长度
length([], 0).
length([_ | L], N) :-
    length(L, N0),
    N is N0 + 1.
```

**来源**: 列表长度谓词
