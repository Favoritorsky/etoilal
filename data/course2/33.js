window.ET_C2 = window.ET_C2 || {};
ET_C2[33] = { n: 33, sec: 4, check: true, t: "Контрольная: оттенки глагола", s: "приказ, ri, si, se, pe, -ant/-ey",
  words: [], gram: [],
  sut: "Проверь себя по урокам 27–32. Вся схема глагола — на доске, если закрепил.",
  rule: `<p>основа + время + (ri / se / pe) + кто · приказ: основа + e · -ant / -ey</p>`,
  tasks: [
    { k: "input", q: "Слушай!", a: ["Ekoute!"], why: "основа + e" },
    { k: "input", q: "Давай отдохнём!", a: ["Repozen!"], why: "форма «мы»" },
    { k: "input", q: "Я бы хотел чай, пожалуйста.", a: ["Je voulerim le te, silvouple.", "Je voulerim un te, silvouple."], why: "e + ri" },
    { k: "input", q: "Если бы ты пришёл, я бы спел.", a: ["Si tu veniris, je chantirim."], why: "i + ri в обеих частях" },
    { k: "input", q: "Пусть поют!", a: ["Ilz chantesel!"], why: "se — пусть" },
    { k: "input", q: "Я хочу, чтобы ты пел.", a: ["Je voulem ke tu chanteses."], why: "ke + se" },
    { k: "input", q: "Он, наверное, устал.", a: ["Il fatigipet."], why: "i + pe" },
    { k: "choice", q: "Что значит dansrepen?", opts: ["мы, наверное, будем танцевать", "мы бы танцевали", "пусть мы танцуем"], a: "мы, наверное, будем танцевать", lang: "x", why: "re + pe + n" },
    { k: "input", q: "Песня была спета певцом.", a: ["Le chanson esit chantey par le chanteur."], why: "esit + -ey + par" },
    { k: "fix", q: "Antres, silvouple!", a: ["Antre, silvouple!", "Antrez, silvouple!"], why: "приказ — без «кто» (или форма «вы»)" },
    { k: "tiles", q: "Не бегите!", a: "Kourez pa", d: ["koures", "jame"], why: "форма «вы» + pa" },
    { k: "listen", say: "Si j'averim le tan, j'aprenerim lez lang.", q: "Что прозвучало?", opts: ["Si j'averim le tan, j'aprenerim lez lang.", "Si j'avem le tan, j'aprenem lez lang."], a: "Si j'averim le tan, j'aprenerim lez lang.", why: "«Если бы у меня было время, я бы учил языки»" },
  ] };
