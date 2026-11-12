window.EN_C = window.EN_C || {};
EN_C[23] = { n: 23, t: "Если… то: if + will", s: "If it rains, I'll stay home",
  words: [["if", "если", "иф"], ["unless", "если не", "анлэ́с"], ["as soon as", "как только", "эз сун эз"], ["stay", "оставаться", "стэй"], ["miss", "опоздать на, пропустить; скучать", "мис"], ["hurry up", "поторопиться", "хáри ап"], ["win", "выиграть", "уин"], ["lose", "проиграть; потерять", "луз"]],
  sut: "Реальное условие про будущее: {{If it rains, I'll stay at home.}} Хитрость: после {{if}} — <b>настоящее время</b> (rains), хотя по смыслу будущее. {{will}} — только во второй половине.",
  rule: `<table class="tbl"><thead><tr><th>если (настоящее)</th><th>то (will)</th></tr></thead><tbody>
<tr><td class="fr">If you hurry up,</td><td class="fr">you'll catch the bus.</td></tr>
<tr><td class="fr">If I win,</td><td class="fr">I'll buy you a pizza.</td></tr>
<tr><td class="fr">If she doesn't come,</td><td class="fr">we won't start.</td></tr></tbody></table>
<p>Так же после {{when}}, {{as soon as}}, {{unless}} (= if not): {{I'll call you when I get home.}}</p>`,
  prosto: `<p>По-русски: «Если пойдёт дождь» — будущее. По-английски «if it will rain» — ошибка. Запомни: в половине с if — никакого will.</p>
> If it rains, I'll stay at home. :: Если пойдёт дождь, я останусь дома.
> If you don't hurry up, we'll miss the train. :: Если не поторопишься, мы опоздаем на поезд.
> If I win, I'll buy you a pizza. :: Если я выиграю, куплю тебе пиццу.
> What will you do if you lose? :: Что ты будешь делать, если проиграешь?
> I'll call you when I get home. :: Я позвоню тебе, когда приду домой.
> I'll tell you as soon as I find out. :: Скажу тебе, как только узнаю.
> You won't pass unless you study. :: Ты не сдашь, если не будешь учиться.
> If you heat ice, it melts. :: Если нагреть лёд, он тает. — всегда так: present + present
@@pin:en23@@
<h3>Порядок половинок</h3>
<p>Можно начать с любой: {{I'll stay at home if it rains.}} Запятая нужна, только если if стоит первым.</p>
<h3>Частые ошибки</h3>
<p>• «If it will rain» → {{If it rains.}} • «When I will come» → {{When I come.}} • «Unless you don't study» — unless уже значит «если не»: {{Unless you study.}}</p>`,
  lub: `<p>Вместо will во второй половине может стоять {{can}}, {{should}} или приказ: {{If you see him, tell him to call me.}} — «Если увидишь его, скажи, чтобы позвонил».</p>`,
  pins: [{ id: "en23", t: "if + will", html: `<table class="tbl"><tbody><tr><td class="fr">If it rains, I'll stay</td><td>если — настоящее, то — will</td></tr><tr><td class="fr">when / as soon as + настоящее</td><td>когда / как только</td></tr><tr><td class="fr">unless = if not</td><td>если не</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "If it …, I'll stay at home.", opts: ["rains", "will rain", "rained"], a: "rains", why: "после if — настоящее" },
    { k: "input", lang: "en", q: "Если я выиграю, куплю тебе пиццу.", a: ["If I win, I'll buy you a pizza.", "If I win, I will buy you a pizza.", "I'll buy you a pizza if I win."], why: "If I win, I'll…" },
    { k: "fix", lang: "en", q: "I'll call you when I will get home.", a: ["I'll call you when I get home.", "I will call you when I get home."], why: "после when — без will" },
    { k: "input", lang: "en", q: "Если не поторопишься, мы опоздаем на поезд.", a: ["If you don't hurry up, we'll miss the train.", "If you don't hurry, we'll miss the train.", "If you do not hurry up, we will miss the train.", "If you don't hurry up, we will miss the train."], why: "don't hurry up → will miss" },
    { k: "choice", q: "You won't pass … you study.", opts: ["unless", "if", "when"], a: "unless", why: "unless = если не" },
    { k: "input", lang: "en", q: "Скажу тебе, как только узнаю.", a: ["I'll tell you as soon as I find out.", "I will tell you as soon as I find out.", "I'll tell you as soon as I know."], why: "as soon as + настоящее" },
    { k: "listen", say: "What will you do if you lose?", q: "Что прозвучало?", opts: ["Что ты будешь делать, если проиграешь?", "Что ты сделал, когда проиграл?", "Что ты будешь делать, если выиграешь?"], a: "Что ты будешь делать, если проиграешь?", why: "lose — проиграть" },
    { k: "fix", lang: "en", q: "If she will come, we'll start.", a: ["If she comes, we'll start.", "If she comes, we will start."], why: "if + comes" },
    { k: "choice", q: "If you heat ice, it …", opts: ["melts", "will melt", "melted"], a: "melts", why: "всегда так — present + present" },
  ] };
