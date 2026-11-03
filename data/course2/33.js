window.ET_C2 = window.ET_C2 || {};
ET_C2[33] = { n: 33, sec: 4, check: true, t: "Контрольная: оттенки глагола", s: "приказ, ri, si, se, pe, -ant/-ey",
  words: [], gram: [],
  sut: "Проверь себя по урокам 27–32. Вся схема глагола — на доске, если закрепил.",
  rule: `<p>основа + время + (ri / se / pe) + кто · приказ: основа + e · -ant / -ey</p>`,
  tasks: [
    { k: "input", q: "Слушай!", a: ["Ekoute!"], why: "основа + e" },
    { k: "input", q: "Давай отдохнём!", a: ["Repozen!"], why: "форма «мы»" },
    { k: "input", q: "Я бы хотел чай, пожалуйста.", a: ["Je voulerim le te, silvouple.", "Je voulerim un te, silvouple."], why: "e + ri" },
    {"k": "input", "q": "Если бы ты позвонил, я бы пришёл.", "a": ["Si tu telefoniris, je venirim."], "why": "i + ri в обеих частях"},
    {"k": "input", "q": "Пусть спят!", "a": ["Ilz dormesel!"], "why": "se — пусть"},
    {"k": "input", "q": "Я хочу, чтобы он пел.", "a": ["Je voulem k'il chanteset."], "why": "ke + se; ke + il → k'il"},
    { k: "input", q: "Он, наверное, устал.", a: ["Il fatigipet."], why: "i + pe" },
    { k: "choice", q: "Что значит dansrepen?", opts: ["мы, наверное, будем танцевать", "мы бы танцевали", "пусть мы танцуем"], a: "мы, наверное, будем танцевать", lang: "x", why: "re + pe + n" },
    { k: "input", q: "Песня была спета певцом.", a: ["Le chanson esit chantey par le chanteur."], why: "esit + -ey + par" },
    {"k": "fix", "q": "Sortes, silvouple!", "a": ["Sorte, silvouple!", "Sortez, silvouple!"], "why": "приказ — без «кто» (или форма «вы»)"},
    {"k": "tiles", "q": "Не спите!", "a": "Dormez pa", "d": ["dormes", "jame"], "why": "форма «вы» + pa"},
    {"k": "listen", "say": "Si j'eserim rich, je voulerim un voiyaj.", "q": "Что прозвучало?", "opts": ["Si j'eserim rich, je voulerim un voiyaj.", "Si j'esem rich, je voulem un voiyaj."], "a": "Si j'eserim rich, je voulerim un voiyaj.", "why": "«Если бы я был богат, я бы хотел путешествие»"},
  ] };
