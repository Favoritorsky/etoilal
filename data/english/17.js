window.EN_C = window.EN_C || {};
EN_C[17] = { n: 17, t: "Контрольная: Present Perfect", s: "уроки 13–16: опыт, already/just/yet, for/since, Perfect или Past",
  rule: `<p>Проверь себя по урокам 13–16. Главное: have/has + 3-я форма (seen, been, done); ever/never — опыт; just/already/yet — результат сейчас; for — сколько, since — с какого момента («живу два года» = I've lived here for two years); названо «когда» — Past Simple.</p>`,
  tasks: [
    { k: "input", lang: "en", q: "Ты когда-нибудь был в Лондоне?", a: ["Have you ever been to London?"], why: "опыт" },
    { k: "choice", q: "I've never … this game.", opts: ["played", "play", "playing"], a: "played", why: "have + 3-я форма" },
    { k: "input", lang: "en", q: "Я ещё не закончил.", a: ["I haven't finished yet.", "I have not finished yet."], why: "yet в конце" },
    { k: "fix", lang: "en", q: "I know her since 2020.", a: ["I've known her since 2020.", "I have known her since 2020."], why: "отрезок до сейчас — have known" },
    { k: "choice", q: "We've been friends … ten years.", opts: ["for", "since", "ago"], a: "for", why: "сколько — for" },
    { k: "input", lang: "en", q: "Я жду уже час!", a: ["I've been waiting for an hour!", "I have been waiting for an hour!", "I've been waiting for an hour."], why: "have been waiting for" },
    { k: "fix", lang: "en", q: "I have seen him two days ago.", a: ["I saw him two days ago."], why: "ago — Past Simple" },
    { k: "choice", q: "She has gone to Rome. — Значит:", opts: ["Она уехала в Рим и сейчас там.", "Она бывала в Риме."], a: "Она уехала в Рим и сейчас там.", why: "gone — уехал" },
    { k: "input", lang: "en", q: "Она уже ушла.", a: ["She's already left.", "She has already left.", "She's already gone.", "She has already gone."], why: "already" },
    { k: "choice", q: "When … you … here?", opts: ["did … come", "have … come"], a: "did … come", why: "when — Past" },
    { k: "input", lang: "en", q: "Я никогда не видел снега.", a: ["I've never seen snow.", "I have never seen snow."], why: "never seen" },
    { k: "choice", q: "write → третья форма:", opts: ["wrote", "written", "writed"], a: "written", why: "write — wrote — written" },
  ] };
