window.EN_C = window.EN_C || {};
EN_C[7] = { n: 7, t: "Сравнение: bigger, more interesting", s: "-er, more, the most, as … as",
  words: [["cheap", "дешёвый", "чип"], ["expensive", "дорогой", "икспэ́нсив"], ["easy", "лёгкий (простой)", "и́зи"], ["difficult", "трудный", "дúфикэлт"], ["fast", "быстрый", "фаст"], ["slow", "медленный", "слоу"], ["than", "чем", "зэн"], ["better / worse", "лучше / хуже", "бэ́тэ / уёрс"]],
  sut: "Короткие слова получают <b>-er</b> и <b>the -est</b>: {{fast}} → {{faster}} → {{the fastest}}. Длинные — <b>more</b> и <b>the most</b>: {{more interesting}}, {{the most interesting}}. «Чем» — {{than}}.",
  rule: `<table class="tbl"><thead><tr><th>слово</th><th>больше</th><th>самый</th></tr></thead><tbody>
<tr><td>короткое: fast, cheap, big</td><td class="fr">faster · cheaper · bigger</td><td class="fr">the fastest · the biggest</td></tr>
<tr><td>на -y: easy, happy</td><td class="fr">easier · happier</td><td class="fr">the easiest</td></tr>
<tr><td>длинное: expensive, difficult</td><td class="fr">more expensive</td><td class="fr">the most expensive</td></tr>
<tr><td>особые: good, bad</td><td class="fr">better · worse</td><td class="fr">the best · the worst</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td class="fr">as fast as</td><td>такой же быстрый, как</td></tr><tr><td class="fr">not as fast as</td><td>не такой быстрый, как</td></tr></tbody></table>`,
  prosto: `<p>Как понять, короткое слово или длинное? Слушай слоги: один слог ({{fast}}, {{cheap}}) — -er. Три и больше ({{in-te-res-ting}}) — more. Два слога на -y ({{ea-sy}}) — -ier.</p>
> My laptop is faster than yours. :: Мой ноутбук быстрее твоего.
> This game is more difficult than that one. :: Эта игра сложнее той.
> It's the best day of my life! :: Это лучший день в моей жизни!
> English is easier than French. :: Английский легче французского. — easy → easier
> This is the most expensive phone in the shop. :: Это самый дорогой телефон в магазине.
> The new version is worse. :: Новая версия хуже.
> He's as tall as his father. :: Он такой же высокий, как его отец.
> The bus isn't as fast as the metro. :: Автобус не такой быстрый, как метро.
@@pin:en7@@
<h3>Частые ошибки</h3>
<p>• «more fast» — короткое слово: {{faster}}. • «more better» — better уже значит «более хороший». • «than me» и «than I am» — оба нормальные: {{He's taller than me.}} • big → {{bigger}}: короткое слово на «гласная + согласная» удваивает букву (как в running).</p>`,
  lub: `<p>{{The more, the better.}} — «Чем больше, тем лучше». Целая конструкция: {{The faster you play, the more you win.}} — «Чем быстрее играешь, тем больше выигрываешь».</p>`,
  pins: [{ id: "en7", t: "Сравнение", html: `<table class="tbl"><tbody><tr><td class="fr">fast → faster → the fastest</td><td>короткие</td></tr><tr><td class="fr">more / the most expensive</td><td>длинные</td></tr><tr><td class="fr">good better best · bad worse worst</td><td>особые</td></tr><tr><td class="fr">than · as … as</td><td>чем · такой же, как</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "My PC is … than yours.", opts: ["faster", "more fast", "fastest"], a: "faster", why: "короткое слово — -er" },
    { k: "input", lang: "en", q: "Эта игра сложнее той.", a: ["This game is more difficult than that one.", "This game is more difficult than that game.", "This game is harder than that one."], why: "difficult — длинное: more difficult" },
    { k: "choice", q: "It's … day of my life!", opts: ["the best", "the goodest", "the most good"], a: "the best", why: "good → the best" },
    { k: "fix", lang: "en", q: "English is more easy than French.", a: ["English is easier than French."], why: "easy → easier" },
    { k: "input", lang: "en", q: "Это самый дорогой телефон.", a: ["This is the most expensive phone.", "It's the most expensive phone.", "It is the most expensive phone."], why: "the most expensive" },
    { k: "choice", q: "big → ?", opts: ["biger", "bigger", "more big"], a: "bigger", why: "удваиваем g" },
    { k: "input", lang: "en", q: "Он такой же высокий, как его отец.", a: ["He's as tall as his father.", "He is as tall as his father."], why: "as … as" },
    { k: "listen", say: "The new version is worse.", q: "Что прозвучало?", opts: ["Новая версия хуже.", "Новая версия лучше.", "Новая версия дороже."], a: "Новая версия хуже.", why: "worse — хуже" },
    { k: "fix", lang: "en", q: "She is more better than me.", a: ["She is better than me.", "She's better than me."], why: "better — без more" },
    { k: "input", lang: "en", q: "Автобус не такой быстрый, как метро.", a: ["The bus isn't as fast as the metro.", "The bus is not as fast as the metro."], why: "not as … as" },
  ] };
