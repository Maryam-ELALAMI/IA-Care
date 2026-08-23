# Getting Started

## Prerequisites

- Node.js 18+ and npm

## Install and lint

```bash
git clone https://github.com/Maryam-ELALAMI/IA-Care.git
cd IA-Care
npm install
npm run lint
```

`npm run lint` runs ESLint over the whole project — this is also what CI runs on every push/PR to `main`.

## Running the UI in a browser

This repository does not yet include a bundler entry point (`public/index.html`) or bundler config (Vite/Create React App). To actually run the app locally, the fastest path is to scaffold a Vite React project and drop these files in:

```bash
npm create vite@latest careai-shell -- --template react
cd careai-shell
# copy App.jsx, index.js, components/, pages/, styles/, Images/ from this repo into src/
npm install react-router-dom
npm run dev
```

Once running, you'll see the sidebar with five panels (Skin, Brain Cancer, Alzheimer's, Parkinson's, Chatbot). Each detection panel's "Predict" flow calls `fetch()` against an endpoint that isn't implemented anywhere in this repo yet — see [FAQ](FAQ) for what that means in practice.

## Running CI locally

The same two commands CI runs:

```bash
npm ci
npm run lint
```
