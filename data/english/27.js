window.EN_C = window.EN_C || {};
EN_C[27] = { n: 27, t: "Контрольная: если бы", s: "уроки 23–26: if + will, if + would, I wish, пассив",
  rule: `<p>Проверь себя по урокам 23–26. Главное: реальное — If it rains, I'll stay (после if — без will); нереальное — If I had…, I would…; If I were you; I wish + прошедшее (I wish I knew), о прошлом — I wish I hadn't…; пассив — is/was + 3-я форма, by — кем.</p>`,
  tasks: [
    { k: "choice", q: "If it …, we'll stay at home.", opts: ["rains", "will rain", "would rain"], a: "rains", why: "после if — без will" },
    { k: "input", lang: "en", q: "Если бы у меня было больше времени, я бы учил японский.", a: ["If I had more time, I would learn Japanese.", "If I had more time, I'd learn Japanese.", "If I had more time, I would study Japanese.", "If I had more time, I'd study Japanese."], why: "had … would" },
    { k: "fix", lang: "en", q: "I'll call you when I will get home.", a: ["I'll call you when I get home.", "I will call you when I get home."], why: "после when — без will" },
    { k: "input", lang: "en", q: "На твоём месте я бы этого не делал.", a: ["If I were you, I wouldn't do that.", "If I were you, I wouldn't do it.", "I wouldn't do that if I were you.", "I wouldn't do it if I were you.", "If I was you, I wouldn't do that."], why: "If I were you, I wouldn't" },
    { k: "choice", q: "Хотел бы я знать. — I wish I …", opts: ["knew", "know", "would know"], a: "knew", why: "wish + прошедшее" },
    { k: "input", lang: "en", q: "Зря я это сказал.", a: ["I wish I hadn't said that.", "I wish I had not said that.", "I wish I hadn't said it."], why: "о прошлом — hadn't said" },
    { k: "choice", q: "My bike … yesterday.", opts: ["was stolen", "stole", "is stolen"], a: "was stolen", why: "пассив в прошлом" },
    { k: "input", lang: "en", q: "Баг исправлен.", a: ["The bug has been fixed.", "The bug was fixed.", "The bug is fixed."], why: "has been fixed" },
    { k: "fix", lang: "en", q: "If I would have money, I'd buy it.", a: ["If I had money, I'd buy it.", "If I had money, I would buy it."], why: "после if — had" },
    { k: "choice", q: "You won't pass … you study.", opts: ["unless", "if", "wish"], a: "unless", why: "unless = если не" },
    { k: "input", lang: "en", q: "Я родился в 2009 году.", a: ["I was born in 2009."], why: "was born" },
  ] };
