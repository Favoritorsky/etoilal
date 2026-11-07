window.FR_C = window.FR_C || {};
FR_C[16] = { n: 16, t: "Какой: petit, petite", s: "прилагательное меняется по роду и обычно стоит после слова",
  words: [["noir", "чёрный", "нуар"], ["vert", "зелёный", "вэр"], ["jeune", "молодой", "жён"], ["vieux", "старый", "вьё"],
    ["intéressant", "интересный", "энтэрэсан"], ["joli", "милый, хорошенький", "жоли"], ["heureux", "счастливый", "ёрё"]],
  sut: "Прилагательное подстраивается под слово: «она» → <b>+e</b>, «много» → <b>+s</b>: {{petit}}, {{petite}}, {{petits}}, {{petites}}. Немая буква перед e <b>просыпается</b>: petit «пти» → petite «птит». И обычно прилагательное стоит <b>после</b> слова: {{un chat noir}} — «чёрный кот».",
  rule: `<table class="tbl"><thead><tr><th></th><th>один</th><th>много</th></tr></thead><tbody>
<tr><td>«он»</td><td class="fr">petit «пти»</td><td class="fr">petit<s>s</s> «пти»</td></tr>
<tr><td>«она»</td><td class="fr">petite «птит»</td><td class="fr">petite<s>s</s> «птит»</td></tr></tbody></table>
<p>После слова: <span class="fr">un chat noir, une voiture verte</span>. Перед словом — короткие частые: <span class="fr">petit, grand, beau, bon, jeune, vieux, joli</span>.</p>`,
  prosto: `<p>В русском прилагательное меняет окончание: маленький, маленькая, маленькие. Во французском тоже, но проще: для «она» добавь <b>e</b>, для «много» — <b>s</b>.</p>
> un petit chat :: маленький кот — «эн пти ша»
> une petite maison :: маленький дом — «юн птит мэзон»: t проснулась перед e
> un chat noir :: чёрный кот — «эн ша нуар»
> une voiture verte :: зелёная машина — «юн вуатюр вэрт»: vert «вэр» → verte «вэрт»
> un livre intéressant :: интересная книга — «эн ливр энтэрэсан»
> une histoire intéressante :: интересная история — «юн истуар энтэрэсант»
> des fleurs rouges :: красные цветы — «дэ флёр руж»
> un homme heureux :: счастливый человек — «энном ёрё»
@@pin:fr16@@
<h3>Где стоит прилагательное</h3>
<p>Обычно — <b>после</b> слова: «кот чёрный» — {{un chat noir}}. Но несколько коротких частых слов ставят <b>перед</b>: {{petit}}, {{grand}}, {{beau}}, {{bon}}, {{jeune}}, {{vieux}}, {{joli}}: {{une jolie fleur}}, {{un vieux livre}}.</p>
<h3>Особые формы</h3>
<p>Если слово уже кончается на e — для «она» ничего не меняется: {{jeune}}, {{rouge}}. Некоторые меняются сильнее: {{heureux}} → {{heureuse}} «ёрёз», {{beau}} → {{belle}} «бэль», {{vieux}} → {{vieille}} «вьей».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> прилагательное согласуется с родом и числом.</p>
<p><b>Не как в русском:</b> мы говорим «чёрный кот», французы — «кот чёрный». И «она» часто <b>слышно</b> — по проснувшейся согласной: «пти» — «птит», «вэр» — «вэрт».</p>
<h3>Частые ошибки</h3>
<p>• Ставят прилагательное впереди по-русски: «un noir chat» — надо {{un chat noir}}. • Забывают e для «она»: «une voiture vert» — надо {{verte}}. • Читают petite как «пти» — надо «птит».</p>`,
  lub: `<p>Почему одни прилагательные впереди, а другие сзади? Впереди стоят слова, которые описывают «сущность» — красоту, возраст, добро, размер (французы запоминают их по буквам <b>BAGS</b>: Beauty, Age, Goodness, Size). Остальные — цвет, форма, национальность — после.</p>
<p>Если поставить обычное прилагательное впереди, смысл становится образным, поэтичным. Так часто делают в песнях.</p>`,
  pins: [{ id: "fr16", t: "Прилагательные", html: `<table class="tbl"><tbody><tr><td>«она»</td><td>+ e: <span class="fr">petit → petite</span> (t просыпается)</td></tr><tr><td>«много»</td><td>+ s (молчит)</td></tr><tr><td>место</td><td>после слова: <span class="fr">un chat noir</span></td></tr><tr><td>перед словом</td><td class="fr">petit grand beau bon jeune vieux joli</td></tr><tr><td>особые</td><td class="fr">heureux → heureuse, beau → belle, vieux → vieille</td></tr></tbody></table>` }],
  tasks: [
    { k: "tiles", lang: "fr", q: "чёрный кот", a: "un chat noir", d: ["noire", "une"], why: "прилагательное — после слова" },
    { k: "choice", q: "une voiture …", opts: ["vert", "verte", "verts"], a: "verte", why: "voiture — «она»: + e" },
    { k: "input", lang: "fr", q: "маленький дом", a: ["une petite maison"], why: "maison — «она»; petit — впереди", hint: "petit стоит перед словом" },
    { k: "choice", q: "Как читается petite?", opts: ["пти", "птит", "петите"], a: "птит", why: "t проснулась перед e" },
    { k: "fix", lang: "fr", q: "un noir chat", a: ["un chat noir"], why: "цвет — после слова" },
    { k: "choice", q: "«она» от heureux:", opts: ["heureuxe", "heureuse", "heureux"], a: "heureuse", why: "-eux → -euse" },
    { k: "listen", say: "une histoire intéressante", q: "Что прозвучало?", opts: ["интересная история", "интересная книга", "старая история"], a: "интересная история", why: "«энтэрэсант» — t слышно: «она»" },
    { k: "input", lang: "fr", q: "красные цветы (какие-то)", a: ["des fleurs rouges"], why: "des + слово + прилагательное, у обоих s" },
    { k: "choice", q: "Какое прилагательное обычно стоит ПЕРЕД словом?", opts: ["noir", "jeune", "intéressant"], a: "jeune", why: "короткие частые: petit, grand, beau, bon, jeune, vieux, joli" },
    { k: "input", lang: "fr", q: "счастливый человек", a: ["un homme heureux"], why: "heureux — после слова" },
  ] };
