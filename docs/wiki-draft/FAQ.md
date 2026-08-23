# FAQ

**Can I actually get a prediction from one of the panels right now?**
No. Every panel's `fetch()` call targets an endpoint that isn't implemented anywhere in this repository. You'll see a failed request in the browser console if you try.

**Why does the project have no `public/index.html` or bundler config?**
The repository as committed is the UI source only — components, pages, and styles — without the scaffold a bundler (Vite/CRA/webpack) needs to actually serve it. See [Getting Started](Getting-Started) for a quick way to run it anyway via a fresh Vite shell.

**What's `pages/Navbar.jsx` for?**
Nothing currently — it's dead code. It isn't imported or rendered by `App.jsx`, and it references a `styles/Navbar.css` file that doesn't exist. It was most likely an earlier layout, superseded by `components/Sidebar.jsx`.

**Is the Chatbot panel functional?**
No, `pages/Chatbot.jsx` is a static placeholder (`<h1>Chatbot.</h1>`) reserved for a future conversational assistant.

**Why does the Alzheimer's panel require a button click while others predict automatically on file select?**
That's simply how `pages/ALzheimers.jsx` was originally built — it explicitly gates the `fetch()` call behind a "Predict" button, unlike the Skin/BrainCancer panels. This may be worth aligning across panels for consistency in a future change.

**What would it take to make this a working screening tool?**
At minimum: (1) a backend service exposing the prediction endpoints each panel already calls, (2) actual trained models for each condition, (3) a bundler scaffold so the app can be built and deployed, and (4) real chatbot logic if that panel is meant to ship.
