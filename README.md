# FORGE 2 Qualifier — AI-Agent Kanban

An AI-orchestrated Kanban board built for the FORGE 2 Qualifier. Two locally-hosted agents — **Hermes** (planner) and **OpenClaw** (executor) — coordinate over Slack to plan and act on tasks, while a Laravel + React app provides the Kanban UI they operate on.

> ⚠️ Edit this paragraph: one or two sentences on what makes this submission interesting — e.g. "Hermes plans the work, OpenClaw executes it, and humans review the result in Slack before it lands on the board."

## Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), running on `localhost:5174` |
| Backend | Laravel + SQLite |
| Orchestration | Hermes (planning agent) + OpenClaw (execution agent), connected via Slack socket mode |
| Models | Hermes → `qwen3.5:9b` (local Ollama) / Gemini 2.5 Flash · OpenClaw → `ollama/gemma4:31b` (Ollama Cloud) |

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for how the two agents are routed and why.

## Getting Started

### 1. Backend (Laravel + SQLite)

```powershell
cd backend
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

This starts the API at `http://127.0.0.1:8000`. If you hit a 404 on `/api/boards`, the server most likely isn't running — see Troubleshooting below.

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5174`. Confirm the frontend's API base URL points at the Laravel server above (check `frontend/.env` or your API client config).

### 3. Agents (Hermes + OpenClaw)

> ⚠️ Fill in: how to start the Hermes and OpenClaw processes (script name / command), and which `.env` vars they need (Slack bot token, Slack app token for socket mode, Ollama host, model names).

Both agents connect to the Slack workspace `forge-02-kapil` via socket mode and post into `#sprint-main`, `#agent-log`, `#agent-orchestrator`, and `#human-review`.

## Troubleshooting

- **`GET /api/boards` → 404**: `php artisan serve` isn't running, or it's running but `routes/api.php` doesn't expose `/boards` (check the route list with `php artisan route:list --path=api`).
- **CORS errors in the browser console**: confirm `config/cors.php` allows `http://localhost:5174` as an origin.
- **SQLite "database not found"**: make sure `database/database.sqlite` exists (`touch database/database.sqlite` on macOS/Linux, `New-Item database/database.sqlite` on Windows) and `DB_CONNECTION=sqlite` in `.env`.
- **Migrations not applied**: run `php artisan migrate:fresh` against the SQLite file above.

## Project Status

See [`agent-log.md`](./agent-log.md) for a timeline of what was built and what's still in progress.

## Repo Structure

```
backend/                Laravel API (boards, lists, cards)
frontend/                React Kanban UI
skills/status-report/    Agent skill definition for status updates
slack-export/            Slack screenshots + export
README.md
ARCHITECTURE.md
agent-log.md
.env.example
```
