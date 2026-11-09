window.FR_C = window.FR_C || {};
FR_C[18] = { n: 18, t: "Контрольная: первые фразы", s: "уроки 8–16: être, avoir, le/la, много, глаголы, не, вопросы, прилагательные, мой",
  rule: `<p>Проверь себя по урокам 8–16: je suis / j'ai, le · la · les · un · une · des, je chante, ne … pas, est-ce que, petit / petite, mon · ma · mes.</p>`,
  tasks: [
    { k: "input", lang: "fr", q: "Я русский.", a: ["Je suis russe."], why: "je suis — я (есть)" },
    { k: "choice", q: "Nous … prêts.", opts: ["sommes", "sont", "êtes"], a: "sommes", why: "nous sommes" },
    { k: "input", lang: "fr", q: "Мне десять лет.", a: ["J'ai dix ans."], why: "возраст — avoir" },
    { k: "choice", q: "… fleurs (те самые цветы)", opts: ["la", "les", "des"], a: "les", why: "много, «те самые» — les" },
    { k: "tiles", lang: "fr", q: "Я не курю.", a: "Je ne fume pas", d: ["jamais", "suis"], why: "ne … pas" },
    { k: "input", lang: "fr", q: "Вы говорите по-французски?", a: ["Vous parlez français ?", "Est-ce que vous parlez français ?"], why: "vous parlez + вопрос голосом или est-ce que" },
    { k: "choice", q: "une voiture …", opts: ["noir", "noire", "noirs"], a: "noire", why: "«она» — + e" },
    { k: "choice", q: "… amie (моя подруга)", opts: ["ma", "mon", "mes"], a: "mon", why: "перед гласной — mon" },
    { k: "fix", lang: "fr", q: "Il ne mange pas de la viande.", a: ["Il ne mange pas de viande."], why: "после pas — просто de" },
    { k: "input", lang: "fr", q: "Что это?", a: ["Qu'est-ce que c'est ?"], why: "qu'est-ce que c'est" },
  ] };
