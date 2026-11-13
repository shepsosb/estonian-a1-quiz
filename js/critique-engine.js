// Estonian A1 Linguistic & Grammar Critique Engine
// Analyzes learner answers across Multiple Choice, Fill-in-the-Blank, Dialogue,
// Error Correction, and Open-Ended responses, identifying specifically what is
// correct and what is incorrect (diacritics, case endings, I/II/III forms, verb conjugation).

window.EstonianCritiqueEngine = (function () {
  function normalizeText(str) {
    return (str || "")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.!?]+$/g, "")
      .trim();
  }

  function stripDiacriticsEstonian(str) {
    return (str || "")
      .replace(/[õö]/gi, (m) => (m === m.toUpperCase() ? "O" : "o"))
      .replace(/ä/gi, (m) => (m === m.toUpperCase() ? "A" : "a"))
      .replace(/ü/gi, (m) => (m === m.toUpperCase() ? "U" : "u"))
      .replace(/š/gi, (m) => (m === m.toUpperCase() ? "S" : "s"))
      .replace(/ž/gi, (m) => (m === m.toUpperCase() ? "Z" : "z"));
  }

  // Levenshtein edit distance for typo detection
  function editDistance(a, b) {
    const s1 = a.toLowerCase();
    const s2 = b.toLowerCase();
    const dp = Array.from({ length: s1.length + 1 }, () =>
      new Array(s2.length + 1).fill(0)
    );
    for (let i = 0; i <= s1.length; i++) dp[i][0] = i;
    for (let j = 0; j <= s2.length; j++) dp[0][j] = j;
    for (let i = 1; i <= s1.length; i++) {
      for (let j = 1; j <= s2.length; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[s1.length][s2.length];
  }

  // Build visual character/word diff HTML between user input and target answer
  function buildVisualDiff(userStr, targetStr) {
    const uWords = normalizeText(userStr).split(" ").filter(Boolean);
    const tWords = normalizeText(targetStr).split(" ").filter(Boolean);

    if (uWords.length === 0) {
      return `<span class="diff-err">(tühi vastus / empty answer)</span>`;
    }

    // Compare word by word
    const maxLen = Math.max(uWords.length, tWords.length);
    const parts = [];
    for (let i = 0; i < maxLen; i++) {
      const uw = uWords[i];
      const tw = tWords[i];
      if (!uw && tw) {
        parts.push(`<span class="diff-missing" title="Missing word: ${tw}">[+${tw}]</span>`);
      } else if (uw && !tw) {
        parts.push(`<span class="diff-err" title="Extra word">${uw}</span>`);
      } else if (uw.toLowerCase() === tw.toLowerCase()) {
        parts.push(`<span class="diff-ok">${uw}</span>`);
      } else if (
        stripDiacriticsEstonian(uw).toLowerCase() ===
        stripDiacriticsEstonian(tw).toLowerCase()
      ) {
        parts.push(
          `<span class="diff-warn" title="Diacritic mismatch: expected '${tw}'">${uw} → <strong>${tw}</strong></span>`
        );
      } else {
        // Highlight character-level matching prefix vs differing suffix (great for Estonian case endings!)
        let prefixLen = 0;
        const minW = Math.min(uw.length, tw.length);
        while (
          prefixLen < minW &&
          uw[prefixLen].toLowerCase() === tw[prefixLen].toLowerCase()
        ) {
          prefixLen++;
        }
        if (prefixLen >= 2) {
          const stem = uw.slice(0, prefixLen);
          const badEnd = uw.slice(prefixLen);
          const goodEnd = tw.slice(prefixLen);
          parts.push(
            `<span class="diff-stem">${stem}</span><span class="diff-err" title="Wrong ending/form">${badEnd || "∅"}</span><span class="diff-fix" title="Correct ending">(${goodEnd})</span>`
          );
        } else {
          parts.push(
            `<span class="diff-err">${uw}</span> <span class="diff-fix">(${tw})</span>`
          );
        }
      }
    }
    return parts.join(" ");
  }

  // Check if user confused I, II, or III vorm from GRAMMAR_REFERENCE.nounForms
  function diagnoseNounFormConfusion(userNorm, targetNorm) {
    const forms = (window.GRAMMAR_REFERENCE && window.GRAMMAR_REFERENCE.nounForms) || [];
    const uLow = userNorm.toLowerCase();
    const tLow = targetNorm.toLowerCase();

    for (const entry of forms) {
      const allForms = [
        { label: "I vorm (Nimetav — kes? mis?)", val: entry.i },
        { label: "II vorm (Omastav — kelle? mille?)", val: entry.ii },
        { label: "III vorm (Osastav — keda? mida?)", val: entry.iii }
      ];
      const targetMatch = allForms.find((f) => f.val === tLow);
      const userMatch = allForms.find((f) => f.val === uLow && f.val !== tLow);
      if (targetMatch && userMatch) {
        return `Sa kasutasid sõna <strong>"${entry.i}" (${entry.en})</strong> vormi <strong>${userMatch.label}: "${userNorm}"</strong>, kuid siin on vaja <strong>${targetMatch.label}: "${targetNorm}"</strong> (${entry.note}).`;
      }
    }
    return null;
  }

  // Automated morphological diagnosis for fill-in-the-blank & dialogue
  function diagnoseMorphologicalError(userStr, targetStr, question) {
    const critiques = [];
    const uLow = normalizeText(userStr).toLowerCase();
    const tLow = normalizeText(targetStr).toLowerCase();

    // 1. Check hand-crafted commonErrors first
    if (question.commonErrors) {
      for (const [errKey, errMsg] of Object.entries(question.commonErrors)) {
        if (uLow === errKey.toLowerCase()) {
          critiques.push({
            type: "specific-trap",
            title: "Täpne veadiagnoos (Specific Error Identified)",
            detail: errMsg
          });
        }
      }
    }

    // 2. Check Estonian diacritic mismatch (õ, ä, ö, ü, š, ž)
    if (
      uLow !== tLow &&
      stripDiacriticsEstonian(uLow) === stripDiacriticsEstonian(tLow)
    ) {
      const missingChars = [];
      for (let i = 0; i < tLow.length; i++) {
        if (uLow[i] !== tLow[i]) {
          missingChars.push(`'${uLow[i]}' → '${tLow[i]}'`);
        }
      }
      critiques.push({
        type: "diacritic",
        title: "Eesti täpitähed (Estonian Special Letters: õ, ä, ö, ü)",
        detail: `Sõna tüvi ja kääne on õiged, kuid täpitäht on puudu või vale: <strong>${missingChars.join(", ")}</strong>. Eesti keeles muudavad täpitähed sõna tähendust ja hääldust — kasuta ekraanil olevaid nuppe (õ, ä, ö, ü)!`
      });
    }

    // 3. Check I / II / III vorm confusion
    const formDiag = diagnoseNounFormConfusion(uLow, tLow);
    if (formDiag) {
      critiques.push({
        type: "noun-form",
        title: "Käändevormi viga (I, II ja III vorm)",
        detail: formDiag
      });
    }

    // 4. Check -s vs -l location case confusion
    if (
      (uLow.endsWith("s") && tLow.endsWith("l") && uLow.slice(0, -1) === tLow.slice(0, -1)) ||
      (uLow.endsWith("l") && tLow.endsWith("s") && uLow.slice(0, -1) === tLow.slice(0, -1))
    ) {
      const usedEnding = uLow.endsWith("s") ? "-s (Seesütlev)" : "-l (Alalütlev)";
      const neededEnding = tLow.endsWith("s") ? "-s (Seesütlev)" : "-l (Alalütlev)";
      critiques.push({
        type: "case-ending",
        title: `Kohakääne: ${usedEnding} vs ${neededEnding}`,
        detail: `Sa kasutasid lõppu <strong>${usedEnding}</strong> ("${userStr}"), kuid see sõna nõuab lõppu <strong>${neededEnding}</strong> ("${targetStr}"). Pea meeles (Unit 12 & 14): -maa, -mäe, -järve kohanimed ning sündmused/pinnad (tööl, peol, turul, kontserdil, koosolekul) võtavad lõpu <strong>-l</strong>; enamik linnu ja siseruume (Tallinnas, Soomes, poes, koolis, kodus) võtavad lõpu <strong>-s</strong>.`
      });
    }

    // 5. Check negation 'ei' + conjugated verb ending
    if (/\bei\s+\w+(n|d|b|me|te|vad)\b/i.test(uLow)) {
      critiques.push({
        type: "negation",
        title: "Eituse reegel (Negation Rule after 'ei')",
        detail: `Eesti keeles <strong>ei lisata</strong> sõna "ei" järel tegusõnale pöördelõppu (-n, -d, -b, -me, -te, -vad)! Kirjuta <strong>"${targetStr}"</strong> (mitte "${userStr}").`
      });
    }

    // 6. Check close spelling typo (edit distance 1-2) if no other critique fired
    if (critiques.length === 0) {
      const dist = editDistance(uLow, tLow);
      if (dist > 0 && dist <= 2) {
        critiques.push({
          type: "typo",
          title: "Väike kirjaviga või lõpumuutus (Close Spelling / Ending Mismatch)",
          detail: `Sinu vastus <strong>"${userStr}"</strong> on väga lähedal õigele vastusele <strong>"${targetStr}"</strong> (${dist} tähe erinevus). Kontrolli sõnalõppu või sulghääliku (k, p, t ↔ g, b, d) astmevaheldust!`
        });
      } else {
        critiques.push({
          type: "mismatch",
          title: "Vale vorm või sõna (Incorrect Word or Form)",
          detail: `Sinu vastus oli <strong>"${userStr || "(tühi)"}"</strong>, aga oodatud vastus on <strong>"${targetStr}"</strong>.`
        });
      }
    }

    return critiques;
  }

  // Evaluate Multiple Choice
  function evaluateMultipleChoice(question, selectedOption) {
    const isCorrect = selectedOption === question.answer;
    const specificFeedback =
      (question.optionCritiques && question.optionCritiques[selectedOption]) ||
      (isCorrect ? "Õige vastus!" : `Vale valik. Õige vastus on: "${question.answer}".`);

    const critiques = [
      {
        type: isCorrect ? "correct" : "specific-trap",
        title: isCorrect
          ? "Miks see vastus on õige (Why this is correct)"
          : `Miks "${selectedOption}" ei sobi (Why your choice is incorrect)`,
        detail: specificFeedback
      }
    ];

    if (!isCorrect && question.optionCritiques && question.optionCritiques[question.answer]) {
      critiques.push({
        type: "rule",
        title: `Õige valik: "${question.answer}"`,
        detail: question.optionCritiques[question.answer]
      });
    }

    return {
      status: isCorrect ? "correct" : "incorrect",
      score: isCorrect ? 100 : 0,
      headline: isCorrect ? "Suurepärane! Õige vastus!" : "See valik ei ole õige.",
      visualDiff: isCorrect
        ? `<span class="diff-ok">${selectedOption}</span>`
        : `<span class="diff-err">${selectedOption}</span> → <span class="diff-ok">${question.answer}</span>`,
      critiques,
      explanation: question.explanation
    };
  }

  // Evaluate Fill-in-the-blank, Dialogue, and Error Correction
  function evaluateExactOrAcceptable(question, userInput) {
    const userNorm = normalizeText(userInput);
    const accepted = question.acceptedAnswers || [question.answer];

    // 1. Exact match (case-insensitive)
    const exactMatch = accepted.find(
      (ans) => normalizeText(ans).toLowerCase() === userNorm.toLowerCase()
    );

    if (exactMatch) {
      // Check if capitalization mattered (e.g. nationality written with capital mid-sentence)
      return {
        status: "correct",
        score: 100,
        headline: "Tubli! Täpselt õige!",
        visualDiff: `<span class="diff-ok">${userInput.trim()}</span>`,
        critiques: [
          {
            type: "correct",
            title: "Vorm ja õigekiri on 100% õiged!",
            detail: `Sinu vastus <strong>"${userInput.trim()}"</strong> vastab täpselt tööraamatu vormile.`
          }
        ],
        explanation: question.explanation
      };
    }

    // 2. Check diacritic-only match (almost correct!)
    const diacriticMatch = accepted.find(
      (ans) =>
        stripDiacriticsEstonian(normalizeText(ans)).toLowerCase() ===
        stripDiacriticsEstonian(userNorm).toLowerCase()
    );

    const bestTarget = diacriticMatch || accepted[0];
    const critiques = diagnoseMorphologicalError(userNorm, normalizeText(bestTarget), question);

    // For error-correction questions, also check if the user left the original error untouched
    if (
      question.type === "error-correction" &&
      question.targetErrorWord &&
      userNorm.toLowerCase().includes(question.targetErrorWord.toLowerCase())
    ) {
      critiques.unshift({
        type: "specific-trap",
        title: "Viga jäi lausesse alles (Error Still Present)",
        detail: `Lauses on endiselt vigane koht <strong>"${question.targetErrorWord}"</strong>. See tuleb asendada vormiga <strong>"${question.targetCorrection}"</strong>.`
      });
    }

    if (diacriticMatch) {
      return {
        status: "almost",
        score: 80,
        headline: "Peaaegu õige! Kontrolli eesti täpitähti (õ, ä, ö, ü).",
        visualDiff: buildVisualDiff(userNorm, normalizeText(diacriticMatch)),
        critiques,
        explanation: question.explanation
      };
    }

    return {
      status: "incorrect",
      score: 0,
      headline: "Vajab parandamist — vaata täpset analüüsi allpool:",
      visualDiff: buildVisualDiff(userNorm, normalizeText(bestTarget)),
      critiques,
      explanation: question.explanation
    };
  }

  // Deep Grammar & Content Evaluator for Open-Ended Estonian Answers
  function evaluateOpenAnswer(question, userInput) {
    const raw = (userInput || "").trim();
    const norm = normalizeText(raw);
    const words = norm.split(/\s+/).filter(Boolean);
    const criteria = question.openCriteria || {};
    const critiques = [];
    const positives = [];
    let penalties = 0;

    if (words.length < (criteria.minWords || 2)) {
      return {
        status: "incorrect",
        score: 0,
        headline: "Vastus on liiga lühike (Answer is too short).",
        visualDiff: `<span class="diff-err">${raw || "(tühi vastus)"}</span>`,
        critiques: [
          {
            type: "mismatch",
            title: "Kirjuta täislause(d) eesti keeles!",
            detail: `See ülesanne ootab vähemalt ${criteria.minWords || 3} sõna pikkust eestikeelset vastust. Vaata allolevaid näidisvastuseid!`
          }
        ],
        sampleAnswers: question.sampleAnswers,
        explanation: question.explanation
      };
    }

    // 1. Check required semantic/structural groups
    const groups = criteria.mustIncludeAnyGroup || [];
    for (const grp of groups) {
      const matched = grp.patterns.some((rx) => rx.test(raw));
      if (matched) {
        positives.push(`✔ Sisaldab nõutud osa: <strong>${grp.label}</strong>`);
      } else {
        penalties += 35;
        critiques.push({
          type: "missing-part",
          title: `Puudub või on vigane osa: ${grp.label}`,
          detail: `Me ei leidnud sinu vastusest oodatud mustrit: <em>${grp.label}</em>. Kontrolli sõnavara ja käänet!`
        });
      }
    }

    // 2. Run specific Estonian A1 Grammar Rules on the free-form text
    const checks = criteria.grammarChecks || [];

    // Rule A: Never conjugate verb after 'ei' (e.g., 'ma ei räägin', 'ma ei olen', 'ta ei oskab')
    const eiConjMatch = raw.match(
      /\bei\s+(olen|oled|oskan|oskad|oskab|räägin|räägid|räägib|söön|sööd|sööb|joon|jood|joob|elavad|elan|elad|elab|magan|magad|magab|mängin|mängib|teen|teed|teeb|käin|käib|töötan|töötab)\b/i
    );
    if (eiConjMatch) {
      penalties += 25;
      const badPhrase = eiConjMatch[0];
      const stemMap = {
        olen: "ole", oled: "ole", oskan: "oska", oskad: "oska", oskab: "oska",
        räägin: "räägi", räägid: "räägi", räägib: "räägi", söön: "söö", sööd: "söö", sööb: "söö",
        joon: "joo", jood: "joo", joob: "joo", elan: "ela", elad: "ela", elab: "ela", elavad: "ela",
        magan: "maga", magad: "maga", magab: "maga", mängin: "mängi", mängib: "mängi",
        teen: "tee", teed: "tee", teeb: "tee", käin: "käi", käib: "käi", töötan: "tööta", töötab: "tööta"
      };
      const verbLow = eiConjMatch[1].toLowerCase();
      const fixed = "ei " + (stemMap[verbLow] || verbLow.replace(/(n|d|b|vad)$/, ""));
      critiques.push({
        type: "negation",
        title: `Eituse viga: "${badPhrase}" → "${fixed}"`,
        detail: `Eesti keeles ei ole sõna <strong>"ei"</strong> järel pöördelõppu (-n, -d, -b, -vad). Kirjuta <strong>"${fixed}"</strong>!`
      });
    }

    // Rule B: 'räägin / oskan ... keel' (nominative 'keel' instead of partitive 'keelt')
    if (checks.includes("keelt_partitive")) {
      if (/\b(räägin|oskan|õpin)\b[^.!?]*\bkeel\b/i.test(raw)) {
        penalties += 25;
        critiques.push({
          type: "noun-form",
          title: 'Käändeviga: "keel" → "keelt" (III vorm / Osastav)',
          detail: 'Tegusõnade <em>räägin</em>, <em>oskan</em> ja <em>õpin</em> järel peab sõna "keel" olema III vormis (Osastav): <strong>"Ma räägin eesti keelt"</strong> (mitte "eesti keel").'
        });
      }
      // Check capitalized language name mid-sentence (e.g., 'Ma räägin Eesti keelt' or 'Inglise keelt')
      const capLangMatch = raw.match(/\b(räägin|oskan|õpin)\s+([A-ZÕÄÖÜ][a-zõäöü]+)\s+keelt\b/);
      if (capLangMatch) {
        penalties += 10;
        critiques.push({
          type: "orthography",
          title: `Algustähe reegel: "${capLangMatch[2]} keelt" → "${capLangMatch[2].toLowerCase()} keelt"`,
          detail: `Eesti keeles kirjutatakse keelte ja rahvuste nimetused lause sees <strong>väikese algustähega</strong>: nt <em>eesti keelt, inglise keelt, eestlane</em>.`
        });
      }
    }

    // Rule C: 'pärit' + -maa country with -st instead of -lt, or missing case
    if (checks.includes("parit_case")) {
      const maaStMatch = raw.match(/\bpärit\s+(\w+maa)st\b/i);
      if (maaStMatch) {
        penalties += 25;
        critiques.push({
          type: "case-ending",
          title: `Kohakääne: "pärit ${maaStMatch[1]}st" → "pärit ${maaStMatch[1]}lt"`,
          detail: `Riigid, mis lõppevad sõnaga <strong>-maa</strong> (Saksamaa, Venemaa, Prantsusmaa, Inglismaa, Iirimaa), võtavad küsimusele <em>Kust?</em> vastates lõpu <strong>-lt</strong>: <strong>"${maaStMatch[1]}lt"</strong>.`
        });
      }
    }

    // Rule D: Food/drink after 'söön' or 'joon' in I vorm instead of III vorm
    if (checks.includes("food_partitive_after_soon_joon")) {
      const foodPairs = [
        { nom: "kohv", part: "kohvi" },
        { nom: "tee", part: "teed" },
        { nom: "vesi", part: "vett" },
        { nom: "piim", part: "piima" },
        { nom: "keefir", part: "keefirit" },
        { nom: "mahl", part: "mahla" },
        { nom: "apelsinimahl", part: "apelsinimahla" },
        { nom: "leib", part: "leiba" },
        { nom: "võileib", part: "võileiba" },
        { nom: "sai", part: "saia" },
        { nom: "puder", part: "putru" },
        { nom: "jogurt", part: "jogurtit" },
        { nom: "müsli", part: "müslit" },
        { nom: "salat", part: "salatit" },
        { nom: "kartul", part: "kartulit" },
        { nom: "supp", part: "suppi" },
        { nom: "kook", part: "kooki" },
        { nom: "šokolaad", part: "šokolaadi" },
        { nom: "jäätis", part: "jäätist" },
        { nom: "juust", part: "juustu" },
        { nom: "vorst", part: "vorsti" },
        { nom: "õun", part: "õuna" }
      ];
      for (const fp of foodPairs) {
        const rx = new RegExp(`\\b(söön|joon)\\b[^.!?]*\\b${fp.nom}\\b`, "i");
        if (rx.test(raw)) {
          penalties += 25;
          critiques.push({
            type: "noun-form",
            title: `Sihitise kääne (III vorm): "${fp.nom}" → "${fp.part}"`,
            detail: `Tegusõnade <strong>söön</strong> ja <strong>joon</strong> järel peab toit või jook olema <strong>III vormis (Osastav)</strong>: kirjuta <strong>"${fp.part}"</strong> (mitte I vorm "${fp.nom}").`
          });
        }
      }
    }

    // Rule E: Weather 'vihm sajab / lumi sajab' instead of 'vihma sajab / lund sajab'
    if (checks.includes("weather_sajab_partitive")) {
      if (/\b(vihm|lumi|lörts)\s+sajab\b|\bsajab\s+(vihm|lumi|lörts)\b/i.test(raw)) {
        penalties += 25;
        critiques.push({
          type: "noun-form",
          title: 'Ilma väljend: "Vihma sajab / Lund sajab" (III vorm)',
          detail: 'Sõna <em>sajab</em> juures on sademed <strong>III vormis (Osastav)</strong>: <strong>"Vihma sajab"</strong> (mitte "vihm sajab") ja <strong>"Lund sajab"</strong> (mitte "lumi sajab").'
        });
      }
    }

    // Rule F: Family numbers ('kaks vend' or 'kaks vennad' or 'ei ole vend')
    if (checks.includes("family_number_partitive")) {
      if (/\b(kaks|kolm|neli|mitu|ei\s+ole)\s+(vend|vennad|poeg|pojad|tütar|tütred|laps|lapsed)\b/i.test(raw)) {
        penalties += 25;
        critiques.push({
          type: "noun-form",
          title: "Arvsõna (2+) ja eituse järel on III vorm (Osastav)!",
          detail: 'Numbrite <em>kaks, kolm...</em> ja eituse <em>mul ei ole...</em> järel kasutatakse ainsuse III vormi: <strong>kaks venda, kaks poega, kaks tütart, kolm last, mul ei ole venda</strong> (mitte I vorm ega "-d" mitmus!).'
        });
      }
    }

    // Rule G: 'Lähme' + Kus (-s/-l) instead of Kuhu
    if (checks.includes("lahme_kuhu_case")) {
      const badKuhu = raw.match(/\b(lähme|läheme)\s+(kohvikus|restoranis|poes|kinos|kodus|tööl|peol|turul|loomaaias)\b/i);
      if (badKuhu) {
        penalties += 25;
        const mapKuhu = {
          kohvikus: "kohvikusse", restoranis: "restorani", poes: "poodi",
          kinos: "kinno", kodus: "koju", tööl: "tööle", peol: "peole",
          turul: "turule", loomaaias: "loomaaeda"
        };
        const wrongW = badKuhu[2].toLowerCase();
        critiques.push({
          type: "case-ending",
          title: `Kus? vs Kuhu?: "Lähme ${badKuhu[2]}" → "Lähme ${mapKuhu[wrongW]}"`,
          detail: `Sõna <strong>"Lähme..."</strong> (Let's go...) nõuab sihtkoha käänet (<strong>Kuhu?</strong>), mitte asukoha käänet (Kus?): kasuta <strong>"${mapKuhu[wrongW]}"</strong>!`
        });
      }
    }

    // Rule H: Common ASCII-for-diacritic substitutions in open answers
    if (checks.includes("estonian_diacritics")) {
      const asciiMistakes = [
        { bad: /\bsoon\b/i, good: "söön" },
        { bad: /\bsoome\s+midagi\b/i, good: "sööme midagi" },
        { bad: /\bohtul\b/i, good: "õhtul" },
        { bad: /\bpaeval\b/i, good: "päeval" },
        { bad: /\bopin\b/i, good: "õpin" },
        { bad: /\braagin\b/i, good: "räägin" },
        { bad: /\btootan\b/i, good: "töötan" },
        { bad: /\btool\b/i, good: "tööl" },
        { bad: /\bhasti\b/i, good: "hästi" },
        { bad: /\bvaga\b/i, good: "väga" },
        { bad: /\bvaike\b/i, good: "väike" },
        { bad: /\bode\b/i, good: "õde" },
        { bad: /\bkohogis\b|\bkoogis\b/i, good: "köögis" },
        { bad: /\bvoileiba\b/i, good: "võileiba" },
        { bad: /\bjaatist\b/i, good: "jäätist" },
        { bad: /\blahme\b/i, good: "lähme" },
        { bad: /\bparit\b/i, good: "pärit" },
        { bad: /\bpaike\b/i, good: "päike" },
        { bad: /\bkulm\b/i, good: "külm" },
        { bad: /\btuhi\b/i, good: "tühi" }
      ];
      const foundAscii = [];
      for (const item of asciiMistakes) {
        const m = raw.match(item.bad);
        if (m) {
          foundAscii.push(`"${m[0]}" → <strong>"${item.good}"</strong>`);
        }
      }
      if (foundAscii.length > 0) {
        penalties += 15;
        critiques.push({
          type: "diacritic",
          title: "Täpitähed puudu (Missing Estonian Diacritics: õ, ä, ö, ü)",
          detail: `Pane tähele täpitähti: ${foundAscii.join(", ")}. Võid sisestamiseks kasutada tekstikasti kohal olevaid täpitähtede nuppe!`
        });
      }
    }

    const finalScore = Math.max(0, 100 - penalties);
    let status = "correct";
    let headline = "Suurepärane! Sinu vabavastus on grammatiliselt ja sisuliselt õige!";

    if (finalScore < 100 && finalScore >= 65) {
      status = "almost";
      headline = "Väga hea katse! Sisu on olemas, kuid vaata grammatika/täpitähtede soovitusi:";
    } else if (finalScore < 65) {
      status = "incorrect";
      headline = "Vastus vajab täiendamist — vaata allolevat kriitikat:";
    }

    if (positives.length > 0) {
      critiques.unshift({
        type: "correct",
        title: "Mis oli sinu vastuses hästi (What you got right)",
        detail: positives.join("<br>")
      });
    }

    return {
      status,
      score: finalScore,
      headline,
      visualDiff:
        status === "correct"
          ? `<span class="diff-ok">${raw}</span>`
          : `<span class="diff-warn">${raw}</span>`,
      critiques,
      sampleAnswers: question.sampleAnswers,
      explanation: question.explanation
    };
  }

  function evaluate(question, userInput) {
    if (!question) return null;
    if (question.type === "multiple-choice") {
      return evaluateMultipleChoice(question, userInput);
    }
    if (question.type === "open-answer") {
      return evaluateOpenAnswer(question, userInput);
    }
    return evaluateExactOrAcceptable(question, userInput);
  }

  return {
    evaluate,
    buildVisualDiff,
    normalizeText
  };
})();
