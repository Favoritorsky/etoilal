window.FR_C = window.FR_C || {};
FR_C[39] = { n: 39, t: "Контрольная: прошлое и будущее", s: "уроки 30–38: je vais + глагол, je viens de, j'ai chanté, je suis allé, je chantais, je chanterai, слова времени",
  rule: `<p>Проверь себя по урокам 30–38: скоро (je vais chanter), только что (je viens de chanter), прошлое с avoir и être, особые формы (fait, vu, pris), фон или событие (je chantais / j'ai chanté), будущее (je chanterai), déjà / pas encore / depuis.</p>`,
  tasks: [
    { k: "input", lang: "fr", q: "Я сейчас поем. (скоро)", a: ["Je vais manger."], why: "aller + глагол" },
    { k: "choice", q: "Я только что поел.", opts: ["Je viens de manger.", "Je viens manger.", "Je vais manger."], a: "Je viens de manger.", why: "venir de" },
    { k: "choice", q: "Hier, j'… un cadeau.", opts: ["ai acheté", "achetais", "achèterai"], a: "ai acheté", why: "событие вчера — j'ai acheté" },
    { k: "input", lang: "fr", q: "Я посмотрел фильм.", a: ["J'ai vu un film."], why: "voir → vu" },
    { k: "choice", q: "Elle … venue.", opts: ["est", "a", "était"], a: "est", why: "venir — с être" },
    { k: "choice", q: "Quand j'… petit, j'habitais à la campagne.", opts: ["étais", "ai été", "serai"], a: "étais", why: "фон — j'étais" },
    { k: "input", lang: "fr", q: "Мы поедем в Париж. (будущее одним словом)", a: ["Nous irons à Paris."], why: "aller → ir-" },
    { k: "tiles", lang: "fr", q: "Я ещё не закончил.", a: "Je n'ai pas encore fini", d: ["déjà", "finis"], why: "pas encore" },
    { k: "choice", q: "Je dormais quand le téléphone …", opts: ["a sonné", "sonnait", "sonnera"], a: "a sonné", why: "зазвонил — событие" },
    { k: "input", lang: "fr", q: "Я учу французский уже год.", a: ["J'apprends le français depuis un an."], why: "depuis + настоящее" },
  ] };
