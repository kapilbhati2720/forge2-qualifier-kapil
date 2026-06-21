# Forge 2 Qualifier Architecture

## Human (Kapil)

Acts as product owner, reviews plans, approves code generation, validates outputs.

## Hermes (Brain)

Model: Gemini 2.5 Flash

Responsibilities:

* Planning
* Task decomposition
* Architecture decisions
* Progress tracking

## OpenClaw (Hands)

Model: qwen2.5-coder (local)

Responsibilities:

* Code generation
* File creation
* Implementation
* Refactoring

## Workflow

Human → Hermes → OpenClaw → Human Review

All agent activity is logged in Slack and recorded in agent-log.md.
