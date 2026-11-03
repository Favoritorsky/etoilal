window.ET_C2 = window.ET_C2 || {};
ET_C2[16] = { n: 16, sec: 2, t: "Один раз или долго: i и a", s: "chantim — спел; chantam — пел, певал",
  words: [["souvan", "часто"], ["toujour", "всегда"], ["parfoi", "иногда"], ["lizer", "читать"], ["rever", "мечтать"], ["kan", "когда"]],
  gram: [], unlock: { t: ["a"] },
  sut: "Прошлое бывает двух видов: <b>i</b> — сделал (один раз, закончено), <b>a</b> — делал (долго, часто, «бывало»). Как русское «спел» и «пел».",
  rule: `<p><b>i</b> — что сделал? <span class="et">chantim</span> спел</p><p><b>a</b> — что делал? <span class="et">chantam</span> пел, певал</p><p><span class="et">kan</span> — когда</p>`,
  prosto: `<p>В русском есть «спел» и «пел», «прочитал» и «читал». В Etoilal это тоже есть — разными буквами:</p>
<p>• <b>i</b> — «что сделал?»: один раз, дело закончено. • <b>a</b> — «что делал?»: долго, много раз, привычка, фон.</p>
> Yer je lizim un livr. :: Вчера я прочитал книгу. (дочитал)
> Je lizam souvan. :: Я часто читал. (привычка)
> Kan j'esam anfan, je revam toujour. :: Когда я был ребёнком, я всегда мечтал.
<h3>Фон и событие</h3>
<p>Часто в одной фразе есть оба: <b>a</b> — то, что длилось (фон), <b>i</b> — то, что случилось на этом фоне:</p>
> Je lizam kan tu venis. :: Я читал, когда ты пришёл.
> Ilz dansal kan je trouvim le kle. :: Они танцевали, когда я нашёл ключ.
<h3>Подсказка</h3>
<p>Задай вопрос по-русски: «что сделал?» → <b>i</b>, «что делал?» → <b>a</b>. Слова [[souvan]], [[toujour]], [[parfoi]] почти всегда идут с <b>a</b> — они говорят о повторении.</p>
<h3>Частые ошибки</h3>
<p>• «Je lizim souvan» — «часто» значит повторялось, нужно [[Je lizam souvan.]] • Путать a с e: [[chantam]] — пел, [[chantem]] — пою.</p>`,
  lub: `<p>Это то, что лингвисты называют <b>видом</b> (совершенным и несовершенным). Во французском для этого два разных прошедших времени: <i>passé composé</i> и <i>imparfait</i>. В Etoilal — просто i и a.</p>`,
  tasks: [
    { k: "choice", q: "«Вчера я прочитал книгу» (дочитал)", opts: ["Yer je lizim un livr.", "Yer je lizam un livr."], a: "Yer je lizim un livr.", why: "что сделал? — i" },
    { k: "choice", q: "«Я часто читал» (привычка)", opts: ["Je lizim souvan.", "Je lizam souvan."], a: "Je lizam souvan.", why: "что делал? — a" },
    { k: "input", q: "я мечтал (долго, бывало)", a: ["Je revam."], why: "rev + a + m" },
    { k: "input", q: "Я читал, когда ты пришёл.", a: ["Je lizam kan tu venis."], why: "читал — фон (a), пришёл — событие (i)" },
    { k: "choice", q: "Что значит dansal?", opts: ["они танцевали (долго)", "они станцевали", "они танцуют"], a: "они танцевали (долго)", lang: "x", why: "a — долго, l — они" },
    { k: "fix", q: "Il parlit toujour.", a: ["Il parlat toujour."], why: "«всегда» — повторялось — a" },
    { k: "input", q: "Когда я был ребёнком…", a: ["Kan j'esam anfan"], why: "был (долго) — esam" },
    { k: "tiles", q: "Иногда мы пели.", a: "Parfoi nou chantan", d: ["chantin", "chanten"], why: "иногда — повторялось — a" },
    { k: "input", q: "Когда ты придёшь?", a: ["Kan tu venres?"], why: "kan — когда; re — будет" },
    { k: "choice", q: "Что значит souvan?", opts: ["часто", "всегда", "иногда"], a: "часто", lang: "x", why: "souvan — часто, toujour — всегда, parfoi — иногда" },
  ] };
