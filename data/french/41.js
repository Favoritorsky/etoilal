window.FR_C = window.FR_C || {};
FR_C[41] = { n: 41, t: "Кому: lui, leur", s: "je lui parle — я с ним (ей) говорю",
  words: [["donner", "давать, дарить", "донэ"], ["répondre", "отвечать", "рэпондр"], ["demander", "спрашивать; просить", "дёмандэ"], ["montrer", "показывать", "монтрэ"],
    ["envoyer", "отправлять", "анвуайе"], ["lui", "ему, ей", "люи"], ["leur", "им", "лёр"]],
  sut: "«Кому» — тоже перед глаголом: {{me}} (мне), {{te}} (тебе), {{nous}}, {{vous}} — как в «кого». А «ему / ей» — одно слово {{lui}}, «им» — {{leur}}: {{Je lui donne un cadeau.}} — «я дарю ему (ей) подарок».",
  rule: `<table class="tbl"><thead><tr><th>кому</th><th>слово</th><th>пример</th></tr></thead><tbody>
<tr><td>мне · тебе</td><td class="fr">me · te</td><td class="fr">Il me parle.</td></tr>
<tr><td>ему · ей</td><td class="fr">lui</td><td class="fr">Je lui réponds.</td></tr>
<tr><td>нам · вам</td><td class="fr">nous · vous</td><td class="fr">Elle nous écrit.</td></tr>
<tr><td>им</td><td class="fr">leur</td><td class="fr">Je leur téléphone.</td></tr></tbody></table>
<p>«Кому» нужно, если у глагола есть <span class="fr">à</span>: <span class="fr">parler à, donner à, répondre à, téléphoner à, écrire à, demander à, montrer à</span>.</p>`,
  prosto: `<p>Если глагол говорит «кому» — {{parler à quelqu'un}} «говорить кому-то», {{donner à}} «давать кому-то» — местоимение «кому» тоже встаёт перед глаголом.</p>
> Je lui parle. :: Я с ним (с ней) говорю. — «жё люи парль»: французы «говорят кому»
> Je lui donne un cadeau. :: Я дарю ему (ей) подарок. — «жё люи дон эн кадо»
> Tu leur téléphones ? :: Ты им звонишь? — «тю лёр тэлэфон»
> Elle me répond. :: Она мне отвечает. — «эль мё рэпон»
> Il nous montre la ville. :: Он показывает нам город. — «иль ну монтр ла виль»
> Je vous envoie un message. :: Я отправляю вам сообщение. — «жё вузанвуа эн мэсаж»
> Je ne lui ai pas répondu. :: Я ему не ответил. — «жё нё люи э па рэпондю»
> Demande-lui ! :: Спроси у него! — «дёманд люи»
@@pin:fr41@@
<h3>«кого» или «кому»?</h3>
<p>Смотри на глагол: если после него во французском идёт {{à}} — это «кому» ({{lui}}, {{leur}}). Если без à — «кого» ({{le}}, {{la}}, {{les}}). {{Je le vois}} (voir кого), но {{Je lui parle}} (parler à кому).</p>
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> «я ему дарю» — «кому» перед глаголом тоже бывает.</p>
<p><b>Не как в русском:</b> {{lui}} — и «ему», и «ей». И некоторые глаголы управляют иначе: «звонить кому» — {{téléphoner à}} (lui), но «звать / позвонить кого» — {{appeler}} (le). «Спрашивать у кого» — {{demander à}} → {{lui}}.</p>
<h3>Частые ошибки</h3>
<p>• «Je le parle» — parler à: {{Je lui parle.}} • «Je leurs téléphone» — у «им» нет s: {{leur}}. • «Je donne lui» — перед глаголом: {{Je lui donne.}}</p>`,
  lub: `<p>{{leur}} «им» и {{leur}} «их (чей)» пишутся одинаково, но работают по-разному: {{Je leur parle}} (говорю им) — перед глаголом, без s; {{leurs enfants}} (их дети) — перед существительным, с s во множественном.</p>
<p>Если в одной фразе и «кого», и «кому»: <i>Je le lui donne</i> — «я даю его ему». Такое встретишь позже — главное, что оба стоят перед глаголом.</p>`,
  pins: [{ id: "fr41", t: "Кому: lui, leur", html: `<table class="tbl"><tbody><tr><td>кому</td><td class="fr">me · te · lui · nous · vous · leur</td></tr><tr><td>когда</td><td>у глагола есть à: <span class="fr">parler à, donner à, répondre à, téléphoner à</span></td></tr><tr><td>кого / кому</td><td class="fr">Je le vois. / Je lui parle.</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "Я с ним говорю. — Je … parle.", opts: ["lui", "le", "leur"], a: "lui", why: "parler à — кому: lui" },
    { k: "input", lang: "fr", q: "Я дарю ей подарок.", a: ["Je lui donne un cadeau."], why: "lui — и «ему», и «ей»" },
    { k: "tiles", lang: "fr", q: "Ты им звонишь?", a: "Tu leur téléphones", d: ["les", "leurs"], why: "téléphoner à — кому: leur" },
    { k: "fix", lang: "fr", q: "Je le réponds.", a: ["Je lui réponds."], why: "répondre à — кому: lui" },
    { k: "choice", q: "Я его вижу / я ему говорю:", opts: ["Je le vois. / Je lui parle.", "Je lui vois. / Je le parle.", "Je le vois. / Je le parle."], a: "Je le vois. / Je lui parle.", why: "voir — кого, parler à — кому" },
    { k: "listen", say: "Il nous montre la ville.", q: "Что прозвучало?", opts: ["Он показывает нам город.", "Он показывает им город.", "Мы показываем ему город."], a: "Он показывает нам город.", why: "nous — нам" },
    { k: "input", lang: "fr", q: "Я ему не ответил.", a: ["Je ne lui ai pas répondu."], why: "ne + lui + ai + pas + répondu" },
    { k: "choice", q: "Je … téléphone. (им)", opts: ["leur", "leurs", "les"], a: "leur", why: "«им» — leur без s" },
    { k: "input", lang: "fr", q: "Я отправляю вам сообщение.", a: ["Je vous envoie un message."], why: "vous — вам" },
    { k: "choice", q: "Она мне отвечает.", opts: ["Elle me répond.", "Elle répond me.", "Elle lui répond."], a: "Elle me répond.", why: "me — мне, перед глаголом" },
  ] };
