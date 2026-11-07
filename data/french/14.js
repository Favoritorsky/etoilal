window.FR_C = window.FR_C || {};
FR_C[14] = { n: 14, t: "Вопросы: est-ce que", s: "голосом, через est-ce que и qu'est-ce que",
  words: [["est-ce que", "ли (вопрос «да или нет»)", "эскё"], ["qu'est-ce que", "что (в вопросе)", "кэскё"], ["ça", "это", "са"], ["le thé", "чай", "лё тэ"],
    ["la musique", "музыка", "ла мюзик"], ["le film", "фильм", "лё фильм"], ["le français", "французский язык", "лё франсэ"], ["aussi", "тоже", "оси"]],
  sut: "Вопрос можно задать <b>просто голосом</b>, как в русском: {{Tu parles français ?}} А можно поставить в начало <b>est-ce que</b> «эскё» — это как русское «ли»: {{Est-ce que tu parles français ?}} Вопрос «что?» — <b>qu'est-ce que</b>: {{Qu'est-ce que tu aimes ?}}",
  rule: `<table class="tbl"><thead><tr><th>как</th><th>пример</th><th>читается</th></tr></thead><tbody>
<tr><td>голосом ↗</td><td class="fr">Tu aimes le thé ?</td><td>тю эм лё тэ</td></tr>
<tr><td>est-ce que + фраза</td><td class="fr">Est-ce que tu aimes le thé ?</td><td>эскё тю эм лё тэ</td></tr>
<tr><td>что? — qu'est-ce que</td><td class="fr">Qu'est-ce que tu aimes ?</td><td>кэскё тю эм</td></tr>
<tr><td>что это?</td><td class="fr">Qu'est-ce que c'est ?</td><td>кэскё сэ</td></tr></tbody></table>`,
  prosto: `<p>Самый простой способ — сказать обычную фразу и <b>поднять голос в конце</b>, как в русском «Ты говоришь по-французски?».</p>
> Tu parles français ? :: Ты говоришь по-французски? — «тю парль франсэ»
> Tu aimes le thé ? :: Ты любишь чай? — «тю эм лё тэ»
<p>Второй способ — поставить в начало {{est-ce que}} «эскё». Он ничего не значит, просто сообщает: «сейчас будет вопрос». Порядок слов не меняется.</p>
> Est-ce que tu aimes la musique ? :: Ты любишь музыку? — «эскё тю эм ла мюзик»
> Est-ce qu'il travaille ? :: Он работает? — «эскиль травай»: que → qu' перед гласной
<p>Чтобы спросить «что?», ставят {{qu'est-ce que}} «кэскё»:</p>
> Qu'est-ce que tu manges ? :: Что ты ешь? — «кэскё тю манж»
> Qu'est-ce que c'est ? :: Что это? — «кэскё сэ»
> C'est un film. :: Это фильм. — «сэтэн фильм»
> Moi aussi ! :: Я тоже! — «муа оси»
@@pin:fr14@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> вопрос «да или нет» можно задать одним голосом: «Ты устал?»</p>
<p><b>Не как в русском:</b> у нас нет слова, которое просто «включает» вопрос, а у французов есть — {{est-ce que}}. Это как «а правда, что…» — только короче и без смысла.</p>
<h3>Частые ошибки</h3>
<p>• Читают {{est-ce que}} по буквам «эст сэ кюэ» — надо «эскё». • Меняют порядок слов после est-ce que: «Est-ce que parles tu» — порядок обычный: {{Est-ce que tu parles ?}} • Путают «что?» {{qu'est-ce que}} и «ли» {{est-ce que}}.</p>`,
  lub: `<p>Есть и третий, «книжный» способ: поменять местами «кто» и глагол и соединить их чёрточкой: <i>Parles-tu français ?</i> «Говоришь ли ты по-французски?». Так пишут в книгах и говорят торжественно. В разговоре чаще всего хватает голоса.</p>
<p>Est-ce que буквально значит «есть ли это, что…». За века фраза сжалась в одно короткое «эскё».</p>`,
  pins: [{ id: "fr14", t: "Вопросы", html: `<table class="tbl"><tbody><tr><td>голосом</td><td class="fr">Tu parles français ?</td></tr><tr><td>est-ce que «эскё»</td><td class="fr">Est-ce que tu parles français ?</td></tr><tr><td>что?</td><td class="fr">Qu'est-ce que tu aimes ?</td></tr><tr><td>что это?</td><td class="fr">Qu'est-ce que c'est ?</td></tr></tbody></table>` }],
  tasks: [
    { k: "tiles", lang: "fr", q: "Ты любишь чай? (через est-ce que)", a: "Est-ce que tu aimes le thé", d: ["qu'est-ce", "la"], why: "est-ce que + обычная фраза" },
    { k: "choice", q: "Как спросить «Что ты ешь?»", opts: ["Qu'est-ce que tu manges ?", "Est-ce que tu manges ?", "Tu manges ça ?"], a: "Qu'est-ce que tu manges ?", why: "что? — qu'est-ce que" },
    { k: "input", lang: "fr", q: "Что это?", a: ["Qu'est-ce que c'est ?", "Qu'est-ce que c'est"], why: "qu'est-ce que + c'est" },
    { k: "choice", q: "Est-ce qu… travaille ? (он)", opts: ["'il", "e il", "il"], a: "'il", why: "que → qu' перед гласной: est-ce qu'il" },
    { k: "choice", q: "Как читается est-ce que?", opts: ["эст сэ кё", "эскё", "эсе ке"], a: "эскё", why: "три слова сливаются в «эскё»" },
    { k: "listen", say: "Tu parles français ?", q: "Что прозвучало?", opts: ["Ты говоришь по-французски?", "Ты любишь Францию?", "Ты француз?"], a: "Ты говоришь по-французски?", why: "вопрос голосом" },
    { k: "input", lang: "fr", q: "Я тоже!", a: ["Moi aussi !", "Moi aussi"], why: "moi aussi — «я тоже»", hint: "«муа оси»" },
    { k: "fix", lang: "fr", q: "Est-ce que aimes tu la musique ?", a: ["Est-ce que tu aimes la musique ?"], why: "после est-ce que порядок обычный" },
    { k: "input", lang: "fr", q: "Это фильм.", a: ["C'est un film."], why: "c'est un…", hint: "«сэтэн фильм»" },
    { k: "choice", q: "Что делает est-ce que?", opts: ["показывает, что это вопрос", "значит «что»", "значит «почему»"], a: "показывает, что это вопрос", why: "как русское «ли»" },
  ] };
