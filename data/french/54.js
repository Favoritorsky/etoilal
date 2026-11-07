window.FR_C = window.FR_C || {};
FR_C[54] = { n: 54, t: "Он сказал, что…; делая", s: "косвенная речь и en chantant",
  words: [["raconter", "рассказывать", "раконтэ"], ["expliquer", "объяснять", "экспликэ"], ["répéter", "повторять", "рэпэтэ"], ["marcher", "ходить пешком, идти", "маршэ"],
    ["sourire", "улыбаться", "сурир"], ["le chemin", "дорога, путь", "лё шёмэн"], ["la radio", "радио", "ла радьо"], ["en chantant", "напевая, когда поёшь", "ан шантан"]],
  sut: "Чужие слова передают через {{que}}: {{Il dit qu'il est fatigué.}} «Он говорит, что устал». Если «сказал» в прошлом — «есть» становится «было»: {{Il a dit qu'il était fatigué.}} А «делая» — <b>en + -ant</b>: {{en chantant}} «напевая», {{en marchant}} «идя пешком».",
  rule: `<table class="tbl"><thead><tr><th>прямая речь</th><th>косвенная</th></tr></thead><tbody>
<tr><td class="fr">« Je suis fatigué. »</td><td class="fr">Il dit qu'il est fatigué.</td></tr>
<tr><td class="fr">« Je suis fatigué. »</td><td class="fr">Il a dit qu'il était fatigué.</td></tr>
<tr><td class="fr">« Tu viens ? »</td><td class="fr">Il demande si tu viens.</td></tr>
<tr><td class="fr">« Où tu habites ? »</td><td class="fr">Il demande où tu habites.</td></tr></tbody></table>
<p><b>en + -ant</b>: основа «мы» без -ons + ant: <span class="fr">nous chantons → en chantant, nous finissons → en finissant, nous faisons → en faisant</span>. Особые: <span class="fr">en étant, en ayant, en sachant</span>.</p>`,
  prosto: `<p>Когда пересказываешь чьи-то слова, французы делают почти как мы: «он говорит, <b>что</b>…» — {{il dit que}}. Вопрос «да/нет» пересказывают через {{si}} «ли».</p>
> Il dit qu'il est fatigué. :: Он говорит, что устал. — «иль ди киль э фатигэ»
> Elle m'a dit qu'elle était malade. :: Она сказала мне, что болеет. — «эль ма ди кэль этэ малад»: сказала в прошлом → était
> Il m'a demandé si je venais. :: Он спросил меня, приду ли я. — «иль ма дёмандэ си жё вёнэ»
> Je lui ai expliqué le chemin. :: Я объяснил ему дорогу. — «жё люи э экспликэ лё шёмэн»
> Raconte-moi ce qu'il a dit ! :: Расскажи мне, что он сказал! — «раконт муа сё киль а ди»
<p>Вторая тема — «делая»: когда два действия идут одновременно.</p>
> Je fais la cuisine en écoutant la radio. :: Я готовлю, слушая радио. — «жё фэ ла кюизин ан экутан ла радьо»
> Il est parti en souriant. :: Он ушёл, улыбаясь. — «илэ парти ан сурьян»
> On apprend en répétant. :: Учатся, повторяя. — «онапран ан рэпэтан»
@@pin:fr54@@
<h3>«было» вместо «есть»</h3>
<p>Если «сказал» стоит в прошлом, французы сдвигают время: «Я устал» → {{Il a dit qu'il était fatigué.}} (буквально «он сказал, что был уставшим»). Будущее превращается в «бы»: «Я приду» → {{Il a dit qu'il viendrait.}}</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «он сказал, <b>что</b>…», «спросил, <b>придёт ли</b>…», «ушёл, <b>улыбаясь</b>» — те же схемы.</p>
<p><b>Не как в русском:</b> русские не сдвигают время: «он сказал, что устал» (не «был усталым»). Французы — сдвигают. А «-я» (улыбаясь) — у них {{en}} + форма на {{-ant}}.</p>
<h3>Частые ошибки</h3>
<p>• Пропускают que: «Il dit il est fatigué» — надо {{Il dit qu'il est fatigué.}} • «Il a demandé est-ce que tu viens» — пересказ вопроса: {{si tu venais}}. • «en chantent» — надо {{en chantant}}.</p>`,
  lub: `<p>{{en}} + -ant — это ещё и способ сказать «как»: <i>C'est en forgeant qu'on devient forgeron</i> — «Кузнецом становятся, когда куют» (= «Дело мастера боится»). Одна из самых известных французских пословиц.</p>
<p>{{ce que}} «то, что» — удобная связка для пересказа: <i>Je ne comprends pas ce que tu dis</i> — «Я не понимаю, что ты говоришь».</p>`,
  pins: [{ id: "fr54", t: "Пересказ и «делая»", html: `<table class="tbl"><tbody><tr><td class="fr">il dit que / il a dit que</td><td>говорит, что / сказал, что (+ сдвиг: est → était)</td></tr><tr><td class="fr">il demande si</td><td>спрашивает, ли</td></tr><tr><td class="fr">en + -ant</td><td>делая: en chantant, en finissant, en faisant</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Он говорит, что устал. — Il dit … il est fatigué.", opts: ["qu'", "que", "si"], a: "qu'", why: "que перед il → qu'" },
    { k: "input", lang: "fr", q: "Она сказала мне, что болеет.", a: ["Elle m'a dit qu'elle était malade."], why: "сказала в прошлом → était" },
    { k: "choice", q: "Il m'a demandé … je venais.", opts: ["si", "que", "est-ce que"], a: "si", why: "пересказ вопроса «да/нет» — si" },
    { k: "tiles", lang: "fr", q: "Я готовлю, слушая радио.", a: "Je fais la cuisine en écoutant la radio", d: ["écoute", "écoutent"], why: "en + -ant" },
    { k: "fix", lang: "fr", q: "Il est parti en sourit.", a: ["Il est parti en souriant."], why: "en + форма на -ant" },
    { k: "listen", say: "On apprend en répétant.", q: "Что прозвучало?", opts: ["Учатся, повторяя.", "Мы повторяем урок.", "Повторяй, чтобы выучить."], a: "Учатся, повторяя.", why: "en répétant — повторяя" },
    { k: "choice", q: "« Je viendrai. » → Il a dit qu'il …", opts: ["viendrait", "viendra", "vient"], a: "viendrait", why: "будущее в пересказе прошлого → «бы»" },
    { k: "input", lang: "fr", q: "Я объяснил ему дорогу.", a: ["Je lui ai expliqué le chemin."], why: "expliquer à — lui" },
    { k: "choice", q: "nous faisons → en …", opts: ["faisant", "fait", "faisons"], a: "faisant", why: "основа «мы» + ant" },
    { k: "input", lang: "fr", q: "Он говорит, что устал.", a: ["Il dit qu'il est fatigué."], why: "il dit que + настоящее" },
  ] };
