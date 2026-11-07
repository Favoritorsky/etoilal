window.FR_C = window.FR_C || {};
FR_C[47] = { n: 47, t: "Контрольная: местоимения и мир вокруг", s: "уроки 40–46: le / lui, y / en, moi / toi, se lever, приказ, места и страны",
  rule: `<p>Проверь себя по урокам 40–46: je le vois / je lui parle, j'y vais / j'en veux, avec moi / chez eux, je me lève / je me suis levé, Écoute ! / Ne pars pas !, sur / sous / à côté de, à Paris / en France / au Canada.</p>`,
  tasks: [
    { k: "choice", q: "Я его вижу.", opts: ["Je le vois.", "Je lui vois.", "Je vois le."], a: "Je le vois.", why: "voir — кого: le" },
    { k: "choice", q: "Я с ней говорю.", opts: ["Je lui parle.", "Je la parle.", "Je parle la."], a: "Je lui parle.", why: "parler à — кому: lui" },
    { k: "input", lang: "fr", q: "Хочешь торта? — Да, хочу.", a: ["Oui, j'en veux."], why: "du gâteau → en" },
    { k: "input", lang: "fr", q: "Это для тебя.", a: ["C'est pour toi."], why: "pour + toi" },
    { k: "choice", q: "Elle s'est … tôt.", opts: ["levée", "levé", "lève"], a: "levée", why: "se lever — с être, «она»: -ée" },
    { k: "tiles", lang: "fr", q: "Я встаю рано.", a: "Je me lève tôt", d: ["se", "lèves"], why: "je me lève" },
    { k: "input", lang: "fr", q: "Посмотри на меня!", a: ["Regarde-moi !"], why: "приказ + moi" },
    { k: "choice", q: "Nous allons … France.", opts: ["en", "à", "au"], a: "en", why: "страна «она» — en" },
    { k: "input", lang: "fr", q: "Кот под кроватью.", a: ["Le chat est sous le lit."], why: "под — sous" },
    { k: "choice", q: "Ты идёшь на пляж? — Да, иду.", opts: ["Oui, j'y vais.", "Oui, j'en vais.", "Oui, je vais y."], a: "Oui, j'y vais.", why: "à + место → y" },
  ] };
