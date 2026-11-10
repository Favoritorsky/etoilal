window.FR_T = window.FR_T || {};
FR_T[28] = {
  words: [["l'appartement", "квартира", "лапартёман"], ["le salon", "гостиная", "лё салон"], ["la salle de bains", "ванная", "ла саль дё бэн"],
    ["l'étage", "этаж", "лэтаж"], ["le canapé", "диван", "лё канапэ"], ["l'ordinateur", "компьютер", "лординатёр"],
    ["le métro", "метро", "лё мэтро"], ["la station", "станция", "ла стасьон"]],
  note: `<p>Не путай: {{c'est}} — «это кто / что / какое», {{il y a}} — «где-то есть, имеется»:</p>
> C'est Max. C'est petit. :: Это Макс. Это маленькое. — «сэ макс. сэ пёти»
> Il y a un lit. :: Там есть кровать. — «иль я эн ли»
<p>Спрашиваешь «что это?» — отвечаешь c'est. Рассказываешь, что где находится, — il y a.</p>`,
  text: { t: "Квартира Макса", lines: [
    ["Max vient de Russie.", "Макс из России.", "макс вьен дё рюси"],
    ["À Paris, il a un petit appartement.", "В Париже у него маленькая квартира.", "а пари, иль а эн пёти тапартёман"],
    ["Il y a un salon, une chambre et une petite cuisine.", "Там есть гостиная, спальня и маленькая кухня.", "иль я эн салон, юн шамбр э юн пётит кюизин"],
    ["Dans le salon, il y a un canapé et un ordinateur.", "В гостиной есть диван и компьютер.", "дан лё салон, иль я эн канапэ э эн нординатёр"],
    ["La salle de bains est très petite !", "Ванная очень маленькая!", "ла саль дё бэн э трэ пётит"],
    ["Le métro est dans la rue : la station est à deux minutes.", "Метро прямо на улице: станция в двух минутах.", "лё мэтро э дан ла рю: ла стасьон э а дё минют"],
    ["Le matin, Max prend le métro, et le soir, il prend le bus.", "Утром Макс едет на метро, а вечером на автобусе.", "лё матэн, макс пран лё мэтро, э лё суар, иль пран лё бюс"],
  ] },
  tq: [
    { k: "choice", q: "Откуда Макс?", opts: ["из России", "из Парижа", "из Лиона"], a: "из России", why: "Max vient de Russie" },
    { k: "choice", q: "Что есть в гостиной?", opts: ["диван и компьютер", "кровать", "телевизор"], a: "диван и компьютер", why: "il y a un canapé et un ordinateur" },
    { k: "choice", q: "Как далеко станция метро?", opts: ["две минуты", "двадцать минут", "очень далеко"], a: "две минуты", why: "la station est à deux minutes" },
  ],
  dialog: { t: "Где ты живёшь?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, tu habites où ?", "Том, где ты живёшь?", "том, тю абит у"],
    ["B", "J'habite dans un appartement au centre-ville.", "Я живу в квартире в центре.", "жабит дан зэн напартёман о сантрёвиль"],
    ["A", "C'est grand ?", "Она большая?", "сэ гран"],
    ["B", "Non, c'est petit : il y a une chambre et un salon.", "Нет, маленькая: спальня и гостиная.", "нон, сэ пёти: иль я юн шамбр э эн салон"],
    ["A", "Il y a un métro ?", "Метро там есть?", "иль я эн мэтро"],
    ["B", "Oui, la station est dans la rue. Je prends le métro le matin.", "Да, станция прямо на улице. Утром я езжу на метро.", "уи, ла стасьон э дан ла рю. жё пран лё мэтро лё матэн"],
    ["A", "Moi, je prends le bus. Je ne comprends pas le métro de Paris !", "А я езжу на автобусе. Не понимаю я парижское метро!", "муа, жё пран лё бюс. жё нё компран па лё мэтро дё пари"],
    ["B", "Tu viens chez moi samedi ?", "Придёшь ко мне в субботу?", "тю вьен шэ муа самди"],
    ["A", "D'accord !", "Договорились!", "дакор"],
  ] },
  dq: [
    { k: "choice", q: "Где живёт Том?", opts: ["в центре города", "за городом", "у бабушки"], a: "в центре города", why: "au centre-ville" },
    { k: "choice", q: "Сколько комнат у Тома?", opts: ["спальня и гостиная", "три комнаты", "одна комната"], a: "спальня и гостиная", why: "il y a une chambre et un salon" },
    { k: "choice", q: "Почему Леа ездит на автобусе?", opts: ["не понимает метро", "метро далеко", "любит автобусы"], a: "не понимает метро", why: "Je ne comprends pas le métro de Paris" },
  ],
  gram: [
    { k: "choice", q: "___ un chat dans la chambre.", opts: ["Il y a", "C'est", "Il est"], a: "Il y a", why: "где-то есть — il y a" },
    { k: "choice", q: "Qui est-ce ? — ___ Max.", opts: ["C'est", "Il y a", "Il est"], a: "C'est", why: "«это кто» — c'est" },
    { k: "input", lang: "fr", q: "Я понимаю.", a: ["Je comprends."], why: "comprendre — как prendre: je comprends" },
    { k: "fix", lang: "fr", q: "Ils prend le bus.", a: ["Ils prennent le bus."], why: "ils prennent — «они берут»" },
    { k: "choice", q: "Как спросить «ты откуда?»", opts: ["D'où tu viens ?", "Où tu viens ?", "De où tu viens ?"], a: "D'où tu viens ?", why: "d'où — откуда (de + où сливаются)" },
  ],
  write: { goal: "Опиши свою квартиру или комнату.",
    steps: [
      ["Где ты живёшь", "J'habite dans un appartement.", "\\bj'habite\\b"],
      ["Что там есть", "Il y a une chambre et un salon.", "\\bil y a\\b"],
      ["Какая она", "C'est petit, mais joli.", "\\bc'est\\b"],
      ["На чём ты ездишь", "Je prends le métro.", "\\bje prends\\b"]],
    model: "J'habite dans un appartement. Il y a deux chambres, un salon et une cuisine. C'est petit, mais j'aime l'appartement. Le matin, je prends le métro.",
    modelRu: "Я живу в квартире. Там две спальни, гостиная и кухня. Она маленькая, но я её люблю. Утром я езжу на метро." },
};
