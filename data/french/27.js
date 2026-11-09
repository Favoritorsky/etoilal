window.FR_C = window.FR_C || {};
FR_C[27] = { n: 27, t: "Прийти и взять: venir, prendre", s: "два частых неправильных глагола",
  words: [["venir", "приходить, приезжать", "вёнир"], ["prendre", "брать; есть, пить; ехать на", "прандр"], ["comprendre", "понимать", "компрандр"], ["revenir", "возвращаться", "рёвёнир"],
    ["le train", "поезд", "лё трэн"], ["le bus", "автобус", "лё бюс"], ["le petit-déjeuner", "завтрак", "лё птидэжёнэ"], ["d'où", "откуда", "ду"]],
  sut: "{{venir}}: je viens, tu viens, il vient, nous venons, vous venez, ils viennent. {{prendre}}: je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent. Prendre — это и «брать», и «есть / пить», и «ехать на»: {{Je prends le bus.}}",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>venir</th><th>prendre</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je viens «вьен»</td><td class="fr">je prends «пран»</td></tr>
<tr><td>ты</td><td class="fr">tu viens</td><td class="fr">tu prends</td></tr>
<tr><td>он</td><td class="fr">il vient</td><td class="fr">il prend</td></tr>
<tr><td>мы</td><td class="fr">nous venons «вёнон»</td><td class="fr">nous prenons «прёнон»</td></tr>
<tr><td>вы</td><td class="fr">vous venez</td><td class="fr">vous prenez</td></tr>
<tr><td>они</td><td class="fr">ils viennent «вьен»</td><td class="fr">ils prennent «прэн»</td></tr></tbody></table>
<p>Так же: <span class="fr">revenir</span> (как venir), <span class="fr">comprendre, apprendre</span> (как prendre).</p>`,
  prosto: `<p>Эти два глагола встречаются на каждом шагу. Они неправильные, но похожи друг на друга: у «я, ты, он» — короткая форма, у «мы, вы» — длинная, у «они» — удвоенная n.</p>
> Je viens de Russie. :: Я из России. — «жё вьен дё рюси»: буквально «я прихожу из России»
> D'où tu viens ? :: Откуда ты? — «ду тю вьен»
> Il vient ce soir. :: Он придёт сегодня вечером. — «иль вьен сё суар»
> Je prends le train. :: Я еду на поезде. — «жё пран лё трэн»
> Tu prends un café ? :: Будешь кофе? — «тю пран эн кафэ»
> Nous prenons le petit-déjeuner. :: Мы завтракаем. — «ну прёнон лё птидэжёнэ»
> Je ne comprends pas. :: Я не понимаю. — «жё нё компран па»
> Ils reviennent demain. :: Они возвращаются завтра. — «иль рёвьен дёмэн»
@@pin:fr27@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «я из России» — та же идея «откуда».</p>
<p><b>Не как в русском:</b> {{prendre}} делает работу многих русских глаголов: брать ({{prendre un livre}}), есть и пить ({{prendre un café}}), ехать на ({{prendre le bus}}). А «я из России» французы говорят «я прихожу из России».</p>
<h3>Частые ошибки</h3>
<p>• «Je suis de Russie» — правильно {{Je viens de Russie.}} • «ils prendent» — надо {{ils prennent}} (две n). • «je viene» — надо {{je viens}}.</p>
<p>• Фраза {{Je ne comprends pas.}} — одна из самых полезных: запомни её целиком.</p>`,
  lub: `<p>Отсюда русские слова: «авантюра» (<i>aventure</i> — «то, что придёт») и «сувенир» (<i>se souvenir</i> — «вспоминать», буквально «прийти снизу»).</p>
<p>У {{venir}} есть важная форма {{venir de}} + глагол — «только что сделал»: <i>Je viens de manger</i> «я только что поел». Её разберём в уроке 30.</p>`,
  pins: [{ id: "fr27", t: "venir и prendre", html: `<table class="tbl"><tbody><tr><td class="fr">venir</td><td class="fr">viens viens vient · venons venez viennent</td></tr><tr><td class="fr">prendre</td><td class="fr">prends prends prend · prenons prenez prennent</td></tr><tr><td class="fr">Je viens de Russie.</td><td>Я из России.</td></tr><tr><td class="fr">Je prends le bus.</td><td>Я еду на автобусе.</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "fr", q: "Я из России.", a: ["Je viens de Russie."], why: "«я прихожу из России»", hint: "je viens de…" },
    { k: "choice", q: "Откуда ты?", opts: ["D'où tu viens ?", "Où tu viens ?", "D'où tu es ?"], a: "D'où tu viens ?", why: "откуда — d'où + venir" },
    { k: "choice", q: "Ils … le train. (едут на)", opts: ["prennent", "prendent", "prenent"], a: "prennent", why: "ils prennent — две n" },
    { k: "input", lang: "fr", q: "Я не понимаю.", a: ["Je ne comprends pas."], why: "comprendre — как prendre" },
    { k: "tiles", lang: "fr", q: "Мы завтракаем.", a: "Nous prenons le petit-déjeuner", d: ["prends", "mangeons"], why: "завтракать — «брать завтрак»" },
    { k: "fix", lang: "fr", q: "Je suis de Russie.", a: ["Je viens de Russie."], why: "откуда — через venir" },
    { k: "listen", say: "Tu prends un café ?", q: "Что прозвучало?", opts: ["Будешь кофе?", "Ты пьёшь кофе?", "Ты делаешь кофе?"], a: "Будешь кофе?", why: "prendre un café — взять, выпить кофе" },
    { k: "choice", q: "Il … ce soir. (придёт)", opts: ["vient", "viens", "venit"], a: "vient", why: "il vient" },
    { k: "input", lang: "fr", q: "Я еду на автобусе.", a: ["Je prends le bus."], why: "ехать на — prendre" },
    { k: "input", lang: "fr", q: "Они возвращаются завтра.", a: ["Ils reviennent demain."], why: "revenir — как venir: ils reviennent" },
  ] };
