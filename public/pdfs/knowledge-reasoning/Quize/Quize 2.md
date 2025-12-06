# Quiz 2

## Question 1 (1 point)

Which of the following queries would not generate an error when issued to the SWI prolog interpreter?

**Options:**

- `sort[(d,a),S].`
- `sort([d,a],S).`
- `sort(d,a,S).`
- `sort((d,a),S).`

---

## Question 2 (1 point)

Which of the following queries would generate an error when issued to the SWI prolog interpreter?

**Options:**

- `member([c,a,d],[]).`
- `member(c,[c,a,d]).`
- `member([],[c,a,d]).`
- `Member(a,[c,a,d]).`

---

## Question 3 (1 point)

Which of the following prolog queries would return true with a SWI prolog interpreter?

**Options:**

- `sort([a,b,c],[a,b,c]).`
- `sort(a,[a,b,c]).`
- `sort([a,b,c],[d,e,f]).`
- `sort([a,b,c],[c,a,b]).`

---

## Question 4 (1 point)

Which of the following queries would return false with a SWI prolog interpreter?

**Options:**

- `sort([a,b],S).`
- `sort([a,b],[b,a]).`
- `sort([],[]).`
- `sort([],S).`

---

## Question 5 (1 point)

Which of the following prolog rules is most likely to generate an infinite loop?

**Options:**

- `member(A,[H|T]):-member(A,T).`
- `member(A,[A|T]):-member(A,T).`
- `transitive(A,C):-transitive(A,B),transitive(B,C).`
- `transitive(A,C):-joined(A,B),transitive(B,C).`

---

## Question 6 (1 point)

Which of the following prolog rules is least likely to generate an infinite loop?

**Options:**

- `visit([H|T]):-visit(T).`
- `visit(A):-visit(B).`
- `visit(A,B):-visit(A,I),visit(I,B).`
- `visit([H|T]):-visit(A),visit(T).`
