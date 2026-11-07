window.FR_C = window.FR_C || {};
FR_C[11] = { n: 11, t: "Много: les, des", s: "s на конце молчит — «много» слышно по les и des",
  words: [["les", "те самые (много)", "ле"], ["des", "какие-то (много)", "дэ"], ["la fleur", "цветок", "ла флёр"], ["le jardin", "сад", "лё жардэн"],
    ["la pomme", "яблоко", "ла пом"], ["l'œil", "глаз", "лёй"], ["les yeux", "глаза", "лезьё"], ["beaucoup", "много", "боку"]],
  sut: "«Много» во французском пишут буквой <b>s</b> на конце — но она <b>молчит</b>: {{fleur}} и {{fleurs}} звучат одинаково. Поэтому «много» слышно по маленькому слову: le и la → <b>les</b> «ле», un и une → <b>des</b> «дэ».",
  rule: `<table class="tbl"><thead><tr><th>один</th><th>много</th><th>читается</th></tr></thead><tbody>
<tr><td class="fr">le livre / la fleur</td><td class="fr">les livre<s>s</s> / les fleur<s>s</s></td><td>ле ливр / ле флёр</td></tr>
<tr><td class="fr">un livre / une fleur</td><td class="fr">des livre<s>s</s> / des fleur<s>s</s></td><td>дэ ливр / дэ флёр</td></tr>
<tr><td class="fr">l'arbre</td><td class="fr">les arbre<s>s</s></td><td>лезарбр</td></tr></tbody></table>`,
  prosto: `<p>В русском «много» видно по окончанию: книга — книги. Во французском тоже добавляют <b>s</b>, но её <b>не читают</b>. Как же понять на слух, один предмет или много? По маленькому слову перед ним: <b>les</b> и <b>des</b> — для «много», причём у них <b>нет рода</b>.</p>
> la fleur :: цветок — «ла флёр»
> les fleurs :: цветы — «ле флёр»: s молчит, «много» слышно по les
> un livre :: книга — «эн ливр»
> des livres :: книги — «дэ ливр»
> les arbres :: деревья — «лезарбр»: связка s + a
> le jardin :: сад — «лё жардэн»
> des pommes :: яблоки — «дэ пом»
> beaucoup de fleurs :: много цветов — «боку дё флёр»
@@pin:fr11@@
<h3>Особые слова</h3>
<p>Некоторые слова в «много» меняются сильнее: {{l'œil}} «глаз» → {{les yeux}} «глаза» — совсем другое слово. А слова на -eau получают x: {{l'oiseau}} → {{les oiseaux}}. Её тоже не читают.</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «много» отмечают окончанием.</p>
<p><b>Не как в русском:</b> окончание «много» есть на письме, но его <b>не слышно</b>. И у {{les}} и {{des}} нет рода: les livres (он), les fleurs (она) — одинаково.</p>
<h3>Частые ошибки</h3>
<p>• Читают s на конце: «ле флёрс» — надо «ле флёр». • Пишут «des fleur» без s — на письме s нужна. • {{des}} читают «дес» — надо «дэ».</p>`,
  lub: `<p>Когда-то французы произносили s на конце — как испанцы до сих пор: <i>las flores</i>. Потом s замолчала, и вся работа «много» перешла к маленькому слову перед существительным. Поэтому во французском le, la, les почти никогда не пропускают.</p>
<p>После {{beaucoup}} «много» ставят {{de}}, а не des: {{beaucoup de fleurs}} — «много (из) цветов».</p>`,
  pins: [{ id: "fr11", t: "Один и много", html: `<table class="tbl"><tbody><tr><td class="fr">le, la, l'</td><td>→ <span class="fr">les</span> «ле»</td></tr><tr><td class="fr">un, une</td><td>→ <span class="fr">des</span> «дэ»</td></tr><tr><td>на конце слова</td><td>+ s (или x) — молчит</td></tr><tr><td class="fr">beaucoup de</td><td>много (чего)</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "les fleurs читается…", opts: ["ле флёрс", "ле флёр", "лес флёр"], a: "ле флёр", why: "s на конце молчит" },
    { k: "input", lang: "fr", q: "книги (какие-то)", a: ["des livres"], why: "un → des, + s", hint: "un → des" },
    { k: "choice", q: "Как сказать «деревья» (те самые)?", opts: ["les arbres", "des arbre", "le arbres"], a: "les arbres", why: "l' → les, + s" },
    { k: "tiles", lang: "fr", q: "много цветов", a: "beaucoup de fleurs", d: ["des", "les"], why: "после beaucoup — de" },
    { k: "choice", q: "Как будет «глаза»?", opts: ["les œils", "les yeux", "des œil"], a: "les yeux", why: "особое слово: l'œil → les yeux" },
    { k: "fix", lang: "fr", q: "des pomme", a: ["des pommes"], why: "на письме «много» — s" },
    { k: "listen", say: "les arbres", q: "Что прозвучало?", opts: ["les arbres", "l'arbre", "des livres"], a: "les arbres", why: "«лезарбр» — связка" },
    { k: "input", lang: "fr", q: "сады (те самые)", a: ["les jardins"], why: "le → les, + s" },
    { k: "choice", q: "Как на слух отличить «цветок» и «цветы»?", opts: ["по la / les", "по s на конце", "никак"], a: "по la / les", why: "s молчит — слышно маленькое слово" },
    { k: "input", lang: "fr", q: "яблоки (какие-то)", a: ["des pommes"], why: "une → des, + s" },
  ] };
