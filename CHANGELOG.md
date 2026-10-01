# Changelog

All notable changes to **CareAI (`IA-Care`)** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- **Backend Model Integration**: Connect FastAPI inference microservice (`/api/v1/predict`) to active PyTorch CNN / EfficientNet-B4 models for Skin Cancer Dermoscopy.
- **Brain MRI Segmentation**: Ingest 2D/3D axial MRI scans and overlay segmented tumor masks via HTML5 Canvas.
- **Clinical Chatbot RAG**: Elevate `pages/Chatbot.jsx` to an interactive conversational medical triage assistant with PaLM/Med-PaLM clinical reasoning.
- **Security & Anonymization**: Client-side DICOM/EXIF metadata scrubbers for HIPAA & GDPR compliance.
- **Progressive Web App (PWA)**: Offline triage caching with `vite-plugin-pwa` for field hospital clinics.

---

## [1.1.0] - 2026-10-01

### Added
- **Vite 8 & React Bundler Migration**: Lightning-fast build pipeline (`< 300ms`), Hot Module Replacement (HMR), `@vitejs/plugin-react`, and production bundling into `dist/`.
- **Automated GitHub Pages CI/CD**: Added `.github/workflows/deploy_pages.yml` deploying directly to [https://maryam-elalami.github.io/IA-Care/](https://maryam-elalami.github.io/IA-Care/) on every push to `main`.
- **Single-Page Application (SPA) Routing**: Switched to `HashRouter` and React Router `Link` components with active route state highlighting, preventing 404s on static hosting.
- **SCSS Design System**: Added `styles/_variables.scss` defining brand color tokens and modernized `styles/main.scss` with Dart Sass `@use` syntax and `calc()` operators.
- **🎓 ENIAD Academic Project Showcase**: Formally classified under the **Favorite List of School Projects** at **ENIAD** (*École Nationale d'Intelligence Artificielle et du Digital - Berkane, UMP*).
- **Official GitHub Wiki**: Rebased, sanitized, and published all 5 comprehensive documentation pages to `IA-Care.wiki.git`.
- **Team Expansion**: Welcomed **Hanae Ouaamar** (`Hanaeouaamar@gmail.com` / `@hanae-ouaamar`) to the research team with contributor invitations and co-authorship.
- **Issue Templates & PR Guidelines**: Added GitHub issue templates for bug reports and feature requests, pull request templates, and citation metadata.

### Fixed
- Fixed broken SCSS import in `App.jsx` pointing to non-existent `../src/styles/main.scss`.
- Fixed Dart Sass division deprecation warnings.
- Fixed ESLint flat config scanning `dist/` build artifacts.
- Fixed unused variable warnings across monitoring scripts and eval harnesses.

---

## [1.0.0] - 2026-09-15

### Added
- **4-Pillar Observability Framework**: Standardized telemetry system with structured logger (`monitoring/logger.js`, `monitoring/logger.py`) and health probes (`monitoring/health.js`, `monitoring/health.py`).
- **Telemetry Specs**: Prometheus scraper configuration (`monitoring/prometheus/prometheus.yml`) and Grafana monitoring dashboard (`monitoring/grafana/dashboard.json`).
- **Evaluation Harness**: Automated QA evaluation script (`scripts/eval_harness.js`, `scripts/eval_harness.py`) validating model accuracy and quality index metrics.
- **Quality Gates CI**: Added `.github/workflows/ci_qa_monitoring.yml` verifying linting and observability specs in GitHub Actions.
- **Multi-Disease Screening Prototype**: Client-side UI panels for Skin Cancer, Brain Tumor, Alzheimer's, Parkinson's (CSV), and Chatbot.

---

## [0.1.0] - 2024-12-01

### Added
- Initial React prototype repository created with component layout, sidebar navigation, and medical detection panels.
