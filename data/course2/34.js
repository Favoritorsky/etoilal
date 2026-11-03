window.ET_C2 = window.ET_C2 || {};
ET_C2[34] = { n: 34, sec: 5, t: "Союзы: но, или, потому что, хотя", s: "me, oubyen, pask, donk, byenke, tanke, kom",
  words: [["plaj", "пляж"], ["lak", "озеро"], ["bark", "лодка"], ["nuaj", "облако"], ["tablo", "картина"]],
  gram: ["me", "oubyen", "pask", "donk", "byenke", "tanke", "kom"],
  sut: "<b>me</b> но, <b>oubyen</b> или, <b>pask</b> потому что, <b>donk</b> значит, <b>byenke</b> хотя, <b>tanke</b> пока, <b>kom</b> как. С ними фразы склеиваются в длинные.",
  rule: `<table class="tbl"><tbody><tr><td class="et">e</td><td>и</td><td class="et">me</td><td>но</td></tr><tr><td class="et">oubyen</td><td>или</td><td class="et">pask</td><td>потому что</td></tr><tr><td class="et">donk</td><td>значит</td><td class="et">byenke</td><td>хотя</td></tr><tr><td class="et">tanke</td><td>пока</td><td class="et">kom</td><td>как</td></tr></tbody></table>`,
  prosto: `<p>Союзы соединяют фразы. Порядок слов в каждой части — обычный.</p>
> J'emem le lak, me je kourem pa. :: Я люблю озеро, но не бегаю.
> Le te oubyen le kafe? :: Чай или кофе?
> Je repozem pask je fatigem. :: Я отдыхаю, потому что устаю.
> Il eset laba, donk il savet. :: Он там, значит, он знает.
> Byenke il eset povr, il eset eureu. :: Хотя он беден, он счастлив.
> Tanke tu dormes, je lizem. :: Пока ты спишь, я читаю.
> El chantet kom un oizo. :: Она поёт, как птица.
<h3>Как в русском</h3>
<p>Тут почти всё как в русском: союз — и дальше обычная фраза. Запятые ставят по смыслу, как удобно.</p>
<h3>Частые ошибки</h3>
<p>• Путать [[me]] «но» и [[mey]] «мне». • После [[byenke]] нужна целая фраза с глаголом: «хотя он беден» — [[byenke il eset povr]].</p>`,
  lub: `<p>Все союзы — французские, записанные как слышатся: <i>mais</i> → me, <i>ou bien</i> → oubyen, <i>parce que</i> → pask (как в быстрой речи), <i>donc</i> → donk, <i>bien que</i> → byenke, <i>tant que</i> → tanke, <i>comme</i> → kom.</p>`,
  tasks: [
    {"k": "input", "q": "Кофе или чай?", "a": ["Le kafe oubyen le te?"], "why": "oubyen — или"},
    {"k": "input", "q": "Я сплю, потому что устаю.", "a": ["Je dormem pask je fatigem."], "why": "pask — потому что"},
    {"k": "input", "q": "Пока ты читаешь, я пою.", "a": ["Tanke tu lizes, je chantem."], "why": "tanke — пока"},
    { k: "choice", q: "«Она поёт, как птица»", opts: ["El chantet kom un oizo.", "El chantet ke un oizo.", "El chantet pask un oizo."], a: "El chantet kom un oizo.", why: "kom — как" },
    {"k": "input", "q": "Хотя она богата, она грустная.", "a": ["Byenke el eset rich, el eset trist."], "why": "byenke + целая фраза"},
    {"k": "tiles", "q": "Я люблю море, но не бегаю.", "a": "J'emem le mer me je kourem pa", "d": ["mey", "pask"], "why": "me — но (mey — мне)"},
    {"k": "input", "q": "Она здесь, значит, она знает.", "a": ["El eset isi, donk el savet."], "why": "donk — значит"},
    { k: "choice", q: "Что значит nuaj?", opts: ["облако", "озеро", "лодка"], a: "облако", lang: "x", why: "nuaj — облако, lak — озеро, bark — лодка" },
    { k: "choice", q: "«но» — какое слово?", opts: ["me", "mey", "mo"], a: "me", lang: "et", why: "me — но; mey — мне; mo — меня" },
  ] };
