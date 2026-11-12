window.EN_C = window.EN_C || {};
EN_C[11] = { n: 11, t: "Вопросы без ошибок", s: "порядок слов: Where do you live? Who called?",
  words: [["how long", "как долго", "хау лонг"], ["how often", "как часто", "хау офн"], ["which", "который (из)", "уич"], ["whose", "чей", "хуз"], ["happen", "случаться", "хэ́пэн"], ["mean", "значить, иметь в виду", "мин"], ["belong", "принадлежать", "билóнг"], ["answer", "ответ; отвечать", "áнсэ"]],
  sut: "Английский вопрос строится по формуле: <b>вопросительное слово + помощник + кто + глагол</b>. {{Where do you live?}} Помощник — do/does/did, am/is/are, can, will… Без него вопроса не бывает (почти).",
  rule: `<table class="tbl"><thead><tr><th>слово</th><th>помощник</th><th>кто</th><th>глагол …</th></tr></thead><tbody>
<tr><td class="fr">Where</td><td class="fr">do</td><td class="fr">you</td><td class="fr">live?</td></tr>
<tr><td class="fr">What</td><td class="fr">did</td><td class="fr">he</td><td class="fr">say?</td></tr>
<tr><td class="fr">Why</td><td class="fr">are</td><td class="fr">you</td><td class="fr">laughing?</td></tr>
<tr><td class="fr">When</td><td class="fr">will</td><td class="fr">they</td><td class="fr">come?</td></tr>
<tr><td class="fr">How long</td><td class="fr">can</td><td class="fr">you</td><td class="fr">stay?</td></tr></tbody></table>
<p><b>Исключение:</b> если спрашиваешь <b>«кто/что сделал»</b> (who, what — это сам действующий) — помощника нет: {{Who called?}}, {{What happened?}}</p>`,
  prosto: `<p>По-русски «Где ты живёшь?» — порядок как в обычной фразе. По-английски нужен помощник: «Где <b>делаешь</b> ты жить?» Звучит странно, но так устроен язык.</p>
> Where do you live? :: Где ты живёшь?
> What does this word mean? :: Что значит это слово?
> Why did you leave? :: Почему ты ушёл?
> How often do you play? :: Как часто ты играешь?
> How long are you staying? :: Надолго ты остаёшься?
> Which one do you want? :: Какой ты хочешь (из этих)?
> Whose phone is this? :: Чей это телефон?
> Who called you? :: Кто тебе звонил? — who = тот, кто звонил: без did
> What happened? :: Что случилось?
@@pin:en11@@
<h3>Вопрос-уточнение в конце</h3>
<p>Англичане любят хвостик «да?»: {{You're tired, aren't you?}}, {{He plays, doesn't he?}} — помощник с «не» в конце. Пока просто узнавай его на слух.</p>
<h3>Частые ошибки</h3>
<p>• «Where you live?» → {{Where do you live?}} • «What means this word?» → {{What does this word mean?}} • «Who did call you?» → {{Who called you?}}</p>`,
  lub: `<p>{{What's up?}} — «Как дела? / Что нового?» — тоже вопрос, но короткий разговорный. Отвечают {{Not much.}} — «Да ничего особенного».</p>`,
  pins: [{ id: "en11", t: "Вопросы", html: `<table class="tbl"><tbody><tr><td class="fr">Where + do + you + live?</td><td>слово + помощник + кто + глагол</td></tr><tr><td class="fr">Who called? · What happened?</td><td>кто/что сделал — без помощника</td></tr><tr><td class="fr">how long · how often · which · whose</td><td>как долго · как часто · какой · чей</td></tr></tbody></table>` }],
  tasks: [
    { k: "input", lang: "en", q: "Где ты живёшь?", a: ["Where do you live?"], why: "Where + do + you + live" },
    { k: "fix", lang: "en", q: "What means this word?", a: ["What does this word mean?"], why: "помощник does" },
    { k: "choice", q: "Кто тебе звонил?", opts: ["Who called you?", "Who did call you?", "Who you called?"], a: "Who called you?", why: "who = действующий — без did" },
    { k: "input", lang: "en", q: "Почему ты ушёл?", a: ["Why did you leave?", "Why did you go?"], why: "прошлое — did" },
    { k: "input", lang: "en", q: "Что случилось?", a: ["What happened?", "What's happened?"], why: "what = что случилось — без did" },
    { k: "choice", q: "Чей это телефон?", opts: ["Whose phone is this?", "Who phone is this?", "Whose is phone this?"], a: "Whose phone is this?", why: "whose — чей" },
    { k: "fix", lang: "en", q: "How often you play?", a: ["How often do you play?"], why: "нужен do" },
    { k: "listen", say: "How long are you staying?", q: "Что прозвучало?", opts: ["Надолго ты остаёшься?", "Как часто ты остаёшься?", "Когда ты уезжаешь?"], a: "Надолго ты остаёшься?", why: "how long — как долго" },
    { k: "input", lang: "en", q: "Какой ты хочешь (из этих)?", a: ["Which one do you want?", "Which do you want?"], why: "which — из нескольких" },
    { k: "choice", q: "You're tired, …?", opts: ["aren't you", "don't you", "isn't it"], a: "aren't you", why: "are → aren't you" },
  ] };
