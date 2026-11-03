window.ET_C2 = window.ET_C2 || {};
ET_C2[24] = { n: 24, sec: 3, t: "Где: в, на, под, за, возле", s: "dans, sur, sou, devant, deryer, pre, a, de",
  words: [["plas", "площадь"], ["marche", "рынок"], ["magazen", "магазин"], ["gar", "вокзал"], ["kuizine", "кухня"], ["ru", "улица"]],
  gram: ["dans", "sur", "sou", "devant", "deryer", "pre", "antr", "otour", "a"],
  sut: "Слово не меняется — «где» показывает предлог: <b>dans</b> в, <b>sur</b> на, <b>sou</b> под, <b>devant</b> перед, <b>deryer</b> за, <b>pre</b> возле, <b>a</b> к/в (куда), <b>de</b> из.",
  rule: `<table class="tbl"><tbody><tr><td class="et">dans</td><td>в, внутри</td><td class="et">sur</td><td>на</td></tr><tr><td class="et">sou</td><td>под</td><td class="et">pre</td><td>возле</td></tr><tr><td class="et">devant</td><td>перед</td><td class="et">deryer</td><td>за</td></tr><tr><td class="et">antr</td><td>между</td><td class="et">otour</td><td>вокруг</td></tr><tr><td class="et">a</td><td>к, в (куда)</td><td class="et">de</td><td>из, от</td></tr></tbody></table>`,
  prosto: `<p>В русском «где» показывают и предлог, и окончание: «в доме», «на столе», «под столом». В Etoilal окончаний нет — работает только предлог:</p>
@@pin:gde@@
> Le cha dormet sou le tabl. :: Кошка спит под столом.
> Le livr eset sur le tabl. :: Книга на столе.
> Maman eset dans le kuizine. :: Мама на кухне (в кухне).
> Le magazen eset pre le gar. :: Магазин возле вокзала.
> Le park eset deryer le marche. :: Парк за рынком.
<h3>Где или куда</h3>
<p>«Где» — [[dans]] (в, внутри). «Куда» — [[a]] (к, в):</p>
> Je travayem dans le magazen. :: Я работаю в магазине.
> J'alem a le magazen. :: Я иду в магазин.
> Il revnit de le marche. :: Он вернулся с рынка.
<p>[[de]] перед гласной сливается: [[d'ekol]] — из школы.</p>
<h3>Частые ошибки</h3>
<p>• «Иду в магазин» через dans: «J'alem dans le magazen» — так говорят, только если ходишь внутри. Куда — [[a]]: [[J'alem a le magazen.]] • Менять слово: «sur le tablé» — слово не меняется: [[sur le tabl]].</p>`,
  lub: `<p>Во французском <i>à + le</i> сливается в <i>au</i>, а <i>de + le</i> — в <i>du</i>. В Etoilal таких слияний нет: [[a le]], [[de le]] — всё видно и понятно. Сливаются только слова на -e перед гласной, как ты уже знаешь.</p>`,
  pins: [{ id: "gde", t: "Предлоги места", html: `<table class="tbl"><tbody><tr><td class="et">dans</td><td>в, внутри</td><td class="et">sur</td><td>на</td></tr><tr><td class="et">sou</td><td>под</td><td class="et">pre</td><td>возле</td></tr><tr><td class="et">devant</td><td>перед</td><td class="et">deryer</td><td>за</td></tr><tr><td class="et">antr</td><td>между</td><td class="et">otour</td><td>вокруг</td></tr><tr><td class="et">a</td><td>к, в (куда)</td><td class="et">de</td><td>из, от, с</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", q: "под столом", a: ["sou le tabl"], why: "sou — под" },
    {"k": "input", "q": "Кошка на столе.", "a": ["Le cha eset sur le tabl."], "why": "sur — на"},
    { k: "choice", q: "«за рынком»", opts: ["deryer le marche", "devant le marche", "pre le marche"], a: "deryer le marche", why: "deryer — за, devant — перед" },
    {"k": "input", "q": "Я иду на рынок.", "a": ["J'alem a le marche."], "why": "куда — a"},
    {"k": "input", "q": "Он работает на вокзале.", "a": ["Il travayet dans le gar."], "why": "где — dans"},
    { k: "fix", q: "J'alem dans le gar.", a: ["J'alem a le gar."], why: "куда — a" },
    {"k": "tiles", "q": "Парк возле школы.", "a": "Le park eset pre l'ekol", "d": ["sur", "a"], "why": "pre — возле"},
    {"k": "input", "q": "Она вернулась из магазина.", "a": ["El revnit de le magazen."], "why": "de — из"},
    { k: "choice", q: "Что значит otour?", opts: ["вокруг", "между", "перед"], a: "вокруг", lang: "x", why: "otour — вокруг, antr — между" },
    {"k": "input", "q": "Папа на кухне.", "a": ["Per eset dans le kuizine."], "why": "dans — в, внутри"},
  ] };
