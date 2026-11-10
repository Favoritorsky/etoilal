window.FR_T = window.FR_T || {};
FR_T[37] = {
  words: [["le métier", "профессия", "лё мэтье"], ["le médecin", "врач", "лё мэдсэн"], ["l'ingénieur", "инженер", "лэнжэньёр"], ["créer", "создавать", "крээ"],
    ["construire", "строить", "констрюир"], ["à l'étranger", "за границей, за границу", "а лэтранжэ"], ["le rêve", "мечта; сон", "лё рэв"], ["difficile", "трудный", "дифисиль"]],
  note: `<p>Профессию говорят <b>без un / une</b>: «я врач» — {{je suis médecin}}, а не «je suis un médecin».</p>
> Il sera ingénieur. :: Он будет инженером. — «иль сёра энжэньёр»
> Je suis médecin. :: Я врач. — «жё сюи мэдсэн»`,
  text: { t: "Сон Макса", lines: [
    ["D'habitude, Max jouait aux jeux vidéo le soir.", "Обычно по вечерам Макс играл в видеоигры.", "дабитюд, макс жуэ о жё видэо лё суар"],
    ["Mais une nuit, il a fait un rêve.", "Но однажды ночью ему приснился сон.", "мэ юн нюи, иль а фэ эн рэв"],
    ["Dans le rêve, il créait un jeu vidéo célèbre.", "Во сне он создавал знаменитую видеоигру.", "дан лё рэв, иль крээ эн жё видэо сэлэбр"],
    ["Plus tard, Max sera ingénieur.", "Потом Макс станет инженером.", "плю тар, макс сёра энжэньёр"],
    ["Il créera des jeux vidéo.", "Он будет создавать видеоигры.", "иль крээра дэ жё видэо"],
    ["Il travaillera à l'étranger, peut-être à Paris.", "Он будет работать за границей, может быть, в Париже.", "иль травайёра а лэтранжэ, пётэтр а пари"],
    ["Un jour, il sera riche et célèbre !", "Однажды он станет богатым и знаменитым!", "эн жур, иль сёра риш э сэлэбр"],
  ] },
  tq: [
    { k: "choice", q: "Что Макс обычно делал вечером?", opts: ["играл в видеоигры", "читал", "гулял"], a: "играл в видеоигры", why: "D'habitude, Max jouait aux jeux vidéo — привычное: -ait" },
    { k: "choice", q: "Что ему приснилось?", opts: ["он создавал знаменитую игру", "он стал врачом", "он уехал за границу"], a: "он создавал знаменитую игру", why: "il créait un jeu vidéo célèbre" },
    { k: "choice", q: "Кем Макс станет?", opts: ["инженером", "врачом", "учителем"], a: "инженером", why: "Max sera ingénieur" },
  ],
  dialog: { t: "Кем ты будешь?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, qu'est-ce que tu feras plus tard ?", "Том, чем ты будешь заниматься потом?", "том, кэскё тю фёра плю тар"],
    ["B", "Je serai médecin.", "Я буду врачом.", "жё сёрэ мэдсэн"],
    ["A", "Médecin ! C'est difficile ! Et tu habiteras où ?", "Врачом! Это трудно! А где будешь жить?", "мэдсэн! сэ дифисиль! э тю абитёра у"],
    ["B", "J'habiterai à l'étranger. Et toi ?", "Я буду жить за границей. А ты?", "жабитёрэ а лэтранжэ. э туа"],
    ["A", "Moi, je serai ingénieur. Je construirai des maisons.", "А я буду инженером. Буду строить дома.", "муа, жё сёрэ энжэньёр. жё констрюирэ дэ мэзон"],
    ["B", "Et tu seras riche !", "И станешь богатой!", "э тю сёра риш"],
    ["A", "Peut-être ! Mon rêve, c'est une maison à la mer.", "Может быть! Моя мечта — дом у моря.", "пётэтр! мон рэв, сэ тюн мэзон а ла мэр"],
  ] },
  dq: [
    { k: "choice", q: "Кем будет Том?", opts: ["врачом", "инженером", "учителем"], a: "врачом", why: "Je serai médecin" },
    { k: "choice", q: "Где Том будет жить?", opts: ["за границей", "в Париже", "у моря"], a: "за границей", why: "J'habiterai à l'étranger" },
    { k: "choice", q: "О чём мечтает Леа?", opts: ["о доме у моря", "о машине", "о путешествии"], a: "о доме у моря", why: "Mon rêve, c'est une maison à la mer" },
  ],
  gram: [
    { k: "choice", q: "Soudain, le téléphone ___.", opts: ["a sonné", "sonnait", "sonnera"], a: "a sonné", why: "вдруг, один раз — прошлое с avoir: a sonné" },
    { k: "choice", q: "D'habitude, je ___ à huit heures.", opts: ["partais", "suis parti", "partirai"], a: "partais", why: "обычно, по привычке — форма на -ais" },
    { k: "input", lang: "fr", q: "Я буду богатым.", a: ["Je serai riche."], why: "être в будущем: je serai" },
    { k: "choice", q: "Будущее от aller: «я пойду»", opts: ["j'irai", "j'allerai", "je vais"], a: "j'irai", why: "aller в будущем неправильный: j'irai" },
    { k: "fix", lang: "fr", q: "Plus tard, tu deveniras célèbre.", a: ["Plus tard, tu deviendras célèbre."], why: "devenir в будущем: tu deviendras" },
  ],
  write: { goal: "Расскажи, каким ты был раньше и кем станешь.",
    steps: [
      ["Что ты обычно делал раньше", "D'habitude, je jouais…", "\\b(je \\w+ais|j'(?![ée]tais)\\w+ais)\\b"],
      ["Одно событие", "Une fois, j'ai rencontré…", "\\bj'ai \\w+"],
      ["Кем ты будешь через десять лет", "Je serai ingénieur.", "\\bje serai\\b"],
      ["Что ты будешь делать", "Je créerai des jeux.", "\\b(je|j')\\s?(?!serai)\\w+rai\\b"]],
    model: "D'habitude, je jouais aux jeux vidéo le soir. Une fois, j'ai rencontré un ingénieur. Plus tard, je serai ingénieur aussi. Je créerai des jeux !",
    modelRu: "Раньше по вечерам я обычно играл в видеоигры. Однажды я познакомился с инженером. Потом я тоже стану инженером. Я буду создавать игры!" },
};
