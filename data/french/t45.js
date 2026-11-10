window.FR_T = window.FR_T || {};
FR_T[45] = {
  words: [["la douche", "душ", "ла душ"], ["le réveil", "будильник", "лё рэвэй"], ["se brosser les dents", "чистить зубы", "сё бросэ ле дан"],
    ["le manteau", "пальто", "лё манто"], ["les chaussures", "обувь, ботинки", "ле шосюр"], ["se reposer", "отдыхать", "сё рёпозэ"], ["vite", "быстро", "вит"]],
  note: `<p>В приказе «-ся» переезжает <b>за</b> глагол и становится <b>toi</b>, а в запрете остаётся впереди:</p>
> Lève-toi ! :: Вставай! — «лэв туа»
> Ne te lève pas ! :: Не вставай! — «нё тё лэв па»
<p>Так же: {{Dépêche-toi !}} «Поторопись!», но «Ne te dépêche pas !» «Не торопись!».</p>`,
  text: { t: "Утро Юго", lines: [
    ["Le réveil sonne à sept heures.", "Будильник звонит в семь.", "лё рэвэй сон а сэтёр"],
    ["Hugo se réveille, mais il ne se lève pas.", "Юго просыпается, но не встаёт.", "юго сё рэвэй, мэ иль нё сё лэв па"],
    ["Sa mère l'appelle : « Hugo, lève-toi ! Dépêche-toi ! »", "Мама зовёт его: «Юго, вставай! Быстрее!»", "са мэр лапэль: юго, лэв туа! дэпэш туа"],
    ["Il prend une douche et il se brosse les dents.", "Он принимает душ и чистит зубы.", "иль пран юн душ э иль сё брос ле дан"],
    ["Il s'habille vite et il mange un croissant.", "Он быстро одевается и съедает круассан.", "иль сабий вит э иль манж эн круасан"],
    ["« Prends ton manteau ! Il fait froid ! »", "«Возьми пальто! Холодно!»", "пран тон манто! иль фэ фруа"],
    ["Hugo prend son sac et part à l'école.", "Юго берёт сумку и уходит в школу.", "юго пран сон сак э пар а лэколь"],
    ["Le soir, il se repose et il se couche tôt.", "Вечером он отдыхает и рано ложится спать.", "лё суар, иль сё рёпоз э иль сё куш то"],
  ] },
  tq: [
    { k: "choice", q: "Во сколько звонит будильник?", opts: ["в семь", "в шесть", "в восемь"], a: "в семь", why: "à sept heures" },
    { k: "choice", q: "Что кричит мама?", opts: ["вставай, быстрее!", "иди завтракать!", "не опоздай!"], a: "вставай, быстрее!", why: "lève-toi ! Dépêche-toi !" },
    { k: "choice", q: "Почему надо надеть пальто?", opts: ["холодно", "идёт дождь", "так красиво"], a: "холодно", why: "Il fait froid !" },
  ],
  dialog: { t: "Опаздываем!", who: { A: "Maman", B: "Hugo" }, lines: [
    ["A", "Hugo ! Réveille-toi ! Il est sept heures et demie !", "Юго! Просыпайся! Уже половина восьмого!", "юго! рэвэй туа! иль э сэтёр э дёми"],
    ["B", "Oh non ! Je suis en retard !", "Ой нет! Я опаздываю!", "о нон! жё сюи ан рётар"],
    ["A", "Lave-toi et habille-toi vite !", "Умывайся и быстро одевайся!", "лав туа э абий туа вит"],
    ["B", "Où sont mes chaussures ?", "Где мои ботинки?", "у сон мэ шосюр"],
    ["A", "Regarde dans la chambre !", "Посмотри в комнате!", "рёгард дан ла шамбр"],
    ["B", "Je les ai ! Et mon sac ?", "Нашёл! А моя сумка?", "жё лезэ! э мон сак"],
    ["A", "Le voilà. Mange un croissant !", "Вот она. Съешь круассан!", "лё вуаля. манж эн круасан"],
    ["B", "Je n'ai pas le temps ! Salut, maman !", "Нет времени! Пока, мама!", "жё нэ па лё тан! салю, маман"],
    ["A", "Ne cours pas !", "Не беги!", "нё кур па"],
  ] },
  dq: [
    { k: "choice", q: "Который час?", opts: ["половина восьмого", "семь", "восемь"], a: "половина восьмого", why: "sept heures et demie" },
    { k: "choice", q: "Где ботинки?", opts: ["в комнате", "на кухне", "в сумке"], a: "в комнате", why: "Regarde dans la chambre !" },
    { k: "choice", q: "Почему Юго не ест круассан?", opts: ["нет времени", "не голоден", "не любит круассаны"], a: "нет времени", why: "Je n'ai pas le temps !" },
  ],
  gram: [
    { k: "choice", q: "Je ___ lève à sept heures.", opts: ["me", "se", "te"], a: "me", why: "je me lève — я встаю" },
    { k: "choice", q: "Nous nous ___. (одеваемся)", opts: ["habillons", "habillez", "habille"], a: "habillons", why: "nous nous habillons" },
    { k: "input", lang: "fr", q: "Вставай!", a: ["Lève-toi !"], why: "в приказе: глагол + toi" },
    { k: "fix", lang: "fr", q: "Je lave me.", a: ["Je me lave."], why: "me стоит перед глаголом" },
    { k: "choice", q: "Как сказать «не ложись поздно!»?", opts: ["Ne te couche pas tard !", "Ne couche-toi pas tard !", "Te couche pas tard !"], a: "Ne te couche pas tard !", why: "в запрете: ne te … pas" },
    { k: "tiles", lang: "fr", q: "Мы гуляем в парке.", a: "Nous nous promenons au parc", d: ["se", "promène"], why: "nous nous promenons" },
  ],
  write: { goal: "Опиши своё утро.",
    steps: [
      ["Во сколько ты просыпаешься", "Je me réveille à sept heures.", "\\bje me r[ée]veille\\b"],
      ["Что ты делаешь дальше (глаголы на «-ся»)", "Je me lève, je m'habille.", "\\b(je me l[èe]ve|je m'habille|je me lave)\\b"],
      ["Что тебе говорят, когда ты опаздываешь (приказ)", "« Dépêche-toi ! »", "\\w+-toi\\b"]],
    model: "Je me réveille à sept heures. Je me lève et je m'habille. Ma mère dit : « Dépêche-toi ! »",
    modelRu: "Я просыпаюсь в семь. Встаю и одеваюсь. Мама говорит: «Поторапливайся!»" },
};
