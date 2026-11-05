window.ET_C2 = window.ET_C2 || {};
ET_C2[38] = { n: 38, sec: 5, t: "Слова из кусочков", s: "-ou, -ach, -ela, -eur, -man, -iq — одно слово, целая семья",
  words: [["mezonou", "домик"], ["chaou", "котёнок"], ["mezonach", "домище"], ["amiela", "подруга"], ["rapidman", "быстро"], ["syeliq", "небесный"], ["chanteurela", "певица"]],
  gram: [],
  sut: "Суффиксы с одним значением: <b>-ou</b> маленький, <b>-ach</b> большой, <b>-ela</b> женский род, <b>-eur</b> тот, кто делает, <b>-man</b> «как» (наречие), <b>-iq</b> «относящийся к».",
  rule: `<table class="tbl"><tbody><tr><td class="et lt">-ou</td><td>маленький</td><td class="et">mezonou</td></tr><tr><td class="et lt">-ach</td><td>большой</td><td class="et">mezonach</td></tr><tr><td class="et lt">-ela</td><td>женский род</td><td class="et">amiela</td></tr><tr><td class="et lt">-eur</td><td>тот, кто делает</td><td class="et">chanteur</td></tr><tr><td class="et lt">-man</td><td>наречие</td><td class="et">rapidman</td></tr><tr><td class="et lt">-iq</td><td>относящийся к</td><td class="et">syeliq</td></tr></tbody></table>`,
  prosto: `<p>Знаешь одно слово — знаешь целую семью. Кусочки приклеиваются в конец, и у каждого одно значение:</p>
@@pin:suf@@
> mezon → mezonou → mezonach :: дом → домик → домище
> cha → chaou :: кошка → котёнок
> ami → amiela :: друг → подруга
> chanteur → chanteurela :: певец → певица
> rapid → rapidman :: быстрый → быстро
> syel → syeliq :: небо → небесный
<h3>Как в русском</h3>
<p>Очень похоже на русские суффиксы: дом → дом<b>ик</b> → дом<b>ище</b> → дом<b>ашний</b>. Только в русском их много и они капризные (домик, но котёнок, книжка). В Etoilal «маленький» — всегда <b>-ou</b>.</p>
<h3>Можно цепочкой</h3>
<p>[[chanter]] → [[chanteur]] (певец) → [[chanteurela]] (певица): кусочки идут друг за другом.</p>
<h3>Частые ошибки</h3>
<p>• -ela только для живых: «tablela» не бывает. • Путать -ou и -ach: -ou — маленький, милый; -ach — большой, грубоватый.</p>`,
  lub: `<p>Есть и другие кусочки: <b>in-</b> «не-» (inutil — бесполезный), <b>re-</b> «снова» (relizer — перечитывать), <b>-ite</b> «-ость» (qourite — краткость), <b>-aj</b> «-ние» (lavaj — мытьё). Ни один суффикс не кончается на «гласная + m/s/t/n/z/l» — чтобы слово не перепуталось с формой глагола.</p>`,
  pins: [{ id: "suf", t: "Кусочки для новых слов", html: `<table class="tbl"><tbody><tr><td class="et lt">-ou</td><td>маленький, милый</td></tr><tr><td class="et lt">-ach</td><td>большой, грубый</td></tr><tr><td class="et lt">-ela</td><td>женский род (только живые)</td></tr><tr><td class="et lt">-eur</td><td>тот, кто делает</td></tr><tr><td class="et lt">-man</td><td>наречие («как»)</td></tr><tr><td class="et lt">-iq</td><td>относящийся к («-ный»)</td></tr><tr><td class="et lt">-ant / -ey</td><td>поющий / спетый</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", q: "mezon — дом. А «домик»?", a: ["mezonou"], why: "-ou — маленький" },
    { k: "input", q: "mezon — дом. А «домище»?", a: ["mezonach"], why: "-ach — большой" },
    { k: "input", q: "ami — друг. А «подруга»?", a: ["amiela"], why: "-ela — женский род" },
    { k: "input", q: "cha — кошка. А «котёнок»?", a: ["chaou"], why: "-ou — маленький, ласковый" },
    { k: "input", q: "rapid — быстрый. А «быстро»?", a: ["rapidman"], why: "-man — наречие" },
    { k: "choice", q: "Что значит syeliq?", opts: ["небесный", "небо", "небушко"], a: "небесный", lang: "x", why: "-iq — относящийся к" },
    { k: "choice", q: "Что значит chanteurela?", opts: ["певица", "песня", "поющая"], a: "певица", lang: "x", why: "chant + eur + ela" },
    { k: "tiles", q: "Котёнок спит в домике.", a: "Le chaou dormet dans le mezonou", d: ["mezonach", "chaach"], why: "-ou — маленький" },
    { k: "choice", q: "Можно ли сказать tablela?", opts: ["нет: -ela только для живых", "да: «столиха»"], a: "нет: -ela только для живых", lang: "x", why: "-ela — только живые" },
  ] };
