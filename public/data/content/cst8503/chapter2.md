# 第 2 章：Prolog 基础

**来源**: CST8503 课程材料 - Knowledge Representation and Reasoning

---

## 2.1 Prolog 基础

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

**来源**: Prolog 基础介绍

---

## 2.2 两种上下文

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

**来源**: Prolog 两种上下文说明

---

## 2.3 Prolog 程序

Prolog 程序是一组称为子句的语句，这些语句是事实和规则。

**工作流程**：

1. **建模**: 想象你要表示的世界，以及关于那个世界什么是真的
2. **编程**: 写下关于那个世界的所有相关真实事实和规则
3. **启动 prolog 解释器并咨询程序文件**
4. **运行程序**: 向 Prolog 解释器发出查询（问题）并接收答案

**来源**: Prolog 程序工作流程

---

## 2.4 加载程序：consult

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

**来源**: Prolog 加载程序命令

---

## 2.5 示例：家庭关系

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

**来源**: 家庭关系示例

---

## 2.6 谓词和常量

我们定义了一个 2 元谓词 parent（2 个参数）。我们使用符号 parent/2 来表示 2 元 parent 谓词。

**一般形式**: predicate(term₁, term₂, ..., termₖ)

**来源**: Prolog 谓词语法

---

## 2.7 封闭世界假设

Prolog 根据封闭世界假设操作：只有我们陈述的事物以及我们陈述的逻辑蕴涵才是真的。

在我们的家庭关系程序中，只有 7 个人：在封闭世界中不存在其他人。

**来源**: 封闭世界假设 (CWA)

---

## 2.8 Prolog 查询和变量绑定

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

**来源**: Prolog 查询和变量示例

---

## 2.9 Prolog 规则

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

**来源**: Prolog 规则语法
