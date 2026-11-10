window.FR_T = window.FR_T || {};
FR_T[33] = {
  words: [["le portable", "мобильник, телефон", "лё портабль"], ["le sac", "сумка", "лё сак"], ["partout", "везде", "парту"], ["la journée", "день (весь день)", "ла журнэ"],
    ["l'anniversaire", "день рождения", "ланивэрсэр"], ["heureusement", "к счастью", "ёрёзман"], ["terrible", "ужасный", "тэрибль"], ["le parapluie", "зонт", "лё параплюи"]],
  note: `<p>В прошлом <b>ne … pas</b> обнимает только «помощника» avoir, а сам глагол стоит после pas:</p>
> Je n'ai pas vu le film. :: Я не видел фильм. — «жё нэ па вю лё фильм»
> Il n'a rien dit. :: Он ничего не сказал. — «иль на рьен ди»`,
  text: { t: "Ужасный день Юго", lines: [
    ["Hier, Hugo a eu une journée terrible.", "Вчера у Юго был ужасный день.", "ийэр, юго а ю юн журнэ тэрибль"],
    ["Le matin, il a perdu son portable.", "Утром он потерял телефон.", "лё матэн, иль а пэрдю сон портабль"],
    ["Il a regardé partout : rien !", "Он смотрел везде — ничего!", "иль а рёгардэ парту: рьен"],
    ["Il a pris le bus, mais il a oublié son sac dans le bus !", "Он поехал на автобусе, но забыл сумку в автобусе!", "иль а при лё бюс, мэ иль а ублийе сон сак дан лё бюс"],
    ["Et il n'a pas pris le parapluie : il pleut !", "И он не взял зонт, а идёт дождь!", "э иль на па при лё параплюи: иль плё"],
    ["Le soir, il a vu Nina. Heureusement, elle a trouvé le portable et le sac !", "Вечером он увидел Нину. К счастью, она нашла телефон и сумку!", "лё суар, иль а вю нина. ёрёзман, эль а труве лё портабль э лё сак"],
    ["Et elle a acheté un gâteau : c'est l'anniversaire de Hugo !", "А ещё она купила торт: у Юго день рождения!", "э эль а аштэ эн гато: сэ ланивэрсэр дё юго"],
  ] },
  tq: [
    { k: "choice", q: "Что Юго потерял утром?", opts: ["телефон", "ключи", "сумку"], a: "телефон", why: "il a perdu son portable" },
    { k: "choice", q: "Где он забыл сумку?", opts: ["в автобусе", "в кафе", "дома"], a: "в автобусе", why: "il a oublié son sac dans le bus" },
    { k: "choice", q: "Кто нашёл телефон и сумку?", opts: ["Нина", "полиция", "сам Юго"], a: "Нина", why: "elle a trouvé le portable et le sac" },
    { k: "choice", q: "Зачем Нина купила торт?", opts: ["у Юго день рождения", "она любит торты", "это праздник"], a: "у Юго день рождения", why: "c'est l'anniversaire de Hugo" },
  ],
  dialog: { t: "Что ты делал вчера?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, qu'est-ce que tu as fait hier ?", "Том, что ты вчера делал?", "том, кэскё тю а фэ ийэр"],
    ["B", "J'ai vu un film au cinéma.", "Смотрел фильм в кино.", "жэ вю эн фильм о синэма"],
    ["A", "Quel film ?", "Какой фильм?", "кэль фильм"],
    ["B", "Un film russe. J'ai lu le livre aussi.", "Русский. Я и книгу читал.", "эн фильм рюс. жэ лю лё ливр оси"],
    ["A", "Et tu as aimé ?", "И как, понравилось?", "э тю а эмэ"],
    ["B", "Oui, beaucoup ! Et tu as fait quoi, Léa ?", "Да, очень! А ты что делала, Леа?", "уи, боку! э тю а фэ куа, леа"],
    ["A", "J'ai écrit une lettre à ma grand-mère et j'ai acheté un cadeau.", "Я написала письмо бабушке и купила подарок.", "жэ экри юн лэтр а ма гранмэр э жэ аштэ эн кадо"],
    ["B", "Un cadeau ? À qui ?", "Подарок? Кому?", "эн кадо? а ки"],
    ["A", "À mon frère. Demain, c'est son anniversaire !", "Брату. Завтра у него день рождения!", "а мон фрэр. дёмэн, сэ сон нанивэрсэр"],
  ] },
  dq: [
    { k: "choice", q: "Что Том делал вчера?", opts: ["смотрел фильм", "писал письмо", "покупал подарок"], a: "смотрел фильм", why: "J'ai vu un film au cinéma" },
    { k: "choice", q: "Понравился ли фильм Тому?", opts: ["да, очень", "нет", "он не досмотрел"], a: "да, очень", why: "Oui, beaucoup !" },
    { k: "choice", q: "Кому Леа купила подарок?", opts: ["брату", "бабушке", "Тому"], a: "брату", why: "À mon frère" },
  ],
  gram: [
    { k: "choice", q: "Hier, j'___ mangé une pomme.", opts: ["ai", "suis", "vais"], a: "ai", why: "прошлое: avoir + mangé" },
    { k: "choice", q: "Прошлое от voir («видеть»):", opts: ["vu", "voi", "voiré"], a: "vu", why: "voir → j'ai vu" },
    { k: "input", lang: "fr", q: "Я забыл ключ.", a: ["J'ai oublié la clé.", "J'ai oublié ma clé."], why: "oublier → j'ai oublié" },
    { k: "fix", lang: "fr", q: "Il a prendu le bus.", a: ["Il a pris le bus."], why: "prendre → pris (неправильный)" },
    { k: "choice", q: "Как спросить «ты прочитал газету?»", opts: ["Tu as lu le journal ?", "Tu as lisé le journal ?", "Tu es lu le journal ?"], a: "Tu as lu le journal ?", why: "lire → lu" },
    { k: "tiles", lang: "fr", q: "Мы сходили за продуктами.", a: "Nous avons fait les courses", d: ["faisons", "sommes"], why: "faire → fait; nous avons fait" },
  ],
  write: { goal: "Расскажи, что ты делал вчера.",
    steps: [
      ["Начни со слова «вчера»", "Hier, …", "\\bhier\\b"],
      ["Что ты сделал или купил", "J'ai fait les courses. J'ai acheté du pain.", "\\bj'ai \\w+"],
      ["Чего ты не сделал", "Je n'ai pas fait les devoirs.", "\\bje n'ai pas\\b"]],
    model: "Hier, j'ai fait les courses. J'ai acheté du pain et du fromage. Le soir, j'ai vu un film. Je n'ai pas fait les devoirs !",
    modelRu: "Вчера я ходил за продуктами. Я купил хлеб и сыр. Вечером я посмотрел фильм. Домашку я не сделал!" },
};
