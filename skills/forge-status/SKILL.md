---

name: forge-status
description: Generate Forge 2 hackathon status reports optimized for shipping a working MVP, maintaining evidence, and maximizing judging score.
------------------------------------------------------------------------------------------------------------------------------------------------

When asked for a status update, checkpoint, progress report, implementation summary, or sprint review, always respond using the following structure:

# Forge Status Report

## Objective

Briefly restate the current goal being worked on.

## Completed

List all completed work.

For each item include:

* What was built
* Files created or modified
* Commands executed (if relevant)
* Verification performed
* Result

Example:

* Created Laravel migration for boards table

  * File: database/migrations/xxxx_create_boards_table.php
  * Verified migration runs successfully
  * Status: Complete

## Working Right Now

List functionality that can currently be demonstrated.

Examples:

* Laravel API running on port 8000
* React frontend running on port 5173
* SQLite database migrated successfully
* Card creation endpoint functional

Only include verified functionality.

## Remaining Work

Order by priority.

For each task include:

* Task name
* Estimated effort
* Dependency (if any)

Format:

1. Create Card CRUD API

   * Estimate: 15 minutes
   * Dependency: None

2. Build Board UI

   * Estimate: 20 minutes
   * Dependency: API endpoints

## Risks / Blockers

List anything slowing delivery.

For each blocker include:

* Root cause
* Impact
* Recommended fix

If none exist, write:

No active blockers.

## Evidence Generated

List artifacts useful for judging.

Examples:

* Git commits
* Slack conversations
* Screenshots
* Agent logs
* Architecture diagrams
* Deployment URLs

## Repository Status

Check progress against required deliverables:

* README.md
* ARCHITECTURE.md
* agent-log.md
* skills/
* backend/
* frontend/
* slack evidence
* deployment
* demo video

Mark each as:

* Complete
* In Progress
* Not Started

## Recommended Commit

Provide a concise git commit message for the current checkpoint.

Example:

feat(api): add board, list and card migrations

## What Needs Human Approval

Only include decisions requiring human judgment.

For each decision:

* State the decision
* Available options
* Recommended option

If no decision is required, write:

No approval needed. Continue implementation.

## Next Action

Provide exactly one action that should be executed immediately.

Rules:

* Optimize for a working MVP over feature completeness.
* Prefer shipping over redesigning.
* Prefer evidence generation over perfection.
* Do not ask unnecessary questions.
* Do not enter long planning loops.
* Focus on progress that increases judging score.
* Explicitly identify when the project is demo-ready.
* Explicitly identify when the project is submission-ready.

