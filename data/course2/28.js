window.ET_C2 = window.ET_C2 || {};
ET_C2[28] = { n: 28, sec: 4, t: "Бы: ri", s: "chanterim — я пел бы; je voulerim — я бы хотел",
  words: [["pouver", "мочь"], ["voiyaj", "путешествие"], ["mond", "мир"], ["rich", "богатый"], ["povr", "бедный"]],
  gram: [], unlock: { m: ["ri"] },
  sut: "«Бы» — кусочек <b>ri</b> между временем и «кто»: chant-e-<b>ri</b>-m = <b>chanterim</b> «я пел бы». Вежливо: Je voulerim un kafe — я бы хотел кофе.",
  rule: `<p>основа + время + <b>ri</b> + кто</p><p><span class="et">chanterim</span> я пел бы · <span class="et">pouverit</span> он мог бы</p><p><span class="et">Je voulerim…</span> — я бы хотел…</p>`,
  prosto: `<p>В схему глагола можно вставить ещё один кусочек — <b>между временем и «кто»</b>. Первый такой кусочек — <b>ri</b>, «бы»:</p>
> chant-e-m → chant-e-ri-m :: пою → пел бы
> Je chanterim. :: Я пел бы.
> Il pouverit. :: Он мог бы.
> Nou voulerin un voiyaj. :: Мы бы хотели путешествие.
> Ilz eseril rich. :: Они были бы богаты.
<h3>Вежливая просьба</h3>
<p>Как в русском «я бы хотел», в Etoilal [[Je voulerim]] звучит мягче, чем [[Je voulem]]:</p>
> Je voulerim un kafe, silvouple. :: Я бы хотел кофе, пожалуйста.
> Tu pouveris parler avek moi? :: Ты мог бы поговорить со мной?
<h3>Как в русском, а как нет</h3>
<p>В русском «бы» — отдельное слово, которое можно поставить куда угодно. В Etoilal это кусочек <b>внутри</b> глагола, и место у него одно.</p>
<h3>Частые ошибки</h3>
<p>• Ставить ri в конец: «chantemri» → [[chanterim]]. • Забыть время: «chantrim» — это не форма; «бы сейчас» — [[chanterim]] (e + ri).</p>`,
  lub: `<p>Лингвисты называют это <b>условным наклонением</b>. Во французском — <i>je chanterais</i>: тоже с r. В Etoilal наклонений три: ri «бы», se «пусть», pe «наверное» — следующие два ждут тебя в уроках 30 и 31.</p>`,
  tasks: [
    {"k": "input", "q": "ты пел бы", "a": ["Tu chanteris."], "why": "chant + e + ri + s"},
    {"k": "input", "q": "Я бы хотел чай, пожалуйста.", "a": ["Je voulerim le te, silvouple.", "Je voulerim un te, silvouple."], "why": "voul + e + ri + m — вежливо"},
    { k: "choice", q: "Что значит pouverit?", opts: ["он мог бы", "он может", "он сможет"], a: "он мог бы", lang: "x", why: "ri — бы" },
    {"k": "input", "q": "Они бы хотели дом.", "a": ["Ilz vouleril un mezon."], "why": "voul + e + ri + l"},
    {"k": "fix", "q": "Je dansemri.", "a": ["Je danserim."], "why": "ri — между временем и «кто»"},
    {"k": "input", "q": "Мы были бы бедны.", "a": ["Nou eserin povr."], "why": "es + e + ri + n"},
    {"k": "tiles", "q": "Ты мог бы танцевать со мной?", "a": "Tu pouveris danser avek moi", "d": ["pouves", "mo"], "why": "pouv + e + ri + s"},
    { k: "choice", q: "Что вежливее?", opts: ["Je voulem un kafe.", "Je voulerim un kafe."], a: "Je voulerim un kafe.", why: "«я бы хотел» — мягче" },
    { k: "choice", q: "Что значит povr?", opts: ["бедный", "богатый", "мир"], a: "бедный", lang: "x", why: "povr — бедный, rich — богатый" },
    { k: "input", q: "Я мог бы.", a: ["Je pouverim."], why: "pouv + e + ri + m" },
  ] };
