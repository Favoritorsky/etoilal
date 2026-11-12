window.EN_C = window.EN_C || {};
EN_C[16] = { n: 16, t: "Present Perfect или Past Simple?", s: "есть результат сейчас — или просто было вчера",
  words: [["when", "когда", "уэн"], ["last year", "в прошлом году", "ласт йиэ"], ["this year", "в этом году", "зис йиэ"], ["recently", "недавно", "рúсэнтли"], ["lately", "в последнее время", "лэ́йтли"], ["moved", "переехал (move)", "мувд"], ["written", "написал (write)", "ритн"], ["met", "встретил (meet)", "мэт"]],
  sut: "Главное правило: если сказано <b>когда</b> (вчера, в 2020, неделю назад, when?) — Past Simple. Если «когда» нет, а важен опыт или результат сейчас — Present Perfect.",
  rule: `<table class="tbl"><thead><tr><th>Present Perfect</th><th>Past Simple</th></tr></thead><tbody>
<tr><td>время не названо, важно сейчас</td><td>названо, когда (закончилось)</td></tr>
<tr><td class="fr">I've lost my keys.</td><td class="fr">I lost my keys yesterday.</td></tr>
<tr><td class="fr">Have you seen this film?</td><td class="fr">When did you see it?</td></tr>
<tr><td class="fr">ever, never, just, already, yet, for, since, recently, this year, today</td><td class="fr">yesterday, ago, last week, in 2020, when?</td></tr></tbody></table>`,
  prosto: `<p>Живой разговор часто начинается с Present Perfect, а потом переходит в Past Simple — когда появляются подробности:</p>
> Have you ever been to London? :: Ты бывал в Лондоне?
> Yes, I have. I went there last year. :: Да. Я ездил туда в прошлом году. — появилось «когда» — Past Simple
> I've met a very nice girl. :: Я познакомился с очень классной девушкой.
> Where did you meet her? :: Где ты с ней познакомился? — подробности — Past Simple
> We've moved to a new flat. :: Мы переехали в новую квартиру.
> We moved two months ago. :: Мы переехали два месяца назад.
> Have you written to him recently? :: Ты писал ему в последнее время?
> I haven't played much this year. :: В этом году я мало играл. — год ещё идёт
@@pin:en16@@
<h3>Проверка одним вопросом</h3>
<p>Спроси себя: «А когда?» Если ответ в предложении есть — Past Simple. Если нет и не важен — Present Perfect.</p>
<h3>Частые ошибки</h3>
<p>• «I have seen him yesterday» → {{I saw him yesterday.}} • «When have you arrived?» → {{When did you arrive?}} • «I lived here since 2020» → {{I've lived here since 2020.}}</p>`,
  lub: `<p>{{Did you see it?}} vs {{Have you seen it?}} — оба про прошлое. Первый — про конкретный случай («ты видел вчерашний матч?»), второй — «видел ли вообще». В Америке первый часто заменяет второй.</p>`,
  pins: [{ id: "en16", t: "Perfect или Past?", html: `<table class="tbl"><tbody><tr><td class="fr">ever, just, already, yet, for, since</td><td>Present Perfect</td></tr><tr><td class="fr">yesterday, ago, last…, in 2020, when?</td><td>Past Simple</td></tr><tr><td>«А когда?» — сказано?</td><td>да → Past</td></tr></tbody></table>` }],
  tasks: [
    { k: "choice", q: "I … him yesterday.", opts: ["saw", "have seen", "seen"], a: "saw", why: "yesterday — Past Simple" },
    { k: "choice", q: "… you ever … to London?", opts: ["Have … been", "Did … go", "Are … been"], a: "Have … been", why: "ever — Present Perfect" },
    { k: "fix", lang: "en", q: "When have you arrived?", a: ["When did you arrive?"], why: "when — Past Simple" },
    { k: "input", lang: "en", q: "Мы переехали два месяца назад.", a: ["We moved two months ago."], why: "ago — Past Simple" },
    { k: "input", lang: "en", q: "Мы переехали в новую квартиру (результат сейчас).", a: ["We've moved to a new flat.", "We have moved to a new flat.", "We've moved to a new apartment.", "We have moved to a new apartment."], why: "без «когда» — Present Perfect" },
    { k: "fix", lang: "en", q: "I have lost my keys yesterday.", a: ["I lost my keys yesterday."], why: "yesterday — Past" },
    { k: "choice", q: "I … much this year.", opts: ["haven't played", "didn't play"], a: "haven't played", why: "this year — год ещё идёт" },
    { k: "listen", say: "Where did you meet her?", q: "Что прозвучало?", opts: ["Где ты с ней познакомился?", "Ты с ней познакомился?", "Когда ты с ней встретишься?"], a: "Где ты с ней познакомился?", why: "where did — где (в прошлом)" },
    { k: "input", lang: "en", q: "Я познакомился с очень классной девушкой.", a: ["I've met a very nice girl.", "I have met a very nice girl.", "I met a very nice girl."], why: "новость — Present Perfect" },
    { k: "choice", q: "She … to Paris in 2020.", opts: ["went", "has gone", "has been"], a: "went", why: "in 2020 — Past" },
  ] };
