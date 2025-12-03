# AI Usage Explanation for Assignment 3: Coffee Making

## Overview

This document explains how AI was used as a learning tool to complete Assignment 3: Making Instant Coffee, which required implementing a Knowledge Representation system using Situation Calculus in Prolog.

## AI Usage Context

### Context Type: Using AI as a Learning Tool

I used AI to help understand how to structure a Situation Calculus implementation in Prolog. The context was **using AI as a learning tool** to understand patterns and implementation approaches, based on:

- The assignment requirements
- The reference implementation from Assignment 2 (`monkey_bananas.pl`)
- The domain description (coffee-making with 9 actions)

### Prompts Used

**Prompt 1: Understanding Structure and Patterns**

- **Context**: Using AI as a learning tool to understand implementation patterns
- **Prompt**: Asked AI to help me understand how to structure a Prolog program following the pattern of `monkey_bananas.pl` for the coffee-making domain
- **Result**: AI provided guidance on code structure with fluents, actions, and axioms
- **Analysis**: The guidance helped me understand the structure. I then implemented the code myself, but identified issues with initial state definitions (using `:- fail.` incorrectly) and fixed them

**Prompt 2: Debugging Assistance**

- **Context**: Addressing a specific problem I identified in my implementation
- **Prompt**: Asked for help understanding why my code wasn't working, specifically the initial state definitions
- **Result**: AI explained the issue with `:- fail.` and suggested using Closed World Assumption
- **Analysis**: I verified this was correct through testing and implemented the fix myself

**Prompt 3: Testing Strategy**

- **Context**: Addressing a specific problem - needed systematic way to verify my code
- **Prompt**: Asked for suggestions on how to test Situation Calculus implementations
- **Result**: AI suggested test categories and approaches
- **Analysis**: I implemented the test suite myself based on these suggestions, which helped me verify correctness and identify performance characteristics

**Prompt 4: Verification**

- **Context**: Addressing a specific concern - ensuring my implementation matched the reference
- **Prompt**: Asked AI to help verify that my planning function implementation was consistent with the reference
- **Result**: AI confirmed the structure was correct
- **Analysis**: I verified this myself by comparing with the reference implementation, ensuring correctness

## My Understanding of the Solution

### Situation Calculus Concepts

**Situations vs. States:**

- Situations are action histories (sequences of actions), not snapshots of the world state
- The empty list `[]` represents the initial situation
- A situation `[action1, action2]` means: first perform `action2`, then `action1` (read right to left)
- The current state is derived from the situation by evaluating fluents

**Fluents:**

- Predicates whose truth values depend on the situation
- All fluents must have a situation parameter as their last argument
- Examples: `cupboard_open(S)`, `cup_location(Location, S)`, `water_boiled(S)`

**Key Insight:** The same state can be reached by different action sequences, but each sequence (situation) is unique.

### Prolog Implementation

**Closed World Assumption:**

- In Prolog, undefined predicates are considered false
- We only define positive initial states (e.g., `cup_location(cupboard, [])`)
- Negative fluents don't need explicit definition

**Frame Axioms:**

- State what doesn't change after an action
- Critical for efficiency - we only specify what changes, everything else persists

### Domain Modeling

**8 Fluents:** `cupboard_open`, `cup_location`, `kettle_filled`, `kettle_plugged`, `water_boiled`, `cup_has_water`, `cup_has_coffee`, `coffee_stirred`

**9 Actions:** `open_cupboard`, `take_cup`, `place_cup_on_counter`, `fill_kettle`, `plug_kettle`, `wait_for_boil`, `pour_water`, `add_coffee`, `stir_coffee`

Actions have preconditions that must be satisfied, and some can be done in parallel while others must be sequential.

## Problems Encountered and Solutions

### Problem 1: Incorrect Initial State Definition

**Issue:** The initial code used `:- fail.` for negative fluents

**My Analysis:**

- This violates Prolog's Closed World Assumption
- Makes predicates always fail, not just false
- Breaks negation checks like `\+ cupboard_open([])`

**Solution:**

- Removed all `:- fail.` definitions
- Only defined positive initial states
- Relied on Closed World Assumption for negative fluents

**Learning:** Prolog's Closed World Assumption is fundamental - undefined means false, not unknown.

### Problem 2: Planning Algorithm Performance

**Issue:** Planning took several minutes

**My Understanding:**

- Large search space: 9 actions with many possible sequences
- Breadth-first search tries all sequences of increasing length
- This is expected behavior for unguided breadth-first search

**Solution:**

- Added comments explaining performance characteristics
- Created test with known good plan for faster verification
- Documented that slow performance is expected

**Learning:** Planning algorithms without heuristics can be slow for large search spaces.

### Problem 3: Understanding Action Sequence Order

**Issue:** Initially confused about reverse order in plans

**My Understanding:**

- Situations are represented as `[most_recent_action | previous_situation]`
- To read chronologically, read from right to left
- This is because we prepend actions to build the history

**Learning:** Situation representation is a design choice - prepending is efficient in Prolog.

## How I Verified and Tested the Code

### 1. Systematic Testing

I created comprehensive tests covering:

- **Initial State**: Verify starting conditions
- **Action Preconditions**: Verify actions only possible when conditions met
- **Fluent Updates**: Verify state changes correctly after actions
- **Complete Sequence**: Verify full 9-action sequence works
- **Planning**: Verify algorithm finds valid plan

### 2. Manual Verification

I manually traced through action sequences to understand how situations build up and how fluents are evaluated:

```
Initial: cup_location(cupboard, [])
After open_cupboard: cupboard_open([open_cupboard])
After take_cup: cup_location(in_hand, [take_cup, open_cupboard])
...
Final: coffee_ready([stir_coffee, ..., open_cupboard])
```

## Verification Results

All tests pass successfully:

- ✓ Initial State: Correct starting configuration
- ✓ Action Preconditions: Actions only possible when conditions met
- ✓ Fluent Updates: States change correctly after actions
- ✓ Complete Sequence: Full 9-action sequence works
- ✓ Planning: Algorithm finds valid 9-action plan (takes ~2-3 minutes)

**Final Plan:** `[stir_coffee, pour_water, wait_for_boil, plug_kettle, fill_kettle, add_coffee, place_cup_on_counter, take_cup, open_cupboard]`

## Reflection on AI Usage

### How I Used AI:

1. **Structure Understanding**: Used AI to help understand how to organize Situation Calculus code
2. **Concept Clarification**: Asked questions to clarify how to model fluents and actions
3. **Pattern Recognition**: Learned patterns for writing precondition and successor state axioms

### My Independent Work:

1. **Deep Analysis**: Studied code structure to understand Situation Calculus principles
2. **Problem Identification**: Identified bugs through systematic testing
3. **Debugging**: Fixed all issues through careful analysis
4. **Testing**: Created comprehensive test suite
5. **Verification**: Manually traced through logic to ensure understanding

### Key Learning Outcomes:

1. **Situation Calculus**: Understand how situations represent action histories
2. **Prolog**: Mastered Closed World Assumption and frame axioms
3. **Planning**: Understood breadth-first search in Prolog
4. **Domain Modeling**: Learned to identify fluents and actions from requirements
5. **Testing**: Developed systematic testing approach

## Conclusion

I used AI as a learning tool to understand the structure and patterns of Situation Calculus implementations. The AI provided guidance and suggestions, but **I implemented all the code myself**, made modifications based on my understanding, identified and fixed bugs, created comprehensive tests, and verified everything through manual tracing.

**Key Point**: As required by the assignment ("as long as you understand the entire solution"), I understand every part of the code:

- I can explain how each fluent works and why it's needed
- I understand all precondition and successor state axioms
- I can trace through any action sequence manually
- I understand the planning algorithm and why it works
- I can modify the code to add new actions or fluents

Through this process, I developed a thorough understanding of Situation Calculus, Prolog implementation, and planning algorithms. The AI served as a learning aid, but the implementation, debugging, testing, and understanding were my own work.
