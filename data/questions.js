// Comprehensive Question Bank from "Tule ja õpi! Eesti keele tööraamat A1-tase"
// Question types:
// - "multiple-choice": Multiple choice with per-option specific critique (optionCritiques)
// - "fill-blank": Fill in the blank with targeted error diagnostics (commonErrors + rule tags)
// - "dialogue": Dialogue completion from workbook exercises
// - "error-correction": Fix the mistake in a sentence (including Unit 10.7 silly sentences & grammar errors)
// - "open-answer": Open-ended Estonian response evaluated by the linguistic critique engine

window.WORKBOOK_QUESTIONS = [
  // =========================================================================
  // UNIT 1: Tere! Nägemist! (lk 3–6)
  // =========================================================================
  {
    id: "u1-q1",
    unit: 1,
    type: "multiple-choice",
    prompt: "It is 8:30 in the morning. How do you greet someone in Estonian? (Unit 1, lk 3)",
    context: "Time of day: 08:30 (hommik)",
    options: [
      "Tere hommikust!",
      "Tere õhtust!",
      "Head ööd!",
      "Head aega!"
    ],
    answer: "Tere hommikust!",
    optionCritiques: {
      "Tere hommikust!": "Õige! 'Tere hommikust!' means 'Good morning!' (literally 'Hello from the morning!').",
      "Tere õhtust!": "'Tere õhtust!' means 'Good evening!' ('õhtu' = evening), not morning ('hommik').",
      "Head ööd!": "'Head ööd!' means 'Good night!' and is used when going to sleep, not as a morning greeting.",
      "Head aega!": "'Head aega!' means 'Goodbye!', not 'Good morning!'."
    },
    explanation: "In Estonian, time-of-day greetings use the elative (-st) ending: Tere hommikust! (morning), Tere päevast! (day/afternoon), Tere õhtust! (evening)."
  },
  {
    id: "u1-q2",
    unit: 1,
    type: "dialogue",
    prompt: "Complete the apology dialogue at the hairdresser's from Unit 1 (lk 5, harjutus 9):",
    dialogue: [
      { speaker: "Klient", text: "Ai!" },
      { speaker: "Juuksur", text: "___! (Excuse me / Sorry!)" },
      { speaker: "Klient", text: "Pole viga!" }
    ],
    acceptedAnswers: ["Vabandust", "Vabandust!", "Palun vabandust", "Palun vabandust!", "Oi, palun vabandust!"],
    hint: "Starts with V... (or 'Palun v...')",
    grammarTags: ["politeness"],
    commonErrors: {
      "aitäh": "'Aitäh!' means 'Thank you!'. When apologizing, use 'Vabandust!' or 'Palun vabandust!'.",
      "palun": "'Palun!' alone means 'Please / Here you go / You're welcome'. To say 'Excuse me / I'm sorry', say 'Vabandust!' or 'Palun vabandust!'.",
      "pole midagi": "'Pole midagi!' is the reply ('No problem!'), not the apology itself."
    },
    explanation: "'Vabandust!' or 'Palun vabandust!' is used to apologize. The other person replies 'Pole viga!' or 'Pole midagi!' (No problem / Never mind)."
  },
  {
    id: "u1-q3",
    unit: 1,
    type: "fill-blank",
    prompt: "Complete the polite response when someone apologizes (Unit 1, lk 5, harjutus 8):",
    sentence: "Naine: Oi, palun vabandust! — Mees: Pole ___!",
    translation: "Woman: Oh, I'm sorry! — Man: No problem / Never mind!",
    acceptedAnswers: ["viga", "midagi"],
    hint: "'Pole v...' or 'Pole m...'",
    grammarTags: ["politeness"],
    commonErrors: {
      "tänu": "In Estonian, the standard phrases from Unit 1 are 'Pole viga!' (No harm done) or 'Pole midagi!' (It's nothing).",
      "hästi": "'Hästi' means 'well/good'. After 'Pole...', use 'viga' or 'midagi'."
    },
    explanation: "Both 'Pole viga!' and 'Pole midagi!' are used in Unit 1 (lk 5) to mean 'No problem! / Never mind!'."
  },
  {
    id: "u1-q4",
    unit: 1,
    type: "multiple-choice",
    prompt: "Your friend is eating lunch. What do you say to wish them 'Bon appétit / Enjoy your meal'? (Unit 1, lk 4 & lk 85 #16)",
    options: [
      "Head isu!",
      "Terviseks!",
      "Väga meeldiv!",
      "Nii ja naa."
    ],
    answer: "Head isu!",
    optionCritiques: {
      "Head isu!": "Õige! 'Head isu!' means 'Good appetite / Enjoy your meal!'.",
      "Terviseks!": "'Terviseks!' means 'Cheers!' (when clinking glasses) or 'Bless you!', not 'Enjoy your meal!'.",
      "Väga meeldiv!": "'Väga meeldiv!' means 'Nice to meet you!' when introducing yourself.",
      "Nii ja naa.": "'Nii ja naa' means 'So-so' in response to 'Kuidas läheb?'."
    },
    explanation: "'Head isu!' (partitive of 'hea isu' = good appetite) is said before or during a meal."
  },
  {
    id: "u1-q5",
    unit: 1,
    type: "open-answer",
    prompt: "Someone meets you, says 'Tere! Mina olen Liisa. Kes sina oled? Kuidas läheb?' — Write a polite response in Estonian introducing yourself and saying how you are doing! (Unit 1, lk 3–6)",
    sampleAnswers: [
      "Tere! Mina olen Toomas. Väga meeldiv! Mul läheb hästi, aitäh! Aga sul?",
      "Tere! Ma olen Anna. Väga meeldiv. Hästi! Aga sul?"
    ],
    openCriteria: {
      minWords: 3,
      mustIncludeAnyGroup: [
        {
          label: "Self-introduction ('Mina olen...' or 'Ma olen...' or 'Minu nimi on...')",
          patterns: [/\b(mina\s+olen|ma\s+olen|minu\s+nimi\s+on)\s+\w+/i]
        },
        {
          label: "How you are doing ('hästi', 'väga hästi', 'suurepäraselt', 'normaalselt', 'nii ja naa', 'halvasti')",
          patterns: [/\b(suurepäraselt|väga\s+hästi|hästi|normaalselt|nii\s+ja\s+naa|halvasti)\b/i]
        }
      ],
      grammarChecks: ["estonian_diacritics", "no_ei_conjugated"]
    },
    explanation: "A complete response introduces yourself ('Mina olen [Nimi]. Väga meeldiv!') and answers how you're doing ('Väga hästi! / Hästi! / Normaalselt! Aga sul?')."
  },

  // =========================================================================
  // UNIT 2: Täht, sõna, number (lk 7–9)
  // =========================================================================
  {
    id: "u2-q1",
    unit: 2,
    type: "fill-blank",
    prompt: "Solve the math problem from Unit 2 (lk 8, harjutus 4) and write the Estonian number word:",
    sentence: "9 + 4 = ___ (kirjuta sõnaga)",
    translation: "9 + 4 = 13 (write in words)",
    acceptedAnswers: ["kolmteist"],
    hint: "3 (kolm) + -teist",
    grammarTags: ["numbers"],
    commonErrors: {
      "13": "Please write the number as an Estonian word ('kolmteist') rather than digits!",
      "kolmkümmend": "'Kolmkümmend' is 30 (-kümmend = tens). Teen numbers (11–19) end in '-teist': 13 = 'kolmteist'.",
      "kolm teist": "In Estonian, teen numbers (11–19) are written as a single compound word: 'kolmteist'."
    },
    explanation: "Numbers 11–19 are formed by adding '-teist' to the base number as one word: 3 (kolm) + teist = kolmteist (13)."
  },
  {
    id: "u2-q2",
    unit: 2,
    type: "multiple-choice",
    prompt: "How do you write the number 256 in Estonian words? (Unit 2, lk 8)",
    options: [
      "kakssada viiskümmend kuus",
      "kaks sada viisteist kuus",
      "kakskümmend viis kuus",
      "kakssada viiskümmend kuusteist"
    ],
    answer: "kakssada viiskümmend kuus",
    optionCritiques: {
      "kakssada viiskümmend kuus": "Õige! 'kakssada' (200, written as one word) + 'viiskümmend' (50) + 'kuus' (6).",
      "kaks sada viisteist kuus": "Two errors: hundreds are written as one word ('kakssada', not 'kaks sada'), and 'viisteist' is 15, whereas 50 is 'viiskümmend'.",
      "kakskümmend viis kuus": "'kakskümmend' is 20, not 200 ('kakssada').",
      "kakssada viiskümmend kuusteist": "'kuusteist' is 16; the last digit of 256 is 6 ('kuus')."
    },
    explanation: "In Estonian, hundreds are written together ('kakssada' = 200), tens end in '-kümmend' ('viiskümmend' = 50), and units follow ('kuus' = 6). Note that thousands are written separately ('kaks tuhat' = 2000)."
  },
  {
    id: "u2-q3",
    unit: 2,
    type: "fill-blank",
    prompt: "Complete the question asking for someone's last name (surname) in Unit 2 (lk 9, harjutus 5):",
    sentence: "Mis sinu ___ on? — Minu perekonnanimi on Mets.",
    translation: "What is your last name? — My last name is Mets.",
    acceptedAnswers: ["perekonnanimi"],
    hint: "perekonna (family) + nimi (name)",
    grammarTags: ["vocabulary"],
    commonErrors: {
      "eesnimi": "'eesnimi' means 'first name' (e.g., Andres). Since the answer is 'Minu perekonnanimi on Mets', the question asks for 'perekonnanimi' (surname).",
      "nimi": "While 'nimi' means 'name', the specific answer 'Minu perekonnanimi on Mets' corresponds to 'perekonnanimi' (last name/surname)."
    },
    explanation: "In Unit 2 (lk 9): 'nimi' = full name, 'eesnimi' = first name, 'perekonnanimi' = surname / family name."
  },
  {
    id: "u2-q4",
    unit: 2,
    type: "multiple-choice",
    prompt: "How is the letter 'W' pronounced in the Estonian alphabet? (Unit 2, lk 8, harjutus 3)",
    options: [
      "kaksisvee",
      "topeltvee",
      "šaa",
      "igrek"
    ],
    answer: "kaksisvee",
    optionCritiques: {
      "kaksisvee": "Õige! In the Estonian alphabet (lk 8), W is called 'kaksisvee' (double-V).",
      "topeltvee": "In standard Estonian alphabet tables (lk 8), W is officially named 'kaksisvee'.",
      "šaa": "'šaa' is the pronunciation of the letter Š.",
      "igrek": "'igrek' is the pronunciation of the letter Y."
    },
    explanation: "From Unit 2 (lk 8): W = [kaksisvee], Š = [šaa], Ž = [žee], X = [iks], Y = [igrek], Q = [kuu]."
  },

  // =========================================================================
  // UNIT 3: Tule siia! (lk 10–11)
  // =========================================================================
  {
    id: "u3-q1",
    unit: 3,
    type: "dialogue",
    prompt: "Complete the classroom dialogue when Triinu didn't hear or understand what Paul said (Unit 3, lk 11, harjutus 4):",
    dialogue: [
      { speaker: "Paul", text: "Palun tõuse püsti!" },
      { speaker: "Triinu", text: "___? (Pardon? / How please?)" },
      { speaker: "Paul", text: "Tõuse püsti!" }
    ],
    acceptedAnswers: ["Kuidas palun", "Kuidas palun?", "Ma ei saa aru", "Ma ei saa aru."],
    hint: "'Kuidas p...?' (Pardon?) or 'Ma ei saa a...'",
    grammarTags: ["classroom"],
    commonErrors: {
      "mis see on": "'Mis see on?' means 'What is this?' (pointing to an object). To ask someone to repeat what they said, use 'Kuidas palun?'.",
      "ma ei tea": "'Ma ei tea' means 'I don't know', whereas here Triinu asks Paul to repeat his instruction ('Kuidas palun?')."
    },
    explanation: "'Kuidas palun?' (Pardon? / Excuse me, what did you say?) and 'Ma ei saa aru.' (I don't understand) are the key phrases in Unit 3 (lk 11)."
  },
  {
    id: "u3-q2",
    unit: 3,
    type: "multiple-choice",
    prompt: "Which imperative phrase means 'Come here!' in Estonian? (Unit 3, lk 10–11)",
    options: [
      "Tule siia!",
      "Tõuse püsti!",
      "Kirjuta siia allkiri!",
      "Oota!"
    ],
    answer: "Tule siia!",
    optionCritiques: {
      "Tule siia!": "Õige! 'Tule' (Come!) + 'siia' (to here) = 'Come here!'.",
      "Tõuse püsti!": "'Tõuse püsti!' means 'Stand up!'.",
      "Kirjuta siia allkiri!": "'Kirjuta siia allkiri!' means 'Write your signature here!'.",
      "Oota!": "'Oota!' means 'Wait!'."
    },
    explanation: "Key imperatives in Unit 3: Tule siia! (Come here!), Tõuse püsti! (Stand up!), Oota! (Wait!), Vaata! (Look!), Kuula! (Listen!), Kirjuta! (Write!), Loe! (Read!)."
  },
  {
    id: "u3-q3",
    unit: 3,
    type: "fill-blank",
    prompt: "How do you say 'I don't understand' in Estonian? (Unit 3, lk 11 & Kordamine lk 85 #67)",
    sentence: "Vabandust, ma ei ___ aru.",
    translation: "Sorry, I don't understand.",
    acceptedAnswers: ["saa"],
    hint: "Verb 'saama' in negative stem ('ei ...')",
    grammarTags: ["negation", "classroom"],
    commonErrors: {
      "saan": "Grammar trap! After 'ei' (negation), Estonian NEVER uses the '-n' person ending. Use the bare stem 'saa' ('ma ei saa aru'), not 'saan'!",
      "tea": "'Ma ei tea' means 'I don't know'. The idiom with 'aru' is 'aru saama' → 'Ma ei saa aru' (I don't understand)."
    },
    explanation: "'Aru saama' means 'to understand'. In the negative, use 'ei + saa': 'Ma ei saa aru.'"
  },

  // =========================================================================
  // UNIT 4: Mis kell on? (lk 12–14)
  // =========================================================================
  {
    id: "u4-q1",
    unit: 4,
    type: "multiple-choice",
    prompt: "The clock shows 7:15 (or 19:15). How do you say this time in Estonian using the 'veerand' system taught in Unit 4 (lk 12)?",
    context: "7.15 / 19.15",
    options: [
      "Kell on veerand kaheksa.",
      "Kell on veerand seitse.",
      "Kell on pool kaheksa.",
      "Kell on kolmveerand kaheksa."
    ],
    answer: "Kell on veerand kaheksa.",
    optionCritiques: {
      "Kell on veerand kaheksa.": "Õige! In Estonian, 7:15 is 'a quarter of the 8th hour' → 'veerand kaheksa' (looks ahead to the NEXT hour, 8!).",
      "Kell on veerand seitse.": "Classic trap! In Estonian, 'veerand seitse' means 6:15 (a quarter toward 7). For 7:15, you must name the NEXT hour: 'veerand kaheksa'!",
      "Kell on pool kaheksa.": "'Pool kaheksa' is 7:30 (halfway to 8), not 7:15.",
      "Kell on kolmveerand kaheksa.": "'Kolmveerand kaheksa' is 7:45 (three-quarters toward 8), not 7:15."
    },
    explanation: "Estonian time expressions look toward the UPCOMING hour: 7:15 = veerand kaheksa (1/4 toward 8); 7:30 = pool kaheksa (1/2 toward 8); 7:45 = kolmveerand kaheksa (3/4 toward 8)."
  },
  {
    id: "u4-q2",
    unit: 4,
    type: "fill-blank",
    prompt: "Write the time in words (Unit 4, lk 12, harjutus 1):",
    sentence: "6.30 — Kell on ___ ___.",
    translation: "It is 6:30 (half seven).",
    acceptedAnswers: ["pool seitse"],
    hint: "half (pool) + the next hour after 6",
    grammarTags: ["time"],
    commonErrors: {
      "pool kuus": "Watch out for the hour! 'Pool kuus' means 5:30 (halfway to 6). At 6:30, you are halfway to 7, so it is 'pool seitse'!",
      "kuus kolmkümmend": "In Unit 4 (lk 12), times at :30 use 'pool + [next hour]': 'pool seitse'."
    },
    explanation: "At 6:30, thirty minutes of the 7th hour have passed, so Estonian says 'Kell on pool seitse' (half seven)."
  },
  {
    id: "u4-q3",
    unit: 4,
    type: "fill-blank",
    prompt: "Write the time in words (Unit 4, lk 12, harjutus 1):",
    sentence: "8.45 — Kell on ___ ___.",
    translation: "It is 8:45 (three-quarters toward nine).",
    acceptedAnswers: ["kolmveerand üheksa"],
    hint: "kolmveerand + the next hour after 8",
    grammarTags: ["time"],
    commonErrors: {
      "kolmveerand kaheksa": "'Kolmveerand kaheksa' is 7:45! For 8:45, you look ahead to the next hour (9 = üheksa): 'kolmveerand üheksa'.",
      "veerand üheksa": "'Veerand üheksa' is 8:15 (one quarter toward 9). 8:45 is three quarters toward 9: 'kolmveerand üheksa'."
    },
    explanation: ":45 is expressed as 'kolmveerand' (three-quarters) + the upcoming hour: 8.45 = 'Kell on kolmveerand üheksa'."
  },
  {
    id: "u4-q4",
    unit: 4,
    type: "multiple-choice",
    prompt: "If someone says 'Kell on veerand üks', what time is it on a digital clock? (Unit 4, lk 12 & Unit 10, lk 41)",
    options: [
      "12.15",
      "1.15",
      "12.45",
      "12.30"
    ],
    answer: "12.15",
    optionCritiques: {
      "12.15": "Õige! 'Veerand üks' means one quarter of the way toward 1:00, which is 12:15!",
      "1.15": "1.15 is 'veerand kaks' (one quarter toward 2:00). 'Veerand üks' is 15 minutes before 12:30, i.e., 12:15!",
      "12.45": "12.45 is 'kolmveerand üks' (three-quarters toward 1:00).",
      "12.30": "12.30 is 'pool üks' (halfway toward 1:00)."
    },
    explanation: "From page 41: 12.00 = kell kaksteist, 12.15 = kell veerand üks, 12.30 = kell pool üks, 12.45 = kell kolmveerand üks."
  },

  // =========================================================================
  // UNIT 5: Mis päev täna on? Mis kuu praegu on? (lk 15–16)
  // =========================================================================
  {
    id: "u5-q1",
    unit: 5,
    type: "fill-blank",
    prompt: "Complete the sequence of days from Unit 5 (lk 15, harjutus 1):",
    sentence: "Täna on kolmapäev. Eile oli teisipäev. Homme on ___.",
    translation: "Today is Wednesday. Yesterday was Tuesday. Tomorrow is Thursday.",
    acceptedAnswers: ["neljapäev"],
    hint: "The 4th day of the week (neli -> nelja...)",
    grammarTags: ["days"],
    commonErrors: {
      "reede": "'Reede' is Friday. The day after 'kolmapäev' (Wednesday, 3rd day) is 'neljapäev' (Thursday, 4th day).",
      "esmaspäev": "'Esmaspäev' is Monday (1st day)."
    },
    explanation: "Estonian weekdays are numbered from 1 to 4: esmaspäev (1st), teisipäev (2nd), kolmapäev (3rd), neljapäev (4th), followed by reede (Friday), laupäev (Saturday), pühapäev (Sunday)."
  },
  {
    id: "u5-q2",
    unit: 5,
    type: "dialogue",
    prompt: "Complete Pille and Paul's conversation about the weekend (Unit 5, lk 16, harjutus 3):",
    dialogue: [
      { speaker: "Pille", text: "Siis on varsti nädalavahetus." },
      { speaker: "Paul", text: "Just." },
      { speaker: "Pille", text: "Laupäev ja ___." },
      { speaker: "Paul", text: "Mh-mh. Ja siis on jälle esmaspäev." }
    ],
    acceptedAnswers: ["pühapäev", "pühapäev!"],
    hint: "Sunday in Estonian",
    grammarTags: ["days"],
    commonErrors: {
      "reede": "'Reede' is Friday. The weekend ('nädalavahetus') consists of 'laupäev' (Saturday) and 'pühapäev' (Sunday)."
    },
    explanation: "'Nädalavahetus' (weekend) is 'laupäev' (Saturday) and 'pühapäev' (Sunday)."
  },
  {
    id: "u5-q3",
    unit: 5,
    type: "multiple-choice",
    prompt: "Put the four seasons in order starting from winter, just as on page 15: 'Praegu on talv. Siis on ___. Siis on suvi. Siis on sügis.'",
    options: [
      "kevad",
      "sügis",
      "nädalavahetus",
      "märts"
    ],
    answer: "kevad",
    optionCritiques: {
      "kevad": "Õige! 'talv' (winter) → 'kevad' (spring) → 'suvi' (summer) → 'sügis' (autumn).",
      "sügis": "'sügis' is autumn (after 'suvi'). Between 'talv' and 'suvi' comes 'kevad' (spring).",
      "nädalavahetus": "'nädalavahetus' means 'weekend', not a season.",
      "märts": "'märts' is a month (March), whereas the sentence lists the four seasons ('aastaajad')."
    },
    explanation: "The four seasons (aastaajad) are: talv (winter), kevad (spring), suvi (summer), sügis (autumn)."
  },

  // =========================================================================
  // UNIT 6: Maa, keel ja rahvus (lk 17–21)
  // =========================================================================
  {
    id: "u6-q1",
    unit: 6,
    type: "multiple-choice",
    prompt: "How do you say 'I am from Germany' in Estonian? Pay close attention to the case ending! (Unit 6, lk 17)",
    options: [
      "Ma olen pärit Saksamaalt.",
      "Ma olen pärit Saksamaast.",
      "Ma olen pärit Saksamaal.",
      "Ma olen pärit sakslane."
    ],
    answer: "Ma olen pärit Saksamaalt.",
    optionCritiques: {
      "Ma olen pärit Saksamaalt.": "Õige! Countries ending in '-maa' (Saksamaa, Venemaa, Prantsusmaa, Inglismaa, Iirimaa) take the '-lt' (Alaltütlev) ending for 'from': 'Saksamaalt'.",
      "Ma olen pärit Saksamaast.": "Case trap! While most countries use '-st' (Eestist, Soomest, Itaaliast), countries ending in '-maa' (land) use the exterior case '-lt': 'Saksamaalt', NOT 'Saksamaast'!",
      "Ma olen pärit Saksamaal.": "'Saksamaal' (-l) means 'IN Germany' (Kus?). After 'pärit' (from where? Kust?), you need '-lt': 'Saksamaalt'.",
      "Ma olen pärit sakslane.": "'sakslane' means 'a German (person)'. You say 'Ma olen sakslane', or 'Ma olen pärit Saksamaalt'."
    },
    explanation: "Most countries take '-st' after 'pärit' (Eestist, Brasiiliast, Hispaaniast), but countries ending in '-maa' (Saksamaa, Venemaa, Prantsusmaa, Inglismaa) take '-lt' (Saksamaalt, Venemaalt)!"
  },
  {
    id: "u6-q2",
    unit: 6,
    type: "fill-blank",
    prompt: "Complete the negative sentence from Unit 6 (lk 17–18):",
    sentence: "Ma räägin eesti keelt, aga ma ei ___ vene keelt.",
    translation: "I speak Estonian, but I don't speak Russian.",
    acceptedAnswers: ["räägi"],
    hint: "Negative form of 'räägin' (remember: no '-n' after 'ei', and 'k-p-t' / 'g-b-d' gradation!)",
    grammarTags: ["negation", "verbs"],
    commonErrors: {
      "räägin": "Grammar error! After the negative word 'ei', Estonian drops the '-n' person ending. Never say 'ei räägin' — use 'ei räägi'!",
      "räägib": "After 'ei', all persons (ma, sa, ta, me, te, nad) use the exact same negative stem without person endings: 'ei räägi'.",
      "oskan": "After 'ei', you cannot use the '-n' ending ('ei oska' or 'ei räägi'). Here the verb is 'rääkima' → 'ei räägi'."
    },
    explanation: "In Estonian present tense negation (lk 18): Mina räägin → Mina ei räägi; Sina räägid → Sina ei räägi; Tema räägib → Tema ei räägi."
  },
  {
    id: "u6-q3",
    unit: 6,
    type: "fill-blank",
    prompt: "Fill in the nationality (rahvus) for someone from Finland (Soome) (Unit 6, lk 20, harjutus 6):",
    sentence: "Maa: Soome — Keel: soome keel — Rahvus: ___",
    translation: "Country: Finland — Language: Finnish — Nationality: Finn",
    acceptedAnswers: ["soomlane"],
    hint: "soom + -lane (note that 'e' drops before '-lane'!)",
    grammarTags: ["nationality"],
    commonErrors: {
      "soomelane": "Watch the stem change! The 'e' in 'Soome' drops before '-lane': 'soomlane' (not 'soomelane').",
      "Soomlane": "Note: In Estonian, nationalities ('eestlane', 'soomlane', 'inglane') and languages are written with a lowercase first letter unless starting a sentence!"
    },
    explanation: "Soome → soome keel → soomlane (just like Rootsi → rootsi keel → rootslane; Eesti → eesti keel → eestlane)."
  },
  {
    id: "u6-q4",
    unit: 6,
    type: "error-correction",
    prompt: "Find and fix the grammar error in this sentence about languages and origin (Unit 6, lk 17–18):",
    incorrectSentence: "Ta on pärit Brasiiliast ja ta ei oskab portugali keelt.",
    acceptedAnswers: [
      "Ta on pärit Brasiiliast ja ta ei oska portugali keelt.",
      "Ta on pärit Brasiiliast ja ta ei oska portugali keelt"
    ],
    targetErrorWord: "ei oskab",
    targetCorrection: "ei oska",
    hint: "Look closely at the negative verb 'ei oskab'. How do verbs behave after 'ei'?",
    grammarTags: ["negation"],
    explanation: "In Estonian, negative verbs never take person endings (-n, -d, -b). 'Ta oskab' (affirmative) becomes 'Ta ei oska' (negative), never 'ei oskab'!"
  },
  {
    id: "u6-q5",
    unit: 6,
    type: "open-answer",
    prompt: "Answer the three questions from Unit 6 (lk 21, harjutus 8) in full Estonian sentences: 1) Mis sinu nimi on? 2) Kust sa pärit oled? 3) Mis keelt sa räägid?",
    sampleAnswers: [
      "Minu nimi on Alex. Ma olen pärit Eestist. Ma räägin eesti keelt ja inglise keelt.",
      "Mina olen Maria. Ma olen pärit Hispaaniast. Ma räägin hispaania keelt ja natuke eesti keelt."
    ],
    openCriteria: {
      minWords: 6,
      mustIncludeAnyGroup: [
        {
          label: "Name ('Minu nimi on...' or 'Mina olen...' or 'Ma olen...')",
          patterns: [/\b(minu\s+nimi\s+on|mina\s+olen|ma\s+olen)\s+\w+/i]
        },
        {
          label: "Origin with -st or -lt ('pärit ...-st / ...-lt')",
          patterns: [/\bpärit\s+\w+(st|lt)\b|\bolen\s+\w+lane\b/i]
        },
        {
          label: "Language with partitive 'keelt' ('räägin / oskan ... keelt')",
          patterns: [/\b(räägin|oskan)\s+.*\bkeelt\b/i]
        }
      ],
      grammarChecks: ["keelt_partitive", "parit_case", "no_ei_conjugated", "estonian_diacritics"]
    },
    explanation: "Check three key grammar points from Unit 6: 1) 'pärit' requires '-st' (Eestist, Inglismaalt uses '-lt' because of '-maa'), 2) after 'räägin/oskan', use III vorm 'keelt' (not 'keel'), 3) language names are lowercase in Estonian ('eesti keelt', 'inglise keelt')."
  },

  // =========================================================================
  // UNIT 7: Kohv ja pitsa (lk 22–29)
  // =========================================================================
  {
    id: "u7-q1",
    unit: 7,
    type: "fill-blank",
    prompt: "Complete the three principal forms (I vorm, II vorm, III vorm) of 'vesi' (water) from Unit 7 (lk 24, harjutus 2):",
    sentence: "I vorm: vesi — II vorm: vee — III vorm: liiter ___",
    translation: "water — of water — a liter of water",
    acceptedAnswers: ["vett"],
    hint: "Irregular III vorm (Osastav) of 'vesi' (ends in -tt, just like mesi -> mett!)",
    grammarTags: ["noun-forms", "partitive"],
    commonErrors: {
      "vesi": "'vesi' is I vorm (Nimetav). After a unit of measure ('liiter') or 'Ma joon...', Estonian requires III vorm (Osastav): 'vett'.",
      "vee": "'vee' is II vorm (Omastav, e.g. 'veekeskus'). After 'liiter', use III vorm (Osastav): 'vett'.",
      "vesit": "'vesi' (and 'mesi') are irregular two-syllable words: vesi – vee – vett (and mesi – mee – mett)."
    },
    explanation: "'Vesi' (water) and 'mesi' (honey) follow the same important pattern on page 24: vesi – vee – vett (liiter vett) and mesi – mee – mett (kilo mett)."
  },
  {
    id: "u7-q2",
    unit: 7,
    type: "multiple-choice",
    prompt: "Look at the grammar box for 'leib' (black bread) in Unit 7 (lk 25). Which sentence uses the correct form of 'leib'?",
    options: [
      "Ma söön leiba ja mulle maitseb leib.",
      "Ma söön leib ja mulle maitseb leiba.",
      "Ma söön leiva ja mulle maitseb leib.",
      "Kaks leib, palun!"
    ],
    answer: "Ma söön leiba ja mulle maitseb leib.",
    optionCritiques: {
      "Ma söön leiba ja mulle maitseb leib.": "Õige! 'Ma söön' takes III vorm (Osastav: 'leiba'), while 'Mulle maitseb' takes I vorm (Nimetav: 'leib' is the grammatical subject!).",
      "Ma söön leib ja mulle maitseb leiba.": "Reversed! After 'Ma söön / Ma ei söö' you must use III vorm ('leiba'), whereas with 'Mulle maitseb...' the food is in I vorm ('leib')!",
      "Ma söön leiva ja mulle maitseb leib.": "'leiva' is II vorm (Omastav, used in compounds like 'leivasupp' or 'leivad'). After 'Ma söön', use III vorm: 'leiba'.",
      "Kaks leib, palun!": "After numbers (2 or more) and quantities ('kaks', 'kilo'), Estonian requires III vorm: 'kaks leiba', not 'kaks leib'."
    },
    explanation: "From page 25: I vorm ('leib'): 'See on leib. Mulle maitseb leib.' — II vorm ('leiva'): 'Leivas on rosinad. leivasupp.' — III vorm ('leiba'): 'Ma söön leiba. Ma ei söö leiba. kaks leiba, kilo leiba.'"
  },
  {
    id: "u7-q3",
    unit: 7,
    type: "fill-blank",
    prompt: "Give the III vorm (Osastav) after 'kilo' (Unit 7, lk 24, harjutus 2):",
    sentence: "I vorm: suhkur — II vorm: suhkru — III vorm: kilo ___",
    translation: "a kilo of sugar",
    acceptedAnswers: ["suhkrut"],
    hint: "II vorm ('suhkru') + '-t'",
    grammarTags: ["noun-forms", "partitive"],
    commonErrors: {
      "suhkur": "'suhkur' is I vorm. After 'kilo', you must use III vorm (Osastav): 'kilo suhkrut'.",
      "suhkru": "'suhkru' is II vorm (Omastav). For 'suhkur', III vorm adds '-t' to II vorm: 'suhkrut'.",
      "suhkurit": "Notice the stem change in 'suhkur': the 'u' moves before 'r' in II vorm ('suhkru') and III vorm ('suhkrut')."
    },
    explanation: "On page 24: suhkur (I) – suhkru (II) – kilo suhkrut (III)."
  },
  {
    id: "u7-q4",
    unit: 7,
    type: "multiple-choice",
    prompt: "Compare singular and plural with 'maitsema' (Unit 7, lk 29, harjutus 7): 'Kas sulle maitseb šokolaad?' vs 'Kas sulle ___ friikartulid?'",
    options: [
      "maitsevad",
      "maitseb",
      "maitsen",
      "maitsed"
    ],
    answer: "maitsevad",
    optionCritiques: {
      "maitsevad": "Õige! Because 'friikartulid' (French fries) is plural ('need'), the verb takes the 3rd person plural ending '-vad': 'maitsevad'.",
      "maitseb": "'maitseb' is singular (for 'šokolaad', 'pitsa', 'sushi'). Since 'friikartulid' is plural (-d), the verb must be plural: 'maitsevad'.",
      "maitsen": "'maitsen' would mean 'I taste'. In 'Mulle maitseb/maitsevad...', the food is the grammatical subject!",
      "maitsed": "'maitsed' is 2nd person singular ('sa maitsed'), not 3rd person plural ('nad maitsevad')."
    },
    explanation: "In Estonian, the food is the grammatical subject of 'maitsema': singular food → 'Mulle maitseb šokolaad'; plural food → 'Mulle maitsevad friikartulid'."
  },

  // =========================================================================
  // UNIT 8: Mida sa sööd? (lk 30–31)
  // =========================================================================
  {
    id: "u8-q1",
    unit: 8,
    type: "fill-blank",
    prompt: "Fill in the correct III vorm (Osastav) of 'puder' (porridge) in the breakfast sentence from Unit 8 (lk 30, harjutus 1):",
    sentence: "Ma söön hommikul jogurtit, müslit, ___ või võileiba.",
    translation: "In the morning I eat yogurt, muesli, porridge, or a sandwich.",
    acceptedAnswers: ["putru"],
    hint: "Irregular stem change: puder (I) → pudru (II) → p...u (III)",
    grammarTags: ["noun-forms", "partitive"],
    commonErrors: {
      "puder": "'puder' is I vorm (Nimetav). After 'Ma söön...', you need III vorm (Osastav): 'putru'.",
      "puderit": "'puder' has a consonant gradation pattern: puder (I) – pudru (II) – putru (III).",
      "pudru": "In standard Estonian (lk 30), II vorm is 'pudru' (e.g. 'pudrukauss'), while III vorm (Osastav) after 'söön' is 'putru'!"
    },
    explanation: "From the reading text on page 30: 'Ma söön hommikul jogurtit, müslit, putru, pannkooke või võileiba.' (puder → pudru → putru)."
  },
  {
    id: "u8-q2",
    unit: 8,
    type: "multiple-choice",
    prompt: "In Unit 8 (lk 30), several traditional Estonian foods and drinks are introduced. Which of these is a traditional Estonian fermented dark bread drink?",
    options: [
      "kali",
      "kama",
      "sült",
      "räim"
    ],
    answer: "kali",
    optionCritiques: {
      "kali": "Õige! 'Kali' (kvass) is a traditional lightly fermented drink made from dark rye bread.",
      "kama": "'Kama' is a traditional Estonian finely milled roasted grain & pea flour mixture (usually eaten with sour milk or keefir).",
      "sült": "'Sült' is traditional Estonian jellied meat (headcheese/aspic), usually eaten at Christmas or celebrations.",
      "räim": "'Räim' is the Baltic herring (Estonia's national fish!)."
    },
    explanation: "Estonian food cultural vocabulary on page 30: kali (rye bread kvass drink), kama (roasted grain flour mix with kefir), sült (jellied pork), verivorst (blood sausage), räim (Baltic herring), rosolje (beetroot-herring salad), kringel (braided sweet bread)."
  },
  {
    id: "u8-q3",
    unit: 8,
    type: "open-answer",
    prompt: "Answer the questions from Unit 8 (lk 31, harjutus 2): 'Mida sina hommikul sööd? Aga mida sa hommikul jood?' Write 1–2 sentences in Estonian!",
    sampleAnswers: [
      "Ma söön hommikul võileiba, muna ja putru. Ma joon hommikul kohvi ja vett.",
      "Hommikul ma söön jogurtit ja puuvilju. Ma joon teed."
    ],
    openCriteria: {
      minWords: 4,
      mustIncludeAnyGroup: [
        {
          label: "Eating/drinking verb ('söön' or 'joon')",
          patterns: [/\b(söön|joon)\b/i]
        }
      ],
      grammarChecks: ["food_partitive_after_soon_joon", "no_ei_conjugated", "estonian_diacritics"]
    },
    explanation: "When saying what you eat or drink ('Ma söön...', 'Ma joon...'), remember to put the food and drink into **III vorm (Osastav)**: e.g., kohvi (not kohv), teed (not tee), vett (not vesi), võileiba (not võileib), putru (not puder), salatit (not salat)."
  },

  // =========================================================================
  // UNIT 9: Üks kohv palun! (lk 32–35)
  // =========================================================================
  {
    id: "u9-q1",
    unit: 9,
    type: "dialogue",
    prompt: "Complete the café payment dialogue from Unit 9 (lk 32, harjutus 2):",
    dialogue: [
      { speaker: "Müüja", text: "Kas maksate kaardiga või sulas?" },
      { speaker: "Klient", text: "Maksan ___. (I'll pay by card.)" }
    ],
    acceptedAnswers: ["kaardiga", "kaardiga.", "kaardiga!"],
    hint: "kaart (card) + -ga (with)",
    grammarTags: ["cafe", "kaasautlev"],
    commonErrors: {
      "kaart": "'kaart' is I vorm. To say 'by/with card', add the comitative '-ga' onto II vorm ('kaardi'): 'kaardiga'.",
      "kaardiga või sulas": "Pick the one matching 'by card': 'kaardiga' ('sulas' means 'in cash').",
      "sulas": "'sulas' means 'in cash', whereas the prompt asks for 'by card' ('kaardiga')."
    },
    explanation: "In Estonian cafés (lk 32): 'Kas maksate kaardiga või sulas?' — 'Maksan kaardiga' (by card) or 'Maksan sulas' (in cash)."
  },
  {
    id: "u9-q2",
    unit: 9,
    type: "multiple-choice",
    prompt: "At a café (Unit 9, lk 32), the server asks: 'Kas siin või kaasa?' What are they asking you?",
    options: [
      "Whether you are having it for here (in the café) or to go (takeaway)",
      "Whether you want a large or small coffee",
      "Whether you want black coffee or coffee with milk",
      "Whether you are paying by card or in cash"
    ],
    answer: "Whether you are having it for here (in the café) or to go (takeaway)",
    optionCritiques: {
      "Whether you are having it for here (in the café) or to go (takeaway)": "Õige! 'siin' = here, 'kaasa' = to take along (takeaway).",
      "Whether you want a large or small coffee": "That would be 'Kas suur või väike?'.",
      "Whether you want black coffee or coffee with milk": "That would be 'Kas must või piimaga?'.",
      "Whether you are paying by card or in cash": "That would be 'Kas maksate kaardiga või sulas?'."
    },
    explanation: "Key café questions in Unit 9 (lk 32 & 35): 1) Mida teile? 2) Kas suur või väike? 3) Kas siin või kaasa? 4) Kas must või piimaga? 5) Kas midagi veel? 6) Kas maksate kaardiga või sulas?"
  },
  {
    id: "u9-q3",
    unit: 9,
    type: "fill-blank",
    prompt: "Order the daily special side dish using the '-ga' (with) ending from Unit 9 (lk 33, harjutus 4):",
    sentence: "Müüja: Mis lisandiga? Kas riisiga, tatraga, ahjukartuliga? — Klient: ___ palun! (With buckwheat, please!)",
    translation: "With buckwheat (tatar), please!",
    acceptedAnswers: ["Tatraga", "tatraga"],
    hint: "tatar (I) → tatra (II) + -ga",
    grammarTags: ["kaasautlev", "cafe"],
    commonErrors: {
      "tatariga": "Notice the stem change in 'tatar': I vorm = tatar, II vorm = tatra (the second 'a' drops!). So II vorm + '-ga' = 'tatraga'.",
      "tatar": "'tatar' is I vorm. To say 'with buckwheat', add '-ga' to II vorm ('tatra'): 'tatraga'."
    },
    explanation: "The '-ga' (Kaasaütlev = with) ending is always attached to **II vorm (Omastav)**: riis → riisi → riisiga; tatar → tatra → tatraga; piim → piima → piimaga."
  },

  // =========================================================================
  // UNIT 10: Mida sa teed? (lk 36–42)
  // =========================================================================
  {
    id: "u10-q1",
    unit: 10,
    type: "fill-blank",
    prompt: "Conjugate the verb 'tegema' (to do/make) for 'meie' (we) in Unit 10 (lk 38, harjutus 3):",
    sentence: "Mina teen sporti, tema teeb sporti, ja meie ___ sporti.",
    translation: "I do sports, he/she does sports, and we do sports.",
    acceptedAnswers: ["teeme"],
    hint: "Stem 'tee-' + '-me'",
    grammarTags: ["verbs"],
    commonErrors: {
      "tegeme": "Watch out for consonant gradation in 'tegema': the 'g' disappears in present tense forms (ma teen, sa teed, ta teeb, me teeme, te teete, nad teevad)!",
      "teevad": "'teevad' is for 'nemad/nad' (they). For 'meie/me' (we), the ending is '-me': 'teeme'.",
      "teen": "'teen' is for 'mina/ma' (I). For 'meie/me' (we), use '-me': 'teeme'."
    },
    explanation: "Conjugation of 'tegema' (lk 38): ma teen, sa teed, ta teeb, me teeme, te teete, nad teevad (negative: ei tee)."
  },
  {
    id: "u10-q2",
    unit: 10,
    type: "error-correction",
    prompt: "Fix the hilarious mixed-up sentence from Unit 10 (lk 41, harjutus 7 #1)! Swap the nouns/verbs so it makes sense:",
    incorrectSentence: "Esmaspäeval vaatan muusikat ja kuulan kitarri.",
    acceptedAnswers: [
      "Esmaspäeval kuulan muusikat ja mängin kitarri.",
      "Esmaspäeval ma kuulan muusikat ja mängin kitarri.",
      "Esmaspäeval mängin kitarri ja kuulan muusikat."
    ],
    targetErrorWord: "vaatan muusikat ja kuulan kitarri",
    targetCorrection: "kuulan muusikat ja mängin kitarri",
    hint: "Do you 'watch' music ('vaatan muusikat')? And what verb from Unit 10 goes with 'kitarri' (mängin)?",
    grammarTags: ["collocations", "verbs"],
    explanation: "In Unit 10 (lk 36 & 41): You listen to music ('kuulan muusikat') and play the guitar ('mängin kitarri') — you don't 'watch music'!"
  },
  {
    id: "u10-q3",
    unit: 10,
    type: "error-correction",
    prompt: "Fix another mixed-up sentence from Unit 10 (lk 41, harjutus 7 #6):",
    incorrectSentence: "Reedel mängin raamatut.",
    acceptedAnswers: [
      "Reedel loen raamatut.",
      "Reedel ma loen raamatut."
    ],
    targetErrorWord: "mängin",
    targetCorrection: "loen",
    hint: "You don't 'play' ('mängin') a book ('raamatut') — what do you do with a book?",
    grammarTags: ["collocations", "verbs"],
    explanation: "From Unit 10 (lk 36 & 41): 'loen raamatut' (I read a book) vs 'mängin kitarri / mängin jalgpalli' (I play guitar / football)."
  },
  {
    id: "u10-q4",
    unit: 10,
    type: "multiple-choice",
    prompt: "Compare how you say 'on Monday' vs 'on Monday morning' in Unit 10 (lk 41): 'Ma käin trennis ___' vs 'Ma käin trennis ___ hommikul.'",
    options: [
      "esmaspäeval / esmaspäeva",
      "esmaspäeva / esmaspäeval",
      "esmaspäeval / esmaspäeval",
      "esmaspäev / esmaspäeva"
    ],
    answer: "esmaspäeval / esmaspäeva",
    optionCritiques: {
      "esmaspäeval / esmaspäeva": "Õige! Standalone day of the week takes '-l' ('esmaspäeval' = on Monday), but when followed by time of day ('hommikul', 'õhtul'), the day is in II vorm without '-l' ('esmaspäeva hommikul' = on Monday's morning)!",
      "esmaspäeva / esmaspäeval": "Reversed! Standalone 'on Monday' needs '-l' ('esmaspäeval'), whereas before 'hommikul' only 'hommikul' gets the '-l' ('esmaspäeva hommikul').",
      "esmaspäeval / esmaspäeval": "Don't put '-l' on both words! When 'hommikul' has '-l', the day before it stays in II vorm: 'esmaspäeva hommikul'.",
      "esmaspäev / esmaspäeva": "'esmaspäev' (I vorm) means 'Monday' (e.g. 'Täna on esmaspäev'). To answer 'Millal?' (When? On Monday), you must add '-l': 'esmaspäeval'."
    },
    explanation: "From page 41 ('Millal?'): esmaspäeval (on Monday), teisipäeval (on Tuesday), nädalavahetusel (on the weekend) — BUT esmaspäeva hommikul, kolmapäeva õhtul, reede pärastlõunal!"
  },

  // =========================================================================
  // UNIT 11: Joo vett! Ära joo õlut! (lk 43)
  // =========================================================================
  {
    id: "u11-q1",
    unit: 11,
    type: "multiple-choice",
    prompt: "How do you form the irregular command 'Go home!' and negative command 'Don't go to the store!' from 'Ma lähen' (I go)? (Unit 11, lk 43)",
    options: [
      "Mine koju! / Ära mine poodi!",
      "Lähe koju! / Ära lähe poodi!",
      "Lähen koju! / Ei lähe poodi!",
      "Minge koju! / Ärge mine poodi!"
    ],
    answer: "Mine koju! / Ära mine poodi!",
    optionCritiques: {
      "Mine koju! / Ära mine poodi!": "Õige! As highlighted by 'NB!' on page 43, the verb 'minema' (ma lähen) uses the suppletive imperative stem 'mine': 'Mine koju!' and 'Ära mine poodi!'.",
      "Lähe koju! / Ära lähe poodi!": "Trap! Even though 'I go' is 'ma lähen', the imperative of 'minema' is NEVER 'lähe' — it is 'Mine!' and 'Ära mine!'.",
      "Lähen koju! / Ei lähe poodi!": "Those are statements ('(I) am going home / (I) am not going'), not commands ('Käsk ja keeld').",
      "Minge koju! / Ärge mine poodi!": "'Ärge mine' is ungrammatical, and singular 'sina' command in Unit 11 is 'Mine! / Ära mine!'."
    },
    explanation: "From Unit 11 (lk 43): istun → Istu! / Ära istu!; joon → Joo! / Ära joo!; vaatan → Vaata! / Ära vaata!; NB! lähen → Mine! / Ära mine!"
  },
  {
    id: "u11-q2",
    unit: 11,
    type: "fill-blank",
    prompt: "Turn 'Ma joon õlut' into a negative command ('Don't drink beer!') from the title of Unit 11 (lk 43):",
    sentence: "Joo vett! ___ ___ õlut!",
    translation: "Drink water! Don't drink beer!",
    acceptedAnswers: ["Ära joo", "ära joo"],
    hint: "Negative imperative word ('Ä...') + imperative stem of 'joon'",
    grammarTags: ["imperative", "negation"],
    commonErrors: {
      "ei joo": "'Ei joo' is a negative statement ('does not drink'). For a negative command ('Don't drink!'), Estonian uses 'Ära' instead of 'ei': 'Ära joo!'.",
      "ära jood": "Never put the '-d' ending after 'Ära'! Use the imperative stem: 'Ära joo!'."
    },
    explanation: "Negative commands (keeld) in Estonian use 'Ära' + the singular imperative form: 'Joo vett! Ära joo õlut!'"
  },
  {
    id: "u11-q3",
    unit: 11,
    type: "multiple-choice",
    prompt: "You see two signs on a shop door in Estonia (Unit 11, lk 43, harjutus 3): 'LÜKKA' and 'TÕMBA'. What do they mean?",
    options: [
      "LÜKKA = Push, TÕMBA = Pull",
      "LÜKKA = Pull, TÕMBA = Push",
      "LÜKKA = Open, TÕMBA = Closed",
      "LÜKKA = Entrance, TÕMBA = Exit"
    ],
    answer: "LÜKKA = Push, TÕMBA = Pull",
    optionCritiques: {
      "LÜKKA = Push, TÕMBA = Pull": "Õige! 'Lükka!' (imperative of lükkama) = Push!, and 'Tõmba!' (imperative of tõmbama) = Pull!.",
      "LÜKKA = Pull, TÕMBA = Push": "Reversed! 'Lükka' is Push (away from you), and 'Tõmba' is Pull (toward you).",
      "LÜKKA = Open, TÕMBA = Closed": "Open/Closed is 'Avatud / Suletud'. 'Lükka / Tõmba' are the imperatives 'Push / Pull'.",
      "LÜKKA = Entrance, TÕMBA = Exit": "Entrance/Exit is 'Sissepääs / Väljapääs'."
    },
    explanation: "Door signs on page 43 are imperatives: LÜKKA (Push!) and TÕMBA (Pull!)."
  },

  // =========================================================================
  // UNIT 12: Kus sa elad? (lk 44)
  // =========================================================================
  {
    id: "u12-q1",
    unit: 12,
    type: "multiple-choice",
    prompt: "In Unit 12 (lk 44), some places take '-s' (Seesütlev) for 'in', while others take '-l' (Alalütlev). Which sentence is 100% grammatically correct?",
    options: [
      "Piret elab Tartus, aga Kaire elab Mustamäel.",
      "Piret elab Tartul, aga Kaire elab Mustamäes.",
      "Piret elab Tartus, aga Kaire elab Mustamäes.",
      "Vladimir elab Venemaas ja Petri elab Soomel."
    ],
    answer: "Piret elab Tartus, aga Kaire elab Mustamäel.",
    optionCritiques: {
      "Piret elab Tartus, aga Kaire elab Mustamäel.": "Õige! Most cities/countries take '-s' ('Tartus', 'Tallinnas', 'Soomes'), while places ending in '-mäe' (hill), '-järve' (lake), or '-maa' (land/island) take '-l' ('Mustamäel', 'Sillamäel', 'Kohtla-Järvel', 'Saaremaal', 'Venemaal')!",
      "Piret elab Tartul, aga Kaire elab Mustamäes.": "Both endings are swapped! Tartu takes '-s' ('Tartus') and Mustamäe takes '-l' ('Mustamäel').",
      "Piret elab Tartus, aga Kaire elab Mustamäes.": "Estonian place names ending in '-mäe' (Mustamäe, Sillamäe, Lasnamäe) mean 'on the hill', so they always take '-l': 'Mustamäel', never 'Mustamäes'!",
      "Vladimir elab Venemaas ja Petri elab Soomel.": "Reversed! 'Venemaa' ends in '-maa' so it takes '-l' ('Venemaal'), whereas 'Soome' takes '-s' ('Soomes')."
    },
    explanation: "Rule from Unit 12 (lk 44): Use '-l' for places ending in '-maa' (Venemaal, Saaremaal, Prantsusmaal, Uus-Meremaal), '-mäe' (Mustamäel, Sillamäel), and '-järve' (Kohtla-Järvel). Use '-s' for most other cities and countries (Tallinnas, Tartus, Narvas, Pärnus, Jõhvis, Eestis, Soomes, Rootsis, Jaapanis)."
  },
  {
    id: "u12-q2",
    unit: 12,
    type: "fill-blank",
    prompt: "Fill in the correct form of 'Kohtla-Järve' in Unit 12 (lk 44, harjutus 2 #6):",
    sentence: "Ruslan elab ___ (Kohtla-Järve).",
    translation: "Ruslan lives in Kohtla-Järve.",
    acceptedAnswers: ["Kohtla-Järvel", "kohtla-järvel"],
    hint: "Does '-järve' take '-s' or '-l'?",
    grammarTags: ["location-case"],
    commonErrors: {
      "kohtla-järves": "Place names ending in '-järve' (lake), '-mäe' (hill), or '-maa' (land) take the exterior '-l' ending in Estonian: 'Kohtla-Järvel' (not '-s')!",
      "kohtla-järve": "To say 'in Kohtla-Järve' (Kus?), you must add the '-l' case ending: 'Kohtla-Järvel'."
    },
    explanation: "In Unit 12 (lk 44): Mustamäel, Sillamäel, Kohtla-Järvel, Saaremaal, Venemaal, Prantsusmaal all take '-l'!"
  }
];


window.WORKBOOK_QUESTIONS.push(
  // =========================================================================
  // UNIT 13: Missugune ilm täna on? (lk 45–46)
  // =========================================================================
  {
    id: "u13-q1",
    unit: 13,
    type: "multiple-choice",
    prompt: "In Unit 13 (lk 45), notice how 'sajab' (it precipitates/falls) is used with rain and snow: '___ sajab' (It is raining) and '___ sajab' (It is snowing). Which forms of 'vihm' and 'lumi' are used?",
    options: [
      "Vihma sajab. / Lund sajab.",
      "Vihm sajab. / Lumi sajab.",
      "Vihmas sajab. / Lumes sajab.",
      "Vihmale sajab. / Lumele sajab."
    ],
    answer: "Vihma sajab. / Lund sajab.",
    optionCritiques: {
      "Vihma sajab. / Lund sajab.": "Õige! With 'sajab', the precipitation is in III vorm (Osastav / Partitive): vihm → Vihma sajab; lumi → Lund sajab; lörts → Lörtsi sajab!",
      "Vihm sajab. / Lumi sajab.": "Watch the case! While 'Päike paistab' and 'Tuul puhub' use I vorm (Nimetav), precipitation with 'sajab' uses III vorm (Osastav): 'Vihma sajab' and 'Lund sajab'!",
      "Vihmas sajab. / Lumes sajab.": "'-s' means 'in the rain/snow'. With 'sajab', use III vorm: 'Vihma sajab. / Lund sajab.'",
      "Vihmale sajab. / Lumele sajab.": "'-le' means 'onto'. With 'sajab', use III vorm: 'Vihma sajab. / Lund sajab.'"
    },
    explanation: "Weather expressions on page 45: Päike paistab (I vorm), Tuul puhub (I vorm), BUT Vihma sajab, Lund sajab, Lörtsi sajab (III vorm / Osastav)!"
  },
  {
    id: "u13-q2",
    unit: 13,
    type: "fill-blank",
    prompt: "Match the temperature to the weather adjective from Unit 13 (lk 45, harjutus 2: külm -20 °C, jahe -2 °C, soe +18 °C, palav +29 °C):",
    sentence: "Roomas on täna +29 °C — seal on väga ___ ilm.",
    translation: "In Rome today it is +29 °C — the weather there is very hot.",
    acceptedAnswers: ["palav"],
    hint: "Hot (+29 °C) in Estonian (starts with p...)",
    grammarTags: ["weather", "adjectives"],
    commonErrors: {
      "kuum": "While 'kuum' is used for hot coffee/soup, for hot weather (+29 °C) Unit 13 (lk 45) teaches 'palav'!",
      "soe": "'soe' means warm (+18 °C on lk 45). For +29 °C (hot), the workbook uses 'palav'.",
      "jahe": "'jahe' means cool/chilly (-2 °C on lk 45)."
    },
    explanation: "Temperature scale in Unit 13 (lk 45): -20 °C = külm (cold), -2 °C = jahe (cool/chilly), +18 °C = soe (warm), +29 °C = palav (hot)."
  },
  {
    id: "u13-q3",
    unit: 13,
    type: "open-answer",
    prompt: "Describe the weather in Tallinn or Tartu today in Estonian! Include a weather phrase (e.g. Päike paistab / Vihma sajab / Täna on soe ilm) and the air temperature (e.g. Õhutemperatuur on pluss/miinus ... kraadi). (Unit 13, lk 46, harjutus 3)",
    sampleAnswers: [
      "Tallinnas on täna jahe ilm. Vihma sajab ja tuul puhub. Õhutemperatuur on pluss viis kraadi.",
      "Tartus on täna soe ilm ja päike paistab. Õhutemperatuur on pluss kaheksateist kraadi."
    ],
    openCriteria: {
      minWords: 4,
      mustIncludeAnyGroup: [
        {
          label: "Weather description ('ilm', 'soe', 'jahe', 'külm', 'palav', 'päike paistab', 'vihma sajab', 'lund sajab', 'tuul puhub', 'pilves', 'selge')",
          patterns: [/\b(ilm|soe|jahe|külm|palav|päike|vihma|lund|lörtsi|tuul|pilves|selge)\b/i]
        },
        {
          label: "Temperature or city ('kraadi', 'kraad', 'temperatuur', 'Tallinnas', 'Tartus', 'pluss', 'miinus')",
          patterns: [/\b(kraadi|kraad|õhutemperatuur|temperatuur|tallinnas|tartus|pluss|miinus)\b|\d+\s*°?c/i]
        }
      ],
      grammarChecks: ["weather_sajab_partitive", "estonian_diacritics"]
    },
    explanation: "Model from page 46: 'Tallinnas on täna jahe ilm. Õhutemperatuur on miinus kaks kraadi.' / 'Tartus on täna soe ilm. Õhutemperatuur on pluss kaheksateist kraadi.'"
  },

  // =========================================================================
  // UNIT 14: Kus sa oled? Ma olen tööl. (lk 47–49)
  // =========================================================================
  {
    id: "u14-q1",
    unit: 14,
    type: "multiple-choice",
    prompt: "In Unit 14 (lk 48), some activities/places use '-l' for 'Kus? (Where?)', while indoor buildings usually use '-s'. Which row has ALL forms correct?",
    options: [
      "Ma olen tööl, peol, turul ja kontserdil.",
      "Ma olen töös, peos, turus ja kontserdis.",
      "Ma olen tööl, kinos, peos ja turus.",
      "Ma olen kodul, koolil ja poel."
    ],
    answer: "Ma olen tööl, peol, turul ja kontserdil.",
    optionCritiques: {
      "Ma olen tööl, peol, turul ja kontserdil.": "Õige! Events, courses, and open/surface places in Unit 14 (töö, pidu, turg, kontsert, disko, koosolek, tantsukursus, spordivõistlus) all take '-l'!",
      "Ma olen töös, peos, turus ja kontserdis.": "All four of these words (töö, pidu, turg, kontsert) belong to the '-l' group on page 48: tööl, peol, turul, kontserdil!",
      "Ma olen tööl, kinos, peos ja turus.": "'pidu' (party) and 'turg' (market) take '-l' ('peol', 'turul'), not '-s'. (Note that 'pidu' also has stem gradation: pidu → peo → peol!).",
      "Ma olen kodul, koolil ja poel.": "Buildings/indoors like 'kodu', 'kool', and 'pood' take '-s': kodus, koolis, poes."
    },
    explanation: "The '-l' group on page 48 (memorize these 8!): tööl, diskol, tantsukursusel, spordivõistlusel, koosolekul, kontserdil, turul, peol. Most other places (kodus, poes, kinos, koolis, teatris, kohvikus, restoranis, rannas) take '-s'."
  },
  {
    id: "u14-q2",
    unit: 14,
    type: "fill-blank",
    prompt: "Complete the Kus? (Where?) and Kuhu? (Where to?) pair for 'pidu' (party) from Unit 14 (lk 48, harjutus 3):",
    sentence: "I vorm: pidu — Kus sa oled? Ma olen peol. — Kuhu sa lähed? Ma lähen ___.",
    translation: "party — I am at a party — I am going to a party.",
    acceptedAnswers: ["peole"],
    hint: "Stem 'peo-' + '-le'",
    grammarTags: ["location-case", "kuhu"],
    commonErrors: {
      "pidule": "Watch the consonant/vowel gradation in 'pidu'! In II vorm, 'i' becomes 'e' and 'd' drops: pidu → peo. So Kus? = 'peol' and Kuhu? = 'peole'!",
      "peol": "'peol' answers 'Kus?' (Where are you?). To answer 'Kuhu?' (Where are you going to?), '-l' becomes '-le': 'peole'!",
      "peosse": "Because 'pidu' is in the '-l' group ('peol'), its destination ('Kuhu?') uses '-le' ('peole'), not '-sse'."
    },
    explanation: "Words that use '-l' for 'Kus?' always use '-le' for 'Kuhu?': tööl → tööle, turul → turule, peol → peole, kontserdil → kontserdile."
  },
  {
    id: "u14-q3",
    unit: 14,
    type: "fill-blank",
    prompt: "Complete the Kus? and Kuhu? pair for 'raamatukogu' (library) from Unit 14 (lk 49, harjutus 3):",
    sentence: "Kus? Ma olen raamatukogus. — Kuhu? Ma lähen ___.",
    translation: "I am at the library. — I am going to the library.",
    acceptedAnswers: ["raamatukokku", "raamatukogusse"],
    hint: "Short illative form from page 49: 'kogu' → 'kokku'!",
    grammarTags: ["location-case", "kuhu"],
    commonErrors: {
      "raamatukogus": "'raamatukogus' (-s) is static location ('Kus?'). For destination ('Kuhu?'), page 49 teaches the short illative 'raamatukokku'!",
      "raamatukogule": "'raamatukogu' is an indoor building (-s group), so it uses the short illative 'raamatukokku', not '-le'."
    },
    explanation: "Important short destination ('Kuhu?') forms on pages 48–49: kodus → koju; poes → poodi; kinos → kinno; raamatukogus → raamatukokku; rannas → randa; koolis → kooli; metsas → metsa; loomaaias → loomaaeda."
  },

  // =========================================================================
  // UNIT 15: Lähme peole! (lk 50–53)
  // =========================================================================
  {
    id: "u15-q1",
    unit: 15,
    type: "dialogue",
    prompt: "Complete the taxi dialogue from Unit 15 (lk 51, harjutus 2):",
    dialogue: [
      { speaker: "Triinu", text: "Elevandil on sünnipäev. Lähme ___! (Let's go to the zoo!)" },
      { speaker: "Taksojuht", text: "Mina ka?" },
      { speaker: "Triinu", text: "Muidugi!" }
    ],
    acceptedAnswers: ["loomaaeda", "loomaaeda!"],
    hint: "Kuhu? form of 'loomaaed' (animal garden = zoo, lk 48/50)",
    grammarTags: ["kuhu", "location-case"],
    commonErrors: {
      "loomaaias": "'loomaaias' (-s) answers 'Kus?' (at the zoo). After 'Lähme...' (Let's go to... = Kuhu?), you need the destination form 'loomaaeda'!",
      "loomaaed": "'loomaaed' is I vorm. After 'Lähme...', use the Kuhu? form: 'loomaaeda' (just like 'lasteaed' → 'lasteaeda')."
    },
    explanation: "Compound words ending in '-aed' (garden): Kus? = loomaaias / lasteaias; Kuhu? = loomaaeda / lasteaeda."
  },
  {
    id: "u15-q2",
    unit: 15,
    type: "multiple-choice",
    prompt: "Your friend invites you out: 'Lähme teisipäeva õhtul ööklubisse!' How do you politely decline using the phrase taught in Unit 15 (lk 51, harjutus 3)?",
    options: [
      "Aitäh kutsumast, aga kahjuks ma ei saa. Võib-olla mõni teine kord?",
      "Lähme jah! Hea mõte!",
      "Pole viga, ma lähen kohe sinna!",
      "Kas maksate kaardiga või sulas?"
    ],
    answer: "Aitäh kutsumast, aga kahjuks ma ei saa. Võib-olla mõni teine kord?",
    optionCritiques: {
      "Aitäh kutsumast, aga kahjuks ma ei saa. Võib-olla mõni teine kord?": "Õige! 'Thanks for inviting, but unfortunately I can't. Maybe some other time?' (lk 51).",
      "Lähme jah! Hea mõte!": "That is accepting the invitation ('Let's go, yes! Good idea!'), not declining it.",
      "Pole viga, ma lähen kohe sinna!": "That means 'No problem, I'm going right there!'.",
      "Kas maksate kaardiga või sulas?": "That's a cashier asking how you want to pay!"
    },
    explanation: "On page 51: Accepting = 'Lähme jah! / Hea mõte! / Okei!'; Declining = 'Aitäh kutsumast, aga kahjuks ma ei saa. / Võib-olla mõni teine kord? / Mulle ei meeldi ööklubi.'"
  },

  // =========================================================================
  // UNIT 16: Turul (lk 54–57)
  // =========================================================================
  {
    id: "u16-q1",
    unit: 16,
    type: "multiple-choice",
    prompt: "Compare buying 1 liter vs 2 liters of milk in Unit 16 (lk 54, harjutus 1): 'Palun 1 ___ piima' vs 'Palun 2 ___ piima.'",
    options: [
      "liiter / liitrit",
      "liitrit / liiter",
      "liiter / liiter",
      "liitri / liitrit"
    ],
    answer: "liiter / liitrit",
    optionCritiques: {
      "liiter / liitrit": "Õige! After the number 1 ('üks'), the unit is in I vorm ('1 liiter piima'), and after 2 or more, the unit is in III vorm ('2 liitrit piima', '100 grammi riisi')!",
      "liitrit / liiter": "Reversed! 1 takes I vorm ('1 liiter'), while 2+ takes III vorm ('2 liitrit').",
      "liiter / liiter": "After numbers 2 or higher, Estonian nouns must be in III vorm (Osastav): '2 liitrit piima' (note that 'kilo' happens to have identical I and III forms: 1 kilo / 2 kilo!).",
      "liitri / liitrit": "'liitri' is II vorm. With '1', use I vorm: '1 liiter piima'."
    },
    explanation: "From page 54: 1 liiter piima (I vorm) vs 2 liitrit piima (III vorm). And the substance measured ('piima', 'riisi', 'õunu') is always in the partitive!"
  },
  {
    id: "u16-q2",
    unit: 16,
    type: "fill-blank",
    prompt: "At the market (Unit 16, lk 55, harjutus 3), you want to buy a kilo of apples ('õunad'). Complete the request using the plural partitive:",
    sentence: "õunad → Palun kilo ___!",
    translation: "apples → A kilo of apples, please!",
    acceptedAnswers: ["õunu"],
    hint: "Plural partitive of 'õun' (ends in -u: õun -> õunu!)",
    grammarTags: ["plural-partitive", "market"],
    commonErrors: {
      "õunad": "'õunad' is nominative plural. After 'kilo', countable fruits/vegetables must be in the plural partitive (mitmuse osastav): 'kilo õunu'!",
      "õuna": "'õuna' is singular partitive (e.g., 'kaks õuna' = two apples). When buying a kilo of apples ('õunad'), Estonian uses plural partitive: 'kilo õunu'!",
      "õunid": "The plural partitive of 'õun' is 'õunu' (lk 54 & 55)."
    },
    explanation: "Market plural partitives in Unit 16 (lk 55): õunad → kilo õunu; apelsinid → kilo apelsine; banaanid → kilo banaane; kurgid → kilo kurke; kartulid → kilo kartuleid; tomatid → kilo tomateid; maasikad → kilo maasikaid."
  },
  {
    id: "u16-q3",
    unit: 16,
    type: "fill-blank",
    prompt: "Order a kilo of tomatoes ('tomatid') at the market (Unit 16, lk 55, harjutus 3):",
    sentence: "tomatid → Palun kilo ___!",
    translation: "tomatoes → A kilo of tomatoes, please!",
    acceptedAnswers: ["tomateid"],
    hint: "Words with i-stem (tomat/tomati, kartul/kartuli, porgand/porgandi, sidrun/sidruni) take '-eid' in plural partitive!",
    grammarTags: ["plural-partitive", "market"],
    commonErrors: {
      "tomatid": "'tomatid' is nominative plural. After 'kilo', use plural partitive: 'kilo tomateid'.",
      "tomatit": "'tomatit' is singular partitive (e.g. 'kaks tomatit'). After 'kilo' for countable plural items, use plural partitive: 'kilo tomateid'.",
      "tomate": "For i-stem words like 'tomat' (II: tomati), the plural partitive ends in '-eid': 'tomateid' (just like kartuleid, porgandeid, sidruneid)."
    },
    explanation: "Notice the two main plural partitive patterns on page 55: 1) '-eid' for i-stems: kartuleid, porgandeid, sidruneid, tomateid; 2) '-id' for a-stems: maasikaid, sibulaid; 3) vowel change: apelsine, banaane, kurke, õunu."
  },

  // =========================================================================
  // UNIT 17: Roosa pluus ja punased püksid (lk 58–62)
  // =========================================================================
  {
    id: "u17-q1",
    unit: 17,
    type: "multiple-choice",
    prompt: "Compare singular 'särk' (shirt) and plural 'püksid' (pants/trousers) in Unit 17 (lk 58, harjutus 2): Which pair is grammatically correct?",
    options: [
      "See on roosa särk. Mulle sobib roosa särk. / Need on lillad püksid. Mulle sobivad lillad püksid.",
      "See on roosa särk. Mulle sobib roosa särk. / See on lilla püksid. Mulle sobib lillad püksid.",
      "Need on roosad särk. / Need on lilla püksid.",
      "See on hallid püksid. Mulle ei sobivad hallid püksid."
    ],
    answer: "See on roosa särk. Mulle sobib roosa särk. / Need on lillad püksid. Mulle sobivad lillad püksid.",
    optionCritiques: {
      "See on roosa särk. Mulle sobib roosa särk. / Need on lillad püksid. Mulle sobivad lillad püksid.": "Õige! In Estonian, 'püksid' (pants), 'teksad' (jeans), 'kingad' (shoes), 'sokid' (socks), and 'prillid' (glasses) are plural: they use 'Need on', plural adjective '-d' ('lillad'), and plural verb 'sobivad'!",
      "See on roosa särk. Mulle sobib roosa särk. / See on lilla püksid. Mulle sobib lillad püksid.": "'püksid' is plural, so it must take 'Need on' (These are), plural adjective 'lillad', and plural verb 'sobivad' (not 'See on / lilla / sobib').",
      "Need on roosad särk. / Need on lilla püksid.": "Adjectives and nouns must agree in number: 'roosa särk' (singular) and 'lillad püksid' (plural with '-d' on both words).",
      "See on hallid püksid. Mulle ei sobivad hallid püksid.": "Two errors: plural 'püksid' uses 'Need on', and after 'ei' the verb never takes '-vad' ('Mulle ei sobi hallid püksid')."
    },
    explanation: "From page 58: Singular: 'See on roosa särk. Mulle sobib roosa särk. Mulle ei sobi roosa särk.' Plural: 'Need on lillad püksid. Mulle sobivad lillad püksid. Mulle ei sobi lillad püksid.'"
  },
  {
    id: "u17-q2",
    unit: 17,
    type: "fill-blank",
    prompt: "In Estonian, different body-location words are used for wearing clothes (peas, kaelas, käes, seljas, jalas, ees — Unit 17, lk 61, harjutus 5). Complete the sentence for wearing a hat ('müts'):",
    sentence: "Tal on müts ___.",
    translation: "He/she is wearing a hat (literally: has a hat on the head).",
    acceptedAnswers: ["peas"],
    hint: "pea (head) + -s",
    grammarTags: ["clothing-location"],
    commonErrors: {
      "seljas": "'seljas' (on the back) is used for shirts, coats, jackets, sweaters, and dresses ('särk/mantel/kleit seljas'). A hat ('müts') is worn on the head: 'peas'!",
      "ees": "'ees' (in front) is used for glasses ('prillid ees'). A hat ('müts') is worn 'peas'.",
      "peal": "For wearing a hat on one's head, Estonian uses the inessive 'peas' ('Tal on müts peas')."
    },
    explanation: "Estonian clothing locations on page 61: müts PEAS (on head), sall KAELAS (around neck), kindad/kott KÄES (on hands/in hand), mantel/särk/kleit SELJAS (on upper body), püksid/seelik/sokid/kingad JALAS (on legs/feet), prillid EES (in front of eyes)."
  },
  {
    id: "u17-q3",
    unit: 17,
    type: "multiple-choice",
    prompt: "Which Estonian body-location word is used for wearing glasses ('prillid') and trousers/shoes ('püksid ja kingad') in Unit 17 (lk 61)?",
    options: [
      "Tal on prillid ees. / Tal on püksid ja kingad jalas.",
      "Tal on prillid peas. / Tal on püksid ja kingad seljas.",
      "Tal on prillid silmas. / Tal on püksid seljas.",
      "Tal on prillid kaelas. / Tal on kingad käes."
    ],
    answer: "Tal on prillid ees. / Tal on püksid ja kingad jalas.",
    optionCritiques: {
      "Tal on prillid ees. / Tal on püksid ja kingad jalas.": "Õige! Glasses are worn 'ees' (in front), and both trousers/pants ('püksid') and shoes/socks ('kingad/sokid') are worn 'jalas' (on the legs/feet)!",
      "Tal on prillid peas. / Tal on püksid ja kingad seljas.": "In Estonian, 'seljas' is only for upper-body or full-body garments (shirt, coat, dress). Trousers ('püksid') and shoes ('kingad') use 'jalas', and glasses use 'ees'!",
      "Tal on prillid silmas. / Tal on püksid seljas.": "Glasses use 'ees' ('Tal on prillid ees'), and trousers use 'jalas' ('Tal on püksid jalas').",
      "Tal on prillid kaelas. / Tal on kingad käes.": "'kaelas' is for a scarf/necklace, and 'käes' is for gloves or a bag."
    },
    explanation: "Remember from page 61: 'Tal on prillid ees' (glasses on) and 'Tal on püksid ja kingad jalas' (pants and shoes on)."
  },

  // =========================================================================
  // UNIT 18: Kus on lillepood? (lk 63–65)
  // =========================================================================
  {
    id: "u18-q1",
    unit: 18,
    type: "fill-blank",
    prompt: "Before postpositions like 'kõrval' (next to), 'vastas' (opposite), 'taga' (behind), 'ees' (in front of), the noun MUST be in II vorm (Omastav). Complete the sentence from Unit 18 (lk 63–64):",
    sentence: "Apteek on haigla vastas ja raamatukogu on ___ (toidupood) taga.",
    translation: "The pharmacy is opposite the hospital and the library is behind the grocery store.",
    acceptedAnswers: ["toidupoe"],
    hint: "II vorm of 'toidupood' (pood → poe!)",
    grammarTags: ["postpositions", "genitive"],
    commonErrors: {
      "toidupood": "'toidupood' is I vorm. Before 'taga' (behind), Estonian requires II vorm (Omastav), where 'd' drops: pood → poe → 'toidupoe taga'!",
      "toidupoodi": "'toidupoodi' is III vorm / Kuhu? form. Before 'taga', use II vorm (Omastav): 'toidupoe taga'.",
      "toidupoes": "'toidupoes' means 'in the grocery store'. Before 'taga', use II vorm: 'toidupoe'."
    },
    explanation: "Look at the table on page 64: pood → poe (toidupoe taga), pank → panga (panga kõrval), turg → turu (turu juures), apteek → apteegi (apteegi vastas), kirik → kiriku (kiriku ees)."
  },
  {
    id: "u18-q2",
    unit: 18,
    type: "multiple-choice",
    prompt: "Someone asks for directions on the street (Unit 18, lk 64, harjutus 2). What does 'Mine otse ja pööra vasakule!' mean?",
    options: [
      "Go straight and turn left!",
      "Turn back and go right!",
      "On the left side is the store!",
      "Go straight and turn right!"
    ],
    answer: "Go straight and turn left!",
    optionCritiques: {
      "Go straight and turn left!": "Õige! 'Mine otse!' = Go straight!, 'Pööra vasakule!' = Turn left!.",
      "Turn back and go right!": "'Turn back!' is 'Pööra tagasi!' and 'right' is 'paremale'.",
      "On the left side is the store!": "That is 'Vasakul pool on pood.'",
      "Go straight and turn right!": "'Turn right!' is 'Pööra paremale!', whereas 'vasakule' means 'to the left'."
    },
    explanation: "Directions on page 64: Mine otse! (Go straight!), Pööra paremale! (Turn right!), Pööra vasakule! (Turn left!), Pööra tagasi! (Turn back!)."
  },

  // =========================================================================
  // UNIT 19: Ma olen arst. Ma töötan haiglas. (lk 66–67)
  // =========================================================================
  {
    id: "u19-q1",
    unit: 19,
    type: "multiple-choice",
    prompt: "Match the professions with their workplaces from Unit 19 (lk 66–67): Where do 'arst' (doctor), 'kokk' (chef), and 'õpetaja' (teacher) work?",
    options: [
      "Arst töötab haiglas, kokk töötab restoranis ja õpetaja töötab koolis.",
      "Arst töötab koolis, kokk töötab haiglas ja õpetaja töötab poes.",
      "Arst töötab haigla, kokk töötab restoran ja õpetaja töötab kool.",
      "Arst töötavad haiglas ja kokk töötan restoranis."
    ],
    answer: "Arst töötab haiglas, kokk töötab restoranis ja õpetaja töötab koolis.",
    optionCritiques: {
      "Arst töötab haiglas, kokk töötab restoranis ja õpetaja töötab koolis.": "Õige! Correct professions and correct '-s' (Seesütlev) workplace endings!",
      "Arst töötab koolis, kokk töötab haiglas ja õpetaja töötab poes.": "The workplaces are scrambled! A doctor ('arst') works in a hospital ('haiglas'), and a teacher ('õpetaja') works in a school ('koolis').",
      "Arst töötab haigla, kokk töötab restoran ja õpetaja töötab kool.": "Missing the '-s' (Kus?) case endings! To say 'works IN a hospital/restaurant/school', you must add '-s': haiglas, restoranis, koolis.",
      "Arst töötavad haiglas ja kokk töötan restoranis.": "Verb conjugation mismatch: for singular 'arst / kokk (ta)', the verb must end in '-b' ('töötab')."
    },
    explanation: "From Unit 19 (lk 66–67): Arst ja hambaarst töötavad haiglas; kokk ja ettekandja töötavad restoranis; õpetaja töötab koolis; müüja töötab poes; sekretär ja ärimees töötavad kontoris."
  },

  // =========================================================================
  // UNIT 20: Minu pere (lk 68–72)
  // =========================================================================
  {
    id: "u20-q1",
    unit: 20,
    type: "multiple-choice",
    prompt: "Compare 'üks vend' (one brother) vs 'kaks...' (two brothers) and 'üks poeg' (one son) vs 'kaks...' (two sons) in Unit 20 (lk 68–69). Which sentence is grammatically correct?",
    options: [
      "Mul on üks vend, aga tal on kaks venda ja kaks poega.",
      "Mul on üks vend, aga tal on kaks vend ja kaks poeg.",
      "Mul on üks venna, aga tal on kaks vennad ja kaks pojad.",
      "Minul on üks venda ja kaks vend."
    ],
    answer: "Mul on üks vend, aga tal on kaks venda ja kaks poega.",
    optionCritiques: {
      "Mul on üks vend, aga tal on kaks venda ja kaks poega.": "Õige! After 'üks' (1), Estonian uses I vorm ('üks vend', 'üks poeg'), and after numbers 2 or higher ('kaks', 'kolm'...), Estonian ALWAYS uses singular III vorm (Osastav: 'kaks venda', 'kaks poega')!",
      "Mul on üks vend, aga tal on kaks vend ja kaks poeg.": "After 'kaks' (and any number ≥ 2), Estonian requires III vorm (Osastav): vend → venda ('kaks venda'), poeg → poega ('kaks poega')!",
      "Mul on üks venna, aga tal on kaks vennad ja kaks pojad.": "Never use nominative plural ('-d': vennad, pojad) after numbers like 'kaks'! After numbers 2+, Estonian uses singular III vorm: 'kaks venda', 'kaks poega'.",
      "Minul on üks venda ja kaks vend.": "Reversed! 'üks' takes I vorm ('üks vend') and 'kaks' takes III vorm ('kaks venda')."
    },
    explanation: "Golden rule of Estonian numbers (lk 68–69): 1 + I vorm ('üks vend', 'üks õde', 'üks poeg'), 2+ + III vorm ('kaks venda', 'kaks õde' [since õde I = III!], 'kaks poega', 'kolm last'). And in negation ('Mul ei ole...') also use III vorm: 'Mul ei ole venda'!"
  },
  {
    id: "u20-q2",
    unit: 20,
    type: "fill-blank",
    prompt: "Complete the possessive sentence from Unit 20 (lk 68, harjutus 1) using II vorm (Omastav) of 'vend' (brother):",
    sentence: "Mul on üks vend. Mu ___ nimi on Martin.",
    translation: "I have one brother. My brother's name is Martin.",
    acceptedAnswers: ["venna"],
    hint: "I: vend — II: v...a — III: venda",
    grammarTags: ["noun-forms", "genitive", "family"],
    commonErrors: {
      "vend": "'vend' is I vorm (nominative). To say 'my brother's name' (kelle nimi?), you must use II vorm (Omastav), where 'nd' weakens to 'nn': 'venna nimi'!",
      "venda": "'venda' is III vorm (used after 'kaks venda' or 'ei ole venda'). For possession ('brother's name'), use II vorm: 'venna'."
    },
    explanation: "Family member forms on page 68: vend (I) – venna (II: venna nimi) – venda (III: kaks venda); õde (I) – õe (II: õe nimi) – õde (III: kaks õde)."
  },
  {
    id: "u20-q3",
    unit: 20,
    type: "fill-blank",
    prompt: "Form the family compound word from Unit 20 (lk 72, harjutus 8): What do you call your sister's daughter ('õe + tütar')?",
    sentence: "õe + tütar = ___",
    translation: "sister's + daughter = niece (sister's daughter)",
    acceptedAnswers: ["õetütar"],
    hint: "Join II vorm ('õe') + 'tütar' as one compound word!",
    grammarTags: ["family", "compounds"],
    commonErrors: {
      "õdetütar": "Remember that the first part of a family compound uses II vorm (Omastav): õde → õe + tütar = 'õetütar' (just like vend → venna + poeg = 'vennapoeg')!",
      "õe tütar": "In Estonian (lk 72, harjutus 8), family relationship terms like 'tädipoeg', 'onupoeg', 'õetütar', 'vennapoeg', 'lapselaps' are written as a single compound word: 'õetütar'."
    },
    explanation: "From page 72: tädipoeg, onupoeg, täditütar, onutütar, õepoeg, vennapoeg, õetütar, vennatütar, lapselaps."
  },
  {
    id: "u20-q4",
    unit: 20,
    type: "open-answer",
    prompt: "Write 2–3 sentences in Estonian about your family (or an imaginary family), inspired by Taavi's text in Unit 20 (lk 69 & 72): e.g., who is in your family, their names/ages, or where they live!",
    sampleAnswers: [
      "Mul on tore pere. Mul on üks õde ja kaks venda. Mu ema ja isa elavad Tallinnas.",
      "Mul on väike pere. Mul ei ole õde ega venda. Mu ema nimi on Anna ja ta töötab haiglas."
    ],
    openCriteria: {
      minWords: 5,
      mustIncludeAnyGroup: [
        {
          label: "Possession or family verb ('Mul on...', 'Mul ei ole...', 'Minu pere...', 'elab / elavad')",
          patterns: [/\b(mul\s+on|mul\s+ei\s+ole|minu\s+pere|mu\s+\w+|elab|elavad|abielus|vallaline)\b/i]
        },
        {
          label: "Family member ('pere', 'ema', 'isa', 'õde', 'vend', 'venda', 'poeg', 'poega', 'tütar', 'tütart', 'laps', 'last', 'vanaema', 'vanaisa', 'abikaasa', 'koer', 'kass')",
          patterns: [/\b(pere|ema|isa|õde|õe|vend|venna|venda|poeg|poja|poega|tütar|tütre|tütart|laps|last|vanaema|vanaisa|onu|tädi|abikaasa|koer|kass)\b/i]
        }
      ],
      grammarChecks: ["family_number_partitive", "no_ei_conjugated", "estonian_diacritics"]
    },
    explanation: "Check your forms: 1) 'Mul on üks vend / õde', 2) after numbers 2+ or 'ei ole', use III vorm ('kaks venda', 'kaks poega', 'kaks tütart', 'mul ei ole venda'), 3) before 'nimi', use II vorm ('mu venna nimi', 'mu õe nimi')."
  },

  // =========================================================================
  // UNIT 21: Mulle meeldib tantsida (lk 73–75)
  // =========================================================================
  {
    id: "u21-q1",
    unit: 21,
    type: "multiple-choice",
    prompt: "In Unit 21 (lk 73–75), what verb form must follow 'Mulle meeldib...' (I like to...) and 'Ma oskan...' (I know how to...)?",
    options: [
      "The -da infinitive (-da / -a / -la): Mulle meeldib tantsida, raamatut lugeda ja saunas käia.",
      "The -n present tense form: Mulle meeldib tantsin, raamatut loen ja saunas käin.",
      "The -ma supine form: Mulle meeldib tantsima, raamatut lugema ja saunas käima.",
      "The imperative form: Mulle meeldib tantsi, raamatut loe ja saunas käi."
    ],
    answer: "The -da infinitive (-da / -a / -la): Mulle meeldib tantsida, raamatut lugeda ja saunas käia.",
    optionCritiques: {
      "The -da infinitive (-da / -a / -la): Mulle meeldib tantsida, raamatut lugeda ja saunas käia.": "Õige! Both 'Mulle meeldib...' and 'Ma oskan...' are always followed by the **DA-tegevusnimi** (-da infinitive: tantsida, ujuda, laulda, lugeda, süüa teha, saunas käia)!",
      "The -n present tense form: Mulle meeldib tantsin, raamatut loen ja saunas käin.": "Don't conjugate the second verb! 'Ma tantsin' = I dance, but 'Mulle meeldib tantsida' = I like to dance.",
      "The -ma supine form: Mulle meeldib tantsima, raamatut lugema ja saunas käima.": "In Estonian, '-ma' is used after verbs of motion/starting ('lähen magama', 'hakkan õppima'), whereas 'meeldib' and 'oskan' ALWAYS take the '-da' infinitive ('tantsida', 'lugeda', 'käia')!",
      "The imperative form: Mulle meeldib tantsi, raamatut loe ja saunas käi.": "Those are commands, not infinitives."
    },
    explanation: "Grammar summary from page 88 ('DA-vorm'): 'Mulle meeldib tantsida, laulda, televiisorit vaadata ja saunas käia. Ma oskan ujuda ja jalgrattaga sõita.'"
  },
  {
    id: "u21-q2",
    unit: 21,
    type: "fill-blank",
    prompt: "Turn 'Ma teen süüa' (I cook / make food) into a 'Mulle meeldib...' sentence using the phrase from Unit 21 (lk 73, harjutus 1):",
    sentence: "Ma teen süüa. → Mulle meeldib süüa ___.",
    translation: "I like to cook (make food).",
    acceptedAnswers: ["teha"],
    hint: "The DA-infinitive of 'tegema / teen' (starts with t...a)",
    grammarTags: ["da-infinitive"],
    commonErrors: {
      "teen": "'teen' is the conjugated 'mina' form ('Ma teen süüa'). After 'Mulle meeldib...', you need the DA-infinitive: 'süüa teha'!",
      "tegema": "'tegema' is the MA-infinitive. After 'Mulle meeldib...' or 'Ma oskan...', Estonian uses the DA-infinitive: 'teha' ('Mulle meeldib süüa teha').",
      "tegeda": "The DA-infinitive of 'tegema' is irregular: 'teha' ('süüa teha', 'käsitööd teha', 'oma tööd teha')."
    },
    explanation: "Key irregular DA-infinitives in Unit 21 (lk 73): süüa teha (to cook), saunas käia (to go to the sauna), jalgrattaga sõita (to ride a bike), õlut juua (to drink beer), sülti süüa (to eat jellied meat), duši all laulda (to sing in the shower)."
  },

  // =========================================================================
  // UNIT 22: Kuidas tervis? Mis sul viga on? (lk 76–78)
  // =========================================================================
  {
    id: "u22-q1",
    unit: 22,
    type: "multiple-choice",
    prompt: "Look at the three health & feeling patterns in Unit 22 (lk 77, harjutus 3): 'Ma olen...', 'Mul on...', and 'Mu ... valutab.' Which sentence has ALL THREE structures right?",
    options: [
      "Ma olen haige ja väsinud, mul on nohu ja külm, ja mu pea valutab.",
      "Mul on haige ja väsinud, ma olen nohu ja külm, ja mul pea valutab.",
      "Ma olen külm ja kõht tühi, ja mul on väsinud.",
      "Mul on pea valutab ja ma olen nohu."
    ],
    answer: "Ma olen haige ja väsinud, mul on nohu ja külm, ja mu pea valutab.",
    optionCritiques: {
      "Ma olen haige ja väsinud, mul on nohu ja külm, ja mu pea valutab.": "Õige! 1) 'Ma olen' + adjectives (haige, väsinud, unine, terve, õnnelik), 2) 'Mul on' + nouns/states (nohu, köha, palavik, külm, palav, janu, kõht tühi, igav), 3) 'Mu [body part] valutab' (Mu pea/kurk/hammas valutab)!",
      "Mul on haige ja väsinud, ma olen nohu ja külm, ja mul pea valutab.": "All swapped! 'haige' and 'väsinud' are adjectives ('Ma olen haige ja väsinud'), whereas 'nohu' and feeling cold ('külm') take 'Mul on' ('Mul on nohu ja külm')!",
      "Ma olen külm ja kõht tühi, ja mul on väsinud.": "English interference trap! In Estonian, 'Ma olen külm' means you are a cold-hearted person! To say 'I feel cold / I am hungry', you must say 'Mul on külm' and 'Mul on kõht tühi'. And 'väsinud' takes 'Ma olen väsinud'!",
      "Mul on pea valutab ja ma olen nohu.": "Don't mix 'Mul on' with 'valutab'! Say 'Mu pea valutab' (My head hurts) and 'Mul on nohu' (I have a runny nose)."
    },
    explanation: "The 3 columns on page 77 are crucial: 1) **Ma olen**: haige, terve, väsinud, unine, õnnelik; 2) **Mul on**: nohu, köha, palavik, pohmakas, külm, palav, janu, kõht tühi, igav, paha; 3) **Mu ... valutab**: pea, kurk, kõht, hammas, selg, jalg, käsi."
  },
  {
    id: "u22-q2",
    unit: 22,
    type: "fill-blank",
    prompt: "How do you say 'I am hungry' (literally: 'I have an empty stomach') in Unit 22 (lk 77–78)?",
    sentence: "Mul on kõht ___.",
    translation: "I am hungry (my stomach is empty).",
    acceptedAnswers: ["tühi"],
    hint: "Adjective meaning 'empty' (starts with t...i; opposite of 'kõht täis')",
    grammarTags: ["health-idioms"],
    commonErrors: {
      "valutab": "'Mu kõht valutab' means 'My stomach hurts / aches'. To say 'I am hungry', the idiom on page 77 is 'Mul on kõht tühi'!",
      "täis": "'Mul on kõht täis' (lk 83) means 'I am full!'. 'I am hungry' is 'Mul on kõht tühi' (empty)."
    },
    explanation: "Compare the two idioms: 'Mul on kõht tühi' = I am hungry (stomach is empty, lk 77) vs 'Kas sul on kõht täis?' = Are you full? (stomach is full, lk 83)."
  },
  {
    id: "u22-q3",
    unit: 22,
    type: "error-correction",
    prompt: "Fix the common English-speaker mistake in this Estonian sentence about feeling cold and having a headache (Unit 22, lk 77):",
    incorrectSentence: "Ma olen külm ja mul on pea valutab.",
    acceptedAnswers: [
      "Mul on külm ja mu pea valutab.",
      "Mul on külm ja minu pea valutab."
    ],
    targetErrorWord: "Ma olen külm ja mul on pea valutab",
    targetCorrection: "Mul on külm ja mu pea valutab",
    hint: "Check the 3 columns on page 77: 1) How do you say 'I feel cold'? ('Mul on...') 2) How do you say 'My head hurts'? ('Mu pea...')",
    grammarTags: ["health-idioms"],
    explanation: "In Estonian (lk 77): 1) Physical sensations like cold/hot/thirst/boredom use 'Mul on' ('Mul on külm / palav / janu / igav'), NOT 'Ma olen külm'. 2) Body parts hurting use 'Mu [kehaosa] valutab' ('Mu pea valutab'), NOT 'Mul on pea valutab'."
  },

  // =========================================================================
  // UNIT 23: Hea ja ilus (lk 79–81)
  // =========================================================================
  {
    id: "u23-q1",
    unit: 23,
    type: "fill-blank",
    prompt: "Write the opposite sentence using the antonym from Unit 23 (lk 79, harjutus 2 #5):",
    sentence: "Eesti keel on kerge. ↔ Ei, eesti keel on ___.",
    translation: "Estonian is easy/light. ↔ No, Estonian is difficult/hard.",
    acceptedAnswers: ["raske"],
    hint: "Opposite of 'kerge' (starts with r...e)",
    grammarTags: ["adjectives", "opposites"],
    commonErrors: {
      "halb": "'halb' is the opposite of 'hea' (good ↔ bad). The opposite of 'kerge' (easy/light) is 'raske' (difficult/heavy)!",
      "kallis": "'kallis' (expensive) is the opposite of 'odav' (cheap)."
    },
    explanation: "Opposites (vastandid) on page 79: kerge ↔ raske, odav ↔ kallis, aeglane ↔ kiire, hea ↔ halb, igav ↔ huvitav, ilus ↔ inetu, must ↔ puhas, külm ↔ soe, noor ↔ vana, pikk ↔ lühike."
  },
  {
    id: "u23-q2",
    unit: 23,
    type: "fill-blank",
    prompt: "Write the opposite sentence from Unit 23 (lk 79, harjutus 2 #2): Note that 'must' means both 'black' and 'dirty'!",
    sentence: "Tänav on must. ↔ Ei, tänav on ___.",
    translation: "The street is dirty. ↔ No, the street is clean.",
    acceptedAnswers: ["puhas"],
    hint: "Opposite of 'must' (dirty) on page 79 (starts with p...s)",
    grammarTags: ["adjectives", "opposites"],
    commonErrors: {
      "valge": "Clever trap! While 'must ↔ valge' means 'black ↔ white', in 'Tänav on must' (The street is dirty, lk 79), 'must' means 'dirty', so its opposite in the word bank is 'puhas' (clean)!"
    },
    explanation: "In Estonian, 'must' means both 'black' and 'dirty'. On page 79, 'Tänav on must' (The street is dirty) has the opposite 'Tänav on puhas' (The street is clean)!"
  },
  {
    id: "u23-q3",
    unit: 23,
    type: "multiple-choice",
    prompt: "In Unit 23 (lk 80, harjutus 3), superlatives ('the tallest', 'the shortest', 'the youngest') are formed with 'kõige + comparative (-m)'. Which set of superlatives is 100% correct?",
    options: [
      "kõige pikem (tallest), kõige lühem (shortest), kõige noorem (youngest)",
      "kõige pikk (tallest), kõige lühike (shortest), kõige noor (youngest)",
      "kõige pikkem (tallest), kõige lühikem (shortest), kõige noorm (youngest)",
      "väga pikem, väga lühem, väga noorem"
    ],
    answer: "kõige pikem (tallest), kõige lühem (shortest), kõige noorem (youngest)",
    optionCritiques: {
      "kõige pikem (tallest), kõige lühem (shortest), kõige noorem (youngest)": "Õige! Notice the stem changes from page 80: pikk → kõige pikem; lühike → kõige lühem; noor → kõige noorem; vana → kõige vanem; suur → kõige suurem; väike → kõige väiksem!",
      "kõige pikk (tallest), kõige lühike (shortest), kõige noor (youngest)": "After 'kõige', the adjective must take the '-m' comparative suffix ('pikem', 'lühem', 'noorem'), not the base form!",
      "kõige pikkem (tallest), kõige lühikem (shortest), kõige noorm (youngest)": "Watch the stem changes! 'pikk' weakens to single 'k' ('pikem'), 'lühike' drops '-ke' ('lühem'), and 'noor' adds '-em' ('noorem').",
      "väga pikem, väga lühem, väga noorem": "'väga' means 'very' and goes with the base adjective ('väga pikk'). For 'the most / -est', use 'kõige + -m' ('kõige pikem')."
    },
    explanation: "Superlatives from Unit 23 (lk 80): kõige pikem, kõige lühem, kõige tugevam, kõige rõõmsam, kõige noorem, kõige vanem, kõige tublim, kõige suurem, kõige väiksem, kõige ilusam."
  },

  // =========================================================================
  // KORDAMINE (Review & Synthesis across Units 1–23, lk 82–88)
  // =========================================================================
  {
    id: "kord-q1",
    unit: 23,
    type: "multiple-choice",
    prompt: "Kordamine Question Words (lk 82): Match the three location question words 'Kus?', 'Kuhu?', and 'Kust?' with their meanings and answers:",
    options: [
      "Kus? = Where (at)? (kodus, tööl) / Kuhu? = Where to? (koju, tööle) / Kust? = Where from? (kodust, töölt)",
      "Kus? = Where to? / Kuhu? = Where from? / Kust? = Where (at)?",
      "Kus? = Who? / Kuhu? = When? / Kust? = How?",
      "Kus? = Where from? (Eestist) / Kust? = Where (at)? (Eestis)"
    ],
    answer: "Kus? = Where (at)? (kodus, tööl) / Kuhu? = Where to? (koju, tööle) / Kust? = Where from? (kodust, töölt)",
    optionCritiques: {
      "Kus? = Where (at)? (kodus, tööl) / Kuhu? = Where to? (koju, tööle) / Kust? = Where from? (kodust, töölt)": "Õige! This triad of location cases (lk 82 & 87) is the backbone of Estonian spatial grammar!",
      "Kus? = Where to? / Kuhu? = Where from? / Kust? = Where (at)?": "Mixed up! Remember: ku-S matches -S (where at: koduS), kuh-U matches illative (where to: kojU), and ku-ST matches -ST (where from: koduST)!",
      "Kus? = Who? / Kuhu? = When? / Kust? = How?": "Who = Kes?, When = Millal?, How = Kuidas?.",
      "Kus? = Where from? (Eestist) / Kust? = Where (at)? (Eestis)": "Notice the final letters: Ku-S? → Eesti-S (in Estonia); Ku-ST? → Eesti-ST (from Estonia)!"
    },
    explanation: "Memory tip from page 82 & 87: Notice the endings of the question words themselves! Ku**s**? → Eesti**s** (in); Kuh**u**? → koj**u** / kohvikusse (into); Ku**st**? → Eesti**st** (from)."
  },
  {
    id: "kord-q2",
    unit: 15,
    type: "open-answer",
    prompt: "Board Game Challenge #22 & #50 (lk 84–85): A friend says to you: 'Mul on igav ja mul on kõht tühi!' (I'm bored and I'm hungry!). Write what you say to invite them somewhere or suggest doing something in Estonian! (e.g. 'Lähme...!')",
    sampleAnswers: [
      "Lähme restorani või kohvikusse! Sööme pitsat!",
      "Lähme kinno ja siis sööme midagi! Ma teen süüa!"
    ],
    openCriteria: {
      minWords: 2,
      mustIncludeAnyGroup: [
        {
          label: "Suggestion, invitation, or imperative ('Lähme...', 'Sööme...', 'Söö...', 'Teeme...', 'Tule...')",
          patterns: [/\b(lähme|läheme|sööme|söö|võta|teeme|teen|tule|mine)\b/i]
        }
      ],
      grammarChecks: ["lahme_kuhu_case", "no_ei_conjugated", "estonian_diacritics"]
    },
    explanation: "When using 'Lähme...' (Let's go...), remember to use the **Kuhu?** destination form: 'Lähme kohvikusse / restorani / poodi / kinno / peole / koju!' (not the '-s' form like 'kohvikus' or 'restoranis')."
  },
  {
    id: "kord-q3",
    unit: 10,
    type: "open-answer",
    prompt: "Kordamine 'Minu päev ja minu nädal' (lk 83): Answer in 2–3 Estonian sentences: Mida sa hommikul, päeval ja õhtul tavaliselt teed? (What do you usually do in the morning, daytime, and evening?)",
    sampleAnswers: [
      "Hommikul ma söön hommikust ja joon kohvi. Päeval ma käin tööl ja õpin eesti keelt. Õhtul ma loen raamatut ja vaatan televiisorit.",
      "Hommikul ma joon teed. Päeval ma töötan kontoris. Õhtul ma teen süüa ja jalutan koeraga."
    ],
    openCriteria: {
      minWords: 5,
      mustIncludeAnyGroup: [
        {
          label: "Time of day or frequency ('hommikul', 'päeval', 'lõunal', 'õhtul', 'öösel', 'tavaliselt', 'tihti', 'esmaspäeval', 'nädalavahetusel')",
          patterns: [/\b(hommikul|päeval|lõunal|õhtul|öösel|tavaliselt|tihti|mõnikord|esmaspäeval|nädalavahetusel)\b/i]
        },
        {
          label: "First-person verb ('-n': söön, joon, käin, töötan, õpin, loen, vaatan, teen, magan, mängin, jalutan, koristan, kuulan)",
          patterns: [/\b\w+n\b/i]
        }
      ],
      grammarChecks: ["food_partitive_after_soon_joon", "no_ei_conjugated", "estonian_diacritics"]
    },
    explanation: "Great daily routine expressions from Unit 10 (lk 36) & Kordamine (lk 83): Hommikul ma söön hommikust ja joon kohvi. Päeval ma töötan / õpin eesti keelt. Õhtul ma teen süüa, loen raamatut, vaatan filmi või jalutan koeraga."
  }
);


// Additional targeted questions & Unit 10.7 Silly Sentences + Kordamine Board Game Squares
window.WORKBOOK_QUESTIONS.push(
  {
    id: "u2-q5",
    unit: 2,
    type: "fill-blank",
    prompt: "Solve the math problem from Unit 2 (lk 9, harjutus 4) and write the Estonian number word:",
    sentence: "16 + 4 = ___ (kirjuta sõnaga)",
    translation: "16 + 4 = 20 (write in words)",
    acceptedAnswers: ["kakskümmend", "kakskend"],
    hint: "2 (kaks) + -kümmend (note: spoken form [kakskend] is also shown on lk 8!)",
    grammarTags: ["numbers"],
    commonErrors: {
      "kaksteist": "'kaksteist' is 12 (-teist = teen). Tens (20–90) end in '-kümmend': 20 = 'kakskümmend'!",
      "20": "Write the number in Estonian words: 'kakskümmend'."
    },
    explanation: "Remember the difference between '-teist' (11–19: kaksteist = 12) and '-kümmend' (20–90: kakskümmend = 20)."
  },
  {
    id: "u4-q5",
    unit: 4,
    type: "fill-blank",
    prompt: "Write the time in words (Unit 4, lk 12, harjutus 1):",
    sentence: "12.15 — Kell on ___ ___.",
    translation: "It is 12:15 (a quarter toward one).",
    acceptedAnswers: ["veerand üks"],
    hint: "15 minutes past 12 is a quarter toward the 1st hour (üks)!",
    grammarTags: ["time"],
    commonErrors: {
      "veerand kaksteist": "Careful! 'Veerand kaksteist' means 11:15 (a quarter toward 12). At 12:15, the upcoming hour is 1 ('üks'), so it is 'veerand üks'!",
      "veerand kolmteist": "In the Estonian 'veerand / pool / kolmveerand' system, hours wrap from 12 to 1 ('veerand üks', 'pool üks', 'kolmveerand üks' — see lk 41!)."
    },
    explanation: "After 12:00, Estonian spoken time counts toward 1 ('üks'): 12.15 = veerand üks, 12.30 = pool üks, 12.45 = kolmveerand üks."
  },
  {
    id: "u7-q5",
    unit: 7,
    type: "fill-blank",
    prompt: "Complete the three forms of 'kook' (cake) from Unit 7 (lk 23, harjutus 2), paying attention to consonant gradation (k → g in II vorm):",
    sentence: "I vorm: kook — II vorm: ___ — III vorm: kaks kooki",
    translation: "cake — of cake (e.g. cake slice) — two cakes",
    acceptedAnswers: ["koogi"],
    hint: "In II vorm (Omastav), final '-k' weakens to '-g-' + 'i'",
    grammarTags: ["noun-forms", "genitive"],
    commonErrors: {
      "kooki": "'kooki' (with 'k') is III vorm (Osastav: 'kaks kooki', 'Ma söön kooki'). In II vorm (Omastav), 'k' weakens to 'g': 'koogi'!",
      "kook": "'kook' is I vorm. II vorm weakens 'k' to 'g' and adds '-i': 'koogi'."
    },
    explanation: "Compare on page 23: kook (I) – koogi (II) – kaks kooki (III); sink (I) – singi (II) – kilo sinki (III)."
  },
  {
    id: "u10-q5",
    unit: 10,
    type: "error-correction",
    prompt: "Fix the mixed-up sentence from Unit 10 (lk 41, harjutus 7 #4):",
    incorrectSentence: "Neljapäeva hommikul söön õhtust, siis koristan pesu ja pesen televiisorit.",
    acceptedAnswers: [
      "Neljapäeva hommikul söön hommikust, siis koristan tuba ja pesen pesu.",
      "Neljapäeva hommikul söön hommikust, siis pesen pesu ja koristan tuba.",
      "Neljapäeva õhtul söön õhtust, siis koristan tuba ja pesen pesu."
    ],
    targetErrorWord: "söön õhtust, siis koristan pesu ja pesen televiisorit",
    targetCorrection: "söön hommikust, siis koristan tuba ja pesen pesu",
    hint: "1) In the morning ('hommikul'), you eat breakfast ('söön hommikust'). 2) You clean the room ('koristan tuba') and wash laundry ('pesen pesu') — don't wash the TV!",
    grammarTags: ["collocations", "verbs"],
    explanation: "From Unit 10 (lk 36 & 41): 'hommikul söön hommikust' (eat breakfast in the morning), 'koristan tuba' (clean the room), 'pesen pesu' (wash laundry), 'vaatan televiisorit' (watch TV)."
  },
  {
    id: "u10-q6",
    unit: 10,
    type: "error-correction",
    prompt: "Fix the mixed-up sentence from Unit 10 (lk 41, harjutus 7 #7):",
    incorrectSentence: "Laupäeval loen filmi ja tantsin eesti keelt.",
    acceptedAnswers: [
      "Laupäeval vaatan filmi ja õpin eesti keelt.",
      "Laupäeval ma vaatan filmi ja õpin eesti keelt.",
      "Laupäeval vaatan filmi ja räägin eesti keelt."
    ],
    targetErrorWord: "loen filmi ja tantsin eesti keelt",
    targetCorrection: "vaatan filmi ja õpin eesti keelt",
    hint: "What do you do with a film ('vaatan filmi') and with the Estonian language ('õpin / räägin eesti keelt')?",
    grammarTags: ["collocations", "verbs"],
    explanation: "From Unit 10 (lk 36 & 41): 'vaatan filmi' (watch a movie) and 'õpin eesti keelt' (study Estonian)."
  },
  {
    id: "u12-q3",
    unit: 12,
    type: "fill-blank",
    prompt: "Complete sentence #1 from Unit 12 (lk 44, harjutus 2) using the proper case for living in Finland ('Soome'):",
    sentence: "Petri elab ___ (Soome), aga Vladimir elab Venemaal.",
    translation: "Petri lives in Finland, while Vladimir lives in Russia.",
    acceptedAnswers: ["Soomes", "soomes"],
    hint: "Does 'Soome' end in '-maa'? If not, use '-s'!",
    grammarTags: ["location-case"],
    commonErrors: {
      "soomel": "Unlike 'Venemaa' or 'Saksamaa' (which end in '-maa' and take '-l'), 'Soome' takes the standard interior case '-s': 'Soomes'!",
      "soomest": "'-st' means 'from Finland' ('pärit Soomest'). With 'elab' (lives in), use '-s': 'Soomes'."
    },
    explanation: "Compare on page 44: Petri elab Soomes (-s), aga Vladimir elab Venemaal (-l, because it ends in -maa)."
  },
  {
    id: "u14-q4",
    unit: 14,
    type: "fill-blank",
    prompt: "Complete the Kus? and Kuhu? pair for 'kodu' (home) from Unit 14 (lk 49, harjutus 3) — one of the most frequent irregular forms in Estonian!",
    sentence: "Kus sa oled? Ma olen kodus. — Kuhu sa lähed? Ma lähen ___.",
    translation: "Where are you? I am at home. — Where are you going? I am going home.",
    acceptedAnswers: ["koju"],
    hint: "4-letter irregular destination form of 'kodu' (k...u)",
    grammarTags: ["location-case", "kuhu"],
    commonErrors: {
      "kodus": "'kodus' means 'at home' (Kus?). When moving 'to home' (Kuhu? — after 'lähen', 'tulen', 'sõidan'), Estonian uses 'koju'!",
      "kodusse": "'kodu' never uses '-sse'! Its destination ('Kuhu?') form is always the short form 'koju'.",
      "kodule": "'kodule' means 'for the home'. 'Going home' is 'lähen koju'."
    },
    explanation: "Memorize the triad for 'kodu' (home): Kus? = **kodus** (at home), Kuhu? = **koju** (going home), Kust? = **kodust** (from home)."
  },
  {
    id: "u14-q5",
    unit: 14,
    type: "fill-blank",
    prompt: "Complete the Kus? and Kuhu? pair for 'kino' (cinema/movie theater) from Unit 14 (lk 49, harjutus 3):",
    sentence: "Kus? Ma olen kinos. — Kuhu? Ma lähen ___.",
    translation: "I am at the cinema. — I am going to the cinema.",
    acceptedAnswers: ["kinno"],
    hint: "Short illative of 'kino' doubles the 'n': k...o",
    grammarTags: ["location-case", "kuhu"],
    commonErrors: {
      "kinos": "'kinos' is static location (Kus?). For destination (Kuhu?), double the 'n' and drop '-s': 'kinno'!",
      "kinosse": "In Estonian, 'kino' uses the short illative with geminated (doubled) 'nn': 'kinno' (lk 49 & 52)."
    },
    explanation: "On page 49: kino → Kus? kinos → Kuhu? **kinno** (with double 'nn'!)."
  },
  {
    id: "u18-q3",
    unit: 18,
    type: "fill-blank",
    prompt: "Complete the sentence from the town map in Unit 18 (lk 63–64) using II vorm (Omastav) of 'pank' (bank) before 'kõrval':",
    sentence: "Kaubamaja on ___ (pank) kõrval.",
    translation: "The department store is next to the bank.",
    acceptedAnswers: ["panga"],
    hint: "In II vorm of 'pank', 'nk' weakens to 'ng' + 'a' (see table on lk 64!)",
    grammarTags: ["postpositions", "genitive"],
    commonErrors: {
      "pank": "'pank' is I vorm. Before 'kõrval' (next to), you must use II vorm (Omastav): 'panga kõrval'!",
      "panka": "'panka' (with 'nk') is III vorm / Kuhu? ('lähen panka'). In II vorm (Omastav) before 'kõrval', 'nk' weakens to 'ng': 'panga'!",
      "pangas": "'pangas' means 'in the bank'. Before 'kõrval', use II vorm: 'panga'."
    },
    explanation: "From the table on page 64: apteek → apteegi (k → g), turg → turu (g drops), pank → panga (nk → ng), pood → poe (d drops)."
  },
  {
    id: "u22-q4",
    unit: 22,
    type: "fill-blank",
    prompt: "How do you say 'My computer is broken' in Unit 22 (lk 78, harjutus 5)?",
    sentence: "Mu arvuti on ___.",
    translation: "My computer is broken.",
    acceptedAnswers: ["katki"],
    hint: "Invariable word for 'broken / out of order' (starts with k...i)",
    grammarTags: ["vocabulary", "health-idioms"],
    commonErrors: {
      "haige": "'haige' means 'sick/ill' (for living beings). For machines like 'arvuti' (computer) or 'telefon' (phone), page 78 uses 'katki' ('Mu arvuti on katki / Mu telefon on katki')!"
    },
    explanation: "From page 78: 'Mu arvuti on katki.' (My computer is broken.) / 'Mu telefon on katki.' (My phone is broken.)"
  }
);

// Kordamine Board Game Tiles (inspired by lk 84–85 "Küsi ja vasta!")
window.BOARD_GAME_TILES = [
  { tile: 1, label: "ALGUS: Kuidas läheb?", unit: 1, questionId: "u1-q5" },
  { tile: 2, label: "Tere hommikust!", unit: 1, questionId: "u1-q1" },
  { tile: 3, label: "Matemaatika: 9 + 4", unit: 2, questionId: "u2-q1" },
  { tile: 4, label: "Ma ei saa aru!", unit: 3, questionId: "u3-q3" },
  { tile: 5, label: "Mis kell on? (7.15)", unit: 4, questionId: "u4-q1" },
  { tile: 6, label: "Mis kell on? (8.45)", unit: 4, questionId: "u4-q3" },
  { tile: 7, label: "Mis päev homme on?", unit: 5, questionId: "u5-q1" },
  { tile: 8, label: "Kust sa pärit oled?", unit: 6, questionId: "u6-q1" },
  { tile: 9, label: "Mis keelt sa räägid?", unit: 6, questionId: "u6-q2" },
  { tile: 10, label: "I, II, III vorm: vesi", unit: 7, questionId: "u7-q1" },
  { tile: 11, label: "Leib, leiva, leiba", unit: 7, questionId: "u7-q2" },
  { tile: 12, label: "Mida sa hommikul sööd?", unit: 8, questionId: "u8-q1" },
  { tile: 13, label: "Kohvikus: kaardiga või sulas?", unit: 9, questionId: "u9-q1" },
  { tile: 14, label: "Mida sa teed? (Paranda lause!)", unit: 10, questionId: "u10-q2" },
  { tile: 15, label: "Millal? Esmaspäeval!", unit: 10, questionId: "u10-q4" },
  { tile: 16, label: "Joo vett! Ära joo õlut!", unit: 11, questionId: "u11-q2" },
  { tile: 17, label: "Kus sa elad? (-s või -l)", unit: 12, questionId: "u12-q1" },
  { tile: 18, label: "Missugune ilm täna on?", unit: 13, questionId: "u13-q1" },
  { tile: 19, label: "Kus sa oled? Ma olen tööl.", unit: 14, questionId: "u14-q1" },
  { tile: 20, label: "Kodus → Koju!", unit: 14, questionId: "u14-q4" },
  { tile: 21, label: "Lähme loomaaeda!", unit: 15, questionId: "u15-q1" },
  { tile: 22, label: "Turul: Palun kilo õunu!", unit: 16, questionId: "u16-q2" },
  { tile: 23, label: "Mis sul seljas ja peas on?", unit: 17, questionId: "u17-q2" },
  { tile: 24, label: "Linnas: toidupoe taga", unit: 18, questionId: "u18-q1" },
  { tile: 25, label: "Ametid: Kus sa töötad?", unit: 19, questionId: "u19-q1" },
  { tile: 26, label: "Minu pere: üks vend, kaks venda", unit: 20, questionId: "u20-q1" },
  { tile: 27, label: "Mulle meeldib tantsida!", unit: 21, questionId: "u21-q1" },
  { tile: 28, label: "Kuidas tervis? Mis sul viga on?", unit: 22, questionId: "u22-q1" },
  { tile: 29, label: "Hea ja ilus: vastandid", unit: 23, questionId: "u23-q1" },
  { tile: 30, label: "LÕPP: Kordamine Boss!", unit: 23, questionId: "kord-q1" }
];
