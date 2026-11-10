window.FR_T = window.FR_T || {};
FR_T[51] = {
  words: [["le million", "миллион", "лё мильон"], ["l'île", "остров", "лиль"], ["le bateau", "лодка, корабль", "лё бато"], ["faire le tour du monde", "объехать вокруг света", "фэр лё тур дю монд"],
    ["pauvre", "бедный", "повр"], ["partager", "делиться, делить", "партажэ"], ["le problème", "проблема", "лё проблэм"], ["rêver", "мечтать", "рэвэ"]],
  note: `<p>Главное правило: <b>после si не ставят ни «бы», ни будущее</b>. Мечтаешь — после si форма «было», а во второй части «бы»:</p>
> Si j'avais un bateau, je ferais le tour du monde. :: Если бы у меня была лодка, я бы объехал вокруг света. — «си жавэ эн бато, жё фёрэ лё тур дю монд»
> S'il pleut, je resterai ici. :: Если пойдёт дождь, я останусь здесь. — «силь плё, жё рэстёрэ иси»`,
  text: { t: "Если бы я выиграл…", lines: [
    ["Max rêve : « Si je gagnais à la loterie, je serais riche. »", "Макс мечтает: «Если бы я выиграл в лотерею, я был бы богат».", "макс рэв: си жё ганьэ а ла лотри, жё сёрэ риш"],
    ["« J'achèterais une petite île et un bateau. »", "«Я бы купил маленький остров и лодку».", "жашэтрэ юн пётит иль э эн бато"],
    ["« Je ferais le tour du monde. »", "«Я бы объехал вокруг света».", "жё фёрэ лё тур дю монд"],
    ["« Je partagerais l'argent avec ma famille et les gens pauvres. »", "«Я бы поделился деньгами с семьёй и бедными людьми».", "жё партажёрэ ларжан авэк ма фамий э ле жан повр"],
    ["Nina répond : « Si tu as un million, tu as aussi des problèmes ! »", "Нина отвечает: «Когда у тебя миллион, у тебя и проблемы есть!»", "нина рэпон: си тю а эн мильон, тю а оси дэ проблэм"],
    ["« À ta place, je resterais ici ! »", "«На твоём месте я бы остался здесь!»", "а та плас, жё рэстёрэ иси"],
    ["Max : « Peut-être… mais je vais acheter un billet de loterie ! »", "Макс: «Может быть… но я всё-таки куплю лотерейный билет!»", "макс: пётэтр… мэ жё вэ аштэ эн бийе дё лотри"],
  ] },
  tq: [
    { k: "choice", q: "Что купил бы Макс?", opts: ["остров и лодку", "дом и машину", "самолёт"], a: "остров и лодку", why: "J'achèterais une petite île et un bateau" },
    { k: "choice", q: "С кем он поделился бы деньгами?", opts: ["с семьёй и бедными", "с Ниной", "ни с кем"], a: "с семьёй и бедными", why: "avec ma famille et les gens pauvres" },
    { k: "choice", q: "Что Макс сделает в конце?", opts: ["купит лотерейный билет", "останется дома", "поплывёт на остров"], a: "купит лотерейный билет", why: "je vais acheter un billet de loterie" },
  ],
  dialog: { t: "Совет", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, je suis fatiguée. Je travaille beaucoup.", "Том, я устала. Я много работаю.", "том, жё сюи фатигэ. жё травай боку"],
    ["B", "À ta place, je partirais en vacances.", "На твоём месте я бы уехал в отпуск.", "а та плас, жё партирэ ан вакaнс"],
    ["A", "Si j'avais de l'argent, je partirais !", "Если бы у меня были деньги, я бы уехала!", "си жавэ дё ларжан, жё партирэ"],
    ["B", "Tu pourrais aller chez ta grand-mère, à la campagne.", "Ты могла бы поехать к бабушке в деревню.", "тю пурэ але шэ та гранмэр, а ла кампань"],
    ["A", "Oui… Ce serait calme.", "Да… Там было бы спокойно.", "уи… сё сёрэ кальм"],
    ["B", "Et si tu pars samedi, tu seras là pour la fête dimanche ?", "А если уедешь в субботу, на праздник в воскресенье успеешь?", "э си тю пар самди, тю сёра ла пур ла фэт диманш"],
    ["A", "Non, si je pars, je resterai une semaine.", "Нет, если поеду, то останусь на неделю.", "нон, си жё пар, жё рэстёрэ юн сёмэн"],
    ["B", "Je voudrais venir avec toi !", "Я бы хотел поехать с тобой!", "жё вудрэ вёнир авэк туа"],
    ["A", "Volontiers !", "С удовольствием!", "волонтье"],
  ] },
  dq: [
    { k: "choice", q: "Что советует Том?", opts: ["уехать в отпуск", "меньше спать", "сменить работу"], a: "уехать в отпуск", why: "je partirais en vacances" },
    { k: "choice", q: "Почему Леа не уезжает?", opts: ["нет денег", "нет времени", "не хочет"], a: "нет денег", why: "Si j'avais de l'argent, je partirais !" },
    { k: "choice", q: "Сколько Леа пробудет у бабушки?", opts: ["неделю", "выходные", "месяц"], a: "неделю", why: "je resterai une semaine" },
  ],
  gram: [
    { k: "choice", q: "Si j'étais riche, j'___ une maison.", opts: ["achèterais", "achèterai", "achète"], a: "achèterais", why: "мечта: si + было → «бы» (-rais)" },
    { k: "choice", q: "S'il pleut, je ___ à la maison.", opts: ["resterai", "resterais", "restais"], a: "resterai", why: "si + сейчас → будущее" },
    { k: "input", lang: "fr", q: "Я хотел бы кофе.", a: ["Je voudrais un café.", "Je voudrais du café."], why: "вежливое «хотел бы» — je voudrais" },
    { k: "fix", lang: "fr", q: "Si j'aurais le temps, je viendrais.", a: ["Si j'avais le temps, je viendrais."], why: "после si «бы» не ставят: si j'avais" },
    { k: "choice", q: "Как сказать «тебе следовало бы поспать»?", opts: ["Tu devrais dormir.", "Tu dois dormir.", "Tu devras dormir."], a: "Tu devrais dormir.", why: "совет — tu devrais" },
  ],
  write: { q: "Напиши 3–4 предложения: что бы ты сделал, если бы выиграл в лотерею (<i>si je gagnais…, je …-rais</i>), и дай другу совет (<i>à ta place, je …-rais</i> или <i>tu devrais …</i>).",
    need: [["\\bsi (j'|je |tu |il |elle |on )\\w*(ais|ait)\\b", "есть si + …-ais"], ["\\w+rais\\b", "есть «бы»: …-rais"]],
    model: "Si je gagnais à la loterie, je serais riche. J'achèterais une maison à la mer et je ferais le tour du monde. Je partagerais l'argent avec ma famille. À ta place, je jouerais aussi !",
    modelRu: "Если бы я выиграл в лотерею, я был бы богат. Я бы купил дом у моря и объехал вокруг света. Я бы поделился деньгами с семьёй. На твоём месте я бы тоже играл!", min: 3 },
};
