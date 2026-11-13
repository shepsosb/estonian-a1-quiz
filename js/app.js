// Main Application Controller for "Tule ja õpi! Eesti keele A1 Viktoriin & Mäng"

(function () {
  const STORAGE_KEY = "estonian_a1_quiz_state_v1";

  const state = {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    answeredCount: 0,
    correctCount: 0,
    completedQuestionIds: {},
    mistakeQuestionIds: {},
    unitProgress: {}, // unitId -> { answered, correct }
    boardPosition: 0, // 0..29 index into BOARD_GAME_TILES
    currentMode: "dashboard", // "dashboard" | "quiz" | "board" | "reference"
    activeFilter: {
      unit: "all",
      type: "all"
    },
    quizQueue: [],
    currentIndex: 0,
    currentQuestion: null,
    selectedMCOption: null,
    hasSubmittedCurrent: false
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.xp = parsed.xp || 0;
        state.streak = parsed.streak || 0;
        state.bestStreak = parsed.bestStreak || 0;
        state.answeredCount = parsed.answeredCount || 0;
        state.correctCount = parsed.correctCount || 0;
        state.completedQuestionIds = parsed.completedQuestionIds || {};
        state.mistakeQuestionIds = parsed.mistakeQuestionIds || {};
        state.unitProgress = parsed.unitProgress || {};
        state.boardPosition = parsed.boardPosition || 0;
      }
    } catch (e) {
      console.warn("Could not load saved state:", e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          xp: state.xp,
          streak: state.streak,
          bestStreak: state.bestStreak,
          answeredCount: state.answeredCount,
          correctCount: state.correctCount,
          completedQuestionIds: state.completedQuestionIds,
          mistakeQuestionIds: state.mistakeQuestionIds,
          unitProgress: state.unitProgress,
          boardPosition: state.boardPosition
        })
      );
    } catch (e) {
      console.warn("Could not save state:", e);
    }
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function getUnitMeta(unitId) {
    return (
      window.WORKBOOK_UNITS.find((u) => u.id === Number(unitId)) || {
        id: unitId,
        number: String(unitId),
        title: `Peatükk ${unitId}`,
        subtitle: "",
        pages: "",
        icon: "📘",
        color: "#2563eb",
        keyTopics: []
      }
    );
  }

  function getQuestionTypeBadge(type) {
    switch (type) {
      case "multiple-choice":
        return { label: "Valikvastus (Multiple Choice)", cls: "badge-mc" };
      case "fill-blank":
        return { label: "Lünktekst (Fill in the Blank)", cls: "badge-fill" };
      case "dialogue":
        return { label: "Dialoog (Dialogue)", cls: "badge-dialogue" };
      case "error-correction":
        return { label: "Paranda viga! (Fix the Error)", cls: "badge-error" };
      case "open-answer":
        return { label: "Vabavastus (Open Answer)", cls: "badge-open" };
      default:
        return { label: type, cls: "badge-mc" };
    }
  }

  function updateHeaderStats() {
    document.getElementById("stat-xp").textContent = state.xp;
    document.getElementById("stat-streak").textContent = state.streak;
    const acc =
      state.answeredCount > 0
        ? Math.round((state.correctCount / state.answeredCount) * 100)
        : 100;
    document.getElementById("stat-accuracy").textContent = `${acc}%`;
    const mistakeCount = Object.keys(state.mistakeQuestionIds).length;
    const mistakeBadge = document.getElementById("mistake-count-badge");
    if (mistakeBadge) {
      mistakeBadge.textContent = mistakeCount;
      mistakeBadge.style.display = mistakeCount > 0 ? "inline-flex" : "none";
    }
  }

  // Switch active view
  function showView(viewName) {
    state.currentMode = viewName;
    document.querySelectorAll(".view-section").forEach((el) => {
      el.classList.remove("active");
    });
    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.add("active");

    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });

    if (viewName === "dashboard") {
      renderDashboard();
    } else if (viewName === "board") {
      renderBoardGame();
    } else if (viewName === "reference") {
      renderGrammarReference();
    }
  }

  // Render Dashboard (Quick Play Modes + 23 Unit Cards)
  function renderDashboard() {
    updateHeaderStats();
    const totalQ = window.WORKBOOK_QUESTIONS.length;
    const masteredQ = Object.keys(state.completedQuestionIds).length;
    const pct = totalQ > 0 ? Math.round((masteredQ / totalQ) * 100) : 0;

    document.getElementById("overall-progress-fill").style.width = `${pct}%`;
    document.getElementById("overall-progress-text").textContent =
      `${masteredQ} / ${totalQ} küsimust läbitud (${pct}%)`;

    const grid = document.getElementById("units-grid");
    grid.innerHTML = "";

    window.WORKBOOK_UNITS.forEach((unit) => {
      const unitQuestions = window.WORKBOOK_QUESTIONS.filter(
        (q) => q.unit === unit.id
      );
      const completedInUnit = unitQuestions.filter(
        (q) => state.completedQuestionIds[q.id]
      ).length;
      const unitPct =
        unitQuestions.length > 0
          ? Math.round((completedInUnit / unitQuestions.length) * 100)
          : 0;

      const card = document.createElement("div");
      card.className = "unit-card";
      card.innerHTML = `
        <div class="unit-card-header">
          <span class="unit-icon" style="background:${unit.color}18; color:${unit.color}">${unit.icon}</span>
          <div class="unit-meta">
            <span class="unit-num">Peatükk ${unit.number} • ${unit.pages}</span>
            <h3 class="unit-title">${unit.title}</h3>
            <p class="unit-subtitle">${unit.subtitle}</p>
          </div>
        </div>
        <ul class="unit-topics">
          ${unit.keyTopics.slice(0, 3).map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="unit-card-footer">
          <div class="unit-prog-wrap">
            <div class="unit-prog-bar">
              <div class="unit-prog-fill" style="width:${unitPct}%; background:${unit.color}"></div>
            </div>
            <span class="unit-prog-label">${completedInUnit}/${unitQuestions.length} tehtud</span>
          </div>
          <button class="btn btn-primary btn-sm start-unit-btn" data-unit="${unit.id}">
            Harjuta →
          </button>
        </div>
      `;
      card
        .querySelector(".start-unit-btn")
        .addEventListener("click", () => startQuiz({ unit: unit.id, type: "all" }));
      grid.appendChild(card);
    });
  }

  // Start a Quiz Session with given filters
  function startQuiz({ unit = "all", type = "all", mistakesOnly = false, customQuestions = null }) {
    state.activeFilter = { unit, type, mistakesOnly };
    let pool = customQuestions || window.WORKBOOK_QUESTIONS.slice();

    if (!customQuestions) {
      if (mistakesOnly) {
        pool = pool.filter((q) => state.mistakeQuestionIds[q.id]);
      }
      if (unit !== "all") {
        pool = pool.filter((q) => q.unit === Number(unit));
      }
      if (type !== "all") {
        pool = pool.filter((q) => q.type === type);
      }
    }

    if (pool.length === 0) {
      alert(
        mistakesOnly
          ? "Sul ei ole praegu ühtegi salvestatud viga! Kõik vead on parandatud! 🎉"
          : "Selle filtri jaoks ei leitud küsimusi."
      );
      return;
    }

    // Prioritize unanswered questions first, then shuffle
    const unanswered = shuffleArray(
      pool.filter((q) => !state.completedQuestionIds[q.id])
    );
    const answered = shuffleArray(
      pool.filter((q) => state.completedQuestionIds[q.id])
    );
    state.quizQueue = [...unanswered, ...answered];
    state.currentIndex = 0;

    showView("quiz");
    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    const q = state.quizQueue[state.currentIndex];
    state.currentQuestion = q;
    state.selectedMCOption = null;
    state.hasSubmittedCurrent = false;

    const unitMeta = getUnitMeta(q.unit);
    const typeBadge = getQuestionTypeBadge(q.type);

    // Update Quiz Top Bar
    document.getElementById("quiz-progress-label").textContent =
      `Küsimus ${state.currentIndex + 1} / ${state.quizQueue.length}`;
    const progPct = Math.round(
      ((state.currentIndex) / state.quizQueue.length) * 100
    );
    document.getElementById("quiz-session-bar").style.width = `${progPct}%`;

    const unitPill = document.getElementById("quiz-unit-pill");
    unitPill.innerHTML = `${unitMeta.icon} Peatükk ${unitMeta.number}: ${unitMeta.title} (${unitMeta.pages})`;

    const typePill = document.getElementById("quiz-type-pill");
    typePill.className = `type-badge ${typeBadge.cls}`;
    typePill.textContent = typeBadge.label;

    // Render unit study tip drawer content
    const studyDrawer = document.getElementById("unit-cheat-sheet-content");
    studyDrawer.innerHTML = `
      <h4>${unitMeta.icon} Peatükk ${unitMeta.number}: ${unitMeta.title} (${unitMeta.pages})</h4>
      <ul>
        ${unitMeta.keyTopics.map((t) => `<li>${t}</li>`).join("")}
      </ul>
    `;

    // Render Question Prompt & Interactive Area
    document.getElementById("question-prompt").textContent = q.prompt;

    const workspace = document.getElementById("question-workspace");
    workspace.innerHTML = "";

    const charBar = document.getElementById("estonian-char-toolbar");
    const needsTyping = q.type !== "multiple-choice";
    charBar.style.display = needsTyping ? "flex" : "none";

    if (q.type === "multiple-choice") {
      if (q.context) {
        const ctxDiv = document.createElement("div");
        ctxDiv.className = "question-context-box";
        ctxDiv.textContent = q.context;
        workspace.appendChild(ctxDiv);
      }

      const optsList = document.createElement("div");
      optsList.className = "mc-options-list";
      const shuffledOpts = shuffleArray(q.options);

      shuffledOpts.forEach((optText, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mc-option-btn";
        btn.dataset.option = optText;
        btn.innerHTML = `
          <span class="mc-key">${idx + 1}</span>
          <span class="mc-text">${optText}</span>
        `;
        btn.addEventListener("click", () => {
          if (state.hasSubmittedCurrent) return;
          state.selectedMCOption = optText;
          optsList.querySelectorAll(".mc-option-btn").forEach((b) => {
            b.classList.toggle("selected", b.dataset.option === optText);
          });
          submitCurrentAnswer();
        });
        optsList.appendChild(btn);
      });
      workspace.appendChild(optsList);
    } else if (q.type === "fill-blank") {
      const box = document.createElement("div");
      box.className = "sentence-prompt-box";
      box.innerHTML = `
        <div class="estonian-sentence">${q.sentence.replace(
          /___/g,
          '<span class="blank-slot">______</span>'
        )}</div>
        ${q.translation ? `<div class="english-translation">🇬🇧 "${q.translation}"</div>` : ""}
      `;
      workspace.appendChild(box);

      const inputWrap = document.createElement("div");
      inputWrap.className = "answer-input-wrap";
      inputWrap.innerHTML = `
        <input type="text" id="user-text-answer" class="text-answer-input" placeholder="Kirjuta puuduv sõna või vorm siia..." autocomplete="off" spellcheck="false" />
        ${q.hint ? `<div class="hint-row"><button type="button" class="btn-link" id="toggle-hint-btn">💡 Näita vihjet (Show hint)</button><span id="hint-text" class="hint-text" style="display:none">${q.hint}</span></div>` : ""}
      `;
      workspace.appendChild(inputWrap);
    } else if (q.type === "dialogue") {
      const dBox = document.createElement("div");
      dBox.className = "dialogue-box";
      q.dialogue.forEach((line) => {
        const row = document.createElement("div");
        row.className = "dialogue-line";
        row.innerHTML = `
          <span class="dialogue-speaker">${line.speaker}:</span>
          <span class="dialogue-utterance">${line.text.replace(
            /___/g,
            '<span class="blank-slot">______</span>'
          )}</span>
        `;
        dBox.appendChild(row);
      });
      workspace.appendChild(dBox);

      const inputWrap = document.createElement("div");
      inputWrap.className = "answer-input-wrap";
      inputWrap.innerHTML = `
        <input type="text" id="user-text-answer" class="text-answer-input" placeholder="Kirjuta puuduv repliik eesti keeles..." autocomplete="off" spellcheck="false" />
        ${q.hint ? `<div class="hint-row"><button type="button" class="btn-link" id="toggle-hint-btn">💡 Näita vihjet (Show hint)</button><span id="hint-text" class="hint-text" style="display:none">${q.hint}</span></div>` : ""}
      `;
      workspace.appendChild(inputWrap);
    } else if (q.type === "error-correction") {
      const errBox = document.createElement("div");
      errBox.className = "error-sentence-box";
      errBox.innerHTML = `
        <div class="error-label">❌ Vigane lause (Incorrect sentence):</div>
        <div class="error-sentence-text">"${q.incorrectSentence}"</div>
      `;
      workspace.appendChild(errBox);

      const inputWrap = document.createElement("div");
      inputWrap.className = "answer-input-wrap";
      inputWrap.innerHTML = `
        <label class="input-label" for="user-text-answer">✏️ Kirjuta parandatud terviklause (Write the corrected full sentence):</label>
        <input type="text" id="user-text-answer" class="text-answer-input" value="${q.incorrectSentence}" autocomplete="off" spellcheck="false" />
        ${q.hint ? `<div class="hint-row"><button type="button" class="btn-link" id="toggle-hint-btn">💡 Näita vihjet (Show hint)</button><span id="hint-text" class="hint-text" style="display:none">${q.hint}</span></div>` : ""}
      `;
      workspace.appendChild(inputWrap);
    } else if (q.type === "open-answer") {
      const openWrap = document.createElement("div");
      openWrap.className = "answer-input-wrap";
      openWrap.innerHTML = `
        <textarea id="user-text-answer" class="open-answer-textarea" rows="3" placeholder="Kirjuta oma vastus eesti keeles siia (nt täislausetega)..."></textarea>
        <div class="open-criteria-preview">
          <span>🎯 <strong>Mida kontrollitakse:</strong> ${(q.openCriteria && q.openCriteria.mustIncludeAnyGroup || []).map((g) => g.label).join(" • ")}</span>
        </div>
      `;
      workspace.appendChild(openWrap);
    }

    // Bind hint toggle and Enter key
    const hintBtn = document.getElementById("toggle-hint-btn");
    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        const ht = document.getElementById("hint-text");
        if (ht) ht.style.display = "inline";
        hintBtn.style.display = "none";
      });
    }

    const inputEl = document.getElementById("user-text-answer");
    if (inputEl) {
      inputEl.focus();
      if (q.type === "error-correction") {
        inputEl.select();
      }
      inputEl.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" && !ev.shiftKey && q.type !== "open-answer") {
          ev.preventDefault();
          if (!state.hasSubmittedCurrent) {
            submitCurrentAnswer();
          } else {
            goToNextQuestion();
          }
        }
      });
    }

    // Reset Action Buttons & Critique Panel
    const submitBtn = document.getElementById("submit-answer-btn");
    const nextBtn = document.getElementById("next-question-btn");
    submitBtn.style.display = q.type === "multiple-choice" ? "none" : "inline-flex";
    nextBtn.style.display = "none";

    const critiquePanel = document.getElementById("critique-panel");
    critiquePanel.style.display = "none";
    critiquePanel.innerHTML = "";
  }

  function submitCurrentAnswer() {
    if (state.hasSubmittedCurrent) return;
    const q = state.currentQuestion;
    if (!q) return;

    let userInput = "";
    if (q.type === "multiple-choice") {
      userInput = state.selectedMCOption;
      if (!userInput) return;
    } else {
      const inputEl = document.getElementById("user-text-answer");
      userInput = inputEl ? inputEl.value : "";
      if (!userInput.trim()) {
        inputEl.focus();
        return;
      }
    }

    state.hasSubmittedCurrent = true;
    const result = window.EstonianCritiqueEngine.evaluate(q, userInput);

    // Update stats & progress
    state.answeredCount += 1;
    if (result.status === "correct") {
      state.correctCount += 1;
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      state.xp += 15 + Math.min(state.streak * 2, 20);
      state.completedQuestionIds[q.id] = true;
      delete state.mistakeQuestionIds[q.id];
    } else if (result.status === "almost") {
      state.correctCount += 0.5;
      state.xp += 8;
      state.mistakeQuestionIds[q.id] = true;
    } else {
      state.streak = 0;
      state.mistakeQuestionIds[q.id] = true;
    }

    saveState();
    updateHeaderStats();

    // Highlight Multiple Choice buttons if MC
    if (q.type === "multiple-choice") {
      document.querySelectorAll(".mc-option-btn").forEach((btn) => {
        const opt = btn.dataset.option;
        if (opt === q.answer) {
          btn.classList.add("mc-correct");
        } else if (opt === userInput && userInput !== q.answer) {
          btn.classList.add("mc-wrong");
        }
      });
    }

    // Render Critique Panel
    renderCritiquePanel(result, q);

    document.getElementById("submit-answer-btn").style.display = "none";
    const nextBtn = document.getElementById("next-question-btn");
    nextBtn.style.display = "inline-flex";
    nextBtn.focus();
  }

  function renderCritiquePanel(result, q) {
    const panel = document.getElementById("critique-panel");
    panel.style.display = "block";
    panel.className = `critique-panel status-${result.status}`;

    const icon =
      result.status === "correct"
        ? "✅"
        : result.status === "almost"
        ? "⚠️"
        : "❌";

    const acceptedList =
      q.acceptedAnswers && q.acceptedAnswers.length > 0
        ? `<div class="accepted-answers-row"><strong>Õige vastus / lubatud vormid:</strong> ${q.acceptedAnswers
            .map((a) => `<code class="ans-chip">${a}</code>`)
            .join(" ")}</div>`
        : "";

    const sampleAnswersHtml =
      result.sampleAnswers && result.sampleAnswers.length > 0
        ? `<div class="sample-answers-box">
            <strong>📖 Näidisvastused tööraamatust (Model Answers):</strong>
            <ul>${result.sampleAnswers.map((s) => `<li>"${s}"</li>`).join("")}</ul>
          </div>`
        : "";

    panel.innerHTML = `
      <div class="critique-header">
        <span class="critique-status-icon">${icon}</span>
        <div class="critique-title-wrap">
          <h4>${result.headline}</h4>
          <div class="visual-diff-box">Sinu vastuse analüüs: ${result.visualDiff}</div>
        </div>
        <span class="score-pill">${result.score}%</span>
      </div>

      ${acceptedList}

      <div class="critique-cards-list">
        ${result.critiques
          .map(
            (c) => `
          <div class="critique-item critique-${c.type}">
            <div class="critique-item-title">${c.title}</div>
            <div class="critique-item-detail">${c.detail}</div>
          </div>
        `
          )
          .join("")}
      </div>

      ${
        result.explanation
          ? `<div class="grammar-rule-box">
              <strong>📚 Tööraamatu reegel (Workbook Rule):</strong> ${result.explanation}
            </div>`
          : ""
      }

      ${sampleAnswersHtml}
    `;
  }

  function goToNextQuestion() {
    if (state.currentIndex + 1 < state.quizQueue.length) {
      state.currentIndex += 1;
      renderCurrentQuestion();
    } else {
      renderSessionComplete();
    }
  }

  function renderSessionComplete() {
    const workspace = document.getElementById("question-workspace");
    document.getElementById("question-prompt").textContent =
      "🎉 Treeningvoor on lõppenud! (Session Complete!)";
    document.getElementById("quiz-session-bar").style.width = "100%";
    document.getElementById("estonian-char-toolbar").style.display = "none";
    document.getElementById("submit-answer-btn").style.display = "none";
    document.getElementById("next-question-btn").style.display = "none";
    document.getElementById("critique-panel").style.display = "none";

    const mistakeCount = Object.keys(state.mistakeQuestionIds).length;
    workspace.innerHTML = `
      <div class="session-complete-card">
        <div class="trophy-icon">🏆</div>
        <h3>Tubli töö! Oled läbinud kõik ${state.quizQueue.length} küsimust selles voorus.</h3>
        <p>Sinu kogutud punktid: <strong>${state.xp} XP</strong> • Parim seeria: <strong>${state.bestStreak} 🔥</strong></p>
        <div class="session-actions">
          <button class="btn btn-primary" id="replay-session-btn">🔄 Mängi uuesti</button>
          ${
            mistakeCount > 0
              ? `<button class="btn btn-warning" id="practice-mistakes-EndBtn">🛠️ Paranda vead (${mistakeCount})</button>`
              : ""
          }
          <button class="btn btn-secondary" id="back-dashboard-btn">🏠 Tagasi teemade juurde</button>
        </div>
      </div>
    `;

    document
      .getElementById("replay-session-btn")
      .addEventListener("click", () => startQuiz(state.activeFilter));
    const mBtn = document.getElementById("practice-mistakes-EndBtn");
    if (mBtn) {
      mBtn.addEventListener("click", () =>
        startQuiz({ unit: "all", type: "all", mistakesOnly: true })
      );
    }
    document
      .getElementById("back-dashboard-btn")
      .addEventListener("click", () => showView("dashboard"));
  }

  // =========================================================================
  // KORDAMINE BOARD GAME MODE (inspired by lk 26, 52, 59, 84–85)
  // =========================================================================
  function renderBoardGame() {
    const container = document.getElementById("board-tiles-grid");
    container.innerHTML = "";

    window.BOARD_GAME_TILES.forEach((tileObj, idx) => {
      const tileEl = document.createElement("div");
      const isCurrent = idx === state.boardPosition;
      const isPassed = idx < state.boardPosition;
      tileEl.className = `board-tile ${isCurrent ? "current-tile" : ""} ${
        isPassed ? "passed-tile" : ""
      }`;
      const unitMeta = getUnitMeta(tileObj.unit);
      tileEl.innerHTML = `
        <div class="tile-top">
          <span class="tile-num">#${tileObj.tile}</span>
          <span class="tile-unit-icon">${unitMeta.icon}</span>
        </div>
        <div class="tile-label">${tileObj.label}</div>
        ${isCurrent ? '<div class="player-token">🧑‍🎓 SINA</div>' : ""}
      `;
      tileEl.addEventListener("click", () => {
        openBoardTileQuestion(idx);
      });
      container.appendChild(tileEl);
    });

    const curTile = window.BOARD_GAME_TILES[state.boardPosition];
    document.getElementById("board-status-text").innerHTML =
      `Asud ruudul <strong>#${curTile.tile}: ${curTile.label}</strong> (Peatükk ${curTile.unit}). Veereta täringut või klõpsa ruudul, et vastata!`;
  }

  function rollDiceAndPlay() {
    const roll = Math.floor(Math.random() * 3) + 1; // 1 to 3 steps so user experiences plenty of tiles
    const nextPos = Math.min(
      window.BOARD_GAME_TILES.length - 1,
      state.boardPosition + roll
    );
    state.boardPosition = nextPos;
    saveState();
    renderBoardGame();

    const diceOut = document.getElementById("dice-result-badge");
    diceOut.textContent = `🎲 Veeretasid: +${roll} sammu → Ruut #${window.BOARD_GAME_TILES[nextPos].tile}`;
    diceOut.style.display = "inline-block";

    setTimeout(() => {
      openBoardTileQuestion(nextPos);
    }, 550);
  }

  function openBoardTileQuestion(tileIdx) {
    state.boardPosition = tileIdx;
    saveState();
    const tileObj = window.BOARD_GAME_TILES[tileIdx];
    const q =
      window.WORKBOOK_QUESTIONS.find((item) => item.id === tileObj.questionId) ||
      window.WORKBOOK_QUESTIONS[tileIdx % window.WORKBOOK_QUESTIONS.length];
    startQuiz({ customQuestions: [q] });
  }

  // =========================================================================
  // GRAMMAR REFERENCE VIEW (I/II/III forms + 14 Cases from lk 87–88)
  // =========================================================================
  function renderGrammarReference(searchQuery = "") {
    const qLow = searchQuery.trim().toLowerCase();
    const tbodyForms = document.getElementById("ref-noun-forms-body");
    tbodyForms.innerHTML = "";

    window.GRAMMAR_REFERENCE.nounForms
      .filter(
        (row) =>
          !qLow ||
          row.i.toLowerCase().includes(qLow) ||
          row.ii.toLowerCase().includes(qLow) ||
          row.iii.toLowerCase().includes(qLow) ||
          row.en.toLowerCase().includes(qLow)
      )
      .forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${row.i}</strong></td>
          <td><code>${row.ii}</code></td>
          <td><code>${row.iii}</code></td>
          <td>${row.en}</td>
          <td class="ref-note">${row.note}</td>
        `;
        tbodyForms.appendChild(tr);
      });

    const tbodyCases = document.getElementById("ref-cases-body");
    tbodyCases.innerHTML = "";
    window.GRAMMAR_REFERENCE.cases.forEach((c) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${c.num}. <strong>${c.name}</strong></td>
        <td><code>${c.question}</code></td>
        <td><span class="case-ending-chip">${c.ending}</span></td>
        <td>${c.example}</td>
      `;
      tbodyCases.appendChild(tr);
    });
  }

  // Insert special character into active text input
  function insertEstonianChar(ch) {
    const input = document.getElementById("user-text-answer");
    if (!input) return;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const val = input.value;
    input.value = val.slice(0, start) + ch + val.slice(end);
    input.focus();
    input.setSelectionRange(start + ch.length, start + ch.length);
  }

  // Initialize Event Listeners
  function init() {
    loadState();
    updateHeaderStats();

    // Navigation Tabs
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        showView(btn.dataset.view);
      });
    });

    // Quick Play Mode Buttons on Dashboard
    document
      .getElementById("mode-all-mixed-btn")
      .addEventListener("click", () => startQuiz({ unit: "all", type: "all" }));

    document
      .getElementById("mode-open-error-btn")
      .addEventListener("click", () => {
        const subset = window.WORKBOOK_QUESTIONS.filter(
          (q) => q.type === "open-answer" || q.type === "error-correction"
        );
        startQuiz({ customQuestions: shuffleArray(subset) });
      });

    document
      .getElementById("mode-fill-dialogue-btn")
      .addEventListener("click", () => {
        const subset = window.WORKBOOK_QUESTIONS.filter(
          (q) => q.type === "fill-blank" || q.type === "dialogue"
        );
        startQuiz({ customQuestions: shuffleArray(subset) });
      });

    document
      .getElementById("mode-mistakes-btn")
      .addEventListener("click", () =>
        startQuiz({ unit: "all", type: "all", mistakesOnly: true })
      );

    // Filter Bar controls on Dashboard
    document
      .getElementById("start-filtered-quiz-btn")
      .addEventListener("click", () => {
        const uVal = document.getElementById("filter-unit-select").value;
        const tVal = document.getElementById("filter-type-select").value;
        startQuiz({ unit: uVal, type: tVal });
      });

    // Populate Unit Select Dropdown
    const unitSelect = document.getElementById("filter-unit-select");
    window.WORKBOOK_UNITS.forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = `${u.number}. ${u.title} (${u.pages})`;
      unitSelect.appendChild(opt);
    });

    // Quiz Controls
    document
      .getElementById("submit-answer-btn")
      .addEventListener("click", submitCurrentAnswer);
    document
      .getElementById("next-question-btn")
      .addEventListener("click", goToNextQuestion);
    document
      .getElementById("quiz-back-btn")
      .addEventListener("click", () => showView("dashboard"));

    // Toggle Unit Cheat Sheet Drawer inside Quiz
    document
      .getElementById("toggle-cheat-sheet-btn")
      .addEventListener("click", () => {
        const box = document.getElementById("unit-cheat-sheet-content");
        box.style.display = box.style.display === "none" ? "block" : "none";
      });

    // Estonian Character Buttons
    document.querySelectorAll(".char-btn").forEach((btn) => {
      btn.addEventListener("click", () => insertEstonianChar(btn.dataset.char));
    });

    // Board Game Controls
    document
      .getElementById("roll-dice-btn")
      .addEventListener("click", rollDiceAndPlay);
    document
      .getElementById("reset-board-btn")
      .addEventListener("click", () => {
        state.boardPosition = 0;
        saveState();
        renderBoardGame();
      });

    // Grammar Reference Search
    const searchInput = document.getElementById("ref-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        renderGrammarReference(e.target.value);
      });
    }

    renderDashboard();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
