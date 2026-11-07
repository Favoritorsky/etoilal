window.FR_C = window.FR_C || {};
FR_C[49] = { n: 49, t: "Сравнение: plus, moins, le plus", s: "больше, меньше, самый; meilleur",
  words: [["plus … que", "более … чем", "плю … кё"], ["moins … que", "менее … чем", "муэн … кё"], ["aussi … que", "такой же … как", "оси … кё"], ["le plus", "самый", "лё плю"],
    ["meilleur", "лучше (какой)", "мэйёр"], ["mieux", "лучше (как)", "мьё"], ["cher", "дорогой", "шэр"], ["facile", "лёгкий", "фасиль"]],
  sut: "Сравнивают тремя словами: {{plus}} «больше», {{moins}} «меньше», {{aussi}} «так же» + {{que}} «чем / как». {{Paris est plus grand que Lyon.}} «Париж больше Лиона». «Самый» — {{le plus}}: {{la plus belle ville}}. Особые: {{bon}} → {{meilleur}}, {{bien}} → {{mieux}}.",
  rule: `<table class="tbl"><tbody>
<tr><td class="fr">plus grand que</td><td>больше, чем</td></tr><tr><td class="fr">moins cher que</td><td>дешевле, чем (менее дорогой)</td></tr>
<tr><td class="fr">aussi facile que</td><td>такой же лёгкий, как</td></tr><tr><td class="fr">le plus / la plus / les plus</td><td>самый</td></tr>
<tr><td class="fr">bon → meilleur · le meilleur</td><td>хороший → лучше · лучший</td></tr><tr><td class="fr">bien → mieux · le mieux</td><td>хорошо → лучше · лучше всего</td></tr></tbody></table>`,
  prosto: `<p>В русском «больше», «дешевле», «красивее» — одно изменённое слово. Во французском — прилагательное не меняется, а перед ним ставят {{plus}}, {{moins}} или {{aussi}}.</p>
> Paris est plus grand que Lyon. :: Париж больше Лиона. — «пари э плю гран кё льон»
> Le train est moins cher que l'avion. :: Поезд дешевле самолёта. — «лё трэн э муэн шэр кё лавьон»
> Le français est aussi beau que l'italien. :: Французский такой же красивый, как итальянский. — «лё франсэ э оси бо кё литальэн»
> C'est la plus belle ville du monde. :: Это самый красивый город в мире. — «сэ ла плю бэль виль дю монд»
> C'est le livre le plus intéressant. :: Это самая интересная книга. — «сэ лё ливр лё плюзэнтэрэсан»
> Ce gâteau est meilleur. :: Этот торт лучше. — «сё гато э мэйёр»
> Tu parles mieux que moi. :: Ты говоришь лучше меня. — «тю парль мьё кё муа»
> C'est plus facile ! :: Так проще! — «сэ плю фасиль»
@@pin:fr49@@
<h3>meilleur или mieux</h3>
<p>{{meilleur}} — «лучше» про <b>предмет</b> (какой?): {{un meilleur film}}. {{mieux}} — «лучше» про <b>действие</b> (как?): {{il chante mieux}}. По-русски одно слово «лучше», а по-французски два.</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «более интересный», «самый красивый» — тоже через отдельные слова.</p>
<p><b>Не как в русском:</b> «больше Лиона» (без «чем») во французском невозможно — всегда {{que}}: {{plus grand que Lyon}}. И «самый» повторяет le / la: {{la plus belle}}, {{le livre le plus intéressant}}.</p>
<h3>Частые ошибки</h3>
<p>• «plus bon» — надо {{meilleur}}. • «Il chante meilleur» — про действие {{mieux}}. • Забывают que: «plus grand Lyon» — надо {{plus grand que Lyon}}.</p>`,
  lub: `<p>«Лучшее — враг хорошего» по-французски: <i>Le mieux est l'ennemi du bien.</i> Эту фразу приписывают Вольтеру.</p>
<p>{{moins}} помогает быть вежливым: вместо «Это дорого» скажи <i>C'est moins cher ailleurs</i> — «В другом месте дешевле».</p>`,
  pins: [{ id: "fr49", t: "Сравнение", html: `<table class="tbl"><tbody><tr><td class="fr">plus / moins / aussi … que</td><td>больше / меньше / так же … чем</td></tr><tr><td class="fr">le plus / la plus</td><td>самый</td></tr><tr><td class="fr">bon → meilleur</td><td>лучше (какой)</td></tr><tr><td class="fr">bien → mieux</td><td>лучше (как)</td></tr></tbody></table>` }],
  tasks: [
    { k: "tiles", lang: "fr", q: "Париж больше Лиона.", a: "Paris est plus grand que Lyon", d: ["moins", "aussi"], why: "plus … que" },
    { k: "choice", q: "Поезд дешевле самолёта.", opts: ["Le train est moins cher que l'avion.", "Le train est plus cher que l'avion.", "Le train est moins cher l'avion."], a: "Le train est moins cher que l'avion.", why: "дешевле — moins cher que" },
    { k: "input", lang: "fr", q: "Это самый красивый город в мире.", a: ["C'est la plus belle ville du monde."], why: "la plus + belle" },
    { k: "choice", q: "Ce gâteau est …", opts: ["meilleur", "plus bon", "mieux"], a: "meilleur", why: "bon → meilleur" },
    { k: "choice", q: "Tu parles … que moi.", opts: ["mieux", "meilleur", "plus bien"], a: "mieux", why: "как говоришь — mieux" },
    { k: "fix", lang: "fr", q: "Il chante plus bien que moi.", a: ["Il chante mieux que moi."], why: "bien → mieux" },
    { k: "listen", say: "Le français est aussi beau que l'italien.", q: "Что прозвучало?", opts: ["Французский такой же красивый, как итальянский.", "Французский красивее итальянского.", "Итальянский красивее французского."], a: "Французский такой же красивый, как итальянский.", why: "aussi … que — так же, как" },
    { k: "input", lang: "fr", q: "Так проще!", a: ["C'est plus facile !", "C'est plus facile"], why: "plus facile" },
    { k: "choice", q: "Это самая интересная книга: C'est le livre … intéressant.", opts: ["le plus", "plus", "très"], a: "le plus", why: "самый после слова — le plus" },
    { k: "input", lang: "fr", q: "Ты говоришь лучше меня.", a: ["Tu parles mieux que moi."], why: "mieux que moi" },
  ] };
