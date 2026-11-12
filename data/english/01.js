window.EN_C = window.EN_C || {};
EN_C[1] = { n: 1, t: "Быть: am, is, are", s: "я есть, он есть — в английском «есть» не пропускают",
  words: [["tired", "уставший", "тáйэд"], ["hungry", "голодный", "хáнгри"], ["late", "поздно; опоздавший", "лэйт"], ["ready", "готовый", "рéди"], ["sure", "уверенный", "шуэ"], ["angry", "злой, сердитый", "э́нгри"], ["afraid", "испуганный (боится)", "эфрэ́йд"], ["busy", "занятой", "бúзи"]],
  sut: "По-русски говорят «Я устал», «Он дома» — без глагола. В английском так нельзя: всегда нужно «есть» — {{am}}, {{is}} или {{are}}. {{I am tired.}} — буквально «Я есть уставший».",
  rule: `<table class="tbl"><thead><tr><th>кто</th><th>есть</th><th>коротко</th></tr></thead><tbody>
<tr><td>I — я</td><td class="fr">am</td><td class="fr">I'm</td></tr>
<tr><td>he, she, it — он, она, оно</td><td class="fr">is</td><td class="fr">he's, she's, it's</td></tr>
<tr><td>you, we, they — ты/вы, мы, они</td><td class="fr">are</td><td class="fr">you're, we're, they're</td></tr></tbody></table>
<table class="tbl"><tbody><tr><td>Вопрос — меняем местами</td><td class="fr">Are you tired?</td></tr><tr><td>«Не» — ставим not</td><td class="fr">I'm not ready. · He isn't busy.</td></tr></tbody></table>`,
  prosto: `<p>Всё, что описывает тебя, — возраст, состояние, место, профессия — идёт через {{am}}, {{is}}, {{are}}. В живой речи почти всегда коротко: {{I'm}}, {{it's}}, {{they're}}.</p>
> I'm tired. :: Я устал.
> She's at home. :: Она дома.
> We're late! :: Мы опаздываем!
> It's cold today. :: Сегодня холодно. — «оно есть холодно»: про погоду всегда it's
> They're not ready. :: Они не готовы.
> Are you hungry? :: Ты голодный?
> Is he angry? :: Он злится?
> I'm seventeen. :: Мне семнадцать. — возраст тоже через am: «я есть семнадцать»
@@pin:en1@@
<h3>Как в русском, а как нет</h3>
<p><b>Как в русском:</b> вопрос можно задать интонацией — но в английском ещё и меняют порядок: {{You are ready.}} → {{Are you ready?}}</p>
<p><b>Не как в русском:</b> «мне холодно», «мне 17», «мне страшно» — по-английски «я есть»: {{I'm cold.}}, {{I'm seventeen.}}, {{I'm afraid.}}</p>
<h3>Частые ошибки</h3>
<p>• «I tired» — пропущено am. Надо {{I'm tired.}} • «I have 17 years» — так говорят по-французски, а по-английски {{I'm seventeen.}} • «He are» — с he/she/it только {{is}}.</p>`,
  lub: `<p>Короткие формы ({{I'm}}, {{isn't}}, {{aren't}}) — не «ленивые», а нормальные. В песнях, фильмах и играх ты почти не услышишь полное «I am» — только когда хотят выделить: <i>I AM ready!</i> — «Да готов я!»</p>
<p>Интересно: «I am not» сокращается только до {{I'm not}}. Формы «I amn't» в обычном английском нет — а в вопросе говорят {{Aren't I?}}</p>`,
  pins: [{ id: "en1", t: "am · is · are", html: `<table class="tbl"><tbody><tr><td class="fr">I am → I'm</td><td>я</td></tr><tr><td class="fr">he / she / it is → 's</td><td>он, она, оно</td></tr><tr><td class="fr">you / we / they are → 're</td><td>ты, вы, мы, они</td></tr><tr><td class="fr">Are you…? · I'm not · isn't · aren't</td><td>вопрос и «не»</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "She … at school.", opts: ["is", "are", "am"], a: "is", why: "she → is" },
    { k: "input", lang: "en", q: "Я устал.", a: ["I'm tired.", "I am tired."], why: "«я есть уставший» — I'm tired", hint: "не забудь am" },
    { k: "choice", q: "… you ready?", opts: ["Are", "Is", "Do"], a: "Are", why: "вопрос с be: Are you…?" },
    { k: "input", lang: "en", q: "Мне семнадцать.", a: ["I'm seventeen.", "I am seventeen.", "I'm 17.", "I am 17."], why: "возраст — I'm seventeen" },
    { k: "fix", lang: "en", q: "He are busy.", a: ["He's busy.", "He is busy."], why: "he → is" },
    { k: "input", lang: "en", q: "Мы опаздываем! (мы есть поздно)", a: ["We're late!", "We are late!", "We're late.", "We are late."], why: "we are late" },
    { k: "choice", q: "Как сказать «мне холодно»?", opts: ["I'm cold.", "Me cold.", "I have cold."], a: "I'm cold.", why: "«я есть холодный»" },
    { k: "input", lang: "en", q: "Они не готовы.", a: ["They're not ready.", "They aren't ready.", "They are not ready."], why: "they are not ready" },
    { k: "listen", say: "Is he angry?", q: "Что прозвучало?", opts: ["Он злится?", "Он голодный?", "Он занят?"], a: "Он злится?", why: "angry — злой" },
    { k: "fix", lang: "en", q: "I afraid.", a: ["I'm afraid.", "I am afraid."], why: "пропущено am" },
    { k: "input", lang: "en", q: "Ты голодный?", a: ["Are you hungry?"], why: "вопрос: Are you…?" },
  ] };
