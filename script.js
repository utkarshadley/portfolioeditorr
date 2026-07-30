// ---------- Terminal typing animation ----------
const termLines = [
  { prompt: "utkarsh@portfolio", cmd: "whoami" },
  { out: "Data Analytics Intern  @ Unessa Foundation" },
  { out: " Exploring AI & Data Science" },
  { prompt: "utkarsh@portfolio", cmd: "ls projects/" },
  { out: "ai-career-intelligence  sales-dashboard  chatbot" },
  { out: "data-engineering-pipeline  project-drishti" },
  { prompt: "utkarsh@portfolio", cmd: "cat status.txt" },
  { out: "5 projects shipped. Scroll down \u2193" }
];

async function typeTerminal() {
  const body = document.getElementById("terminalBody");
  if (!body) return;

  for (const line of termLines) {
    const div = document.createElement("div");
    div.className = "term-line";
    body.appendChild(div);

    if (line.cmd) {
      const promptSpan = `<span class="term-prompt">${line.prompt}$</span> `;
      div.innerHTML = promptSpan;
      let typed = "";
      for (const ch of line.cmd) {
        typed += ch;
        div.innerHTML = promptSpan + `<span class="term-cmd">${typed}</span>`;
        await sleep(28);
      }
      await sleep(220);
    } else {
      div.innerHTML = `<span class="term-out">${line.out}</span>`;
      await sleep(180);
    }
  }
  const cursorLine = document.createElement("div");
  cursorLine.className = "term-line";
  cursorLine.innerHTML = `<span class="term-prompt">utkarsh@portfolio$</span> <span class="term-cursor"></span>`;
  body.appendChild(cursorLine);
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// ---------- Project rendering ----------
async function loadProjects() {
  const grid = document.getElementById("projectGrid");
  try {
    const res = await fetch("projects.json");
    if (!res.ok) throw new Error("Failed to load projects.json");
    const projects = await res.json();

    if (!projects.length) {
      grid.innerHTML = `<div class="empty-state">No projects yet. Add entries to projects.json to get started.</div>`;
      return;
    }

    grid.innerHTML = projects.map(renderCard).join("");
  } catch (err) {
    grid.innerHTML = `<div class="empty-state">Couldn't load projects right now. Check projects.json is present.</div>`;
    console.error(err);
  }
}

function renderCard(p) {
  const stackHtml = (p.stack || [])
    .map((s) => `<span class="stack-pill">${escapeHtml(s)}</span>`)
    .join("");

  const demoHtml = p.demo
    ? `<a href="${escapeAttr(p.demo)}" class="demo" target="_blank" rel="noopener">Live demo</a>`
    : p.demoLabel
      ? `<span class="demo disabled" title="${escapeAttr(p.demoLabel)}">${escapeHtml(p.demoLabel)}</span>`
      : "";

  return `
    <article class="card">
      <p class="card-tag">${escapeHtml(p.category || "")}</p>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.description)}</p>
      <div class="stack-list">${stackHtml}</div>
      <div class="card-links">
        <a href="${escapeAttr(p.github)}" class="gh" target="_blank" rel="noopener">GitHub</a>
        ${demoHtml}
      </div>
    </article>
  `;
}

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}
function escapeAttr(str = "") {
  return escapeHtml(str);
}

// ---------- Contact links (edit these two lines with your real info) ----------
document.getElementById("linkedinLink").href = "https://linkedin.com/in/your-profile";
document.getElementById("emailLink").href = "mailto:your-email@example.com";

// ---------- Init ----------
typeTerminal();
loadProjects();
