window.FR_C = window.FR_C || {};
FR_C[36] = { n: 36, t: "Один раз или долго", s: "j'ai chanté или je chantais — как «спел» и «пел»",
  words: [["soudain", "вдруг", "судэн"], ["pendant que", "пока, в то время как", "пандан кё"], ["d'habitude", "обычно", "дабитюд"], ["une fois", "один раз", "юн фуа"],
    ["sonner", "звонить (о звонке)", "сонэ"], ["rencontrer", "встретить", "ранконтрэ"], ["la nuit", "ночь", "ла нюи"]],
  sut: "Рассказ о прошлом — это <b>фон</b> и <b>события</b>. Фон (что было, длилось, как обычно) — {{je chantais}}. События (что случилось, один раз, вдруг) — {{j'ai chanté}}. {{Je dormais quand le téléphone a sonné.}} — «Я спал (фон), когда зазвонил телефон (событие)».",
  rule: `<table class="tbl"><thead><tr><th>фон: je chantais</th><th>событие: j'ai chanté</th></tr></thead><tbody>
<tr><td>длилось, было, «пока»</td><td>случилось, закончилось</td></tr>
<tr><td>часто, обычно, каждый день</td><td>один раз, вдруг, вчера в 5 часов</td></tr>
<tr><td>погода, чувства, описание</td><td>действия по порядку</td></tr>
<tr><td class="fr">Il pleuvait. J'étais fatigué.</td><td class="fr">Soudain, il est arrivé.</td></tr></tbody></table>`,
  prosto: `<p>В русском разницу показывает приставка: «пел» — «спел», «читал» — «прочитал». Во французском — время. Задай вопрос: <b>«что делал?»</b> (длилось) — {{je chantais}}; <b>«что сделал?»</b> (случилось) — {{j'ai chanté}}.</p>
> Je dormais quand le téléphone a sonné. :: Я спал, когда зазвонил телефон. — «жё дормэ кан лё тэлэфон а сонэ»
> Il pleuvait, alors je suis resté chez moi. :: Шёл дождь, поэтому я остался дома. — «иль плёвэ, алор жё сюи рэстэ шэ муа»
> D'habitude, je prenais le bus. :: Обычно я ездил на автобусе. — «дабитюд жё прёнэ лё бюс»
> Une fois, j'ai pris un taxi. :: Один раз я поехал на такси. — «юн фуа жэ при эн такси»
> Pendant que je lisais, elle chantait. :: Пока я читал, она пела. — «пандан кё жё лизэ, эль шантэ»
> Soudain, j'ai rencontré mon ami. :: Вдруг я встретил своего друга. — «судэн жэ ранконтрэ монами»
> C'était la nuit. Il faisait froid. :: Была ночь. Было холодно. — «сэтэ ла нюи. иль фёзэ фруа»
@@pin:fr36@@
<h3>Слова-подсказки</h3>
<p>Для {{je chantais}}: {{d'habitude}}, {{souvent}}, {{tous les jours}}, {{pendant que}}, {{autrefois}}. Для {{j'ai chanté}}: {{soudain}}, {{une fois}}, {{hier}}, точное время.</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «пел» (долго) / «спел» (раз и закончил) — та же разница. Переводи через русский вид — почти всегда сработает.</p>
<p><b>Не как в русском:</b> «был», «было» в описании — всегда {{c'était}}, {{il faisait}}, {{j'étais}}: это фон. А «я был в Париже (съездил)» — событие: {{j'ai été à Paris}} / {{je suis allé à Paris}}.</p>
<h3>Частые ошибки</h3>
<p>• Описание погоды через событие: «il a fait froid» — в рассказе-фоне: {{il faisait froid}}. • «Soudain, je rencontrais» — «вдруг» = событие: {{soudain, j'ai rencontré}}. • В фразе «я спал, когда зазвонил» путают местами: спал — {{dormais}}, зазвонил — {{a sonné}}.</p>`,
  lub: `<p>Представь фильм: {{je chantais}} — это декорации и музыка на фоне, а {{j'ai chanté}} — то, что делают герои. Хороший французский рассказ — это смесь обоих.</p>
<p>Писатели иногда нарочно ставят «фон» вместо события, чтобы замедлить сцену, как в замедленной съёмке.</p>`,
  pins: [{ id: "fr36", t: "Фон или событие", html: `<table class="tbl"><tbody><tr><td class="fr">je chantais</td><td>пел, фон: долго, часто, обычно, описание</td></tr><tr><td class="fr">j'ai chanté</td><td>спел, событие: один раз, вдруг, по порядку</td></tr><tr><td>подсказки</td><td class="fr">d'habitude, souvent, pendant que / soudain, une fois, hier</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я спал, когда зазвонил телефон. — Je … quand le téléphone a sonné.", opts: ["dormais", "ai dormi", "dors"], a: "dormais", why: "спал — фон, длилось" },
    { k: "choice", q: "Soudain, j'… mon ami.", opts: ["ai rencontré", "rencontrais", "rencontre"], a: "ai rencontré", why: "вдруг — событие" },
    { k: "input", lang: "fr", q: "Обычно я ездил на автобусе.", a: ["D'habitude, je prenais le bus.", "D'habitude je prenais le bus."], why: "обычно — фон: je prenais" },
    { k: "tiles", lang: "fr", q: "Один раз я поехал на такси.", a: "Une fois j'ai pris un taxi", d: ["prenais", "souvent"], why: "один раз — событие" },
    { k: "choice", q: "Была ночь. — C'… la nuit.", opts: ["était", "a été", "est"], a: "était", why: "описание — фон: c'était" },
    { k: "listen", say: "Pendant que je lisais, elle chantait.", q: "Что прозвучало?", opts: ["Пока я читал, она пела.", "Я прочитал, и она спела.", "Пока я пел, она читала."], a: "Пока я читал, она пела.", why: "два фона одновременно" },
    { k: "fix", lang: "fr", q: "Il a plu, alors je suis resté chez moi.", a: ["Il pleuvait, alors je suis resté chez moi."], why: "дождь шёл — фон: il pleuvait" },
    { k: "choice", q: "Какое слово подсказывает «фон» (je chantais)?", opts: ["d'habitude", "soudain", "une fois"], a: "d'habitude", why: "обычно — привычка, фон" },
    { k: "input", lang: "fr", q: "Было холодно.", a: ["Il faisait froid."], why: "погода в рассказе — фон" },
    { k: "choice", q: "Русское «прочитал» — это…", opts: ["j'ai lu", "je lisais", "je lis"], a: "j'ai lu", why: "прочитал — сделал, событие" },
  ] };
