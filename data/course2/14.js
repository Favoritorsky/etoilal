window.ET_C2 = window.ET_C2 || {};
ET_C2[14] = { n: 14, sec: 2, t: "Было: i", s: "chantim — я спел; одна буква вместо e",
  words: [["yer", "вчера"], ["voiyer", "видеть"], ["aler", "идти"], ["vener", "приходить"], ["fezer", "делать"], ["dizer", "сказать"], ["trouver", "найти"]],
  gram: [], unlock: { t: ["i"] },
  sut: "Чтобы сказать «было», замени <b>e</b> на <b>i</b>: chantem (пою) → <b>chantim</b> (спел). Всё остальное как раньше.",
  rule: `<p>основа + <b>i</b> + кто = было: <span class="et">chantim</span> спел, <span class="et">alis</span> ты пошёл, <span class="et">venit</span> он пришёл</p><p><span class="et">yer</span> — вчера</p>`,
  prosto: `<p>Помнишь схему «основа + время + кто»? До сих пор время было одно — <b>e</b> (сейчас). Теперь второе: <b>i</b> — «было».</p>
> Je chantem. :: Я пою.
> Je chantim. :: Я спел.
> Yer je voiyim le mer. :: Вчера я увидел море.
> Il venit isi. :: Он пришёл сюда.
> Nou alin laba. :: Мы пошли туда.
> Koi tu fezis? :: Что ты сделал?
> El dizit oui. :: Она сказала «да».
> Ilz trouvil le kle. :: Они нашли ключ.
<h3>Как в русском, а как нет</h3>
<p>В русском прошедшее меняется по роду: «он спел, она спела». В Etoilal — нет: [[chantit]] — и «он спел», и «она спела». Зато «кто» видно всегда, даже в прошедшем: [[chantim]] — я, [[chantis]] — ты.</p>
<p>«Быть» тоже по схеме: [[esim]] — я был, [[esit]] — он был.</p>
> Yer j'esim malad. :: Вчера я был болен.
<h3>i — «сделал», один раз</h3>
<p>Буква i значит, что действие <b>случилось и закончилось</b>: «спел», «нашёл», «пришёл». Для «пел долго, бывало» есть отдельная буква — её узнаешь в уроке 16.</p>
<h3>Частые ошибки</h3>
<p>• Оставить e: «Yer je chantem» → [[Yer je chantim.]] • Забыть «кто»: «il venti» → [[il venit]]. • Слияние: «je esim» → [[j'esim]].</p>`,
  lub: `<p>Почему именно i? Буквы времён в Etoilal подобраны так, чтобы не путаться: e, i, a, o, u — все гласные разные, и каждая — своё время. Звучит красиво: chant-<b>e</b>-m, chant-<b>i</b>-m, chant-<b>a</b>-m…</p>`,
  tasks: [
    {"k": "input", "q": "я станцевал", "a": ["Je dansim."], "why": "dans + i + m"},
    {"k": "input", "q": "Вчера я увидел луну.", "a": ["Yer je voiyim le lun."], "why": "voiy + i + m"},
    { k: "choice", q: "Что значит venit?", opts: ["он пришёл", "он приходит", "я пришёл"], a: "он пришёл", lang: "x", why: "i — было, t — он" },
    {"k": "input", "q": "Что он сделал?", "a": ["Koi il fezit?"], "why": "fez + i + t"},
    {"k": "input", "q": "Ты сказал «нет».", "a": ["Tu dizis non."], "why": "diz + i + s"},
    {"k": "tiles", "q": "Мы нашли книгу.", "a": "Nou trouvin le livr", "d": ["trouven", "trouvil"], "why": "i — было, n — мы"},
    { k: "fix", q: "Yer je dansem.", a: ["Yer je dansim."], why: "вчера — было — i" },
    {"k": "input", "q": "Вчера ты был грустный.", "a": ["Yer tu esis trist."], "why": "es + i + s"},
    { k: "choice", q: "«Мы пошли туда»", opts: ["Nou alen laba.", "Nou alin laba.", "Nou alil laba."], a: "Nou alin laba.", why: "al + i + n" },
    { k: "listen", say: "Ki venit?", q: "Послушай и напиши", a: ["Ki venit?"], why: "«Кто пришёл?»" },
  ] };
