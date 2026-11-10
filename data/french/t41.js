window.FR_T = window.FR_T || {};
FR_T[41] = {
  words: [["offrir", "дарить", "офрир"], ["la carte", "открытка; карта", "ла карт"], ["le parfum", "духи", "лё парфэн"], ["la montre", "часы (наручные)", "ла монтр"],
    ["remercier", "благодарить", "рёмэрсье"], ["la surprise", "сюрприз", "ла сюрприз"], ["cacher", "прятать", "кашэ"], ["le paquet", "свёрток, пакет", "лё пакэ"]],
  note: `<p>Короткая проверка, что ставить: спроси «кого?» или «кому?».</p>
> Je le vois. :: Я его вижу (кого?). — «жё лё вуа»
> Je lui parle. :: Я с ним говорю (кому?). — «жё люи парль»
<p>И те, и другие стоят <b>перед глаголом</b> — даже в будущем с aller: je vais <b>lui</b> offrir.</p>`,
  text: { t: "Подарок для Нины", lines: [
    ["Samedi, c'est l'anniversaire de Nina.", "В субботу у Нины день рождения.", "самди, сэ ланивэрсэр дё нина"],
    ["Hugo cherche un cadeau depuis une semaine.", "Юго уже неделю ищет подарок.", "юго шэрш эн кадо дёпюи зюн сёмэн"],
    ["Nina adore la musique.", "Нина обожает музыку.", "нина адор ла мюзик"],
    ["Il va lui offrir une montre et une carte.", "Он подарит ей часы и открытку.", "иль ва люи офрир юн монтр э юн карт"],
    ["Il cache le paquet dans son sac.", "Он прячет свёрток в сумке.", "иль каш лё пакэ дан сон сак"],
    ["Samedi, il le donne à Nina : surprise !", "В субботу он дарит его Нине: сюрприз!", "самди, иль лё дон а нина: сюрприз"],
    ["Nina le regarde et elle le remercie.", "Нина смотрит на него и благодарит его.", "нина лё рёгард э эль лё рёмэрси"],
    ["Le soir, elle lui envoie un message : « Merci ! »", "Вечером она отправляет ему сообщение: «Спасибо!»", "лё суар, эль люи анвуа эн мэсаж: мэрси"],
  ] },
  tq: [
    { k: "choice", q: "Что Юго дарит Нине?", opts: ["часы и открытку", "духи", "диск с музыкой"], a: "часы и открытку", why: "une montre et une carte" },
    { k: "choice", q: "Где он прячет подарок?", opts: ["в сумке", "в машине", "дома"], a: "в сумке", why: "Il cache le paquet dans son sac" },
    { k: "choice", q: "Что Нина делает вечером?", opts: ["пишет ему сообщение", "звонит ему", "приходит к нему"], a: "пишет ему сообщение", why: "elle lui envoie un message" },
  ],
  dialog: { t: "Что подарить?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, tu connais Max ?", "Том, ты знаешь Макса?", "том, тю конэ макс"],
    ["B", "Oui, je le connais. Pourquoi ?", "Да, знаю. А что?", "уи, жё лё конэ. пуркуа"],
    ["A", "Demain, c'est son anniversaire. Je veux lui offrir un cadeau.", "Завтра у него день рождения. Хочу сделать ему подарок.", "дёмэн, сэ сон нанивэрсэр. жё вё люи офрир эн кадо"],
    ["B", "Tu lui as déjà demandé ?", "Ты его уже спрашивала?", "тю люи а дэжа дёмандэ"],
    ["A", "Non ! C'est une surprise !", "Нет! Это сюрприз!", "нон! сэ тюн сюрприз"],
    ["B", "Il adore les jeux vidéo. Tu peux lui offrir un jeu.", "Он обожает видеоигры. Можешь подарить ему игру.", "иль адор ле жё видэо. тю пё люи офрир эн жё"],
    ["A", "D'accord ! Tu me montres le magasin ?", "Хорошо! Покажешь мне магазин?", "дакор! тю мё монтр лё магазэн"],
    ["B", "Oui, je t'appelle après le cours.", "Да, я тебе позвоню после урока.", "уи, жё тапэль апрэ лё кур"],
  ] },
  dq: [
    { k: "choice", q: "Зачем Леа подарок?", opts: ["у Макса завтра день рождения", "у Тома праздник", "это подарок маме"], a: "у Макса завтра день рождения", why: "Demain, c'est son anniversaire" },
    { k: "choice", q: "Знает ли Макс о подарке?", opts: ["нет, это сюрприз", "да, он сам попросил", "да, Том рассказал"], a: "нет, это сюрприз", why: "C'est une surprise !" },
    { k: "choice", q: "Что Том советует подарить?", opts: ["видеоигру", "часы", "книгу"], a: "видеоигру", why: "Tu peux lui offrir un jeu" },
  ],
  gram: [
    { k: "choice", q: "Tu vois Nina ? — Oui, je ___ vois.", opts: ["la", "lui", "le"], a: "la", why: "видеть кого? — её: la" },
    { k: "choice", q: "Tu parles à Max ? — Oui, je ___ parle.", opts: ["lui", "le", "la"], a: "lui", why: "parler à — кому? — lui" },
    { k: "input", lang: "fr", q: "Я их знаю.", a: ["Je les connais."], why: "кого? — их: les перед глаголом" },
    { k: "fix", lang: "fr", q: "Je donne lui le livre.", a: ["Je lui donne le livre."], why: "lui стоит перед глаголом" },
    { k: "choice", q: "Как сказать «ты мне звонишь?»", opts: ["Tu m'appelles ?", "Tu appelles me ?", "Tu me appelles ?"], a: "Tu m'appelles ?", why: "me перед гласной → m', и стоит перед глаголом" },
    { k: "tiles", lang: "fr", q: "Мы отправляем им открытку.", a: "Nous leur envoyons une carte", d: ["les", "lui"], why: "кому? им — leur" },
  ],
  write: { q: "Напиши 3–4 предложения: кому ты хочешь сделать подарок, что подаришь и что скажешь. Используй <i>lui / leur</i> и <i>le / la / les</i> перед глаголом.",
    need: [["\\b(lui|leur)\\b", "есть lui или leur"], ["\\b(je|il|elle|on|tu|nous|vous) (le|la|les|l')\\s?\\w+", "есть le / la / les перед глаголом"]],
    model: "Samedi, c'est l'anniversaire de ma sœur. Je vais lui offrir une montre. Je la cache dans mon sac. Samedi, je lui donne le cadeau : surprise !",
    modelRu: "В субботу у моей сестры день рождения. Я подарю ей часы. Я прячу их в сумке. В субботу я дарю ей подарок: сюрприз!", min: 3 },
};
