window.EN_C = window.EN_C || {};
EN_C[12] = { n: 12, t: "Контрольная: точнее", s: "уроки 7–11: сравнение, сколько, can/must/should, in/on/at, вопросы",
  rule: `<p>Проверь себя по урокам 7–11. Главное: -er / more и the -est / the most, than; much — несчитаемое, many — штуки, a lot of — всё; can/must/have to/should и mustn't ≠ don't have to; at — точка, on — день, in — внутри; вопрос = слово + помощник + кто + глагол.</p>`,
  tasks: [
    { k: "input", lang: "en", q: "Мой ноутбук быстрее твоего.", a: ["My laptop is faster than yours.", "My laptop is faster than your laptop."], why: "fast → faster than" },
    { k: "choice", q: "This is … expensive phone.", opts: ["the most", "the more", "most"], a: "the most", why: "the most expensive" },
    { k: "choice", q: "How … people were there?", opts: ["much", "many", "lot"], a: "many", why: "people — many" },
    { k: "input", lang: "en", q: "Мне приходится вставать в шесть.", a: ["I have to get up at six.", "I have to get up at 6."], why: "have to + at six" },
    { k: "choice", q: "Платить не нужно: You … pay.", opts: ["mustn't", "don't have to", "shouldn't"], a: "don't have to", why: "не обязательно" },
    { k: "choice", q: "We have a test … Monday.", opts: ["in", "on", "at"], a: "on", why: "день — on" },
    { k: "fix", lang: "en", q: "Where you live?", a: ["Where do you live?"], why: "нужен do" },
    { k: "input", lang: "en", q: "Что случилось?", a: ["What happened?"], why: "без did" },
    { k: "fix", lang: "en", q: "I don't have many money.", a: ["I don't have much money."], why: "money — much" },
    { k: "input", lang: "en", q: "Тебе стоит лечь спать.", a: ["You should go to bed.", "You should sleep."], why: "should" },
    { k: "choice", q: "good → лучший:", opts: ["the best", "the goodest", "the better"], a: "the best", why: "good — better — the best" },
    { k: "input", lang: "en", q: "Увидимся в шесть.", a: ["See you at six.", "See you at 6."], why: "at six" },
  ] };
