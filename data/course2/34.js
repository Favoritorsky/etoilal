window.ET_C2 = window.ET_C2 || {};
ET_C2[34] = { n: 34, sec: 5, t: "Союзы: но, или, потому что, хотя", s: "me, oubyen, pasq, donq, byenqe, tanqe, qom",
  words: [["plaj", "пляж"], ["laq", "озеро"], ["barq", "лодка"], ["nuaj", "облако"], ["tablo", "картина"]],
  gram: ["me", "oubyen", "pasq", "donq", "byenqe", "tanqe", "qom"],
  sut: "<b>me</b> но, <b>oubyen</b> или, <b>pasq</b> потому что, <b>donq</b> значит, <b>byenqe</b> хотя, <b>tanqe</b> пока, <b>qom</b> как. С ними фразы склеиваются в длинные.",
  rule: `<table class="tbl"><tbody><tr><td class="et">e</td><td>и</td><td class="et">me</td><td>но</td></tr><tr><td class="et">oubyen</td><td>или</td><td class="et">pasq</td><td>потому что</td></tr><tr><td class="et">donq</td><td>значит</td><td class="et">byenqe</td><td>хотя</td></tr><tr><td class="et">tanqe</td><td>пока</td><td class="et">qom</td><td>как</td></tr></tbody></table>`,
  prosto: `<p>Союзы соединяют фразы. Порядок слов в каждой части — обычный.</p>
> J'emem le laq, me je qourem pa. :: Я люблю озеро, но не бегаю.
> Le te oubyen le qafe? :: Чай или кофе?
> Je repozem pasq je fatigem. :: Я отдыхаю, потому что устаю.
> Il eset laba, donq il savet. :: Он там, значит, он знает.
> Byenqe il eset povr, il eset eureu. :: Хотя он беден, он счастлив.
> Tanqe tu dormes, je lizem. :: Пока ты спишь, я читаю.
> El chantet qom un oizo. :: Она поёт, как птица.
<h3>Как в русском</h3>
<p>Тут почти всё как в русском: союз — и дальше обычная фраза. Запятые ставят по смыслу, как удобно.</p>
<h3>Частые ошибки</h3>
<p>• Путать [[me]] «но» и [[mey]] «мне». • После [[byenqe]] нужна целая фраза с глаголом: «хотя он беден» — [[byenqe il eset povr]].</p>`,
  lub: `<p>Все союзы — французские, записанные как слышатся: <i>mais</i> → me, <i>ou bien</i> → oubyen, <i>parce que</i> → pasq (как в быстрой речи), <i>donc</i> → donq, <i>bien que</i> → byenqe, <i>tant que</i> → tanqe, <i>comme</i> → qom.</p>`,
  tasks: [
    {"k": "input", "q": "Кофе или чай?", "a": ["Le qafe oubyen le te?"], "why": "oubyen — или"},
    {"k": "input", "q": "Я сплю, потому что устаю.", "a": ["Je dormem pasq je fatigem."], "why": "pasq — потому что"},
    {"k": "input", "q": "Пока ты читаешь, я пою.", "a": ["Tanqe tu lizes, je chantem."], "why": "tanqe — пока"},
    { k: "choice", q: "«Она поёт, как птица»", opts: ["El chantet qom un oizo.", "El chantet qe un oizo.", "El chantet pasq un oizo."], a: "El chantet qom un oizo.", why: "qom — как" },
    {"k": "input", "q": "Хотя она богата, она грустная.", "a": ["Byenqe el eset rich, el eset trist."], "why": "byenqe + целая фраза"},
    {"k": "tiles", "q": "Я люблю море, но не бегаю.", "a": "J'emem le mer me je qourem pa", "d": ["mey", "pasq"], "why": "me — но (mey — мне)"},
    {"k": "input", "q": "Она здесь, значит, она знает.", "a": ["El eset isi, donq el savet."], "why": "donq — значит"},
    { k: "choice", q: "Что значит nuaj?", opts: ["облако", "озеро", "лодка"], a: "облако", lang: "x", why: "nuaj — облако, laq — озеро, barq — лодка" },
    { k: "choice", q: "«но» — какое слово?", opts: ["me", "mey", "mo"], a: "me", lang: "et", why: "me — но; mey — мне; mo — меня" },
  ] };
