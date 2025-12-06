# Coffee-Making Planner – Demonstration (≈1 minute)

In this Prolog (**[ˈproʊlɒɡ] 普罗格语言**) program, I model a robot that makes a cup of instant coffee using situation calculus (**[ˌsɪtʃuˈeɪʃn ˈkælkjələs] 情景演算**). Let me explain how the program works from top to bottom.

## 1. Defining the world state (fluents)

First, I define **fluents** (**[ˈfluːənts] 流述谓词/状态谓词**) — predicates (**[ˈpredɪkəts] 谓词**) that describe the state of the world:

- `cupboard_open(S)` — whether the **cupboard** (**[ˈkʌbərd] 橱柜**) is open
- `cup_location(Location, S)` — where the **cup** is: `cupboard`, `in_hand`, or `counter` (**[ˈkaʊntər] 台面**)
- `kettle_filled(S)` — whether the **kettle** is filled and plugged in (**[plʌɡd ɪn] 接通电源/插上电**)
- `water_boiled(S)` — whether the **water** is boiled
- `cup_has_water(S)`, `cup_has_coffee(S)`, `coffee_stirred(S)` — whether the cup has water, coffee, and has been stirred (**[stɜːrd] 搅拌/搅匀**)

Here, `S` represents a **situation** (**[ˌsɪtʃuˈeɪʃn] 情景/状态序列**), i.e., a history (list) of actions.

## 2. Defining actions

I define a set of **actions** (**[ˈækʃnz] 动作**):

`open_cupboard`, `take_cup`, `place_cup_on_counter`,
`fill_kettle`, `plug_kettle`, `wait_for_boil`,
`pour_water`, `add_coffee`, `stir_coffee`.

## 3. Precondition axioms (when actions are allowed)

For each action, I write a **precondition axiom** (**[ˌpriːkənˈdɪʃn ˈæksiəm] 前提公理**) `poss([Action | S])` that acts like a **guard** (**[ɡɑːrdz] 守卫/约束**) — it checks "can I do this action now?" before allowing it. For example, you can't pour water if the kettle isn't boiled yet. These guards control which **action sequences** (**[ˈsiːkwənsɪz] 动作序列**) are valid.

## 4. Successor state axioms (how the world changes)

For each fluent, I write a **successor state axiom** (**[səkˈsesər steɪt ˈæksiəm] 后继状态公理**) that describes **how** the fluent changes (or stays the same) after each action. These work like a **recursive** (**[rɪˈkɜːrsɪv] 递归的**) story: to know if the cup has water _now_, Prolog looks at the _last_ action in the list. If it was `pour_water`, then yes! If not, it checks the action _before_ that, and so on, going backwards through the list（从最新的动作回溯到最旧的动作，就像倒带视频看发生了什么）. This is **pattern matching** (**[ˈpætərn ˈmætʃɪŋ] 模式匹配**) — Prolog matches the pattern of actions to figure out the current state.

## 5. Defining the goal

The goal "coffee is ready" is encoded as:

```prolog
coffee_ready(S) :-
    coffee_stirred(S),
    cup_has_water(S),
    cup_has_coffee(S).
```

This means: in situation `S`, the coffee has been stirred, and the cup has both water and coffee.

## 6. The planning predicate (how Prolog searches)

The planning (**[ˈplænɪŋ] 规划**) predicate works like an automatic search:

```prolog
plan(Goal, S) :-
    bposs(S),
    call(Goal).
```

The Prolog interpreter gives these logical axioms (**[ˈæksiəmz] 公理**) a **procedural interpretation** (**[prəˈsiːdʒərəl ˌɪntərprəˈteɪʃn] 过程式解释**). Instead of just describing what _should_ be true, Prolog actually _runs_ these rules like a program.

Here's what happens: `bposs/1` generates action sequences in **breadth‑first order** (**[ˌbreθtˈfɜːrst ˈɔːrdər] 广度优先顺序**) — trying shorter plans first, then longer ones. Prolog uses **backtracking** (**[ˈbæktrækɪŋ] 回溯**) to systematically try different combinations: if one plan doesn't work (maybe it violates a precondition), Prolog "undoes" that choice and tries another path. It keeps exploring until it finds a situation `S` where the **goal condition** (**[ɡoʊl kənˈdɪʃn] 目标条件**) is satisfied.

## 7. Running the query

To demonstrate the planner, I run the query (**[ˈkwɪri] 查询**):

```prolog
?- plan(coffee_ready(S), S).
```

Prolog searches over possible action sequences and eventually returns a **shortest valid plan** (**[ˈʃɔːrtɪst ˈvælɪd plæn] 最短有效规划**), for example:

```prolog
S = [stir_coffee,
     pour_water,
     wait_for_boil,
     plug_kettle,
     fill_kettle,
     add_coffee,
     place_cup_on_counter,
     take_cup,
     open_cupboard].
```

Reading this list from **right to left** shows the robot's steps from the **initial state** (**[ɪˈnɪʃl steɪt] 初始状态**) to the **goal state** (**[ɡoʊl steɪt] 目标状态**). This matches the required coffee‑making process and demonstrates that the **planning system** (**[ˈplænɪŋ ˈsɪstəm] 规划系统**) correctly solves the coffee world problem.

## 4. How this helps me understand

- **From “states” to “action sequences”**:
  By using fluents, I can first describe what the world looks like (the state), and then use a situation (a list of actions) to describe how the world changes step by step. This makes it easier to connect logical formulas to an intuitive story of the robot making coffee.

- **From axioms to a program (logic = constraints + state updates)**:
  The precondition axioms tell me when an action is allowed, and the successor state axioms tell me how the world changes after each action. Writing these rules in Prolog turns abstract logical knowledge into an executable planning program.

- **Recursion and backtracking as an “automatic plan search engine”**:
  “Recursively over the list of actions” plus backtracking means Prolog automatically tries different action sequences, checks from the end of the list back to the start whether the goal holds, and backtracks when something fails, until it finds a shortest valid plan.

- **The coffee world as a small reusable template**:
  Once I understand the pattern “fluents + actions + poss + successor state axioms + plan/2”, I can reuse it for other planning problems (like moving blocks, navigation, or simple robot tasks). This coffee example is therefore a concrete template that helps me learn situation calculus and Prolog planning.
