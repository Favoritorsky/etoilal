window.EN_C = window.EN_C || {};
EN_C[6] = { n: 6, t: "Контрольная: основа", s: "уроки 1–5: am/is/are, Present Simple и Continuous, Past Simple, будущее",
  rule: `<p>Проверь себя по урокам 1–5. Главное: «есть» не пропускаем (I'm tired); обычно — Present Simple с -s у he/she и do/does; прямо сейчас — am/is/are + -ing; прошлое — -ed или неправильная форма, в вопросе did; будущее — will (решил сейчас) и going to (план).</p>`,
  tasks: [
    { k: "input", lang: "en", q: "Мне холодно.", a: ["I'm cold.", "I am cold."], why: "«я есть холодный»" },
    { k: "choice", q: "She … to school every day.", opts: ["go", "goes", "is going"], a: "goes", why: "каждый день + she → goes" },
    { k: "input", lang: "en", q: "Что ты делаешь (сейчас)?", a: ["What are you doing?"], why: "сейчас — are + -ing" },
    { k: "fix", lang: "en", q: "Did he went home?", a: ["Did he go home?"], why: "после did — go" },
    { k: "input", lang: "en", q: "Он не любит кофе.", a: ["He doesn't like coffee.", "He does not like coffee."], why: "he → doesn't like" },
    { k: "choice", q: "I … my keys yesterday.", opts: ["lose", "lost", "losed"], a: "lost", why: "lose → lost" },
    { k: "input", lang: "en", q: "Я собираюсь купить телефон.", a: ["I'm going to buy a phone.", "I am going to buy a phone."], why: "план — going to" },
    { k: "choice", q: "They … at home last night.", opts: ["was", "were", "are"], a: "were", why: "they → were" },
    { k: "input", lang: "en", q: "Ты здесь живёшь?", a: ["Do you live here?"], why: "Do you…?" },
    { k: "choice", q: "Тише, она спит! — Be quiet, she …", opts: ["sleeps", "is sleeping", "slept"], a: "is sleeping", why: "сейчас — is + -ing" },
    { k: "input", lang: "en", q: "Я тебе помогу.", a: ["I'll help you.", "I will help you."], why: "решил сейчас — will" },
    { k: "fix", lang: "en", q: "He never eat meat.", a: ["He never eats meat."], why: "he → eats" },
  ] };
