window.FR_T = window.FR_T || {};
FR_T[14] = {
  words: [["s'il vous plaît", "пожалуйста (вежливо)", "силь ву плэ"], ["s'il te plaît", "пожалуйста (другу)", "силь тё плэ"], ["voilà", "вот, пожалуйста (когда даёшь)", "вуаля"],
    ["d'accord", "хорошо, ладно", "дакор"], ["le croissant", "круассан", "лё круасан"], ["le sucre", "сахар", "лё сюкр"],
    ["le serveur", "официант", "лё сэрвёр"], ["l'addition", "счёт (в кафе)", "ладисьон"]],
  note: `<p>«Пожалуйста» по-французски длинное: {{s'il vous plaît}} — «если вам угодно». Незнакомым и в кафе — <b>vous</b>, друзьям — {{s'il te plaît}}. А когда что-то <b>даёшь</b>, говорят {{voilà}}:</p>
> Un café, s'il vous plaît. :: Кофе, пожалуйста. — «эн кафэ, силь ву плэ»
> Voilà ! :: Вот, пожалуйста! — «вуаля»`,
  text: { t: "Утро в кафе", lines: [
    ["Anna et Paul sont au café.", "Анна и Поль в кафе.", "ана э поль сон о кафэ"],
    ["Anna mange un croissant.", "Анна ест круассан.", "ана манж эн круасан"],
    ["Paul ne mange pas. Il regarde le serveur.", "Поль не ест. Он смотрит на официанта.", "поль нё манж па. иль рёгард лё сэрвёр"],
    ["Anna aime le thé, mais Paul aime le café.", "Анна любит чай, а Поль любит кофе.", "ана эм лё тэ, мэ поль эм лё кафэ"],
    ["Paul ne mange jamais de sucre.", "Поль никогда не ест сахар.", "поль нё манж жамэ дё сюкр"],
    ["Est-ce que le café est bon ? Oui, très bon !", "Кофе хороший? Да, очень!", "эскё лё кафэ э бон? уи, трэ бон"],
    ["Et voici l'addition !", "А вот и счёт!", "э вуаси ладисьон"],
  ] },
  tq: [
    { k: "choice", q: "Кто ест круассан?", opts: ["Анна", "Поль", "официант"], a: "Анна", why: "Anna mange un croissant" },
    { k: "choice", q: "Что любит Поль?", opts: ["кофе", "чай", "сахар"], a: "кофе", why: "Paul aime le café" },
    { k: "choice", q: "Что Поль никогда не ест?", opts: ["сахар", "круассаны", "мясо"], a: "сахар", why: "ne mange jamais de sucre — «никогда не ест сахара»" },
  ],
  dialog: { t: "Заказ", who: { A: "Официантка", B: "Max" }, lines: [
    ["A", "Bonjour ! Un café ou un thé ?", "Здравствуйте! Кофе или чай?", "бонжур! эн кафэ у эн тэ"],
    ["B", "Bonjour ! Un café, s'il vous plaît.", "Здравствуйте! Кофе, пожалуйста.", "бонжур! эн кафэ, силь ву плэ"],
    ["A", "Et un croissant ?", "И круассан?", "э эн круасан"],
    ["B", "Non, merci. Je ne mange rien.", "Нет, спасибо. Я ничего не ем.", "нон, мэрси. жё нё манж рьен"],
    ["A", "D'accord. Voilà le café !", "Хорошо. Вот ваш кофе!", "дакор. вуаля лё кафэ"],
    ["B", "Merci ! L'addition, s'il vous plaît.", "Спасибо! Счёт, пожалуйста.", "мэрси! ладисьон, силь ву плэ"],
    ["A", "Voilà !", "Вот, пожалуйста!", "вуаля"],
  ] },
  dq: [
    { k: "choice", q: "Что заказывает Макс?", opts: ["кофе", "чай", "круассан"], a: "кофе", why: "Un café, s'il vous plaît" },
    { k: "choice", q: "Хочет ли Макс круассан?", opts: ["нет", "да", "два"], a: "нет", why: "Non, merci. Je ne mange rien" },
    { k: "choice", q: "Что Макс просит в конце?", opts: ["счёт", "сахар", "чай"], a: "счёт", why: "L'addition, s'il vous plaît" },
  ],
  gram: [
    { k: "choice", q: "Je ___ mange pas.", opts: ["ne", "n'", "pas"], a: "ne", why: "ne перед согласной: je ne mange pas" },
    { k: "fix", lang: "fr", q: "Je ne aime pas le thé.", a: ["Je n'aime pas le thé."], why: "перед гласной ne → n'" },
    { k: "input", lang: "fr", q: "Он не курит.", a: ["Il ne fume pas."], why: "ne + глагол + pas" },
    { k: "choice", q: "Как спросить «Ты любишь чай?» через est-ce que?", opts: ["Est-ce que tu aimes le thé ?", "Est-ce tu aimes le thé ?", "Tu est-ce que aimes le thé ?"], a: "Est-ce que tu aimes le thé ?", why: "est-ce que ставят в самое начало" },
    { k: "tiles", lang: "fr", q: "Что ты смотришь?", a: "Qu'est-ce que tu regardes", d: ["est", "pas"], why: "qu'est-ce que — «что» в вопросе" },
  ],
  write: { goal: "Ты в кафе во Франции. Сделай заказ официанту.",
    steps: [
      ["Поздоровайся", "Bonjour !", "\\bbonjour\\b"],
      ["Закажи напиток и еду", "Un thé et un croissant, s'il vous plaît.", "s'il vous pla[iî]t"],
      ["Скажи, чего ты не ешь", "Je ne mange pas de …", "\\b(ne|n')\\s?\\w+ pas\\b"],
      ["Попроси счёт", "L'addition, s'il vous plaît.", "\\baddition\\b"]],
    model: "Bonjour ! Un thé et un croissant, s'il vous plaît. Je ne mange pas de sucre. L'addition, s'il vous plaît.",
    modelRu: "Здравствуйте! Чай и круассан, пожалуйста. Я не ем сахар. Счёт, пожалуйста." },
};
