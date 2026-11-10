window.FR_T = window.FR_T || {};
FR_T[12] = {
  words: [["adorer", "обожать", "адорэ"], ["détester", "терпеть не мочь, ненавидеть", "дэтэстэ"], ["la télé", "телевизор, ТВ", "ла тэлэ"],
    ["la série", "сериал", "ла сэри"], ["le jeu vidéo, les jeux vidéo", "видеоигра, видеоигры", "лё жё видэо, ле жё видэо"],
    ["le dessin animé", "мультфильм", "лё дэсэн анимэ"], ["le copain", "приятель, друг", "лё копэн"], ["la copine", "подружка", "ла копин"], ["mais", "но; а, зато", "мэ"]],
  note: `<p>После «люблю, обожаю, ненавижу» во французском <b>всегда ставят le, la, les</b> — это значит «вообще все такие»:</p>
> J'adore les chats. :: Обожаю кошек. — «жадор ле ша»
> Je déteste la télé. :: Терпеть не могу телевизор. — «жё дэтэст ла тэлэ»
<p>По-русски артикля нет, поэтому его легко забыть: «j'adore chats» — ошибка.</p>`,
  text: { t: "Хюго и Нина", lines: [
    ["Voici Hugo et Nina.", "Вот Юго и Нина.", "вуаси юго э нина"],
    ["Hugo est un copain. Nina est une copine.", "Юго — приятель. Нина — подружка.", "юго э эн копэн. нина э юн копин"],
    ["Hugo adore les jeux vidéo.", "Юго обожает видеоигры.", "юго адор ле жё видэо"],
    ["Nina adore les séries.", "Нина обожает сериалы.", "нина адор ле сэри"],
    ["Le soir, ils regardent des dessins animés.", "Вечером они смотрят мультики.", "лё суар, иль рёгард дэ дэсэн анимэ"],
    ["Hugo chante et Nina danse.", "Юго поёт, а Нина танцует.", "юго шант э нина данс"],
    ["Hugo déteste les chats, mais il aime les chiens.", "Юго терпеть не может кошек, зато любит собак.", "юго дэтэст ле ша, мэ иль эм ле шьен"],
  ] },
  tq: [
    { k: "choice", q: "Что обожает Нина?", opts: ["сериалы", "видеоигры", "кошек"], a: "сериалы", why: "Nina adore les séries" },
    { k: "choice", q: "Что они делают вечером?", opts: ["смотрят мультики", "танцуют", "читают книги"], a: "смотрят мультики", why: "Le soir, ils regardent des dessins animés" },
    { k: "choice", q: "Кого Юго терпеть не может?", opts: ["кошек", "собак", "Нину"], a: "кошек", why: "Hugo déteste les chats" },
  ],
  dialog: { t: "Что смотришь?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Salut, Tom ! Tu regardes la télé ?", "Привет, Том! Смотришь телевизор?", "салю, том! тю рёгард ла тэлэ"],
    ["B", "Oui. Je regarde une série. J'adore les séries !", "Да. Смотрю сериал. Обожаю сериалы!", "уи. жё рёгард юн сэри. жадор ле сэри"],
    ["A", "Et les jeux vidéo ?", "А видеоигры?", "э ле жё видэо"],
    ["B", "Je déteste les jeux vidéo. J'aime les livres.", "Терпеть не могу видеоигры. Я люблю книги.", "жё дэтэст ле жё видэо. жэм ле ливр"],
    ["A", "J'adore les jeux vidéo ! Et j'aime les dessins animés.", "А я обожаю видеоигры! И люблю мультики.", "жадор ле жё видэо! э жэм ле дэсэн анимэ"],
    ["B", "Voici un dessin animé ! On regarde ?", "Вот мультик! Посмотрим?", "вуаси эн дэсэн анимэ! он рёгард"],
    ["A", "Oui ! Merci, Tom !", "Да! Спасибо, Том!", "уи! мэрси, том"],
  ] },
  dq: [
    { k: "choice", q: "Что смотрит Том?", opts: ["сериал", "мультик", "фильм"], a: "сериал", why: "Je regarde une série" },
    { k: "choice", q: "Что Том терпеть не может?", opts: ["видеоигры", "книги", "сериалы"], a: "видеоигры", why: "Je déteste les jeux vidéo" },
    { k: "choice", q: "Что любит Леа?", opts: ["видеоигры и мультики", "книги", "сериалы"], a: "видеоигры и мультики", why: "J'adore les jeux vidéo ! Et j'aime les dessins animés" },
  ],
  gram: [
    { k: "choice", q: "Nous ___ la télé.", opts: ["regardons", "regardez", "regarde"], a: "regardons", why: "nous — окончание -ons" },
    { k: "input", lang: "fr", q: "Они танцуют.", a: ["Ils dansent.", "Elles dansent."], why: "ils + -ent (не читается)" },
    { k: "fix", lang: "fr", q: "Je adore les chats.", a: ["J'adore les chats."], why: "перед гласной je → j'" },
    { k: "choice", q: "Как сказать «обожаю собак»?", opts: ["J'adore les chiens.", "J'adore chiens.", "J'adore des chiens."], a: "J'adore les chiens.", why: "после adorer, aimer, détester — le, la, les" },
    { k: "tiles", lang: "fr", q: "Вы говорите по-французски.", a: "Vous parlez français", d: ["parlons", "chante"], why: "vous + -ez" },
  ],
  write: { q: "Напиши 3–4 предложения: что ты обожаешь, что любишь и что терпеть не можешь (<i>j'adore…, j'aime…, je déteste…</i>). Не забудь le, la, les!",
    need: [["\\bj'adore\\b", "есть j'adore"], ["\\bje d[ée]teste\\b", "есть je déteste"], ["\\b(j'adore|j'aime|je d[ée]teste) (les|le|la|l')", "после «люблю» стоит le, la, les"]],
    model: "J'adore les jeux vidéo. J'aime les chats et les chiens. Je déteste les séries. Le soir, je regarde des dessins animés.",
    modelRu: "Обожаю видеоигры. Люблю кошек и собак. Терпеть не могу сериалы. Вечером я смотрю мультики.", min: 3 },
};
