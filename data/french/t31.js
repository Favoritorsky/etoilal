window.FR_T = window.FR_T || {};
FR_T[31] = {
  words: [["les vacances", "каникулы, отпуск", "ле вакaнс"], ["la valise", "чемодан", "ла вализ"], ["l'aéroport", "аэропорт", "лаэропор"],
    ["réserver", "бронировать", "рэзэрвэ"], ["préparer", "готовить, собирать", "прэпарэ"], ["la randonnée", "поход (пешком)", "ла рандонэ"],
    ["le sac à dos", "рюкзак", "лё сак а до"], ["la tente", "палатка", "ла тант"]],
  note: `<p>Два глагола — как два направления времени:</p>
> Je vais partir. :: Я сейчас уеду (собираюсь). — «жё вэ партир»: aller — вперёд
> Je viens de partir. :: Я только что уехал. — «жё вьен дё партир»: venir de — назад
<p>Это самые лёгкие «будущее» и «прошлое»: берёшь глагол целиком и ставишь перед ним je vais или je viens de.</p>`,
  text: { t: "Скоро каникулы", lines: [
    ["Bientôt, les vacances !", "Скоро каникулы!", "бьенто, ле вакaнс"],
    ["Hugo et Nina vont voyager.", "Юго и Нина собираются путешествовать.", "юго э нина вон вуаяжэ"],
    ["Ils vont aller à la montagne.", "Они поедут в горы.", "иль вон але а ла монтань"],
    ["Ils vont faire une randonnée et dormir dans une tente.", "Они пойдут в поход и будут спать в палатке.", "иль вон фэр юн рандонэ э дормир дан зюн тант"],
    ["Nina vient de réserver les billets d'avion.", "Нина только что забронировала билеты на самолёт.", "нина вьен дё рэзэрвэ ле бийе давьон"],
    ["Hugo vient de préparer le sac à dos.", "Юго только что собрал рюкзак.", "юго вьен дё прэпарэ лё сак а до"],
    ["L'avion part demain à six heures !", "Самолёт завтра в шесть утра!", "лавьон пар дёмэн а сизёр"],
  ] },
  tq: [
    { k: "choice", q: "Куда они поедут?", opts: ["в горы", "на море", "в Париж"], a: "в горы", why: "Ils vont aller à la montagne" },
    { k: "choice", q: "Что только что сделала Нина?", opts: ["забронировала билеты", "собрала рюкзак", "купила палатку"], a: "забронировала билеты", why: "Nina vient de réserver les billets" },
    { k: "choice", q: "Когда самолёт?", opts: ["завтра в шесть", "сегодня вечером", "в субботу"], a: "завтра в шесть", why: "L'avion part demain à six heures" },
  ],
  dialog: { t: "Что будешь делать?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom ! Tu vas faire quoi le week-end prochain ?", "Том! Что будешь делать в следующие выходные?", "том! тю ва фэр куа лё уикэнд прошэн"],
    ["B", "Je vais visiter Lyon !", "Поеду смотреть Лион!", "жё вэ визитэ льон"],
    ["A", "Ah ! Tu vas prendre le train ?", "О! Поедешь на поезде?", "а! тю ва прандр лё трэн"],
    ["B", "Oui. Je viens de réserver le billet.", "Да. Я только что забронировал билет.", "уи. жё вьен дё рэзэрвэ лё бийе"],
    ["A", "Et tu vas dormir où ?", "А где будешь спать?", "э тю ва дормир у"],
    ["B", "Chez mon cousin. Il vient d'arriver à Lyon.", "У двоюродного брата. Он только что переехал в Лион.", "шэ мон кузэн. иль вьен даривэ а льон"],
    ["A", "Moi, je vais inviter des amis et faire un repas.", "А я приглашу друзей и приготовлю ужин.", "муа, жё вэ энвитэ дэ зами э фэр эн рёпа"],
    ["B", "Tu vas téléphoner à Nina ?", "Позвонишь Нине?", "тю ва тэлэфонэ а нина"],
    ["A", "Oui, je viens de téléphoner !", "Да, я только что звонила!", "уи, жё вьен дё тэлэфонэ"],
  ] },
  dq: [
    { k: "choice", q: "Что будет делать Том?", opts: ["поедет в Лион", "пригласит друзей", "останется дома"], a: "поедет в Лион", why: "Je vais visiter Lyon" },
    { k: "choice", q: "Где Том будет спать?", opts: ["у двоюродного брата", "в гостинице", "в палатке"], a: "у двоюродного брата", why: "Chez mon cousin" },
    { k: "choice", q: "Что будет делать Леа?", opts: ["пригласит друзей на ужин", "поедет в Лион", "пойдёт в поход"], a: "пригласит друзей на ужин", why: "je vais inviter des amis et faire un repas" },
  ],
  gram: [
    { k: "choice", q: "Demain, je ___ voyager.", opts: ["vais", "viens de", "vas"], a: "vais", why: "завтра — будущее: je vais + глагол" },
    { k: "choice", q: "Как сказать «я только что поел»?", opts: ["Je viens de manger.", "Je vais manger.", "Je viens manger."], a: "Je viens de manger.", why: "только что — venir de + глагол" },
    { k: "input", lang: "fr", q: "Мы собираемся пригласить друзей.", a: ["Nous allons inviter des amis.", "On va inviter des amis."], why: "nous allons + глагол целиком" },
    { k: "fix", lang: "fr", q: "Il va téléphone à Nina.", a: ["Il va téléphoner à Nina."], why: "после aller — глагол целиком: téléphoner" },
    { k: "tiles", lang: "fr", q: "Она только что приехала.", a: "Elle vient d'arriver", d: ["va", "arrive"], why: "venir de + arriver → vient d'arriver" },
  ],
  write: { q: "Напиши 3–4 предложения о планах: что ты собираешься сделать скоро (<i>je vais + глагол</i>) и что ты только что сделал (<i>je viens de + глагол</i>).",
    need: [["\\b(je vais|on va|nous allons) \\w+(er|ir|re)\\b", "есть je vais + глагол"], ["\\bje viens d(e|')", "есть je viens de"]],
    model: "Le week-end prochain, je vais voyager. Je vais visiter Lyon et je vais faire une randonnée. Je viens de réserver le billet. Je viens de préparer la valise !",
    modelRu: "В следующие выходные я поеду путешествовать. Я посмотрю Лион и схожу в поход. Я только что забронировал билет. Я только что собрал чемодан!", min: 3 },
};
