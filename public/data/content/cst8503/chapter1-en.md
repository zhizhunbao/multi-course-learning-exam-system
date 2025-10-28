# Chapter 1: Introduction to Knowledge Representation

**Source**: CST8503 Course Material - Knowledge Representation and Reasoning

---

## Course Information

- **Course Code**: CST8503: K&R and Reasoning
- **Professor**: Todd Kelley
- **Office**: T315
- **Phone**: 613-727-4723 x7474
- **Email**: kelleyt@algonquincollege.com

**Source**: Course Introduction Materials

---

## Course Schedule

- **Lecture**: Thursday 2-4pm (A1120)
- **Lab 301**: Thursday 11:30am-1:30pm (J210)
- **Lab 302**: Tuesday 5:00-7:00pm (B220)
- **Asynchronous Activities**: Average of 1 hour per week

**Source**: Course Schedule

---

## 1.1 Knowledge Representation vs Machine Learning vs Artificial Intelligence

### Artificial Intelligence

Artificial intelligence software is a category of software solutions that solve problems that are generally believed to require or benefit from intelligence.

**Turing Test**:

- Under specific conditions, if a software system makes you believe it has intelligence, then that software system has passed the Turing test of intelligence
- Passing the Turing test is believed to require intelligence because, even if the intelligence is fake, successfully faking intelligence requires intelligence

**Source**: Fundamentals of Artificial Intelligence

---

### Machine Learning vs Knowledge Representation

**Machine Learning** focuses on finding patterns in data:

- **Supervised Learning**: Uses labeled datasets with clear examples to train the system on what patterns to look for
- **Unsupervised Learning**: Systems use algorithms to find patterns in data, but no explicit examples of what to look for
- **Reinforcement Learning**: Agent-based paradigm, repeatedly selecting actions in states based on policies to receive rewards

**Knowledge Representation** focuses on declarative knowledge forms suitable for processing by specialized reasoning engines:

- Declarative knowledge: facts and rules (knowledge) written in language (declared)
- Patterns (knowledge) are directly provided to the system in the form of facts and rules
- The system (interpreter) knows how to utilize patterns without learning them

**Source**: Machine Learning vs Knowledge Representation Comparison

---

## 1.2 Declarative Knowledge

### Design Considerations for Knowledge Representation Languages

Need to be able to represent:

- World state
- Actions that can occur
- The effects of actions in changing the world state

**Source**: Knowledge Representation Design Principles

---

### Declarative vs Procedural

**Declarative Solution** (a set of facts/rules):

- The solution is a cup of hot brown water that tastes like coffee
- Boiling water in a kettle produces hot water
- Putting a spoon of instant coffee into hot water produces brown water that tastes like coffee
- Pouring boiling water into a cup produces a cup of hot water

**Procedural Solution**:

1. Take a cup from the cabinet and place it on the counter
2. Fill kettle with water
3. Plug in kettle
4. Put a spoon of instant coffee into the cup on the counter
5. Wait for kettle to boil
6. Pour water from kettle into cup

**Source**: Declarative vs Procedural Programming Example

---

## 1.3 Declarative Programming

Declarative knowledge has a procedural interpretation. If we combine declarative knowledge with a correctly implemented system with theoretical foundations (such as a theorem prover like Prolog), we can consider declarative knowledge as a program.

We run the program by issuing queries to the theorem prover (in our case Prolog). Prolog uses declarative knowledge (the Prolog program) to derive through reasoning the conditions under which the query is true (variable bindings).

**Source**: Principles of Declarative Programming

---

## 1.4 Facts and Rules Programming

```prolog
% Ancestral relationship rules
forall X, Y Parent(X,Y) -> Ancestor(X,Y).
forall X,Y Parent(X,Y) and Ancestor(Y,Z) -> Ancestor(X,Z).

% Facts
Parent(john,joe).
Parent(joe,bill).
Parent(bill,jill).
Ancestor(joe,sally).
```

**Source**: Prolog Facts and Rules Example
