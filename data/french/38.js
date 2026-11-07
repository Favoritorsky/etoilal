window.FR_C = window.FR_C || {};
FR_C[38] = { n: 38, kind: "Слова", t: "Слова времени", s: "hier, demain, déjà, jamais, toujours, encore",
  words: [["déjà", "уже", "дэжа"], ["toujours", "всегда; всё ещё", "тужур"], ["encore", "ещё; снова", "анкор"], ["pas encore", "ещё не", "пазанкор"],
    ["maintenant", "сейчас", "мэнтнан"], ["avant", "до; раньше", "аван"], ["après", "после; потом", "апрэ"], ["depuis", "с (какого-то времени), уже … как", "дёпюи"]],
  sut: "Слова времени делают рассказ живым: {{déjà}} «уже», {{pas encore}} «ещё не», {{toujours}} «всегда», {{maintenant}} «сейчас». В прошлом с avoir они встают <b>между</b> avoir и глаголом: {{J'ai déjà mangé.}} — «я уже поел».",
  rule: `<table class="tbl"><tbody>
<tr><td class="fr">hier · aujourd'hui · demain</td><td>вчера · сегодня · завтра</td></tr>
<tr><td class="fr">avant · maintenant · après</td><td>раньше · сейчас · потом</td></tr>
<tr><td class="fr">déjà / pas encore</td><td>уже / ещё не</td></tr>
<tr><td class="fr">toujours / jamais</td><td>всегда / никогда</td></tr>
<tr><td class="fr">encore</td><td>ещё, снова</td></tr>
<tr><td class="fr">depuis</td><td>с … / уже … (и продолжается)</td></tr></tbody></table>
<p>Место: <span class="fr">J'ai <b>déjà</b> mangé. Je n'ai <b>pas encore</b> mangé. Il est <b>toujours</b> là.</span></p>`,
  prosto: `<p>Эти маленькие слова встречаются в каждом разговоре. Самое важное — <b>где они стоят</b>: после глагола, а в прошлом — между avoir / être и второй частью.</p>
> J'ai déjà mangé. :: Я уже поел. — «жэ дэжа манжэ»
> Je n'ai pas encore fini. :: Я ещё не закончил. — «жё нэ пазанкор фини»
> Il est toujours en retard. :: Он всегда опаздывает. — «илэ тужур ан рётар»
> Tu es encore là ? :: Ты ещё здесь? — «тю эзанкор ла»
> Maintenant, je comprends. :: Теперь я понимаю. — «мэнтнан жё компран»
> Avant, j'habitais à Moscou. :: Раньше я жил в Москве. — «аван жабитэ а моску»
> Après le repas, nous sortons. :: После еды мы выходим (гулять). — «апрэ лё рёпа ну сортон»
> J'apprends le français depuis un an. :: Я учу французский уже год. — «жапран лё франсэ дёпюизэн ан»
@@pin:fr38@@
<h3>depuis — «уже … и до сих пор»</h3>
<p>Русское «я учу французский <b>уже год</b>» — действие идёт до сих пор. Французы говорят в <b>настоящем</b> + {{depuis}}: {{J'apprends le français depuis un an.}} Не «j'ai appris» — ведь ты всё ещё учишь!</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «уже», «ещё не», «всегда» — те же слова, тот же смысл.</p>
<p><b>Не как в русском:</b> {{toujours}} — и «всегда», и «всё ещё». {{encore}} — и «ещё», и «снова». Смысл понятен из фразы.</p>
<h3>Частые ошибки</h3>
<p>• «J'ai mangé déjà» — надо {{J'ai déjà mangé.}} (между avoir и глаголом). • «J'apprends depuis un an» в прошлом: «J'ai appris depuis» — надо настоящее. • «pas déjà» — «ещё не» это {{pas encore}}.</p>`,
  lub: `<p>{{maintenant}} буквально «держа в руке» (<i>main tenant</i>) — то, что сейчас у тебя в руках. А {{aujourd'hui}} — «в день сегодняшнего дня»: в нём слово «день» спрятано дважды.</p>
<p>{{déjà vu}} — «уже виденное» — французское выражение, которое знают на всех языках.</p>`,
  pins: [{ id: "fr38", t: "Слова времени", html: `<table class="tbl"><tbody><tr><td class="fr">déjà / pas encore</td><td>уже / ещё не</td></tr><tr><td class="fr">toujours / jamais</td><td>всегда, всё ещё / никогда</td></tr><tr><td class="fr">avant · maintenant · après</td><td>раньше · сейчас · потом</td></tr><tr><td class="fr">depuis + настоящее</td><td>уже … (и продолжается)</td></tr><tr><td>место</td><td class="fr">J'ai déjà mangé.</td></tr></tbody></table>` }],
  tasks: [
    { k: "tiles", lang: "fr", q: "Я уже поел.", a: "J'ai déjà mangé", d: ["encore", "jamais"], why: "déjà — между avoir и глаголом" },
    { k: "input", lang: "fr", q: "Я ещё не закончил.", a: ["Je n'ai pas encore fini."], why: "ещё не — pas encore" },
    { k: "choice", q: "Я учу французский уже год.", opts: ["J'apprends le français depuis un an.", "J'ai appris le français depuis un an.", "J'apprends le français déjà un an."], a: "J'apprends le français depuis un an.", why: "depuis + настоящее" },
    { k: "fix", lang: "fr", q: "J'ai mangé déjà.", a: ["J'ai déjà mangé."], why: "déjà — перед вторым глаголом" },
    { k: "choice", q: "Il est toujours en retard. значит…", opts: ["Он всегда опаздывает.", "Он никогда не опаздывает.", "Он уже опоздал."], a: "Он всегда опаздывает.", why: "toujours — всегда" },
    { k: "listen", say: "Tu es encore là ?", q: "Что прозвучало?", opts: ["Ты ещё здесь?", "Ты уже здесь?", "Ты снова там?"], a: "Ты ещё здесь?", why: "encore — ещё" },
    { k: "input", lang: "fr", q: "Теперь я понимаю.", a: ["Maintenant, je comprends.", "Maintenant je comprends."], why: "maintenant — сейчас, теперь" },
    { k: "choice", q: "«ещё не» — это…", opts: ["pas encore", "pas déjà", "encore pas"], a: "pas encore", why: "ne … pas encore" },
    { k: "input", lang: "fr", q: "Раньше я жил в Москве.", a: ["Avant, j'habitais à Moscou.", "Avant j'habitais à Moscou."], why: "раньше — фон: j'habitais" },
    { k: "choice", q: "После еды мы выходим: … le repas, nous sortons.", opts: ["Après", "Avant", "Depuis"], a: "Après", why: "après — после" },
  ] };
