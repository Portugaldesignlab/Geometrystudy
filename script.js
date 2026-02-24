const spaces = [
  {
    eyebrow: "Year 1 · Discovery Atrium",
    title: "Observe the World Through a Product Lens",
    description:
      "You enter a bright atrium where student projects float like constellations. This space invites curiosity and empathy as you identify real people, real needs, and real constraints.",
    questions: [
      "Which user group in your campus community feels underserved right now?",
      "What observations from your studio classes changed how you define a problem?",
      "How did your first research interview challenge your assumptions?"
    ]
  },
  {
    eyebrow: "Year 1 · Methods Lab",
    title: "Build Your Research Compass",
    description:
      "In this laboratory, walls respond to your notes and sketches. Every method you choose—interviews, field studies, diary logs—shapes the quality of your design direction.",
    questions: [
      "Which research method helped you uncover emotional user needs, not just functional ones?",
      "Where did bias appear in your process, and how can you reduce it next time?",
      "How will you translate findings into actionable design criteria?"
    ]
  },
  {
    eyebrow: "Year 2 · Prototyping Corridor",
    title: "Turn Insight Into Tangible Experiences",
    description:
      "A corridor of shifting prototypes surrounds you: paper interfaces, physical mockups, and service blueprints. The journey rewards fast iteration and constructive critique.",
    questions: [
      "What did your roughest prototype teach you that polished screens could not?",
      "How did feedback from peers or tutors alter your interaction flows?",
      "What evidence shows your design is becoming more inclusive and accessible?"
    ]
  },
  {
    eyebrow: "Year 3 · Systems Dome",
    title: "Design Within Ecosystems",
    description:
      "Inside a vast dome, each design decision ripples across sustainability, ethics, business models, and policy. You learn to balance desirability, feasibility, and viability.",
    questions: [
      "Which stakeholders beyond end users are affected by your concept?",
      "How does your project reduce harm or increase long-term social value?",
      "What trade-offs are you willing to make—and which are non-negotiable?"
    ]
  },
  {
    eyebrow: "Final Year · Launch Deck",
    title: "Articulate Your Designer Identity",
    description:
      "You arrive at the launch deck, where your capstone story becomes visible in every direction. This final space asks you to connect your portfolio, values, and professional future.",
    questions: [
      "How has your definition of good product design evolved during your degree?",
      "Which strengths now define your contribution in multidisciplinary teams?",
      "What type of impact do you want your first post-graduation role to create?"
    ]
  }
];

const template = document.querySelector("#spaceTemplate");
const spaceContainer = document.querySelector("#spaceContainer");
const progressLabel = document.querySelector("#progressLabel");
const progressFill = document.querySelector("#progressFill");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let currentSpaceIndex = 0;

function renderSpace(index) {
  const space = spaces[index];
  const node = template.content.cloneNode(true);

  node.querySelector(".space-eyebrow").textContent = space.eyebrow;
  node.querySelector(".space-title").textContent = space.title;
  node.querySelector(".space-description").textContent = space.description;

  const list = node.querySelector(".question-set ul");
  list.innerHTML = "";
  space.questions.forEach((question) => {
    const li = document.createElement("li");
    li.textContent = question;
    list.appendChild(li);
  });

  spaceContainer.innerHTML = "";
  spaceContainer.appendChild(node);

  progressLabel.textContent = `Space ${index + 1} of ${spaces.length}`;
  progressFill.style.width = `${((index + 1) / spaces.length) * 100}%`;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === spaces.length - 1;
}

prevBtn.addEventListener("click", () => {
  if (currentSpaceIndex > 0) {
    currentSpaceIndex -= 1;
    renderSpace(currentSpaceIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentSpaceIndex < spaces.length - 1) {
    currentSpaceIndex += 1;
    renderSpace(currentSpaceIndex);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextBtn.click();
  if (event.key === "ArrowLeft") prevBtn.click();
});

renderSpace(currentSpaceIndex);
