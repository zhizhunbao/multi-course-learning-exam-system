# Quiz 2 - In-Class

**Test Version:** 073
**Course:** CST 8503 - Fall 2025
**Weight:** 3%
**Time:** 1 Minute Per Question
**Type:** In-Class Quiz

## Question 1 (1 point)

What would be the variable bindings associated with the following Prolog query? `[H|T] = [[a]].`

**Options:**

- **a.** H = [a], T = [a]
- **b.** H = [], T = [a]
- **c.** H = [a], T = [] ✓
- **d.** H = a, T = []
- **e.** No bindings because it would be false

---

## Question 2 (1 point)

Given the builtin predicate `member(X, Y)` which means element X is a member of the list Y, which of the following queries would generate an error when issued to the SWI Prolog interpreter?

**Options:**

- **a.** `member([c,a,d],[]).` ✓
- **b.** `Member(a,[c,a,d]).`
- **c.** `member([],[c,a,d]).`
- **d.** `member([],[[]]).`
- **e.** `member(c, [c,a,d]).`

---

## Question 3 (1 point)

Which of the following is a correct Prolog clause that would mean "c is true if a and b are true"?

**Options:**

- **a.** `a:-b.c.`
- **b.** None of these answers
- **c.** All of these answers
- **d.** `c:-a,b.` ✓
- **e.** `a.b:-c.`

---

## Question 4 (1 point)

Which of the following things is a NOT a Prolog variable?

**Options:**

- **a.** All of these answers
- **b.** None of these answers
- **c.** `_` ✓
- **d.** `Abc`
- **e.** `abc`

---

## Question 5 (1 point)

Which of the following things is a Prolog variable?

**Options:**

- **a.** `_abc` ✓
- **b.** `_`
- **c.** All of these answers
- **d.** `A`
- **e.** None of these answers

---

## Question 6 (1 point)

Which of the following things is syntactically correct Prolog code?

**Options:**

- **a.** `This(That).`
- **b.** None of these answers
- **c.** All of these answers
- **d.** `this(that).` ✓
- **e.** `_(this).`

---

## Question 7 (1 point)

Assuming `person(X)` means that X is a person, what is the meaning of `person(X)` when it is in a Prolog code file, or when it is typed at a Prolog `|:` prompt?

**Options:**

- **a.** None of these answers
- **b.** All of these answers
- **c.** everything is a person ✓
- **d.** something named "X" is a person
- **e.** there is at least one thing that is a person

---

## Question 8 (1 point)

Which of the following things is a Prolog variable?

**Options:**

- **a.** None of these answers ✓
- **b.** `23`
- **c.** All of these answers
- **d.** `a`
- **e.** `'Name'`

---

## Question 9 (1 point)

Assuming `happy(X)` is true when X is happy, what is the meaning of `happy(X)` when it is typed at a `?-` prompt as a Prolog query?

**Options:**

- **a.** None of these answers
- **b.** there is at least one thing that is happy ✓
- **c.** everything is happy
- **d.** All of these answers
- **e.** something named "X" is happy

---

## Question 10 (1 point)

Given the builtin predicate `member(X, Y)` which means element X is a member of the list Y, which of the following Prolog queries would return true with a SWI Prolog interpreter?

**Options:**

- **a.** `member([],[]).`
- **b.** `meinber([a,b,c],[d,e,f]).`
- **c.** `member(d,[a,b,c]).`
- **d.** `member([],[a,b,c,[]]).` ✓
- **e.** `member([a],[c,a,b]).`
