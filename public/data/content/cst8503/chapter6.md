# 第 6 章：Prolog 否定与截断

**来源**: CST8503 课程材料 - Knowledge Representation and Reasoning

---

## 6.1 截断操作符

**截断操作符**: Prolog 中的感叹号`!`

**重要提醒**：

- 截断是非逻辑的，所以在本课程中我们避免使用它
- 但我们需要知道它的含义
- 当截断(!)作为谓词体中的目标出现时，它总是为真
- 它丢弃选择点

**直观含义**: 如果证明过程到达谓词体中的截断，则提交到目前为止在处理该谓词时所做的所有选择。

**来源**: 截断操作符说明

---

## 6.2 截断示例（我们不使用）

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

**来源**: 截断示例

---

## 6.3 截断的作用域

截断丢弃 R、Q、P、C 中的选择点。截断不丢弃 B 或 A 中的选择点，因为这些选择点在截断的作用域之外。

**来源**: 截断作用域说明

---

## 6.4 否定

**Prolog 中的否定定义**：

```prolog
not(P) :- P, !, fail  % 如果P为真，则提交失败
       ;              % 这行创建一个选择点，会被截断丢弃
       true.          % P必须为假，因为截断没有被达到
```

这被称为**失败否定**。not 可以写为前缀操作符：`\+ P`

**来源**: 否定定义

---

## 6.5 否定示例

```prolog
likes(john, X) :- music(X), \+ heavy_metal(X).
```

John 喜欢所有音乐，除了重金属。这比用截断+失败的表述更易读。

**来源**: 否定示例

---

## 6.6 失败否定

**不完全等同于逻辑中的否定**：

- 失败否定做出"封闭世界假设"
- **封闭世界假设(CWA)**: Prolog 无法从程序中推导出的一切都被假定为假

**SWI Prolog 否定符号**: `\+ P`

**来源**: 失败否定说明

---

## 6.7 封闭世界假设示例

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

**来源**: 封闭世界假设示例

---

## 6.8 否定的问题

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

**来源**: 否定的问题示例

---

## 6.9 否定是非逻辑的

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

**来源**: 否定是非逻辑的

---

## 6.10 顺序重要的三种情况

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

**来源**: 顺序重要的情况
