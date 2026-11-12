window.EN_C = window.EN_C || {};
EN_C[2] = { n: 2, t: "Обычно: Present Simple", s: "I work, he works; do и does в вопросах",
  words: [["usually", "обычно", "ю́жуэли"], ["often", "часто", "óфн"], ["sometimes", "иногда", "сáмтаймз"], ["never", "никогда", "нéвэ"], ["every day", "каждый день", "э́ври дэй"], ["watch", "смотреть (видео, фильм)", "уоч"], ["live", "жить", "лив"], ["need", "нуждаться, нужно", "нид"]],
  sut: "То, что бывает обычно, всегда, каждый день: {{I play games every day.}} С he, she, it к глаголу добавляется <b>-s</b>: {{He plays.}} А в вопросах и с «не» появляется помощник — {{do}} или {{does}}.",
  rule: `<table class="tbl"><thead><tr><th></th><th>I / you / we / they</th><th>he / she / it</th></tr></thead><tbody>
<tr><td>обычно</td><td class="fr">I work</td><td class="fr">he works</td></tr>
<tr><td>не</td><td class="fr">I don't work</td><td class="fr">he doesn't work</td></tr>
<tr><td>вопрос</td><td class="fr">Do you work?</td><td class="fr">Does he work?</td></tr></tbody></table>
<p>Если появился <b>does</b> — он «забирает» себе -s: {{Does he work?}}, а не «Does he works?»</p>`,
  prosto: `<p>Русский говорит «я играю» и про сейчас, и про «вообще». В английском это разные вещи. «Вообще, обычно» — это Present Simple:</p>
> I play games every day. :: Я играю в игры каждый день.
> She lives in London. :: Она живёт в Лондоне. — lives: she → +s
> We often watch films. :: Мы часто смотрим фильмы.
> He never eats breakfast. :: Он никогда не завтракает.
> I don't like coffee. :: Я не люблю кофе.
> She doesn't need help. :: Ей не нужна помощь.
> Do you live here? :: Ты здесь живёшь?
> What does he do? :: Чем он занимается? — буквально «что он делает (вообще)»
@@pin:en2@@
<h3>Где ставить «часто», «никогда»</h3>
<p>Слова {{usually}}, {{often}}, {{sometimes}}, {{never}} стоят <b>перед</b> глаголом: {{I often play.}} Но <b>после</b> am/is/are: {{I'm often tired.}}</p>
<h3>Частые ошибки</h3>
<p>• «He play» — потеряна -s. Надо {{He plays.}} • «Does she likes?» — после does глагол без -s: {{Does she like…?}} • «I no like» — «не» через don't: {{I don't like.}}</p>`,
  lub: `<p>Почему -s только у he/she/it? Раньше в английском у каждого лица было своё окончание, как в русском (я играю, ты играешь…). За 500 лет почти все стёрлись — осталось одно -s.</p>
<p>{{What do you do?}} — это не «что ты делаешь сейчас», а «кем ты работаешь / чем занимаешься». Частый вопрос при знакомстве.</p>`,
  pins: [{ id: "en2", t: "Present Simple", html: `<table class="tbl"><tbody><tr><td class="fr">I work · he works</td><td>обычно</td></tr><tr><td class="fr">I don't · he doesn't work</td><td>не</td></tr><tr><td class="fr">Do you…? · Does he…?</td><td>вопрос</td></tr><tr><td class="fr">usually · often · sometimes · never</td><td>перед глаголом</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "He … in a big city.", opts: ["live", "lives", "living"], a: "lives", why: "he → +s" },
    { k: "input", lang: "en", q: "Я играю в игры каждый день.", a: ["I play games every day."], why: "обычно — Present Simple" },
    { k: "choice", q: "… she like music?", opts: ["Do", "Does", "Is"], a: "Does", why: "she → does" },
    { k: "fix", lang: "en", q: "Does he likes pizza?", a: ["Does he like pizza?"], why: "после does — без -s" },
    { k: "input", lang: "en", q: "Я не люблю кофе.", a: ["I don't like coffee.", "I do not like coffee."], why: "не — don't" },
    { k: "choice", q: "Куда поставить often? «I … play football.»", opts: ["I often play football.", "I play often football.", "Often I play football often."], a: "I often play football.", why: "often — перед глаголом" },
    { k: "input", lang: "en", q: "Ей не нужна помощь.", a: ["She doesn't need help.", "She does not need help."], why: "she → doesn't + need" },
    { k: "listen", say: "We often watch films.", q: "Что прозвучало?", opts: ["Мы часто смотрим фильмы.", "Мы никогда не смотрим фильмы.", "Мы смотрим фильм сейчас."], a: "Мы часто смотрим фильмы.", why: "often — часто" },
    { k: "input", lang: "en", q: "Ты здесь живёшь?", a: ["Do you live here?"], why: "вопрос — Do you…?" },
    { k: "fix", lang: "en", q: "He never eat breakfast.", a: ["He never eats breakfast."], why: "he → eats" },
    { k: "choice", q: "What does he do?", opts: ["Чем он занимается?", "Что он делает прямо сейчас?", "Что он сделал?"], a: "Чем он занимается?", why: "Present Simple — «вообще»" },
  ] };
