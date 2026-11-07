window.FR_C = window.FR_C || {};
FR_C[55] = { n: 55, t: "Итоговая контрольная", s: "весь курс: уровень B1",
  rule: `<p>Последняя проверка — по всему курсу, особенно по разделу «Связная речь»: qui / que / où, сравнение, «бы» (je voudrais), si, il faut que, союзы, пересказ и en + -ant. Сдашь — получишь уровень <b>Francophone · B1</b>.</p>`,
  tasks: [
    { k: "choice", q: "C'est la chanson … j'aime.", opts: ["que", "qui", "où"], a: "que", why: "дальше «я» — que" },
    { k: "input", lang: "fr", q: "Париж больше Лиона.", a: ["Paris est plus grand que Lyon."], why: "plus … que" },
    { k: "choice", q: "Tu chantes … que moi.", opts: ["mieux", "meilleur", "plus bon"], a: "mieux", why: "как — mieux" },
    { k: "input", lang: "fr", q: "Я хотел бы кофе, пожалуйста.", a: ["Je voudrais un café, s'il vous plaît."], why: "вежливо — je voudrais" },
    { k: "choice", q: "Si j'… libre, je viendrais.", opts: ["étais", "serais", "suis"], a: "étais", why: "мечта: si + было" },
    { k: "choice", q: "Il faut que tu … sage.", opts: ["sois", "es", "seras"], a: "sois", why: "после il faut que — sois" },
    { k: "tiles", lang: "fr", q: "Идёт дождь, поэтому я дома.", a: "Il pleut donc je reste chez moi", d: ["mais", "comme"], why: "поэтому — donc" },
    { k: "input", lang: "fr", q: "Она сказала мне, что болеет.", a: ["Elle m'a dit qu'elle était malade."], why: "сдвиг: était" },
    { k: "choice", q: "Je fais la cuisine en … la radio.", opts: ["écoutant", "écoute", "écouter"], a: "écoutant", why: "en + -ant" },
    { k: "input", lang: "fr", q: "Я ездил в Париж. (мальчик)", a: ["Je suis allé à Paris."], why: "aller — с être" },
    { k: "choice", q: "Je … lui ai pas répondu.", opts: ["ne", "n'", "pas"], a: "ne", why: "ne + lui + ai + pas" },
    { k: "input", lang: "fr", q: "Я учу французский уже год.", a: ["J'apprends le français depuis un an."], why: "depuis + настоящее" },
  ] };
