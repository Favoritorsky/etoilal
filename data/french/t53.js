window.FR_T = window.FR_T || {};
FR_T[53] = {
  words: [["l'entretien", "собеседование", "лантрётьен"], ["le patron", "начальник, хозяин", "лё патрон"], ["le stage", "стажировка, практика", "лё стаж"], ["nerveux, nerveuse", "нервный, взволнованный", "нэрвё, нэрвёз"],
    ["la réponse", "ответ", "ла рэпонс"], ["accepter", "принимать, соглашаться", "аксэптэ"], ["l'entreprise", "компания, фирма", "лантрёприз"], ["la cravate", "галстук", "ла крават"]],
  note: `<p>Связные слова превращают список в рассказ. Порядок событий: {{d'abord}} «сначала» → {{ensuite}} «потом» → {{enfin}} «наконец». Причина и следствие:</p>
> Il pleut, donc je reste ici. :: Идёт дождь, поэтому я остаюсь здесь. — «иль плё, донк жё рэст иси»
> Comme il pleut, je reste ici. :: Так как идёт дождь, я остаюсь здесь. — «ком иль плё, жё рэст иси»
> Il pleut, pourtant je sors. :: Идёт дождь, однако я выхожу. — «иль плё, пуртан жё сор»`,
  text: { t: "Собеседование", lines: [
    ["Lundi, Max a un entretien pour un stage dans une entreprise.", "В понедельник у Макса собеседование на стажировку в компанию.", "лэнди, макс а эн нантрётьен пур эн стаж дан зюн нантрёприз"],
    ["Il est nerveux, donc il se lève tôt.", "Он волнуется, поэтому встаёт рано.", "иль э нэрвё, донк иль сё лэв то"],
    ["D'abord, il prend une douche ; ensuite, il s'habille et il prend sa cravate.", "Сначала он принимает душ, потом одевается и берёт галстук.", "дабор, иль пран юн душ; ансюит, иль сабий э иль пран са крават"],
    ["Sa mère lui dit : « Il faut que tu sois calme ! »", "Мама говорит ему: «Тебе надо быть спокойным!»", "са мэр люи ди: иль фо кё тю суа кальм"],
    ["Le patron est gentil, pourtant Max a peur.", "Начальник добрый, и всё же Максу страшно.", "лё патрон э жанти, пуртан макс а пёр"],
    ["Comme il parle français, le patron est content.", "Так как Макс говорит по-французски, начальник доволен.", "ком иль парль франсэ, лё патрон э контан"],
    ["Enfin, le patron donne sa réponse : « Vous êtes accepté ! »", "Наконец начальник даёт ответ: «Вы приняты!»", "анфэн, лё патрон дон са рэпонс: ву зэт аксэптэ"],
    ["Alors Max téléphone à sa mère : il est très heureux !", "Тогда Макс звонит маме: он очень счастлив!", "алор макс тэлэфон а са мэр: иль э трэ ёрё"],
  ] },
  tq: [
    { k: "choice", q: "Зачем Макс идёт в компанию?", opts: ["на собеседование на стажировку", "на работу", "к другу"], a: "на собеседование на стажировку", why: "un entretien pour un stage" },
    { k: "choice", q: "Что говорит мама?", opts: ["надо быть спокойным", "надо надеть галстук", "надо вставать рано"], a: "надо быть спокойным", why: "Il faut que tu sois calme !" },
    { k: "choice", q: "Почему начальник доволен?", opts: ["Макс говорит по-французски", "Макс пришёл рано", "Макс в галстуке"], a: "Макс говорит по-французски", why: "Comme il parle français, le patron est content" },
    { k: "choice", q: "Чем всё закончилось?", opts: ["Макса приняли", "Максу отказали", "ответ будет потом"], a: "Макса приняли", why: "Vous êtes accepté !" },
  ],
  dialog: { t: "Надо, чтобы ты пришёл", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, il faut que tu m'aides !", "Том, мне нужна твоя помощь!", "том, иль фо кё тю мэд"],
    ["B", "Qu'est-ce qu'il y a ?", "Что случилось?", "кэскилья"],
    ["A", "Ma grand-mère vient samedi, et il faut que je fasse la cuisine.", "В субботу приезжает бабушка, и мне надо приготовить еду.", "ма гранмэр вьен самди, э иль фо кё жё фас ла кюизин"],
    ["B", "Mais tu détestes faire la cuisine !", "Но ты же терпеть не можешь готовить!", "мэ тю дэтэст фэр ла кюизин"],
    ["A", "Oui ! Donc je veux que tu viennes.", "Да! Поэтому я хочу, чтобы ты пришёл.", "уи! донк жё вё кё тю вьен"],
    ["B", "D'accord, mais d'abord, il faut que tu ailles au marché.", "Ладно, но сначала тебе надо сходить на рынок.", "дакор, мэ дабор, иль фо кё тю ай о маршэ"],
    ["A", "Et ensuite ?", "А потом?", "э ансюит"],
    ["B", "Ensuite, je fais un gâteau, et enfin, on mange ensemble !", "Потом я испеку торт, и наконец мы все вместе поедим!", "ансюит, жё фэ эн гато, э анфэн, он манж ансамбль"],
    ["A", "Merci, Tom ! Tu es très gentil.", "Спасибо, Том! Ты очень добрый.", "мэрси, том! тю э трэ жанти"],
  ] },
  dq: [
    { k: "choice", q: "Кто приезжает в субботу?", opts: ["бабушка Леа", "мама Тома", "Макс"], a: "бабушка Леа", why: "Ma grand-mère vient samedi" },
    { k: "choice", q: "Что Леа должна сделать сначала?", opts: ["сходить на рынок", "испечь торт", "убрать квартиру"], a: "сходить на рынок", why: "d'abord, il faut que tu ailles au marché" },
    { k: "choice", q: "Что приготовит Том?", opts: ["торт", "салат", "курицу"], a: "торт", why: "je fais un gâteau" },
  ],
  gram: [
    { k: "choice", q: "Il faut que tu ___ sage.", opts: ["sois", "es", "seras"], a: "sois", why: "после il faut que — особая форма: tu sois" },
    { k: "choice", q: "Je veux que tu ___ demain.", opts: ["viennes", "viens", "viendras"], a: "viennes", why: "после je veux que — tu viennes" },
    { k: "choice", q: "Как сказать «он устал, поэтому спит»?", opts: ["Il est fatigué, donc il dort.", "Il est fatigué, pourtant il dort.", "Il est fatigué, comme il dort."], a: "Il est fatigué, donc il dort.", why: "поэтому — donc" },
    { k: "fix", lang: "fr", q: "Il faut que tu fais la cuisine.", a: ["Il faut que tu fasses la cuisine."], why: "faire после il faut que → tu fasses" },
    { k: "choice", q: "Как сказать «он болен, однако работает»?", opts: ["Il est malade, pourtant il travaille.", "Il est malade, donc il travaille.", "Il est malade, enfin il travaille."], a: "Il est malade, pourtant il travaille.", why: "однако, и всё же — pourtant" },
    { k: "tiles", lang: "fr", q: "Так как идёт дождь, мы остаёмся здесь.", a: "Comme il pleut nous restons ici", d: ["donc", "sommes"], why: "так как — comme, в начале фразы" },
  ],
  write: { goal: "Расскажи историю одного своего дня по порядку.",
    steps: [
      ["Сначала", "D'abord, …", "\\bd'abord\\b"],
      ["Потом", "Ensuite, …", "\\bensuite\\b"],
      ["Поэтому или однако", "… donc … / … pourtant …", "\\b(donc|pourtant|comme|alors)\\b"],
      ["Что тебе надо было сделать", "Il faut que je …", "\\bil faut que\\b"],
      ["Наконец", "Enfin, …", "\\benfin\\b"]],
    model: "Hier, j'avais un examen. D'abord, je me suis levé tôt, ensuite j'ai révisé. Il faut que je réussisse, donc j'ai travaillé beaucoup. Enfin, l'examen est fini !",
    modelRu: "Вчера у меня был экзамен. Сначала я встал рано, потом повторял. Мне надо сдать, поэтому я много занимался. Наконец экзамен закончился!" },
};
