---

name: status-report
description: Generate concise engineering progress reports for hackathon and agent-driven software projects.
------------------------------------------------------------------------------------------------------------

When asked for a status report, progress update, checkpoint, or summary:

Always respond using the following structure:

## What I Did

* Completed tasks
* Files created or modified
* Commands executed
* Tests run and their results

## Current State

* What is working right now
* What can be demonstrated immediately
* Known limitations

## What's Left

* Remaining tasks ordered by priority
* Estimated effort for each task
* Dependencies or blockers

## Risks / Blockers

* Issues preventing progress
* Missing configuration, credentials, tools, or approvals
* Technical debt introduced for speed

## What Needs Your Call

Only include decisions that require human judgment.
For each decision:

* State the decision
* Explain available options
* Recommend one option

## Next Action

Provide the single highest-priority next step that should be executed immediately.

Rules:

* Prefer concrete evidence over vague statements.
* Mention specific files, routes, components, migrations, models, or commands when relevant.
* Do not say "working on it" without explaining what is being worked on.
* Do not ask unnecessary clarification questions.
* Assume hackathon conditions: optimize for shipping a working MVP quickly.
* Highlight anything useful for README.md, ARCHITECTURE.md, or agent-log.md evidence.
