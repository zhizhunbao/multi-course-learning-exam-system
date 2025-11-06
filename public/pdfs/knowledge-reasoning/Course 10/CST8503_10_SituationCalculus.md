# CST8503 10 SituationCalculus

_从 PDF 文档转换生成_

---

## 目录

- Note: first-order predicate calculus is actually an infinite family of
- we want to do, for example
- Example actions:
- 3 blocks, 4 positions in the blocks world of this course
- Examples of Fluents being used to make statements:
- • Example situations
- 1. This represents a course of action consisting of three actions, in order: pick_up(block(block1)),
- 2. Similarity to peano number theory:
- 3. Similarity to prolog lists, using the dot (.) functor notation
- 1. The special situation where nothing has happened, S will be

---

_注: 共提取了 1 张图片_

## 第 1 页

**Knowledge Representation:**
**Situation Calculus**

![图片](./CST8503_10_SituationCalculus_images/page_001_img_01.png)

---

## 第 2 页

**Situation Calculus**

The Situation Calculus is a first-order predicate language designed for representing and reasoning about dynamical worlds [https://en.wikipedia.org/wiki/Situation_calculus](https://en.wikipedia.org/wiki/Situation_calculus)

Note: first-order predicate calculus is actually an infinite family of languages. The version of the situation calculus we will use in this course is a member of that family.

First introduced by John McCarthy in 1963. Developed further by the KR group at the University of Toronto: see papers/books by Ray Reiter, Hector Levesque

**通俗解释：**

**什么是情境演算（Situation Calculus）？**

- 情境演算是一种特殊的"语言"或"工具"，用来描述和推理会变化的世界
- 就像用数学公式描述物理规律一样，情境演算用逻辑公式来描述"世界如何变化"
- 它专门用来处理"动态世界"，也就是会随着时间或动作而改变的世界（比如积木世界、机器人世界等）

**为什么叫"一阶谓词语言"？**

- "一阶谓词"是一种逻辑表达方式，可以表示"某个东西具有某个属性"或"某些东西之间有某种关系"
- 比如"积木 b1 在积木 b2 上面"就是一个谓词
- "一阶"意思是我们可以描述对象和它们的属性，但不能描述"关于属性的属性"（那是二阶逻辑）
- 一阶谓词演算实际上是一个语言家族，有很多变体，我们课程中用的是其中一种

**历史背景：**

- 1963 年由 John McCarthy（人工智能领域的先驱之一）首次提出
- 后来由多伦多大学的知识表示（KR）研究组进一步发展，特别是 Ray Reiter 和 Hector Levesque 等人的工作
- 这是人工智能中知识表示和推理的重要理论基础

**为什么需要情境演算？**

- 在真实世界中，事物会变化：积木会被移动，机器人会改变位置，状态会随时间改变
- 传统的逻辑只能描述"静态"的事实，无法表达"做了某个动作后会发生什么"
- 情境演算解决了这个问题，让我们能够描述和推理动态变化的世界

---

## 第 3 页

**Situation Calculus (cont'd)**

The basic elements of the calculus are:

- The actions that can be performed in the world
- The fluents that describe the state of the world
- The situations that represent courses of action

A domain is formalized by a number of axioms, namely:

- Action precondition axioms, one for each action
- Successor state axioms, one for each fluent
- Axioms describing the initial state of the world
- The foundational axioms of the situation calculus

**通俗解释：**

**情境演算的三个基本元素：**

1. **动作（Actions）**

   - 就是在世界中可以执行的操作
   - 比如"拿起积木"、"移动积木"、"放下积木"
   - 动作是改变世界的唯一方式
2. **流式谓词（Fluents）**

   - 用来描述世界状态的谓词（逻辑表达式）
   - "流式"的意思是这些谓词的真假值会随着动作的执行而改变
   - 比如"积木 b1 在积木 b2 上面"这个状态，执行"移动"动作后可能会变成假
3. **情境（Situations）**

   - 表示一系列动作的执行历史，也就是"动作序列"
   - 比如"先拿起积木，再移动，再放下"就是一个情境
   - 情境记录了"发生了什么"，从而决定了"现在是什么状态"

**如何形式化一个领域（用公理描述）：**

1. **动作前提条件公理（Action Precondition Axioms）**

   - 每个动作都需要一个前提条件公理
   - 说明"在什么情况下可以执行这个动作"
   - 比如"只有积木上面没有其他积木时，才能移动它"
2. **后继状态公理（Successor State Axioms）**

   - 每个流式谓词都需要一个后继状态公理
   - 说明"执行某个动作后，这个谓词会变成真还是假"
   - 比如"移动积木 b1 后，'b1 在 b2 上'会变成假，'b1 在 b3 上'会变成真"
3. **初始状态公理（Initial State Axioms）**

   - 描述"在没有任何动作发生之前，世界是什么样子的"
   - 这是推理的起点
4. **基础公理（Foundational Axioms）**

   - 情境演算本身的基础规则
   - 这些是隐含的，我们主要关注上面的三种公理

---

## 第 4 页

**Situation Calculus (cont'd)**

The basic elements of the calculus:

- actions are things
- fluents are predicates that give state of the world which depends on situation
- situations are effectively lists of actions (read right to left)

A domain is formalized by a number of axioms, namely:

- Action precondition axioms: under what conditions is each action possible?
- Successor state axioms: what is true after an action occurrence?
- Initial State axioms: what is true before any action happens?
- Foundational Axioms: implicit for us -- we concentrate on the above

**通俗解释：**

**基本元素的更详细说明：**

1. **动作（Actions）是"东西"**

   - 动作是具体的实体，可以像对象一样被操作和引用
   - 比如 `pick_up(block(b1))` 就是一个具体的动作对象
2. **流式谓词（Fluents）依赖于情境**

   - 流式谓词是描述世界状态的谓词，但它的真假值取决于"在哪个情境下"
   - 比如 `on(b1, b2, s)` 表示"在情境 s 中，积木 b1 在积木 b2 上面"
   - 同一个谓词在不同情境下可能有不同的真假值
3. **情境（Situations）本质上是动作列表（从右到左读）**

   - 情境实际上就是一系列动作的列表
   - 比如 `do(put_down(b1), do(move(x,y), do(pick_up(b1), S)))` 表示：
     - 从初始状态 S 开始
     - 先执行 pick_up(b1)
     - 然后执行 move(x,y)
     - 最后执行 put_down(b1)
   - **注意**：虽然写的时候是从外到内（从后往前），但读的时候要从内到外（从前往后）

**四种公理的通俗理解：**

1. **动作前提条件公理**：回答"什么时候可以做这个动作？"

   - 就像游戏规则：只有满足某些条件才能执行某个操作
2. **后继状态公理**：回答"做了这个动作后，什么会变成真？"

   - 描述动作的"效果"，也就是动作如何改变世界状态
3. **初始状态公理**：回答"一开始世界是什么样子的？"

   - 这是所有推理的起点，就像游戏的初始状态
4. **基础公理**：情境演算的内在规则

   - 这些规则是隐含的，我们不需要显式地写出来，但它们是整个系统的基础

---

## 第 5 页

**Axioms**

What are axioms?
Axioms are the initial statements (logical formulae) that we make when we are representing a domain

What do I mean by a domain?
A domain is a part of the world that's relevant to the reasoning we want to do, for example

- In a block-stacking domain, we would write down everything we can about blocks, stacking, moving, putting down, and so
- If we want to represent a bigger subset of the world, there is more we need to write down to represent that world

**通俗解释：**

**什么是公理（Axioms）？**

- 公理就像是游戏规则或说明书中的基础设定。比如在象棋游戏中，"车只能走直线"就是一条公理
- 它们是我们在描述某个领域时，一开始就确定下来的基本事实和规则
- 不需要证明，而是作为推理的起点和基础

**什么是领域（Domain）？**

- 领域就是我们关注的那个"小世界"。就像你玩积木游戏时，你只关心积木的摆放，不关心天气如何
- 比如"积木世界"就是一个领域，我们只关心积木的位置、能否移动等，不关心积木的颜色、价格等其他信息
- 领域越大，需要描述的内容就越多；领域越小，描述就越简单

**为什么需要公理？**

- 有了公理，计算机才能知道"什么情况下可以做什么"、"做了某个动作后会发生什么"
- 就像给机器人一本操作手册，告诉它在这个领域里应该遵循什么规则

---

## 第 6 页

**Actions**

We will concentrate on simple actions whose effects don't depend on time. The formalism works with complex/concurrent actions, and actions that depend on time, but we will keep things simple.

Actions are the mechanism for aspects of our domain to change.

Example actions:

- `pick_up(block(block1))`
- `move_to(location(x),location(y))`
- `put_down(block(block1))`

**通俗解释：**

**什么是动作（Actions）？**

- 动作就是能够改变世界状态的操作。就像你在游戏中点击"移动"按钮，角色就会从一个位置走到另一个位置
- 动作是连接"现在是什么样"和"接下来会变成什么样"的桥梁
- 每个动作执行后，世界会从一个状态转换到另一个状态

**为什么只关注简单动作？**

- 我们这里只研究"简单动作"，意思是动作的效果不随时间变化
- 比如"拿起积木"这个动作，无论什么时候执行，效果都是一样的：积木从桌上到了你手里
- 虽然这个理论也能处理复杂动作（比如同时做多个动作）或随时间变化的动作，但为了便于理解，我们先从简单的开始

**动作的作用：**

- 动作是改变领域的唯一方式。如果没有动作，世界就会永远保持原样
- 就像积木游戏：如果没有"拿起"、"移动"、"放下"这些动作，积木就永远在原地不动
- 通过定义动作，我们告诉系统"可以做什么"以及"做了之后会发生什么"

**示例动作的含义：**

- `pick_up(block(block1))`：拿起积木 1（从桌上或其他地方拿起）
- `move_to(location(x),location(y))`：移动到位置 x 到位置 y（改变位置）
- `put_down(block(block1))`：放下积木 1（把积木放到某个位置）

---

## 第 7 页

**Action Schema**

Sometimes we represent a number of actions with a single expression called an Action Schema.

**Blocks World Action Schema:** `move(Block,Src,Dst)`

3 blocks, 4 positions in the blocks world of this course

Single expression representing all the individual actions -- all combinations of (Block,Src,Dst), of which there are 3x7x7:

```
move(block(b1),block(b1),block(b1))
move(block(b1),block(b1),block(b2))
move(block(b1),block(b1),block(b3))
move(block(b1),block(b1),position(p1))
…. etc …. etc …
```

**通俗解释：**

**什么是动作模式（Action Schema）？**

- 动作模式就像一个"模板"或"公式"，用一个表达式就能代表很多个具体的动作
- 就像数学中的函数 `f(x)` 可以代表无数个具体的值一样，`move(Block,Src,Dst)` 可以代表所有可能的移动动作
- 这样做的好处是：不用一个一个地列出所有动作，用一个模式就能概括所有情况

**为什么使用动作模式？**

- **节省空间**：如果积木世界有 3 个积木和 4 个位置，可能的移动动作有 147 种（3×7×7），如果都列出来会非常长
- **更清晰**：用一个模式 `move(Block,Src,Dst)` 就能清楚地表达"移动积木"这个动作的本质
- **更灵活**：当积木或位置数量变化时，不需要重新定义所有动作，只需要修改参数

**如何理解 `move(Block,Src,Dst)`？**

- `Block`：要移动的积木（比如 b1, b2, b3）
- `Src`：源位置，积木现在在哪里（可以是另一个积木的上面，或者某个位置）
- `Dst`：目标位置，积木要移动到哪里（可以是另一个积木的上面，或者某个位置）

**为什么是 3×7×7 = 147 种组合？**

- **3 个积木**：b1, b2, b3（第一个参数有 3 种选择）
- **7 个源位置**：3 个积木 + 4 个位置 = 7 个可能的位置（第二个参数有 7 种选择）
  - 积木可以放在：block(b1)上、block(b2)上、block(b3)上、position(p1)、position(p2)、position(p3)、position(p4)
- **7 个目标位置**：同样，积木可以移动到 7 个位置中的任何一个（第三个参数有 7 种选择）
- 所以总共有：3 × 7 × 7 = 147 种可能的移动动作

**示例动作的含义：**

- `move(block(b1),block(b1),block(b1))`：把积木 b1 从 b1 上移动到 b1 上（实际上就是不动，但这是理论上可能的动作）
- `move(block(b1),block(b1),block(b2))`：把积木 b1 从 b1 上移动到 b2 上
- `move(block(b1),block(b1),block(b3))`：把积木 b1 从 b1 上移动到 b3 上
- `move(block(b1),block(b1),position(p1))`：把积木 b1 从 b1 上移动到位置 p1

**实际应用：**

- 在实际的积木世界中，并不是所有 147 种组合都是有效的（比如不能把积木放在自己上面）
- 但动作模式帮我们系统地思考所有可能性，然后通过"前提条件"来筛选出哪些动作是真正可以执行的

---

## 第 8 页

**Fluents**

Fluents are predicates that take a situation argument. They are called fluents because they represent statements whose truth value changes (due to actions). They take a situation (action history) as the last argument.

Fluents are used to represent the situation-dependent state of the world (hence their last argument is a situation).

Examples of Fluents being used to make statements:

- `on(block(block1),block(block2),s)`
- `holding(block(block3),s)`
- `position(location(x),location(y),s)`

**通俗解释：**

**什么是流式谓词（Fluents）？**

- **"流式"的含义**：流式谓词的真假值会"流动"变化，不是固定不变的
- 就像水会流动一样，这些谓词描述的状态会随着动作的执行而改变
- 它们之所以叫"流式"，是因为它们的真值会变化（fluent 在英文中有"流动的"意思）

**流式谓词的特点：**

1. **必须包含情境参数**

   - 流式谓词的最后一个参数总是情境（situation）
   - 因为同一个谓词在不同情境下可能有不同的真假值
   - 比如"积木 b1 在 b2 上面"在初始状态可能是假的，但执行某些动作后可能变成真的
2. **描述依赖于情境的世界状态**

   - 流式谓词用来描述"在某个情境下，世界是什么样子的"
   - 它们不能单独存在，必须说明"在哪个情境下"这个状态才成立

**示例流式谓词的含义：**

1. `on(block(block1),block(block2),s)`

   - 含义：在情境 s 中，积木 block1 在积木 block2 上面
   - 这是一个二元关系，描述两个积木之间的位置关系
   - 执行移动动作后，这个谓词的真假值可能会改变
2. `holding(block(block3),s)`

   - 含义：在情境 s 中，正在拿着积木 block3
   - 描述"持有"这个状态
   - 执行 pick_up 动作后可能变成真，执行 put_down 动作后可能变成假
3. `position(location(x),location(y),s)`

   - 含义：在情境 s 中，位置是 location(x)到 location(y)
   - 描述位置或坐标信息
   - 执行移动动作后，这个谓词的值会改变

**流式谓词 vs 普通谓词：**

- **普通谓词**：比如"2+2=4"，这个永远是真的，不依赖于任何情境
- **流式谓词**：比如"积木 b1 在 b2 上"，这个可能现在是真，执行动作后就变成假了
- 流式谓词是"动态的"，普通谓词是"静态的"

**为什么需要流式谓词？**

- 在动态世界中，我们需要描述"会变化的状态"
- 流式谓词让我们能够说"在做了某些动作之后，世界变成了什么样子"
- 这是推理和规划的基础：我们需要知道"如果执行这个动作序列，最终会达到什么状态"

---

## 第 9 页

**Situations**

It's tempting to think of a situation as a state, but in the modern versions of the situation calculus, a situation is:

- an action history, or in other words, a course of action
- There is a distinguished function symbol S representing the action history of no action
- There is a distinguished function symbol `do(a,s)` representing the situation (action history) resulting from doing a "in" or equivalently "after" s

Example situations:

- `do(pick_up(block(block1)),S)`
- `do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))`

**通俗解释：**

**什么是情境（Situations）？**

**重要区别：情境 ≠ 状态**

- 很多人会误以为情境就是"状态"（比如"积木 b1 在 b2 上"），但实际上不是
- 在现代的情境演算中，情境是**动作历史**，也就是"做了什么动作的序列"
- 状态是"世界现在是什么样子"，情境是"我们是怎么到达这个状态的"

**情境的本质：**

1. **情境是动作历史（Action History）**

   - 情境记录的是"执行了哪些动作，按什么顺序执行的"
   - 就像游戏的回放记录，记录了"玩家做了什么操作"
   - 比如"先拿起积木，再移动，再放下"就是一个情境
2. **特殊符号 S：初始情境**

   - `S`（或写作 `S₀`）表示"还没有执行任何动作"的情境
   - 这是所有动作历史的起点
   - 就像游戏的初始状态，还没有任何操作
3. **函数符号 `do(a,s)`：执行动作后的新情境**

   - `do(a,s)` 表示"在情境 s 中执行动作 a 后得到的新情境"
   - 可以理解为"在 s 的基础上，再执行 a"
   - 这就像在游戏历史记录后面追加一个新的操作

**示例情境的解读：**

1. `do(pick_up(block(block1)),S)`

   - 含义：在初始情境 S 中执行"拿起积木 block1"后得到的新情境
   - 这个情境记录了：从初始状态开始，执行了一次"拿起积木 block1"的动作
   - 可以理解为：动作历史 = [pick_up(block(block1))]
2. `do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))`

   - 这个比较复杂，让我们从内到外读（从先到后）：
   - 最内层：`do(pick_up(block(block1)),S)` - 先拿起积木 block1
   - 中间层：`do(move(location(x),location(y)),...)` - 然后从位置 x 移动到位置 y
   - 最外层：`do(put_down(block(block1)),...)` - 最后放下积木 block1
   - 动作历史 = [pick_up(block(block1)), move(location(x),location(y)), put_down(block(block1))]

**为什么用动作历史而不是状态？**

- **唯一性**：同一个状态可能通过不同的动作序列达到，但每个动作序列都是唯一的
- **可追溯**：通过动作历史，我们可以知道"是怎么到达这个状态的"
- **可推理**：知道动作历史，我们可以推导出当前状态；但只知道状态，无法知道历史

**类比理解：**

- **状态**：就像照片，只显示"现在是什么样子"
- **情境**：就像视频，记录了"从开始到现在发生了什么"
- 情境包含了更多信息，因为它记录了"如何到达当前状态"

---

## 第 10 页

**Situation observations**

```
do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))
```

1. This represents a course of action consisting of three actions, in order: `pick_up(block(block1))`, `move(location(x),location(y))`, `put_down(block(block1))`
2. Similarity to peano number theory:

   - `succ(succ(succ(0)))` is the formal representation of 3
3. Similarity to prolog lists, using the dot (.) functor notation:

   - `. (put_down(block(block1)),.(move(location(x),location(y)),.(pick_up(block(block1)),[ ])))`
   - or in prolog regular notation for lists: `[put_down(block(block1)),move(location(x),location(y)),pick_up(block(block1))]`

**通俗解释：**

**情境的观察和理解：**

**1. 动作序列的解读**

- 这个情境表示一个由三个动作组成的动作序列，按顺序是：
  1. `pick_up(block(block1))` - 拿起积木 block1
  2. `move(location(x),location(y))` - 从位置 x 移动到位置 y
  3. `put_down(block(block1))` - 放下积木 block1
- **重要**：虽然写的时候是从外到内（最后执行的动作在最外面），但读的时候要从内到外（最先执行的动作在最里面）
- 这就像剥洋葱，最外层是最后做的，最内层是最先做的

**2. 与皮亚诺数论的相似性**

- **皮亚诺数论**：用 `succ`（successor，后继）函数来定义自然数

  - `0` 表示数字 0
  - `succ(0)` 表示数字 1（0 的后继）
  - `succ(succ(0))` 表示数字 2（1 的后继）
  - `succ(succ(succ(0)))` 表示数字 3（2 的后继）
- **相似之处**：

  - 情境演算中的 `do` 函数就像数论中的 `succ` 函数
  - `S`（初始情境）就像 `0`（初始数字）
  - `do(a,S)` 就像 `succ(0)`，表示"在初始基础上执行一个动作"
  - `do(a2, do(a1, S))` 就像 `succ(succ(0))`，表示"执行了两个动作"
- **类比理解**：

  - 数论：通过不断应用 `succ` 来构建更大的数字
  - 情境演算：通过不断应用 `do` 来构建更长的动作历史

**3. 与 Prolog 列表的相似性**

- **Prolog 列表表示法**：

  - 空列表 `[]` 表示初始情境 S（还没有任何动作）
  - 列表 `[a1, a2, a3]` 表示执行了三个动作的序列
  - 点号表示法 `.` 是列表的内部表示方式
- **对应关系**：

  - `do(put_down(...), do(move(...), do(pick_up(...), S)))`
  - 等价于 Prolog 列表：`[put_down(...), move(...), pick_up(...)]`
  - 注意：列表的**书写顺序**是从左到右，但**执行顺序**是从右到左（先执行的在后/右边）
  - `do` 嵌套是从内到外（先执行的在内），列表是从右到左（先执行的在右）
- **为什么用列表表示？**

  - 列表是 Prolog 中表示序列的自然方式
  - 更容易读写和理解
  - 可以直接用 Prolog 的列表操作来处理情境

**实际应用：**

- 在 Prolog 程序中，我们通常用列表 `[a1, a2, a3]` 来表示情境，而不是嵌套的 `do` 函数
- 这样更简洁，也更符合 Prolog 的编程习惯
- 但两种表示方式是等价的，可以互相转换

---

## 第 11 页

**Situation observations (cont'd)**

```
do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))
```

We can be really clever Prolog programmers and adopt the following convention for situations:

1. The special situation where nothing has happened, S will be 0, represented by the special Prolog atom `[]`
2. The function symbol do will be represented by the list functor
3. `do(a,S)` will be written in Prolog as `[a]` or `[a|[]]`
4. `do(a,S)` will be written in Prolog as `[a|S]`

The above situation becomes a Prolog list, read RIGHT to LEFT:

```
[put_down(block(block1)),move(location(x),location(y)),pick_up(block(block1))]
```

**通俗解释：**

**Prolog 中的情境表示约定：**

**为什么要在 Prolog 中用列表表示情境？**

- 在理论中，我们用 `do(a,s)` 来表示情境，但在实际编程中，嵌套的 `do` 函数写起来很麻烦
- Prolog 的列表是表示序列的自然方式，更简洁易读
- 我们可以建立一个约定，把理论中的 `do` 表示法转换成 Prolog 的列表表示法

**转换规则：**

1. **初始情境 S → 空列表 `[]`**

   - 初始情境（还没有任何动作）用空列表表示
   - `[]` 是 Prolog 中表示"什么都没有"的标准方式
   - 就像数字 0，是计数的起点
2. **`do` 函数 → 列表构造符**

   - 在 Prolog 中，列表的构造符（cons operator）是 `|` 或直接用 `[...]`
   - `do(a,s)` 可以写成 `[a|s]`，意思是"在列表 s 的前面加上元素 a"
3. **单个动作的情境**

   - `do(a,S)` 可以写成 `[a]` 或 `[a|[]]`
   - 两者等价：`[a]` 是 `[a|[]]` 的简写
   - 表示"只执行了一个动作 a"
4. **多个动作的情境**

   - `do(a,s)` 写成 `[a|s]`
   - 如果 s 本身也是 `do(b,S)`，那么 `do(a, do(b, S))` 就变成 `[a|[b|[]]]`，也就是 `[a,b]`

**示例转换：**

- 理论表示：`do(put_down(block(block1)),do(move(location(x),location(y)),do(pick_up(block(block1)),S)))`
- Prolog 列表：`[put_down(block(block1)),move(location(x),location(y)),pick_up(block(block1))]`

**如何理解"从右到左读"？**

- 在 `do` 嵌套表示中，最内层是最先执行的动作
- 在列表表示中，**执行顺序是从右到左**（先执行的在后/右边）
- 具体示例：
  - `do(put_down(...), do(move(...), do(pick_up(...), S)))`
  - 转换成列表：`[put_down(...), move(...), pick_up(...)]`
  - **执行顺序**（从右到左）：
    1. 最先执行：`pick_up(...)`（在列表右边）
    2. 然后执行：`move(...)`（在中间）
    3. 最后执行：`put_down(...)`（在列表左边）
  - **列表的书写顺序**：从左到右 `[put_down, move, pick_up]`
  - **列表的执行顺序**：从右到左（先执行 pick_up，再执行 move，最后执行 put_down）

**实际编程中的优势：**

- **更简洁**：`[put_down(...), move(...), pick_up(...)]` 比 `do(put_down(...), do(move(...), do(pick_up(...), S)))` 短得多
- **更易读**：列表的线性结构比嵌套的函数调用更容易理解
- **更易操作**：Prolog 提供了丰富的列表操作（如 `append`, `member` 等）
- **更符合习惯**：Prolog 程序员习惯用列表表示序列

**注意事项：**

- 这个约定只是表示方式的不同，语义是等价的
- 在写 Prolog 程序时，要始终使用列表表示法
- 但在理解理论时，要能理解 `do` 函数和列表之间的对应关系

---

## 第 12 页

**Action precondition axioms**

For each action, we need to state up front where that action is possible and where it isn't possible. "where" here means: "after which courses of action?" or alternatively we could say "in which situations?"

General form of precondition axiom:

**Poss(A(x⃗), s) ≡ Φ(x⃗, s)**

- `A(x⃗)` is an action, where `x⃗` represents all the arguments of the action
- `Φ(x⃗, s)` is a logical formula involving fluents, characterizing the state where `A(x⃗)` is possible

**通俗解释：**

**什么是动作前提条件公理（Action Precondition Axioms）？**

- 前提条件公理告诉我们"在什么情况下可以执行某个动作"
- 就像游戏规则：只有满足某些条件才能执行某个操作
- 对于每个动作，我们都需要明确说明：在哪些情境下可以执行，在哪些情境下不能执行

**"where"的含义：**

- "where"在这里不是指"物理位置"，而是指"在哪个情境下"
- 更准确地说："在执行了哪些动作序列之后，可以执行这个动作？"
- 或者："在哪个情境（动作历史）中，这个动作是可能的？"

**前提条件公理的一般形式：**

**Poss(A(x⃗), s) ≡ Φ(x⃗, s)**

- **Poss(A(x⃗), s)**：表示"在情境 s 中，动作 A(x⃗)是可能的（可以执行的）"

  - `A(x⃗)` 是一个动作，`x⃗` 表示动作的所有参数
  - 比如 `move(block(b1), block(b2), block(b3))` 中，`x⃗` 就是 `(b1, b2, b3)`
  - `s` 是当前的情境（动作历史）
- **≡**：表示"当且仅当"（if and only if），意思是"充要条件"
- **Φ(x⃗, s)**：一个逻辑公式，描述"在什么状态下动作 A(x⃗)是可能的"

  - 这个公式使用流式谓词来描述当前世界的状态
  - 比如"积木 b1 是 clear 的"、"积木 b3 是 clear 的"、"积木 b1 在 b2 上"等

**通俗理解：**

- 前提条件公理就像"使用说明书"：告诉你什么时候可以用这个动作
- 比如"移动积木"的前提条件可能是：
  - 要移动的积木上面没有其他积木（clear）
  - 目标位置是空的（clear）
  - 积木确实在源位置上（on）

**为什么需要前提条件？**

- 防止执行无效或不可能的动作
- 比如不能移动一个不存在的积木，不能把积木放到已经有积木的位置上
- 前提条件确保我们只考虑"合理"的动作序列

---

## 第 13 页

**Action Precondition axioms (cont'd)**

Example Precondition axiom (next slide)

- `move(x,y,z)` denotes an action of moving Block x from Block y to Block z
- `on(x,y,s)` means that Block x is on Position or Block y in Situation S
- `clear(x,s)` means that Block x is clear in Situation s

**通俗解释：**

**示例前提条件公理的符号说明：**

在理解具体的前提条件公理之前，我们需要先理解这些符号的含义：

1. **`move(x,y,z)` - 移动动作**

   - 表示"把积木 x 从位置 y 移动到位置 z"
   - `x`：要移动的积木（Block）
   - `y`：源位置（Source），积木现在在哪里（可以是另一个积木或位置）
   - `z`：目标位置（Destination），积木要移动到哪里（可以是另一个积木或位置）
   - 比如 `move(b1, b2, b3)` 表示"把积木 b1 从 b2 上移动到 b3 上"
2. **`on(x,y,s)` - 位置关系流式谓词**

   - 表示"在情境 s 中，积木 x 在位置 y 上面"
   - `x`：积木（Block）
   - `y`：位置（可以是另一个积木或位置）
   - `s`：情境（动作历史）
   - 比如 `on(b1, b2, s)` 表示"在情境 s 中，积木 b1 在积木 b2 上面"
3. **`clear(x,s)` - 清除状态流式谓词**

   - 表示"在情境 s 中，积木 x 是 clear 的（上面没有其他积木）"
   - `x`：积木或位置
   - `s`：情境
   - 比如 `clear(b1, s)` 表示"在情境 s 中，积木 b1 上面没有其他积木，可以移动"

**这些符号在前提条件中的作用：**

- 前提条件公理会使用这些流式谓词来描述"执行动作前世界必须是什么样子"
- 比如要执行 `move(x,y,z)`，前提条件可能包括：
  - `on(x,y,s)` - 积木 x 确实在位置 y 上
  - `clear(x,s)` - 积木 x 上面没有其他积木（可以移动）
  - `clear(z,s)` - 目标位置 z 是空的（可以放置）

**下一步：**

- 下一张幻灯片会展示具体的前提条件公理代码
- 我们会看到如何用 Prolog 代码来表达这些条件

---

## 第 14 页

**Sitcalc precondition axiom**

```prolog
% Let's add comments to this code together
poss([move(Block,From,To)|S]):-
    block_exists(Block),
    clear(Block,S),
    (location_exists(To) ; block_exists(To)),
    Block \= To,
    clear(To,S),
    (location_exists(From);block_exists(From)),
    on(Block,From,S).
```

**通俗解释：**

**Prolog 中的前提条件公理代码解析：**

这个 Prolog 代码定义了"移动积木"动作的前提条件。让我们逐行解释：

**整体结构：**

- `poss([move(Block,From,To)|S]):-` 表示"在情境 `[move(Block,From,To)|S]` 中，移动动作是可能的"
- 注意：这里使用了列表表示法，`[move(...)|S]` 表示"在情境 S 的基础上执行 move 动作"
- 前提条件写在 `:-` 后面，所有条件都必须满足（用逗号连接，表示"且"）

**逐行条件解释：**

1. **`block_exists(Block)`**

   - 含义：要移动的 Block 必须存在
   - 就像检查"这个积木真的存在吗？"
   - 防止移动不存在的积木
2. **`clear(Block,S)`**

   - 含义：在情境 S 中，要移动的积木 Block 上面必须没有其他积木
   - 这是移动积木的基本要求：如果积木上面有其他积木，就不能移动它
   - 就像"要拿一个盒子，必须先拿走它上面的东西"
3. **`(location_exists(To) ; block_exists(To))`**

   - 含义：目标位置 To 必须存在，要么是一个位置（location），要么是一个积木（block）
   - `;` 表示"或"（or）
   - 确保目标位置是有效的（不能移动到不存在的地方）
4. **`Block \= To`**

   - 含义：要移动的积木不能等于目标位置
   - `\=` 表示"不等于"
   - 防止"把积木移动到它自己上面"这种无意义的操作
5. **`clear(To,S)`**

   - 含义：在情境 S 中，目标位置 To 必须是空的（clear）
   - 如果目标位置上已经有积木，就不能再放一个积木上去
   - 就像"桌子上已经有东西了，就不能再放东西"
6. **`(location_exists(From);block_exists(From))`**

   - 含义：源位置 From 必须存在，要么是一个位置，要么是一个积木
   - 确保源位置是有效的
7. **`on(Block,From,S)`**

   - 含义：在情境 S 中，积木 Block 确实在源位置 From 上
   - 这是最重要的条件：要移动积木，它必须确实在源位置上
   - 就像"要移动一个盒子，它必须确实在那里"

**整体逻辑：**

- 所有这些条件必须**同时满足**（用逗号连接），移动动作才是可能的
- 如果任何一个条件不满足，动作就不能执行
- 这确保了只有"合理"的移动动作才会被考虑

**实际应用：**

- 当规划系统想要执行 `move(b1, b2, b3)` 时，会检查这些前提条件
- 如果所有条件都满足，动作可以执行；否则，需要先执行其他动作来满足条件

---

## 第 15 页

**Action Precondition axioms observations**

With situations, we observed that it is convenient to use Prolog's list notation:

- The empty list `[]` can represent the initial situation S
- List notation `[A|S]` can represent the situation `do(a,s)`

We make a similar observation that the `Poss(a,s)` predicate (two arguments):

```prolog
poss(move(BlockA,BlockB),S) :-  % two arguments for poss
    clear(BlockA,S),
    on(BlockA,BlockB,S),
    clear(BlockC,S).
```

could be equivalently written using Prolog list notation (one argument) as:

```prolog
poss([move(BlockA,BlockB)|S]) :-  % one argument for poss
    clear(BlockA,S),
    on(BlockA,BlockB,S),
    clear(BlockC,S).
```

Whether to use `poss/2` or `poss/1` is arbitrary, but we must be consistent!

**通俗解释：**

**前提条件公理的两种表示方式：**

**回顾：情境的列表表示法**

- 我们已经知道，情境可以用 Prolog 列表表示：
  - 空列表 `[]` 表示初始情境 S
  - `[A|S]` 表示在情境 S 的基础上执行动作 A 后的新情境

**前提条件公理的两种写法：**

**方式 1：两个参数 `poss/2`**

```prolog
poss(move(BlockA,BlockB), S) :- ...
```

- 第一个参数：动作本身 `move(BlockA,BlockB)`
- 第二个参数：情境 `S`
- 含义：在情境 S 中，动作 move(BlockA,BlockB)是可能的

**方式 2：一个参数 `poss/1`（使用列表表示法）**

```prolog
poss([move(BlockA,BlockB)|S]) :- ...
```

- 只有一个参数：`[move(BlockA,BlockB)|S]`，这是一个列表，表示"在情境 S 的基础上执行 move 动作"
- 含义：在情境 `[move(BlockA,BlockB)|S]` 中，这个动作是可能的
- 注意：这里动作已经"嵌入"到情境中了

**两种方式的等价性：**

- 两种写法在逻辑上是等价的
- `poss(a, s)` 和 `poss([a|s])` 表达的是同一个意思
- 只是表示方式不同：一种是分离的（动作和情境分开），一种是组合的（动作在情境中）

**为什么有两种方式？**

- **`poss/2`**：更直观，明确区分"动作"和"情境"
- **`poss/1`**：更简洁，符合 Prolog 列表的习惯用法，与情境的表示方式一致

**重要原则：一致性！**

- 无论选择哪种方式，在整个程序中必须保持一致
- 不能混用：如果选择了 `poss/1`，所有地方都用 `poss/1`；如果选择了 `poss/2`，所有地方都用 `poss/2`
- 混用会导致程序逻辑错误

**实际建议：**

- 在课程中，通常使用 `poss/1`（列表表示法），因为：
  - 与情境的列表表示法一致
  - 代码更简洁
  - 更符合 Prolog 的编程习惯

**示例对比：**

- `poss/2`：`poss(move(b1,b2,b3), [])` - "在初始情境中，移动动作是可能的"
- `poss/1`：`poss([move(b1,b2,b3)])` - "在只执行了 move 动作的情境中，这个动作是可能的"
- 注意：这两种写法在语义上略有不同，但在实际使用中，我们通常用 `poss/1` 来检查"执行这个动作是否可能"

---

## 第 16 页

**Successor State Axioms**

For each fluent, we need to state up front the conditions under which it becomes true, false, or remains unchanged.

The form of a successor state axiom is:

**Poss(A(x⃗), s) ⊃ R(y⃗, do(A(x⃗), s)) ≡ γ(y⃗, A(x⃗), s) ∨ R(y⃗, s) ∧ ¬γ(y⃗, A(x⃗), s)**

where:

- `γ(y⃗, A(x⃗), s)` represents the conditions under which `R(y⃗, do(A(x⃗), s))` is true
- `γ(y⃗, A(x⃗), s)` represent the conditions under which `R(y⃗, do(A(x⃗), s))` is false

**通俗解释：**

**什么是后继状态公理（Successor State Axioms）？**

- 后继状态公理描述"执行动作后，世界状态如何变化"
- 对于每个流式谓词，我们需要说明：在什么条件下它会变成真、变成假，或者保持不变
- 这是动作的"效果"描述：告诉我们"做了这个动作后会发生什么"

**为什么需要后继状态公理？**

- 前提条件公理告诉我们"什么时候可以做动作"
- 后继状态公理告诉我们"做了动作后会发生什么"
- 两者配合，才能完整描述一个动作：既能判断能否执行，又能预测执行后的结果

**后继状态公理的一般形式：**

**Poss(A(x⃗), s) ⊃ R(y⃗, do(A(x⃗), s)) ≡ γ(y⃗, A(x⃗), s) ∨ R(y⃗, s) ∧ ¬γ(y⃗, A(x⃗), s)**

让我们分解这个公式：

- **Poss(A(x⃗), s) ⊃**：如果动作 A 在情境 s 中是可能的（前提条件满足）
- **R(y⃗, do(A(x⃗), s))**：流式谓词 R 在执行动作 A 后的新情境中
- **≡**：当且仅当（充要条件）
- **γ(y⃗, A(x⃗), s)**：动作 A 使 R 变成真的条件
- **∨**：或者（or）
- **R(y⃗, s) ∧ ¬γ(y⃗, A(x⃗), s)**：R 在情境 s 中已经是真的，并且动作 A 不会使 R 变成假

**通俗理解：**

- 流式谓词 R 在执行动作 A 后变成真，当且仅当：
  - **情况 1**：动作 A 本身使 R 变成真（γ 条件满足）
  - **情况 2**：R 在动作前就已经是真，并且动作 A 不会使 R 变成假

**符号说明：**

- `γ(y⃗, A(x⃗), s)`：使 R 变成真的条件（positive effect）
- `γ(y⃗, A(x⃗), s)`：使 R 变成假的条件（negative effect，注意这里可能是印刷错误，应该是不同的符号）
- `R(y⃗, s)`：R 在动作前的状态

**实际意义：**

- 这个公式确保我们能够准确预测：执行动作后，每个流式谓词会变成什么状态
- 它考虑了三种情况：变成真、变成假、保持不变
- 这是推理和规划的基础：我们需要知道"如果执行这个动作，世界会变成什么样子"

---

## 第 17 页

**Successor State Axioms (cont'd)**

In English, we would read the Successor State Axiom as:

If Action A is possible in s, then 

    R is true after performing A in s if and only if the conditions are such that A makes R become true,

    or

    R was already true, and conditions are such that A does not make R false.

**通俗解释：**

**后继状态公理的英文解读：**

让我们用更通俗的语言来理解这个公理：

**完整表述：**
"如果动作 A 在情境 s 中是可能的，那么流式谓词 R 在执行 A 后的新情境中为真，当且仅当：要么动作 A 使 R 变成真，要么 R 在动作前就已经是真，并且动作 A 不会使 R 变成假。"

**分步理解：**

1. **前提条件**："如果动作 A 在情境 s 中是可能的"

   - 这意味着动作的前提条件都满足了
   - 只有能执行的动作，我们才关心它的效果
2. **结论**："R 在执行 A 后为真，当且仅当..."
3. **三种情况（满足其一即可）：**

   **情况 1：动作 A 使 R 变成真**

   - 动作 A 的"正面效果"（positive effect）
   - 比如：执行"移动积木 b1 到 b2 上"后，`on(b1, b2, s)` 变成真
   - 这是动作的"直接效果"

   **情况 2：R 在动作前就已经是真，并且动作 A 不会使 R 变成假**

   - 这是"保持效果"（persistence）
   - R 在动作前是真，动作 A 不会改变它，所以动作后还是真
   - 比如：`on(b1, b2, s)` 在动作前是真，执行"移动积木 b3"后，`on(b1, b2, s)` 仍然为真（因为移动 b3 不影响 b1 和 b2 的关系）

**关键点：**

- **"当且仅当"**：这意味着这是充要条件，没有其他情况
- **"或"**：两种情况满足其一即可
- **"并且"**：在情况 2 中，两个条件必须同时满足（R 已经是真，且 A 不会使 R 变假）

**实际例子：**

假设我们有一个流式谓词 `on(b1, b2, s)`（积木 b1 在 b2 上）：

- **执行 `move(b1, b2, b3)` 后**：

  - 情况 1：这个动作使 `on(b1, b3, s)` 变成真（b1 现在在 b3 上）
  - 情况 2 不适用，因为 `on(b1, b2, s)` 在动作后会变成假（b1 不在 b2 上了）
- **执行 `move(b3, b4, b5)` 后**（移动其他积木）：

  - 情况 1 不适用：这个动作不会使 `on(b1, b2, s)` 变成真
  - 情况 2：如果 `on(b1, b2, s)` 在动作前是真，并且这个动作不会使 `on(b1, b2, s)` 变成假，那么动作后 `on(b1, b2, s)` 仍然为真

**为什么这样设计？**

- 这个设计遵循"框架问题"（Frame Problem）的解决方案
- 它明确说明了什么会改变，什么不会改变
- 避免了需要列出所有"不会改变"的东西（那会非常多）

---

## 第 18 页

**Successor State Axioms**

Successor State Axiom for `on(X,Y,S)`:

**Poss(A(x⃗), s) ⊃ on(BlockA, BlockC, do(A(x⃗), s)) ≡ A(x⃗) = move(BlockA, BlockB, BlockC) ∨ on(BlockA, BlockC, s) ∧ ¬(A(x⃗) = move(BlockA, BlockC, Someblock))**

where:

- `γ(y⃗, A(x⃗), s)` represents the conditions under which `R(y⃗, do(A(x⃗), s))` is true
  - `A(x⃗) = move(BlockA, BlockB, BlockC)`
- `γ(y⃗, A(x⃗), s)` represent the conditions under which `R(y⃗, do(A(x⃗), s))` is false
  - `A(x⃗) = move(BlockA, BlockC, Someblock)`

**通俗解释：**

**`on(X,Y,S)` 流式谓词的后继状态公理：**

这个公理专门描述"积木 X 在位置 Y 上"这个流式谓词在执行动作后如何变化。

**公理公式解读：**

**Poss(A(x⃗), s) ⊃ on(BlockA, BlockC, do(A(x⃗), s)) ≡ A(x⃗) = move(BlockA, BlockB, BlockC) ∨ on(BlockA, BlockC, s) ∧ ¬(A(x⃗) = move(BlockA, BlockC, Someblock))**

让我们分解这个公式：

- **左边**：`on(BlockA, BlockC, do(A(x⃗), s))` - 在执行动作 A 后，积木 BlockA 在位置 BlockC 上
- **右边**：两种情况（满足其一即可）

**情况 1：`A(x⃗) = move(BlockA, BlockB, BlockC)`**

- 含义：执行的动作就是把 BlockA 从 BlockB 移动到 BlockC
- 这是使 `on(BlockA, BlockC, s)` 变成真的条件
- 比如：执行 `move(b1, b2, b3)` 后，`on(b1, b3, s)` 变成真

**情况 2：`on(BlockA, BlockC, s) ∧ ¬(A(x⃗) = move(BlockA, BlockC, Someblock))`**

- 含义：BlockA 在动作前就已经在 BlockC 上，并且执行的动作不是把 BlockA 从 BlockC 移走
- 这是"保持"条件：如果 BlockA 已经在 BlockC 上，并且动作不会把它移走，那么动作后它仍然在 BlockC 上
- 比如：`on(b1, b2, s)` 在动作前是真，执行 `move(b3, b4, b5)` 后，`on(b1, b2, s)` 仍然为真（因为移动 b3 不影响 b1 和 b2）

**符号说明：**

- **γ（使 R 变成真的条件）**：`A(x⃗) = move(BlockA, BlockB, BlockC)`

  - 当执行的动作是"把 BlockA 移动到 BlockC"时，`on(BlockA, BlockC, s)` 变成真
- **γ（使 R 变成假的条件）**：`A(x⃗) = move(BlockA, BlockC, Someblock)`

  - 当执行的动作是"把 BlockA 从 BlockC 移走"时，`on(BlockA, BlockC, s)` 变成假
  - `Someblock` 表示"某个位置"（可以是任何位置，只要不是 BlockC）

**实际例子：**

假设我们想知道执行动作后 `on(b1, b2, s)` 的状态：

1. **执行 `move(b1, table, b2)` 后**：

   - 情况 1 满足：这个动作使 `on(b1, b2, s)` 变成真
   - 结果：`on(b1, b2, s)` 为真
2. **执行 `move(b1, b2, b3)` 后**：

   - 情况 1 不满足：这个动作不是把 b1 移动到 b2
   - 情况 2：如果 `on(b1, b2, s)` 在动作前是真，但这个动作会把 b1 从 b2 移走，所以情况 2 不满足
   - 结果：`on(b1, b2, s)` 变成假
3. **执行 `move(b3, b4, b5)` 后**（移动其他积木）：

   - 情况 1 不满足：这个动作不影响 b1 和 b2
   - 情况 2：如果 `on(b1, b2, s)` 在动作前是真，并且这个动作不会把 b1 从 b2 移走，所以情况 2 满足
   - 结果：`on(b1, b2, s)` 仍然为真

**为什么这样设计？**

- 这个公理明确说明了：什么动作会使 `on` 变成真，什么动作会使 `on` 变成假
- 其他动作不会影响 `on` 的状态（保持原样）
- 这避免了需要列出所有"不会改变 on 状态"的动作

---

## 第 19 页

**SitCalc successor state axioms (Prolog Syntax)**

```prolog
% Let's add comments to this code together
clear(X,[move(_,X,_)|S]):-
    poss([move(_,X,_)|S]).

clear(X,[A|S]):-
    poss([A|S]),
    A \= move(_,_,X),
    clear(X,S).

on(X,Y,[move(X,Z,Y)|S]):-
    poss([move(X,Z,Y)|S]).

on(X,Y,[A|S]):-
    poss([A|S]),
    A \= move(X,Y,_),
    on(X,Y,S).
```

**通俗解释：**

**Prolog 中的后继状态公理代码解析：**

这个代码实现了两个流式谓词的后继状态公理：`clear` 和 `on`。让我们逐个解释：

**1. `clear(X,S)` 的后继状态公理：**

**第一条规则：**

```prolog
clear(X,[move(_,X,_)|S]):-
    poss([move(_,X,_)|S]).
```

- 含义：如果执行的动作是把某个积木移动到 X 上（`move(_,X,_)`），并且这个动作是可能的，那么 X 变成 clear
- `_` 是 Prolog 的通配符，表示"任何值"
- `move(_,X,_)` 表示"把某个积木移动到 X 上"（源位置和目标积木可以是任何值）
- 这看起来有点反直觉，但实际上：当有积木被移动到 X 上时，X 就不再是 clear 了
- **注意**：这个规则实际上描述的是"什么情况下 X 不是 clear"，但这里可能是代码逻辑的问题

**第二条规则（更可能是正确的）：**

```prolog
clear(X,[A|S]):-
    poss([A|S]),
    A \= move(_,_,X),
    clear(X,S).
```

- 含义：如果执行的动作不是把积木放到 X 上（`A \= move(_,_,X)`），并且 X 在动作前是 clear 的，那么 X 在动作后仍然是 clear
- 这是"保持"规则：如果动作不会使 X 变成不 clear，并且 X 之前是 clear 的，那么 X 保持 clear

**2. `on(X,Y,S)` 的后继状态公理：**

**第一条规则：**

```prolog
on(X,Y,[move(X,Z,Y)|S]):-
    poss([move(X,Z,Y)|S]).
```

- 含义：如果执行的动作是把 X 从某个位置 Z 移动到 Y（`move(X,Z,Y)`），并且这个动作是可能的，那么 X 在 Y 上
- 这是"变成真"的规则：执行移动动作后，X 确实在 Y 上

**第二条规则：**

```prolog
on(X,Y,[A|S]):-
    poss([A|S]),
    A \= move(X,Y,_),
    on(X,Y,S).
```

- 含义：如果执行的动作不是把 X 从 Y 移走（`A \= move(X,Y,_)`），并且 X 在动作前就在 Y 上，那么 X 在动作后仍然在 Y 上
- 这是"保持"规则：如果动作不会破坏 X 在 Y 上的关系，并且 X 之前就在 Y 上，那么 X 保持 in Y 上

**整体逻辑：**

对于每个流式谓词，都有两条规则：

1. **第一条规则**：描述"什么动作会使这个谓词变成真"
2. **第二条规则**：描述"什么情况下这个谓词会保持原样"

**Prolog 的执行顺序：**

- Prolog 会从上到下尝试匹配规则
- 如果第一条规则匹配成功，就使用第一条；否则尝试第二条
- 这实现了"或"的逻辑：要么变成真，要么保持原样

**实际应用：**

- 当我们需要查询"在情境 `[move(b1,b2,b3)|S]` 中，`on(b1,b3,S)` 是否为真"时：

  - 第一条规则匹配：`move(b1,b2,b3)` 确实是把 b1 移动到 b3
  - 如果 `poss([move(b1,b2,b3)|S])` 为真，那么 `on(b1,b3,S)` 为真
- 当我们需要查询"在情境 `[move(b3,b4,b5)|S]` 中，`on(b1,b2,S)` 是否为真"时：

  - 第一条规则不匹配：这个动作不是把 b1 移动到 b2
  - 第二条规则匹配：这个动作不是把 b1 从 b2 移走，如果 `on(b1,b2,S)` 在 S 中为真，那么在新情境中仍然为真

---

## 第 20 页

**Axiomatizing a Domain**

- **Axiomatizing a Domain** means that an axiomatizer (you?) writes down statements that define what is true about a domain.
- **What is a Domain?**
  A Domain is a specific area or field of knowledge, expertise, or subject matter that an AI system or knowledge base is designed to understand and reason about
- **Examples of domains:**

  - Taxi domain: taxis pick up passengers and drop them off at destinations
  - Kitchen domain: a robot makes dinner in a kitchen
  - Cardiology domain: a doctor sees heart patients, interviews them, conducts tests, and diagnoses them

**通俗解释：**

**什么是领域公理化（Axiomatizing a Domain）？**

- **公理化**：用逻辑公式（公理）来描述一个领域
- **公理化者（Axiomatizer）**：就是你！你需要写出定义领域的所有公理
- 就像写一本"规则手册"，告诉计算机这个领域里有什么、可以做什么、做了之后会发生什么

**什么是领域（Domain）？**

- **领域**：一个特定的知识领域、专业领域或主题领域
- 是 AI 系统或知识库设计用来理解和推理的特定范围
- 就像"积木世界"、"出租车世界"、"厨房世界"等

**领域的特点：**

- **有边界**：只关注这个领域内的事情，不关心领域外的事情
- **有规则**：领域内的对象、动作、状态都有特定的规则
- **可推理**：通过公理，我们可以推理出领域内的新知识

**领域示例：**

1. **出租车领域（Taxi Domain）**

   - 对象：出租车、乘客、目的地
   - 动作：接乘客、送乘客到目的地
   - 状态：出租车在哪里、乘客在哪里、是否在车上
   - 规则：只有出租车在乘客位置时才能接乘客，只有乘客在车上时才能送到目的地
2. **厨房领域（Kitchen Domain）**

   - 对象：机器人、食材、厨具、菜品
   - 动作：拿食材、切菜、烹饪、装盘
   - 状态：食材在哪里、是否已切、是否已烹饪
   - 规则：只有拿到食材才能切，只有切好才能烹饪
3. **心脏病学领域（Cardiology Domain）**

   - 对象：医生、病人、症状、检查、诊断
   - 动作：看病人、询问症状、做检查、诊断
   - 状态：病人的症状、检查结果、诊断结果
   - 规则：只有做了检查才能诊断，某些症状组合可能表示特定疾病

**为什么需要公理化？**

- **让计算机理解**：通过公理，计算机可以理解领域内的规则和关系
- **支持推理**：有了公理，计算机可以推导出新的事实
- **支持规划**：有了公理，计算机可以规划如何达到目标状态

**公理化的挑战：**

- **完整性**：需要涵盖领域内所有重要的规则和关系
- **准确性**：公理必须准确反映领域的真实情况
- **简洁性**：既要完整，又要避免冗余

**实际应用：**

- 在课程中，我们主要关注"积木世界"这个领域
- 我们需要写出：
  - 积木、位置等对象
  - 移动、拿起、放下等动作
  - 位置关系、清除状态等流式谓词
  - 前提条件公理和后继状态公理

---

## 第 21 页

**Steps to Axiomatize a Domain**

In the following steps, the word "determine" implies "write down"

1. Understand the domain by reading about it, studying it, and thinking about it
2. Determine the set of fluents that are sufficient to represent a state in the domain
3. Determine the set of actions that effect (bring about) change in the state (fluent truth values)
4. Determine the precondition axioms for actions in terms of fluents
5. Determine the successor state axiom for each fluent
6. Determine the fluent values in the initial situation s0 (we use `[]` for s0).

**通俗解释：**

**领域公理化的步骤：**

这是一个系统化的过程，帮助你完整地描述一个领域。注意："determine"在这里的意思是"确定并写下来"。

**步骤 1：理解领域**

- **做什么**：通过阅读、学习和思考，深入理解这个领域
- **为什么重要**：只有真正理解领域，才能准确描述它
- **怎么做**：
  - 阅读相关文档、资料
  - 观察实际场景（如果有）
  - 思考领域内的对象、关系、规则
  - 与领域专家交流（如果有）

**步骤 2：确定流式谓词集合**

- **做什么**：确定一组流式谓词，这些谓词足以表示领域内的任何状态
- **为什么重要**：流式谓词是描述世界状态的"语言"，必须足够表达所有重要信息
- **怎么做**：
  - 思考"什么信息需要被跟踪？"
  - 比如积木世界：需要知道"哪个积木在哪个位置"（`on`）、"哪个积木是 clear 的"（`clear`）
  - 确保这些谓词能够完整描述领域状态，不多不少

**步骤 3：确定动作集合**

- **做什么**：确定所有能够改变状态（流式谓词的真假值）的动作
- **为什么重要**：动作是改变世界的唯一方式，必须列出所有可能的动作
- **怎么做**：
  - 思考"可以执行哪些操作？"
  - 比如积木世界：移动积木（`move`）、拿起积木（`pick_up`）、放下积木（`put_down`）
  - 确保涵盖所有重要的动作

**步骤 4：确定动作的前提条件公理**

- **做什么**：为每个动作写出前提条件公理，用流式谓词来描述"什么时候可以执行这个动作"
- **为什么重要**：前提条件确保只有"合理"的动作才会被执行
- **怎么做**：
  - 对每个动作，思考"执行这个动作需要满足什么条件？"
  - 用流式谓词来表达这些条件
  - 比如：移动积木的前提是积木是 clear 的、目标位置是 clear 的等

**步骤 5：确定每个流式谓词的后继状态公理**

- **做什么**：为每个流式谓词写出后继状态公理，描述"执行动作后，这个谓词如何变化"
- **为什么重要**：后继状态公理让我们能够预测动作的效果
- **怎么做**：
  - 对每个流式谓词，思考"什么动作会使它变成真？什么动作会使它变成假？"
  - 写出完整的后继状态公理公式
  - 比如：`on(X,Y,S)` 在 `move(X,Z,Y)` 后变成真，在 `move(X,Y,W)` 后变成假

**步骤 6：确定初始状态**

- **做什么**：确定初始情境 s0（我们用 `[]` 表示）中所有流式谓词的值
- **为什么重要**：初始状态是推理的起点，必须明确定义
- **怎么做**：
  - 列出初始情境中所有流式谓词的真假值
  - 比如：`on(b1, table, [])` 为真，`on(b1, b2, [])` 为假等
  - 确保初始状态是完整和一致的

**整体流程：**

1. 理解 → 2. 确定状态描述（流式谓词）→ 3. 确定改变方式（动作）→ 4. 确定执行条件（前提条件）→ 5. 确定变化规律（后继状态）→ 6. 确定起始点（初始状态）

**实际建议：**

- **迭代过程**：这些步骤不是一次完成的，可能需要多次迭代和修改
- **从简单开始**：先处理核心的对象和动作，再逐步扩展
- **验证**：写完公理后，用一些例子来验证是否正确
- **文档化**：记录你的决策和理由，方便后续修改

**完成后的检查清单：**

- [ ] 所有重要的状态信息都能用流式谓词表达
- [ ] 所有重要的动作都已列出
- [ ] 每个动作都有前提条件公理
- [ ] 每个流式谓词都有后继状态公理
- [ ] 初始状态已完整定义
- [ ] 公理之间没有矛盾

---

## 第 22 页

**Time to check your learning!**

Let's see how many key concepts from Situation Calculus you recall by answering the following questions!

1. In plain English, what is being specified when Precondition Axioms are written down for a domain?
2. In plain English, what is being specified when Successor State Axioms are written down for a domain?
3. What is meant by "domain" in the above two questions?

**通俗解释：**

**学习检查：**

这是对情境演算核心概念的回顾和检查。让我们用通俗的语言来理解这些问题：

**问题 1：前提条件公理指定了什么？**

- **答案要点**：前提条件公理指定了"在什么情况下可以执行某个动作"
- **通俗理解**：就像游戏规则，告诉你"什么时候可以做这个操作"
- **具体内容**：用流式谓词来描述执行动作前世界必须是什么样子
- **例子**：移动积木的前提是积木是 clear 的、目标位置是 clear 的、积木确实在源位置上

**问题 2：后继状态公理指定了什么？**

- **答案要点**：后继状态公理指定了"执行动作后，世界状态如何变化"
- **通俗理解**：描述动作的"效果"，告诉你"做了这个动作后会发生什么"
- **具体内容**：对于每个流式谓词，说明什么动作会使它变成真、变成假，或者保持不变
- **例子**：执行 `move(b1, b2, b3)` 后，`on(b1, b3, s)` 变成真，`on(b1, b2, s)` 变成假

**问题 3：什么是"领域"？**

- **答案要点**：领域是一个特定的知识领域、专业领域或主题领域
- **通俗理解**：就是我们关注的那个"小世界"，比如"积木世界"、"出租车世界"等
- **特点**：
  - 有边界：只关注领域内的事情
  - 有规则：领域内的对象、动作、状态都有特定规则
  - 可推理：通过公理可以推理出新知识
- **例子**：积木世界、厨房世界、心脏病学领域等

**如何回答这些问题？**

- 用你自己的话，用简单的英语（或中文）解释
- 不需要使用复杂的逻辑符号
- 可以举例子来说明
- 重点是要展示你理解了核心概念

**复习要点：**

- **前提条件公理** = "什么时候可以做"
- **后继状态公理** = "做了之后会发生什么"
- **领域** = "我们关注的那个小世界"

---
