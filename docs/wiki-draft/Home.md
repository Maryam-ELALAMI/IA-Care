# CareAI Wiki

CareAI (repository `IA-Care`) is a React front-end prototype for a multi-disease AI screening dashboard: dedicated panels for skin cancer, brain cancer, Alzheimer's, and Parkinson's detection, plus a placeholder healthcare chatbot.

This repository currently contains **the UI layer only** — no backend, no bundled ML model, and (until this PR) no build tooling. Treat the panels as a designed interface, not a working diagnostic tool.

## Quick Links

- [Getting Started](Getting-Started) — install, lint, and how to actually run the UI in a browser
- [Architecture](Architecture) — component structure and how the detection panels work
- [FAQ](FAQ) — common questions about the current state of the project

## Tech Stack at a Glance

- React 18 + `react-router-dom` for client-side routing
- SCSS design system (`styles/__variables.scss`, `styles/main.scss`)
- ESLint (flat config) for linting, wired into CI
- No bundler config committed yet (see [Getting Started](Getting-Started))
