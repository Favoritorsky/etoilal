window.FR_C = window.FR_C || {};
FR_C[46] = { n: 46, t: "Где: в, на, под + города и страны", s: "dans, sur, sous; à Paris, en France",
  words: [["dans", "в, внутри", "дан"], ["sur", "на", "сюр"], ["sous", "под", "су"], ["devant", "перед", "дёван"],
    ["derrière", "за, позади", "дэрьер"], ["à côté de", "рядом с", "а котэ дё"], ["entre", "между", "антр"], ["le pays", "страна", "лё пэи"]],
  sut: "Где что лежит: {{dans}} «в», {{sur}} «на», {{sous}} «под», {{devant}} «перед», {{derrière}} «за», {{à côté de}} «рядом с». А города и страны — особо: город — <b>à</b> ({{à Paris}}), страна «она» — <b>en</b> ({{en France}}), страна «он» — <b>au</b> ({{au Canada}}), много — <b>aux</b> ({{aux États-Unis}}).",
  rule: `<table class="tbl"><tbody>
<tr><td class="fr">dans la boîte</td><td>в коробке</td></tr><tr><td class="fr">sur la table</td><td>на столе</td></tr>
<tr><td class="fr">sous le lit</td><td>под кроватью</td></tr><tr><td class="fr">devant / derrière la maison</td><td>перед / за домом</td></tr>
<tr><td class="fr">à côté de la gare</td><td>рядом с вокзалом</td></tr><tr><td class="fr">entre la porte et la fenêtre</td><td>между дверью и окном</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td>город</td><td class="fr">à Paris, à Moscou</td></tr><tr><td>страна «она» (на -e)</td><td class="fr">en France, en Russie</td></tr>
<tr><td>страна «он»</td><td class="fr">au Canada, au Japon</td></tr><tr><td>страна «много»</td><td class="fr">aux États-Unis</td></tr></tbody></table>`,
  prosto: `<p>Эти слова отвечают на вопрос «где?» — и, в отличие от русского, слово после них <b>не меняется</b>: «на столе» — {{sur la table}}, «под столом» — {{sous la table}}.</p>
> Le chat est sous le lit. :: Кот под кроватью. — «лё ша э су лё ли»
> Les clés sont sur la table. :: Ключи на столе. — «ле клэ сон сюр ла табль»
> Il y a un livre dans la boîte. :: В коробке книга. — «иль я эн ливр дан ла буат»
> J'attends devant le musée. :: Я жду перед музеем. — «жатан дёван лё мюзэ»
> La boulangerie est à côté de la gare. :: Булочная рядом с вокзалом. — «ла буланжри э а котэ дё ла гар»
> J'habite à Moscou, en Russie. :: Я живу в Москве, в России. — «жабит а моску, ан рюси»
> Il travaille au Canada. :: Он работает в Канаде. — «иль травай о канада»
> Nous allons en France. :: Мы едем во Францию. — «нузалон ан франс»
@@pin:fr46@@
<h3>Города и страны</h3>
<p>Одно правило для «где» и «куда»: город — {{à}}, страна женского рода (почти все на -e) — {{en}}, страна мужского рода — {{au}}, «много» — {{aux}}. {{Je vais en France}} — «я еду во Францию», {{je suis en France}} — «я во Франции».</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> в, на, под, перед, за, рядом, между — те же слова.</p>
<p><b>Не как в русском:</b> «в России» — {{en Russie}}, а «в Москве» — {{à Moscou}}: разные слова для страны и города. И «где» и «куда» — одинаково.</p>
<h3>Частые ошибки</h3>
<p>• «à France» — страна на -e: {{en France}}. • «en Paris» — город: {{à Paris}}. • «à côté la gare» — нужно de: {{à côté de la gare}} (de + le = du: {{à côté du musée}}).</p>`,
  lub: `<p>Почему «en France», а не «à la France»? Так говорили ещё в старофранцузском, и форма застыла. А au, aux — это слияние à + le / les, как в «au parc».</p>
<p>Есть и «откуда»: город — {{de}} ({{de Paris}}), страна «она» — {{de}} ({{de France}}), «он» — {{du}} ({{du Canada}}).</p>`,
  pins: [{ id: "fr46", t: "Где: места, города, страны", html: `<table class="tbl"><tbody><tr><td class="fr">dans · sur · sous</td><td>в · на · под</td></tr><tr><td class="fr">devant · derrière · entre</td><td>перед · за · между</td></tr><tr><td class="fr">à côté de (du)</td><td>рядом с</td></tr><tr><td>город · страна (она / он / много)</td><td class="fr">à Paris · en France · au Canada · aux États-Unis</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Кот под кроватью. — Le chat est … le lit.", opts: ["sous", "sur", "dans"], a: "sous", why: "под — sous" },
    { k: "input", lang: "fr", q: "Ключи на столе.", a: ["Les clés sont sur la table."], why: "на — sur" },
    { k: "choice", q: "Я живу в Москве, в России.", opts: ["J'habite à Moscou, en Russie.", "J'habite en Moscou, à Russie.", "J'habite à Moscou, à la Russie."], a: "J'habite à Moscou, en Russie.", why: "город — à, страна «она» — en" },
    { k: "tiles", lang: "fr", q: "Булочная рядом с вокзалом.", a: "La boulangerie est à côté de la gare", d: ["sur", "dans"], why: "рядом с — à côté de" },
    { k: "choice", q: "Он работает в Канаде. — Il travaille … Canada.", opts: ["au", "en", "à"], a: "au", why: "страна «он» — au" },
    { k: "fix", lang: "fr", q: "Nous allons à France.", a: ["Nous allons en France."], why: "страна на -e — en" },
    { k: "listen", say: "J'attends devant le musée.", q: "Что прозвучало?", opts: ["Я жду перед музеем.", "Я жду за музеем.", "Я жду в музее."], a: "Я жду перед музеем.", why: "devant — перед" },
    { k: "input", lang: "fr", q: "В коробке книга. (через il y a)", a: ["Il y a un livre dans la boîte."], why: "в — dans" },
    { k: "choice", q: "за домом", opts: ["derrière la maison", "devant la maison", "sous la maison"], a: "derrière la maison", why: "за — derrière" },
    { k: "input", lang: "fr", q: "Мы едем во Францию.", a: ["Nous allons en France."], why: "куда и где — одинаково: en France" },
  ] };
