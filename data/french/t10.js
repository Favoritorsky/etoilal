window.FR_T = window.FR_T || {};
FR_T[10] = {
  words: [["bonjour", "здравствуй(те), добрый день", "бонжур"], ["salut", "привет; пока (друзьям)", "салю"], ["merci", "спасибо", "мэрси"],
    ["oui", "да", "уи"], ["non", "нет", "нон"], ["voici", "вот (смотри)", "вуаси"], ["le professeur", "учитель, преподаватель", "лё профэсёр"], ["la photo", "фотография", "ла фото"]],
  note: `<p>{{Bonjour}} говорят всем и весь день — и в магазине, и учителю. {{Salut}} — только друзьям, и это и «привет», и «пока». А {{voici}} — «вот», когда что-то показываешь:</p>
> Voici le livre. :: Вот книга. — «вуаси лё ливр»
> Voici Anna. :: Вот Анна. — «вуаси ана»`,
  text: { t: "Фото", lines: [
    ["Voici une photo.", "Вот фотография.", "вуаси юн фото"],
    ["Voici Paul et voici Anna.", "Вот Поль, а вот Анна.", "вуаси поль э вуаси ана"],
    ["Paul est étudiant. Il est russe.", "Поль — студент. Он русский.", "поль э этюдьян. иль э рюс"],
    ["Anna est étudiante. Elle est malade.", "Анна — студентка. Она болеет.", "ана э этюдьянт. эль э малад"],
    ["Et voici le professeur.", "А вот учитель.", "э вуаси лё профэсёр"],
    ["Il est très content.", "Он очень доволен.", "иль э трэ контан"],
    ["Et voici un chien. Il est fatigué !", "А вот собака. Она устала!", "э вуаси эн шьен. иль э фатигэ"],
  ] },
  tq: [
    { k: "choice", q: "Кто Поль?", opts: ["студент", "учитель", "француз"], a: "студент", why: "Paul est étudiant — Поль студент" },
    { k: "choice", q: "Что с Анной?", opts: ["она болеет", "она устала", "она довольна"], a: "она болеет", why: "Elle est malade — она болеет (malade — «больной»)" },
    { k: "choice", q: "Кто на фото устал?", opts: ["собака", "учитель", "Поль"], a: "собака", why: "voici un chien. Il est fatigué — собака устала (le chien — он, поэтому il)" },
  ],
  dialog: { t: "Знакомство в классе", who: { A: "Léa", B: "Max" }, lines: [
    ["A", "Bonjour !", "Здравствуй!", "бонжур"],
    ["B", "Salut ! Tu es Léa ?", "Привет! Ты Леа?", "салю! тю э леа"],
    ["A", "Oui. Et tu es Tom ?", "Да. А ты Том?", "уи. э тю э том"],
    ["B", "Non, je suis Max. Je suis étudiant.", "Нет, я Макс. Я студент.", "нон, жё сюи макс. жё сюи этюдьян"],
    ["A", "Je suis le professeur !", "Я учитель!", "жё сюи лё профэсёр"],
    ["B", "Oh ! Bonjour ! Voici le livre.", "Ой! Здравствуйте! Вот книга.", "о! бонжур! вуаси лё ливр"],
    ["A", "Merci, Max !", "Спасибо, Макс!", "мэрси, макс"],
  ] },
  dq: [
    { k: "choice", q: "Как зовут парня?", opts: ["Макс", "Том", "Поль"], a: "Макс", why: "Non, je suis Max — «нет, я Макс»" },
    { k: "choice", q: "Кто Леа?", opts: ["учитель", "студентка", "мама Макса"], a: "учитель", why: "Je suis le professeur — «я учитель»" },
    { k: "choice", q: "Что Макс даёт Леа?", opts: ["книгу", "фото", "кофе"], a: "книгу", why: "Voici le livre — «вот книга»" },
  ],
  gram: [
    { k: "choice", q: "Je ___ étudiant.", opts: ["suis", "es", "est"], a: "suis", why: "je suis — я есть" },
    { k: "choice", q: "Как сказать «кот» с артиклем?", opts: ["le chat", "la chat"], a: "le chat", why: "chat — мужского рода: le chat" },
    { k: "fix", lang: "fr", q: "Tu est content.", a: ["Tu es content."], why: "с tu — es: tu es" },
    { k: "tiles", lang: "fr", q: "Мы готовы.", a: "Nous sommes prêts", d: ["êtes", "suis"], why: "nous sommes — мы есть" },
    { k: "input", lang: "fr", q: "Вот машина.", a: ["Voici la voiture.", "Voici une voiture."], why: "voici + la voiture" },
  ],
  write: { goal: "Ты пишешь новому другу в чате: представься и покажи ему фото.",
    steps: [
      ["Поздоровайся", "Bonjour ! или Salut !", "\\b(bonjour|salut)\\b"],
      ["Скажи, как тебя зовут", "Je suis + твоё имя.", "\\bje suis\\b"],
      ["Скажи, кто ты", "Je suis russe. / Je suis étudiant.", "\\bje suis (russe|[ée]tudiante?|contente?|fatigu[ée]e?|malade|pr[êe]te?)\\b"],
      ["Покажи человека на фото и скажи о нём одно слово", "Voici Anna. Elle est étudiante.", "\\bvoici\\b"]],
    model: "Bonjour ! Je suis Max. Je suis russe et je suis étudiant. Voici Anna. Elle est étudiante.",
    modelRu: "Здравствуйте! Я Макс. Я русский и я студент. Вот Анна. Она студентка." },
};
