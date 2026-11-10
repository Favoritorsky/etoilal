window.FR_T = window.FR_T || {};
FR_T[24] = {
  words: [["le billet", "билет", "лё бийе"], ["le prix", "цена", "лё при"], ["ouvert, ouverte", "открыт(а)", "увэр, увэрт"], ["fermé, fermée", "закрыт(а)", "фэрмэ"],
    ["le rendez-vous", "встреча (договорились)", "лё рандэву"], ["en retard", "с опозданием, опаздывает", "ан рётар"], ["la minute", "минута", "ла минют"], ["le concert", "концерт", "лё консэр"]],
  note: `<p>Маленькое слово перед днём недели меняет смысл:</p>
> samedi :: в эту субботу — «самди»
> le samedi :: по субботам (каждую) — «лё самди»
<p>Так же с временем суток: {{le soir}} — «по вечерам», а {{ce soir}} — «сегодня вечером».</p>`,
  text: { t: "Концерт в субботу", lines: [
    ["Samedi, Hugo va au concert.", "В субботу Юго идёт на концерт.", "самди, юго ва о консэр"],
    ["Le billet coûte trente-cinq euros.", "Билет стоит тридцать пять евро.", "лё бийе кут трантсэнк ёро"],
    ["Le concert est à vingt heures.", "Концерт в восемь вечера.", "лё консэр э а вэнтёр"],
    ["Hugo a rendez-vous à dix-neuf heures et demie.", "У Юго встреча в половине восьмого.", "юго а рандэву а диснёвёр э дёми"],
    ["Mais Nina est en retard : vingt minutes !", "Но Нина опаздывает: на двадцать минут!", "мэ нина э ан рётар: вэн минют"],
    ["Le soir, le musée est fermé, mais le café est ouvert.", "Вечером музей закрыт, а кафе открыто.", "лё суар, лё мюзэ э фэрмэ, мэ лё кафэ э увэр"],
    ["Ils vont au café, et à vingt heures, au concert !", "Они идут в кафе, а в восемь — на концерт!", "иль вон о кафэ, э а вэнтёр, о консэр"],
  ] },
  tq: [
    { k: "choice", q: "Сколько стоит билет?", opts: ["35 евро", "25 евро", "53 евро"], a: "35 евро", why: "trente-cinq euros" },
    { k: "choice", q: "Во сколько концерт?", opts: ["в 20:00", "в 19:30", "в 21:00"], a: "в 20:00", why: "à vingt heures" },
    { k: "choice", q: "На сколько опоздала Нина?", opts: ["на 20 минут", "на 10 минут", "на полчаса"], a: "на 20 минут", why: "vingt minutes" },
  ],
  dialog: { t: "Кино в воскресенье", who: { A: "Léa", B: "Tom" }, lines: [
    ["A", "Tom, quelle heure est-il ?", "Том, который час?", "том, кэлёр этиль"],
    ["B", "Il est midi et quart.", "Четверть первого.", "иль э миди э кар"],
    ["A", "La piscine est ouverte ?", "Бассейн открыт?", "ла писин э увэрт"],
    ["B", "Non, le dimanche, elle est fermée.", "Нет, по воскресеньям он закрыт.", "нон, лё диманш, эль э фэрмэ"],
    ["A", "Et le cinéma ?", "А кино?", "э лё синэма"],
    ["B", "Le cinéma est ouvert. Le film est à quatorze heures.", "Кино открыто. Фильм в два часа.", "лё синэма э увэр. лё фильм э а катрзёр"],
    ["A", "Combien coûte le billet ?", "Сколько стоит билет?", "комбьен кут лё бийе"],
    ["B", "Douze euros.", "Двенадцать евро.", "дуз ёро"],
    ["A", "D'accord ! Rendez-vous à treize heures et demie !", "Договорились! Встречаемся в половине второго!", "дакор! рандэву а трэзёр э дёми"],
  ] },
  dq: [
    { k: "choice", q: "Который час?", opts: ["12:15", "12:30", "13:15"], a: "12:15", why: "midi et quart — четверть первого" },
    { k: "choice", q: "Почему они не идут в бассейн?", opts: ["по воскресеньям он закрыт", "это дорого", "холодно"], a: "по воскресеньям он закрыт", why: "le dimanche, elle est fermée" },
    { k: "choice", q: "Сколько стоит билет в кино?", opts: ["12 евро", "20 евро", "2 евро"], a: "12 евро", why: "Douze euros" },
  ],
  gram: [
    { k: "choice", q: "Как будет 70?", opts: ["soixante-dix", "sept-dix", "soixante-sept"], a: "soixante-dix", why: "70 = 60 + 10: soixante-dix" },
    { k: "choice", q: "Как спросить «сколько это стоит?»", opts: ["Combien ça coûte ?", "Combien ça est ?", "Quel ça coûte ?"], a: "Combien ça coûte ?", why: "combien — сколько; coûter — стоить" },
    { k: "input", lang: "fr", q: "Сейчас три часа.", a: ["Il est trois heures."], why: "время — il est … heures" },
    { k: "choice", q: "Как сказать 10:30?", opts: ["dix heures et demie", "dix heures et quart", "dix heures demi"], a: "dix heures et demie", why: "et demie — «с половиной»" },
    { k: "fix", lang: "fr", q: "Il est deux heure.", a: ["Il est deux heures."], why: "больше одного часа — heures с -s" },
  ],
  write: { goal: "Расскажи о своей неделе: что, когда и почём.",
    steps: [
      ["Что ты делаешь в какой-то день недели", "Le samedi, je vais au cinéma.", "\\b(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\\b"],
      ["Во сколько", "… à neuf heures.", "(^|\\s)[àa] \\S+ heures?\\b"],
      ["Сколько что-то стоит", "Le billet coûte douze euros.", "\\bco[ûu]te\\b"]],
    model: "Le lundi, j'ai un rendez-vous à neuf heures. Le samedi, je vais au cinéma. Le billet coûte douze euros.",
    modelRu: "По понедельникам у меня встреча в девять. По субботам я хожу в кино. Билет стоит двенадцать евро." },
};
