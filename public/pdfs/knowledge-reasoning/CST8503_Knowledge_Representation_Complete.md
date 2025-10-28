# CST8503 知识表示与推理 - 完整课程资料

_从 PDF 文档转换生成并整理_

---

## 📚 目录

- [第 1 章：知识表示介绍](#第1章知识表示介绍)
- [第 2 章：Prolog 基础](#第2章prolog基础)
- [第 3 章：Prolog 调试](#第3章prolog调试)
- [第 4 章：Prolog 结构与匹配](#第4章prolog结构与匹配)
- [第 5 章：Prolog 列表、操作符与算术](#第5章prolog列表操作符与算术)
- [第 6 章：Prolog 否定与截断](#第6章prolog否定与截断)
- [第 7 章：期中复习](#第7章期中复习)

---

## 第 1 章：知识表示介绍

### 课程信息

- **课程代码**: CST8503: K&R and Reasoning
- **教授**: Todd Kelley
- **办公室**: T315
- **电话**: 613-727-4723 x7474
- **邮箱**: kelleyt@algonquincollege.com

### 课程安排

- **讲座**: 周四 2-4pm (A1120)
- **实验课 301**: 周四 11:30am-1:30pm (J210)
- **实验课 302**: 周二 5:00-7:00pm (B220)
- **异步活动**: 平均每周 1 小时

### 1.1 知识表示 vs 机器学习 vs 人工智能

#### 人工智能

人工智能软件是解决通常被认为需要或受益于智能的问题的软件解决方案类别。

**图灵测试**:

- 在特定条件下，如果软件系统让你相信它具有智能，那么该软件系统就通过了智能的图灵测试
- 通过图灵测试被认为需要智能，因为即使智能是假的，成功伪造智能也需要智能

#### 机器学习 vs 知识表示

**机器学习**关注在数据中寻找模式：

- **监督学习**: 使用包含明确示例的标记数据集来训练系统寻找什么模式
- **无监督学习**: 系统使用算法在数据中寻找模式，但没有明确示例说明要寻找什么
- **强化学习**: 基于智能体的范式，在状态中根据策略重复选择动作以获得奖励

**知识表示**关注适合专用推理引擎处理的声明性知识形式：

- 声明性知识：以语言编写的（声明的）事实和规则（知识）
- 模式（知识）直接以事实和规则的形式提供给系统
- 系统（解释器）知道如何利用模式而无需学习它们

### 1.2 声明性知识

#### 知识表示语言的设计考虑

需要能够表示以下内容：

- 世界状态
- 可能发生的动作
- 动作在改变世界状态方面的结果

#### 声明性 vs 程序性

**声明性程序**（一组事实/规则）：

- 解决方案是一杯热棕色水，味道像咖啡
- 在水壶中烧水会产生热水
- 将一勺速溶咖啡放入热水中会产生味道像咖啡的棕色水
- 将沸水倒入杯中会产生一杯热水

**程序性解决方案**：

1. 从橱柜中取出杯子并放在柜台上
2. 用水壶装水
3. 插上水壶
4. 将一勺速溶咖啡放入柜台上的杯子中
5. 等待水壶沸腾
6. 将水从水壶倒入杯子

### 1.3 声明性编程

声明性知识具有程序性解释。如果我们将声明性知识与具有理论基础的正确实现的系统（如 Prolog 这样的定理证明器）结合，我们可以将声明性知识视为程序。

我们通过向定理证明器（在我们的情况下是 Prolog）发出查询来运行程序。Prolog 使用声明性知识（prolog 程序）通过推理推导出查询为真的条件（变量绑定）。

### 1.4 事实和规则编程

```prolog
% 祖先关系规则
forall X, Y Parent(X,Y) -> Ancestor(X,Y).
forall X,Y Parent(X,Y) and Ancestor(Y,Z) -> Ancestor(X,Z).

% 事实
Parent(john,joe).
Parent(joe,bill).
Parent(bill,jill).
Ancestor(joe,sally).
```

---

## 第 2 章：Prolog 基础

### 2.1 Prolog 基础

**Prolog**名称来自 PROgramming in LOGic。

**重要提醒**：

- 不要尝试将 Prolog 编程与你已知的编程进行比较
- 没有循环、没有 if 语句、没有你习惯的那种变量
- 不要尝试从 Python 翻译到 Prolog 或反之

**Prolog = 声明性编程**：

1. 声明事实和规则（prolog 程序）|: 提示符，或在文件中输入
2. 运行 prolog 解释器并加载程序
3. 发出查询（运行程序）?- 提示符
4. Prolog 将找到一组变量绑定，使查询为真，或者如果查询不为真则声明"no"

### 2.2 两种上下文

**上下文 1：编写 Prolog 程序**

- 在文件中输入 Prolog 代码
- 提示符是 |:
- 你正在做真实陈述

**上下文 2：运行 Prolog 程序**

- 在 Prolog 解释器中输入 Prolog 查询
- 提示符是 ?-
- 你正在问问题

```prolog
% 上下文1：编写程序
parent(jim,todd).

% 上下文2：运行程序
?- parent(jim,todd).
?- parent(jim,X).
```

### 2.3 Prolog 程序

Prolog 程序是一组称为子句的语句，这些语句是事实和规则。

**工作流程**：

1. **建模**: 想象你要表示的世界，以及关于那个世界什么是真的
2. **编程**: 写下关于那个世界的所有相关真实事实和规则
3. **启动 prolog 解释器并咨询程序文件**
4. **运行程序**: 向 Prolog 解释器发出查询（问题）并接收答案

### 2.4 加载程序：consult

```prolog
?- consult(myfile).
?- consult('myfile.pl').
?- consult('/path/to/the/file/myfile.pl').

% 列表表示法
?- [myfile].
?- ['myfile.pl'].
?- [file1, file2, 'file3.1'].
```

**特殊文件名"user"**：

```prolog
?- [user].
|: abc.
|: like(zzz).
|: ^D
% user://1 compiled 0.00 sec, 2 clauses
true.
```

### 2.5 示例：家庭关系

考虑以下家谱：

```
Jack    Jill
  \      /
   Joan
    |
   Bob
```

**Prolog 程序**：

```prolog
% parent(X,Y) 意味着X是Y的父母
parent(jack, joan).
parent(jill, joan).
parent(bill, bob).
parent(joan, bob).
parent(joan, gary).
parent(gary, kim).
parent(ann, kim).
```

### 2.6 谓词和常量

我们定义了一个 2 元谓词 parent（2 个参数）。我们使用符号 parent/2 来表示 2 元 parent 谓词。

**一般形式**: predicate(term₁, term₂, ..., termₖ)

### 2.7 封闭世界假设

Prolog 根据封闭世界假设操作：只有我们陈述的事物以及我们陈述的逻辑蕴涵才是真的。

在我们的家庭关系程序中，只有 7 个人：在封闭世界中不存在其他人。

### 2.8 Prolog 查询和变量绑定

变量以大写字母开头，或单个下划线是匿名变量。

```prolog
?- parent(P,joan).
P=jack ;
P=jill
```

**匿名变量**：

```prolog
?- parent(X,_).  % 谁有孩子
X = jack

?- parent(X,Y).  % 谁有孩子，哪个孩子？
X = jack
Y = joan
```

### 2.9 Prolog 规则

**祖先关系规则**：

- 如果 person X 是 person Y 的父母，那么 person X 是 person Y 的祖先
- 如果 person X 是 person Y 的父母，并且 person Y 是 person Z 的祖先，那么 person X 是 person Z 的祖先

**Prolog 形式**：

```prolog
ancestor(X,Y) :- parent(X,Y).
ancestor(X,Z) :- parent(X,Y), ancestor(Y,Z).
```

**规则语法**：

- 规则如"if P then Q"在 Prolog 中写为相反的方式：`Q :- P`
- 我们读作"Q if P"，意味着当我们试图证明 Q 为真时，我们可以通过证明 P 为真来成功
- 逗号","在 Prolog 中表示"and"
- 变量的作用域是单个子句

---

## 第 3 章：Prolog 调试

### 3.1 声明性意义

**上下文 1**：在文件中编写程序或在用户伪文件提示符|:处

子句以句号结尾。在此上下文中的子句是一个因为你说它是真的而为真的陈述。

```prolog
% 示例
dead(einstein).  % einstein是死的
blue(sky).       % 天空是蓝色的
person(todd).    % todd是一个人
```

**带变量的声明**：

```prolog
thispred(X).  % 对于所有X，thispred对X为真，无论X是什么
```

**带两个参数的声明**：

```prolog
thispred(arg1, arg2).  % thispred对arg1和arg2为真
parent(bill, joan).    % bill是joan的父母
```

### 3.2 程序性解释

**程序执行步骤**：

1. 如果没有查询部分剩余，返回变量绑定
2. 从前面取下查询的下一个部分进行扫描
3. 扫描事实和规则的左侧寻找匹配
4. 如果事实匹配，应用匹配的变量绑定，转到 1
5. 如果规则的左侧匹配，应用变量绑定，将规则的右侧添加到查询前面，转到 1
6. 如果没有匹配且有选择点，回溯到 3
7. 否则，失败

### 3.3 跟踪 Prolog 的执行

**调试谓词**：

- `trace/0`: 对于后续目标，逐步进行，显示信息
- `notrace/0`: 停止进一步跟踪
- `spy(P)`: 指定谓词 P（例如，parent）被跟踪
- `nospy(P)`: 停止谓词 P 的跟踪

**跟踪示例**：

```prolog
?- trace.
true.

[trace] ?- parent(X,bob).
Call: (8) parent(_5980, bob) ? creep
Exit: (8) parent(bill, bob) ? creep
X = bill ;
Redo: (8) parent(_5980, bob) ? creep
Exit: (8) parent(joan, bob) ? creep
X = joan.
```

**跟踪命令**：

- `c` 或空格：继续到跟踪的下一步
- `l`: 继续执行，在下一个间谍点停止（如果有）
- `a`: 中止 prolog 执行
- `n`: 在"无调试"模式下继续执行
- `s`: 跳过对此目标的子目标的跟踪

### 3.4 图形跟踪

图形跟踪设施通过显示源代码、变量绑定和调用堆栈帮助程序员查看跟踪过程。

**图形跟踪谓词**：

- `guitracer/0`: 打开图形模式
- `gtrace/0`: 同时打开图形模式和跟踪模式
- `noguitracer/0`: 关闭图形模式

---

## 第 4 章：Prolog 结构与匹配

### 4.1 Prolog 语法

**数据对象**：

```
data objects
├── simple objects
│   ├── constants
│   │   ├── atoms
│   │   └── numbers
│   └── variables
└── structures
```

### 4.2 原子语法（3 种形式）

**(1) 以小写字母开头的字母、数字和"\_"字符串**：

```
x, x15, x_15, aBC_CBa7, alpha_beta_algorithm, taxi_35, peter, missJones, miss_Jones2
```

**(2) 特殊字符字符串**：

```
--->, <==>, <<, .., .::., ::=, [], ., <, >, +, ++, !
```

**(3) 单引号中的字符串**：

```
'X_35', 'Peter', 'The Beatles'
```

### 4.3 数字语法

**整数**: `1, 1313, 0, -55`

**实数（浮点）**: `3.14, -0.0045, 1.34E-21`

### 4.4 变量语法

以小写字母或下划线开头的字母、数字和下划线字符串：

```
X, Results, Object2B, Participant_list, _x35, _335
```

**匿名变量**: 单个下划线`_`

**变量作用域**: 变量名的词法作用域是一个子句。

### 4.5 结构

结构是具有多个组件的对象。

**示例**：日期是具有三个组件的结构化对象

```prolog
date(17, june, 2006)
```

**函子**: 函子名称由用户选择，语法为原子。

**树表示**：

```
date(17, june, 2006)
    |
    date
   /  |  \
  17 june 2006
```

### 4.6 几何对象示例

```prolog
P1 = point(1, 1)
P2 = point(2, 3)
S = seg(P1, P2) = seg(point(1,1), point(2,3))
T = triangle(point(4,2), point(5,4), point(7,1))
```

**算术表达式作为结构**：

```prolog
(a + b) * (c - 5)
*(+(a, b), -(c, 5))
```

### 4.7 匹配

匹配是对项（结构）的操作。给定两个项，如果它们相同，或者可以通过正确实例化两个项中的变量使它们相同，则它们匹配。

**匹配示例**：

```prolog
date(D1, M1, 2006) = date(D2, june, Y2)
```

这导致变量被实例化为：

```
D1 = D2
M1 = june
Y2 = 2006
```

**匹配算法**：

1. 如果 S 和 T 是常量，则它们只有在相同时才匹配
2. 如果 S 是变量，则匹配成功，S 被实例化为 T
3. 如果 T 是变量，则匹配成功，T 被实例化为 S
4. 如果 S 和 T 是结构，则它们只有在以下情况下才匹配：
   - 它们都有相同的主函子
   - 它们的所有对应参数都匹配

### 4.8 匹配 vs 统一

**统一** = 匹配 + 出现检查

**出现检查**: 一侧是否出现在另一侧内？

统一与匹配相同，除了如果一侧出现在另一侧内，统一会失败。

```prolog
?- X = f(X).  % 匹配成功，统一失败
```

### 4.9 表示两个事物不同

**两种可能性**：

1. **否定操作符 \+**（有问题）：

```prolog
\+ X = Y  % 除非X和Y都被实例化，否则总是失败
\+ X = 4  % 除非X被实例化为非4的某物，否则总是失败
```

2. **dif/2 内置谓词**（更好）：

```prolog
dif(X,Y)  % 延迟比较直到X和Y都被实例化
```

### 4.10 用匹配计算

```prolog
% 垂直和水平段的定义
vertical(seg(point(X1,Y1), point(X1, Y2))).
horizontal(seg(point(X1,Y1), point(X2, Y1))).

?- vertical(seg(point(1,1), point(1, 3))).
yes

?- vertical(seg(point(1,1), point(2, Y))).
no

?- vertical(seg(point(2,3), P)).
P = point(2, _173).
```

---

## 第 5 章：Prolog 列表、操作符与算术

### 5.1 Prolog 谓词参数类型

**参数模式指示器**：

- `?` 参数：要么提供输入，要么接受输出，或者用于输入和输出
- 示例：`member(?Elem, ?List)`: 如果 Elem 是 List 的成员则为真

```prolog
?- member(X,[a,b,c]).  % 第一个参数是输出，第二个参数是输入
```

### 5.2 指令

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

### 5.3 Prolog 列表

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

### 5.4 列表表示法是语法糖

**列表表示法**: `[Head | Tail]`

**等效的标准 Prolog 表示法**: `'[|]'(Head, Tail)`

**等效项**：

```prolog
[a, b, c] = '[|]'(a, '[|]'(b, '[|]'(c, [])))
```

### 5.5 列表成员

```prolog
% member(X, L) 意味着X是列表L的成员
member(X, [X | _]).        % X作为列表的头部出现
member(X, [_ | L]) :- member(X, L).  % X在列表的尾部中
```

### 5.6 列表连接

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

### 5.7 列表删除

```prolog
% del(X, L, NewL) 意味着NewL是从列表L中删除第一个X的列表
del(X, [X | Tail], Tail).
del(X, [Y | Tail], [Y | Tail1]) :-
    del(X, Tail, Tail1).
```

### 5.8 列表插入

```prolog
% insert(X, L, NewL) 意味着NewL是在列表L中任意位置插入X的列表
insert(X, L, [X | L]).              % 将X插入为头部
insert(X, [Y | L], [Y | NewL]) :-   % 将X插入到尾部
    insert(X, L, NewL).
```

### 5.9 列表的子列表

```prolog
% sublist(List, Sublist) 意味着Sublist作为子列表出现在List中
sublist(S, L) :-
    conc(L1, L2, L),
    conc(S, L3, L2).
```

### 5.10 操作符表示法

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

### 5.11 算术操作

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

### 5.12 比较谓词

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

### 5.13 列表长度

```prolog
% length(L, N): N是列表L的长度
length([], 0).
length([_ | L], N) :-
    length(L, N0),
    N is N0 + 1.
```

---

## 第 6 章：Prolog 否定与截断

### 6.1 截断操作符

**截断操作符**: Prolog 中的感叹号`!`

**重要提醒**：

- 截断是非逻辑的，所以在本课程中我们避免使用它
- 但我们需要知道它的含义
- 当截断(!)作为谓词体中的目标出现时，它总是为真
- 它丢弃选择点

**直观含义**: 如果证明过程到达谓词体中的截断，则提交到目前为止在处理该谓词时所做的所有选择。

### 6.2 截断示例（我们不使用）

**学生成绩转换**：

```prolog
convert(X,'A+'):-X>=90,!.
convert(X,'A'):-X>=85,!.
convert(X,'A-'):-X>=80,!.
convert(X,'B+'):-X>=77,!.
convert(X,'B'):-X>=73,!.
convert(X,'B-'):-X>=70,!.
convert(X,'C+'):-X>=67,!.
convert(X,'C'):-X>=63,!.
convert(X,'C-'):-X>=60,!.
convert(X,'D+'):-X>=57,!.
convert(X,'D'):-X>=53,!.
convert(X,'D-'):-X>=50,!.
convert(X,'F').
```

**问题**：

```prolog
?- convert(85,Grade).
Grade = 'A'.

?- convert(85,'C-').
true.  % 这是错误的！
```

### 6.3 截断的作用域

截断丢弃 R、Q、P、C 中的选择点。截断不丢弃 B 或 A 中的选择点，因为这些选择点在截断的作用域之外。

### 6.4 否定

**Prolog 中的否定定义**：

```prolog
not(P) :- P, !, fail  % 如果P为真，则提交失败
       ;              % 这行创建一个选择点，会被截断丢弃
       true.          % P必须为假，因为截断没有被达到
```

这被称为**失败否定**。not 可以写为前缀操作符：`\+ P`

### 6.5 否定示例

```prolog
likes(john, X) :- music(X), \+ heavy_metal(X).
```

John 喜欢所有音乐，除了重金属。这比用截断+失败的表述更易读。

### 6.6 失败否定

**不完全等同于逻辑中的否定**：

- 失败否定做出"封闭世界假设"
- **封闭世界假设(CWA)**: Prolog 无法从程序中推导出的一切都被假定为假

**SWI Prolog 否定符号**: `\+ P`

### 6.7 封闭世界假设示例

考虑这个单行程序：

```prolog
round(sun).
```

**Prolog 的回答应如何理解**：

```prolog
?- round(sun).
true    % 真，round(sun)从程序逻辑上得出

?- round(earth).
false   % 假意味着：我不知道，无法从程序推导出

?- \+ round(earth).
true    % 它从程序中得出，但只在CWA下
```

### 6.8 否定的问题

**示例程序**：

```prolog
person(jack).
person(judy).
person(jeff).

male(jack).
male(jeff).

female(X) :- \+ male(X).
```

**意外结果**：

```prolog
?- male(jack).
true.

?- female(judy).
true.

?- male(X).
X = jack ;
X = jeff.

?- female(X).
false.  % 没有人是女性？

?- female(judy).
true.   % judy是女性但没有人是女性？
```

### 6.9 否定是非逻辑的

**否定在涉及未绑定变量的项时给出错误答案**：

- 没有未绑定变量的项称为"基项"
- 否定的顺序很重要：尽可能延迟否定以增加所有变量被绑定的机会

```prolog
?- \+ X = a.
false.

?- \+ X = a, X = b.
false.

?- X = b, \+ X = a.
X = b.
```

### 6.10 顺序重要的三种情况

1. **递归和无限循环**：

```prolog
ancestor(X,Z) :- parent(X,Y), ancestor(Y,Z).
% 递归在Y被parent(X,Y)绑定之后
```

2. **算术**：

```prolog
X = 4, Y is X * 3.
% 算术在X被X = 4绑定之后
```

3. **否定**：

```prolog
X = b, \+ X = a.
% 否定在X被X = b绑定之后
```

---

## 第 7 章：期中复习

### 7.1 期中考试信息

**考试时间**: 10 月 16 日 2:00pm

- 1 小时考试，但每个人给 1.5 小时
- 闭卷，无网络
- 部分选择题答题卡测验（带铅笔、橡皮）
- 部分书面答案在纸上（带铅笔/钢笔、橡皮）

**涵盖材料**: 到目前为止课程中的材料

### 7.2 学习指南

- 复习讲座幻灯片/笔记
- 复习混合活动测验
- 复习实验和作业

### 7.3 可能的问题

**选择题**：

- 类似于测验
- 可能基于"检查你的学习"幻灯片问题

**书面答案**：

- 编写涉及递归的小程序，可能来自实验或作业
- 可能基于"检查你的学习"幻灯片问题

### 7.4 具体问题类型

1. **编写类似"mymember(X,L)"的谓词，意思是 X 是列表 L 的元素**
2. **编写与直接关系和间接关系相关的谓词（后继/更大、父母/祖先等）**
3. **编写或调试涉及算术的谓词**
4. **解释封闭世界假设的含义**

### 7.5 复习要点

**知识表示**：

- 声明性编程
- Prolog 语言
- CWA、变量、程序性解释、匹配 vs 统一

**Prolog 语法**：

- 结构、列表
- 递归和示例
- 截断
- 失败否定

---

## 📝 总结

本课程涵盖了知识表示与推理的核心概念，从基础的声明性编程概念到 Prolog 语言的深入应用。通过学习这些材料，你将能够：

1. **理解知识表示与机器学习的区别**
2. **掌握 Prolog 编程基础**
3. **学会调试 Prolog 程序**
4. **熟练使用 Prolog 数据结构和匹配**
5. **应用列表、操作符和算术操作**
6. **理解否定和截断的概念**

这些技能为后续的知识表示和推理应用奠定了坚实的基础。

---

_文档生成时间: 2024 年_
_来源: CST8503 课程 PDF 材料转换整理_
