# CST8503 12 Natural Language
_从 PDF 文档转换生成_

---
_注: 共提取了 1 张图片_

## 第 1 页

![图片](./CST8503_12_Natural_Language_images/page_001_img_01.png)

Natural Language with Prolog

---

## 第 2 页

### Agenda
- Summarize Situation Calculus/planning
- Discuss Assignment 3
- Discuss Lab 6
- Lesson: Natural Language with Prolog

---

## 第 3 页

Summary of Chatbot operation
### User enters a list of words
### List of words is parsed to achieve the logical form based on semantics
### Logical form is converted to Clausal Form
### Clausal Form is asserted to prolog database (assertions) or issued as a query
(questions)

---

## 第 4 页

talk predicate

```prolog
talk(Sentence, Reply) :-
% parse the sentence
parse(Sentence, LF, Type),
% convert the FOL logical form into a Horn
% clause, if possible
clausify(LF, Clause, FreeVars), !,
% concoct a reply, based on the clause and
% whether sentence was a query or assertion
reply(Type, FreeVars, Clause, Reply).
```

---

## 第 5 页

Intermediate steps
If we want to see the intermediate steps of the talk predicate, we
can use a query like this (an assertion):
LF = exists(man1, @man(man1)&exists(particle1, @particle(particle1)& @observe(man1, particle1))),
Type = assertion,
Clause = (man(man1), particle(particle1), observe(man1, particle1)),
Freevars = [],
Reply = asserted((man(man1), particle(particle1), observe(man1, particle1))) .

```prolog
?- parse([a, man, observed, a, particle],LF,Type),clausify(LF,Clause,Freevars),reply(Type, FreeVars, Clause, Reply).
```

---

## 第 6 页

Intermediate steps (cont'd)
Or like this (question):
LF = @observe(_A, particle1)=> @answer(_A),
Type = query,
Freevars = [],
Reply = answer([man1]) .

```prolog
?- parse([who,observed,particle1],LF,Type),clausify(LF,Clause,Freevars),reply(Type, FreeVars, Clause, Reply).
Clause = (answer(_A):-observe(_A, particle1)),
```

---

## 第 7 页

### Clausify
The clausify predicate translates logical form into the equivalent clausal form.
Recall that prolog can deal with only Horn clauses.
Example of statement that cannot be converted to a Horn clause:
Canada is a country or the sky is blue
Logical form: country(canada) or blue(sky)
We cannot say this in prolog because it is not a horn clause.

```prolog
Clausal form (prolog syntax): country(canada);blue(sky).
```

---

## 第 8 页

Clausal Normal Form (clausify)
Situation Calculus formulae can be converted to clausal form:
### Eliminate implications
### Move negation inwards
### Standardize variables apart
### Skolemize existentials
### Move universal quantifiers outwards
### Distribute "and" ∧ over "or" ∨

---

## 第 9 页

CNF Step 4: Skolemize
Replace existentially quantified variables with skolem functions
Each universally quantified variable whose scope includes the existential becomes
a parameter of the skolem function
The idea is that if we know something exists, we can give it a name (any name
that works for us is fine)
∀𝑥∃𝑦𝑃 𝑥, 𝑦 becomes ∀𝑥𝑃 𝑥, 𝑎(𝑥) where new name a depends on x
∃𝑦∀𝑥𝑃 𝑥, 𝑦 becomes ∀𝑥𝑃 𝑥, 𝑎 new name a doesn't depend on x
### Examples:
∀𝑥∃𝑦 𝑚𝑜𝑡ℎ𝑒𝑟 𝑥, 𝑦 becomes ∀𝑥 𝑚𝑜𝑡ℎ𝑒𝑟 𝑥, 𝑚𝑜𝑚(𝑥)
∃𝑥 𝑚𝑜𝑜𝑛 𝑥 becomes moon(the_moon)

---

## 第 10 页

Prolog code
% asserts that F is clausal form of exists(X,F0)
clausify(exists(X,F0),F,V) :- % something like exists(X,man(X)& _)
F0 = @G&_, % G is something like man(X)
skolem(G,X),

```prolog
clausify(F0,F,V). % F0 is now @man(man2)&_ and yellow part gone
skolem(G,X):-
functor(G,Name,1), % functor(man(X),man,1), see functor/3 doc
gensym(Name,X), % X becomes manN for some integer N
assert(pn(X,X)). % assert(pn(man2,man2)) when N is 2
```

---

