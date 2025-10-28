# Chapter 3: Prolog Debugging

**Source**: CST8503 Course Material - Knowledge Representation and Reasoning

---

## 3.1 Declarative Meaning

**Context 1**: Write programs in files or at the |: user pseudo-file prompt

Clauses end with a period. In this context, a clause is a statement that is true because you said it is true.

```prolog
% Example
dead(einstein).  % einstein is dead
blue(sky).       % the sky is blue
person(todd).    % todd is a person
```

**Declarations with variables**:

```prolog
thispred(X).  % For all X, thispred is true of X, whatever X is
```

**Declarations with two arguments**:

```prolog
thispred(arg1, arg2).  % thispred is true of arg1 and arg2
parent(bill, joan).    % bill is a parent of joan
```

**Source**: Declarative Meaning Explanation

---

## 3.2 Procedural Interpretation

**Program Execution Steps**:

1. If no query part remains, return variable bindings
2. Remove next part of query from front for scanning
3. Scan left-hand sides of facts and rules looking for matches
4. If fact matches, apply matched variable bindings, go to 1
5. If left-hand side of rule matches, apply variable bindings, add right-hand side of rule to front of query, go to 1
6. If no match and there is a choice point, backtrack to 3
7. Otherwise, fail

**Source**: Prolog Procedural Interpretation Algorithm

---

## 3.3 Tracing Prolog Execution

**Debug Predicates**:

- `trace/0`: For subsequent goals, go step by step, showing information
- `notrace/0`: Stop further tracing
- `spy(P)`: Specify that predicate P (e.g., parent) is traced
- `nospy(P)`: Stop tracing predicate P

**Tracing Example**:

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

**Trace Commands**:

- `c` or space: Continue to next step of trace
- `l`: Continue execution, stopping at the next spy point (if any)
- `a`: Abort prolog execution
- `n`: Continue execution in "no debugging" mode
- `s`: Skip tracing of subgoals for this goal

**Source**: Prolog Tracing Tools

---

## 3.4 Graphical Tracing

Graphical tracing facilities help programmers see the tracing process by displaying source code, variable bindings, and the call stack.

**Graphical Tracing Predicates**:

- `guitracer/0`: Turn on graphical mode
- `gtrace/0`: Turn on graphical mode and tracing mode at once
- `noguitracer/0`: Turn off graphical mode

**Source**: Prolog Graphical Tracing Tools
