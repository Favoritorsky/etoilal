window.ET_C2 = window.ET_C2 || {};
ET_C2[5] = { n: 5, sec: 1, t: "Быть: j'esem, tu eses…", s: "первый глагол — и сразу вся схема",
  words: [["eser", "быть"], ["isi", "здесь"], ["laba", "там"], ["eureu", "счастливый"], ["trist", "грустный"], ["metr", "учитель"], ["malad", "больной"]],
  gram: [], unlock: { t: ["e"] },
  sut: "Быть — <b>eser</b>: j'esem (я есть), tu eses, il eset, nou esen, vou esez, ilz esel. Последняя буква показывает, <b>кто</b>.",
  rule: `<table class="tbl"><tbody><tr><td class="et">j'esem</td><td>я есть</td><td class="et">nou esen</td><td>мы</td></tr><tr><td class="et">tu eses</td><td>ты</td><td class="et">vou esez</td><td>вы</td></tr><tr><td class="et">il eset</td><td>он, она</td><td class="et">ilz esel</td><td>они</td></tr></tbody></table><p>Последняя буква: m я, s ты, t он/она, n мы, z вы, l они.</p>`,
  prosto: `<p>В русском мы говорим «Я дома», «Он учитель» — без слова «есть». В Etoilal глагол «быть» <b>нельзя пропускать</b>: «Я есть дома», «Он есть учитель».</p>
@@pin:eser@@
<p>Посмотри на концы слов: <b>m, s, t, n, z, l</b>. Это и есть главный секрет Etoilal: <b>последняя буква глагола показывает, кто делает</b>. Так устроены все глаголы — эту схему ты будешь использовать постоянно.</p>
> J'esem isi. :: Я здесь.
> Tu eses eureu. :: Ты счастлив.
> Il eset metr. :: Он учитель.
> El eset malad. :: Она больна.
> Nou esen laba. :: Мы там.
> Ilz esel trist. :: Они грустные.
<h3>Почему j'esem, а не je esem?</h3>
<p>Помнишь слияние из урока 3? <b>je</b> — тоже короткое слово на -e. Перед гласной оно теряет e: je + esem → [[j'esem]].</p>
<h3>Слова не меняются</h3>
<p>В русском «счастлив, счастлива, счастливы». В Etoilal [[eureu]] — всегда [[eureu]]: [[Il eset eureu.]], [[El eset eureu.]], [[Nou esen eureu.]]</p>
<h3>Можно ли без tu?</h3>
<p>Да! Раз последняя буква и так показывает, кто это, местоимение можно не говорить — так звучит разговорно и коротко:</p>
> Eses eureu. :: Ты счастлив. (= Tu eses eureu.)
> Esem isi. :: Я здесь. (= J'esem isi.)
> Esen laba. :: Мы там.
<p><b>Осторожно с «он» и «она»:</b> у обоих конец <b>-t</b>, поэтому [[Eset metr.]] — это и «Он учитель», и «Она учитель». Если важно, о ком речь, — оставь [[il]] или [[el]]. То же с «они»: <b>-l</b> и для [[ilz]], и для [[elz]].</p>
<p>С местоимением — нейтрально и аккуратно, без него — по-разговорному. Оба варианта правильные, и в заданиях засчитываются оба.</p>
<h3>Частые ошибки</h3>
<p>• Пропускать глагол: «Il metr» → [[Il eset metr.]] • Забывать слияние: «je esem» → [[j'esem]]. • Путать концы: «nou eset» — надо [[nou esen]] (мы — n).</p>`,
  lub: `<p>Форма [[eser]] — это «словарная» форма (инфинитив) с концом -er. У всех глаголов Etoilal он одинаковый. Отрежь -er — получишь основу: es-. Дальше идёт кусочек «когда» (e — сейчас) и буква «кто»: es + e + m = esem. В уроке 9 ты увидишь, что так собираются <b>все</b> глаголы.</p>`,
  pins: [{ id: "eser", t: "Быть (сейчас)", html: `<table class="tbl"><tbody><tr><td class="et">j'esem</td><td>я есть</td><td class="et">nou esen</td><td>мы есть</td></tr><tr><td class="et">tu eses</td><td>ты есть</td><td class="et">vou esez</td><td>вы есть</td></tr><tr><td class="et">il eset</td><td>он есть</td><td class="et">ilz esel</td><td>они есть</td></tr><tr><td class="et">el eset</td><td>она есть</td><td class="et">elz esel</td><td>они (ж.) есть</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", q: "Я здесь.", a: ["J'esem isi."], why: "je + esem → j'esem" },
    { k: "input", q: "Он учитель.", a: ["Il eset metr."], why: "«быть» нельзя пропускать; t — он" },
    { k: "choice", q: "«Мы там»", opts: ["Nou eset laba.", "Nou esen laba.", "Nou esem laba."], a: "Nou esen laba.", why: "n — мы" },
    { k: "input", q: "Ты счастлив.", a: ["Tu eses eureu."], why: "s — ты" },
    { k: "fix", q: "Je esem trist.", a: ["J'esem trist."], why: "je перед гласной → j'" },
    { k: "fix", q: "El metr.", a: ["El eset metr."], why: "нужен глагол «быть»" },
    { k: "tiles", q: "Они больны.", a: "Ilz esel malad", d: ["eset", "elz"], why: "l — они" },
    { k: "choice", q: "Что значит vou esez isi?", opts: ["вы здесь", "мы здесь", "они здесь"], a: "вы здесь", lang: "x", why: "z — вы" },
    { k: "input", q: "Она грустная.", a: ["El eset trist."], why: "el — она, t — он/она" },
    { k: "choice", q: "Какая буква в конце значит «я»?", opts: ["m", "s", "t"], a: "m", lang: "x", why: "m — я, s — ты, t — он/она" },
    { k: "input", q: "Мы там. (без «мы» — по-разговорному)", a: ["Esen laba."], why: "-n и так значит «мы», местоимение можно опустить" },
    { k: "choice", q: "Что может значить Eset malad.?", opts: ["Он болен или она больна", "Только «он болен»", "Я болен"], a: "Он болен или она больна", lang: "x", why: "-t — и он, и она; чтобы уточнить, скажи il или el" },
  ] };
