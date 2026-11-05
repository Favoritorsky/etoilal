window.ET_C2 = window.ET_C2 || {};
ET_C2[11] = { n: 11, sec: 1, t: "Мой, твой, наш", s: "ma, ta, sa… и снова z для «много»",
  words: [["nom", "имя"], ["qle", "ключ"], ["port", "дверь"], ["fenetr", "окно"], ["famiy", "семья"], ["lang", "язык"]],
  gram: ["ma", "ta", "sa", "nota", "vota", "leura", "maz", "taz", "saz", "notaz", "votaz", "leuraz"],
  sut: "Мой — <b>ma</b>, твой — <b>ta</b>, его/её — <b>sa</b>, наш — <b>nota</b>, ваш — <b>vota</b>, их — <b>leura</b>. Много — + z: maz ami — мои друзья.",
  rule: `<table class="tbl"><tbody><tr><td>мой</td><td class="et">ma / maz</td><td>наш</td><td class="et">nota / notaz</td></tr><tr><td>твой</td><td class="et">ta / taz</td><td>ваш</td><td class="et">vota / votaz</td></tr><tr><td>его, её</td><td class="et">sa / saz</td><td>их</td><td class="et">leura / leuraz</td></tr></tbody></table>`,
  prosto: `<p>Эти слова стоят перед существительным вместо le или un:</p>
@@pin:poss@@
> ma frer :: мой брат
> ma seur :: моя сестра
> nota mezon :: наш дом
> sa nom :: его (её) имя
<h3>Не меняются по роду</h3>
<p>В русском «мой брат, моя сестра, моё окно». В Etoilal всегда [[ma]] — рода нет: [[ma frer]], [[ma seur]], [[ma fenetr]].</p>
<h3>Много — снова z</h3>
<p>То же правило, что у le → lez: «чей» + <b>z</b>, само слово не меняется:</p>
> maz ami :: мои друзья
> taz qle :: твои ключи
> notaz anfan :: наши дети
<h3>sa — и «его», и «её»</h3>
<p>[[sa]] значит и «его», и «её» — как французское <i>sa</i>. Кто именно — понятно из разговора.</p>
> Maz ami esel isi. :: Мои друзья здесь.
> Ou eset ta qle? :: Где твой ключ?
> Nota famiy eset gran. :: Наша семья большая.
<h3>Частые ошибки</h3>
<p>• Ставить le вместе с ma: «le ma frer» — лишнее, надо [[ma frer]]. • Забывать z: «ma ami esel» (много друзей) → [[maz ami esel]].</p>`,
  lub: `<p>Это всё та же «z для множества» — у le, un, il, el, а теперь и у ma, ta, sa. Одно правило работает уже в четырёх местах. Слово [[leura]] «их» родственно французскому <i>leur</i>.</p>`,
  pins: [{ id: "poss", t: "Мой, твой, наш…", html: `<table class="tbl"><thead><tr><th></th><th>один</th><th>много</th></tr></thead><tbody><tr><td>мой</td><td class="et">ma</td><td class="et">maz</td></tr><tr><td>твой</td><td class="et">ta</td><td class="et">taz</td></tr><tr><td>его, её</td><td class="et">sa</td><td class="et">saz</td></tr><tr><td>наш</td><td class="et">nota</td><td class="et">notaz</td></tr><tr><td>ваш</td><td class="et">vota</td><td class="et">votaz</td></tr><tr><td>их</td><td class="et">leura</td><td class="et">leuraz</td></tr></tbody></table>` }],
  tasks: [
    {"k": "input", "q": "мой отец", "a": ["ma per"], "why": "ma — мой"},
    {"k": "input", "q": "моя мама", "a": ["ma maman"], "why": "ma не меняется по роду"},
    {"k": "input", "q": "мои ключи", "a": ["maz qle"], "why": "ma + z"},
    { k: "choice", q: "«наш дом»", opts: ["nota mezon", "notaz mezon", "le nota mezon"], a: "nota mezon", why: "nota — наш" },
    {"k": "input", "q": "Где моя книга?", "a": ["Ou eset ma livr?"], "why": "ou + eset + ma livr"},
    {"k": "fix", "q": "Ma seur esel laba. (сестёр много)", "a": ["Maz seur esel laba."], "why": "много сестёр → maz"},
    {"k": "tiles", "q": "Наш город большой.", "a": "Nota vil eset gran", "d": ["notaz", "esel"], "why": "один город → nota + eset"},
    { k: "choice", q: "Что значит saz qle?", opts: ["его (её) ключи", "его ключ", "твои ключи"], a: "его (её) ключи", lang: "x", why: "saz — его/её, много" },
    { k: "input", q: "Как твоё имя? (дословно: «что есть твоё имя?»)", a: ["Qoi eset ta nom?"], why: "qoi + eset + ta nom" },
    { k: "choice", q: "Что значит fenetr?", opts: ["окно", "дверь", "ключ"], a: "окно", lang: "x", why: "fenetr — окно, port — дверь" },
  ] };
