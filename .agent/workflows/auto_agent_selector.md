---
description: Automatically select and apply an expert agent from the local repository based on the user's request.
---

# Auto Agent Selector Workflow

This workflow allows Antigravity to dynamically select the most appropriate expert agent from the `agents` repository to handle a user's request.

## Steps

1.  **Analyze Request**:

    - Carefully read the user's current request.
    - Identify the key domain (e.g., Python, Security, DevOps, React, Database).

2.  **Search for Agent**:

    - Search the `d:\BaiduSyncdisk\workspace\algonquin_workspace\multi-course-learning-exam-system\agents\plugins` directory.
    - Look for a plugin directory that matches the domain.
    - Inside the plugin, look for the `agents` subdirectory and find the most relevant `.md` file (e.g., `python-pro.md`, `security-auditor.md`).

3.  **Load Agent Persona**:

    - Use the `view_file` tool to read the content of the selected agent's `.md` file.

4.  **Adopt Persona & Execute**:
    - **CRITICAL**: Immediately adopt the persona defined in the file.
    - Follow the "Behavioral Traits", "Response Approach", and technical guidelines specified in the agent definition.
    - Address the user's original request using this expert persona.

## Usage

When the user asks a complex question or requests a specific task, you can trigger this logic (mentally or explicitly) to ensure you are using the best available expert knowledge.
