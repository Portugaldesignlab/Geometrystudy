const stages = [
  {
    name: "Discovery Atrium",
    title: "Observe & Frame",
    description:
      "Map user context, institutional constraints, and systemic pain points before proposing any feature direction.",
    questions: [
      "What hidden behavior patterns emerge across contexts?",
      "Which assumptions still lack evidence?",
      "How does higher-education culture shape user motivation?"
    ]
  },
  {
    name: "Methods Lab",
    title: "Evidence Architecture",
    description:
      "Operationalize research by selecting rigorous methods and linking findings to clear decision criteria.",
    questions: [
      "How will you triangulate qualitative and quantitative evidence?",
      "What reliability risks appear in your sampling strategy?",
      "Which insights are strong enough to become design requirements?"
    ]
  },
  {
    name: "Prototyping Corridor",
    title: "Rapid Iteration",
    description:
      "Prototype interactions as hypotheses, then stress-test accessibility, clarity, and task completion.",
    questions: [
      "Which interaction caused the highest cognitive load?",
      "What invalidated your initial flow logic?",
      "Which accessibility fixes delivered the highest impact?"
    ]
  },
  {
    name: "Systems Dome",
    title: "Strategic Systems Thinking",
    description:
      "Evaluate product decisions through ethics, sustainability, service operations, and business feasibility.",
    questions: [
      "Which stakeholder gains are offset by operational costs?",
      "How does your concept behave at institutional scale?",
      "Where can governance constraints break the experience?"
    ]
  },
  {
    name: "Launch Deck",
    title: "Identity & Impact",
    description:
      "Synthesize the full journey into portfolio narrative, measurable outcomes, and professional positioning.",
    questions: [
      "Which metric best proves value creation?",
      "How has your designer identity matured technically?",
      "What strategic contribution do you bring to multidisciplinary teams?"
    ]
  }
];

const toolkit = [
  { phase: "Research", title: "Contextual Inquiry Matrix", output: "Behavior map with evidence confidence score" },
  { phase: "Research", title: "JTBD Tension Model", output: "Outcome-driven opportunity map" },
  { phase: "Ideation", title: "Morphological Interaction Grid", output: "Option set with constraint analysis" },
  { phase: "Prototyping", title: "Task-Flow Stress Test", output: "Failure-state inventory" },
  { phase: "Prototyping", title: "Accessibility Heuristic Pass", output: "WCAG gap report with severity" },
  { phase: "Strategy", title: "Service Blueprint Layering", output: "Frontstage-backstage dependency model" },
  { phase: "Strategy", title: "Risk and Ethics Register", output: "Governance and mitigation plan" }
];

const factors = [
  { id: "desirability", label: "Desirability", value: 60 },
  { id: "feasibility", label: "Feasibility", value: 50 },
  { id: "viability", label: "Viability", value: 55 },
  { id: "ethics", label: "Ethical Integrity", value: 72 }
];

const timeline = document.querySelector("#timeline");
const spaceCard = document.querySelector("#spaceCard");
const progressLabel = document.querySelector("#progressLabel");
const progressFill = document.querySelector("#progressFill");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const startJourney = document.querySelector("#startJourney");
const openSimulator = document.querySelector("#openSimulator");
const sliderGroup = document.querySelector("#sliderGroup");
const readinessValue = document.querySelector("#readinessValue");
const readinessLabel = document.querySelector("#readinessLabel");
const recommendations = document.querySelector("#recommendations");
const phaseFilters = document.querySelector("#phaseFilters");
const toolCards = document.querySelector("#toolCards");
const reflectionForm = document.querySelector("#reflectionForm");
const reflectionOutput = document.querySelector("#reflectionOutput");

let stageIndex = 0;
let activePhase = "All";

function renderTimeline() {
  timeline.innerHTML = "";
  stages.forEach((stage, index) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `stage-chip ${index === stageIndex ? "active" : ""}`;
    chip.textContent = `${index + 1}. ${stage.name}`;
    chip.addEventListener("click", () => {
      stageIndex = index;
      renderStage();
    });
    timeline.appendChild(chip);
  });
}

function renderStage() {
  const stage = stages[stageIndex];
  spaceCard.classList.add("entering");

  setTimeout(() => {
    spaceCard.innerHTML = `
      <p class="eyebrow">${stage.name}</p>
      <h3>${stage.title}</h3>
      <p>${stage.description}</p>
      <h4>Critical prompts</h4>
      <ul>${stage.questions.map((q) => `<li>${q}</li>`).join("")}</ul>
    `;
    spaceCard.classList.remove("entering");
  }, 130);

  progressLabel.textContent = `Stage ${stageIndex + 1} / ${stages.length}`;
  progressFill.style.width = `${((stageIndex + 1) / stages.length) * 100}%`;
  prevBtn.disabled = stageIndex === 0;
  nextBtn.disabled = stageIndex === stages.length - 1;
  renderTimeline();
}

function setupSimulator() {
  sliderGroup.innerHTML = "";
  factors.forEach((factor) => {
    const card = document.createElement("article");
    card.className = "slider-card";
    card.innerHTML = `
      <label for="${factor.id}">${factor.label}<span id="${factor.id}-value">${factor.value}</span></label>
      <input id="${factor.id}" type="range" min="0" max="100" value="${factor.value}" />
    `;
    card.querySelector("input").addEventListener("input", (e) => {
      factor.value = Number(e.target.value);
      card.querySelector("span").textContent = factor.value;
      evaluateReadiness();
    });
    sliderGroup.appendChild(card);
  });
  evaluateReadiness();
}

function evaluateReadiness() {
  const weighted =
    factors.find((f) => f.id === "desirability").value * 0.3 +
    factors.find((f) => f.id === "feasibility").value * 0.25 +
    factors.find((f) => f.id === "viability").value * 0.25 +
    factors.find((f) => f.id === "ethics").value * 0.2;

  const score = Math.round(weighted);
  readinessValue.textContent = score;

  let posture = "Balanced exploration posture.";
  if (score >= 80) posture = "High readiness: move toward pilot implementation.";
  else if (score < 50) posture = "Low readiness: reframe assumptions and gather stronger evidence.";

  readinessLabel.textContent = posture;

  recommendations.innerHTML = "";
  const weakest = [...factors].sort((a, b) => a.value - b.value).slice(0, 2);
  weakest.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `Increase ${item.label} via a targeted experiment.`;
    recommendations.appendChild(li);
  });
}

function renderToolkitFilters() {
  const phases = ["All", ...new Set(toolkit.map((item) => item.phase))];
  phaseFilters.innerHTML = "";

  phases.forEach((phase) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `filter-chip ${phase === activePhase ? "active" : ""}`;
    chip.textContent = phase;
    chip.addEventListener("click", () => {
      activePhase = phase;
      renderToolkitFilters();
      renderToolkitCards();
    });
    phaseFilters.appendChild(chip);
  });
}

function renderToolkitCards() {
  toolCards.innerHTML = "";
  const visible = activePhase === "All" ? toolkit : toolkit.filter((item) => item.phase === activePhase);

  visible.forEach((item) => {
    const card = document.createElement("article");
    card.className = "tool-card";
    card.innerHTML = `
      <span class="tag">${item.phase}</span>
      <h3>${item.title}</h3>
      <p>${item.output}</p>
    `;
    toolCards.appendChild(card);
  });
}

function setupReflection() {
  reflectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const challenge = document.querySelector("#challengeInput").value.trim();
    const evidence = document.querySelector("#evidenceInput").value;
    const action = document.querySelector("#actionInput").value.trim();

    reflectionOutput.hidden = false;
    reflectionOutput.innerHTML = `
      <h3>Generated Reflection Memo</h3>
      <p><strong>Challenge framing:</strong> ${challenge}</p>
      <p><strong>Evidence anchor:</strong> ${evidence}</p>
      <p><strong>Next experimental action:</strong> ${action}</p>
      <p><strong>Academic synthesis:</strong> The proposed action should be evaluated using measurable success criteria and peer critique to maintain methodological rigor.</p>
    `;
  });
}

function setupActions() {
  prevBtn.addEventListener("click", () => {
    if (stageIndex > 0) {
      stageIndex -= 1;
      renderStage();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (stageIndex < stages.length - 1) {
      stageIndex += 1;
      renderStage();
    }
  });

  startJourney.addEventListener("click", () => {
    document.querySelector("#journey").scrollIntoView({ behavior: "smooth" });
  });

  openSimulator.addEventListener("click", () => {
    document.querySelector("#simulator").scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") nextBtn.click();
    if (event.key === "ArrowLeft") prevBtn.click();
  });
}

function drawGrid() {
  const canvas = document.querySelector("#bgGrid");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const spacing = 36;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.strokeStyle = "rgba(129, 157, 255, 0.14)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= window.innerWidth; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, window.innerHeight);
    ctx.stroke();
  }

  for (let y = 0; y <= window.innerHeight; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(window.innerWidth, y);
    ctx.stroke();
  }
}

window.addEventListener("resize", drawGrid);

renderTimeline();
renderStage();
setupSimulator();
renderToolkitFilters();
renderToolkitCards();
setupReflection();
setupActions();
drawGrid();
