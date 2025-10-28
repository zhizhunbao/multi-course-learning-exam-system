# 第 3 章：Prolog 调试

**来源**: CST8503 课程材料 - Knowledge Representation and Reasoning

---

## 3.1 声明性意义

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

**来源**: 声明性意义说明

---

## 3.2 程序性解释

**程序执行步骤**：

1. 如果没有查询部分剩余，返回变量绑定
2. 从前面取下查询的下一个部分进行扫描
3. 扫描事实和规则的左侧寻找匹配
4. 如果事实匹配，应用匹配的变量绑定，转到 1
5. 如果规则的左侧匹配，应用变量绑定，将规则的右侧添加到查询前面，转到 1
6. 如果没有匹配且有选择点，回溯到 3
7. 否则，失败

**来源**: Prolog 程序性解释算法

---

## 3.3 跟踪 Prolog 的执行

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

**来源**: Prolog 跟踪工具

---

## 3.4 图形跟踪

图形跟踪设施通过显示源代码、变量绑定和调用堆栈帮助程序员查看跟踪过程。

**图形跟踪谓词**：

- `guitracer/0`: 打开图形模式
- `gtrace/0`: 同时打开图形模式和跟踪模式
- `noguitracer/0`: 关闭图形模式

**来源**: Prolog 图形跟踪工具
