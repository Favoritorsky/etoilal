window.FR_C = window.FR_C || {};
FR_C[35] = { n: 35, t: "Было, бывало: je chantais", s: "долгое и привычное прошлое",
  words: [["jouer", "играть", "жуэ"], ["souvent", "часто", "суван"], ["tous les jours", "каждый день", "ту ле жур"], ["autrefois", "раньше, когда-то", "отрёфуа"],
    ["la campagne", "деревня, сельская местность", "ла кампань"], ["la mer", "море", "ла мэр"], ["quand j'étais petit", "когда я был маленьким", "кан жэтэ пти"], ["les gens", "люди", "ле жан"]],
  sut: "Второе прошлое — для того, что <b>длилось</b> или <b>повторялось</b>: «я пел, бывало», «я жил в деревне». Возьми форму «мы» ({{nous chantons}}), отрежь -ons и добавь: <b>-ais, -ais, -ait, -ions, -iez, -aient</b>. {{Je chantais.}} — «я пел».",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>chanter</th><th>читается</th></tr></thead><tbody>
<tr><td>я</td><td class="fr">je chantais</td><td>жё шантэ</td></tr><tr><td>ты</td><td class="fr">tu chantais</td><td>тю шантэ</td></tr>
<tr><td>он</td><td class="fr">il chantait</td><td>иль шантэ</td></tr><tr><td>мы</td><td class="fr">nous chantions</td><td>ну шантьон</td></tr>
<tr><td>вы</td><td class="fr">vous chantiez</td><td>ву шантьэ</td></tr><tr><td>они</td><td class="fr">ils chantaient</td><td>иль шантэ</td></tr></tbody></table>
<p>Основа — от «мы»: <span class="fr">nous finissons → je finissais</span>, <span class="fr">nous faisons → je faisais</span>. Единственное исключение — être: <span class="fr">j'étais</span>.</p>`,
  prosto: `<p>Когда рассказываешь, <b>как было раньше</b> — «я жил в деревне, каждый день играл, часто ходил на море» — французы используют это прошлое. Оно описывает фон, привычки, долгие состояния.</p>
> Quand j'étais petit, j'habitais à la campagne. :: Когда я был маленьким, я жил в деревне. — «кан жэтэ пти, жабитэ а ла кампань»
> Je jouais tous les jours. :: Я играл каждый день. — «жё жуэ ту ле жур»
> Nous allions souvent à la mer. :: Мы часто ездили на море. — «нузальон суван а ла мэр»
> Il faisait beau. :: Была хорошая погода. — «иль фёзэ бо»
> Elle avait un chien. :: У неё была собака. — «эль авэ эн шьен»
> Autrefois, les gens écrivaient des lettres. :: Раньше люди писали письма. — «отрёфуа, ле жан экривэ дэ лэтр»
> Vous étiez fatigués ? :: Вы были уставшими? — «вузэтьэ фатигэ»
@@pin:fr35@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «я пел» (долго, часто) и «я спел» (один раз) — разные формы. «Пел» — это и есть французское {{je chantais}}.</p>
<p><b>Не как в русском:</b> в русском разницу делает приставка (пел — спел). Во французском — разное время: {{je chantais}} (пел) и {{j'ai chanté}} (спел). Подробнее — в следующем уроке.</p>
<h3>Частые ошибки</h3>
<p>• Берут основу не от «мы»: «je faiais» — от nous faisons: {{je faisais}}. • Путают {{chantais}}, {{chantait}}, {{chantaient}} на письме — звучат одинаково «шантэ». • Пишут «j'étais» как «j'êtais» — значок на é: {{j'étais}}.</p>`,
  lub: `<p>Французы называют это время <i>imparfait</i> — «несовершённое»: действие не закончено, оно «тянется». А {{j'ai chanté}} — «совершённое». Очень похоже на русские виды «пел / спел».</p>
<p>Окончания -ais, -ait, -aient звучат одинаково — «э». Поэтому, как всегда, кто делает — слышно по je, tu, il.</p>`,
  pins: [{ id: "fr35", t: "Было: je chantais", html: `<table class="tbl"><tbody><tr><td>основа</td><td>от «мы» без -ons: <span class="fr">nous chant|ons</span></td></tr><tr><td>окончания</td><td class="fr">-ais -ais -ait -ions -iez -aient</td></tr><tr><td>особый</td><td class="fr">être → j'étais</td></tr><tr><td>значит</td><td>было долго, часто, «бывало»</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я играл каждый день. — Je … tous les jours.", opts: ["jouais", "ai joué", "joue"], a: "jouais", why: "каждый день, привычка — je jouais" },
    { k: "input", lang: "fr", q: "Когда я был маленьким", a: ["Quand j'étais petit", "quand j'étais petite"], why: "être → j'étais" },
    { k: "choice", q: "Il … beau. (была хорошая погода)", opts: ["faisait", "faiait", "a fait"], a: "faisait", why: "основа от nous faisons: fais-" },
    { k: "tiles", lang: "fr", q: "Мы часто ездили на море.", a: "Nous allions souvent à la mer", d: ["allons", "sommes"], why: "nous + -ions" },
    { k: "fix", lang: "fr", q: "Elle avais un chien.", a: ["Elle avait un chien."], why: "elle — окончание -ait" },
    { k: "listen", say: "Il faisait beau.", q: "Что прозвучало?", opts: ["Была хорошая погода.", "Будет хорошая погода.", "Хорошая погода."], a: "Была хорошая погода.", why: "faisait — было" },
    { k: "input", lang: "fr", q: "Я жил в деревне.", a: ["J'habitais à la campagne."], why: "долго — j'habitais" },
    { k: "choice", q: "Какая форма — «они пели (бывало)»?", opts: ["ils chantaient", "ils chantent", "ils chantions"], a: "ils chantaient", why: "ils + -aient" },
    { k: "input", lang: "fr", q: "Вы были уставшими?", a: ["Vous étiez fatigués ?", "Vous étiez fatigué ?"], why: "vous + -iez: étiez" },
    { k: "choice", q: "Раньше люди писали письма. — Autrefois, les gens … des lettres.", opts: ["écrivaient", "écrivent", "ont écrit"], a: "écrivaient", why: "раньше, привычка — -aient" },
  ] };
