# Portfolio Website

A static HTML/CSS/JS portfolio that reads project data from `projects.json`.
Only you (with GitHub write access) can add or edit projects — visitors just view.

## Files

- `index.html` — the public page recruiters see
- `style.css` — all styling
- `script.js` — renders project cards + terminal animation
- `projects.json` — your project data (edit this to add/remove projects)
- `admin.html` — a local helper form that generates a JSON block for you to paste into `projects.json`. It is **not** a real multi-user backend — it just saves you from writing JSON by hand.

## Before you deploy

1. Open `script.js`, find the last two lines, and replace with your real LinkedIn and email:
   ```js
   document.getElementById("linkedinLink").href = "https://linkedin.com/in/your-profile";
   document.getElementById("emailLink").href = "mailto:your-email@example.com";
   ```
2. Open `admin.html` and change `ADMIN_PASSWORD` to something only you know (this just locks the local helper form on your own machine — it does not secure `projects.json` itself, since that file lives in a public GitHub repo either way).
3. Fill in `demo` links in `projects.json` as you deploy each project (e.g. once the AI Career Intelligence Engine is live on Render, paste that URL into its `"demo"` field).

## Deploy on GitHub Pages (free)

1. Create a new GitHub repo, e.g. `portfolio`.
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/utkarshadley/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root) → Save**.
4. Your site goes live at `https://utkarshadley.github.io/portfolio/` within a minute or two.

## Adding a new project later

1. Open `admin.html` in your browser (works locally, no server needed — just double-click the file).
2. Enter the password, fill the form, click **Generate JSON**.
3. Copy the output block and paste it inside the `[ ]` in `projects.json` (add a comma before it if it's not the first entry).
4. Commit and push. GitHub Pages rebuilds automatically.

## Note on the Data Engineering project

The `From-Raw-Data-to-Insight` repo's README links out to a Medium article by another author. If this project was built by following that tutorial, consider adding a line to that repo's README crediting the original source — it's fine to showcase tutorial-based work, but recruiters (and interviews) go better when the framing is upfront rather than something they discover themselves.
