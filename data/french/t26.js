window.FR_T = window.FR_T || {};
FR_T[26] = {
  words: [["l'examen", "экзамен", "лэгзамэн"], ["les devoirs", "домашнее задание", "ле дёвуар"], ["réviser", "повторять (к экзамену)", "рэвизэ"],
    ["le permis", "права (водительские)", "лё пэрми"], ["tard", "поздно", "тар"], ["la soirée", "вечеринка; вечер", "ла суарэ"],
    ["malheureusement", "к сожалению", "малёрёзман"], ["peut-être", "может быть", "пётэтр"]],
  note: `<p>После <b>pouvoir, vouloir, devoir</b> и <b>il faut</b> второй глагол стоит целиком — без «чтобы», без de:</p>
> Je veux sortir. :: Я хочу выйти погулять. — «жё вё сортир»
> Il faut réviser. :: Надо повторять. — «иль фо рэвизэ»
<p>{{peut-être}} «может быть» — это буквально «может быть»: peut (от pouvoir) + être.</p>`,
  text: { t: "Экзамен в пятницу", lines: [
    ["Vendredi, Hugo a un examen.", "В пятницу у Юго экзамен.", "вандрёди, юго а эн нэгзамэн"],
    ["Il doit réviser ce soir.", "Сегодня вечером он должен повторять.", "иль дуа рэвизэ сё суар"],
    ["Nina veut sortir : ce soir, Max fait une soirée.", "Нина хочет пойти гулять: сегодня у Макса вечеринка.", "нина вё сортир: сё суар, макс фэ юн суарэ"],
    ["Hugo veut aussi sortir, mais il ne peut pas.", "Юго тоже хочет пойти, но не может.", "юго вё оси сортир, мэ иль нё пё па"],
    ["Il faut finir les devoirs !", "Надо доделать домашку!", "иль фо финир ле дёвуар"],
    ["Hugo dort tard : il finit à une heure.", "Юго ложится поздно: он заканчивает в час ночи.", "юго дор тар: иль фини а юнёр"],
    ["Vendredi, il réussit l'examen !", "В пятницу он сдаёт экзамен!", "вандрёди, иль рэюси лэгзамэн"],
  ] },
  tq: [
    { k: "choice", q: "Почему Юго не идёт на вечеринку?", opts: ["должен готовиться к экзамену", "болеет", "не любит вечеринки"], a: "должен готовиться к экзамену", why: "Il doit réviser ce soir" },
    { k: "choice", q: "Во сколько он заканчивает?", opts: ["в час ночи", "в полночь", "в десять"], a: "в час ночи", why: "il finit à une heure" },
    { k: "choice", q: "Как прошёл экзамен?", opts: ["сдал", "не сдал", "не пошёл"], a: "сдал", why: "il réussit l'examen — «он сдаёт экзамен» (réussir — добиться успеха)" },
  ],
  dialog: { t: "Помоги!", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, tu peux m'aider ?", "Том, можешь мне помочь?", "том, тю пё мэдэ"],
    ["B", "Peut-être. Qu'est-ce qu'il faut faire ?", "Может быть. Что надо сделать?", "пётэтр. кэскиль фо фэр"],
    ["A", "Je dois apprendre à conduire. Samedi, j'ai l'examen du permis.", "Мне надо научиться водить. В субботу у меня экзамен на права.", "жё дуа апрандр а кондюир. самди, жэ лэгзамэн дю пэрми"],
    ["B", "Tu veux conduire ma voiture ?", "Хочешь поводить мою машину?", "тю вё кондюир ма вуатюр"],
    ["A", "Oui ! Je peux ?", "Да! Можно?", "уи! жё пё"],
    ["B", "Malheureusement, non. Ma voiture est très vieille !", "К сожалению, нет. Моя машина очень старая!", "малёрёзман, нон. ма вуатюр э трэ вьей"],
    ["A", "Oh non…", "Ох, нет…", "о нон"],
    ["B", "Mais mon frère peut t'aider. Il a une voiture.", "Но мой брат может тебе помочь. У него есть машина.", "мэ мон фрэр пё тэдэ. иль а юн вуатюр"],
  ] },
  dq: [
    { k: "choice", q: "Что нужно Леа?", opts: ["научиться водить", "починить машину", "купить машину"], a: "научиться водить", why: "Je dois apprendre à conduire" },
    { k: "choice", q: "Почему Том не даёт свою машину?", opts: ["она очень старая", "он не доверяет Леа", "машины нет"], a: "она очень старая", why: "Ma voiture est très vieille" },
    { k: "choice", q: "Кто может помочь?", opts: ["брат Тома", "сестра Тома", "папа Леа"], a: "брат Тома", why: "mon frère peut t'aider" },
  ],
  gram: [
    { k: "choice", q: "Je ___ partir.", opts: ["dois", "doit", "devons"], a: "dois", why: "je dois — я должен" },
    { k: "choice", q: "Nous ___ à cinq heures. (finir)", opts: ["finissons", "finons", "finit"], a: "finissons", why: "у глаголов на -ir в «мы» появляется -iss-: nous finissons" },
    { k: "input", lang: "fr", q: "Ты можешь помочь?", a: ["Tu peux aider ?", "Est-ce que tu peux aider ?"], why: "tu peux + глагол целиком" },
    { k: "fix", lang: "fr", q: "Je veux de sortir.", a: ["Je veux sortir."], why: "после vouloir — глагол сразу, без de" },
    { k: "choice", q: "Как сказать «надо работать»?", opts: ["Il faut travailler.", "Il faut de travailler.", "Il faut travaille."], a: "Il faut travailler.", why: "il faut + глагол целиком" },
  ],
  write: { q: "Напиши 3–4 предложения о своей неделе: что ты хочешь (<i>je veux …</i>), что ты должен (<i>je dois …</i>) и что можешь или не можешь (<i>je peux / je ne peux pas …</i>).",
    need: [["\\bje veux\\b", "есть je veux"], ["\\bje dois\\b", "есть je dois"], ["\\bje (ne )?peux\\b", "есть je peux"]],
    model: "Je veux sortir samedi. Mais je dois réviser : j'ai un examen. Je ne peux pas dormir tard. Il faut finir les devoirs !",
    modelRu: "Я хочу пойти гулять в субботу. Но я должен повторять: у меня экзамен. Я не могу ложиться поздно. Надо доделать домашку!", min: 3 },
};
