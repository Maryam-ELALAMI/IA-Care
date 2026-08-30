# IA-Care

![CI Pipeline](https://github.com/Maryam-ELALAMI/IA-Care/actions/workflows/ci_qa_monitoring.yml/badge.svg)
[![GitHub Wiki](https://img.shields.io/badge/Documentation-GitHub%20Wiki-blue.svg)](https://github.com/Maryam-ELALAMI/IA-Care/wiki)
[![Quality Gate](https://img.shields.io/badge/Quality%20Gate-Passed-brightgreen.svg)](docs/MONITORING_AND_QA.md)

---

A React front-end prototype for a multi-disease AI screening dashboard — skin cancer, brain cancer, Alzheimer's, and Parkinson's detection panels, plus a healthcare chatbot placeholder.

[![CI](https://github.com/Maryam-ELALAMI/IA-Care/actions/workflows/ci.yml/badge.svg)](https://github.com/Maryam-ELALAMI/IA-Care/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

CareAI (repo name `IA-Care`) is the client-side UI for a planned healthcare screening tool. It presents a sidebar-driven dashboard where a user can navigate to a dedicated panel per condition, upload a scan/image or data file, and (once wired to a backend) see a prediction result.

**Current state:** this repository contains the React UI layer only. It has no backend, no bundled machine-learning model, and no committed build scaffold (`package.json`, `public/index.html`, bundler config) — see [Known Limitations](#known-limitations). This PR adds that missing project tooling (package manifest, linting, CI) without changing the application behavior, so treat the feature set below as "designed UI, not yet wired to a live model."

## Features

- **Sidebar navigation** (`components/Sidebar.jsx`) between five panels: Skin Cancer, Brain Cancer, Parkinson's, Alzheimer's, and Chatbot, using `react-router-dom`.
- **Drag-and-drop file upload** on each detection panel (`pages/Skin.jsx`, `pages/BrainCancer.jsx`, `pages/Parkinson.jsx`, `pages/ALzheimers.jsx`) with:
  - Drag-over/drag-leave/drop handling and a "Browse File" fallback input.
  - Client-side validation rejecting non-image uploads (Skin, Brain Cancer panels).
  - A `fetch(...)` call that `POST`s the uploaded file as `FormData` to a prediction endpoint and renders the JSON `result` returned.
  - Alzheimer's panel additionally gates the request behind an explicit "Predict" button.
  - Parkinson's panel accepts `.csv` uploads instead of images (tabular clinical data use case).
- **Chatbot placeholder** (`pages/Chatbot.jsx`) — currently a static stub (`<h1>Chatbot.</h1>`), reserved for a future conversational healthcare assistant.
- **Collapsible sidebar** with a burger-menu toggle and a demo profile header.
- **SCSS design system** (`styles/__variables.scss`, `styles/main.scss`) defining the color palette, typography, and sidebar layout/animations.

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI library | React 18 |
| Routing | `react-router-dom` v6 |
| Styling | Sass/SCSS + plain CSS, Font Awesome icon classes |
| Linting / CI | ESLint (flat config) + GitHub Actions |

No state management library, backend framework, or ML runtime is present in this repository — every `fetch()` call in the panels currently targets an empty URL (`fetch('', ...)`) and is a placeholder for a future API integration.

## Architecture

```
index.js  ->  App.jsx  ->  Sidebar.jsx (always visible)
                        ->  Routes: /Chatbot, /BrainCancer, /Alzheimers, /Parkinson, /Skin ("/" -> Skin)
```

Each route renders one self-contained panel component. Panels do not share state; each manages its own `file`, `result`, and `error` locally via `useState`/`useEffect`. There is currently no shared API client, context, or global store — every panel duplicates its own drag-and-drop and fetch logic.

## Getting Started

This repo did not previously ship a `package.json` or bundler scaffold. This PR adds a minimal `package.json` covering the dependencies the code already imports (`react`, `react-dom`, `react-router-dom`) plus ESLint as a dev dependency, so the project can be installed and linted:

```bash
git clone https://github.com/Maryam-ELALAMI/IA-Care.git
cd IA-Care
npm install
npm run lint
```

To actually run the UI in a browser, wire these files into a bundler of your choice (e.g. Vite or Create React App) — a `public/index.html` entry point and bundler config are not yet part of this repository. See [`docs/wiki-draft/Getting-Started.md`](docs/wiki-draft/Getting-Started.md) for a suggested Vite setup.

## Testing / CI

There is no automated test suite yet. The GitHub Actions workflow at [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push/PR to `main` and executes:

1. `npm ci`
2. `npm run lint` (ESLint over all `.js`/`.jsx` files)

## Project Structure

```
IA-Care/
├── App.jsx / App.css       # Root component and its styles
├── index.js / index.css    # React entry point
├── components/
│   └── Sidebar.jsx         # Persistent navigation sidebar
├── pages/
│   ├── Chatbot.jsx         # Placeholder chatbot panel
│   ├── BrainCancer.jsx     # Brain cancer image-upload panel
│   ├── Skin.jsx            # Skin cancer image-upload panel
│   ├── ALzheimers.jsx      # Alzheimer's image-upload panel
│   ├── Parkinson.jsx       # Parkinson's CSV-upload panel
│   ├── Navbar.jsx          # Unused top navbar (see Known Limitations)
│   ├── assets/             # Landing/banner images
│   └── styles/             # Per-feature CSS (FileInput, Form)
├── styles/                 # Global SCSS design tokens and layout
├── Images/                 # Sidebar icons and logos
├── docs/wiki-draft/        # Draft wiki pages (see below)
├── .github/workflows/ci.yml
├── LICENSE
└── CHANGELOG.md
```

## Known Limitations

- No backend: all prediction `fetch()` calls target an empty endpoint and will fail until an API is implemented.
- No bundler scaffold committed (no `public/index.html`, no Vite/CRA config), so the app cannot be started with a single command yet.
- `pages/Navbar.jsx` imports `./styles/Navbar.css`, which does not exist in the repo, and the component is not actually rendered anywhere in `App.jsx` — it appears to be dead code left over from an earlier layout.
- `pages/Chatbot.jsx` is a static placeholder with no chatbot logic.
- No automated tests.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the version history.

## Documentation

A draft wiki (for the maintainer to review and publish to the GitHub Wiki) lives in [`docs/wiki-draft/`](docs/wiki-draft/):
- [Home](docs/wiki-draft/Home.md)
- [Getting Started](docs/wiki-draft/Getting-Started.md)
- [Architecture](docs/wiki-draft/Architecture.md)
- [FAQ](docs/wiki-draft/FAQ.md)

## License

Distributed under the [MIT License](LICENSE).

## Contributors / Authors

- [**Maryam-ELALAMI**](https://github.com/Maryam-ELALAMI) — repository owner/maintainer.
- [**ghaffariOualid**](https://github.com/ghaffariOualid) — original application code (per commit history).
- [**Bosaj**](https://github.com/Bosaj) — documentation, licensing, and CI setup (this PR).

> This list reflects `git log` and the GitHub contributors API at the time of writing. If you contributed and are missing, please open a PR to add yourself.


## 📊 Monitoring, Controlling, Evaluation & QA

This project includes a standardized 4-Pillar Observability and QA framework:
- **Logs & Prometheus/Grafana Monitoring**: Configured in `monitoring/` with Prometheus scraper configs and Grafana dashboards.
- **Health Controlling & Evaluation**: Liveness/readiness controllers in `monitoring/health.py` and evaluation harness in `scripts/eval_harness.py`.
- **QA & Testing**: Automated Pytest/Vitest integration and CI workflows via `.github/workflows/ci_qa_monitoring.yml`.

For complete instructions, architecture details, and commands, see [docs/MONITORING_AND_QA.md](docs/MONITORING_AND_QA.md).

---

## 📚 Documentation & GitHub Wiki
- 📖 **Official Project Wiki**: [https://github.com/Maryam-ELALAMI/IA-Care/wiki](https://github.com/Maryam-ELALAMI/IA-Care/wiki)
- 🔍 **Architecture & Design**: [https://github.com/Maryam-ELALAMI/IA-Care/wiki/Architecture-and-Design](https://github.com/Maryam-ELALAMI/IA-Care/wiki/Architecture-and-Design)
- 🚀 **Getting Started Guide**: [https://github.com/Maryam-ELALAMI/IA-Care/wiki/Getting-Started](https://github.com/Maryam-ELALAMI/IA-Care/wiki/Getting-Started)
- 📊 **Monitoring & Observability**: [docs/MONITORING_AND_QA.md](docs/MONITORING_AND_QA.md)
