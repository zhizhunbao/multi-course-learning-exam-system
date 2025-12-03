# CST8503 Assn3 KR Coffee

---

CST8503 Assignment 3 Planning



Making Instant Coffee



Overview



We build on your experience from previous labs and assignments to write a Prolog program that implements Knowledge Representation of a domain in which a robot makes a cup of instant coffee. You are allowed to use AI to produce your solution, in whole or in part, as long as you understand the entire solution.



When you have finished this lab exercise, you will have practiced the ability to



Write logical axioms to represent a coffee-making domain from a robot's perspective



Write logical axioms in Prolog syntax to implement a procedural interpretation of the axioms



Solve, using AI if you choose, a coffee world planning problem based on Knowledge Representation and Prolog. If you do use AI to produce some or all of your solution, you are required to include in your submission a written explanation of how the process was completed (copying and pasting, screenshots etc, as you see fit).



Use a graphical tracing utility to watch your programs execute, and debug as necessary



Coffee Domain



We will be representing the following domain where a robot plans to make a cup of instant coffee. The robot will need to do the following things (look for phrases in bold):



Open the cupboard, then take a cup from the cupboard and place it on the counter



Fill a kettle with water, and then plug the kettle in



After the robot waits for the water to boil, it will pour hot water into the cup



Add instant coffee to the cup



With the hot water and coffee in the cup, the robot can stir the coffee to complete the process



It should be possible to make coffee from start to finish with at most 9 steps or actions. Try to avoid making this coffee world more complicated than necessary to represent the bullet points above. You might find it helpful to work through a simplified version first, perhaps with fewer actions. For example, the first bullet point involves two actions (see the phrases in bold), but you might get started by temporarily considering the first bullet to be one action, and get that working. Once the simplified version is working, then implement another version with more actions that are more detailed.



The State of the world



What fluents are sufficient to completely represent the state of this world? You’ll need to consider the actions that can be performed while you consider what fluents are necessary to represent the state. Think of the door example with open_door and close_door actions, which affected the value of the door_open fluent. A simplified door example might have just the ability to open the door, so we’d have just an open_door action, and a door_open fluent which can be affected by the open_door action.



Write down a Prolog comment that shows the list of fluents (Prolog notation is acceptable). A fluent at this stage would be listed as fluent_pred/3 or even better fluent_pred(arg1,arg2,S). Later we write the successor state axioms to implement the fluents.



Write down the Prolog code for the initial state (the Initial State Axioms). This code needs include each of your fluents with the initial situation, [], in the rightmost argument position.



Actions: how does the world change



What actions are relevant in this world? We are thinking only about the things the robot can do. Keep in mind that fewer actions is simpler. For example, an action schema stir(X) could be stir(coffee), stir(cupboard), stir(water), but we don’t need all of those actions because only one of them is mentioned in our description. We just need a single action stir_coffee or even just stir because only the coffee can be stirred.



Write down the set of actions relevant to this world.



Precondition Axioms



Under which conditions is each action possible?



Write down the precondition axiom (Prolog notation is acceptable) for each action in the domain.



Successor State Axioms



How does the state change (or not) after each action occurrence?



Write down the successor state axiom for each fluent in the domain.



Planning the Goal



Write and run the prolog program that implements this domain (use the axioms you wrote above), including a prolog procedure to implement the planning to achieve the goal:



%plan(g(S),S) where g is the goal state that depends on a Situation S



plan(g(S),S):- …



Write down the goal state g(S) in terms of the fluents of the domain, that represent a state of the world in which the coffee is ready.



Submission



Submit your commented prolog program file, and if you used AI, submit a document containing your written explanation of how you used AI. This should include the context (asking for complete solution, asking for hints on how to proceed, versus addressing a specific problem with a proposed solution, etc), include whatever prompts were used, and include analysis/explanation of results of prompts.



Demonstration



Explain the process you followed to write logical axioms to represent a coffee-making domain from a robot's perspective



Explain how the Prolog interpreter implements a procedural interpretation of the axioms



Run queries to show that you have solved the coffee world planning problem using Knowledge Representation and Prolog


