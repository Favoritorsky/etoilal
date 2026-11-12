window.EN_C = window.EN_C || {};
EN_C[19] = { n: 19, t: "Раньше: used to", s: "I used to play — раньше было, теперь нет",
  words: [["used to", "раньше (обычно) …", "юсту"], ["anymore", "больше не", "энимóр"], ["kid", "ребёнок", "кид"], ["hair", "волосы", "хэа"], ["glasses", "очки", "гласиз"], ["scared of", "боится чего-то", "скэд ов"], ["get used to", "привыкнуть", "гет юст ту"], ["be used to", "привык (уже)", "би юст ту"]],
  sut: "{{used to}} + глагол — «раньше так было, а теперь нет». {{I used to play football.}} — «Раньше я играл в футбол (а теперь нет)». Звучит «юсту».",
  rule: `<table class="tbl"><thead><tr><th></th><th>форма</th><th>пример</th></tr></thead><tbody>
<tr><td>было раньше</td><td class="fr">used to + глагол</td><td class="fr">I used to live in Minsk.</td></tr>
<tr><td>не было раньше</td><td class="fr">didn't use to</td><td class="fr">I didn't use to like fish.</td></tr>
<tr><td>вопрос</td><td class="fr">Did you use to…?</td><td class="fr">Did you use to have long hair?</td></tr></tbody></table>
<p>После did — {{use}} без d (как всегда после did).</p>`,
  prosto: `<p>Это удобный способ рассказать «как было в детстве» или «раньше я был другим»:</p>
> I used to be scared of the dark. :: Раньше я боялся темноты.
> We used to live in a small town. :: Раньше мы жили в маленьком городке.
> She used to have long hair. :: Раньше у неё были длинные волосы.
> I didn't use to like coffee. :: Раньше я не любил кофе.
> Did you use to play this game? :: Ты раньше играл в эту игру?
> He doesn't play anymore. :: Он больше не играет. — anymore в конце фразы
> When I was a kid, I used to watch cartoons every morning. :: В детстве я каждое утро смотрел мультики.
@@pin:en19@@
<h3>Осторожно: похожие</h3>
<p>{{be used to}} + -ing — «привык»: {{I'm used to getting up early.}} — «Я привык рано вставать». {{get used to}} — «привыкать»: {{You'll get used to it.}} — «Привыкнешь». Это не «раньше», а «привычка».</p>
<h3>Частые ошибки</h3>
<p>• «I use to play» (про прошлое) → {{I used to play.}} • «Did you used to?» → {{Did you use to?}} • «I used to playing» → {{I used to play.}}</p>`,
  lub: `<p>{{would}} тоже бывает «раньше обычно»: {{Every summer we would go to the sea.}} — «Каждое лето мы ездили на море». Так говорят в воспоминаниях, чуть по-книжному.</p>`,
  pins: [{ id: "en19", t: "used to", html: `<table class="tbl"><tbody><tr><td class="fr">I used to play</td><td>раньше играл (теперь нет)</td></tr><tr><td class="fr">didn't use to · Did you use to?</td><td>не / вопрос</td></tr><tr><td class="fr">I'm used to + -ing · get used to</td><td>привык · привыкать</td></tr><tr><td class="fr">not … anymore</td><td>больше не</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "en", q: "Раньше я играл в футбол.", a: ["I used to play football."], why: "used to + play" },
    { k: "choice", q: "Did you … play this game?", opts: ["use to", "used to", "using to"], a: "use to", why: "после did — use" },
    { k: "fix", lang: "en", q: "I use to live in Minsk when I was a kid.", a: ["I used to live in Minsk when I was a kid."], why: "про прошлое — used" },
    { k: "input", lang: "en", q: "Раньше я боялся темноты.", a: ["I used to be scared of the dark.", "I used to be afraid of the dark."], why: "used to be scared of" },
    { k: "choice", q: "Он больше не играет. — He doesn't play …", opts: ["anymore", "already", "yet"], a: "anymore", why: "не … anymore" },
    { k: "input", lang: "en", q: "Раньше у неё были длинные волосы.", a: ["She used to have long hair."], why: "used to have" },
    { k: "choice", q: "Привыкнешь! — You'll …", opts: ["get used to it", "used to it", "use to it"], a: "get used to it", why: "get used to — привыкнуть" },
    { k: "listen", say: "I didn't use to like coffee.", q: "Что прозвучало?", opts: ["Раньше я не любил кофе.", "Я больше не люблю кофе.", "Я привык к кофе."], a: "Раньше я не любил кофе.", why: "didn't use to" },
    { k: "fix", lang: "en", q: "I'm used to get up early.", a: ["I'm used to getting up early.", "I am used to getting up early."], why: "be used to + -ing" },
    { k: "input", lang: "en", q: "Раньше мы жили в маленьком городке.", a: ["We used to live in a small town."], why: "used to live" },
  ] };
