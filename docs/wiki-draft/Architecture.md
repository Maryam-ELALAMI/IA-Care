# Architecture

## Component structure

```
App.jsx                  Root: renders Sidebar + routed page content
├── components/
│   └── Sidebar.jsx       Persistent nav — burger-menu collapse, active-route highlighting via useLocation()
└── pages/
    ├── Skin.jsx          Image upload → fetch() → render result
    ├── BrainCancer.jsx   Image upload → fetch() → render result
    ├── ALzheimers.jsx    Image upload, gated behind a "Predict" button → fetch() → render result
    ├── Parkinson.jsx     CSV upload (tabular clinical data) → fetch() → render result
    ├── Chatbot.jsx       Static placeholder, no logic yet
    └── Navbar.jsx        Dead code — not imported/rendered by App.jsx, and references a missing stylesheet
```

## Detection panel pattern

Every detection panel (Skin, BrainCancer, ALzheimers, Parkinson) follows the same shape:

1. Local `useState` for the selected file, drag-over state, and the result.
2. Drag-and-drop handlers (`onDragOver`/`onDragLeave`/`onDrop`) plus a hidden `<input type="file">` for the "Browse File" fallback.
3. Client-side validation (Skin/BrainCancer reject non-image MIME types).
4. On submit, the file is wrapped in `FormData` and sent via `fetch(<endpoint>, { method: "POST", body: formData })`.
5. The JSON response's `result` field is rendered directly into the page.

**There is no real backend behind step 4** — the fetch target is not implemented anywhere in this repository, so every panel will fail at that step until a prediction API is built and wired in.

## Styling

Global design tokens (colors, spacing, fonts) live in `styles/__variables.scss`, composed into `styles/main.scss`. Individual pages have their own scoped CSS under `pages/styles/` (e.g. `FileInput.css`, `Form.css`).

## Routing

`react-router-dom` maps each sidebar item to one of the panel components above. `Sidebar.jsx` reads the current route via `useLocation()` to highlight the active item.

## Known dead code

`pages/Navbar.jsx` imports `./styles/Navbar.css`, which doesn't exist in the repo, and the component itself isn't rendered anywhere — it looks like it was superseded by `Sidebar.jsx` but never removed.
