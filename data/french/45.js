window.FR_C = window.FR_C || {};
FR_C[45] = { n: 45, t: "Приказ: chante ! allons !", s: "без je, tu, vous; «не делай» — ne … pas",
  words: [["écoute !", "слушай!", "экут"], ["regarde !", "смотри!", "рёгард"], ["viens !", "иди сюда!", "вьен"], ["allons-y !", "пошли!", "алонзи"],
    ["attends !", "подожди!", "атан"], ["ferme", "закрой", "фэрм"], ["ouvre", "открой", "увр"], ["la fenêtre", "окно", "ла фёнэтр"]],
  sut: "Приказ — это форма «ты», «мы» или «вы» <b>без</b> tu, nous, vous: {{Écoute !}} «слушай!», {{Allons !}} «пойдём!», {{Venez !}} «приходите!». У глаголов на -er в форме «ты» пропадает s: tu écoute<b>s</b> → {{Écoute !}}",
  rule: `<table class="tbl"><thead><tr><th>кому</th><th>chanter</th><th>finir</th><th>venir</th></tr></thead><tbody>
<tr><td>тебе</td><td class="fr">Chante !</td><td class="fr">Finis !</td><td class="fr">Viens !</td></tr>
<tr><td>нам (давай)</td><td class="fr">Chantons !</td><td class="fr">Finissons !</td><td class="fr">Venons !</td></tr>
<tr><td>вам</td><td class="fr">Chantez !</td><td class="fr">Finissez !</td><td class="fr">Venez !</td></tr></tbody></table>
<p>«Не»: <span class="fr">Ne chante pas !</span> С местоимением: <span class="fr">Regarde-moi ! Donne-le-moi !</span> — но <span class="fr">Ne me regarde pas !</span></p>`,
  prosto: `<p>Приказ — самая короткая форма: просто глагол. Для «ты» — без tu, для «давай(те)» — форма nous, для «вы» — форма vous.</p>
> Écoute ! :: Слушай! — «экут»
> Regarde la mer ! :: Посмотри на море! — «рёгард ла мэр»
> Viens ici ! :: Иди сюда! — «вьенизи»
> Attends ! :: Подожди! — «атан»
> Ferme la fenêtre, s'il te plaît. :: Закрой окно, пожалуйста. — «фэрм ла фёнэтр, силь тё плэ»
> Ouvrez la porte ! :: Откройте дверь! — «уврэ ла порт»
> Allons-y ! :: Пошли! — «алонзи»
> Ne pars pas ! :: Не уходи! — «нё пар па»
> Regarde-moi ! :: Посмотри на меня! — «рёгард муа»
@@pin:fr45@@
<h3>Местоимения в приказе</h3>
<p>В приказе «да» местоимение встаёт <b>после</b> глагола через чёрточку, а me / te превращаются в moi / toi: {{Regarde-moi !}}, {{Lève-toi !}}, {{Donne-le !}}. В приказе «не» — как обычно, перед: {{Ne me regarde pas !}}</p>
<h3>Особые приказы</h3>
<p>{{être}}: {{Sois sage !}} «Будь умницей!». {{avoir}}: {{N'aie pas peur !}} «Не бойся!». {{savoir}}: {{Sache…}} «Знай…».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «слушай!», «давай пойдём!», «слушайте!» — три формы.</p>
<p><b>Не как в русском:</b> «давай(те) пойдём» — одно слово {{Allons !}}. А «смотри на меня» — «смотри меня»: {{Regarde-moi !}}</p>
<h3>Частые ошибки</h3>
<p>• «Écoutes !» — у -er в приказе нет s: {{Écoute !}} • «Tu viens !» — это вопрос/утверждение; приказ: {{Viens !}} • «Regarde me !» — надо {{Regarde-moi !}}</p>`,
  lub: `<p>{{Allons-y !}} буквально «пойдём туда!» — тут y из прошлого урока. А «Allez !» — и «вперёд!», и «давай!» на футболе: <i>Allez les Bleus !</i> — «Вперёд, синие!» (так болеют за сборную Франции).</p>
<p>s в приказе возвращается, если дальше y или en: <i>Vas-y !</i> «Давай, иди!» — для красоты звучания.</p>`,
  pins: [{ id: "fr45", t: "Приказ", html: `<table class="tbl"><tbody><tr><td>тебе</td><td class="fr">Chante ! Finis ! Viens ! (у -er без s)</td></tr><tr><td>давай</td><td class="fr">Chantons ! Allons-y !</td></tr><tr><td>вам</td><td class="fr">Chantez ! Venez !</td></tr><tr><td>«не»</td><td class="fr">Ne chante pas !</td></tr><tr><td>с местоимением</td><td class="fr">Regarde-moi ! / Ne me regarde pas !</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Слушай!", opts: ["Écoute !", "Écoutes !", "Tu écoutes !"], a: "Écoute !", why: "у -er в приказе нет s" },
    { k: "input", lang: "fr", q: "Подожди!", a: ["Attends !", "Attends"], why: "attendre: tu attends → Attends !" },
    { k: "tiles", lang: "fr", q: "Закрой окно, пожалуйста.", a: "Ferme la fenêtre s'il te plaît", d: ["fermes", "ouvre"], why: "приказ без s" },
    { k: "choice", q: "Пошли! (давай пойдём)", opts: ["Allons-y !", "Allez-y !", "Va !"], a: "Allons-y !", why: "давай — форма nous" },
    { k: "fix", lang: "fr", q: "Regarde me !", a: ["Regarde-moi !"], why: "в приказе — moi после глагола" },
    { k: "input", lang: "fr", q: "Не уходи!", a: ["Ne pars pas !", "Ne pars pas"], why: "ne … pas вокруг приказа" },
    { k: "listen", say: "Ouvrez la porte !", q: "Что прозвучало?", opts: ["Откройте дверь!", "Закройте дверь!", "Откройте окно!"], a: "Откройте дверь!", why: "ouvrir — открывать, форма vous" },
    { k: "choice", q: "Не смотри на меня!", opts: ["Ne me regarde pas !", "Ne regarde-moi pas !", "Regarde-moi pas !"], a: "Ne me regarde pas !", why: "в «не» — me перед глаголом" },
    { k: "input", lang: "fr", q: "Иди сюда!", a: ["Viens ici !", "Viens ici"], why: "venir: Viens !" },
    { k: "choice", q: "Не бойся!", opts: ["N'aie pas peur !", "N'as pas peur !", "Ne sois pas peur !"], a: "N'aie pas peur !", why: "особый приказ avoir: aie" },
  ] };
