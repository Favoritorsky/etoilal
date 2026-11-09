window.FR_C = window.FR_C || {};
FR_C[29] = { n: 29, t: "Контрольная: каждый день", s: "уроки 18–27: aller, faire, du / de la, вопросы, числа, время, -ir, мочь / хотеть, venir / prendre, c'est / il y a",
  rule: `<p>Проверь себя по урокам 18–27: je vais au / à la, il fait beau, du pain / de l'eau, où / quand / pourquoi, soixante-dix, quelle heure est-il, je finis, je peux / je veux / je dois + глагол, je viens / je prends, c'est / il y a.</p>`,
  tasks: [
    { k: "choice", q: "Il va … musée.", opts: ["au", "à le", "à la"], a: "au", why: "à + le = au" },
    { k: "input", lang: "fr", q: "Холодно.", a: ["Il fait froid."], why: "погода — il fait" },
    { k: "choice", q: "Je bois … eau.", opts: ["de l'", "du", "de la"], a: "de l'", why: "перед гласной — de l'" },
    { k: "input", lang: "fr", q: "Где ты живёшь? (вопрос в конце)", a: ["Tu habites où ?"], why: "в разговоре — где в конце" },
    { k: "choice", q: "80 — это…", opts: ["quatre-vingts", "huitante", "soixante-vingt"], a: "quatre-vingts", why: "4 × 20" },
    { k: "input", lang: "fr", q: "Который час?", a: ["Quelle heure est-il ?"], why: "quelle heure est-il" },
    { k: "choice", q: "Nous … à midi. (заканчиваем)", opts: ["finissons", "finons", "finis"], a: "finissons", why: "-ir: nous finissons" },
    { k: "tiles", lang: "fr", q: "Я хочу учить французский.", a: "Je veux apprendre le français", d: ["apprends", "peux"], why: "vouloir + глагол целиком" },
    { k: "input", lang: "fr", q: "Я не понимаю.", a: ["Je ne comprends pas."], why: "comprendre — je comprends" },
    { k: "choice", q: "В комнате есть кровать.", opts: ["Il y a un lit dans la chambre.", "C'est un lit dans la chambre.", "Il est un lit dans la chambre."], a: "Il y a un lit dans la chambre.", why: "есть, имеется — il y a" },
  ] };
