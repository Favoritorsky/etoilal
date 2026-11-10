window.FR_T = window.FR_T || {};
FR_T[22] = {
  words: [["le légume", "овощ", "лё лэгюм"], ["le fruit", "фрукт", "лё фрюи"], ["la tomate", "помидор", "ла томат"], ["la fraise", "клубника", "ла фрэз"],
    ["le poulet", "курица (еда)", "лё пулэ"], ["le kilo", "килограмм", "лё кило"], ["frais, fraîche", "свежий, свежая", "фрэ, фрэш"], ["le vendeur", "продавец", "лё вандёр"]],
  note: `<p>После <b>ne … pas</b> «кусочек» du, de la, des превращается в простое <b>de</b>:</p>
> Je mange du pain. :: Я ем хлеб. — «жё манж дю пэн»
> Je ne mange pas de pain. :: Я не ем хлеба. — «жё нё манж па дё пэн»
<p>Логика как в русском: «ем хлеб» — но «не ем хлеба».</p>`,
  text: { t: "Суббота на рынке", lines: [
    ["Où est Nina ? Elle est au marché.", "Где Нина? Она на рынке.", "у э нина? эль э о маршэ"],
    ["Elle veut des fruits et des légumes.", "Она хочет фруктов и овощей.", "эль вё дэ фрюи э дэ лэгюм"],
    ["Les fraises sont très bonnes et très fraîches.", "Клубника очень вкусная и очень свежая.", "ле фрэз сон трэ бон э трэ фрэш"],
    ["Nina veut aussi du fromage et du pain.", "А ещё Нина хочет сыра и хлеба.", "нина вё оси дю фромаж э дю пэн"],
    ["Pourquoi ? Parce que le soir, ses amis vont chez elle.", "Почему? Потому что вечером к ней придут друзья.", "пуркуа? парскё лё суар, сэ зами вон шэ эль"],
    ["Ils mangent du poulet et des tomates.", "Они едят курицу и помидоры.", "иль манж дю пулэ э дэ томат"],
    ["Et ils mangent un gâteau au chocolat.", "И едят шоколадный торт.", "э иль манж эн гато о шоколя"],
  ] },
  tq: [
    { k: "choice", q: "Где Нина?", opts: ["на рынке", "в кафе", "дома"], a: "на рынке", why: "Elle est au marché" },
    { k: "choice", q: "Почему Нина берёт много еды?", opts: ["вечером придут друзья", "она очень голодная", "это её работа"], a: "вечером придут друзья", why: "Parce que le soir, ses amis vont chez elle" },
    { k: "choice", q: "Какой будет торт?", opts: ["шоколадный", "клубничный", "торта не будет"], a: "шоколадный", why: "un gâteau au chocolat" },
  ],
  dialog: { t: "У прилавка", who: { A: "Продавщица", B: "Max" }, lines: [
    ["A", "Bonjour ! Des fruits ? Des légumes ?", "Здравствуйте! Фрукты? Овощи?", "бонжур! дэ фрюи? дэ лэгюм"],
    ["B", "Bonjour ! Je veux des tomates, s'il vous plaît.", "Здравствуйте! Мне помидоров, пожалуйста.", "бонжур! жё вё дэ томат, силь ву плэ"],
    ["A", "Combien ? Un kilo ?", "Сколько? Килограмм?", "комбьен? эн кило"],
    ["B", "Oui, un kilo. Et les fraises, elles sont fraîches ?", "Да, килограмм. А клубника свежая?", "уи, эн кило. э ле фрэз, эль сон фрэш"],
    ["A", "Oui, très fraîches !", "Да, очень свежая!", "уи, трэ фрэш"],
    ["B", "D'accord, je veux un peu de fraises.", "Хорошо, мне немного клубники.", "дакор, жё вё эн пё дё фрэз"],
    ["A", "Voilà ! Et du fromage ?", "Пожалуйста! А сыр?", "вуаля! э дю фромаж"],
    ["B", "Non, merci. Je ne mange pas de fromage.", "Нет, спасибо. Я не ем сыр.", "нон, мэрси. жё нё манж па дё фромаж"],
  ] },
  dq: [
    { k: "choice", q: "Сколько помидоров берёт Макс?", opts: ["килограмм", "два килограмма", "три штуки"], a: "килограмм", why: "Oui, un kilo" },
    { k: "choice", q: "Какая клубника?", opts: ["очень свежая", "старая", "дорогая"], a: "очень свежая", why: "très fraîches" },
    { k: "choice", q: "Почему Макс не берёт сыр?", opts: ["он не ест сыр", "сыр дорогой", "сыра нет"], a: "он не ест сыр", why: "Je ne mange pas de fromage" },
  ],
  gram: [
    { k: "choice", q: "Je veux ___ pain.", opts: ["du", "de la", "des"], a: "du", why: "le pain → du pain" },
    { k: "choice", q: "Elle boit ___ eau.", opts: ["de l'", "du", "de la"], a: "de l'", why: "перед гласной — de l': de l'eau" },
    { k: "fix", lang: "fr", q: "Je ne mange pas du fromage.", a: ["Je ne mange pas de fromage."], why: "после ne … pas — просто de" },
    { k: "input", lang: "fr", q: "Где вокзал?", a: ["Où est la gare ?"], why: "où — где; la gare — вокзал" },
    { k: "tiles", lang: "fr", q: "Когда ты идёшь на рынок?", a: "Quand est-ce que tu vas au marché", d: ["où", "va"], why: "quand + est-ce que + tu vas" },
  ],
  write: { q: "Ты на рынке. Напиши 3–4 фразы: что ты хочешь (<i>je veux du / de la / des …</i>), задай вопрос (<i>où, combien, pourquoi…</i>) и скажи, чего ты не ешь.",
    need: [["\\bje veux\\b", "есть je veux"], ["\\b(du|de la|de l'|des)\\b", "есть du / de la / des"], ["\\?", "есть вопрос"]],
    model: "Bonjour ! Je veux des fraises et du fromage, s'il vous plaît. Où est le pain ? Je ne mange pas de viande. Merci !",
    modelRu: "Здравствуйте! Мне клубники и сыра, пожалуйста. Где хлеб? Я не ем мясо. Спасибо!", min: 3 },
};
