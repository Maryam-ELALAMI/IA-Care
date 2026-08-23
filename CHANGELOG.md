# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

No tags or releases have been published yet; this section summarizes the current state of `main` as of this changelog's introduction.

### Added
- `package.json` declaring the project's actual runtime dependencies (`react`, `react-dom`, `react-router-dom`) and an ESLint dev dependency, since none existed before.
- `eslint.config.js` (flat config) for React-aware linting.
- `.gitignore` for `node_modules/`, build output, and local env files.
- GitHub Actions CI workflow (`.github/workflows/ci.yml`) running `npm ci` and `npm run lint` on every push/PR to `main`.
- `LICENSE` (MIT).
- Rewritten `README.md` reflecting the actual React UI codebase (previous README described an unrelated Python/ML pipeline).
- `docs/wiki-draft/` with draft Home, Getting Started, Architecture, and FAQ pages for the maintainer to review and publish to the repository wiki.
- This `CHANGELOG.md`.

### Fixed
- Unescaped apostrophe in `pages/ALzheimers.jsx` (`Alzheimer's` -> `Alzheimer&apos;s`) that failed the new ESLint `react/no-unescaped-entities` rule.

### Known Limitations (carried over, not yet fixed)
- No backend/API: all `fetch()` calls in the detection panels target an empty URL.
- No bundler scaffold (`public/index.html`, Vite/CRA config) — the app cannot be started with a single command yet.
- `pages/Navbar.jsx` references a missing `styles/Navbar.css` and is not rendered anywhere in `App.jsx`.
- `pages/Chatbot.jsx` is a static placeholder.
- No automated test suite.

## History (pre-changelog)

Reconstructed from `git log` prior to this changelog:

- **2024-12-04** — README updated, then replaced with a project description (`ea31817`, `3c32eb4`).
- **2024-12-01** — Initial commit of the React UI source (`a4636a0`).
