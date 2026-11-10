window.FR_T = window.FR_T || {};
FR_T[35] = {
  words: [["la ferme", "ферма", "ла фэрм"], ["la vache", "корова", "ла ваш"], ["le cheval", "лошадь", "лё шёваль"], ["le lac", "озеро", "лё лак"],
    ["pêcher", "рыбачить", "пэшэ"], ["courir", "бегать", "курир"], ["le souvenir", "воспоминание", "лё сувнир"], ["l'enfance", "детство", "ланфанс"]],
  note: `<p>С <b>être</b> прошлое меняется по роду — как прилагательное. Женщина пишет иначе, а звучит обычно одинаково:</p>
> Il est tombé. :: Он упал. — «иль э томбэ»
> Elle est tombée. :: Она упала. — «эль э томбэ»
> Ils sont venus. :: Они пришли. — «иль сон вёню»`,
  text: { t: "Детство бабушки", lines: [
    ["Petite, la grand-mère de Nina habitait à la campagne.", "В детстве бабушка Нины жила в деревне.", "пётит, ла гранмэр дё нина абитэ а ла кампань"],
    ["Ses parents habitaient dans une ferme.", "Её родители жили на ферме.", "сэ паран абитэ дан зюн фэрм"],
    ["Il y avait des vaches et un cheval.", "Там были коровы и лошадь.", "иль явэ дэ ваш э эн шёваль"],
    ["Tous les jours, elle allait au lac.", "Каждый день она ходила на озеро.", "ту ле жур, эль алэ о лак"],
    ["Souvent, son père pêchait des poissons.", "Её отец часто ловил рыбу.", "суван, сон пэр пэшэ дэ пуасон"],
    ["Et à dix ans, elle est tombée du cheval !", "А в десять лет она упала с лошади!", "э а дизан, эль э томбэ дю шёваль"],
    ["Elle est restée trois semaines à la maison.", "Она три недели сидела дома.", "эль э рэстэ труа сёмэн а ла мэзон"],
    ["Mais l'enfance à la ferme, c'est un très beau souvenir.", "Но детство на ферме — очень красивое воспоминание.", "мэ ланфанс а ла фэрм, сэ тэн трэ бо сувнир"],
  ] },
  tq: [
    { k: "choice", q: "Где жила бабушка в детстве?", opts: ["в деревне", "в Париже", "у моря"], a: "в деревне", why: "elle habitait à la campagne" },
    { k: "choice", q: "Что часто делал её отец?", opts: ["ловил рыбу", "катался на лошади", "работал в городе"], a: "ловил рыбу", why: "son père pêchait des poissons" },
    { k: "choice", q: "Что случилось, когда ей было десять?", opts: ["упала с лошади", "переехала в город", "потерялась в лесу"], a: "упала с лошади", why: "elle est tombée du cheval" },
  ],
  dialog: { t: "А как было у тебя?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, quand tu étais petit, tu habitais où ?", "Том, где ты жил, когда был маленьким?", "том, кан тю этэ пёти, тю абитэ у"],
    ["B", "J'habitais en Russie, dans une petite ville.", "В России, в маленьком городе.", "жабитэ ан рюси, дан зюн пётит виль"],
    ["A", "Et tu allais à la mer ?", "А на море ездил?", "э тю алэ а ла мэр"],
    ["B", "Non, mais il y avait un lac.", "Нет, но там было озеро.", "нон, мэ иль явэ эн лак"],
    ["A", "Tu allais nager ?", "Ходил плавать?", "тю алэ нажэ"],
    ["B", "Oui, tous les jours ! Et mon grand-père pêchait.", "Да, каждый день! А дедушка рыбачил.", "уи, ту ле жур! э мон гранпэр пэшэ"],
    ["A", "Moi, j'habitais à Paris. Je ne suis jamais allée à la campagne !", "А я жила в Париже. Я ни разу не была в деревне!", "муа, жабитэ а пари. жё нё сюи жамэ алэ а ла кампань"],
    ["B", "Jamais ? Tu dois venir chez mon grand-père !", "Ни разу?! Тебе надо приехать к моему дедушке!", "жамэ? тю дуа вёнир шэ мон гранпэр"],
  ] },
  dq: [
    { k: "choice", q: "Где Том жил в детстве?", opts: ["в маленьком городе в России", "в Париже", "на ферме"], a: "в маленьком городе в России", why: "J'habitais en Russie, dans une petite ville" },
    { k: "choice", q: "Что Том делал каждый день?", opts: ["плавал", "рыбачил", "ездил на море"], a: "плавал", why: "Tu allais nager ? — Oui, tous les jours !" },
    { k: "choice", q: "Где жила Леа в детстве?", opts: ["в Париже", "в деревне", "в России"], a: "в Париже", why: "j'habitais à Paris" },
  ],
  gram: [
    { k: "choice", q: "Hier, elle ___ allée au musée.", opts: ["est", "a", "était"], a: "est", why: "aller — с être: elle est allée" },
    { k: "choice", q: "Quand j'étais petit, je ___ souvent.", opts: ["jouais", "ai joué", "joue"], a: "jouais", why: "привычное в прошлом — форма на -ais" },
    { k: "input", lang: "fr", q: "Мы пришли.", a: ["Nous sommes venus.", "On est venus.", "Nous sommes venues."], why: "venir — с être: nous sommes venus" },
    { k: "fix", lang: "fr", q: "Il a tombé.", a: ["Il est tombé."], why: "tomber — с être" },
    { k: "choice", q: "Elle est ___ (пришла).", opts: ["venue", "venu", "venus"], a: "venue", why: "с être — по роду: она → venue" },
  ],
  write: { q: "Напиши 3–4 предложения о своём детстве: как было обычно (<i>quand j'étais petit, je …-ais</i>) и одно событие (<i>à … ans, je suis allé / tombé …</i>).",
    need: [["\\bquand j'[ée]tais\\b", "есть quand j'étais"], ["\\b(j'|je )\\w+ais\\b", "есть привычное прошлое на -ais"], ["\\bje suis \\w+", "есть je suis + прошлое (allé, tombé…)"]],
    model: "Quand j'étais petit, j'habitais dans une petite ville. Tous les jours, je jouais au parc. Souvent, j'allais chez ma grand-mère. À sept ans, je suis tombé du vélo !",
    modelRu: "Когда я был маленьким, я жил в маленьком городе. Каждый день я играл в парке. Я часто ездил к бабушке. В семь лет я упал с велосипеда!", min: 3 },
};
