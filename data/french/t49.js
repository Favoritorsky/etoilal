window.FR_T = window.FR_T || {};
FR_T[49] = {
  words: [["la capitale", "столица", "ла капиталь"], ["calme", "спокойный, тихий", "кальм"], ["bruyant, bruyante", "шумный", "брюйян, брюйянт"], ["moderne", "современный", "модэрн"],
    ["ancien, ancienne", "старинный, старый", "ансьен, ансьен"], ["bon marché", "дешёвый", "бон маршэ"], ["la vue", "вид (из окна, на город)", "ла вю"], ["le pont", "мост", "лё пон"]],
  note: `<p>{{bon marché}} «дешёвый» — буквально «хороший рынок», и оно не меняется: un pull bon marché, des pulls bon marché. А «дороже» и «дешевле» — через plus и moins:</p>
> Paris est plus cher que Lyon. :: Париж дороже Лиона. — «пари э плю шэр кё льон»
> Lyon est moins cher. :: Лион дешевле. — «льон э муэн шэр»`,
  text: { t: "Париж или Лион?", lines: [
    ["Max habite à Lyon, mais il adore Paris.", "Макс живёт в Лионе, но обожает Париж.", "макс абит а льон, мэ иль адор пари"],
    ["Paris est plus grand que Lyon : c'est la capitale de la France.", "Париж больше Лиона: это столица Франции.", "пари э плю гран кё льон: сэ ла капиталь дё ла франс"],
    ["Mais Paris est plus bruyant et plus cher.", "Но Париж шумнее и дороже.", "мэ пари э плю брюйян э плю шэр"],
    ["Lyon est moins cher et plus calme.", "Лион дешевле и спокойнее.", "льон э муэн шэр э плю кальм"],
    ["Le quartier où Max habite est ancien et très joli.", "Район, где живёт Макс, старинный и очень красивый.", "лё картье у макс абит э тансьен э трэ жоли"],
    ["Il y a un pont d'où on a la plus belle vue de la ville.", "Там есть мост, откуда самый красивый вид на город.", "иль я эн пон ду он на ла плю бэль вю дё ла виль"],
    ["Pour Max, la cuisine de Lyon est la meilleure de France !", "Для Макса лионская кухня — лучшая во Франции!", "пур макс, ла кюизин дё льон э ла мэйёр дё франс"],
  ] },
  tq: [
    { k: "choice", q: "Какой город больше?", opts: ["Париж", "Лион", "они одинаковые"], a: "Париж", why: "Paris est plus grand que Lyon" },
    { k: "choice", q: "Какой Лион по сравнению с Парижем?", opts: ["дешевле и спокойнее", "дороже и шумнее", "больше"], a: "дешевле и спокойнее", why: "Lyon est moins cher et plus calme" },
    { k: "choice", q: "Что в Лионе лучшее, по мнению Макса?", opts: ["кухня", "мост", "район"], a: "кухня", why: "la cuisine de Lyon est la meilleure de France" },
  ],
  dialog: { t: "Какой свитер?", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, quel pull est le plus joli ?", "Том, какой свитер красивее?", "том, кэль пюль э лё плю жоли"],
    ["B", "Le pull qui est sur la table ?", "Тот, что на столе?", "лё пюль ки э сюр ла табль"],
    ["A", "Non, le pull que j'ai acheté hier. Il est derrière toi.", "Нет, тот, что я купила вчера. Он за тобой.", "нон, лё пюль кё жэ аштэ ийэр. иль э дэрьер туа"],
    ["B", "Il est joli, mais le vert est plus joli.", "Он красивый, но зелёный красивее.", "иль э жоли, мэ лё вэр э плю жоли"],
    ["A", "Le vert ? Il est plus cher !", "Зелёный? Он дороже!", "лё вэр? иль э плю шэр"],
    ["B", "Oui, mais il est meilleur.", "Да, но он лучше.", "уи, мэ иль э мэйёр"],
    ["A", "D'accord, je vais acheter le vert.", "Ладно, куплю зелёный.", "дакор, жё вэ аштэ лё вэр"],
    ["B", "Et tu vas le mettre demain ?", "И наденешь его завтра?", "э тю ва лё мэтр дёмэн"],
    ["A", "Oui, pour la fête !", "Да, на праздник!", "уи, пур ла фэт"],
  ] },
  dq: [
    { k: "choice", q: "Где свитер, который Леа купила вчера?", opts: ["за Томом", "на столе", "в сумке"], a: "за Томом", why: "Il est derrière toi" },
    { k: "choice", q: "Какой свитер Тому нравится больше?", opts: ["зелёный", "тот, что на столе", "вчерашний"], a: "зелёный", why: "le vert est plus joli" },
    { k: "choice", q: "Когда Леа его наденет?", opts: ["завтра на праздник", "сегодня", "в субботу"], a: "завтра на праздник", why: "demain … pour la fête" },
  ],
  gram: [
    { k: "choice", q: "Paris est ___ grand que Lyon.", opts: ["plus", "le plus", "très plus"], a: "plus", why: "сравнение: plus … que" },
    { k: "choice", q: "C'est le ___ film de l'année !", opts: ["meilleur", "plus bon", "mieux"], a: "meilleur", why: "«лучший» (какой?) — meilleur, не plus bon" },
    { k: "input", lang: "fr", q: "Она говорит лучше.", a: ["Elle parle mieux."], why: "«лучше» (как?) — mieux" },
    { k: "fix", lang: "fr", q: "Le pull qui j'aime.", a: ["Le pull que j'aime."], why: "j'aime его → que (кого / что)" },
    { k: "choice", q: "Как сказать «город, где я живу»?", opts: ["la ville où j'habite", "la ville qui j'habite", "la ville que j'habite"], a: "la ville où j'habite", why: "о месте — où" },
  ],
  write: { q: "Сравни в 3–4 предложениях два города, две игры или две вещи: <i>plus … que, moins … que, le plus …, meilleur / mieux</i> — и добавь одно предложение с <i>qui / que / où</i>.",
    need: [["\\b(plus|moins|aussi) \\w+ que\\b", "есть сравнение … que"], ["\\b(le|la|les) (plus|meilleur|meilleure|meilleurs)\\b", "есть «самый»"], ["\\b(qui|que|où)\\b", "есть qui / que / où"]],
    model: "Moscou est plus grand que Lyon. Lyon est moins cher et plus calme. La ville où j'habite est petite, mais c'est la plus jolie ville du monde ! Le jeu que j'adore est meilleur que les films.",
    modelRu: "Москва больше Лиона. Лион дешевле и спокойнее. Город, где я живу, маленький, но это самый красивый город на свете! Игра, которую я обожаю, лучше фильмов.", min: 3 },
};
